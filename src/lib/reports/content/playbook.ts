import type {
  Block,
  Cell,
  Headline,
  Outcome,
  Plan,
  Resource,
  RichText,
  VideoEmbed,
  VisualSpec,
} from './schema';

/**
 * A client playbook.
 *
 * WHAT THIS IS, AND WHAT IT DELIBERATELY IS NOT
 *
 * It is not a course and the client is not a student. He is a peer who paid for
 * strategy. "Lesson" imports a teacher/student asymmetry that is wrong on the
 * facts and wrong commercially — it reframes work someone commissioned as
 * instruction they receive. So: a **playbook**, made of **parts**, made of
 * **actions**. The words lesson, course, module, student, learner, curriculum
 * and quiz do not appear in this file or in anything rendered from it.
 *
 * WHY A SECOND DOCUMENT TYPE RATHER THAN RESHAPING ReportDoc
 *
 * Discriminated on `schema`, not on the envelope's `payload`. A third payload
 * value would mean touching crypto.ts, store.ts's candidate list and the seal
 * script's extension sniff, and re-sealing a live document to prove nothing
 * broke. Branching on a field already present in every sealed document costs
 * one `if` in the page and leaves the crypto path untouched. ReportDoc and its
 * Section type stay exactly as they are, and the report already sealed against
 * them keeps opening through the identical code path.
 *
 * THE RHYTHM, AND WHY THE ORDER IS WHAT IT IS
 *
 * Every action runs three beats, in this order:
 *
 *   1. contract   what this changes — the return, before anything is asked
 *   2. why        the reasoning, with the client's own figures as the example
 *   3. task       what to do, plus a prompt that applies it to their business
 *
 * Impact leads because we are asking a founder for half a day of their time. A
 * teacher explains and then sets work; a peer states the return and lets you
 * decide. Reordering these beats would quietly turn the deliverable back into
 * a lecture.
 */

export const PLAYBOOK_SCHEMA = 'consultico.playbook/1' as const;

/* ------------------------------------------------------------------ the root */

export type Playbook = {
  schema: typeof PLAYBOOK_SCHEMA;
  slug: string;
  client: { name: string; org?: string };
  title: string;
  subtitle?: string;
  /** ISO date. */
  issued: string;
  preparedBy: string;
  brief: string;

  /** The situation. Not an action — you do not "do" a diagnosis. */
  opening: Opening;
  parts: Part[];
  /**
   * Flat and globally ordered; part membership is by `partId`.
   *
   * Not nested inside parts, because the rail, prev/next, the `?a=` lookup,
   * "continue where you left off" and the plan's progress count all want one
   * ordered list. Nesting would force a flatten at five call sites.
   */
  actions: Action[];
  /** Placed last. Its job is relief, which only lands once the work is known. */
  closing?: Closing;

  visuals: Record<string, VisualSpec>;
  resources: Resource[];
  plan: Plan;
  outcomes: Outcome[];
  baselineRequest?: { title: string; body: RichText };

  config: PlaybookConfig;
  /** Required. A playbook that stores what a client writes cannot seal without one. */
  privacy: PrivacyNotice;
};

/* ---------------------------------------------------------------- the opening */

export type Opening = {
  title: string;
  /** Two to four sentences. The whole argument, before anything is opened. */
  summary: RichText[];
  /** Only figures the document actually establishes. Never a target dressed as a reading. */
  headlines: Headline[];
  blocks: Block[];
  /** "Seven actions, two to three minutes each. Nothing is locked." */
  howItWorks: RichText;
};

export type Closing = {
  title: string;
  /** Lead with the relief, not with a product name. */
  blocks: Block[];
};

/* ------------------------------------------------------------------ the parts */

/** Presentation grouping only. Carries no content of its own. */
export type Part = {
  id: string;
  order: number;
  /** "Part 1" */
  label: string;
  /** "The fortnight" */
  title: string;
  blurb?: string;
};

/* ---------------------------------------------------------------- the actions */

export type Action = {
  /** URL-visible and stable — it goes in `?a=`. Renaming breaks a pasted link. */
  id: string;
  partId: string;
  /** Global order across the whole playbook, dense from 1. */
  order: number;
  eyebrow?: string;
  title: string;
  /** A reason to open it, not a summary of it. Capped at 18 words. */
  oneLiner: string;
  /** Required. "Two to three minutes" is a promise; the validator caps it at 5. */
  minutes: number;

  contract: Contract;
  why: Why;
  task: DoThis;

  resourceIds?: string[];
  optional?: boolean;
};

/**
 * The contract strip, at the top of every action.
 *
 * The source report does this well already — "Effort: half a day to write ·
 * Impact on Call 2: the biggest of the three" — and it is the device that makes
 * an action justify the time it asks for.
 */
export type Contract = {
  /** What this changes, in the client's terms. Capped at 25 words. */
  gives: RichText;
  /** "Half a day, once." A free string, and never summed — see Task.effort. */
  effort: string;
  /**
   * An enum, never a number and never a percentage.
   *
   * There is no measurement behind "impact" in this document — the four success
   * measures have no baselines. Anything scalar here would be the same lie that
   * StatTile refuses to tell by having no `trend` prop. Comparative and honest,
   * or nothing.
   */
  impact: 'foundational' | 'high' | 'compounding' | 'housekeeping';
  /** An honest caveat. "Needs the email pack open." */
  needs?: string;
};

/** Beat two: the reasoning. This is the part the client paid for. */
export type Why = {
  video?: PlaybookVideo;
  /**
   * Required and non-empty **even when a video is present**.
   *
   * This is the rule that makes "actions work fully without a video" a checked
   * property rather than an intention. Without it, actions get authored thin on
   * the promise that a recording will carry them, and then the recording never
   * happens.
   */
  blocks: Block[];
  /** The idea shown in the client's own figures. Optional — see `Showing`. */
  showing?: Showing;
};

