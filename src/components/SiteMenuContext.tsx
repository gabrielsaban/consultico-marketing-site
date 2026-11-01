'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

/**
 * One open/closed state for the full-screen site menu, shared by the three
 * places that touch it: the desktop sidebar and the mobile TopBar (which each
 * hold a hamburger) and the overlay itself. The page frame reads it too, so it
 * can go inert while the menu is up.
 *
 * Scroll locking lives here rather than in an effect so it runs in the same
 * tick as the click. A homepage anchor link has to get the page's scroll
 * position back before it scrolls to its section, not one render later.
 */

export type MenuFocusTarget = 'trigger' | 'main' | 'none';

type SiteMenuContextValue = {
  open: boolean;
  openMenu: (trigger: HTMLElement | null) => void;
  closeMenu: (focus?: MenuFocusTarget) => void;
  toggleMenu: (trigger: HTMLElement | null) => void;
};

const SiteMenuContext = createContext<SiteMenuContextValue | null>(null);

/** The hamburger that is actually on screen: the sidebar's on desktop, TopBar's on mobile. */
export function getVisibleMenuToggle() {
  const toggles = document.querySelectorAll<HTMLElement>('[data-site-menu-toggle]');
  return Array.from(toggles).find((el) => el.getClientRects().length > 0) ?? null;
}

/** After a navigation, put focus at the top of the new page's content. */
export function focusPageStart() {
  const target = document.querySelector('main') ?? document.querySelector('h1');
  if (!(target instanceof HTMLElement)) return;
  if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
}

// Stops Lenis through its existing modal lock (see useLenisScroll).
function announce(open: boolean) {
  window.dispatchEvent(new CustomEvent('consultico:site-menu', { detail: { open } }));
}

export function SiteMenuProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const triggerRef = useRef<HTMLElement | null>(null);
  const scrollYRef = useRef(0);
  const pendingFocusRef = useRef(false);
  const lastPathRef = useRef(pathname);

  // iOS ignores overflow:hidden on body, so pin the body in place instead and
  // put the reader back where they were on close.
  const lockScroll = useCallback(() => {
    announce(true);
    scrollYRef.current = window.scrollY;
    const s = document.body.style;
    s.position = 'fixed';
    s.top = `-${scrollYRef.current}px`;
    s.left = '0';
    s.right = '0';
    s.width = '100%';
  }, []);

  const unlockScroll = useCallback(() => {
    const s = document.body.style;
    s.position = '';
    s.top = '';
    s.left = '';
    s.right = '';
    s.width = '';
    window.scrollTo({ top: scrollYRef.current, left: 0, behavior: 'instant' });
    announce(false);
  }, []);

  const openMenu = useCallback(
    (trigger: HTMLElement | null) => {
      if (openRef.current) return;
      openRef.current = true;
      triggerRef.current = trigger;
      lockScroll();
      setOpen(true);
    },
    [lockScroll],
  );

  const closeMenu = useCallback(
    (focus: MenuFocusTarget = 'trigger') => {
      if (!openRef.current) return;
      openRef.current = false;
      unlockScroll();
      setOpen(false);

      if (focus === 'trigger') {
        const trigger = triggerRef.current;
        const target = trigger && trigger.isConnected && trigger.getClientRects().length > 0
          ? trigger
          : getVisibleMenuToggle();
        target?.focus();
      } else if (focus === 'main') {
        // Wait for the route to land; the pathname effect below does the focusing.
        pendingFocusRef.current = true;
      }
    },
    [unlockScroll],
  );

  const toggleMenu = useCallback(
    (trigger: HTMLElement | null) => {
      if (openRef.current) closeMenu('trigger');
      else openMenu(trigger);
    },
    [closeMenu, openMenu],
  );

  // A route change always closes the menu and moves focus into the new page,
  // whether it came from a menu link or the browser's back button.
  useEffect(() => {
    if (lastPathRef.current === pathname) return;
    lastPathRef.current = pathname;
    if (openRef.current) closeMenu('main');
    if (!pendingFocusRef.current) return;
    pendingFocusRef.current = false;
    const raf = requestAnimationFrame(focusPageStart);
    return () => cancelAnimationFrame(raf);
  }, [pathname, closeMenu]);

  // Never leave the body pinned if the provider goes away mid-menu.
  useEffect(() => () => {
    if (openRef.current) unlockScroll();
  }, [unlockScroll]);

  const value = useMemo(
    () => ({ open, openMenu, closeMenu, toggleMenu }),
    [open, openMenu, closeMenu, toggleMenu],
  );

  return <SiteMenuContext.Provider value={value}>{children}</SiteMenuContext.Provider>;
}

export function useSiteMenu() {
  const value = useContext(SiteMenuContext);
  if (!value) throw new Error('useSiteMenu must be used inside SiteMenuProvider');
  return value;
}
