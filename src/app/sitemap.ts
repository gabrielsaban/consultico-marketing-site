import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const site = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.consultico.example'
  const now = new Date().toISOString()
  const routes = [
    '/',
    '/market-strategy',
    '/branding',
    '/content-creation',
    '/seo',
    '/web-development',
    '/social-media',
    '/think-first',
    '/careers',
  ]
  const entries: MetadataRoute.Sitemap = routes.map((route): MetadataRoute.Sitemap[number] => ({
      url: `${site}${route}`,
      lastModified: now,
      changeFrequency: route === '/' ? 'weekly' : 'monthly',
      priority: route === '/' ? 1 : 0.5,
    }))
  return entries
}
