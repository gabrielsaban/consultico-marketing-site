'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

type PercentPoint = { x: number; y: number };

export interface ScrollFlowLineProps {
  /** Optional className for the absolute container */
  className?: string;
  /** Optional className for the <path> element */
  pathClassName?: string;
  /** Stroke color (defaults to brand blue variable) */
  color?: string;
  /** Stroke width in px */
  strokeWidth?: number;
  /** Stroke opacity (0..1) */
  strokeOpacity?: number;
  /** Controls when the line is "drawn" as you scroll: [start, end] in 0..1 */
  revealRange?: [number, number];
  /** Opacity fade ranges as the section enters/leaves viewport: [inStart, inEnd, outStart, outEnd] */
  fadeRange?: [number, number, number, number];
  /** Extra padding around the SVG content to avoid clipping curves */
  padding?: number;
  /** Smoothness of curves for Catmull-Rom → Bezier conversion. 0.0..1.5 */
  tension?: number;
  /** Waypoints expressed as percentages of container width/height */
  waypoints?: PercentPoint[];
  /** When true, renders the control points to help tuning */
  debug?: boolean;
  /** Path style: "curved" (spline) or "orthogonal" (90° turns with radius) */
  styleType?: 'curved' | 'orthogonal';
  /** Corner radius for orthogonal style, in px */
  cornerRadius?: number;
  /** Turn order between anchors: horizontal-then-vertical (hv) or vertical-then-horizontal (vh) */
  orientation?: 'hv' | 'vh';
}

/** Convert Catmull-Rom spline through given points into a cubic Bezier SVG path */
function buildSmoothPath(points: { x: number; y: number }[], tension = 0.5): string {
  if (!points.length) return '';
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

  const pts = [points[0], ...points, points[points.length - 1]]; // pad ends
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < pts.length - 2; i++) {
    const p0 = pts[i - 1];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2];

    const c1x = p1.x + ((p2.x - p0.x) / 6) * tension;
    const c1y = p1.y + ((p2.y - p0.y) / 6) * tension;
    const c2x = p2.x - ((p3.x - p1.x) / 6) * tension;
    const c2y = p2.y - ((p3.y - p1.y) / 6) * tension;
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

/** ResizeObserver hook that returns the size of the target element */
function useElementSize<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!ref.current) return;
    const elem = ref.current;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const cr = entry.contentRect;
        setSize({ width: cr.width, height: cr.height });
      }
    });
    ro.observe(elem);
    return () => ro.disconnect();
  }, []);

  return { ref, size } as const;
}

/** Build an orthogonal (right-angled) path with rounded corners */
function buildOrthogonalRoundedPath(points: { x: number; y: number }[], radius: number, orientation: 'hv' | 'vh'): string {
  if (points.length === 0) return '';

  // 1) Expand segments so every step is axis-aligned
  const expanded: { x: number; y: number }[] = [points[0]];
  for (let i = 1; i < points.length; i++) {
    const prev = expanded[expanded.length - 1];
    const next = points[i];
    if (prev.x !== next.x && prev.y !== next.y) {
      const corner = orientation === 'hv'
        ? { x: next.x, y: prev.y }
        : { x: prev.x, y: next.y };
      expanded.push(corner);
    }
    expanded.push(next);
  }

  // 2) Build rounded polyline at each interior vertex where direction changes
  let d = `M ${expanded[0].x} ${expanded[0].y}`;

  const segDir = (a: { x: number; y: number }, b: { x: number; y: number }) =>
    Math.abs(b.x - a.x) > Math.abs(b.y - a.y) ? 'h' : 'v';

  for (let i = 1; i < expanded.length - 1; i++) {
    const prev = expanded[i - 1];
    const curr = expanded[i];
    const next = expanded[i + 1];
    const dirIn = segDir(prev, curr);
    const dirOut = segDir(curr, next);

    if (dirIn === dirOut) {
      // Straight continuation, just draw to current
      d += ` L ${curr.x} ${curr.y}`;
      continue;
    }

    const distIn = dirIn === 'h' ? Math.abs(curr.x - prev.x) : Math.abs(curr.y - prev.y);
    const distOut = dirOut === 'h' ? Math.abs(next.x - curr.x) : Math.abs(next.y - curr.y);
    const r = Math.min(radius, distIn / 2, distOut / 2);

    const pre = { x: curr.x, y: curr.y };
    if (dirIn === 'h') pre.x += (curr.x > prev.x ? -r : r); else pre.y += (curr.y > prev.y ? -r : r);
    const post = { x: curr.x, y: curr.y };
    if (dirOut === 'v') post.y += (next.y > curr.y ? r : -r); else post.x += (next.x > curr.x ? r : -r);

    // Draw line to pre-corner from wherever we are
    d += ` L ${pre.x} ${pre.y}`;
    // Rounded corner
    d += ` Q ${curr.x} ${curr.y} ${post.x} ${post.y}`;
  }

  // 3) Final leg to end
  const last = expanded[expanded.length - 1];
  d += ` L ${last.x} ${last.y}`;
  return d;
}

/**
 * ScrollFlowLine renders an absolute-positioned, scroll-linked SVG path that "draws"
 * as you scroll the parent container through the viewport. It is designed to sit
 * behind content (pointer-events-none, negative z-index) and be easily customized.
 */
