'use client'

import { useLenisScroll } from '@/hooks/useLenisScroll'

const easeOutExpo = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
const lenisOptions = {
  duration: 1.2,
  easing: easeOutExpo,
  smoothWheel: true,
  wheelMultiplier: 1,
  smoothTouch: false,
}

interface LenisProviderProps {
  children: React.ReactNode
}

export default function LenisProvider({ children }: LenisProviderProps) {
  // Initialize Lenis for smooth scrolling
  useLenisScroll(lenisOptions)

  return <>{children}</>
}
