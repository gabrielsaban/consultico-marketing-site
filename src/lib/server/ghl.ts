import { getServerEnv } from '@/lib/server/formSessions';
import { sanitiseAttribution } from '@/lib/server/abuse';

/**
 * Pushes a lead or subscriber into GoHighLevel.
 *
 * ── Two routes in, chosen by which env vars exist ──
 * 1. THE API (preferred). Set GHL_API_TOKEN (a Private Integration token) and
 *    GHL_LOCATION_ID. The contact is upserted, tagged and given a note, and we
 *    get an answer back: we know it landed and we know the contact's id. That
 *    id is what anything later hangs off — an opportunity in a pipeline, an
 *    estimate, a quote.
 * 2. AN INBOUND WEBHOOK (fallback). Set GHL_WEBHOOK_URL. Fire-and-forget; a
 *    workflow on the GHL side does the mapping.
 * With neither set, this does nothing and the site carries on. See
 * sendViaApi and sendViaWebhook below.
 *
 * In the API route, GHL workflows are triggered by the TAGS (for example
 * "Contact Tag: apply-form added"), not by a webhook trigger.
 *
 * ⚠️ THE TOKEN IS A PASSWORD TO THE CRM. Same rule as the webhook URL below,
 * only more so: env var only, never in code, a comment, a log line or a commit
 * message. This repository is public.
 *
 * ── Why a webhook and not the API ──
 * A GHL inbound webhook is a plain POST to a URL that a workflow listens on.
 * No OAuth dance, no token refresh, no SDK, and the field mapping lives in GHL
 * where Paul can change it without a deploy. For "get this contact into the
 * CRM" that is the whole job.
 *
 * ⚠️ THE URL IS AN ENV VAR AND MUST STAY ONE. `gabrielsaban/consultico-marketing-site`
 * is a PUBLIC repo, and anyone holding this URL can inject contacts into the
 * CRM. It never goes in code, a comment, or a commit message.
 *
 * ── Why every failure is swallowed ──
 * This runs after the emails have already sent and after the Supabase write.
 * If GHL is down, or the URL is wrong, or nobody has configured it yet, the
 * person still signed up successfully and Paul still has them in his inbox and
 * in Supabase. Losing a signup to a CRM outage would be a far worse bug than
 * missing a CRM row, so this can only ever log.
 */

/**
 * Which form produced this contact.
 *
 * Sent as an explicit top-level field so a GHL workflow can branch on one
 * value instead of parsing a tag array. It is set server-side, so unlike a
 * condition typed into the GHL UI it cannot drift or be mis-edited — which
 * matters here, because this value is what separates people who opted into
 * marketing from people who merely asked us to reply.
 */
export type GhlFormType = 'newsletter' | 'contact';

export interface GhlContactPayload {
  form_type: GhlFormType;
  email: string;
  name?: string;
  business?: string;
  phone?: string;
  website?: string;
  /** Where on the site they came from — homepage, footer, article:<slug>, … */
  source: string;
  /** Segment in GHL without needing to parse anything. */
  tags: string[];
  /**
   * Consent proof travels WITH the contact, deliberately.
   *
   * Once GHL is the list and GHL is where unsubscribes happen, it is also
   * where anyone will look to answer "what did this person agree to?". If the
   * proof stayed only in Supabase, the record and the list would drift apart
   * and the answer would live in neither place.
   */
  marketing_consent?: boolean;
  consent_text?: string;
  consent_version?: string;
  consent_at?: string;
  /** How did you hear about us — free text, contact form only. */
  heard_about?: string;
  /**
   * What they wrote. API route only: it becomes a note on the contact, so an
   * application's answers sit in the CRM next to the person rather than only
   * in an inbox. The webhook route has never carried it and still does not.
   */
  message?: string;
  /** Flattened first_/last_ touch attribution. */
  attribution?: Record<string, string>;
}

/**
 * Resolves which webhook to POST to, so ONE webhook or SEPARATE webhooks per
 * form is a config decision rather than a code change.
 *
 * - Set only GHL_WEBHOOK_URL          → everything goes to one workflow, and
 *                                       you branch inside GHL on `form_type`
 *                                       or on the tags.
 * - Also set GHL_WEBHOOK_URL_NEWSLETTER
 *   and/or GHL_WEBHOOK_URL_CONTACT    → that form goes to its own workflow,
 *                                       anything without an override falls
 *                                       back to the shared one.
 *
 * Start with one, split later, and neither needs a deploy.
 */
