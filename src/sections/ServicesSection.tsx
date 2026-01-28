// ARCHIVED: Full services content moved to src/a_sections/ServicesSection_archived.tsx

import ServicesBubbleList from '@/components/ServicesBubbleList';
import Container from '@/components/Container';

export default function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-20 lg:py-24 scroll-mt-24">
      <Container className="mb-12">
        <h2 className="text-[clamp(1.75rem,3vw,3rem)] font-bold text-blue-primary mb-4 font-futura">
          Services built to work together
        </h2>
        <p className="text-[clamp(1rem,1.4vw,1.25rem)] leading-[1.6] text-gray-800 font-helvetica-light max-w-3xl">
          Every engagement starts with clarity. From strategy to execution, each service is designed to compound results, not operate in isolation.
        </p>
      </Container>
      <ServicesBubbleList />
    </section>
  );
}


