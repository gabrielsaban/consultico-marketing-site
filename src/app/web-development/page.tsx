import Container from '@/components/Container';
import ServiceDesktopHeader from '@/components/ServiceDesktopHeader';
import Link from 'next/link';

const stats = [
  { number: '150+', label: 'Websites launched' },
  { number: '99.9%', label: 'Uptime target' },
  { number: '2.5s', label: 'Average load time' },
  { number: '100%', label: 'Client satisfaction' },
];

const buildStack = [
  { label: 'Structure', detail: 'Clear journeys and pages with a job' },
  { label: 'Speed', detail: 'Lean frontends and performance-conscious assets' },
  { label: 'Mobile', detail: 'Responsive layouts built around real device behaviour' },
  { label: 'Conversion', detail: 'Forms, CTAs, and trust signals placed deliberately' },
  { label: 'Control', detail: 'Sensible editing workflows and maintainable setup' },
  { label: 'Support', detail: 'Launch help, fixes, and ongoing technical care' },
];

const painPoints = [
  {
    title: 'Your site looks outdated',
    body: 'First impressions happen quickly. A dated or clumsy site can make a strong business feel weaker than it is.',
  },
  {
    title: 'It is slow and frustrating to use',
    body: 'Slow pages lose attention. Visitors should not have to wait, pinch, zoom, or fight the interface.',
  },
  {
    title: 'Mobile users get a poor experience',
    body: 'Most people will meet your business on a smaller screen. The mobile version cannot be an afterthought.',
  },
  {
    title: 'Simple updates take too much effort',
    body: 'A useful website should be maintainable. If every small change creates friction, the site becomes stale.',
  },
];

const webIncludes = [
  {
    title: 'Custom Website Development',
    description: 'Bespoke websites built around your business goals, content, users, and conversion paths.',
    features: [
      'Custom design and development',
      'Responsive across all devices',
      'Modern tech stack',
      'CMS integration',
      'Performance optimisation',
    ],
  },
  {
    title: 'E-Commerce Solutions',
    description: 'Online stores built to make browsing, buying, and managing orders feel clear and dependable.',
    features: [
      'Product catalogue management',
      'Secure payment processing',
      'Inventory management',
      'Order tracking systems',
      'Customer account features',
    ],
  },
  {
    title: 'Web Application Development',
    description: 'Custom functionality and application logic for teams that need more than a standard website.',
    features: [
      'Custom functionality',
      'Database architecture',
      'API integrations',
      'User authentication',
      'Real-time features',
    ],
  },
  {
    title: 'Website Maintenance & Support',
    description: 'Ongoing technical support to keep your website secure, updated, and performing properly.',
    features: [
      'Regular security updates',
      'Performance monitoring',
      'Bug fixes and troubleshooting',
      'Content updates',
      'Technical support',
    ],
  },
];

const engagementOptions = [
  {
    name: 'Business Website',
    summary: 'A professional site for small businesses that need a clear, credible online presence.',
    features: ['Up to 10 pages', 'Responsive design', 'Contact forms', 'Basic SEO setup'],
  },
  {
    name: 'E-Commerce',
    summary: 'A complete store experience for businesses selling products or services online.',
    features: ['Product catalogue', 'Payment integration', 'Order management', 'Customer accounts'],
    highlighted: true,
  },
  {
    name: 'Custom Platform',
    summary: 'Advanced web builds for businesses that need bespoke functionality or integrations.',
    features: ['Custom functionality', 'Advanced integrations', 'Scalable infrastructure', 'Ongoing maintenance'],
  },
];

