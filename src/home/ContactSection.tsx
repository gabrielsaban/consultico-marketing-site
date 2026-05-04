'use client';

import Container from '@/components/Container';
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

const mapShellClassName =
  'w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 shadow-[0_2px_12px_rgba(0,0,0,0.08)]';

const ContactMap = dynamic(() => import('@/components/ContactMap'), {
  ssr: false,
  loading: () => <div className={`${mapShellClassName} bg-white/70 dark:bg-gray-900/70`} aria-hidden="true" />,
});

const initialContactFormData = {
  name: '',
  business: '',
  email: '',
  phone: '',
  message: '',
};

function createSessionId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
    const random = Math.floor(Math.random() * 16);
    const value = char === 'x' ? random : (random & 0x3) | 0x8;
    return value.toString(16);
  });
}

async function persistContactForm({
  sessionId,
  status,
  data,
}: {
  sessionId: string;
  status: 'draft' | 'submitted';
  data: typeof initialContactFormData;
}) {
  const response = await fetch('/api/contact-form', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sessionId,
      status,
      ...data,
    }),
  });

  if (!response.ok) {
    const result = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new Error(result?.error ?? 'Contact form save failed');
  }
}

function hasDraftContent(data: typeof initialContactFormData) {
  return Object.values(data).some((value) => value.trim().length >= 2);
}

function LazyContactMap() {
  const [shouldRender, setShouldRender] = useState(false);
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const target = mountRef.current;
    if (!target || shouldRender) return;

    if (!('IntersectionObserver' in window)) {
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: '600px 0px' },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [shouldRender]);

  return (
    <div ref={mountRef}>
      {shouldRender ? (
        <ContactMap />
      ) : (
        <div className={`${mapShellClassName} bg-white/70 dark:bg-gray-900/70`} aria-hidden="true" />
      )}
    </div>
  );
}

