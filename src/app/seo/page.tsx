import type { Metadata } from 'next';
import Container from '@/components/Container';
import FaqSection from '@/components/FaqSection';
import ServicePageJsonLd from '@/components/ServicePageJsonLd';
import SeoDiscoveryChannels from '@/components/seo-landing/SeoDiscoveryChannels';
import SeoDiscoveryContact from '@/components/seo-landing/SeoDiscoveryContact';
import SeoDiscoveryHero from '@/components/seo-landing/SeoDiscoveryHero';
import SeoDiscoveryQuote from '@/components/seo-landing/SeoDiscoveryQuote';
import SeoDiscoveryStats from '@/components/seo-landing/SeoDiscoveryStats';
import SeoDiscoveryStories from '@/components/seo-landing/SeoDiscoveryStories';
import { servicePageMeta } from '@/lib/seo';
import { SERVICE_FAQS } from '@/lib/service-faqs';

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
        {/* Kept deliberately compact: closed accordions, so the page stays
            design-led while the questions (and the FAQPage schema) remain in
            the HTML for search engines and AI assistants. */}
        <Container maxWidth="1280px">
          <FaqSection faqs={SERVICE_FAQS.seo} />
        </Container>
      </main>
    </>
  );
}
