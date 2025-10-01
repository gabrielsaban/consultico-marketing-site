'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/Navbar'

export default function RouteAwareNavbar() {
  const pathname = usePathname()
  if (pathname?.startsWith('/landing')) return null
  return <Navbar />
}


