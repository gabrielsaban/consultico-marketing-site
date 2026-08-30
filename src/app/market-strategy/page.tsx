import type { Metadata } from 'next';
import Container from '@/components/Container';
import FaqSection from '@/components/FaqSection';
import ServiceDesktopHeader from '@/components/ServiceDesktopHeader';
import ServicePageJsonLd from '@/components/ServicePageJsonLd';
import Link from 'next/link';
import { SERVICE_FAQS } from '@/lib/service-faqs';
import { servicePageMeta } from '@/lib/seo';

export const metadata: Metadata = servicePageMeta('market-strategy');

const stats = [
  { number: '12 mo', label: 'Average client partnership' },
  { number: '3 mo', label: 'Calendar filled from organic, paid ads paused (Boiler Co)' },
  { number: '14 mo', label: 'Longest retained relationship (Boiler Co)' },
  { number: '5.0', label: 'Rated on Google' },
];

const painPoints = [
  {
    title: 'Competitors are winning customers you should have',
    body: "They may not be better. They may just have a clearer market position and a sharper reason to be chosen.",
  },
  {
    title: 'You are struggling to stand apart',
    body: 'When positioning is unclear, businesses drift toward price competition and lose the value story that should protect margin.',
  },
  {
    title: 'Marketing spend is not returning enough',
    body: 'Tactics are easier to buy than strategy, but channels perform best when they are guided by a commercial model.',
  },
  {
    title: 'Growth has plateaued and the reason is not obvious',
    body: 'The next level usually needs a different map, not just more effort poured into the same activity.',
  },
];

const strategyIncludes = [
  {
    title: 'Market Research & Analysis',
    description: 'A clear read on your landscape, customer segments, competitors, and commercial opportunity.',
    features: [
      'Customer persona development',
      'Competitor intelligence',
      'Market sizing and opportunity assessment',
      'Industry trend analysis',
      'SWOT analysis',
    ],
  },
  {
    title: 'Strategic Positioning',
    description: 'A sharper value proposition and messaging structure built around why your market should choose you.',
    features: [
      'Value proposition development',
      'Brand positioning strategy',
      'Competitive differentiation',
      'Target market segmentation',
      'Messaging framework',
    ],
  },
  {
    title: 'Go-To-Market Strategy',
    description: 'A practical route for launching, entering a new market, or scaling what is already working.',
    features: [
      'Launch strategy and planning',
      'Channel strategy development',
      'Pricing strategy review',
      'Sales enablement planning',
      'Market entry tactics',
    ],
  },
  {
    title: 'Growth Strategy & Planning',
    description: 'A longer-range roadmap for growth that connects resource, timing, channel order, and measurement.',
    features: [
      'Growth opportunity identification',
      'Strategic roadmap creation',
      'KPI framework development',
      'Resource allocation planning',
      'Quarterly strategy reviews',
    ],
  },
];

const serviceQuestions = [
  {
    question: 'Is search where your customers actually decide?',
    body: 'SEO compounds, but only if people search before they buy. For some businesses that is the whole game. For others it is a slow answer to the wrong question.',
    href: '/seo',
    label: 'SEO',
  },
  {
    question: 'Do your margins survive a cost per click?',
    body: 'Paid ads buy attention immediately and stop the moment you stop paying. Whether that is worth it depends entirely on what a customer is worth to you.',
    href: '/ppc',
    label: 'PPC and paid media',
  },
  {
    question: 'Is the website the constraint, or something else?',
    body: 'A rebuild is often the most visible fix and rarely the most valuable one. Sometimes the site is genuinely the bottleneck. Sometimes it is the offer.',
    href: '/web-development',
    label: 'Web development',
  },
  {
    question: 'Does anyone need more content, or better reasons to buy?',
    body: 'Publishing more is easy to sell and easy to measure badly. The question is whether content is what is missing between interest and a decision.',
    href: '/content-creation',
    label: 'Content',
  },
] as const;

