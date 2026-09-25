import Link from 'next/link';
import type { Action } from '@/lib/reports/content/playbook';

/**
 * Prev and next at the foot of an action.
 *
 * "Next" is a suggestion, not a gate — nothing is locked. The guidance comes
 * from naming what follows and why, which is the `handoff` line, not from
 * taking choices away.
 *
 * Marking an action done used to live here too, which put the one control the
 * whole progress system depends on at the very bottom of a long page. It is
 * now at the top right of the action, where it can be seen without scrolling —
 * and with it gone this is a server component again, because prev/next are
 * just links.
 */
export function ActionNav({
  slug,
  prev,
  next,
}: {
  slug: string;
  prev?: Action;
  next?: Action;
}) {
  if (!prev && !next) return null;

  return (
    <div className="mt-[var(--s-5)] flex flex-wrap items-center justify-between gap-[var(--s-3)] border-t border-[var(--r-hair)] pt-[var(--s-3)]">
      {prev ? (
        <Link
          href={`/r/${slug}?a=${prev.id}`}
          className="font-helvetica text-[length:var(--t-small)] leading-[var(--lh-small)] text-[var(--r-muted)] hover:text-[var(--r-ink)]"
        >
          ← {prev.title}
        </Link>
      ) : (
        <span />
      )}

      {next ? (
        <Link
          href={`/r/${slug}?a=${next.id}`}
          className="ml-auto text-right font-helvetica text-[length:var(--t-body)] leading-[var(--lh-body)] text-[var(--r-brand-ink)] hover:underline"
        >
          Next: {next.title} →
        </Link>
      ) : null}
    </div>
  );
}
