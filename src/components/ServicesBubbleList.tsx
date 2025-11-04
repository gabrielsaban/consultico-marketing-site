'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface Service {
  id: string;
  name: string;
  description: string;
}

const services: Service[] = [
  {
    id: 'branding',
    name: 'Branding & Image',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.',
  },
  {
    id: 'content',
    name: 'Content Creation',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.',
  },
  {
    id: 'seo',
    name: 'SEO',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.',
  },
  {
    id: 'web',
    name: 'Web Development',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.',
  },
  {
    id: 'social',
    name: 'Social Media',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.',
  },
  {
    id: 'strategy',
    name: 'Market Strategy',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.',
  },
];

export default function ServicesBubbleList() {
  const [selectedService, setSelectedService] = useState<string>('content');

  const currentService = services.find((s) => s.id === selectedService) || services[1];

  return (
    <div className="w-full pl-[7.5vw] pr-[7.5vw] py-16">
      <div className="grid grid-cols-1 lg:grid-cols-[60%_auto] gap-[5vw] 2xl:gap-[9vw] items-start">
        {/* Left Column - Service Bubbles */}
        <div className="flex flex-col gap-8">
          {services.map((service) => {
            const isSelected = selectedService === service.id;
            return (
              <motion.button
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                className={`
                  w-full rounded-[74px] pl-12 pr-5 py-5 
                  flex items-center justify-between
                  font-futura font-bold text-[28px] sm:text-[36px]
                  transition-all duration-300
                  shadow-[inset_0_0_13px_rgba(0,0,0,0.11)]
                  ${
                    isSelected
                      ? 'bg-brand-blue text-white'
                      : 'bg-brand-silk text-brand-blue hover:bg-gray-200'
                  }
                `}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>{service.name}</span>
                <span className="text-[48px] leading-none">
                  {isSelected ? '−' : '+'}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Right Column - Service Preview */}
        <motion.div
          key={selectedService}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col h-full"
        >
          {/* Placeholder Image */}
          <div className="w-full aspect-[5/5.1] 2xl:aspect-[4/4] bg-brand-silk rounded-[10px] flex-shrink-0 mb-6" />

          {/* Description Text - scrollable if needed */}
          <div className="flex-1 overflow-y-auto min-h-0 mb-4">
            <p className="xl:text-[1.25vw] 2xl:text-[0.9vw] leading-relaxed text-gray-800 font-helvetica">
              {currentService.description}
            </p>
          </div>

          {/* CTA Button */}
          <motion.button
            className="w-full bg-blue-primary text-white font-helvetica font-medium text-[16px] sm:text-[24px] px-8 py-2.5 rounded-lg hover:opacity-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-primary focus:ring-offset-2 flex-shrink-0"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.98 }}
            aria-label={`View ${currentService.name} service`}
          >
            View service
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

