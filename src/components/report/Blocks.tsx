import type { Block, VisualSpec } from '@/lib/reports/content/schema';
import { Rich } from './Rich';
import { Badge, type Tone } from './Primitives';
import { LaneTimeline } from './visuals/LaneTimeline';
import { Journey } from './visuals/Journey';
import { DataTable, FixList, IdeaLoop, SerpMock, SplitBar } from './visuals/More';
import { DayStrip, Delta, StatRow } from './visuals/Simple';
import { Disclosure } from './Disclosure';
import styles from './report.module.css';

/**
 * Renders the `understanding` blocks of a section or action.
 *
 * Every block type is a fixed shape from the schema. There is no passthrough
 * for arbitrary markup, so a report cannot grow a wall of prose without
 * someone adding a block type on purpose and explaining why.
 *
 * THIS COMPONENT IS THE MEASURE GRID. Children sit in the text column by
 * default and opt out with `.bleed`. It has to be here rather than on an
 * ancestor because a flex or block child cannot opt into a grandparent's grid,
 * and this is the nearest common parent of the content.
 *
 * On elevation: the default is nothing. Prose sits on the canvas. A box is
 * spent only where the content is genuinely set apart — a verbatim script, a
 * specimen to lift — and never on structure, which is carried by rules and
 * space instead.
 */
