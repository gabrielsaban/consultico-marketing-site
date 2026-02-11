'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { usePreloader } from './PreloaderContext';

const SESSION_KEY = 'consultico-preloader-seen';

// Timing constants (ms)
const DRAW_DURATION = 1400;
const FILL_DELAY = 1000;
const FILL_DURATION = 600;
const HOLD_PAUSE = 400;
const REVEAL_DURATION = 800;

const REVEAL_AT = FILL_DELAY + FILL_DURATION + HOLD_PAUSE; // 2000ms
const DONE_AT = REVEAL_AT + REVEAL_DURATION + 50;          // 2850ms

// C mark path from public/brand/logo_main-cropped.svg
const C_MARK_PATH =
  'M50.2449 14.7318C63.0182 13.7244 75.1379 16.0234 86.2796 22.3019C87.6767 23.0898 92.1323 25.3888 92.272 26.8151C92.4566 28.7051 83.3307 41.2672 81.5046 41.5215C79.2692 41.8357 68.8211 37.0233 65.4232 36.1655C52.0561 32.7844 39.0434 34.9238 29.633 45.4911C6.19208 71.8071 31.7985 109.119 65.7076 100.497C68.6514 99.7488 78.6306 94.5923 79.9229 94.9414C81.4197 95.3453 89.6775 107.533 89.7673 109.129C89.887 111.249 83.226 114.585 81.29 115.577C42.7905 135.32 -5.61822 107.124 0.53391 62.292C4.2212 35.3926 22.9869 16.8811 50.2449 14.7318Z';

export default function SitePreloader() {
  const [active, setActive] = useState(true);
  const [phase, setPhase] = useState<'draw' | 'reveal' | 'done'>('draw');
  const initialized = useRef(false);
  const { markReady } = usePreloader();

  useEffect(() => {
    // Skip on repeat visits within the same session
    try {
      if (sessionStorage.getItem(SESSION_KEY)) {
        setActive(false);
        markReady();
        return;
      }
    } catch {
      // sessionStorage unavailable — show preloader anyway
    }

    if (initialized.current) return;
    initialized.current = true;

    // Lock scroll while the preloader is visible
    const { style } = document.body;
    style.overflow = 'hidden';

    const revealTimer = setTimeout(() => {
      setPhase('reveal');
      markReady();
      try {
        sessionStorage.setItem(SESSION_KEY, '1');
      } catch {
        /* no-op */
      }
    }, REVEAL_AT);

    const doneTimer = setTimeout(() => {
      setPhase('done');
      setActive(false);
      style.overflow = '';
    }, DONE_AT);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(doneTimer);
      style.overflow = '';
    };
  }, []);

  if (!active) return null;

  const isRevealing = phase === 'reveal';

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-gray-950"
      animate={{ y: isRevealing ? '-100%' : '0%' }}
      transition={
        isRevealing
          ? { duration: REVEAL_DURATION / 1000, ease: [0.76, 0, 0.24, 1] }
          : { duration: 0 }
      }
    >
      {/* Logo wrapper — fades out as the overlay slides away */}
      <motion.div
        animate={{ opacity: isRevealing ? 0 : 1 }}
        transition={{ duration: 0.35, ease: 'easeIn' }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 94.86 125.84"
          className="w-20 sm:w-24"
          fill="none"
        >
          <motion.path
            d={C_MARK_PATH}
            stroke="#007BFE"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="#007BFE"
            initial={{ pathLength: 0, fillOpacity: 0 }}
            animate={{ pathLength: 1, fillOpacity: 1 }}
            transition={{
              pathLength: {
                duration: DRAW_DURATION / 1000,
                ease: 'easeInOut',
              },
              fillOpacity: {
                duration: FILL_DURATION / 1000,
                delay: FILL_DELAY / 1000,
                ease: 'easeIn',
              },
            }}
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}
