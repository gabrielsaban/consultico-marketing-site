import HeroSection from '@/components/HeroSection';
import HeroHeadline from './HeroHeadline';
import MarketingIntro from './MarketingIntro';
import ThinkFirstSection from './ThinkFirstSection';

export default function HomeSection() {
  return (
    <section id="home">
      <HeroSection headline={<HeroHeadline />} />
      <MarketingIntro />
      <ThinkFirstSection />
    </section>
  );
}
