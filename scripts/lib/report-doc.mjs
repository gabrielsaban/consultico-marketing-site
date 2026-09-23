/**
 * Validator for an authored ReportDoc, run at seal time.
 *
 * WHY SEAL TIME AND NOT BUILD TIME. The build only ever sees ciphertext — it
 * cannot read a report, so it cannot check one. This validator is the only
 * gate between a mistake in an authored document and a client opening a broken
 * report. If it gets skipped, nothing else catches it.
 *
 * Plain .mjs rather than TypeScript for the same reason the crypto is
 * duplicated in report-seal.mjs: src/lib/reports/* imports `server-only`,
 * which will not load outside a Next build.
 *
 * It checks two different things:
 *
 *   STRUCTURE   the shape matches src/lib/reports/content/schema.ts, and every
 *               cross-reference resolves. A taskId pointing at nothing would
 *               render a section with a missing checklist and no error.
 *
 *   SPARSENESS  the editorial rules the rebuild exists to enforce. The report
 *               this replaced was 5,300 words; without a machine saying no,
 *               the next one drifts straight back. These are errors, not
 *               warnings, deliberately.
 */

export const SCHEMA = 'consultico.report/1';

// Editorial limits. Raise them on purpose, in a commit, with a reason.
const LIMITS = {
  ledeWords: 40,
  points: 5,
  oneLinerWords: 18,
  summarySentences: 4,
  blocksPerSection: 8,
  calloutWords: 70,
  findingWords: 45,
};

const words = (s) => String(s).trim().split(/\s+/).filter(Boolean).length;

class Check {
  constructor() {
    this.errors = [];
    this.warnings = [];
  }
  err(where, msg) {
    this.errors.push(`${where}: ${msg}`);
  }
  warn(where, msg) {
    this.warnings.push(`${where}: ${msg}`);
  }
  req(where, obj, keys) {
    for (const k of keys) {
      if (obj?.[k] === undefined || obj?.[k] === null || obj?.[k] === '') {
        this.err(where, `missing "${k}"`);
      }
    }
  }
}

