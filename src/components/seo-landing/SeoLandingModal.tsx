'use client';

import { useEffect, useId, useRef, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type SeoLandingModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
};

export default function SeoLandingModal({ open, onClose, title, children, footer }: SeoLandingModalProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    window.dispatchEvent(new CustomEvent('consultico:project-modal', { detail: { open: true } }));
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.dispatchEvent(new CustomEvent('consultico:project-modal', { detail: { open: false } }));
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/60 px-4 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative max-h-[min(90vh,40rem)] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900 md:p-8"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue dark:hover:bg-gray-800 dark:hover:text-white"
              aria-label="Close"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            <h2 id={titleId} className="pr-10 font-helvetica text-[1.35rem] font-bold tracking-[-0.03em] text-[#0556B3]">
              {title}
            </h2>
            <div className="mt-4 font-helvetica text-[1rem] leading-[1.55] text-[#212426] dark:text-gray-200">
              {children}
            </div>
            {footer ? <div className="mt-6">{footer}</div> : null}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
