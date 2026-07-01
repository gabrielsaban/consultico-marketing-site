import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/Container';
import FaqSection from '@/components/FaqSection';
import ServiceDesktopHeader from '@/components/ServiceDesktopHeader';
import ServiceCtaBand from '@/components/services/ServiceCtaBand';
import {
  CONSULTICO_EMAIL,
  CONSULTICO_GBP_URL,
  CONSULTICO_PHONE_DISPLAY,
  CONSULTICO_PHONE_TEL,
} from '@/lib/contact';
import { pageMeta } from '@/lib/seo';
import { GLASGOW_SEO_COVERAGE, SEO_GLASGOW_FAQS, SEO_GLASGOW_PATH } from '@/lib/seo-glasgow';
import { seoGlasgowPageJsonLd, serializeJsonLd } from '@/lib/schema';

const SEO_CONTACT = '/contact?interest=seo';
const SEO_CTA_LABEL = 'Start with an SEO audit';

const MAP_EMBED_SRC =
  'https://www.google.com/maps?q=Consultico,50+Richmond+Street,Glasgow,G1+1XN&z=15&output=embed';

export const metadata: Metadata = pageMeta({
  title: 'SEO Agency in Glasgow | Consultico',
  description:
    'Glasgow-based SEO agency helping businesses across the city and central Scotland get found on Google and AI search. Strategy-led, honest, results that compound.',
  path: SEO_GLASGOW_PATH,
  absoluteTitle: true,
});

const sectionHeadingClass =
  'font-futura text-[clamp(1.35rem,2.2vw,1.85rem)] font-bold leading-[1.15] text-brand-blue';

const bodyClass = 'font-helvetica-light text-[clamp(1rem,1.15vw,1.0625rem)] leading-[1.75] text-gray-800 dark:text-gray-200';

