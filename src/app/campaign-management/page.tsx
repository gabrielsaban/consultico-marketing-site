import Container from '@/components/Container';
import ServiceDesktopHeader from '@/components/ServiceDesktopHeader';
import Link from 'next/link';

const stats = [
  { number: '200+', label: 'Campaigns launched' },
  { number: '87%', label: 'Goal achievement rate' },
  { number: '$12M+', label: 'Revenue generated' },
  { number: '4.2x', label: 'Average ROI' },
];

const painPoints = [
  {
    title: 'Each channel tells a different story',
    body: 'Email, social, ads, content, and site messaging need to feel like parts of the same campaign, not separate efforts fighting for attention.',
  },
  {
    title: 'Campaigns launch late or lose momentum',
    body: 'Without clear ownership, assets, deadlines, approvals, and reporting can drift until the best window has already passed.',
  },
  {
    title: 'Performance is hard to understand',
    body: 'Disconnected metrics make it difficult to know what is working, what is wasting budget, and what should happen next.',
  },
  {
    title: 'Budget goes into tactics, not strategy',
    body: 'Campaigns need a coordinated plan before spend increases, otherwise activity can look busy while growth stays unclear.',
  },
];

const commandBoard = [
  {
    lane: 'Message',
    detail: 'One campaign idea adapted for each channel without losing the core point.',
  },
  {
    lane: 'Timing',
    detail: 'Launch windows, dependencies, approvals, and deliverables managed around the same calendar.',
  },
  {
    lane: 'Creative',
    detail: 'Copy, visual direction, landing assets, and content mapped to the campaign objective.',
  },
  {
    lane: 'Channels',
    detail: 'Paid, organic, email, content, and website touchpoints working toward the same outcome.',
  },
  {
    lane: 'Measurement',
    detail: 'Reporting built around what the campaign was meant to prove, not vanity numbers.',
  },
];

const campaignIncludes = [
  {
    title: 'Campaign Strategy & Planning',
    description: 'Campaign blueprints shaped around the objective, audience, market context, budget, and timeline.',
    features: [
      'Goal setting and KPI definition',
      'Target audience research',
      'Competitive landscape analysis',
      'Multi-channel strategy development',
      'Budget allocation and forecasting',
    ],
  },
  {
    title: 'Creative Development',
    description: 'Campaign ideas and assets that keep the message consistent while fitting the channel.',
    features: [
      'Concept development and ideation',
      'Copywriting and messaging',
      'Visual design and branding',
      'Video and multimedia direction',
      'Creative testing and refinement',
    ],
  },
  {
    title: 'Campaign Execution & Management',
    description: 'Day-to-day coordination so the campaign launches cleanly, stays visible, and keeps improving.',
    features: [
      'Cross-channel campaign deployment',
      'Real-time performance monitoring',
      'Daily optimisation and adjustments',
      'Stakeholder coordination',
      'Timeline and deliverable management',
    ],
  },
  {
    title: 'Analytics & Reporting',
    description: 'Clear campaign reporting that shows performance, explains what changed, and recommends the next move.',
    features: [
      'Performance dashboards',
      'Attribution and conversion tracking',
      'ROI analysis and modelling',
      'Custom reporting schedules',
      'Strategic insights and recommendations',
    ],
  },
];

const engagementOptions = [
  {
    name: 'Campaign Essentials',
    summary: 'A focused campaign plan for a single launch, offer, season, or priority initiative.',
    features: ['1 campaign per quarter', '2-3 marketing channels', 'Core creative assets', 'Performance reporting'],
  },
  {
    name: 'Campaign Pro',
    summary: 'Ongoing campaign management for brands that need multiple moving parts coordinated together.',
    features: ['Multiple active campaigns', 'All core marketing channels', 'Creative production support', 'Dedicated campaign lead'],
    highlighted: true,
  },
  {
    name: 'Campaign Enterprise',
    summary: 'Full-service campaign management for businesses running complex, multi-market, or high-volume activity.',
    features: ['Unlimited campaign planning', 'Custom integrations', 'Executive strategy support', 'Priority optimisation'],
  },
];

