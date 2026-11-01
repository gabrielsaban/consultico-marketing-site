import Link from 'next/link';
import Container from '@/components/Container';
import { NAV_SERVICES } from '@/lib/nav-services';

/**
 * Services, deliberately quiet and further down the page. Loop is the front
 * door (identity plan, 2026-10-31); everything here is still sold and still
 * has its own page. Styled to match the Loop and case study sections: eyebrow,
 * navy heading, simple cards (Paul, 2026-11-01).
 *
 * Keep id="services": /services and /about/services redirect to /#services
 * (next.config.ts), and old links still point here.
 */
const SERVICE_LINES: Record<string, string> = {
  '/seo': 'Climb Google and stay there.',
  '/articles/what-is-generative-engine-optimisation': 'Get found and cited by AI search tools.',
  '/ppc': 'Show up the moment someone searches for what you sell.',
  '/web-development': 'A website that shows off your brand.',
  '/content-creation': 'Content that gives your channels something worth sharing.',
  '/campaign-management': 'Launches and seasonal pushes, planned as one.',
  '/market-strategy': 'Work out what to keep, what to stop and what to back next.',
};

export default function ServicesSection() {
  return (
    <section id="services" className="scroll-mt-24 py-14 md:py-20">
      <Container>
        <div className="max-w-4xl">
          <p className="mb-3 font-helvetica text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-brand-blue">
            Other ways we help
          </p>
          <h2 className="font-futura text-[clamp(1.6rem,2.8vw,2.75rem)] font-bold leading-[1.1] text-[#1B2A4A] dark:text-white">
            Need one thing done well?
          </h2>
          <p className="mt-4 font-helvetica-light text-[clamp(1rem,1.3vw,1.2rem)] leading-[1.6] text-gray-700 dark:text-gray-300">
            Everything Loop runs, you can also have on its own.
          </p>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {NAV_SERVICES.map((service) => (
            <li key={service.href}>
              <Link
                href={service.href}
                className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-5 transition-colors hover:border-brand-blue dark:border-gray-800 dark:bg-gray-900"
              >
                <span className="flex items-center justify-between gap-3 font-futura text-[1.15rem] font-bold text-[#1B2A4A] dark:text-white">
                  {service.name}
                  <svg
                    className="h-4 w-4 flex-shrink-0 text-brand-blue transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
                {SERVICE_LINES[service.href] && (
                  <span className="mt-2 font-helvetica-light text-[0.95rem] leading-[1.55] text-gray-700 dark:text-gray-300">
                    {SERVICE_LINES[service.href]}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
