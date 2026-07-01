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
  BOILER_CO_TRADES_TESTIMONIAL,
  ELECTRICIAN_SEO_COVERAGE,
  ELECTRICIAN_SEO_PAIN_POINTS,
  ELECTRICIAN_SEO_PROCESS_STEPS,
  SEO_FOR_ELECTRICIANS_FAQS,
  SEO_FOR_ELECTRICIANS_PATH,
  SEO_FOR_ELECTRICIANS_SLUG,
} from '@/lib/seo-for-electricians';
import { seoForElectriciansPageJsonLd, serializeJsonLd } from '@/lib/schema';

const SEO_CONTACT = '/contact?interest=seo';
const SEO_CTA_LABEL = 'Book a call';

const sectionHeadingClass =
  'font-futura text-[clamp(1.35rem,2.2vw,1.85rem)] font-bold leading-[1.15] text-brand-blue';

const bodyClass = 'font-helvetica-light text-[clamp(1rem,1.15vw,1.0625rem)] leading-[1.75] text-gray-800 dark:text-gray-200';

export const metadata: Metadata = pageMeta({
  title: 'SEO for Electricians | Get More Jobs from Google | Consultico',
  description:
    'SEO for electricians that fills the diary with real jobs, from emergencies to EV chargers and EICRs. Strategy-led, margin-aware. UK-wide.',
  path: SEO_FOR_ELECTRICIANS_PATH,
  absoluteTitle: true,
});