export default function SeoGlasgowPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(seoGlasgowPageJsonLd()) }}
      />
      <main className="relative min-h-screen" id="main-content">
        <section className="relative pb-12 md:pb-16" aria-labelledby="seo-glasgow-heading">
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
                <li className="text-gray-800 dark:text-gray-200">SEO Agency in Glasgow</li>
              </ol>
            </nav>

            <article className="mx-auto max-w-3xl">
              <h1
                id="seo-glasgow-heading"
                className="mb-6 font-futura text-[clamp(2rem,3.2vw,2.75rem)] font-bold leading-[1.1] text-brand-blue"
              >
                SEO Agency in Glasgow
              </h1>

              <p className={`mb-8 ${bodyClass}`}>
                Consultico is a Glasgow-based SEO agency, working from Strathclyde Inspire at 50 Richmond Street. We
                help businesses across Glasgow and central Scotland get found on Google, and increasingly inside AI
                search tools like ChatGPT, Perplexity and Google&apos;s AI Overviews. Our approach is strategy-led: we
                start with your numbers, your margins and the searches your customers actually make, then build the
                technical foundations, on-page content and authority that move you there. SEO done well compounds, so
                the cost of winning a new customer falls as your visibility grows. If you want a Glasgow SEO partner
                who sets honest expectations and ties rankings to real enquiries rather than vanity metrics,
                that&apos;s what we do.
              </p>

              <div className="mb-10 rounded-xl border border-gray-200 bg-white/90 p-5 dark:border-gray-700 dark:bg-gray-950/80">
                <p className="mb-2 font-helvetica text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-gray-600 dark:text-gray-400">
                  Contact
                </p>
                <p className={`${bodyClass} text-[0.98rem]`}>
                  <strong className="font-helvetica font-semibold text-gray-900 dark:text-gray-100">Consultico</strong>
                  {' · '}
                  Strathclyde Inspire, 50 Richmond Street, Glasgow, G1 1XN
                  {' · '}
                  <a href={CONSULTICO_PHONE_TEL} className="text-brand-blue hover:underline">
                    {CONSULTICO_PHONE_DISPLAY}
                  </a>
                  {' · '}
                  <a href={`mailto:${CONSULTICO_EMAIL}`} className="text-brand-blue hover:underline">
                    {CONSULTICO_EMAIL}
                  </a>
                </p>
              </div>
            </article>
          </Container>
        </section>

        <section className="border-t border-gray-200 bg-brand-silk/60 py-14 dark:border-gray-800 dark:bg-gray-900/50 md:py-16">
          <Container>
            <div className="mx-auto max-w-3xl space-y-14">
              <div>
                <h2 className={`${sectionHeadingClass} mb-4`}>Why Glasgow businesses lose customers to search</h2>
                <p className={bodyClass}>
                  Most Glasgow businesses don&apos;t have a demand problem, they have a visibility problem. People are
                  searching for what you sell. The only question is whether they find you, or the competitor two streets
                  over. When someone searches for a service in Glasgow, Google leans heavily on local signals: a
                  complete Google Business Profile, consistent business details across the web, genuine reviews, and a
                  website that clearly answers the searcher&apos;s question. Miss those and you stay invisible.
                  That&apos;s where our work is. We fix the technical and local signals that decide whether you show up
                  in the Glasgow map pack and the organic results beneath it.
                </p>
              </div>

              <div>
                <h2 className={`${sectionHeadingClass} mb-6`}>What our Glasgow SEO covers</h2>
                <ul className="space-y-5">
                  {GLASGOW_SEO_COVERAGE.map((item) => (
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
                <h2 className={`${sectionHeadingClass} mb-4`}>Glasgow roots, work across the UK</h2>
                <p className={bodyClass}>
                  We&apos;re based in Glasgow, but search doesn&apos;t stop at the city boundary. Many of our clients sell
                  across the UK, so we balance the local searches that bring in nearby customers with the broader,
                  higher-volume terms that grow the business nationally. Being local means we can meet in person when it
                  helps, at our Strathclyde Inspire office or yours. Most of the work, though, happens remotely and
                  transparently, with reporting you can actually read.
                </p>
              </div>

              <div>
                <h2 className={`${sectionHeadingClass} mb-4`}>Proof it works</h2>
                <p className={bodyClass}>
                  We treat SEO as a long-term asset, not rented traffic. For The Boiler Co, a Bristol-based trades
                  business, we built an SEO foundation around high-intent boiler-service searches. Within three months
                  their calendar was filling through organic search alone: typical weekly performance moved from roughly
                  6,000 impressions and 20 clicks to 21,000 impressions and 58 clicks, with higher-intent visitors
                  turning into booked jobs. They&apos;ve stayed with us for over 14 months with additional website work
                  since. That work was delivered remotely from Glasgow, the same way we support clients across the UK.
                  We also hold 11 five-star reviews on Google, and the thinking behind our strategy work was developed
                  with research funding from a 2025 University of Strathclyde Inspire fellowship.
                </p>
              </div>

              <div>
                <h2 className={`${sectionHeadingClass} mb-4`}>How we work with Glasgow businesses</h2>
                <p className={bodyClass}>
                  Every engagement starts with an audit: your site, your market, your competitors and the searches that
                  matter, so you know what to fix first and why. From there we prioritise the changes that move the
                  needle, implement them, and measure what shifts. No vanity metrics, no guaranteed rankings, just an
                  honest plan and steady, compounding progress.
                </p>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-14 md:py-16" aria-label="Office location">
          <Container>
            <div className="mx-auto max-w-3xl">
              <h2 className={`${sectionHeadingClass} mb-4`}>Find us in Glasgow</h2>
              <p className={`${bodyClass} mb-6`}>
                Our office is at Strathclyde Inspire in Glasgow city centre.{' '}
                <a href={CONSULTICO_GBP_URL} className="text-brand-blue hover:underline" target="_blank" rel="noreferrer">
                  View on Google Maps
                </a>
                .
              </p>
              <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm dark:border-gray-700">
                <iframe
                  title="Consultico office location on Google Maps"
                  src={MAP_EMBED_SRC}
                  className="h-[360px] w-full border-0 md:h-[420px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-white py-14 dark:bg-gray-950 md:py-16">
          <Container>
            <div className="mx-auto max-w-3xl">
              <FaqSection faqs={[...SEO_GLASGOW_FAQS]} includeSchema={false} />
              <p className="mt-10 font-helvetica text-[0.85rem] leading-[1.6] text-gray-600 dark:text-gray-400">
                Based in Glasgow city centre and working with businesses across the West End, Southside, and the wider
                central Scotland and Strathclyde area, as well as clients UK-wide.
              </p>
            </div>
          </Container>
        </section>

        <ServiceCtaBand
          title="Want to be found by more customers in Glasgow?"
          body="Book a free SEO audit and we'll show you what's blocking your visibility, and what to fix first."
          buttonLabel={SEO_CTA_LABEL}
          href={SEO_CONTACT}
        />
      </main>
    </>
  );
}
