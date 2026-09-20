import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // Keep preview deployments out of the index.
  if (process.env.VERCEL_ENV !== 'production') {
    return { rules: [{ userAgent: '*', disallow: '/' }] };
  }

  // The private client-report area. Passcode-gated, never linked from the site,
  // and noindexed three ways over: this line, an X-Robots-Tag header on every
  // /r/ response, and a noindex meta tag inside each report.
  //
  // It is repeated in every group below, not just the wildcard one, because a
  // crawler obeys the most specific user-agent group that matches it and
  // ignores the rest. A disallow on `*` alone would exclude Googlebot and leave
  // GPTBot, PerplexityBot and ClaudeBot free to crawl — which is backwards,
  // since those are the ones most likely to repeat a client's private numbers
  // back to somebody else.
  const DISALLOW_REPORTS = '/r/';

  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: DISALLOW_REPORTS },
      { userAgent: 'GPTBot', allow: '/', disallow: DISALLOW_REPORTS },
      { userAgent: 'OAI-SearchBot', allow: '/', disallow: DISALLOW_REPORTS },
      { userAgent: 'PerplexityBot', allow: '/', disallow: DISALLOW_REPORTS },
      { userAgent: 'ClaudeBot', allow: '/', disallow: DISALLOW_REPORTS },
      { userAgent: 'anthropic-ai', allow: '/', disallow: DISALLOW_REPORTS },
      { userAgent: 'Google-Extended', allow: '/', disallow: DISALLOW_REPORTS },
      { userAgent: 'Applebot-Extended', allow: '/', disallow: DISALLOW_REPORTS },
    ],
    sitemap: 'https://www.consultico.co.uk/sitemap.xml',
    host: 'https://www.consultico.co.uk',
  };
}
