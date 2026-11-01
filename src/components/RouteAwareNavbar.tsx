'use client'

import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import { useRouter } from 'next/navigation';
import { navigateToHomeSection } from '@/lib/homeNavigation';
import { isReportPath } from '@/lib/reports/is-report-path';
import { useSiteMenu } from '@/components/SiteMenuContext';

// Shortcuts to homepage sections that still exist. The full site map lives in
// the overlay menu (SiteMenu), which the hamburger at the top opens.
const navItems = [
  { name: 'home',     href: '#home'     },
  { name: 'projects', href: '#projects' },
  { name: 'about',    href: '#about'    },
  { name: 'contact',  href: '#contact'  },
];

export default function RouteAwareNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<string | null>('home');
  const prefersReduced = useReducedMotion();
  const { open, toggleMenu } = useSiteMenu();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.slice(1);
    navigateToHomeSection(router, pathname, targetId);
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
      if (pathname === '/contact') {
        setActiveSection('contact');
        return;
      }
      if (pathname === '/case-studies' || pathname.startsWith('/case-studies/')) {
        setActiveSection('projects');
        return;
      }
      setActiveSection(null);
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

      setActiveSection(bestId ?? 'home');
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

  // Report pages own their whole frame, so the marketing chrome bows out.
  // Placed after every hook, not before: an early return above them would
  // change the hook order between routes and break the rules of hooks.
  if (isReportPath(pathname)) return null;

  return (
    <motion.nav
      aria-label="Sections"
      data-cursor-theme="light"
      className="hidden md:flex fixed left-0 top-0 h-full w-16 bg-brand-blue z-50 flex-col items-center py-4"
      initial={prefersReduced ? false : { x: -100, opacity: 0 }}
      animate={prefersReduced ? { x: 0, opacity: 1 } : { x: 0, opacity: 1 }}
      transition={{ delay: prefersReduced ? 0 : 0.15, duration: prefersReduced ? 0 : 0.35, ease: 'easeOut' }}
    >
      {/* Stays live while the menu is open: it is the menu's close button. */}
      <button
        type="button"
        data-site-menu-toggle
        aria-expanded={open}
        aria-controls="site-menu"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={(e) => toggleMenu(e.currentTarget)}
        className="shrink-0 w-12 h-12 grid place-items-center text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <span className="relative block h-3.5 w-5" aria-hidden="true">
          <span className={`absolute left-0 right-0 h-[2px] bg-current transition-transform duration-200 motion-reduce:transition-none ${open ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'}`} />
          <span className={`absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 bg-current transition-opacity duration-200 motion-reduce:transition-none ${open ? 'opacity-0' : 'opacity-100'}`} />
          <span className={`absolute left-0 right-0 h-[2px] bg-current transition-transform duration-200 motion-reduce:transition-none ${open ? 'bottom-1/2 translate-y-1/2 -rotate-45' : 'bottom-0'}`} />
        </span>
      </button>

      {/* Vertical writing rather than a rotate transform, so each label's
          layout box is its real height and the gaps below are honest. */}
      <div inert={open} className="flex flex-1 min-h-0 flex-col items-center justify-center gap-[clamp(1.75rem,6vh,4.5rem)]">
        {navItems.map((item) => {
          const isActive = activeSection === item.name;
          return (
            <Link
              key={item.name}
              href={`/${item.href}`}
              onClick={(e) => handleNavClick(e, item.href)}
              aria-current={isActive ? 'location' : undefined}
              className={`
                text-white text-d-20 tracking-wide antialiased whitespace-nowrap
                [writing-mode:vertical-rl] rotate-180
                transition-transform duration-200 ease-out motion-reduce:transition-none
                ${isActive
                  ? 'font-extrabold scale-110 underline decoration-2 underline-offset-[6px]'
                  : 'font-bold'
                }
                hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white
              `}
            >
              {item.name}
            </Link>
          );
        })}
      </div>

      {/* White on our blue is just under 4:1, so this stays at large-text
          size (19px bold) to clear the 3:1 large-text bar. */}
      <div inert={open} className="shrink-0 flex flex-col items-center gap-5">
        <Link
          href="/contact"
          className="text-white text-[19px] leading-none font-bold tracking-wide whitespace-nowrap [writing-mode:vertical-rl] rotate-180 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          Start the conversation
        </Link>
        <ThemeToggle className="border-white text-white hover:bg-white/20" />
      </div>
    </motion.nav>
  );
}
