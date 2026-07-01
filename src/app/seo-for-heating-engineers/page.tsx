import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/Container';
import FaqSection from '@/components/FaqSection';
import ServiceDesktopHeader from '@/components/ServiceDesktopHeader';
import ServiceCtaBand from '@/components/services/ServiceCtaBand';
import SeoIndustrySpokeLinks from '@/components/services/SeoIndustrySpokeLinks';
import { pageMeta } from '@/lib/seo';
import {
  BOILER_CO_CASE_STUDY_PATH,
  BOILER_CO_TESTIMONIAL,
  HEATING_ENGINEER_SEO_COVERAGE,
  HEATING_ENGINEER_SEO_PAIN_POINTS,
  HEATING_ENGINEER_SEO_PROCESS_STEPS,
  SEO_FOR_HEATING_ENGINEERS_FAQS,
  SEO_FOR_HEATING_ENGINEERS_PATH,
  SEO_FOR_HEATING_ENGINEERS_SLUG,
} from '@/lib/seo-for-heating-engineers';
import { seoForHeatingEngineersPageJsonLd, serializeJsonLd } from '@/lib/schema';

const SEO_CONTACT = '/contact?interest=seo';
const SEO_CTA_LABEL = 'Book a call';

const sectionHeadingClass =
  'font-futura text-[clamp(1.35rem,2.2vw,1.85rem)] font-bold leading-[1.15] text-brand-blue';

const bodyClass = 'font-helvetica-light text-[clamp(1rem,1.15vw,1.0625rem)] leading-[1.75] text-gray-800 dark:text-gray-200';

export const metadata: Metadata = pageMeta({
  title: 'SEO for Gas Engineers | More Boiler Jobs | Consultico',
  description:
    'SEO for gas and heating engineers that fills the diary with boiler repairs, services and installs, all year. Strategy-led, margin-aware. UK-wide.',
  path: SEO_FOR_HEATING_ENGINEERS_PATH,
  absoluteTitle: true,
});

