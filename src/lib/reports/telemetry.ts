import 'server-only';
import { after } from 'next/server';
import { POSTHOG_HOST, POSTHOG_KEY } from '@/lib/posthog';

/**
 * Server-side capture for the private report area.
 *
 * WHY SERVER-SIDE. "Did the client open the report" is the one question worth
 * answering reliably, and a client-side event cannot answer it: an ad blocker,
 * a corporate proxy or a mail-app webview will drop it, and silence would be
 * indistinguishable from never opening the link. This fires from the server, so
 * nothing on the client can suppress it.
 *
 * It runs inside after(), so the capture happens once the response has been
 * sent. A slow or failed analytics request must never delay a client opening
 * their report, and must never fail the request.
 *
 * WHAT IS DELIBERATELY NOT RECORDED
 *
 * No client name, no email, no phone, no report content. The slug is the only
 * identifier and it is an opaque token. The submitted passcode is never touched
 * here — the unlock route never passes it on, and nothing in this file could
 * receive it.
 *
 * The distinct_id must never be derived from the content key or the cookie
 * value. Those are key material; hashing them into a third-party analytics
 * product would leak their existence and their uniqueness. The slug is already
 * the right granularity for "which report", and per-device identity, if it is
 * ever wanted, belongs in a separate random non-secret cookie.
 */

type ReportOpened = {
  slug: string;
  payload: 'html' | 'json';
};

export function captureReportOpened({ slug, payload }: ReportOpened): void {
  capture('report_opened', slug, { payload });
}

function capture(event: string, slug: string, properties: Record<string, unknown>): void {
  // Production only. The PostHog key is a hardcoded fallback in lib/posthog.ts,
  // so without this every local `npm run dev` and every preview deploy would
  // write real report_opened events into the live project — and "did the client
  // open it" is a question we need to be able to trust. Mirrors the same guard
  // in src/app/robots.ts.
  if (process.env.VERCEL_ENV !== 'production') {
    console.info(`Report telemetry (skipped, not production): ${event} ${slug}`);
    return;
  }

  after(async () => {
    try {
      await fetch(`${POSTHOG_HOST}/capture/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: POSTHOG_KEY,
          event,
          // One identity per report, not per person. See the note above.
          distinct_id: `report:${slug}`,
          properties: {
            ...properties,
            slug,
            // Server events ignore the client-side `person_profiles:
            // 'identified_only'` setting in PostHogProvider. Without this every
            // report reader would get a person profile, quietly reversing the
            // posture set there.
            $process_person_profile: false,
          },
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (error) {
      // Analytics is never worth an error a client can see, or a log line that
      // looks like a fault. A dropped event is an acceptable loss.
      console.warn(`Report telemetry: ${event} for ${slug} was not delivered.`, error);
    }
  });
}
