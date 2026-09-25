'use client';

import Link from 'next/link';
import type { Part, RailItem } from '@/lib/reports/content/playbook';
import { useState } from 'react';
import { useProgress } from './ProgressProvider';
import { SITUATION_ID } from '@/lib/reports/playbook-nav';

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
  const current = items.find((i) => i.id === currentId);

  // Collapsed on a phone, always open from 900px where the rail has a column
  // of its own. The initial state matches on server and client, and the
  // desktop case is pure CSS, so nothing here depends on hydration.
  const [expanded, setExpanded] = useState(false);

  return (
    <nav aria-label="Playbook contents" className="flex flex-col gap-[var(--s-3)]">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="flex items-center gap-2 rounded-[var(--radius)] border border-[var(--r-hair)] px-3 py-2.5 text-left font-helvetica text-[length:var(--t-small)] leading-[var(--lh-small)] text-[var(--r-ink-2)] min-[900px]:hidden"
      >
        <span aria-hidden className="text-[var(--r-muted)]">{expanded ? '▾' : '▸'}</span>
        <span className="min-w-0 flex-1 truncate">
          {current ? `${current.order} of ${items.length} · ${current.title}` : `All ${items.length} actions`}
        </span>
      </button>

      <div className={`flex flex-col gap-[var(--s-3)] ${expanded ? 'flex' : 'hidden'} min-[900px]:flex`}>
      {/* Two destinations, not one. The index and the diagnosis were sharing a
          link, which is how "The situation" came to read as a section heading
          rather than as something you open. */}
      <div className="flex flex-col gap-0.5">
        <Link
          href={`/r/${slug}`}
          className={`flex items-center gap-2.5 rounded-[var(--radius)] px-3 py-2 font-helvetica text-[length:var(--t-small)] leading-[var(--lh-small)] transition-colors ${
            currentId
              ? 'text-[var(--r-muted)] hover:bg-[var(--r-canvas)] hover:text-[var(--r-ink)]'
              : 'text-[var(--r-ink)]'
          }`}
        >
          <span aria-hidden>←</span> All {items.length} actions
        </Link>
        <Link
          href={`/r/${slug}?a=${SITUATION_ID}`}
          aria-current={currentId === SITUATION_ID ? 'page' : undefined}
          className={`flex items-start gap-2.5 rounded-[var(--radius)] px-3 py-2 font-helvetica text-[length:var(--t-small)] leading-[var(--lh-small)] transition-colors ${
            currentId === SITUATION_ID
              ? 'bg-[var(--r-brand-fill)] text-white'
              : 'text-[var(--r-ink-2)] hover:bg-[var(--r-canvas)]'
          }`}
        >
          <span
            aria-hidden
            className={`mt-[0.15em] grid size-[18px] shrink-0 place-items-center rounded-[var(--radius-pill)] text-[length:var(--t-small)] leading-[var(--lh-small)] ${
              currentId === SITUATION_ID
                ? 'bg-white/25 text-white'
                : 'border border-[var(--r-hair)]'
            }`}
          />
          The situation
        </Link>
      </div>

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
                          isCurrent ? 'text-white/85' : 'text-[var(--r-muted)]'
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
                          ? 'bg-[var(--r-brand-fill)] text-white'
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
      </div>
    </nav>
  );
}
