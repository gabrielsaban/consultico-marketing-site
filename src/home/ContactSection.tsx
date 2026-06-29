'use client';

import Container from '@/components/Container';
import ContactForm from '@/components/ContactForm';
import ContactLazyMap from '@/components/ContactLazyMap';
import {
  CONSULTICO_BOOKING_URL,
  CONSULTICO_EMAIL,
  CONSULTICO_PHONE_DISPLAY,
  CONSULTICO_PHONE_TEL,
} from '@/lib/contact';
import { motion } from 'framer-motion';

export default function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-24 bg-gray-50 py-16 shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:bg-gray-950 md:py-20 lg:py-24">
      <Container>
        <div className="mb-12 flex flex-col items-center justify-center gap-8 md:mb-16 md:flex-row md:gap-12 lg:gap-24">
          <a
            href={`mailto:${CONSULTICO_EMAIL}`}
            className="flex items-center gap-3 font-helvetica text-[clamp(0.95rem,1.1vw,1.125rem)] text-gray-700 transition-colors hover:text-brand-blue dark:text-gray-300"
          >
            {CONSULTICO_EMAIL}
          </a>
          <a
            href={CONSULTICO_PHONE_TEL}
            className="flex items-center gap-3 font-helvetica text-[clamp(0.95rem,1.1vw,1.125rem)] text-gray-700 transition-colors hover:text-brand-blue dark:text-gray-300"
          >
            {CONSULTICO_PHONE_DISPLAY}
          </a>
          <span className="font-helvetica text-[clamp(0.95rem,1.1vw,1.125rem)] text-gray-700 dark:text-gray-300">
            Glasgow, Scotland
          </span>
        </div>

        <div className="mx-auto mb-16 flex max-w-4xl flex-col gap-10 md:mb-20">
          <div className="flex flex-col items-center text-center">
            <h3 className="mb-5 max-w-[22ch] font-futura text-[clamp(2.1rem,3vw,3.4rem)] font-bold leading-[1.02] text-brand-blue">
              Ready to think first?
            </h3>
            <p className="mb-8 max-w-[36rem] font-helvetica text-[clamp(1rem,1.15vw,1.12rem)] leading-[1.6] text-gray-700 dark:text-gray-300">
              Book a free discovery call and let&apos;s figure out exactly where your marketing should be going, and what it&apos;s going to take to get there.
            </p>
            <motion.a
              href={CONSULTICO_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full max-w-[18rem] items-center justify-center rounded-lg bg-brand-blue px-8 py-3 font-helvetica text-[clamp(1rem,1.15vw,1.08rem)] font-medium text-white transition-colors duration-200 hover:bg-[#006FE6] active:bg-[#0067D6] focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.98 }}
            >
              Book a Call
            </motion.a>
          </div>

          <div className="text-center">
            <h3 className="mb-3 font-futura text-[clamp(1.5rem,2.3vw,2.4rem)] font-bold leading-[1.08] text-brand-blue">
              Got a question first?
            </h3>
            <p className="font-helvetica text-[clamp(1rem,1.15vw,1.12rem)] leading-[1.55] text-gray-700 dark:text-gray-300">
              Fill in the form below and we&apos;ll get back to you. Or use our{' '}
              <a href="/contact" className="font-medium text-brand-blue hover:underline">
                dedicated contact page
              </a>
              .
            </p>
          </div>

          <ContactForm idPrefix="home-contact" />
        </div>

        <ContactLazyMap />
      </Container>
    </section>
  );
}