/** @returns {{errors: string[], warnings: string[]}} */
export function validateReportDoc(doc) {
  const c = new Check();

  if (!doc || typeof doc !== 'object') {
    c.err('doc', 'not an object');
    return c;
  }
  if (doc.schema !== SCHEMA) {
    c.err('doc.schema', `expected "${SCHEMA}", got ${JSON.stringify(doc.schema)}`);
  }
  c.req('doc', doc, ['slug', 'title', 'issued', 'preparedBy', 'brief']);
  if (!doc.client?.name) c.err('doc.client', 'missing "name"');
  if (doc.issued && !/^\d{4}-\d{2}-\d{2}/.test(doc.issued)) {
    c.err('doc.issued', 'must be an ISO date (YYYY-MM-DD)');
  }

  /* ---------------------------------------------------------- collections */

  const visuals = doc.visuals ?? {};
  const visualKeys = new Set(Object.keys(visuals));
  const taskIds = new Set((doc.plan?.tasks ?? []).map((t) => t.id));
  const resourceIds = new Set((doc.resources ?? []).map((r) => r.id));
  const phaseIds = new Set((doc.plan?.phases ?? []).map((p) => p.id));
  const usedVisuals = new Set();
  const usedTasks = new Set();
  const usedResources = new Set();

  /* ------------------------------------------------------------- summary */

  if (!Array.isArray(doc.summary) || doc.summary.length === 0) {
    c.err('doc.summary', 'required — the client should not have to open a section to get the point');
  } else if (doc.summary.length > LIMITS.summarySentences) {
    c.err('doc.summary', `${doc.summary.length} entries, max ${LIMITS.summarySentences}`);
  }

  if (!Array.isArray(doc.headlines) || doc.headlines.length === 0) {
    c.warn('doc.headlines', 'no top-strip figures');
  }
  for (const [i, h] of (doc.headlines ?? []).entries()) {
    c.req(`doc.headlines[${i}]`, h, ['value', 'label']);
  }

  /* ------------------------------------------------------------ sections */

  if (!Array.isArray(doc.sections) || doc.sections.length === 0) {
    c.err('doc.sections', 'a report needs at least one section');
  }

  const seenSectionIds = new Set();
  const orders = [];

  for (const [i, s] of (doc.sections ?? []).entries()) {
    const at = `sections[${i}]${s?.id ? ` (${s.id})` : ''}`;
    c.req(at, s, ['id', 'title', 'oneLiner', 'kind']);

    if (s?.id) {
      if (seenSectionIds.has(s.id)) c.err(at, `duplicate section id "${s.id}"`);
      seenSectionIds.add(s.id);
    }
    if (typeof s?.order !== 'number') c.err(at, 'missing numeric "order"');
    else orders.push(s.order);

    if (s?.oneLiner && words(s.oneLiner) > LIMITS.oneLinerWords) {
      c.err(at, `oneLiner is ${words(s.oneLiner)} words, max ${LIMITS.oneLinerWords} — it is a reason to open the section, not a summary of it`);
    }

    const blocks = s?.understanding ?? [];
    if (!Array.isArray(blocks) || blocks.length === 0) {
      c.err(at, '"understanding" is empty — a section with nothing to understand should be cut');
    }
    if (blocks.length > LIMITS.blocksPerSection) {
      c.err(at, `${blocks.length} blocks, max ${LIMITS.blocksPerSection} — split the section or cut`);
    }
    if (blocks.filter((b) => b?.t === 'lede').length > 1) {
      c.err(at, 'more than one lede — a section has one point');
    }

    for (const [j, b] of blocks.entries()) {
      checkBlock(c, `${at}.understanding[${j}]`, b, visualKeys, usedVisuals);
    }

    for (const key of s?.visuals ?? []) {
      if (!visualKeys.has(key)) c.err(at, `visual "${key}" is not in doc.visuals`);
      usedVisuals.add(key);
    }
    for (const id of s?.taskIds ?? []) {
      if (!taskIds.has(id)) c.err(at, `task "${id}" is not in doc.plan.tasks`);
      usedTasks.add(id);
    }
    for (const id of s?.resourceIds ?? []) {
      if (!resourceIds.has(id)) c.err(at, `resource "${id}" is not in doc.resources`);
      usedResources.add(id);
    }
    if (s?.video) {
      c.req(`${at}.video`, s.video, ['provider', 'id', 'title']);
      if (s.video.provider === 'youtube' ) {
        c.err(`${at}.video`, 'use "youtube-nocookie", not "youtube"');
      }
    }
  }

  if (new Set(orders).size !== orders.length) c.err('doc.sections', 'duplicate "order" values');

  /* ---------------------------------------------------------------- plan */

  if (!doc.plan) {
    c.err('doc.plan', 'required');
  } else {
    if (typeof doc.plan.horizonDays !== 'number') c.err('doc.plan', 'missing numeric "horizonDays"');
    if (!Array.isArray(doc.plan.phases) || doc.plan.phases.length === 0) {
      c.err('doc.plan.phases', 'at least one phase');
    }
    const seenTask = new Set();
    for (const [i, t] of (doc.plan.tasks ?? []).entries()) {
      const at = `plan.tasks[${i}]${t?.id ? ` (${t.id})` : ''}`;
      c.req(at, t, ['id', 'phase', 'label', 'effort', 'owner']);
      if (t?.id) {
        if (seenTask.has(t.id)) c.err(at, `duplicate task id "${t.id}"`);
        seenTask.add(t.id);
      }
      if (t?.phase && !phaseIds.has(t.phase)) c.err(at, `phase "${t.phase}" is not in doc.plan.phases`);
      if (t?.owner && !['client', 'consultico'].includes(t.owner)) {
        c.err(at, `owner must be "client" or "consultico", got ${JSON.stringify(t.owner)}`);
      }
      if (t?.sectionId && !seenSectionIds.has(t.sectionId)) {
        c.err(at, `sectionId "${t.sectionId}" is not a section`);
      }
    }
    for (const id of taskIds) {
      if (!usedTasks.has(id)) {
        c.warn('doc.plan', `task "${id}" is in the plan but attached to no section — the client will meet it only in the plan view`);
      }
    }
  }

  /* ------------------------------------------------------------ outcomes */

  for (const [i, o] of (doc.outcomes ?? []).entries()) {
    const at = `outcomes[${i}]${o?.id ? ` (${o.id})` : ''}`;
    c.req(at, o, ['id', 'label', 'definition', 'direction', 'measureFrom']);
    if (o && !['up', 'down'].includes(o.direction)) {
      c.err(at, 'direction must be "up" or "down"');
    }
    // The honesty rule, enforced. Schema v1 has no way to express a reading,
    // so anything that looks like one is an authoring mistake, not a value.
    if (o && o.baseline !== null) {
      c.err(at, 'baseline must be null in schema v1 — no baseline values exist yet, and a dashboard must not imply a reading it does not have');
    }
    if (o && 'reading' in o) {
      c.err(at, '"reading" cannot be authored in schema v1');
    }
    if (o && o.source !== null && !['crm', 'ga4', 'ads', 'manual'].includes(o.source)) {
      c.err(at, `source must be null or one of crm|ga4|ads|manual, got ${JSON.stringify(o.source)}`);
    }
  }
  if ((doc.outcomes ?? []).length > 0 && !doc.baselineRequest) {
    c.warn('doc', 'outcomes are defined with no baselineRequest — the client is shown measures with no values and never asked for them');
  }

  /* ----------------------------------------------------------- resources */

  for (const [i, r] of (doc.resources ?? []).entries()) {
    const at = `resources[${i}]${r?.id ? ` (${r.id})` : ''}`;
    c.req(at, r, ['id', 'title', 'blurb', 'presentation']);
    if (r && !['inline', 'drawer', 'overlay'].includes(r.presentation)) {
      c.err(at, 'presentation must be inline|drawer|overlay');
    }
    if (!r?.body?.kind) c.err(at, 'missing "body.kind"');
    if (r?.id && !usedResources.has(r.id)) {
      c.warn(at, 'attached to no section — unreachable unless something links it');
    }
  }

  /* ------------------------------------------------------------- visuals */

  for (const [key, v] of Object.entries(visuals)) {
    const at = `visuals.${key}`;
    if (!v?.t) {
      c.err(at, 'missing discriminator "t"');
      continue;
    }
    checkVisual(c, at, v);
    if (!usedVisuals.has(key)) c.warn(at, 'never referenced by a section');
  }

  return c;
}

