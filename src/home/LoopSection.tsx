import Link from 'next/link';
import Container from '@/components/Container';

/**
 * "How Loop runs", directly under the hero. It replaces MarketingIntro, which
 * opened "Your marketing spend is being wasted without a strategy" and told the
 * reader "You have a strategy problem". The people this is for already know
 * their numbers, so that talked down to them (identity plan, 2026-10-31).
 *
 * The lead line is Paul's, locked. Copy stays short because the full copy
 * rewrite comes with the January rebrand; this is the structure it lands in.
 * `id="loop"` is the target for every "Loop" link until /loop exists.
 */
const STEPS = [
  {
    title: 'Your strategist',
    body: 'The same person every week, who gets to know your brand and your numbers.',
  },
  {
    title: 'Your Monday report',
    body: 'What your marketing really brought in, and changes that make a difference.',
  },
  {
    title: 'Yes, talk or no',
    body: 'You decide. Our team makes the changes and tests them.',
  },
];

export default function LoopSection() {
  return (
    <section
      id="loop"
      className="scroll-mt-24 py-14 md:py-20 lg:py-24 bg-brand-silk dark:bg-gray-950 shadow-[0_4px_20px_rgba(0,0,0,0.1)]"
    >
      <Container>
        <div className="max-w-4xl">
          <p className="mb-3 font-helvetica text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-brand-blue">
            How Loop runs
          </p>
          <h2 className="font-futura text-[clamp(1.6rem,2.8vw,2.75rem)] font-bold leading-[1.1] text-[#1B2A4A] dark:text-white">
            A fresh look at your marketing, every Monday.
          </h2>
          <p className="mt-5 font-helvetica-light text-[clamp(1.05rem,1.4vw,1.3rem)] leading-[1.6] text-gray-800 dark:text-gray-200">
            Loop shows you what your marketing really brings in. Every Monday, one person sends changes that make a difference. Say yes, talk or no, and we make them.
          </p>
        </div>

        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <li
              key={step.title}
              className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900"
            >
              <span
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1B2A4A] font-futura text-[1.05rem] font-bold text-white"
                aria-hidden="true"
              >
                {index + 1}
              </span>
              <h3 className="mt-4 font-futura text-[1.25rem] font-bold text-[#1B2A4A] dark:text-white">{step.title}</h3>
              <p className="mt-2 font-helvetica-light text-[1rem] leading-[1.6] text-gray-700 dark:text-gray-300">{step.body}</p>
            </li>
          ))}
        </ol>

        <p className="mt-8 max-w-3xl font-helvetica-light text-[1rem] leading-[1.6] text-gray-700 dark:text-gray-300">
          Behind your strategist sits our team, frameworks we&apos;ve built in-house and tools we&apos;ve built on leading AI models. Use AI, don&apos;t become AI: you always talk to people.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg bg-brand-blue px-8 py-3 font-helvetica text-[clamp(1rem,1.15vw,1.08rem)] font-medium text-white transition-colors duration-200 hover:bg-[#006FE6] focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2"
          >
            Apply now
          </Link>
        </div>
      </Container>
    </section>
  );
}
