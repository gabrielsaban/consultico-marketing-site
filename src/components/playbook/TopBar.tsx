'use client';

import Link from 'next/link';
import { useProgress } from './ProgressProvider';
import styles from '../report/report.module.css';

/**
 * A slim persistent bar across the whole playbook.
 *
 * It answers "where am I and how much is left" without the reader having to
 * find the rail, which matters most on a phone, where the rail is below the
 * fold. It is also the only place the document names itself, so a client who
 * comes back to an open tab a week later knows what they are looking at.
 *
 * Client-side only because the progress figure is: the titles are props.
 */
export function TopBar({
  slug,
  title,
  client,
  total,
  planLabel,
}: {
  slug: string;
  title: string;
  client: string;
  total: number;
  planLabel: string;
}) {
  const { completed } = useProgress();
  const done = completed.length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  return (
    <div className={styles.topbar}>
      <div className={styles.topbarInner}>
        <Link href={`/r/${slug}`} className="min-w-0 truncate">
          <span className="font-futura text-[length:var(--t-strong)] leading-[var(--lh-strong)] text-[var(--r-ink)]">
            {client}
          </span>
          <span className="ml-2 hidden font-helvetica text-[length:var(--t-small)] leading-[var(--lh-small)] text-[var(--r-muted)] sm:inline">
            {title}
          </span>
        </Link>

        <div className="ml-auto flex items-center gap-[var(--s-3)]">
          <div className="flex items-center gap-2.5">
            <div className={`${styles.bar} w-[72px] shrink-0`}>
              <div className={styles.barFill} style={{ width: `${pct}%` }} />
            </div>
            <span className="whitespace-nowrap font-helvetica text-[length:var(--t-label)] leading-[var(--lh-label)] tracking-[var(--ls-label)] uppercase text-[var(--r-muted)]">
              {done}/{total}
            </span>
          </div>

          <span aria-hidden className="hidden h-4 w-px bg-[var(--r-hair)] sm:block" />

          <Link
            href={`/r/${slug}/plan`}
            className="hidden whitespace-nowrap font-helvetica text-[length:var(--t-small)] leading-[var(--lh-small)] text-[var(--r-ink-2)] hover:text-[var(--r-brand-deep)] sm:inline"
          >
            {planLabel}
          </Link>
          <Link
            href={`/r/${slug}/resources`}
            className="whitespace-nowrap font-helvetica text-[length:var(--t-small)] leading-[var(--lh-small)] text-[var(--r-ink-2)] hover:text-[var(--r-brand-deep)]"
          >
            Resources
          </Link>
        </div>
      </div>
    </div>
  );
}
