import { UTM_STORAGE_KEY } from './constants';
import type { UtmParams } from './types';

const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
] as const;

export function captureUtmParamsFromUrl() {
  if (typeof window === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  const captured: UtmParams = {};

  for (const key of UTM_KEYS) {
    const value = params.get(key)?.trim();
    if (value) captured[key] = value;
  }

  if (Object.keys(captured).length === 0) return;

  try {
    sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(captured));
  } catch {
    // no-op
  }
}

export function getStoredUtmParams(): UtmParams {
  if (typeof window === 'undefined') return {};

  try {
    const raw = sessionStorage.getItem(UTM_STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as UtmParams;
  } catch {
    return {};
  }
}

export function getUtmEventParams(): Record<string, string> {
  const utm = getStoredUtmParams();
  const params: Record<string, string> = {};

  if (utm.utm_source) params.campaign_source = utm.utm_source;
  if (utm.utm_medium) params.campaign_medium = utm.utm_medium;
  if (utm.utm_campaign) params.campaign_name = utm.utm_campaign;
  if (utm.utm_term) params.campaign_term = utm.utm_term;
  if (utm.utm_content) params.campaign_content = utm.utm_content;

  return params;
}
