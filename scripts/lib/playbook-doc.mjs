/**
 * Validator for an authored Playbook, run at seal time.
 *
 * Reuses the block, visual and placeholder checkers from report-doc.mjs rather
 * than copying them — those are two hundred lines and two copies would diverge
 * inside a month.
 *
 * Like its sibling, this runs at SEAL time and nowhere else. The build only
 * ever sees ciphertext, so it cannot check a playbook. This is the only thing
 * standing between an authoring mistake and a client opening a broken one.
 */

import { Check, checkBlock, checkVisual, checkPlaceholders, words } from './report-doc.mjs';

export const PLAYBOOK_SCHEMA = 'consultico.playbook/1';

const LIMITS = {
  actionMinutes: 5,
  oneLinerWords: 18,
  summaryLines: 4,
  whyBlocks: 6,
  givesWords: 25,
  soWhat: 2,
  taskIds: 3,
  applyMaxWords: 250,
  privacyShortWords: 20,
  totalMinutesWarn: 40,
};

const IMPACT = ['foundational', 'high', 'compounding', 'housekeeping'];
const ID = /^[a-z0-9-]+$/;

export function validatePlaybook(doc) {
  const c = new Check();

  if (!doc || typeof doc !== 'object') {
    c.err('doc', 'not an object');
    return c;
  }
  if (doc.schema !== PLAYBOOK_SCHEMA) {
    c.err('doc.schema', `expected "${PLAYBOOK_SCHEMA}", got ${JSON.stringify(doc.schema)}`);
  }
  c.req('doc', doc, ['slug', 'title', 'issued', 'preparedBy', 'brief']);
  if (!doc.client?.name) c.err('doc.client', 'missing "name"');
  if (doc.issued && !/^\d{4}-\d{2}-\d{2}/.test(doc.issued)) {
    c.err('doc.issued', 'must be an ISO date (YYYY-MM-DD)');
  }

  const visuals = doc.visuals ?? {};
  const visualKeys = new Set(Object.keys(visuals));
  const usedVisuals = new Set();
  const taskById = new Map((doc.plan?.tasks ?? []).map((t) => [t.id, t]));
  const resourceIds = new Set((doc.resources ?? []).map((r) => r.id));
  const usedResources = new Set();
  const partIds = new Set((doc.parts ?? []).map((p) => p.id));
  const partsUsed = new Set();
  const usedTasks = new Set();
  const applyIds = new Set();

  /* ------------------------------------------------------------- the opening */

  const o = doc.opening;
  if (!o) {
    c.err('doc.opening', 'required — a playbook opens on the situation, not on an action');
  } else {
    c.req('doc.opening', o, ['title', 'howItWorks']);
    if (!Array.isArray(o.summary) || o.summary.length === 0) {
      c.err('doc.opening.summary', 'required');
    } else if (o.summary.length > LIMITS.summaryLines) {
      c.err('doc.opening.summary', `${o.summary.length} lines, max ${LIMITS.summaryLines}`);
    }
    for (const [i, b] of (o.blocks ?? []).entries()) {
      checkBlock(c, `opening.blocks[${i}]`, b, visualKeys, usedVisuals);
    }
    for (const [i, h] of (o.headlines ?? []).entries()) {
      c.req(`opening.headlines[${i}]`, h, ['value', 'label']);
    }
  }

  if (doc.closing) {
    c.req('doc.closing', doc.closing, ['title']);
    for (const [i, b] of (doc.closing.blocks ?? []).entries()) {
      checkBlock(c, `closing.blocks[${i}]`, b, visualKeys, usedVisuals);
    }
  }

  /* --------------------------------------------------------------- the parts */

  if (!Array.isArray(doc.parts) || doc.parts.length === 0) {
    c.err('doc.parts', 'at least one part');
  }
  const partOrders = [];
  for (const [i, p] of (doc.parts ?? []).entries()) {
    c.req(`parts[${i}]`, p, ['id', 'label', 'title']);
    if (typeof p?.order !== 'number') c.err(`parts[${i}]`, 'missing numeric "order"');
    else partOrders.push(p.order);
  }
  if (new Set(partOrders).size !== partOrders.length) c.err('doc.parts', 'duplicate "order" values');

  /* ------------------------------------------------------------- the actions */

  if (!Array.isArray(doc.actions) || doc.actions.length === 0) {
    c.err('doc.actions', 'a playbook needs at least one action');
  }
  const seenIds = new Set();
  const orders = [];
  let totalMinutes = 0;

  for (const [i, a] of (doc.actions ?? []).entries()) {
    const at = `actions[${i}]${a?.id ? ` (${a.id})` : ''}`;
    c.req(at, a, ['id', 'partId', 'title', 'oneLiner']);

    if (a?.id) {
      if (!ID.test(a.id)) c.err(at, `id "${a.id}" must match [a-z0-9-] — it goes in ?a=`);
      if (seenIds.has(a.id)) c.err(at, `duplicate action id "${a.id}"`);
      seenIds.add(a.id);
    }
    if (typeof a?.order !== 'number') c.err(at, 'missing numeric "order"');
    else orders.push(a.order);

    if (a?.partId && !partIds.has(a.partId)) c.err(at, `partId "${a.partId}" is not a part`);
    else if (a?.partId) partsUsed.add(a.partId);

    if (typeof a?.minutes !== 'number' || a.minutes < 1) {
      c.err(at, 'missing numeric "minutes" — the length is a promise to the reader');
    } else {
      totalMinutes += a.minutes;
      if (a.minutes > LIMITS.actionMinutes) {
        c.err(at, `${a.minutes} minutes, max ${LIMITS.actionMinutes} — split it`);
      }
    }
    if (a?.oneLiner && words(a.oneLiner) > LIMITS.oneLinerWords) {
      c.err(at, `oneLiner is ${words(a.oneLiner)} words, max ${LIMITS.oneLinerWords}`);
    }

    checkContract(c, `${at}.contract`, a?.contract);
    checkWhy(c, `${at}.why`, a?.why, visualKeys, usedVisuals);
    checkTask(c, `${at}.task`, a?.task, a?.id, taskById, usedTasks, applyIds);

    for (const id of a?.resourceIds ?? []) {
      if (!resourceIds.has(id)) c.err(at, `resource "${id}" is not in doc.resources`);
      usedResources.add(id);
    }
  }

  if (new Set(orders).size !== orders.length) c.err('doc.actions', 'duplicate "order" values');
  for (const p of partIds) {
    if (!partsUsed.has(p)) c.warn('doc.parts', `part "${p}" contains no actions`);
  }
  if (totalMinutes > LIMITS.totalMinutesWarn) {
    c.warn('doc', `${totalMinutes} minutes total — past ${LIMITS.totalMinutesWarn} this stops being short`);
  }

  /* ------------------------------------------------------------------ plan */

  if (!doc.plan) {
    c.err('doc.plan', 'required');
  } else {
    for (const [i, t] of (doc.plan.tasks ?? []).entries()) {
      const at = `plan.tasks[${i}]${t?.id ? ` (${t.id})` : ''}`;
      c.req(at, t, ['id', 'phase', 'label', 'effort', 'owner']);
      if (t?.sectionId) {
        c.err(at, 'a playbook task uses "actionId", not "sectionId"');
      }
      if (t?.id && !usedTasks.has(t.id)) {
        c.warn(at, 'attached to no action — the client meets it only in the plan');
      }
    }
  }

  /* -------------------------------------------------------------- outcomes */

  for (const [i, out] of (doc.outcomes ?? []).entries()) {
    const at = `outcomes[${i}]${out?.id ? ` (${out.id})` : ''}`;
    c.req(at, out, ['id', 'label', 'definition', 'direction', 'measureFrom']);
    // The honesty rule, same as the report validator.
    if (out && out.baseline !== null) {
      c.err(at, 'baseline must be null — no baseline values exist, and the page must not imply a reading it does not have');
    }
  }

  /* ------------------------------------------------------------- resources */

  for (const [i, r] of (doc.resources ?? []).entries()) {
    const at = `resources[${i}]${r?.id ? ` (${r.id})` : ''}`;
    c.req(at, r, ['id', 'title', 'blurb']);
    if (!r?.body?.kind) c.err(at, 'missing "body.kind"');
    if (r?.id && !usedResources.has(r.id)) {
      c.warn(at, 'referenced by no action — reachable only from the shelf');
    }
  }

  /* --------------------------------------------------------- config, privacy */

  const cfg = doc.config;
  if (!cfg) c.err('doc.config', 'required');
  else {
    if (!['open', 'sequential'].includes(cfg.navigation)) {
      c.err('doc.config', 'navigation must be "open" or "sequential"');
    }
    if (!['visited', 'marked', 'applied'].includes(cfg.completion)) {
      c.err('doc.config', 'completion must be "visited", "marked" or "applied"');
    }
  }

  // Required by the type and enforced here: this document stores free text a
  // client wrote, and it cannot ship without telling them who reads it.
  const pv = doc.privacy;
  if (!pv) {
    c.err('doc.privacy', 'required — a playbook that saves what a client writes must say who reads it');
  } else {
    c.req('doc.privacy', pv, ['short', 'retention', 'contactEmail']);
    if (pv.short && words(pv.short) > LIMITS.privacyShortWords) {
      c.err('doc.privacy.short', `${words(pv.short)} words, max ${LIMITS.privacyShortWords} — it sits above every field`);
    }
    if (!Array.isArray(pv.body) || pv.body.length === 0) {
      c.err('doc.privacy.body', 'required');
    }
  }

  /* --------------------------------------------------------------- visuals */

  for (const [key, v] of Object.entries(visuals)) {
    const at = `visuals.${key}`;
    if (!v?.t) {
      c.err(at, 'missing discriminator "t"');
      continue;
    }
    checkVisual(c, at, v);
    if (!usedVisuals.has(key)) c.warn(at, 'never referenced');
  }

  return c;
}

