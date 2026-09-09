import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/Container';
import ServiceDesktopHeader from '@/components/ServiceDesktopHeader';
import { pageMeta } from '@/lib/seo';
import { CASE_STUDIES } from '@/lib/case-studies';
import { caseStudiesPageJsonLd, serializeJsonLd } from '@/lib/schema';

export const metadata: Metadata = pageMeta({
  // NO "| Consultico" here. The root layout's `%s | Consultico` template adds
  // it, and hardcoding it produced "… | Consultico | Consultico" on the first
  // render. 44 chars, so 57 once the template has appended the brand, inside
  // the house 60 limit.
  title: 'Case Studies: Client Results and Search Data',
  // 139 chars. Rewritten alongside the body so the SERP snippet sounds like the
  // page it opens, rather than like a company describing itself.
  description:
    'Two Consultico case studies with the numbers in them: a Bristol plumbing company and a Norfolk garden games brand, both over a year of work.',
  path: '/case-studies',
});

export default function CaseStudiesPage() {
  return (
    <main className="relative min-h-screen bg-brand-silk dark:bg-gray-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(caseStudiesPageJsonLd()) }}
      />
      <ServiceDesktopHeader />
      <Container className="relative z-10 pb-16 pt-[11rem] md:pb-20 md:pt-[13rem] lg:pt-[14rem]">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 font-helvetica text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-brand-blue">
            Case studies
          </p>
          <h1 className="font-futura text-[clamp(2rem,3.5vw,2.85rem)] font-bold leading-[1.1] text-brand-blue">
            What happened when clients worked with us
          </h1>

          {/*
            Written for a buyer, not for a crawler. The first draft opened
            "Consultico has published two full client case studies" and closed on
            "a result without a date and a denominator is a slogan": the company
            talking about itself in the third person, then a maxim that quietly
            passes judgement on other agencies. Paul has rejected both moves
            before. See feedback_paul_voice.md, which is meant to be read BEFORE
            drafting rather than after he sends it back.

            The entity signal an AI engine needs is still all here, because it
            lives in the facts themselves: both clients named, both sectors, both
            locations, how long each ran and what happened. It never needed a
            sentence about our methodology to carry it.
          */}
          <p className="mt-5 font-helvetica-light text-[clamp(1rem,1.2vw,1.1rem)] leading-[1.65] text-gray-800 dark:text-gray-200">
            Two so far. Both of them ran for well over a year, and the numbers are in each one.
          </p>
          <p className="mt-4 font-helvetica-light text-[clamp(1rem,1.2vw,1.1rem)] leading-[1.65] text-gray-800 dark:text-gray-200">
            Norfolk Boards sell American garden games from Norfolk. We were with them for 20 months, across
            three websites, a strategy workshop, SEO and then social. In December 2025 we told them to move
            their budget off search, and it carried on growing without us.
          </p>
          <p className="mt-4 font-helvetica-light text-[clamp(1rem,1.2vw,1.1rem)] leading-[1.65] text-gray-800 dark:text-gray-200">
            The Boiler Co are a plumbing and heating company in Bristol. Their diary ran on paid ads, so when
            the spend dipped or paused, the work got unpredictable. About three months after we started on
            search they were filling the calendar from it instead, and they stayed with us for over 14 months.
          </p>
          <p className="mt-4 font-helvetica-light text-[0.98rem] leading-[1.7] text-gray-700 dark:text-gray-300">
            Each one has the dates on it, so you can see how long things actually took.
          </p>

          <div className="mt-12 space-y-6">
            {CASE_STUDIES.map((study) => (
              <Link
                key={study.slug}
                href={`/case-studies/${study.slug}`}
                className="block rounded-2xl border border-gray-200 bg-white p-6 transition-colors hover:border-brand-blue dark:border-gray-800 dark:bg-gray-900 md:p-8"
              >
                <p className="font-helvetica text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">
                  {study.sector}
                </p>
                <h2 className="mt-2 font-futura text-[clamp(1.3rem,2vw,1.6rem)] font-bold leading-[1.2] text-brand-blue">
                  {study.client}
                </h2>
                <p className="mt-3 font-helvetica-light text-[0.98rem] leading-[1.7] text-gray-700 dark:text-gray-300">
                  {study.summary}
                </p>

                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {study.metrics.map((metric) => (
                    <div key={metric.label}>
                      <p className="font-futura text-[clamp(1.05rem,1.4vw,1.3rem)] font-bold text-brand-blue">
                        {metric.value}
                      </p>
                      <p className="mt-1 font-helvetica-light text-[0.7rem] uppercase tracking-wide text-gray-600 dark:text-gray-400">
                        {metric.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/*
                  Strip a leading "The" from the client name. "Read the {client}
                  case study" renders as "Read the The Boiler Co case study"
                  otherwise, which is the sort of thing you only ever see in the
                  browser and never in the build.
                */}
                <p className="mt-6 font-helvetica text-[0.9rem] font-medium text-brand-blue">
                  Read the {study.client.replace(/^The /, '')} case study
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-14 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900 md:p-8">
            <h2 className="font-futura text-[clamp(1.25rem,1.8vw,1.5rem)] font-bold text-gray-900 dark:text-white">
              Want to know what we would do for you?
            </h2>
            <p className="mt-3 font-helvetica-light text-[0.98rem] leading-[1.7] text-gray-700 dark:text-gray-300">
              Both of these started with the same thing: working out what the actual constraint was before
              anyone bought a service. With Norfolk Boards it turned out not to be the marketing at all.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-brand-blue px-6 py-3 font-helvetica font-medium text-white transition-colors hover:bg-[#006FE6]"
              >
                Get in touch
              </Link>
              <Link
                href="/think-first"
                className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-6 py-3 font-helvetica text-gray-800 transition-colors hover:border-brand-blue hover:text-brand-blue dark:border-gray-700 dark:text-gray-200"
              >
                See the Think First workshop
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
