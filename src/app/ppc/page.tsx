import type { Metadata } from 'next';
import Container from '@/components/Container';
import FaqSection from '@/components/FaqSection';
import ServiceDesktopHeader from '@/components/ServiceDesktopHeader';
import ServicePageJsonLd from '@/components/ServicePageJsonLd';
import PpcSixChecksDiagram from '@/components/services/PpcSixChecksDiagram';
import ServiceCtaBand from '@/components/services/ServiceCtaBand';
import Link from 'next/link';
import { CONSULTICO_GBP_URL } from '@/lib/contact';
import { ppcPageGoogleReviews } from '@/lib/google-reviews';
import { SERVICE_FAQS } from '@/lib/service-faqs';
import { pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({
  title: 'PPC & Google Ads Management in Glasgow | Consultico',
  description:
    'Honest, margin-aware Google and Meta Ads management from a Glasgow consultancy. We start with your numbers and tell you when paid ads are worth it.',
  path: '/ppc',
  absoluteTitle: true,
});

const PPC_CONTACT = '/contact?interest=ppc';
const PPC_CTA_LABEL = 'Start with a PPC audit';

const sectionHeadingClass =
  'relative text-[clamp(1.5rem,2.4vw,2.6rem)] leading-[1.1] font-futura font-bold text-brand-blue';

const bodyTextClass = 'text-gray-800 dark:text-gray-200';
const secondaryTextClass = 'text-gray-700 dark:text-gray-300';

const ppcPainPoints = [
  'Paid for clicks that never turned into an enquiry or a sale.',
  'Reached the wrong people, or the right people at the wrong moment.',
  'Struggled to say, with confidence, what each pound of spend brings back.',
  'Watched your costs climb while results stayed flat or slipped.',
];

const problemStakes = [
  'Budget drains into searches and audiences that were never going to buy.',
  'You scale spend on guesswork, so the losses scale with it.',
  'You cannot tell a winning campaign from a losing one, so you keep funding both.',
  'Every month without clear measurement is a month of decisions made blind.',
];

const solutionPoints = [
  'Every campaign has a defined objective and a way to measure success before it goes live.',
  'Spend follows intent and margin, so budget flows toward what actually pays back.',
  'You get reporting you can read, so you always know what each pound returns.',
];

const whyConsultico = [
  'Strategy first. We start with your numbers and objectives, not the ad platform\'s defaults.',
  'Margin-aware. We manage to your unit economics, not vanity metrics.',
  'Honest. We will tell you when paid is the wrong spend, even when it costs us the retainer.',
  'Google and Meta. We build and manage both, with conversion tracking set up properly from day one.',
];

const frameworkChecks = [
  {
    label: 'Tracking',
    question: 'Can every useful action be measured?',
    cost: 'You are flying blind, and cannot trust a single result.',
  },
  {
    label: 'Targeting',
    question: 'Is budget reaching people with real intent?',
    cost: 'You pay to reach people who were never going to buy.',
  },
  {
    label: 'Creative',
    question: 'Do your ads give people a reason to act?',
    cost: 'You pay for impressions that get scrolled past.',
  },
  {
    label: 'Landing page',
    question: 'Does the page deliver on the promise of the ad?',
    cost: 'You pay for the click, then lose them on arrival.',
  },
  {
    label: 'Budget',
    question: 'Is spend flowing toward proof, not guesswork?',
    cost: 'Winners get starved while losers keep getting funded.',
  },
  {
    label: 'Reporting',
    question: 'Can you make decisions quickly from the data?',
    cost: 'You react late, after the money is already gone.',
  },
];

const processSteps = [
  {
    number: '01',
    phase: 'First 1 to 2 weeks',
    title: 'Audit and plan',
    body: 'We map your tracking, spend, targeting and the searches that matter, then prioritise what to fix first and why.',
  },
  {
    number: '02',
    phase: 'First 1 to 2 months',
    title: 'Launch and optimise',
    body: 'We rebuild or launch campaigns around defined objectives, then test creative, audiences and bids and tighten as the data comes in.',
  },
  {
    number: '03',
    phase: 'Month 2 and beyond',
    title: 'Scale and report',
    body: 'We put more budget behind what is proven, cut what is not, and report on what each pound returns.',
  },
];

const ppcIncludes = [
  {
    title: 'Google Ads management',
    description:
      'Search campaigns built around the keywords that convert, with the negative keywords, account structure and bidding to stop budget leaking on the wrong clicks.',
    features: [
      'Search campaign setup and optimisation',
      'Negative keyword and account structure',
      'Bidding strategy tied to your objectives',
      'Ongoing performance refinement',
    ],
  },
  {
    title: 'Meta Ads (Facebook and Instagram)',
    description:
      'Paid social with audience testing, platform-native creative and retargeting, built for the feed rather than repurposed from search.',
    features: [
      'Audience testing and segmentation',
      'Platform-native creative direction',
      'Retargeting and funnel alignment',
      'Cross-platform reporting',
    ],
  },
  {
    title: 'Conversion tracking and landing pages',
    description:
      'Measurement set up properly, plus landing-page guidance so the clicks you pay for actually convert.',
    features: [
      'Conversion event setup and validation',
      'Attribution and tag hygiene',
      'Landing-page guidance and testing',
      'Funnel alignment with ad messaging',
    ],
  },
  {
    title: 'Reporting and analytics',
    description:
      'Plain-English reporting tied to your objectives, so you always know what is working and what to do next.',
    features: [
      'Monthly performance reporting',
      'ROI and cost-per-conversion tracking',
      'Clear recommendations, not dashboard dumps',
      'Decisions tied to your margins',
    ],
  },
];

const walkAwayOutcomes = [
  'You know what each pound of spend actually brings back.',
  'You can scale the campaigns that work, with confidence rather than hope.',
  'You stop bleeding budget on the wrong clicks and the wrong audiences.',
  'You make decisions from data you trust, not a dashboard you do not understand.',
  'You have a partner who will tell you to spend less when that is the right call, not just more.',
];

const engagementOptions = [
  {
    name: 'PPC Audit',
    summary: 'A full review of your account across all six dimensions, with a prioritised plan you can act on with us or alone.',
    features: [
      'Tracking and conversion review',
      'Wasted-spend analysis',
      'Targeting and structure review',
      'Clear next-step plan',
    ],
    highlighted: false,
  },
  {
    name: 'Retained PPC Management',
    summary: 'Ongoing management of Google and/or Meta, built around your objectives and margins.',
    features: [
      'Campaign management and optimisation',
      'Creative and audience testing',
      'Conversion tracking',
      'Plain-English monthly reporting',
    ],
    highlighted: true,
  },
  {
    name: 'PPC + Landing / CRO',
    summary: 'Management plus landing-page and conversion work, so the whole funnel pays back, not just the click.',
    features: [
      'Everything in retained management',
      'Landing-page guidance and testing',
      'Funnel and tracking improvements',
      'Joined-up reporting',
    ],
    highlighted: false,
  },
];

const fitChecks = {
  good: [
    'You have real demand and a product or service that already sells.',
    'You are willing to track conversions and act on what the data shows.',
    'You want a partner who manages to your margins, not just to clicks.',
    'You can give a campaign a few weeks to gather data before judging it.',
  ],
  bad: [
    'You want guaranteed ROAS, or results in 14 days.',
    'You are not willing to set up or fix conversion tracking.',
    'You want the cheapest possible management, whatever the return.',
  ],
};

function CheckIcon({ className = 'text-brand-blue' }: { className?: string }) {
  return (
    <svg className={`mt-1 h-4 w-4 flex-none ${className}`} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="M13 5l7 7-7 7" />
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
      href={PPC_CONTACT}
      className={`inline-flex items-center justify-center gap-2 rounded-lg bg-brand-blue px-8 py-3 font-helvetica text-[clamp(1rem,1.2vw,1.125rem)] font-medium text-white transition-colors hover:bg-[#006FE6] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-950 ${className}`}
    >
      {PPC_CTA_LABEL}
      <ArrowIcon />
    </Link>
  );
}

export default function PpcPage() {
  const graemeReview = ppcPageGoogleReviews[0];

  return (
    <>
      <ServicePageJsonLd pageKey="ppc" />
      <main className="relative" id="main-content">
        {/* Section 1: Hero */}
        <section className="relative pb-16 md:pb-20 lg:pb-24" aria-labelledby="ppc-hero-heading">
          <ServiceDesktopHeader />
          <div className="absolute inset-0 dot-grid-premium opacity-30 dark:opacity-15" aria-hidden="true" />
          <Container className="relative pt-[10.5rem] md:pt-[12rem] lg:pt-[13.5rem] xl:pt-[14.5rem] 2xl:pt-[15rem]">
            <div className="flex w-full max-w-3xl flex-col gap-10 md:max-w-4xl lg:max-w-6xl">
              <div className="rounded-xl border border-gray-200/80 bg-white/80 p-6 shadow-sm backdrop-blur-sm dark:border-gray-700/80 dark:bg-gray-950/80 md:p-7">
                <p className="mb-4 font-helvetica text-[clamp(0.75rem,1vw,0.875rem)] uppercase tracking-[0.16em] text-gray-700 dark:text-gray-300">
                  PPC & Paid Media
                </p>
                <h1
                  id="ppc-hero-heading"
                  className="mb-4 font-futura text-[clamp(1.55rem,2.35vw,2.65rem)] font-bold leading-[1.1] text-brand-blue"
                >
                  Get paid ads that pay you back
                </h1>
                <p className={`mb-5 font-helvetica text-[clamp(0.9rem,1.05vw,1rem)] leading-[1.5] ${secondaryTextClass}`}>
                  For trades and B2C brands with real demand, already spending on Google or Meta and unsure it is working.
                </p>
                <p className={`mb-8 font-helvetica text-[clamp(1rem,1.35vw,1.25rem)] leading-[1.65] text-gray-900 dark:text-gray-100`}>
                  Consultico is a Glasgow-based marketing consultancy that manages Google and Meta paid ads for businesses across the UK. We run paid media the way a strategist would, not a button-pusher: around your margins, your real numbers and a defined objective, so every pound of spend is tied to a return you can measure. Most clients have a clear picture of what their ads are actually doing within the first 90 days, depending on market and starting point. And if the honest answer is that paid ads are not where your next pound should go, we will tell you that too.
                </p>

                <div className="mb-8 flex items-start gap-4 border-y border-gray-200 py-6 dark:border-gray-800">
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

                <CtaLink />
                <div className="mt-8 border-l-2 border-brand-blue pl-4">
                  <p className={`font-helvetica text-[clamp(0.95rem,1.15vw,1.1rem)] leading-[1.6] ${bodyTextClass}`}>
                    No vanity metrics. No guaranteed ROAS. We set honest expectations from the audit, and we will tell you plainly if paid ads are the wrong spend for you right now.
                  </p>
                </div>
              </div>

              <div className="w-full rounded-xl border border-gray-200 bg-white/95 p-3 shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:border-gray-700 dark:bg-gray-900/95 md:p-4">
                <div className="overflow-hidden rounded-lg bg-brand-silk dark:bg-gray-800">
                  <PpcSixChecksDiagram />
                </div>
                <p className={`mt-4 text-center font-helvetica text-[0.95rem] leading-[1.5] ${secondaryTextClass}`}>
                  Where paid budget leaks, and where it should go: tracking, targeting, creative, landing page, budget, reporting.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Section 2: Problem */}
        <section className="relative overflow-hidden bg-brand-silk/90 py-16 shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:bg-gray-900/85 md:py-20 lg:py-24" aria-labelledby="ppc-problem-heading">
          <Container>
            <h2 id="ppc-problem-heading" className={`${sectionHeadingClass} mb-6 max-w-[32ch]`}>
              Most ad budgets do not fail because of the ads. They fail because nobody is watching the right numbers.
            </h2>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_0.9fr]">
              <div className="rounded-xl border border-gray-200 bg-white/85 p-6 dark:border-gray-700 dark:bg-gray-950/80">
                <p className={`mb-5 font-helvetica text-[clamp(1rem,1.3vw,1.2rem)] ${bodyTextClass}`}>You have likely:</p>
                <BulletList items={ppcPainPoints} />
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
              </div>
            </div>
            <p className={`mt-8 font-helvetica-light text-[clamp(1rem,1.1vw,1.05rem)] ${secondaryTextClass}`}>
              That is fixable, once you can see where the money is actually going.
            </p>
          </Container>
        </section>

        {/* Section 3: Solution + why */}
        <section className="py-16 md:py-20 lg:py-24" aria-labelledby="ppc-solution-heading">
          <Container>
            <h2 id="ppc-solution-heading" className={`${sectionHeadingClass} mb-10 max-w-[28ch]`}>
              Paid ads work when the strategy comes before the spend.
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
              Paid media works when six things are right. Most accounts get two or three of them.
            </p>
          </Container>
        </section>

        {/* Section 4: Early proof */}
        <section className="border-y border-gray-200 bg-white py-12 dark:border-gray-800 dark:bg-gray-950 md:py-16" aria-labelledby="ppc-proof-heading">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-3 font-helvetica text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-brand-blue">Google reviews</p>
              <h2 id="ppc-proof-heading" className="font-futura text-[clamp(1.35rem,2.2vw,1.75rem)] font-bold text-brand-blue">
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
              {ppcPageGoogleReviews.map((review) => (
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

            <p className={`mx-auto mt-8 max-w-2xl text-center font-helvetica-light text-[0.95rem] leading-[1.6] ${secondaryTextClass}`}>
              11 five-star reviews on Google. The thinking behind our strategy work was developed with research funding from a 2025 University of Strathclyde Inspire fellowship.
            </p>

            <div className="mt-10 flex justify-center">
              <CtaLink />
            </div>
          </Container>
        </section>

        {/* Section 5: Thesis band */}
        <section className="relative overflow-hidden bg-brand-blue py-16 text-white md:py-20" data-cursor-theme="light" aria-labelledby="ppc-thesis-heading">
          <div className="absolute inset-0 dot-grid-premium opacity-20" aria-hidden="true" />
          <Container className="relative">
            <div className="mx-auto max-w-4xl text-center">
              <h2 id="ppc-thesis-heading" className="font-futura text-[clamp(2rem,3.2vw,3.5rem)] font-bold leading-[1.05] text-white">
                Paid ads buy you attention. They do not buy you a strategy. The businesses that win with PPC know their numbers before they raise their budget.
              </h2>
              <div className="mx-auto mt-8 max-w-3xl space-y-4 font-helvetica text-[clamp(1rem,1.15vw,1.1rem)] leading-[1.65] text-white sm:text-center">
                <p>
                  For a trades business, that means knowing what a booked job is worth before you bid on the search that wins it. For a B2C brand, it means knowing your margin and repeat rate before you scale spend. We work that out first, wherever you are in the UK.
                </p>
              </div>
              <Link
                href={PPC_CONTACT}
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-7 py-3 font-helvetica font-medium text-brand-blue transition-colors hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-blue"
              >
                {PPC_CTA_LABEL}
                <ArrowIcon />
              </Link>
            </div>
          </Container>
        </section>

        {/* Section 6: Framework */}
        <section className="py-16 md:py-20 lg:py-24" aria-labelledby="ppc-framework-heading">
          <Container>
            <div className="mb-10 max-w-3xl">
              <p className="mb-3 font-helvetica text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-brand-blue">Self-diagnosis</p>
              <h2 id="ppc-framework-heading" className={sectionHeadingClass}>
                Six things decide whether your paid ads make money. We check all six.
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {frameworkChecks.map((item) => (
                <article key={item.label} className="relative overflow-hidden rounded-lg border border-gray-200 bg-white/85 p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/75">
                  <div className="absolute inset-x-0 top-0 h-1 bg-brand-blue" aria-hidden="true" />
                  <p className="mb-3 mt-2 font-helvetica text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-brand-blue">{item.label}</p>
                  <h3 className="font-futura text-[clamp(1rem,1.2vw,1.1rem)] font-bold text-gray-900 dark:text-white">{item.question}</h3>
                  <p className={`mt-3 font-helvetica-light text-[0.9rem] leading-[1.5] ${secondaryTextClass}`}>{item.cost}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        {/* Section 7: Process */}
        <section className="bg-brand-silk/80 py-16 dark:bg-gray-900/80 md:py-20 lg:py-24" aria-labelledby="ppc-process-heading">
          <Container>
            <div className="mb-10 text-center">
              <p className="mb-3 font-helvetica text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-brand-blue">How it works</p>
              <h2 id="ppc-process-heading" className={`${sectionHeadingClass} mx-auto max-w-3xl`}>
                From scattered spend to controlled, accountable acquisition.
              </h2>
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

        {/* Section 8: What we implement */}
        <section className="py-16 md:py-20 lg:py-24" aria-labelledby="ppc-implement-heading">
          <Container>
            <div className="mb-10 max-w-3xl">
              <p className="mb-3 font-helvetica text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-brand-blue">What we build</p>
              <h2 id="ppc-implement-heading" className={sectionHeadingClass}>Everything needed to make paid media accountable.</h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {ppcIncludes.map((item) => (
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

        {/* Section 9: Outcomes */}
        <section className="bg-white py-16 dark:bg-gray-950 md:py-20 lg:py-24" aria-labelledby="ppc-outcomes-heading">
          <Container>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1fr] lg:items-center">
              <div>
                <p className="mb-3 font-helvetica text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-brand-blue">What changes for you</p>
                <h2 id="ppc-outcomes-heading" className={sectionHeadingClass}>When paid media is run properly, this is what shifts.</h2>
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

        {/* Section 10: Channel depth */}
        <section className="py-16 md:py-20 lg:py-24" aria-labelledby="ppc-channels-heading">
          <Container>
            <div className="max-w-3xl">
              <p className="mb-3 font-helvetica text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-brand-blue">Channels</p>
              <h2 id="ppc-channels-heading" className={sectionHeadingClass}>Google, Meta, and the tracking that ties it together.</h2>
              <p className={`mt-6 font-helvetica-light text-[clamp(1rem,1.15vw,1.1rem)] leading-[1.65] ${secondaryTextClass}`}>
                Google and Meta solve different jobs. Google Ads reaches people who are already searching for what you sell, so intent is high and the path to a sale is short. Meta reaches people before they are searching, which is powerful for brands building demand but unforgiving if the creative or audience is off. We will tell you which fits your business, and in what mix, rather than selling you both by default.
              </p>
              <p className={`mt-5 font-helvetica-light text-[clamp(1rem,1.15vw,1.1rem)] leading-[1.65] ${secondaryTextClass}`}>
                Underneath both sits the part most accounts get wrong: tracking. If you cannot measure the action that matters, whether that is a booked job, a call or a sale, every other decision is a guess. We set tracking up first, then treat your landing page as half the campaign, because a great ad pointed at a weak page still loses money.
              </p>
              <p className={`mt-6 font-helvetica text-[0.95rem] ${bodyTextClass}`}>
                <Link href="/articles/best-ppc-agencies-uk" className="font-medium text-brand-blue underline-offset-2 hover:underline">
                  Read our guide to choosing a PPC agency in the UK
                </Link>
                .
              </p>
            </div>
          </Container>
        </section>

        {/* Section 11: Case study */}
        <section className="bg-brand-silk/80 py-16 dark:bg-gray-900/80 md:py-20 lg:py-24" aria-labelledby="ppc-case-study-heading">
          <Container>
            <div className="mx-auto max-w-3xl">
              <p className="mb-3 font-helvetica text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-brand-blue">Proof</p>
              <h2 id="ppc-case-study-heading" className={`${sectionHeadingClass} mb-8`}>Honest advice, in practice</h2>
              <div className={`space-y-6 font-helvetica-light text-[clamp(1rem,1.1vw,1.05rem)] leading-[1.65] ${bodyTextClass}`}>
                <p>
                  We treat paid media as one tool, not the whole answer. The clearest example is a contrast. The Boiler Co, a trades business based in Bristol, came to us relying heavily on paid ads. When those ads had to pause, their lead flow was suddenly at risk. The right advice there was not more PPC. It was to build an{' '}
                  <Link href="/seo" className="font-medium text-brand-blue underline-offset-2 hover:underline">
                    SEO foundation
                  </Link>{' '}
                  so organic search could carry the calendar, which it now does. That is the same judgement we bring to every paid account: spend where it pays back, and be honest when another channel is the better bet.
                </p>
                <p>
                  {/* PAUL: confirm figures — ~£8 cost per lead within 3 months; £28 average cost per conversion in best month */}
                  On the paid side, the clearest result is MCD Gas, a gas and heating business we run Google Ads for. Within three months we brought their cost per lead down to around £8, and in their best month we delivered an average cost per conversion of £28. That is the kind of accountable, margin-aware spend we aim for: a number the owner can actually plan around.
                </p>
                <blockquote className="border-l-2 border-brand-blue pl-5 font-helvetica-light italic">
                  &ldquo;{graemeReview.quote}&rdquo;
                  <footer className={`mt-3 not-italic font-helvetica text-[0.9rem] font-medium ${bodyTextClass}`}>
                    {graemeReview.name}, {graemeReview.company}
                  </footer>
                </blockquote>
                <p className={`text-[0.9rem] ${secondaryTextClass}`}>
                  Results vary by market, competition and starting point. The Boiler Co result is from SEO work, shown here to illustrate how we advise, not as a paid-media result.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Section 12: Engagement */}
        <section className="py-16 md:py-20 lg:py-24" aria-labelledby="ppc-engage-heading">
          <Container>
            <div className="mb-10 max-w-3xl">
              <p className="mb-3 font-helvetica text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-brand-blue">Get in touch</p>
              <h2 id="ppc-engage-heading" className={sectionHeadingClass}>PPC support scaled to your spend and goals.</h2>
              <p className={`mt-4 font-helvetica-light text-[clamp(1rem,1.1vw,1.05rem)] leading-[1.6] ${secondaryTextClass}`}>
                No fixed pricing shown. Budget is set after the audit.
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
                    href={PPC_CONTACT}
                    className={`mt-6 self-end font-helvetica text-[0.9rem] font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 ${option.highlighted ? 'text-white underline-offset-2 hover:underline focus-visible:ring-white' : 'text-brand-blue hover:underline dark:focus-visible:ring-offset-gray-950'}`}
                  >
                    Discuss this option →
                  </Link>
                </article>
              ))}
            </div>
          </Container>
        </section>

        {/* Section 13: Fit check */}
        <section className="py-16 md:py-20 lg:py-24" aria-labelledby="ppc-fit-heading">
          <Container>
            <h2 id="ppc-fit-heading" className={`${sectionHeadingClass} mb-8`}>Is Consultico PPC a good fit?</h2>
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
              <Link href="/articles/best-ppc-agencies-uk" className="font-medium text-brand-blue underline-offset-2 hover:underline">
                Best PPC agencies in the UK
              </Link>
              . Need organic as well?{' '}
              <Link href="/seo" className="font-medium text-brand-blue underline-offset-2 hover:underline">
                See our SEO services
              </Link>
              . Strategy first?{' '}
              <Link href="/articles/why-strategy-before-seo" className="font-medium text-brand-blue underline-offset-2 hover:underline">
                Why strategy should come before SEO
              </Link>
              .
            </p>
          </Container>
        </section>

        <section className="bg-white dark:bg-gray-950">
          <Container>
            <FaqSection faqs={SERVICE_FAQS.ppc} />
          </Container>
        </section>

        <ServiceCtaBand
          title="Not sure your ad budget is working as hard as it should?"
          body="Start with a PPC audit, and we will show you where your spend is leaking and what to fix first."
          buttonLabel={PPC_CTA_LABEL}
          href={PPC_CONTACT}
        />
      </main>
    </>
  );
}
