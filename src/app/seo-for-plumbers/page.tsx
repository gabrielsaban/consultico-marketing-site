import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/Container';
import FaqSection from '@/components/FaqSection';
import ServiceDesktopHeader from '@/components/ServiceDesktopHeader';
import ServiceCtaBand from '@/components/services/ServiceCtaBand';
import { pageMeta } from '@/lib/seo';
import {
  PLUMBER_SEO_COVERAGE,
  PLUMBER_SEO_PAIN_POINTS,
  PLUMBER_SEO_PROCESS_STEPS,
  SEO_FOR_PLUMBERS_FAQS,
  SEO_FOR_PLUMBERS_PATH,
} from '@/lib/seo-for-plumbers';
import { seoForPlumbersPageJsonLd, serializeJsonLd } from '@/lib/schema';

const SEO_CONTACT = '/contact?interest=seo';
const SEO_CTA_LABEL = 'Book a call';

const sectionHeadingClass =
  'font-futura text-[clamp(1.35rem,2.2vw,1.85rem)] font-bold leading-[1.15] text-brand-blue';

const bodyClass = 'font-helvetica-light text-[clamp(1rem,1.15vw,1.0625rem)] leading-[1.75] text-gray-800 dark:text-gray-200';

export const metadata: Metadata = pageMeta({
  title: 'SEO for Plumbers | Get More Jobs from Google | Consultico',
  description:
    'SEO for plumbers that fills the calendar with real jobs — not vanity rankings. Strategy-led, margin-aware, with a documented trades result. UK-wide.',
  path: SEO_FOR_PLUMBERS_PATH,
  absoluteTitle: true,
});

