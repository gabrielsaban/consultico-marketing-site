'use client'

import { useEffect, useRef } from 'react'

interface CustomCursorProps {
  size?: number
  color?: string
  ringSize?: number
  ringColor?: string
  enableHoverEffects?: boolean
  className?: string
}

export default function CustomCursor({
  size = 10,
  color = '#3B82F6',
  ringSize = 28,
  ringColor = '#D1D5DB', // Tailwind gray-300
  enableHoverEffects = true,
  className = ''
}: CustomCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const isHovering = useRef(false)

  useEffect(() => {
    const update = () => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${mouse.current.x}px`
        cursorRef.current.style.top = `${mouse.current.y}px`
        cursorRef.current.style.transform = `translate(-50%, -50%) scale(${isHovering.current ? 1.4 : 1})`
      }

      if (ringRef.current) {
        ringRef.current.style.left = `${mouse.current.x}px`
        ringRef.current.style.top = `${mouse.current.y}px`
        ringRef.current.style.transform = `translate(-50%, -50%) scale(${isHovering.current ? 1.2 : 1})`
      }

      requestAnimationFrame(update)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseOver = (e: MouseEvent) => {
      if (!enableHoverEffects) return
      const el = e.target as HTMLElement
      const interactive = el.closest('a, button, [data-cursor-hover]')
      isHovering.current = !!interactive
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    requestAnimationFrame(update)

    document.body.style.cursor = 'none'
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.body.style.cursor = 'auto'
    }
  }, [enableHoverEffects])

  return (
    <>
      {/* Blue dot */}
      <div
        ref={cursorRef}
        className={`fixed z-50 rounded-full pointer-events-none transition-transform duration-150 ease-out ${className}`}
        style={{
          backgroundColor: color,
          width: `${size}px`,
          height: `${size}px`
        }}
      />

      {/* Grey ring */}
      <div
        ref={ringRef}
        className="fixed z-40 rounded-full pointer-events-none border transition-transform duration-200 ease-out"
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
