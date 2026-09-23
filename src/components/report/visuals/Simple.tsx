import type { DayStripVisual, DeltaVisual, StatRowVisual } from '@/lib/reports/content/schema';
import { Rich } from '../Rich';
import { StatTile } from '../Primitives';

/**
 * A unit chart: one cell per day, a handful filled.
 *
 * Honest here because the numbers are small and real — 14 days, one contact.
 * "13 days with nothing in them" is a sentence; thirteen empty cells is the
 * argument. It would stop being honest the moment the counts were estimated
 * or the units were not comparable.
 */
export function DayStrip({ spec }: { spec: DayStripVisual }) {
  const filled = new Map(spec.filled.map((f) => [f.day, f.label]));

  return (
    <figure className="m-0">
      <div className="flex flex-wrap gap-1.5" role="img" aria-label={spec.caption}>
        {Array.from({ length: spec.days }, (_, i) => {
          const day = i + 1;
          const label = filled.get(day);
          return (
            <span
              key={day}
              title={label ?? `Day ${day}: nothing`}
              className={`h-9 flex-1 min-w-[18px] rounded-[6px] border ${
                label
                  ? 'border-transparent bg-[var(--r-brand)]'
                  : 'border-[var(--r-hair)] bg-[var(--r-canvas)]'
              }`}
            />
          );
        })}
      </div>
      <figcaption className="mt-3 font-helvetica text-[0.82rem] leading-snug text-[var(--r-muted)]">
        <Rich text={spec.caption} />
      </figcaption>
    </figure>
  );
}

/**
 * One value becoming another.
 *
 * Rendered as paired figures rather than bars on purpose: a real value here is
 * a range ("8–11"), and a bar would give it a precision it does not have.
 */
export function Delta({ spec }: { spec: DeltaVisual }) {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <Side value={spec.from.value} label={spec.from.label} muted />
        <span aria-hidden className="font-futura text-2xl text-[var(--r-brand)]">→</span>
        <Side value={spec.to.value} label={spec.to.label} />
      </div>
      {spec.note ? (
        <p className="mt-3 font-helvetica text-[0.85rem] leading-snug text-[var(--r-muted)]">
          <Rich text={spec.note} />
        </p>
      ) : null}
    </div>
  );
}

function Side({ value, label, muted = false }: { value: string; label: string; muted?: boolean }) {
  return (
    <div>
      <p
        className={`font-futura text-[clamp(2rem,5vw,3rem)] leading-none font-bold ${
          muted ? 'text-[var(--r-muted)]' : 'text-[var(--r-brand)]'
        }`}
      >
        {value}
      </p>
      <p className="mt-1.5 font-helvetica text-[0.8rem] text-[var(--r-muted)]">{label}</p>
    </div>
  );
}

export function StatRow({ spec }: { spec: StatRowVisual }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {spec.stats.map((s) => (
        <StatTile key={s.label} value={s.value} label={s.label} note={s.note} />
      ))}
    </div>
  );
}
