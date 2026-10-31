import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Container from '@/components/Container';
import ServiceDesktopHeader from '@/components/ServiceDesktopHeader';
import { pageMeta } from '@/lib/seo';
import { CASE_STUDIES, getCaseStudy } from '@/lib/case-studies';
import { caseStudyPageJsonLd, serializeJsonLd } from '@/lib/schema';

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

// Every case study is in the registry, so anything else is a 404 rather than
// a page rendered on demand with nothing in it.
export const dynamicParams = false;

export function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: 'Case study not found' };

  return pageMeta({
    title: study.metaTitle,
    description: study.metaDescription,
    path: `/case-studies/${study.slug}`,
  });
}

const PRIMARY_BUTTON =
  'inline-flex items-center justify-center rounded-lg bg-brand-blue px-6 py-3 font-helvetica font-medium text-white transition-colors hover:bg-[#006FE6]';
const SECONDARY_BUTTON =
  'inline-flex items-center justify-center rounded-lg border border-gray-300 px-6 py-3 font-helvetica text-gray-800 transition-colors hover:border-brand-blue hover:text-brand-blue dark:border-gray-700 dark:text-gray-200';

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return (
    <main className="relative min-h-screen bg-brand-silk dark:bg-gray-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(caseStudyPageJsonLd(study)) }}
      />
      <ServiceDesktopHeader />
      <Container className="relative z-10 pb-16 pt-[11rem] md:pb-20 md:pt-[13rem] lg:pt-[14rem]">
        <article className="mx-auto max-w-3xl">
          <p className="mb-3 font-helvetica text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-brand-blue">
            Case study <span className="text-gray-500 dark:text-gray-400">&middot; {study.sector}</span>
          </p>
          <h1 className="font-futura text-[clamp(2rem,3.5vw,2.85rem)] font-bold leading-[1.1] text-brand-blue">
            {study.headline}
          </h1>
          <p className="mt-5 font-helvetica-light text-[clamp(1rem,1.2vw,1.1rem)] leading-[1.65] text-gray-800 dark:text-gray-200">
            {study.intro}
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {study.metrics.map((metric) => (
              <div key={metric.label} className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
                <p className="font-futura text-[clamp(1.1rem,1.5vw,1.4rem)] font-bold leading-tight text-brand-blue">{metric.value}</p>
                <p className="mt-1 font-helvetica-light text-[0.72rem] uppercase tracking-wide text-gray-600 dark:text-gray-400">{metric.label}</p>
              </div>
            ))}
          </div>

          <div className="prose-custom mt-10 space-y-8">
            {study.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-futura text-[clamp(1.25rem,1.8vw,1.5rem)] font-bold text-gray-900 dark:text-white">
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="mt-3 font-helvetica-light text-[0.98rem] leading-[1.7] text-gray-700 dark:text-gray-300">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>

          {study.quote && (
            <blockquote className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              <p className="font-helvetica-light italic leading-[1.65] text-gray-800 dark:text-gray-200">
                &ldquo;{study.quote.text}&rdquo;
              </p>
              <footer className="mt-3 font-helvetica text-[0.875rem] font-medium text-gray-600 dark:text-gray-400">
                {study.quote.attribution}
              </footer>
            </blockquote>
          )}

          {study.sourceNote && (
            <p className="mt-8 font-helvetica-light text-[0.9rem] text-gray-600 dark:text-gray-400">{study.sourceNote}</p>
          )}

          <div className="mt-10 flex flex-wrap gap-4">
            <Link href={study.primaryCta.href} className={PRIMARY_BUTTON}>
              {study.primaryCta.label}
            </Link>
            {study.secondaryCta && (
              <Link href={study.secondaryCta.href} className={SECONDARY_BUTTON}>
                {study.secondaryCta.label}
              </Link>
            )}
            <Link href="/case-studies" className={SECONDARY_BUTTON}>
              More case studies
            </Link>
          </div>
        </article>
      </Container>
    </main>
  );
}
