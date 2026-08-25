import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/Container';
import ServiceDesktopHeader from '@/components/ServiceDesktopHeader';
import { CONSULTICO_EMAIL } from '@/lib/contact';
import { pageMeta } from '@/lib/seo';

const PLACEMENT_SUBJECT = 'Sponsored Placements';

export const metadata: Metadata = pageMeta({
  title: 'Advertise With Us: Sponsored Placements',
  description:
    'How paid placements work in Consultico comparison guides: what a brand buys, what stays under our editorial control, how we label them, and how to get featured.',
  path: '/sponsored-placements',
});

/**
 * Two audiences on one page: readers working out which part of a guide was paid
 * for, and brands working out whether to buy a placement. Reader questions come
 * first, because the credibility they are checking is the thing being sold.
 *
 * Headings are written as the questions each audience would actually ask, since
 * this is the page we want surfaced when someone asks an AI engine how to get
 * featured in a roundup.
 */
const sections: { q: string; a: string[] }[] = [
  {
    q: 'Can I pay to be featured?',
    a: [
      "Sometimes, yes. Brands get in touch fairly often, usually because they have read something of ours and want to be in it, and we are happy to have that conversation. A few of our comparison guides carry a paid position.",
      "What you would be buying is the slot, not the verdict. We still research and write the entry ourselves, you can send us anything you think we should see, and we will use what stands up. If we would not say it about a company that had not paid us, it does not go in.",
    ],
  },
  {
    q: 'What does a sponsored placement actually get you?',
    a: [
      "A named position in a guide people already read, for an agreed period, written up properly rather than pasted in.",
      "Because we research the entry rather than reprint a press release, sponsored entries often end up longer than the ones around them. That is not a favour, it is what happens when someone actually reads your case studies and your pricing before writing about you.",
      "Our guides are also read by AI assistants, which is increasingly where people start when they are shortlisting suppliers. That matters more for most advertisers than raw referral clicks, and we would rather say so up front than let you work it out from your analytics in three months.",
    ],
  },
  {
    q: 'What can you not buy?',
    a: [
      "The rest of the list. A paid position does not change who else appears, what we say about them, or the order they are in.",
      "The verdict. If a guide names a best option for a particular kind of buyer, that answer is ours and it is not for sale, including in the FAQs at the bottom of the page.",
      "Approval. We do not send entries for sign-off before they publish. You can tell us if something is factually wrong and we will check it, but the wording is ours.",
      "Silence about the trade-offs. If the honest read is that you are too expensive for most of the people reading that guide, the entry will say so. That is what makes the recommendation worth appearing in.",
    ],
  },
  {
    q: 'How do you write a sponsored entry?',
    a: [
      "The same way we write everything else. We research the company independently, read what it publishes, and check its material against what we find elsewhere.",
      "You are welcome to send us information, and most advertisers do. We use the parts that hold up. What we will not do is publish supplied copy as though we had written it, because the moment we start doing that the guide stops being worth reading and the placement stops being worth buying.",
      "Where our research turns up something a reader needs to know, including price, we will say it, whether or not you raised it with us.",
    ],
  },
  {
    q: 'How do you handle results a company claims about itself?',
    a: [
      "We attribute them rather than assert them. So an entry will say that a company's published case studies report a particular figure, described as exactly that.",
      "No agency can independently verify the results another agency reports about its own clients, and that includes us reporting our own. Rather than pretend otherwise, we make the source of every claim visible and let you weigh it. That applies to every company we write about, whether they have paid us or not.",
      "Third-party research and statistics are held to a stricter standard. We open the original source and confirm it contains the number before we cite it.",
    ],
  },
  {
    q: 'Are paid links marked?',
    a: [
      "Yes. Links from a paid placement carry a rel=\"sponsored\" attribute, so they pass no ranking credit. That is what Google requires of paid links, and it is enforced by our build rather than left to whoever edits the page next.",
      "The placement itself is labelled where it appears, and the guide says up front that one of its entries is sponsored.",
    ],
  },
  {
    q: 'Where do placements appear, and how many are there?',
    a: [
      "Comparison guides only. We do not sell positions in case studies, data pieces or anything reporting our own results.",
      "One paid slot per guide, maximum. A list with three sponsors in it is an advert wearing a guide's clothes, and nobody trusts those for long.",
    ],
  },
  {
    q: 'How long does a placement last, and what happens at the end?',
    a: [
      "For whatever term we agree. Every placement has an end date recorded against it in the article itself, and our build fails if a placement outlives its term, so a finished arrangement cannot quietly keep running as a free advert.",
      "When the term ends the placement comes down, unless you renew it.",
    ],
  },
  {
    q: 'Do you do anything for smaller businesses?',
    a: [
      "Yes. We keep discounts and partnership arrangements available for newly established businesses and for companies growing on a small budget, because a page that only ever features whoever can pay the most is not much use to the people reading it.",
      "There is no fixed list of criteria. Tell us what you are building and where you are up to, and we will work something out.",
    ],
  },
  {
    q: 'What rules do you work to?',
    a: [
      "UK advertising rules require paid-for content to be obviously identifiable as advertising, and we treat that as a floor rather than a target. Every paid position is labelled at the placement, disclosed in the guide, and explained on this page.",
      "We do not guarantee rankings, traffic, enquiries or any commercial outcome from a placement, and we would be suspicious of anyone who did.",
      "We reserve the right to decline a placement, or to end one, where we do not think we could write the entry honestly. We would rather return the money than publish something we cannot stand behind.",
      "Anything you share with us in the course of a placement stays confidential unless we have agreed otherwise in writing.",
    ],
  },
  {
    q: 'Why do you run it this way?',
    a: [
      "A comparison guide is only worth reading, and therefore only worth advertising in, if the parts nobody paid for can be trusted. Selling the ranking itself would destroy the thing being sold.",
      "Labelling the paid position clearly is what keeps the rest of the page honest, and the rest of the page honest is what makes the paid position worth anything.",
    ],
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
            Sponsored placements
          </h1>
          <p className="mt-4 font-helvetica-light text-[0.95rem] text-gray-600 dark:text-gray-400">
            Last updated: August 2026.
          </p>

          <p className="mt-6 font-helvetica-light text-[clamp(1rem,1.2vw,1.1rem)] leading-[1.7] text-gray-700 dark:text-gray-300">
            A few of our comparison guides carry a paid position. This page is for two people: the
            reader working out which part of a guide was bought, and the brand working out whether
            to buy one. Both deserve the same answer, so it is all on one page.
          </p>

          <div className="mt-10 space-y-9">
            {sections.map((section) => (
              <section key={section.q}>
                <h2 className="font-futura text-[clamp(1.2rem,1.8vw,1.5rem)] font-bold text-gray-900 dark:text-white">
                  {section.q}
                </h2>
                {section.a.map((para, i) => (
                  <p
                    key={i}
                    className="mt-3 font-helvetica-light text-[clamp(0.95rem,1.1vw,1.05rem)] leading-[1.7] text-gray-700 dark:text-gray-300"
                  >
                    {para}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <section className="mt-12 rounded-xl border border-brand-blue/20 bg-white/60 p-6 dark:border-brand-blue/30 dark:bg-white/5 md:p-8">
            <h2 className="font-futura text-[clamp(1.2rem,1.8vw,1.5rem)] font-bold text-brand-blue">
              How to get featured
            </h2>
            <p className="mt-3 font-helvetica-light text-[clamp(0.95rem,1.1vw,1.05rem)] leading-[1.7] text-gray-700 dark:text-gray-300">
              Email{' '}
              <a
                href={`mailto:${CONSULTICO_EMAIL}?subject=${encodeURIComponent(PLACEMENT_SUBJECT)}`}
                className="font-medium text-brand-blue hover:underline"
              >
                {CONSULTICO_EMAIL}
              </a>{' '}
              with the subject line <strong>&ldquo;{PLACEMENT_SUBJECT}&rdquo;</strong>. Tell us which
              guide you are interested in, what you would want us to look at, and roughly where your
              business is up to. We will tell you honestly whether we think the placement would be
              worth it for you.
            </p>
            <p className="mt-3 font-helvetica-light text-[clamp(0.95rem,1.1vw,1.05rem)] leading-[1.7] text-gray-700 dark:text-gray-300">
              Prices depend on the guide and the term, so we quote per enquiry rather than publish a
              rate card. If you are newly established or growing on a small budget, say so, and ask
              about a partnership.
            </p>
          </section>

          <p className="mt-10 font-helvetica-light text-[0.95rem] text-gray-700 dark:text-gray-300">
            Consultico is a Glasgow marketing consultancy. See our{' '}
            <Link href="/articles" className="text-brand-blue hover:underline">
              articles
            </Link>
            ,{' '}
            <Link href="/terms" className="text-brand-blue hover:underline">
              terms &amp; conditions
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-brand-blue hover:underline">
              privacy policy
            </Link>
            .
          </p>
        </article>
      </Container>
    </main>
  );
}
