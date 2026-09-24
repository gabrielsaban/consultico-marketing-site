import type {
  FixListVisual,
  IdeaLoopVisual,
  SerpVisual,
  SplitBarVisual,
  TableVisual,
} from '@/lib/reports/content/schema';
import { Rich } from '../Rich';
import { Badge, type Tone } from '../Primitives';

/**
 * A proportion bar.
 *
 * `basis` is the load-bearing prop. A rule the client should follow and a
 * measurement of what they currently do look identical as a bar, so the two
 * are captioned differently and a rule says so on its face. Without that, a
 * target reads as a reading — which is the failure this whole schema is shaped
 * to prevent.
 */
export function SplitBar({ spec }: { spec: SplitBarVisual }) {
  return (
    <div>
      <div className="flex h-9 overflow-hidden rounded-[8px]">
        {spec.parts.map((p) => (
          <div
            key={p.label}
            style={{ width: `${p.pct}%` }}
            className={`grid place-items-center font-helvetica text-[0.78rem] font-semibold ${
              p.tone === 'value'
                ? 'bg-[var(--r-brand)] text-white'
                : 'bg-[var(--r-quiet-bg)] text-[var(--r-muted)]'
            }`}
          >
            {p.pct}%
          </div>
        ))}
      </div>
      <div className="mt-2.5 flex flex-wrap gap-x-5 gap-y-1">
        {spec.parts.map((p) => (
          <span key={p.label} className="font-helvetica text-[0.8rem] text-[var(--r-ink-2)]">
            {p.label}
          </span>
        ))}
      </div>
      <p className="mt-2 font-helvetica text-[0.78rem] text-[var(--r-muted)]">
        {spec.basis === 'rule' ? 'A target to hold to — not a measurement.' : 'Measured.'}
        {spec.note ? ' ' : null}
        {spec.note ? <Rich text={spec.note} /> : null}
      </p>
    </div>
  );
}

/** A repeating process with a decision point in the middle. */
export function IdeaLoop({ spec }: { spec: IdeaLoopVisual }) {
  return (
    <ol className="flex flex-col gap-2">
      {spec.steps.map((s, i) => (
        <li
          key={i}
          className={`rounded-[10px] border p-3.5 ${
            s.gate
              ? 'border-[var(--r-warn)] bg-[var(--r-warn-bg)]'
              : 'border-[var(--r-hair)] bg-[var(--r-canvas)]'
          }`}
        >
          <div className="flex items-baseline gap-3">
            <span className="font-futura text-[0.75rem] font-bold text-[var(--r-brand)]">
              {s.gate ? '?' : String(i + 1).padStart(2, '0')}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-futura text-[0.9rem] font-bold text-[var(--r-ink)]">{s.label}</p>
              <p className="mt-1 font-helvetica text-[0.83rem] leading-snug text-[var(--r-ink-2)]">
                {s.body}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

/**
 * What a search result page looks like for this client.
 *
 * Not a chart — a mock of the thing itself. It is the highest-value visual in
 * the whole document because it is literally what a prospect sees while
 * deciding, and no amount of describing it lands the same way.
 */
const VERDICT: Record<SerpVisual['results'][number]['verdict'], { label: string; tone: Tone }> = {
  refresh: { label: 'Refresh', tone: 'warn' },
  sharpen: { label: 'Sharpen', tone: 'warn' },
  retire: { label: 'Retire', tone: 'risk' },
  keep: { label: 'Keep', tone: 'ok' },
  leave: { label: 'Leave it', tone: 'quiet' },
};

export function SerpMock({ spec }: { spec: SerpVisual }) {
  return (
    <div className="rounded-[12px] border border-[var(--r-hair)] bg-[var(--r-surface)] p-4">
      <p className="rounded-full border border-[var(--r-hair)] px-4 py-2 font-helvetica text-[0.88rem] text-[var(--r-muted)]">
        {spec.query}
      </p>
      <ol className="mt-4 flex flex-col gap-4">
        {spec.results.map((r, i) => {
          const v = VERDICT[r.verdict];
          return (
            <li key={i}>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-helvetica text-[0.75rem] text-[var(--r-muted)]">{r.source}</span>
                <Badge tone={v.tone}>{v.label}</Badge>
              </div>
              <p className="mt-0.5 font-helvetica text-[0.98rem] text-[var(--r-brand)]">{r.title}</p>
              <p className="mt-0.5 font-helvetica text-[0.83rem] leading-snug text-[var(--r-muted)]">
                <Rich text={r.note} />
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/**
 * Items with a status each, and a count derived from them.
 *
 * Counting real items is honest arithmetic — unlike a percentage, which would
 * need a denominator this document does not have.
 */
const STATUS: Record<string, { label: string; tone: Tone }> = {
  have: { label: 'Already good', tone: 'ok' },
  update: { label: 'Update', tone: 'warn' },
  add: { label: 'Add', tone: 'brand' },
  reorder: { label: 'Reorder', tone: 'brand' },
  build: { label: 'Build', tone: 'warn' },
};

export function FixList({ spec }: { spec: FixListVisual }) {
  return (
    <div className="flex flex-col gap-5">
      {spec.groups.map((g) => {
        const todo = g.items.filter((i) => i.status !== 'have').length;
        return (
          <div key={g.title}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-futura text-[0.95rem] font-bold text-[var(--r-ink)]">{g.title}</p>
              <p className="font-helvetica text-[0.78rem] text-[var(--r-muted)]">
                {todo} of {g.items.length} to change
              </p>
            </div>
            <ul className="mt-2 divide-y divide-[var(--r-hair)] border-y border-[var(--r-hair)]">
              {g.items.map((item) => {
                const s = STATUS[item.status] ?? STATUS.update;
                return (
                  <li key={item.label} className="flex flex-wrap items-center gap-x-3 gap-y-1 py-2.5">
                    <span className="min-w-0 flex-1 font-helvetica text-[0.9rem] text-[var(--r-ink)]">
                      {item.label}
                      {item.note ? (
                        <span className="ml-2 text-[0.82rem] text-[var(--r-muted)]">{item.note}</span>
                      ) : null}
                    </span>
                    <Badge tone={s.tone}>{s.label}</Badge>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export function DataTable({ spec }: { spec: TableVisual }) {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse">
          <thead>
            <tr>
              {spec.columns.map((c) => (
                <th
                  key={c}
                  className="border-b border-[var(--r-hair)] pb-2 text-left font-helvetica text-[0.72rem] font-semibold tracking-[0.08em] uppercase text-[var(--r-muted)]"
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {spec.rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className="border-b border-[var(--r-hair)] py-2.5 pr-4 align-top font-helvetica text-[0.86rem] leading-snug text-[var(--r-ink-2)]"
                  >
                    {typeof cell === 'string' ? (
                      <Rich text={cell} />
                    ) : (
                      <Badge tone={cell.tone === 'ok' ? 'ok' : cell.tone === 'warn' ? 'warn' : 'quiet'}>
                        {cell.text}
                      </Badge>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {spec.note ? (
        <p className="mt-3 font-helvetica text-[0.8rem] text-[var(--r-muted)]">
          <Rich text={spec.note} />
        </p>
      ) : null}
    </div>
  );
}
