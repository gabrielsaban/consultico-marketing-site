'use client';

import Link from 'next/link';
import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { NEWSLETTER_CONSENT_TEXT } from '@/lib/newsletter-consent';
import { createFormSessionId, getFormSubmissionStartedAt } from '@/components/ContactForm';
import { identify, track } from '@/lib/analytics';
import { getAttribution } from '@/lib/attribution';

// ─────────────────────────────────────────────────────────────────────────────
// THE OFFER — a simple exchange, stated in one line.
//
// The NEWSLETTER is the product; the roadmap is the reason to join it. That
// ordering is deliberate (Paul, 2026-09-08) and it drives everything below:
// consent is required rather than optional, because subscribing IS the
// transaction, and the copy leads with the monthly email rather than burying it
// under a freebie.
//
// ⚠️ IT IS A STRATEGY EMAIL, NOT A SEARCH ONE (Paul, 2026-09-08). The first
// version said "what we're seeing in search", which was too narrow and pointed
// at the wrong thing: "We're focusing on strategy as we move forwards… we want
// to be your strategy team, your strategy marketing team." Search is one input,
// not the subject. Do not let this drift back to an SEO newsletter — the
// strategy cluster is the standing commercial focus and this copy is part of
// how the site says so.
//
// The three content types Paul named: what we're seeing, strategies, and news.
// ⚠️ "News from us" is deliberately GENERIC and must stay that way until told
// otherwise — there is embargoed company news that this list exists to carry,
// and nothing on the public site should telegraph it early.
//
// ⚠️ "Roadmap" must stay small. Think First is the paid product that maps
// channels, economics and growth — this is a short read of their business. If
// the free thing grows into the paid thing, it competes with it.
// ─────────────────────────────────────────────────────────────────────────────
const EYEBROW = 'Free roadmap when you join';
const HEADING = 'Hi, I’m Paul. I send an email or two a month.';
const BODY =
  'It’s mostly about strategy, because that’s where most of the difference gets made. What we’re trying at the moment, what’s working, what’s changed, and what we’re up to as a company. Join and I’ll send you a free roadmap for your business to start with.';
const BODY_SHORT =
  'An email or two a month from me. Mostly strategy: what we’re trying, what’s working, and what we’re up to. Join and I’ll send you a free roadmap for your business.';
const BUTTON_IDLE = 'Go on then';
const BUTTON_SENDING = 'Signing you up…';

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
 * `strip`  — the homepage band: eyebrow, heading, body, one row of fields.
 * `inline` — end of an article. Same card, shorter copy.
 * `footer` — on brand-blue, no card, inverted colours.
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
  const websiteId = `newsletter-website-${uid}`;
  const consentId = `newsletter-consent-${uid}`;
  const companyId = `newsletter-company-${uid}`;
  const headingId = `newsletter-heading-${uid}`;
  const statusId = `newsletter-status-${uid}`;

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
    track('newsletter_submit', { source, variant, gave_website: gaveWebsite });

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
      track('newsletter_signup', { source, variant, gave_website: gaveWebsite });
      identify(email.trim(), { source, signup_variant: variant, website: website.trim() });
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
          <h2 id={headingId} className={`mb-1.5 ${headingClass}`}>
            You&apos;re on the list. Check your inbox.
          </h2>
          <p className={bodyClass}>
            {gaveWebsite
              ? 'I’ll take a look at your site and send your roadmap over.'
              : 'Reply to the email I’ve just sent with your website address and I’ll get your roadmap over.'}
          </p>
        </div>
      ) : (
        <>
          {!onBlue && (
            <p className="mb-1.5 font-helvetica text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-brand-blue">
              {EYEBROW}
            </p>
          )}
          <h2 id={headingId} className={`mb-2 ${headingClass}`}>
            {onBlue ? 'An email or two a month, from me' : HEADING}
          </h2>
          <p className={`mb-5 max-w-2xl ${bodyClass}`}>
            {variant === 'strip' ? BODY : BODY_SHORT}
          </p>

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
              All three controls on one row on desktop, stacked on mobile.
              Keeping the button inline is most of what makes this read as a
              strip rather than a section. The footer stacks at every width
              because it lives in a narrow column.

              Website stays optional: it makes the roadmap deliverable and
              identifies the signup, but the list is the point and requiring it
              costs subscribers.
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
                className={`${fieldClass} ${onBlue ? '' : 'sm:flex-[1.1]'}`}
              />

              <label htmlFor={websiteId} className="sr-only">
                Your website (optional)
              </label>
              <input
                id={websiteId}
                type="text"
                inputMode="url"
                name="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="yourbusiness.com (optional)"
                autoComplete="url"
                className={`${fieldClass} ${onBlue ? '' : 'sm:flex-1'}`}
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
