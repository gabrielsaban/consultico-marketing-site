import type { MetadataRoute } from 'next';
import { getAllArticles } from '@/lib/articles/loader';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.consultico.co.uk';
  const articles = getAllArticles();

  return [
    { url: base, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    {
      url: `${base}/think-first`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/articles`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...articles.map((article) => ({
      url: `${base}/articles/${article.slug}`,
      lastModified: new Date(article.updated ?? article.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
