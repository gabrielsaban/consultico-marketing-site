import type { Metadata } from 'next';
import Container from '@/components/Container';
import FaqSection from '@/components/FaqSection';
import ServicePageJsonLd from '@/components/ServicePageJsonLd';
import ServiceHero from '@/components/services/ServiceHero';
import BoilerCoImpressionsChart from '@/components/services/BoilerCoImpressionsChart';
import SeoGeoDiagram from '@/components/services/SeoGeoDiagram';
import SeoIndustryGrid from '@/components/services/SeoIndustryGrid';
import ServiceCaseStudyCard from '@/components/services/ServiceCaseStudyCard';
import ServiceCtaBand from '@/components/services/ServiceCtaBand';
import Link from 'next/link';
import { CONSULTICO_GBP_URL } from '@/lib/contact';
import { SEO_CONTACT, SEO_CTA_LABEL, SERVICE_HERO_TRUST_LINE } from '@/lib/cta';
import { seoPageGoogleReviews } from '@/lib/google-reviews';
import { SERVICE_FAQS } from '@/lib/service-faqs';
import { SEO_BY_INDUSTRY_PATH, getLiveSeoIndustries } from '@/lib/seo-industries';
import { servicePageMeta } from '@/lib/seo';

export const metadata: Metadata = servicePageMeta('seo');

const sectionHeadingClass =
  'relative text-[clamp(1.5rem,2.4vw,2.6rem)] leading-[1.1] font-futura font-bold text-brand-blue';

/** Body copy on light backgrounds: WCAG AA friendly (gray-800+). */
const bodyTextClass = 'text-gray-800 dark:text-gray-200';
const secondaryTextClass = 'text-gray-700 dark:text-gray-300';

const seoPainPoints = [
  'Relying on referrals while competitors appear in Google every day',
  'Paying for ads and renting visibility: when spend stops, enquiries stop',
  'Previous SEO that produced reports, not new business',
  'No idea how many people search for your exact service each month, or how many you are missing',
];

const problemStakes = [
  'Thousands of high-intent searches in your category every month, going to competitors',
  'Every week without organic visibility is revenue you cannot recover',
  'One paused ad campaign away from an empty diary',
  'Growth capped by whatever you can afford to spend on ads, not by actual demand',
];

const solutionPoints = [
  'SEO that targets the searches people use when they are ready to buy',
  'GEO so AI assistants (ChatGPT, Perplexity, Google AI) find and cite you correctly',
  'A prioritised plan: fix what is blocking visibility first, then compound',
];

const whyConsultico = [
  'Strategy before tactics: we map searches to enquiries, not vanity traffic',
  'Verified client results, not vague agency benchmarks',
  'Transparent work tied to business outcomes, so you know what is being done and why',
  'Work scoped to your market, wherever your customers search',
];

const proofMetrics = [
  { value: '21k', label: 'Weekly impressions' },
  { value: '58', label: 'Weekly clicks' },
  { value: '3x', label: 'Click growth' },
  { value: '14+', label: 'Months retained' },
];

const caseStudyMetrics = [
  { value: '3 mo', label: 'To SEO traction' },
  { value: '21k', label: 'Weekly impressions' },
  { value: '58', label: 'Weekly clicks' },
  { value: '14+', label: 'Months retained' },
];

const visibilityChecks = [
  {
    label: 'Technical',
    title: 'Google cannot show your site properly',
    cost: 'You exist, but search engines struggle to find or trust you.',
    fix: 'We fix crawl blocks, speed issues, indexing problems, and architecture gaps.',
  },
  {
    label: 'Intent',
    title: 'You are visible for the wrong searches',
    cost: 'Traffic that never turns into a phone call or booking.',
    fix: 'We map keywords by buyer intent so the strategy favours commercial value.',
  },
  {
    label: 'Content',
    title: 'Competitors answer the customer\'s question better',
    cost: 'They pick someone else before they ever see you.',
    fix: 'We build relevance, depth, and structure that outperforms rivals on the page.',
  },
  {
    label: 'Authority',
    title: 'You look less established online than rivals',
    cost: 'Trust goes to whoever looks like the obvious choice.',
    fix: 'We build backlink quality, reputation signals, and ethical authority over time.',
  },
  {
    label: 'Conversion',
    title: 'People visit but do not enquire',
    cost: 'Visibility without a clear next step is wasted.',
    fix: 'We connect rankings to enquiries with clear calls to action and conversion paths.',
  },
];

