import { supabaseRestRequest } from '@/lib/server/formSessions';

/**
 * Guards for the public form endpoints.
 *
 * Every form on the site sends an email to whatever address the visitor types.
 * Without these, anyone can script the endpoints to send mail from our domain
 * to strangers (spam, phishing, burning the Resend quota and our sender
 * reputation) or to push fake contacts with fake consent into GHL.
 */

/** How many submitted forms one email address can trigger in an hour. */
const MAX_SENDS_PER_RECIPIENT_PER_HOUR = 3;

/**
 * True when this address has already had MAX_SENDS_PER_RECIPIENT_PER_HOUR
 * submitted forms in the last hour, across every form type.
 *
 * Fails OPEN: if Supabase is down we would rather let a real lead through than
 * lose them, and the other guards still apply.
 */
export async function recipientOverLimit(email: string): Promise<boolean> {
  try {
    const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const params = new URLSearchParams({
      select: 'id',
      // ilike so Victim@x.com and victim@x.com count as the same inbox.
      email: `ilike.${email}`,
      submitted_at: `gt.${since}`,
    });
    const response = await supabaseRestRequest(`form_sessions?${params.toString()}`, {
      method: 'HEAD',
      headers: { Prefer: 'count=exact' },
    });
    const total = Number(response.headers.get('content-range')?.split('/')[1] ?? '0');
    return Number.isFinite(total) && total >= MAX_SENDS_PER_RECIPIENT_PER_HOUR;
  } catch (error) {
    console.error('Recipient rate check failed (allowing):', error);
    return false;
  }
}

/**
 * A first name we are happy to put in an email greeting. Anything that does
 * not look like a name (URLs, long sentences, symbols) becomes "there", so the
 * greeting line cannot be used to carry a phishing message.
 */
export function safeGreetingName(name: string | null | undefined): string {
  const trimmed = (name ?? '').trim();
  if (!trimmed || trimmed.length > 40) return 'there';
  if (!/^[\p{L}][\p{L}\p{M} .'-]*$/u.test(trimmed)) return 'there';
  return trimmed;
}

const ATTRIBUTION_KEY =
  /^(first|last)_(utm_(source|medium|campaign|term|content)|referrer|landing_page)$/;

/**
 * Keeps only the attribution keys the site's own tracking script sets, as
 * strings of a sane length. The object comes from the browser, so without this
 * a visitor could add any key, including ones that overwrite email, tags or
 * consent when the object is merged into a GHL or Supabase payload.
 */
export function sanitiseAttribution(input: unknown): Record<string, string> {
  if (!input || typeof input !== 'object') return {};
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(input as Record<string, unknown>)) {
    if (!ATTRIBUTION_KEY.test(key) || typeof value !== 'string') continue;
    out[key] = value.slice(0, 300);
  }
  return out;
}

/** Trims and caps a free-text field so nobody can post megabytes into an email. */
export function capText(value: string | null | undefined, max: number): string {
  return (value ?? '').trim().slice(0, max);
}

/** The only error text a form endpoint returns on a server failure. */
export const GENERIC_ERROR =
  'Something went wrong sending that. Please try again, or email us at email@consultico.co.uk.';
