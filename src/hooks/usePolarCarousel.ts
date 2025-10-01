'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { animate, MotionValue, useMotionValue, useMotionValueEvent, useTransform } from 'framer-motion';

export interface PolarItemStyle {
  x: number;
  y: number;
  scale: number;
  opacity: number;
  zIndex: number;
}

export interface PolarItemTransforms {
  x: MotionValue<number>;
  y: MotionValue<number>;
  scale: MotionValue<number>;
  opacity: MotionValue<number>;
  zIndex: MotionValue<number>;
  thetaDeg: MotionValue<number>;
}

export interface UsePolarCarouselOptions {
  itemCount: number;
  radius: number; // measured radius from container
  initialIndex?: number;
  autoplay?: boolean; // when true, continuous rotate slowly (no active selection)
  autoplaySpeedIndicesPerSecond?: number; // default 0.06
  ellipseXScale?: number; // horizontal stretch factor for oval path (default 1)
}

function clampRadiusFromViewport(viewportWidth: number): number {
  const minPx = 220;
  const maxPx = 420;
  const vw = viewportWidth * 0.28;
  return Math.max(minPx, Math.min(maxPx, vw));
}

export function usePolarCarousel(options: UsePolarCarouselOptions) {
  const { itemCount, radius, initialIndex = 0, autoplay = false, autoplaySpeedIndicesPerSecond = 0.06, ellipseXScale = 1 } = options;

  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !('matchMedia' in window)) return;
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(mql.matches);
    update();
    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', update);
      return () => mql.removeEventListener('change', update);
    } else if (typeof mql.addListener === 'function') {
      mql.addListener(update);
      return () => mql.removeListener(update);
    }
  }, []);

  // No window-based radius here; caller provides measured radius

  // progress: continuous value, where integer values are snapped indices
  const progress: MotionValue<number> = useMotionValue(initialIndex);
  const [activeIndex, setActiveIndex] = useState<number>(() => ((initialIndex % itemCount) + itemCount) % itemCount);
  useMotionValueEvent(progress, 'change', (p) => {
    const i = ((Math.round(p as number) % itemCount) + itemCount) % itemCount;
    if (i !== activeIndex) setActiveIndex(i);
  });
  useEffect(() => {
    setActiveIndex(((Math.round(progress.get()) % itemCount) + itemCount) % itemCount);
  }, [itemCount]);

  const isAnimatingRef = useRef(false);
  const currentAnimationRef = useRef<ReturnType<typeof animate> | null>(null);

  const stopAnimation = useCallback(() => {
    if (currentAnimationRef.current) {
      currentAnimationRef.current.stop();
      currentAnimationRef.current = null;
    }
    isAnimatingRef.current = false;
  }, []);

  const snapTo = useCallback(
    (targetIndex: number) => {
      const N = Math.max(1, itemCount);
      const current = progress.get();
      const base = ((targetIndex % N) + N) % N;
      // Move to the nearest equivalent of target by adding multiples of N
      const currentMod = ((current % N) + N) % N;
      let diff = base - currentMod; // signed difference in [-(N-1), N-1]
      // Normalize to shortest signed distance in (-N/2, N/2]
      diff = (((diff + N / 2) % N) + N) % N - N / 2;
      const target = current + diff; // continuous target, no hard wrap

      stopAnimation();
      if (reduceMotion) {
        progress.set(target);
        return ((Math.round(target) % N) + N) % N;
      }
      isAnimatingRef.current = true;
      currentAnimationRef.current = animate(progress, target, {
        type: 'spring',
        stiffness: 120,
        damping: 20,
        mass: 0.6,
        restDelta: 0.001,
        onComplete: () => {
          isAnimatingRef.current = false;
        },
      });
      return ((Math.round(target) % N) + N) % N;
    },
    [itemCount, progress, reduceMotion, stopAnimation]
  );

  const increment = useCallback((delta: number) => {
    const current = progress.get();
    return snapTo(Math.round(current + delta));
  }, [progress, snapTo]);

  // Drag state
  const dragStartRef = useRef<number | null>(null);

  const onDragStart = useCallback(() => {
    dragStartRef.current = progress.get();
    stopAnimation();
  }, [progress, stopAnimation]);

  const onDrag = useCallback((_: any, info: { delta: { x: number; y: number } }) => {
    // Horizontal drag maps to progress; tune sensitivity
    const sensitivity = 1 / 160; // px per index
    const delta = info.delta.x;
    progress.set(progress.get() - delta * sensitivity);
  }, [progress]);

  const onDragEnd = useCallback(() => {
    const nearest = Math.round(progress.get());
    snapTo(nearest);
  }, [progress, snapTo]);

  // Wheel disabled per requirement
  const onWheel = useCallback((_e: React.WheelEvent) => {
    return;
  }, []);

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      increment(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      increment(-1);
    }
  }, [increment]);

  // Autoplay: continuous slow rotation when enabled
  useEffect(() => {
    if (!autoplay || itemCount <= 1) return;
    let rafId: number;
    let last = performance.now();
    const step = (now: number) => {
      const dtSec = Math.min(0.1, Math.max(0, (now - last) / 1000));
      last = now;
      progress.set(progress.get() + autoplaySpeedIndicesPerSecond * dtSec);
      rafId = window.requestAnimationFrame(step);
    };
    rafId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(rafId);
  }, [autoplay, itemCount, autoplaySpeedIndicesPerSecond, progress]);

  // Tap/click guard to avoid swallowing clicks after drags
  const dragTotalPxRef = useRef(0);
  const lastDragPxRef = useRef(0);
  const clearLastDragTimeoutRef = useRef<number | null>(null);

  const onDragStartGuard = useCallback(() => {
    dragTotalPxRef.current = 0;
    if (clearLastDragTimeoutRef.current) {
      window.clearTimeout(clearLastDragTimeoutRef.current);
      clearLastDragTimeoutRef.current = null;
    }
  }, []);

  const onDragGuard = useCallback((_: any, info: { delta: { x: number; y: number } }) => {
    dragTotalPxRef.current += Math.abs(info.delta.x) + Math.abs(info.delta.y);
  }, []);

  const onDragEndGuard = useCallback(() => {
    lastDragPxRef.current = dragTotalPxRef.current;
    clearLastDragTimeoutRef.current = window.setTimeout(() => {
      lastDragPxRef.current = 0;
      clearLastDragTimeoutRef.current = null;
    }, 160);
  }, []);

  const isTapAllowed = useCallback(() => {
    return lastDragPxRef.current < 6; // threshold in pixels
  }, []);

  // Build reactive transforms for each item using motion values
  const radiusMV = useMotionValue(radius);
  const rxMV = useMotionValue(radius * ellipseXScale);
  useEffect(() => { radiusMV.set(radius); rxMV.set(radius * ellipseXScale); }, [radius, ellipseXScale, radiusMV, rxMV]);

  const items: PolarItemTransforms[] = [];
  const anglePer = 360 / Math.max(1, itemCount);
  for (let index = 0; index < itemCount; index++) {
    const thetaDeg = useTransform(progress, (p) => (index - (p as number)) * anglePer);
    const theta = useTransform(thetaDeg, (deg) => ((deg as number) * Math.PI) / 180);
    const x = useTransform([theta, rxMV], ([t, r]) => (r as number) * Math.sin(t as number));
    const y = useTransform([theta, radiusMV], ([t, r]) => -(r as number) * Math.cos(t as number));
    const normalized = useTransform(thetaDeg, (deg) => {
      const d = (deg as number);
      const norm = Math.abs(((d + 540) % 360) - 180) / 180;
      return norm;
    });
    const scale = useTransform(normalized, (v) => (reduceMotion ? 1 : 0.84 + (1 - (v as number)) * 0.16));
    const opacity = useTransform(normalized, (v) => 0.35 + (1 - (v as number)) * 0.65);
    const zIndex = useTransform(normalized, (v) => Math.round(1000 - (v as number) * 800));
    items.push({ x, y, scale, opacity, zIndex, thetaDeg });
  }

  return {
    progress,
    activeIndex,
    reduceMotion,
    snapTo,
    increment,
    onDragStart: (e?: any, info?: any) => { onDragStart(); onDragStartGuard(); },
    onDrag: (e?: any, info?: any) => { onDrag(e, info); onDragGuard(e, info); },
    onDragEnd: (e?: any, info?: any) => { onDragEnd(); onDragEndGuard(); },
    onWheel,
    onKeyDown,
    isTapAllowed,
    items,
  } as const;
}


