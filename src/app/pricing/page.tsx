import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/Container';
import ServiceDesktopHeader from '@/components/ServiceDesktopHeader';
import { pageMeta } from '@/lib/seo';
import { LOOP_HREF } from '@/lib/nav-services';

/**
 * Pricing (Paul, 2026-11-23). Easy to find, never on the homepage, and not a
 * top-level menu item: it lives in the menu's Services group, the footer, and
 * links from Think First, /market-strategy and /apply.
 *
 * Order is the anchor: Loop and Think First at £5,000 first, then agency
 * services from £1,000 a month, then the lighter options. Hourly and day rates
 * are "available", never priced on the page.
 */
export const metadata: Metadata = pageMeta({
  title: 'Pricing',
  description:
    'Consultico pricing: Loop from £5,000 a month, the Think First strategy workshop from £5,000, and agency services such as SEO and Google Ads from £1,000 a month.',
  path: '/pricing',
});

const MAIN = [
  {
    eyebrow: 'Loop',
    title: 'All your marketing, sharper every week',
    price: '£5,000',
    unit: 'a month',
    note: '12-month agreement, starting with Think First',
    points: [
      'One strategist who learns your brand and your numbers',
      'A Monday report on what your marketing really earns',
      'The right changes made with your team, and tested',
    ],
    cta: { label: 'Apply now', href: '/apply' },
    secondary: { label: 'How it works', href: LOOP_HREF },
    featured: true,
  },
  {
    eyebrow: 'Think First',
    title: 'A clear plan before you spend',
    price: '£5,000',
    unit: 'one-off',
    note: 'Bought on its own, or as month one of Loop',
    points: [
      'A strategic audit of your numbers and channels',
      'A half-day workshop with your team',
      'A 12-month roadmap you can act on',
    ],
    cta: { label: 'Apply now', href: '/apply' },
    secondary: { label: 'About Think First', href: '/think-first' },
    featured: false,
  },
];

const AGENCY = [
  { name: 'SEO and GEO', href: '/seo' },
  { name: 'Google Ads', href: '/ppc' },
  { name: 'Websites', href: '/web-development' },
  { name: 'Content', href: '/content-creation' },
  { name: 'Campaigns', href: '/campaign-management' },
];

const EXTRAS = [
  {
    title: 'Content shoots',
    body: 'Photo and video for your website, ads and social, planned around what your marketing needs next.',
    price: 'Quoted per shoot',
  },
  {
    title: 'Consultations',
    body: 'For a specific decision rather than a whole plan. Bring one question or several.',
    price: 'Hourly and day rates available',
  },
];

