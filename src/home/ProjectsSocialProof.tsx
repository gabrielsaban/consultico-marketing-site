// ARCHIVED: Full projects content moved to archive/sections/ProjectsSocialProof_archived.tsx
// StatsCta archived - replaced with StatsBoxes

import Link from 'next/link';
import ProjectCarousel from '@/components/ProjectCarousel';
import ReviewStrip from '@/components/ReviewStrip';
import StatsBoxes from '@/components/StatsBoxes';
import Container from '@/components/Container';

export default function ProjectsSocialProof() {
  return (
    <section id="projects" className="scroll-mt-24">
      {/* Projects Section - Grey Background with Shadow */}
      <div className="bg-brand-silk dark:bg-gray-950 shadow-[0_4px_20px_rgba(0,0,0,0.1)] py-16 md:py-20 lg:py-24">
        <Container className="mb-6 md:mb-8">
          <h2 className="text-[clamp(2rem,3vw,3.125rem)] font-bold text-brand-blue font-futura text-center mb-6">
            Results you can measure
          </h2>
          <p className="text-[clamp(1rem,1.35vw,1.2rem)] leading-[1.6] text-gray-800 dark:text-gray-200 font-helvetica-light max-w-3xl mx-auto text-center">
            Our{' '}
            <Link
              href="/seo-for-plumbers"
              className="font-medium text-brand-blue underline-offset-2 hover:underline"
            >
              SEO for tradesmen
            </Link>{' '}
            work includes{' '}
            <Link
              href="/case-studies/boiler-co"
              className="font-medium text-brand-blue underline-offset-2 hover:underline"
            >
              The Boiler Co
            </Link>
            , a Bristol-based plumbing business that filled its calendar through organic search within three months when paid ads had to pause. Over more than 14 months of retained work, weekly impressions grew from approximately 8,000 to a peak above 21,000.
          </p>
          {/*
            Norfolk Boards had ZERO inbound links from the homepage while Boiler
            Co had one, so the homepage was only ever evidence of half our work.
            The hub link matters as much as the study link: /case-studies is the
            URL a person or an engine tries first, and until now it redirected
            straight to Boiler Co and buried this one.
          */}
          <p className="mt-4 text-[clamp(1rem,1.35vw,1.2rem)] leading-[1.6] text-gray-800 dark:text-gray-200 font-helvetica-light max-w-3xl mx-auto text-center">
            On the strategy side,{' '}
            <Link
              href="/case-studies/norfolk-boards"
              className="font-medium text-brand-blue underline-offset-2 hover:underline"
            >
              Norfolk Boards
            </Link>{' '}
            is the one we are proudest of, because in December 2025 we told them to stop spending with us on
            search. Their two sites took 9,804 organic clicks over the following 12 months without us.{' '}
            <Link
              href="/case-studies"
              className="font-medium text-brand-blue underline-offset-2 hover:underline"
            >
              Read both case studies
            </Link>
            .
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

        <ReviewStrip />
      </div>
    </section>
  );
}
