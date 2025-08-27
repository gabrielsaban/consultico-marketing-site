'use client';

import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useMemo, useRef } from 'react';

interface AnimatedTextProps {
  paragraphs: string[];
  className?: string;
  /** kept for API compatibility */
  delay?: number;
  highlightWords?: string[];
}

/** Escape a string for safe use in RegExp */
function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Build a regex that:
 * - matches any of the given phrases (case-insensitive)
 * - allows arbitrary whitespace inside the phrase (so "done for you" matches "done   for   you")
 * - DOES NOT match when directly glued to letters/numbers/hyphens on either side
 *   (so we don't chop parts of "done-for-you" or other words)
 * - uses Unicode categories for letters/numbers
 */
function buildPhraseRegex(phrases: string[]) {
  if (!phrases.length) return null;

  const pattern = phrases
    .map((p) =>
      // normalize internal whitespace in the phrase to \s+
      escapeRegExp(p).replace(/\s+/g, '\\s+')
    )
    .join('|');

  // Boundaries: not preceded/followed by letter/number/hyphen
  // Lookbehind is supported on modern Node (Vercel). Use Unicode flag.
  const source = `(?<![\\p{L}\\p{N}-])(${pattern})(?![\\p{L}\\p{N}-])`;
  return new RegExp(source, 'giu');
}

/**
 * Split a paragraph into non-overlapping segments:
 * [{ text, highlight }, ...]
 * preserving ALL characters and punctuation. No trimming.
 */
function segmentParagraph(paragraph: string, phrases: string[]) {
  const rx = buildPhraseRegex(phrases);
  if (!rx) return [{ text: paragraph, highlight: false }];

  const out: { text: string; highlight: boolean }[] = [];
  let last = 0;
  let m: RegExpExecArray | null;

  while ((m = rx.exec(paragraph)) !== null) {
    const start = m.index;
    const end = rx.lastIndex;

    if (start > last) {
      out.push({ text: paragraph.slice(last, start), highlight: false });
    }
    // push the exact matched phrase (no slicing/tweaking)
    out.push({ text: paragraph.slice(start, end), highlight: true });

    last = end;
  }

  if (last < paragraph.length) {
    out.push({ text: paragraph.slice(last), highlight: false });
  }

  return out;
}

/** Child so hooks stay at top-level (not inside array callbacks) */
function Word({
  word,
  isSpace,
  highlight,
  index,
  total,
  progress,
}: {
  word: string;
  isSpace: boolean;
  highlight: boolean;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const wordProgress = useTransform(progress, [index / total, (index + 1) / total], [0, 1]);
  const opacity = useTransform(wordProgress, [0, 1], [0.3, 1]);
  const color = useTransform(wordProgress, [0, 1], ['#798596', 'inherit']);
  const cls = `${isSpace ? '' : 'inline-block'}${
    highlight && !isSpace ? ' text-blue-primary' : ''
  }`;

  return isSpace ? (
    <span className={cls}>{word}</span>
  ) : (
    <motion.span className={cls} style={{ opacity, color }}>
      {word}
    </motion.span>
  );
}

export default function AnimatedText({
  paragraphs,
  className = '',
  delay: _delay, // kept for API compatibility (unused)
  highlightWords = [],
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end center'],
  });

  // Precompute tokens and global word indices (no hooks in loops)
  const { wordsByParagraph, totalWords, prefersReduced } = useMemo(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    let globalIndex = 0;

    const wordsByParagraph = paragraphs.map((p) => {
      const segs = segmentParagraph(p, highlightWords);

      const tokens: {
        word: string;
        isSpace: boolean;
        highlight: boolean;
        globalIndex: number;
      }[] = [];

      segs.forEach((seg) => {
        // Split into words + spaces, keeping spaces as tokens
        const parts = seg.text.split(/(\s+)/).filter(Boolean);
        parts.forEach((part) => {
          const isSpace = /^\s+$/.test(part);
          tokens.push({
            word: part,
            isSpace,
            highlight: seg.highlight,
            globalIndex: globalIndex++,
          });
        });
      });

      return tokens;
    });

    return { wordsByParagraph, totalWords: globalIndex, prefersReduced };
  }, [paragraphs, highlightWords]);

  return (
    <div ref={containerRef} className={className}>
      {wordsByParagraph.map((para, pIdx) => (
        <div key={pIdx} className="mb-6">
          {para.map(({ word, isSpace, highlight, globalIndex }, i) =>
            prefersReduced ? (
              <span
                key={i}
                className={`${isSpace ? '' : 'inline-block'}${
                  highlight && !isSpace ? ' text-blue-primary' : ''
                }`}
              >
                {word}
              </span>
            ) : (
              <Word
                key={i}
                word={word}
                isSpace={isSpace}
                highlight={highlight}
                index={globalIndex}
                total={totalWords}
                progress={scrollYProgress}
              />
            )
          )}
        </div>
      ))}
    </div>
  );
}
