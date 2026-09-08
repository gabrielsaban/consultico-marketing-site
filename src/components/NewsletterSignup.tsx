'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { NEWSLETTER_CONSENT_TEXT } from '@/lib/newsletter-consent';
import { createFormSessionId, getFormSubmissionStartedAt } from '@/components/ContactForm';

// ─────────────────────────────────────────────────────────────────────────────
// THE OFFER. This is the only part worth arguing about.
//
// The research is one-sided: a generic "subscribe to our newsletter" converts
// under 2% of visitors, while a specific named deliverable runs 2-3x that. The
// wording below is the offer we can actually keep — our own first-party numbers
// from our own accounts — rather than a promise of curated industry news we
// would have to invent every month.
//
// Change it here and it changes everywhere. Keep the promise something we can
// still deliver on the twelfth month, not just the first.
// ─────────────────────────────────────────────────────────────────────────────
const EYEBROW = 'Monthly · free · no pitch';
const HEADING = 'What we’re actually seeing in search';
const BODY =
  'Once a month we send what our own data is telling us — the numbers behind AI answers, what’s still earning clicks, and what quietly stopped working. Real figures from real accounts, not recycled industry stats.';
const BUTTON_IDLE = 'Send it to me';
const BUTTON_SENDING = 'Signing you up…';

interface NewsletterSignupProps {
  source?: string;
}