function resolveWebhookUrl(formType: GhlFormType): string | undefined {
  const specific =
    formType === 'newsletter'
      ? getServerEnv('GHL_WEBHOOK_URL_NEWSLETTER')
      : getServerEnv('GHL_WEBHOOK_URL_CONTACT');

  return specific ?? getServerEnv('GHL_WEBHOOK_URL');
}

const GHL_API_BASE = 'https://services.leadconnectorhq.com';

/**
 * Tags that a published GHL workflow uses as its trigger, and which must fire
 * again on every submission. Keep in step with the workflows named
 * "Website: ... - confirmation" in GHL.
 */
const WORKFLOW_TRIGGER_TAGS = new Set(['apply-form', 'contact-form']);

/**
 * One call to the GHL API. Returns the parsed body, or null on any failure —
 * callers decide what a failure means; nothing here throws.
 */
async function ghlApi(
  token: string,
  path: string,
  body: unknown,
  method: 'POST' | 'DELETE' = 'POST',
): Promise<Record<string, unknown> | null> {
  try {
    const response = await fetch(`${GHL_API_BASE}${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        // GHL's current reference says to send `v3`; its older examples use a
        // dated version. Overridable so a change on their side is a config
        // edit, not a deploy.
        Version: getServerEnv('GHL_API_VERSION') ?? 'v3',
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      // Status and GHL's own message only. Never the request: it holds the
      // token and a person's details.
      console.error(`GHL API ${path.replace(/\/[A-Za-z0-9]{12,}\//, '/:id/')} failed:`, response.status, (await response.text()).slice(0, 300));
      return null;
    }

    return (await response.json()) as Record<string, unknown>;
  } catch (error) {
    console.error('GHL API request failed:', error instanceof Error ? error.message : 'unknown error');
    return null;
  }
}

/** The note that travels with the contact: what they said and where they came from. */
function buildNote(payload: GhlContactPayload): string {
  const a = sanitiseAttribution(payload.attribution);
  const firstTouch = [a.first_utm_source, a.first_utm_medium, a.first_utm_campaign].filter(Boolean).join(' / ');

  // What they typed about themselves goes in the note every time, because for
  // a contact that already existed it is deliberately not written to the
  // record. See sendViaApi.
  const typed = [
    payload.name ? `Name given: ${payload.name}` : '',
    payload.business ? `Business given: ${payload.business}` : '',
    payload.phone ? `Phone given: ${payload.phone}` : '',
    payload.website ? `Website given: ${payload.website}` : '',
  ].filter(Boolean);

  const lines = [
    `Website form: ${payload.source}`,
    ...typed,
    payload.message ? `\n${payload.message}\n` : '',
    payload.heard_about ? `Heard about us: ${payload.heard_about}` : '',
    `First touch: ${firstTouch || a.first_referrer || 'direct / none'}`,
    a.first_landing_page ? `First landed on: ${a.first_landing_page}` : '',
    a.last_referrer ? `This visit came from: ${a.last_referrer}` : '',
    // The consent proof stays attached to the person. See marketing_consent.
    payload.marketing_consent
      ? `\nMarketing consent given ${payload.consent_at ?? ''} (text version ${payload.consent_version ?? 'unknown'}):\n"${payload.consent_text ?? ''}"`
      : '',
  ];

  return lines.filter(Boolean).join('\n');
}

/**
 * Find-or-create the contact, then tag it and attach the note.
 *
 * ⚠️ AN EXISTING CONTACT'S DETAILS ARE NEVER OVERWRITTEN. The first upsert
 * sends the email address and nothing else, so for someone already in the CRM
 * it changes nothing and simply tells us who they are. Only when GHL reports
 * the contact as new do we fill in the name, company, phone and source.
 *
 * This is not caution for its own sake. The first live test (2026-11-28) sent
 * everything in one upsert, with an address that already existed, and GHL
 * renamed that contact to whatever had been typed into the form. A public form
 * must not be a way to rename a client in the CRM by knowing their email. What
 * the visitor typed still reaches us either way: it is in the note.
 *
 * ⚠️ TAGS ARE NOT SENT ON THE UPSERT, ON PURPOSE. GHL documents that `tags` on
 * an upsert overwrites every tag the contact already has. Someone already
 * tagged as a client who fills in the contact form would silently lose it. The
 * separate add-tags call appends instead, and it is also what fires a
 * "Contact Tag" workflow trigger.
 */
async function sendViaApi(token: string, locationId: string, payload: GhlContactPayload): Promise<boolean> {
  const found = await ghlApi(token, '/contacts/upsert', { locationId, email: payload.email });

  const contact = found?.contact as { id?: string } | undefined;
  if (!contact?.id) return false;

  const fullName = payload.name?.trim() ?? '';
  const [firstName, ...rest] = fullName.split(/\s+/);

  if (found?.new === true) {
    // Matches the contact we just created, by the same email. If this second
    // call fails the contact still exists and still gets its tags and note,
    // so it is not treated as a failure of the whole push.
    await ghlApi(token, '/contacts/upsert', {
      locationId,
      email: payload.email,
      ...(fullName ? { name: fullName, firstName, lastName: rest.join(' ') || undefined } : {}),
      ...(payload.phone ? { phone: payload.phone } : {}),
      ...(payload.business ? { companyName: payload.business } : {}),
      ...(payload.website ? { website: payload.website } : {}),
      source: `Website: ${payload.source}`,
    });
  }

  // ⚠️ A "Contact Tag added" trigger only fires when the tag is NEW to the
  // contact. Found on the first live run (2026-11-28): a second application
  // from the same address enrolled nobody, because the contact already carried
  // `apply-form`. With GHL owning the confirmation email, that person would
  // have heard nothing at all. So for an existing contact, the tags that
  // workflows listen for are taken off first and then put back, which makes
  // every submission a fresh "tag added". Only those tags: `lead`, `newsletter`
  // and the rest are left alone, so nothing else re-fires.
  const retrigger = payload.tags.filter((tag) => WORKFLOW_TRIGGER_TAGS.has(tag));
  if (found?.new !== true && retrigger.length > 0) {
    await ghlApi(token, `/contacts/${contact.id}/tags`, { tags: retrigger }, 'DELETE');
  }

  // Independent of each other, so together. A missing note is not worth
  // failing the whole thing over; missing tags is, because the tags are what
  // the workflows listen for.
  const [tagged] = await Promise.all([
    ghlApi(token, `/contacts/${contact.id}/tags`, { tags: payload.tags }),
    ghlApi(token, `/contacts/${contact.id}/notes`, { body: buildNote(payload) }),
  ]);

  return tagged !== null;
}

async function sendViaWebhook(url: string, payload: GhlContactPayload): Promise<boolean> {
  // `message` stays out of the webhook body: existing workflows were mapped
  // without it, and a webhook URL is a weaker secret than the API token.
  const { message: _message, ...rest } = payload;
  void _message;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // Attribution comes from the browser, so it is filtered to the known
      // tracking keys and spread FIRST: nothing in it can overwrite the
      // server-set email, tags, form_type or consent fields.
      body: JSON.stringify({
        ...sanitiseAttribution(rest.attribution),
        ...rest,
        attribution: sanitiseAttribution(rest.attribution),
        submitted_at: new Date().toISOString(),
      }),
      // GHL occasionally sits on a request. Without this the serverless
      // function waits on it and the user watches a spinner for something
      // that has already succeeded from their point of view.
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      console.error('GHL webhook rejected the request:', response.status, await response.text());
      return false;
    }
    return true;
  } catch (error) {
    console.error('GHL webhook failed:', error);
    return false;
  }
}

