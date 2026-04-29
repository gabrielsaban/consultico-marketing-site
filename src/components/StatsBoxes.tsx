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
    <Container className="py-14 sm:py-20 lg:py-24">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 min-[600px]:gap-6 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-17">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col min-h-[9.75rem] min-[600px]:min-h-[12rem] xl:h-[12rem] 2xl:h-[15rem]"
          >
            {/* Stat Value */}
            <AnimatedCounter
              value={stat.value}
              duration={1.4}
              className="text-[clamp(2rem,9vw,3rem)] min-[600px]:text-5xl md:text-6xl"
            />

            {/* Blue Divider */}
            <div className="w-full h-[2px] bg-brand-blue mb-3 min-[600px]:mb-4 flex-shrink-0" />

            {/* Stat Name */}
            <h4 className="font-helvetica font-medium text-[clamp(0.95rem,3.8vw,1.125rem)] min-[600px]:text-[clamp(1.125rem,1.4vw,1.75rem)] leading-tight text-black dark:text-gray-100 mb-1.5 min-[600px]:mb-2">
              {stat.name}
            </h4>

            {/* Stat Info */}
            <p className="font-helvetica leading-tight text-[clamp(0.72rem,3vw,0.875rem)] min-[600px]:text-[clamp(0.875rem,1vw,1.25rem)] text-black dark:text-gray-200">
              {stat.info}
            </p>
          </div>
        ))}
      </div>
    </Container>
  );
}
