import Container from '@/components/Container';
import ServiceDesktopHeader from '@/components/ServiceDesktopHeader';
import Link from 'next/link';

const scalingPainPoints = [
  'Tried paid ads without knowing true breakeven numbers',
  'Worked with agencies that focused on tactics, not economics',
  'Tested campaigns without a clear scaling model',
  'Spent money hoping it would "start working"',
];

const precisionInputs = [
  'your unit economics',
  'your customer behaviour',
  'your margin structure',
  'your growth constraints',
];

const walkAwayOutcomes = [
  'A revenue model mapped to your business',
  'Channel prioritisation based on projected ROI',
  'Clear cost-per-acquisition thresholds',
  'A 90-day execution roadmap',
  'Defined testing framework',
  'Full clarity before committing to spend',
];

const processSteps = [
  {
    title: 'Step 1 - Strategic Audit',
    body: 'Deep dive into your numbers, current channels, margins, positioning, and customer lifecycle, followed by focused market and competitor review.',
  },
  {
    title: 'Step 2 - Revenue & Channel Modelling',
    body: 'We build a projected growth model based on your economics and market realities.',
  },
  {
    title: 'Step 3 - Half-Day Strategy Workshop',
    body: 'A half-day workshop for you and your team, delivered online or in-person, covering the model, projections, channel order, and implementation structure.',
  },
  {
    title: 'Step 4 - Clear Implementation Path',
    body: 'You leave with a practical execution handover: what to run, in what order, and what return range to expect.',
  },
];

const deliveryMechanics = [
  '30 days from booking to workshop',
  'Delivered online or in-person',
  'Built for founder + key team members',
];

const fitChecks = {
  good: [
    'B2C businesses generating £50K+ per month',
    'Owners serious about scaling sustainably',
    'Businesses already selling successfully',
    'Founders who want strategic control before delegating',
  ],
  bad: [
    'Startups with no revenue',
    'Businesses looking for cheap ad management',
    'Owners unwilling to review numbers',
  ],
};

const caseStudies = [
  {
    title: 'Local Services (Plumbing & Construction)',
    situation: 'Lead generation had stalled. Paid ads were inconsistent and unprofitable.',
    finding: 'Incorrect channel sequencing and no defined acquisition ceiling.',
    metrics: [
      { value: '3x', label: 'Online Revenue In 6 Months' },
      { value: '100%', label: 'Channels Measurable' },
      { value: '1', label: 'Scalable Lead System Built' },
    ],
    outcomes: [
      'Every channel became measurable and profitable',
      'New scalable lead flow system built',
    ],
  },
  {
    title: 'E-Commerce Brand',
    situation: 'Owner hesitant to scale due to uncertainty and seasonal bottlenecks.',
    finding: 'Missed leverage in retention and a specific paid traffic channel.',
    metrics: [
      { value: '£65k', label: 'Monthly Growth Potential' },
      { value: '1', label: 'Primary Bottleneck Removed' },
      { value: '90d', label: 'Expansion Model Planned' },
    ],
    outcomes: [
      'Identified £65,000/month additional growth potential',
      'Built structured expansion model',
    ],
  },
];

const testimonials = [
  {
    quote: 'This workshop was highly relevant to our business and gave us clear, actionable direction that made a real difference.',
    name: 'Peter Davis',
    company: 'Norfolk Boards',
  },
  {
    quote: 'The team made the process straightforward and effective. Clear thinking, no fluff, and practical next steps.',
    name: 'Marcus Binnie',
    company: 'Promo Designs',
  },
  {
    quote: 'After a frustrating run with agencies, this gave us genuine clarity on what to do and why it would work.',
    name: 'Ant Vitale',
    company: 'The Boiler Co',
  },
];

const credibilityPoints = [
  'University of Strathclyde fellowship recognition',
  'Cross-market client work across Europe',
  '10+ years of combined digital growth experience',
  'Insights shared at UK and European events',
];

const sectionHeadingClass =
  'relative text-[clamp(1.5rem,2.4vw,2.6rem)] leading-[1.1] font-futura font-bold text-brand-blue';