/* ------------------------------------------------------------------ helpers */

function checkContract(c, at, k) {
  if (!k) {
    c.err(at, 'required — every action states what it changes before it asks for time');
    return;
  }
  c.req(at, k, ['gives', 'effort', 'impact']);
  if (k.gives && words(k.gives) > LIMITS.givesWords) {
    c.err(at, `gives is ${words(k.gives)} words, max ${LIMITS.givesWords}`);
  }
  if (k.impact && !IMPACT.includes(k.impact)) {
    c.err(at, `impact must be one of ${IMPACT.join('|')}, got ${JSON.stringify(k.impact)}`);
  }
  // The guard that stops a fabricated return sneaking in. There is no
  // measurement behind "impact" in this document, so anything scalar is a lie.
  for (const bad of ['score', 'roi', 'uplift', 'percent', 'percentage', 'multiplier']) {
    if (bad in k) {
      c.err(at, `"${bad}" cannot be authored — impact is comparative and qualitative, never a number, because no baseline exists to compute one from`);
    }
  }
  if (typeof k.impact === 'number') {
    c.err(at, 'impact must be the enum, not a number');
  }
  checkPlaceholders(c, at, k);
}

function checkWhy(c, at, w, visualKeys, usedVisuals) {
  if (!w) {
    c.err(at, 'required — the reasoning is the part the client paid for');
    return;
  }
  const blocks = w.blocks ?? [];
  // Independent of video, deliberately. Without this, actions get authored
  // thin on the promise that a recording will carry them, and the recording
  // never happens.
  if (!Array.isArray(blocks) || blocks.length < 2) {
    c.err(at, 'needs at least 2 blocks, whether or not a video is authored — an action must work with the video unwatched');
  }
  if (blocks.length > LIMITS.whyBlocks) {
    c.err(at, `${blocks.length} blocks, max ${LIMITS.whyBlocks}`);
  }
  if (blocks.filter((b) => b?.t === 'lede').length > 1) {
    c.err(at, 'more than one lede — an action has one point');
  }
  for (const [i, b] of blocks.entries()) {
    checkBlock(c, `${at}.blocks[${i}]`, b, visualKeys, usedVisuals);
  }

  if (w.video) {
    c.req(`${at}.video`, w.video, ['provider', 'id', 'title', 'transcriptSummary']);
    if (w.video.provider === 'youtube') {
      c.err(`${at}.video`, 'use "youtube-nocookie", not "youtube"');
    }
  }

  if (w.showing) {
    c.req(`${at}.showing`, w.showing, ['lede', 'visual']);
    if (w.showing.visual && !visualKeys.has(w.showing.visual)) {
      c.err(`${at}.showing`, `visual "${w.showing.visual}" is not in doc.visuals`);
    } else if (w.showing.visual) {
      usedVisuals.add(w.showing.visual);
    }
    if ((w.showing.soWhat ?? []).length > LIMITS.soWhat) {
      c.err(`${at}.showing`, `soWhat has ${w.showing.soWhat.length} lines, max ${LIMITS.soWhat}`);
    }
  }
}

