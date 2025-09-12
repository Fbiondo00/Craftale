"use client";

import { FloatingElement, Particle } from "@/types/home-page";
import { AnimatePresence, motion } from "framer-motion";

interface BackgroundEffectsProps {
  particles: Particle[];
  floatingElements: FloatingElement[];
  showConfetti: boolean;
}

export default function BackgroundEffects({ particles, floatingElements, showConfetti }: BackgroundEffectsProps) {
  // All animations have been removed
  return null;
}
