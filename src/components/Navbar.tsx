'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const navItems = [
  { name: 'home',     href: '#home'     },
  { name: 'projects', href: '#projects' },
  { name: 'services', href: '#services' },
  { name: 'about',    href: '#about'    },
  { name: 'contact',  href: '#contact'  },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.slice(1);
    document.getElementById(targetId)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    // Highlight section whose center is inside the viewport window
    const ids = navItems.map((n) => n.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry with the highest intersection ratio
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
        // Center-weighted window: when section's middle is inside, it becomes active
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
      className="fixed left-0 top-0 h-full w-16 bg-blue-primary z-50 flex flex-col justify-center"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ 
        delay: 1.5, 
        duration: 0.4, 
        ease: "easeOut" 
      }}
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
                  : 'font-bold text-blue-300'
                }

                hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]
                hover:scale-105
              `}
            >
              <div className="transform -rotate-90 whitespace-nowrap">
                <span className="text-[24px] tracking-wide antialiased subpixel-antialiased">
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
