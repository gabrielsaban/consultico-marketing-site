import HeroSection from '@/components/HeroSection';
import MarketingIntro from './MarketingIntro';
import ThinkFirstSection from './ThinkFirstSection';
// import KeywordSection from './KeywordSection';

export default function HomeSection() {
  return (
    <section id="home">
      <HeroSection />
      <MarketingIntro />
      <ThinkFirstSection />
      {/* <KeywordSection /> */}
    </section>
  );
}