const processSteps = [
  {
    number: '01',
    title: 'Discovery & Planning',
    body: 'We define goals, users, content needs, technical requirements, and the structure the site has to support.',
  },
  {
    number: '02',
    title: 'Design & Development',
    body: 'We design and build a fast, responsive, maintainable experience using the right tools for the job.',
  },
  {
    number: '03',
    title: 'Launch & Support',
    body: 'We prepare launch, test the experience, and support the site so it stays secure, current, and useful.',
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

export default function WebDevelopmentPage() {
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
                Web Development
              </div>

              <h1 className="max-w-5xl font-futura text-[clamp(2.35rem,5vw,5.8rem)] font-bold leading-[0.98] text-gray-900 dark:text-white">
                <span className="block">Websites that work</span>
                <span className="block text-brand-blue">as hard as you do.</span>
              </h1>

              <p className="mt-7 max-w-3xl text-[clamp(1rem,1.45vw,1.3rem)] leading-[1.65] text-gray-800 dark:text-gray-200 font-helvetica-light">
                We build fast, secure, conversion-focused websites that give visitors a clear path and give businesses a stronger digital foundation.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-blue px-7 py-3 text-[clamp(1rem,1.15vw,1.1rem)] font-helvetica font-medium text-white transition-colors duration-200 hover:bg-[#006FE6] active:bg-[#0067D6] focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2"
                >
                  Discuss a Website Build
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
                A website should not just exist. It should load quickly, guide clearly, convert confidently, and stay manageable.
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
                Your website can cost you customers every single day.
              </h2>
              <p className="mt-6 text-[clamp(1rem,1.25vw,1.15rem)] leading-[1.65] text-gray-700 dark:text-gray-300 font-helvetica-light">
                Slow load times, weak mobile layouts, unclear navigation, and difficult updates all turn the website from an asset into friction.
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
              Site as infrastructure
            </p>
            <h2 className="font-futura text-[clamp(2rem,3.6vw,4.5rem)] font-bold leading-[1.05]">
              Your best salesperson should not be difficult to use.
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-[clamp(1rem,1.3vw,1.25rem)] leading-[1.6] text-white/90 font-helvetica-light">
              The strongest websites balance brand, speed, structure, content, and conversion so visitors understand what to do next.
            </p>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-brand-silk/80 py-16 shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:bg-gray-900/80 md:py-20 lg:py-24">
        <Container>
          <div className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-[0.68fr_1fr] lg:items-end">
            <div>
              <p className="mb-3 text-[0.8rem] font-helvetica font-semibold uppercase tracking-[0.16em] text-brand-blue">
                Build specification
              </p>
              <h2 className="font-futura text-[clamp(2rem,3.4vw,4rem)] font-bold leading-[1.05] text-gray-900 dark:text-white">
                Good websites are engineered around the details users feel.
              </h2>
            </div>
            <p className="max-w-3xl text-[clamp(1rem,1.25vw,1.18rem)] leading-[1.6] text-gray-700 dark:text-gray-300 font-helvetica-light">
              The build needs to feel polished on the surface, but it also needs a clear internal structure: fast pages, sensible content management, secure foundations, and paths that convert.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {buildStack.map((item) => (
              <article
                key={item.label}
                className="rounded-lg border border-gray-200 bg-white/85 p-5 shadow-sm dark:border-gray-800 dark:bg-gray-950/60"
              >
                <p className="mb-4 inline-flex rounded-full border border-brand-blue/35 px-3 py-1 text-[0.72rem] font-helvetica font-semibold uppercase tracking-[0.14em] text-brand-blue">
                  {item.label}
                </p>
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
              Everything needed to launch a site that works properly.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {webIncludes.map((item) => (
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
              Web builds scaled around complexity, commerce, and custom functionality.
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
              From unclear web presence to a fast, useful digital foundation.
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
              Ready to launch a stronger website?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[clamp(1rem,1.25vw,1.2rem)] leading-[1.6] text-white/90 font-helvetica-light">
              Let&apos;s discuss the site your business needs, what it should do, and how it can support growth.
            </p>
            <Link
              href="/#contact"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-3 text-[clamp(1rem,1.15vw,1.1rem)] font-helvetica font-medium text-brand-blue transition-colors duration-200 hover:bg-gray-100 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-blue"
            >
              Discuss a Website Build
              <ArrowIcon />
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
