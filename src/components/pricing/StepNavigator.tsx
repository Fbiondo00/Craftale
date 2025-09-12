"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  backLabel = "Indietro",
  nextLabel = "Avanti",
  className = "",
}) => {
  return (
    <div className={`mt-8 flex items-center justify-between gap-4 ${className}`}>
      {canGoBack && (
        <motion.button
          type="button"
          onClick={onBack}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className={
            "inline-flex items-center gap-2 px-6 py-2 rounded-lg bg-apty-gradient-primary text-apty-text-on-brand text-sm font-semibold shadow-md transition-all"
          }
        >
          <ChevronLeft className="w-4 h-4" />
          {backLabel}
        </motion.button>
      )}

      {canGoForward && (
        <motion.button
          type="button"
          onClick={onNext}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 px-6 py-2 rounded-lg bg-gradient-to-r from-brand-secondary via-brand-tertiary to-brand-accent text-white text-sm font-semibold shadow-md transition-all"
        >
          {nextLabel}
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      )}
    </div>
  );
};

export default StepNavigator;
