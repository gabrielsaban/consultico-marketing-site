import type { Metadata } from 'next';
import SeoIndustryRoute, { seoIndustryPageMetadata } from '@/components/services/SeoIndustryRoute';

const SLUG = 'seo-for-accountants';

export const metadata: Metadata = seoIndustryPageMetadata(SLUG);

export default function SeoForAccountantsPage() {
  return <SeoIndustryRoute slug={SLUG} />;
}
