import Link from 'next/link';
import type { ResolvedArticleCta } from '@/lib/articles/cta';

interface ArticleSidebarCtaProps {
  cta: ResolvedArticleCta;
}

export default function ArticleSidebarCta({ cta }: ArticleSidebarCtaProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-brand-blue/25 bg-gradient-to-br from-white via-white to-brand-blue/[0.08] shadow-[0_10px_30px_rgba(0,123,255,0.12)] dark:border-brand-blue/30 dark:from-gray-900 dark:via-gray-900 dark:to-brand-blue/10 dark:shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
      <div className="border-b border-brand-blue/10 bg-brand-blue/[0.06] px-5 py-3 dark:border-brand-blue/20 dark:bg-brand-blue/10">
        <p className="font-helvetica text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-brand-blue">
          {cta.eyebrow}
        </p>
      </div>
      <div className="p-5">
        <h3 className="mb-2 font-futura text-[1.15rem] font-bold leading-[1.2] text-brand-blue">
          {cta.title}
        </h3>
        <p className="mb-5 font-helvetica-light text-[0.9rem] leading-[1.6] text-gray-700 dark:text-gray-300">
          {cta.body}
        </p>
        <Link
          href={cta.href}
          className="inline-flex w-full items-center justify-center rounded-lg bg-brand-blue px-4 py-2.5 font-helvetica text-[0.9rem] font-medium text-white transition-colors hover:bg-brand-blue/90"
        >
          {cta.label}
        </Link>
      </div>
    </div>
  );
}
