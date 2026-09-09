'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { captureAttribution } from '@/lib/attribution';
import { POSTHOG_HOST, POSTHOG_KEY } from '@/lib/posthog';

/**
 * Initialises PostHog and keeps pageviews correct under App Router navigation.
 *
 * ── Why a dynamic import rather than a top-level one ──
 * posthog-js is ~60KB. A static import puts it in the main client bundle, on
 * the critical path, on a homepage whose mobile LCP is already 6.7s (measured
 * 2026-09-08). Importing it inside the effect puts it in its own chunk that
 * loads after hydration, so analytics costs the first paint nothing. Analytics
 * that slows the page it is measuring is a bad trade.
 *
 * ── Why pageviews are captured manually ──
 * App Router navigations do not reload the page, so a naive setup records the
 * first URL a visitor lands on and nothing after it — every journey looks like
 * a single-page bounce. `capture_pageview: false` plus the effect below means
 * one pageview per actual route change. It is set explicitly rather than left
 * to the `defaults` string so a future posthog-js release cannot quietly change
 * the behaviour underneath us.
 */
export default function PostHogProvider() {
  // Deliberately NOT useSearchParams(): it opts every statically rendered page
  // into dynamic rendering (and fails the build without a Suspense boundary),
  // which is a heavy price for query strings this site barely uses. Reading
  // window.location in the effect gives the same URL with none of that.
  const pathname = usePathname();

  // Init once.
  useEffect(() => {
    let cancelled = false;

    // Runs BEFORE the PostHog import resolves and independently of it, because
    // first-touch attribution has to survive an ad blocker killing analytics.
    // It is plain localStorage — no network, nothing to block.
    captureAttribution();

    import('posthog-js')
      .then(({ default: posthog }) => {
        if (cancelled || posthog.__loaded) return;

        posthog.init(POSTHOG_KEY, {
          api_host: POSTHOG_HOST,
          defaults: '2026-05-30',
          // Only build person profiles for people we actually identify, so an
          // anonymous reader does not become a stored profile. Cheaper, and a
          // smaller answer to give if anyone asks what we retain.
          person_profiles: 'identified_only',
          capture_pageview: false,
          // We do not run PostHog surveys and have never created one, but the
          // SDK fetches surveys.js (33KB) at runtime regardless. Measured on the
          // live homepage 2026-09-09, where analytics accounted for 271KB of the
          // 582KB of JavaScript on the page. Turn this back on the day we
          // actually build a survey, not before.
          disable_surveys: true,
        });
      })
      .catch((error: unknown) => {
        // Never let a blocked or failed analytics load take the page with it.
        console.error('PostHog failed to load:', error);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // One pageview per route change, including the first.
  useEffect(() => {
    if (!pathname) return;

    import('posthog-js')
      .then(({ default: posthog }) => {
        if (!posthog.__loaded) return;

        posthog.capture('$pageview', { $current_url: window.location.href });
      })
      .catch(() => {
        // Already logged on init; a missed pageview is not worth a second error.
      });
  }, [pathname]);

  return null;
}
