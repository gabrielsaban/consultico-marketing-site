import 'server-only';

import { GA_MEASUREMENT_ID } from './constants';
import type { TrackingPayload } from './types';

type ServerGa4Event = {
  name: string;
  params?: Record<string, string | number>;
};

export async function sendGa4ServerEvent(
  tracking: TrackingPayload | undefined,
  event: ServerGa4Event,
) {
  if (!tracking?.consentGranted || !tracking.clientId) return;

  const apiSecret = process.env.GA4_API_SECRET?.trim();
  if (!apiSecret) return;

  const body = {
    client_id: tracking.clientId,
    events: [
      {
        name: event.name,
        params: {
          engagement_time_msec: '100',
          ...event.params,
        },
      },
    ],
  };

  try {
    await fetch(
      `https://www.google-analytics.com/mp/collect?measurement_id=${GA_MEASUREMENT_ID}&api_secret=${apiSecret}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        keepalive: true,
      },
    );
  } catch (error) {
    console.error('GA4 Measurement Protocol event failed:', error);
  }
}
