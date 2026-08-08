import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/Container';
import ServiceDesktopHeader from '@/components/ServiceDesktopHeader';
import { pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({
  title: 'Case Study: Norfolk Boards',
  description:
    'We advised Norfolk Boards to move their budget off SEO in December 2025. It carried on growing all year without us. A 20-month partnership across three websites, strategy, search and social.',
  path: '/case-studies/norfolk-boards',
});

const SEO_CONTACT = '/contact?interest=seo';

export default function NorfolkBoardsCaseStudyPage() {
  return (
    <main className="relative min-h-screen bg-brand-silk dark:bg-gray-950">
      <ServiceDesktopHeader />
      <Container className="relative z-10 pb-16 pt-[11rem] md:pb-20 md:pt-[13rem] lg:pt-[14rem]">
        <article className="mx-auto max-w-3xl">
          <p className="mb-3 font-helvetica text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-brand-blue">
            Case study
          </p>
          <h1 className="font-futura text-[clamp(2rem,3.5vw,2.85rem)] font-bold leading-[1.1] text-brand-blue">
            Norfolk Boards: the SEO stopped in December and kept growing all year
          </h1>
          <p className="mt-5 font-helvetica-light text-[clamp(1rem,1.2vw,1.1rem)] leading-[1.65] text-gray-800 dark:text-gray-200">
            A Norfolk business bringing American garden games to the British market, working with us since December 2024. Three websites, an SEO foundation, a strategy workshop that changed what they sell, and now social. We told them when to stop paying us for search.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { value: '9,804', label: 'Organic clicks, two sites' },
              { value: '768k', label: 'Impressions in 12 months' },
              { value: '31.6→12.2', label: 'Shuffleboard position' },
              { value: '10.6→6.9', label: 'Cornhole position' },
            ].map((metric) => (
              <div key={metric.label} className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
                <p className="font-futura text-[clamp(1.2rem,1.6vw,1.5rem)] font-bold text-brand-blue">{metric.value}</p>
                <p className="mt-1 font-helvetica-light text-[0.72rem] uppercase tracking-wide text-gray-600 dark:text-gray-400">{metric.label}</p>
              </div>
            ))}
          </div>

          <div className="prose-custom mt-10 space-y-8">
            <section>
              <h2 className="font-futura text-[clamp(1.25rem,1.8vw,1.5rem)] font-bold text-gray-900 dark:text-white">The situation</h2>
              <p className="mt-3 font-helvetica-light text-[0.98rem] leading-[1.7] text-gray-700 dark:text-gray-300">
                Norfolk Boards sells American garden games into the UK. They came to us in December 2024 on a recommendation from a previous agency, wanting their websites brought up to date. The sites were dated, and the business had built genuine search authority on its core product term over several years, enough to sustain a summer sales cycle, but very little beyond it. No social presence, no email activity, and a couple of years of slowing sales.
              </p>
            </section>
            <section>
              <h2 className="font-futura text-[clamp(1.25rem,1.8vw,1.5rem)] font-bold text-gray-900 dark:text-white">The strategy workshop, and what it found</h2>
              <p className="mt-3 font-helvetica-light text-[0.98rem] leading-[1.7] text-gray-700 dark:text-gray-300">
                In October 2025 we ran Think First with them, one of the first businesses to go through it. The constraint it surfaced was not the website and it was not the marketing. It was the calendar. A company selling outdoor games in Britain has a few good months and then a long wait, and no amount of marketing spend fixes a product range that only makes sense in July.
              </p>
              <p className="mt-3 font-helvetica-light text-[0.98rem] leading-[1.7] text-gray-700 dark:text-gray-300">
                Think First always ends in five recommendations. Photography was a significant one here. The biggest was to extend the range into games that sell when it rains. They have since started producing indoor and board games. In June 2026 we rebranded Norfolk Boards and rebuilt the site around the wider range, new colours and a modernised look aimed properly at the people they want to reach. It is early and they are beginning to see traction. That is a change to what the business sells, arrived at through a marketing consultation, and it is the piece of this we are proudest of.
              </p>
            </section>
            <section>
              <h2 className="font-futura text-[clamp(1.25rem,1.8vw,1.5rem)] font-bold text-gray-900 dark:text-white">What we did</h2>
              <p className="mt-3 font-helvetica-light text-[0.98rem] leading-[1.7] text-gray-700 dark:text-gray-300">
                We built three new websites, Norfolk Boards, Cornhole and Shuffleboard, replacing an ageing design and tightening the buying journey throughout. Norfolk Boards was rebuilt again in June 2026, this time with a full rebrand, turning what had been a holding page for the group into a site with a job of its own. The SEO followed, running to December 2025, deliberately through the off season and aimed at the following year: solidifying the foundations, then covering the questions buyers ask before they spend, from what the game is and how it is played through to which boards and bags to choose.
              </p>
              <p className="mt-3 font-helvetica-light text-[0.98rem] leading-[1.7] text-gray-700 dark:text-gray-300">
                From December 2025 the focus moved to social. We created their accounts and built the presence from nothing, and it reached the point where brands were approaching them about partnerships at around a hundred followers. We manage those conversations and the user-generated content that comes with them. Alongside all of it: market research, rebuilt product photography at minimal cost, content shoots, and a dormant email list brought back. We have represented them at in-person events. We meet them in Norfolk and they come up to Glasgow.
              </p>
            </section>
            <section>
              <h2 className="font-futura text-[clamp(1.25rem,1.8vw,1.5rem)] font-bold text-gray-900 dark:text-white">The outcome in search</h2>
              <p className="mt-3 font-helvetica-light text-[0.98rem] leading-[1.7] text-gray-700 dark:text-gray-300">
                Across the two sites we can measure, the group earned 9,804 organic clicks from 768,096 impressions over twelve months. Cornhole&rsquo;s average position improved from 10.6 to 6.9 with impressions up 76% season on season, and its strongest month delivered 1,156 clicks. Shuffleboard moved from an average position of 31.6 to 12.2, monthly clicks rose from 109 to 265, and click-through rate nearly doubled from 0.72% to 1.32%.
              </p>
              <p className="mt-3 font-helvetica-light text-[0.98rem] leading-[1.7] text-gray-700 dark:text-gray-300">
                The timing matters, and so does why it stopped. In December 2025 we sat down with them and agreed the search foundation was in good shape and projected to grow through the following year on its own. So we recommended moving the budget off SEO and into social, which is what we did. Almost all of the movement above happened after that point.
              </p>
              <p className="mt-3 font-helvetica-light text-[0.98rem] leading-[1.7] text-gray-700 dark:text-gray-300">
                Cornhole is seasonal, so a summer peak on its own could be argued away. Shuffleboard climbed steadily every month from December through to July, which seasonality does not explain. Two sites, one programme, both still improving long after we stopped billing for search, and growing roughly as we said they would.
              </p>
            </section>
          </div>

          <blockquote className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <p className="font-helvetica-light italic leading-[1.65] text-gray-800 dark:text-gray-200">
              &ldquo;This workshop came at exactly the right time. It was highly relevant to our business and gave us clear, actionable guidance that made a real difference. It had far more impact than any generic advice we&rsquo;d seen before.&rdquo;
            </p>
            <footer className="mt-3 font-helvetica text-[0.875rem] font-medium text-gray-600 dark:text-gray-400">
              Peter Davis, Norfolk Boards <span className="font-helvetica-light">&middot; Think First workshop testimonial</span>
            </footer>
          </blockquote>

          <p className="mt-8 font-helvetica-light text-[0.9rem] text-gray-600 dark:text-gray-400">
            Search figures taken from the client&rsquo;s own Google Search Console, covering the twelve months to 6 August 2026, for the Cornhole and Shuffleboard sites. The Norfolk Boards site is not included: it was a holding page for most of this period and only became a destination in its own right after the June 2026 rebrand, so its search history starts from there. These are seasonal businesses, so every comparison is season against matching season. The new range launched recently and it is too early to report results for it.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/think-first"
              className="inline-flex items-center justify-center rounded-lg bg-brand-blue px-6 py-3 font-helvetica font-medium text-white transition-colors hover:bg-[#006FE6]"
            >
              Explore Think First
            </Link>
            <Link href={SEO_CONTACT} className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-6 py-3 font-helvetica text-gray-800 transition-colors hover:border-brand-blue hover:text-brand-blue dark:border-gray-700 dark:text-gray-200">
              Discuss an SEO audit
            </Link>
          </div>
        </article>
      </Container>
    </main>
  );
}
