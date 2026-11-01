// ARCHIVED: Full projects content moved to archive/sections/ProjectsSocialProof_archived.tsx
// StatsCta archived - replaced with StatsBoxes

import Link from 'next/link';
import ProjectCarousel from '@/components/ProjectCarousel';
import ReviewStrip from '@/components/ReviewStrip';
import StatsBoxes from '@/components/StatsBoxes';
import Container from '@/components/Container';
import { CASE_STUDIES } from '@/lib/case-studies';

export default function ProjectsSocialProof() {
  return (
    <section id="projects" className="scroll-mt-24">
      {/* Projects Section - Grey Background with Shadow */}
      <div className="bg-brand-silk dark:bg-gray-950 shadow-[0_4px_20px_rgba(0,0,0,0.1)] py-16 md:py-20 lg:py-24">
        {/*
          Rebuilt 2026-11-01 to match the Loop section above it: left-aligned,
          an eyebrow, a navy heading and cards. The cards read from the case
          study registry, so they lead with the outcome headlines and can never
          drift from the case study pages. The old copy led with "SEO for
          tradesmen" and "we told them to stop spending with us", neither of
          which is the story any more.
        */}
        <Container className="mb-10 md:mb-12">
          <div className="max-w-4xl">
            <p className="mb-3 font-helvetica text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-brand-blue">
              Case studies
            </p>
            <h2 className="font-futura text-[clamp(1.6rem,2.8vw,2.75rem)] font-bold leading-[1.1] text-[#1B2A4A] dark:text-white">
              Results you can measure
            </h2>
          </div>

          <ul className="mt-10 grid gap-5 md:grid-cols-2">
            {CASE_STUDIES.map((study) => (
              <li key={study.slug}>
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 transition-colors hover:border-brand-blue dark:border-gray-800 dark:bg-gray-900 md:p-8"
                >
                  <p className="font-helvetica text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">
                    {study.sector}
                  </p>
                  <h3 className="mt-2 font-futura text-[clamp(1.3rem,2vw,1.6rem)] font-bold leading-[1.2] text-[#1B2A4A] dark:text-white">
                    {study.headline}
                  </h3>
                  <p className="mt-3 font-helvetica-light text-[1rem] leading-[1.6] text-gray-700 dark:text-gray-300">
                    {study.summary}
                  </p>
                  <div className="mt-6 flex items-baseline gap-3">
                    <span className="font-futura text-[clamp(1.6rem,2.4vw,2.1rem)] font-bold text-brand-blue">
                      {study.metrics[0].value}
                    </span>
                    <span className="font-helvetica-light text-[0.85rem] uppercase tracking-wide text-gray-600 dark:text-gray-400">
                      {study.metrics[0].label}
                    </span>
                  </div>
                  <span className="mt-6 font-helvetica text-[0.95rem] font-medium text-brand-blue group-hover:underline underline-offset-4">
                    Read the case study
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/case-studies"
            className="mt-8 inline-block font-helvetica font-medium text-brand-blue underline-offset-4 hover:underline"
          >
            See all our case studies
          </Link>
        </Container>

        <Container className="mb-4">
          <p className="font-helvetica text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-brand-blue">
            More of our work
          </p>
        </Container>
        <ProjectCarousel />
      </div>

      {/* Stats Section - Lighter Grey Background with Shadow */}
      <div className="bg-gray-50 dark:bg-gray-900 shadow-[0_4px_20px_rgba(0,0,0,0.1)] py-16 md:py-20 lg:py-24">
        <Container className="mb-6 md:mb-8">
          <div className="max-w-4xl">
            <p className="mb-3 font-helvetica text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-brand-blue">
              By the numbers
            </p>
            <h2 className="font-futura text-[clamp(1.6rem,2.8vw,2.75rem)] font-bold leading-[1.1] text-[#1B2A4A] dark:text-white">
              What our clients have achieved
            </h2>
          </div>
        </Container>

        <StatsBoxes />

        <ReviewStrip />
      </div>
    </section>
  );
}
