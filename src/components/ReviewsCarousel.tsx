'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
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
];

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

  const handleNext = () => {
    if (currentIndex < reviews.length - 3) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const visibleReviews = reviews.slice(currentIndex, currentIndex + 3);
  const showLeftArrow = currentIndex > 0;
  const showRightArrow = currentIndex < reviews.length - 3;

  return (
    <Container className="py-16 relative">
      <div className="relative">
        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
          <AnimatePresence mode="wait">
            {visibleReviews.map((review, idx) => (
              <motion.div
                key={`${review.id}-${currentIndex}`}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col"
              >
                {/* Review Text with inline quotes */}
                <p className="font-helvetica text-[clamp(0.875rem,1.1vw,1.125rem)] text-gray-800 leading-[1.7] mb-6 flex-grow">
                  <span className="text-[clamp(1.75rem,2vw,2rem)] text-brand-blue mr-1 inline-block align-top leading-none">&ldquo;</span>
                  {review.text}
                  <span className="text-[clamp(1.75rem,2vw,2rem)] text-brand-blue ml-1 inline-block align-top leading-none">&rdquo;</span>
                </p>

                {/* Blue Divider */}
                <div className="w-full h-[2px] bg-brand-blue mb-6 flex-shrink-0" />

                {/* Author Info */}
                <div className="flex items-start gap-7">
                  {/* Avatar Placeholder - matches height of text+stars div */}
                  <div className="rounded-full bg-gray-300 flex-shrink-0 w-[70px] h-[70px] xl:w-[75px] xl:h-[75px] 2xl:w-[90px] 2xl:h-[90px]" />
                  
                  <div className="flex flex-col">
                    {/* Name and Company */}
                    <p className="font-helvetica text-[clamp(0.875rem,1vw,1.125rem)] text-gray-900">
                      {review.name}
                    </p>
                    <p className="font-helvetica text-[clamp(0.875rem,1vw,1.125rem)] text-gray-900 mb-2">
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
          </AnimatePresence>
        </div>

        {/* Left Arrow - Absolutely Positioned */}
        <AnimatePresence>
          {showLeftArrow && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handlePrev}
              className="absolute left-[-5rem] top-[25%] -translate-y-1/2 text-brand-blue hover:opacity-70 transition-opacity z-10"
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
              className="absolute right-[-5rem] top-[25%] -translate-y-1/2 text-brand-blue hover:opacity-70 transition-opacity z-10"
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
    </Container>
  );
}

