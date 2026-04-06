'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'

export default function Footer() {
  const containerRef = useRef<HTMLDivElement | null>(null)

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="w-full bg-blue-primary text-white relative">
      <motion.div
        ref={containerRef}
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-sm"
      >
        <div className="opacity-90">Consultico Ltd. All rights reserved.</div>
        <div className="opacity-90">Registered in Scotland. Company Number: SC799073</div>
        <div className="flex gap-4 opacity-90">
          <a href="#" className="hover:underline">T&amp;Cs</a>
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Cookie Policy</a>
        </div>
      </motion.div>

      {/* Back-to-top bubble centered above footer, same animation as footer */}
      <motion.button
        aria-label="Back to top"
        onClick={handleBackToTop}
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 w-12 h-12 rounded-full bg-blue-primary text-white shadow-lg ring-1 ring-white/40 flex items-center justify-center hover:scale-105 transition-transform"
      >
        <span className="text-2xl leading-none">^</span>
      </motion.button>
    </footer>
  )
}