function checkTask(c, at, t, actionId, taskById, usedTasks, applyIds) {
  if (!t) {
    c.err(at, 'required — an action without something to do is not an action');
    return;
  }
  const ids = t.taskIds ?? [];
  if (!Array.isArray(ids) || ids.length === 0) {
    c.err(at, 'taskIds is empty');
  } else if (ids.length > LIMITS.taskIds) {
    c.err(at, `${ids.length} tasks, max ${LIMITS.taskIds} — split the action`);
  }
  for (const id of ids) {
    const task = taskById.get(id);
    if (!task) {
      c.err(at, `task "${id}" is not in doc.plan.tasks`);
      continue;
    }
    usedTasks.add(id);
    if (task.actionId && task.actionId !== actionId) {
      c.err(at, `task "${id}" claims actionId "${task.actionId}" but is used by "${actionId}"`);
    }
  }
  checkApply(c, `${at}.apply`, t.apply, applyIds);
  checkPlaceholders(c, at, t);
}

function checkApply(c, at, a, applyIds) {
  if (!a) {
    c.err(at, 'required — this is how understanding is checked without testing it');
    return;
  }
  c.req(at, a, ['id', 'title', 'prompt', 'visibility']);
  if (a.id) {
    if (applyIds.has(a.id)) c.err(at, `duplicate apply id "${a.id}" — it is the key of a saved answer`);
    applyIds.add(a.id);
  }
  if (a.visibility !== 'consultant-reads') {
    c.err(at, 'visibility must be "consultant-reads" — there is one model and the client is told it');
  }
  const f = a.field;
  if (!f?.kind) {
    c.err(at, 'missing field.kind');
    return;
  }
  switch (f.kind) {
    case 'writing':
      if (typeof f.maxWords !== 'number') c.err(at, 'writing needs maxWords');
      else if (f.maxWords > LIMITS.applyMaxWords) {
        c.err(at, `maxWords ${f.maxWords} is above ${LIMITS.applyMaxWords} — a prompt that invites an essay gets no answer`);
      }
      break;
    case 'list':
      if (typeof f.rows !== 'number' || f.rows < 1) c.err(at, 'list needs a positive "rows"');
      if (!f.rowLabel) c.err(at, 'list needs a rowLabel');
      break;
    case 'sort':
      if ((f.buckets ?? []).length < 2) c.err(at, 'sort needs at least 2 buckets');
      if ((f.items ?? []).length < 4) c.err(at, 'sort needs at least 4 items');
      if (f.key) {
        const covered = new Set(f.key.map((k) => k.itemId));
        for (const it of f.items ?? []) {
          if (!covered.has(it.id)) c.err(at, `key does not cover item "${it.id}"`);
        }
      }
      break;
    case 'pick':
      if ((f.options ?? []).length < 2) c.err(at, 'pick needs at least 2 options');
      if (!f.reasonLabel) c.err(at, 'pick needs a reasonLabel');
      break;
    default:
      c.err(at, `unknown field kind "${f.kind}"`);
  }
  checkPlaceholders(c, at, a);
}
