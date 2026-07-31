import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
    dirs: ['src/app', 'src/components', 'src/sections', 'src/hooks'],
  },
  trailingSlash: false,
  async headers() {
    return [
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
  async redirects() {
    return [
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
      { source: '/case-studies', destination: '/case-studies/boiler-co', permanent: true },
    ];
  },
};

export default nextConfig;
