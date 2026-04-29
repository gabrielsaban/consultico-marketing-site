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
      const ringScale = isHovering.current ? 1.28 : 1
      const cursorTransform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%) scale(${hoverScale})`
      const ringTransform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%) scale(${ringScale})`

      if (cursorRef.current) {
        cursorRef.current.style.transform = cursorTransform
        cursorRef.current.style.backgroundColor = isLightTheme.current ? '#FFFFFF' : color
        cursorRef.current.style.boxShadow = isLightTheme.current
          ? '0 0 16px rgba(255,255,255,0.5)'
          : '0 0 16px rgba(0,123,255,0.42)'
      }

      if (ringRef.current) {
        ringRef.current.style.transform = ringTransform
        ringRef.current.style.opacity = isLightTheme.current ? '0.82' : isHovering.current ? '0.62' : '0.42'
        ringRef.current.style.borderColor = isLightTheme.current ? '#FFFFFF' : ringColor
        ringRef.current.style.backgroundColor = isLightTheme.current
          ? 'rgba(255, 255, 255, 0.16)'
          : isHovering.current
            ? 'rgba(0, 123, 255, 0.12)'
            : 'rgba(0, 123, 255, 0.055)'
      }

      frameRef.current = requestAnimationFrame(update)
    }

    const startAnimation = () => {
      if (frameRef.current !== null || document.hidden) return
      frameRef.current = requestAnimationFrame(update)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
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
        className={`fixed left-0 top-0 z-[1000] rounded-full pointer-events-none transition-transform duration-150 ease-out will-change-transform ${className}`}
        style={{
          backgroundColor: color,
          width: `${size}px`,
          height: `${size}px`
        }}
      />

      {/* Grey ring */}
      <div
        ref={ringRef}
        className="fixed left-0 top-0 z-[999] rounded-full pointer-events-none border transition-[transform,opacity,background-color] duration-200 ease-out will-change-transform"
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