const processSteps = [
  {
    number: '01',
    phase: 'Weeks 1 to 2',
    title: 'Audit and prioritise',
    body: 'You know exactly what is blocking visibility and what to fix first.',
  },
  {
    number: '02',
    phase: 'Months 1 to 2',
    title: 'Build and implement',
    body: 'High-intent pages, technical fixes, and local visibility go live.',
  },
  {
    number: '03',
    phase: 'Month 3+',
    title: 'Measure and compound',
    body: 'Enquiries from Google and AI search start stacking; you see what is working.',
  },
];

const seoIncludes = [
  {
    title: 'Technical SEO',
    description: 'Your site is fast, crawlable, and trusted by search engines.',
    features: ['Technical audit and prioritised fixes', 'Core Web Vitals and performance', 'Schema and sitemap hygiene'],
  },
  {
    title: 'Local and intent-led SEO',
    description: 'You appear for the searches that actually book work.',
    features: ['Local search targeting', 'Service-area page strategy', 'Google Business Profile alignment'],
  },
  {
    title: 'Content and on-page SEO',
    description: 'Your pages answer what customers search, better than competitors.',
    features: ['Keyword and intent mapping', 'On-page optimisation', 'Content gap prioritisation'],
  },
  {
    title: 'GEO (generative engine optimisation)',
    description: 'AI assistants cite your brand accurately when people ask for recommendations.',
    features: ['Entity markup and structured data', 'llms.txt and citation-ready copy', 'Authority and E-E-A-T signals'],
  },
];

const walkAwayOutcomes = [
  'New business from search, not just referrals',
  'Visibility that survives when ad spend pauses',
  'Clarity on which searches drive enquiries',
  'SEO that compounds month on month',
  'Priorities you can act on, not a report that sits in a folder',
];

const geoDeliverables = [
  'Entity and organisation signals in structured data',
  'Answer-first copy that AI systems can quote accurately',
  'llms.txt and crawl-friendly HTML for AI retrieval',
  'Schema, metadata, and on-page clarity for brand citation',
];

const engagementOptions = [
  {
    name: 'SEO Audit',
    summary: 'You leave knowing what is broken, what to fix first, and whether retained SEO is worth it.',
    features: ['Technical and on-page review', 'Keyword and intent mapping', 'Prioritised action plan', 'Clear next-step recommendations'],
    highlighted: false,
  },
  {
    name: 'Retained SEO',
    summary: 'We build and run your organic channel so you are not dependent on ads alone.',
    features: ['Monthly implementation and reporting', 'Local and high-intent keyword growth', 'Continuous optimisation', 'Transparent progress tracking'],
    highlighted: true,
  },
  {
    name: 'SEO + GEO Programme',
    summary: 'Full visibility in Google and AI search for brands where being found everywhere matters.',
    features: ['Everything in Retained SEO', 'GEO audit and implementation', 'Entity and schema enhancement', 'AI citation monitoring'],
    highlighted: false,
  },
];

const fitChecks = {
  good: [
    'Trades and local service businesses needing consistent enquiries',
    'B2C brands with proven demand wanting organic growth',
    'Businesses tired of renting visibility through ads alone',
    'Owners who want transparent work tied to business outcomes',
  ],
  bad: [
    'Businesses wanting guaranteed page-one rankings in 30 days',
    'Sites that need a full rebuild before SEO can work (we can advise on web separately)',
    'Owners unwilling to invest in content or on-page improvements',
  ],
};

