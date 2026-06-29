'use client';

import { useLenisScroll } from '@/hooks/useLenisScroll';

const easeOutExpo = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));
const lenisOptions = {
  duration: 1.2,
  easing: easeOutExpo,
  smoothWheel: true,
  wheelMultiplier: 1,
  smoothTouch: false,
};

export default function LenisInit() {
  useLenisScroll(lenisOptions);
  return null;
}
