'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Container from '@/components/Container';

interface Service {
  id: string;
  name: string;
  outcome: string;
  bullets: string[];
  cta: string;
  icon: string;
  slug: string;
}

const services: Service[] = [
  {
    id: 'strategy',
    name: 'Market Strategy',
    outcome: 'Define exactly what will work, why it will work, and what it is worth — before investing in execution.',
    bullets: [
      'Clear market positioning and growth levers',
      'ROI projections tied to realistic assumptions',
      'A prioritised, step-by-step implementation plan',
    ],
    cta: 'Explore Market Strategy',
    icon: 'compass',
    slug: 'market-strategy',
  },
  {
    id: 'branding',
    name: 'Branding & Image',
    outcome: 'Create a brand position that is instantly recognisable, credible, and aligned with growth goals.',
    bullets: [
      'Brand positioning and messaging frameworks',
      'Visual identity alignment across touchpoints',
      'Clear differentiation within your market',
    ],
    cta: 'Explore Branding & Image',
    icon: 'layers',
    slug: 'branding',
  },
  {
    id: 'content',
    name: 'Content Creation',
    outcome: 'Content designed to attract, qualify, and convert — not just fill feeds.',
    bullets: [
      'Funnel-aligned content strategy',
      'Platform-specific messaging and formats',
      'Performance-led creative direction',
    ],
    cta: 'Explore Content Creation',
    icon: 'sparkles',
    slug: 'content-creation',
  },
  {
    id: 'seo',
    name: 'SEO',
    outcome: 'Build long-term demand by capturing high-intent search traffic that compounds over time.',
    bullets: [
      'Keyword strategy tied to revenue intent',
      'On-site optimisation and content planning',
      'Sustainable growth without ad dependency',
    ],
    cta: 'Explore SEO',
    icon: 'trending-up',
    slug: 'seo',
  },
  {
    id: 'web',
    name: 'Web Development',
    outcome: 'Websites built to support conversion, scalability, and performance — not just aesthetics.',
    bullets: [
      'Conversion-focused structure and UX',
      'Technical performance and optimisation',
      'Seamless integration with marketing systems',
    ],
    cta: 'Explore Web Development',
    icon: 'code',
    slug: 'web-development',
  },
  {
    id: 'social',
    name: 'Social Media',
    outcome: 'Turn attention into measurable demand through intentional distribution and messaging.',
    bullets: [
      'Channel-specific growth strategies',
      'Content distribution with purpose',
      'Measurable engagement tied to outcomes',
    ],
    cta: 'Explore Social Media',
    icon: 'share-2',
    slug: 'social-media',
  },
];

const ServiceIcon = ({ icon, className }: { icon: string; className?: string }) => {
  const iconPaths: Record<string, React.JSX.Element> = {
    compass: (
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M8 12l4-4 4 4-4 4-4-4z" />
    ),
    layers: (
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    ),
    sparkles: (
      <path d="M12 3v4m0 10v4M3 12h4m10 0h4M6.34 6.34l2.83 2.83m5.66 5.66l2.83 2.83M6.34 17.66l2.83-2.83m5.66-5.66l2.83-2.83" />
    ),
    'trending-up': (
      <path d="M23 6l-9.5 9.5-5-5L1 18m22-12h-6m6 0v6" />
    ),
    code: (
      <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
    ),
    'share-2': (
      <path d="M18 8a3 3 0 100-6 3 3 0 000 6zM6 15a3 3 0 100-6 3 3 0 000 6zm12 7a3 3 0 100-6 3 3 0 000 6zM8.59 13.51l6.83 3.98m-.01-10.98l-6.82 3.98" />
    ),
  };

  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      {iconPaths[icon] || iconPaths.compass}
    </svg>
  );
};

