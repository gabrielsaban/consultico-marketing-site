'use client'

import { useEffect, useRef } from 'react'

interface DotMatrixBackgroundProps {
  dotColor?: string
  dotSize?: number
  dotSpacing?: number
  dotOpacity?: number
  mouseInfluence?: number
  breathingSpeed?: number
  breathingIntensity?: number
  className?: string
}

export default function DotMatrixBackground({
  dotColor = '#3B82F6', // Tailwind blue-500
  dotSize = 2,
  dotSpacing = 40,
  dotOpacity = 0,
  mouseInfluence = 0.12,
  breathingSpeed = 0.002,
  breathingIntensity = 0.15,
  className = '',
}: DotMatrixBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    canvas.width = width
    canvas.height = height

    const cols = Math.ceil(width / dotSpacing)
    const rows = Math.ceil(height / dotSpacing)

    interface Dot {
      x: number
      y: number
      baseX: number
      baseY: number
      offset: number
    }

    const dots: Dot[] = []

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        dots.push({
          x: x * dotSpacing,
          y: y * dotSpacing,
          baseX: x * dotSpacing,
          baseY: y * dotSpacing,
          offset: Math.random() * 1000,
        })
      }
    }

    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)

    const render = (time: number) => {
      // Fill canvas with white background first
      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(0, 0, width, height)

      for (const dot of dots) {
        const dx = dot.baseX - mouse.current.x
        const dy = dot.baseY - mouse.current.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const influence = Math.max(0, 1 - dist / 200) * mouseInfluence

        const angle = (time + dot.offset) * breathingSpeed
        const breathe = Math.sin(angle) * breathingIntensity * dotSpacing

        const finalX = dot.baseX + dx * influence
        const finalY = dot.baseY + dy * influence + breathe

        ctx.beginPath()
        ctx.arc(finalX, finalY, dotSize, 0, Math.PI * 2)
        ctx.fillStyle = dotColor
        ctx.globalAlpha = dotOpacity
        ctx.fill()
        ctx.globalAlpha = 1
      }

      animationRef.current = requestAnimationFrame(render)
    }

    animationRef.current = requestAnimationFrame(render)

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [dotColor, dotSize, dotSpacing, dotOpacity, mouseInfluence, breathingSpeed, breathingIntensity])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 z-0 pointer-events-none ${className}`}
    />
  )
}