'use client';

import Container from '@/components/Container';
import AnimatedCounter from '@/components/AnimatedCounter';

interface Stat {
  value: string;
  name: string;
}

const stats: Stat[] = [
  {
    value: '120,000',
    name: 'Organic views in 30 days',
  },
  {
    value: '7',
    name: 'Page-one rankings in one quarter',
  },
  {
    value: '£2,000',
    name: 'Saved in one recommendation',
  },
  {
    value: '5',
    name: 'Bespoke recommendations, every time',
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
          </div>
        ))}
      </div>
    </Container>
  );
}
