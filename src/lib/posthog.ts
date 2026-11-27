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

/**
 * Browser traffic goes through our own domain, not straight to PostHog.
 *
 * Ad blockers and privacy extensions block requests to *.posthog.com by host
 * name, so a direct setup silently loses those visitors — PostHog's own
 * estimate is 10-30% of events. The rewrites in next.config.ts forward this
 * path to the EU hosts above, so the data still lands in the EU.
 *
 * ⚠️ Browser only. Server-side capture (lib/reports/telemetry.ts) keeps using
 * POSTHOG_HOST: a relative path means nothing on the server, and nothing
 * blocks a server-to-server request anyway.
 *
 * ⚠️ The name is deliberately bland. PostHog's docs warn that blockers match
 * obvious paths like /analytics, /tracking or /posthog. If this is renamed,
 * rename the rewrites and the trailing-slash redirect in next.config.ts too.
 */
export const POSTHOG_PROXY_PATH = '/relay';

/** Where "view in PostHog" links and the toolbar point, since api_host is now ours. */
export const POSTHOG_UI_HOST = 'https://eu.posthog.com';
