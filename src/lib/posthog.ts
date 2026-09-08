/**
 * PostHog configuration.
 *
 * The project API key is PUBLIC by design — PostHog documents it as safe to
 * expose, and it ships in the page HTML on every request whatever we do, so
 * there is nothing to protect by hiding it. It lives in an env var anyway so a
 * staging deploy can point at a different project instead of polluting the real
 * one, with the live value as the fallback so the site works without config.
 *
 * ⚠️ EU host, deliberately. `eu.i.posthog.com` keeps analytics data in the EU,
 * which is the answer we want on hand if a client ever asks where their
 * visitors' data goes. Do not switch it to the US host without deciding that
 * on purpose.
 */
export const POSTHOG_KEY =
  process.env.NEXT_PUBLIC_POSTHOG_KEY ?? 'phc_ncRjdZZxJHKmEutTNJ23FUwoAqeU66Rcsa6gs2rxWfX2';

export const POSTHOG_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://eu.i.posthog.com';
