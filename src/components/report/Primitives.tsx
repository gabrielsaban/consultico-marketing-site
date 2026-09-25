import type { ReactNode } from 'react';
import styles from './report.module.css';

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`${styles.card} ${className}`}>{children}</div>;
}

/**
 * The only micro-label in the system.
 *
 * It replaces five sizes doing one job (0.65 / 0.68 / 0.7 / 0.72 / 0.75rem),
 * three of which could appear on a single page. `tone` is the distinction that
 * actually matters: a structural label gets full ink, an editorial one gets
 * muted. Neither gets brand blue — that is reserved for things you can act on.
 */
export function Label({
  children,
  tone = 'quiet',
}: {
  children: ReactNode;
  tone?: 'structural' | 'quiet';
}) {
  return (
    <p
      className={`font-helvetica text-[length:var(--t-label)] leading-[var(--lh-label)] tracking-[var(--ls-label)] uppercase ${
        tone === 'structural' ? 'text-[var(--r-ink)]' : 'text-[var(--r-muted)]'
      }`}
    >
      {children}
    </p>
  );
}

/** No `brand` tone. Blue means "act on this"; a badge is never that. */
export type Tone = 'ok' | 'warn' | 'risk' | 'quiet';

const TONE: Record<Tone, string> = {
  ok: 'bg-[var(--r-ok-bg)] text-[var(--r-ok)]',
  warn: 'bg-[var(--r-warn-bg)] text-[var(--r-warn)]',
  risk: 'bg-[var(--r-risk-bg)] text-[var(--r-risk)]',
  // A badge sets its text ON its own tint, which is darker than the canvas, so
  // --r-muted lands under 4.5:1 there however far it is darkened for the page.
  quiet: 'bg-[var(--r-quiet-bg)] text-[var(--r-ink-2)]',
};

/* self-start because a flex item is blockified: `inline-block` inside a
 * column (the resource cards, the contract strip) was being stretched to the
 * full width of the card, so every badge read as a coloured bar. */
export function Badge({ tone = 'quiet', children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span
      className={`inline-block self-start rounded-[var(--radius-pill)] px-2.5 py-1 font-helvetica text-[length:var(--t-label)] leading-[var(--lh-label)] whitespace-nowrap ${TONE[tone]}`}
    >
      {children}
    </span>
  );
}

/**
 * A figure with a label and optional context.
 *
 * There is no `trend` or `delta` prop, and that absence is the design. The
 * dashboard idiom this borrows from puts a percentage pill and a sparkline on
 * every tile; a diagnosis contains no time series, so either could only be
 * decoration. A prop that exists eventually gets filled in, so it does not.
 */
export function StatTile({
  value,
  label,
  note,
}: {
  value: string;
  label: string;
  note?: string;
}) {
  return (
    <div>
      <p className="font-helvetica text-[length:var(--t-label)] leading-[var(--lh-label)] tracking-[var(--ls-label)] uppercase text-[var(--r-muted)]">
        {label}
      </p>
      <p className="mt-[var(--s-1)] font-futura text-[length:var(--t-title)] leading-[var(--lh-title)] tracking-[var(--ls-title)] text-[var(--r-navy)]">
        {value}
      </p>
      {note ? (
        <p className="mt-[var(--s-1)] font-helvetica text-[length:var(--t-small)] leading-[var(--lh-small)] text-[var(--r-muted)]">
          {note}
        </p>
      ) : null}
    </div>
  );
}
