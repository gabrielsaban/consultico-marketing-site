import Container from '@/components/Container';
import ServiceDesktopHeader from '@/components/ServiceDesktopHeader';
import Link from 'next/link';

const stats = [
  { number: '250%', label: 'Average traffic increase' },
  { number: '87%', label: 'Client retention rate' },
  { number: '150+', label: 'Businesses helped' },
  { number: '6 mo', label: 'Average time to page 1' },
];

const searchJourney = ['Crawl', 'Index', 'Rank', 'Click', 'Convert'];

const painPoints = [
  {
    title: 'You are buried on page 2 or worse',
    body: 'Less than 1% of searchers make it to page 2. If competitors own page 1, they are taking demand that should be yours.',
  },
  {
    title: 'You are paying for traffic that disappears',
    body: 'Ads stop when spend stops. SEO builds a compounding acquisition channel that can keep working beyond each campaign.',
  },
  {
    title: 'Competitors appear everywhere',
    body: 'They may not be better. They may simply be more visible when buyers are actively searching.',
  },
  {
    title: 'You have tried SEO and got burned',
    body: 'Empty promises and vague reports make trust difficult. SEO needs clear priorities, transparent work, and measurable progress.',
  },
];

const seoIncludes = [
  {
    title: 'Technical SEO Audit',
    description: "A detailed review of your website's technical health, crawlability, indexing, and search readiness.",
    features: [
      'Site architecture review',
      'Page speed optimisation',
      'Mobile responsiveness check',
      'Schema markup implementation',
      'XML sitemap optimisation',
    ],
  },
  {
    title: 'Keyword Research & Strategy',
    description: 'Data-led keyword targeting aligned with customer intent, commercial value, and realistic ranking opportunity.',
    features: [
      'Competitor keyword analysis',
      'Search intent mapping',
      'Long-tail opportunity identification',
      'Keyword difficulty assessment',
      'Content gap analysis',
    ],
  },
  {
    title: 'On-Page Optimisation',
    description: 'Content and page structure improvements that help search engines and customers understand your value.',
    features: [
      'Title tag and meta description optimisation',
      'Header tag structure',
      'Internal linking strategy',
      'Content optimisation',
      'Image alt text optimisation',
    ],
  },
  {
    title: 'Link Building & Authority',
    description: "Ethical authority-building work designed to improve trust, relevance, and your site's ability to compete.",
    features: [
      'High-quality backlink acquisition',
      'Competitor backlink analysis',
      'Broken link building',
      'Guest posting opportunities',
      'Digital PR outreach',
    ],
  },
];

const visibilityChecks = [
  {
    label: 'Technical',
    title: 'Can search engines access the site cleanly?',
    body: 'We look for crawl blocks, speed issues, indexing problems, site architecture gaps, and technical friction.',
  },
  {
    label: 'Intent',
    title: 'Are you targeting searches that matter?',
    body: 'We map keywords by buyer intent so the strategy favours traffic with commercial value, not vanity volume.',
  },
  {
    label: 'Content',
    title: 'Does each page deserve to rank?',
    body: 'We assess relevance, depth, structure, internal links, and whether the page answers the query better than competitors.',
  },
  {
    label: 'Authority',
    title: 'Does the market trust the domain?',
    body: 'We review backlink quality, competitor authority, reputation signals, and opportunities to build trust.',
  },
  {
    label: 'Conversion',
    title: 'Does organic traffic become business?',
    body: 'Ranking is only useful if visitors know what to do next. We connect search visibility to enquiries and revenue.',
  },
];

const engagementOptions = [
  {
    name: 'Starter',
    summary: 'Focused SEO foundations for businesses that need visibility basics fixed properly.',
    features: ['Initial SEO audit', 'Keyword research', 'On-page optimisation', 'Monthly reporting'],
  },
  {
    name: 'Professional',
    summary: 'A broader SEO programme for businesses ready to build traffic, authority, and demand.',
    features: ['Advanced keyword research', 'Content strategy development', 'Link building campaign', 'Quarterly strategy sessions'],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    summary: 'Full-scale SEO support for larger, more competitive, or multi-location search environments.',
    features: ['Unlimited keyword tracking', 'Dedicated account management', 'Custom reporting dashboard', 'Ongoing technical optimisation'],
  },
];

