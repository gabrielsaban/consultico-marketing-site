'use client';

import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { JSX } from 'react';

type Testimony = {
  id: number;
  textA: string;
  textB: string;
  company: string;
  author: string;
};

interface TestimonialsCarouselProps {
  className?: string;
}

export default function TestimonialsCarousel({ className = '' }: TestimonialsCarouselProps): JSX.Element {
  const slides: Testimony[] = useMemo(
    () => [
      {
        id: 1,
        textA: 'Consultico delivered clarity and momentum when we needed it most.',
        textB: 'Their team worked fast and stayed focused on the right outcomes.',
        company: 'North Shore Interiors',
        author: 'A. Smith',
      },
      {
        id: 2,
        textA: 'Traffic and conversion quality increased in weeks, not months.',
        textB: 'They took ownership and made complex things simple for our team.',
        company: 'Marble & Grain',
        author: 'B. Taylor',
      },
      {
        id: 3,
        textA: 'We finally have a site and content that explain our value instantly.',
        textB: 'Clear strategy, clean delivery, and results we can measure.',
        company: 'Hawk Systems',
        author: 'J. Patel',
      },
      {
        id: 4,
        textA: 'A refresh that sharpened our brand and clarified the message.',
        textB: 'The work felt precise and focused — impact was immediate.',
        company: 'Green Orbit',
        author: 'L. Chen',
      },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex((i) => (i + 1) % slides.length);

  return (
    <div className={`w-full mt-6 md:mt-8 ${className}`}>
      {/* On mobile: animate alternating cards from left/right into center; on md+ keep existing offset pattern */}
      <div className="grid grid-cols-1 gap-6 md:gap-8">
        {slides.map((t, i) => {
          const fromX = i % 2 === 0 ? -80 : 80;
          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: fromX }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25, margin: '-10% 0px' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className={`flex flex-col h-full rounded-xl bg-white/60 p-6 border border-gray-200 w-full max-w-[900px] md:${
                i === 0 ? 'ml-auto mr-2' : i === 1 ? 'ml-[10%]' : i === 2 ? 'ml-[18%]' : 'ml-[26%]'
              }`}
            >
              <p className="text-gray-800 text-b-16 md:text-b-18 font-helvetica-light">{t.textA}</p>
              <p className="text-gray-800 text-b-16 md:text-b-18 font-helvetica-light mt-3">{t.textB}</p>
              <div className="mt-5 flex items-center justify-between gap-3">
                <div>
                  <div className="text-gray-700 font-helvetica-light text-b-12 md:text-b-16">{t.company}</div>
                  <div className="text-gray-500 text-b-10 md:text-b-12 font-helvetica-light">{t.author}</div>
                </div>
                {/* 5 stars */}
                <div className="flex items-center gap-1 text-brand-blue">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.034a1 1 0 00-1.175 0l-2.802 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81H7.03a1 1 0 00.95-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-brand-blue/90 flex items-center justify-center text-white font-bold">A</div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}