const strategyQuestions = [
  {
    question: 'Where can we win?',
    answer: 'Clarify the market segments, customer groups, and opportunities worth prioritising.',
  },
  {
    question: 'Why would they choose us?',
    answer: 'Define the positioning, proof, and value story that makes the business easier to select.',
  },
  {
    question: 'What should move first?',
    answer: 'Sequence channels, offers, and actions so execution starts where the return case is strongest.',
  },
  {
    question: 'How do we know it worked?',
    answer: 'Set practical measures for traction, performance, and when the strategy needs to change.',
  },
];

const strategyOutputs = ['Positioning', 'Channel order', 'Revenue logic', '90-day roadmap'];

/**
 * Kept deliberately honest. The previous "Enterprise / multi-market expansion /
 * dedicated strategy consultant" tier described an agency we are not, and every
 * tier said "Custom" while we publish real prices elsewhere on the site.
 * These three are what we actually sell. Prices shown are the published ones
 * (verified-facts.md); Think First is quoted per engagement, so it is not priced here.
 */
const engagementOptions = [
  {
    name: 'A conversation',
    summary: 'A free 20 to 30 minute call, using our own audit tool, to work out whether there is anything here worth paying for.',
    features: ['Free audit of your current position', 'An honest read on the opportunity', 'No obligation to go further', 'You keep whatever we find'],
    price: 'Free',
  },
  {
    name: 'Think First',
    summary: 'The full strategy engagement. A marketing model built around your business, before budget goes anywhere.',
    features: ['Channels, economics and sequencing mapped', 'A 12-month execution roadmap', 'Written reports and visual examples', 'Two months of follow-up support'],
    highlighted: true,
    price: 'Quoted',
  },
  {
    name: 'Advice by the hour',
    summary: 'For a specific decision rather than a whole plan. Useful when you mostly know what you are doing.',
    features: ['Consultation at an hourly rate', 'Bring one question or several', 'No retainer, no minimum term', 'Notes and next steps afterwards'],
    price: 'From £75/hr',
  },
];

const processSteps = [
  {
    number: '01',
    title: 'Discovery & Research',
    body: 'We study your market, customers, competitors, offer, and current growth constraints.',
  },
  {
    number: '02',
    title: 'Strategy Development',
    body: 'We shape the positioning, channel logic, priorities, and commercial assumptions into a workable plan.',
  },
  {
    number: '03',
    title: 'Implementation Roadmap',
    body: 'You leave with the next actions, measurement structure, and order of execution needed to move with confidence.',
  },
];

const CheckIcon = ({ className = 'text-brand-blue' }: { className?: string }) => (
  <svg
    className={`mt-1 h-4 w-4 flex-none ${className}`}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2.5"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const ArrowIcon = () => (
  <svg
    className="h-5 w-5"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M5 12h14" />
    <path d="M13 5l7 7-7 7" />
  </svg>
);

