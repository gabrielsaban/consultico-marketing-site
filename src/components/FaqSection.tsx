import JsonLd from '@/components/JsonLd';
import { faqPageJsonLd } from '@/lib/schema';

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  faqs: FaqItem[];
  title?: string;
  includeSchema?: boolean;
}

export default function FaqSection({
  faqs,
  title = 'Frequently asked questions',
  includeSchema = true,
}: FaqSectionProps) {
  return (
    <section className="py-16 md:py-20 lg:py-24">
      {includeSchema && <JsonLd data={faqPageJsonLd(faqs)} />}
      <h2 className="mb-8 font-futura text-[clamp(1.5rem,2.5vw,2rem)] font-bold text-brand-blue">
        {title}
      </h2>
      <div className="space-y-6">
        {faqs.map((faq) => (
          <details
            key={faq.question}
            className="group rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900"
          >
            <summary className="cursor-pointer list-none font-futura text-[clamp(1rem,1.3vw,1.15rem)] font-bold text-gray-900 dark:text-gray-100 [&::-webkit-details-marker]:hidden">
              {faq.question}
            </summary>
            <p className="mt-3 font-helvetica-light text-[clamp(0.95rem,1.1vw,1.05rem)] leading-[1.7] text-gray-700 dark:text-gray-300">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
