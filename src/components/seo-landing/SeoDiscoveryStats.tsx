import Container from '@/components/Container';
import { SEO_LANDING_STATS } from '@/lib/seo-landing-content';

function StatIcon({ type }: { type: (typeof SEO_LANDING_STATS)[number]['icon'] }) {
  const common = 'h-8 w-8 text-brand-blue';
  switch (type) {
    case 'pages':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <rect x="5" y="3" width="14" height="18" rx="2" />
          <path d="M8 8h8M8 12h8M8 16h5" />
        </svg>
      );
    case 'ai':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
          <circle cx="12" cy="12" r="3.5" />
        </svg>
      );
    case 'impressions':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
          <circle cx="12" cy="12" r="2.5" />
        </svg>
      );
    case 'rankings':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M12 8v8M9 11h6" />
        </svg>
      );
  }
}

export default function SeoDiscoveryStats() {
  return (
    <section className="bg-white py-8 dark:bg-gray-950 md:py-10" aria-label="Results at a glance">
      <Container>
        <ul className="mx-auto grid max-w-[71.25rem] grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {SEO_LANDING_STATS.map((stat) => (
            <li
              key={stat.label}
              className="flex min-h-[10.5rem] flex-col rounded-[1.4rem] bg-[#F4F4F4] px-4 py-5 dark:bg-gray-900 md:min-h-[13rem] md:px-6 md:py-7"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-md border border-brand-blue/35">
                <StatIcon type={stat.icon} />
              </div>
              <p className="font-helvetica text-[clamp(2rem,4vw,3.4rem)] font-bold leading-none tracking-[-0.04em] text-[#212426] dark:text-white">
                {stat.value}
              </p>
              <p className="mt-3 max-w-[9rem] font-helvetica text-[0.95rem] font-bold leading-[1.2] tracking-[-0.02em] text-brand-blue md:text-[1.05rem]">
                {stat.label}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