export default function SeoForPlumbersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(seoForPlumbersPageJsonLd()) }}
      />
      <main className="relative min-h-screen" id="main-content">
        <section className="relative pb-12 md:pb-16" aria-labelledby="seo-for-plumbers-heading">
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
                <li className="text-gray-800 dark:text-gray-200">SEO for Plumbers</li>
              </ol>
            </nav>

            <article className="mx-auto max-w-3xl">
              <h1
                id="seo-for-plumbers-heading"
                className="mb-6 font-futura text-[clamp(2rem,3.2vw,2.75rem)] font-bold leading-[1.1] text-brand-blue"
              >
                SEO for Plumbers
              </h1>

              <p className={`mb-8 ${bodyClass}`}>
                Consultico is a strategy-led marketing consultancy that does SEO for plumbers and heating businesses
                across the UK — the kind that fills the calendar with real jobs, not vanity rankings nobody books from.
                Most plumbers we meet are paying for Google Ads because it works, but they stop getting calls the second
                the budget pauses. SEO fixes that. By getting your Google Business Profile, local pages and website
                right, you show up when someone in your area searches &ldquo;emergency plumber near me&rdquo; or
                &ldquo;boiler repair&rdquo; — without paying for every click. We did exactly this for The Boiler Co, a
                trades business with an average job worth around £1,200: when their paid ads were switched off, organic
                search filled the diary within roughly three months, and they stayed with us for over a year. This page
                explains how plumber SEO actually works, what we&apos;d do, and how to tell whether it&apos;s worth it
                for you.
              </p>

              <div className="mb-10 flex items-start gap-4 border-y border-gray-200 py-6 dark:border-gray-800">
                <div className="font-helvetica">
                  <p className="text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-gray-600 dark:text-gray-400">
                    Author
                  </p>
                  <p className="mt-1 text-[1rem] font-medium text-gray-900 dark:text-gray-100">Paul Wilson</p>
                  <p className="text-[0.9rem] text-gray-600 dark:text-gray-400">Founder, Consultico</p>
                  <a
                    href="https://www.linkedin.com/in/think-first-marketing"
                    className="mt-2 inline-block text-[0.9rem] text-brand-blue hover:underline"
                    rel="noreferrer"
                    target="_blank"
                  >
                    LinkedIn profile
                  </a>
                </div>
              </div>
            </article>
          </Container>
        </section>

        <section className="border-t border-gray-200 bg-brand-silk/60 py-14 dark:border-gray-800 dark:bg-gray-900/50 md:py-16">
          <Container>
            <div className="mx-auto max-w-3xl space-y-14">
              <div>
                <h2 className={`${sectionHeadingClass} mb-4`}>Why plumbers lose jobs they should be winning</h2>
                <p className={`${bodyClass} mb-6`}>
                  When someone&apos;s boiler fails or a pipe bursts, they don&apos;t browse — they search, and they call
                  one of the first names they see. If that isn&apos;t you, the job goes to a competitor who isn&apos;t
                  necessarily better, just more visible. Three things usually cost plumbers that visibility:
                </p>
                <ul className="space-y-4 pl-5">
                  {PLUMBER_SEO_PAIN_POINTS.map((item) => (
                    <li key={item.title} className={`${bodyClass} list-disc`}>
                      <strong className="font-helvetica font-semibold text-gray-900 dark:text-gray-100">
                        {item.title === 'Total reliance on paid ads' ? (
                          <>
                            Total reliance on{' '}
                            <Link href="/ppc" className="text-brand-blue underline-offset-2 hover:underline">
                              paid ads
                            </Link>
                          </>
                        ) : (
                          item.title
                        )}
                      </strong>
                      {' — '}
                      {item.body}
                    </li>
                  ))}
                </ul>
                <p className={`${bodyClass} mt-6`}>
                  SEO is how you stop renting your leads and start owning the channel that brings them in.
                </p>
              </div>

              <div>
                <h2 className={`${sectionHeadingClass} mb-6`}>What our SEO for plumbers covers</h2>
                <ul className="space-y-5">
                  {PLUMBER_SEO_COVERAGE.map((item) => (
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
                  The Boiler Co is a trades business with an average job value of around £1,200. We grew their organic
                  search visibility from roughly 6,000 weekly impressions and 20 clicks to about 21,000 impressions and
                  58 clicks. The real test came when their paid ads were paused: organic search filled the calendar
                  within roughly three months, and the relationship has continued for over fourteen months, including
                  returning to us for web work.
                </p>
                <blockquote className="mb-6 border-l-2 border-brand-blue pl-5">
                  <p className={`${bodyClass} italic`}>
                    &ldquo;After a frustrating run with agencies, this gave us genuine clarity on what to do and why it
                    would work.&rdquo;
                  </p>
                  <footer className={`mt-3 ${bodyClass} not-italic font-helvetica font-medium`}>
                    — Ant Vitale, The Boiler Co
                  </footer>
                </blockquote>
                <p className={bodyClass}>
                  <Link href="/case-studies/boiler-co" className="font-medium text-brand-blue underline-offset-2 hover:underline">
                    Read the full Boiler Co case study →
                  </Link>
                </p>
              </div>

              <div>
                <h2 className={`${sectionHeadingClass} mb-6`}>How we&apos;d start with you</h2>
                <ol className="space-y-5">
                  {PLUMBER_SEO_PROCESS_STEPS.map((step, index) => (
                    <li key={step.title} className={`${bodyClass} pl-1`}>
                      <strong className="font-helvetica font-semibold text-gray-900 dark:text-gray-100">
                        {index + 1}. {step.title}
                      </strong>{' '}
                      {step.body}
                    </li>
                  ))}
                </ol>
                <p className={`${bodyClass} mt-6`}>
                  We&apos;re margin-aware by default: when a job is worth around £1,200 — as it is for one trades
                  business we work with — the maths on a few extra a month is usually straightforward, and if it
                  isn&apos;t worth it for you, we&apos;ll tell you.
                </p>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-white py-14 dark:bg-gray-950 md:py-16">
          <Container>
            <div className="mx-auto max-w-3xl">
              <FaqSection faqs={[...SEO_FOR_PLUMBERS_FAQS]} includeSchema={false} />
            </div>
          </Container>
        </section>

        <ServiceCtaBand
          title="Get more plumbing jobs from Google"
          body="Tell us your average job value and the area you cover, and we'll tell you honestly whether SEO is worth it for your business — and where the quickest wins are."
          buttonLabel={SEO_CTA_LABEL}
          href={SEO_CONTACT}
        />

        <section className="border-t border-gray-200 bg-brand-silk/50 py-8 dark:border-gray-800 dark:bg-gray-900/40">
          <Container>
            <p className={`mx-auto max-w-3xl text-center font-helvetica text-[0.95rem] ${bodyClass}`}>
              <Link href="/seo" className="font-medium text-brand-blue underline-offset-2 hover:underline">
                See how we do SEO
              </Link>
            </p>
          </Container>
        </section>
      </main>
    </>
  );
}
