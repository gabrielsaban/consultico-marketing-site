import Container from '@/components/Container';
import ServiceDesktopHeader from '@/components/ServiceDesktopHeader';
import Link from 'next/link';

const stats = [
  { number: '500K+', label: 'Words written' },
  { number: '94%', label: 'Client retention' },
  { number: '3.5x', label: 'Average traffic increase' },
  { number: '200+', label: 'Content campaigns' },
];

const painPoints = [
  {
    title: 'You do not have time to publish regularly',
    body: 'Quality content takes planning, writing, editing, and distribution. Without a system, the calendar goes quiet.',
  },
  {
    title: 'You are not sure what to say',
    body: 'Content without audience insight becomes guesswork. Strong ideas come from knowing what people need, fear, compare, and search for.',
  },
  {
    title: 'Your content is not generating results',
    body: 'Publishing alone is not enough. Content needs a job: attracting traffic, building trust, supporting sales, or moving people to act.',
  },
  {
    title: 'Generic writing has not worked',
    body: 'Content that could belong to anyone rarely builds authority. Your voice, offer, and market context need to show up clearly.',
  },
];

const contentIncludes = [
  {
    title: 'Blog & Article Writing',
    description: 'SEO-informed articles that attract, educate, and convert your target audience.',
    features: [
      'Keyword research and optimisation',
      'Industry-specific content',
      'Long-form articles',
      'Thought leadership pieces',
      'Editorial calendar planning',
    ],
  },
  {
    title: 'Website Copy & Landing Pages',
    description: 'Conversion-focused copy that communicates value clearly and moves people toward action.',
    features: [
      'Homepage and service pages',
      'Landing page copywriting',
      'Product descriptions',
      'About and team pages',
      'Call-to-action optimisation',
    ],
  },
  {
    title: 'Video Scripts & Podcasts',
    description: 'Structured content for video, audio, presentations, and spoken formats.',
    features: [
      'Video script development',
      'Podcast episode planning',
      'Interview questions',
      'Presentation content',
      'Storyboarding',
    ],
  },
  {
    title: 'Social Media Content',
    description: 'Platform-aware content built to support distribution, engagement, and audience growth.',
    features: [
      'Social media posts',
      'Caption writing',
      'Content calendars',
      'Hashtag strategy',
      'Community engagement content',
    ],
  },
];

const contentSystem = [
  {
    label: 'Audience',
    title: 'Know who the content is for',
    body: 'We map what your audience searches, compares, questions, and needs to believe before they act.',
  },
  {
    label: 'Purpose',
    title: 'Give every piece a job',
    body: 'Some content attracts. Some educates. Some converts. We build around the role each asset should play.',
  },
  {
    label: 'Voice',
    title: 'Sound like the brand, not a template',
    body: 'The work should carry your positioning, tone, and perspective, not generic industry filler.',
  },
  {
    label: 'Distribution',
    title: 'Plan where the idea travels',
    body: 'A strong piece can become articles, landing page copy, social posts, scripts, emails, and sales support.',
  },
  {
    label: 'Measurement',
    title: 'Learn what is earning attention',
    body: 'We review performance so future content is shaped by evidence, not just a full calendar.',
  },
];

const engagementOptions = [
  {
    name: 'Starter',
    summary: 'Essential content production for businesses building a more consistent presence.',
    features: ['4 content pieces per month', 'Keyword research', 'Basic SEO optimisation', 'Editorial planning'],
  },
  {
    name: 'Growth',
    summary: 'A broader content system for businesses ready to scale authority and demand.',
    features: ['8 content pieces per month', 'Landing page copy', 'Social content', 'Content strategy planning'],
    highlighted: true,
  },
  {
    name: 'Authority',
    summary: 'Full-scale content support for brands that need multi-channel production and direction.',
    features: ['Expanded content production', 'Dedicated content direction', 'Video and podcast scripts', 'Performance analysis'],
  },
];

