'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GlowingEffect } from '@/components/ui/GlowingEffect';
import type { OptionalServiceWithAvailability as ApiOptionalService } from '@/types/database-extended';

interface ServiceToggleCardProps {
  service: ApiOptionalService;
  isSelected: boolean;
  onToggle: () => void;
}

export const ServiceToggleCard = ({ service, isSelected, onToggle }: ServiceToggleCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className='relative group cursor-pointer'
      onClick={onToggle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <div className='relative h-full rounded-xl overflow-hidden'>
        <GlowingEffect
          spread={30}
          glow={isSelected}
          disabled={!isSelected}
          proximity={48}
          inactiveZone={0.01}
          borderWidth={2}
        />

        <motion.div
          className={cn(
            'relative h-full rounded-xl p-4 transition-all duration-300',
            'bg-white/90 backdrop-blur-sm border border-color-default',
            'shadow-md hover:shadow-lg transition-shadow duration-300',
            isSelected &&
              'border-brand-secondary/40 shadow-lg bg-gradient-to-br from-brand-secondary/10 to-brand-tertiary/10'
          )}
        >
          {/* Gradient overlay when selected */}
          {isSelected && (
            <motion.div
              className='absolute inset-0 rounded-lg opacity-20 bg-gradient-to-br from-brand-secondary/20 to-brand-tertiary/20'
              style={{
                mixBlendMode: 'multiply',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              transition={{ duration: 0.3 }}
            />
          )}

          <div className='relative z-10'>
            {/* Custom Checkbox */}
            <div className='flex items-center justify-between mb-3'>
              <motion.div
                className={cn(
                  'flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center',
                  'transition-all duration-200',
                  isSelected
                    ? 'bg-gradient-to-r from-brand-secondary to-brand-tertiary border-brand-secondary text-white'
                    : 'border-color-strong bg-white hover:border-brand-secondary/60'
                )}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: isSelected ? 1 : 0,
                    opacity: isSelected ? 1 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <Check className='w-3 h-3' />
                </motion.div>
              </motion.div>

              <motion.span
                className={cn(
                  'text-sm font-semibold transition-colors duration-200',
                  isSelected ? 'text-brand-secondary' : 'text-color-muted'
                )}
                animate={{
                  scale: isSelected ? 1.05 : 1,
                }}
                transition={{ duration: 0.2 }}
              >
                €{service.price}
              </motion.span>
            </div>

            <div className='space-y-2'>
              <h3
                className={cn(
                  'font-medium text-sm transition-colors duration-200',
                  isSelected ? 'text-color-primary' : 'text-color-secondary'
                )}
              >
                {service.name}
              </h3>

              <p className='text-xs text-color-muted leading-relaxed'>{service.description}</p>

              {/* Service Features */}
              <div className='pt-2'>
                <div className='space-y-1'>
                  {service.features &&
                    service.features.slice(0, 3).map((feature, index) => (
                      <motion.div
                        key={index}
                        className='flex items-center gap-2 text-xs text-color-tertiary'
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <div
                          className={cn(
                            'w-1 h-1 rounded-full transition-colors duration-200',
                            isSelected
                              ? 'bg-gradient-to-r from-brand-secondary to-brand-tertiary'
                              : 'bg-gray-400'
                          )}
                        />
                        <span className='truncate'>{typeof feature === 'string' ? feature : feature.text || feature}</span>
                      </motion.div>
                    ))}

                  {service.features && service.features.length > 3 && (
                    <motion.div
                      className='text-xs text-color-muted italic'
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isHovered ? 1 : 0.7 }}
                      transition={{ duration: 0.2 }}
                    >
                      +{service.features.length - 3} altre funzionalità
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Hover tooltip with all features */}
          {isHovered && service.features && service.features.length > 3 && (
            <motion.div
              className='absolute -top-2 left-full ml-2 z-50 w-64 p-3 bg-white/95 backdrop-blur-md rounded-lg border border-color-default shadow-xl'
              initial={{ opacity: 0, scale: 0.95, x: -10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <h4 className='text-sm font-medium text-color-primary mb-2'>{service.name}</h4>
              <div className='space-y-1'>
                {service.features &&
                  service.features.map((feature, index) => (
                    <div key={index} className='flex items-center gap-2 text-xs text-color-tertiary'>
                      <div className='w-1 h-1 rounded-full bg-brand-secondary/90' />
                      <span>{feature}</span>
                    </div>
                  ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};
