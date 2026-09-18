'use client';

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import Container from '@/components/Container';
import { CONSULTICO_WHATSAPP_URL } from '@/lib/contact';
import { SEO_LANDING_CONTACT } from '@/lib/seo-landing-content';
import { getAttribution } from '@/lib/attribution';
import {
  createFormSessionId,
  getFormSubmissionStartedAt,
  initialContactFormData,
} from '@/components/ContactForm';

type SeoLandingFormData = typeof initialContactFormData & {
  companyWebsite: string;
};

const initialSeoLandingFormData: SeoLandingFormData = {
  ...initialContactFormData,
  companyWebsite: '',
};

async function persistForm({
  sessionId,
  startedAt,
  status,
  data,
}: {
  sessionId: string;
  startedAt: number;
  status: 'draft' | 'submitted';
  data: SeoLandingFormData;
}) {
  const response = await fetch('/api/contact-form', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sessionId,
      startedAt,
      status,
      formId: 'seo-landing',
      name: data.name,
      business: data.business,
      email: data.email,
      phone: data.phone,
      message: data.message,
      // Honeypot — must stay empty. Real site URL uses companyWebsite.
      website: data.website,
      companyWebsite: data.companyWebsite,
      attribution: getAttribution(),
    }),
  });

  if (!response.ok) {
    const result = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new Error(result?.error ?? 'Contact form save failed');
  }
}

