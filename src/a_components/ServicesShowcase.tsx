'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface ServicesShowcaseProps {
  className?: string;
}

/**
 * ServicesShowcase renders a 2/3 + 1/3 layout:
 * - Left: horizontal scroller placeholder (will hold inner service items later)
 * - Right: vertical list placeholder (content TBD)
 * - Bottom: two CTA cards of slightly different widths
 * All cards use 10px radius and bleached silk background with a subtle border.
 */
export default function ServicesShowcase({ className = '' }: ServicesShowcaseProps) {
  const container = 'w-full';
  const cardBase = 'border border-brand-black/10 rounded-[20px]';
  const motionBase = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-10% 0% -10% 0%' },
    transition: { duration: 0.35, ease: 'easeOut' },
    whileHover: { y: -4 },
  } as const;

  return (
    <div className={`${container} ${className}`}>
      {/* Unified row with left column (2/3) and right column (1/3). Left contains top scroller (50%) and bottom CTAs (50%). */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 lg:h-[600px] xl:h-[640px]">
        {/* Left column (2/3) */}
        <div className="lg:col-span-2 flex flex-col gap-4 lg:gap-6 h-full">
          {/* Top: Horizontal services (50% of left column height) */}
          <motion.div
            {...motionBase}
            className={`h-[260px] md:h-[320px] lg:h-auto flex-1 ${cardBase} bg-brand-silk overflow-hidden flex flex-col`}
          >
            {/* Header */}
            <div className="p-4 md:p-6">
              <div className="flex items-baseline gap-3">
                <h4 className="text-blue-primary font-futura text-d-24 md:text-d-30 font-bold">Our Services</h4>
                <span className="text-gray-600 text-b-12 md:text-b-16 font-helvetica-light">Unlockable after your Health Report</span>
              </div>
            </div>

            {/* Horizontal list */}
            <div className="px-4 md:px-5 py-2 flex-1 min-h-0">
              <DragScroll fade fadeWidth={56} className="overflow-x-auto overflow-y-hidden h-full no-scrollbar cursor-grab active:cursor-grabbing">
                <div
                  className="h-full w-full select-none [--hgap:16px] lg:[--hgap:10px]"
                  style={{
                    display: 'grid',
                    gridAutoFlow: 'column',
                    gridAutoColumns: 'calc((100% - (3 * var(--hgap, 16px))) / 4 - var(--peek, 8px))',
                    gap: 'var(--hgap, 16px)',
                    paddingRight: 'var(--hgap, 16px)',
                    scrollSnapType: 'x mandatory',
                    alignItems: 'start',
                    width: '95%'
                  } as React.CSSProperties}
                >
                  {[
                    { title: 'SEO Growth Plan', provider: 'Consultico', blurb: 'Grow visibility and compounding organic traffic with on-page and authority building.' },
                    { title: 'Paid Ads', provider: 'Consultico', blurb: 'Efficient Google & Meta campaigns tuned for profitable acquisition.' },
                    { title: 'Web Refresh', provider: 'Trusted Partner', blurb: 'Sharpen structure, speed and UX for a persuasive, performant site.' },
                    { title: 'Brand Pack', provider: 'Trusted Partner', blurb: 'Voice, visuals and guidelines for unmistakable brand recognition.' },
                    { title: 'Email Marketing', provider: 'Consultico', blurb: 'Lifecycle flows that nurture, convert and retain your audience.' },
                    { title: 'Analytics Setup', provider: 'Consultico', blurb: 'GA4 and tracking configured for clean, decision-ready insights.' },
                  ].map((svc) => (
                    <div
                      key={svc.title}
                      className="bg-white border border-brand-black/10 rounded-[20px] shadow-sm flex flex-col p-4 md:p-5 lg:p-3 h-[160px] md:h-[180px] lg:h-[200px] overflow-hidden"
                      style={{
                        scrollSnapAlign: 'start'
                      }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="inline-flex items-center rounded-full bg-brand-silk text-brand-blue border border-brand-blue/20 px-2 py-1 text-b-10 sm:text-b-12 font-semibold whitespace-nowrap">
                          By: {svc.provider}
                        </span>
                      </div>
                      <h5 className="text-blue-primary font-futura text-d-16 md:text-d-24 font-bold mb-1">{svc.title}</h5>
                      <p className="text-gray-700 font-helvetica-light text-xs md:text-b-16 mb-4">{svc.blurb}</p>
                      <div className="mt-auto">
                        <button className="px-3 py-2 rounded-md bg-brand-blue text-white text-sm font-helvetica-ui font-semibold">Learn More</button>
                      </div>
                    </div>
                  ))}
                </div>
              </DragScroll>
            </div>
          </motion.div>

          {/* Bottom: Two CTAs under the horizontal services only (also 50% of left column height) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 h-[140px] md:h-[200px] lg:h-auto flex-1">
            <motion.div
              {...motionBase}
              className={`${cardBase} bg-white h-[140px] md:h-[200px] lg:h-full relative overflow-hidden text-brand-blue`}
            >
              {/* Text bottom-right */}
              <div className="absolute bottom-4 right-4 md:bottom-10 md:right-8 font-helvetica font-bold text-d-30 md:text-d-30 select-none">
                Free Assessment
              </div>

              {/* Arrow top-right - mirrored version of CTA B's arrow */}
              <div className="absolute top-4 right-4 md:top-10 md:right-10">
                <svg
                  viewBox="0 0 24 24"
                  className="w-15 h-15"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 20V10H10" />
                  <path d="M14 6l-4 4 4 4" />
                </svg>
              </div>

              {/* Data pulse rings accent top-left, overflowing and clipped */}
              <div className="pointer-events-none absolute -top-6 -left-6 md:-top-32 md:-left-20">
                <svg
                  viewBox="0 0 24 24"
                  className="w-28 h-28 md:w-75 md:h-75 opacity-25"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="12" cy="12" r="8" />
                  <circle cx="12" cy="12" r="11" stroke-dash-array="3 4" />
                </svg>
              </div>
            </motion.div>

            <motion.div
              {...motionBase}
              className={`${cardBase} h-[140px] md:h-[200px] lg:h-full bg-brand-blue text-white border-transparent relative overflow-hidden`}
            >
              <div className="absolute top-4 left-4 md:top-10 md:left-8 font-helvetica font-bold text-white text-d-30 md:text-d-30 select-none">
                Book My Health Report
              </div>
              <div className="absolute bottom-4 left-4 md:bottom-10 md:left-10">
                <svg
                  viewBox="0 0 24 24"
                  className="w-15 h-15 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 20V10h10" />
                  <path d="M10 6l4 4-4 4" />
                </svg>
              </div>
              {/* Decorative heart shape, overflowing bottom-right */}
              <svg
                viewBox="0 0 26 26"
                className="pointer-events-none absolute -bottom-4 -right-6 md:-bottom-24 md:-right-24 w-28 h-28 md:w-70 md:h-70 text-white opacity-25"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </motion.div>
          </div>
        </div>

        {/* Right column (1/3) spanning full vertical length */}
        <motion.div
          {...motionBase}
          className={`lg:col-span-1 h-[300px] md:h-[360px] lg:h-full ${cardBase} bg-brand-silk overflow-hidden`}
        >
          <div className="h-full w-full flex items-center justify-center text-gray-600 font-helvetica-light px-6 text-center">
            <div>
              <div className="text-d-20 md:text-d-24 font-futura text-blue-primary">Vertical Items</div>
              <div className="text-b-16 mt-2">Vertical list will be implemented here</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/**
 * Basic drag-to-scroll wrapper: enables mouse/touch dragging on overflow containers.
 */
function DragScroll({ className = '', children, fade = false, fadeWidth = 16 }: { className?: string; children: React.ReactNode; fade?: boolean; fadeWidth?: number }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDown = true;
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    };
    const onMouseLeave = () => { isDown = false; };
    const onMouseUp = () => { isDown = false; };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX);
      el.scrollLeft = scrollLeft - walk;
    };

    // Touch support
    let touchStartX = 0;
    let touchScrollLeft = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].pageX - el.offsetLeft;
      touchScrollLeft = el.scrollLeft;
    };
    const onTouchMove = (e: TouchEvent) => {
      const x = e.touches[0].pageX - el.offsetLeft;
      const walk = (x - touchStartX);
      el.scrollLeft = touchScrollLeft - walk;
    };

    el.addEventListener('mousedown', onMouseDown);
    el.addEventListener('mouseleave', onMouseLeave);
    el.addEventListener('mouseup', onMouseUp);
    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: true });

    // Dynamic fade that disappears at true start/end
    const updateMask = () => {
      if (!fade) return;
      const atStart = Math.round(el.scrollLeft) <= 0;
      const atEnd = Math.round(el.scrollLeft + el.clientWidth) >= Math.round(el.scrollWidth);
      let gradient = 'none';
      if (!atStart && !atEnd) {
        gradient = `linear-gradient(to right, rgba(0,0,0,0) 0, rgba(0,0,0,1) ${fadeWidth}px, rgba(0,0,0,1) calc(100% - ${fadeWidth}px), rgba(0,0,0,0) 100%)`;
      } else if (atStart && !atEnd) {
        gradient = `linear-gradient(to right, rgba(0,0,0,1) 0, rgba(0,0,0,1) calc(100% - ${fadeWidth}px), rgba(0,0,0,0) 100%)`;
      } else if (!atStart && atEnd) {
        gradient = `linear-gradient(to right, rgba(0,0,0,0) 0, rgba(0,0,0,1) ${fadeWidth}px, rgba(0,0,0,1) 100%)`;
      } else {
        gradient = 'none';
      }
      (el as any).style.webkitMaskImage = gradient;
      (el as any).style.maskImage = gradient;
    };

    updateMask();
    const onScroll = () => updateMask();
    el.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      el.removeEventListener('mousedown', onMouseDown);
      el.removeEventListener('mouseleave', onMouseLeave);
      el.removeEventListener('mouseup', onMouseUp);
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('touchstart', onTouchStart as any);
      el.removeEventListener('touchmove', onTouchMove as any);
      el.removeEventListener('scroll', onScroll as any);
    };
  }, [fade, fadeWidth]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}


