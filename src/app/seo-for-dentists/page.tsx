import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/Container';
import FaqSection from '@/components/FaqSection';
import ServiceDesktopHeader from '@/components/ServiceDesktopHeader';
import ServiceCtaBand from '@/components/services/ServiceCtaBand';
import SeoIndustrySpokeLinks from '@/components/services/SeoIndustrySpokeLinks';
import { pageMeta } from '@/lib/seo';
import {
  DENTIST_SEO_COVERAGE,
  DENTIST_SEO_PAIN_POINTS,
  DENTIST_SEO_PROCESS_STEPS,
  DENTIST_WORKSHOP_TESTIMONIAL,
  SEO_FOR_DENTISTS_FAQS,
  SEO_FOR_DENTISTS_PATH,
  SEO_FOR_DENTISTS_SLUG,
} from '@/lib/seo-for-dentists';
import { seoForDentistsPageJsonLd, serializeJsonLd } from '@/lib/schema';

const SEO_CONTACT = '/contact?interest=seo';
const SEO_CTA_LABEL = 'Book a call';

const sectionHeadingClass =
  'font-futura text-[clamp(1.35rem,2.2vw,1.85rem)] font-bold leading-[1.15] text-brand-blue';

const bodyClass = 'font-helvetica-light text-[clamp(1rem,1.15vw,1.0625rem)] leading-[1.75] text-gray-800 dark:text-gray-200';

export const metadata: Metadata = pageMeta({
  title: 'SEO for Dentists | Attract More Private Patients | Consultico',
  description:
    'Dental SEO that brings in private and cosmetic patients, not just rankings. Strategy-led, tied to your cost per patient, UK-wide.',
  path: SEO_FOR_DENTISTS_PATH,
  absoluteTitle: true,
});

