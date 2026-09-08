import { getServerEnv } from '@/lib/server/formSessions';

/**
 * Pushes a lead or subscriber into GoHighLevel.
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

export async function sendToGhl(payload: GhlContactPayload): Promise<void> {
  const url = resolveWebhookUrl(payload.form_type);

  // Not configured yet is a normal state, not an error. The site has to work
  // before the webhook exists, and it has to keep working if Paul rotates it.
  if (!url) return;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...payload,
        ...(payload.attribution ?? {}),
        submitted_at: new Date().toISOString(),
      }),
      // GHL occasionally sits on a request. Without this the serverless
      // function waits on it and the user watches a spinner for something
      // that has already succeeded from their point of view.
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      console.error('GHL webhook rejected the request:', response.status, await response.text());
    }
  } catch (error) {
    console.error('GHL webhook failed:', error);
  }
}
