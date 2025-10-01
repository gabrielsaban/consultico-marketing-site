'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useMemo, useState } from 'react';
import type { JSX } from 'react';

type BlogSlide = {
  id: number;
  title: string;
  summary: string;
  author: string;
  date: string; // e.g., "Aug 27, 2025"
  readTime: string; // e.g., "2 min read"
};

interface BlogCarouselProps {
  centered?: boolean;
  className?: string;
}

export default function BlogCarousel({ centered = true, className = '' }: BlogCarouselProps): JSX.Element {
  const slides: BlogSlide[] = useMemo(
    () => [
      {
        id: 1,
        title: 'How we approach growth in noisy markets',
        summary:
          'A quick look at our favourite levers for compounding brand visibility without wasting budget or attention.',
        author: 'Consultico Team',
        date: 'Aug 27, 2025',
        readTime: '2 min read',
      },
      {
        id: 2,
        title: 'Landing pages that persuade in seconds',
        summary:
          'Structure, hierarchy, and message clarity: the three essentials behind our highest converting pages.',
        author: 'Consultico Team',
        date: 'Aug 21, 2025',
        readTime: '3 min read',
      },
      {
        id: 3,
        title: 'SEO that respects readers',
        summary:
          'Why search-first content should read like an editor wrote it, not a robot — and how we do it.',
        author: 'Consultico Team',
        date: 'Aug 15, 2025',
        readTime: '4 min read',
      },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex((i) => (i + 1) % slides.length);

  return (
    <div className={`${centered ? 'left-1/2 -translate-x-1/2 transform w-[92vw] max-w-[1100px]' : 'w-full'} relative mt-4 md:mt-6 px-0 ${className}`}>
      {/* Arrows — reuse style from Mission & Values carousel */}
      <button
        aria-label="Previous"
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 px-4 py-2 shadow-sm"
      >
        ‹
      </button>
      <button
        aria-label="Next"
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 px-4 py-2 shadow-sm"
      >
        ›
      </button>

      <div className="px-0 md:px-4 lg:px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[index].id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="rounded-2xl border border-gray-200 bg-white/60 backdrop-blur-sm shadow-sm p-4 md:p-6 max-w-[520px]"
          >
            {/* Square visual first */}
            <div className="w-full aspect-square rounded-2xl bg-gray-200 border border-gray-300" />

            {/* Content stacked below */}
            <div className="flex flex-col mt-5">
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-300 border border-gray-400" />
                <div className="text-gray-700 text-sm md:text-base font-helvetica">
                  <div className="font-medium">{slides[index].author}</div>
                  <div className="text-gray-500">{slides[index].date} · {slides[index].readTime}</div>
                </div>
              </div>

              {/* Title */}
              <h3 className="mt-3 text-blue-primary font-futura text-xl md:text-2xl font-bold">
                {slides[index].title}
              </h3>

              {/* Summary */}
              <p className="mt-2 text-gray-700 font-helvetica-light text-sm md:text-base leading-relaxed">
                {slides[index].summary}
              </p>

              <div className="pt-4">
                <button
                  type="button"
                  className="inline-flex items-center text-blue-primary font-helvetica text-sm md:text-base hover:underline"
                >
                  Read the blog →
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}


