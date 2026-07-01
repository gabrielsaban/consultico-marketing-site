import Link from 'next/link';
import type { SeoIndustryEntry } from '@/lib/seo-industries';
import { getIndustryPath } from '@/lib/seo-industries';

interface SeoIndustryGridProps {
  industries: SeoIndustryEntry[];
  className?: string;
}

export default function SeoIndustryGrid({ industries, className = '' }: SeoIndustryGridProps) {
  if (industries.length === 0) {
    return null;
  }

  return (
    <div className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {industries.map((industry) => (
        <Link
          key={industry.slug}
          href={getIndustryPath(industry)}
          className="group flex h-full flex-col rounded-xl border border-gray-200 bg-white/85 p-5 shadow-sm transition-colors hover:border-brand-blue/40 dark:border-gray-700 dark:bg-gray-950/80"
        >
          <p className="mb-1 font-helvetica text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-brand-blue">
            {industry.category}
          </p>
          <h3 className="font-futura text-[1.05rem] font-bold text-gray-900 transition-colors group-hover:text-brand-blue dark:text-gray-100">
            {industry.label}
          </h3>
          <p className="mt-3 flex-1 font-helvetica-light text-[0.95rem] leading-[1.6] text-gray-700 dark:text-gray-300">
            {industry.blurb}
          </p>
          <span className="mt-4 font-helvetica text-[0.88rem] font-medium text-brand-blue group-hover:underline">
            Read more →
          </span>
        </Link>
      ))}
    </div>
  );
}