const processSteps = [
  {
    number: '01',
    title: 'Plan the campaign',
    body: 'We define the objective, audience, channels, creative requirements, budget, dependencies, and measurement plan.',
  },
  {
    number: '02',
    title: 'Launch in sync',
    body: 'We coordinate assets, messaging, channels, approvals, and timelines so the campaign enters the market cleanly.',
  },
  {
    number: '03',
    title: 'Optimise and report',
    body: 'We monitor performance, adjust the plan, explain the results, and turn each campaign into better future decisions.',
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

export default function CampaignManagementPage() {
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
                Campaign Management
              </div>

              <h1 className="max-w-5xl font-futura text-[clamp(2.25rem,4vw,4.75rem)] font-bold leading-[1.02] text-gray-900 dark:text-white">
                <span className="block">Campaigns that launch</span>
                <span className="block text-brand-blue">together, not apart.</span>
              </h1>

              <p className="mt-7 max-w-3xl text-[clamp(1rem,1.45vw,1.3rem)] leading-[1.65] text-gray-800 dark:text-gray-200 font-helvetica-light">
                We coordinate multi-channel campaigns so message, timing, creative, budget, and reporting work as one system.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-blue px-7 py-3 text-[clamp(1rem,1.15vw,1.1rem)] font-helvetica font-medium text-white transition-colors duration-200 hover:bg-[#006FE6] active:bg-[#0067D6] focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2"
                >
                  Discuss a Campaign Plan
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
                Great campaigns require orchestration, not chaos.
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
                Marketing activity can look busy while the campaign itself stays unclear.
              </h2>
              <p className="mt-6 text-[clamp(1rem,1.25vw,1.15rem)] leading-[1.65] text-gray-700 dark:text-gray-300 font-helvetica-light">
                Campaigns need more than separate tasks across separate channels. They need a shared idea, a launch rhythm, and a way to know what actually moved the business forward.
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
              Campaign orchestration
            </p>
            <h2 className="font-futura text-[clamp(2rem,3.6vw,4.5rem)] font-bold leading-[1.05]">
              Every channel should know what the others are doing.
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-[clamp(1rem,1.3vw,1.25rem)] leading-[1.6] text-white/90 font-helvetica-light">
              Strong campaigns connect creative, timing, audience, spend, and measurement before the launch, then keep refining once the market responds.
            </p>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-brand-silk/80 py-16 shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:bg-gray-900/80 md:py-20 lg:py-24">
        <Container>
          <div className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-[0.68fr_1fr] lg:items-end">
            <div>
              <p className="mb-3 text-[0.8rem] font-helvetica font-semibold uppercase tracking-[0.16em] text-brand-blue">
                Campaign command board
              </p>
              <h2 className="font-futura text-[clamp(2rem,3.4vw,4rem)] font-bold leading-[1.05] text-gray-900 dark:text-white">
                The work is managed in lanes, but judged as one campaign.
              </h2>
            </div>
            <p className="max-w-3xl text-[clamp(1rem,1.25vw,1.18rem)] leading-[1.6] text-gray-700 dark:text-gray-300 font-helvetica-light">
              This is the practical layer: what needs saying, where it needs to appear, when it needs to move, and how success will be read.
            </p>
          </div>

          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white/85 shadow-sm dark:border-gray-800 dark:bg-gray-950/60">
            {commandBoard.map((item, index) => (
              <article
                key={item.lane}
                className="grid grid-cols-1 gap-3 border-b border-gray-200 p-5 last:border-b-0 dark:border-gray-800 sm:grid-cols-[8rem_1fr] sm:items-center"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-blue font-futura text-sm font-bold text-white">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="font-helvetica text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-brand-blue">
                    {item.lane}
                  </p>
                </div>
                <p className="text-[clamp(0.98rem,1.12vw,1.08rem)] leading-[1.55] text-gray-800 dark:text-gray-200 font-helvetica">
                  {item.detail}
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
              Planning, creative, execution, and reporting held together.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {campaignIncludes.map((item) => (
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
              Campaign support scaled around complexity, channels, and speed.
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
                  <p className={`mt-3 min-h-[4.65rem] text-[clamp(0.95rem,1.05vw,1rem)] leading-[1.55] font-helvetica-light ${option.highlighted ? 'text-white/90' : 'text-gray-700 dark:text-gray-300'}`}>
                    {option.summary}
                  </p>
                </div>
                <ul className="mt-6 space-y-3">
                  {option.features.map((feature) => (
                    <li
                      key={feature}
                      className={`flex gap-3 text-[clamp(0.9rem,1vw,0.98rem)] leading-[1.45] font-helvetica-light ${option.highlighted ? 'text-white/90' : 'text-gray-700 dark:text-gray-300'}`}
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
              From scattered activity to a campaign that moves as one.
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
              Ready to make the next campaign feel connected?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[clamp(1rem,1.25vw,1.2rem)] leading-[1.6] text-white/90 font-helvetica-light">
              Let&apos;s map the campaign, the channels, and the measurement before the work starts moving.
            </p>
            <Link
              href="/#contact"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-3 text-[clamp(1rem,1.15vw,1.1rem)] font-helvetica font-medium text-brand-blue transition-colors duration-200 hover:bg-gray-100 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-blue"
            >
              Discuss a Campaign Plan
              <ArrowIcon />
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
