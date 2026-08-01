/**
 * Tuning for the content linter. This is the only file you should need to edit
 * when a threshold turns out to be wrong.
 *
 * See docs/content-quality.md for the rubric that Layer 2 enforces.
 */

/** Words per minute used to sanity-check `readTime`. Standard non-fiction figure. */
export const WORDS_PER_MINUTE = 225;

/**
 * readTime tolerance. Fails when |stated - implied| exceeds
 * max(READ_TIME_MIN_SLACK, READ_TIME_RATIO * implied).
 * A short article gets a tight absolute band; a long one gets a proportional band.
 */
export const READ_TIME_MIN_SLACK = 1;
export const READ_TIME_RATIO = 0.35;

/** Frontmatter that must be present and non-empty. */
export const REQUIRED_FRONTMATTER = [
  'title',
  'seoTitle',
  'excerpt',
  'date',
  'updated',
  'category',
  'type',
  'readTime',
];

export const SEO_TITLE_MAX = 60;
export const SEO_TITLE_IDEAL = 55;

export const EXCERPT_HARD_MIN = 110;
export const EXCERPT_HARD_MAX = 170;
export const EXCERPT_IDEAL_MIN = 140;
export const EXCERPT_IDEAL_MAX = 160;

export const INTERNAL_LINKS_MIN = 2;
export const INTERNAL_LINKS_WARN_MAX = 12;

export const BODY_WORDS_WARN_MIN = 600;
export const PARAGRAPH_WORDS_WARN_MAX = 120;

/**
 * Cross-article duplication. Calibrated on the real corpus: trigram Jaccard
 * found nothing because the template articles were reworded rather than copied.
 * Unigram with stopwords stripped surfaces them correctly.
 */
export const DUPE_SIMILARITY = 0.45;
export const DUPE_PAIR_LIMIT = 5; // >= this many pairs between one pair of articles is an error
export const DUPE_SINGLE_PAIR_ERROR = 0.75; // any single pair this similar is an error on its own
export const DUPE_MIN_SENTENCE_WORDS = 8;

/** Dashes are banned outright under house style. All three variants. */
export const BANNED_DASHES = ['—', '–', '―'];

/** Warned, not failed: several have legitimate uses. */
export const BANNED_PHRASES = [
  'delve', 'leverage', 'landscape', 'realm', 'unlock', 'harness', 'seamless',
  'robust', 'elevate', 'game-changer', 'game changer', 'testament to',
  'navigate the complexities', 'in today', 'at its core', 'in conclusion',
  'it is important to note', "it's important to note", 'dive into',
  'cutting-edge', 'tapestry', 'a myriad of', 'plethora',
];

/** Minimum rubric score required to publish. */
export const MIN_REVIEW_SCORE = 80;

/** Per-category ceilings. Must sum to 100. */
export const REVIEW_CATEGORIES = {
  content: 25,
  seo: 20,
  eeat: 20,
  technical: 15,
  citability: 20,
};

/**
 * Articles predating the gate. Layer 2 scoring is skipped until the date, then
 * fails permanently. A grandfather list without an expiry is a disabled check.
 */
export const GRANDFATHERED = {
  'best-ppc-agencies-uk': '2026-09-15',
  'how-to-choose-a-ppc-agency-uk': '2026-09-15',
  'how-to-choose-an-seo-agency-in-glasgow': '2026-09-15',
  'what-is-generative-engine-optimisation': '2026-09-15',
  'why-strategy-before-seo': '2026-09-15',
};

const STOPWORDS = `a an the and or but if of to in on at by for with from as is are was were be been being
it its this that these those you your we our they their he she his her not no do does did have has had will
would can could should may might must than then so such about into over under more most other some any`;

export const STOPWORD_SET = new Set(STOPWORDS.split(/\s+/).filter(Boolean));

/** Heading-skeleton overlap between two articles. Warns, since a shared shape
 *  can be legitimate across a deliberate series. Above this it reads as a template. */
export const HEADING_SIMILARITY = 0.5;
export const HEADING_OVERLAP_WARN = 0.5;
