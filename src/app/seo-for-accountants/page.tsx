import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/Container';
import FaqSection from '@/components/FaqSection';
import ServiceDesktopHeader from '@/components/ServiceDesktopHeader';
import ServiceCtaBand from '@/components/services/ServiceCtaBand';
import SeoIndustrySpokeLinks from '@/components/services/SeoIndustrySpokeLinks';
import { pageMeta } from '@/lib/seo';
import {
  ACCOUNTANT_SEO_COVERAGE,
  ACCOUNTANT_SEO_PAIN_POINTS,
  ACCOUNTANT_SEO_PROCESS_STEPS,
  ACCOUNTANT_WORKSHOP_TESTIMONIAL,
  SEO_FOR_ACCOUNTANTS_FAQS,
  SEO_FOR_ACCOUNTANTS_PATH,
  SEO_FOR_ACCOUNTANTS_SLUG,
} from '@/lib/seo-for-accountants';
import { seoForAccountantsPageJsonLd, serializeJsonLd } from '@/lib/schema';

const SEO_CONTACT = '/contact?interest=seo';
const SEO_CTA_LABEL = 'Book a call';

const sectionHeadingClass =
  'font-futura text-[clamp(1.35rem,2.2vw,1.85rem)] font-bold leading-[1.15] text-brand-blue';

const bodyClass = 'font-helvetica-light text-[clamp(1rem,1.15vw,1.0625rem)] leading-[1.75] text-gray-800 dark:text-gray-200';

export const metadata: Metadata = pageMeta({
  title: 'SEO for Accountants | Win More Clients | Consultico',
  description:
    'SEO for accountants that wins the right clients, not just rankings. Strategy-led, tied to your client lifetime value, built on trust. UK-wide.',
  path: SEO_FOR_ACCOUNTANTS_PATH,
  absoluteTitle: true,
});