function CheckIcon({ className = 'text-brand-blue' }: { className?: string }) {
  return (
    <svg className={`mt-1 h-4 w-4 flex-none ${className}`} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function BulletList({ items, className = '' }: { items: string[]; className?: string }) {
  return (
    <ul className={`space-y-3 pl-7 ${className}`}>
      {items.map((item) => (
        <li
          key={item}
          className={`relative font-helvetica-light text-[clamp(0.95rem,1.1vw,1.05rem)] leading-[1.6] before:absolute before:-left-[1.4rem] before:font-bold before:text-brand-blue before:content-['•'] ${bodyTextClass}`}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function CtaLink({ className = '' }: { className?: string }) {
  return (
    <Link
      href={SEO_CONTACT}
      className={`inline-flex items-center justify-center rounded-lg bg-brand-blue px-8 py-3 font-helvetica text-[clamp(1rem,1.2vw,1.125rem)] font-medium text-white transition-colors hover:bg-[#006FE6] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-950 ${className}`}
    >
      {SEO_CTA_LABEL}
    </Link>
  );
}

export default function SeoPage() {
  const liveIndustryPages = getLiveSeoIndustries();

  return (
    <>
      <ServicePageJsonLd pageKey="seo" />
      <main className="relative" id="main-content">
        <ServiceHero
          eyebrow="SEO & GEO"
          heading="Get found on Google and AI search. Turn it into booked work."
          headingAccent="booked work"
          subhead="We turn search visibility into real enquiries, not rankings for their own sake."
          body="Most clients see meaningful results within 90 days. We set honest expectations from the first audit."
          proofChips={[
            { value: '21k', label: 'Weekly impressions - The Boiler Co' },
            { value: '3×', label: 'Click growth over 14 months' },
            { value: '14+ months', label: 'Longest retained SEO engagement' },
          ]}
          primaryHref={SEO_CONTACT}
          primaryLabel={SEO_CTA_LABEL}
          trustLine={SERVICE_HERO_TRUST_LINE}
          visual={<BoilerCoImpressionsChart />}
        />

        {/* Stage 2: Problem */}
        <section className="relative overflow-hidden bg-brand-silk/90 py-16 shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:bg-gray-900/85 md:py-20 lg:py-24" aria-labelledby="seo-problem-heading">
          <Container>
            <h2 id="seo-problem-heading" className={`${sectionHeadingClass} mb-6 max-w-[28ch]`}>
              You are not invisible because nobody wants your service. You are invisible because you are not ranking for it.
            </h2>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_0.9fr]">
              <div className="rounded-xl border border-gray-200 bg-white/85 p-6 dark:border-gray-700 dark:bg-gray-950/80">
                <p className={`mb-5 font-helvetica text-[clamp(1rem,1.3vw,1.2rem)] ${bodyTextClass}`}>You&apos;ve likely:</p>
                <BulletList items={seoPainPoints} />
                <p className={`mt-6 font-helvetica-light text-[clamp(1rem,1.15vw,1.1rem)] leading-[1.6] ${bodyTextClass}`}>
                  The issue isn&apos;t demand. Thousands of people search for what you sell every month. You&apos;re just not capturing any of that market.
                </p>
              </div>
              <div className="rounded-xl border border-brand-blue/30 bg-brand-blue p-6 text-white">
                <p className="mb-4 font-helvetica text-[clamp(1rem,1.2vw,1.1rem)]">What that costs you:</p>
                <ul className="space-y-3 pl-7">
                  {problemStakes.map((item) => (
                    <li key={item} className="relative font-helvetica-light text-[clamp(0.95rem,1.1vw,1.05rem)] leading-[1.6] text-white before:absolute before:-left-[1.4rem] before:font-bold before:content-['•']">
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 font-helvetica text-[clamp(1rem,1.15vw,1.1rem)] leading-[1.6] text-white">
                  Until you own visibility in search, you&apos;re renting attention, and paying for it every month.
                </p>
              </div>
            </div>
            <p className={`mt-8 font-helvetica-light text-[clamp(1rem,1.1vw,1.05rem)] ${secondaryTextClass}`}>
              That&apos;s fixable, if you know what&apos;s blocking you.
            </p>
          </Container>
        </section>

        {/* Stage 3: Solution + why */}
        <section className="py-16 md:py-20 lg:py-24" aria-labelledby="seo-solution-heading">
          <Container>
            <h2 id="seo-solution-heading" className={`${sectionHeadingClass} mb-10 max-w-[24ch]`}>
              We build the organic channel you should have had from day one.
            </h2>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="rounded-xl border border-gray-200 bg-white/85 p-6 dark:border-gray-700 dark:bg-gray-950/80">
                <h3 className="mb-4 font-futura text-[clamp(1.15rem,1.5vw,1.35rem)] font-bold text-brand-blue">The solution</h3>
                <BulletList items={solutionPoints} />
              </div>
              <div className="rounded-xl border border-gray-200 bg-brand-silk/70 p-6 dark:border-gray-700 dark:bg-gray-900">
                <h3 className="mb-4 font-futura text-[clamp(1.15rem,1.5vw,1.35rem)] font-bold text-brand-blue">Why Consultico</h3>
                <BulletList items={whyConsultico} />
              </div>
            </div>
            <p className={`mt-8 font-helvetica-light text-[clamp(1rem,1.15vw,1.1rem)] leading-[1.6] ${bodyTextClass}`}>
              Search works when five things align. Most businesses are weak on at least two.
            </p>
          </Container>
        </section>

        {/* Stage 3b: Google reviews, stats, CTA */}
        <section className="border-y border-gray-200 bg-white py-12 dark:border-gray-800 dark:bg-gray-950 md:py-16" aria-labelledby="seo-proof-heading">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-3 font-helvetica text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-brand-blue">Google reviews</p>
              <h2 id="seo-proof-heading" className="font-futura text-[clamp(1.35rem,2.2vw,1.75rem)] font-bold text-brand-blue">
                What clients say about working with us
              </h2>
              <p className={`mt-3 font-helvetica text-[0.9rem] ${secondaryTextClass}`}>
                Verified five-star reviews.{' '}
                <Link href={CONSULTICO_GBP_URL} className="font-medium text-brand-blue hover:underline">
                  Read all on Google
                </Link>
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {seoPageGoogleReviews.map((review) => (
                <figure
                  key={review.name}
                  className="flex h-full flex-col rounded-xl border border-gray-200 bg-brand-silk/50 p-5 dark:border-gray-800 dark:bg-gray-900"
                >
                  <blockquote className={`flex-1 font-helvetica-light text-[0.9rem] leading-[1.6] ${bodyTextClass}`}>
                    &ldquo;{review.quote}&rdquo;
                  </blockquote>
                  <figcaption className={`mt-4 border-t border-gray-200 pt-4 font-helvetica text-[0.8125rem] font-medium dark:border-gray-700 ${bodyTextClass}`}>
                    {review.name}
                    <span className={`block font-normal ${secondaryTextClass}`}>{review.company}</span>
                  </figcaption>
                </figure>
              ))}
            </div>

            <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
              {proofMetrics.map((metric) => (
                <div key={metric.label} className="rounded-lg border border-gray-200 bg-brand-silk/50 p-4 text-center dark:border-gray-800 dark:bg-gray-900">
                  <p className="font-futura text-[clamp(1.2rem,1.6vw,1.5rem)] font-bold text-brand-blue">{metric.value}</p>
                  <p className={`mt-1 font-helvetica text-[0.72rem] uppercase tracking-wide ${secondaryTextClass}`}>{metric.label}</p>
                </div>
              ))}
            </div>
            <p className={`mx-auto mt-4 max-w-xl text-center font-helvetica text-[0.85rem] leading-[1.5] ${secondaryTextClass}`}>
              From a retained SEO client, The Boiler Co. Results vary by market, competition, and starting point.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <CtaLink />
              <Link
                href="/case-studies/boiler-co"
                className="font-helvetica font-medium text-brand-blue hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-950"
              >
                Read The Boiler Co case study →
              </Link>
            </div>
          </Container>
        </section>

        {/* What we fix and how (merged signals, framework, implementation) */}
        <section className="py-16 md:py-20 lg:py-24" aria-labelledby="seo-fix-heading">
          <Container>
            <div className="mb-10 max-w-3xl">
              <p className="mb-3 font-helvetica text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-brand-blue">What we fix and how</p>
              <h2 id="seo-fix-heading" className={sectionHeadingClass}>
                Five blockers, one framework, and the work we implement behind the scenes
              </h2>
              <p className={`mt-4 font-helvetica-light text-[clamp(1rem,1.1vw,1.05rem)] leading-[1.6] ${secondaryTextClass}`}>
                Our audit finds which of these is blocking you, fixes them in order, and builds the organic channel that makes the 90-day promise real.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
              {visibilityChecks.map((item) => (
                <article key={item.label} className="relative overflow-hidden rounded-lg border border-gray-200 bg-white/85 p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/75">
                  <div className="absolute inset-x-0 top-0 h-1 bg-brand-blue" aria-hidden="true" />
                  <p className="mb-4 mt-2 font-futura text-[clamp(1.4rem,2vw,1.8rem)] font-bold leading-none text-brand-blue/25" aria-hidden="true">{item.label}</p>
                  <h3 className="font-futura text-[clamp(1rem,1.2vw,1.1rem)] font-bold text-gray-900 dark:text-white">{item.title}</h3>
                  <p className={`mt-2 font-helvetica-light text-[0.875rem] leading-[1.5] ${secondaryTextClass}`}>{item.cost}</p>
                  <p className={`mt-3 font-helvetica-light text-[0.9rem] leading-[1.5] ${bodyTextClass}`}>{item.fix}</p>
                </article>
              ))}
            </div>

            <div className="mt-12 overflow-hidden rounded-xl border border-gray-200 bg-white/85 p-3 shadow-sm dark:border-gray-700 dark:bg-gray-950/80 md:p-4">
              <div className="mb-4 px-2 md:px-3">
                <p className="mb-2 font-helvetica text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-brand-blue">The framework</p>
                <h3 className="font-futura text-[clamp(1.15rem,1.6vw,1.45rem)] font-bold text-brand-blue">
                  How we build visibility in Google and AI search
                </h3>
                <p className={`mt-2 font-helvetica-light text-[0.95rem] leading-[1.55] ${secondaryTextClass}`}>
                  From technical discovery through to enquiries that keep compounding.
                </p>
              </div>
              <div className="overflow-hidden rounded-lg bg-brand-silk dark:bg-gray-800">
                <SeoGeoDiagram />
              </div>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
              {seoIncludes.map((item) => (
                <article key={item.title} className="rounded-lg border border-gray-200 bg-white/85 p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/75">
                  <h3 className="font-futura text-[clamp(1.25rem,1.6vw,1.5rem)] font-bold text-brand-blue">{item.title}</h3>
                  <p className={`mt-3 font-helvetica-light text-[0.98rem] leading-[1.6] ${secondaryTextClass}`}>{item.description}</p>
                  <ul className="mt-6 space-y-3">
                    {item.features.map((feature) => (
                      <li key={feature} className={`flex gap-3 font-helvetica-light text-[0.92rem] ${secondaryTextClass}`}>
                        <CheckIcon />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </Container>
        </section>

        {/* Stage 5a: Your first 90 days */}
        <section className="bg-brand-silk/80 py-16 dark:bg-gray-900/80 md:py-20 lg:py-24" aria-labelledby="seo-process-heading">
          <Container>
            <div className="mb-10 text-center">
              <p className="mb-3 font-helvetica text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-brand-blue">How it works</p>
              <h2 id="seo-process-heading" className={`${sectionHeadingClass} mx-auto max-w-3xl`}>
                Start seeing results from search within 90 days
              </h2>
              <p className={`mx-auto mt-4 max-w-2xl font-helvetica-light text-[clamp(1rem,1.1vw,1.05rem)] leading-[1.6] ${secondaryTextClass}`}>
                Timing depends on your market, competition, and where you are starting from. We set honest expectations in the audit.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {processSteps.map((step) => (
                <article key={step.number} className="rounded-lg border border-gray-200 bg-white/85 p-6 text-center shadow-sm dark:border-gray-800 dark:bg-gray-950/80">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-blue font-futura text-xl font-bold text-white" aria-hidden="true">
                    {step.number}
                  </div>
                  <p className="mb-2 font-helvetica text-[0.8rem] font-semibold uppercase tracking-wide text-brand-blue">{step.phase}</p>
                  <h3 className="font-futura text-[clamp(1.15rem,1.4vw,1.35rem)] font-bold text-gray-900 dark:text-white">{step.title}</h3>
                  <p className={`mx-auto mt-3 max-w-sm font-helvetica-light text-[0.95rem] leading-[1.55] ${secondaryTextClass}`}>{step.body}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        {/* Stage 5c: What changes for you */}
        <section className="bg-white py-16 dark:bg-gray-950 md:py-20 lg:py-24" aria-labelledby="seo-outcomes-heading">
          <Container>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1fr] lg:items-center">
              <div>
                <p className="mb-3 font-helvetica text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-brand-blue">What changes for you</p>
                <h2 id="seo-outcomes-heading" className={sectionHeadingClass}>When search starts working, this is what shifts</h2>
              </div>
              <ul className="space-y-4">
                {walkAwayOutcomes.map((outcome) => (
                  <li key={outcome} className={`flex gap-3 rounded-lg border border-gray-200 bg-brand-silk/50 p-4 font-helvetica-light text-[0.95rem] ${bodyTextClass} dark:border-gray-800 dark:bg-gray-900`}>
                    <CheckIcon />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>

        {/* Stage 5d: GEO */}
        <section className="py-16 md:py-20 lg:py-24" aria-labelledby="seo-geo-heading">
          <Container>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="mb-3 font-helvetica text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-brand-blue">Generative engine optimisation</p>
                <h2 id="seo-geo-heading" className={sectionHeadingClass}>Your customers don&apos;t just Google you. They ask AI too.</h2>
                <p className={`mt-5 font-helvetica-light text-[clamp(1rem,1.15vw,1.1rem)] leading-[1.65] ${secondaryTextClass}`}>
                  If AI cannot find or cite you, you are missing a growing channel. We structure your entity signals, schema, and answer-first copy so ChatGPT, Perplexity, and Google AI Overviews retrieve and cite your brand accurately.
                </p>
                <p className={`mt-4 font-helvetica-light text-[clamp(1rem,1.15vw,1.1rem)] leading-[1.65] ${secondaryTextClass}`}>
                  If you want the detail first, our guide to{' '}
                  <Link href="/articles/what-is-generative-engine-optimisation" className="font-medium text-brand-blue underline-offset-2 hover:underline">
                    what generative engine optimisation actually is
                  </Link>{' '}
                  sets out what the evidence says earns citations, and what gets sold as GEO with nothing behind it.
                </p>
                <div className="mt-6 rounded-lg border border-gray-200 bg-brand-silk/60 p-5 dark:border-gray-800 dark:bg-gray-900">
                  <p className="mb-2 font-helvetica text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-brand-blue">Proof</p>
                  <p className={`font-helvetica-light text-[0.98rem] leading-[1.6] ${bodyTextClass}`}>
                    One enquiry a month to three or four bookings a week, inside ninety days. That is Marti Clearpath&apos;s figure for Mortha Wellness.
                  </p>
                  <p className={`mt-3 font-helvetica-light text-[0.98rem] leading-[1.6] ${secondaryTextClass}`}>
                    We did the search work behind it: the audit, the technical fixes, and the GEO that made the site readable to Google and to AI engines.
                  </p>
                </div>
              </div>
              <ul className="space-y-3">
                {geoDeliverables.map((item) => (
                  <li key={item} className={`flex gap-3 rounded-lg border border-gray-200 bg-brand-silk/50 p-4 font-helvetica-light text-[0.95rem] ${bodyTextClass} dark:border-gray-800 dark:bg-gray-900`}>
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>

        {/* Stage 6a: Full case study */}
        <section className="bg-brand-silk/80 py-16 dark:bg-gray-900/80 md:py-20 lg:py-24" aria-labelledby="seo-case-study-heading">
          <Container>
            <div className="mb-10 max-w-3xl">
              <p className="mb-3 font-helvetica text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-brand-blue">Proof</p>
              <h2 id="seo-case-study-heading" className={sectionHeadingClass}>From rented visibility to organic search that delivers enquiries</h2>
              <p className={`mt-4 font-helvetica-light text-[clamp(1rem,1.1vw,1.05rem)] leading-[1.6] ${secondaryTextClass}`}>
                Same approach. Scoped to your market.
              </p>
            </div>
            <ServiceCaseStudyCard
              title="The Boiler Co."
              category="Trades · SEO · 14+ months"
              image="/projects/boiler.avif"
              imageAlt="The Boiler Co trades business SEO case study"
              situation="Lead flow was extremely inconsistent: mainly referrals and existing customers, with paid ads as the only real attempt at new business. When ads underperformed or had to pause, the diary became unpredictable."
              outcome="SEO became a consistent source of new business. Within three months organic search was delivering regular enquiries. Impressions grew from around 8,000 to a peak above 21,000 per week, with clicks rising from about 20 to a peak of 74, and average position improved from 37.8 to 13.7. Retained for over 14 months with additional website work."
              metrics={caseStudyMetrics}
              quote="After a frustrating run with agencies, this gave us genuine clarity on what to do and why it would work."
              attribution="Ant Vitale, The Boiler Co"
              caseStudyHref="/case-studies/boiler-co"
            />
            <p className={`mx-auto mt-6 max-w-2xl text-center font-helvetica-light text-[0.95rem] leading-[1.6] ${secondaryTextClass}`}>
              For a different shape of result, we moved{' '}
              <Link href="/case-studies/norfolk-boards" className="font-helvetica font-medium text-brand-blue hover:underline">
                Norfolk Boards
              </Link>{' '}
              off SEO in December 2025 once the foundation was in good shape. Their organic search kept growing through the following year without us.
            </p>
          </Container>
        </section>

        {/* Stage 6c: Engagement */}
        <section className="py-16 md:py-20 lg:py-24" aria-labelledby="seo-engage-heading">
          <Container>
            <div className="mb-10 max-w-3xl">
              <p className="mb-3 font-helvetica text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-brand-blue">Get in touch</p>
              <h2 id="seo-engage-heading" className={sectionHeadingClass}>How to start</h2>
              <p className={`mt-4 font-helvetica-light text-[clamp(1rem,1.1vw,1.05rem)] leading-[1.6] ${secondaryTextClass}`}>
                Start with an audit. No retainer required.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {engagementOptions.map((option) => (
                <article
                  key={option.name}
                  className={`grid min-h-full grid-rows-[auto_auto_1fr_auto] rounded-lg border p-6 shadow-sm ${
                    option.highlighted
                      ? 'relative z-10 scale-[1.02] border-brand-blue bg-brand-blue text-white shadow-[0_18px_45px_rgba(0,123,255,0.28)] lg:scale-[1.03]'
                      : 'border-gray-200 bg-white/85 dark:border-gray-800 dark:bg-gray-950/60'
                  }`}
                >
                  <div className="mb-4 h-7">
                    {option.highlighted && (
                      <p className="inline-flex rounded-full bg-white px-3 py-1 font-helvetica text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-brand-blue">
                        Most common
                      </p>
                    )}
                  </div>
                  <div>
                    <h3 className={`font-futura text-[clamp(1.25rem,1.6vw,1.5rem)] font-bold ${option.highlighted ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                      {option.name}
                    </h3>
                    <p className={`mt-3 font-helvetica-light text-[0.95rem] leading-[1.55] ${option.highlighted ? 'text-white' : secondaryTextClass}`}>
                      {option.summary}
                    </p>
                  </div>
                  <ul className="mt-6 space-y-3">
                    {option.features.map((feature) => (
                      <li key={feature} className={`flex gap-3 font-helvetica-light text-[0.9rem] leading-[1.45] ${option.highlighted ? 'text-white' : secondaryTextClass}`}>
                        <CheckIcon className={option.highlighted ? 'text-white' : 'text-brand-blue'} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={SEO_CONTACT}
                    className={`mt-6 self-end font-helvetica text-[0.9rem] font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 ${option.highlighted ? 'text-white underline-offset-2 hover:underline focus-visible:ring-white' : 'text-brand-blue hover:underline dark:focus-visible:ring-offset-gray-950'}`}
                  >
                    Discuss this option →
                  </Link>
                </article>
              ))}
            </div>
          </Container>
        </section>

        {/* Stage 6d: Fit check */}
        <section className="py-16 md:py-20 lg:py-24" aria-labelledby="seo-fit-heading">
          <Container>
            <h2 id="seo-fit-heading" className={`${sectionHeadingClass} mb-8`}>Is Consultico SEO a good fit?</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-gray-200 bg-white/85 p-6 dark:border-gray-700 dark:bg-gray-950/80">
                <h3 className="mb-4 font-futura text-[clamp(1.1rem,1.5vw,1.3rem)] font-bold text-brand-blue">Good fit</h3>
                <ul className="space-y-3">
                  {fitChecks.good.map((item) => (
                    <li key={item} className={`flex gap-3 font-helvetica-light text-[0.95rem] leading-[1.55] ${bodyTextClass}`}>
                      <span className="text-brand-blue" aria-hidden="true">✔</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-gray-200 bg-brand-silk/70 p-6 dark:border-gray-700 dark:bg-gray-900">
                <h3 className={`mb-4 font-futura text-[clamp(1.1rem,1.5vw,1.3rem)] font-bold ${bodyTextClass}`}>Not the right fit</h3>
                <ul className="space-y-3">
                  {fitChecks.bad.map((item) => (
                    <li key={item} className={`flex gap-3 font-helvetica-light text-[0.95rem] leading-[1.55] ${secondaryTextClass}`}>
                      <span className="text-gray-500" aria-hidden="true">✕</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </section>

        <section className="border-t border-gray-200 bg-brand-silk/50 py-10 dark:border-gray-800 dark:bg-gray-900/40">
          <Container>
            <p className={`mx-auto max-w-3xl text-center font-helvetica-light text-[clamp(0.95rem,1.1vw,1.05rem)] leading-[1.65] ${secondaryTextClass}`}>
              Related reading:{' '}
              <Link href="/articles/why-strategy-before-seo" className="font-medium text-brand-blue underline-offset-2 hover:underline">
                Why strategy should come before SEO
              </Link>
              {' '}and{' '}
              <Link href="/articles/what-is-generative-engine-optimisation" className="font-medium text-brand-blue underline-offset-2 hover:underline">
                what generative engine optimisation actually is
              </Link>
              .
            </p>
          </Container>
        </section>

        <section className="border-t border-gray-200 bg-white py-12 dark:border-gray-800 dark:bg-gray-950 md:py-16" aria-labelledby="seo-industry-heading">
          <Container>
            <div className="mx-auto max-w-5xl">
              <h2 id="seo-industry-heading" className={`${sectionHeadingClass} mb-4`}>
                SEO by industry
              </h2>
              <p className={`mb-8 max-w-3xl font-helvetica-light text-[clamp(1rem,1.1vw,1.05rem)] leading-[1.65] ${secondaryTextClass}`}>
                Trades and service businesses often need sector-specific SEO: different searches, different map-pack
                competition, different job values. Browse our industry guides for playbooks tailored to your market, or
                see the full{' '}
                <Link href={SEO_BY_INDUSTRY_PATH} className="font-medium text-brand-blue underline-offset-2 hover:underline">
                  SEO by industry hub
                </Link>
                .
              </p>
              <SeoIndustryGrid industries={liveIndustryPages} />
            </div>
          </Container>
        </section>

        <section className="border-t border-gray-200 bg-brand-silk/50 py-10 dark:border-gray-800 dark:bg-gray-900/40">
          <Container>
            <p className={`mx-auto max-w-3xl text-center font-helvetica-light text-[clamp(0.95rem,1.1vw,1.05rem)] leading-[1.65] ${secondaryTextClass}`}>
              Based in Glasgow?{' '}
              <Link href="/seo-glasgow" className="font-medium text-brand-blue underline-offset-2 hover:underline">
                See our SEO agency in Glasgow
              </Link>{' '}
              for local search, map pack visibility, and on-the-ground support when you need it.
            </p>
          </Container>
        </section>

        <section className="bg-white dark:bg-gray-950">
          <Container>
            <FaqSection faqs={SERVICE_FAQS.seo} />
          </Container>
        </section>

        <ServiceCtaBand
          title="Ready to get new business from Google and AI search?"
          body="Let's discuss an SEO audit and find what's blocking your visibility, and what to fix first for the fastest return."
          buttonLabel={SEO_CTA_LABEL}
          href={SEO_CONTACT}
        />
      </main>
    </>
  );
}
