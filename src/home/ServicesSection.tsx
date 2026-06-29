// ARCHIVED: Full services content moved to archive/sections/ServicesSection_archived.tsx

import ServicesBubbleList from '@/components/ServicesBubbleList';
import Container from '@/components/Container';

export default function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-20 lg:py-24 scroll-mt-24">
      <Container className="mb-12">
        <h2 className="text-[clamp(1.75rem,3vw,3rem)] font-bold text-blue-primary mb-4 font-futura">
          What does a Glasgow digital marketing agency actually deliver?
        </h2>
        <p className="text-[clamp(1rem,1.4vw,1.25rem)] leading-[1.6] text-gray-800 dark:text-gray-200 font-helvetica-light max-w-3xl">
          Consultico is a Glasgow consultancy offering SEO, web design, PPC, content, and generative engine optimisation (GEO) — optimising your brand for Google and AI search. Every service compounds from the same strategy, so channels reinforce each other instead of competing for budget.
        </p>
      </Container>
      <ServicesBubbleList />
    </section>
  );
}
