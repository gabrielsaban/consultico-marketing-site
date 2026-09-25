'use client';

import { useId, useState, type ReactNode } from 'react';

/**
 * A label with its reasoning tucked behind it.
 *
 * The layering rule for this whole report: what the client must DO stays
 * visible and scannable; WHY it is worth doing is one click away. The first
 * draft of the rebuild cut the reasoning entirely to hit the word caps, which
 * left a to-do list — and the reasoning is the part a consultancy is paid for.
 *
 * Not a <details> element, deliberately. Safari renders its marker
 * inconsistently and it is fiddly to style to the report's type; a button with
 * aria-expanded gives the same semantics with full control, and the content
 * stays in the DOM for search and print.
 */
export function Disclosure({
  label,
  meta,
  children,
  toggleLabel = 'Why',
}: {
  label: ReactNode;
  meta?: string;
  children: ReactNode;
  /** What the toggle says when closed. "Why" suits a reason; an exemplar or a
   *  template needs its own word, or the control lies about what it opens. */
  toggleLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div className="border-b border-[var(--r-hair)] last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={id}
        className="flex w-full items-start gap-3 py-3 text-left group"
      >
        <span className="min-w-0 flex-1 font-helvetica text-[length:var(--t-body)] leading-[var(--lh-body)] tracking-[var(--ls-body)] text-[var(--r-ink)]">
          {label}
        </span>
        {meta ? (
          <span className="shrink-0 rounded-[var(--radius-pill)] bg-[var(--r-quiet-bg)] px-2.5 py-0.5 font-helvetica text-[length:var(--t-label)] leading-[var(--lh-label)] text-[var(--r-ink-2)]">
            {meta}
          </span>
        ) : null}
        <span
          aria-hidden
          className="mt-[0.15em] shrink-0 font-helvetica text-[length:var(--t-small)] text-[var(--r-muted)] underline decoration-[var(--r-hair)] underline-offset-4 group-hover:decoration-[var(--r-muted)]" 
        >
          {open ? 'Hide' : toggleLabel}
        </span>
      </button>

      {open ? (
        <div id={id} className="pb-4 pl-[1.1rem]">
          <div className="border-l-2 border-[var(--r-hair)] pl-4 font-helvetica text-[length:var(--t-body)] leading-[var(--lh-body)] tracking-[var(--ls-body)] text-[var(--r-ink-2)]">
            {children}
          </div>
        </div>
      ) : null}
    </div>
  );
}
