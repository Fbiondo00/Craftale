"use client";

import React from "react";
import { GlowingEffect } from "@/components/ui/GlowingEffect";
import { motion } from "framer-motion";
import { ChevronRight, Sparkles } from "lucide-react";

interface AIGuidanceButtonProps {
  onClick?: () => void;
}

const AIGuidanceButton: React.FC<AIGuidanceButtonProps> = ({ onClick }) => {
  return (
    <motion.div
      className="relative rounded-xl overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <GlowingEffect spread={30} glow={false} disabled={true} proximity={48} inactiveZone={0.01} borderWidth={2} />

      <motion.button
        className="relative w-full rounded-xl p-6 bg-white/90 backdrop-blur-sm border border-color-default shadow-xl text-left transition-all duration-300 hover:shadow-2xl group"
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => {
          if (onClick) {
            onClick();
          }
        }}
      >
        <div className="flex items-center gap-4">
          <motion.div
            className="p-3 rounded-xl bg-gradient-to-br from-brand-secondary/10 to-brand-tertiary/10"
            whileHover={{ rotate: 5, scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <Sparkles className="w-6 h-6 text-brand-secondary" />
          </motion.div>

          <div className="flex-1">
            <h3 className="text-lg font-bold bg-gradient-to-r from-brand-secondary via-brand-tertiary to-brand-accent bg-clip-text text-transparent mb-1">
              Assistente AI
            </h3>
            <p className="text-sm text-color-tertiary">Non sei sicuro su cosa scegliere? Chiedi all&apos;AI</p>
          </div>

          <motion.div
            className="text-brand-secondary opacity-70 group-hover:opacity-100 transition-opacity duration-200"
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronRight className="w-5 h-5" />
          </motion.div>
        </div>

        {/* Subtle gradient overlay on hover */}
        <motion.div
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-secondary/10 via-brand-tertiary/10 to-brand-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ mixBlendMode: "multiply" }}
        />
      </motion.button>
    </motion.div>
  );
};

export default AIGuidanceButton;
