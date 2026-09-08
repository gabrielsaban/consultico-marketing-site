'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { ROADMAP_SIGNUP_CONSENT_TEXT } from '@/lib/roadmap-signup-consent';
import { createFormSessionId, getFormSubmissionStartedAt } from '@/components/ContactForm';

// ─────────────────────────────────────────────────────────────────────────────
// THE OFFER. The only part of this file worth arguing about.
//
// A generic "subscribe to our newsletter" converts under 2% of visitors; a
// specific named deliverable runs several times that. So the thing being
// offered is a roadmap, and the monthly email comes with it — stated up front
// rather than buried, which is both what makes the consent valid and what stops
// the first email feeling like a bait-and-switch.
//
// ⚠️ Keep the promise deliverable. "Roadmap" must not quietly become "the thing
// we charge £5,000 for" — Think First maps channels, economics and growth over
// 30 days, and this is a short read of their site with a first, second and
// third move. The wording below is careful about that on purpose; if it drifts
// into promising strategy, the free version starts competing with the paid one.
// ─────────────────────────────────────────────────────────────────────────────
const EYEBROW = 'Free · no call required';
const HEADING = 'Get a free roadmap for where you are now';
const BODY =
  'Tell us your website and we’ll send back a short roadmap — what we’d fix first, what we’d leave alone, and what it would take to move. Built from the same audit we run for clients, not a template.';
const SUB_NOTE =
  'You’ll also get our monthly email on what our own data is telling us about search.';
const BUTTON_IDLE = 'Send my roadmap';
const BUTTON_SENDING = 'Sending…';

interface RoadmapSignupProps {
  source?: string;
}

