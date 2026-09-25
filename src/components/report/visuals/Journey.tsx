import type { JourneyVisual } from '@/lib/reports/content/schema';

/**
 * The stages a client passes through, with a health state on each.
 *
 * Carries the diagnosis structurally: four stages are fine and one is not, and
 * seeing that in a row makes the argument faster than a paragraph does. It is
 * not a funnel — there are no volumes here, and implying conversion data the
 * report does not have would be exactly the failure mode this whole schema is
 * shaped to prevent.
 */

const STATE = {
  ok: { dot: 'bg-[var(--r-ok)]', ring: 'border-[var(--r-ok)]', label: 'Working' },
  risk: { dot: 'bg-[var(--r-warn)]', ring: 'border-[var(--r-warn)]', label: 'Needs attention' },
  neutral: { dot: 'bg-[var(--r-muted)]', ring: 'border-[var(--r-hair)]', label: 'Later' },
} as const;

export function Journey({ spec }: { spec: JourneyVisual }) {
  return (
    <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {spec.nodes.map((n, i) => {
        const state = STATE[n.state];
        return (
          <li
            key={i}
            className={`rounded-[var(--radius)] border-t-[3px] bg-[var(--r-canvas)] p-3.5 ${state.ring}`}
          >
            <span className="flex items-center gap-2">
              <span className={`size-2 rounded-full ${state.dot}`} aria-hidden />
              <span className="font-helvetica text-[length:var(--t-label)] leading-[var(--lh-label)] tracking-[0.1em] uppercase text-[var(--r-muted)]">
                {state.label}
              </span>
            </span>
            <p className="mt-2 font-futura text-[length:var(--t-strong)] leading-[var(--lh-strong)] text-[var(--r-ink)]">
              {n.label}
            </p>
            <p className="mt-1.5 font-helvetica text-[length:var(--t-small)] leading-[var(--lh-small)] text-[var(--r-muted)]">
              {n.sub}
            </p>
          </li>
        );
      })}
    </ol>
  );
}
