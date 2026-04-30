import Container from '@/components/Container';
import ServiceDesktopHeader from '@/components/ServiceDesktopHeader';
import Link from 'next/link';

const stats = [
  { number: '180%', label: 'Average revenue growth' },
  { number: '92%', label: 'Client success rate' },
  { number: '100+', label: 'Strategies delivered' },
  { number: '12 mo', label: 'Average partnership' },
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

const engagementOptions = [
  {
    name: 'Foundation',
    summary: 'Essential market clarity for businesses preparing to focus their marketing.',
    features: ['Market research report', 'Competitor analysis', 'Positioning direction', '90-day action plan'],
  },
  {
    name: 'Growth',
    summary: 'A deeper strategic model for businesses ready to scale deliberately.',
    features: ['Go-to-market strategy', 'Customer journey mapping', 'Growth roadmap', 'Monthly strategy sessions'],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    summary: 'Ongoing strategic support for larger or more complex growth plans.',
    features: ['Multi-market expansion strategy', 'Dedicated strategy consultant', 'Custom reporting view', 'Quarterly reviews'],
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
                <span className="block">Stop guessing.</span>
                <span className="block text-brand-blue">Start growing.</span>
              </h1>

              <p className="mt-7 max-w-3xl text-[clamp(1rem,1.45vw,1.3rem)] leading-[1.65] text-gray-800 dark:text-gray-200 font-helvetica-light">
                We help businesses define where to play, how to win, and what to execute first - so marketing spend is guided by strategic market intelligence, not instinct.
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
                Strategy comes before tactics. Clarity comes before spend.
              </p>
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
  );
}
