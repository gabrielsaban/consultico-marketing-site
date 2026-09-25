import Link from 'next/link';
import type { Playbook } from '@/lib/reports/content/playbook';
import { Blocks } from '../report/Blocks';
import { Rich } from '../report/Rich';
import { Card, StatTile } from '../report/Primitives';
import { partTree, totalMinutes } from '@/lib/reports/playbook-nav';

/**
 * The situation. Not an action — you do not "do" a diagnosis.
 *
 * This is where the privacy notice is given properly, once, before the client
 * has written anything anywhere.
 *
 * Deliberately not here: the outcome measures and the request for baselines.
 * Those are about whether it worked, which belongs at the end, on the plan.
 */
export function Opening({ pb }: { pb: Playbook }) {
  const tree = partTree(pb);

  return (
    <article>
      <header>
        <p className="font-helvetica text-[0.68rem] font-semibold tracking-[0.18em] uppercase text-[var(--r-brand)]">
          {pb.title}
        </p>
        <h1 className="mt-2 font-futura text-[clamp(1.8rem,4.6vw,2.7rem)] leading-[1.08] font-bold text-[var(--r-ink)]">
          {pb.client.name}
          <span className="text-[var(--r-brand)]">.</span>
        </h1>
        {pb.subtitle ? (
          <p className="mt-3 max-w-[54ch] font-helvetica text-[clamp(1rem,1.6vw,1.12rem)] leading-[1.55] text-[var(--r-ink-2)]">
            {pb.subtitle}
          </p>
        ) : null}
        <p className="mt-4 font-helvetica text-[0.8rem] text-[var(--r-muted)]">
          {new Date(pb.issued).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })} ·
          Prepared by {pb.preparedBy}
        </p>
      </header>

      {/* Only figures this document actually establishes. The four outcome
          measures are not here: they have no baselines, and em-dashes in a
          KPI row read as broken rather than as principled. */}
      {pb.opening.headlines.length ? (
        <Card className="mt-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pb.opening.headlines.map((h) => (
              <StatTile key={h.label} value={h.value} label={h.label} note={h.note} />
            ))}
          </div>
        </Card>
      ) : null}

      <section className="mt-8">
        <h2 className="font-futura text-[1.25rem] font-bold text-[var(--r-ink)]">
          {pb.opening.title}
        </h2>
        <div className="mt-4 flex flex-col gap-3">
          {pb.opening.summary.map((line, i) => (
            <p
              key={i}
              className="font-helvetica text-[clamp(0.98rem,1.5vw,1.08rem)] leading-[1.6] text-[var(--r-ink-2)]"
            >
              <Rich text={line} />
            </p>
          ))}
        </div>
        <div className="mt-6">
          <Blocks blocks={pb.opening.blocks} visuals={pb.visuals} />
        </div>
      </section>

      {/* The map. This is what makes a seven-action playbook feel finite. */}
      <section className="mt-10">
        <p className="font-helvetica text-[0.7rem] font-semibold tracking-[0.14em] uppercase text-[var(--r-muted)]">
          What you&rsquo;ll run
        </p>
        <p className="mt-2 font-helvetica text-[0.9rem] leading-[1.6] text-[var(--r-ink-2)]">
          <Rich text={pb.opening.howItWorks} />
        </p>

        <div className="mt-5 flex flex-col gap-4">
          {tree.map(({ part, actions }) => (
            <Card key={part.id}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <p className="font-helvetica text-[0.65rem] font-semibold tracking-[0.14em] uppercase text-[var(--r-brand)]">
                    {part.label}
                  </p>
                  <p className="mt-0.5 font-futura text-[1.02rem] font-bold text-[var(--r-ink)]">
                    {part.title}
                  </p>
                </div>
                <p className="font-helvetica text-[0.75rem] text-[var(--r-muted)]">
                  {actions.reduce((n, a) => n + a.minutes, 0)} min
                </p>
              </div>
              {part.blurb ? (
                <p className="mt-2 font-helvetica text-[0.85rem] leading-snug text-[var(--r-muted)]">
                  {part.blurb}
                </p>
              ) : null}
              <ol className="mt-3 flex flex-col gap-1.5">
                {actions.map((a) => (
                  <li key={a.id}>
                    <Link
                      href={`/r/${pb.slug}?a=${a.id}`}
                      className="flex items-baseline gap-3 rounded-[8px] px-2 py-1.5 transition-colors hover:bg-[var(--r-canvas)]"
                    >
                      <span className="font-futura text-[0.78rem] font-bold text-[var(--r-brand)]">
                        {String(a.order).padStart(2, '0')}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-helvetica text-[0.92rem] font-semibold text-[var(--r-ink)]">
                          {a.title}
                        </span>
                        <span className="mt-0.5 block font-helvetica text-[0.82rem] leading-snug text-[var(--r-muted)]">
                          {a.oneLiner}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </Card>
          ))}
        </div>

        <p className="mt-4 font-helvetica text-[0.8rem] text-[var(--r-muted)]">
          {pb.actions.length} {pb.actions.length === 1 ? 'action' : 'actions'} · about{' '}
          {totalMinutes(pb)} minutes in total
        </p>
      </section>

      {/*
        Kept deliberately small. While notes never leave the browser there is
        nothing to disclose, so this is one quiet line rather than a boxed
        notice — four paragraphs of housekeeping near the top of a deliverable
        is throat-clearing. When answers start reaching a person, this grows
        into a real notice and says so before it starts happening.
      */}
      <p className="mt-10 border-t border-[var(--r-hair)] pt-5 font-helvetica text-[0.8rem] leading-[1.6] text-[var(--r-muted)]">
        {pb.privacy.body.map((line, i) => (
          <span key={i} className="block">
            <Rich text={line} />
          </span>
        ))}
        {pb.privacy.retention ? <span className="block">{pb.privacy.retention}</span> : null}
        {pb.privacy.contactEmail ? (
          <span className="block">
            Questions:{' '}
            <a href={`mailto:${pb.privacy.contactEmail}`} className="text-[var(--r-brand)] hover:underline">
              {pb.privacy.contactEmail}
            </a>
          </span>
        ) : null}
      </p>

    </article>
  );
}
