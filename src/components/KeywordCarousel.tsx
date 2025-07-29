'use client'

import React, { useRef, useState, useLayoutEffect } from 'react'
import { motion } from 'framer-motion'

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

// tweak these to adjust dot spacing & item padding / font
const DOT_SPACING = 'ml-[3.25rem]'          // 13 * 0.25rem
const ITEM_CLASS =
  'flex-shrink-0 flex items-center text-6xl font-helvetica text-gray-800 px-8'

/** Single keyword + dot */
function MarqueeItem({ word }: { word: string }) {
  return (
    <div className={ITEM_CLASS}>
      {word}
      <span
        className={`w-3 h-3 ${DOT_SPACING} rounded-full border-2 border-[#007BFF] inline-block`}
      />
    </div>
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

  // measure half the scrollWidth (one full list) once mounted
  useLayoutEffect(() => {
    if (ref.current) {
      setOffset(ref.current.scrollWidth / 2)
    }
  }, [])

  // before measuring, render invisibly
  if (offset === 0) {
    return (
      <div ref={ref} className="flex whitespace-nowrap opacity-0">
        {[...keywords, ...keywords].map((w, i) => (
          <MarqueeItem key={i} word={w} />
        ))}
      </div>
    )
  }

  // once offset is known, animate by exactly that many pixels
  return (
    <motion.div
      ref={ref}
      className="flex whitespace-nowrap"
      animate={{ x: reverse ? [-offset, 0] : [0, -offset] }}
      transition={{
        ease: 'linear',
        duration,
        repeat: Infinity,
        repeatType: 'loop',
      }}
    >
      {[...keywords, ...keywords].map((w, i) => (
        <MarqueeItem key={i} word={w} />
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
    <div className="relative w-full overflow-hidden py-12 space-y-6">
      {lines.map(({ kws, rev, d }, i) => (
        <MarqueeLine key={i} keywords={kws} duration={d} reverse={rev} />
      ))}
    </div>
  )
}
