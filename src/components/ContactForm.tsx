'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';

const INTEREST_LABELS: Record<string, string> = {
  seo: 'SEO',
  ppc: 'PPC',
  'think-first': 'Think First',
  'web-development': 'web development',
  'content-creation': 'content creation',
  'market-strategy': 'marketing strategy',
  'campaign-management': 'campaign management',
};

export const initialContactFormData = {
  name: '',
  business: '',
  email: '',
  phone: '',
  message: '',
  website: '',
};

export function createFormSessionId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
    const random = Math.floor(Math.random() * 16);
    const value = char === 'x' ? random : (random & 0x3) | 0x8;
    return value.toString(16);
  });
}

export function getFormSubmissionStartedAt() {
  return Date.now();
}

async function persistContactForm({
  sessionId,
  startedAt,
  status,
  data,
}: {
  sessionId: string;
  startedAt: number;
  status: 'draft' | 'submitted';
  data: typeof initialContactFormData;
}) {
  const response = await fetch('/api/contact-form', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId, startedAt, status, ...data }),
  });

  if (!response.ok) {
    const result = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new Error(result?.error ?? 'Contact form save failed');
  }
}

function hasDraftContent(data: typeof initialContactFormData) {
  return Object.entries(data)
    .filter(([key]) => key !== 'website')
    .some(([, value]) => value.trim().length >= 2);
}

interface ContactFormProps {
  idPrefix?: string;
  initialMessage?: string;
  className?: string;
  showResponseNote?: boolean;
}

export default function ContactForm({
  idPrefix = 'contact',
  initialMessage = '',
  className = '',
  showResponseNote = false,
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    ...initialContactFormData,
    message: initialMessage,
  });
  const [sessionId, setSessionId] = useState(() => createFormSessionId());
  const [startedAt, setStartedAt] = useState(() => getFormSubmissionStartedAt());
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const draftTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const submittedRef = useRef(false);
  const interestAppliedRef = useRef(false);

  useEffect(() => {
    if (interestAppliedRef.current || typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const interest = params.get('interest');
    if (!interest) return;

    const label = INTEREST_LABELS[interest] ?? interest.replace(/-/g, ' ');
    interestAppliedRef.current = true;
    setFormData((prev) => ({
      ...prev,
      message: prev.message.trim()
        ? prev.message
        : `I'm interested in ${label}.\n\n`,
    }));
  }, []);

  useEffect(() => {
    if (submittedRef.current || !hasDraftContent(formData)) return;

    if (draftTimerRef.current) clearTimeout(draftTimerRef.current);

    draftTimerRef.current = setTimeout(() => {
      persistContactForm({
        sessionId,
        startedAt,
        status: 'draft',
        data: formData,
      }).catch((error: unknown) => {
        console.error('Contact draft save failed:', error);
      });
    }, 900);

    return () => {
      if (draftTimerRef.current) clearTimeout(draftTimerRef.current);
    };
  }, [formData, sessionId, startedAt]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitState('submitting');

    try {
      if (draftTimerRef.current) clearTimeout(draftTimerRef.current);

      await persistContactForm({
        sessionId,
        startedAt,
        status: 'submitted',
        data: formData,
      });

      submittedRef.current = true;
      setSubmitState('success');
      setFormData({ ...initialContactFormData, message: initialMessage });
      setSessionId(createFormSessionId());
      setStartedAt(getFormSubmissionStartedAt());
    } catch (error) {
      console.error('Contact submit failed:', error);
      setSubmitState('error');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    submittedRef.current = false;
    setSubmitState('idle');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fieldId = (name: string) => `${idPrefix}-${name}`;

  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:border-gray-700 dark:bg-gray-900 md:p-8 ${className}`}
    >
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-5">
        <div className="hidden" aria-hidden="true">
          <label htmlFor={fieldId('website')}>Website</label>
          <input
            type="text"
            id={fieldId('website')}
            name="website"
            value={formData.website}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor={fieldId('name')} className="mb-2 block font-helvetica text-[0.9rem] font-medium text-gray-700 dark:text-gray-300">
              Your name
            </label>
            <input
              type="text"
              id={fieldId('name')}
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 font-helvetica text-gray-900 transition-all focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
            />
          </div>
          <div>
            <label htmlFor={fieldId('business')} className="mb-2 block font-helvetica text-[0.9rem] font-medium text-gray-700 dark:text-gray-300">
              Business name
            </label>
            <input
              type="text"
              id={fieldId('business')}
              name="business"
              value={formData.business}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 font-helvetica text-gray-900 transition-all focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor={fieldId('email')} className="mb-2 block font-helvetica text-[0.9rem] font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              id={fieldId('email')}
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 font-helvetica text-gray-900 transition-all focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
            />
          </div>
          <div>
            <label htmlFor={fieldId('phone')} className="mb-2 block font-helvetica text-[0.9rem] font-medium text-gray-700 dark:text-gray-300">
              Phone
            </label>
            <input
              type="tel"
              id={fieldId('phone')}
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 font-helvetica text-gray-900 transition-all focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
            />
          </div>
        </div>

        <div>
          <label htmlFor={fieldId('message')} className="mb-2 block font-helvetica text-[0.9rem] font-medium text-gray-700 dark:text-gray-300">
            Message
          </label>
          <textarea
            id={fieldId('message')}
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 font-helvetica text-gray-900 transition-all focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
          />
        </div>

        {submitState === 'error' && (
          <p className="font-helvetica text-[0.875rem] text-red-600 dark:text-red-400">
            Something went wrong. Please try again or email us directly.
          </p>
        )}

        <motion.button
          type="submit"
          disabled={submitState === 'submitting' || submitState === 'success'}
          className="w-full rounded-lg bg-brand-blue px-8 py-3 font-helvetica text-[clamp(1rem,1.15vw,1.1rem)] font-medium text-white transition-colors hover:bg-[#006FE6] focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          whileHover={{ scale: submitState === 'idle' ? 1.02 : 1 }}
          whileTap={{ scale: submitState === 'idle' ? 0.98 : 1 }}
        >
          {submitState === 'success' ? 'Message sent' : submitState === 'submitting' ? 'Sending...' : 'Send message'}
        </motion.button>

        {showResponseNote && (
          <p className="text-center font-helvetica-light text-[0.85rem] text-gray-500 dark:text-gray-400">
            We typically reply within two business days.
          </p>
        )}
      </form>
    </div>
  );
}
