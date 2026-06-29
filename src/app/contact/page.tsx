import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/Container';
import ServiceDesktopHeader from '@/components/ServiceDesktopHeader';
import ContactSection from '@/home/ContactSection';
import {
  CONSULTICO_ADDRESS,
  CONSULTICO_BOOKING_URL,
  CONSULTICO_EMAIL,
  CONSULTICO_GBP_URL,
  CONSULTICO_PHONE_DISPLAY,
  CONSULTICO_PHONE_TEL,
} from '@/lib/contact';
import { pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({
  title: 'Contact Consultico',
  description:
    'Contact Consultico in Glasgow: email, phone, office address, booking link, and contact form. Strategy-led digital marketing for UK and US businesses.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <main className="relative">
      <section className="relative overflow-hidden bg-brand-silk pb-10 dark:bg-gray-950 md:pb-14">
        <ServiceDesktopHeader />
        <Container className="relative z-10 pt-[11rem] md:pt-[13rem] lg:pt-[14rem]">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-futura text-[clamp(2rem,3.5vw,3rem)] font-bold text-brand-blue">
              Contact Consultico
            </h1>
            <p className="mt-5 font-helvetica-light text-[clamp(1rem,1.25vw,1.15rem)] leading-[1.65] text-gray-800 dark:text-gray-200">
              Glasgow-based, serving B2C brands and trades businesses across the UK and United States.
              Book a call, email us, or use the form below.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <a
              href={`mailto:${CONSULTICO_EMAIL}`}
              className="rounded-2xl border border-gray-200 bg-white p-5 text-center transition-colors hover:border-brand-blue dark:border-gray-800 dark:bg-gray-900"
            >
              <p className="font-helvetica text-[0.75rem] font-semibold uppercase tracking-wide text-brand-blue">Email</p>
              <p className="mt-2 font-helvetica-light text-[0.95rem] text-gray-800 dark:text-gray-200">{CONSULTICO_EMAIL}</p>
            </a>
            <a
              href={CONSULTICO_PHONE_TEL}
              className="rounded-2xl border border-gray-200 bg-white p-5 text-center transition-colors hover:border-brand-blue dark:border-gray-800 dark:bg-gray-900"
            >
              <p className="font-helvetica text-[0.75rem] font-semibold uppercase tracking-wide text-brand-blue">Phone</p>
              <p className="mt-2 font-helvetica-light text-[0.95rem] text-gray-800 dark:text-gray-200">{CONSULTICO_PHONE_DISPLAY}</p>
            </a>
            <a
              href={CONSULTICO_GBP_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-gray-200 bg-white p-5 text-center transition-colors hover:border-brand-blue dark:border-gray-800 dark:bg-gray-900 sm:col-span-2 lg:col-span-1"
            >
              <p className="font-helvetica text-[0.75rem] font-semibold uppercase tracking-wide text-brand-blue">Office</p>
              <p className="mt-2 font-helvetica-light text-[0.95rem] text-gray-800 dark:text-gray-200">{CONSULTICO_ADDRESS.display}</p>
            </a>
            <a
              href={CONSULTICO_BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-brand-blue bg-brand-blue p-5 text-center text-white transition-colors hover:bg-[#006FE6] sm:col-span-2 lg:col-span-1"
            >
              <p className="font-helvetica text-[0.75rem] font-semibold uppercase tracking-wide text-white/90">Book a call</p>
              <p className="mt-2 font-helvetica-light text-[0.95rem]">Free 30-minute discovery call</p>
            </a>
          </div>

          <p className="mx-auto mt-8 max-w-2xl text-center font-helvetica-light text-[0.9rem] text-gray-600 dark:text-gray-400">
            Prefer the homepage contact section?{' '}
            <Link href="/#contact" className="font-medium text-brand-blue hover:underline">
              Jump to the form on the homepage
            </Link>
            .
          </p>
        </Container>
      </section>

      <ContactSection />
    </main>
  );
}
