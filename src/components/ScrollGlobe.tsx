'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Decorative wireframe globe that tilts with scroll.
 * Renders ~2/3 of a sphere via stroke-only longitude/latitude arcs.
 * Uses CSS perspective + Framer useTransform for a fake-3D feel.
 */
export default function ScrollGlobe({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'], // 0 → 1 as section traverses viewport
  });

  // Scroll-driven 3D tilt — crank values for visible movement
  const rotateY = useTransform(scrollYProgress, [0, 1], [-50, 25]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [20 ,0]);
  const translateY = useTransform(scrollYProgress, [0, 1], [0,0]);

  return (
    <div ref={ref} className={`pointer-events-none select-none ${className}`}>
      <motion.div
        style={{
          perspective: 600,
          transformStyle: 'preserve-3d',
        }}
      >
        <motion.div
          style={{
            rotateX,
            rotateY,
            translateY,
          }}
        >
        <svg
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          aria-hidden="true"
        >
          {/* Outer circle (equator outline) */}
          <circle
            cx="200"
            cy="200"
            r="180"
            stroke="currentColor"
            strokeWidth="3.5"
            opacity="1"
          />

          {/* Latitude lines (horizontal rings as ellipses) — thicker near equator, thinner at poles */}
          {([-120, -60, 0, 60, 120] as const).map((offset) => {
            const dist = Math.abs(offset);
            const sw = dist === 0 ? 1.2 : dist <= 60 ? 0.8 : 0.4;
            return (
              <ellipse
                key={`lat-${offset}`}
                cx="200"
                cy={200 + offset}
                rx={Math.sqrt(180 * 180 - offset * offset)}
                ry={Math.sqrt(180 * 180 - offset * offset) * 0.15}
                stroke="currentColor"
                strokeWidth={sw}
                opacity="1"
              />
            );
          })}

          {/* Longitude arcs (vertical meridians) — wider arcs thicker (facing viewer), narrow ones thinner */}
          {([0.15, 0.4, 0.7, 1] as const).map((rx, i) => (
            <g key={`lon-${i}`}>
              <ellipse
                cx="200"
                cy="200"
                rx={180 * rx}
                ry={180}
                stroke="currentColor"
                strokeWidth={rx >= 0.7 ? 1 : rx >= 0.4 ? 0.7 : 0.4}
                opacity="1"
              />
            </g>
          ))}

          {/* Centre vertical meridian (prime meridian — slightly bolder) */}
          <line
            x1="200"
            y1="20"
            x2="200"
            y2="380"
            stroke="currentColor"
            strokeWidth="1.2"
            opacity="1"
          />

          {/* Horizontal equator — bolder than other latitudes */}
          <line
            x1="20"
            y1="200"
            x2="380"
            y2="200"
            stroke="currentColor"
            strokeWidth="1"
            opacity="1"
          />

        </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
