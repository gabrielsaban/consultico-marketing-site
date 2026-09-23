/**
 * The shape of a client report.
 *
 * A ReportDoc is authored as JSON outside this repository, validated, then
 * sealed into content/reports/<slug>.report.enc. Nothing here is client data —
 * these are types only, and the file is safe to be public.
 *
 * TWO RULES THIS SCHEMA EXISTS TO ENFORCE
 *
 * 1. Sparseness. The report this replaced was 5,300 words of prose. The whole
 *    point of the rebuild is that it says less, so there is deliberately no
 *    free-form HTML or markdown blob anywhere below. An escape hatch is how a
 *    "sparse, visual" report quietly becomes long-form prose again in three
 *    months. If something cannot be expressed in these blocks, that is a
 *    signal to cut it, or to add a block type on purpose.
 *
 * 2. Honesty. A dashboard shell signals "this is measured". Most of what a
 *    diagnosis contains is not a measurement, and an analytics-styled frame
 *    makes it very easy to imply readings that do not exist. Several types
 *    below are shaped specifically to make that impossible rather than merely
 *    discouraged — see Outcome and SplitBarVisual.
 */

/** Bumped when a change would break an already-sealed report. See `Renderer`. */
export const REPORT_SCHEMA = 'consultico.report/1' as const;

/**
 * Inline text with exactly two conventions:
 *   **bold**        emphasis
 *   [[placeholder]] a value the client fills in — renders as an amber chip,
 *                   matching the [First name] / £X treatment in the original
 *
 * Not markdown, and not HTML. Two conventions can be rendered safely without a
 * parser or a sanitiser; a markdown blob cannot, and would reopen rule 1.
 */
export type RichText = string;

/* ----------------------------------------------------------------- blocks */

/** What the client needs to understand in a section. */
export type Block =
  /** The one-sentence point of the section. At most one per section. */
  | { t: 'lede'; text: RichText }
  /** Up to five. More than five is prose wearing a list's clothes. */
  | { t: 'points'; items: RichText[] }
  | { t: 'callout'; tone: 'insight' | 'warning' | 'brand'; title: string; body: RichText }
  /** Verbatim words for the client to say or send — the closing script. */
  | { t: 'quote'; kicker?: string; lines: RichText[] }
  | {
      t: 'finding';
      severity: 'keep' | 'watch' | 'fix';
      title: string;
      observed: RichText;
      tryThis: RichText;
      detail?: RichText;
    }
  /** Two things side by side — "why not just Notion?" */
  | { t: 'pair'; left: Half; right: Half }
  /** Copy the client can lift: a headline, an About opening. */
  | { t: 'draft'; kicker: string; lines: RichText[] }
  /** Places a visual from doc.visuals inline in the reading order. */
  | { t: 'figure'; visual: string; caption?: RichText };

export type Half = { title: string; body: RichText };

/* ---------------------------------------------------------------- visuals */

export type VisualSpec =
  | LaneTimelineVisual
  | DayStripVisual
  | DeltaVisual
  | JourneyVisual
  | SplitBarVisual
  | SerpVisual
  | FixListVisual
  | IdeaLoopVisual
  | PipelineVisual
  | StatRowVisual
  | TableVisual;

/**
 * Events across parallel lanes over a fixed window, with switchable states —
 * the before/after comparison becomes an interaction rather than two charts.
 * `at` is a percentage across the window, which is how the source already
 * encoded it.
 */
export type LaneTimelineVisual = {
  t: 'lane-timeline';
  states: {
    id: string;
    label: string;
    counters: { value: string; label: string }[];
    lanes: {
      name: string;
      events: { at: number; kind: string; label?: string }[];
      /** A stretch of the window with nothing in it, as [from, to] percentages. */
      void?: [number, number];
    }[];
    axis: { at: number; label: string }[];
    legend: { kind: string; label: string }[];
    rows?: { when: string; kind: string; text: RichText; actor: Actor }[];
  }[];
};

