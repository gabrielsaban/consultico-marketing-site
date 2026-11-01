import ThinkFirstSectionClient from './ThinkFirstSectionClient';

const BULLET =
  "text-[clamp(1rem,1.4vw,1.25rem)] leading-[1.6] text-gray-800 dark:text-gray-200 font-helvetica-light relative before:content-['•'] before:absolute before:left-[-1.5rem] before:text-brand-blue before:font-bold";

/**
 * How Loop starts. Think First used to be sold here on its own, for "B2C
 * brands doing £50K+/month". It's now the workshop at the start of Loop, and
 * the buyer is a consumer brand with a marketing team (identity plan,
 * 2026-10-31). The word "workshop" stays: it's how people search for it.
 */
export default function ThinkFirstSection() {
  return (
    <ThinkFirstSectionClient>
      <p className="mb-3 font-helvetica text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-brand-blue">
        How Loop starts
      </p>
      <h2 className="text-[clamp(1.5rem,2.5vw,2.5rem)] font-bold text-blue-primary mb-8 font-futura">
        Think First, then every Monday
      </h2>

      <p className="text-[clamp(1rem,1.4vw,1.25rem)] leading-[1.6] text-gray-800 dark:text-gray-200 font-helvetica-light mb-8">
        Every Loop starts with Think First, our marketing strategy workshop. We get to know your business, your numbers and your market before anything changes. Then Loop picks it up every week.
      </p>

      <ul className="space-y-4 mb-8 pl-8">
        <li className={BULLET}>A clear picture of where your marketing stands</li>
        <li className={BULLET}>Five recommendations, in the order to do them</li>
        <li className={BULLET}>A plan your team and your board can get behind</li>
      </ul>

      <p className="mb-8 max-w-full text-[clamp(0.9rem,1.05vw,1rem)] leading-[1.55] text-gray-600 dark:text-gray-400 font-helvetica italic md:max-w-[70%]">
        We&apos;re committed to making sure you understand your plan as well as we do. If anything isn&apos;t crystal clear, we keep working until it is.
      </p>
    </ThinkFirstSectionClient>
  );
}