export default function SeoForHeatingEngineersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(seoForHeatingEngineersPageJsonLd()) }}
      />
      <main className="relative min-h-screen" id="main-content">
        <section className="relative pb-12 md:pb-16" aria-labelledby="seo-for-heating-engineers-heading">
          <ServiceDesktopHeader />
          <div className="absolute inset-0 dot-grid-premium opacity-30 dark:opacity-15" aria-hidden="true" />
          <Container className="relative pt-[10.5rem] md:pt-[12rem] lg:pt-[13.5rem] xl:pt-[14.5rem]">
            <nav
              aria-label="Breadcrumb"
              className="mb-6 font-helvetica text-[0.875rem] text-gray-600 dark:text-gray-400"
            >
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-brand-blue">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/seo" className="hover:text-brand-blue">
                    SEO
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-gray-800 dark:text-gray-200">SEO for Gas and Heating Engineers</li>
              </ol>
            </nav>

            <article className="mx-auto max-w-3xl">
              <h1
                id="seo-for-heating-engineers-heading"
                className="mb-6 font-futura text-[clamp(2rem,3.2vw,2.75rem)] font-bold leading-[1.1] text-brand-blue"
              >
                SEO for Gas Engineers
              </h1>

              <p className={`mb-8 ${bodyClass}`}>
                Consultico is a strategy-led marketing consultancy that does SEO for gas and heating engineers across
                the UK, the kind that keeps the diary full all year, not just in the winter rush. Most heating firms
                live a feast and famine: boiler breakdown searches spike the moment it turns cold, then dry up in
                summer, while national lead-sellers like BOXT and HomeServe bid up the emergency terms. SEO fixes both
                problems. By getting your Google Business Profile, service pages and website right, you show up when
                someone searches &ldquo;boiler repair near me&rdquo; or &ldquo;no hot water&rdquo;, without paying for
                every click, and you capture the year-round work that smooths out the seasons: installations, annual
                services and gas safety certificates. We did exactly this for The Boiler Co, a plumbing and heating firm
                with an average job worth around £1,200: when their paid ads were switched off, organic search filled
                the calendar within roughly three months, and they stayed with us for over a year. This page explains
                how heating engineer SEO actually works.
              </p>
            </article>
          </Container>
        </section>

        <section className="border-t border-gray-200 bg-brand-silk/60 py-14 dark:border-gray-800 dark:bg-gray-900/50 md:py-16">
          <Container>
            <div className="mx-auto max-w-3xl space-y-14">
              <div>
                <h2 className={`${sectionHeadingClass} mb-4`}>
                  Why heating engineers lose jobs they should be winning
                </h2>
                <p className={`${bodyClass} mb-6`}>
                  When a boiler dies in January, the homeowner searches and calls one of the first Gas Safe names they
                  see. When they are planning a new boiler in June, they research for days. Miss either moment and the
                  job goes to a firm that is not necessarily better, just more visible. Three things usually cost
                  heating engineers that work:
                </p>
                <ul className="space-y-4 pl-5">
                  {HEATING_ENGINEER_SEO_PAIN_POINTS.map((item) => (
                    <li key={item.title} className={`${bodyClass} list-disc`}>
                      <strong className="font-helvetica font-semibold text-gray-900 dark:text-gray-100">
                        {item.title}
                      </strong>
                      {': '}
                      {item.title === 'Losing emergencies to national lead-sellers' ? (
                        <>
                          BOXT, Heatable, HomeServe and British Gas dominate{' '}
                          <Link href="/ppc" className="text-brand-blue underline-offset-2 hover:underline">
                            paid search
                          </Link>
                          , so competing on ads alone is a losing game against their budgets.
                        </>
                      ) : (
                        item.body
                      )}
                    </li>
                  ))}
                </ul>
                <p className={`${bodyClass} mt-6`}>
                  SEO is how you stop depending on winter and start owning boiler work, repairs, services and installs,
                  right through the year.
                </p>
              </div>

              <div>
                <h2 className={`${sectionHeadingClass} mb-6`}>What our SEO for gas and heating engineers covers</h2>
                <ul className="space-y-5">
                  {HEATING_ENGINEER_SEO_COVERAGE.map((item) => (
                    <li
                      key={item.title}
                      className="rounded-xl border border-gray-200 bg-white/85 p-5 dark:border-gray-700 dark:bg-gray-950/80"
                    >
                      <h3 className="mb-2 font-futura text-[1.05rem] font-bold text-brand-blue">{item.title}</h3>
                      <p className={bodyClass}>{item.body}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className={`${sectionHeadingClass} mb-4`}>Proof it works: The Boiler Co</h2>
                <p className={`${bodyClass} mb-6`}>
                  The Boiler Co is a plumbing and heating firm with an average job value of around £1,200, so it is
                  about as close a match to your work as our proof gets. We grew their organic search visibility from
                  roughly 6,000 weekly impressions and 20 clicks to about 21,000 impressions and 58 clicks. The real
                  test came when their paid ads were paused: organic search filled the calendar within roughly three
                  months, and the relationship has continued for over fourteen months, including returning to us for
                  web work.
                </p>
                <blockquote className="mb-6 border-l-2 border-brand-blue pl-5">
                  <p className={`${bodyClass} italic`}>&ldquo;{BOILER_CO_TESTIMONIAL.quote}&rdquo;</p>
                  <footer className={`mt-3 ${bodyClass} not-italic font-helvetica font-medium text-gray-900 dark:text-gray-100`}>
                    {BOILER_CO_TESTIMONIAL.name}, {BOILER_CO_TESTIMONIAL.company}
                  </footer>
                </blockquote>
                <p className={bodyClass}>
                  <Link
                    href={BOILER_CO_CASE_STUDY_PATH}
                    className="font-medium text-brand-blue underline-offset-2 hover:underline"
                  >
                    Read the full Boiler Co case study →
                  </Link>
                </p>
              </div>

              <div>
                <h2 className={`${sectionHeadingClass} mb-6`}>How we&apos;d start with you</h2>
                <ol className="space-y-5">
                  {HEATING_ENGINEER_SEO_PROCESS_STEPS.map((step, index) => (
                    <li key={step.title} className={`${bodyClass} pl-1`}>
                      <strong className="font-helvetica font-semibold text-gray-900 dark:text-gray-100">
                        {index + 1}. {step.title}
                      </strong>{' '}
                      {step.body}
                    </li>
                  ))}
                </ol>
                <p className={`${bodyClass} mt-6`}>
                  We are margin-aware by default: when a new boiler install is worth several thousand pounds, the maths
                  on one or two extra a month is usually straightforward, and if it is not worth it for you, we will
                  tell you.
                </p>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-white py-14 dark:bg-gray-950 md:py-16">
          <Container>
            <div className="mx-auto max-w-3xl">
              <FaqSection faqs={[...SEO_FOR_HEATING_ENGINEERS_FAQS]} includeSchema={false} />
            </div>
          </Container>
        </section>

        <SeoIndustrySpokeLinks slug={SEO_FOR_HEATING_ENGINEERS_SLUG} />

        <ServiceCtaBand
          title="Get more boiler jobs from Google"
          body="Tell us your average job value and the area you cover, and we will tell you honestly whether SEO is worth it for your business, and where the quickest wins are."
          buttonLabel={SEO_CTA_LABEL}
          href={SEO_CONTACT}
        />
      </main>
    </>
  );
}
