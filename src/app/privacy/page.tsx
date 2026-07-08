import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/Container';
import ServiceDesktopHeader from '@/components/ServiceDesktopHeader';
import { CONSULTICO_EMAIL } from '@/lib/contact';
import { pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({
  title: 'Privacy Policy',
  description: 'How Consultico Ltd collects, uses, and protects personal data.',
  path: '/privacy',
});

const sections = [
  {
    title: 'Who we are',
    body: 'Consultico Ltd ("Consultico", "we", "us") is a digital marketing consultancy registered in the United Kingdom. For data protection queries, contact us at the email below.',
  },
  {
    title: 'What we collect',
    body: 'We may collect contact details (name, email, phone, business name), messages you send via our contact form, email addresses submitted for our free SEO audit offer, website URLs you provide for audit fulfilment, website usage data via analytics, and marketing preferences where you opt in.',
  },
  {
    title: 'Marketing emails and audit signups',
    body: 'If you sign up for a free SEO audit, we collect your email address and, if provided, your website URL. By submitting, you agree we may email you to deliver the audit and send occasional marketing emails about Consultico services. You can unsubscribe from marketing at any time by replying to any email. We store the date and version of the consent text shown at signup.',
  },
  {
    title: 'How we use your data',
    body: 'We use personal data to respond to enquiries, deliver requested audits, deliver services, improve our website, and send marketing communications where you have agreed. We do not sell personal data.',
  },
  {
    title: 'Legal basis (UK GDPR)',
    body: 'Processing is based on consent (e.g. contact form), contract performance (client work), and legitimate interests (site security and service improvement), balanced against your rights.',
  },
  {
    title: 'Retention',
    body: 'We keep enquiry and client records only as long as needed for the purpose collected, legal obligations, or legitimate business records.',
  },
  {
    title: 'Your rights',
    body: 'You may request access, correction, erasure, restriction, portability, or object to certain processing. You may complain to the ICO (ico.org.uk).',
  },
  {
    title: 'Cookies and analytics',
    body: 'We use cookies for essential site function and analytics. Google Tag Manager loads Google Analytics 4 (usage data such as pages visited and general location) only if you accept analytics cookies. We may add advertising tags in future when running paid campaigns; these remain off until then. Vercel Analytics and Speed Insights may also collect anonymised performance data. You can change your choice anytime by clearing site data or using the cookie banner. See your browser settings for broader cookie controls.',
  },
];

export default function PrivacyPage() {
  return (
    <main className="relative min-h-screen bg-brand-silk dark:bg-gray-950">
      <ServiceDesktopHeader />
      <Container className="relative z-10 pb-16 pt-[11rem] md:pb-20 md:pt-[13rem] lg:pt-[14rem]">
        <article className="mx-auto max-w-3xl">
          <p className="mb-3 font-helvetica text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-brand-blue">
            Legal
          </p>
          <h1 className="font-futura text-[clamp(2rem,3vw,2.75rem)] font-bold text-brand-blue">Privacy Policy</h1>
          <p className="mt-4 font-helvetica-light text-[0.95rem] text-gray-600 dark:text-gray-400">
            Last updated: June 2026. NEEDS PAUL: final legal review and company registration details.
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
            <Link href="/terms" className="text-brand-blue hover:underline">
              Terms & Conditions
            </Link>
            .
          </p>
        </article>
      </Container>
    </main>
  );
}
