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
 */
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
      <header>
        <p className="font-helvetica text-[0.68rem] font-semibold tracking-[0.14em] uppercase text-[var(--r-brand)]">
          {action.eyebrow ?? `Action ${action.order}`}
        </p>
        <h1 className="mt-2 font-futura text-[clamp(1.5rem,3.6vw,2.15rem)] leading-tight font-bold text-[var(--r-ink)]">
          {action.title}
        </h1>
        <p className="mt-2 font-helvetica text-[0.8rem] text-[var(--r-muted)]">
          {action.minutes} min{action.optional ? ' · optional' : ''}
        </p>
      </header>

      {/* Beat 1 — what this changes, before any of the client's time is asked for. */}
      <section className="mt-7">
        <p className={styles.beatLabel}>What this changes</p>
        <div className="mt-3">
          <ContractStrip contract={action.contract} />
        </div>
      </section>

      {/* Beat 2 — why it works. */}
      <section className={styles.beat}>
        <p className={styles.beatLabel}>Why this works</p>
        <div className="mt-4">
          <Blocks blocks={action.why.blocks} visuals={pb.visuals} />
        </div>

        {action.why.showing ? (
          <figure className="m-0 mt-8">
            <p className="font-helvetica text-[0.95rem] leading-[1.6] text-[var(--r-ink)]">
              <Rich text={action.why.showing.lede} />
            </p>
            <div className="mt-4">
              <Visual spec={pb.visuals[action.why.showing.visual]} />
            </div>
            {action.why.showing.caption ? (
              <figcaption className="mt-3 font-helvetica text-[0.82rem] leading-snug text-[var(--r-muted)]">
                <Rich text={action.why.showing.caption} />
              </figcaption>
            ) : null}
            {action.why.showing.soWhat?.length ? (
              <div className="mt-4 flex flex-col gap-2">
                {action.why.showing.soWhat.map((line, i) => (
                  <p key={i} className="font-helvetica text-[0.9rem] leading-[1.6] text-[var(--r-ink-2)]">
                    <Rich text={line} />
                  </p>
                ))}
              </div>
            ) : null}
          </figure>
        ) : null}
      </section>

      {/* Beat 3 — what you do. */}
      <section className={styles.beat}>
        <p className={styles.beatLabel}>What you do</p>

        <div className="mt-4 rounded-[10px] border border-[var(--r-hair)] px-4">
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

        <div className="mt-6">
          <ApplyPanel slug={pb.slug} apply={action.task.apply} privacy={pb.privacy} />
        </div>

        {resources.length ? (
          <div className="mt-6">
            <p className="font-helvetica text-[0.75rem] font-semibold tracking-[0.1em] uppercase text-[var(--r-muted)]">
              You&rsquo;ll need
            </p>
            <ul className="mt-2 flex flex-col gap-1.5">
              {resources.map((r) => (
                <li key={r.id}>
                  <a
                    href={`/r/${pb.slug}/resources?r=${r.id}`}
                    className="font-helvetica text-[0.9rem] font-semibold text-[var(--r-brand)] hover:underline"
                  >
                    {r.title}
                  </a>
                  {r.forWhat ? (
                    <span className="ml-2 font-helvetica text-[0.82rem] text-[var(--r-muted)]">
                      {r.forWhat}
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {action.task.handoff ? (
          <p className="mt-6 font-helvetica text-[0.88rem] leading-[1.6] text-[var(--r-ink-2)]">
            <Rich text={action.task.handoff} />
          </p>
        ) : null}
      </section>

      <ActionNav slug={pb.slug} action={action} prev={prev} next={next} />
    </article>
  );
}