export default function NewsletterSignup({ source = 'homepage' }: NewsletterSignupProps) {
  const [sessionId] = useState(() => createFormSessionId());
  const [startedAt] = useState(() => getFormSubmissionStartedAt());
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [state, setState] = useState<'idle' | 'submitting' | 'success' | 'error' | 'needs-consent'>(
    'idle',
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // The button stays enabled and we explain the blocker instead of greying
    // it out. A disabled submit with no stated reason is one of the reliable
    // ways to lose someone who was willing — they read it as "broken", not as
    // "you missed a step". The server still rejects a request without consent,
    // so nothing is being loosened here except the explanation.
    if (!consent) {
      setState('needs-consent');
      return;
    }

    setState('submitting');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          startedAt,
          email,
          source,
          consent,
          company: honeypot,
        }),
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      setState('success');
    } catch (error) {
      console.error('Newsletter signup failed:', error);
      setState('error');
    }
  };

  return (
    <section
      id="email-signup"
      aria-labelledby="email-signup-heading"
      className="scroll-mt-24 bg-white py-12 dark:bg-[#0a0a0a] md:py-16 lg:py-20"
    >
      <div className="px-4 sm:px-6 md:px-[5vw] lg:px-[7.5vw]">
        <div className="mx-auto max-w-4xl">
          {/*
            A bordered card on white, sitting directly under the silk-backed
            MarketingIntro. The contrast between the two backgrounds is what
            makes this read as its own thing without needing a coloured slab —
            globals.css reserves brand-navy for accents and says never to use it
            for full sections, and a full brand-blue band here would compete
            with the hero, which is the page's one real focal point.
          */}
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-brand-silk/60 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:border-gray-800 dark:bg-gray-900/60">
            <div className="h-1 w-full bg-brand-blue" aria-hidden="true" />

            <div className="p-6 md:p-8 lg:p-10">
              {state === 'success' ? (
                // aria-live so a screen reader is told the form succeeded — the
                // form is replaced rather than supplemented, which is otherwise
                // a silent change.
                <div aria-live="polite">
                  <p className="mb-3 font-helvetica text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-brand-blue">
                    You&apos;re in
                  </p>
                  <h2
                    id="email-signup-heading"
                    className="mb-4 font-futura text-[clamp(1.5rem,2.5vw,2.5rem)] font-bold text-blue-primary"
                  >
                    Thanks — check your inbox
                  </h2>
                  <p className="font-helvetica-light text-[clamp(1rem,1.4vw,1.25rem)] leading-[1.6] text-gray-800 dark:text-gray-200">
                    We&apos;ve sent a confirmation. The first email will land at the start of next month, and
                    there&apos;s an unsubscribe link in every one.
                  </p>
                </div>
              ) : (
                <>
                  <p className="mb-3 font-helvetica text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-brand-blue">
                    {EYEBROW}
                  </p>
                  <h2
                    id="email-signup-heading"
                    className="mb-5 font-futura text-[clamp(1.5rem,2.5vw,2.5rem)] font-bold text-blue-primary"
                  >
                    {HEADING}
                  </h2>
                  <p className="mb-8 max-w-2xl font-helvetica-light text-[clamp(1rem,1.4vw,1.25rem)] leading-[1.6] text-gray-800 dark:text-gray-200">
                    {BODY}
                  </p>

                  <form onSubmit={handleSubmit} noValidate>
                    {/* Honeypot. Hidden from people, visible to naive bots. */}
                    <div className="hidden" aria-hidden="true">
                      <label htmlFor="newsletter-company">Company</label>
                      <input
                        id="newsletter-company"
                        name="company"
                        type="text"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                      <label htmlFor="newsletter-email" className="sr-only">
                        Your email address
                      </label>
                      <input
                        id="newsletter-email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        required
                        autoComplete="email"
                        className="min-w-0 flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 font-helvetica text-[clamp(1rem,1.15vw,1.08rem)] text-gray-900 placeholder:text-gray-500 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:placeholder:text-gray-400"
                      />
                      <button
                        type="submit"
                        disabled={state === 'submitting'}
                        className="rounded-lg bg-brand-blue px-8 py-3 font-helvetica text-[clamp(1rem,1.15vw,1.08rem)] font-medium text-white transition-colors duration-200 hover:bg-[#006FE6] focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 active:bg-[#0067D6] disabled:cursor-not-allowed disabled:opacity-60 sm:shrink-0"
                      >
                        {state === 'submitting' ? BUTTON_SENDING : BUTTON_IDLE}
                      </button>
                    </div>

                    {/*
                      Unticked by design and enforced on the server too. The ICO
                      is explicit that pre-ticked boxes are not valid consent,
                      and that separate purposes need separate, granular
                      permission — so this is its own box with its own wording
                      rather than a line folded into the audit consent.
                    */}
                    <div className="mt-5 flex items-start gap-3">
                      <input
                        id="newsletter-consent"
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => {
                          setConsent(e.target.checked);
                          if (e.target.checked && state === 'needs-consent') setState('idle');
                        }}
                        aria-describedby={state === 'needs-consent' ? 'newsletter-status' : undefined}
                        className="mt-1 h-[18px] w-[18px] shrink-0 cursor-pointer accent-[#007BFF] focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-1"
                      />
                      <label
                        htmlFor="newsletter-consent"
                        className="cursor-pointer font-helvetica-light text-[0.85rem] leading-[1.55] text-gray-700 dark:text-gray-300"
                      >
                        {NEWSLETTER_CONSENT_TEXT}{' '}
                        <Link href="/privacy" className="text-brand-blue underline-offset-2 hover:underline">
                          Privacy Policy
                        </Link>
                        .
                      </label>
                    </div>

                    <p id="newsletter-status" aria-live="polite" className="min-h-[1.25rem]">
                      {state === 'needs-consent' && (
                        <span className="mt-4 inline-block font-helvetica text-[0.875rem] text-red-700 dark:text-red-400">
                          Please tick the box above so we know we can email you.
                        </span>
                      )}
                      {state === 'error' && (
                        <span className="mt-4 inline-block font-helvetica text-[0.875rem] text-red-700 dark:text-red-400">
                          Something went wrong. Please try again, or email{' '}
                          <a href="mailto:paul@consultico.co.uk" className="underline">
                            paul@consultico.co.uk
                          </a>
                          .
                        </span>
                      )}
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
