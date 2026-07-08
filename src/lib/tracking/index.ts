export { GTM_ID, GA_MEASUREMENT_ID } from './constants';
export {
  applyStoredConsentOnLoad,
  denyAnalyticsConsent,
  getStoredConsent,
  grantAnalyticsConsent,
  hasAnalyticsConsent,
} from './consent';
export { pushEvent } from './data-layer';
export { buildTrackingPayload, getAnalyticsClientId } from './client-id';
export {
  trackGenerateLead,
  trackOutboundClick,
  trackQuizComplete,
  trackServiceCta,
  trackSignUp,
} from './events';
export { captureUtmParamsFromUrl, getStoredUtmParams } from './utm';
export type { ConsentChoice, TrackingPayload, UtmParams } from './types';