const processSteps = [
  {
    number: '01',
    title: 'Strategy & Planning',
    body: 'We research your audience, competitors, search demand, and offer to shape a practical content roadmap.',
  },
  {
    number: '02',
    title: 'Creation & Optimisation',
    body: 'We create content with a clear role, a defined audience, and the structure needed to support discovery and conversion.',
  },
  {
    number: '03',
    title: 'Publish & Learn',
    body: 'We help content move through the right channels, then use performance insight to sharpen what comes next.',
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

export default function ContentCreationPage() {
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
                Content Creation
              </div>

              <h1 className="max-w-5xl font-futura text-[clamp(2.35rem,5vw,5.8rem)] font-bold leading-[0.98] text-gray-900 dark:text-white">
                <span className="block">Content built to</span>
                <span className="block text-brand-blue">attract, engage,</span>
                <span className="block text-brand-blue">and convert.</span>
              </h1>

              <p className="mt-7 max-w-3xl text-[clamp(1rem,1.45vw,1.3rem)] leading-[1.65] text-gray-800 dark:text-gray-200 font-helvetica-light">
                We create strategic, high-quality content that builds authority, supports search, and gives your audience a clearer reason to trust you.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-blue px-7 py-3 text-[clamp(1rem,1.15vw,1.1rem)] font-helvetica font-medium text-white transition-colors duration-200 hover:bg-[#006FE6] active:bg-[#0067D6] focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2"
                >
                  Discuss a Content Strategy
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
                Great content is not just output. It is a repeatable system for earning attention, trust, and action.
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
                You know you need content, but creating it consistently is impossible.
              </h2>
              <p className="mt-6 text-[clamp(1rem,1.25vw,1.15rem)] leading-[1.65] text-gray-700 dark:text-gray-300 font-helvetica-light">
                Content marketing works, but it becomes hard to sustain when there is no time, no clear angle, and no system connecting the work to business outcomes.
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
              Content as a growth engine
            </p>
            <h2 className="font-futura text-[clamp(2rem,3.6vw,4.5rem)] font-bold leading-[1.05]">
              Every article, page, post, and script should have a job.
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-[clamp(1rem,1.3vw,1.25rem)] leading-[1.6] text-white/90 font-helvetica-light">
              Content works best when it is built around audience questions, commercial intent, brand authority, and a clear next action.
            </p>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-brand-silk/80 py-16 shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:bg-gray-900/80 md:py-20 lg:py-24">
        <Container>
          <div className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-[0.68fr_1fr] lg:items-end">
            <div>
              <p className="mb-3 text-[0.8rem] font-helvetica font-semibold uppercase tracking-[0.16em] text-brand-blue">
                Content operating system
              </p>
              <h2 className="font-futura text-[clamp(2rem,3.4vw,4rem)] font-bold leading-[1.05] text-gray-900 dark:text-white">
                Turn scattered ideas into a repeatable publishing rhythm.
              </h2>
            </div>
            <p className="max-w-3xl text-[clamp(1rem,1.25vw,1.18rem)] leading-[1.6] text-gray-700 dark:text-gray-300 font-helvetica-light">
              The goal is not simply to make more content. It is to create a system where insight becomes an angle, the angle becomes an asset, and the asset is distributed, measured, and improved.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
            {contentSystem.map((item, index) => (
              <article
                key={item.label}
                className="rounded-lg border border-gray-200 bg-white/85 p-5 shadow-sm dark:border-gray-800 dark:bg-gray-950/60"
              >
                <div className="mb-5 flex items-center justify-between gap-3">
                  <p className="inline-flex rounded-full border border-brand-blue/35 px-3 py-1 text-[0.72rem] font-helvetica font-semibold uppercase tracking-[0.14em] text-brand-blue">
                    {item.label}
                  </p>
                  <span className="font-futura text-[clamp(1.8rem,2.4vw,2.5rem)] font-bold leading-none text-brand-blue/20">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-futura text-[clamp(1.1rem,1.35vw,1.3rem)] font-bold leading-[1.15] text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-[clamp(0.9rem,1vw,0.98rem)] leading-[1.55] text-gray-700 dark:text-gray-300 font-helvetica-light">
                  {item.body}
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
              Strategic content that works across the channels that matter.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {contentIncludes.map((item) => (
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
              Content support scaled around cadence, channels, and ambition.
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
              From scattered publishing to a useful content engine.
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
              Ready to build your content engine?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[clamp(1rem,1.25vw,1.2rem)] leading-[1.6] text-white/90 font-helvetica-light">
              Let&apos;s discuss a content strategy that can drive traffic, build authority, and generate better-fit enquiries.
            </p>
            <Link
              href="/#contact"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-3 text-[clamp(1rem,1.15vw,1.1rem)] font-helvetica font-medium text-brand-blue transition-colors duration-200 hover:bg-gray-100 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-blue"
            >
              Discuss a Content Strategy
              <ArrowIcon />
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
