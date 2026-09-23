/**
 * Client-side analytics for the report area.
 *
 * Deliberately NOT src/lib/analytics.ts's track(). That helper fires to GA4 as
 * well as PostHog, and this property's GA4 key events are configured for
 * marketing conversions — report reading activity would pollute exactly the
 * reports that decide where budget goes.
 *
 * What is never sent: the client's name, the access code, report content of
 * any kind. Section and resource *ids*, never their titles. The slug is an
 * opaque token and is the only identifier.
 */

type ReportEvent =
  | 'report_section_opened'
  | 'report_resource_opened'
  | 'report_task_toggled'
  | 'report_progress_milestone';

export function trackReport(event: ReportEvent, props: Record<string, string | number | boolean>) {
  if (typeof window === 'undefined') return;

  // Dynamic import so posthog-js is never pulled into a report's bundle just
  // by importing this module — the same pattern src/lib/analytics.ts uses.
  import('posthog-js')
    .then(({ default: posthog }) => {
      if (!posthog.__loaded) return;
      posthog.capture(event, props);
    })
    .catch(() => {
      // Analytics is never worth breaking a client's report over.
    });
}