export default function MarketStrategyPage() {
  return (
    <>
      <ServicePageJsonLd pageKey="market-strategy" />
      <main className="relative">
      <section className="relative min-h-screen overflow-hidden pb-16 md:pb-20 lg:pb-0">
        <ServiceDesktopHeader />
        <div className="absolute inset-0 dot-grid-premium opacity-70 dark:opacity-25" aria-hidden="true" />
        <Container className="relative pt-[10.5rem] md:pt-[12rem] lg:min-h-screen lg:pt-[13.5rem] xl:pt-[14.5rem] 2xl:pt-[15rem] lg:pb-20 lg:flex lg:items-start">
          <div className="w-full">
            <div className="max-w-6xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-blue/25 bg-white/80 px-4 py-2 text-[0.78rem] font-helvetica font-semibold uppercase tracking-[0.14em] text-brand-blue shadow-sm dark:bg-gray-950/75">
                <span className="h-2 w-2 rounded-full bg-brand-blue" />
                Market Strategy
              </div>

              <h1 className="max-w-4xl font-futura text-[clamp(2.25rem,4vw,4.75rem)] font-bold leading-[1.02] text-gray-900 dark:text-white">
                <span className="block">Marketing strategy first.</span>
                <span className="block text-brand-blue">Then the marketing.</span>
              </h1>

              <p className="mt-7 max-w-3xl text-[clamp(1rem,1.45vw,1.3rem)] leading-[1.65] text-gray-800 dark:text-gray-200 font-helvetica-light">
                We&apos;re a strategy-led marketing consultancy in Glasgow, working with businesses across Scotland and the UK. Every service we offer starts the same way: working out what your numbers can actually support, and what should happen first. Sometimes that means we tell you not to spend yet.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-blue px-7 py-3 text-[clamp(1rem,1.15vw,1.1rem)] font-helvetica font-medium text-white transition-colors duration-200 hover:bg-[#006FE6] active:bg-[#0067D6] focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2"
                >
                  Schedule Your Free Consultation
                  <ArrowIcon />
                </Link>
              </div>

              <div className="mt-10 grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="border-l-2 border-brand-blue bg-white/65 px-4 py-3 shadow-sm dark:bg-gray-950/55"
                  >
                    <p className="font-futura text-[clamp(1.6rem,2.4vw,2.4rem)] font-bold leading-none text-brand-blue">
                      {stat.number}
                    </p>
                    <p className="mt-2 text-[clamp(0.75rem,0.95vw,0.9rem)] leading-[1.35] text-gray-600 dark:text-gray-300 font-helvetica-light">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 max-w-5xl border-l-2 border-brand-blue bg-white/70 px-5 py-4 shadow-sm dark:bg-gray-950/50">
              <p className="text-[clamp(1rem,1.25vw,1.18rem)] leading-[1.55] text-gray-800 dark:text-gray-200 font-helvetica">
                We&apos;d rather talk you out of the wrong spend than take the retainer for it.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Ethos: strategy first, whatever the service. Doubles as the cluster hub. */}
      <section className="relative py-16 md:py-20 lg:py-24" aria-labelledby="strategy-ethos-heading">
        <Container>
          <div className="max-w-3xl">
            <p className="mb-3 text-[0.8rem] font-helvetica font-semibold uppercase tracking-[0.16em] text-brand-blue">
              How we work
            </p>
            <h2 id="strategy-ethos-heading" className="font-futura text-[clamp(2rem,3.4vw,4rem)] font-bold leading-[1.05] text-gray-900 dark:text-white">
              Every service starts with the same question.
            </h2>
            <p className="mt-6 text-[clamp(1rem,1.25vw,1.15rem)] leading-[1.65] text-gray-700 dark:text-gray-300 font-helvetica-light">
              Strategy isn&apos;t a separate product we sell alongside the others. It&apos;s the thing that decides whether the others are worth doing at all. Whatever you come to us for, we start by working out whether it&apos;s the right thing to spend on, and what has to be true for it to pay back.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            {serviceQuestions.map((item) => (
              <article
                key={item.href}
                className="rounded-lg border border-gray-200 bg-white/85 p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/75"
              >
                <p className="font-futura text-[clamp(1.15rem,1.5vw,1.4rem)] font-bold leading-[1.2] text-gray-900 dark:text-white">
                  {item.question}
                </p>
                <p className="mt-3 text-[clamp(0.95rem,1.05vw,1rem)] leading-[1.55] text-gray-700 dark:text-gray-300 font-helvetica-light">
                  {item.body}
                </p>
                <Link
                  href={item.href}
                  className="mt-4 inline-flex items-center gap-2 font-helvetica text-[0.95rem] font-medium text-brand-blue underline-offset-2 hover:underline"
                >
                  {item.label}
                  <ArrowIcon />
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-8 max-w-3xl border-l-2 border-brand-blue bg-brand-silk/60 px-5 py-4 dark:bg-gray-900/60">
            <p className="text-[clamp(0.98rem,1.15vw,1.1rem)] leading-[1.6] text-gray-800 dark:text-gray-200 font-helvetica-light">
              If you&apos;d rather answer those questions properly before committing to anything, that&apos;s what{' '}
              <Link href="/think-first" className="font-medium text-brand-blue underline-offset-2 hover:underline">
                Think First
              </Link>{' '}
              is for. And we&apos;ve written up{' '}
              <Link href="/articles/why-strategy-before-seo" className="font-medium text-brand-blue underline-offset-2 hover:underline">
                why strategy should come before SEO
              </Link>{' '}
              if you want the reasoning before the conversation.
            </p>
          </div>
        </Container>
      </section>

      <section className="relative py-16 md:py-20 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.72fr_1fr] lg:gap-16">
            <div>
              <p className="mb-3 text-[0.8rem] font-helvetica font-semibold uppercase tracking-[0.16em] text-brand-blue">
                The problem
              </p>
              <h2 className="font-futura text-[clamp(2rem,3.4vw,4rem)] font-bold leading-[1.05] text-gray-900 dark:text-white">
                Working harder should not feel like standing still.
              </h2>
              <p className="mt-6 text-[clamp(1rem,1.25vw,1.15rem)] leading-[1.65] text-gray-700 dark:text-gray-300 font-helvetica-light">
                A strong offer can still get lost in a crowded market. Without clear positioning and a strategy that connects activity to commercial logic, even good marketing can become expensive noise.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {painPoints.map((point) => (
                <article
                  key={point.title}
                  className="rounded-lg border border-gray-200 bg-white/85 p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/75"
                >
                  <div className="mb-4 h-2 w-10 rounded-full bg-brand-blue" />
                  <h3 className="font-futura text-[clamp(1.1rem,1.4vw,1.3rem)] font-bold leading-[1.2] text-gray-900 dark:text-white">
                    {point.title}
                  </h3>
                  <p className="mt-3 text-[clamp(0.95rem,1.05vw,1rem)] leading-[1.55] text-gray-700 dark:text-gray-300 font-helvetica-light">
                    {point.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-brand-blue py-16 text-white md:py-20" data-cursor-theme="light">
        <div className="absolute inset-0 dot-grid-premium opacity-20" aria-hidden="true" />
        <Container className="relative">
          <div className="mx-auto max-w-5xl text-center">
            <p className="mb-4 text-[0.82rem] font-helvetica font-semibold uppercase tracking-[0.16em] text-white/75">
              Strategy before tactics
            </p>
            <h2 className="font-futura text-[clamp(2rem,3.6vw,4.5rem)] font-bold leading-[1.05]">
              Stop throwing darts in the dark. See the board first.
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-[clamp(1rem,1.3vw,1.25rem)] leading-[1.6] text-white/90 font-helvetica-light">
              Market strategy gives every campaign a job. It identifies the audience, the reason to believe, the channel order, and the commercial target before the budget starts moving.
            </p>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-brand-silk/80 py-16 shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:bg-gray-900/80 md:py-20 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.76fr_1fr] lg:gap-16 lg:items-start">
            <div>
              <p className="mb-3 text-[0.8rem] font-helvetica font-semibold uppercase tracking-[0.16em] text-brand-blue">
                Strategic decision map
              </p>
              <h2 className="font-futura text-[clamp(2rem,3.4vw,4rem)] font-bold leading-[1.05] text-gray-900 dark:text-white">
                Strategy is a set of decisions, not a list of ideas.
              </h2>
              <p className="mt-6 text-[clamp(1rem,1.25vw,1.15rem)] leading-[1.65] text-gray-700 dark:text-gray-300 font-helvetica-light">
                The work is designed to narrow options, expose tradeoffs, and give execution a commercial reason to happen in the right order.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {strategyOutputs.map((output) => (
                  <div key={output} className="border-l-2 border-brand-blue bg-white/75 px-4 py-3 shadow-sm dark:bg-gray-950/55">
                    <p className="font-futura text-[clamp(0.95rem,1.1vw,1.08rem)] font-bold text-brand-blue">{output}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {strategyQuestions.map((item, index) => (
                <article
                  key={item.question}
                  className="grid grid-cols-[3.25rem_1fr] gap-4 rounded-lg border border-gray-200 bg-white/85 p-5 shadow-sm dark:border-gray-800 dark:bg-gray-950/60"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-blue font-futura text-lg font-bold text-white">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <h3 className="font-futura text-[clamp(1.12rem,1.45vw,1.35rem)] font-bold leading-[1.15] text-gray-900 dark:text-white">
                      {item.question}
                    </h3>
                    <p className="mt-2 text-[clamp(0.95rem,1.05vw,1rem)] leading-[1.55] text-gray-700 dark:text-gray-300 font-helvetica-light">
                      {item.answer}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Proof. Every figure here is in verified-facts.md. Connor Best's review is
          quoted verbatim from our Google profile; the funding is HIS outcome, stated
          in his words, and must never be restated as something we delivered. */}
      <section className="bg-white py-16 dark:bg-gray-950 md:py-20 lg:py-24" aria-labelledby="strategy-proof-heading">
        <Container>
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-[0.8rem] font-helvetica font-semibold uppercase tracking-[0.16em] text-brand-blue">
              Proof
            </p>
            <h2 id="strategy-proof-heading" className="font-futura text-[clamp(2rem,3.4vw,4rem)] font-bold leading-[1.05] text-gray-900 dark:text-white">
              What clients say when we ask them to describe it.
            </h2>
            <p className="mt-6 text-[clamp(1rem,1.25vw,1.15rem)] leading-[1.65] text-gray-700 dark:text-gray-300 font-helvetica-light">
              We didn&apos;t brief anyone to talk about strategy. It&apos;s just what people write about afterwards.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <blockquote className="rounded-lg border border-brand-blue/30 bg-brand-silk/60 p-6 shadow-sm dark:border-brand-blue/40 dark:bg-gray-900/70">
              <p className="text-[clamp(1rem,1.15vw,1.1rem)] leading-[1.6] text-gray-800 dark:text-gray-200 font-helvetica-light">
                &ldquo;When I was starting my business I was looking for support and guidance in marketing strategy, as a young(ish) entrepreneur. I met with Consultico and they provided an effective, transparent picture of what my next steps should be and how to implement them. After this engagement my business has received funding to develop the product, and we have a clear route to market which we did not have before.&rdquo;
              </p>
              <footer className="mt-4 font-helvetica text-[0.92rem] text-gray-600 dark:text-gray-400">
                Connor Best, via Google
              </footer>
            </blockquote>

            <blockquote className="rounded-lg border border-gray-200 bg-white/85 p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/75">
              <p className="text-[clamp(1rem,1.15vw,1.1rem)] leading-[1.6] text-gray-800 dark:text-gray-200 font-helvetica-light">
                &ldquo;As well as suggesting features for the site that I hadn&apos;t considered, he asked thought-provoking questions about my business and my approach to my work. Together we have produced a website that I believe truly reflects who I am and what I do.&rdquo;
              </p>
              <footer className="mt-4 font-helvetica text-[0.92rem] text-gray-600 dark:text-gray-400">
                Hilary Hepburn, via Google
              </footer>
            </blockquote>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
            <article className="rounded-lg border border-gray-200 bg-white/85 p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/75">
              <h3 className="font-futura text-[clamp(1.15rem,1.5vw,1.35rem)] font-bold text-gray-900 dark:text-white">
                We told a client to spend less on us, and it still grew
              </h3>
              <p className="mt-3 text-[clamp(0.95rem,1.05vw,1rem)] leading-[1.55] text-gray-700 dark:text-gray-300 font-helvetica-light">
                In December 2025 we recommended Norfolk Boards move budget off SEO. Rankings kept climbing anyway, month after month. The strategy work found the constraint was the calendar, not the marketing.
              </p>
              <Link href="/case-studies/norfolk-boards" className="mt-4 inline-flex items-center gap-2 font-helvetica text-[0.95rem] font-medium text-brand-blue underline-offset-2 hover:underline">
                Read the case study
                <ArrowIcon />
              </Link>
            </article>

            <article className="rounded-lg border border-gray-200 bg-white/85 p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/75">
              <h3 className="font-futura text-[clamp(1.15rem,1.5vw,1.35rem)] font-bold text-gray-900 dark:text-white">
                Organic filled the calendar when the ads stopped
              </h3>
              <p className="mt-3 text-[clamp(0.95rem,1.05vw,1rem)] leading-[1.55] text-gray-700 dark:text-gray-300 font-helvetica-light">
                A boiler installation company paused paid ads. Within roughly three months organic search was filling the diary, and average position had moved from 37.8 to 13.7 across the engagement.
              </p>
              <Link href="/case-studies/boiler-co" className="mt-4 inline-flex items-center gap-2 font-helvetica text-[0.95rem] font-medium text-brand-blue underline-offset-2 hover:underline">
                Read the case study
                <ArrowIcon />
              </Link>
            </article>
          </div>

          <p className="mt-8 max-w-3xl text-[clamp(0.95rem,1.05vw,1rem)] leading-[1.6] text-gray-600 dark:text-gray-400 font-helvetica-light">
            We&apos;ve done this work for a mental-health charity in Edinburgh, a Highland plant-hire firm, a biotech, a gas and heating business, and a handful of startups. Consultico is a Glasgow business itself, and Think First was developed with a University of Strathclyde Inspire fellowship.
          </p>
        </Container>
      </section>

      <section className="py-16 md:py-20 lg:py-24">
        <Container>
          <div className="mb-10 max-w-3xl md:mb-14">
            <p className="mb-3 text-[0.8rem] font-helvetica font-semibold uppercase tracking-[0.16em] text-brand-blue">
              What is included
            </p>
            <h2 className="font-futura text-[clamp(2rem,3.4vw,4rem)] font-bold leading-[1.05] text-gray-900 dark:text-white">
              Everything needed to outthink, outposition, and outmaneuver.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {strategyIncludes.map((item) => (
              <article
                key={item.title}
                className="rounded-lg border border-gray-200 bg-white/85 p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/75"
              >
                <h3 className="font-futura text-[clamp(1.35rem,1.8vw,1.8rem)] font-bold text-brand-blue">
                  {item.title}
                </h3>
                <p className="mt-3 text-[clamp(0.98rem,1.1vw,1.08rem)] leading-[1.6] text-gray-700 dark:text-gray-300 font-helvetica-light">
                  {item.description}
                </p>
                <ul className="mt-6 space-y-3">
                  {item.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex gap-3 text-[clamp(0.92rem,1vw,1rem)] leading-[1.45] text-gray-700 dark:text-gray-300 font-helvetica-light"
                    >
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

      <section className="bg-brand-silk/80 py-16 shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:bg-gray-900/80 md:py-20 lg:py-24">
        <Container>
          <div className="mb-10 max-w-3xl md:mb-14">
            <p className="mb-3 text-[0.8rem] font-helvetica font-semibold uppercase tracking-[0.16em] text-brand-blue">
              Engagement depth
            </p>
            <h2 className="font-futura text-[clamp(2rem,3.2vw,3.5rem)] font-bold leading-[1.08] text-gray-900 dark:text-white">
              Built around the stage and complexity of the business.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {engagementOptions.map((option) => (
              <article
                key={option.name}
                className={`grid min-h-full grid-rows-[auto_auto_1fr_auto] rounded-lg border p-6 shadow-sm transition-transform duration-200 ${
                  option.highlighted
                    ? 'relative z-10 scale-[1.03] border-brand-blue bg-brand-blue text-white shadow-[0_18px_45px_rgba(0,123,255,0.28)]'
                    : 'border-gray-200 bg-white/85 dark:border-gray-800 dark:bg-gray-950/60'
                }`}
              >
                <div className="mb-4 h-7">
                  {option.highlighted && (
                    <p className="inline-flex rounded-full bg-white px-3 py-1 text-[0.75rem] font-helvetica font-semibold uppercase tracking-[0.12em] text-brand-blue">
                      Most common
                    </p>
                  )}
                </div>
                <div>
                  <h3 className={`font-futura text-[clamp(1.35rem,1.8vw,1.75rem)] font-bold ${option.highlighted ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                    {option.name}
                  </h3>
                  <p className={`mt-3 min-h-[4.65rem] text-[clamp(0.95rem,1.05vw,1rem)] leading-[1.55] font-helvetica-light ${option.highlighted ? 'text-white/88' : 'text-gray-700 dark:text-gray-300'}`}>
                    {option.summary}
                  </p>
                </div>
                <ul className="mt-6 space-y-3">
                  {option.features.map((feature) => (
                    <li
                      key={feature}
                      className={`flex gap-3 text-[clamp(0.9rem,1vw,0.98rem)] leading-[1.45] font-helvetica-light ${option.highlighted ? 'text-white/92' : 'text-gray-700 dark:text-gray-300'}`}
                    >
                      <CheckIcon className={option.highlighted ? 'text-white' : 'text-brand-blue'} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <p className={`mt-6 self-end font-futura text-[clamp(1.4rem,1.9vw,1.9rem)] font-bold ${option.highlighted ? 'text-white' : 'text-brand-blue'}`}>
                  {option.price}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20 lg:py-24">
        <Container>
          <div className="mb-10 text-center md:mb-14">
            <p className="mb-3 text-[0.8rem] font-helvetica font-semibold uppercase tracking-[0.16em] text-brand-blue">
              Process
            </p>
            <h2 className="mx-auto max-w-4xl font-futura text-[clamp(2rem,3.2vw,3.5rem)] font-bold leading-[1.08] text-gray-900 dark:text-white">
              From unclear activity to a focused route forward.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {processSteps.map((step) => (
              <article key={step.number} className="text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-brand-blue font-futura text-xl font-bold text-white">
                  {step.number}
                </div>
                <h3 className="font-futura text-[clamp(1.2rem,1.5vw,1.45rem)] font-bold text-gray-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="mx-auto mt-3 max-w-sm text-[clamp(0.95rem,1.05vw,1rem)] leading-[1.55] text-gray-700 dark:text-gray-300 font-helvetica-light">
                  {step.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white dark:bg-gray-950">
        <Container>
          <FaqSection faqs={SERVICE_FAQS['market-strategy']} includeSchema />
        </Container>
      </section>

      <section className="bg-brand-blue py-16 text-white md:py-20 lg:py-24" data-cursor-theme="light">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-futura text-[clamp(2rem,3.5vw,4rem)] font-bold leading-[1.05]">
              Ready to build your winning strategy?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[clamp(1rem,1.25vw,1.2rem)] leading-[1.6] text-white/90 font-helvetica-light">
              Schedule Your Free Consultation and discover the path to clearer positioning, smarter spend, and sustainable growth.
            </p>
            <Link
              href="/#contact"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-3 text-[clamp(1rem,1.15vw,1.1rem)] font-helvetica font-medium text-brand-blue transition-colors duration-200 hover:bg-gray-100 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-blue"
            >
              Schedule Your Free Consultation
              <ArrowIcon />
            </Link>
          </div>
        </Container>
      </section>
    </main>
    </>
  );
}
