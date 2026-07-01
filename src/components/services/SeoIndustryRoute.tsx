import type { Metadata } from 'next';
import SeoIndustryPage from '@/components/services/SeoIndustryPage';
import { getSeoIndustryPageData } from '@/lib/seo-industry-registry';
import { pageMeta } from '@/lib/seo';
import { seoIndustryPageJsonLd, serializeJsonLd } from '@/lib/schema';

/**
 * Shared route body for the six /seo-for-* pages. Next.js does not support
 * partial dynamic segments (e.g. `seo-for-[slug]`), so each industry keeps a
 * thin page.tsx that delegates here with its slug.
 */
export function seoIndustryPageMetadata(slug: string): Metadata {
  const data = getSeoIndustryPageData(slug);
  if (!data) {
    throw new Error(`Unknown SEO industry slug for metadata: ${slug}`);
  }
  return pageMeta({ ...data.metadata, absoluteTitle: true });
}

export default function SeoIndustryRoute({ slug }: { slug: string }) {
  const data = getSeoIndustryPageData(slug);
  if (!data) {
    throw new Error(`Unknown SEO industry slug: ${slug}`);
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(seoIndustryPageJsonLd(slug)) }}
      />
      <SeoIndustryPage data={data} />
    </>
  );
}
