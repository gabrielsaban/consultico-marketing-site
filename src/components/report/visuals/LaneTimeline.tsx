'use client';

import { useId, useState } from 'react';
import type { LaneTimelineVisual } from '@/lib/reports/content/schema';
import { Rich } from '../Rich';
import { Badge } from '../Primitives';
import styles from '../report.module.css';

/**
 * Events across parallel lanes over a fixed window, with switchable states.
 *
 * This replaces two near-identical charts in the source — the fortnight as it
 * is, and as it would be — with one chart and a toggle. That makes the
 * comparison an interaction rather than a scroll, which is the single biggest
 * argument the report makes: 1 planned contact becomes 8 to 11.
 *
 * Positions are percentages across the window, exactly as the source encoded
 * them, so nothing here is re-derived or estimated.
 */

const KIND_COLOUR: Record<string, string> = {
  call: 'var(--r-navy)',
  email: 'var(--r-brand)',
  whatsapp: 'var(--r-ok)',
  ambient: 'var(--r-warn)',
};

function colourFor(kind: string): string {
  return KIND_COLOUR[kind] ?? 'var(--r-quiet)';
}

export function LaneTimeline({ spec }: { spec: LaneTimelineVisual }) {
  const [active, setActive] = useState(0);
  const groupId = useId();
  const state = spec.states[active];
  if (!state) return null;

  return (
    <div>
      {spec.states.length > 1 ? (
        <div
          role="tablist"
          aria-label="Timeline state"
          className="mb-4 inline-flex gap-1 rounded-full bg-[var(--r-canvas)] p-1"
        >
          {spec.states.map((s, i) => (
            <button
              key={s.id}
              role="tab"
              id={`${groupId}-tab-${i}`}
              aria-selected={i === active}
              aria-controls={`${groupId}-panel`}
              type="button"
              onClick={() => setActive(i)}
              className={`rounded-full px-4 py-1.5 font-helvetica text-[0.82rem] font-semibold transition-colors ${
                i === active
                  ? 'bg-[var(--r-surface)] text-[var(--r-ink)] shadow-sm'
                  : 'text-[var(--r-muted)] hover:text-[var(--r-ink)]'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      ) : null}

      <div id={`${groupId}-panel`} role="tabpanel" aria-labelledby={`${groupId}-tab-${active}`}>
        {state.counters.length ? (
          <div className="mb-5 flex flex-wrap gap-x-10 gap-y-4">
            {state.counters.map((c) => (
              <div key={c.label}>
                <p className="font-futura text-[clamp(1.7rem,4vw,2.3rem)] leading-none font-bold text-[var(--r-ink)]">
                  {c.value}
                </p>
                <p className="mt-1 font-helvetica text-[0.78rem] text-[var(--r-muted)]">{c.label}</p>
              </div>
            ))}
          </div>
        ) : null}

        <div className={styles.scroller}>
          <div className={styles.scrollerInner}>
            <div className={styles.lanes}>
              {state.lanes.map((lane) => (
                <div key={lane.name} className={styles.lane}>
                  <span className={styles.laneName}>{lane.name}</span>
                  {lane.void ? (
                    <span
                      className={styles.void}
                      style={{
                        left: `${lane.void[0]}%`,
                        width: `${lane.void[1] - lane.void[0]}%`,
                      }}
                      aria-hidden
                    />
                  ) : null}
                  {lane.events.map((e, i) => (
                    <span
                      key={`${lane.name}-${i}`}
                      className={styles.event}
                      style={{ left: `${e.at}%`, background: colourFor(e.kind) }}
                      title={e.label ?? e.kind}
                    />
                  ))}
                </div>
              ))}
            </div>

            <div className={styles.axis} aria-hidden>
              {state.axis.map((a) => (
                <span key={a.label} className={styles.tick} style={{ left: `${a.at}%` }}>
                  {a.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/*
          A screen reader gets the events as a list rather than as positioned
          dots, which convey nothing without sight. Same data, read out.
        */}
        <ul className="sr-only">
          {state.lanes.flatMap((lane) =>
            lane.events.map((e, i) => (
              <li key={`${lane.name}-sr-${i}`}>
                {lane.name}: {e.label ?? e.kind}
              </li>
            )),
          )}
        </ul>

        {state.legend.length ? (
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            {state.legend.map((l) => (
              <span key={l.kind} className="flex items-center gap-2">
                <span
                  className="size-2.5 rounded-full"
                  style={{ background: colourFor(l.kind) }}
                  aria-hidden
                />
                <span className="font-helvetica text-[0.75rem] text-[var(--r-muted)]">{l.label}</span>
              </span>
            ))}
          </div>
        ) : null}

        {state.rows?.length ? (
          <ul className="mt-6 divide-y divide-[var(--r-hair)] border-t border-[var(--r-hair)]">
            {state.rows.map((row, i) => (
              <li key={i} className="flex flex-wrap items-baseline gap-x-3 gap-y-1 py-2.5">
                <span className="w-24 shrink-0 font-helvetica text-[0.75rem] font-semibold text-[var(--r-muted)]">
                  {row.when}
                </span>
                <span className="min-w-0 flex-1 font-helvetica text-[0.88rem] leading-snug text-[var(--r-ink-2)]">
                  <Rich text={row.text} />
                </span>
                <Badge tone={row.actor === 'you' ? 'brand' : row.actor === 'automatic' ? 'ok' : 'quiet'}>
                  {row.actor === 'you' ? 'You' : row.actor === 'automatic' ? 'Automatic' : 'Ambient'}
                </Badge>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