export type Actor = 'you' | 'automatic' | 'ambient';

/** A unit chart: N cells, some filled. Honest only when N is small and real. */
export type DayStripVisual = {
  t: 'day-strip';
  days: number;
  filled: { day: number; label: string }[];
  caption: RichText;
};

/**
 * One value becoming another. Values are strings, not numbers, because a real
 * one may be a range ("8–11") and rendering a range as a bar would imply a
 * precision it does not have.
 */
export type DeltaVisual = {
  t: 'delta';
  from: { value: string; label: string };
  to: { value: string; label: string };
  note?: RichText;
};

export type JourneyVisual = {
  t: 'journey';
  nodes: { label: string; sub: string; state: 'ok' | 'risk' | 'neutral' }[];
};

/**
 * A proportion bar.
 *
 * `basis` is the load-bearing field. 70/30 in this report is a rule the client
 * should follow, not a measurement of what they currently do. The component
 * renders each differently and captions them differently, so a target can
 * never be read as a reading.
 */
export type SplitBarVisual = {
  t: 'split-bar';
  parts: { label: string; pct: number; tone: 'value' | 'sell' }[];
  basis: 'rule' | 'measured';
  note?: RichText;
};

/** What someone sees when they search for the client. Not a chart — a mock. */
export type SerpVisual = {
  t: 'serp';
  query: string;
  results: {
    source: string;
    title: string;
    note: RichText;
    verdict: 'refresh' | 'sharpen' | 'retire' | 'keep' | 'leave';
  }[];
};

export type FixStatus = 'have' | 'update' | 'add' | 'reorder' | 'build';

export type FixListVisual = {
  t: 'fix-list';
  groups: { title: string; items: { label: string; note?: string; status: FixStatus }[] }[];
};

export type IdeaLoopVisual = {
  t: 'idea-loop';
  steps: { label: string; body: string; gate?: boolean }[];
};

/**
 * Stages with their steps. Deliberately not a funnel: there are no volumes at
 * each stage, and a funnel would imply conversion data that does not exist.
 */
export type PipelineVisual = {
  t: 'pipeline';
  stages: {
    name: string;
    sub: string;
    countLabel: string;
    trigger: string;
    cards?: { name: string; note: string }[];
    steps: { actor: 'auto' | 'you' | 'branch'; label: RichText; when: string }[];
  }[];
};

/**
 * Plain figures with context.
 *
 * Note there is no `trend` or `delta` field, and this is on purpose. The
 * dashboard idiom this borrows from puts a percentage pill and a sparkline on
 * every tile. There is not one time series in this report, so a sparkline
 * could only ever be decoration — and a field that exists will eventually be
 * filled in. The absence is the guard.
 */
export type StatRowVisual = {
  t: 'stat-row';
  stats: { value: string; label: string; note?: string }[];
};

export type Cell = string | { text: RichText; tone?: 'ok' | 'warn' | 'quiet' };

export type TableVisual = {
  t: 'table';
  columns: string[];
  rows: Cell[][];
  note?: RichText;
};

/* --------------------------------------------------------------- sections */

export type SectionKind = 'orientation' | 'diagnosis' | 'recommendation' | 'operations' | 'aside';

export type Section = {
  id: string;
  order: number;
  kind: SectionKind;
  /** "Recommendation 1" */
  eyebrow?: string;
  title: string;
  /** One line, shown on the index card. Not a summary — a reason to open it. */
  oneLiner: string;
  minutes?: number;
  /** Shown collapsed and skippable. Never gated — see the navigation note. */
  optional?: boolean;
  /** The effort / impact strip. */
  meta?: { label: string; value: string }[];
  understanding: Block[];
  /** Keys into doc.visuals, in render order. */
  visuals?: string[];
  /** Ids into doc.plan.tasks — "the tasks for this section". */
  taskIds?: string[];
  /** Ids into doc.resources — "its resources". */
  resourceIds?: string[];
  video?: VideoEmbed;
  nextStep?: { label: string; body: RichText };
};

