'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Container from '@/components/Container';

interface Review {
  id: number;
  text: string;
  name: string;
  company: string;
}

const reviews: Review[] = [
  {
    id: 1,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    name: 'Name',
    company: 'Company',
  },
  {
    id: 2,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    name: 'Name',
    company: 'Company',
  },
  {
    id: 3,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    name: 'Name',
    company: 'Company',
  },
  {
    id: 4,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    name: 'Name',
    company: 'Company',
  },
  {
    id: 5,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    name: 'Name',
    company: 'Company',
  },
  {
    id: 6,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    name: 'Name',
    company: 'Company',
  },
  {
    id: 7,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    name: 'Name',
    company: 'Company',
  },
  {
    id: 8,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    name: 'Name',
    company: 'Company',
  },
];

const chunkItems = <T,>(items: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
};

// Star SVG Component
const StarIcon = () => (
  <svg
    width="20"
    height="19"
    viewBox="0 0 20 19"
    fill="currentColor"
    className="text-brand-blue"
  >
    <path d="M10 0L12.2451 6.90983H19.5106L13.6327 11.1803L15.8779 18.0902L10 13.8197L4.12215 18.0902L6.36729 11.1803L0.489435 6.90983H7.75486L10 0Z" />
  </svg>
);

export default function ReviewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mobilePage, setMobilePage] = useState(0);
  const [desktopStep, setDesktopStep] = useState(0);
  const desktopTrackRef = useRef<HTMLDivElement | null>(null);
  const mobileScrollerRef = useRef<HTMLDivElement | null>(null);
  const maxIndex = Math.max(reviews.length - 3, 0);
  const desktopProgressItems = Array.from({ length: maxIndex + 1 }, (_, index) => index);

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const showLeftArrow = currentIndex > 0;
  const showRightArrow = currentIndex < maxIndex;
  const mobilePages = chunkItems(reviews, 4);

  useEffect(() => {
    const measureDesktopStep = () => {
      const track = desktopTrackRef.current;
      const firstCard = track?.firstElementChild as HTMLElement | null;
      if (!track || !firstCard) return;

      const styles = window.getComputedStyle(track);
      const gap = parseFloat(styles.columnGap || styles.gap || '0');
      setDesktopStep(firstCard.getBoundingClientRect().width + gap);
    };

    measureDesktopStep();
    window.addEventListener('resize', measureDesktopStep);
    return () => window.removeEventListener('resize', measureDesktopStep);
  }, []);

  const handleMobileScroll = () => {
    const scroller = mobileScrollerRef.current;
    if (!scroller) return;
    const nextPage = Math.round(scroller.scrollLeft / scroller.clientWidth);
    setMobilePage(Math.min(mobilePages.length - 1, Math.max(0, nextPage)));
  };

  return (
    <Container className="py-16 relative">
      <div className="relative hidden [@media(min-width:1001px)]:block">
        {/* Reviews Track */}
        <div className="overflow-hidden">
          <motion.div
            ref={desktopTrackRef}
            className="flex gap-12"
            animate={{ x: -currentIndex * desktopStep }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {reviews.map((review) => (
              <motion.div
                key={review.id}
                className="flex flex-none flex-col rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900"
                style={{ width: 'calc((100% - 6rem) / 3)' }}
              >
                {/* Review Text with inline quotes */}
                <p className="font-helvetica text-[clamp(0.875rem,1.1vw,1.125rem)] text-gray-800 dark:text-gray-200 leading-[1.7] mb-6 flex-grow">
                  <span className="text-[clamp(1.75rem,2vw,2rem)] text-brand-blue mr-1 inline-block align-top leading-none">&ldquo;</span>
                  {review.text}
                  <span className="text-[clamp(1.75rem,2vw,2rem)] text-brand-blue ml-1 inline-block align-top leading-none">&rdquo;</span>
                </p>

                {/* Blue Divider */}
                <div className="w-full h-[2px] bg-brand-blue mb-6 flex-shrink-0" />

                {/* Author Info */}
                <div className="flex items-start gap-7">
                  {/* Avatar Placeholder - matches height of text+stars div */}
                  <div className="rounded-full bg-gray-300 dark:bg-gray-800 flex-shrink-0 w-[70px] h-[70px] xl:w-[75px] xl:h-[75px] 2xl:w-[90px] 2xl:h-[90px]" />
                  
                  <div className="flex flex-col">
                    {/* Name and Company */}
                    <p className="font-helvetica text-[clamp(0.875rem,1vw,1.125rem)] text-gray-900 dark:text-gray-100">
                      {review.name}
                    </p>
                    <p className="font-helvetica text-[clamp(0.875rem,1vw,1.125rem)] text-gray-900 dark:text-gray-100 mb-2">
                      {review.company}
                    </p>

                    {/* Stars */}
                    <div className="flex gap-0">
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {maxIndex > 0 && (
          <div
            className="mt-8 flex justify-center gap-2"
            aria-label="Reviews carousel progress"
          >
            {desktopProgressItems.map((index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  currentIndex === index ? 'w-8 bg-brand-blue' : 'w-3 bg-brand-blue/25 hover:bg-brand-blue/45'
                }`}
                aria-label={`Show review set ${index + 1}`}
                aria-current={currentIndex === index ? 'true' : undefined}
              />
            ))}
          </div>
        )}

        {/* Left Arrow - Absolutely Positioned */}
        <AnimatePresence>
          {showLeftArrow && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handlePrev}
              className="absolute left-[-5rem] top-[25%] -translate-y-1/2 text-brand-blue transition-[opacity,transform] duration-200 hover:opacity-80 hover:scale-110 active:scale-95 z-10"
              aria-label="Previous reviews"
            >
              <svg
                width="60"
                height="60"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Right Arrow - Absolutely Positioned */}
        <AnimatePresence>
          {showRightArrow && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleNext}
              className="absolute right-[-5rem] top-[25%] -translate-y-1/2 text-brand-blue transition-[opacity,transform] duration-200 hover:opacity-80 hover:scale-110 active:scale-95 z-10"
              aria-label="Next reviews"
            >
              <svg
                width="60"
                height="60"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <div className="[@media(min-width:1001px)]:hidden">
        <div
          ref={mobileScrollerRef}
          onScroll={handleMobileScroll}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
        >
          {mobilePages.map((page, pageIndex) => (
            <div
              key={pageIndex}
              className="w-full flex-none snap-start px-1"
            >
              <div className="mx-auto grid max-w-[44rem] grid-cols-2 gap-5 sm:gap-6">
                {page.map((review) => (
                  <div
                    key={review.id}
                    className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-5 flex flex-col min-h-[18rem]"
                  >
                    <p className="font-helvetica text-[clamp(0.8rem,2vw,0.95rem)] text-gray-800 dark:text-gray-200 leading-[1.55] mb-4 flex-grow">
                      <span className="text-[clamp(1.35rem,3vw,1.6rem)] text-brand-blue mr-1 inline-block align-top leading-none">&ldquo;</span>
                      {review.text}
                      <span className="text-[clamp(1.35rem,3vw,1.6rem)] text-brand-blue ml-1 inline-block align-top leading-none">&rdquo;</span>
                    </p>

                    <div className="w-full h-[2px] bg-brand-blue mb-4 flex-shrink-0" />

                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="rounded-full bg-gray-300 dark:bg-gray-800 flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14" />
                      <div className="flex flex-col min-w-0">
                        <p className="font-helvetica text-[clamp(0.8rem,2vw,0.95rem)] text-gray-900 dark:text-gray-100">
                          {review.name}
                        </p>
                        <p className="font-helvetica text-[clamp(0.8rem,2vw,0.95rem)] text-gray-900 dark:text-gray-100 mb-2">
                          {review.company}
                        </p>
                        <div className="flex gap-0 [&>svg]:w-4 [&>svg]:h-4">
                          <StarIcon />
                          <StarIcon />
                          <StarIcon />
                          <StarIcon />
                          <StarIcon />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {mobilePages.length > 1 && (
          <div className="mt-8 flex justify-center gap-2" aria-hidden="true">
            {mobilePages.map((_, index) => (
              <span
                key={index}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  mobilePage === index ? 'w-8 bg-brand-blue' : 'w-3 bg-brand-blue/25'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}
