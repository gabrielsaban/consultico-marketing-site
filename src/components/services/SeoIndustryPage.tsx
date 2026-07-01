import Link from 'next/link';
import Container from '@/components/Container';
import FaqSection from '@/components/FaqSection';
import NicheHero from '@/components/services/NicheHero';
import ServiceCtaBand from '@/components/services/ServiceCtaBand';
import SeoIndustrySpokeLinks from '@/components/services/SeoIndustrySpokeLinks';
import { SEO_CONTACT, SEO_CTA_LABEL } from '@/lib/cta';
import type { SeoIndustryPageData } from '@/lib/seo-industry-types';

const sectionHeadingClass =
  'font-futura text-[clamp(1.35rem,2.2vw,1.85rem)] font-bold leading-[1.15] text-brand-blue';

const bodyClass =
  'font-helvetica-light text-[clamp(1rem,1.15vw,1.0625rem)] leading-[1.75] text-gray-800 dark:text-gray-200';

interface SeoIndustryPageProps {
  data: SeoIndustryPageData;
}

export default function SeoIndustryPage({ data }: SeoIndustryPageProps) {
  return (
    <main className="relative min-h-screen" id="main-content">
      <NicheHero
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'SEO', href: '/seo' },
          { label: data.breadcrumbLabel },
        ]}
        heading={data.hero.heading}
        subhead={data.hero.subhead}
        bullets={data.hero.bullets}
        primaryHref={SEO_CONTACT}
        primaryLabel={SEO_CTA_LABEL}
        statCallout={data.hero.statCallout}
      />

      <section className="border-t border-gray-200 bg-white py-10 dark:border-gray-800 dark:bg-gray-950 md:py-12">
        <Container>
          <article className="mx-auto max-w-3xl">
            <p className={bodyClass}>{data.intro}</p>
          </article>
        </Container>
      </section>

      <section className="border-t border-gray-200 bg-brand-silk/60 py-14 dark:border-gray-800 dark:bg-gray-900/50 md:py-16">
        <Container>
          <div className="mx-auto max-w-3xl space-y-14">
            <div>
              <h2 className={`${sectionHeadingClass} mb-4`}>{data.painHeading}</h2>
              <p className={`${bodyClass} mb-6`}>{data.painIntro}</p>
              <ul className="space-y-4 pl-5">
                {data.painPoints.map((item) => (
                  <li key={item.title} className={`${bodyClass} list-disc`}>
                    <strong className="font-helvetica font-semibold text-gray-900 dark:text-gray-100">
                      {item.title === 'Total reliance on paid ads' ? (
                        <>
                          Total reliance on{' '}
                          <Link href="/ppc" className="text-brand-blue underline-offset-2 hover:underline">
                            paid ads
                          </Link>
                        </>
                      ) : (
                        item.title
                      )}
                    </strong>
                    {': '}
                    {item.body}
                  </li>
                ))}
              </ul>
              {data.painOutro && <p className={`${bodyClass} mt-6`}>{data.painOutro}</p>}
            </div>

            <div>
              <h2 className={`${sectionHeadingClass} mb-6`}>What we fix and how</h2>
              <ul className="space-y-5">
                {data.coverage.map((item) => (
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

            {data.proof && (
              <div>
                <h2 className={`${sectionHeadingClass} mb-4`}>{data.proof.title}</h2>
                <p className={`${bodyClass} mb-6`}>{data.proof.body}</p>
                {data.proof.quote && (
                  <blockquote className="mb-6 border-l-2 border-brand-blue pl-5">
                    <p className={`${bodyClass} italic`}>&ldquo;{data.proof.quote}&rdquo;</p>
                    {data.proof.quoteAttribution && (
                      <footer
                        className={`mt-3 ${bodyClass} not-italic font-helvetica font-medium text-gray-900 dark:text-gray-100`}
                      >
                        {data.proof.quoteAttribution}
                      </footer>
                    )}
                  </blockquote>
                )}
                {data.proof.caseStudyHref && (
                  <p className={bodyClass}>
                    <Link
                      href={data.proof.caseStudyHref}
                      className="font-medium text-brand-blue underline-offset-2 hover:underline"
                    >
                      {data.proof.caseStudyLabel ?? 'Read the case study'} →
                    </Link>
                  </p>
                )}
              </div>
            )}

            {data.workshopTestimonial && (
              <div>
                <h2 className={`${sectionHeadingClass} mb-4`}>What clients say</h2>
                <blockquote className="border-l-2 border-brand-blue pl-5">
                  <p className={`${bodyClass} italic`}>&ldquo;{data.workshopTestimonial.quote}&rdquo;</p>
                  <footer className={`mt-3 ${bodyClass} not-italic font-helvetica font-medium text-gray-900 dark:text-gray-100`}>
                    {data.workshopTestimonial.attribution}
                  </footer>
                  <p className="mt-1 text-[0.9rem] text-gray-600 dark:text-gray-400">{data.workshopTestimonial.label}</p>
                </blockquote>
              </div>
            )}

            {data.uniqueSection && (
              <div>
                <h2 className={`${sectionHeadingClass} mb-4`}>{data.uniqueSection.title}</h2>
                {data.uniqueSection.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className={`${bodyClass} mb-4`}>
                    {paragraph}
                  </p>
                ))}
                {data.uniqueSection.inlineLinks && data.uniqueSection.inlineLinks.length > 0 && (
                  <p className={bodyClass}>
                    Related:{' '}
                    {data.uniqueSection.inlineLinks.map((link, index) => (
                      <span key={link.href}>
                        {index > 0 && ' · '}
                        <Link href={link.href} className="font-medium text-brand-blue underline-offset-2 hover:underline">
                          {link.label}
                        </Link>
                      </span>
                    ))}
                  </p>
                )}
              </div>
            )}

            <div>
              <h2 className={`${sectionHeadingClass} mb-6`}>How we&apos;d start with you</h2>
              <ol className="space-y-5">
                {data.processSteps.map((step, index) => (
                  <li key={step.title} className={`${bodyClass} pl-1`}>
                    <strong className="font-helvetica font-semibold text-gray-900 dark:text-gray-100">
                      {index + 1}. {step.title}
                    </strong>{' '}
                    {step.body}
                  </li>
                ))}
              </ol>
              {data.marginNote && <p className={`${bodyClass} mt-6`}>{data.marginNote}</p>}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-14 dark:bg-gray-950 md:py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <FaqSection faqs={data.faqs} includeSchema={false} />
          </div>
        </Container>
      </section>

      <SeoIndustrySpokeLinks slug={data.slug} />

      <ServiceCtaBand
        title={data.cta.title}
        body={data.cta.body}
        buttonLabel={SEO_CTA_LABEL}
        href={SEO_CONTACT}
      />
    </main>
  );
}
