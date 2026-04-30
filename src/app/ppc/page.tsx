import Container from '@/components/Container';
import ServiceDesktopHeader from '@/components/ServiceDesktopHeader';
import Link from 'next/link';

const stats = [
  { number: '$5M+', label: 'Ad spend managed' },
  { number: '425%', label: 'Average ROAS' },
  { number: '180+', label: 'Active campaigns' },
  { number: '47%', label: 'Lower CPA' },
];

const signalFlow = ['Spend', 'Signal', 'Optimise', 'Scale'];

const painPoints = [
  {
    title: 'You are targeting the wrong people',
    body: 'Broad targeting means paying for clicks from people who will never buy. Every wasted click drains budget.',
  },
  {
    title: 'Your ads are not converting',
    body: 'Generic ad copy and weak landing pages turn paid traffic into short visits instead of real enquiries.',
  },
  {
    title: 'You cannot track real ROI',
    body: 'Without clean tracking and attribution, it is difficult to know which campaigns actually drive revenue.',
  },
  {
    title: 'Costs rise while results decline',
    body: 'Platforms change constantly. Without ongoing optimisation, campaigns become less effective and more expensive over time.',
  },
];

const ppcIncludes = [
  {
    title: 'Google Ads Management',
    description: 'Capture high-intent customers actively searching for your products or services.',
    features: [
      'Search campaign setup and optimisation',
      'Shopping ads for ecommerce',
      'Display and remarketing campaigns',
      'Keyword research and bidding strategy',
      'Ad copy testing and optimisation',
    ],
  },
  {
    title: 'Social Media Advertising',
    description: 'Reach defined audiences across the paid social channels that suit your offer and funnel.',
    features: [
      'Facebook and Instagram ads',
      'LinkedIn B2B advertising',
      'TikTok and Snapchat campaigns',
      'Audience targeting and segmentation',
      'Creative direction and testing',
    ],
  },
  {
    title: 'Conversion Rate Optimisation',
    description: 'Turn more paid traffic into customers with landing page, funnel, and form improvements.',
    features: [
      'Landing page review and testing',
      'A/B testing strategy',
      'Conversion funnel optimisation',
      'User behaviour analysis',
      'Form and checkout optimisation',
    ],
  },
  {
    title: 'Analytics & Reporting',
    description: 'Track the metrics that matter and translate campaign data into clear next steps.',
    features: [
      'Custom dashboard setup',
      'ROI and ROAS tracking',
      'Attribution modelling',
      'Weekly performance reporting',
      'Strategic recommendations',
    ],
  },
];

const auditChecks = [
  {
    label: 'Tracking',
    title: 'Can every useful action be measured?',
    body: 'We check conversion events, attribution, tags, forms, calls, and the path from click to enquiry.',
  },
  {
    label: 'Targeting',
    title: 'Is budget reaching the right intent?',
    body: 'We review keywords, audiences, exclusions, locations, match types, and the quality of incoming traffic.',
  },
  {
    label: 'Creative',
    title: 'Are ads giving people a reason to act?',
    body: 'We look at message-market fit, offer clarity, testing structure, and whether creative is matched to channel behaviour.',
  },
  {
    label: 'Landing',
    title: 'Does the page convert the promise?',
    body: 'We inspect page speed, relevance, form friction, trust signals, and whether the landing page continues the ad story.',
  },
  {
    label: 'Budget',
    title: 'Is spend flowing toward proof?',
    body: 'We identify wasted spend, underfunded winners, weak campaign splits, and scaling thresholds.',
  },
  {
    label: 'Reporting',
    title: 'Can decisions be made quickly?',
    body: 'We turn campaign data into a clear view of what to keep, cut, test, and scale next.',
  },
];