/**
 * Returns whether GHL definitely has the contact. `false` covers "not
 * configured" as well as "failed" — either way, nothing on the GHL side can be
 * relied on to act, and the caller should do the job itself.
 */
export async function sendToGhl(payload: GhlContactPayload): Promise<boolean> {
  const token = getServerEnv('GHL_API_TOKEN');
  const locationId = getServerEnv('GHL_LOCATION_ID');

  if (token && locationId) {
    return sendViaApi(token, locationId, payload);
  }

  const url = resolveWebhookUrl(payload.form_type);

  // Not configured yet is a normal state, not an error. The site has to work
  // before either route exists, and it has to keep working if Paul rotates a
  // token or a URL.
  if (!url) return false;

  return sendViaWebhook(url, payload);
}

/**
 * Whether a GHL workflow, rather than this site, sends the visitor their
 * confirmation email.
 *
 * Off by default. Turn it on (GHL_SENDS_CONFIRMATION=true) only once the
 * workflow that sends it is published and tested, because from that moment the
 * site stops sending its own. If the push to GHL fails, the site sends the
 * confirmation itself after all — see the contact-form route.
 */
export function ghlSendsConfirmation(): boolean {
  return getServerEnv('GHL_SENDS_CONFIRMATION')?.toLowerCase() === 'true';
}
