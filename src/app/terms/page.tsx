import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/Container';
import ServiceDesktopHeader from '@/components/ServiceDesktopHeader';
import { CONSULTICO_EMAIL } from '@/lib/contact';
import { pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({
  title: 'Terms & Conditions',
  description: 'Terms and conditions for using the Consultico website and services.',
  path: '/terms',
});

const sections = [
  {
    title: 'Agreement',
    body: 'By using consultico.co.uk you agree to these terms. Separate written agreements govern paid client engagements.',
  },
  {
    title: 'Services',
    body: 'Consultico provides digital marketing strategy and execution services. Scope, fees, and deliverables are defined in individual proposals or statements of work.',
  },
  {
    title: 'Website content',
    body: 'Content on this site is for general information. While we aim for accuracy, it does not constitute professional advice until agreed in a client engagement.',
  },
  {
    title: 'Intellectual property',
    body: 'Site content, branding, and materials are owned by Consultico Ltd unless otherwise stated. Client-owned assets remain the property of the client.',
  },
  {
    title: 'Limitation of liability',
    body: 'To the extent permitted by law, Consultico is not liable for indirect or consequential loss arising from use of this website. Nothing limits liability where unlawful to do so.',
  },
  {
    title: 'Governing law',
    body: 'These terms are governed by the laws of Scotland and the United Kingdom. Courts of Scotland have exclusive jurisdiction, subject to mandatory consumer rights.',
  },
];

export default function TermsPage() {
  return (
    <main className="relative min-h-screen bg-brand-silk dark:bg-gray-950">
      <ServiceDesktopHeader />
      <Container className="relative z-10 pb-16 pt-[11rem] md:pb-20 md:pt-[13rem] lg:pt-[14rem]">
        <article className="mx-auto max-w-3xl">
          <p className="mb-3 font-helvetica text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-brand-blue">
            Legal
          </p>
          <h1 className="font-futura text-[clamp(2rem,3vw,2.75rem)] font-bold text-brand-blue">Terms & Conditions</h1>
          <p className="mt-4 font-helvetica-light text-[0.95rem] text-gray-600 dark:text-gray-400">
            Last updated: June 2026. NEEDS PAUL: final legal review.
          </p>

          <div className="mt-10 space-y-8">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="font-futura text-[clamp(1.2rem,1.8vw,1.5rem)] font-bold text-gray-900 dark:text-white">
                  {section.title}
                </h2>
                <p className="mt-3 font-helvetica-light text-[clamp(0.95rem,1.1vw,1.05rem)] leading-[1.7] text-gray-700 dark:text-gray-300">
                  {section.body}
                </p>
              </section>
            ))}
          </div>

          <p className="mt-10 font-helvetica-light text-[0.95rem] text-gray-700 dark:text-gray-300">
            Questions:{' '}
            <a href={`mailto:${CONSULTICO_EMAIL}`} className="text-brand-blue hover:underline">
              {CONSULTICO_EMAIL}
            </a>
            . See also our{' '}
            <Link href="/privacy" className="text-brand-blue hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </article>
      </Container>
    </main>
  );
}
