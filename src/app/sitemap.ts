import type { MetadataRoute } from 'next';
import { getAllArticles } from '@/lib/articles/loader';
import { getSeoIndustrySitemapRoutes } from '@/lib/seo-industries';

const BASE = 'https://www.consultico.co.uk';

const STATIC_ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[0]['changeFrequency'] }[] = [
  { path: '', priority: 1, changeFrequency: 'monthly' },
  { path: '/think-first', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/seo', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/seo-glasgow', priority: 0.75, changeFrequency: 'monthly' },
  { path: '/ppc', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/web-development', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/content-creation', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/market-strategy', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/campaign-management', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/careers', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/articles', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/contact', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/case-studies/boiler-co', priority: 0.4, changeFrequency: 'monthly' },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles();
  const industryRoutes = getSeoIndustrySitemapRoutes();

  return [
    ...STATIC_ROUTES.map((route) => ({
      url: `${BASE}${route.path}`,
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...industryRoutes.map((route) => ({
      url: `${BASE}${route.path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: route.priority,
    })),
    ...articles.map((article) => ({
      url: `${BASE}/articles/${article.slug}`,
      lastModified: new Date(article.updated ?? article.date),
      changeFrequency: 'monthly' as const,
      priority: article.slug === 'best-ppc-agencies-uk' ? 0.85 : 0.7,
    })),
  ];
}