export default function ContactSection() {
  const [formData, setFormData] = useState(initialContactFormData);
  const [contactSessionId, setContactSessionId] = useState(() => createSessionId());
  const [contactSubmitState, setContactSubmitState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const draftTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const submittedRef = useRef(false);

  useEffect(() => {
    if (submittedRef.current || !hasDraftContent(formData)) return;

    if (draftTimerRef.current) {
      clearTimeout(draftTimerRef.current);
    }

    draftTimerRef.current = setTimeout(() => {
      persistContactForm({
        sessionId: contactSessionId,
        status: 'draft',
        data: formData,
      }).catch((error: unknown) => {
        console.error('Contact draft save failed:', error);
      });
    }, 900);

    return () => {
      if (draftTimerRef.current) {
        clearTimeout(draftTimerRef.current);
      }
    };
  }, [contactSessionId, formData]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setContactSubmitState('submitting');

    try {
      if (draftTimerRef.current) {
        clearTimeout(draftTimerRef.current);
      }

      await persistContactForm({
        sessionId: contactSessionId,
        status: 'submitted',
        data: formData,
      });

      submittedRef.current = true;
      setContactSubmitState('success');
      setFormData(initialContactFormData);
      setContactSessionId(createSessionId());
    } catch (error) {
      console.error('Contact submit failed:', error);
      setContactSubmitState('error');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    submittedRef.current = false;
    setContactSubmitState('idle');
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="bg-gray-50 dark:bg-gray-950 shadow-[0_4px_20px_rgba(0,0,0,0.1)] py-16 md:py-20 lg:py-24 scroll-mt-24">
      <Container>
        {/* Contact Info - Center Aligned with Spacing */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12 lg:gap-24 mb-12 md:mb-16">
          <a
            href="mailto:paul@consultico.co.uk"
            className="flex items-center gap-3 text-[clamp(0.95rem,1.1vw,1.125rem)] font-helvetica text-gray-700 dark:text-gray-300 hover:text-brand-blue transition-colors"
          >
            <svg
              className="w-5 h-5 flex-shrink-0 text-brand-blue"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <path d="M22 6l-10 7L2 6" />
            </svg>
            paul@consultico.co.uk
          </a>
          
          {/* Decorative Dots */}
          <div className="hidden md:flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
            <div className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
            <div className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
          </div>
          
          <a
            href="tel:01414291351"
            className="flex items-center gap-3 text-[clamp(0.95rem,1.1vw,1.125rem)] font-helvetica text-gray-700 dark:text-gray-300 hover:text-brand-blue transition-colors"
          >
            <svg
              className="w-5 h-5 flex-shrink-0 text-brand-blue"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
            </svg>
            0141 429 1351
          </a>
          
          {/* Decorative Dots */}
          <div className="hidden md:flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
            <div className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
            <div className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
          </div>
          
          <div className="flex items-center gap-3 text-[clamp(0.95rem,1.1vw,1.125rem)] font-helvetica text-gray-700 dark:text-gray-300">
            <svg
              className="w-5 h-5 flex-shrink-0 text-brand-blue"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Glasgow, Scotland
          </div>
        </div>

        {/* Booking CTA and Contact Form */}
        <div className="mx-auto mb-16 flex max-w-4xl flex-col gap-10 md:mb-20">
          {/* Booking CTA */}
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="flex w-full flex-col items-center justify-center px-2 py-4 sm:px-8">
              <h3 className="max-w-[22ch] text-[clamp(2.1rem,3vw,3.4rem)] font-bold leading-[1.02] text-brand-blue font-futura mb-5">
                Ready to think first?
              </h3>
              <p className="max-w-[36rem] text-[clamp(1rem,1.15vw,1.12rem)] leading-[1.6] text-gray-700 dark:text-gray-300 font-helvetica mb-8">
                Book a free discovery call and let&apos;s figure out exactly where your marketing should be going - and what it&apos;s going to take to get there.
              </p>

              <motion.a
                href="https://calendar.app.google/qpXRWnCiG3XKi8iG6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full max-w-[18rem] items-center justify-center rounded-lg bg-brand-blue px-8 py-3 font-helvetica text-[clamp(1rem,1.15vw,1.08rem)] font-medium text-white transition-colors duration-200 hover:bg-[#006FE6] active:bg-[#0067D6] focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.98 }}
              >
                Book a Call
              </motion.a>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-[clamp(1.5rem,2.3vw,2.4rem)] font-bold leading-[1.08] text-brand-blue font-futura mb-3">
              Got a question first?
            </h3>
            <p className="text-[clamp(1rem,1.15vw,1.12rem)] leading-[1.55] text-gray-700 dark:text-gray-300 font-helvetica">
              Fill in the form below and we&apos;ll get back to you.
            </p>
          </div>

          {/* Contact Form */}
          <div className="flex h-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6 md:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
            <form onSubmit={handleSubmit} className="flex min-h-full w-full flex-col gap-6">
              <div>
                <label htmlFor="name" className="flex items-center gap-2 text-[clamp(0.9rem,1vw,1rem)] font-helvetica font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <svg className="w-4 h-4 text-brand-blue" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
                  </svg>
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all duration-200 font-helvetica text-black dark:text-gray-100"
                />
              </div>

              <div>
                <label htmlFor="business" className="flex items-center gap-2 text-[clamp(0.9rem,1vw,1rem)] font-helvetica font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <svg className="w-4 h-4 text-brand-blue" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9zM9 22V12h6v10" />
                  </svg>
                  Business Name
                </label>
                <input
                  type="text"
                  id="business"
                  name="business"
                  value={formData.business}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all duration-200 font-helvetica text-black dark:text-gray-100"
                />
              </div>

              <div>
                <label htmlFor="email" className="flex items-center gap-2 text-[clamp(0.9rem,1vw,1rem)] font-helvetica font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <svg className="w-4 h-4 text-brand-blue" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all duration-200 font-helvetica text-black dark:text-gray-100"
                />
              </div>

              <div>
                <label htmlFor="phone" className="flex items-center gap-2 text-[clamp(0.9rem,1vw,1rem)] font-helvetica font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <svg className="w-4 h-4 text-brand-blue" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all duration-200 font-helvetica text-black dark:text-gray-100"
                />
              </div>

              <div className="flex min-h-[12rem] flex-1 flex-col">
                <label htmlFor="message" className="flex items-center gap-2 text-[clamp(0.9rem,1vw,1rem)] font-helvetica font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <svg className="w-4 h-4 text-brand-blue" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full flex-1 px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all duration-200 font-helvetica resize-none text-black dark:text-gray-100"
                />
              </div>

              <motion.button
                type="submit"
                disabled={contactSubmitState === 'submitting' || contactSubmitState === 'success'}
                className="mt-auto w-full bg-brand-blue text-white font-helvetica font-medium text-[clamp(1rem,1.2vw,1.125rem)] px-8 py-3 rounded-lg transition-colors duration-200 hover:bg-[#006FE6] active:bg-[#0067D6] focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.98 }}
                aria-label={contactSubmitState === 'success' ? 'Message sent' : 'Send message'}
              >
                <span className="inline-flex min-h-7 items-center justify-center gap-2">
                  {contactSubmitState === 'success' ? (
                    <motion.svg
                      className="h-7 w-7"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.4"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <motion.path
                        d="M20 6L9 17l-5-5"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 0.28, ease: 'easeOut' }}
                      />
                    </motion.svg>
                  ) : (
                    <>{contactSubmitState === 'submitting' ? 'Sending...' : 'Send message'}</>
                  )}
                </span>
              </motion.button>
            </form>
          </div>
        </div>

        <LazyContactMap />
      </Container>
    </section>
  );
}
