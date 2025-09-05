'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Particle, FloatingElement } from '@/types/home-page';

interface BackgroundEffectsProps {
  particles: Particle[];
  floatingElements: FloatingElement[];
  showConfetti: boolean;
}

export default function BackgroundEffects({
  particles,
  floatingElements,
  showConfetti,
}: BackgroundEffectsProps) {
  // All animations have been removed
  return null;
}
