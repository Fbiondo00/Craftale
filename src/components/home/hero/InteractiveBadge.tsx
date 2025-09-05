'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Sparkles } from 'lucide-react';

interface InteractiveBadgeProps {
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onClick: () => void;
}

export default function InteractiveBadge({
  isHovered,
  onHoverStart,
  onHoverEnd,
  onClick,
}: InteractiveBadgeProps) {
  return (
    <motion.div
      className='inline-flex items-center gap-2 bg-apty-bg-base rounded-full px-6 py-3 text-sm font-medium text-apty-text-primary mb-8 cursor-pointer shadow-apty-sm'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      whileHover={{
        scale: 1.05,
        boxShadow: '0 10px 30px rgba(103, 32, 255, 0.2)',
      }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      onClick={onClick}
    >
      <motion.div animate={{ rotate: isHovered ? 360 : 0 }} transition={{ duration: 0.5 }}>
        <Zap className='w-4 h-4' />
      </motion.div>
      <span className='font-semibold'>We Build Websites That Actually Work</span>
      <motion.div
        animate={{ 
          rotate: isHovered ? 360 : 0,
          scale: isHovered ? 1.2 : 1 
        }} 
        transition={{ duration: 0.5 }}
      >
        <Sparkles className='w-4 h-4 text-apty-warning' />
      </motion.div>
    </motion.div>
  );
}
