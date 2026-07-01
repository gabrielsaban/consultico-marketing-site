import type { Metadata } from 'next';
import SeoIndustryRoute, { seoIndustryPageMetadata } from '@/components/services/SeoIndustryRoute';

const SLUG = 'seo-for-heating-engineers';

export const metadata: Metadata = seoIndustryPageMetadata(SLUG);

export default function SeoForHeatingEngineersPage() {
  return <SeoIndustryRoute slug={SLUG} />;
}
