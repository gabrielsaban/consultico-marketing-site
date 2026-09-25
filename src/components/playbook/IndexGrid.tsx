'use client';

import Link from 'next/link';
import { useProgress } from './ProgressProvider';
import styles from '../report/report.module.css';

/**
 * The index: a card for each thing the client can open.
 *
 * It replaces a list of text links, and the reason is the judgement a client
 * makes in the first two seconds — not "is this well written" but "is this
 * worth reading at all". A list of seven titles answers that badly. Seven
 * covers answer it before a word is read.
 *
 * A client component because the progress it shows lives in localStorage. Only
 * titles, blurbs and ids cross the boundary; no action body does.
 */

export type IndexCard = {
  href: string;
  /** Drives the cover treatment, not the copy. */
  tone: 'situation' | 'part1' | 'part2' | 'part3' | 'plan' | 'resources';
  label: string;
  title: string;
  blurb?: string;
  /** Bleeds off the cover's edge. Absent on the situation card, which has the strip. */
  numeral?: string;
  minutes?: number;
  /** Which actions this card counts. Empty means it has no progress to show. */
  actionIds: string[];
  /** The situation card leads, and says so by being the width of the grid. */
  wide?: boolean;
};

const FIELD: Record<IndexCard['tone'], string> = {
  situation: styles.dInk,
  part1: styles.d1,
  part2: styles.d2,
  part3: styles.d3,
  plan: styles.d3,
  resources: styles.dQuiet,
};

export function IndexGrid({ cards }: { cards: IndexCard[] }) {
  const { completed } = useProgress();
  const done = new Set(completed);

  return (
    <ul className={styles.grid}>
      {cards.map((card) => {
        const total = card.actionIds.length;
        const finished = card.actionIds.filter((id) => done.has(id)).length;

        return (
          <li key={card.href + card.title} className={card.wide ? styles.gridWide : undefined}>
            <Link href={card.href} className="group block">
              <div className={`${styles.cover} ${FIELD[card.tone]}`}>
                <span className={styles.coverText}>
                  <span className={styles.coverLabel}>{card.label}</span>
                  <span className={styles.coverTitle}>{card.title}</span>
                </span>
                {card.tone === 'situation' ? <DayStrip /> : null}
                {card.numeral ? (
                  <span aria-hidden className={styles.coverNum}>
                    {card.numeral}
                  </span>
                ) : null}
              </div>

              {/* No title here. It is set into the cover, and repeating it
                  immediately underneath made every card say its own name
                  twice. */}
              {card.blurb ? (
                <p className="mt-[var(--s-2)] font-helvetica text-[length:var(--t-small)] leading-[var(--lh-small)] text-[var(--r-ink-2)]">
                  {card.blurb}
                </p>
              ) : null}

              {total ? (
                <div className={styles.cardMeta}>
                  <div className={styles.bar}>
                    <div
                      className={styles.barFill}
                      style={{ width: `${Math.round((finished / total) * 100)}%` }}
                    />
                  </div>
                  <p className="mt-1.5 font-helvetica text-[length:var(--t-label)] leading-[var(--lh-label)] tracking-[var(--ls-label)] uppercase text-[var(--r-muted)]">
                    {finished === total ? (
                      <span className="text-[var(--r-ok)]">✓ Done</span>
                    ) : (
                      <>
                        {finished} of {total} done
                        {card.minutes ? ` · ${card.minutes} min` : ''}
                      </>
                    )}
                  </p>
                </div>
              ) : card.minutes ? (
                <p className="mt-[var(--s-2)] font-helvetica text-[length:var(--t-label)] leading-[var(--lh-label)] tracking-[var(--ls-label)] uppercase text-[var(--r-muted)]">
                  {card.minutes} min
                </p>
              ) : null}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * Fourteen days, with the two calls marked. Faithful to the argument rather
 * than decorative — the gap between the calls is what the whole playbook is
 * about, so the signature mark may as well be the thing it is arguing.
 */
function DayStrip() {
  return (
    <span aria-hidden className={styles.strip}>
      {Array.from({ length: 14 }, (_, i) => (
        <span key={i} className={styles.stripCell} data-call={i === 0 || i === 13 ? '' : undefined} />
      ))}
    </span>
  );
}
