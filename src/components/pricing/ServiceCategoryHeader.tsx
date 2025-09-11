'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import * as Icons from 'lucide-react';
import { cn } from '@/lib/utils';
import { GlowingEffect } from '@/components/ui/GlowingEffect';
interface Category {
  id: string;
  name: string;
  icon: string;
  gradient: { from: string; to: string };
}

interface ServiceCategoryHeaderProps {
  category: Category;
  isOpen: boolean;
  selectedCount: number;
  totalCount: number;
  onToggle: () => void;
}

const ServiceCategoryHeader = ({
  category,
  isOpen,
  selectedCount,
  totalCount,
  onToggle,
}: ServiceCategoryHeaderProps) => {
  // Dynamically get icon component
  const IconComponent = (Icons as any)[category.icon];

  return (
    <motion.div
      className='relative group cursor-pointer'
      onClick={onToggle}
      whileHover={{ scale: 1.01, y: -2 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.2 }}
    >
      <div className='relative rounded-xl overflow-hidden'>
        <GlowingEffect
          spread={20}
          glow={selectedCount > 0}
          disabled={selectedCount === 0}
          proximity={32}
          inactiveZone={0.01}
          borderWidth={1.5}
        />

        <motion.div
          className={cn(
            'relative rounded-xl p-4 transition-all duration-300',
            'bg-color-base/90 dark:bg-color-bg-inverse-subtle/90 backdrop-blur-sm',
            'border border-color-default dark:border-color-border-strong',
            'shadow-md hover:shadow-lg transition-shadow duration-300',
            selectedCount > 0 && 'border-brand-secondary/40 shadow-lg'
          )}
          style={{
            background:
              selectedCount > 0
                ? `linear-gradient(135deg, ${category.gradient.from}15, ${category.gradient.to}08)`
                : undefined,
          }}
        >
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <motion.div
                className='p-2 rounded-lg text-brand-secondary bg-gradient-to-br from-brand-secondary/10 to-brand-tertiary/10 dark:from-brand-secondary/20 dark:to-brand-tertiary/20'
                style={{
                  background: `linear-gradient(135deg, ${category.gradient.from}15, ${category.gradient.to}08)`,
                }}
                whileHover={{ rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                {IconComponent && <IconComponent className='w-5 h-5' />}
              </motion.div>
              <div>
                <h3 className='font-bold text-color-primary dark:text-color-text-inverse'>
                  {category.name}
                </h3>
                {selectedCount > 0 && (
                  <p className='text-xs text-color-muted dark:text-color-text-inverse/60'>
                    {selectedCount} di {totalCount} serviz{selectedCount !== 1 ? 'i' : 'o'}{' '}
                    selezionat{selectedCount !== 1 ? 'i' : 'o'}
                  </p>
                )}
              </div>
            </div>

            <div className='flex items-center gap-2'>
              {selectedCount > 0 && (
                <motion.div
                  className='px-2 py-1 bg-gradient-to-r from-brand-secondary/20 to-brand-tertiary/20 rounded-full text-xs text-brand-secondary font-medium'
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {selectedCount}
                </motion.div>
              )}
              <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                <ChevronDown className='w-5 h-5 text-color-muted dark:text-color-text-inverse/70' />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export { ServiceCategoryHeader };
