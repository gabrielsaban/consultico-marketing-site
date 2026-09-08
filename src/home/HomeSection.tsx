import HeroSection from '@/components/HeroSection';
import MarketingIntro from './MarketingIntro';
import RoadmapSignup from '@/components/RoadmapSignup';
import ThinkFirstSection from './ThinkFirstSection';
// import KeywordSection from './KeywordSection';

export default function HomeSection() {
  return (
    <section id="home">
      <HeroSection />
      <MarketingIntro />
      {/*
        Placement is deliberate, and it is the second most important decision
        here after the offer itself.

        It sits directly after MarketingIntro because that is the first moment
        on the page where the reader has a REASON to hand over an email — they
        have just been told they have a strategy problem, and MarketingIntro's
        only CTA is "book a free call", which is a high-friction ask. A free
        roadmap is the low-friction answer to the problem just described, for
        the large majority who are not ready to put time in a calendar, and it
        catches them at the point of highest interest rather than after they
        have scrolled past three more sections.

        Not directly under the hero: the hero is one full viewport with a single
        clear CTA, and interrupting it with a form before we have made any
        argument is what makes an email capture read as a toll gate.
      */}
      <RoadmapSignup source="homepage" />
      <ThinkFirstSection />
      {/* <KeywordSection /> */}
    </section>
  );
}