export default function SeoDiscoveryContact() {
  const [formData, setFormData] = useState(initialSeoLandingFormData);
  const [sessionId, setSessionId] = useState(() => createFormSessionId());
  const [startedAt, setStartedAt] = useState(() => getFormSubmissionStartedAt());
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const draftTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const submittedRef = useRef(false);

  useEffect(() => {
    const hasContent =
      formData.name.trim().length >= 2 ||
      formData.business.trim().length >= 2 ||
      formData.email.trim().length >= 2 ||
      formData.phone.trim().length >= 2 ||
      formData.companyWebsite.trim().length >= 2 ||
      formData.message.trim().length >= 2;
    if (submittedRef.current || !hasContent) return;

    if (draftTimerRef.current) clearTimeout(draftTimerRef.current);
    draftTimerRef.current = setTimeout(() => {
      persistForm({ sessionId, startedAt, status: 'draft', data: formData }).catch(() => undefined);
    }, 900);

    return () => {
      if (draftTimerRef.current) clearTimeout(draftTimerRef.current);
    };
  }, [formData, sessionId, startedAt]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    submittedRef.current = false;
    setSubmitState('idle');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitState('submitting');
    try {
      if (draftTimerRef.current) clearTimeout(draftTimerRef.current);
      await persistForm({ sessionId, startedAt, status: 'submitted', data: formData });
      submittedRef.current = true;
      setSubmitState('success');
      setFormData(initialSeoLandingFormData);
      setSessionId(createFormSessionId());
      setStartedAt(getFormSubmissionStartedAt());
    } catch {
      setSubmitState('error');
    }
  };

  const fieldClass =
    'h-12 w-full rounded-xl border border-gray-200 bg-white px-3.5 font-helvetica text-[1rem] text-[#212426] outline-none transition-colors placeholder:text-gray-400 focus:border-brand-blue dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100';

  return (
    <section id="get-in-touch" className="scroll-mt-28 bg-white py-14 dark:bg-gray-950 md:py-20" aria-labelledby="seo-landing-contact-heading">
      <Container>
        <div className="mx-auto max-w-[28.3rem]">
          <h2
            id="seo-landing-contact-heading"
            className="font-helvetica text-[clamp(1.6rem,2.5vw,1.9rem)] font-bold tracking-[-0.03em] text-[#212426] dark:text-white"
          >
            {SEO_LANDING_CONTACT.heading}
          </h2>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3.5">
            <div className="hidden" aria-hidden="true">
              <label htmlFor="seo-landing-honeypot">Website</label>
              <input
                id="seo-landing-honeypot"
                name="website"
                value={formData.website}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <label className="sr-only" htmlFor="seo-landing-name">
              Name
            </label>
            <input
              id="seo-landing-name"
              name="name"
              required
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className={fieldClass}
              autoComplete="name"
            />

            <label className="sr-only" htmlFor="seo-landing-business">
              Business
            </label>
            <input
              id="seo-landing-business"
              name="business"
              placeholder="Business"
              value={formData.business}
              onChange={handleChange}
              className={fieldClass}
              autoComplete="organization"
            />

            <label className="sr-only" htmlFor="seo-landing-email">
              Email
            </label>
            <input
              id="seo-landing-email"
              name="email"
              type="email"
              required
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={fieldClass}
              autoComplete="email"
            />

            <label className="sr-only" htmlFor="seo-landing-phone">
              Phone number
            </label>
            <input
              id="seo-landing-phone"
              name="phone"
              type="tel"
              placeholder="Phone number"
              value={formData.phone}
              onChange={handleChange}
              className={fieldClass}
              autoComplete="tel"
            />

            <label className="sr-only" htmlFor="seo-landing-company-website">
              Website
            </label>
            <input
              id="seo-landing-company-website"
              name="companyWebsite"
              type="text"
              inputMode="url"
              placeholder="Website"
              value={formData.companyWebsite}
              onChange={handleChange}
              className={fieldClass}
              autoComplete="url"
            />

            <label className="sr-only" htmlFor="seo-landing-message">
              Message
            </label>
            <textarea
              id="seo-landing-message"
              name="message"
              required
              placeholder="Message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className={`${fieldClass} h-auto min-h-[9rem] resize-y py-3`}
            />

            <button
              type="submit"
              disabled={submitState === 'submitting'}
              className="mt-2 inline-flex h-12 items-center justify-center rounded-xl bg-brand-blue font-helvetica text-[1rem] font-medium text-white transition-colors hover:bg-[#006FE6] disabled:opacity-70"
            >
              {submitState === 'submitting' ? 'Sending…' : SEO_LANDING_CONTACT.submitLabel}
            </button>

            {submitState === 'success' && (
              <p className="text-center font-helvetica text-[0.95rem] text-green-700 dark:text-green-400" role="status">
                Thanks. We will get back to you shortly.
              </p>
            )}
            {submitState === 'error' && (
              <p className="text-center font-helvetica text-[0.95rem] text-red-600" role="alert">
                Something went wrong. Please try again or use WhatsApp.
              </p>
            )}
          </form>

          <div className="my-5 flex items-center gap-3" aria-hidden="true">
            <span className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
            <span className="font-helvetica text-[0.95rem] text-gray-500">or</span>
            <span className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
          </div>

          <a
            href={CONSULTICO_WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#25D366] bg-[#25D366]/10 font-helvetica text-[1rem] font-medium text-[#128C7E] transition-colors hover:bg-[#25D366]/20 dark:text-[#5CFF9B]"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.84c0 1.94.53 3.76 1.45 5.33L2 22l4.98-1.55a9.86 9.86 0 0 0 5.06 1.37h.01c5.46 0 9.89-4.4 9.89-9.84C21.94 6.4 17.5 2 12.04 2Zm5.76 14.05c-.24.68-1.4 1.25-1.94 1.33-.5.07-1.13.1-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.26-4.79-4.2-4.93-4.4-.14-.19-1.17-1.56-1.17-2.97 0-1.42.74-2.11 1-2.4.26-.29.57-.36.76-.36h.55c.17 0 .4-.07.63.48.24.56.81 1.96.88 2.1.07.14.12.31.02.5-.1.19-.14.31-.28.48-.14.17-.3.37-.42.5-.14.14-.28.29-.12.56.16.28.71 1.17 1.52 1.9 1.05.94 1.93 1.23 2.21 1.37.28.14.44.12.6-.07.17-.19.7-.81.89-1.09.19-.28.38-.23.63-.14.26.1 1.63.77 1.91.91.28.14.47.21.54.33.07.12.07.68-.17 1.36Z" />
            </svg>
            {SEO_LANDING_CONTACT.whatsappLabel}
          </a>
        </div>
      </Container>
    </section>
  );
}
