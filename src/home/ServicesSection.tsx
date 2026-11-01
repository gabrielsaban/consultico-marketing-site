import Link from 'next/link';
import Container from '@/components/Container';
import { NAV_SERVICES } from '@/lib/nav-services';

/**
 * Services, deliberately quiet. Loop is the front door (identity plan,
 * 2026-10-31); everything here is still sold and still has its own page, but
 * it no longer gets a full section on the homepage. The full bubble list lives
 * on in ServicesBubbleList for wherever it's wanted next.
 *
 * Keep id="services": /services and /about/services redirect to /#services
 * (next.config.ts), and old links still point here.
 */
export default function ServicesSection() {
  return (
    <section id="services" className="py-12 md:py-14 scroll-mt-24">
      <Container>
        <div className="max-w-4xl">
          <h2 className="font-futura text-[clamp(1.25rem,1.8vw,1.6rem)] font-bold text-[#1B2A4A] dark:text-white">
            Other ways we help
          </h2>
          <p className="mt-3 font-helvetica-light text-[clamp(1rem,1.2vw,1.1rem)] leading-[1.6] text-gray-700 dark:text-gray-300">
            Need one thing done well? We also take on these on their own.
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            {NAV_SERVICES.map((service) => (
              <li key={service.href}>
                <Link
                  href={service.href}
                  className="font-helvetica text-[1rem] font-medium text-brand-blue underline-offset-4 hover:underline"
                >
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
