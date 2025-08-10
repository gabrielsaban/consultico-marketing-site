'use client'

import React, { useRef, useState, useLayoutEffect } from 'react'
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion'

// your keyword lines
const line1 = [
  'GOOGLE ANALYTICS',
  'SEO',
  'ONLINE ADS',
  'PPC',
  'BACKLINKS',
  'WEBSITE REPUTATION',
]
const line2 = [
  'CONTENT STRATEGY',
  'BRAND GROWTH',
  'GRAPHIC DESIGN',
  'PHOTOGRAPHY',
  'VIDEOGRAPHY',
]
const line3 = [
  'SOCIAL MEDIA ANALYTICS',
  'COMPETITION STRATEGY',
  'COMPANY IMAGE',
  'COMMUNICATION',
  'CUSTOMER RETENTION',
]

// responsive item typography; dot spacing handled via responsive classes inline
const ITEM_CLASS =
  'flex-shrink-0 flex items-center font-helvetica text-gray-800 px-6 md:px-8 cursor-pointer text-2xl md:text-4xl lg:text-5xl xl:text-6xl'

/** Single keyword + dot */
function MarqueeItem({
  word,
  isGlowing,
  onHoverChange,
}: {
  word: string
  isGlowing: boolean
  onHoverChange: (hovering: boolean) => void
}) {
  return (
    <motion.div
      className={ITEM_CLASS}
      onHoverStart={() => onHoverChange(true)}
      onHoverEnd={() => onHoverChange(false)}
    >
      <motion.span
        animate={
          isGlowing
            ? { textShadow: '0 2px 10px rgba(0,0,0,0.22)', color: '#1f2937' }
            : { textShadow: '0 0 0 rgba(0,0,0,0)', color: '#1f2937' }
        }
        transition={{ duration: 0.15, ease: 'easeOut' }}
      >
        {word}
      </motion.span>
      <motion.span
        className={`w-3 h-3 ml-6 md:ml-8 lg:ml-10 xl:ml-[3.25rem] rounded-full border-2 inline-block`}
        style={{ borderColor: '#007BFF' }}
        animate={
          isGlowing
            ? { boxShadow: '0 0 8px 1px rgba(0,0,0,0.22)' }
            : { boxShadow: '0 0 0 0 rgba(0,0,0,0)' }
        }
        transition={{ duration: 0.15, ease: 'easeOut' }}
      />
    </motion.div>
  )
}

type MarqueeLineProps = {
  keywords: string[]
  duration?: number
  reverse?: boolean
}

/** One scrolling line—measures its own width for pixel-perfect loop */
function MarqueeLine({
  keywords,
  duration = 30,
  reverse = false,
}: MarqueeLineProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const x = useMotionValue(0)

  // measure half the scrollWidth (one full list) once mounted
  useLayoutEffect(() => {
    if (ref.current) {
      setOffset(ref.current.scrollWidth / 2)
    }
  }, [])

  // Drive marquee with frame updates so we can pause a single row
  const pixelsPerSecond = offset / duration
  useAnimationFrame((t, delta) => {
    if (paused) return
    if (offset === 0) return
    const direction = reverse ? 1 : -1
    const move = (delta / 1000) * pixelsPerSecond * direction
    let current = x.get()
    current += move
    if (!reverse && current <= -offset) current += offset
    if (reverse && current >= 0) current -= offset
    x.set(current)
  })

  return (
    <motion.div
      ref={ref}
      className={`flex whitespace-nowrap ${offset === 0 ? 'opacity-0' : ''}`}
      style={{ x }}
    >
      {[...keywords, ...keywords].map((w, i) => (
        <MarqueeItem
          key={i}
          word={w}
          isGlowing={hoveredIndex === i}
          onHoverChange={(h) => {
            setPaused(h)
            setHoveredIndex(h ? i : null)
          }}
        />
      ))}
    </motion.div>
  )
}

/** Full three-line carousel */
export default function KeywordCarousel() {
  const lines = [
    { kws: line1, rev: false, d: 25 },
    { kws: line2, rev: true,  d: 28 },
    { kws: line3, rev: false, d: 22 },
  ]

  return (
    <div
      className="relative overflow-hidden py-12 space-y-6 mx-auto w-[3500px] max-w-[94vw] carousel-mask"
    >
      {lines.map(({ kws, rev, d }, i) => (
        <MarqueeLine key={i} keywords={kws} duration={d} reverse={rev} />
      ))}

      {/* Fallback gradient edges for browsers without mask-image support */}
      <div className="hidden min-[1600px]:block pointer-events-none absolute inset-y-0 left-0 w-[120px] bg-gradient-to-r from-white to-white/0" />
      <div className="hidden min-[1600px]:block pointer-events-none absolute inset-y-0 right-0 w-[120px] bg-gradient-to-l from-white to-white/0" />
    </div>
  )
}
