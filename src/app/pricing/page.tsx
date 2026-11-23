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

const LOOP_INCLUDES = [
  'A strategist who learns your brand, your numbers and your team',
  'Every channel looked at together: search, ads, email, social and content',
  'A Monday report on what your marketing really earns',
  'The right changes made with your team every week, and tested',
  'Think First as month one: your audit, workshop and 12-month roadmap',
  'Measured on total revenue against total marketing spend, not platform claims',
];

/** What's included, side by side. Only claims the site already makes elsewhere. */
const COMPARE: { row: string; loop: string; agency: string; thinkFirst: string }[] = [
  { row: 'A strategist who knows your brand', loop: 'yes', agency: 'no', thinkFirst: 'yes' },
  { row: 'Every channel looked at together', loop: 'yes', agency: 'no', thinkFirst: 'yes' },
  { row: 'A 12-month roadmap', loop: 'yes', agency: 'no', thinkFirst: 'yes' },
  { row: 'Changes made with your team', loop: 'Every week', agency: 'In one channel', thinkFirst: 'no' },
  { row: 'Reporting on what it earns', loop: 'Every Monday', agency: 'For that channel', thinkFirst: 'no' },
  { row: 'Price', loop: 'From £5,000 a month', agency: 'From £1,000 a month', thinkFirst: 'From £5,000, one-off' },
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

      {/* Loop gets the whole width (Paul, 2026-11-23): next to Think First, two
          £5,000 cards read as a choice between equals, which they aren't. */}
      <section className="pb-12 md:pb-16">
        <Container>
          <article className="overflow-hidden rounded-3xl bg-[#1B2A4A] text-white">
            <div className="grid gap-10 p-6 md:p-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14 lg:p-14">
              <div>
                <p className="font-helvetica text-[0.85rem] uppercase tracking-[0.14em] text-blue-200">Loop</p>
                <h2 className="mt-3 font-futura text-[clamp(1.9rem,3vw,2.8rem)] font-bold leading-[1.08]">
                  All your marketing, sharper every week.
                </h2>
                <p className="mt-4 max-w-xl font-helvetica-light text-[1.1rem] leading-[1.6] text-blue-100">
                  For brands with a marketing team who want to know what&apos;s working, and where to put more.
                </p>
                <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                  {LOOP_INCLUDES.map((point) => (
                    <li key={point} className="flex gap-3 font-helvetica-light text-[1.02rem] leading-[1.5]">
                      <svg className="mt-1 h-4 w-4 flex-none text-blue-300" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col justify-between rounded-2xl bg-white/[0.06] p-6 ring-1 ring-white/15 md:p-8">
                <div>
                  <p className="font-futura">
                    <span className="block text-[1rem] text-blue-100">From</span>
                    <span className="text-[clamp(3rem,5vw,4.25rem)] font-bold leading-none">£5,000</span>
                    <span className="text-[1.1rem] text-blue-100"> a month</span>
                  </p>
                  <p className="mt-4 font-helvetica-light text-[1rem] leading-[1.6] text-blue-100">
                    A 12-month agreement with a break clause at six months. Think First is included as month one.
                  </p>
                </div>
                <div className="mt-8 flex flex-col gap-3">
                  <Link href="/apply" className="inline-flex min-h-[52px] items-center justify-center rounded-lg bg-white px-7 py-3 font-helvetica font-medium text-[#1B2A4A] transition-colors hover:bg-blue-50">
                    Apply now
                  </Link>
                  <Link href={LOOP_HREF} className="text-center font-helvetica text-white underline-offset-4 hover:underline">
                    How it works
                  </Link>
                </div>
              </div>
            </div>
          </article>
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
          <div className="grid gap-6 md:grid-cols-3">
            <article className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8 dark:border-gray-800 dark:bg-gray-900">
              <p className="font-helvetica text-[0.85rem] uppercase tracking-[0.12em] text-brand-blue">Want the plan first?</p>
              <h2 className="mt-2 font-futura text-[1.35rem] font-bold text-[#1B2A4A] dark:text-white">Think First on its own</h2>
              <p className="mt-3 font-helvetica-light text-[1.02rem] leading-[1.6] text-gray-700 dark:text-gray-300">
                A strategic audit, a half-day workshop with your team and a 12-month roadmap you can run yourselves.
              </p>
              <p className="mt-4 font-helvetica font-medium text-[#1B2A4A] dark:text-white">From £5,000, one-off</p>
              <Link href="/think-first" className="mt-3 inline-flex font-helvetica text-brand-blue underline-offset-4 hover:underline">
                About Think First
              </Link>
            </article>
            {EXTRAS.map((item) => (
              <article key={item.title} className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8 dark:border-gray-800 dark:bg-gray-900">
                <p className="font-helvetica text-[0.85rem] uppercase tracking-[0.12em] text-brand-blue">Also available</p>
                <h2 className="mt-2 font-futura text-[1.35rem] font-bold text-[#1B2A4A] dark:text-white">{item.title}</h2>
                <p className="mt-3 font-helvetica-light text-[1.02rem] leading-[1.6] text-gray-700 dark:text-gray-300">{item.body}</p>
                <p className="mt-4 font-helvetica font-medium text-[#1B2A4A] dark:text-white">{item.price}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-12 md:pb-16">
        <Container>
          <h2 className="font-futura text-[clamp(1.5rem,2.4vw,2rem)] font-bold text-[#1B2A4A] dark:text-white">What&apos;s included</h2>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
            <table className="w-full min-w-[640px] text-left font-helvetica text-[0.98rem]">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th scope="col" className="p-4 md:p-5"><span className="sr-only">Feature</span></th>
                  <th scope="col" className="bg-[#1B2A4A] p-4 text-white md:p-5">Loop</th>
                  <th scope="col" className="p-4 text-[#1B2A4A] md:p-5 dark:text-white">Agency services</th>
                  <th scope="col" className="p-4 text-[#1B2A4A] md:p-5 dark:text-white">Think First on its own</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((r) => (
                  <tr key={r.row} className="border-b border-gray-100 last:border-0 dark:border-gray-800">
                    <th scope="row" className="p-4 font-normal text-gray-700 md:p-5 dark:text-gray-300">{r.row}</th>
                    {[r.loop, r.agency, r.thinkFirst].map((v, i) => (
                      <td key={i} className={`p-4 md:p-5 ${i === 0 ? 'bg-[#1B2A4A]/[0.04] font-medium text-[#1B2A4A] dark:bg-white/[0.04] dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                        {v === 'yes' ? (
                          <><Check /><span className="sr-only">Included</span></>
                        ) : v === 'no' ? (
                          <span className="text-gray-400" aria-label="Not included">–</span>
                        ) : (
                          v
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
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
