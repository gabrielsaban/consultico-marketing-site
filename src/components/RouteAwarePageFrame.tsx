'use client'

import { usePathname } from 'next/navigation'
import Footer from '@/components/Footer'

export default function RouteAwarePageFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLanding = pathname?.startsWith('/landing')
  const paddingClass = isLanding ? 'pl-0' : 'pl-0 md:pl-16'
  return (
    <div className={`${paddingClass} relative z-10 min-h-screen flex flex-col`}>
      <div className="flex-1">
        {children}
      </div>
      <Footer />
    </div>
  )
}


