import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const site = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.consultico.example'
  const now = new Date().toISOString()
  const entries: MetadataRoute.Sitemap = [
    { url: `${site}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${site}/landing`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  ]
  return entries
}