const processSteps = [
  {
    number: '01',
    title: 'Discovery & Audit',
    body: 'We analyse current performance, technical health, competitors, keywords, and the biggest search opportunities.',
  },
  {
    number: '02',
    title: 'Strategy & Implementation',
    body: 'We execute a practical SEO plan across technical fixes, content optimisation, internal links, and authority building.',
  },
  {
    number: '03',
    title: 'Monitor & Optimise',
    body: 'We track rankings, traffic, conversions, and search behaviour so the strategy keeps improving over time.',
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

export default function SeoPage() {
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
                SEO Services
              </div>

              <h1 className="max-w-5xl font-futura text-[clamp(2.25rem,4vw,4.75rem)] font-bold leading-[1.02] text-gray-900 dark:text-white">
                <span className="block">Be found when</span>
                <span className="block text-brand-blue">buyers are searching.</span>
              </h1>

              <p className="mt-7 max-w-3xl text-[clamp(1rem,1.45vw,1.3rem)] leading-[1.65] text-gray-800 dark:text-gray-200 font-helvetica-light">
                We improve search visibility with technical clarity, intent-led content, and authority-building work that brings qualified organic traffic closer to revenue.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-blue px-7 py-3 text-[clamp(1rem,1.15vw,1.1rem)] font-helvetica font-medium text-white transition-colors duration-200 hover:bg-[#006FE6] active:bg-[#0067D6] focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2"
                >
                  Discuss an SEO Audit
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

            <div className="mt-10 grid max-w-5xl grid-cols-1 gap-4 border-l-2 border-brand-blue bg-white/70 px-5 py-4 shadow-sm dark:bg-gray-950/50 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
              <p className="text-[clamp(1rem,1.25vw,1.18rem)] leading-[1.55] text-gray-800 dark:text-gray-200 font-helvetica">
                SEO compounds when search engines can crawl, understand, trust, and reward the right pages.
              </p>
              <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:gap-0">
                {searchJourney.map((step, index) => (
                  <div key={step} className="contents sm:flex sm:flex-1 sm:items-center">
                    <div className="w-full rounded-md border border-brand-blue/20 bg-white/75 px-3 py-2 text-center dark:bg-gray-900/75">
                      <p className="font-futura text-[clamp(0.9rem,1vw,1rem)] font-bold text-brand-blue">{step}</p>
                    </div>
                    {index < searchJourney.length - 1 && (
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
                You are putting everything into the business, but still invisible online.
              </h2>
              <p className="mt-6 text-[clamp(1rem,1.25vw,1.15rem)] leading-[1.65] text-gray-700 dark:text-gray-300 font-helvetica-light">
                You may deliver exceptional service, but when potential customers search for what you offer, visibility decides who gets considered first.
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
              Search as demand capture
            </p>
            <h2 className="font-futura text-[clamp(2rem,3.6vw,4.5rem)] font-bold leading-[1.05]">
              The customers you need are already searching.
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-[clamp(1rem,1.3vw,1.25rem)] leading-[1.6] text-white/90 font-helvetica-light">
              SEO makes sure your business appears when intent is highest, then gives visitors the confidence and clarity to take the next step.
            </p>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden py-16 md:py-20 lg:py-24">
        <Container>
          <div className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-[0.68fr_1fr] lg:items-end">
            <div>
              <p className="mb-3 text-[0.8rem] font-helvetica font-semibold uppercase tracking-[0.16em] text-brand-blue">
                Visibility diagnostic
              </p>
              <h2 className="font-futura text-[clamp(2rem,3.4vw,4rem)] font-bold leading-[1.05] text-gray-900 dark:text-white">
                Ranking is only useful when it is built on the right signals.
              </h2>
            </div>
            <p className="max-w-3xl text-[clamp(1rem,1.25vw,1.18rem)] leading-[1.6] text-gray-700 dark:text-gray-300 font-helvetica-light">
              A useful SEO audit should show what is stopping discovery, what deserves priority, and where visibility can become qualified demand.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
            {visibilityChecks.map((item) => (
              <article
                key={item.label}
                className="relative overflow-hidden rounded-lg border border-gray-200 bg-white/85 p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/75"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-brand-blue" />
                <p className="mb-5 mt-2 font-futura text-[clamp(1.6rem,2.3vw,2.4rem)] font-bold leading-none text-brand-blue/25">
                  {item.label}
                </p>
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
              Every element needed to make organic search work harder.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {seoIncludes.map((item) => (
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
              SEO support scaled around competition, content depth, and technical need.
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
              From invisible online to discoverable, useful, and trusted.
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
              Ready to grow your organic traffic?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[clamp(1rem,1.25vw,1.2rem)] leading-[1.6] text-white/90 font-helvetica-light">
              Let&apos;s discuss an SEO audit and identify the visibility gaps, technical blockers, and growth opportunities worth fixing first.
            </p>
            <Link
              href="/#contact"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-3 text-[clamp(1rem,1.15vw,1.1rem)] font-helvetica font-medium text-brand-blue transition-colors duration-200 hover:bg-gray-100 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-blue"
            >
              Discuss an SEO Audit
              <ArrowIcon />
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
