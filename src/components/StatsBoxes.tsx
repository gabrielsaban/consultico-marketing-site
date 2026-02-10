'use client';

import Container from '@/components/Container';
import AnimatedCounter from '@/components/AnimatedCounter';

interface Stat {
  value: string;
  name: string;
  info: string;
}

const stats: Stat[] = [
  {
    value: '1134%',
    name: 'Visibility increase',
    info: 'Using SEO for search engine results.',
  },
  {
    value: '2000%',
    name: 'More daily traffic',
    info: 'For our SEO clients, curated over 8 quarters',
  },
  {
    value: '50x',
    name: 'Return on ad spend',
    info: 'Adding new life to PPC client lead generation.',
  },
  {
    value: '£1.2M',
    name: "Increase in clients' work",
    info: "Increase in our clients' quotes resulting from our work.",
  },
];

export default function StatsBoxes() {
  return (
    <Container className="py-24">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-17">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col min-h-[12rem] xl:h-[12rem] 2xl:h-[15rem]"
          >
            {/* Stat Value */}
            <AnimatedCounter value={stat.value} duration={1.4} />

            {/* Blue Divider */}
            <div className="w-full h-[2px] bg-brand-blue mb-4 flex-shrink-0" />

            {/* Stat Name */}
            <h4 className="font-helvetica font-medium text-[clamp(1.125rem,1.4vw,1.75rem)] text-black dark:text-gray-100 mb-2">
              {stat.name}
            </h4>

            {/* Stat Info */}
            <p className="font-helvetica leading-tight text-[clamp(0.875rem,1vw,1.25rem)] text-black dark:text-gray-200">
              {stat.info}
            </p>
          </div>
        ))}
      </div>
    </Container>
  );
}
