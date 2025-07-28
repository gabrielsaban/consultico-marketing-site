'use client'

import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

interface ImageFilledTextProps {
  text: string
  className?: string
}

export default function ImageFilledText({ text, className = '' }: ImageFilledTextProps) {
  const ref = useRef<HTMLDivElement>(null)

  // Scroll-based Y movement
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  // Idle X drift
  const backgroundXRaw = useMotionValue(0)
  const backgroundX = useTransform(backgroundXRaw, (val) => `${val}%`)

  // Breathing filter effect
  const [filterStyle, setFilterStyle] = useState('brightness(1) contrast(1) blur(0px)')

  useEffect(() => {
    let frame: number
    let start = performance.now()

    const animate = (now: number) => {
      const elapsed = now - start

      // Scroll background drift
      const driftWave = Math.sin(elapsed * 0.0002)
      backgroundXRaw.set((driftWave * 50) + 50)

      // Breathing filter
      const breatheWave = Math.sin(elapsed * 0.0005) // slower wave
      const brightness = 1 + breatheWave * 0.03 // 0.97–1.03
      const contrast = 1 + breatheWave * 0.02    // 0.98–1.02
      const blur = 0.4 + breatheWave * 0.4       // 0–0.8px
      setFilterStyle(`brightness(${brightness}) contrast(${contrast})`)

      frame = requestAnimationFrame(animate)
    }

    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [backgroundXRaw])

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div
        className="bg-cover bg-no-repeat bg-clip-text text-transparent"
        style={{
          backgroundImage: `url('/pexels-owenbarker-1118341.jpg')`,
          backgroundSize: '130%',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundRepeat: 'no-repeat',
          backgroundPositionX: backgroundX,
          backgroundPositionY: backgroundY,
          filter: filterStyle,
        }}
        whileHover={{
          scale: 1.02,
          rotate: [-0.1, 0.1, -0.1],
          transition: { duration: 0.7, repeat: Infinity, repeatType: 'reverse' },
        }}
      >
        {text}
      </motion.div>
    </div>
  )
}
