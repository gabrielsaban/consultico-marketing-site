import { trackGaEvent } from '@/lib/google-analytics';

/**
 * One call, both tools.
 *
 * GA4 and PostHog answer different questions — GA4 is the channel and
 * acquisition story, PostHog is what a person actually did — but they only stay
 * comparable if the same event fires to both with the same name and the same
 * properties. Two separate call sites is how they quietly drift until neither
 * number can be trusted, so everything goes through here.
 *
 * ⚠️ Event names are snake_case and must match what is configured as a key
 * event in GA4. Renaming one here without renaming it there silently breaks the
 * conversion report — the events keep arriving, they just stop counting.
 */
export type AnalyticsProps = Record<string, string | number | boolean>;

export function track(event: string, props?: AnalyticsProps) {
  trackGaEvent(event, props);

  if (typeof window === 'undefined') return;

  // Dynamic import so this never pulls posthog-js into a page's bundle just by
  // being imported — the provider already loads it lazily after hydration, and
  // this resolves to the same module instance.
  import('posthog-js')
    .then(({ default: posthog }) => {
      if (!posthog.__loaded) return;
      posthog.capture(event, props);
    })
    .catch(() => {
      // Analytics must never break the thing it is measuring.
    });
}

/**
 * Ties a known email to everything that person did before they gave it to us.
 *
 * This is the piece the 2026-09-08 monthly pass flagged as missing: the site
 * had no way to connect a signup back to the session that produced it, so
 * "where do leads actually come from" was unanswerable. Calling this on a
 * successful form submit is what makes that question answerable from now on.
 *
 * ⚠️ GA4 gets no email — sending PII to Google Analytics breaks their terms and
 * can get a property terminated. GA4 receives the event only; the identity
 * lives in PostHog, which is what person profiles are for.
 */
export function identify(email: string, props?: AnalyticsProps) {
  if (typeof window === 'undefined') return;

  import('posthog-js')
    .then(({ default: posthog }) => {
      if (!posthog.__loaded) return;
      posthog.identify(email, { email, ...props });
    })
    .catch(() => {
      // Same rule: never break the page for analytics.
    });
}
