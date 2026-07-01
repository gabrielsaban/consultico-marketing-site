import type { Metadata } from 'next';
import SeoIndustryRoute, { seoIndustryPageMetadata } from '@/components/services/SeoIndustryRoute';

const SLUG = 'seo-for-electricians';

export const metadata: Metadata = seoIndustryPageMetadata(SLUG);

export default function SeoForElectriciansPage() {
  return <SeoIndustryRoute slug={SLUG} />;
}
