'use client';

import { useProgress } from './ProgressProvider';
import { trackReport } from '@/lib/reports/track';

/**
 * The completion control, at the top right of the action.
 *
 * It used to sit at the very bottom, under the prev/next links, which meant
 * the one control the progress bars depend on was the last thing on the page
 * and easy never to find. At the top it is visible the moment the action
 * opens, and a client who already knows what to do can mark it and move on
 * without scrolling to the end to say so.
 */
export function DoneToggle({ slug, actionId }: { slug: string; actionId: string }) {
  const { isDone, setDone } = useProgress();
  const done = isDone(actionId);

  return (
    <button
      type="button"
      aria-pressed={done}
      onClick={() => {
        setDone(actionId, !done);
        if (!done) trackReport('report_task_toggled', { slug, task_id: `action:${actionId}`, done: true });
      }}
      className={`flex shrink-0 items-center gap-2 rounded-[var(--radius-pill)] border py-1.5 pl-2 pr-3.5 font-helvetica text-[length:var(--t-small)] leading-[var(--lh-small)] transition-colors ${
        done
          ? 'border-[var(--r-ok)] text-[var(--r-ok)]'
          : 'border-[var(--r-hair)] text-[var(--r-muted)] hover:border-[var(--r-muted)] hover:text-[var(--r-ink)]'
      }`}
    >
      <span
        aria-hidden
        className={`grid size-[20px] place-items-center rounded-[var(--radius-pill)] text-[length:var(--t-label)] leading-[var(--lh-label)] ${
          done ? 'bg-[var(--r-ok)] text-white' : 'border border-current'
        }`}
      >
        ✓
      </span>
      {done ? 'Done' : 'Mark done'}
    </button>
  );
}
