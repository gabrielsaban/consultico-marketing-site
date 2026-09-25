import type { Contract } from '@/lib/reports/content/playbook';
import { Rich } from '../report/Rich';
import { Badge, type Tone } from '../report/Primitives';

/**
 * What this action changes, before it asks for any of the client's time.
 *
 * NO BOX. This used to sit in a bordered, tinted panel, which made the page's
 * value proposition look like a sidebar — and put it in the same visual class
 * as an editorial callout that was, absurdly, louder. It is the most important
 * sentence on the page, so it is set as the largest text on the page beneath
 * the title, and nothing else.
 *
 * Impact is an enum, never a number. There is no measurement behind it in this
 * document, so a percentage would be fabricated, and a fabricated return is
 * the fastest way to lose a client who checks.
 */

const IMPACT: Record<Contract['impact'], { label: string; tone: Tone }> = {
  foundational: { label: 'Everything else builds on this', tone: 'quiet' },
  high: { label: 'Biggest single change', tone: 'ok' },
  compounding: { label: 'Compounds over months', tone: 'ok' },
  housekeeping: { label: 'Housekeeping', tone: 'quiet' },
};

export function ContractStrip({ contract }: { contract: Contract }) {
  const impact = IMPACT[contract.impact];

  return (
    <div>
      <p className="font-helvetica text-[length:var(--t-lede)] leading-[var(--lh-lede)] tracking-[var(--ls-lede)] text-[var(--r-ink)]">
        <Rich text={contract.gives} />
      </p>

      <dl className="mt-[var(--s-3)] flex flex-wrap items-baseline gap-x-[var(--s-4)] gap-y-[var(--s-2)]">
        <div>
          <dt className="font-helvetica text-[length:var(--t-label)] leading-[var(--lh-label)] tracking-[var(--ls-label)] uppercase text-[var(--r-muted)]">
            Effort
          </dt>
          <dd className="mt-0.5 font-helvetica text-[length:var(--t-small)] leading-[var(--lh-small)] text-[var(--r-ink)]">
            {contract.effort}
          </dd>
        </div>
        <div>
          <dt className="font-helvetica text-[length:var(--t-label)] leading-[var(--lh-label)] tracking-[var(--ls-label)] uppercase text-[var(--r-muted)]">
            Impact
          </dt>
          <dd className="mt-0.5">
            <Badge tone={impact.tone}>{impact.label}</Badge>
          </dd>
        </div>
        {contract.needs ? (
          <div>
            <dt className="font-helvetica text-[length:var(--t-label)] leading-[var(--lh-label)] tracking-[var(--ls-label)] uppercase text-[var(--r-muted)]">
              Needs
            </dt>
            <dd className="mt-0.5 font-helvetica text-[length:var(--t-small)] leading-[var(--lh-small)] text-[var(--r-ink-2)]">
              {contract.needs}
            </dd>
          </div>
        ) : null}
      </dl>
    </div>
  );
}
