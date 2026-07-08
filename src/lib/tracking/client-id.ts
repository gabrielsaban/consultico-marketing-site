import { ANALYTICS_CLIENT_ID_KEY } from './constants';
import { hasAnalyticsConsent } from './consent';
import { getStoredUtmParams } from './utm';
import type { TrackingPayload } from './types';

function readGaCookieClientId(): string | null {
  if (typeof document === 'undefined') return null;

  const match = document.cookie.match(/(?:^|;\s*)_ga=GA\d+\.\d+\.([^;]+)/);
  return match?.[1] ?? null;
}

function getOrCreateFallbackClientId(): string {
  try {
    const existing = sessionStorage.getItem(ANALYTICS_CLIENT_ID_KEY);
    if (existing) return existing;

    const created = `${Date.now()}.${Math.random().toString(36).slice(2, 11)}`;
    sessionStorage.setItem(ANALYTICS_CLIENT_ID_KEY, created);
    return created;
  } catch {
    return `${Date.now()}.${Math.random().toString(36).slice(2, 11)}`;
  }
}

export function getAnalyticsClientId(): string {
  const gaClientId = readGaCookieClientId();
  if (gaClientId) return gaClientId;
  return getOrCreateFallbackClientId();
}

export function buildTrackingPayload(interest?: string): TrackingPayload {
  const pagePath =
    typeof window !== 'undefined' ? window.location.pathname + window.location.search : undefined;

  return {
    clientId: getAnalyticsClientId(),
    consentGranted: hasAnalyticsConsent(),
    pagePath,
    interest,
    utm: getStoredUtmParams(),
  };
}
