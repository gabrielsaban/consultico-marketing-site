'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Project Title',
    description: "Supporting one of the UK's first dedicated thing.",
  },
  {
    id: 2,
    title: 'Project Title',
    description: "Supporting one of the UK's first dedicated thing.",
  },
  {
    id: 3,
    title: 'Project Title',
    description: "Supporting one of the UK's first dedicated thing.",
  },
  {
    id: 4,
    title: 'Project Title',
    description: "Supporting one of the UK's first dedicated thing.",
  },
];

export default function ProjectCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < projects.length - 3) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const visibleProjects = projects.slice(currentIndex, currentIndex + 3);
  const showLeftArrow = currentIndex > 0;
  const showRightArrow = currentIndex < projects.length - 3;

  return (
    <div className="w-full pl-[7.5vw] pr-[7.5vw] py-16">
      <div className="relative">
        {/* Project Grid */}
        <div className="grid grid-cols-3 gap-15">
          <AnimatePresence mode="wait">
            {visibleProjects.map((project, idx) => (
              <motion.div
                key={`${project.id}-${currentIndex}`}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="flex flex-col"
              >
                {/* Project Image Placeholder */}
                <div
                  className="w-full bg-brand-silk rounded-lg mb-4"
                  style={{ aspectRatio: '0.7 / 0.9' }}
                />

                {/* Project Title */}
                <h3 className="font-helvetica font-bold text-[18px] xl:text-[23px] 2xl:text-[29px] text-black mb-2 max-w-[40%]">
                  {project.title}
                </h3>

                {/* Project Description */}
                <p className="font-helvetica text-[14px] xl:text-[16px] 2xl:text-[21px] text-gray-700">
                  {project.description}
                </p>
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
              className="absolute left-[-5rem] top-[40%] -translate-y-1/2 text-brand-blue hover:opacity-70 transition-opacity z-10"
              aria-label="Previous projects"
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
              className="absolute right-[-5rem] top-[40%] -translate-y-1/2 text-brand-blue hover:opacity-70 transition-opacity z-10"
              aria-label="Next projects"
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
    </div>
  );
}

