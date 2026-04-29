'use client'

import { useEffect, useRef } from 'react'

interface DotMatrixBackgroundProps {
  dotColor?: string
  backgroundColor?: string
  dotSize?: number
  dotSpacing?: number
  dotOpacity?: number
  mouseInfluence?: number
  highlightColor?: string
  interactive?: boolean
  breathingSpeed?: number
  breathingIntensity?: number
  className?: string
}

export default function DotMatrixBackground({
  dotColor = '#007BFF',
  backgroundColor = '#FFFFFF',
  dotSize = 2,
  dotSpacing = 40,
  dotOpacity = 0,
  mouseInfluence = 0.12,
  highlightColor = '#007BFE',
  interactive = true,
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

    let width = 0
    let height = 0
    let pixelRatio = 1

    interface Dot {
      x: number
      y: number
      baseX: number
      baseY: number
      offset: number
      highlight: number  // 0 = default, 1 = fully blue, decays over time
    }

    let dots: Dot[] = []

    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result
        ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
        : { r: 200, g: 200, b: 200 }
    }

    const baseRgb = hexToRgb(dotColor)
    const trailRgb = hexToRgb(highlightColor)
    const HIGHLIGHT_RADIUS = 75
    const HIGHLIGHT_DECAY = 0.005 // per-frame decay — smooth ~2s fade

    const buildDots = () => {
      const cols = Math.ceil(width / dotSpacing) + 1
      const rows = Math.ceil(height / dotSpacing) + 1
      const nextDots: Dot[] = []

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          nextDots.push({
            x: x * dotSpacing,
            y: y * dotSpacing,
            baseX: x * dotSpacing,
            baseY: y * dotSpacing,
            offset: Math.random() * 1000,
            highlight: 0,
          })
        }
      }

      dots = nextDots
    }

    const syncCanvasSize = () => {
      width = window.innerWidth
      height = window.innerHeight
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.ceil(width * pixelRatio)
      canvas.height = Math.ceil(height * pixelRatio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      buildDots()
    }

    syncCanvasSize()

    const handleResize = () => {
      syncCanvasSize()
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }

    const render = (time: number) => {
      // Fill canvas background
      ctx.fillStyle = backgroundColor
      ctx.fillRect(0, 0, width, height)

      for (const dot of dots) {
        const dx = interactive ? dot.baseX - mouse.current.x : 0
        const dy = interactive ? dot.baseY - mouse.current.y : 0
        const dist = Math.sqrt(dx * dx + dy * dy)
        const influence = interactive ? Math.max(0, 1 - dist / 200) * mouseInfluence : 0

        // Highlight dot if cursor is close enough
        if (interactive && dist < HIGHLIGHT_RADIUS) {
          dot.highlight = Math.min(1, dot.highlight + 0.15)
        } else {
          dot.highlight = Math.max(0, dot.highlight - HIGHLIGHT_DECAY)
        }

        const angle = (time + dot.offset) * breathingSpeed
        const breathe = Math.sin(angle) * breathingIntensity * dotSpacing

        const finalX = dot.baseX + dx * influence
        const finalY = dot.baseY + dy * influence + breathe

        // Interpolate color: default → brand blue based on highlight
        const h = dot.highlight
        const r = Math.round(baseRgb.r + (trailRgb.r - baseRgb.r) * h)
        const g = Math.round(baseRgb.g + (trailRgb.g - baseRgb.g) * h)
        const b = Math.round(baseRgb.b + (trailRgb.b - baseRgb.b) * h)
        // Boost opacity slightly when highlighted so the trail is visible
        const alpha = dotOpacity + h * 0.25

        ctx.beginPath()
        ctx.arc(finalX, finalY, dotSize, 0, Math.PI * 2)
        ctx.fillStyle = `rgb(${r},${g},${b})`
        ctx.globalAlpha = Math.min(1, alpha)
        ctx.fill()
        ctx.globalAlpha = 1
      }

      animationRef.current = requestAnimationFrame(render)
    }

    window.addEventListener('resize', handleResize)
    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true })
    }

    animationRef.current = requestAnimationFrame(render)

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', handleResize)
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [backgroundColor, dotColor, dotSize, dotSpacing, dotOpacity, mouseInfluence, highlightColor, interactive, breathingSpeed, breathingIntensity])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 z-0 pointer-events-none ${className}`}
    />
  )
}
