'use client';

type HomeRouter = {
  push: (href: string, options?: { scroll?: boolean }) => void;
};

export function scrollToHomeSection(targetId: string, behavior: ScrollBehavior = 'smooth') {
  const target = document.getElementById(targetId);
  if (!target) return false;

  target.scrollIntoView({ behavior, block: 'start' });
  if (window.location.pathname === '/') {
    window.history.replaceState(null, '', `/#${targetId}`);
  }
  return true;
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
