'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { PRIMARY_NAV, NAV_SERVICES, getNavIndustries } from '@/lib/nav-services';
import { navigateToHomeSection } from '@/lib/homeNavigation';
import { isReportPath } from '@/lib/reports/is-report-path';
import { focusPageStart, getVisibleMenuToggle, useSiteMenu } from '@/components/SiteMenuContext';

/**
 * The full-screen site menu. Big Futura items down the left, with a blue
 * square on the current or hovered one and the rest dimmed. Services sits last
 * and opens a quieter list in the bottom right.
 *
 * The whole thing is always in the server HTML, closed or not, so every link
 * in it is crawlable. Closed, it is invisible and inert rather than unmounted.
 */

const NAV_INDUSTRIES = getNavIndustries();
const SERVICES = 'Services';
const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function isCurrent(pathname: string, href: string) {
  if (href.startsWith('/#')) return false;
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

const servicesCurrent = (pathname: string) =>
  [...NAV_SERVICES, ...NAV_INDUSTRIES].some((link) => isCurrent(pathname, link.href));

// Hover-open only where a real pointer can hover. Touch taps would otherwise
// fire mouseenter and click together and cancel each other out.
const canHover = () => window.matchMedia('(hover: hover)').matches;

export default function SiteMenu() {
  const pathname = usePathname();
  const router = useRouter();
  const { open, closeMenu } = useSiteMenu();
  const prefersReduced = useReducedMotion();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const firstItemRef = useRef<HTMLAnchorElement>(null);
  const hoverOpenedRef = useRef(false);
  const closeTimer = useRef<number | null>(null);

  const clearCloseTimer = () => {
    if (closeTimer.current === null) return;
    window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };

  const openServices = (byHover: boolean) => {
    clearCloseTimer();
    hoverOpenedRef.current = byHover;
    setServicesOpen(true);
    setActive(SERVICES);
  };

  const closeServices = () => {
    clearCloseTimer();
    hoverOpenedRef.current = false;
    setServicesOpen(false);
    setActive((current) => (current === SERVICES ? null : current));
  };

  // A click pins the list open; only a hover-opened list closes on mouse-out.
  const scheduleCloseServices = () => {
    if (!hoverOpenedRef.current) return;
    clearCloseTimer();
    closeTimer.current = window.setTimeout(closeServices, 280);
  };

  // Each open starts clean, with focus on the first item.
  useEffect(() => {
    if (!open) {
      clearCloseTimer();
      hoverOpenedRef.current = false;
      setServicesOpen(false);
      setActive(null);
      return;
    }
    const raf = requestAnimationFrame(() => firstItemRef.current?.focus());
    return () => cancelAnimationFrame(raf);
  }, [open]);

  // Escape closes; Tab cycles through the menu and the visible close button only.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu('trigger');
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;

      const toggle = getVisibleMenuToggle();
      const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE))
        .filter((el) => el.getClientRects().length > 0);
      const ring = toggle ? [toggle, ...items] : items;
      if (ring.length === 0) return;

      const index = ring.indexOf(document.activeElement as HTMLElement);
      const next = event.shiftKey
        ? ring[index <= 0 ? ring.length - 1 : index - 1]
        : ring[index === -1 || index === ring.length - 1 ? 0 : index + 1];
      event.preventDefault();
      next.focus();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, closeMenu]);

  useEffect(() => () => clearCloseTimer(), []);

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Homepage anchors go through the shared helpers so they work from any page.
    if (href.startsWith('/#')) {
      event.preventDefault();
      const targetId = href.slice(2);
      if (pathname === '/') {
        closeMenu('none');
        navigateToHomeSection(router, pathname, targetId);
        // Next frame: the page is still inert until React commits the close.
        requestAnimationFrame(() => {
          const target = document.getElementById(targetId);
          if (!target) return focusPageStart();
          if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
          target.focus({ preventScroll: true });
        });
        return;
      }
      closeMenu('main');
      navigateToHomeSection(router, pathname, targetId);
      return;
    }

    if (href === pathname) {
      closeMenu('none');
      requestAnimationFrame(focusPageStart);
      return;
    }
    closeMenu('main');
  };

  if (isReportPath(pathname)) return null;

  const fallbackMarked = servicesCurrent(pathname) ? SERVICES : null;
  const items = [...PRIMARY_NAV.map((link) => link.name), SERVICES];

  const itemMotion = (index: number) => ({
    initial: false as const,
    animate: open ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReduced ? 0 : 8 },
    transition: {
      duration: prefersReduced ? 0 : open ? 0.35 : 0.15,
      delay: prefersReduced || !open ? 0 : 0.08 + index * 0.05,
      ease: 'easeOut' as const,
    },
  });

  const itemState = (name: string, href: string | null) => {
    const current = href ? isCurrent(pathname, href) : fallbackMarked === name;
    const marked = active ? active === name : current;
    const quiet = active !== null && active !== name;
    return { marked, quiet };
  };

  const bigText = (quiet: boolean) =>
    `font-futura text-[clamp(2.75rem,6vw,4.75rem)] font-bold leading-[0.95] tracking-[-0.03em] transition-colors duration-200 motion-reduce:transition-none focus:outline-none focus-visible:underline focus-visible:decoration-brand-blue focus-visible:decoration-4 focus-visible:underline-offset-8 ${
      quiet ? 'text-paper/40' : 'text-paper'
    }`;

  const marker = (marked: boolean) => (
    <span
      className={`mr-4 inline-block h-3 w-3 shrink-0 bg-brand-blue transition-opacity duration-200 motion-reduce:transition-none ${
        marked ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    />
  );

  const smallLink = (href: string, quiet: boolean) =>
    `font-helvetica focus:outline-none focus-visible:underline ${
      isCurrent(pathname, href)
        ? 'text-paper underline decoration-brand-blue decoration-2 underline-offset-4'
        : quiet
          ? 'text-paper/70 hover:text-paper'
          : 'text-paper/80 hover:text-paper'
    }`;

  const servicesState = itemState(SERVICES, null);

  return (
    <div
      id="site-menu"
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      inert={!open}
      data-lenis-prevent
      data-cursor-theme="light"
      // Visibility flips at once on open (so focus can land) and only after
      // the fade on close.
      className={`fixed inset-0 z-[55] overflow-y-auto overscroll-contain bg-ink text-paper md:left-16 duration-300 ease-out ${
        open ? 'visible opacity-100 transition-opacity' : 'invisible opacity-0 transition-[opacity,visibility]'
      } ${prefersReduced ? 'transition-none' : ''} motion-reduce:transition-none`}
    >
      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-between gap-12 px-6 pb-12 pt-24 sm:px-10 md:pt-12 lg:py-16">
        <nav aria-label="Site" className="flex flex-1 flex-col">
          <ul
            className="flex flex-col gap-1 lg:mt-auto"
            onMouseLeave={() => {
              if (!servicesOpen) setActive(null);
            }}
          >
            {PRIMARY_NAV.map((link, index) => {
              const { marked, quiet } = itemState(link.name, link.href);
              return (
                <motion.li
                  key={link.name}
                  {...itemMotion(index)}
                  onMouseEnter={() => {
                    if (!canHover()) return;
                    if (hoverOpenedRef.current) closeServices();
                    setActive(servicesOpen && !hoverOpenedRef.current ? SERVICES : link.name);
                  }}
                >
                  <span className="inline-flex items-center">
                    {marker(marked)}
                    <Link
                      ref={index === 0 ? firstItemRef : undefined}
                      href={link.href}
                      aria-current={isCurrent(pathname, link.href) ? 'page' : undefined}
                      onClick={(event) => handleLinkClick(event, link.href)}
                      onFocus={() => {
                        if (!servicesOpen) setActive(link.name);
                      }}
                      className={bigText(quiet)}
                    >
                      {link.name}
                    </Link>
                  </span>
                </motion.li>
              );
            })}

            <motion.li
              {...itemMotion(items.length - 1)}
              onMouseEnter={() => {
                if (canHover()) openServices(true);
              }}
              onMouseLeave={() => {
                if (canHover()) scheduleCloseServices();
              }}
            >
              <span className="inline-flex items-center">
                {marker(servicesState.marked)}
                <button
                  type="button"
                  aria-expanded={servicesOpen}
                  aria-controls="site-menu-services"
                  onClick={() => {
                    if (servicesOpen && !hoverOpenedRef.current) closeServices();
                    else openServices(false);
                  }}
                  onFocus={() => {
                    if (!servicesOpen) setActive(SERVICES);
                  }}
                  className={`inline-flex items-center ${bigText(servicesState.quiet)}`}
                >
                  {SERVICES}
                  <span className="ml-5 flex h-11 w-11 items-center" aria-hidden="true">
                    <span
                      className={`block h-[2px] bg-current transition-[width] duration-200 motion-reduce:transition-none ${
                        servicesOpen ? 'w-10' : 'w-4'
                      }`}
                    />
                  </span>
                </button>
              </span>
            </motion.li>
          </ul>

          <div
            id="site-menu-services"
            hidden={!servicesOpen}
            className="mt-10 pl-7 lg:absolute lg:pl-0 lg:bottom-28 lg:right-10 lg:mt-0 lg:w-[min(36rem,46%)]"
            onMouseEnter={() => {
              if (canHover() && hoverOpenedRef.current) clearCloseTimer();
            }}
            onMouseLeave={() => {
              if (canHover()) scheduleCloseServices();
            }}
          >
            <motion.div
              key={servicesOpen ? 'open' : 'closed'}
              className="grid gap-8 sm:grid-cols-2"
              initial={prefersReduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: prefersReduced ? 0 : 0.25 }}
            >
              <ul className="flex flex-col gap-3" aria-label="Services">
                {NAV_SERVICES.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={isCurrent(pathname, link.href) ? 'page' : undefined}
                      onClick={(event) => handleLinkClick(event, link.href)}
                      className={`text-b-18 ${smallLink(link.href, false)}`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="flex flex-col gap-2 border-l border-paper/25 pl-4" aria-label="SEO by place and industry">
                {NAV_INDUSTRIES.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={isCurrent(pathname, link.href) ? 'page' : undefined}
                      onClick={(event) => handleLinkClick(event, link.href)}
                      className={`text-b-16 ${smallLink(link.href, true)}`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </nav>
      </div>
    </div>
  );
}
