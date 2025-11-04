// ARCHIVED: Full projects content moved to src/a_sections/ProjectsSocialProof_archived.tsx
// StatsCta archived - replaced with StatsBoxes

// import StatsCta from './StatsCta';
import ProjectCarousel from '@/components/ProjectCarousel';
import StatsBoxes from '@/components/StatsBoxes';
import ReviewsCarousel from '@/components/ReviewsCarousel';

export default function ProjectsSocialProof() {
  return (
    <section id="projects" className="min-h-screen mt-10 scroll-mt-24">
      {/* Projects Header Banner */}
      <div className="bg-brand-silk py-10 md:py-10 px-6 sm:px-12 lg:px-16 xl:px-36 rounded-tl-[140px] rounded-br-[140px]">
        <h2 className="text-[32px] sm:text-[40px] md:text-[44px] lg:text-[50px] font-bold text-brand-blue font-futura text-center">
          See for yourself? See our past work!
        </h2>
      </div>
      
      <ProjectCarousel />
      
      {/* Stats Introduction Heading */}
      <div className="pt-20 pl-[7.5rem] pr-[7.5rem] pb-8">
        <h2 className="text-[32px] sm:text-[40px] md:text-[44px] lg:text-[50px] font-bold text-brand-blue font-futura text-left">
          For previous clients, we&apos;ve achieved...
        </h2>
      </div>
      
      <StatsBoxes />
      
      {/* Reviews Section */}
      <ReviewsCarousel />
    </section>
  );
}


