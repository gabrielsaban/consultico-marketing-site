'use client'

import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import { useRouter } from 'next/navigation';

const navItems = [
  { name: 'home',     href: '#home'     },
  { name: 'services', href: '#services' },
  { name: 'projects', href: '#projects' },
  { name: 'about',    href: '#about'    },
  { name: 'contact',  href: '#contact'  },
];

export default function RouteAwareNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('home');
  const prefersReduced = useReducedMotion();
  const shouldHide = pathname?.startsWith('/landing');

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.slice(1);
    if (pathname !== '/') {
      sessionStorage.setItem('consultico_scroll_target', targetId);
      router.push('/');
      return;
    }
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    if (pathname !== '/') {
      if (pathname === '/think-first') {
        setActiveSection('home');
        return;
      }
      if (pathname === '/careers') {
        setActiveSection('about');
        return;
      }
      setActiveSection('services');
      return;
    }

    const ids = navItems.map((n) => n.href.slice(1));
    let raf = 0;

    const updateActive = () => {
      raf = 0;
      const threshold = window.innerHeight * 0.35;
      let bestId: string | null = null;
      let bestTop = -Infinity;

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= threshold && top > bestTop) {
          bestTop = top;
          bestId = id;
        }
      }

      if (bestId) setActiveSection(bestId);
      else setActiveSection('home');
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(updateActive);
    };

    updateActive();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [pathname]);

  if (shouldHide) return null;

  return (
    <motion.nav 
      data-native-cursor
      className="hidden md:flex fixed left-0 top-0 h-full w-16 bg-brand-blue z-50 flex-col justify-center"
      initial={prefersReduced ? false : { x: -100, opacity: 0 }}
      animate={prefersReduced ? { x: 0, opacity: 1 } : { x: 0, opacity: 1 }}
      transition={{ delay: prefersReduced ? 0 : 0.15, duration: prefersReduced ? 0 : 0.35, ease: 'easeOut' }}
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
                  ? 'font-extrabold scale-110 text-white'
                  : 'font-bold text-brand-silk/70'
                }
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
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <ThemeToggle className="border-white text-white hover:bg-white/20" />
      </div>
    </motion.nav>
  );
}