const engagementOptions = [
  {
    name: 'Starter',
    summary: 'Focused PPC setup for businesses beginning to use paid acquisition properly.',
    features: ['1 platform', 'Up to £2K monthly ad spend', '2 campaigns', 'Basic reporting'],
  },
  {
    name: 'Growth',
    summary: 'Multi-channel PPC management for businesses ready to test, optimise, and scale.',
    features: ['2-3 platforms', 'Up to £10K monthly ad spend', 'Conversion tracking setup', 'A/B testing'],
    highlighted: true,
  },
  {
    name: 'Scale',
    summary: 'Full paid media management for larger budgets and more complex campaign structures.',
    features: ['All relevant platforms', 'Advanced testing strategy', 'Dedicated account management', 'Custom analytics'],
  },
];

const processSteps = [
  {
    number: '01',
    title: 'Audit & Strategy',
    body: 'We review campaign structure, tracking, audience quality, competitors, and commercial targets before touching spend.',
  },
  {
    number: '02',
    title: 'Launch & Optimise',
    body: 'We build campaigns around precise targeting, stronger creative, and conversion tracking, then refine based on live signals.',
  },
  {
    number: '03',
    title: 'Scale & Report',
    body: 'We scale what works, cut what wastes budget, and report clearly on what every pound is doing.',
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

export default function PpcPage() {
  return (
    <main className="relative">
      <section className="relative min-h-screen overflow-hidden pb-16 md:pb-20 lg:pb-0">
        <ServiceDesktopHeader />
        <div className="absolute inset-0 dot-grid-premium opacity-70 dark:opacity-25" aria-hidden="true" />
        <Container className="relative pt-[10.5rem] md:pt-[12rem] lg:min-h-screen lg:pt-0 lg:flex lg:items-center">
          <div className="w-full">
            <div className="max-w-6xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-blue/25 bg-white/80 px-4 py-2 text-[0.78rem] font-helvetica font-semibold uppercase tracking-[0.14em] text-brand-blue shadow-sm dark:bg-gray-950/75">
                <span className="h-2 w-2 rounded-full bg-brand-blue" />
                Pay-Per-Click Advertising
              </div>

              <h1 className="max-w-5xl font-futura text-[clamp(2.35rem,5vw,5.8rem)] font-bold leading-[0.98] text-gray-900 dark:text-white">
                <span className="block">Turn ad spend into</span>
                <span className="block text-brand-blue">predictable revenue.</span>
              </h1>

              <p className="mt-7 max-w-3xl text-[clamp(1rem,1.45vw,1.3rem)] leading-[1.65] text-gray-800 dark:text-gray-200 font-helvetica-light">
                We create data-led PPC campaigns that reduce waste, sharpen targeting, and turn qualified clicks into measurable demand.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-blue px-7 py-3 text-[clamp(1rem,1.15vw,1.1rem)] font-helvetica font-medium text-white transition-colors duration-200 hover:bg-[#006FE6] active:bg-[#0067D6] focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2"
                >
                  Discuss a PPC Audit
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

            <div className="mt-10 grid max-w-5xl grid-cols-1 gap-4 border-l-2 border-brand-blue bg-white/70 px-5 py-4 shadow-sm dark:bg-gray-950/50 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <p className="text-[clamp(1rem,1.25vw,1.18rem)] leading-[1.55] text-gray-800 dark:text-gray-200 font-helvetica">
                PPC works when spend creates signal, signal drives optimisation, and optimisation earns scale.
              </p>
              <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:gap-0">
                {signalFlow.map((step, index) => (
                  <div key={step} className="contents sm:flex sm:flex-1 sm:items-center">
                    <div className="w-full rounded-md border border-brand-blue/20 bg-white/75 px-3 py-2 text-center dark:bg-gray-900/75">
                      <p className="font-futura text-[clamp(0.9rem,1vw,1rem)] font-bold text-brand-blue">{step}</p>
                    </div>
                    {index < signalFlow.length - 1 && (
                      <span className="hidden h-[2px] w-5 flex-none bg-brand-blue/45 sm:block" aria-hidden="true" />
                    )}
                  </div>
                ))}
              </div>
            </div>
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
                Your paid ads are burning cash without delivering results.
              </h2>
              <p className="mt-6 text-[clamp(1rem,1.25vw,1.15rem)] leading-[1.65] text-gray-700 dark:text-gray-300 font-helvetica-light">
                Clicks may be coming in, but something is wrong when acquisition costs climb, conversions soften, and the campaign data does not explain where revenue is actually coming from.
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
              Precision inside spend
            </p>
            <h2 className="font-futura text-[clamp(2rem,3.6vw,4.5rem)] font-bold leading-[1.05]">
              More budget is not the answer if the signal is broken.
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-[clamp(1rem,1.3vw,1.25rem)] leading-[1.6] text-white/90 font-helvetica-light">
              Profitable PPC comes from targeting the right people, testing the right message, measuring the right actions, and removing waste before it compounds.
            </p>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-brand-black py-16 text-white md:py-20 lg:py-24" data-cursor-theme="light">
        <div className="absolute inset-0 dot-grid-premium opacity-15" aria-hidden="true" />
        <Container className="relative">
          <div className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-[0.72fr_1fr] lg:items-end">
            <div>
              <p className="mb-3 text-[0.8rem] font-helvetica font-semibold uppercase tracking-[0.16em] text-white/65">
                PPC audit lens
              </p>
              <h2 className="font-futura text-[clamp(2rem,3.4vw,4rem)] font-bold leading-[1.05]">
                Find the leak before adding more water.
              </h2>
            </div>
            <p className="max-w-3xl text-[clamp(1rem,1.25vw,1.18rem)] leading-[1.6] text-white/78 font-helvetica-light">
              A PPC audit should not be a generic scorecard. It should isolate where money is leaking, where signal is unreliable, and where the campaign has genuine room to scale.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/12 bg-white/12 md:grid-cols-2 lg:grid-cols-3">
            {auditChecks.map((check) => (
              <article key={check.label} className="bg-brand-black/95 p-5">
                <p className="mb-4 inline-flex rounded-full border border-brand-blue/40 px-3 py-1 text-[0.72rem] font-helvetica font-semibold uppercase tracking-[0.14em] text-brand-blue">
                  {check.label}
                </p>
                <h3 className="font-futura text-[clamp(1.15rem,1.45vw,1.4rem)] font-bold leading-[1.15] text-white">
                  {check.title}
                </h3>
                <p className="mt-3 text-[clamp(0.92rem,1vw,1rem)] leading-[1.55] text-white/70 font-helvetica-light">
                  {check.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20 lg:py-24">
        <Container>
          <div className="mb-10 max-w-3xl md:mb-14">
            <p className="mb-3 text-[0.8rem] font-helvetica font-semibold uppercase tracking-[0.16em] text-brand-blue">
              What is included
            </p>
            <h2 className="font-futura text-[clamp(2rem,3.4vw,4rem)] font-bold leading-[1.05] text-gray-900 dark:text-white">
              Everything needed to make paid media accountable.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {ppcIncludes.map((item) => (
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
              PPC management scaled around spend, complexity, and channel mix.
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
                  Custom
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
              From wasted clicks to controlled acquisition.
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

      <section className="bg-brand-blue py-16 text-white md:py-20 lg:py-24" data-cursor-theme="light">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-futura text-[clamp(2rem,3.5vw,4rem)] font-bold leading-[1.05]">
              Ready to make paid media accountable?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[clamp(1rem,1.25vw,1.2rem)] leading-[1.6] text-white/90 font-helvetica-light">
              Let&apos;s discuss whether a PPC audit would reveal clearer targeting, cleaner tracking, and better use of your ad budget.
            </p>
            <Link
              href="/#contact"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-3 text-[clamp(1rem,1.15vw,1.1rem)] font-helvetica font-medium text-brand-blue transition-colors duration-200 hover:bg-gray-100 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-blue"
            >
              Discuss a PPC Audit
              <ArrowIcon />
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
