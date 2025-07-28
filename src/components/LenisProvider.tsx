'use client'

import { useLenisScroll } from '@/hooks/useLenisScroll'

interface LenisProviderProps {
  children: React.ReactNode
}

export default function LenisProvider({ children }: LenisProviderProps) {
  // Initialize Lenis for smooth scrolling
  useLenisScroll({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    smoothTouch: false,
  })

  return <>{children}</>
} 