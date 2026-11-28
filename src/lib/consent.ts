'use client';

import { useSyncExternalStore } from 'react';

/**
 * Cookie and analytics consent.
 *
 * ── The rule ──
 * Nothing that tracks a visitor loads until they say yes: not PostHog (which
 * also means no session recording), not GA4, not Vercel Analytics or Speed
 * Insights, and no attribution written to their browser. Saying no and never
 * answering are treated exactly the same. UK PECR requires consent before
 * non-essential storage on someone's device, and "we had not asked yet" is not
 * consent.
 *
 * ── What is stored without asking ──
 * Only the answer itself, under CONSENT_KEY. Remembering that someone said no
 * is strictly necessary to honour it; the alternative is asking on every page.
 *
 * ── Why localStorage and not a cookie ──
 * The choice is only ever read in the browser. A cookie would be sent to the
 * server with every request for no reason.
 */
const CONSENT_KEY = 'consultico_consent';
const CHANGE_EVENT = 'consultico:consent-change';
const OPEN_EVENT = 'consultico:consent-open';

/**
 * 'unknown' is the server render and the first client render, before storage
 * has been read. Treat it as "no": nothing may load on 'unknown' or 'unset'.
 */
export type Consent = 'granted' | 'denied' | 'unset' | 'unknown';

export function readConsent(): Consent {
  if (typeof window === 'undefined') return 'unknown';
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === 'granted' || value === 'denied' ? value : 'unset';
  } catch {
    // Storage blocked (Safari private mode, locked-down browsers). We cannot
    // remember an answer, so the safe reading is that there is not one.
    return 'unset';
  }
}

/** True only when the visitor has actively accepted. */
export function hasConsent(): boolean {
  return readConsent() === 'granted';
}

export function setConsent(value: 'granted' | 'denied'): void {
  if (typeof window === 'undefined') return;

  const previous = readConsent();

  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // Cannot persist. The choice still applies to this page via the event
    // below; they will simply be asked again next visit.
  }

  if (value === 'denied') {
    // Clear on every "no", not only on withdrawal: anyone who visited before
    // the banner existed still has cookies from when we did not ask.
    clearTrackerStorage();

    if (previous === 'granted') {
      // Withdrawal. The trackers are already running in this page and none of
      // them can be cleanly unloaded, so reload into a page where they never
      // start.
      window.location.reload();
      return;
    }
  }

  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** Reopens the banner so a visitor can change their mind (footer link). */
export function openConsentSettings(): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function onConsentSettingsOpen(handler: () => void): () => void {
  window.addEventListener(OPEN_EVENT, handler);
  return () => window.removeEventListener(OPEN_EVENT, handler);
}

function subscribe(onChange: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, onChange);
  // Another tab changing the answer should apply here too.
  window.addEventListener('storage', onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener('storage', onChange);
  };
}

export function useConsent(): Consent {
  return useSyncExternalStore(subscribe, readConsent, () => 'unknown' as const);
}

/**
 * Removes what PostHog, GA4 and our own attribution left behind.
 *
 * Cookies are deleted against every domain they could have been set on,
 * because a cookie is only removed by an expiry that matches the domain it was
 * written with, and GA writes to the registrable domain, not the host.
 *
 * Also run on every page load where the answer is "no" (see CookieConsent).
 * On withdrawal the trackers are still alive until the reload finishes, and
 * both PostHog and GA write their cookie back on the way out; clearing once
 * more on the far side of the reload is what actually leaves the browser clean.
 */
export function clearTrackerStorage(): void {
  const isTrackerKey = (key: string) =>
    key.startsWith('ph_') ||
    key.startsWith('__ph') ||
    key.startsWith('_ga') ||
    key === 'consultico_first_touch' ||
    key === 'consultico_last_touch';

  for (const storage of [window.localStorage, window.sessionStorage]) {
    try {
      for (const key of Object.keys(storage)) {
        if (isTrackerKey(key)) storage.removeItem(key);
      }
    } catch {
      // Nothing to clear if storage is unavailable.
    }
  }

  try {
    const host = window.location.hostname;
    const parts = host.split('.');
    const domains = new Set<string>(['', host]);
    for (let i = 0; i < parts.length - 1; i += 1) {
      domains.add(`.${parts.slice(i).join('.')}`);
    }

    for (const cookie of document.cookie.split(';')) {
      const name = cookie.split('=')[0]?.trim();
      if (!name || !isTrackerKey(name)) continue;
      for (const domain of domains) {
        const domainPart = domain ? `; domain=${domain}` : '';
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domainPart}`;
      }
    }
  } catch {
    // Same.
  }
}
