#!/usr/bin/env node
/**
 * Content linter. Runs on `npm run lint:content`, and automatically before
 * `npm run build` via the prebuild script, so a failing article cannot deploy.
 *
 * Two layers:
 *   Layer 1  deterministic defects (dashes, readTime, frontmatter, duplication)
 *   Layer 2  the rubric score, bound to a content hash so edits expire it
 *
 * Every check here exists because the defect it catches actually shipped.
 * See docs/content-quality.md.
 *
 * Flags:
 *   --fix-readtime   rewrite readTime to the computed value
 *   --hash <file>    print the review hash for one article and exit
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, basename } from 'node:path';
import { createHash } from 'node:crypto';
import matter from 'gray-matter';
import * as R from './content-rules.mjs';

const ARTICLES_DIR = join(process.cwd(), 'content', 'articles');
const TYPES_FILE = join(process.cwd(), 'src', 'lib', 'articles', 'types.ts');

const errors = [];
const warnings = [];
const err = (slug, msg, hint) => errors.push({ slug, msg, hint });
const warn = (slug, msg) => warnings.push({ slug, msg });

/* ------------------------------------------------------------------ helpers */

// Read the enums out of types.ts rather than duplicating them, so they can't drift.
function readEnum(name) {
  if (!existsSync(TYPES_FILE)) return null;
  const src = readFileSync(TYPES_FILE, 'utf8');
  const m = src.match(new RegExp(`${name}\\s*=\\s*\\[([\\s\\S]*?)\\]`));
  if (!m) return null;
  return [...m[1].matchAll(/'([^']+)'/g)].map((x) => x[1]);
}

/** Body prose only: no frontmatter, code, tables, headings or link URLs. */
function proseOf(body) {
  return body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/^\s*\|.*$/gm, ' ')
    .replace(/^\s*#{1,6}\s.*$/gm, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_>`]/g, ' ');
}

const wordCount = (body) => proseOf(body).split(/\s+/).filter(Boolean).length;

function sentencesOf(body) {
  return proseOf(body)
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.split(/\s+/).length >= R.DUPE_MIN_SENTENCE_WORDS);
}

function tokens(sentence) {
  return new Set(
    sentence.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/)
      .filter((w) => w && !R.STOPWORD_SET.has(w))
  );
}

function jaccard(a, b) {
  let shared = 0;
  for (const t of a) if (b.has(t)) shared++;
  const union = a.size + b.size - shared;
  return union ? shared / union : 0;
}

/**
 * Numerals worth checking between metadata and body. Deliberately excludes bare
 * single digits: `body.includes('2')` matches almost anything and makes the
 * check useless.
 */
function significantNumerals(text) {
  const out = new Set();
  for (const m of text.matchAll(/£\s?\d[\d,]*(?:\.\d+)?/g)) out.add(m[0].replace(/\s/g, ''));
  for (const m of text.matchAll(/\d[\d,]*(?:\.\d+)?\s?(?:%|x\b|bn\b|m\b|k\b|billion|million)/gi)) out.add(m[0]);
  for (const m of text.matchAll(/\b\d[\d,]*\.?\d*\b/g)) if (m[0].replace(/\D/g, '').length >= 2) out.add(m[0]);
  return out;
}

const normaliseNum = (s) =>
  s.toLowerCase().replace(/[,\s]/g, '').replace(/\.0+$/, '').replace(/(\.\d*?)0+$/, '$1');

function bodyHasNumeral(body, numeral) {
  const target = normaliseNum(numeral);
  const pool = [...significantNumerals(body)].map(normaliseNum);
  return pool.includes(target) || normaliseNum(body).includes(target);
}

function reviewHash(fm, body) {
  const payload = JSON.stringify({
    body: body.trim(),
    title: fm.title ?? '',
    seoTitle: fm.seoTitle ?? '',
    excerpt: fm.excerpt ?? '',
    readTime: fm.readTime ?? '',
    itemList: fm.itemList ?? null,
    faqs: fm.faqs ?? null,
  });
  return createHash('sha256').update(payload).digest('hex').slice(0, 16);
}

/* -------------------------------------------------------------------- checks */