export default function SeoForDentistsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(seoForDentistsPageJsonLd()) }}
      />
      <main className="relative min-h-screen" id="main-content">
        <section className="relative pb-12 md:pb-16" aria-labelledby="seo-for-dentists-heading">
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
                <li className="text-gray-800 dark:text-gray-200">SEO for Dentists</li>
              </ol>
            </nav>

            <article className="mx-auto max-w-3xl">
              <h1
                id="seo-for-dentists-heading"
                className="mb-6 font-futura text-[clamp(2rem,3.2vw,2.75rem)] font-bold leading-[1.1] text-brand-blue"
              >
                SEO for Dentists
              </h1>

              <p className={`mb-8 ${bodyClass}`}>
                Consultico is a strategy-led marketing consultancy, and our SEO for dentists is built to bring in the
                patients your practice actually needs: private, cosmetic and fee-paying, not just more website traffic.
                Demand has rarely been higher. The BDA estimates around 13 million people had unmet dental need in 2024,
                roughly 28 percent of adults struggling to access NHS dentistry (BDA, 2024), yet most practices still
                rely on word of mouth and hope to fill private chairs. When someone searches &ldquo;dentist near
                me&rdquo;, &ldquo;Invisalign&rdquo; in your town or &ldquo;dental implants cost&rdquo;, they compare reviews,
                treatment pages and how professional you look online before they book. If your site is thin, your Google
                Business Profile is quiet and your content ignores GDC advertising limits, you lose the enquiry to a
                practice that is not necessarily better, just clearer and easier to trust. We fix that: the local pages,
                reviews and search visibility that put you in front of patients at the moment they decide who to book
                with.
              </p>
            </article>
          </Container>
        </section>

        <section className="border-t border-gray-200 bg-brand-silk/60 py-14 dark:border-gray-800 dark:bg-gray-900/50 md:py-16">
          <Container>
            <div className="mx-auto max-w-3xl space-y-14">
              <div>
                <h2 className={`${sectionHeadingClass} mb-4`}>
                  Why dental practices lose patients they should be winning
                </h2>
                <p className={`${bodyClass} mb-6`}>
                  When someone needs a dentist, they rarely pick the nearest surgery without looking. They search,
                  compare reviews and read treatment pages, especially for private and cosmetic work. If you are not
                  visible and convincing at that moment, the booking goes to a practice that is not necessarily better,
                  just easier to find and quicker to trust. Three things usually cost dentists those patients:
                </p>
                <ul className="space-y-4 pl-5">
                  {DENTIST_SEO_PAIN_POINTS.map((item) => (
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
                  SEO is how you capture genuine demand and own the searches that bring private patients to you, without
                  marketing that puts your GDC registration at risk.
                </p>
              </div>

              <div>
                <h2 className={`${sectionHeadingClass} mb-6`}>What our SEO for dentists covers</h2>
                <ul className="space-y-5">
                  {DENTIST_SEO_COVERAGE.map((item) => (
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
                  Consultico does not fill private chairs with a bigger ad budget alone. We win them by fixing the
                  foundations that make a patient choose you: a complete Google Business Profile, treatment pages that
                  answer real questions, a steady review habit and content that respects GDC limits. It is the same
                  approach we run in our{' '}
                  <Link href="/think-first" className="font-medium text-brand-blue underline-offset-2 hover:underline">
                    Think First strategy workshop
                  </Link>
                  , developed with a 2025 University of Strathclyde Inspire fellowship, where the representative pattern
                  for local-service businesses has been roughly three times online revenue within six months, with every
                  marketing channel made measurable so nothing is left to guesswork.
                </p>
                <blockquote className="mb-6 border-l-2 border-brand-blue pl-5">
                  <p className={`${bodyClass} italic`}>&ldquo;{DENTIST_WORKSHOP_TESTIMONIAL.quote}&rdquo;</p>
                  <footer className={`mt-3 ${bodyClass} not-italic`}>
                    <p className="font-helvetica font-medium text-gray-900 dark:text-gray-100">
                      {DENTIST_WORKSHOP_TESTIMONIAL.name}, {DENTIST_WORKSHOP_TESTIMONIAL.company}
                    </p>
                    <p className="mt-1 text-[0.9rem] text-gray-600 dark:text-gray-400">
                      Think First workshop testimonial
                    </p>
                  </footer>
                </blockquote>
                <p className={bodyClass}>
                  We are margin-aware by default. Tell us your average private treatment value and we will tell you
                  honestly whether SEO earns its place for your practice.
                </p>
              </div>

              <div>
                <h2 className={`${sectionHeadingClass} mb-6`}>How we&apos;d start with you</h2>
                <ol className="space-y-5">
                  {DENTIST_SEO_PROCESS_STEPS.map((step, index) => (
                    <li key={step.title} className={`${bodyClass} pl-1`}>
                      <strong className="font-helvetica font-semibold text-gray-900 dark:text-gray-100">
                        {index + 1}. {step.title}
                      </strong>{' '}
                      {step.body}
                    </li>
                  ))}
                </ol>
                <p className={`${bodyClass} mt-6`}>
                  We are margin-aware by default: when a single implant or Invisalign case can be worth thousands, the
                  maths on a few extra a month is usually straightforward, and if it is not worth it for you, we will
                  tell you.
                </p>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-white py-14 dark:bg-gray-950 md:py-16">
          <Container>
            <div className="mx-auto max-w-3xl">
              <FaqSection faqs={[...SEO_FOR_DENTISTS_FAQS]} includeSchema={false} />
            </div>
          </Container>
        </section>

        <SeoIndustrySpokeLinks slug={SEO_FOR_DENTISTS_SLUG} />

        <ServiceCtaBand
          title="Attract more private patients from Google"
          body="Tell us your average treatment value and the area you cover, and we will tell you honestly whether SEO is worth it for your practice, and where the quickest wins are."
          buttonLabel={SEO_CTA_LABEL}
          href={SEO_CONTACT}
        />
      </main>
    </>
  );
}
