import HeroSection from '@/components/HeroSection';
import MarketingIntro from './MarketingIntro';
// import KeywordSection from './KeywordSection';

export default function HomeSection() {
  return (
    <section id="home" className="min-h-screen">
      <HeroSection />
      <MarketingIntro />
      {/* <KeywordSection /> */}
    </section>
  );
}


