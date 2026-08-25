import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/Container';
import ServiceDesktopHeader from '@/components/ServiceDesktopHeader';
import { CONSULTICO_EMAIL } from '@/lib/contact';
import { pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({
  title: 'Sponsored Placements: How Paid Positions Work',
  description:
    'How sponsored placements work on Consultico articles: what an advertiser buys, what they do not get to decide, how we label paid positions, and why we keep editorial control.',
  path: '/sponsored-placements',
});

const sections = [
  {
    title: 'What a sponsored placement is',
    body: 'Some of our articles carry a paid position. An advertiser pays to appear in a named slot, usually the first entry in a comparison guide, for a fixed term. Every paid position is labelled where it appears, and the article says up front that one of its entries is sponsored.',
  },
  {
    title: 'What the advertiser buys',
    body: 'The position, for an agreed period. That is all. They are buying visibility on a page that people already read, not a recommendation and not a score.',
  },
  {
    title: 'What the advertiser does not get',
    body: 'They do not write the entry, they do not approve it before publication, and they have no influence over any other entry on the page, the order of the rest of the list, or which agencies appear at all. We keep the final decision on wording. If we would not stand behind a sentence, it does not go in.',
  },
  {
    title: 'How we write a sponsored entry',
    body: 'The same way we write everything else. We research the company independently, read what it publishes, and check its material against what we find. Advertisers can send us information and we will use what stands up, but we do not publish supplied copy as though we had written it. Where our research turns up something a reader should know, including price, we say so, whether or not the advertiser raised it.',
  },
  {
    title: 'Results and claims',
    body: 'No agency can independently verify the results another agency reports about its own clients, and that includes us. So where an entry cites results, we attribute them rather than assert them: these are figures the company has published or given to us, described as such. That applies to every company we write about, sponsored or not. Third-party research and statistics are held to a stricter standard and are checked against the original source before we cite them.',
  },
  {
    title: 'Links',
    body: 'Links to an advertiser from a paid placement carry a rel="sponsored" attribute, so they pass no ranking credit. This is what Google requires of paid links, and it is enforced in our build rather than left to whoever edits the page next.',
  },
  {
    title: 'When a placement ends',
    body: 'Every placement has an end date recorded against it. When the paid term is over, the placement comes down. Our build fails if a placement outlives its term, so a finished arrangement cannot quietly keep running as a free advert.',
  },
  {
    title: 'Why we do it this way',
    body: 'A comparison guide is only worth reading, and therefore only worth advertising in, if readers can trust the parts that were not paid for. Selling the ranking itself would destroy the thing being sold. Labelling the paid position clearly is what keeps the rest of the page honest.',
  },
];

export default function SponsoredPlacementsPage() {
  return (
    <main className="relative min-h-screen bg-brand-silk dark:bg-gray-950">
      <ServiceDesktopHeader />
      <Container className="relative z-10 pb-16 pt-[11rem] md:pb-20 md:pt-[13rem] lg:pt-[14rem]">
        <article className="mx-auto max-w-3xl">
          <p className="mb-3 font-helvetica text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-brand-blue">
            Editorial
          </p>
          <h1 className="font-futura text-[clamp(2rem,3vw,2.75rem)] font-bold text-brand-blue">
            How sponsored placements work
          </h1>
          <p className="mt-4 font-helvetica-light text-[0.95rem] text-gray-600 dark:text-gray-400">
            Last updated: August 2026.
          </p>

          <p className="mt-6 font-helvetica-light text-[clamp(0.95rem,1.1vw,1.05rem)] leading-[1.7] text-gray-700 dark:text-gray-300">
            A few of our comparison articles carry a paid position. This page sets out exactly what that
            means, so you can read those articles knowing which part was bought and which part was not.
          </p>

          <div className="mt-10 space-y-8">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="font-futura text-[clamp(1.2rem,1.8vw,1.5rem)] font-bold text-gray-900 dark:text-white">
                  {section.title}
                </h2>
                <p className="mt-3 font-helvetica-light text-[clamp(0.95rem,1.1vw,1.05rem)] leading-[1.7] text-gray-700 dark:text-gray-300">
                  {section.body}
                </p>
              </section>
            ))}
          </div>

          <p className="mt-10 font-helvetica-light text-[0.95rem] text-gray-700 dark:text-gray-300">
            Enquiries about placements:{' '}
            <a href={`mailto:${CONSULTICO_EMAIL}`} className="text-brand-blue hover:underline">
              {CONSULTICO_EMAIL}
            </a>
            . See also our{' '}
            <Link href="/terms" className="text-brand-blue hover:underline">
              Terms &amp; Conditions
            </Link>
            .
          </p>
        </article>
      </Container>
    </main>
  );
}
