'use client';

import Link from 'next/link';
import type { Part, RailItem } from '@/lib/reports/content/playbook';
import { useProgress } from './ProgressProvider';

/**
 * Where you are, what is ahead, how much is left.
 *
 * Takes RailItem[] only — id, order, title, minutes — never action bodies. That
 * is what keeps the playbook's prose server-side while the rail stays
 * interactive.
 *
 * `reachable` is passed in rather than computed here, because four surfaces
 * have to agree on what it means and exactly one function decides: see
 * reachableActions() in playbook-nav.ts. With gating off it contains every id
 * and every branch below is a no-op — which is the point, because the day it
 * is switched on, nothing here needs rewriting.
 */
export function Rail({
  slug,
  parts,
  items,
  currentId,
  reachable,
  showProgress,
}: {
  slug: string;
  parts: Part[];
  items: RailItem[];
  currentId?: string;
  reachable: string[];
  showProgress: boolean;
}) {
  const { completed } = useProgress();
  const done = new Set(completed);
  const open = new Set(reachable);
  const ordered = [...parts].sort((a, b) => a.order - b.order);

  return (
    <nav aria-label="Playbook contents" className="flex flex-col gap-6">
      <Link
        href={`/r/${slug}`}
        className={`block rounded-[var(--radius)] px-3 py-2.5 font-helvetica text-[length:var(--t-body)] leading-[var(--lh-body)] transition-colors ${ currentId ? 'text-[var(--r-muted)] hover:bg-[var(--r-canvas)] hover:text-[var(--r-ink)]' : 'bg-[var(--r-brand-bg)] text-[var(--r-brand-deep)]' }`}
      >
        The situation
      </Link>

      {ordered.map((part) => {
        const inPart = items.filter((i) => i.partId === part.id);
        if (!inPart.length) return null;

        return (
          <div key={part.id}>
            <p className="px-3 font-helvetica text-[length:var(--t-label)] leading-[var(--lh-label)] tracking-[0.14em] uppercase text-[var(--r-muted)]">
              {part.label}
            </p>
            <p className="mt-0.5 px-3 font-futura text-[length:var(--t-small)] leading-[var(--lh-small)] text-[var(--r-ink-2)]">
              {part.title}
            </p>

            <ol className="mt-2 flex flex-col gap-0.5">
              {inPart.map((item) => {
                const isCurrent = item.id === currentId;
                const isDone = done.has(item.id);
                const isOpen = open.has(item.id);

                const inner = (
                  <>
                    <span
                      aria-hidden
                      className={`mt-[0.15em] grid size-[18px] shrink-0 place-items-center rounded-full text-[length:var(--t-small)] leading-[var(--lh-small)] ${ isDone ? 'bg-[var(--r-ok)] text-white' : isCurrent ? 'bg-white/25 text-white' : 'border border-[var(--r-hair)] text-[var(--r-muted)]' }`}
                    >
                      {isDone ? '✓' : item.order}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block leading-snug">{item.title}</span>
                      <span
                        className={`mt-0.5 block font-helvetica text-[length:var(--t-small)] leading-[var(--lh-small)] ${
                          isCurrent ? 'text-white/70' : 'text-[var(--r-muted)]'
                        }`}
                      >
                        {item.minutes} min{item.optional ? ' · optional' : ''}
                      </span>
                    </span>
                  </>
                );

                const base =
                  'flex w-full items-start gap-2.5 rounded-[var(--radius)] px-3 py-2 text-left font-helvetica text-[length:var(--t-small)] leading-[var(--lh-small)] transition-colors';

                // Unreachable renders as a span with a reason, never a dead
                // link. Inert while navigation is 'open'.
                if (!isOpen) {
                  return (
                    <li key={item.id}>
                      <span
                        aria-disabled="true"
                        title="Finish the action before this one to open it"
                        className={`${base} cursor-not-allowed text-[var(--r-muted)] opacity-55`}
                      >
                        {inner}
                      </span>
                    </li>
                  );
                }

                return (
                  <li key={item.id}>
                    <Link
                      href={`/r/${slug}?a=${item.id}`}
                      aria-current={isCurrent ? 'step' : undefined}
                      className={`${base} ${
                        isCurrent
                          ? 'bg-[var(--r-brand-deep)] text-white'
                          : 'text-[var(--r-ink-2)] hover:bg-[var(--r-canvas)]'
                      }`}
                    >
                      {inner}
                    </Link>
                  </li>
                );
              })}
            </ol>
          </div>
        );
      })}

      {showProgress ? (
        <p className="px-3 font-helvetica text-[length:var(--t-small)] leading-[var(--lh-small)] text-[var(--r-muted)]">
          {done.size} of {items.length} done
        </p>
      ) : null}

      <div className="flex flex-col gap-1 border-t border-[var(--r-hair)] pt-4">
        <Link
          href={`/r/${slug}/plan`}
          className="rounded-[var(--radius)] px-3 py-2 font-helvetica text-[length:var(--t-small)] leading-[var(--lh-small)] text-[var(--r-ink-2)] transition-colors hover:bg-[var(--r-canvas)]"
        >
          The 90-day plan
        </Link>
        <Link
          href={`/r/${slug}/resources`}
          className="rounded-[var(--radius)] px-3 py-2 font-helvetica text-[length:var(--t-small)] leading-[var(--lh-small)] text-[var(--r-ink-2)] transition-colors hover:bg-[var(--r-canvas)]"
        >
          Resources
        </Link>
      </div>
    </nav>
  );
}
