/**
 * Where a lead actually came from.
 *
 * ── Why FIRST-touch is stored, and why it is the whole point ──
 * Gerald found us on Gemini, went away, and came back later to fill in the
 * contact form. Last-touch attribution records that as "direct" and the Gemini
 * visit disappears — which is exactly why the only reason we knew was that Paul
 * asked him. So the first thing this browser ever told us is stored in
 * localStorage and NEVER overwritten, and the current visit's referrer is
 * stored separately in sessionStorage. Both go with every submission.
 *
 * If we only kept one, keep first-touch. It answers "what found us", which is
 * the question we actually cannot answer any other way.
 */

const FIRST_TOUCH_KEY = 'consultico_first_touch';
const LAST_TOUCH_KEY = 'consultico_last_touch';

export interface AttributionData {
  referrer?: string;
  landing_page?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  fbclid?: string;
  captured_at?: string;
}

function readCurrent(): AttributionData {
  if (typeof window === 'undefined') return {};

  const params = new URLSearchParams(window.location.search);
  const get = (key: string) => params.get(key) || undefined;

  return {
    // document.referrer is empty on a direct visit and on most in-site
    // navigations, which is fine — an empty referrer IS the signal for "typed
    // it in or came from an untracked app".
    referrer: document.referrer || undefined,
    landing_page: window.location.pathname + window.location.search,
    utm_source: get('utm_source'),
    utm_medium: get('utm_medium'),
    utm_campaign: get('utm_campaign'),
    utm_term: get('utm_term'),
    utm_content: get('utm_content'),
    gclid: get('gclid'),
    fbclid: get('fbclid'),
    captured_at: new Date().toISOString(),
  };
}

/**
 * Call once, as early as possible on every page load.
 *
 * Deliberately quiet: every read and write is wrapped, because storage throws
 * outright in some contexts (Safari private mode, blocked site data) and losing
 * attribution must never take the page down with it.
 */
export function captureAttribution(): void {
  if (typeof window === 'undefined') return;

  const current = readCurrent();

  try {
    // First touch is written once and then left alone forever.
    if (!window.localStorage.getItem(FIRST_TOUCH_KEY)) {
      window.localStorage.setItem(FIRST_TOUCH_KEY, JSON.stringify(current));
    }
  } catch {
    // Storage unavailable. Not worth an error; the form still submits.
  }

  try {
    // Last touch is refreshed per session, but only on a genuine entry — an
    // internal navigation has our own domain as the referrer and would
    // otherwise overwrite the real source with "consultico.co.uk".
    const isInternal = current.referrer?.includes(window.location.host) ?? false;
    if (!window.sessionStorage.getItem(LAST_TOUCH_KEY) || !isInternal) {
      if (!isInternal) {
        window.sessionStorage.setItem(LAST_TOUCH_KEY, JSON.stringify(current));
      }
    }
  } catch {
    // Same as above.
  }
}

function read(storage: Storage | undefined, key: string): AttributionData | undefined {
  try {
    const raw = storage?.getItem(key);
    return raw ? (JSON.parse(raw) as AttributionData) : undefined;
  } catch {
    return undefined;
  }
}

/**
 * Flattened for form submission and for the notification email, so a lead lands
 * in Paul's inbox already carrying where it came from rather than needing a
 * lookup in another tool.
 */
export function getAttribution(): Record<string, string> {
  if (typeof window === 'undefined') return {};

  const first = read(window.localStorage, FIRST_TOUCH_KEY);
  const last = read(window.sessionStorage, LAST_TOUCH_KEY);
  const out: Record<string, string> = {};

  for (const [key, value] of Object.entries(first ?? {})) {
    if (value) out[`first_${key}`] = String(value);
  }
  for (const [key, value] of Object.entries(last ?? {})) {
    if (value) out[`last_${key}`] = String(value);
  }

  return out;
}