function checkArticle(file, raw, fm, body, slug) {
  // --- dashes. The defect that shipped because the old grep only looked for em.
  const lines = raw.split('\n');
  for (const dash of R.BANNED_DASHES) {
    lines.forEach((line, i) => {
      const col = line.indexOf(dash);
      if (col !== -1) {
        err(slug, `${basename(file)}:${i + 1}:${col + 1} contains "${dash}"`,
          `House style bans em and en dashes. Use a comma, colon or full stop. Context: ...${line.slice(Math.max(0, col - 40), col + 40).trim()}...`);
      }
    });
  }

  // --- frontmatter contract. Closes the loader's silent-default hole.
  for (const field of R.REQUIRED_FRONTMATTER) {
    const v = fm[field];
    if (v === undefined || v === null || String(v).trim() === '') {
      err(slug, `missing frontmatter: ${field}`, 'The loader silently defaults some of these, so absence is invisible until it hurts.');
    }
  }
  if (!fm.cta) warn(slug, 'no cta block, article will fall back to the category default');

  const cats = readEnum('ARTICLE_CATEGORIES');
  const types = readEnum('ARTICLE_TYPES');
  if (cats && fm.category && !cats.includes(fm.category)) err(slug, `category "${fm.category}" is not in ARTICLE_CATEGORIES`, `Allowed: ${cats.join(', ')}`);
  if (types && fm.type && !types.includes(fm.type)) err(slug, `type "${fm.type}" is not in ARTICLE_TYPES`, `Allowed: ${types.join(', ')}`);

  // --- dates
  const d = fm.date ? new Date(fm.date) : null;
  const u = fm.updated ? new Date(fm.updated) : null;
  const tomorrow = Date.now() + 864e5;
  // Scheduling is supported: a future `date` holds the article back until that day
  // (see src/lib/articles/loader.ts). So a future date is a warning, not an error.
  // A date far beyond the scheduling horizon is still an error, because that is a typo.
  const scheduleHorizon = Date.now() + 180 * 864e5;
  if (d && isNaN(+d)) err(slug, 'date does not parse');
  if (u && isNaN(+u)) err(slug, 'updated does not parse');
  if (d && u && !isNaN(+d) && !isNaN(+u) && +u < +d) err(slug, 'updated is earlier than date');
  if (d && +d > scheduleHorizon)
    err(slug, 'date is more than 180 days in the future', 'That looks like a typo, not a schedule.');
  else if (d && +d > tomorrow)
    warn(slug, `scheduled: publishes ${d.toISOString().slice(0, 10)}, hidden until then`);
  if (u && +u > scheduleHorizon)
    err(slug, 'updated is more than 180 days in the future', 'That looks like a typo, not a schedule.');
  else if (u && +u > tomorrow)
    warn(slug, `updated is in the future (${u.toISOString().slice(0, 10)})`);

  // --- lengths
  if (fm.seoTitle) {
    const n = fm.seoTitle.length;
    if (n > R.SEO_TITLE_MAX) err(slug, `seoTitle is ${n} chars, over the ${R.SEO_TITLE_MAX} limit`, 'It will truncate in results.');
    else if (n > R.SEO_TITLE_IDEAL) warn(slug, `seoTitle is ${n} chars, above the ${R.SEO_TITLE_IDEAL} ideal`);
  }
  if (fm.excerpt) {
    const n = fm.excerpt.length;
    if (n < R.EXCERPT_HARD_MIN || n > R.EXCERPT_HARD_MAX) err(slug, `excerpt is ${n} chars, outside ${R.EXCERPT_HARD_MIN}-${R.EXCERPT_HARD_MAX}`);
    else if (n < R.EXCERPT_IDEAL_MIN || n > R.EXCERPT_IDEAL_MAX) warn(slug, `excerpt is ${n} chars, outside the ${R.EXCERPT_IDEAL_MIN}-${R.EXCERPT_IDEAL_MAX} ideal`);
  }

  // --- readTime honesty
  const words = wordCount(body);
  const implied = Math.max(1, Math.round(words / R.WORDS_PER_MINUTE));
  const stated = parseInt(String(fm.readTime ?? '').match(/\d+/)?.[0] ?? '0', 10);
  const slack = Math.max(R.READ_TIME_MIN_SLACK, R.READ_TIME_RATIO * implied);
  if (stated && Math.abs(stated - implied) > slack) {
    err(slug, `readTime says ${stated} min but ${words} words implies ~${implied} min`,
      `Run with --fix-readtime to correct it.`);
  }

  // --- title numeral vs itemList. This publishes to ItemList JSON-LD.
  const titleNums = [...String(fm.title ?? '').matchAll(/\b([2-9]|[1-9][0-9])\b/g)].map((m) => +m[1]);
  if (Array.isArray(fm.itemList) && titleNums.length) {
    const n = fm.itemList.length;
    if (!titleNums.includes(n)) {
      err(slug, `title claims ${titleNums.join('/')} but itemList has ${n} entries`,
        'This ships contradictory ItemList structured data. Fix the count or drop it from the title.');
    }
  }

  // --- numerals in metadata that never appear in the body
  for (const field of ['excerpt', 'seoTitle', 'title']) {
    for (const num of significantNumerals(String(fm[field] ?? ''))) {
      if (!bodyHasNumeral(body, num)) {
        err(slug, `${field} cites "${num}" which does not appear in the body`,
          'A statistic in the meta description that is not in the article is a promise the page does not keep.');
      }
    }
  }

  // --- structure
  if (/^#\s/m.test(body)) err(slug, 'body contains an H1', 'The page template already renders the only H1.');
  const headings = [...body.matchAll(/^(#{2,6})\s+(.+)$/gm)].map((m) => ({ level: m[1].length, text: m[2].trim() }));
  let prev = 1;
  for (const h of headings) {
    if (h.level > prev + 1) err(slug, `heading level skips from H${prev} to H${h.level} at "${h.text.slice(0, 40)}"`);
    prev = h.level;
  }
  const h2s = headings.filter((h) => h.level === 2);
  if (h2s.length < 3) warn(slug, `only ${h2s.length} H2 sections`);
  if (h2s.length > 12) warn(slug, `${h2s.length} H2 sections, consider splitting`);
  const seen = new Set();
  for (const h of headings) {
    const k = h.text.toLowerCase();
    if (seen.has(k)) warn(slug, `duplicate heading "${h.text.slice(0, 40)}"`);
    seen.add(k);
  }

  // --- links
  const internal = (body.match(/\]\(\//g) || []).length;
  if (internal < R.INTERNAL_LINKS_MIN) err(slug, `only ${internal} internal links`, 'Orphan pages do not earn their place in a cluster.');
  else if (internal > R.INTERNAL_LINKS_WARN_MAX) warn(slug, `${internal} internal links, possibly stuffed`);

  // --- soft quality signals
  if (words < R.BODY_WORDS_WARN_MIN) warn(slug, `${words} words, thin for a standalone article`);
  for (const p of body.split(/\n\s*\n/)) {
    const n = proseOf(p).split(/\s+/).filter(Boolean).length;
    if (n > R.PARAGRAPH_WORDS_WARN_MAX) warn(slug, `a paragraph runs to ${n} words`);
  }
  const lower = body.toLowerCase();
  for (const phrase of R.BANNED_PHRASES) {
    if (lower.includes(phrase.toLowerCase())) warn(slug, `contains flagged phrase "${phrase}"`);
  }

  return { words, implied, stated };
}

/** Layer 2: a score must exist, clear the bar, and still apply to these bytes. */
function checkReview(fm, body, slug) {
  const today = new Date().toISOString().slice(0, 10);
  const until = R.GRANDFATHERED[slug];
  const grandfathered = until && today < until;

  const review = fm.review;
  if (!review) {
    const msg = 'has never been scored against the rubric';
    if (grandfathered) warn(slug, `${msg} (grandfathered until ${until})`);
    else err(slug, msg, `Score it, then add a review block. Hash for this version: ${reviewHash(fm, body)}. See docs/content-quality.md.`);
    return;
  }

  const total = Object.values(R.REVIEW_CATEGORIES).reduce((a, b) => a + b, 0);
  if (typeof review.score !== 'number') err(slug, 'review.score is missing or not a number');
  else if (review.score < R.MIN_REVIEW_SCORE) err(slug, `review.score is ${review.score}, below the ${R.MIN_REVIEW_SCORE} gate`);

  const cats = review.categories ?? {};
  let sum = 0;
  for (const [name, ceiling] of Object.entries(R.REVIEW_CATEGORIES)) {
    const v = cats[name];
    if (typeof v !== 'number') { err(slug, `review.categories.${name} is missing`); continue; }
    if (v > ceiling) err(slug, `review.categories.${name} is ${v}, above its ${ceiling} ceiling`);
    sum += v;
  }
  if (Object.keys(cats).length && sum !== review.score) {
    err(slug, `review category scores sum to ${sum} but review.score says ${review.score} (of ${total})`);
  }
  if (!review.reviewer) err(slug, 'review.reviewer is missing');
  if (!review.date) err(slug, 'review.date is missing');

  const expected = reviewHash(fm, body);
  if (review.hash !== expected) {
    err(slug, `article changed since it was scored${review.date ? ` on ${review.date}` : ''}`,
      `Rescore it and set review.hash to ${expected}.`);
  }
}

/* ---------------------------------------------------------------------- main */

const argv = process.argv.slice(2);

if (argv[0] === '--hash') {
  const f = argv[1];
  if (!f) { console.error('usage: --hash <file>'); process.exit(2); }
  const { data, content } = matter(readFileSync(f, 'utf8'));
  console.log(reviewHash(data, content));
  process.exit(0);
}

const fixReadTime = argv.includes('--fix-readtime');

if (!existsSync(ARTICLES_DIR)) {
  console.error(`No articles directory at ${ARTICLES_DIR}`);
  process.exit(1);
}

const files = readdirSync(ARTICLES_DIR).filter((f) => f.endsWith('.md')).sort();
const corpus = [];

for (const name of files) {
  const file = join(ARTICLES_DIR, name);
  const raw = readFileSync(file, 'utf8');
  const { data: fm, content: body } = matter(raw);
  const slug = name.replace(/\.md$/, '');

  const { implied } = checkArticle(file, raw, fm, body, slug);
  checkReview(fm, body, slug);

  if (fixReadTime) {
    const label = `${implied} min read`;
    if (fm.readTime !== label) {
      writeFileSync(file, raw.replace(/^readTime:.*$/m, `readTime: ${label}`));
      console.log(`  fixed readTime for ${slug}: ${label}`);
    }
  }

  corpus.push({
    slug,
    sentences: sentencesOf(body).map((s) => ({ text: s, tok: tokens(s) })),
    // Headings are compared separately. Sentence-level duplication misses the
    // real template signal, which is two articles sharing a section skeleton.
    headings: [...body.matchAll(/^#{2,3}\s+(.+)$/gm)].map((m) => tokens(m[1])),
  });
}

// Cross-article duplication. Counting pairs matters more than any single pair:
// one similar sentence is coincidence, five is a template being refilled.
for (let i = 0; i < corpus.length; i++) {
  for (let j = i + 1; j < corpus.length; j++) {
    const pairs = [];
    for (const a of corpus[i].sentences) {
      for (const b of corpus[j].sentences) {
        const score = jaccard(a.tok, b.tok);
        if (score >= R.DUPE_SIMILARITY) pairs.push({ score, a: a.text, b: b.text });
      }
    }
    if (!pairs.length) continue;
    pairs.sort((x, y) => y.score - x.score);
    const worst = pairs[0];
    const label = `${corpus[i].slug} vs ${corpus[j].slug}`;
    const sample = pairs.slice(0, 3)
      .map((p) => `      ${Math.round(p.score * 100)}%  "${p.a.slice(0, 70)}"\n            "${p.b.slice(0, 70)}"`)
      .join('\n');

    // Section skeletons matching one-for-one is the template tell.
    let matchedHeadings = 0;
    for (const ha of corpus[i].headings) {
      if (corpus[j].headings.some((hb) => jaccard(ha, hb) >= R.HEADING_SIMILARITY)) matchedHeadings++;
    }
    const smaller = Math.min(corpus[i].headings.length, corpus[j].headings.length) || 1;
    const headingOverlap = matchedHeadings / smaller;
    if (headingOverlap >= R.HEADING_OVERLAP_WARN) {
      warn(label, `${Math.round(headingOverlap * 100)}% of section headings have a near-twin in the other article (${matchedHeadings}/${smaller})`);
    }

    if (pairs.length >= R.DUPE_PAIR_LIMIT || worst.score >= R.DUPE_SINGLE_PAIR_ERROR) {
      err(label, `${pairs.length} near-duplicate sentence pairs (worst ${Math.round(worst.score * 100)}%)`,
        `These read as one article with the nouns swapped:\n${sample}`);
    } else {
      warn(label, `${pairs.length} near-duplicate sentence pair(s), worst ${Math.round(worst.score * 100)}%`);
    }
  }
}

/* -------------------------------------------------------------------- report */

for (const w of warnings) console.log(`  warn  ${w.slug}: ${w.msg}`);
if (warnings.length && errors.length) console.log('');
for (const e of errors) {
  console.error(`  ERROR ${e.slug}: ${e.msg}`);
  if (e.hint) console.error(`        ${e.hint}`);
}

console.log(`\n${files.length} articles, ${errors.length} errors, ${warnings.length} warnings`);
if (errors.length) {
  console.error('\nContent lint failed. Fix the errors above, or move the article to content/articles/_drafts/ to unpublish it.');
  process.exit(1);
}
