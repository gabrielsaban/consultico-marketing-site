import { CONSENT_STORAGE_KEY } from './constants';
import type { ConsentChoice } from './types';

function updateGtagConsent(granted: boolean) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  window.gtag('consent', 'update', {
    analytics_storage: granted ? 'granted' : 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
}

export function getStoredConsent(): ConsentChoice {
  if (typeof window === 'undefined') return 'unset';

  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (stored === 'granted' || stored === 'denied') return stored;
  } catch {
    // no-op
  }

  return 'unset';
}

export function hasAnalyticsConsent(): boolean {
  return getStoredConsent() === 'granted';
}

export function grantAnalyticsConsent() {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, 'granted');
  } catch {
    // no-op
  }

  updateGtagConsent(true);
}

export function denyAnalyticsConsent() {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, 'denied');
  } catch {
    // no-op
  }

  updateGtagConsent(false);
}

export function applyStoredConsentOnLoad() {
  if (getStoredConsent() === 'granted') {
    updateGtagConsent(true);
  }
}
