import HeroSection from '@/components/HeroSection';
import MarketingIntro from './MarketingIntro';
import StatsCta from './StatsCta';
import KeywordSection from './KeywordSection';

export default function HomeSection() {
  return (
    <section id="home" className="min-h-screen">
      <HeroSection />
      <MarketingIntro />
      <StatsCta />
      <KeywordSection />
    </section>
  );
}


