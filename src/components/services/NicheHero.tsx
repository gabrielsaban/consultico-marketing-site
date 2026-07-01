import Link from 'next/link';
import Container from '@/components/Container';
import ServiceDesktopHeader from '@/components/ServiceDesktopHeader';

export interface NicheHeroBreadcrumb {
  label: string;
  href?: string;
}

export interface NicheHeroStatCallout {
  stat: string;
  attribution: string;
}

export interface NicheHeroProps {
  breadcrumbs: NicheHeroBreadcrumb[];
  heading: string;
  subhead: string;
  bullets: string[];
  primaryHref: string;
  primaryLabel: string;
  statCallout?: NicheHeroStatCallout;
}

export default function NicheHero({
  breadcrumbs,
  heading,
  subhead,
  bullets,
  primaryHref,
  primaryLabel,
  statCallout,
}: NicheHeroProps) {
  return (
    <section className="relative pb-12 md:pb-16" aria-labelledby="niche-hero-heading">
      <ServiceDesktopHeader />
      <div className="absolute inset-0 dot-grid-premium opacity-20 dark:opacity-10" aria-hidden="true" />
      <Container className="relative pt-[10.5rem] md:pt-[12rem] lg:pt-[13.5rem] xl:pt-[14.5rem]">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 font-helvetica text-[0.875rem] text-gray-600 dark:text-gray-400"
        >
          <ol className="flex flex-wrap items-center gap-2">
            {breadcrumbs.map((crumb, index) => (
              <li key={crumb.label} className="flex items-center gap-2">
                {index > 0 && <span aria-hidden="true">/</span>}
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-brand-blue">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-gray-800 dark:text-gray-200">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="rounded-2xl border border-gray-200/90 bg-brand-silk/95 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.06)] dark:border-gray-700/90 dark:bg-gray-950/95 md:p-8">
            <h1
              id="niche-hero-heading"
              className="mb-4 font-futura text-[clamp(1.75rem,2.8vw,2.65rem)] font-bold leading-[1.08] text-brand-black dark:text-white"
            >
              {heading}
            </h1>
            <p className="mb-6 font-helvetica text-[clamp(1rem,1.15vw,1.08rem)] leading-[1.55] text-gray-800 dark:text-gray-200">
              {subhead}
            </p>
            <ul className="mb-8 space-y-3">
              {bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="relative pl-5 font-helvetica-light text-[0.98rem] leading-[1.55] text-brand-black before:absolute before:left-0 before:font-bold before:text-brand-blue before:content-['•'] dark:text-gray-200"
                >
                  {bullet}
                </li>
              ))}
            </ul>
            <Link
              href={primaryHref}
              className="inline-flex items-center justify-center rounded-lg bg-brand-blue px-8 py-3 font-helvetica text-[clamp(1rem,1.15vw,1.05rem)] font-medium text-white transition-colors hover:bg-[#006FE6] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
            >
              {primaryLabel}
            </Link>
          </div>

          {statCallout && (
            <aside className="rounded-2xl border border-brand-blue/25 bg-white p-6 shadow-sm dark:border-brand-blue/30 dark:bg-gray-900 md:p-8">
              <p className="mb-2 font-helvetica text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-brand-blue">
                Sector snapshot
              </p>
              <p className="font-futura text-[clamp(1.35rem,2vw,1.65rem)] font-bold leading-[1.2] text-brand-black dark:text-white">
                {statCallout.stat}
              </p>
              <p className="mt-3 font-helvetica-light text-[0.88rem] leading-[1.55] text-gray-600 dark:text-gray-400">
                {statCallout.attribution}
              </p>
            </aside>
          )}
        </div>
      </Container>
    </section>
  );
}
