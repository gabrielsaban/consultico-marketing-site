import HeroSection from '@/components/HeroSection';
import LoopSection from './LoopSection';
// import KeywordSection from './KeywordSection';

export default function HomeSection() {
  return (
    <section id="home">
      <HeroSection />
      <LoopSection />
      {/* The newsletter strip that sat here was moved out on 2026-11-23 (reader
          review: it interrupted the pitch). Signup lives in the footer, the
          articles index and every article. */}
      {/* <KeywordSection /> */}
    </section>
  );
}
