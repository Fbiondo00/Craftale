"use client";

import { AptyPrimaryButton } from "@/components/apty/AptyButton";
import { motion } from "framer-motion";

interface CTAButtonsProps {
  onScrollToProcess: () => void;
  onMouseEnter: () => void;
}

export default function CTAButtons({ onScrollToProcess, onMouseEnter }: CTAButtonsProps) {
  return (
    <motion.div
      className="flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-4 mb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <AptyPrimaryButton size="lg" withChevron onClick={onScrollToProcess}>
        Inizia gratis
      </AptyPrimaryButton>

      <button
        className="group inline-flex items-center gap-1 text-apty-primary font-medium text-base hover:text-apty-primary-hover apty-transition"
        onClick={() => onMouseEnter()}
      >
        Richiedi un preventivo
        <span className="inline-block transition-transform duration-200 group-hover:translate-x-1 text-xl">›</span>
      </button>
    </motion.div>
  );
}