export default function ServicesBubbleList() {
  const [selectedService, setSelectedService] = useState<string>('strategy');
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-120px' });

  const currentService = services.find((s) => s.id === selectedService) || services[0];
  const currentIndex = services.findIndex((s) => s.id === selectedService);
  const isTopThree = currentIndex < 3;

  return (
    <Container className="py-16">
      <div className="grid grid-cols-1 lg:grid-cols-[60%_auto] gap-8 lg:gap-12 xl:gap-16 2xl:gap-20 items-start">
        {/* Left Column - Service Bubbles */}
        <motion.div
          ref={sectionRef}
          className="flex flex-col gap-8"
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
          }}
        >
          {services.map((service) => {
            const isSelected = selectedService === service.id;
            return (
              <motion.button
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                variants={{
                  hidden: { opacity: 0, y: 18, scale: 0.97 },
                  show: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                className={`
                  w-full rounded-[74px] pl-6 sm:pl-8 md:pl-10 lg:pl-12 pr-4 sm:pr-5 py-4 sm:py-5 
                  flex items-center justify-between
                  font-futura font-bold text-[clamp(1.25rem,2vw,2.25rem)]
                  transition-all duration-300
                  shadow-[inset_0_0_13px_rgba(0,0,0,0.11)]
                  ${
                    isSelected
                      ? 'bg-brand-blue text-white'
                      : 'bg-brand-silk text-brand-blue hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800'
                  }
                `}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <ServiceIcon 
                    icon={service.icon} 
                    className={`w-[clamp(1.5rem,2.5vw,2rem)] h-[clamp(1.5rem,2.5vw,2rem)] flex-shrink-0`}
                  />
                  <span>{service.name}</span>
                </div>
                <span className="text-[clamp(2rem,3vw,3rem)] leading-none opacity-40">
                  {isSelected ? '−' : '+'}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Right Column - Service Preview */}
        <motion.div
          key={selectedService}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-6 min-h-[400px]"
        >
          {isTopThree ? (
            // Top 3: Info top, Image bottom
            <>
              {/* Outcome Line */}
              <p className="text-[clamp(1rem,1.3vw,1.2rem)] leading-[1.6] text-gray-800 dark:text-gray-200 font-helvetica-light">
                {currentService.outcome}
              </p>

              {/* Bullets */}
              <ul className="space-y-3 pl-8">
                {currentService.bullets.map((bullet, index) => (
                  <li
                    key={index}
                    className="text-[clamp(0.95rem,1.2vw,1.1rem)] leading-[1.6] text-gray-700 dark:text-gray-300 font-helvetica-light relative before:content-['•'] before:absolute before:left-[-1.5rem] before:text-brand-blue before:font-bold"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <motion.button
                className="w-full bg-blue-primary text-white font-helvetica font-medium text-[clamp(0.95rem,1.2vw,1.1rem)] px-6 py-3 rounded-lg hover:opacity-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-primary focus:ring-offset-2"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.98 }}
                aria-label={currentService.cta}
                onClick={() => router.push(`/${currentService.slug}`)}
              >
                {currentService.cta}
              </motion.button>

              {/* Image Placeholder - Bottom */}
              <div className="w-full aspect-square bg-brand-silk dark:bg-gray-900 rounded-[10px] mt-auto" />
            </>
          ) : (
            // Bottom 3: Image top, Info bottom
            <>
              {/* Image Placeholder - Top */}
              <div className="w-full aspect-square bg-brand-silk dark:bg-gray-900 rounded-[10px]" />

              {/* Outcome Line */}
              <p className="text-[clamp(1rem,1.3vw,1.2rem)] leading-[1.6] text-gray-800 dark:text-gray-200 font-helvetica-light">
                {currentService.outcome}
              </p>

              {/* Bullets */}
              <ul className="space-y-3 pl-8">
                {currentService.bullets.map((bullet, index) => (
                  <li
                    key={index}
                    className="text-[clamp(0.95rem,1.2vw,1.1rem)] leading-[1.6] text-gray-700 dark:text-gray-300 font-helvetica-light relative before:content-['•'] before:absolute before:left-[-1.5rem] before:text-brand-blue before:font-bold"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <motion.button
                className="w-full bg-blue-primary text-white font-helvetica font-medium text-[clamp(0.95rem,1.2vw,1.1rem)] px-6 py-3 rounded-lg hover:opacity-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-primary focus:ring-offset-2"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.98 }}
                aria-label={currentService.cta}
                onClick={() => router.push(`/${currentService.slug}`)}
              >
                {currentService.cta}
              </motion.button>
            </>
          )}
        </motion.div>
      </div>
    </Container>
  );
}
