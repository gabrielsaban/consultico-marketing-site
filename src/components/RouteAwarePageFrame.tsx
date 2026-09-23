'use client'

import { usePathname } from 'next/navigation'
import Footer from '@/components/Footer'
import { isReportPath } from '@/lib/reports/is-report-path';
import { useEffect } from 'react'

export default function RouteAwarePageFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (pathname === '/' && window.location.hash.length > 1) return
    window.dispatchEvent(new Event('consultico:scroll-to-top'))
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])

  // Report pages render their own shell: no marketing footer, and no gutter
  // for a side nav that isReportPath has already removed. Without this the
  // dashboard would sit 64px off-centre on desktop with a services footer
  // bolted to the bottom of a private client deliverable.
  if (isReportPath(pathname)) {
    return <div className="relative z-10 min-h-screen">{children}</div>
  }

  return (
    <div className="relative z-10 min-h-screen flex flex-col pl-0 md:pl-16">
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  )
}
