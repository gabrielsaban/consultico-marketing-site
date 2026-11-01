'use client';

import { usePreloader } from '@/components/PreloaderContext';

/**
 * The Loop ring: thin rings and one thick blue arc that runs from a small dot
 * at the top, round the right-hand side, to a larger sky dot at the lower
 * left. It's the Loop mark from the brand material, used plainly (Paul,
 * 2026-11-01).
 *
 * It sits on its own solid disc (soft blue in light mode, the Loop navy in
 * dark) with a faint full track at the arc's radius, and the arc draws itself
 * round that track on load: it swoops in rather than sliding up from below.
 *
 * The draw is CSS, held paused until the site preloader has lifted (it covers
 * the page for about 2.8s on a first visit, which would otherwise hide the
 * whole swoop). The ring isn't the hero's LCP element, so waiting costs
 * nothing there. prefers-reduced-motion gets the finished ring straight away.
 */
const CENTRE = 210;
const ARC_RADIUS = 140;

// The arc starts at the top (-90°) and runs clockwise to 157°, lower left.
const END_ANGLE = (157 * Math.PI) / 180;
const END_X = (CENTRE + ARC_RADIUS * Math.cos(END_ANGLE)).toFixed(1);
const END_Y = (CENTRE + ARC_RADIUS * Math.sin(END_ANGLE)).toFixed(1);

const ANIMATION_CSS = `
.loop-ring[data-ready="false"] .loop-ring-arc, .loop-ring[data-ready="false"] .loop-ring-start, .loop-ring[data-ready="false"] .loop-ring-end { animation-play-state: paused; }
.loop-ring-arc { stroke-dasharray: 1; stroke-dashoffset: 1; animation: loop-ring-draw 1.5s cubic-bezier(0.65, 0, 0.35, 1) 0.25s forwards; }
.loop-ring-start { opacity: 0; animation: loop-ring-fade 0.3s ease-out 0.1s forwards; }
.loop-ring-end { opacity: 0; transform: scale(0.2); transform-box: fill-box; transform-origin: center; animation: loop-ring-pop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) 1.65s forwards; }
@keyframes loop-ring-draw { to { stroke-dashoffset: 0; } }
@keyframes loop-ring-fade { to { opacity: 1; } }
@keyframes loop-ring-pop { to { opacity: 1; transform: scale(1); } }
@media (prefers-reduced-motion: reduce) {
  .loop-ring-arc, .loop-ring-start, .loop-ring-end { animation: none; stroke-dashoffset: 0; opacity: 1; transform: none; }
}
`;

export default function HeroOrbit() {
  const { ready } = usePreloader();

  return (
    <svg
      viewBox="0 0 420 420"
      role="img"
      aria-label="The Loop ring"
      data-ready={ready ? 'true' : 'false'}
      className="loop-ring mx-auto h-auto w-full max-w-[30rem]"
    >
      <style>{ANIMATION_CSS}</style>
      <defs>
        <radialGradient id="loop-ring-ground" cx="62%" cy="38%" r="70%">
          <stop offset="0%" className="[stop-color:#F4F8FF] dark:[stop-color:#1B2F63]" />
          <stop offset="100%" className="[stop-color:#E3EEFF] dark:[stop-color:#0D1630]" />
        </radialGradient>
      </defs>

      {/* The solid ground, so the page's dot grid doesn't show through */}
      <circle cx={CENTRE} cy={CENTRE} r="200" fill="url(#loop-ring-ground)" />

      <circle cx={CENTRE} cy={CENTRE} r="182" fill="none" className="stroke-blue-primary/20" strokeWidth="1.5" />
      <circle cx={CENTRE} cy={CENTRE} r="100" fill="none" className="stroke-blue-primary/25" strokeWidth="1.5" />

      {/* The full track the arc fills */}
      <circle cx={CENTRE} cy={CENTRE} r={ARC_RADIUS} fill="none" className="stroke-blue-primary/15" strokeWidth="16" />

      <path
        className="loop-ring-arc"
        d={`M ${CENTRE} ${CENTRE - ARC_RADIUS} A ${ARC_RADIUS} ${ARC_RADIUS} 0 1 1 ${END_X} ${END_Y}`}
        pathLength={1}
        fill="none"
        stroke="#007BFF"
        strokeWidth="16"
        strokeLinecap="round"
      />

      <circle className="loop-ring-start" cx={CENTRE} cy={CENTRE - ARC_RADIUS} r="7" fill="#FFFFFF" stroke="#007BFF" strokeWidth="3" />
      <circle className="loop-ring-end" cx={END_X} cy={END_Y} r="18" fill="#7FB0FF" />
    </svg>
  );
}