function Check() {
  return (
    <svg className="mt-1 h-4 w-4 flex-none text-brand-blue" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export default function PricingPage() {
  return (
    <main className="relative bg-brand-silk dark:bg-gray-950">
      <ServiceDesktopHeader />

      <section className="pt-28 pb-12 md:pt-[12rem] md:pb-16">
        <Container>
          <div className="max-w-3xl">
            <h1 className="font-futura text-[clamp(2.2rem,4vw,3.6rem)] font-bold leading-[1.05] tracking-[-0.01em]">
              <span className="block text-[#1B2A4A] dark:text-white">Pricing.</span>
              <span className="block text-brand-blue">Ways to work with us.</span>
            </h1>
            <p className="mt-6 font-helvetica-light text-[clamp(1.05rem,1.4vw,1.25rem)] leading-[1.6] text-gray-700 dark:text-gray-300">
              Every brand is different, so these are starting prices. You&apos;ll get a clear figure, and the thinking
              behind it, before you commit to anything.
            </p>
          </div>
        </Container>
      </section>

      <section className="pb-12 md:pb-16">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            {MAIN.map((plan) => (
              <article
                key={plan.eyebrow}
                className={`flex flex-col rounded-2xl border p-6 md:p-8 ${
                  plan.featured
                    ? 'border-[#1B2A4A] bg-[#1B2A4A] text-white dark:border-brand-blue'
                    : 'border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900'
                }`}
              >
                <p className={`font-helvetica text-[0.85rem] uppercase tracking-[0.12em] ${plan.featured ? 'text-blue-200' : 'text-brand-blue'}`}>
                  {plan.eyebrow}
                </p>
                <h2 className={`mt-2 font-futura text-[1.6rem] font-bold leading-tight ${plan.featured ? 'text-white' : 'text-[#1B2A4A] dark:text-white'}`}>
                  {plan.title}
                </h2>
                <p className="mt-6 font-futura">
                  <span className={`text-[1rem] ${plan.featured ? 'text-blue-100' : 'text-gray-600 dark:text-gray-400'}`}>From </span>
                  <span className="text-[2.6rem] font-bold leading-none">{plan.price}</span>
                  <span className={`text-[1rem] ${plan.featured ? 'text-blue-100' : 'text-gray-600 dark:text-gray-400'}`}> {plan.unit}</span>
                </p>
                <p className={`mt-2 font-helvetica-light text-[0.98rem] ${plan.featured ? 'text-blue-100' : 'text-gray-600 dark:text-gray-400'}`}>{plan.note}</p>
                <ul className={`mt-6 space-y-3 border-t pt-6 font-helvetica-light text-[1.02rem] ${plan.featured ? 'border-white/20' : 'border-gray-200 dark:border-gray-800'}`}>
                  {plan.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <Check />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-8">
                  <Link
                    href={plan.cta.href}
                    className={`inline-flex min-h-[48px] items-center justify-center rounded-lg px-7 py-3 font-helvetica font-medium transition-colors ${
                      plan.featured ? 'bg-white text-[#1B2A4A] hover:bg-blue-50' : 'bg-brand-blue text-white hover:bg-[#006FE6]'
                    }`}
                  >
                    {plan.cta.label}
                  </Link>
                  <Link href={plan.secondary.href} className={`font-helvetica underline-offset-4 hover:underline ${plan.featured ? 'text-white' : 'text-brand-blue'}`}>
                    {plan.secondary.label}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-12 md:pb-16">
        <Container>
          <article className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8 dark:border-gray-800 dark:bg-gray-900">
            <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <p className="font-helvetica text-[0.85rem] uppercase tracking-[0.12em] text-brand-blue">Agency services</p>
                <h2 className="mt-2 font-futura text-[1.6rem] font-bold leading-tight text-[#1B2A4A] dark:text-white">One channel, done properly</h2>
                <p className="mt-3 max-w-2xl font-helvetica-light text-[1.05rem] leading-[1.6] text-gray-700 dark:text-gray-300">
                  When you know which channel you need, we run it on its own, with clear reporting on what it brings in.
                </p>
              </div>
              <p className="font-futura text-[#1B2A4A] dark:text-white">
                <span className="text-[1rem] text-gray-600 dark:text-gray-400">From </span>
                <span className="text-[2.2rem] font-bold leading-none">£1,000</span>
                <span className="text-[1rem] text-gray-600 dark:text-gray-400"> a month</span>
              </p>
            </div>
            <ul className="mt-6 flex flex-wrap gap-3 border-t border-gray-200 pt-6 dark:border-gray-800">
              {AGENCY.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="inline-flex min-h-[44px] items-center rounded-full border border-gray-300 px-4 py-2 font-helvetica text-[0.98rem] text-[#1B2A4A] transition-colors hover:border-brand-blue hover:text-brand-blue dark:border-gray-700 dark:text-white"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </article>
        </Container>
      </section>

      <section className="pb-12 md:pb-16">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {EXTRAS.map((item) => (
              <article key={item.title} className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8 dark:border-gray-800 dark:bg-gray-900">
                <h2 className="font-futura text-[1.35rem] font-bold text-[#1B2A4A] dark:text-white">{item.title}</h2>
                <p className="mt-3 font-helvetica-light text-[1.02rem] leading-[1.6] text-gray-700 dark:text-gray-300">{item.body}</p>
                <p className="mt-4 font-helvetica font-medium text-brand-blue">{item.price}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-20 md:pb-28">
        <Container>
          <article className="rounded-2xl border border-dashed border-gray-300 p-6 md:p-8 dark:border-gray-700">
            <p className="font-helvetica text-[0.85rem] uppercase tracking-[0.12em] text-gray-600 dark:text-gray-400">For smaller businesses</p>
            <h2 className="mt-2 font-futura text-[1.35rem] font-bold text-[#1B2A4A] dark:text-white">NBS Business: support done with you</h2>
            <p className="mt-3 max-w-3xl font-helvetica-light text-[1.02rem] leading-[1.6] text-gray-700 dark:text-gray-300">
              Run your own marketing with an expert beside you. Every package includes the NBS CRM platform, with your
              contacts, emails, texts and bookings in one place. Plans start from £55 a month.
            </p>
            <Link href="/contact" className="mt-5 inline-flex font-helvetica font-medium text-brand-blue underline-offset-4 hover:underline">
              Ask about NBS Business
            </Link>
          </article>

          <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Link
              href="/apply"
              className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-brand-blue px-8 py-3 font-helvetica font-medium text-white transition-colors hover:bg-[#006FE6]"
            >
              Apply now
            </Link>
            <Link href="/contact" className="font-helvetica text-brand-blue underline-offset-4 hover:underline">
              Not sure which fits? Book a call
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