export default function SeoForAccountantsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(seoForAccountantsPageJsonLd()) }}
      />
      <main className="relative min-h-screen" id="main-content">
        <section className="relative pb-12 md:pb-16" aria-labelledby="seo-for-accountants-heading">
          <ServiceDesktopHeader />
          <div className="absolute inset-0 dot-grid-premium opacity-30 dark:opacity-15" aria-hidden="true" />
          <Container className="relative pt-[10.5rem] md:pt-[12rem] lg:pt-[13.5rem] xl:pt-[14.5rem]">
            <nav
              aria-label="Breadcrumb"
              className="mb-6 font-helvetica text-[0.875rem] text-gray-600 dark:text-gray-400"
            >
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-brand-blue">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/seo" className="hover:text-brand-blue">
                    SEO
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-gray-800 dark:text-gray-200">SEO for Accountants</li>
              </ol>
            </nav>

            <article className="mx-auto max-w-3xl">
              <h1
                id="seo-for-accountants-heading"
                className="mb-6 font-futura text-[clamp(2rem,3.2vw,2.75rem)] font-bold leading-[1.1] text-brand-blue"
              >
                SEO for Accountants
              </h1>

              <p className={`mb-8 ${bodyClass}`}>
                Consultico is a strategy-led marketing consultancy, and our SEO for accountants is built to win the
                right clients: well-matched, long-term and profitable, not the cheapest-quote shoppers. Accountancy is a
                trust purchase, and trust is now checked on Google. Even a warm referral almost always searches your
                firm before calling, weighing up your reviews, your qualifications and your website before they decide.
                If those are thin, you can lose a client you never knew you had. On top of that, a genuine demand event
                is arriving: around 850,000 businesses enter Making Tax Digital for Income Tax from April 2026 (HMRC,
                2025), and many sole traders and landlords will be looking for an accountant for the first time. If
                your firm has published nothing on MTD and has a quiet review profile, that work goes to a firm that is
                easier to find and quicker to trust. We fix that, tied to what a retained client is genuinely worth to
                you.
              </p>
            </article>
          </Container>
        </section>

        <section className="border-t border-gray-200 bg-brand-silk/60 py-14 dark:border-gray-800 dark:bg-gray-900/50 md:py-16">
          <Container>
            <div className="mx-auto max-w-3xl space-y-14">
              <div>
                <h2 className={`${sectionHeadingClass} mb-4`}>
                  Why accountancy firms lose clients they should be winning
                </h2>
                <p className={`${bodyClass} mb-6`}>
                  When a business owner or individual needs an accountant, they rarely commit on the spot. They ask
                  around, then research, then compare two or three firms before booking a consultation. If you are not
                  visible and reassuring across that journey, the client goes to a firm that is not necessarily better,
                  just easier to find and trust. Three things usually cost firms those clients:
                </p>
                <ul className="space-y-4 pl-5">
                  {ACCOUNTANT_SEO_PAIN_POINTS.map((item) => (
                    <li key={item.title} className={`${bodyClass} list-disc`}>
                      <strong className="font-helvetica font-semibold text-gray-900 dark:text-gray-100">
                        {item.title}
                      </strong>
                      {': '}
                      {item.body}
                    </li>
                  ))}
                </ul>
                <p className={`${bodyClass} mt-6`}>
                  SEO done properly is how you turn your reputation and expertise into a steady, well-matched client
                  pipeline.
                </p>
              </div>

              <div>
                <h2 className={`${sectionHeadingClass} mb-6`}>What our SEO for accountants covers</h2>
                <ul className="space-y-5">
                  {ACCOUNTANT_SEO_COVERAGE.map((item) => (
                    <li
                      key={item.title}
                      className="rounded-xl border border-gray-200 bg-white/85 p-5 dark:border-gray-700 dark:bg-gray-950/80"
                    >
                      <h3 className="mb-2 font-futura text-[1.05rem] font-bold text-brand-blue">{item.title}</h3>
                      <p className={bodyClass}>{item.body}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className={`${sectionHeadingClass} mb-4`}>Proof it works: strategy before tactics</h2>
                <p className={`${bodyClass} mb-6`}>
                  Consultico does not win clients with a bigger ad budget. We win them by fixing the foundations that
                  make a prospect choose you: a complete Google Business Profile, genuine reviews, clear credentials,
                  specialist pages and content that answers what clients are actually worried about. It is the same
                  approach we run in our{' '}
                  <Link href="/think-first" className="font-medium text-brand-blue underline-offset-2 hover:underline">
                    Think First strategy workshop
                  </Link>
                  , developed with a 2025 University of Strathclyde Inspire fellowship, where the representative pattern
                  for local-service businesses has been roughly three times online revenue within six months, with every
                  marketing channel made measurable so nothing is left to guesswork.
                </p>
                <blockquote className="mb-6 border-l-2 border-brand-blue pl-5">
                  <p className={`${bodyClass} italic`}>&ldquo;{ACCOUNTANT_WORKSHOP_TESTIMONIAL.quote}&rdquo;</p>
                  <footer className={`mt-3 ${bodyClass} not-italic`}>
                    <p className="font-helvetica font-medium text-gray-900 dark:text-gray-100">
                      {ACCOUNTANT_WORKSHOP_TESTIMONIAL.name}, {ACCOUNTANT_WORKSHOP_TESTIMONIAL.company}
                    </p>
                    <p className="mt-1 text-[0.9rem] text-gray-600 dark:text-gray-400">
                      Think First workshop testimonial
                    </p>
                  </footer>
                </blockquote>
                <p className={bodyClass}>
                  We are margin-aware by default. Tell us your average client lifetime value and we will tell you
                  honestly whether SEO earns its place for your firm.
                </p>
              </div>

              <div>
                <h2 className={`${sectionHeadingClass} mb-6`}>How we&apos;d start with you</h2>
                <ol className="space-y-5">
                  {ACCOUNTANT_SEO_PROCESS_STEPS.map((step, index) => (
                    <li key={step.title} className={`${bodyClass} pl-1`}>
                      <strong className="font-helvetica font-semibold text-gray-900 dark:text-gray-100">
                        {index + 1}. {step.title}
                      </strong>{' '}
                      {step.body}
                    </li>
                  ))}
                </ol>
                <p className={`${bodyClass} mt-6`}>
                  We are margin-aware by default: when one retained client can be worth thousands a year for several
                  years, the maths on a few extra a month is usually straightforward, and if it is not worth it for you,
                  we will tell you.
                </p>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-white py-14 dark:bg-gray-950 md:py-16">
          <Container>
            <div className="mx-auto max-w-3xl">
              <FaqSection faqs={[...SEO_FOR_ACCOUNTANTS_FAQS]} includeSchema={false} />
            </div>
          </Container>
        </section>

        <SeoIndustrySpokeLinks slug={SEO_FOR_ACCOUNTANTS_SLUG} />

        <ServiceCtaBand
          title="Win more of the right clients from Google"
          body="Tell us your average client lifetime value and the area you cover, and we will tell you honestly whether SEO is worth it for your firm, and where the quickest wins are."
          buttonLabel={SEO_CTA_LABEL}
          href={SEO_CONTACT}
        />
      </main>
    </>
  );
}
