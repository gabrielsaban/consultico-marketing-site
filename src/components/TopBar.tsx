'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import SocialIcons from '@/components/SocialIcons';
import ThemeToggle from '@/components/ThemeToggle';

export default function TopBar() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);

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

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    return () => { document.documentElement.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <AnimatePresence initial={false}>
        {visible && (
          <motion.div
            className="fixed top-0 inset-x-0 z-[60] md:hidden"
            initial={{ y: -64, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -64, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {/* Stronger layered gradient wash for readability under logo/icons */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-20">
              <div className="absolute inset-0 bg-gradient-to-b from-white via-white/90 to-white/0 dark:from-[#0f1117] dark:via-[#0f1117]/90 dark:to-[#0f1117]/0" />
              <div className="absolute inset-0 backdrop-blur-[2px]" />
            </div>
            <div className="flex items-center px-4 py-3 relative">
              <div className="shrink-0 flex items-center">
                <Image src="/brand/logo_main.svg" alt="Consultico" width={140} height={28} className="block h-7 w-auto" priority />
              </div>
              <div className="flex-1 flex items-center justify-center">
                <SocialIcons className="!space-x-2 md:space-x-6 [&>a>span]:!w-6 [&>a>span]:!h-6 md:[&>a>span]:w-12 md:[&>a>span]:h-12" />
              </div>
              <div className="shrink-0 flex items-center gap-2">
                <ThemeToggle className="w-9 h-9" />
                <button
                  aria-label={open ? 'Close menu' : 'Open menu'}
                  onClick={() => setOpen((v) => !v)}
                  className="w-10 h-10 rounded-full border border-brand-blue text-brand-blue grid place-items-center"
                >
                  <div className="relative w-5 h-5">
                    <span className={`absolute left-0 right-0 h-[2px] bg-current transition-transform ${open ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-1'} `} />
                    <span className={`absolute left-0 right-0 h-[2px] bg-current transition-opacity ${open ? 'opacity-0' : 'top-1/2 -translate-y-1/2 opacity-100'}`} />
                    <span className={`absolute left-0 right-0 h-[2px] bg-current transition-transform ${open ? 'bottom-1/2 translate-y-1/2 -rotate-45' : 'bottom-1'}`} />
                  </div>
                </button>
              </div>
              </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
            <motion.div
              className="absolute top-3 right-3 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4"
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              <nav className="flex flex-col items-stretch min-w-[240px]">
                {[
                  { name: 'home', href: '#home' },
                  { name: 'services', href: '#services' },
                  { name: 'projects', href: '#projects' },
                  { name: 'about', href: '#about' },
                  { name: 'contact', href: '#contact' },
                ].map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setOpen(false);
                      const targetId = item.href.slice(1);
                      requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                          document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        });
                      });
                    }}
                    className="px-4 py-3 text-brand-blue font-futura text-lg rounded-lg"
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
