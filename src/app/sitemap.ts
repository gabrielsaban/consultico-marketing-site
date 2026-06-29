import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.consultico.co.uk';
  return [
    { url: base, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    {
      url: `${base}/think-first`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}