/**
 * youtube-nocookie by default, and the /r/ route sends Referrer-Policy:
 * no-referrer, so embedding a video does not hand the private report URL to
 * the video host.
 */
export type VideoEmbed = {
  provider: 'youtube-nocookie' | 'vimeo' | 'mux';
  id: string;
  title: string;
  seconds?: number;
};

/* -------------------------------------------------------------- resources */

export type Resource = {
  id: string;
  title: string;
  blurb: string;
  /**
   * inline   sits in the section, expandable
   * drawer   a side sheet that can stay open while the client works
   * overlay  a full modal, for something that would swamp the section
   */
  presentation: 'inline' | 'drawer' | 'overlay';
  body: ResourceBody;
};

export type ResourceBody =
  | {
      kind: 'email-thread';
      emails: {
        id: string;
        when: string;
        subject: string;
        preview: string;
        body: RichText[];
        notes: { title: string; why: RichText }[];
      }[];
    }
  | { kind: 'findings'; findings: Extract<Block, { t: 'finding' }>[] }
  | { kind: 'panels'; panels: { title: string; items: string[]; wide?: boolean }[] }
  | {
      kind: 'worksheet';
      columns: string[];
      exampleRow: string[];
      note: RichText;
      prompts: { title: string; items: string[] }[];
    }
  | { kind: 'table'; columns: string[]; rows: Cell[][]; note?: RichText };

/* ------------------------------------------------------------------- plan */

/**
 * Effort and owner are separate fields because the source conflated them: one
 * task's "effort" was literally the string "Consultico", which is who does it,
 * not how long it takes.
 *
 * Effort stays a free string. "2 min", "half a day" and "weekly" are not
 * commensurable, so they are never summed or charted — there is no honest
 * "total effort" figure to compute from them.
 */
export type Task = {
  id: string;
  phase: string;
  label: RichText;
  effort: string;
  owner: 'client' | 'consultico';
  /** The section this task belongs to, so the plan and the sections agree. */
  sectionId?: string;
};

export type Plan = {
  horizonDays: number;
  phases: { id: string; label: string; note?: string }[];
  tasks: Task[];
};

/* --------------------------------------------------------------- outcomes */

/**
 * How we will know it worked.
 *
 * `baseline` is typed as the literal `null`, not `number | null`. That is the
 * whole point: these four measures are named, defined and directional, but no
 * values for them exist yet. Typing it this way means no author can supply a
 * figure and no component can render one, so the dashboard cannot imply a
 * reading it does not have.
 *
 * When real baselines arrive, that is a schema v2 that widens this field and
 * gives the component a second state — a deliberate, versioned change, rather
 * than a slow slide into invented numbers.
 *
 * `source` and `metricKey` are the seam for live data later. They describe
 * where a figure would come from; they never carry one.
 */
export type Outcome = {
  id: string;
  label: string;
  definition: string;
  direction: 'up' | 'down';
  baseline: null;
  measureFrom: string;
  source: 'crm' | 'ga4' | 'ads' | 'manual' | null;
  metricKey?: string;
};

/* ------------------------------------------------------------------- root */

/** A figure for the top strip. Only things the report actually establishes. */
export type Headline = { value: string; label: string; note?: string };

export type ReportDoc = {
  schema: typeof REPORT_SCHEMA;
  slug: string;
  client: { name: string; org?: string };
  title: string;
  subtitle?: string;
  /** ISO date. */
  issued: string;
  preparedBy: string;
  /** One sentence: what we looked at. */
  brief: string;
  /** The TL;DR. Two to four sentences. */
  summary: RichText[];
  headlines: Headline[];
  sections: Section[];
  visuals: Record<string, VisualSpec>;
  resources: Resource[];
  plan: Plan;
  outcomes: Outcome[];
  /** Asked of the client up front, because the outcomes have no baselines yet. */
  baselineRequest?: { title: string; body: RichText };
};
