import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
    dirs: ['src/app', 'src/components', 'src/sections', 'src/hooks'],
  },
  trailingSlash: false,
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
    ];
  },
};

export default nextConfig;
