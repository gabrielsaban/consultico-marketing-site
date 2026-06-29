// ARCHIVED: Full projects content moved to archive/sections/ProjectsSocialProof_archived.tsx
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
      <div className="bg-brand-silk dark:bg-gray-950 shadow-[0_4px_20px_rgba(0,0,0,0.1)] py-16 md:py-20 lg:py-24">
        <Container className="mb-6 md:mb-8">
          <h2 className="text-[clamp(2rem,3vw,3.125rem)] font-bold text-brand-blue font-futura text-center mb-6">
            SEO for trades businesses in Glasgow and beyond
          </h2>
          <p className="text-[clamp(1rem,1.35vw,1.2rem)] leading-[1.6] text-gray-800 dark:text-gray-200 font-helvetica-light max-w-3xl mx-auto text-center">
            Our SEO for tradesmen work includes The Boiler Co — a Glasgow-area plumbing business that filled its calendar through organic search when paid ads had to pause. Impressions grew from approximately 6,000 to 21,000 per week over 14 months of retained work.
          </p>
        </Container>
        
        <ProjectCarousel />
      </div>
      
      {/* Stats Section - Lighter Grey Background with Shadow */}
      <div className="bg-gray-50 dark:bg-gray-900 shadow-[0_4px_20px_rgba(0,0,0,0.1)] py-16 md:py-20 lg:py-24">
        <Container className="mb-6 md:mb-8">
          <h2 className="text-[clamp(2rem,3vw,3.125rem)] font-bold text-brand-blue font-futura text-center">
            What our clients have achieved
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
