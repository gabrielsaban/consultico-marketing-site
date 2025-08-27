'use client';

import { motion } from 'framer-motion';
import React from 'react';

export type ServiceProvider = 'Consultico' | 'Trusted Partner';

interface ServiceCardProps {
  title: string;
  subtitle?: string;
  outcome?: string;
  bullets?: string[];
  provider?: ServiceProvider;
  priceFrom?: string; // e.g., "£X"
  ctaLabel?: string;  // e.g., "Explore", "Get Started", "Coming Soon"
  ctaDisabled?: boolean;
  unlockNote?: boolean;
  featured?: boolean;
  bonusText?: string; // shown for featured
  href?: string;      // optional link for CTA
  className?: string;
}

export default function ServiceCard({
  title,
  subtitle,
  outcome,
  bullets,
  provider,
  priceFrom,
  ctaLabel = 'Explore',
  ctaDisabled = false,
  unlockNote = false,
  featured = false,
  bonusText,
  href,
  className = '',
}: ServiceCardProps) {
  const Wrapper = motion.div;

  const baseClasses = `rounded-2xl ring-1 ring-gray-300/80 bg-white/60 backdrop-blur-sm shadow-sm ${
    featured ? 'p-8 md:p-10 lg:p-12' : 'p-6 md:p-7 lg:p-8'
  } ${className}`;

  const handleClick = () => {
    if (ctaDisabled) return;
    if (href) {
      if (href.startsWith('#')) {
        const id = href.slice(1);
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.open(href, '_self');
      }
    }
  };

  return (
    <Wrapper
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0% -10% 0%' }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      whileHover={{ y: -6, scale: 1.01 }}
      className={baseClasses}
    >
      {/* Header */}
      <div className={`${featured ? 'mb-8 md:mb-10' : 'mb-5 md:mb-6'}`}>
        <h3 className={`${featured ? 'text-3xl md:text-4xl lg:text-[2.5rem]' : 'text-xl md:text-2xl'} font-bold text-blue-primary font-futura`}>{title}</h3>
        {subtitle && (
          <p className={`mt-2 text-gray-700 ${featured ? 'text-lg md:text-xl' : 'text-sm md:text-base'} font-helvetica-light`}>{subtitle}</p>
        )}
        {outcome && !featured && (
          <p className="mt-3 text-gray-700 text-sm md:text-base font-helvetica-light">{outcome}</p>
        )}
      </div>

      {/* Body */}
      {featured ? (
        <div>
          {Array.isArray(bullets) && bullets.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 lg:gap-5">
              <ul className="space-y-2 text-gray-700 text-[1.05rem] md:text-[1.15rem] font-helvetica-light">
                {bullets.filter(Boolean).slice(0, Math.ceil((bullets?.length || 0)/2)).map((item, idx) => (
                  <li key={`b1-${idx}`} className="flex items-start gap-2">
                    <span className="select-none text-blue-primary">-</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <ul className="space-y-2 text-gray-700 text-[1.05rem] md:text-[1.15rem] font-helvetica-light">
                {bullets.filter(Boolean).slice(Math.ceil((bullets?.length || 0)/2)).map((item, idx) => (
                  <li key={`b2-${idx}`} className="flex items-start gap-2">
                    <span className="select-none text-blue-primary">-</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-8 md:mt-10 flex flex-col md:flex-row md:items-center gap-4">
            {bonusText && (
              <div className="flex-1 text-sm md:text-base text-gray-500 font-helvetica-light">
                {bonusText}
              </div>
            )}

            <div className="md:ml-auto">
              <button
                onClick={handleClick}
                disabled={ctaDisabled}
                className={`px-5 py-3 rounded-lg text-white font-futura font-semibold text-sm md:text-base transition-colors ${
                  ctaDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-primary hover:bg-blue-600'
                }`}
              >
                {ctaLabel}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {(provider || priceFrom) && (
            <div className="flex items-center gap-3">
              {provider && (
                <span className="inline-flex items-center rounded-full bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 text-xs font-semibold">
                  Delivered by: {provider}
                </span>
              )}
              {priceFrom && (
                <span className="text-gray-600 text-sm font-helvetica"></span>
              )}
            </div>
          )}

          <div className="mt-auto flex items-center justify-between pt-2">
            <div className="text-gray-500 text-xs md:text-sm font-helvetica-light">
              {unlockNote ? 'Unlockable after your Health Report.' : ''}
            </div>
            <button
              onClick={handleClick}
              disabled={ctaDisabled}
              className={`px-2 py-2 rounded-md text-white font-futura text-sm transition-colors ${
                ctaDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-primary hover:bg-blue-600'
              }`}
            >
              {ctaLabel}
            </button>
          </div>
        </div>
      )}
    </Wrapper>
  );
}


