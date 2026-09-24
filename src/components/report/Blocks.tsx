import type { Block, VisualSpec } from '@/lib/reports/content/schema';
import { Rich } from './Rich';
import { Badge, type Tone } from './Primitives';
import { LaneTimeline } from './visuals/LaneTimeline';
import { Journey } from './visuals/Journey';
import { DataTable, FixList, IdeaLoop, SerpMock, SplitBar } from './visuals/More';
import { Disclosure } from './Disclosure';
import { DayStrip, Delta, StatRow } from './visuals/Simple';

/**
 * Renders the `understanding` blocks of a section.
 *
 * Every block type is a fixed shape from the schema. There is no passthrough
 * for arbitrary markup, so a report cannot grow a wall of prose without
 * someone adding a block type on purpose and explaining why.
 */
export function Blocks({
  blocks,
  visuals,
}: {
  blocks: Block[];
  visuals: Record<string, VisualSpec>;
}) {
  return (
    <div className="flex flex-col gap-5">
      {blocks.map((b, i) => (
        <BlockView key={i} block={b} visuals={visuals} />
      ))}
    </div>
  );
}

function BlockView({ block, visuals }: { block: Block; visuals: Record<string, VisualSpec> }) {
  switch (block.t) {
    case 'lede':
      return (
        <p className="font-helvetica text-[clamp(1rem,1.5vw,1.12rem)] leading-[1.6] text-[var(--r-ink)]">
          <Rich text={block.text} />
        </p>
      );

    case 'points':
      return (
        <ul className="flex flex-col gap-2.5">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3">
              <span
                aria-hidden
                className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-[var(--r-brand)]"
              />
              <span className="font-helvetica text-[0.95rem] leading-[1.6] text-[var(--r-ink-2)]">
                <Rich text={item} />
              </span>
            </li>
          ))}
        </ul>
      );

    case 'items':
      // Label visible and scannable; the reasoning one click away.
      return (
        <div className="rounded-[10px] border border-[var(--r-hair)] px-4">
          {block.items.map((item, i) => (
            <Disclosure key={i} label={<Rich text={item.label} />} meta={item.meta}>
              <Rich text={item.why} />
            </Disclosure>
          ))}
        </div>
      );

    case 'callout': {
      const tone: Record<typeof block.tone, string> = {
        insight: 'border-[var(--r-brand)] bg-[var(--r-brand-bg)]',
        warning: 'border-[var(--r-warn)] bg-[var(--r-warn-bg)]',
        brand: 'border-[var(--r-navy)] bg-[var(--r-quiet-bg)]',
      };
      return (
        <div className={`rounded-[10px] border-l-[3px] px-4 py-3.5 ${tone[block.tone]}`}>
          <p className="font-futura text-[0.95rem] font-bold text-[var(--r-ink)]">{block.title}</p>
          <p className="mt-1.5 font-helvetica text-[0.9rem] leading-[1.6] text-[var(--r-ink-2)]">
            <Rich text={block.body} />
          </p>
        </div>
      );
    }

    case 'quote':
      // Words the client says or sends verbatim, so they are set apart from
      // the surrounding explanation and easy to lift.
      return (
        <figure className="m-0 rounded-[10px] border border-dashed border-[var(--r-hair)] px-4 py-4">
          {block.kicker ? (
            <figcaption className="mb-2 font-helvetica text-[0.7rem] font-semibold tracking-[0.12em] uppercase text-[var(--r-muted)]">
              {block.kicker}
            </figcaption>
          ) : null}
          <blockquote className="m-0 flex flex-col gap-2">
            {block.lines.map((line, i) => (
              <p key={i} className="font-helvetica text-[0.95rem] leading-[1.65] text-[var(--r-ink)] italic">
                <Rich text={line} />
              </p>
            ))}
          </blockquote>
        </figure>
      );

    case 'finding': {
      const tone: Record<typeof block.severity, Tone> = {
        keep: 'ok',
        watch: 'warn',
        fix: 'risk',
      };
      const label = { keep: 'Keep', watch: 'Watch', fix: 'Fix' }[block.severity];
      return (
        <div className="rounded-[10px] border border-[var(--r-hair)] p-4">
          <div className="flex flex-wrap items-center gap-3">
            <Badge tone={tone[block.severity]}>{label}</Badge>
            <p className="font-futura text-[0.95rem] font-bold text-[var(--r-ink)]">{block.title}</p>
          </div>
          <p className="mt-2.5 font-helvetica text-[0.9rem] leading-[1.6] text-[var(--r-ink-2)]">
            <Rich text={block.observed} />
          </p>
          <p className="mt-2.5 font-helvetica text-[0.9rem] leading-[1.6] text-[var(--r-ink)]">
            <span className="font-semibold text-[var(--r-brand)]">What we&rsquo;d try: </span>
            <Rich text={block.tryThis} />
          </p>
          {block.detail ? (
            <p className="mt-2 font-helvetica text-[0.85rem] leading-[1.6] text-[var(--r-muted)]">
              <Rich text={block.detail} />
            </p>
          ) : null}
        </div>
      );
    }

    case 'pair':
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          {[block.left, block.right].map((half, i) => (
            <div key={i} className="rounded-[10px] bg-[var(--r-canvas)] p-4">
              <p className="font-futura text-[0.9rem] font-bold text-[var(--r-ink)]">{half.title}</p>
              <p className="mt-1.5 font-helvetica text-[0.88rem] leading-[1.6] text-[var(--r-ink-2)]">
                <Rich text={half.body} />
              </p>
            </div>
          ))}
        </div>
      );

    case 'draft':
      // Copy the client lifts as-is, so it reads as a specimen, not as prose.
      return (
        <div className="rounded-[10px] bg-[var(--r-canvas)] p-4">
          <p className="mb-2 font-helvetica text-[0.7rem] font-semibold tracking-[0.12em] uppercase text-[var(--r-muted)]">
            {block.kicker}
          </p>
          {block.lines.map((line, i) => (
            <p
              key={i}
              className="font-helvetica text-[0.92rem] leading-[1.6] text-[var(--r-ink)] first:mt-0 mt-2"
            >
              <Rich text={line} />
            </p>
          ))}
        </div>
      );

    case 'figure': {
      const spec = visuals[block.visual];
      if (!spec) return null;
      return (
        <figure className="m-0">
          <Visual spec={spec} />
          {block.caption ? (
            <figcaption className="mt-3 font-helvetica text-[0.82rem] leading-snug text-[var(--r-muted)]">
              <Rich text={block.caption} />
            </figcaption>
          ) : null}
        </figure>
      );
    }
  }
}

/**
 * Dispatches a visual spec to its component.
 *
 * Unimplemented kinds throw in development so an authored report cannot
 * quietly render a gap, and render nothing in production, because a missing
 * figure is a poor client experience but a thrown error is a worse one.
 */
export function Visual({ spec }: { spec: VisualSpec }) {
  switch (spec.t) {
    case 'lane-timeline':
      return <LaneTimeline spec={spec} />;
    case 'journey':
      return <Journey spec={spec} />;
    case 'split-bar':
      return <SplitBar spec={spec} />;
    case 'idea-loop':
      return <IdeaLoop spec={spec} />;
    case 'serp':
      return <SerpMock spec={spec} />;
    case 'fix-list':
      return <FixList spec={spec} />;
    case 'table':
      return <DataTable spec={spec} />;
    case 'day-strip':
      return <DayStrip spec={spec} />;
    case 'delta':
      return <Delta spec={spec} />;
    case 'stat-row':
      return <StatRow spec={spec} />;
    default:
      if (process.env.NODE_ENV !== 'production') {
        throw new Error(
          `Report visual "${spec.t}" has no renderer yet. Either build it or do not author it.`,
        );
      }
      return null;
  }
}
