import type { Metadata } from 'next';
import SeoIndustryRoute, { seoIndustryPageMetadata } from '@/components/services/SeoIndustryRoute';

const SLUG = 'seo-for-dentists';

export const metadata: Metadata = seoIndustryPageMetadata(SLUG);

export default function SeoForDentistsPage() {
  return <SeoIndustryRoute slug={SLUG} />;
}
