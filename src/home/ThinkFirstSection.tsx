import ThinkFirstSectionClient from './ThinkFirstSectionClient';

export default function ThinkFirstSection() {
  return (
    <ThinkFirstSectionClient>
      <p className="mb-3 font-helvetica text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-brand-blue">
        The Think First Workshop
      </p>
      <h2 className="text-[clamp(1.5rem,2.5vw,2.5rem)] font-bold text-blue-primary mb-8 font-futura">
        Need a marketing strategy consultant in Glasgow?
      </h2>

      <p className="text-[clamp(1rem,1.4vw,1.25rem)] leading-[1.6] text-gray-800 dark:text-gray-200 font-helvetica-light mb-8">
        Think First is Consultico&apos;s entry-point workshop for B2C brands doing £50K+/month. As marketing consultants in Glasgow, we map your channels, economics, and growth path before you commit budget to SEO, PPC, or web.
      </p>

      <ul className="space-y-4 mb-8 pl-8">
        <li className="text-[clamp(1rem,1.4vw,1.25rem)] leading-[1.6] text-gray-800 dark:text-gray-200 font-helvetica-light relative before:content-['•'] before:absolute before:left-[-1.5rem] before:text-brand-blue before:font-bold">
          ROI projections before you spend
        </li>
        <li className="text-[clamp(1rem,1.4vw,1.25rem)] leading-[1.6] text-gray-800 dark:text-gray-200 font-helvetica-light relative before:content-['•'] before:absolute before:left-[-1.5rem] before:text-brand-blue before:font-bold">
          Visual examples mapped to your brand
        </li>
        <li className="text-[clamp(1rem,1.4vw,1.25rem)] leading-[1.6] text-gray-800 dark:text-gray-200 font-helvetica-light relative before:content-['•'] before:absolute before:left-[-1.5rem] before:text-brand-blue before:font-bold">
          Absolute clarity - guaranteed
        </li>
      </ul>

      <p className="mb-8 max-w-full text-[clamp(0.9rem,1.05vw,1rem)] leading-[1.55] text-gray-600 dark:text-gray-400 font-helvetica italic md:max-w-[70%]">
        We&apos;re committed to making sure you understand your plan as well as we do. If anything isn&apos;t crystal clear, we keep working until it is.
      </p>

      <p className="text-[clamp(0.98rem,1.2vw,1.1rem)] leading-[1.5] text-gray-800 dark:text-gray-200 font-helvetica font-medium mb-6">
        Made for B2C brands doing £50K+/month and ready to grow deliberately.
      </p>
    </ThinkFirstSectionClient>
  );
}
