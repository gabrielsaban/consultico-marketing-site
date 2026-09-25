import Link from 'next/link';
import type { Playbook } from '@/lib/reports/content/playbook';
import { Rich } from '../report/Rich';
import { Card, Badge } from '../report/Primitives';
import { Disclosure } from '../report/Disclosure';
import { PlaybookFrame } from './PlaybookFrame';

/**
 * Everything to do, grouped by when.
 *
 * Progress is shown as "3 of 5", not a percentage ring. A ring over five items
 * is decoration — the same judgement StatTile makes by refusing a sparkline.
 *
 * Every task links back to the action that justifies it, because a checklist
 * divorced from its reasoning is exactly what this rebuild was trying to stop
 * the deliverable becoming.
 */
export function PlanBoard({ pb }: { pb: Playbook }) {
  const phases = pb.plan.phases;

  return (
    <PlaybookFrame pb={pb}>
      <header>
        <p className="font-helvetica text-[length:var(--t-label)] leading-[var(--lh-label)] tracking-[0.14em] uppercase text-[var(--r-brand-ink)]">
          The plan
        </p>
        <h1 className="mt-2 font-futura text-[length:var(--t-title)] leading-[var(--lh-title)] text-[var(--r-ink)]">
          {pb.plan.horizonDays} days
        </h1>
        <p className="mt-2 font-helvetica text-[length:var(--t-body)] leading-[var(--lh-body)] text-[var(--r-muted)]">
          {pb.plan.tasks.length} things to do, across {phases.length} phases.
        </p>
      </header>

      <div className="mt-[var(--s-4)] flex flex-col gap-[var(--s-3)]">
        {phases.map((phase) => {
          const tasks = pb.plan.tasks.filter((t) => t.phase === phase.id);
          if (!tasks.length) return null;

          return (
            <Card key={phase.id}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <p className="font-futura text-[length:var(--t-strong)] leading-[var(--lh-strong)] text-[var(--r-ink)]">
                    {phase.label}
                  </p>
                  {phase.note ? (
                    <p className="mt-0.5 font-helvetica text-[length:var(--t-small)] leading-[var(--lh-small)] text-[var(--r-muted)]">
                      {phase.note}
                    </p>
                  ) : null}
                </div>
                <p className="font-helvetica text-[length:var(--t-small)] leading-[var(--lh-small)] text-[var(--r-muted)]">
                  {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
                </p>
              </div>

              <div className="mt-[var(--s-2)]">
                {tasks.map((t) => (
                  <Disclosure
                    key={t.id}
                    label={
                      <span>
                        <Rich text={t.label} />
                        {t.actionId ? (
                          <Link
                            href={`/r/${pb.slug}?a=${t.actionId}`}
                            className="ml-2 font-helvetica text-[length:var(--t-small)] leading-[var(--lh-small)] text-[var(--r-brand-ink)] hover:underline"
                          >
                            why this →
                          </Link>
                        ) : null}
                      </span>
                    }
                    meta={t.owner === 'consultico' ? 'We do this' : t.effort}
                  >
                    {t.why ? <Rich text={t.why} /> : <span>No further detail.</span>}
                  </Disclosure>
                ))}
              </div>
            </Card>
          );
        })}
      </div>

      {/*
        The outcome measures live here rather than in the opening's KPI strip.
        They have no baseline values, and four em-dashes in a headline row reads
        as a broken dashboard rather than as principled restraint. Framed as the
        measurement plan, with the numbers asked for as the first task, the same
        absence becomes a strength.
      */}
      {pb.outcomes.length ? (
        <section className="mt-[var(--s-4)]">
          <h2 className="font-futura text-[length:var(--t-strong)] leading-[var(--lh-strong)] text-[var(--r-ink)]">
            How we&rsquo;ll know it worked
          </h2>
          {pb.baselineRequest ? (
            /* The same demotion every other callout got: a 2px rule in
               ink-2, no fill. This one still carried a 3px brand edge over a
               blue tint, which broke the rule that blue means "you can act on
               this" — a request for four numbers is not a button. */
            <div className="mt-[var(--s-2)] max-w-[var(--measure)] border-l-2 border-[var(--r-ink-2)] pl-[var(--s-2)]">
              <p className="font-futura text-[length:var(--t-strong)] leading-[var(--lh-strong)] text-[var(--r-ink)]">
                {pb.baselineRequest.title}
              </p>
              <p className="mt-1.5 font-helvetica text-[length:var(--t-body)] leading-[var(--lh-body)] text-[var(--r-ink-2)]">
                <Rich text={pb.baselineRequest.body} />
              </p>
            </div>
          ) : null}

          <ul className="mt-[var(--s-2)] grid gap-[var(--s-2)] sm:grid-cols-2">
            {pb.outcomes.map((o) => (
              <li key={o.id} className="rounded-[var(--radius)] border border-[var(--r-hair)] p-4">
                <div className="flex items-center gap-2">
                  <span
                    aria-hidden
                    className={`font-futura text-[length:var(--t-strong)] leading-[var(--lh-strong)] ${
                      o.direction === 'up' ? 'text-[var(--r-ok)]' : 'text-[var(--r-brand-ink)]'
                    }`}
                  >
                    {o.direction === 'up' ? '↑' : '↓'}
                  </span>
                  <p className="font-futura text-[length:var(--t-strong)] leading-[var(--lh-strong)] text-[var(--r-ink)]">{o.label}</p>
                </div>
                <p className="mt-1.5 font-helvetica text-[length:var(--t-small)] leading-[var(--lh-small)] text-[var(--r-ink-2)]">
                  {o.definition}
                </p>
                <p className="mt-2 font-helvetica text-[length:var(--t-small)] leading-[var(--lh-small)] text-[var(--r-muted)]">
                  {o.measureFrom}
                </p>
                {/* No value slot. The type makes one impossible; so does this. */}
                <Badge tone="quiet">No baseline yet</Badge>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </PlaybookFrame>
  );
}
