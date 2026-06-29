'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import {
  AUDIT_SIGNUP_CONSENT_TEXT,
} from '@/lib/audit-signup-consent';
import { createFormSessionId, getFormSubmissionStartedAt } from '@/components/ContactForm';

interface AuditSignupBlockProps {
  source?: string;
  variant?: 'section' | 'compact';
}

export default function AuditSignupBlock({ source = 'contact-page', variant = 'section' }: AuditSignupBlockProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [sessionId] = useState(() => createFormSessionId());
  const [startedAt] = useState(() => getFormSubmissionStartedAt());
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [step2State, setStep2State] = useState<'idle' | 'submitting' | 'success' | 'skipped'>('idle');

  const handleStep1 = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitState('submitting');

    try {
      const response = await fetch('/api/audit-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          step: 1,
          sessionId,
          startedAt,
          email,
          source,
          company: honeypot,
        }),
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      setSubmitState('success');
      setStep(2);
    } catch (error) {
      console.error('Audit signup step 1 failed:', error);
      setSubmitState('error');
    }
  };

  const handleStep2 = async (e: FormEvent) => {
    e.preventDefault();
    setStep2State('submitting');

    try {
      const response = await fetch('/api/audit-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          step: 2,
          sessionId,
          email,
          website,
        }),
      });

      if (!response.ok) {
        throw new Error('Website submit failed');
      }

      setStep2State('success');
    } catch (error) {
      console.error('Audit signup step 2 failed:', error);
      setStep2State('idle');
    }
  };

  const isSection = variant === 'section';

  return (
    <div
      className={
        isSection
          ? 'rounded-2xl border border-gray-200 bg-white/90 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:border-gray-800 dark:bg-gray-900/90 md:p-8'
          : 'rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900'
      }
    >
      {step === 1 ? (
        <>
          <p className="mb-2 font-helvetica text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-brand-blue">
            Free SEO audit
          </p>
          <h2 className="font-futura text-[clamp(1.35rem,2vw,1.75rem)] font-bold text-brand-blue">
            Get a customised audit of your site
          </h2>
          <p className="mt-2 font-helvetica-light text-[clamp(0.95rem,1.1vw,1.05rem)] text-gray-700 dark:text-gray-300">
            Leave your email. We&apos;ll be in touch.
          </p>

          <form onSubmit={handleStep1} className="mt-6 space-y-4">
            <div className="hidden" aria-hidden="true">
              <label htmlFor="audit-company">Company</label>
              <input
                id="audit-company"
                name="company"
                type="text"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className={isSection ? 'flex flex-col gap-3 sm:flex-row' : 'space-y-3'}>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                className="min-w-0 flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 font-helvetica text-gray-900 focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
              />
              <button
                type="submit"
                disabled={submitState === 'submitting' || submitState === 'success'}
                className="rounded-lg bg-brand-blue px-6 py-3 font-helvetica font-medium text-white transition-colors hover:bg-[#006FE6] disabled:cursor-not-allowed disabled:opacity-60 sm:shrink-0"
              >
                {submitState === 'submitting' ? 'Sending...' : 'Get my audit'}
              </button>
            </div>

            {submitState === 'error' && (
              <p className="font-helvetica text-[0.875rem] text-red-600">Something went wrong. Please try again.</p>
            )}

            <p className="font-helvetica-light text-[0.78rem] leading-[1.55] text-gray-600 dark:text-gray-400">
              {AUDIT_SIGNUP_CONSENT_TEXT}{' '}
              <Link href="/privacy" className="text-brand-blue hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </form>
        </>
      ) : (
        <div>
          <p className="mb-2 font-helvetica text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-brand-blue">
            Step 2
          </p>
          <h2 className="font-futura text-[clamp(1.2rem,1.8vw,1.5rem)] font-bold text-brand-blue">
            Want your audit faster?
          </h2>
          <p className="mt-2 font-helvetica-light text-[0.95rem] text-gray-700 dark:text-gray-300">
            Add your website (optional).
          </p>

          {step2State === 'success' ? (
            <p className="mt-5 font-helvetica text-[0.95rem] text-gray-800 dark:text-gray-200">
              Thanks, we have your website. We&apos;ll be in touch with your audit.
            </p>
          ) : step2State === 'skipped' ? (
            <p className="mt-5 font-helvetica text-[0.95rem] text-gray-800 dark:text-gray-200">
              No problem. We&apos;ll email you to request your website.
            </p>
          ) : (
            <form onSubmit={handleStep2} className="mt-5 space-y-4">
              <input
                type="text"
                inputMode="url"
                name="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://yourbusiness.com"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 font-helvetica text-gray-900 focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
              />
              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  disabled={step2State === 'submitting' || !website.trim()}
                  className="rounded-lg bg-brand-blue px-6 py-2.5 font-helvetica font-medium text-white transition-colors hover:bg-[#006FE6] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {step2State === 'submitting' ? 'Sending...' : 'Submit website'}
                </button>
                <button
                  type="button"
                  onClick={() => setStep2State('skipped')}
                  className="font-helvetica text-[0.9rem] text-gray-600 underline-offset-2 hover:text-brand-blue hover:underline dark:text-gray-400"
                >
                  Skip for now
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
