'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import ThemeToggle from '@/components/ThemeToggle';
import ContactHeaderButton from '@/components/ContactHeaderButton';
import { usePathname } from 'next/navigation';
import { isReportPath } from '@/lib/reports/is-report-path';
import { useSiteMenu } from '@/components/SiteMenuContext';

export default function TopBar() {
  const { open, toggleMenu } = useSiteMenu();
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      // Show on scroll up, hide on scroll down (only after some movement)
      if (Math.abs(delta) > 4) {
        setVisible(delta < 0 || y < 24);
        lastY.current = y;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Report pages own their whole frame, so the marketing chrome bows out.
  // Placed after every hook, not before: an early return above them would
  // change the hook order between routes and break the rules of hooks.
  if (isReportPath(pathname)) return null;

  return (
    <>
      <AnimatePresence initial={false}>
        {/* Always shown while the menu is open: its hamburger is the close button. */}
        {(visible || open) && (
          <motion.div
            className="fixed top-0 inset-x-0 z-[60] md:hidden"
            initial={{ y: -64, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -64, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {/* Stronger layered gradient wash for readability under logo/actions.
                Ink while the menu is open, so the bar sits on the overlay. */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-20">
              {open ? (
                <div className="absolute inset-0 bg-ink" />
              ) : (
                <>
                  <div className="absolute inset-0 bg-gradient-to-b from-white via-white/90 to-white/0 dark:from-[#0f1117] dark:via-[#0f1117]/90 dark:to-[#0f1117]/0" />
                  <div className="absolute inset-0 backdrop-blur-[2px]" />
                </>
              )}
            </div>
            <div className="flex items-center px-4 py-3 relative">
              <div className="shrink-0 flex items-center">
                <Image src="/brand/logo_main.svg" alt="Consultico" width={140} height={28} className={`block h-7 w-auto ${open ? 'brightness-0 invert' : ''}`} priority />
              </div>
              <div className="flex-1" />
              <div className="shrink-0 flex items-center gap-2">
                {/* Hidden and inert behind the open menu; only the close button stays. */}
                <div inert={open} className={`flex items-center gap-2 ${open ? 'invisible' : ''}`}>
                  <ContactHeaderButton variant="mobile" />
                  <ThemeToggle size="compact" />
                </div>
                <button
                  type="button"
                  data-site-menu-toggle
                  aria-expanded={open}
                  aria-controls="site-menu"
                  aria-label={open ? 'Close menu' : 'Open menu'}
                  onClick={(e) => toggleMenu(e.currentTarget)}
                  className={`w-10 h-10 rounded-full border grid place-items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 ${open ? 'border-paper text-paper focus-visible:ring-offset-ink' : 'border-brand-blue text-brand-blue'}`}
                >
                  <span className="relative block w-5 h-5" aria-hidden="true">
                    <span className={`absolute left-0 right-0 h-[2px] bg-current transition-transform motion-reduce:transition-none ${open ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-1'} `} />
                    <span className={`absolute left-0 right-0 h-[2px] bg-current transition-opacity motion-reduce:transition-none ${open ? 'opacity-0' : 'top-1/2 -translate-y-1/2 opacity-100'}`} />
                    <span className={`absolute left-0 right-0 h-[2px] bg-current transition-transform motion-reduce:transition-none ${open ? 'bottom-1/2 translate-y-1/2 -rotate-45' : 'bottom-1'}`} />
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
