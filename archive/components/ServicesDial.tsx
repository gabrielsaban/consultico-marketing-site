'use client';

import React, { useEffect, useMemo, useRef, useState, useLayoutEffect } from 'react';
import { motion, useInView, useTransform } from 'framer-motion';
import { usePolarCarousel } from '@/hooks/usePolarCarousel';

export type ServiceProvider = 'Consultico' | 'Trusted Partner';

export type Service = {
  id: string;
  title: string;
  outcome?: string;
  provider?: ServiceProvider;
  priceFrom?: string;
  ctaLabel?: string;
  ctaDisabled?: boolean;
  unlockNote?: boolean;
  href?: string;
  bullets?: string[]; // optional for future
  caseStudy?: { client?: string; result?: string; href?: string };
};

interface ServicesDialProps {
  services: Service[];
  autoplay?: boolean;
  className?: string;
  centerHeading?: string;
}

export default function ServicesDial({ services, autoplay = false, className = '', centerHeading }: ServicesDialProps) {
  const itemCount = services.length;
  const rootRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(rootRef, { margin: '-20% 0px -20% 0px', once: false });
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Autoplay only when no active selection has been made (initial idle state)
  const [hasUserSelected, setHasUserSelected] = useState(false);
  const autoplayActive = autoplay && inView && !hasUserSelected;

  // Measure container size (robust): layout effect + RAF + ResizeObserver + window resize fallback
  const squareRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  useLayoutEffect(() => {
    let rafId: number | null = null;
    let tries = 0;
    const readNow = () => {
      const el = squareRef.current;
      if (!el) return;
      const w = el.getBoundingClientRect().width;
      if (w > 0 || tries > 10) {
        setContainerWidth(w);
        return;
      }
      tries += 1;
      rafId = window.requestAnimationFrame(readNow);
    };
    rafId = window.requestAnimationFrame(readNow);

    const handleResize = () => {
      const el = squareRef.current;
      if (!el) return;
      const w = el.getBoundingClientRect().width;
      if (w > 0) setContainerWidth(w);
    };
    window.addEventListener('resize', handleResize);

    const el = squareRef.current;
    let ro: ResizeObserver | null = null;
    if (el && 'ResizeObserver' in window) {
      ro = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const w = entry.contentRect.width;
          if (w > 0) setContainerWidth(w);
        }
      });
      ro.observe(el);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      if (ro) ro.disconnect();
    };
  }, []);

  const isMobile = containerWidth > 0 && containerWidth < 520;
  // Reduce radius for thicker wedges
  const cardOffset = isMobile ? 36 : 56; // larger offset = smaller radius
  const radius = Math.max(0, containerWidth / 2 - cardOffset);

  const ellipseScale = isMobile ? 0.85 : 1.75;

  const {
    progress,
    activeIndex,
    reduceMotion,
    snapTo,
    increment,
    onDragStart,
    onDrag,
    onDragEnd,
    onWheel,
    onKeyDown,
    isTapAllowed,
  } = usePolarCarousel({ itemCount, radius, initialIndex: 0, autoplay: autoplayActive, ellipseXScale: ellipseScale });

  const activeService = useMemo(() => (selectedIndex != null ? services[selectedIndex] : undefined), [services, selectedIndex]);

  // Rotation value for radial background wedges (must be a hook at top-level)
  const anglePer = 360 / Math.max(1, itemCount);
  const rotationMV = useTransform(progress, (p) => -(p as number) * anglePer);
  const innerGapR = useMemo(() => Math.max(8, radius - (isMobile ? 70 : 86)), [radius, isMobile]);
  // Counter-rotation for labels so they remain upright
  const counterMV = useTransform(rotationMV, (v) => -(v as number));

  const onCardClick = (idx: number) => {
    if (selectedIndex === idx) {
      setSelectedIndex(null);
      setHasUserSelected(false);
      return;
    }
    setSelectedIndex(idx);
    setHasUserSelected(true);
    snapTo(idx);
  };

  // Default active wedge: SEO Growth Plan (or first item if not found)
  useEffect(() => {
    if (selectedIndex != null) return;
    const preferIdx = services.findIndex((s) => (s.id?.toLowerCase?.() === 'seo') || /seo\s+growth\s+plan/i.test(s.title));
    const idx = preferIdx >= 0 ? preferIdx : 0;
    setSelectedIndex(idx);
    setHasUserSelected(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [services.length]);

  const handleCTA = (svc: Service) => {
    if (!svc.href) return;
    if (svc.href.startsWith('#')) {
      const id = svc.href.slice(1);
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.open(svc.href, '_self');
    }
  };

  

  // Prepare two-line heading for mobile if provided
  const headingFirst = centerHeading ? centerHeading.split(' ')[0] : '';
  const headingRest = centerHeading ? centerHeading.split(' ').slice(1).join(' ') : '';

  return (
    <div className={`w-full ${className} py-8 md:py-0`} ref={rootRef}>
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Dial (sticky on desktop) */}
        <div className="lg:col-span-6 lg:sticky lg:top-24 justify-self-center w-full">
        <motion.div
          role="listbox"
          aria-label="Services"
          aria-activedescendant={activeService ? `service-option-${activeService.id}` : undefined}
          tabIndex={0}
          onKeyDown={onKeyDown}
          onWheel={onWheel}
          className="relative mx-auto flex items-center justify-center"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0}
          dragMomentum={false}
          onDragStart={onDragStart}
          onDrag={onDrag}
          onDragEnd={() => {
            onDragEnd();
            const nearest = Math.round(progress.get());
            const idx = ((nearest % itemCount) + itemCount) % itemCount;
            setSelectedIndex(idx);
            setHasUserSelected(true);
          }}
        >
          {/* CSS-sized square container to avoid hydration mismatch */}
          <div
            ref={squareRef}
            className="relative w-full max-w-[680px] min-w-[360px] aspect-square mx-auto my-4 sm:my-0 pointer-events-auto"
          >
            {/* Radial background with segment wedges */}
            {containerWidth >= 320 && radius >= 120 ? (
              <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${containerWidth} ${containerWidth}`} preserveAspectRatio="xMidYMid meet" aria-hidden>
                {(() => {
                  const cx = containerWidth / 2;
                  const cy = containerWidth / 2;
                  const anglePer = 360 / Math.max(1, itemCount);
                  const outerR = radius + (isMobile ? 18 : 24);
                  const innerR = Math.max(8, radius - (isMobile ? 70 : 86));

                  const polar = (r: number, deg: number) => {
                    const t = (deg * Math.PI) / 180;
                    return [cx + r * Math.sin(t), cy - r * Math.cos(t)];
                  };
                  const sectorPath = (r0: number, r1: number, a0: number, a1: number) => {
                    const [x0, y0] = polar(r1, a0);
                    const [x1, y1] = polar(r1, a1);
                    const [x2, y2] = polar(r0, a1);
                    const [x3, y3] = polar(r0, a0);
                    const largeArc = Math.abs(a1 - a0) > 180 ? 1 : 0;
                    return `M ${x0} ${y0} A ${r1} ${r1} 0 ${largeArc} 1 ${x1} ${y1} L ${x2} ${y2} A ${r0} ${r0} 0 ${largeArc} 0 ${x3} ${y3} Z`;
                  };

                  return (
                    <motion.g style={{ rotate: rotationMV, transformOrigin: `${cx}px ${cy}px` }}>
                      {Array.from({ length: itemCount }).map((_, i) => {
                        const start = i * anglePer - anglePer / 2;
                        const end = start + anglePer;
                        const isActiveSeg = selectedIndex === i;
                        const d = sectorPath(innerR, outerR, start, end);
                        return (
                          <g key={`seg-${i}`}>
                            <path
                              d={d}
                              fill={isActiveSeg ? '#eef5ff' : '#f3f4f6'}
                              style={{ pointerEvents: 'auto', cursor: 'pointer' }}
                              onClick={(e) => { e.preventDefault(); e.stopPropagation(); onCardClick(i); }}
                            />
                            {isActiveSeg && (
                              <path
                                d={d}
                                fill="none"
                                stroke="var(--brand-blue)"
                                strokeWidth={3}
                                vectorEffect="non-scaling-stroke"
                                strokeLinejoin="round"
                                pointerEvents="none"
                              />
                            )}
                            {/* Label inside wedge (upright, no rotation) */}
                            {(() => {
                              const mid = (start + end) / 2;
                              const labelR = (innerR + outerR) / 2;
                              const [lx, ly] = polar(labelR, mid);
                              const svc = services[i];
                              const labelText = svc.title
                                .replace(/SEO\s+Growth\s+Plan/i, 'SEO Growth\nPlan')
                                .replace(/Email\s+Marketing/i, 'Email\nMarketing');
                              return (
                                <g transform={`translate(${lx}, ${ly})`}>
                                  <motion.g style={{ rotate: counterMV, transformBox: 'fill-box', transformOrigin: '0 0' }}>
                                    <foreignObject x={-96} y={-20} width={192} height={40} style={{ overflow: 'visible', pointerEvents: 'auto' }}>
                                      <button
                                        className={`w-full text-center ${isActiveSeg ? 'text-brand-blue' : 'text-gray-700'} font-futura ${isActiveSeg ? 'font-semibold' : 'font-medium'} text-b-10 sm:text-b-12 leading-tight whitespace-pre-line`} 
                                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); onCardClick(i); }}
                                      >
                                        {labelText}
                                      </button>
                                    </foreignObject>
                                  </motion.g>
                                </g>
                              );
                            })()}
                          </g>
                        );
                      })}
                      {/* Separator lines */}
                      {Array.from({ length: itemCount }).map((_, i) => {
                        const a = i * anglePer - anglePer / 2;
                        const [sx, sy] = polar(innerR, a);
                        const [ex, ey] = polar(outerR, a);
                        return (
                          <line key={`sep-${i}`} x1={sx} y1={sy} x2={ex} y2={ey} stroke="#e5e7eb" strokeWidth={1} vectorEffect="non-scaling-stroke" />
                        );
                      })}
                      {/* Constant inner/outer ring strokes for consistency */}
                      <circle cx={cx} cy={cy} r={outerR} fill="none" stroke="#e5e7eb" strokeWidth={1.25} vectorEffect="non-scaling-stroke" />
                      <circle cx={cx} cy={cy} r={innerR} fill="none" stroke="#e5e7eb" strokeWidth={1.25} vectorEffect="non-scaling-stroke" />
                      {/* Active arc outline is drawn per-wedge above */}
                    </motion.g>
                  );
                })()}
              </svg>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-[70%] aspect-square">
                  <div className="absolute inset-0 rounded-full ring-1 ring-gray-200 bg-gray-100/40" />
                  <div className="absolute inset-[18%] rounded-full ring-1 ring-gray-200 bg-white/60" />
                </div>
              </div>
            )}

            {/* Labels rendered inside wedges; no external floating labels */}

            {/* Expanded info panel for active wedge (centered) */}
            {selectedIndex != null && services[selectedIndex] && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-live="polite">
                <div
                  className="rounded-full ring-1 ring-gray-200 bg-white/90 backdrop-blur-sm shadow-md flex flex-col items-center justify-center text-center"
                  style={{ width: Math.max(80, innerGapR * 2 - 14), height: Math.max(80, innerGapR * 2 - 14) }}
                >
                  <div className="mb-1 text-brand-blue text-xs md:text-sm font-helvetica">By: {services[selectedIndex].provider}</div>
                  <div className="text-blue-primary font-futura text-base md:text-2xl font-bold">{services[selectedIndex].title}</div>
                  {services[selectedIndex].outcome && (
                    <div className="mt-2 text-gray-700 text-sm md:text-base font-helvetica-light">{services[selectedIndex].outcome}</div>
                  )}
                  {services[selectedIndex].unlockNote && (
                    <div className="mt-2 text-gray-500 text-xs md:text-sm">Unlockable after your Health Report.</div>
                  )}
                </div>
              </div>
            )}
            {/* Top indicator removed; outline on active wedge indicates selection */}
            {centerHeading && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-[1200]">
                <h3 className="text-blue-primary font-futura text-2xl md:text-3xl lg:text-4xl font-bold text-center leading-tight whitespace-pre-line">
                  <span className="sm:hidden block">{headingFirst}</span>
                  <span className="sm:hidden block">{headingRest}</span>
                  <span className="hidden sm:inline">{centerHeading}</span>
                </h3>
              </div>
            )}
            {/* Labels and interactions are handled on the wedges below */}
          </div>
        </motion.div>
        </div>

        {/* Right: Details Card */}
        <aside className="lg:col-span-6 mt-6 lg:mt-0">
          <div className="rounded-2xl ring-1 ring-gray-200 bg-white/70 backdrop-blur-sm shadow-sm p-5 md:p-6 flex flex-col" aria-live="polite">
            {selectedIndex != null && activeService ? (
              <>
                {/* CTA first for keyboard order */}
                <div className="mb-4">
                  <button
                    type="button"
                    disabled={Boolean(activeService.ctaDisabled)}
                    className={`w-full md:w-auto px-5 py-3 rounded-lg text-white font-futura font-semibold text-sm md:text-base ${activeService.ctaDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-brand-blue hover:bg-brand-blue'}`}
                    onClick={() => handleCTA(activeService)}
                  >
                    {activeService.ctaLabel ?? 'Access Portal'}
                  </button>
                </div>

                {activeService.provider && (
                  <div className="mb-1 text-brand-blue text-xs md:text-sm font-helvetica">By: {activeService.provider}</div>
                )}
                <h3 className="text-blue-primary font-futura text-xl md:text-2xl font-bold">{activeService.title}</h3>
                {activeService.outcome && (
                  <p className="mt-3 text-gray-700 text-sm md:text-base font-helvetica-light break-words">{activeService.outcome}</p>
                )}

                {/* Meta rows */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="rounded-lg ring-1 ring-gray-200 bg-white/60 p-3">
                    <div className="text-gray-500">Typical timeline</div>
                    <div className="text-gray-800 font-medium">{(activeService as unknown as { timeRequired?: string })?.timeRequired ?? '2–4 weeks'}</div>
                  </div>
                  <div className="rounded-lg ring-1 ring-gray-200 bg-white/60 p-3">
                    <div className="text-gray-500">Expected result</div>
                    <div className="text-gray-800 font-medium">{(activeService as unknown as { returns?: string; expectedReturn?: string })?.returns ?? (activeService as unknown as { returns?: string; expectedReturn?: string })?.expectedReturn ?? 'Meaningful lift in visibility and qualified leads'}</div>
                  </div>
                </div>

                {/* Case study row */}
                {Boolean(activeService?.caseStudy) && (
                  <div className="mt-4 rounded-lg ring-1 ring-gray-200 bg-white/60 p-3">
                    <div className="text-gray-700 font-medium">
                      {activeService?.caseStudy?.client ?? 'Client'}
                    </div>
                    {activeService?.caseStudy?.result && (
                      <div className="text-gray-600 text-sm">{activeService.caseStudy.result}</div>
                    )}
                    {activeService?.caseStudy?.href && (
                      <a href={activeService.caseStudy.href} className="inline-flex items-center text-brand-blue text-sm mt-2 hover:underline">Read case study →</a>
                    )}
                  </div>
                )}

                {/* Prev/Next controls */}
                <div className="mt-6 flex gap-3">
                  <button
                    type="button"
                    className="px-4 py-2 rounded-lg ring-1 ring-gray-300 bg-white/70 hover:bg-white text-gray-700"
                    onClick={() => { const idx = snapTo(activeIndex - 1); setSelectedIndex(idx); setHasUserSelected(true); }}
                  >
                    ‹ Prev
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 rounded-lg ring-1 ring-gray-300 bg-white/70 hover:bg-white text-gray-700"
                    onClick={() => { const idx = snapTo(activeIndex + 1); setSelectedIndex(idx); setHasUserSelected(true); }}
                  >
                    Next ›
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center text-gray-700 font-helvetica-light">
                <h3 className="text-blue-primary font-futura text-lg md:text-xl font-bold">Pick a service</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>• Click a slice on the dial to preview details</li>
                  <li>• Use drag/arrow keys to browse services</li>
                  <li>• Access the client portal when ready</li>
                </ul>
                <div className="mt-4">
                  <button type="button" disabled className="px-5 py-3 rounded-lg bg-gray-300 text-white font-futura font-semibold cursor-not-allowed">Access Portal</button>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* SR-only live region to announce active service changes */}
        <div className="sr-only" aria-live="polite" role="status">{activeService ? `Active service: ${activeService.title}` : 'No service selected'}</div>
      </div>

      {/*
       * Manual checklist:
       * - Drag with mouse/touch rotates and snaps.
       * - Wheel and arrow keys change active item.
       * - Mobile horizontal snaps and CTA works.
       * - Reduced motion: instant snap, no scale transitions.
       * - Accessibility: role=listbox, role=option, aria-selected, detail aria-live.
       * - Performance: transform/opacity only, will-change set, memoized values.
       */}
    </div>
  );
}


