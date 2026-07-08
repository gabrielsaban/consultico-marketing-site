export { GA_MEASUREMENT_ID } from '@/lib/tracking/constants';
import { pushEvent } from '@/lib/tracking/data-layer';

/** Fire a custom GA4/dataLayer event. */
export function trackGaEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>,
) {
  pushEvent({ event: eventName, ...params });
}
