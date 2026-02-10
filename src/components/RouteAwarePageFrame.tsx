'use client'

import { usePathname } from 'next/navigation'
import Footer from '@/components/Footer'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'

export default function RouteAwarePageFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const prefersReduced = useReducedMotion()
  const prevPathRef = useRef<string | null>(null)
  const isLanding = pathname?.startsWith('/landing')
  const isService = [
    '/market-strategy',
    '/branding',
    '/content-creation',
    '/seo',
    '/web-development',
    '/social-media',
    '/think-first',
    '/careers',
  ].includes(pathname || '')
  const isHome = pathname === '/'
  const cameFromService = prevPathRef.current
    ? [
        '/market-strategy',
        '/branding',
        '/content-creation',
        '/seo',
        '/web-development',
        '/social-media',
        '/think-first',
        '/careers',
      ].includes(prevPathRef.current)
    : false
  const paddingClass = isLanding ? 'pl-0' : 'pl-0 md:pl-16'

  useEffect(() => {
    prevPathRef.current = pathname || null
  }, [pathname])

  return (
    <div className={`${paddingClass} relative z-10 min-h-screen flex flex-col`}>
      <div className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={
              !prefersReduced && isService
                ? { x: 120, opacity: 0 }
                : !prefersReduced && isHome && cameFromService
                  ? { x: -120, opacity: 0 }
                  : false
            }
            animate={{ x: 0, opacity: 1 }}
            exit={
              isService && !prefersReduced
                ? { x: -40, opacity: 0 }
                : undefined
            }
            transition={
              (isService || (isHome && cameFromService)) && !prefersReduced
                ? { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
                : { duration: 0 }
            }
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  )
}
