import type { Metadata } from 'next';
import ServicePageJsonLd from '@/components/ServicePageJsonLd';
import SeoDiscoveryChannels from '@/components/seo-landing/SeoDiscoveryChannels';
import SeoDiscoveryContact from '@/components/seo-landing/SeoDiscoveryContact';
import SeoDiscoveryHero from '@/components/seo-landing/SeoDiscoveryHero';
import SeoDiscoveryQuote from '@/components/seo-landing/SeoDiscoveryQuote';
import SeoDiscoveryStats from '@/components/seo-landing/SeoDiscoveryStats';
import SeoDiscoveryStories from '@/components/seo-landing/SeoDiscoveryStories';
import { servicePageMeta } from '@/lib/seo';

export const metadata: Metadata = servicePageMeta('seo');

export default function SeoPage() {
  return (
    <>
      <ServicePageJsonLd pageKey="seo" />
      <main className="relative bg-white dark:bg-gray-950" id="main-content">
        <SeoDiscoveryHero />
        <SeoDiscoveryStats />
        <SeoDiscoveryChannels />
        <SeoDiscoveryStories />
        <SeoDiscoveryQuote />
        <SeoDiscoveryContact />
      </main>
    </>
  );
}
