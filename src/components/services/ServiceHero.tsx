import Link from 'next/link';
import type { ReactNode } from 'react';
import Container from '@/components/Container';
import ServiceDesktopHeader from '@/components/ServiceDesktopHeader';
import { BOOK_FREE_CALL_LABEL, BOOK_FREE_CALL_URL } from '@/lib/cta';

export interface ServiceHeroProofChip {
  value: string;
  label: string;
}

export interface ServiceHeroProps {
  eyebrow: string;
  heading: string;
  headingAccent?: string;
  subhead: string;
  body?: string;
  proofChips?: ServiceHeroProofChip[];
  primaryHref: string;
  primaryLabel: string;
  trustLine?: string;
  visual: ReactNode;
}

export default function ServiceHero({
  eyebrow,
  heading,
  headingAccent,
  subhead,
  body,
  proofChips = [],
  primaryHref,
  primaryLabel,
  trustLine,
  visual,
}: ServiceHeroProps) {
  const renderHeading = () => {
    if (!headingAccent || !heading.includes(headingAccent)) {
      return heading;
    }
    const [before, after] = heading.split(headingAccent);
    return (
      <>
        {before}
        <span className="text-brand-blue">{headingAccent}</span>
        {after}
      </>
    );
  };

  return (
    <section className="relative pb-16 md:pb-20 lg:pb-24" aria-labelledby="service-hero-heading">
      <ServiceDesktopHeader />
      <div className="absolute inset-0 dot-grid-premium opacity-20 dark:opacity-10" aria-hidden="true" />
      <Container className="relative pt-[10.5rem] md:pt-[12rem] lg:pt-[13.5rem] xl:pt-[14.5rem] 2xl:pt-[15rem]">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 xl:gap-14">
          <div className="rounded-2xl border border-gray-200/90 bg-brand-silk/95 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.06)] dark:border-gray-700/90 dark:bg-gray-950/95 md:p-8">
            <p className="mb-4 font-helvetica text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-brand-blue">
              {eyebrow}
            </p>
            <h1
              id="service-hero-heading"
              className="mb-4 font-futura text-[clamp(1.65rem,2.5vw,2.75rem)] font-bold leading-[1.08] text-brand-black dark:text-white"
            >
              {renderHeading()}
            </h1>
            <p className="mb-5 font-helvetica text-[clamp(1rem,1.2vw,1.125rem)] leading-[1.5] text-gray-700 dark:text-gray-300">
              {subhead}
            </p>
            {body && (
              <p className="mb-6 font-helvetica-light text-[clamp(0.98rem,1.1vw,1.05rem)] leading-[1.65] text-brand-black dark:text-gray-200">
                {body}
              </p>
            )}

            {proofChips.length > 0 && (
              <ul className="mb-8 flex flex-wrap gap-2">
                {proofChips.map((chip) => (
                  <li
                    key={chip.label}
                    className="rounded-lg border border-brand-blue/20 bg-white px-3 py-2 dark:border-brand-blue/30 dark:bg-gray-900"
                  >
                    <span className="block font-futura text-[0.95rem] font-bold text-brand-blue">{chip.value}</span>
                    <span className="font-helvetica text-[0.72rem] text-gray-600 dark:text-gray-400">{chip.label}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href={primaryHref}
                className="inline-flex items-center justify-center rounded-lg bg-brand-blue px-8 py-3 font-helvetica text-[clamp(1rem,1.15vw,1.05rem)] font-medium text-white transition-colors hover:bg-[#006FE6] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
              >
                {primaryLabel}
              </Link>
              <a
                href={BOOK_FREE_CALL_URL}
                target="_blank"
                rel="noreferrer"
                className="font-helvetica text-[0.98rem] font-medium text-brand-blue underline-offset-2 hover:underline"
              >
                {BOOK_FREE_CALL_LABEL}
              </a>
            </div>

            {trustLine && (
              <p className="mt-6 font-helvetica text-[0.85rem] text-gray-600 dark:text-gray-400">{trustLine}</p>
            )}
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-3 shadow-[0_12px_40px_rgba(0,0,0,0.06)] dark:border-gray-700 dark:bg-gray-900 md:p-4">
            {visual}
          </div>
        </div>
      </Container>
    </section>
  );
}