export default function SeoForElectriciansPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(seoForElectriciansPageJsonLd()) }}
      />
      <main className="relative min-h-screen" id="main-content">
        <section className="relative pb-12 md:pb-16" aria-labelledby="seo-for-electricians-heading">
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
                <li className="text-gray-800 dark:text-gray-200">SEO for Electricians</li>
              </ol>
            </nav>

            <article className="mx-auto max-w-3xl">
              <h1
                id="seo-for-electricians-heading"
                className="mb-6 font-futura text-[clamp(2rem,3.2vw,2.75rem)] font-bold leading-[1.1] text-brand-blue"
              >
                SEO for Electricians
              </h1>

              <p className={`mb-8 ${bodyClass}`}>
                Consultico is a strategy-led marketing consultancy that does SEO for electricians across the UK, the
                kind that fills the diary with real jobs, not vanity rankings nobody books from. Most electricians we
                meet are paying Checkatrade or Rated People for leads that get sold to three other firms, or paying for{' '}
                <Link href="/ppc" className="font-medium text-brand-blue underline-offset-2 hover:underline">
                  Google Ads
                </Link>{' '}
                that stop the second the budget pauses. SEO fixes that. By getting your Google Business Profile, service
                pages and website right, you show up when someone in your area searches &ldquo;emergency electrician near
                me&rdquo;, &ldquo;EICR&rdquo; or &ldquo;EV charger installation&rdquo;, without paying for every click
                or sharing the lead. It also captures the work worth most: landlord EICRs, rewires, consumer unit
                upgrades and EV chargers, not just call-outs. We did the same for a trades client we work with, a
                plumbing and heating firm: when their paid ads were switched off, organic search filled the calendar
                within roughly three months, and they stayed with us for over a year. This page explains how electrician
                SEO actually works.
              </p>
            </article>
          </Container>
        </section>

        <section className="border-t border-gray-200 bg-brand-silk/60 py-14 dark:border-gray-800 dark:bg-gray-900/50 md:py-16">
          <Container>
            <div className="mx-auto max-w-3xl space-y-14">
              <div>
                <h2 className={`${sectionHeadingClass} mb-4`}>
                  Why electricians lose jobs they should be winning
                </h2>
                <p className={`${bodyClass} mb-6`}>
                  When someone loses power, smells burning or needs an EICR for a let, they search and call one of the
                  first names they see. If that is not you, the job goes to a competitor who is not necessarily better,
                  just more visible or quicker to pay a directory. Three things usually cost electricians that
                  visibility:
                </p>
                <ul className="space-y-4 pl-5">
                  {ELECTRICIAN_SEO_PAIN_POINTS.map((item) => (
                    <li key={item.title} className={`${bodyClass} list-disc`}>
                      <strong className="font-helvetica font-semibold text-gray-900 dark:text-gray-100">
                        {item.title}
                      </strong>
                      {': '}
                      {item.body}
                    </li>
                  ))}
                </ul>
                <p className={`${bodyClass} mt-6`}>
                  SEO is how you stop renting shared leads and start owning the searches that bring you whole jobs.
                </p>
              </div>

              <div>
                <h2 className={`${sectionHeadingClass} mb-6`}>What our SEO for electricians covers</h2>
                <ul className="space-y-5">
                  {ELECTRICIAN_SEO_COVERAGE.map((item) => (
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
                <h2 className={`${sectionHeadingClass} mb-4`}>Proof it works: a trades client</h2>
                <p className={`${bodyClass} mb-6`}>
                  The Boiler Co is a trades client we work with, a plumbing and heating firm with an average job value
                  of around £1,200. We grew their organic search visibility from roughly 6,000 weekly impressions and 20
                  clicks to about 21,000 impressions and 58 clicks. The real test came when their paid ads were
                  paused: organic search filled the calendar within roughly three months, and the relationship has
                  continued for over fourteen months, including returning to us for web work. Trades differ, but the
                  pattern holds, fix the foundations and the calendar fills without renting every lead.
                </p>
                <blockquote className="mb-6 border-l-2 border-brand-blue pl-5">
                  <p className={`${bodyClass} italic`}>&ldquo;{BOILER_CO_TRADES_TESTIMONIAL.quote}&rdquo;</p>
                  <footer className={`mt-3 ${bodyClass} not-italic font-helvetica font-medium text-gray-900 dark:text-gray-100`}>
                    {BOILER_CO_TRADES_TESTIMONIAL.name}, {BOILER_CO_TRADES_TESTIMONIAL.company}
                  </footer>
                </blockquote>
                <p className={bodyClass}>
                  <Link
                    href={BOILER_CO_CASE_STUDY_PATH}
                    className="font-medium text-brand-blue underline-offset-2 hover:underline"
                  >
                    Read the full case study →
                  </Link>
                </p>
              </div>

              <div>
                <h2 className={`${sectionHeadingClass} mb-6`}>How we&apos;d start with you</h2>
                <ol className="space-y-5">
                  {ELECTRICIAN_SEO_PROCESS_STEPS.map((step, index) => (
                    <li key={step.title} className={`${bodyClass} pl-1`}>
                      <strong className="font-helvetica font-semibold text-gray-900 dark:text-gray-100">
                        {index + 1}. {step.title}
                      </strong>{' '}
                      {step.body}
                    </li>
                  ))}
                </ol>
                <p className={`${bodyClass} mt-6`}>
                  We are margin-aware by default: when a rewire or EV charger install is worth far more than a call-out,
                  the maths on a few extra planned jobs a month is usually straightforward, and if it is not worth it
                  for you, we will tell you.
                </p>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-white py-14 dark:bg-gray-950 md:py-16">
          <Container>
            <div className="mx-auto max-w-3xl">
              <FaqSection faqs={[...SEO_FOR_ELECTRICIANS_FAQS]} includeSchema={false} />
            </div>
          </Container>
        </section>

        <SeoIndustrySpokeLinks slug={SEO_FOR_ELECTRICIANS_SLUG} />

        <ServiceCtaBand
          title="Get more electrical jobs from Google"
          body="Tell us your average job value and the area you cover, and we will tell you honestly whether SEO is worth it for your business, and where the quickest wins are."
          buttonLabel={SEO_CTA_LABEL}
          href={SEO_CONTACT}
        />
      </main>
    </>
  );
}
