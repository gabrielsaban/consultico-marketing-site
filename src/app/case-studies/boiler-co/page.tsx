import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/Container';
import ServiceDesktopHeader from '@/components/ServiceDesktopHeader';
import { pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({
  title: 'Case Study: The Boiler Co',
  description:
    'How Consultico used SEO to turn inconsistent trades leads into a consistent source of new business for The Boiler Co, a Glasgow-area plumbing company.',
  path: '/case-studies/boiler-co',
});

const SEO_CONTACT = '/contact?interest=seo';

export default function BoilerCoCaseStudyPage() {
  return (
    <main className="relative min-h-screen bg-brand-silk dark:bg-gray-950">
      <ServiceDesktopHeader />
      <Container className="relative z-10 pb-16 pt-[11rem] md:pb-20 md:pt-[13rem] lg:pt-[14rem]">
        <article className="mx-auto max-w-3xl">
          <p className="mb-3 font-helvetica text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-brand-blue">
            Case study
          </p>
          <h1 className="font-futura text-[clamp(2rem,3.5vw,2.85rem)] font-bold leading-[1.1] text-brand-blue">
            The Boiler Co: from inconsistent leads to SEO as a consistent growth channel
          </h1>
          <p className="mt-5 font-helvetica-light text-[clamp(1rem,1.2vw,1.1rem)] leading-[1.65] text-gray-800 dark:text-gray-200">
            A Glasgow-area trades business where a full calendar matters. SEO replaced unreliable paid ads as a consistent source of new business.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { value: '3 mo', label: 'To calendar fill' },
              { value: '21k', label: 'Weekly impressions' },
              { value: '58', label: 'Weekly clicks' },
              { value: '14+', label: 'Months retained' },
            ].map((metric) => (
              <div key={metric.label} className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
                <p className="font-futura text-[clamp(1.2rem,1.6vw,1.5rem)] font-bold text-brand-blue">{metric.value}</p>
                <p className="mt-1 font-helvetica-light text-[0.72rem] uppercase tracking-wide text-gray-600 dark:text-gray-400">{metric.label}</p>
              </div>
            ))}
          </div>

          <div className="prose-custom mt-10 space-y-8">
            <section>
              <h2 className="font-futura text-[clamp(1.25rem,1.8vw,1.5rem)] font-bold text-gray-900 dark:text-white">The situation</h2>
              <p className="mt-3 font-helvetica-light text-[0.98rem] leading-[1.7] text-gray-700 dark:text-gray-300">
                Lead flow was extremely inconsistent. Most enquiries came from referrals and existing customers, with paid ads as the main attempt at predictable new business. When ad performance dipped or spend had to pause, the diary became unpredictable.
              </p>
            </section>
            <section>
              <h2 className="font-futura text-[clamp(1.25rem,1.8vw,1.5rem)] font-bold text-gray-900 dark:text-white">What we did</h2>
              <p className="mt-3 font-helvetica-light text-[0.98rem] leading-[1.7] text-gray-700 dark:text-gray-300">
                We built an SEO foundation focused on high-intent local searches: people actively looking for boiler services in their area, ready to book. Technical fixes, on-page work, and content targeting commercial intent replaced dependence on ads alone.
              </p>
            </section>
            <section>
              <h2 className="font-futura text-[clamp(1.25rem,1.8vw,1.5rem)] font-bold text-gray-900 dark:text-white">The outcome</h2>
              <p className="mt-3 font-helvetica-light text-[0.98rem] leading-[1.7] text-gray-700 dark:text-gray-300">
                Within three months, the calendar was consistently filled through organic search. Weekly impressions grew from around 6,000 to 21,000, with clicks rising from about 20 to 58 per week. The Boiler Co have been a retained SEO client for 14+ months and returned for additional website work.
              </p>
            </section>
          </div>

          <blockquote className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <p className="font-helvetica-light italic leading-[1.65] text-gray-800 dark:text-gray-200">
              &ldquo;After a frustrating run with agencies, this gave us genuine clarity on what to do and why it would work.&rdquo;
            </p>
            <footer className="mt-3 font-helvetica text-[0.875rem] font-medium text-gray-600 dark:text-gray-400">Ant Vitale, The Boiler Co</footer>
          </blockquote>

          <p className="mt-8 font-helvetica-light text-[0.9rem] text-gray-600 dark:text-gray-400">
            Full expanded case study with additional detail coming soon.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href={SEO_CONTACT}
              className="inline-flex items-center justify-center rounded-lg bg-brand-blue px-6 py-3 font-helvetica font-medium text-white transition-colors hover:bg-[#006FE6]"
            >
              Discuss an SEO audit
            </Link>
            <Link href="/seo" className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-6 py-3 font-helvetica text-gray-800 transition-colors hover:border-brand-blue hover:text-brand-blue dark:border-gray-700 dark:text-gray-200">
              Back to SEO services
            </Link>
          </div>
        </article>
      </Container>
    </main>
  );
}