/**
 * The worked example.
 *
 * `visual` is a required string rather than a loose Block[], so this beat is
 * structurally incapable of drifting into paragraphs.
 *
 * The whole beat is optional, deliberately. Not every action has an honest
 * figure behind it, and a two-beat action is far better than a fabricated
 * chart. Resist any temptation to make this required for the sake of rhythm.
 */
export type Showing = {
  lede: RichText;
  /** Key into playbook.visuals. */
  visual: string;
  caption?: RichText;
  /** At most two lines of "so what". */
  soWhat?: RichText[];
};

/**
 * VideoEmbed widened. youtube-nocookie by default, and /r/ sends
 * Referrer-Policy: no-referrer, so embedding never hands the private playbook
 * URL to the video host.
 */
export type PlaybookVideo = VideoEmbed & {
  /** Served from /public. The iframe loads only on click, so an unwatched
   *  action sends nothing to the video host at all. */
  poster?: string;
  /** Required when a video exists: the video must never be the only carrier
   *  of a point. */
  transcriptSummary: RichText;
};

/** Beat three: what to do. */
export type DoThis = {
  /** Ids into playbook.plan.tasks. One to three. */
  taskIds: string[];
  apply: ApplyPrompt;
  /** "Next: the ambient layer — because the emails only cover the fortnight." */
  handoff?: RichText;
};

/* ------------------------------------------------------------ the apply prompt */

/**
 * How we check understanding without testing it.
 *
 * No quizzes. A multiple-choice check on whether a client understood his own
 * consultant's report reads as patronising, and this material cannot support
 * more than a handful of questions that are not trivially guessable. A prompt
 * that makes someone *use* the idea on their own business proves engagement
 * better and produces something the consultant can actually read.
 */
export type ApplyPrompt = {
  /** Stable — this is the key of the saved answer. Renaming orphans an answer. */
  id: string;
  title: string;
  prompt: RichText;
  /**
   * A literal, not a boolean and not optional. There is one visibility model
   * and the client is told it plainly. Widening this is a schema v2 decision.
   */
  visibility: 'consultant-reads';
  field: ApplyField;
};

export type ApplyField =
  /** The default. "Write your version of the closing line." */
  | {
      kind: 'writing';
      placeholder?: string;
      minWords?: number;
      /** Required, capped at 250. A prompt that invites an essay gets no answer. */
      maxWords: number;
      /** Ours. Behind a disclosure, so it cannot anchor before they write. */
      exemplar?: RichText[];
    }
  /** "Search your own name. List the first five results and mark each one." */
  | {
      kind: 'list';
      rows: number;
      rowLabel: string;
      maxWordsPerRow: number;
      /** Per-row classification — the same verb SerpVisual.verdict already uses. */
      verdicts?: { id: string; label: string }[];
    }
  /** "Sort these subject lines into three buckets." */
  | {
      kind: 'sort';
      items: { id: string; text: RichText }[];
      buckets: { id: string; label: string; hint?: string }[];
      /** Revealed only once every item is placed. */
      key?: { itemId: string; bucketId: string; because: RichText }[];
    }
  /** The cheap one, for an action that should not cost ten minutes. */
  | {
      kind: 'pick';
      options: { id: string; label: string }[];
      reasonLabel: string;
      maxWords: number;
    };

/** What gets stored. Carries its own kind, so a re-authored prompt can never
 *  render an old answer into the wrong widget. */
export type ApplyAnswer =
  | { kind: 'writing'; text: string }
  | { kind: 'list'; rows: { text: string; verdictId?: string }[] }
  | { kind: 'sort'; placements: Record<string, string> }
  | { kind: 'pick'; optionId: string; reason: string };

/* ----------------------------------------------------------- config and notice */

export type PlaybookConfig = {
  /**
   * 'open'       every action reachable always. What ships.
   * 'sequential' the next action opens when the current one is complete.
   *
   * Both are implemented from day one, so flipping this is a data change rather
   * than a rewrite. That is only true if every navigation surface asks
   * `reachableActions()` rather than deciding for itself — see playbook-nav.ts.
   */
  navigation: 'open' | 'sequential';
  /** What "complete" means. Required even while gating is off, because it is
   *  also what the rail ticks and what the plan counts. */
  completion: 'visited' | 'marked' | 'applied';
  showProgress: boolean;
};

/**
 * Free text a client writes is the only personal data in this system. Slugs,
 * action ids and booleans are opaque; "write your version of the closing line"
 * will contain their client's name, their prices, their pipeline.
 *
 * So the notice is required by the type. A playbook cannot be sealed without
 * one, and it says *when* it is read — "Paul reads these before your next
 * session" makes people write properly, where "may be read" makes people write
 * nothing.
 */
export type PrivacyNotice = {
  /** Capped at 20 words. Shown verbatim above every apply field. */
  short: string;
  body: RichText[];
  /**
   * Both describe what happens to an answer once it leaves the browser, so
   * both are optional while nothing does. When the progress endpoint ships,
   * fill them in — and say who reads a note and when, because "may be read"
   * makes people write nothing.
   */
  retention?: string;
  contactEmail?: string;
};

/* ----------------------------------------------------------------- projections */

/** What the rail needs. Never action bodies — this crosses to the client. */
export type RailItem = {
  id: string;
  partId: string;
  order: number;
  title: string;
  minutes: number;
  optional?: boolean;
};

export type { Block, Cell, Headline, Outcome, Plan, Resource, RichText, VisualSpec };
