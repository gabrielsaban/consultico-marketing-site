'use client'

import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';

const navItems = [
  { name: 'home',     href: '#home'     },
  { name: 'services', href: '#services' },
  { name: 'projects', href: '#projects' },
  { name: 'about',    href: '#about'    },
  { name: 'contact',  href: '#contact'  },
];

export default function RouteAwareNavbar() {
  const pathname = usePathname();
  if (pathname?.startsWith('/landing')) return null;

  const [activeSection, setActiveSection] = useState('home');
  const prefersReduced = useReducedMotion();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.slice(1);
    document.getElementById(targetId)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    const ids = navItems.map((n) => n.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        let bestId: string | null = null;
        let bestRatio = 0;
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio;
            bestId = (entry.target as HTMLElement).id;
          }
        }
        if (bestId) setActiveSection(bestId);
      },
      {
        root: null,
        rootMargin: '-35% 0px -55% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav 
      data-native-cursor
      className="hidden md:flex fixed left-0 top-0 h-full w-16 bg-brand-blue z-50 flex-col justify-center"
      initial={prefersReduced ? false : { x: -100, opacity: 0 }}
      animate={prefersReduced ? { x: 0, opacity: 1 } : { x: 0, opacity: 1 }}
      transition={{ delay: prefersReduced ? 0 : 1.5, duration: prefersReduced ? 0 : 0.4, ease: 'easeOut' }}
    >
      <div className="flex flex-col items-center space-y-28">
        {navItems.map((item) => {
          const isActive = activeSection === item.name;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`
                relative flex items-center justify-center
                transition-all duration-200 ease-out
                ${isActive
                  ? 'font-extrabold scale-110 text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]'
                  : 'font-bold text-brand-silk/70'
                }
                hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]
                hover:scale-105
              `}
            >
              <div className="transform -rotate-90 whitespace-nowrap">
                <span className="text-d-20 tracking-wide antialiased subpixel-antialiased">
                  {item.name}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}


