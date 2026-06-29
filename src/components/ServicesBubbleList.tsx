'use client';

import { motion, useInView, AnimatePresence, LayoutGroup } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Container from '@/components/Container';
import ServiceExploreLink from '@/components/ServiceExploreLink';
import { services, type Service } from '@/lib/servicesData';

const ServiceIcon = ({ icon, className }: { icon: string; className?: string }) => {
  const iconPaths: Record<string, React.JSX.Element> = {
    compass: (
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M8 12l4-4 4 4-4 4-4-4z" />
    ),
    target: (
      <path d="M12 22a10 10 0 100-20 10 10 0 000 20zM12 18a6 6 0 100-12 6 6 0 000 12zM12 14a2 2 0 100-4 2 2 0 000 4z" />
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
    'calendar-check': (
      <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v13a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2zM8.5 15.5l2 2 5-5" />
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

const ServicePreviewImage = ({ service }: { service: Service }) => {
  if (!service.image) {
    return <div className="h-full w-full bg-brand-silk dark:bg-gray-900" />;
  }

  return (
    <Image
      src={service.image}
      alt={service.imageAlt ?? `${service.name}, Consultico`}
      width={640}
      height={640}
      className="h-full w-full object-cover"
      sizes="(min-width: 900px) 34vw, 35vw"
    />
  );
};

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const renderHighlightedText = (text: string, highlights: string[]) => {
  if (!highlights.length) return text;

  const pattern = new RegExp(`(${highlights.map(escapeRegExp).join('|')})`, 'gi');

  return text.split(pattern).map((part, index) => {
    const isHighlighted = highlights.some((highlight) => highlight.toLowerCase() === part.toLowerCase());

    return isHighlighted ? (
      <strong key={`${part}-${index}`} className="font-helvetica font-semibold text-brand-blue">
        {part}
      </strong>
    ) : (
      <span key={`${part}-${index}`}>{part}</span>
    );
  });
};

const renderServiceParagraph = (service: Service, paragraph: string) =>
  renderHighlightedText(paragraph, service.highlights);

function ServicePreviewCopy({
  service,
  paragraphClassName,
}: {
  service: Service;
  paragraphClassName: string;
}) {
  return (
    <div className="space-y-4">
      {service.description.map((paragraph, paragraphIndex) => (
        <p key={`${service.id}-${paragraphIndex}`} className={paragraphClassName}>
          {renderServiceParagraph(service, paragraph)}
        </p>
      ))}
      <ServiceExploreLink href={service.detailHref} label={service.detailCtaLabel} />
    </div>
  );
}

function MobileServicePreview({ service }: { service: Service }) {
  return (
    <motion.div
      layout
      initial={{ height: 0, opacity: 0, y: 8 }}
      animate={{ height: 'auto', opacity: 1, y: 0 }}
      exit={{ height: 0, opacity: 0, y: -4 }}
      transition={{
        height: { duration: 0.26, ease: [0.22, 1, 0.36, 1] },
        opacity: { duration: 0.16, ease: 'easeOut' },
        y: { duration: 0.2, ease: 'easeOut' },
        layout: { duration: 0.26, ease: [0.22, 1, 0.36, 1] },
      }}
      className="[@media(min-width:900px)]:hidden overflow-hidden"
    >
      <div className="grid grid-cols-1 [@media(min-width:600px)]:grid-cols-[minmax(7.5rem,35%)_1fr] gap-4 sm:gap-5 items-start px-2 sm:px-4 pt-5 sm:pt-6">
        <div className="hidden [@media(min-width:600px)]:block w-full aspect-square overflow-hidden bg-brand-silk dark:bg-gray-900 rounded-[10px]">
          <ServicePreviewImage service={service} />
        </div>
        <div className="min-w-0 self-stretch flex flex-col">
          <ServicePreviewCopy
            service={service}
            paragraphClassName="text-[clamp(0.9rem,2.2vw,1rem)] leading-[1.58] text-gray-800 dark:text-gray-200 font-helvetica-light"
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesBubbleList() {
  const [selectedService, setSelectedService] = useState<string>('strategy');
  const [previewService, setPreviewService] = useState<string>('strategy');
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const selectionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previewTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-120px' });

  const currentService = services.find((s) => s.id === selectedService) || services[0];
  const currentIndex = services.findIndex((s) => s.id === selectedService);
  const isTopThree = currentIndex < 3;

  const handleServiceSelect = (serviceId: string) => {
    if (serviceId === selectedService) return;
    if (selectionTimerRef.current) clearTimeout(selectionTimerRef.current);
    if (previewTimerRef.current) clearTimeout(previewTimerRef.current);

    const isStackedLayout =
      typeof window !== 'undefined' && !window.matchMedia('(min-width: 900px)').matches;

    if (!isStackedLayout) {
      setSelectedService(serviceId);
      setPreviewService(serviceId);
      return;
    }

    setPreviewService('');
    selectionTimerRef.current = setTimeout(() => {
      setSelectedService(serviceId);
      previewTimerRef.current = setTimeout(() => {
        setPreviewService(serviceId);
      }, 90);
    }, 140);
  };

  useEffect(() => {
    return () => {
      if (selectionTimerRef.current) clearTimeout(selectionTimerRef.current);
      if (previewTimerRef.current) clearTimeout(previewTimerRef.current);
    };
  }, []);

  return (
    <Container className="py-16">
      <div className="grid grid-cols-1 [@media(min-width:900px)]:grid-cols-[60%_auto] gap-8 [@media(min-width:900px)]:gap-12 xl:gap-16 2xl:gap-20 items-start [@media(min-width:900px)]:items-stretch">
        {/* Left Column - Service Bubbles */}
        <LayoutGroup id="services-bubble-list">
          <motion.div
            ref={sectionRef}
            className="flex flex-col gap-8"
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
            }}
          >
            {services.map((service, index) => {
              const isSelected = selectedService === service.id;
              const showInlinePreview = previewService === service.id && isSelected;
              const fromLeft = index % 2 === 0;
              return (
                <motion.div
                  key={service.id}
                  layout
                  variants={{
                    hidden: { opacity: 0, x: fromLeft ? -30 : 30 },
                    show: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                  transition={{ layout: { duration: 0.26, ease: [0.22, 1, 0.36, 1] } }}
                >
                  <motion.button
                    layout
                    onClick={() => handleServiceSelect(service.id)}
                    className={`
                      w-full rounded-[74px] pl-6 sm:pl-8 md:pl-10 [@media(min-width:900px)]:pl-12 pr-4 sm:pr-5 py-4 sm:py-5
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
                    transition={{ layout: { duration: 0.26, ease: [0.22, 1, 0.36, 1] } }}
                    whileHover={isSelected ? {} : { scale: 1.015, x: 6 }}
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
                  <AnimatePresence mode="wait" initial={false}>
                    {showInlinePreview && (
                      <MobileServicePreview key={service.id} service={service} />
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </LayoutGroup>

        {/* Right Column - Service Preview */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedService}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 16 }}
            exit={{ opacity: 0, y: -12, transition: { duration: 0.2, ease: 'easeIn' } }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="hidden [@media(min-width:900px)]:flex flex-col gap-6 h-full min-h-[400px]"
          >
          {isTopThree ? (
            <>
              <ServicePreviewCopy
                service={currentService}
                paragraphClassName="text-[clamp(0.94rem,1.05vw,1.06rem)] leading-[1.58] text-gray-800 dark:text-gray-200 font-helvetica-light"
              />

              <div className="w-full aspect-square overflow-hidden bg-brand-silk dark:bg-gray-900 rounded-[10px] mt-auto">
                <ServicePreviewImage service={currentService} />
              </div>
            </>
          ) : (
            <>
              <div className="w-full aspect-square overflow-hidden bg-brand-silk dark:bg-gray-900 rounded-[10px]">
                <ServicePreviewImage service={currentService} />
              </div>

              <div className="mt-auto">
                <ServicePreviewCopy
                  service={currentService}
                  paragraphClassName="text-[clamp(0.94rem,1.05vw,1.06rem)] leading-[1.58] text-gray-800 dark:text-gray-200 font-helvetica-light"
                />
              </div>
            </>
          )}
          </motion.div>
        </AnimatePresence>
      </div>
    </Container>
  );
}
