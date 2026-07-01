import type { Metadata } from 'next';
import SeoIndustryRoute, { seoIndustryPageMetadata } from '@/components/services/SeoIndustryRoute';

const SLUG = 'seo-for-plumbers';

export const metadata: Metadata = seoIndustryPageMetadata(SLUG);

export default function SeoForPlumbersPage() {
  return <SeoIndustryRoute slug={SLUG} />;
}
