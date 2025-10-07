'use client';

import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';

export type Project = {
  id: number;
  title: string;
  role: string;         // e.g., "Design & Dev"
  team: string;         // e.g., "Consultico + Partners"
  blurb: string;        // 2–3 sentences
  imageSrc: string;     // next/image path
  imageAlt: string;     // alt text
  href?: string;        // optional link to the case study
};

// Tiles reveal individually while-in-view; no container-driven animation

function ProjectTile({
  project,
  isOpen,
  onToggle,
  idx,
  scrollYProgress,
  reduceMotion,
  disableMotion,
}: {
  project: Project;
  isOpen: boolean;
  onToggle: () => void;
  idx: number;
  scrollYProgress: MotionValue<number>;
  reduceMotion: boolean;
  disableMotion: boolean;
}) {
  const tileRef = useRef<HTMLDivElement | null>(null);

  // Per-tile animations derived from section scroll progress
  const col = idx % 3;
  const yRanges: ReadonlyArray<[number, number]> = [
    [reduceMotion ? 0 : 120, 0],
    [reduceMotion ? 0 : 90, 0],
    [reduceMotion ? 0 : 60, 0],
  ];
  const yMv = useSpring(useTransform(scrollYProgress, [0, 1], yRanges[col]), {
    stiffness: 160,
    damping: 24,
    mass: 0.7,
  });
  const phase = Math.floor(idx / 3) * 0.08;
  const opMv = useSpring(useTransform(scrollYProgress, [0 + phase, 0.25 + phase], [0, 1]), {
    stiffness: 140,
    damping: 22,
  });

  const panelId = `project-panel-${project.id}`;

  return (
    <motion.div
      ref={tileRef}
      layout
      style={{ y: disableMotion ? 0 : yMv, opacity: disableMotion ? 1 : opMv }}
      className={`relative rounded-2xl ring-0 shadow-none bg-gray-200 overflow-hidden transform-gpu will-change-transform will-change-opacity z-0`}
    >
      <button
        type="button"
        className="group relative block w-full aspect-[2/3] md:aspect-[2/3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggle();
          }
        }}
      >
        {/* Image */}
        <Image
          src={project.imageSrc}
          alt={project.imageAlt}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover"
          priority={false}
        />

        {/* Hover sheen (no transform) */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden>
          <div className="absolute -inset-1 bg-gradient-to-br from-white/20 to-transparent" />
        </div>

        {/* Click overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id={panelId}
              role="dialog"
              aria-label={`${project.title} details`}
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="fixed inset-0 z-50 bg-white/95 backdrop-blur-sm p-3 sm:p-4 md:p-6 flex flex-col cursor-pointer overflow-auto md:absolute md:z-auto md:overflow-hidden"
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
            >
              <h3 className="text-blue-primary font-futura text-base sm:text-lg md:text-2xl font-bold leading-tight">{project.title}</h3>
              <div className="text-brand-blue text-b-10 sm:text-b-12 md:text-b-16 font-helvetica mt-1">
                {project.role} — {project.team}
              </div>
              <p className="text-gray-700 font-helvetica-light text-b-12 md:text-b-16 mt-2 leading-snug">{project.blurb}</p>
              {project.href && (
                <a
                  href={project.href}
                  className="inline-flex items-center text-blue-primary font-helvetica mt-3 text-sm md:text-base hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  View case study →
                </a>
              )}
              <div className="mt-auto pt-3">
                <span className="inline-block text-brand-blue text-xs">Click outside to close</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  );
}

export default function ProjectsGrid(): React.JSX.Element {
  const projects: Project[] = useMemo(
    () => [
      {
        id: 1,
        title: 'North Shore Interiors',
        role: 'Brand + Web',
        team: 'Consultico',
        blurb:
          'A crisp, editorial identity and a conversion-oriented site for a fast-growing interior studio. Built for speed, clarity, and lead quality.',
        imageSrc: '/projects/placeholder-1.jpg',
        imageAlt: 'North Shore Interiors website preview',
        href: '#',
      },
      {
        id: 2,
        title: 'Marble & Grain',
        role: 'Content + SEO',
        team: 'Consultico',
        blurb:
          'Search-first content paired with lightweight brand storytelling. Rankings climbed steadily while bounce rate dropped across key pages.',
        imageSrc: '/projects/placeholder-2.jpg',
        imageAlt: 'Marble & Grain case preview',
        href: '#',
      },
      {
        id: 3,
        title: 'Hawk Systems',
        role: 'Design + Dev',
        team: 'Consultico',
        blurb:
          'Complex product, simple interface. We shipped a scalable design system and a site that explains value in seconds.',
        imageSrc: '/projects/placeholder-3.jpg',
        imageAlt: 'Hawk Systems interface preview',
        href: '#',
      },
      {
        id: 4,
        title: 'Green Orbit',
        role: 'Brand Refresh',
        team: 'Consultico + Partner',
        blurb:
          'A focused refresh that sharpened the visual language and clarified the message across landing pages and ads.',
        imageSrc: '/projects/placeholder-4.jpg',
        imageAlt: 'Green Orbit branding preview',
      },
      {
        id: 5,
        title: 'Lumen Clinics',
        role: 'Web + Ads',
        team: 'Consultico',
        blurb:
          'Performance-first redesign paired with targeted ad campaigns. Appointment volume and qualified enquiries increased month-on-month.',
        imageSrc: '/projects/placeholder-5.jpg',
        imageAlt: 'Lumen Clinics website preview',
      },
      {
        id: 6,
        title: 'Ridge Supply',
        role: 'eCom UX',
        team: 'Consultico',
        blurb:
          'A frictionless purchase flow and cleaner category structure. Reduced abandonment and stronger repeat purchase behaviour.',
        imageSrc: '/projects/placeholder-6.jpg',
        imageAlt: 'Ridge Supply ecommerce preview',
        href: '#',
      },
    ],
    []
  );

  const [openId, setOpenId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = !!useReducedMotion();
  const disableMotion = typeof window !== 'undefined' ? window.matchMedia('(max-width: 767px)').matches : false;

  const close = useCallback(() => setOpenId(null), []);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [close]);

  // Close when clicking outside the grid
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, [close]);

  // Section scroll-linked animation: compute on the outer section
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start 85%', 'end 15%'] });

  // Per-tile motion values are computed inside ProjectTile to satisfy hook rules

  return (
    <section ref={sectionRef} className="relative w-full py-20 md:py-24 lg:py-28 overflow-visible">
      <div className="absolute inset-0 -z-10 dot-grid-premium section-mask" aria-hidden />

      <div className="mx-auto px-2 sm:px-4 lg:px-6 w-full max-w-screen-2xl overflow-visible">

        <motion.div
          ref={containerRef}
          className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-8 overflow-visible isolation-isolate"
          layout
        >
          {projects.map((p, idx) => {
            const isOpen = openId === p.id;
            return (
              <ProjectTile
                key={p.id}
                project={p}
                isOpen={isOpen}
                onToggle={() => setOpenId((cur) => (cur === p.id ? null : p.id))}
                idx={idx}
                scrollYProgress={scrollYProgress}
                reduceMotion={reduceMotion}
                disableMotion={disableMotion}
              />
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}


