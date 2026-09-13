'use client';

import Link from 'next/link';
import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { NEWSLETTER_CONSENT_TEXT } from '@/lib/newsletter-consent';
import { createFormSessionId, getFormSubmissionStartedAt } from '@/components/ContactForm';
import { identify, track } from '@/lib/analytics';
import { getAttribution } from '@/lib/attribution';

// ─────────────────────────────────────────────────────────────────────────────
// THE OFFER: one heading, one field, one tick, one button.
//
// Simplified on 2026-09-14 (Paul): "I want to make the email sign up as easy
// as possible." The previous version carried a frequency eyebrow, a body line,
// a roadmap line and an optional website field. The roadmap line and the
// website input were the thinking-harder moment (should I add my site, what
// do I get, is it the same as the free audit), so both are gone. The
// frequency line went with them: it did not add anything, and the footer
// variant had been running without it since 09-08 anyway.
//
// The NEWSLETTER is still the product, and consent is still required rather
// than optional because subscribing IS the transaction (Paul, 2026-09-08).
//
// ★ THE GIFT IS REAL, and it is the roadmap, delivered by reply. The welcome
// email (sent by hand from GoHighLevel, copy in the brand folder under
// emails/newsletter-welcome/) asks the subscriber to reply with their website
// and Paul sends back what he would look at first. It is deliberately unnamed
// here: "a little gift" is a small mystery, and naming it puts the thinking
// back. Do not promise anything on this strip that the welcome email does not
// then deliver.
//
// ⚠️ IT IS A STRATEGY EMAIL, NOT A SEARCH ONE (Paul, 2026-09-08). "We're
// focusing on strategy as we move forwards… we want to be your strategy team."
// Do not let the welcome email or any future body copy drift back to an SEO
// newsletter.
//
// ⚠️ There is embargoed company news that this list exists to carry, and
// nothing on the public site should telegraph it early.
//
// ⚠️ "Roadmap" must stay small. Think First is the paid product that maps
// channels, economics and growth; this is a short read of their business. If
// the free thing grows into the paid thing, it competes with it.
// ─────────────────────────────────────────────────────────────────────────────
// Paul's own wording. The emoji is decorative and hidden from assistive tech
// below so the accessible name of the section stays clean.
const HEADING = 'Sign up to our newsletter and get a little gift';
const HEADING_EMOJI = '🎁';
const BUTTON_IDLE = 'Go on then';
const BUTTON_SENDING = 'Signing you up…';
// Paul's wording. "We" because it is the company writing here; the welcome
// email that follows is signed by Paul in the first person, which is the
// register the voice guide sets for each.
const SUCCESS_HEADING = 'You’re on the list!';
const SUCCESS_BODY = 'We’ll send you an email very soon.';

const FIELD_BASE =
  'w-full min-w-0 rounded-lg px-4 py-2.5 font-helvetica text-[0.95rem] focus:outline-none focus:ring-2';
const FIELD_LIGHT =
  'border border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:border-brand-blue focus:ring-brand-blue dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:placeholder:text-gray-400';
// The footer sits on brand-blue, so its fields need white borders and a white
// focus ring. A blue focus ring on a blue ground is invisible, which is the
// same contrast failure PSI already flags elsewhere on this site.
const FIELD_ON_BLUE =
  'border border-white/40 bg-white/10 text-white placeholder:text-white/70 focus:border-white focus:ring-white';

/**
 * `strip`  is the homepage band: heading, then email and button on one row.
 * `inline` is the end of an article. Same card.
 * `footer` is on brand-blue, no card, inverted colours, fields stacked.
 */
type NewsletterVariant = 'strip' | 'inline' | 'footer';

interface NewsletterSignupProps {
  /**
   * Where this instance lives. Sent with every event, and it is the entire
   * point of putting the form in more than one place — without it we would know
   * how many people signed up but not from where, which is the question that
   * decides where the next one goes.
   */
  source?: string;
  variant?: NewsletterVariant;
}

