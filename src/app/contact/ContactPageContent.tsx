'use client';

import Link from 'next/link';
import Container from '@/components/Container';
import AuditSignupBlock from '@/components/AuditSignupBlock';
import ContactForm from '@/components/ContactForm';
import ContactLazyMap from '@/components/ContactLazyMap';
import {
  CONSULTICO_ADDRESS,
  CONSULTICO_BOOKING_URL,
  CONSULTICO_EMAIL,
  CONSULTICO_GBP_URL,
  CONSULTICO_PHONE_DISPLAY,
  CONSULTICO_PHONE_TEL,
} from '@/lib/contact';

export default function ContactPageContent() {
  return (
    <>
      <section className="relative overflow-hidden bg-brand-silk pb-12 dark:bg-gray-950 md:pb-16">
        <Container className="relative z-10 pt-[10.5rem] md:pt-[12rem] lg:pt-[13rem]">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12 xl:gap-14">
            <div className="lg:pt-2">
              <p className="mb-3 font-helvetica text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-brand-blue">
                Contact
              </p>
              <h1 className="font-futura text-[clamp(2rem,3.5vw,2.85rem)] font-bold leading-[1.1] text-brand-blue">
                Send us a message
              </h1>
              <p className="mt-4 max-w-md font-helvetica-light text-[clamp(1rem,1.2vw,1.1rem)] leading-[1.65] text-gray-800 dark:text-gray-200">
                Tell us about your business and what you need. We work with B2C brands and trades businesses across the UK and United States.
              </p>

              <blockquote className="mt-8 border-l-2 border-brand-blue pl-4">
                <p className="font-helvetica-light text-[0.98rem] italic leading-[1.65] text-gray-800 dark:text-gray-200">
                  &ldquo;Paul kept me informed throughout and delivered on time - his support was outstanding.&rdquo;
                </p>
                <footer className="mt-3 font-helvetica text-[0.875rem] font-medium not-italic text-gray-900 dark:text-gray-100">
                  Keiren, Custom Crafts by KJB
                </footer>
              </blockquote>

              <p className="mt-6 font-helvetica-light text-[0.92rem] leading-[1.6] text-gray-600 dark:text-gray-400">
                Prefer a call?{' '}
                <a href={CONSULTICO_BOOKING_URL} target="_blank" rel="noreferrer" className="font-medium text-brand-blue hover:underline">
                  Book a free call
                </a>{' '}
                or email{' '}
                <a href={`mailto:${CONSULTICO_EMAIL}`} className="font-medium text-brand-blue hover:underline">
                  {CONSULTICO_EMAIL}
                </a>
                .
              </p>
            </div>

            <ContactForm idPrefix="contact-page" showResponseNote />
          </div>
        </Container>
      </section>

      <section className="border-y border-gray-200 bg-white py-8 dark:border-gray-800 dark:bg-gray-950 md:py-10">
        <Container>
          <div className="flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center md:gap-6">
            <a
              href={CONSULTICO_BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-brand-blue px-6 py-3 font-helvetica font-medium text-brand-blue transition-colors hover:bg-brand-blue hover:text-white"
            >
              Book a free call
            </a>
            <a
              href={`mailto:${CONSULTICO_EMAIL}`}
              className="inline-flex items-center justify-center rounded-lg border border-gray-200 px-6 py-3 font-helvetica text-gray-800 transition-colors hover:border-brand-blue hover:text-brand-blue dark:border-gray-700 dark:text-gray-200"
            >
              {CONSULTICO_EMAIL}
            </a>
            <a
              href={CONSULTICO_PHONE_TEL}
              className="inline-flex items-center justify-center rounded-lg border border-gray-200 px-6 py-3 font-helvetica text-gray-800 transition-colors hover:border-brand-blue hover:text-brand-blue dark:border-gray-700 dark:text-gray-200"
            >
              {CONSULTICO_PHONE_DISPLAY}
            </a>
          </div>
        </Container>
      </section>

      <section className="bg-brand-silk/80 py-10 dark:bg-gray-900/80 md:py-12">
        <Container>
          <div className="mx-auto max-w-3xl">
            <AuditSignupBlock source="contact-page" variant="compact" />
          </div>
        </Container>
      </section>

      <section className="py-12 md:py-14">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-futura text-[clamp(1.25rem,2vw,1.5rem)] font-bold text-brand-blue">Visit us</h2>
            <a
              href={CONSULTICO_GBP_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block font-helvetica-light text-[clamp(0.95rem,1.1vw,1.05rem)] leading-[1.65] text-gray-700 hover:text-brand-blue dark:text-gray-300"
            >
              {CONSULTICO_ADDRESS.display}
              <br />
              United Kingdom
            </a>
            <p className="mt-4 font-helvetica-light text-[0.875rem] text-gray-500 dark:text-gray-400">
              <Link href="/#contact" className="text-brand-blue hover:underline">
                Homepage contact section
              </Link>{' '}
              also available.
            </p>
          </div>
        </Container>
      </section>

      <section className="pb-16 md:pb-20">
        <Container>
          <ContactLazyMap />
        </Container>
      </section>
    </>
  );
}
