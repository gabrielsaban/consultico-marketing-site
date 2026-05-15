'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

interface UseLenisScrollOptions {
  duration?: number
  easing?: (t: number) => number
  orientation?: 'vertical' | 'horizontal'
  gestureOrientation?: 'vertical' | 'horizontal'
  smoothWheel?: boolean
  wheelMultiplier?: number
  smoothTouch?: boolean
  touchMultiplier?: number
  infinite?: boolean
}

export function useLenisScroll(options: UseLenisScrollOptions = {}) {
  const lenisRef = useRef<Lenis | null>(null)
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
      ...options,
    })
    lenisRef.current = lenis

    // RAF for smooth animations
    function raf(time: number) {
      lenis.raf(time)
      frameRef.current = requestAnimationFrame(raf)
    }

    const handleScrollToTop = () => {
      lenis.scrollTo(0, { immediate: true, force: true })
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }

    const modalLocks = new Set<string>()
    const updateModalLock = (source: string, open: boolean) => {
      if (open) {
        modalLocks.add(source)
      } else {
        modalLocks.delete(source)
      }

      if (modalLocks.size > 0) {
        lenis.stop()
      } else {
        lenis.start()
      }
    }
    const handleProjectModal = (event: Event) => {
      updateModalLock('project', Boolean((event as CustomEvent<{ open?: boolean }>).detail?.open))
    }
    const handleTeamModal = (event: Event) => {
      updateModalLock('team', Boolean((event as CustomEvent<{ open?: boolean }>).detail?.open))
    }

    window.addEventListener('consultico:scroll-to-top', handleScrollToTop)
    window.addEventListener('consultico:project-modal', handleProjectModal)
    window.addEventListener('consultico:team-modal', handleTeamModal)
    frameRef.current = requestAnimationFrame(raf)

    // Cleanup
    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current)
        frameRef.current = null
      }
      if (lenisRef.current === lenis) {
        lenisRef.current = null
      }
      window.removeEventListener('consultico:scroll-to-top', handleScrollToTop)
      window.removeEventListener('consultico:project-modal', handleProjectModal)
      window.removeEventListener('consultico:team-modal', handleTeamModal)
      lenis.destroy()
    }
  }, [options])

  return lenisRef.current
}
