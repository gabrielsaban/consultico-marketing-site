'use client';

import Link from 'next/link';
import type { Action } from '@/lib/reports/content/playbook';
import { trackReport } from '@/lib/reports/track';
import { useProgress } from './ProgressProvider';

/**
 * Prev / next, and marking an action done.
 *
 * "Next" is a suggestion, not a gate — nothing is locked. The guidance comes
 * from naming what follows and why, which is the `handoff` line, not from
 * taking choices away.
 */
export function ActionNav({
  slug,
  action,
  prev,
  next,
}: {
  slug: string;
  action: Action;
  prev?: Action;
  next?: Action;
}) {
  const { isDone, setDone } = useProgress();
  const done = isDone(action.id);

  return (
    <div className="mt-10 flex flex-col gap-4 border-t border-[var(--r-hair)] pt-6">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => {
            setDone(action.id, !done);
            if (!done) {
              trackReport('report_task_toggled', { slug, task_id: `action:${action.id}`, done: true });
            }
          }}
          className={`rounded-lg px-5 py-2.5 font-helvetica text-[0.9rem] font-semibold transition-colors ${
            done
              ? 'bg-[var(--r-ok-bg)] text-[var(--r-ok)]'
              : 'bg-[var(--r-brand)] text-white hover:opacity-90'
          }`}
        >
          {done ? '✓ Done' : 'Mark this done'}
        </button>

        {next ? (
          <Link
            href={`/r/${slug}?a=${next.id}`}
            className="font-helvetica text-[0.9rem] font-semibold text-[var(--r-brand)] hover:underline"
          >
            Next: {next.title} →
          </Link>
        ) : null}
      </div>

      {prev ? (
        <Link
          href={`/r/${slug}?a=${prev.id}`}
          className="font-helvetica text-[0.82rem] text-[var(--r-muted)] hover:text-[var(--r-ink)]"
        >
          ← {prev.title}
        </Link>
      ) : null}
    </div>
  );
}
