import Container from '@/components/Container';
import ContactForm from '@/components/ContactForm';
import { CONSULTICO_EMAIL, CONSULTICO_PHONE_DISPLAY, CONSULTICO_PHONE_TEL } from '@/lib/contact';

/**
 * Where every "Apply now" on the homepage lands. Rebuilt 2026-11-01 to match
 * the sections above (eyebrow, navy heading, left-aligned) and to read as the
 * application, not a generic contact block: the old "Ready to think first?"
 * and "Book a Call" belonged to the Think First era.
 */
const DETAILS = [
  { label: 'Email', value: CONSULTICO_EMAIL, href: `mailto:${CONSULTICO_EMAIL}` },
  { label: 'Phone', value: CONSULTICO_PHONE_DISPLAY, href: CONSULTICO_PHONE_TEL },
  { label: 'Office', value: 'Glasgow, Scotland' },
];

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="scroll-mt-24 bg-brand-silk py-14 shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:bg-gray-950 md:py-20 lg:py-24"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <p className="mb-3 font-helvetica text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-brand-blue">
              Apply
            </p>
            <h2 className="font-futura text-[clamp(1.6rem,2.8vw,2.75rem)] font-bold leading-[1.1] text-[#1B2A4A] dark:text-white">
              Let&apos;s see if Loop is right for you.
            </h2>
            <p className="mt-5 max-w-[32rem] font-helvetica-light text-[clamp(1.05rem,1.35vw,1.25rem)] leading-[1.6] text-gray-800 dark:text-gray-200">
              Tell us about your brand and where your marketing is now, and we&apos;ll be in touch.
            </p>

            <dl className="mt-10 space-y-5">
              {DETAILS.map((detail) => (
                <div key={detail.label}>
                  <dt className="font-helvetica text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">
                    {detail.label}
                  </dt>
                  <dd className="mt-1 font-helvetica text-[clamp(1rem,1.2vw,1.1rem)] text-[#1B2A4A] dark:text-white">
                    {detail.href ? (
                      <a href={detail.href} className="transition-colors hover:text-brand-blue">
                        {detail.value}
                      </a>
                    ) : (
                      detail.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* ContactForm brings its own card. */}
          <ContactForm idPrefix="home-contact" />
        </div>
      </Container>
    </section>
  );
}
