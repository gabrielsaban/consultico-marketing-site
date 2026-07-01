import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/Container';
import FaqSection from '@/components/FaqSection';
import ServiceDesktopHeader from '@/components/ServiceDesktopHeader';
import ServiceCtaBand from '@/components/services/ServiceCtaBand';
import SeoIndustrySpokeLinks from '@/components/services/SeoIndustrySpokeLinks';
import { pageMeta } from '@/lib/seo';
import {
  ESTATE_AGENT_SEO_COVERAGE,
  ESTATE_AGENT_SEO_PAIN_POINTS,
  ESTATE_AGENT_SEO_PROCESS_STEPS,
  ESTATE_AGENT_WORKSHOP_TESTIMONIAL,
  SEO_FOR_ESTATE_AGENTS_FAQS,
  SEO_FOR_ESTATE_AGENTS_PATH,
  SEO_FOR_ESTATE_AGENTS_SLUG,
} from '@/lib/seo-for-estate-agents';
import { seoForEstateAgentsPageJsonLd, serializeJsonLd } from '@/lib/schema';

const SEO_CONTACT = '/contact?interest=seo';
const SEO_CTA_LABEL = 'Book a call';

const sectionHeadingClass =
  'font-futura text-[clamp(1.35rem,2.2vw,1.85rem)] font-bold leading-[1.15] text-brand-blue';

const bodyClass = 'font-helvetica-light text-[clamp(1rem,1.15vw,1.0625rem)] leading-[1.75] text-gray-800 dark:text-gray-200';

export const metadata: Metadata = pageMeta({
  title: 'SEO for Estate Agents | Win More Instructions | Consultico',
  description:
    'SEO for estate agents that wins more vendor instructions, not just portal clicks. Strategy-led, tied to your fee per instruction. UK-wide.',
  path: SEO_FOR_ESTATE_AGENTS_PATH,
  absoluteTitle: true,
});