export default function ThinkFirstPage() {
  return (
    <main className="relative">
      <section className="min-h-screen relative pb-16 md:pb-20 lg:pb-0">
        <ServiceDesktopHeader />
        <Container className="pt-[10.5rem] md:pt-[12rem] lg:pt-0 lg:min-h-screen lg:flex lg:items-center">
          <div className="w-full grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 xl:gap-16 items-start lg:items-stretch">
            <div>
              <p className="text-[clamp(0.75rem,1vw,0.875rem)] uppercase tracking-[0.16em] text-gray-600 dark:text-gray-400 font-helvetica mb-4">
                Done-With-You Digital Marketing Workshop
              </p>
              <h1 className="font-futura font-bold mb-5 max-w-[34rem]">
                <span className="block text-[clamp(1.55rem,2.3vw,2.55rem)] leading-[1.2] text-gray-800 dark:text-gray-100 mb-2">
                  For B2C businesses already doing £50K+ per month
                </span>
                <span className="block text-[clamp(1.55rem,2.35vw,2.65rem)] leading-[1.1] text-brand-blue">
                  Discover Exactly What Will Scale Your Revenue
                </span>
              </h1>
              <p className="text-[clamp(1rem,1.35vw,1.25rem)] leading-[1.65] text-gray-800 dark:text-gray-200 font-helvetica-light max-w-3xl mb-8">
                A done-with-you strategic workshop showing which channels will work, why they will work, and what they are worth before you invest even another pound in ads.
              </p>
              <div className="mb-4">
                <a
                  href="#apply"
                  className="inline-flex items-center justify-center bg-brand-blue text-white font-helvetica font-medium text-[clamp(1rem,1.2vw,1.125rem)] px-8 py-3 rounded-lg hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2"
                >
                  Apply For The Strategy Workshop
                </a>
              </div>
              <p className="text-[clamp(0.875rem,1vw,1rem)] text-gray-600 dark:text-gray-400 font-helvetica-light mb-8">
                Limited places each month to ensure depth of work
              </p>
              <div className="border-l-2 border-brand-blue pl-4">
                <p className="text-[clamp(0.95rem,1.15vw,1.1rem)] leading-[1.6] text-gray-700 dark:text-gray-300 font-helvetica">
                  No retainers. No guesswork. No &quot;try this and see.&quot; Just clarity, projections, and a step-by-step implementation path.
                </p>
              </div>
            </div>

            <div className="bg-white/85 dark:bg-gray-900/85 border border-gray-200 dark:border-gray-700 rounded-xl p-4 md:p-5 shadow-[0_8px_30px_rgba(0,0,0,0.08)] lg:h-full">
              <div className="rounded-lg border-2 border-dashed border-brand-blue/60 bg-brand-silk dark:bg-gray-800 flex items-center justify-center min-h-[22rem] lg:min-h-0 lg:h-full">
                <p className="text-brand-blue font-futura text-[clamp(1rem,1.5vw,1.5rem)] tracking-wide text-center px-4">
                  strategic presentation
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden py-16 md:py-20 lg:py-24 bg-brand-silk/90 dark:bg-gray-900/85 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
        <div className="absolute inset-0 dot-grid-premium opacity-30 dark:opacity-20" />
        <div className="absolute -top-24 -right-16 w-[26rem] h-[26rem] rounded-full bg-brand-blue/10 blur-3xl" />
        <Container>
          <h2 className={`${sectionHeadingClass} mb-6 max-w-[23ch]`}>
            <span className="block">Most B2C Businesses Don&apos;t Have a Marketing Problem</span>
            <span className="block mt-1 text-gray-800 dark:text-gray-100">They Have a Clarity Problem</span>
          </h2>
          <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-8 lg:gap-12">
            <div className="rounded-xl bg-white/85 dark:bg-gray-950/80 border border-gray-200 dark:border-gray-700 p-6">
              <p className="text-[clamp(1rem,1.3vw,1.2rem)] text-gray-800 dark:text-gray-200 font-helvetica mb-5">
                You&apos;ve likely:
              </p>
              <ul className="space-y-3 pl-7">
                {scalingPainPoints.map((point) => (
                  <li
                    key={point}
                    className="text-[clamp(0.95rem,1.2vw,1.1rem)] leading-[1.6] text-gray-700 dark:text-gray-300 font-helvetica-light relative before:content-['•'] before:absolute before:left-[-1.4rem] before:text-brand-blue before:font-bold"
                  >
                    {point}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[clamp(1rem,1.25vw,1.15rem)] leading-[1.6] text-gray-800 dark:text-gray-200 font-helvetica-light">
                The issue isn&apos;t effort. It&apos;s that you&apos;ve never built a structured revenue model first.
              </p>
            </div>
            <div className="rounded-xl bg-brand-blue text-white border border-brand-blue/30 p-6">
              <p className="text-[clamp(1rem,1.2vw,1.1rem)] text-white font-helvetica mb-4">
                Until you understand:
              </p>
              <ul className="space-y-3 pl-7 mb-5">
                <li className="text-[clamp(0.95rem,1.15vw,1.05rem)] text-white/90 font-helvetica-light relative before:content-['•'] before:absolute before:left-[-1.4rem] before:text-white before:font-bold">
                  your real acquisition cost ceiling
                </li>
                <li className="text-[clamp(0.95rem,1.15vw,1.05rem)] text-white/90 font-helvetica-light relative before:content-['•'] before:absolute before:left-[-1.4rem] before:text-white before:font-bold">
                  your channel economics
                </li>
                <li className="text-[clamp(0.95rem,1.15vw,1.05rem)] text-white/90 font-helvetica-light relative before:content-['•'] before:absolute before:left-[-1.4rem] before:text-white before:font-bold">
                  your compounding levers
                </li>
                <li className="text-[clamp(0.95rem,1.15vw,1.05rem)] text-white/90 font-helvetica-light relative before:content-['•'] before:absolute before:left-[-1.4rem] before:text-white before:font-bold">
                  your bottlenecks
                </li>
              </ul>
              <p className="text-[clamp(1rem,1.2vw,1.1rem)] leading-[1.6] text-white font-helvetica">
                Every pound spent is risk, not strategy.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden py-16 md:py-20 lg:py-24 bg-white dark:bg-gray-950">
        <div className="absolute -left-20 top-16 w-72 h-72 rounded-full bg-brand-blue/10 blur-3xl" />
        <Container>
          <h2 className={`${sectionHeadingClass} mb-4 max-w-none md:whitespace-nowrap text-center mx-auto`}>
            Before Execution, Comes <span className="text-gray-800 dark:text-white">Precision</span>
          </h2>
          <p className="relative text-[clamp(1rem,1.35vw,1.2rem)] leading-[1.6] text-gray-800 dark:text-gray-200 font-helvetica-light max-w-4xl mb-8 text-center mx-auto">
            Most agencies start with ads. We start with the business model behind growth.
          </p>
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8">
            <div className="rounded-2xl bg-brand-silk/85 dark:bg-gray-900 p-6 md:p-7">
              <h3 className="text-[clamp(1.15rem,1.65vw,1.45rem)] font-futura font-semibold text-brand-blue mb-4">
                We Start With
              </h3>
              <ul className="space-y-3 pl-7">
                {precisionInputs.map((input) => (
                  <li
                    key={input}
                    className="text-[clamp(0.95rem,1.1vw,1.05rem)] leading-[1.6] text-gray-800 dark:text-gray-200 font-helvetica-light relative before:content-['•'] before:absolute before:left-[-1.4rem] before:text-brand-blue before:font-bold"
                  >
                    {input}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-brand-blue text-white p-6 md:p-7 shadow-[0_12px_28px_rgba(0,123,255,0.32)]">
              <h3 className="text-[clamp(1.15rem,1.65vw,1.45rem)] font-futura font-semibold mb-4">
                Strategic Diagnostic Questions
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2">
                <li className="text-[clamp(0.95rem,1.1vw,1.05rem)] font-helvetica-light">What will scale?</li>
                <li className="text-[clamp(0.95rem,1.1vw,1.05rem)] font-helvetica-light">Why will it scale?</li>
                <li className="text-[clamp(0.95rem,1.1vw,1.05rem)] font-helvetica-light">At what return?</li>
                <li className="text-[clamp(0.95rem,1.1vw,1.05rem)] font-helvetica-light">In what order?</li>
                <li className="text-[clamp(0.95rem,1.1vw,1.05rem)] font-helvetica-light">Over what time horizon?</li>
              </ul>
            </div>
          </div>
          <p className="text-[clamp(1rem,1.3vw,1.15rem)] text-gray-800 dark:text-gray-200 font-helvetica text-center mx-auto max-w-4xl">
            You don&apos;t leave with ideas. You leave with a financial model and implementation roadmap.
          </p>
        </Container>
      </section>

      <section className="relative overflow-hidden py-16 md:py-20 lg:py-24">
        <Container>
          <h2 className={`${sectionHeadingClass} mb-8 max-w-none md:whitespace-nowrap`}>
            What You Leave With
          </h2>
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-8">
            {[walkAwayOutcomes.slice(0, 3), walkAwayOutcomes.slice(3)].map((column, idx) => (
              <div key={idx} className="space-y-1">
                {column.map((item) => (
                  <div key={item} className="flex items-start gap-4 py-4 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-brand-blue text-2xl leading-none mt-0.5">✔</span>
                    <p className="text-[clamp(0.98rem,1.12vw,1.08rem)] leading-[1.55] text-gray-800 dark:text-gray-200 font-helvetica">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <p className="text-[clamp(1rem,1.3vw,1.2rem)] text-gray-800 dark:text-gray-200 font-helvetica-light">
            This is the difference between spending money and deploying capital.
          </p>
        </Container>
      </section>

      <section className="relative overflow-hidden py-16 md:py-20 lg:py-24">
        <div className="absolute -right-24 bottom-0 w-72 h-72 rounded-full bg-brand-blue/10 blur-3xl" />
        <Container>
          <h2 className={`${sectionHeadingClass} mb-8 max-w-[12ch]`}>
            The <span className="text-gray-800 dark:text-white">Process</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8 lg:mb-10">
            {deliveryMechanics.map((item) => (
              <div
                key={item}
                className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/70 px-4 py-3"
              >
                <p className="text-[clamp(0.85rem,1vw,0.95rem)] uppercase tracking-wide text-gray-700 dark:text-gray-300 font-helvetica">
                  {item}
                </p>
              </div>
            ))}
          </div>
          <div className="relative">
            <div className="hidden lg:block absolute left-6 right-6 top-8 h-px bg-gray-300 dark:bg-gray-700" />
            <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {processSteps.map((step, index) => (
                <article key={step.title} className="pt-2">
                  <div className="w-12 h-12 rounded-full bg-brand-blue text-white flex items-center justify-center text-sm font-futura font-bold mb-4 shadow-[0_8px_20px_rgba(0,123,255,0.28)]">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-[clamp(1.05rem,1.4vw,1.2rem)] font-futura font-semibold text-brand-blue mb-3">
                    {step.title.replace(`Step ${index + 1} - `, '')}
                  </h3>
                  <p className="text-[clamp(0.95rem,1.1vw,1.03rem)] leading-[1.65] text-gray-800 dark:text-gray-200 font-helvetica-light">
                    {step.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden py-16 md:py-20 lg:py-24 bg-white dark:bg-gray-950">
        <Container>
          <h2 className={`${sectionHeadingClass} mb-8 max-w-[16ch]`}>
            Real Case Studies
          </h2>
          <div className="relative rounded-2xl bg-brand-silk/80 dark:bg-gray-900/70 p-6 md:p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
              {caseStudies.map((study, index) => {
                const isPrimary = index === 0;
                return (
                  <article
                    key={study.title}
                    className={`h-full rounded-2xl p-6 md:p-7 shadow-[0_10px_28px_rgba(0,0,0,0.1)] ${
                      isPrimary
                        ? 'bg-brand-blue text-white'
                        : 'bg-white dark:bg-gray-950'
                    }`}
                  >
                    <h3 className={`text-[clamp(1.2rem,1.8vw,1.6rem)] font-futura font-bold mb-4 ${isPrimary ? 'text-white' : 'text-brand-blue'}`}>
                      {study.title}
                    </h3>
                    <div className="grid grid-cols-3 gap-2 mb-5">
                      {study.metrics.map((metric) => (
                        <div
                          key={metric.label}
                          className={`rounded-md p-3 ${
                            isPrimary
                              ? 'bg-white/12 border border-white/25'
                              : 'bg-brand-silk dark:bg-gray-900 border border-gray-200 dark:border-gray-700'
                          }`}
                        >
                          <p className={`text-[clamp(1.05rem,1.35vw,1.35rem)] font-futura font-bold leading-none mb-1 ${isPrimary ? 'text-white' : 'text-brand-blue'}`}>
                            {metric.value}
                          </p>
                          <p className={`text-[clamp(0.65rem,0.85vw,0.8rem)] uppercase tracking-wide font-helvetica-light ${isPrimary ? 'text-white/85' : 'text-gray-600 dark:text-gray-400'}`}>
                            {metric.label}
                          </p>
                        </div>
                      ))}
                    </div>
                    <p className={`text-[clamp(0.95rem,1.05vw,1rem)] leading-[1.6] font-helvetica-light mb-3 ${isPrimary ? 'text-white/90' : 'text-gray-800 dark:text-gray-200'}`}>
                      <span className={`font-helvetica ${isPrimary ? 'text-white' : 'text-gray-900 dark:text-gray-100'}`}>Situation:</span> {study.situation}
                    </p>
                    <p className={`text-[clamp(0.95rem,1.05vw,1rem)] leading-[1.6] font-helvetica-light mb-4 ${isPrimary ? 'text-white/90' : 'text-gray-800 dark:text-gray-200'}`}>
                      <span className={`font-helvetica ${isPrimary ? 'text-white' : 'text-gray-900 dark:text-gray-100'}`}>Strategic Finding:</span> {study.finding}
                    </p>
                    <div className={`pt-4 space-y-2 ${isPrimary ? 'border-t border-white/20' : 'border-t border-gray-200 dark:border-gray-700'}`}>
                      {study.outcomes.map((outcome) => (
                        <p key={outcome} className={`text-[clamp(0.95rem,1.05vw,1rem)] font-helvetica-light ${isPrimary ? 'text-white/90' : 'text-gray-800 dark:text-gray-200'}`}>
                          {outcome}
                        </p>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
          <div className="mt-8 lg:mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
            {testimonials.map((item) => (
              <article
                key={item.name}
                className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-900/80 p-5"
              >
                <p className="text-[clamp(0.95rem,1.05vw,1rem)] leading-[1.6] text-gray-800 dark:text-gray-200 font-helvetica-light mb-4">
                  &quot;{item.quote}&quot;
                </p>
                <p className="text-[clamp(0.92rem,1vw,0.98rem)] font-helvetica text-gray-900 dark:text-gray-100">
                  {item.name}
                </p>
                <p className="text-[clamp(0.82rem,0.92vw,0.9rem)] uppercase tracking-wide text-gray-600 dark:text-gray-400 font-helvetica-light mt-1">
                  {item.company}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-6 rounded-xl border border-brand-blue/25 bg-brand-blue/[0.06] dark:bg-brand-blue/[0.12] p-4 md:p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4">
              {credibilityPoints.map((point) => (
                <div key={point} className="rounded-lg bg-white/80 dark:bg-gray-900/70 border border-gray-200 dark:border-gray-700 px-3 py-3">
                  <p className="text-[clamp(0.82rem,0.95vw,0.9rem)] uppercase tracking-wide text-gray-700 dark:text-gray-300 font-helvetica">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20 lg:py-24 bg-brand-silk/90 dark:bg-gray-900/85 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
        <Container>
          <h2 className={`${sectionHeadingClass} mb-8 max-w-[16ch]`}>
            Who This Is For
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 lg:divide-x lg:divide-gray-300/80 dark:lg:divide-gray-700">
            <div className="lg:pr-8">
              <h3 className="text-[clamp(1.2rem,1.8vw,1.5rem)] font-futura font-semibold text-gray-900 dark:text-gray-100 mb-4">This Is For</h3>
              <ul className="space-y-3">
                {fitChecks.good.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-brand-blue text-xl leading-none mt-[1px]">✔</span>
                    <span className="text-[clamp(0.95rem,1.05vw,1rem)] text-gray-800 dark:text-gray-200 font-helvetica-light">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:pl-8">
              <h3 className="text-[clamp(1.2rem,1.8vw,1.5rem)] font-futura font-semibold text-gray-900 dark:text-gray-100 mb-4">This Is Not For</h3>
              <ul className="space-y-3">
                {fitChecks.bad.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-brand-blue text-xl leading-none mt-[1px]">✖</span>
                    <span className="text-[clamp(0.95rem,1.05vw,1rem)] text-gray-800 dark:text-gray-200 font-helvetica-light">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden py-16 md:py-20 lg:py-24">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,123,255,0.08)_0%,rgba(0,123,255,0.03)_45%,rgba(0,123,255,0.07)_100%)]" />
          <div className="absolute -top-20 -left-16 h-72 w-72 rounded-full bg-brand-blue/12 blur-3xl" />
          <div className="absolute top-[30%] -right-20 h-80 w-80 rounded-full bg-brand-blue/10 blur-3xl" />
          <div className="absolute -bottom-20 left-1/3 h-72 w-72 rounded-full bg-brand-blue/8 blur-3xl" />
        </div>
        <Container>
          <h2 className={`${sectionHeadingClass} mb-6 max-w-none md:whitespace-nowrap text-center mx-auto`}>
            Why This Isn&apos;t <span className="text-gray-900 dark:text-white">Mass Market</span>
          </h2>
          <div className="max-w-4xl mx-auto rounded-xl border border-brand-blue/30 bg-white/85 dark:bg-gray-900/85 p-6 md:p-8">
            <p className="text-[clamp(1rem,1.3vw,1.2rem)] leading-[1.65] text-gray-800 dark:text-gray-200 font-helvetica-light mb-4">
              This workshop is intensive. We only take a limited number of businesses per month.
            </p>
            <p className="text-[clamp(1rem,1.3vw,1.2rem)] leading-[1.65] text-gray-800 dark:text-gray-200 font-helvetica-light mb-4">
              That allows us to build proper models, run detailed analysis, ensure accuracy, and provide depth rather than surface advice.
            </p>
            <p className="text-[clamp(1rem,1.3vw,1.2rem)] leading-[1.65] text-brand-blue font-helvetica">
              This isn&apos;t a template strategy. It&apos;s built around your business specifically.
            </p>
          </div>
        </Container>
      </section>

      <section id="apply" className="py-16 md:py-20 lg:py-24 bg-brand-blue text-white">
        <Container>
          <h2 className="text-[clamp(1.6rem,2.6vw,2.8rem)] leading-[1.14] font-futura font-bold mb-5 max-w-[20ch]">
            Stop Spending Blindly. Start Scaling Intelligently.
          </h2>
          <p className="text-[clamp(1rem,1.35vw,1.25rem)] leading-[1.6] font-helvetica-light mb-6 max-w-3xl text-white/90">
            If you&apos;re already doing £50K+ per month and want clarity before scaling further, apply below.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center bg-white text-brand-blue font-helvetica font-medium text-[clamp(1rem,1.2vw,1.125rem)] px-8 py-3 rounded-lg hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-blue"
          >
            Apply For The Strategy Workshop
          </Link>
          <p className="mt-4 text-[clamp(0.875rem,1vw,1rem)] text-white/85 font-helvetica-light">
            We&apos;ll review your business and confirm if we can help before anything is booked.
          </p>
        </Container>
      </section>
    </main>
  );
}
