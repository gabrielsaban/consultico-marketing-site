import type { ReactNode } from 'react';
import styles from './report.module.css';

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`${styles.card} ${className}`}>{children}</div>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-helvetica text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[var(--r-brand)]">
      {children}
    </p>
  );
}

export type Tone = 'ok' | 'warn' | 'risk' | 'quiet' | 'brand';

const TONE: Record<Tone, string> = {
  ok: 'bg-[var(--r-ok-bg)] text-[var(--r-ok)]',
  warn: 'bg-[var(--r-warn-bg)] text-[var(--r-warn)]',
  risk: 'bg-[var(--r-risk-bg)] text-[var(--r-risk)]',
  quiet: 'bg-[var(--r-quiet-bg)] text-[var(--r-quiet)]',
  brand: 'bg-[var(--r-brand-bg)] text-[var(--r-brand)]',
};

export function Badge({ tone = 'quiet', children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-1 font-helvetica text-[0.7rem] font-semibold whitespace-nowrap ${TONE[tone]}`}
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
      <p className="font-helvetica text-[0.78rem] font-medium text-[var(--r-muted)]">{label}</p>
      <p className="mt-1 font-futura text-[clamp(1.6rem,3.4vw,2.1rem)] leading-none font-bold text-[var(--r-ink)]">
        {value}
      </p>
      {note ? (
        <p className="mt-1.5 font-helvetica text-[0.75rem] leading-snug text-[var(--r-muted)]">
          {note}
        </p>
      ) : null}
    </div>
  );
}
