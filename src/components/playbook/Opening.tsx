import type { Playbook } from '@/lib/reports/content/playbook';
import { Rich } from '../report/Rich';
import { IndexGrid, type IndexCard } from './IndexGrid';
import { SITUATION_ID, partTree, totalMinutes } from '@/lib/reports/playbook-nav';
import styles from '../report/report.module.css';

/**
 * The landing page: a short cover, then the index.
 *
 * It was previously trying to be a cover, a diagnosis and a contents page at
 * once and doing none of them well — the diagnosis sprawled down it and the
 * link to that diagnosis read as a heading rather than as a door. The
 * diagnosis now has its own page and its own card; what is left here is the
 * two questions someone landing cold actually asks, which are "what is this"
 * and "where do I start".
 */
export function Opening({ pb }: { pb: Playbook }) {
  const tree = partTree(pb);

  const cards: IndexCard[] = [
    {
      href: `/r/${pb.slug}?a=${SITUATION_ID}`,
      tone: 'situation',
      label: 'Start here',
      title: pb.opening.title,
      blurb: 'What is happening now, and why it is worth changing.',
      actionIds: [],
      wide: true,
    },
    ...tree.map(({ part, actions }, i): IndexCard => ({
      href: `/r/${pb.slug}?a=${actions[0]?.id ?? ''}`,
      tone: (['part1', 'part2', 'part3'] as const)[Math.min(i, 2)],
      label: part.label,
      title: part.title,
      blurb: part.blurb,
      numeral: String(part.order).padStart(2, '0'),
      minutes: actions.reduce((n, a) => n + a.minutes, 0),
      actionIds: actions.map((a) => a.id),
    })),
    {
      href: `/r/${pb.slug}/plan`,
      tone: 'plan',
      label: 'The plan',
      title: `The ${pb.plan.horizonDays}-day plan`,
      blurb: 'What happens in what order, and how we will know it worked.',
      numeral: String(pb.plan.horizonDays),
      actionIds: [],
    },
    {
      href: `/r/${pb.slug}/resources`,
      tone: 'resources',
      label: 'Reference',
      title: 'Resources',
      blurb: 'The packs and templates the actions point at, in one place.',
      numeral: String(pb.resources.length).padStart(2, '0'),
      actionIds: [],
    },
  ];

  return (
    <article>
      <header className={styles.measure}>
        <p className="font-helvetica text-[length:var(--t-label)] leading-[var(--lh-label)] tracking-[var(--ls-label)] uppercase text-[var(--r-muted)]">
          {pb.title}
        </p>
        <h1 className="mt-[var(--s-1)] font-futura text-[length:var(--t-display)] leading-[var(--lh-display)] tracking-[var(--ls-display)] text-[var(--r-navy)]">
          {pb.client.name}
          <span className="text-[var(--r-brand)]">.</span>
        </h1>
        {pb.subtitle ? (
          <p className="mt-[var(--s-2)] font-helvetica text-[length:var(--t-lede)] leading-[var(--lh-lede)] tracking-[var(--ls-lede)] text-[var(--r-ink-2)]">
            {pb.subtitle}
          </p>
        ) : null}

        {/* The scale of the thing, before anything is opened. A client who
            cannot tell whether this is twenty minutes or a fortnight will
            assume the latter and put it off. */}
        <p className="mt-[var(--s-3)] font-helvetica text-[length:var(--t-small)] leading-[var(--lh-small)] text-[var(--r-muted)]">
          {pb.actions.length} {pb.actions.length === 1 ? 'action' : 'actions'} in {pb.parts.length}{' '}
          parts · about {totalMinutes(pb)} minutes in total ·{' '}
          {new Date(pb.issued).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
        </p>
      </header>

      <div className={`${styles.measure} mt-[var(--s-4)]`}>
        <p className="font-helvetica text-[length:var(--t-body)] leading-[var(--lh-body)] tracking-[var(--ls-body)] text-[var(--r-ink-2)]">
          <Rich text={pb.opening.howItWorks} />
        </p>
      </div>

      <div className="mt-[var(--s-4)]">
        <IndexGrid cards={cards} />
      </div>

      {/*
        Kept deliberately small. While notes never leave the browser there is
        nothing to disclose, so this is one quiet line rather than a boxed
        notice — four paragraphs of housekeeping near the top of a deliverable
        is throat-clearing. When answers start reaching a person, this grows
        into a real notice and says so before it starts happening.
      */}
      <p className="mt-[var(--s-5)] border-t border-[var(--r-hair)] pt-[var(--s-3)] font-helvetica text-[length:var(--t-small)] leading-[var(--lh-small)] text-[var(--r-muted)]">
        {pb.privacy.body.map((line, i) => (
          <span key={i} className="block">
            <Rich text={line} />
          </span>
        ))}
        {pb.privacy.retention ? <span className="block">{pb.privacy.retention}</span> : null}
        {pb.privacy.contactEmail ? (
          <span className="block">
            Questions:{' '}
            <a
              href={`mailto:${pb.privacy.contactEmail}`}
              className="text-[var(--r-brand-deep)] hover:underline"
            >
              {pb.privacy.contactEmail}
            </a>
          </span>
        ) : null}
      </p>
    </article>
  );
}