function checkBlock(c, at, b, visualKeys, usedVisuals) {
  if (!b?.t) {
    c.err(at, 'missing discriminator "t"');
    return;
  }
  switch (b.t) {
    case 'lede':
      if (!b.text) c.err(at, 'lede has no text');
      else if (words(b.text) > LIMITS.ledeWords) {
        c.err(at, `lede is ${words(b.text)} words, max ${LIMITS.ledeWords}`);
      }
      break;
    case 'points':
      if (!Array.isArray(b.items) || b.items.length === 0) c.err(at, 'points has no items');
      else if (b.items.length > LIMITS.points) {
        c.err(at, `${b.items.length} points, max ${LIMITS.points} — beyond five it is prose in a list`);
      }
      break;
    case 'callout':
      c.req(at, b, ['tone', 'title', 'body']);
      if (b.body && words(b.body) > LIMITS.calloutWords) {
        c.err(at, `callout is ${words(b.body)} words, max ${LIMITS.calloutWords}`);
      }
      if (b.tone && !['insight', 'warning', 'brand'].includes(b.tone)) {
        c.err(at, 'tone must be insight|warning|brand');
      }
      break;
    case 'quote':
      if (!Array.isArray(b.lines) || b.lines.length === 0) c.err(at, 'quote has no lines');
      break;
    case 'finding':
      c.req(at, b, ['severity', 'title', 'observed', 'tryThis']);
      if (b.severity && !['keep', 'watch', 'fix'].includes(b.severity)) {
        c.err(at, 'severity must be keep|watch|fix');
      }
      if (b.observed && words(b.observed) > LIMITS.findingWords) {
        c.err(at, `finding.observed is ${words(b.observed)} words, max ${LIMITS.findingWords}`);
      }
      break;
    case 'pair':
      if (!b.left?.title || !b.right?.title) c.err(at, 'pair needs left.title and right.title');
      break;
    case 'draft':
      c.req(at, b, ['kicker']);
      if (!Array.isArray(b.lines) || b.lines.length === 0) c.err(at, 'draft has no lines');
      break;
    case 'figure':
      if (!b.visual) c.err(at, 'figure has no "visual"');
      else if (!visualKeys.has(b.visual)) c.err(at, `visual "${b.visual}" is not in doc.visuals`);
      else usedVisuals.add(b.visual);
      break;
    default:
      c.err(at, `unknown block type "${b.t}"`);
  }
  checkPlaceholders(c, at, b);
}

/** [[placeholder]] must be balanced, or it renders as literal brackets. */
function checkPlaceholders(c, at, node) {
  const walk = (v) => {
    if (typeof v === 'string') {
      const opens = (v.match(/\[\[/g) ?? []).length;
      const closes = (v.match(/\]\]/g) ?? []).length;
      if (opens !== closes) c.err(at, `unbalanced [[placeholder]] in ${JSON.stringify(v.slice(0, 40))}`);
      const stars = (v.match(/\*\*/g) ?? []).length;
      if (stars % 2 !== 0) c.err(at, `unbalanced **bold** in ${JSON.stringify(v.slice(0, 40))}`);
    } else if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === 'object') Object.values(v).forEach(walk);
  };
  walk(node);
}

