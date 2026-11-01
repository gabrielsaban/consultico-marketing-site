'use client';

type HomeRouter = {
  push: (href: string, options?: { scroll?: boolean }) => void;
};

export function scrollToHomeSection(targetId: string, behavior: ScrollBehavior = 'smooth') {
  const target = document.getElementById(targetId);
  if (!target) return false;

  target.scrollIntoView({ behavior, block: 'start' });
  // Scroll to the section but leave the address as plain "/". Writing the
  // section into the URL meant the homepage read consultico.co.uk/#loop after
  // one click, and a refresh or a shared link then opened halfway down the
  // page (Paul, 2026-11-01). Links from other pages can still use /#section to
  // land somewhere: ScrollToSectionOnLoad tidies the hash away once the page
  // has settled there, because clearing it straight away let the page jump
  // back to the top on arrival.
  if (behavior === 'smooth') clearHomeHash();
  return true;
}

/** Puts the homepage address back to plain "/" if it carries a #section. */
export function clearHomeHash() {
  if (window.location.pathname === '/' && window.location.hash) {
    window.history.replaceState(null, '', '/');
  }
}

export function navigateToHomeSection(router: HomeRouter, pathname: string, targetId: string) {
  if (pathname === '/') {
    scrollToHomeSection(targetId);
    return;
  }

  router.push(`/#${targetId}`);
}

export function consumePendingHomeSection() {
  return window.location.hash.startsWith('#') ? window.location.hash.slice(1) : null;
}

export function consumeHomeEntryAnimationSkip() {
  return window.location.hash.length > 1 && window.location.hash !== '#home';
}
