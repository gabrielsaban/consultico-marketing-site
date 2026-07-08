'use client'

import { useEffect, useRef, useState } from 'react'

interface CustomCursorProps {
  size?: number
  color?: string
  ringSize?: number
  ringColor?: string
  enableHoverEffects?: boolean
  className?: string
}

const BRAND_BLUE = { r: 0, g: 123, b: 255 }
const BLUE_TOLERANCE = 30

function parseRgb(color: string): [number, number, number] | null {
  const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
  if (!match) return null
  return [Number(match[1]), Number(match[2]), Number(match[3])]
}

function isNearBrandBlue(color: string): boolean {
  const rgb = parseRgb(color)
  if (!rgb) return false
  const [r, g, b] = rgb
  return (
    Math.abs(r - BRAND_BLUE.r) <= BLUE_TOLERANCE &&
    Math.abs(g - BRAND_BLUE.g) <= BLUE_TOLERANCE &&
    Math.abs(b - BRAND_BLUE.b) <= BLUE_TOLERANCE
  )
}

function isTransparentColor(color: string): boolean {
  return (
    !color ||
    color === 'transparent' ||
    color === 'none' ||
    color.endsWith(', 0)') ||
    color === 'rgba(0, 0, 0, 0)'
  )
}

function getEffectiveSurfaceColor(el: Element | null): string | null {
  let current = el as HTMLElement | null
  while (current && current !== document.documentElement) {
    const style = window.getComputedStyle(current)
    const bg = style.backgroundColor
    if (!isTransparentColor(bg)) return bg

    if (current instanceof SVGElement) {
      const fill = style.fill
      if (!isTransparentColor(fill)) return fill
    }

    current = current.parentElement
  }
  return null
}

function isOnBrandBlueSurface(x: number, y: number): boolean {
  const el = document.elementFromPoint(x, y)
  if (!el) return false

  if ((el as HTMLElement).closest?.('[data-cursor-on-blue]')) return true

  const surfaceColor = getEffectiveSurfaceColor(el)
  return surfaceColor ? isNearBrandBlue(surfaceColor) : false
}

export default function CustomCursor({
  size = 9,
  color = '#3B82F6',
  ringSize = 46,
  ringColor = '#007BFF',
  enableHoverEffects = true,
  className = ''
}: CustomCursorProps) {
  const [isDisabled, setIsDisabled] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const isHovering = useRef(false)
  const isLightTheme = useRef(false)
  const isOnBlueSurface = useRef(false)
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    // Disable on touch/coarse pointers or when prefers-reduced-motion
    const coarse = window.matchMedia('(pointer: coarse)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const disabled = coarse || reduced
    setIsDisabled(disabled)
    if (disabled) {
      document.body.style.cursor = 'auto'
      document.documentElement.classList.remove('custom-cursor-active')
      return
    }
    document.documentElement.classList.add('custom-cursor-active')

    const stopAnimation = () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current)
        frameRef.current = null
      }
    }

    const update = () => {
      const hoverScale = isHovering.current ? 1.65 : 1
      const blueSurfaceRingScale = isOnBlueSurface.current && !isLightTheme.current ? 1.1 : 1
      const ringScale = (isHovering.current ? 1.28 : 1) * blueSurfaceRingScale
      const cursorTransform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%) scale(${hoverScale})`
      const ringTransform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%) scale(${ringScale})`

      if (cursorRef.current) {
        cursorRef.current.style.transform = cursorTransform

        if (isLightTheme.current) {
          cursorRef.current.style.backgroundColor = '#FFFFFF'
          cursorRef.current.style.boxShadow = '0 0 16px rgba(255,255,255,0.5)'
        } else if (isOnBlueSurface.current) {
          cursorRef.current.style.backgroundColor = '#B8ECFF'
          cursorRef.current.style.boxShadow = '0 0 16px rgba(255,255,255,0.45)'
        } else {
          cursorRef.current.style.backgroundColor = color
          cursorRef.current.style.boxShadow = '0 0 16px rgba(0,123,255,0.42)'
        }
      }

      if (ringRef.current) {
        ringRef.current.style.transform = ringTransform

        if (isLightTheme.current) {
          ringRef.current.style.opacity = '0.82'
          ringRef.current.style.borderColor = '#FFFFFF'
          ringRef.current.style.backgroundColor = 'rgba(255, 255, 255, 0.16)'
        } else if (isOnBlueSurface.current) {
          ringRef.current.style.opacity = isHovering.current ? '0.72' : '0.55'
          ringRef.current.style.borderColor = '#FFFFFF'
          ringRef.current.style.backgroundColor = isHovering.current
            ? 'rgba(255, 255, 255, 0.24)'
            : 'rgba(255, 255, 255, 0.18)'
        } else {
          ringRef.current.style.opacity = isHovering.current ? '0.62' : '0.42'
          ringRef.current.style.borderColor = ringColor
          ringRef.current.style.backgroundColor = isHovering.current
            ? 'rgba(0, 123, 255, 0.12)'
            : 'rgba(0, 123, 255, 0.055)'
        }
      }

      frameRef.current = requestAnimationFrame(update)
    }

    const startAnimation = () => {
      if (frameRef.current !== null || document.hidden) return
      frameRef.current = requestAnimationFrame(update)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      isOnBlueSurface.current = isOnBrandBlueSurface(e.clientX, e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      if (!enableHoverEffects) return
      const el = e.target as HTMLElement
      const interactive = el.closest('a, button, [data-cursor-hover]')
      isHovering.current = !!interactive
      isLightTheme.current = !!el.closest('[data-cursor-theme="light"]')

      document.body.style.cursor = 'none'
      if (cursorRef.current) cursorRef.current.style.display = 'block'
      if (ringRef.current) ringRef.current.style.display = 'block'
    }

    const handleVisibilityChange = () => {
      if (document.hidden) stopAnimation()
      else startAnimation()
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    startAnimation()

    document.body.style.cursor = 'none'
    return () => {
      stopAnimation()
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      document.documentElement.classList.remove('custom-cursor-active')
      document.body.style.cursor = 'auto'
    }
  }, [color, enableHoverEffects, ringColor])

  if (isDisabled) return null

  return (
    <>
      {/* Blue dot */}
      <div
        ref={cursorRef}
        className={`fixed left-0 top-0 z-[10050] rounded-full pointer-events-none transition-[transform,background-color,box-shadow] duration-200 ease-out will-change-transform ${className}`}
        style={{
          backgroundColor: color,
          width: `${size}px`,
          height: `${size}px`
        }}
      />

      {/* Grey ring */}
      <div
        ref={ringRef}
        className="fixed left-0 top-0 z-[10049] rounded-full pointer-events-none border transition-[transform,opacity,background-color,border-color] duration-200 ease-out will-change-transform"
        style={{
          borderColor: ringColor,
          borderWidth: '1px',
          width: `${ringSize}px`,
          height: `${ringSize}px`
        }}
      />
    </>
  )
}