function checkVisual(c, at, v) {
  switch (v.t) {
    case 'lane-timeline': {
      if (!Array.isArray(v.states) || v.states.length === 0) {
        c.err(at, 'lane-timeline needs at least one state');
        break;
      }
      const ids = v.states.map((s) => s.id);
      if (new Set(ids).size !== ids.length) c.err(at, 'duplicate state ids');
      for (const [i, s] of v.states.entries()) {
        c.req(`${at}.states[${i}]`, s, ['id', 'label']);
        for (const lane of s.lanes ?? []) {
          for (const e of lane.events ?? []) {
            if (typeof e.at !== 'number' || e.at < 0 || e.at > 100) {
              c.err(`${at}.states[${i}]`, `event "at" must be a 0-100 percentage, got ${JSON.stringify(e.at)}`);
            }
          }
        }
      }
      break;
    }
    case 'day-strip':
      if (typeof v.days !== 'number' || v.days < 1) c.err(at, 'day-strip needs a positive "days"');
      for (const f of v.filled ?? []) {
        if (typeof f.day !== 'number' || f.day < 1 || f.day > v.days) {
          c.err(at, `filled day ${JSON.stringify(f.day)} is outside 1..${v.days}`);
        }
      }
      if (!v.caption) c.err(at, 'day-strip needs a caption — a unit chart without one is a puzzle');
      break;
    case 'delta':
      if (!v.from?.value || !v.to?.value) c.err(at, 'delta needs from.value and to.value');
      break;
    case 'split-bar': {
      if (!Array.isArray(v.parts) || v.parts.length === 0) {
        c.err(at, 'split-bar needs parts');
        break;
      }
      const total = v.parts.reduce((n, p) => n + (p.pct ?? 0), 0);
      if (Math.abs(total - 100) > 0.01) c.err(at, `parts sum to ${total}, expected 100`);
      if (!['rule', 'measured'].includes(v.basis)) {
        c.err(at, 'basis must be "rule" or "measured" — without it a target reads as a measurement');
      }
      break;
    }
    case 'serp':
      if (!v.query) c.err(at, 'serp needs a query');
      for (const [i, r] of (v.results ?? []).entries()) {
        c.req(`${at}.results[${i}]`, r, ['source', 'title', 'verdict']);
        if (r?.verdict && !['refresh', 'sharpen', 'retire', 'keep', 'leave'].includes(r.verdict)) {
          c.err(`${at}.results[${i}]`, `unknown verdict "${r.verdict}"`);
        }
      }
      break;
    case 'fix-list':
      for (const [i, g] of (v.groups ?? []).entries()) {
        if (!g?.title) c.err(`${at}.groups[${i}]`, 'missing title');
        for (const [j, it] of (g?.items ?? []).entries()) {
          if (!it?.label) c.err(`${at}.groups[${i}].items[${j}]`, 'missing label');
          if (!['have', 'update', 'add', 'reorder', 'build'].includes(it?.status)) {
            c.err(`${at}.groups[${i}].items[${j}]`, `unknown status "${it?.status}"`);
          }
        }
      }
      break;
    case 'pipeline':
      for (const [i, s] of (v.stages ?? []).entries()) {
        c.req(`${at}.stages[${i}]`, s, ['name', 'sub', 'countLabel', 'trigger']);
        for (const [j, st] of (s?.steps ?? []).entries()) {
          if (!['auto', 'you', 'branch'].includes(st?.actor)) {
            c.err(`${at}.stages[${i}].steps[${j}]`, `actor must be auto|you|branch, got "${st?.actor}"`);
          }
        }
      }
      break;
    case 'stat-row':
      if (!Array.isArray(v.stats) || v.stats.length === 0) c.err(at, 'stat-row needs stats');
      for (const [i, s] of (v.stats ?? []).entries()) {
        c.req(`${at}.stats[${i}]`, s, ['value', 'label']);
        // The guard against decorative dashboard furniture, enforced.
        if ('trend' in (s ?? {}) || 'delta' in (s ?? {})) {
          c.err(`${at}.stats[${i}]`, 'stats carry no trend or delta — there is no time series in a diagnosis, so a sparkline or percentage pill could only be decoration');
        }
      }
      break;
    case 'journey':
      for (const [i, n] of (v.nodes ?? []).entries()) {
        c.req(`${at}.nodes[${i}]`, n, ['label', 'sub', 'state']);
        if (n?.state && !['ok', 'risk', 'neutral'].includes(n.state)) {
          c.err(`${at}.nodes[${i}]`, `state must be ok|risk|neutral`);
        }
      }
      break;
    case 'idea-loop':
      if (!Array.isArray(v.steps) || v.steps.length === 0) c.err(at, 'idea-loop needs steps');
      break;
    case 'table': {
      if (!Array.isArray(v.columns) || v.columns.length === 0) {
        c.err(at, 'table needs columns');
        break;
      }
      for (const [i, row] of (v.rows ?? []).entries()) {
        if (!Array.isArray(row) || row.length !== v.columns.length) {
          c.err(`${at}.rows[${i}]`, `has ${row?.length} cells, expected ${v.columns.length}`);
        }
      }
      break;
    }
    default:
      c.err(at, `unknown visual type "${v.t}"`);
  }
  checkPlaceholders(c, at, v);
}