export default function RoadmapSignup({ source = 'homepage' }: RoadmapSignupProps) {
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

    // The button stays enabled and we explain the blocker rather than greying
    // it out. A disabled submit with no stated reason reads as "broken", not as
    // "you missed a step", and loses people who were willing. The server still
    // rejects a request without consent, so nothing is loosened here.
    if (!consent) {
      setState('needs-consent');
      return;
    }

    setState('submitting');

    try {
      const response = await fetch('/api/roadmap-signup', {
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
      console.error('Roadmap signup failed:', error);
      setState('error');
    }
  };

  return (
    <section
      id="roadmap-signup"
      aria-labelledby="roadmap-signup-heading"
      className="scroll-mt-24 bg-white py-12 dark:bg-[#0a0a0a] md:py-16 lg:py-20"
    >
      <div className="px-4 sm:px-6 md:px-[5vw] lg:px-[7.5vw]">
        <div className="mx-auto max-w-4xl">
          {/*
            A bordered card on white, sitting directly under the silk-backed
            MarketingIntro. The change of background is what makes this read as
            its own thing without a coloured slab — globals.css reserves
            brand-navy for accents and says never to use it for full sections,
            and a full brand-blue band here would compete with the hero, which
            is the page's one real focal point.
          */}
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-brand-silk/60 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:border-gray-800 dark:bg-gray-900/60">
            <div className="h-1 w-full bg-brand-blue" aria-hidden="true" />

            <div className="p-6 md:p-8 lg:p-10">
              {state === 'success' ? (
                // aria-live because the form is replaced rather than added to,
                // which is otherwise a silent change to a screen reader.
                <div aria-live="polite">
                  <p className="mb-3 font-helvetica text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-brand-blue">
                    You&apos;re in
                  </p>
                  <h2
                    id="roadmap-signup-heading"
                    className="mb-4 font-futura text-[clamp(1.5rem,2.5vw,2.5rem)] font-bold text-blue-primary"
                  >
                    Thanks — check your inbox
                  </h2>
                  <p className="font-helvetica-light text-[clamp(1rem,1.4vw,1.25rem)] leading-[1.6] text-gray-800 dark:text-gray-200">
                    {gaveWebsite
                      ? 'We’ve got your site. Paul will take a look and send your roadmap.'
                      : 'One thing left — reply to the email we’ve just sent with your website address, and Paul will get started.'}
                  </p>
                </div>
              ) : (
                <>
                  <p className="mb-3 font-helvetica text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-brand-blue">
                    {EYEBROW}
                  </p>
                  <h2
                    id="roadmap-signup-heading"
                    className="mb-5 font-futura text-[clamp(1.5rem,2.5vw,2.5rem)] font-bold text-blue-primary"
                  >
                    {HEADING}
                  </h2>
                  <p className="mb-3 max-w-2xl font-helvetica-light text-[clamp(1rem,1.4vw,1.25rem)] leading-[1.6] text-gray-800 dark:text-gray-200">
                    {BODY}
                  </p>
                  <p className="mb-8 max-w-2xl font-helvetica-light text-[clamp(0.9rem,1.05vw,1rem)] leading-[1.55] text-gray-700 dark:text-gray-300">
                    {SUB_NOTE}
                  </p>

                  <form onSubmit={handleSubmit} noValidate>
                    {/* Honeypot. Hidden from people, visible to naive bots. */}
                    <div className="hidden" aria-hidden="true">
                      <label htmlFor="roadmap-company">Company</label>
                      <input
                        id="roadmap-company"
                        name="company"
                        type="text"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    {/*
                      Both fields in one step rather than the audit block's
                      email-then-website flow. Two visible fields is a smaller
                      ask than a second screen, and the website is the thing
                      that makes the offer deliverable — but it stays OPTIONAL,
                      because requiring it would cost signups at the exact
                      moment someone has decided to act. If it's missing we ask
                      in the reply.
                    */}
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <div className="flex-1">
                        <label htmlFor="roadmap-email" className="sr-only">
                          Your email address
                        </label>
                        <input
                          id="roadmap-email"
                          type="email"
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@company.com"
                          required
                          autoComplete="email"
                          className="w-full min-w-0 rounded-lg border border-gray-300 bg-white px-4 py-3 font-helvetica text-[clamp(1rem,1.15vw,1.08rem)] text-gray-900 placeholder:text-gray-500 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:placeholder:text-gray-400"
                        />
                      </div>
                      <div className="flex-1">
                        <label htmlFor="roadmap-website" className="sr-only">
                          Your website (optional)
                        </label>
                        <input
                          id="roadmap-website"
                          type="text"
                          inputMode="url"
                          name="website"
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                          placeholder="yourbusiness.com (optional)"
                          autoComplete="url"
                          className="w-full min-w-0 rounded-lg border border-gray-300 bg-white px-4 py-3 font-helvetica text-[clamp(1rem,1.15vw,1.08rem)] text-gray-900 placeholder:text-gray-500 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:placeholder:text-gray-400"
                        />
                      </div>
                    </div>

                    <div className="mt-3">
                      <button
                        type="submit"
                        disabled={state === 'submitting'}
                        className="w-full rounded-lg bg-brand-blue px-8 py-3 font-helvetica text-[clamp(1rem,1.15vw,1.08rem)] font-medium text-white transition-colors duration-200 hover:bg-[#006FE6] focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 active:bg-[#0067D6] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                      >
                        {state === 'submitting' ? BUTTON_SENDING : BUTTON_IDLE}
                      </button>
                    </div>

                    {/*
                      Unticked by design, and enforced on the server too. The
                      ICO is explicit that pre-ticked boxes are not valid
                      consent. One box covers the roadmap and the monthly email
                      because the offer above names both — see the note in
                      roadmap-signup-consent.ts for why that is specific and
                      informed rather than bundled.
                    */}
                    <div className="mt-5 flex items-start gap-3">
                      <input
                        id="roadmap-consent"
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => {
                          setConsent(e.target.checked);
                          if (e.target.checked && state === 'needs-consent') setState('idle');
                        }}
                        aria-describedby={state === 'needs-consent' ? 'roadmap-status' : undefined}
                        className="mt-1 h-[18px] w-[18px] shrink-0 cursor-pointer accent-[#007BFF] focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-1"
                      />
                      <label
                        htmlFor="roadmap-consent"
                        className="cursor-pointer font-helvetica-light text-[0.85rem] leading-[1.55] text-gray-700 dark:text-gray-300"
                      >
                        {ROADMAP_SIGNUP_CONSENT_TEXT}{' '}
                        <Link href="/privacy" className="text-brand-blue underline-offset-2 hover:underline">
                          Privacy Policy
                        </Link>
                        .
                      </label>
                    </div>

                    <p id="roadmap-status" aria-live="polite" className="min-h-[1.25rem]">
                      {state === 'needs-consent' && (
                        <span className="mt-4 inline-block font-helvetica text-[0.875rem] text-red-700 dark:text-red-400">
                          Please tick the box above so we know we can email your roadmap over.
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
