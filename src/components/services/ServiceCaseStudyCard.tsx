import Image from 'next/image';
import Link from 'next/link';

export interface CaseStudyMetric {
  value: string;
  label: string;
}

export interface ServiceCaseStudyCardProps {
  title: string;
  category: string;
  image: string;
  imageAlt: string;
  situation: string;
  outcome: string;
  metrics: CaseStudyMetric[];
  quote?: string;
  attribution?: string;
  caseStudyHref: string;
}

export default function ServiceCaseStudyCard({
  title,
  category,
  image,
  imageAlt,
  situation,
  outcome,
  metrics,
  quote,
  attribution,
  caseStudyHref,
}: ServiceCaseStudyCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_10px_28px_rgba(0,0,0,0.08)] dark:border-gray-800 dark:bg-gray-950">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div className="relative min-h-[16rem] lg:min-h-full">
          <Image src={image} alt={imageAlt} fill className="object-cover" sizes="(min-width: 1024px) 45vw, 100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/20" />
          <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 font-helvetica text-[0.75rem] font-semibold uppercase tracking-wide text-brand-blue">
            {category}
          </div>
        </div>

        <div className="p-6 md:p-8 lg:p-10">
          <h3 className="font-futura text-[clamp(1.5rem,2.2vw,2rem)] font-bold text-brand-blue">{title}</h3>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            {metrics.map((metric) => (
              <div key={metric.label} className="rounded-lg border border-gray-200 bg-brand-silk/60 p-3 dark:border-gray-800 dark:bg-gray-900">
                <p className="font-futura text-[clamp(1.1rem,1.4vw,1.35rem)] font-bold leading-none text-brand-blue">{metric.value}</p>
                <p className="mt-1 font-helvetica-light text-[0.7rem] uppercase tracking-wide text-gray-600 dark:text-gray-400">{metric.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <p className="mb-1 font-helvetica text-[0.75rem] font-semibold uppercase tracking-wide text-brand-blue">The situation</p>
              <p className="font-helvetica-light text-[0.95rem] leading-[1.65] text-gray-700 dark:text-gray-300">{situation}</p>
            </div>
            <div>
              <p className="mb-1 font-helvetica text-[0.75rem] font-semibold uppercase tracking-wide text-brand-blue">The outcome</p>
              <p className="font-helvetica-light text-[0.95rem] leading-[1.65] text-gray-700 dark:text-gray-300">{outcome}</p>
            </div>
          </div>

          {quote && (
            <blockquote className="mt-6 border-l-4 border-brand-blue pl-4 font-helvetica-light italic text-gray-800 dark:text-gray-200">
              &ldquo;{quote}&rdquo;
              {attribution && (
                <footer className="mt-2 not-italic font-helvetica text-[0.875rem] font-medium text-gray-600 dark:text-gray-400">
                  {attribution}
                </footer>
              )}
            </blockquote>
          )}

          <Link
            href={caseStudyHref}
            className="mt-8 inline-flex items-center gap-2 font-helvetica font-medium text-brand-blue hover:underline"
          >
            Read full case study
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
