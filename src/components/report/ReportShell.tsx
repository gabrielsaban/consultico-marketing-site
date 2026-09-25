import Image from 'next/image';
import type { ReportDoc } from '@/lib/reports/content/schema';
import { Blocks } from './Blocks';
import { Rich } from './Rich';
import { Card, StatTile, Badge } from './Primitives';
import { SectionPanel } from './SectionPanel';
import styles from './report.module.css';

/**
 * The frame around one client report.
 *
 * A server component: the report's prose is rendered here and passed into the
 * interactive panels as children, so it never enters a client bundle. Only the
 * open/closed state and the analytics are client-side.
 *
 * The report owns its whole frame — the marketing site's nav, footer,
 * preloader and cursor bow out on /r/* (see isReportPath). This is a client
 * deliverable, not a page of the website.
 */
export function ReportShell({ doc }: { doc: ReportDoc }) {
  const sections = [...doc.sections].sort((a, b) => a.order - b.order);
  const issued = new Date(doc.issued).toLocaleDateString('en-GB', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className={styles.scope}>
      <div className="mx-auto max-w-[1100px] px-4 py-10 sm:px-6 md:py-14 lg:px-10">
        <header>
          <Image
            src="/brand/logo_main.svg"
            alt="Consultico"
            width={420}
            height={120}
            className="h-auto w-[7.5rem]"
            priority
          />

          <p className="mt-9 font-helvetica text-[length:var(--t-label)] leading-[var(--lh-label)] tracking-[0.18em] uppercase text-[var(--r-brand-deep)]">
            {doc.title}
          </p>
          <h1 className="mt-2 font-futura text-[length:var(--t-title)] leading-[var(--lh-title)] text-[var(--r-ink)]">
            {doc.client.name}
            <span className="text-[var(--r-brand)]">.</span>
          </h1>
          {doc.subtitle ? (
            <p className="mt-3 max-w-[54ch] font-helvetica text-[length:var(--t-title)] leading-[var(--lh-title)] text-[var(--r-ink-2)]">
              {doc.subtitle}
            </p>
          ) : null}

          <p className="mt-5 font-helvetica text-[length:var(--t-small)] leading-[var(--lh-small)] text-[var(--r-muted)]">
            {issued} &middot; Prepared by {doc.preparedBy} &middot; {sections.length} sections
          </p>
        </header>

        {/*
          The top strip carries only figures this report actually establishes.
          The four success measures are deliberately not here: they have no
          baseline values, and four em-dashes in a KPI row reads as a broken
          dashboard rather than as principled restraint. They get their own
          panel, framed as the measurement plan. See the Outcome type.
        */}
        {doc.headlines.length ? (
          <Card className="mt-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {doc.headlines.map((h) => (
                <StatTile key={h.label} value={h.value} label={h.label} note={h.note} />
              ))}
            </div>
          </Card>
        ) : null}

        {doc.summary.length ? (
          <Card className="mt-6">
            <p className="font-helvetica text-[length:var(--t-label)] leading-[var(--lh-label)] tracking-[0.14em] uppercase text-[var(--r-muted)]">
              The short version
            </p>
            <div className="mt-3 flex flex-col gap-3">
              {doc.summary.map((line, i) => (
                <p
                  key={i}
                  className="font-helvetica text-[length:var(--t-title)] leading-[var(--lh-title)] text-[var(--r-ink-2)]"
                >
                  <Rich text={line} />
                </p>
              ))}
            </div>
          </Card>
        ) : null}

        <nav aria-label="Sections" className="mt-10">
          <p className="font-helvetica text-[length:var(--t-label)] leading-[var(--lh-label)] tracking-[0.14em] uppercase text-[var(--r-muted)]">
            Work through it
          </p>
          <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map((s, i) => {
              const tasks = doc.plan.tasks.filter((t) => t.sectionId === s.id).length;
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="flex h-full flex-col gap-1.5 rounded-[var(--radius)] border border-[var(--r-hair)] bg-[var(--r-surface)] p-4 transition-colors hover:border-[var(--r-brand)]"
                  >
                    <span className="flex items-center gap-2">
                      <span className="font-futura text-[length:var(--t-small)] leading-[var(--lh-small)] text-[var(--r-brand-deep)]">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {s.optional ? <Badge tone="quiet">Optional</Badge> : null}
                    </span>
                    <span className="font-futura text-[length:var(--t-strong)] leading-[var(--lh-strong)] text-[var(--r-ink)]">
                      {s.title}
                    </span>
                    <span className="font-helvetica text-[length:var(--t-small)] leading-[var(--lh-small)] text-[var(--r-muted)]">
                      {s.oneLiner}
                    </span>
                    {tasks ? (
                      <span className="mt-auto pt-2 font-helvetica text-[length:var(--t-small)] leading-[var(--lh-small)] text-[var(--r-brand-deep)]">
                        {tasks} {tasks === 1 ? 'task' : 'tasks'}
                      </span>
                    ) : null}
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="mt-6 flex flex-col gap-4">
          {sections.map((s, i) => (
            <SectionPanel
              key={s.id}
              slug={doc.slug}
              section={s}
              index={i}
              total={sections.length}
              // The first section opens so the report is never a wall of closed
              // headings; everything else waits to be asked for.
              defaultOpen={i === 0}
              nextLabel={sections[i + 1]?.title}
            >
              <Blocks blocks={s.understanding} visuals={doc.visuals} />
            </SectionPanel>
          ))}
        </div>

        <footer className="mt-12 border-t border-[var(--r-hair)] pt-6">
          <p className="font-helvetica text-[length:var(--t-small)] leading-[var(--lh-small)] text-[var(--r-muted)]">
            {doc.title} &middot; {doc.client.name} &middot; {issued} &middot; consultico.co.uk
          </p>
        </footer>
      </div>
    </div>
  );
}
