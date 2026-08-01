# Content quality gate

No article ships below **80/100**. This document is the rubric and the procedure.

The gate exists because the rule already existed and was never enforced. An audit on
2026-08-01 scored the five live articles at 72, 61, 60, 58 and 42. Every one had been
published without being scored.

## Two layers

**Layer 1 is automatic.** `npm run lint:content` fails on defects a machine can judge.
It runs before every build, so a failing article cannot deploy.

**Layer 2 is human.** The rubric below cannot be automated. What is automated is
whether a defensible score exists and still applies to the bytes on disk.

## Running it

```bash
npm run lint:content                  # check everything
npm run lint:content -- --fix-readtime  # correct readTime automatically
node scripts/lint-content.mjs --hash content/articles/some-article.md
```

Thresholds live in `scripts/content-rules.mjs`. That is the only file to tune.

## The rubric

| Category | Points | What it covers |
|---|---|---|
| Content quality | 25 | Structure, readability, paragraph and sentence craft, genuine information gain |
| SEO | 20 | Title, meta, headings, internal and external linking, anchor quality, keyword truth |
| E-E-A-T | 20 | Author signals, sourcing, first-hand evidence, honesty about what we can prove |
| Technical | 15 | Frontmatter, schema, structure, metadata accuracy |
| AI citation readiness | 20 | Self-contained passages, question headings, extractable answers, entity clarity |

### Scoring procedure

1. Run `npm run lint:content` and clear every error.
2. **Fetch every external source and confirm it contains the claim you attached to it.**
   Not the domain, the specific figure. Three of four sources on our best-performing
   page did not say what we claimed, and that is what triggered this whole exercise.
   Naming a source is not citing one.
3. Score each category honestly. If unsure between two numbers, take the lower.
4. Get the content hash: `node scripts/lint-content.mjs --hash <file>`
5. Add the review block to frontmatter.

```yaml
review:
  score: 84
  categories:
    content: 21
    seo: 17
    eeat: 16
    technical: 13
    citability: 17
  reviewer: paul
  date: 2026-08-01
  hash: 9f2c1a4b7e0d3856
```

The subscores must sum to `score`, so a round 80 cannot be typed in without doing the work.

### Why the hash matters

The hash covers the body and everything the rubric judges. **Materially edit the article
and the score expires**, blocking the build until someone re-judges it. Without it, a
score of 84 travels along with a rewrite forever.

Bumping `updated` or swapping a `cta` preset does not invalidate it.

## Grandfathering

Articles predating the gate are listed in `GRANDFATHERED` with an expiry date. They skip
the score check until that date, then fail permanently. A grandfather list without an
expiry is just a disabled check.

## What this cannot catch

Worth being honest about, so nobody treats a green run as a quality guarantee:

- **Whether a cited source actually supports the claim.** That needs a network call,
  which would let a flaky third-party site break the deploy. It is a human step, scored
  under E-E-A-T. The linter only warns about statistics with no citation nearby.
- **Semantic duplication.** Sentence similarity catches reworded copy. It does not catch
  two articles making the same argument in entirely different words.
- **Whether the piece is any good.** Length, depth and originality are all Layer 2.
- **A reviewer who types 80 without reading.** The subscore sum makes that require five
  deliberate lies rather than one. Past that point it is culture, not tooling.

## Unpublishing

There is no skip flag. To take an article out of the build, move it to
`content/articles/_drafts/`. The loader ignores subdirectories, so this unpublishes it
and silences the linter in one move, which is the honest trade.
