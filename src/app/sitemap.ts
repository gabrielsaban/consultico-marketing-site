import type { MetadataRoute } from 'next';
import { getAllArticles } from '@/lib/articles/loader';
import { getSeoIndustrySitemapRoutes } from '@/lib/seo-industries';
import { getCaseStudyPaths } from '@/lib/case-studies';

// Articles can be scheduled with a future `date` (see src/lib/articles/loader.ts).
// Revalidate hourly so a scheduled article appears on its publish day without a rebuild.
export const revalidate = 3600;


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
  // Case studies were priority 0.4, below the privacy policy's neighbours and
  // level with a placeholder. They are the proof surface an AI engine looks for
  // when asked whether we are any good, so they are no longer an afterthought.
  { path: '/case-studies', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/sponsored-placements', priority: 0.4, changeFrequency: 'yearly' },
  { path: '/research-participants', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles();
  const industryRoutes = getSeoIndustrySitemapRoutes();

  return [
    // No lastModified on these routes, deliberately. It used to be `new Date()`,
    // which combined with this route's hourly revalidate meant every money page
    // claimed to have changed minutes ago, every hour, forever. Google only uses
    // lastmod while it stays accurate and discounts it once it doesn't, so we were
    // spending the signal on a lie. Omitting it lets Google fall back to its own
    // crawl scheduling, which is strictly better than being ignored for cause.
    // Articles below keep a real date because theirs is genuinely accurate.
    ...STATIC_ROUTES.map((route) => ({
      url: `${BASE}${route.path}`,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    // Read from the registry so a new case study cannot be added to the site
    // and quietly left out of the sitemap.
    ...getCaseStudyPaths().map((path) => ({
      url: `${BASE}${path}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...industryRoutes.map((route) => ({
      url: `${BASE}${route.path}`,
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
