"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center justify-center bg-apty-bg-subtle overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(var(--apty-primary)) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-apty-bg-subtle/50 to-apty-bg-subtle" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 py-12 md:py-0">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Main Headline */}
          <h1 className="text-[32px] leading-[40px] sm:text-[40px] sm:leading-[48px] md:text-[56px] md:leading-[64px] lg:text-[72px] lg:leading-[80px] font-semibold font-apty-heading text-apty-text-primary mb-4 md:mb-6">
            <span className="text-apty-primary">Craftale</span>: Il Tuo Business
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>Merita una <span className="text-apty-primary">Storia di Successo</span>
          </h1>

          {/* Subheadline */}
          <p className="text-[16px] leading-[26px] sm:text-[18px] sm:leading-[28px] md:text-[20px] md:leading-[32px] text-apty-text-secondary max-w-3xl mx-auto px-2 sm:px-4 md:px-0">
            Trasformiamo le tue idee in risultati concreti, raccontando la storia del tuo business attraverso il
            digitale. Soluzioni web su misura che parlano ai tuoi clienti e generano opportunità reali di crescita.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
