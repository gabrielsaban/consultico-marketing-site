import type { Action, Playbook } from '@/lib/reports/content/playbook';
import { Blocks, Visual } from '../report/Blocks';
import { Rich } from '../report/Rich';
import { Disclosure } from '../report/Disclosure';
import { ContractStrip } from './ContractStrip';
import { ActionNav } from './ActionNav';
import { ApplyPanel } from './ApplyPanel';
import styles from '../report/report.module.css';

/**
 * One action, filling the stage.
 *
 * A server component. The three beats render here and the prose never enters a
 * client bundle; only the nav, the ticks and the apply field are client-side.
 *
 * The beats run impact → why → task, and that order is load-bearing. We are
 * asking a founder for half a day, so the return is stated before anything is
 * asked of him. A teacher explains then sets work; a peer says what the return
 * is and lets you decide.
 *
 * Each beat is a `.measure` grid so its children sit in the text column and
 * wide figures can opt out with `.bleed`. The beat rule and numeral come from
 * the CSS — space and a rule in full ink, no box, because a box around a beat
 * would put the page's structure in the same visual class as an aside.
 */

function Beat({
  n,
  label,
  children,
}: {
  n: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className={`${styles.beat} ${styles.measure}`}>
      <p className={styles.beatHead}>
        <span className={styles.beatNum} aria-hidden>
          {n}
        </span>
        <span className={styles.beatLabel}>{label}</span>
      </p>
      {children}
    </section>
  );
}

export function ActionView({
  pb,
  action,
  prev,
  next,
}: {
  pb: Playbook;
  action: Action;
  prev?: Action;
  next?: Action;
}) {
  const tasks = action.task.taskIds
    .map((id) => pb.plan.tasks.find((t) => t.id === id))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  const resources = (action.resourceIds ?? [])
    .map((id) => pb.resources.find((r) => r.id === id))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  return (
    <article>
      <header className={styles.measure}>
        {/* The folio — where you are and how far through. A reader should
            never have to wonder. */}
        <p className="font-helvetica text-[length:var(--t-label)] leading-[var(--lh-label)] tracking-[var(--ls-label)] uppercase text-[var(--r-muted)]">
          {pb.parts.find((p) => p.id === action.partId)?.label} &middot; Action {action.order} of{' '}
          {pb.actions.length}
        </p>
        <h1 className="mt-[var(--s-2)] font-futura text-[length:var(--t-display)] leading-[var(--lh-display)] tracking-[var(--ls-display)] text-[var(--r-navy)]">
          {action.title}
        </h1>
        {/* The deck. It already existed as oneLiner and was buried in the rail;
            on the page it is the sentence that makes you decide to read on. */}
        <p className="mt-[var(--s-2)] font-helvetica text-[length:var(--t-lede)] leading-[var(--lh-lede)] tracking-[var(--ls-lede)] text-[var(--r-muted)]">
          {action.oneLiner}
        </p>
        <p className="mt-[var(--s-2)] font-helvetica text-[length:var(--t-small)] leading-[var(--lh-small)] text-[var(--r-muted)]">
          {action.minutes} min{action.optional ? ' · optional' : ''}
        </p>
      </header>

      <Beat n="01" label="What this changes">
        <ContractStrip contract={action.contract} />
      </Beat>

      <Beat n="02" label="Why this works">
        <Blocks blocks={action.why.blocks} visuals={pb.visuals} />

        {action.why.showing ? (
          <figure className="m-0 mt-[var(--s-4)]">
            <p className="font-helvetica text-[length:var(--t-body)] leading-[var(--lh-body)] tracking-[var(--ls-body)] text-[var(--r-ink)]">
              <Rich text={action.why.showing.lede} />
            </p>
            <div className="mt-[var(--s-3)]">
              <Visual spec={pb.visuals[action.why.showing.visual]} />
            </div>
            {action.why.showing.caption ? (
              <figcaption className="mt-[var(--s-2)] font-helvetica text-[length:var(--t-small)] leading-[var(--lh-small)] tracking-[var(--ls-small)] text-[var(--r-muted)]">
                <Rich text={action.why.showing.caption} />
              </figcaption>
            ) : null}
            {action.why.showing.soWhat?.length ? (
              <div className="mt-[var(--s-3)] flex flex-col gap-[var(--s-2)]">
                {action.why.showing.soWhat.map((line, i) => (
                  <p
                    key={i}
                    className="font-helvetica text-[length:var(--t-body)] leading-[var(--lh-body)] tracking-[var(--ls-body)] text-[var(--r-ink-2)]"
                  >
                    <Rich text={line} />
                  </p>
                ))}
              </div>
            ) : null}
          </figure>
        ) : null}
      </Beat>

      <Beat n="03" label="What you do">
        <div className="border-y border-[var(--r-hair)]">
          {tasks.map((t) => (
            <Disclosure
              key={t.id}
              label={<Rich text={t.label} />}
              meta={t.owner === 'consultico' ? 'We do this' : t.effort}
            >
              {t.why ? <Rich text={t.why} /> : <span>No further detail.</span>}
            </Disclosure>
          ))}
        </div>

        <div className="mt-[var(--s-4)]">
          <ApplyPanel slug={pb.slug} apply={action.task.apply} privacy={pb.privacy} />
        </div>

        {resources.length ? (
          <div className="mt-[var(--s-4)]">
            <p className="font-helvetica text-[length:var(--t-label)] leading-[var(--lh-label)] tracking-[var(--ls-label)] uppercase text-[var(--r-muted)]">
              You&rsquo;ll need
            </p>
            <ul className="mt-[var(--s-2)] flex flex-col gap-[var(--s-1)]">
              {resources.map((r) => (
                <li key={r.id}>
                  <a
                    href={`/r/${pb.slug}/resources?r=${r.id}`}
                    className="font-helvetica text-[length:var(--t-body)] leading-[var(--lh-body)] text-[var(--r-ink)] underline decoration-[var(--r-hair)] underline-offset-4 hover:decoration-[var(--r-ink)]"
                  >
                    {r.title}
                  </a>
                  {r.forWhat ? (
                    <span className="ml-2 font-helvetica text-[length:var(--t-small)] text-[var(--r-muted)]">
                      {r.forWhat}
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {action.task.handoff ? (
          <p className="mt-[var(--s-4)] font-helvetica text-[length:var(--t-body)] leading-[var(--lh-body)] tracking-[var(--ls-body)] text-[var(--r-ink-2)]">
            <Rich text={action.task.handoff} />
          </p>
        ) : null}
      </Beat>

      <div className={styles.measure}>
        <ActionNav slug={pb.slug} action={action} prev={prev} next={next} />
      </div>
    </article>
  );
}
