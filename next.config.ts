import type { NextConfig } from 'next';

// What the site actually loads: GA4 via @next/third-parties, PostHog EU,
// Vercel Analytics/Speed Insights, local fonts, a Google Maps iframe on
// /seo-glasgow, and video embeds in client reports.
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://eu-assets.i.posthog.com https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.googletagmanager.com https://*.google-analytics.com https://www.google.com https://maps.gstatic.com",
  "font-src 'self' data:",
  "connect-src 'self' https://eu.i.posthog.com https://eu-assets.i.posthog.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://vitals.vercel-insights.com",
  "frame-src https://www.google.com https://www.youtube-nocookie.com https://player.vimeo.com https://player.mux.com https://api.leadconnectorhq.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join('; ');

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
    dirs: ['src/app', 'src/components', 'src/sections', 'src/hooks'],
  },
  trailingSlash: false,
  // PostHog's endpoints end in a slash (/e/, /flags/). Left alone, Next
  // answers each one with a 308 to the slashless URL before the rewrite below
  // ever sees it — an extra round trip on every event, and a real risk of
  // losing the $pageleave beacon sent as a tab closes. This turns that
  // automatic redirect off for the whole site, so the first entry in
  // redirects() puts it back for every path except the proxy.
  skipTrailingSlashRedirect: true,
  // The article loader reads content/articles at request time (see
  // src/lib/articles/loader.ts). Next traces a route's file dependencies
  // statically, and a path built with path.join(process.cwd(), ...) is
  // invisible to that tracer, so the markdown is only bundled into a route's
  // serverless function when something else pulls it in at build time.
  //
  // /articles and /articles/[slug] get it for free because they read the
  // files while prerendering. /sitemap.xml did not: it rendered correctly at
  // build, then dropped every article on its first hourly revalidation,
  // because the function had no content/ directory to read. Declaring the
  // dependency explicitly is what keeps a scheduled article able to add
  // itself to the sitemap on its publish day.
  outputFileTracingIncludes: {
    '/sitemap.xml': ['./content/articles/**/*.md'],
    '/llms.txt': ['./content/articles/**/*.md'],
    '/articles': ['./content/articles/**/*.md'],
    '/articles/[slug]': ['./content/articles/**/*.md'],
    // Same trap as the articles above, and it would bite harder here. The
    // sealed client reports in content/reports are read at request time through
    // a path built with process.cwd(), which the tracer cannot see. Unlike
    // /articles, these routes never prerender — they are force-dynamic — so
    // nothing reads the directory at build time either. Without these two lines
    // the functions deploy with no content/reports at all, and every report
    // 404s in production while working perfectly on localhost.
    '/r/[slug]': ['./content/reports/**/*.enc'],
    '/r/[slug]/doc': ['./content/reports/**/*.enc'],
    '/r/[slug]/progress': ['./content/reports/**/*.enc'],
    '/r/[slug]/plan': ['./content/reports/**/*.enc'],
    '/r/[slug]/resources': ['./content/reports/**/*.enc'],
    '/r/[slug]/unlock': ['./content/reports/**/*.enc'],
  },
  async headers() {
    return [
      {
        // Baseline security headers for every page. Later, more specific
        // entries (e.g. /r/* with Referrer-Policy: no-referrer) override these.
        // The CSP ships as Report-Only first: violations show in the browser
        // console without blocking anything. Switch the key to
        // Content-Security-Policy once a week of browsing shows it clean.
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy-Report-Only', value: CSP },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
          },
        ],
      },
      {
        // The private client-report area. The old /r/<slug> route handler set
        // these inline on every response; a React page cannot, so they move
        // here — and this way they also cover the unlock page, which
        // previously had none of them, and /doc.
        //
        // no-store rather than merely private: a client report should not sit
        // in a shared proxy, a CDN, or the back/forward cache of a borrowed
        // laptop. no-referrer matters more than it looks — without it, any
        // video embedded in a report would hand the report's URL to YouTube in
        // the Referer header.
        source: '/r/:path*',
        headers: [
          { key: 'Cache-Control', value: 'private, no-store, max-age=0, must-revalidate' },
          { key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' },
          { key: 'Referrer-Policy', value: 'no-referrer' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
        ],
      },
      {
        // Retired articles. The file has been moved out of content/articles so
        // the route 404s, which is the signal that actually removes a URL from
        // the index. This header rides along on that response so the page is
        // explicitly non-indexable for anything that reaches it before the
        // 404 is recrawled, including AI crawlers that treat a 404 loosely.
        source: '/articles/eight-search-console-accounts-click-through-rate',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noarchive, nosnippet',
          },
        ],
      },
      {
        // Files in /public are not fingerprinted, so Next serves them with
        // "max-age=0, must-revalidate" by default. That means a round trip for
        // every static image on every page view. A week of caching with
        // stale-while-revalidate keeps them fast without making updates
        // impossible to roll out.
        source: '/:path*.(jpg|jpeg|png|webp|avif|gif|svg|ico|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
  async rewrites() {
    // Reverse proxy for PostHog (EU). The path must match POSTHOG_PROXY_PATH
    // in src/lib/posthog.ts. Order matters: the two asset rules have to come
    // before the catch-all or the SDK's own scripts get sent to the ingestion
    // host and 404.
    return [
      { source: '/relay/static/:path*', destination: 'https://eu-assets.i.posthog.com/static/:path*' },
      { source: '/relay/array/:path*', destination: 'https://eu-assets.i.posthog.com/array/:path*' },
      { source: '/relay/:path*', destination: 'https://eu.i.posthog.com/:path*' },
    ];
  },
  async redirects() {
    return [
      {
        // Replaces the trailing-slash redirect that skipTrailingSlashRedirect
        // switches off above: /seo/ still goes to /seo, so there is never a
        // second indexable URL for a page. Everything under /relay is left
        // alone because PostHog needs its slashes.
        source: '/:path((?!relay/).+)/',
        destination: '/:path',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'consultico.co.uk' }],
        destination: 'https://www.consultico.co.uk/:path*',
        permanent: true,
      },
      { source: '/branding', destination: '/ppc', permanent: true },
      { source: '/home', destination: '/', permanent: true },
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/think_first', destination: '/think-first', permanent: true },
      { source: '/think-first-workshop', destination: '/think-first', permanent: true },
      { source: '/services', destination: '/#services', permanent: true },
      { source: '/about', destination: '/#about', permanent: true },
      { source: '/projects', destination: '/#projects', permanent: true },
      { source: '/blog', destination: '/articles', permanent: true },
      // Wix blog migration — expand from GSC export as more /post/* URLs are identified
      {
        source: '/post/best-ppc-agencies-for-your-company',
        destination: '/articles/best-ppc-agencies-uk',
        permanent: true,
      },
      { source: '/marketing', destination: '/', permanent: true },
      { source: '/digital-marketing', destination: '/', permanent: true },
      // Legacy URLs still holding GSC impressions but 404ing (found in the
      // 2026-07-31 sitemap/redirect sweep).
      { source: '/about/services', destination: '/#services', permanent: true },
      { source: '/terms-conditions-and-privacy', destination: '/terms', permanent: true },
      { source: '/privacy-policy', destination: '/privacy', permanent: true },
      // Legacy Wix URL. It carries no GSC impressions, so on traffic alone it
      // would not be worth a redirect — but the 2026-09-08 AI-citation run
      // found an engine using it as one of its sources when answering "is
      // consultico a good marketing agency". A 404 in the source set for a
      // question about whether we are any good is worth a line of config.
      { source: '/seo-agency', destination: '/seo', permanent: true },
      // Never a real URL on this site, but Search Console shows it earning
      // impressions (2026-09-16 to 09-18, position 1.7, "best ppc agency
      // london") and returning a 404. Something out there links to it as if it
      // were the PPC agencies guide, so send it there.
      { source: '/articles/best-agencies-uk', destination: '/articles/best-ppc-agencies-uk', permanent: true },
      { source: '/articles/six-identical-pages-different-results', destination: '/seo-by-industry', permanent: true },
      // 2026-10-31: case study anonymised, slug no longer carries the name.
      { source: '/case-studies/boiler-co', destination: '/case-studies/boiler-installation-company', permanent: true },
    ];
  },
};

export default nextConfig;