export function Blocks({
  blocks,
  visuals,
}: {
  blocks: Block[];
  visuals: Record<string, VisualSpec>;
}) {
  return (
    <div className={styles.measure} style={{ rowGap: 'var(--s-3)' }}>
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
        <p className="font-helvetica text-[length:var(--t-lede)] leading-[var(--lh-lede)] tracking-[var(--ls-lede)] text-[var(--r-ink)]">
          <Rich text={block.text} />
        </p>
      );

    case 'points':
      return (
        <ul className="flex flex-col gap-[var(--s-1)]">
          {block.items.map((item, i) => (
            // A hairline down the left, not a dot. At 3px a square reads as
            // a stray mark; at 6px a dot needs colour to justify itself, and
            // blue is reserved for things you can act on.
            <li key={i} className="border-l border-[var(--r-hair)] pl-[var(--s-2)]">
              <span className="font-helvetica text-[length:var(--t-body)] leading-[var(--lh-body)] tracking-[var(--ls-body)] text-[var(--r-ink-2)]">
                <Rich text={item} />
              </span>
            </li>
          ))}
        </ul>
      );

    case 'items':
      // Hairline rules, no container. The box this used to carry was
      // byte-identical to the one around the task list, so a reader could not
      // tell "reference detail" from "things you must do".
      return (
        <div className="border-y border-[var(--r-hair)]">
          {block.items.map((item, i) => (
            <Disclosure key={i} label={<Rich text={item.label} />} meta={item.meta}>
              <Rich text={item.why} />
            </Disclosure>
          ))}
        </div>
      );

    case 'callout': {
      // Demoted, deliberately. This used to carry a 3px brand edge and a
      // tinted fill, which made an editorial aside the loudest thing on the
      // page — louder than the action's own value proposition. A 2px rule in
      // ink-2 keeps it distinct without letting it outrank the structure.
      const rule: Record<typeof block.tone, string> = {
        insight: 'border-[var(--r-ink-2)]',
        warning: 'border-[var(--r-warn)]',
        brand: 'border-[var(--r-navy)]',
      };
      return (
        <div className={`border-l-2 pl-[var(--s-2)] ${rule[block.tone]}`}>
          <p className="font-futura text-[length:var(--t-strong)] leading-[var(--lh-strong)] text-[var(--r-ink)]">
            {block.title}
          </p>
          <p className="mt-[var(--s-1)] font-helvetica text-[length:var(--t-body)] leading-[var(--lh-body)] tracking-[var(--ls-body)] text-[var(--r-ink-2)]">
            <Rich text={block.body} />
          </p>
        </div>
      );
    }

    case 'quote':
      // Words the client says or sends verbatim. A tint panel sets it apart —
      // the dashed border was a third border notation for one site, and the
      // italic was synthetic oblique on a face that has no italic cut.
      return (
        <figure
          className="m-0 rounded-[var(--radius)] bg-[var(--r-tint)] px-[var(--s-3)] py-[var(--s-3)]"
        >
          {block.kicker ? (
            <figcaption className="mb-[var(--s-2)] font-helvetica text-[length:var(--t-label)] leading-[var(--lh-label)] tracking-[var(--ls-label)] uppercase text-[var(--r-muted)]">
              {block.kicker}
            </figcaption>
          ) : null}
          <blockquote className="m-0 flex flex-col gap-[var(--s-2)]">
            {block.lines.map((line, i) => (
              <p
                key={i}
                className="font-helvetica text-[length:var(--t-lede)] leading-[var(--lh-lede)] tracking-[var(--ls-lede)] text-[var(--r-ink)]"
              >
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
        <div className="border-y border-[var(--r-hair)] py-[var(--s-3)]">
          <div className="flex flex-wrap items-center gap-3">
            <Badge tone={tone[block.severity]}>{label}</Badge>
            <p className="font-futura text-[length:var(--t-strong)] leading-[var(--lh-strong)] text-[var(--r-ink)]">
              {block.title}
            </p>
          </div>
          <p className="mt-[var(--s-2)] font-helvetica text-[length:var(--t-body)] leading-[var(--lh-body)] tracking-[var(--ls-body)] text-[var(--r-ink-2)]">
            <Rich text={block.observed} />
          </p>
          <p className="mt-[var(--s-2)] font-helvetica text-[length:var(--t-body)] leading-[var(--lh-body)] tracking-[var(--ls-body)] text-[var(--r-ink)]">
            <span className="font-futura">What we&rsquo;d try: </span>
            <Rich text={block.tryThis} />
          </p>
          {block.detail ? (
            <p className="mt-[var(--s-1)] font-helvetica text-[length:var(--t-small)] leading-[var(--lh-small)] tracking-[var(--ls-small)] text-[var(--r-muted)]">
              <Rich text={block.detail} />
            </p>
          ) : null}
        </div>
      );
    }

    case 'pair':
      // Was --r-canvas, which is the page. These rendered as padded text with
      // no visible container at all.
      return (
        <div className={`${styles.bleed} grid gap-[var(--s-2)] sm:grid-cols-2`}>
          {[block.left, block.right].map((half, i) => (
            <div key={i} className="rounded-[var(--radius)] bg-[var(--r-tint)] p-[var(--s-3)]">
              <p className="font-futura text-[length:var(--t-strong)] leading-[var(--lh-strong)] text-[var(--r-ink)]">
                {half.title}
              </p>
              <p className="mt-[var(--s-1)] font-helvetica text-[length:var(--t-body)] leading-[var(--lh-body)] tracking-[var(--ls-body)] text-[var(--r-ink-2)]">
                <Rich text={half.body} />
              </p>
            </div>
          ))}
        </div>
      );

    case 'draft':
      // Copy the client lifts as-is, so it reads as a specimen, not as prose.
      return (
        <div className="rounded-[var(--radius)] bg-[var(--r-tint)] p-[var(--s-3)]">
          <p className="mb-[var(--s-2)] font-helvetica text-[length:var(--t-label)] leading-[var(--lh-label)] tracking-[var(--ls-label)] uppercase text-[var(--r-muted)]">
            {block.kicker}
          </p>
          {block.lines.map((line, i) => (
            <p
              key={i}
              className="mt-[var(--s-1)] font-helvetica text-[length:var(--t-body)] leading-[var(--lh-body)] tracking-[var(--ls-body)] text-[var(--r-ink)] first:mt-0"
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
        <figure className={`${styles.bleed} m-0`}>
          <Visual spec={spec} />
          {block.caption ? (
            // Back inside the measure, left-aligned to the text edge. This one
            // detail is most of what makes a wide figure read as belonging to
            // a document rather than to a dashboard.
            <figcaption className="mx-auto mt-[var(--s-2)] max-w-[var(--measure)] font-helvetica text-[length:var(--t-small)] leading-[var(--lh-small)] tracking-[var(--ls-small)] text-[var(--r-muted)]">
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
          `Report visual "${(spec as VisualSpec).t}" has no renderer yet. Either build it or do not author it.`,
        );
      }
      return null;
  }
}
