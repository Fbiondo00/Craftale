"use client";

import { motion } from "framer-motion";
import { Monitor, Smartphone, Zap } from "lucide-react";

export default function InteractiveFeatures() {
  const features = [
    { icon: Monitor, label: "Design Responsive" },
    { icon: Smartphone, label: "Mobile First" },
    { icon: Zap, label: "Velocità Fulminea" },
  ];

  return (
    <motion.div
      className="grid grid-cols-3 gap-4 md:gap-6 max-w-2xl lg:max-w-none mb-12 mx-auto lg:mx-0"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      {features.map((feature, index) => {
        const Icon = feature.icon;
        return (
          <motion.div
            key={index}
            className="flex flex-col items-center text-center group cursor-pointer"
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div className="mb-2" whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
              <Icon className="w-5 h-5 md:w-6 md:h-6 text-apty-primary" />
            </motion.div>
            <span className="text-xs md:text-sm font-medium text-apty-text-secondary group-hover:text-apty-text-primary apty-transition">
              {feature.label}
            </span>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
