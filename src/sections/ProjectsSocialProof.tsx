// ARCHIVED: Full projects content moved to src/a_sections/ProjectsSocialProof_archived.tsx
// StatsCta archived - replaced with StatsBoxes

// import StatsCta from './StatsCta';
import ProjectCarousel from '@/components/ProjectCarousel';
import StatsBoxes from '@/components/StatsBoxes';
import ReviewsCarousel from '@/components/ReviewsCarousel';
import Container from '@/components/Container';

export default function ProjectsSocialProof() {
  return (
    <section id="projects" className="scroll-mt-24">
      {/* Projects Section - Grey Background with Shadow */}
      <div className="bg-brand-silk shadow-[0_4px_20px_rgba(0,0,0,0.1)] py-16 md:py-20 lg:py-24">
        <Container className="mb-6 md:mb-8">
          <h2 className="text-[clamp(2rem,3vw,3.125rem)] font-bold text-brand-blue font-futura text-center">
            See our past work
          </h2>
        </Container>
        
        <ProjectCarousel />
      </div>
      
      {/* Stats Section - Lighter Grey Background with Shadow */}
      <div className="bg-gray-50 shadow-[0_4px_20px_rgba(0,0,0,0.1)] py-16 md:py-20 lg:py-24">
        <Container className="mb-6 md:mb-8">
          <h2 className="text-[clamp(2rem,3vw,3.125rem)] font-bold text-brand-blue font-futura text-center">
            What we've achieved
          </h2>
        </Container>
        
        <StatsBoxes />
        
        {/* Reviews Section */}
        <div className="mt-16 md:mt-20 lg:mt-24">
          <ReviewsCarousel />
        </div>
      </div>
    </section>
  );
}


