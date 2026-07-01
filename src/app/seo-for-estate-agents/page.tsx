import type { Metadata } from 'next';
import SeoIndustryRoute, { seoIndustryPageMetadata } from '@/components/services/SeoIndustryRoute';

const SLUG = 'seo-for-estate-agents';

export const metadata: Metadata = seoIndustryPageMetadata(SLUG);

export default function SeoForEstateAgentsPage() {
  return <SeoIndustryRoute slug={SLUG} />;
}
