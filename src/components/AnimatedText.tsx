'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface AnimatedTextProps {
  paragraphs: string[];
  className?: string;
  delay?: number;
  highlightWords?: string[];
}

function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function splitByPhrases(text: string, phrases: string[]) {
  // Build a regex that matches any phrase, ignoring case and punctuation
  const pattern = phrases
    .map(p => escapeRegExp(p).replace(/\s+/g, '\\s+'))
    .join('|');
  if (!pattern) return [{ text, highlight: false }];
  // Match phrases, but not trailing punctuation
  const regex = new RegExp(`(${pattern})(?!\w)`, 'gi');
  const result: { text: string; highlight: boolean }[] = [];
  let lastIndex = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      result.push({ text: text.slice(lastIndex, match.index), highlight: false });
    }
    // Only highlight the phrase, not trailing punctuation
    let phrase = match[0];
    let trailing = '';
    const m = /([\w\s-]+)([^\w\s-]*)$/.exec(phrase);
    if (m) {
      phrase = m[1];
      trailing = m[2];
    }
    result.push({ text: phrase, highlight: true });
    if (trailing) {
      result.push({ text: trailing, highlight: false });
    }
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    result.push({ text: text.slice(lastIndex), highlight: false });
  }
  return result;
}

export default function AnimatedText({ paragraphs, className = "", delay = 0, highlightWords = [] }: AnimatedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"]
  });

  // Preprocess paragraphs into segments for animation
  const segments = paragraphs.flatMap((paragraph, pIdx) => {
    const split = splitByPhrases(paragraph, highlightWords);
    // Split each segment into words for animation
    return split.map((seg, sIdx) => ({
      ...seg,
      paragraphIndex: pIdx,
      segmentIndex: sIdx,
      words: seg.text.split(/(\s+)/).filter(Boolean),
    }));
  });
  const totalWords = segments.reduce((acc, seg) => acc + seg.words.length, 0);

  let wordCounter = 0;

  const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div ref={containerRef} className={className}>
      {paragraphs.map((_, paragraphIndex) => (
        <div key={paragraphIndex} className="mb-6">
          {segments
            .filter(seg => seg.paragraphIndex === paragraphIndex)
            .map((seg, segIdx) =>
              seg.words.map((word, wIdx) => {
                const globalWordIndex = wordCounter++;
                if (prefersReduced) {
                  const isSpace = /^\s+$/.test(word);
                  const wordClass = `${isSpace ? '' : 'inline-block mr-2'}${seg.highlight && !isSpace ? ' text-blue-primary' : ''}`;
                  return (
                    <span key={`${paragraphIndex}-${segIdx}-${wIdx}`} className={wordClass}>
                      {word}
                    </span>
                  );
                }
                // Animate each word or space
                const wordProgress = useTransform(
                  scrollYProgress,
                  [globalWordIndex / totalWords, (globalWordIndex + 1) / totalWords],
                  [0, 1]
                );
                const opacity = useTransform(wordProgress, [0, 1], [0.3, 1]);
                const color = useTransform(wordProgress, [0, 1], ["#798596", "inherit"]);
                const isSpace = /^\s+$/.test(word);
                const wordClass = `${isSpace ? '' : 'inline-block mr-2'}${seg.highlight && !isSpace ? ' text-blue-primary' : ''}`;
                return (
                  <motion.span
                    key={`${paragraphIndex}-${segIdx}-${wIdx}`}
                    className={wordClass}
                    style={{ opacity, color }}
                  >
                    {word}
                  </motion.span>
                );
              })
            )}
        </div>
      ))}
    </div>
  );
} 