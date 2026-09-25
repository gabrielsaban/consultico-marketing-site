import type { Playbook } from '@/lib/reports/content/playbook';
import { Blocks } from '../report/Blocks';
import { Rich } from '../report/Rich';
import { StatTile } from '../report/Primitives';
import styles from '../report/report.module.css';

/**
 * The situation. Not an action — you do not "do" a diagnosis.
 *
 * It used to sprawl down the landing page, where it was competing with a cover
 * and a contents list and being mistaken for navigation furniture. Given its
 * own page and its own card on the index, it is the first thing you click
 * rather than the first thing you scroll past.
 */
export function Situation({ pb }: { pb: Playbook }) {
  return (
    <article>
      <header className={styles.measure}>
        <p className="font-helvetica text-[length:var(--t-label)] leading-[var(--lh-label)] tracking-[var(--ls-label)] uppercase text-[var(--r-muted)]">
          Start here
        </p>
        <h1 className="mt-[var(--s-1)] font-futura text-[length:var(--t-display)] leading-[var(--lh-display)] tracking-[var(--ls-display)] text-[var(--r-navy)]">
          {pb.opening.title}
        </h1>
        {pb.opening.summary.map((line, i) => (
          <p
            key={i}
            className={`font-helvetica text-[length:var(--t-lede)] leading-[var(--lh-lede)] tracking-[var(--ls-lede)] text-[var(--r-ink-2)] ${
              i === 0 ? 'mt-[var(--s-3)]' : 'mt-[var(--s-2)]'
            }`}
          >
            <Rich text={line} />
          </p>
        ))}
      </header>

      {/* Only figures this document actually establishes. The four outcome
          measures are not here: they have no baselines, and em-dashes in a
          KPI row read as broken rather than as principled. */}
      {pb.opening.headlines.length ? (
        <div className={`${styles.measure} mt-[var(--s-4)]`}>
          <div className={`${styles.bleed} grid gap-[var(--s-3)] sm:grid-cols-2 lg:grid-cols-4`}>
            {pb.opening.headlines.map((h) => (
              <StatTile key={h.label} value={h.value} label={h.label} note={h.note} />
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-[var(--s-4)]">
        <Blocks blocks={pb.opening.blocks} visuals={pb.visuals} />
      </div>
    </article>
  );
}
