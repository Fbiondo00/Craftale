"use client";

import { motion } from "framer-motion";

interface TypedHeadingProps {
  showWebsites: boolean;
  typedText: string;
  showCursor: boolean;
}

export default function TypedHeading({ showWebsites, typedText, showCursor }: TypedHeadingProps) {
  return (
    <motion.div
      className="space-y-6 mb-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
        <span className="block">Realizziamo</span>
        <motion.span
          className="relative block min-h-[1.2em]"
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={
            showWebsites
              ? {
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                }
              : {}
          }
          transition={{
            delay: 0.5,
            duration: 0.8,
            type: "spring",
            bounce: 0.4,
          }}
        >
          <span className="bg-gradient-to-r from-apty-primary via-apty-tertiary to-apty-accent bg-clip-text text-transparent">
            {typedText}
            <motion.span animate={{ opacity: showCursor ? 1 : 0 }} className="text-apty-primary">
              |
            </motion.span>
          </span>

          {/* Burst effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={showWebsites ? { opacity: [0, 1, 0] } : {}}
            transition={{ duration: 0.5 }}
          >
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 w-3 h-3 bg-gradient-to-r from-apty-primary/90 to-apty-tertiary/90 rounded-full"
                initial={{ x: 0, y: 0 }}
                animate={
                  showWebsites
                    ? {
                        x: Math.cos((i * Math.PI) / 6) * 120,
                        y: Math.sin((i * Math.PI) / 6) * 120,
                        opacity: [1, 0],
                        scale: [1, 0],
                      }
                    : {}
                }
                transition={{ duration: 1, delay: 0.5 }}
              />
            ))}
          </motion.div>
        </motion.span>
      </h1>
      <motion.p
        className="text-base md:text-xl lg:text-2xl text-apty-text-secondary max-w-3xl mx-auto lg:mx-0 lg:max-w-none leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Basta perdere clienti a causa di un design poco efficace. Realizziamo siti che impressionano i visitatori e
        generano vere interazioni.
      </motion.p>
    </motion.div>
  );
}
