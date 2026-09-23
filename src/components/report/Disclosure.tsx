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
  tone = 'default',
}: {
  label: ReactNode;
  meta?: string;
  children: ReactNode;
  tone?: 'default' | 'quiet';
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
        <span
          aria-hidden
          className={`mt-[0.45em] size-1.5 shrink-0 rounded-full ${
            tone === 'quiet' ? 'bg-[var(--r-muted)]' : 'bg-[var(--r-brand)]'
          }`}
        />
        <span className="min-w-0 flex-1 font-helvetica text-[0.95rem] leading-[1.55] text-[var(--r-ink)]">
          {label}
        </span>
        {meta ? (
          <span className="shrink-0 rounded-full bg-[var(--r-quiet-bg)] px-2.5 py-0.5 font-helvetica text-[0.7rem] font-semibold text-[var(--r-muted)]">
            {meta}
          </span>
        ) : null}
        <span
          aria-hidden
          className={`mt-[0.15em] shrink-0 font-helvetica text-[0.78rem] font-semibold text-[var(--r-brand)] transition-opacity ${
            open ? 'opacity-60' : 'opacity-100'
          }`}
        >
          {open ? 'Less' : 'Why'}
        </span>
      </button>

      {open ? (
        <div id={id} className="pb-4 pl-[1.1rem]">
          <div className="border-l-2 border-[var(--r-brand-bg)] pl-4 font-helvetica text-[0.9rem] leading-[1.65] text-[var(--r-ink-2)]">
            {children}
          </div>
        </div>
      ) : null}
    </div>
  );
}