export default function NewsletterSignup({
  source = 'homepage',
  variant = 'strip',
}: NewsletterSignupProps) {
  const onBlue = variant === 'footer';

  // ⚠️ Unique per instance, NOT hard-coded. The footer renders on every page, so
  // the homepage carries two of these at once — duplicate element ids would
  // silently break every label/input association on the page and point both
  // forms' labels at whichever input the browser found first.
  const uid = useId();
  const emailId = `newsletter-email-${uid}`;
  const consentId = `newsletter-consent-${uid}`;
  const companyId = `newsletter-company-${uid}`;
  const headingId = `newsletter-heading-${uid}`;
  const statusId = `newsletter-status-${uid}`;

  const [sessionId] = useState(() => createFormSessionId());
  const [startedAt] = useState(() => getFormSubmissionStartedAt());
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [state, setState] = useState<'idle' | 'submitting' | 'success' | 'error' | 'needs-consent'>(
    'idle',
  );

  // ── The denominator ──
  // Without this we would only ever see signups arriving and have no idea how
  // many people saw the form and passed, which makes a conversion rate
  // impossible to calculate and any forecast unfalsifiable. Firing on real
  // visibility rather than render also means the homepage strip is only counted
  // when someone scrolls to it — it sits below the fold and ~64% of homepage
  // sessions bounce, so render-time counting would flatter it badly.
  const sectionRef = useRef<HTMLElement | null>(null);
  const hasTrackedView = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !hasTrackedView.current) {
            hasTrackedView.current = true;
            track('newsletter_view', { source, variant });
            observer.disconnect();
          }
        }
      },
      // Half of it on screen, so a form clipped at the edge of the viewport
      // during a fast scroll past does not count as "seen".
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [source, variant]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // The button stays enabled and explains the blocker rather than greying
    // out. A dead submit with no stated reason reads as "broken", not as "you
    // missed a step". The server rejects a request without consent regardless.
    if (!consent) {
      setState('needs-consent');
      track('newsletter_consent_missing', { source, variant });
      return;
    }

    setState('submitting');
    track('newsletter_submit', { source, variant });

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
          attribution: getAttribution(),
        }),
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      setState('success');

      // THE key event. Mark this one as a key event in GA4 and "which channel
      // produces subscribers" becomes a report rather than a guess. `identify`
      // is PostHog only — GA4 must never receive an email address.
      track('newsletter_signup', { source, variant });
      identify(email.trim(), { source, signup_variant: variant });
    } catch (error) {
      console.error('Newsletter signup failed:', error);
      setState('error');
      track('newsletter_error', { source, variant });
    }
  };

  const fieldClass = `${FIELD_BASE} ${onBlue ? FIELD_ON_BLUE : FIELD_LIGHT}`;
  const headingClass = onBlue
    ? 'font-futura text-[clamp(1.125rem,1.3vw,1.25rem)] font-bold text-white'
    : 'font-futura text-[clamp(1.15rem,1.7vw,1.5rem)] font-bold text-blue-primary';
  const bodyClass = onBlue
    ? 'font-helvetica-light text-[0.875rem] leading-[1.55] text-gray-100'
    : 'font-helvetica-light text-[0.95rem] leading-[1.55] text-gray-700 dark:text-gray-300';
  const consentClass = onBlue
    ? 'cursor-pointer font-helvetica-light text-[0.75rem] leading-[1.5] text-gray-100'
    : 'cursor-pointer font-helvetica-light text-[0.8rem] leading-[1.5] text-gray-700 dark:text-gray-300';
  const errorClass = onBlue
    ? 'mt-2.5 inline-block font-helvetica text-[0.8rem] text-white'
    : 'mt-2.5 inline-block font-helvetica text-[0.825rem] text-red-700 dark:text-red-400';

  const body = (
    <>
      {state === 'success' ? (
        // aria-live because the form is replaced rather than added to, which is
        // otherwise a silent change to a screen reader.
        <div aria-live="polite">
          {/*
            The welcome email goes out of GoHighLevel by hand, so the promise is
            that one is coming, not that one has already landed. The gift is
            explained in that email, not here.
          */}
          <h2 id={headingId} className={`mb-1.5 ${headingClass}`}>
            {SUCCESS_HEADING}
          </h2>
          <p className={bodyClass}>{SUCCESS_BODY}</p>
        </div>
      ) : (
        <>
          {/*
            Heading only, no eyebrow and no body line (Paul, 2026-09-14). The
            heading states the whole exchange, so the form follows it directly.
          */}
          <h2 id={headingId} className={`mb-4 ${headingClass}`}>
            {HEADING}
            <span aria-hidden="true"> {HEADING_EMOJI}</span>
          </h2>

          <form onSubmit={handleSubmit} noValidate>
            {/* Honeypot. Hidden from people, visible to naive bots. */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor={companyId}>Company</label>
              <input
                id={companyId}
                name="company"
                type="text"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/*
              Email and button on one row on desktop, stacked on mobile.
              Keeping the button inline is most of what makes this read as a
              strip rather than a section. The footer stacks at every width
              because it lives in a narrow column.

              One field only. The website input was removed on 2026-09-14: the
              gift (a roadmap) is now asked for by reply in the welcome email,
              so the page asks for nothing but an address.
            */}
            <div className={onBlue ? 'flex flex-col gap-2.5' : 'flex flex-col gap-2.5 sm:flex-row'}>
              <label htmlFor={emailId} className="sr-only">
                Your email address
              </label>
              <input
                id={emailId}
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                autoComplete="email"
                className={`${fieldClass} ${onBlue ? '' : 'sm:max-w-md sm:flex-1'}`}
              />

              <button
                type="submit"
                disabled={state === 'submitting'}
                className={
                  onBlue
                    ? 'rounded-lg bg-white px-6 py-2.5 font-helvetica text-[0.95rem] font-medium text-brand-blue transition-opacity duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white disabled:cursor-not-allowed disabled:opacity-60'
                    : 'rounded-lg bg-brand-blue px-6 py-2.5 font-helvetica text-[0.95rem] font-medium text-white transition-colors duration-200 hover:bg-[#006FE6] focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 active:bg-[#0067D6] disabled:cursor-not-allowed disabled:opacity-60 sm:shrink-0'
                }
              >
                {state === 'submitting' ? BUTTON_SENDING : BUTTON_IDLE}
              </button>
            </div>

            {/*
              Required, unticked, and enforced server-side. Required because
              subscribing IS the transaction here rather than an optional
              add-on; unticked because the ICO is explicit that pre-ticked boxes
              are not valid consent. See newsletter-consent.ts for what keeps
              the exchange fair.
            */}
            <div className="mt-3.5 flex items-start gap-2.5">
              <input
                id={consentId}
                type="checkbox"
                checked={consent}
                onChange={(e) => {
                  setConsent(e.target.checked);
                  if (e.target.checked && state === 'needs-consent') setState('idle');
                }}
                aria-describedby={state === 'needs-consent' ? statusId : undefined}
                className={`mt-0.5 h-[17px] w-[17px] shrink-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                  onBlue ? 'accent-white focus:ring-white' : 'accent-[#007BFF] focus:ring-brand-blue'
                }`}
              />
              <label htmlFor={consentId} className={consentClass}>
                {NEWSLETTER_CONSENT_TEXT}{' '}
                <Link
                  href="/privacy"
                  className={
                    onBlue
                      ? 'underline underline-offset-2 hover:opacity-80'
                      : 'text-brand-blue underline-offset-2 hover:underline'
                  }
                >
                  Privacy Policy
                </Link>
                .
              </label>
            </div>

            <p id={statusId} aria-live="polite" className="min-h-[1rem]">
              {state === 'needs-consent' && (
                <span className={errorClass}>Please tick the box so we know we can email you.</span>
              )}
              {state === 'error' && (
                <span className={errorClass}>
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
    </>
  );

  // The footer supplies its own column and background, so this variant returns
  // the bare form rather than a section wrapper.
  if (onBlue) {
    return (
      <section ref={sectionRef} aria-labelledby={headingId} className="w-full">
        {body}
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      // Only the homepage strip claims the #newsletter anchor. The footer and
      // article copies must not, or the id stops being unique the moment two
      // appear on one page.
      id={variant === 'strip' ? 'newsletter' : undefined}
      aria-labelledby={headingId}
      className={
        variant === 'strip'
          ? 'scroll-mt-24 bg-white py-8 dark:bg-[#0a0a0a] md:py-10'
          : 'py-6 md:py-8'
      }
    >
      <div
        className={
          variant === 'strip' ? 'px-4 sm:px-6 md:px-[5vw] lg:px-[7.5vw]' : ''
        }
      >
        <div className="mx-auto max-w-4xl">
          {/*
            A slim bordered strip. On the homepage the change from the
            silk-backed MarketingIntro above is what separates it — globals.css
            reserves brand-navy for accents and says never to use it for full
            sections, and a coloured slab would compete with the hero.
          */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-brand-silk/60 dark:border-gray-800 dark:bg-gray-900/60">
            <div className="h-[3px] w-full bg-brand-blue" aria-hidden="true" />
            <div className="p-5 md:p-6">{body}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
