import Link from 'next/link';
import type { Playbook } from '@/lib/reports/content/playbook';
import type { Resource } from '@/lib/reports/content/schema';
import { Card, Badge, type Tone } from '../report/Primitives';
import { Blocks } from '../report/Blocks';
import { DataTable } from '../report/visuals/More';
import { EmailThread } from './EmailThread';
import { PlaybookFrame } from './PlaybookFrame';

/**
 * Reference material, indexed and individually addressable.
 *
 * These are documents the client returns to while doing the work — the email
 * pack while rewriting, the audit template while auditing. That is why they
 * have their own page and their own URL rather than living in a drawer: a
 * drawer has to be reopened from wherever it was attached, and a modal over a
 * page you deliberately navigated to is a modal for no reason.
 */

const KIND: Record<string, { label: string; tone: Tone }> = {
  pack: { label: 'Pack', tone: 'brand' },
  playbook: { label: 'Principles', tone: 'quiet' },
  template: { label: 'Template', tone: 'ok' },
  plan: { label: 'Plan', tone: 'ok' },
  review: { label: 'Review', tone: 'warn' },
};

export function ResourceShelf({ pb, resourceId }: { pb: Playbook; resourceId?: string }) {
  const resource = resourceId ? pb.resources.find((r) => r.id === resourceId) : undefined;

  return (
    <PlaybookFrame pb={pb}>
      {resource ? <One pb={pb} resource={resource} /> : <Index pb={pb} />}
    </PlaybookFrame>
  );
}

function Index({ pb }: { pb: Playbook }) {
  return (
    <div>
      <header>
        <p className="font-helvetica text-[0.68rem] font-semibold tracking-[0.14em] uppercase text-[var(--r-brand)]">
          Resources
        </p>
        <h1 className="mt-2 font-futura text-[clamp(1.5rem,3.6vw,2.15rem)] leading-tight font-bold text-[var(--r-ink)]">
          What you&rsquo;ll work from
        </h1>
        <p className="mt-2 font-helvetica text-[0.9rem] text-[var(--r-muted)]">
          Everything referenced in the actions, kept here so you can find it again.
        </p>
      </header>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {pb.resources.map((r) => {
          const k = r.kind ? KIND[r.kind] : undefined;
          return (
            <li key={r.id}>
              <Link
                href={`/r/${pb.slug}/resources?r=${r.id}`}
                className="flex h-full flex-col gap-2 rounded-[12px] border border-[var(--r-hair)] bg-[var(--r-surface)] p-4 transition-colors hover:border-[var(--r-brand)]"
              >
                {k ? <Badge tone={k.tone}>{k.label}</Badge> : null}
                <span className="font-futura text-[1rem] leading-tight font-bold text-[var(--r-ink)]">
                  {r.title}
                </span>
                <span className="font-helvetica text-[0.85rem] leading-snug text-[var(--r-muted)]">
                  {r.blurb}
                </span>
                {r.forWhat ? (
                  <span className="mt-auto pt-2 font-helvetica text-[0.75rem] text-[var(--r-brand)]">
                    {r.forWhat}
                  </span>
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function One({ pb, resource }: { pb: Playbook; resource: Resource }) {
  const from = resource.fromActionId
    ? pb.actions.find((a) => a.id === resource.fromActionId)
    : undefined;

  return (
    <article>
      <Link
        href={`/r/${pb.slug}/resources`}
        className="font-helvetica text-[0.82rem] text-[var(--r-muted)] hover:text-[var(--r-ink)]"
      >
        ← All resources
      </Link>

      <header className="mt-4">
        <h1 className="font-futura text-[clamp(1.4rem,3.2vw,2rem)] leading-tight font-bold text-[var(--r-ink)]">
          {resource.title}
        </h1>
        <p className="mt-2 font-helvetica text-[0.92rem] leading-[1.6] text-[var(--r-ink-2)]">
          {resource.blurb}
        </p>
        {from ? (
          <p className="mt-2 font-helvetica text-[0.8rem] text-[var(--r-muted)]">
            From{' '}
            <Link href={`/r/${pb.slug}?a=${from.id}`} className="text-[var(--r-brand)] hover:underline">
              {from.title}
            </Link>
          </p>
        ) : null}
      </header>

      <div className="mt-8">
        <Body pb={pb} resource={resource} />
      </div>
    </article>
  );
}

function Body({ pb, resource }: { pb: Playbook; resource: Resource }) {
  const body = resource.body;

  switch (body.kind) {
    case 'email-thread':
      return <EmailThread emails={body.emails} />;

    case 'findings':
      return <Blocks blocks={body.findings} visuals={pb.visuals} />;

    case 'panels':
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          {body.panels.map((p) => (
            <Card key={p.title} className={p.wide ? 'sm:col-span-2' : ''}>
              <p className="font-futura text-[0.95rem] font-bold text-[var(--r-ink)]">{p.title}</p>
              <ul className="mt-2.5 flex flex-col gap-2">
                {p.items.map((item, i) => (
                  <li key={i} className="flex gap-2.5">
                    <span aria-hidden className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-[var(--r-brand)]" />
                    <span className="font-helvetica text-[0.88rem] leading-[1.55] text-[var(--r-ink-2)]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      );

    case 'table':
      return <DataTable spec={{ t: 'table', columns: body.columns, rows: body.rows, note: body.note }} />;

    case 'worksheet':
      return (
        <div>
          <DataTable
            spec={{
              t: 'table',
              columns: body.columns,
              rows: [body.exampleRow],
              note: body.note,
            }}
          />
          <p className="mt-2 font-helvetica text-[0.78rem] text-[var(--r-muted)]">
            The row above is an example. Fill one in per post.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {body.prompts.map((p) => (
              <Card key={p.title}>
                <p className="font-futura text-[0.92rem] font-bold text-[var(--r-ink)]">{p.title}</p>
                <ul className="mt-2 flex flex-col gap-2">
                  {p.items.map((item, i) => (
                    <li
                      key={i}
                      className="font-helvetica text-[0.86rem] leading-snug text-[var(--r-ink-2)]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      );
  }
}
