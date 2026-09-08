'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { NEWSLETTER_CONSENT_TEXT } from '@/lib/newsletter-consent';
import { createFormSessionId, getFormSubmissionStartedAt } from '@/components/ContactForm';

// ─────────────────────────────────────────────────────────────────────────────
// THE OFFER — a simple exchange, stated in one line.
//
// The NEWSLETTER is the product; the roadmap is the reason to join it. That
// ordering is deliberate (Paul, 2026-09-08) and it drives everything below:
// consent is required rather than optional, because subscribing IS the
// transaction, and the copy leads with the monthly email rather than burying it
// under a freebie.
//
// Kept deliberately compact. Another band of similar weight is planned for this
// page, and two full-height pitch sections back to back would flatten both.
//
// ⚠️ "Roadmap" must stay small. Think First is the paid product that maps
// channels, economics and growth — this is a short read of their site. If the
// free thing grows into the paid thing, it competes with it.
// ─────────────────────────────────────────────────────────────────────────────
const EYEBROW = 'Free roadmap when you join';
const HEADING = 'What we’re actually seeing in search';
const BODY =
  'Our monthly email — real numbers from real accounts, not recycled industry stats. Join and we’ll send you a free roadmap for your site to start with.';
const BUTTON_IDLE = 'Sign me up';
const BUTTON_SENDING = 'Signing you up…';

const FIELD_CLASS =
  'w-full min-w-0 rounded-lg border border-gray-300 bg-white px-4 py-2.5 font-helvetica text-[0.95rem] text-gray-900 placeholder:text-gray-500 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:placeholder:text-gray-400';

interface NewsletterSignupProps {
  source?: string;
}

export default function NewsletterSignup({ source = 'homepage' }: NewsletterSignupProps) {
  const [sessionId] = useState(() => createFormSessionId());
  const [startedAt] = useState(() => getFormSubmissionStartedAt());
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [state, setState] = useState<'idle' | 'submitting' | 'success' | 'error' | 'needs-consent'>(
    'idle',
  );

  const gaveWebsite = website.trim().length > 0;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // The button stays enabled and explains the blocker rather than greying
    // out. A dead submit with no stated reason reads as "broken", not as "you
    // missed a step". The server rejects a request without consent regardless.
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
          website,
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
      id="newsletter"
      aria-labelledby="newsletter-heading"
      className="scroll-mt-24 bg-white py-8 dark:bg-[#0a0a0a] md:py-10"
    >
      <div className="px-4 sm:px-6 md:px-[5vw] lg:px-[7.5vw]">
        <div className="mx-auto max-w-4xl">
          {/*
            A slim bordered strip on white under the silk-backed MarketingIntro.
            The change of background is what separates it — globals.css reserves
            brand-navy for accents and says never to use it for full sections,
            and a coloured slab here would compete with the hero.
          */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-brand-silk/60 dark:border-gray-800 dark:bg-gray-900/60">
            <div className="h-[3px] w-full bg-brand-blue" aria-hidden="true" />

            <div className="p-5 md:p-6">
              {state === 'success' ? (
                // aria-live because the form is replaced rather than added to,
                // which is otherwise a silent change to a screen reader.
                <div aria-live="polite">
                  <h2
                    id="newsletter-heading"
                    className="mb-1.5 font-futura text-[clamp(1.15rem,1.6vw,1.4rem)] font-bold text-blue-primary"
                  >
                    You&apos;re on the list — check your inbox
                  </h2>
                  <p className="font-helvetica-light text-[0.95rem] leading-[1.55] text-gray-700 dark:text-gray-300">
                    {gaveWebsite
                      ? 'Paul will take a look at your site and send your roadmap over.'
                      : 'Reply to the email we’ve just sent with your website address and we’ll get your roadmap over.'}
                  </p>
                </div>
              ) : (
                <>
                  <p className="mb-1.5 font-helvetica text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-brand-blue">
                    {EYEBROW}
                  </p>
                  <h2
                    id="newsletter-heading"
                    className="mb-2 font-futura text-[clamp(1.15rem,1.7vw,1.5rem)] font-bold text-blue-primary"
                  >
                    {HEADING}
                  </h2>
                  <p className="mb-5 max-w-2xl font-helvetica-light text-[0.95rem] leading-[1.55] text-gray-700 dark:text-gray-300">
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

                    {/*
                      All three controls on one row on desktop, stacked on
                      mobile. Keeping the button inline is most of what makes
                      this read as a strip rather than a section.

                      Website stays optional: it makes the roadmap deliverable
                      and identifies the signup, but the list is the point and
                      requiring it costs subscribers.
                    */}
                    <div className="flex flex-col gap-2.5 sm:flex-row">
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
                        className={`${FIELD_CLASS} sm:flex-[1.1]`}
                      />

                      <label htmlFor="newsletter-website" className="sr-only">
                        Your website (optional)
                      </label>
                      <input
                        id="newsletter-website"
                        type="text"
                        inputMode="url"
                        name="website"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="yourbusiness.com (optional)"
                        autoComplete="url"
                        className={`${FIELD_CLASS} sm:flex-1`}
                      />

                      <button
                        type="submit"
                        disabled={state === 'submitting'}
                        className="rounded-lg bg-brand-blue px-6 py-2.5 font-helvetica text-[0.95rem] font-medium text-white transition-colors duration-200 hover:bg-[#006FE6] focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 active:bg-[#0067D6] disabled:cursor-not-allowed disabled:opacity-60 sm:shrink-0"
                      >
                        {state === 'submitting' ? BUTTON_SENDING : BUTTON_IDLE}
                      </button>
                    </div>

                    {/*
                      Required, unticked, and enforced server-side. Required
                      because subscribing IS the transaction here rather than an
                      optional add-on; unticked because the ICO is explicit that
                      pre-ticked boxes are not valid consent. See the note in
                      newsletter-consent.ts for what keeps the exchange fair.
                    */}
                    <div className="mt-3.5 flex items-start gap-2.5">
                      <input
                        id="newsletter-consent"
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => {
                          setConsent(e.target.checked);
                          if (e.target.checked && state === 'needs-consent') setState('idle');
                        }}
                        aria-describedby={state === 'needs-consent' ? 'newsletter-status' : undefined}
                        className="mt-0.5 h-[17px] w-[17px] shrink-0 cursor-pointer accent-[#007BFF] focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-1"
                      />
                      <label
                        htmlFor="newsletter-consent"
                        className="cursor-pointer font-helvetica-light text-[0.8rem] leading-[1.5] text-gray-700 dark:text-gray-300"
                      >
                        {NEWSLETTER_CONSENT_TEXT}{' '}
                        <Link href="/privacy" className="text-brand-blue underline-offset-2 hover:underline">
                          Privacy Policy
                        </Link>
                        .
                      </label>
                    </div>

                    <p id="newsletter-status" aria-live="polite" className="min-h-[1rem]">
                      {state === 'needs-consent' && (
                        <span className="mt-2.5 inline-block font-helvetica text-[0.825rem] text-red-700 dark:text-red-400">
                          Please tick the box so we know we can email you.
                        </span>
                      )}
                      {state === 'error' && (
                        <span className="mt-2.5 inline-block font-helvetica text-[0.825rem] text-red-700 dark:text-red-400">
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
