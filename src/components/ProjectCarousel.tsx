'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Container from '@/components/Container';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  metric?: string;
  metricLabel?: string;
  detail: string;
  results?: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Prebio Fibres',
    description: "Supporting one of the UK's first dedicated prebiotic health brands in establishing its retail presence through promotional development and testing.",
    image: '/projects/prebio.avif',
    category: 'Health & Retail',
    tags: ['Retail presence', 'Promotional testing', 'Brand launch'],
    detail: "Prebio Fibres needed to move from early brand promise into a credible retail-facing presence. The work focused on shaping promotional materials, testing positioning, and supporting a clearer commercial route into market.",
  },
  {
    id: 2,
    title: 'Drink Japan',
    description: 'A proof-of-concept campaign designed to draw the next generation of whiskey enjoyers to the luxury feel of Japanese exclusivity.',
    image: '/projects/drink_japan.avif',
    category: 'Luxury Drinks',
    tags: ['Proof of concept', 'Campaign strategy', 'Audience development'],
    detail: 'Drink Japan explored how a younger audience could be introduced to Japanese whiskey through exclusivity, atmosphere, and luxury-led campaign framing.',
  },
  {
    id: 3,
    title: 'Minecraft: In Abstract',
    description: 'A research project analysing physical brand asset placement in commonplace service spaces for a brand as recognisable as Minecraft.',
    image: '/projects/minecraft.avif',
    category: 'Brand Research',
    tags: ['Research', 'Brand placement', 'Servicescapes'],
    detail: 'This research-led project studied how recognisable brand assets behave when placed in everyday physical environments, using Minecraft as a distinctive example of modern visual memory.',
  },
  {
    id: 4,
    title: 'GTA 5: Player Preservation',
    description: "A community-facing concept Newswire dedicated to GTA 5's end-of-product preservation, designed by community coders and written by Consultico.",
    image: '/projects/gta.avif',
    category: 'Community Concept',
    tags: ['Community', 'Concept writing', 'Game preservation'],
    detail: "The GTA 5 concept project focused on community preservation: packaging a player-facing Newswire idea with language that respected the game's audience and long-running culture.",
  },
  {
    id: 5,
    title: 'The Boiler Co.',
    description: "Boosted The Boiler Co.'s organic traffic by nearly 400% in 3 months through SEO, increasing visibility, clicks, and traffic value without paid ads.",
    image: '/projects/boiler.avif',
    category: 'SEO',
    tags: ['SEO', 'Organic traffic', 'Lead generation'],
    metric: 'Nearly 400%',
    metricLabel: 'organic traffic growth',
    detail: "The Boiler Co. needed more visibility without leaning on paid ads. The SEO work improved rankings, clicks, and traffic value while building a more dependable organic acquisition channel.",
    results: [
      'Nearly 400% organic traffic growth in 3 months',
      'Improved visibility and click volume',
      'Traffic value increased to around $1,200/month without paid ads',
    ],
  },
  {
    id: 6,
    title: 'Hepburn Holistic',
    description: "Delivering one of Scotland's most indulgent massage studios a brand remodel package and bringing them online with a bespoke website.",
    image: '/projects/hepburn_holistic.avif',
    category: 'Brand & Web',
    tags: ['Brand remodel', 'Bespoke website', 'Local services'],
    detail: 'Hepburn Holistic needed a more polished brand presence and a website that reflected the quality of the studio experience. The project combined brand refresh work with a bespoke online presence.',
  },
];

const chunkItems = <T,>(items: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
};

