'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { Section } from '@/lib/reports/content/schema';
import { Badge } from './Primitives';
import styles from './report.module.css';
import { trackReport } from '@/lib/reports/track';

/**
 * One section of the report: a heading that opens to reveal what the client
 * needs to understand, its tasks and its resources.
 *
 * GUIDED, NOT GATED. Every section can be opened at any time and in any order,
 * and nothing is locked behind another section's tasks. The client has already
 * read this report as a long page and will come back to look one thing up; a
 * wizard that hides everything but the current step would make that harder.
 * "Next" is a suggestion, which is where the guiding happens.
 *
 * A client component wrapping server-rendered children: the prose is passed in
 * as `children` and never enters the JS bundle, only the open/closed state and
 * the analytics live here.
 */
export function SectionPanel({
  section,
  index,
  total,
  defaultOpen,
  nextLabel,
  slug,
  children,
}: {
  section: Section;
  index: number;
  total: number;
  defaultOpen: boolean;
  nextLabel?: string;
  slug: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const reported = useRef(false);
  const headingId = `section-${section.id}-heading`;

  useEffect(() => {
    // Fire once per section per page view, not on every toggle — otherwise
    // opening and closing twice looks like four reads.
    if (open && !reported.current) {
      reported.current = true;
      trackReport('report_section_opened', { slug, section_id: section.id, order: section.order });
    }
  }, [open, slug, section.id, section.order]);

  return (
    <section id={section.id} className={`${styles.card} scroll-mt-4`} aria-labelledby={headingId}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-start gap-4 text-left"
      >
        <span
          aria-hidden
          className={`mt-0.5 grid size-8 shrink-0 place-items-center rounded-[9px] font-futura text-[0.85rem] font-bold ${
            open ? 'bg-[var(--r-brand)] text-white' : 'bg-[var(--r-brand-bg)] text-[var(--r-brand)]'
          }`}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
            {section.eyebrow ? (
              <span className="font-helvetica text-[0.68rem] font-semibold tracking-[0.14em] uppercase text-[var(--r-brand)]">
                {section.eyebrow}
              </span>
            ) : null}
            {section.optional ? <Badge tone="quiet">Optional</Badge> : null}
            {section.minutes ? (
              <span className="font-helvetica text-[0.72rem] text-[var(--r-muted)]">
                {section.minutes} min
              </span>
            ) : null}
          </span>
          <span className="mt-1 block font-futura text-[clamp(1.15rem,2.4vw,1.4rem)] leading-tight font-bold text-[var(--r-ink)]">
            {section.title}
          </span>
          {!open ? (
            <span className="mt-1.5 block font-helvetica text-[0.88rem] leading-snug text-[var(--r-muted)]">
              {section.oneLiner}
            </span>
          ) : null}
        </span>

        <span
          aria-hidden
          className={`mt-1 shrink-0 font-futura text-lg text-[var(--r-muted)] transition-transform ${
            open ? 'rotate-45' : ''
          }`}
        >
          +
        </span>
      </button>

      <h2 id={headingId} className="sr-only">
        {section.title}
      </h2>

      {open ? (
        <div className="mt-6">
          {section.meta?.length ? (
            <dl className="mb-6 flex flex-wrap gap-x-8 gap-y-3 border-b border-[var(--r-hair)] pb-5">
              {section.meta.map((m) => (
                <div key={m.label}>
                  <dt className="font-helvetica text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[var(--r-muted)]">
                    {m.label}
                  </dt>
                  <dd className="mt-1 font-helvetica text-[0.88rem] font-medium text-[var(--r-ink)]">
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}

          {children}

          {nextLabel ? (
            <p className="mt-7 border-t border-[var(--r-hair)] pt-5 font-helvetica text-[0.85rem] text-[var(--r-muted)]">
              Next: <span className="font-semibold text-[var(--r-ink)]">{nextLabel}</span>{' '}
              <span className="text-[var(--r-muted)]">
                &middot; {index + 2} of {total}
              </span>
            </p>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
