'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { animate, MotionValue, useMotionValue, useMotionValueEvent } from 'framer-motion';

export interface PolarItemStyle {
  x: number;
  y: number;
  scale: number;
  opacity: number;
  zIndex: number;
}

export interface UsePolarCarouselOptions {
  itemCount: number;
  radius: number;
  initialIndex?: number;
  autoplay?: boolean;
  autoplaySpeedIndicesPerSecond?: number;
  ellipseXScale?: number;
}

export function usePolarCarousel(options: UsePolarCarouselOptions) {
  const {
    itemCount,
    radius,
    initialIndex = 0,
    autoplay = false,
    autoplaySpeedIndicesPerSecond = 0.06,
    ellipseXScale = 1,
  } = options;

  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !('matchMedia' in window)) return;
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(mql.matches);
    update();
    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', update);
      return () => mql.removeEventListener('change', update);
    }
    if (typeof mql.addListener === 'function') {
      mql.addListener(update);
      return () => mql.removeListener(update);
    }
  }, []);

  const progress: MotionValue<number> = useMotionValue(initialIndex);
  const [activeIndex, setActiveIndex] = useState<number>(() => ((initialIndex % itemCount) + itemCount) % itemCount);
  useMotionValueEvent(progress, 'change', (p) => {
    const i = ((Math.round(p as number) % itemCount) + itemCount) % itemCount;
    if (i !== activeIndex) setActiveIndex(i);
  });

  useEffect(() => {
    setActiveIndex(((Math.round(progress.get()) % itemCount) + itemCount) % itemCount);
  }, [itemCount, progress]);

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
      const currentMod = ((current % N) + N) % N;
      let diff = base - currentMod;
      diff = (((diff + N / 2) % N) + N) % N - N / 2;
      const target = current + diff;

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

  const dragStartRef = useRef<number | null>(null);

  const onDragStart = useCallback(() => {
    dragStartRef.current = progress.get();
    stopAnimation();
  }, [progress, stopAnimation]);

  const onDrag = useCallback((_: unknown, info: { delta: { x: number; y: number } }) => {
    const sensitivity = 1 / 160;
    const delta = info.delta.x;
    progress.set(progress.get() - delta * sensitivity);
  }, [progress]);

  const onDragEnd = useCallback(() => {
    const nearest = Math.round(progress.get());
    snapTo(nearest);
  }, [progress, snapTo]);

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

  const onDragGuard = useCallback((_: unknown, info: { delta: { x: number; y: number } }) => {
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
    return lastDragPxRef.current < 6;
  }, []);

  const anglePer = 360 / Math.max(1, itemCount);

  return {
    progress,
    activeIndex,
    reduceMotion,
    radius,
    ellipseXScale,
    snapTo,
    increment,
    onDragStart: (_e?: unknown, _info?: unknown) => { onDragStart(); onDragStartGuard(); },
    onDrag: (_e?: unknown, info?: { delta: { x: number; y: number } }) => {
      if (info) {
        onDrag(undefined, info);
        onDragGuard(undefined, info);
      }
    },
    onDragEnd: (_e?: unknown, _info?: unknown) => { onDragEnd(); onDragEndGuard(); },
    onWheel,
    onKeyDown,
    isTapAllowed,
    anglePer,
  } as const;
}