export default function ScrollFlowLine({
  className,
  pathClassName = 'flowline-path',
  color = 'var(--brand-blue)',
  strokeWidth = 30,
  strokeOpacity = 0.35,
  revealRange = [0.15, 0.8],
  fadeRange = [0.0, 0.18, 0.82, 1.0],
  padding = 32,
  tension = 0.8,
  waypoints,
  debug = false,
  styleType = 'orthogonal',
  cornerRadius = 40,
  orientation = 'hv',
}: ScrollFlowLineProps) {
  const { ref, size } = useElementSize<HTMLDivElement>();

  // Track scroll progress of this block
  // Start earlier: when section start reaches bottom of viewport (100%), end when section end reaches top (0%)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 100%', 'end 0%'] });

  const clampedRevealStart = Math.max(0, Math.min(1, revealRange[0]));
  const clampedRevealEnd = Math.max(0, Math.min(1, revealRange[1]));
  
  // Window size: 30% of path visible at once (smaller = more sliding visible)
  const windowSize = 0.3;
  
  // Map scroll to path progress (0 to 1+)
  const pathProgress = useTransform(scrollYProgress, [clampedRevealStart, clampedRevealEnd], [0, 1]);
  
  // We'll use a reference path length and animate dashoffset
  // Get the actual SVG path element length for calculations
  const pathRef = useRef<SVGPathElement>(null);
  const [totalLength, setTotalLength] = useState(1000);

  const [inStart, inEnd, outStart, outEnd] = fadeRange;
  const fadeOpacity = useTransform(scrollYProgress, [inStart, inEnd, outStart, outEnd], [0, 1, 1, 0]);
  const pathOpacity = useTransform(fadeOpacity, (v: number) => v * strokeOpacity);

  // Default anchors tuned for the cascading 2-column services layout
  const defaultPoints: PercentPoint[] = [
    { x: 0.21, y: 0.12 },
    { x: 0.21, y: 0.32 },
    { x: 0.78, y: 0.6 },
    { x: 0.21, y: 0.7 },
    { x: 0.21, y: 0.8 },
    { x: 0.78, y: 0.93 },
    { x: 0.78, y: 1.05 },
  ];

  const pointsPx = useMemo(() => {
    const pts = (waypoints && waypoints.length ? waypoints : defaultPoints).map((p) => ({
      x: padding + p.x * Math.max(0, size.width - padding * 2),
      y: padding + p.y * Math.max(0, size.height - padding * 2),
    }));
    return pts;
  }, [size.width, size.height, padding, waypoints, defaultPoints]);

  const d = useMemo(() => {
    if (styleType === 'orthogonal') {
      return buildOrthogonalRoundedPath(pointsPx, cornerRadius, orientation);
    }
    return buildSmoothPath(pointsPx, tension);
  }, [pointsPx, tension, styleType, cornerRadius, orientation]);

  // Measure the actual path length for dash calculations
  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      setTotalLength(length);
    }
  }, [d]); // Recalculate when path changes

  // Calculate stroke-dasharray and stroke-dashoffset for sliding window
  // dasharray: [window length, gap] - the gap should be large enough that we only see one dash
  const windowLength = totalLength * windowSize;
  const dashArray = `${windowLength} ${totalLength * 2}`;
  
  // dashoffset animation for sliding window effect:
  // We need the window to slide from start (0) to end (totalLength)
  // Start: offset = totalLength (dash positioned entirely before path starts)
  // End: offset = totalLength - totalLength = 0? No! We need to go to negative
  // End: offset should be totalLength * (windowSize - 1) to position window at the end
  const dashOffset = useTransform(pathProgress, (p: number) => {
    // Map progress 0->1 to offset totalLength -> -(totalLength * (1 - windowSize))
    // This ensures the window slides from start (at p=0) to end (at p=1)
    const startOffset = totalLength;
    const endOffset = -(totalLength * (1 - windowSize));
    return startOffset + (p * (endOffset - startOffset));
  });

  // Gradient fade percentage (10% at each end of visible window)
  const gradientFadePercent = (0.1 / windowSize) * 100; // Convert to percentage of visible window

  return (
    <div
      ref={ref}
      className={
        // absolute overlay behind content
        `absolute inset-0 -z-10 pointer-events-none ${className ?? ''}`
      }
      aria-hidden
    >
      <motion.svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${Math.max(1, size.width)} ${Math.max(1, size.height)}`}
        preserveAspectRatio="none"
        overflow="visible"
      >
        <defs>
          <linearGradient id="flowline-gradient" gradientUnits="userSpaceOnUse">
            {/* Fade in at start (first 10% of visible window) */}
            <stop offset="0%" stopColor={color} stopOpacity="0" />
            <stop offset={`${gradientFadePercent}%`} stopColor={color} stopOpacity="1" />
            {/* Solid middle */}
            <stop offset={`${100 - gradientFadePercent}%`} stopColor={color} stopOpacity="1" />
            {/* Fade out at end (last 10% of visible window) */}
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          ref={pathRef}
          d={d}
          className={pathClassName}
          stroke="url(#flowline-gradient)"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          vectorEffect="non-scaling-stroke"
          strokeDasharray={dashArray}
          // Apply strokeWidth, dashoffset and opacity
          style={{ 
            strokeDashoffset: dashOffset,
            opacity: pathOpacity, 
            strokeWidth: `${strokeWidth}px`
          }}
        />
        {debug && pointsPx.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={4} fill={color} opacity={0.6} />
        ))}
      </motion.svg>
    </div>
  );
}


