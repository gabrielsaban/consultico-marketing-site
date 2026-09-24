import type { Contract } from '@/lib/reports/content/playbook';
import { Rich } from '../report/Rich';
import { Badge, type Tone } from '../report/Primitives';

/**
 * What this action changes, before it asks for any of the client's time.
 *
 * The source report already does this well — "Effort: half a day to write ·
 * Impact on Call 2: the biggest of the three" — and it is the device that makes
 * an action justify itself to a founder deciding whether to bother.
 *
 * Impact is an enum, never a number. There is no measurement behind it in this
 * document, so a percentage would be fabricated, and a fabricated return is the
 * fastest way to lose a client who checks.
 */

const IMPACT: Record<Contract['impact'], { label: string; tone: Tone }> = {
  foundational: { label: 'Everything else builds on this', tone: 'brand' },
  high: { label: 'Biggest single change', tone: 'ok' },
  compounding: { label: 'Compounds over months', tone: 'ok' },
  housekeeping: { label: 'Housekeeping', tone: 'quiet' },
};

export function ContractStrip({ contract }: { contract: Contract }) {
  const impact = IMPACT[contract.impact];

  return (
    <div className="rounded-[12px] border border-[var(--r-hair)] bg-[var(--r-canvas)] p-5">
      <p className="font-helvetica text-[clamp(0.98rem,1.5vw,1.1rem)] leading-[1.55] text-[var(--r-ink)]">
        <Rich text={contract.gives} />
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
        <span>
          <span className="font-helvetica text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[var(--r-muted)]">
            Effort
          </span>
          <span className="ml-2 font-helvetica text-[0.88rem] font-medium text-[var(--r-ink)]">
            {contract.effort}
          </span>
        </span>
        <Badge tone={impact.tone}>{impact.label}</Badge>
        {contract.needs ? (
          <span className="font-helvetica text-[0.8rem] text-[var(--r-muted)]">
            Needs: {contract.needs}
          </span>
        ) : null}
      </div>
    </div>
  );
}
