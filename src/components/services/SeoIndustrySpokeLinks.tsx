import Link from 'next/link';
import { SEO_BY_INDUSTRY_PATH, getIndustryPath, getRelatedLiveIndustries } from '@/lib/seo-industries';

interface SeoIndustrySpokeLinksProps {
  slug: string;
  className?: string;
}

const bodyClass = 'font-helvetica-light text-[clamp(1rem,1.15vw,1.0625rem)] leading-[1.75] text-gray-800 dark:text-gray-200';

export default function SeoIndustrySpokeLinks({ slug, className = '' }: SeoIndustrySpokeLinksProps) {
  const related = getRelatedLiveIndustries(slug);

  return (
    <section className={`border-t border-gray-200 bg-brand-silk/50 py-10 dark:border-gray-800 dark:bg-gray-900/40 ${className}`}>
      <div className="mx-auto max-w-3xl space-y-6 px-4 sm:px-0">
        <p className={`text-center ${bodyClass}`}>
          Part of our{' '}
          <Link href="/seo" className="font-medium text-brand-blue underline-offset-2 hover:underline">
            SEO services
          </Link>{' '}
          and{' '}
          <Link href={SEO_BY_INDUSTRY_PATH} className="font-medium text-brand-blue underline-offset-2 hover:underline">
            SEO by industry
          </Link>{' '}
          hub.
        </p>

        {related.length > 0 && (
          <div>
            <h2 className="mb-4 text-center font-futura text-[clamp(1.15rem,1.8vw,1.35rem)] font-bold text-brand-blue">
              Related industries
            </h2>
            <ul className="flex flex-wrap justify-center gap-3">
              {related.map((industry) => (
                <li key={industry.slug}>
                  <Link
                    href={getIndustryPath(industry)}
                    className="inline-flex rounded-lg border border-gray-200 bg-white px-4 py-2 font-helvetica text-[0.9rem] font-medium text-brand-blue transition-colors hover:border-brand-blue/40 hover:bg-brand-silk/50 dark:border-gray-700 dark:bg-gray-950"
                  >
                    {industry.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