export default function SeoForEstateAgentsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(seoForEstateAgentsPageJsonLd()) }}
      />
      <main className="relative min-h-screen" id="main-content">
        <section className="relative pb-12 md:pb-16" aria-labelledby="seo-for-estate-agents-heading">
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
                <li className="text-gray-800 dark:text-gray-200">SEO for Estate Agents</li>
              </ol>
            </nav>

            <article className="mx-auto max-w-3xl">
              <h1
                id="seo-for-estate-agents-heading"
                className="mb-6 font-futura text-[clamp(2rem,3.2vw,2.75rem)] font-bold leading-[1.1] text-brand-blue"
              >
                SEO for Estate Agents
              </h1>

              <p className={`mb-8 ${bodyClass}`}>
                Consultico is a strategy-led marketing consultancy, and our SEO for estate agents is built to win one
                thing: more instructions. Most agents do not need more buyers, because Rightmove and Zoopla already own
                the buyer&apos;s attention. What they need is vendors and landlords choosing them to sell and to let,
                and that decision now happens on Google first. Almost half of home sellers, 49 percent, invite three
                agents to value their home before choosing one (Zoopla, 2025), and they shortlist those agents by
                searching your name, reading your reviews and judging your local presence long before they call. If
                your website is thin, your Google Business Profile is quiet and your reviews are stale, you lose the
                instruction before the valuation is even booked. We fix that: the local pages, reviews and search
                visibility that put you in front of vendors at the moment they decide who to trust with their biggest
                asset.
              </p>
            </article>
          </Container>
        </section>

        <section className="border-t border-gray-200 bg-brand-silk/60 py-14 dark:border-gray-800 dark:bg-gray-900/50 md:py-16">
          <Container>
            <div className="mx-auto max-w-3xl space-y-14">
              <div>
                <h2 className={`${sectionHeadingClass} mb-4`}>
                  Why estate agents lose instructions they should be winning
                </h2>
                <p className={`${bodyClass} mb-6`}>
                  When a homeowner decides to sell or let, they do not walk into the nearest branch. They search, they
                  compare, and they invite two or three agents to value. If you are not visible and convincing at that
                  moment, the instruction goes to an agent who is not necessarily better, just easier to find and
                  quicker to trust. Three things usually cost agents those instructions:
                </p>
                <ul className="space-y-4 pl-5">
                  {ESTATE_AGENT_SEO_PAIN_POINTS.map((item) => (
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
                  SEO is how you stop competing on someone else&apos;s platform and start owning the searches that bring
                  vendors to you.
                </p>
              </div>

              <div>
                <h2 className={`${sectionHeadingClass} mb-6`}>What our SEO for estate agents covers</h2>
                <ul className="space-y-5">
                  {ESTATE_AGENT_SEO_COVERAGE.map((item) => (
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
                  Consultico does not win instructions with a bigger ad budget. We win them by fixing the foundations
                  that make a vendor choose you: a complete Google Business Profile, local pages that show real area
                  knowledge, a steady review habit and a website that answers what sellers and landlords actually ask.
                  It is the same approach we run in our{' '}
                  <Link href="/think-first" className="font-medium text-brand-blue underline-offset-2 hover:underline">
                    Think First strategy workshop
                  </Link>
                  , developed with a 2025 University of Strathclyde Inspire fellowship, where the representative pattern
                  for local-service businesses has been roughly three times online revenue within six months, with every
                  marketing channel made measurable so nothing is left to guesswork.
                </p>
                <blockquote className="mb-6 border-l-2 border-brand-blue pl-5">
                  <p className={`${bodyClass} italic`}>&ldquo;{ESTATE_AGENT_WORKSHOP_TESTIMONIAL.quote}&rdquo;</p>
                  <footer className={`mt-3 ${bodyClass} not-italic`}>
                    <p className="font-helvetica font-medium text-gray-900 dark:text-gray-100">
                      {ESTATE_AGENT_WORKSHOP_TESTIMONIAL.name}, {ESTATE_AGENT_WORKSHOP_TESTIMONIAL.company}
                    </p>
                    <p className="mt-1 text-[0.9rem] text-gray-600 dark:text-gray-400">
                      Think First workshop testimonial
                    </p>
                  </footer>
                </blockquote>
                <p className={bodyClass}>
                  We are margin-aware by default. Tell us your average fee per instruction and we will tell you honestly
                  whether SEO earns its place for your agency.
                </p>
              </div>

              <div>
                <h2 className={`${sectionHeadingClass} mb-6`}>How we&apos;d start with you</h2>
                <ol className="space-y-5">
                  {ESTATE_AGENT_SEO_PROCESS_STEPS.map((step, index) => (
                    <li key={step.title} className={`${bodyClass} pl-1`}>
                      <strong className="font-helvetica font-semibold text-gray-900 dark:text-gray-100">
                        {index + 1}. {step.title}
                      </strong>{' '}
                      {step.body}
                    </li>
                  ))}
                </ol>
                <p className={`${bodyClass} mt-6`}>
                  We are margin-aware by default: when a single instruction can be worth thousands in fees, the maths on
                  a few extra a month is usually straightforward, and if it is not worth it for you, we will tell you.
                </p>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-white py-14 dark:bg-gray-950 md:py-16">
          <Container>
            <div className="mx-auto max-w-3xl">
              <FaqSection faqs={[...SEO_FOR_ESTATE_AGENTS_FAQS]} includeSchema={false} />
            </div>
          </Container>
        </section>

        <SeoIndustrySpokeLinks slug={SEO_FOR_ESTATE_AGENTS_SLUG} />

        <ServiceCtaBand
          title="Win more instructions from Google"
          body="Tell us your average fee per instruction and the area you cover, and we will tell you honestly whether SEO is worth it for your agency, and where the quickest wins are."
          buttonLabel={SEO_CTA_LABEL}
          href={SEO_CONTACT}
        />
      </main>
    </>
  );
}