function ProjectImageCard({
  project,
  onSelect,
  compact = false,
}: {
  project: Project;
  onSelect: (project: Project) => void;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(project)}
      className="group w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 rounded-lg"
      aria-label={`View ${project.title} project details`}
    >
      <div
        className={`relative w-full overflow-hidden rounded-lg bg-white dark:bg-gray-900 ${
          compact ? 'mb-3' : 'mb-4'
        }`}
        style={{ aspectRatio: '0.7 / 0.9' }}
      >
        <Image
          src={project.image}
          alt=""
          fill
          sizes={compact ? '(max-width: 1000px) 45vw, 33vw' : '33vw'}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gray-950/0 transition-colors duration-300 group-hover:bg-gray-950/55 group-focus-visible:bg-gray-950/55" />
        <div className="absolute inset-x-0 bottom-0 translate-y-3 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
          <p className="font-helvetica text-[clamp(0.72rem,1vw,0.85rem)] uppercase tracking-[0.14em] text-white/75">
            {project.category}
          </p>
          {project.metric && (
            <p className="mt-2 font-futura text-[clamp(1.3rem,2vw,1.9rem)] leading-none text-white">
              {project.metric}
            </p>
          )}
          <p className="mt-2 font-helvetica text-[clamp(0.85rem,1vw,1rem)] font-medium text-white">
            View project
          </p>
        </div>
      </div>
    </button>
  );
}

function ProjectDetailModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!project) return;

    window.dispatchEvent(new CustomEvent('consultico:project-modal', { detail: { open: true } }));

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.dispatchEvent(new CustomEvent('consultico:project-modal', { detail: { open: false } }));
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/60 px-4 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-detail-title"
        >
          <motion.div
            className="relative w-full max-w-5xl overflow-hidden rounded-lg bg-white shadow-2xl dark:bg-gray-950"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="absolute inset-0">
              <Image
                src={project.image}
                alt=""
                fill
                sizes="100vw"
                className="object-cover opacity-20 grayscale"
              />
              <div className="absolute inset-0 bg-white/82 dark:bg-gray-950/86" />
            </div>

            <div className="relative grid max-h-[86vh] overflow-y-auto lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
              <div className="relative min-h-[18rem] lg:min-h-full">
                <Image
                  src={project.image}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gray-950/25" />
              </div>

              <div className="relative p-6 sm:p-8 lg:p-10">
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-gray-300 bg-white/85 text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900/85 dark:text-gray-200 dark:hover:bg-gray-800"
                  aria-label="Close project details"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>

                <p className="mb-3 font-helvetica text-[clamp(0.75rem,1vw,0.9rem)] uppercase tracking-[0.16em] text-brand-blue">
                  {project.category}
                </p>
                <h3
                  id="project-detail-title"
                  className="mb-4 max-w-[16ch] font-futura text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] text-brand-blue"
                >
                  {project.title}
                </h3>
                <p className="mb-6 font-helvetica text-[clamp(1rem,1.25vw,1.2rem)] leading-[1.6] text-gray-800 dark:text-gray-200">
                  {project.description}
                </p>

                {project.metric && (
                  <div className="mb-6 border-l-2 border-brand-blue pl-4">
                    <p className="font-futura text-[clamp(2rem,4vw,3rem)] font-bold leading-none text-brand-blue">
                      {project.metric}
                    </p>
                    <p className="mt-2 font-helvetica text-[clamp(0.9rem,1vw,1rem)] text-gray-700 dark:text-gray-300">
                      {project.metricLabel}
                    </p>
                  </div>
                )}

                <p className="mb-6 font-helvetica-light text-[clamp(0.95rem,1.1vw,1.05rem)] leading-[1.65] text-gray-700 dark:text-gray-300">
                  {project.detail}
                </p>

                {project.results && (
                  <ul className="mb-6 space-y-3">
                    {project.results.map((result) => (
                      <li
                        key={result}
                        className="relative pl-6 font-helvetica text-[clamp(0.9rem,1vw,1rem)] leading-[1.5] text-gray-800 before:absolute before:left-0 before:text-brand-blue before:content-['•'] dark:text-gray-200"
                      >
                        {result}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-brand-blue/30 bg-brand-blue/10 px-3 py-1 font-helvetica text-[0.8rem] text-brand-blue"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function ProjectCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mobilePage, setMobilePage] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
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
                <ProjectImageCard project={project} onSelect={setSelectedProject} />

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
                    <ProjectImageCard project={project} onSelect={setSelectedProject} compact />
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
      <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </Container>
  );
}
