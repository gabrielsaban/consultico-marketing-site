'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Container from '@/components/Container';

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
  {
    id: 5,
    title: 'Project Title',
    description: "Supporting one of the UK's first dedicated thing.",
  },
  {
    id: 6,
    title: 'Project Title',
    description: "Supporting one of the UK's first dedicated thing.",
  },
  {
    id: 7,
    title: 'Project Title',
    description: "Supporting one of the UK's first dedicated thing.",
  },
  {
    id: 8,
    title: 'Project Title',
    description: "Supporting one of the UK's first dedicated thing.",
  },
];

const chunkItems = <T,>(items: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
};

export default function ProjectCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mobilePage, setMobilePage] = useState(0);
  const [desktopStep, setDesktopStep] = useState(0);
  const desktopTrackRef = useRef<HTMLDivElement | null>(null);
  const mobileScrollerRef = useRef<HTMLDivElement | null>(null);
  const maxIndex = Math.max(projects.length - 3, 0);
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
  const mobilePages = chunkItems(projects, 4);

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
    <Container className="py-16">
      <div className="relative hidden [@media(min-width:1001px)]:block">
        {/* Project Track */}
        <div className="overflow-hidden">
          <motion.div
            ref={desktopTrackRef}
            className="flex gap-12"
            animate={{ x: -currentIndex * desktopStep }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                className="flex flex-none flex-col"
                style={{ width: 'calc((100% - 6rem) / 3)' }}
              >
                {/* Project Image Placeholder */}
                <div
                  className="w-full bg-white dark:bg-gray-900 rounded-lg mb-4"
                  style={{ aspectRatio: '0.7 / 0.9' }}
                />

                {/* Project Title */}
                <h3 className="font-helvetica font-bold text-[clamp(1.125rem,1.4vw,1.5rem)] text-black dark:text-gray-100 mb-2">
                  {project.title}
                </h3>

                {/* Project Description */}
                <p className="font-helvetica text-[clamp(0.875rem,1vw,1.125rem)] text-gray-700 dark:text-gray-300">
                  {project.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {maxIndex > 0 && (
          <div
            className="mt-8 flex justify-center gap-2"
            aria-label="Project carousel progress"
          >
            {desktopProgressItems.map((index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  currentIndex === index ? 'w-8 bg-brand-blue' : 'w-3 bg-brand-blue/25 hover:bg-brand-blue/45'
                }`}
                aria-label={`Show project set ${index + 1}`}
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
              className="absolute left-[-5rem] top-[40%] -translate-y-1/2 text-brand-blue transition-[opacity,transform] duration-200 hover:opacity-80 hover:scale-110 active:scale-95 z-10"
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
              className="absolute right-[-5rem] top-[40%] -translate-y-1/2 text-brand-blue transition-[opacity,transform] duration-200 hover:opacity-80 hover:scale-110 active:scale-95 z-10"
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
              <div className="mx-auto grid max-w-[40rem] grid-cols-2 gap-5 sm:gap-6">
                {page.map((project) => (
                  <div key={project.id} className="flex flex-col">
                    <div
                      className="w-full bg-white dark:bg-gray-900 rounded-lg mb-3"
                      style={{ aspectRatio: '0.7 / 0.9' }}
                    />
                    <h3 className="font-helvetica font-bold text-[clamp(0.95rem,2.4vw,1.1rem)] text-black dark:text-gray-100 mb-1.5">
                      {project.title}
                    </h3>
                    <p className="font-helvetica text-[clamp(0.8rem,2vw,0.95rem)] leading-[1.45] text-gray-700 dark:text-gray-300">
                      {project.description}
                    </p>
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
