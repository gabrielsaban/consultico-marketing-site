import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/Container';
import ServiceDesktopHeader from '@/components/ServiceDesktopHeader';
import SeoIndustryGrid from '@/components/services/SeoIndustryGrid';
import ServiceCtaBand from '@/components/services/ServiceCtaBand';
import { SEO_BY_INDUSTRY_PATH, getLiveSeoIndustries } from '@/lib/seo-industries';
import { pageMeta } from '@/lib/seo';
import { seoByIndustryPageJsonLd, serializeJsonLd } from '@/lib/schema';

const SEO_CONTACT = '/contact?interest=seo';
const SEO_CTA_LABEL = 'Start with an SEO audit';

const sectionHeadingClass =
  'font-futura text-[clamp(1.35rem,2.2vw,1.85rem)] font-bold leading-[1.15] text-brand-blue';

const bodyClass = 'font-helvetica-light text-[clamp(1rem,1.15vw,1.0625rem)] leading-[1.75] text-gray-800 dark:text-gray-200';

export const metadata: Metadata = pageMeta({
  title: 'SEO by Industry | Trades, Services, Healthcare | Consultico',
  description:
    'Industry-specific SEO for trades, professional services and healthcare businesses across the UK. Pick your sector and see how we approach the search.',
  path: SEO_BY_INDUSTRY_PATH,
  absoluteTitle: true,
});

export default function SeoByIndustryPage() {
  const liveIndustries = getLiveSeoIndustries();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(seoByIndustryPageJsonLd()) }}
      />
      <main className="relative min-h-screen" id="main-content">
        <section className="relative pb-12 md:pb-16" aria-labelledby="seo-by-industry-heading">
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
                <li className="text-gray-800 dark:text-gray-200">SEO by Industry</li>
              </ol>
            </nav>

            <article className="mx-auto max-w-3xl">
              <h1
                id="seo-by-industry-heading"
                className="mb-6 font-futura text-[clamp(2rem,3.2vw,2.75rem)] font-bold leading-[1.1] text-brand-blue"
              >
                SEO by Industry
              </h1>

              <p className={`mb-8 ${bodyClass}`}>
                Different industries search differently, compete differently, and convert on different terms. A plumber
                winning the map pack for emergency callouts needs a different SEO plan than an electrician or a heating
                engineer chasing boiler installs. Consultico builds industry-specific SEO for trades and service
                businesses across the UK: strategy-led, margin-aware, and tied to booked jobs rather than vanity
                rankings. This hub groups our SEO guidance by sector so you can see how we approach your market, what we
                fix first, and what proof we have for businesses like yours. Each page covers the local search signals,
                website work, and content that matter for that trade. We start with your numbers and your area, then
                prioritise the changes that move enquiries fastest. More industry pages are added as we publish
                sector-specific playbooks; explore the live guides below, or read our{' '}
                <Link href="/seo" className="font-medium text-brand-blue underline-offset-2 hover:underline">
                  main SEO service overview
                </Link>{' '}
                if you want the full picture first.
              </p>
            </article>
          </Container>
        </section>

        <section className="border-t border-gray-200 bg-brand-silk/60 py-14 dark:border-gray-800 dark:bg-gray-900/50 md:py-16">
          <Container>
            <div className="mx-auto max-w-5xl">
              <h2 className={`${sectionHeadingClass} mb-8`}>Industry SEO guides</h2>
              <SeoIndustryGrid industries={liveIndustries} />
            </div>
          </Container>
        </section>

        <ServiceCtaBand
          title="Not sure where to start?"
          body="Book an SEO audit and we will show you what to fix first for your industry and your area."
          buttonLabel={SEO_CTA_LABEL}
          href={SEO_CONTACT}
        />
      </main>
    </>
  );
}
