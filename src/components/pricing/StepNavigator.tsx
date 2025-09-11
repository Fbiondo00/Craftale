'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface StepNavigatorProps {
  canGoBack: boolean;
  canGoForward: boolean;
  onBack: () => void;
  onNext: () => void;
  backLabel?: string;
  nextLabel?: string;
  className?: string;
}

export const StepNavigator: React.FC<StepNavigatorProps> = ({
  canGoBack,
  canGoForward,
  onBack,
  onNext,
  backLabel = 'Indietro',
  nextLabel = 'Avanti',
  className = '',
}) => {
  return (
    <div className={`mt-8 flex items-center justify-between gap-4 ${className}`}>
      <motion.button
        type='button'
        disabled={!canGoBack}
        onClick={onBack}
        whileHover={canGoBack ? { scale: 1.02, y: -2 } : {}}
        whileTap={canGoBack ? { scale: 0.97 } : {}}
        className='inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-color-default bg-white text-color-secondary text-sm font-medium shadow-sm disabled:opacity-40 disabled:cursor-not-allowed hover:border-color-strong hover:bg-color-subtle transition-colors'
      >
        <ChevronLeft className='w-4 h-4' />
        {backLabel}
      </motion.button>

      <motion.button
        type='button'
        disabled={!canGoForward}
        onClick={onNext}
        whileHover={canGoForward ? { scale: 1.02, y: -2 } : {}}
        whileTap={canGoForward ? { scale: 0.97 } : {}}
        className='inline-flex items-center gap-2 px-6 py-2 rounded-lg bg-gradient-to-r from-brand-secondary via-brand-tertiary to-brand-accent text-white text-sm font-semibold shadow-md disabled:opacity-40 disabled:cursor-not-allowed transition-all'
      >
        {nextLabel}
        <ChevronRight className='w-4 h-4' />
      </motion.button>
    </div>
  );
};

export default StepNavigator;
