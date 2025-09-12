"use client";

import Link from "next/link";
import { Counter } from "./Counter";
import { AptyPrimaryButton } from "@/components/apty/AptyButton";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-apty-bg-inverse py-16 md:py-0">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center pt-8 md:pt-0"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-apty-state-error/20 backdrop-blur-md rounded-full mb-6 md:mb-8 border border-apty-state-error/40"
          >
            <TrendingUp className="w-4 h-4 text-apty-text-inverse" />
            <span className="text-sm font-medium text-apty-text-inverse">
              93-96% dei clic vanno alla prima pagina Google
            </span>
          </motion.div>

          {/* Main Headline */}
          <h1 className="text-[48px] md:text-[72px] leading-[1.1] font-bold font-apty-heading text-apty-text-inverse mb-6">
            Il tuo sito è
            <br />
            <span className="text-apty-state-error">invisibile su Google?</span>
            <br />
            Stai perdendo clienti
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-apty-text-inverse/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            <span className="font-semibold text-apty-text-inverse">71% delle ricerche in Italia</span> avviene da
            mobile. Le PMI senza SEO perdono{" "}
            <span className="font-semibold text-apty-text-inverse">34-40% di quota di mercato</span> in 18 mesi. ROI
            medio SEO: <span className="font-semibold text-apty-text-inverse">500-900%</span>.
          </p>

          {/* Key Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-apty-text-inverse">
                <Counter to={56} suffix="%" />
              </div>
              <div className="text-xs md:text-sm text-apty-text-inverse/60">Clic Top 3 posizioni</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-apty-text-inverse">
                <Counter to={42} suffix="%" />
              </div>
              <div className="text-xs md:text-sm text-apty-text-inverse/60">Visite "vicino a me"</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-apty-text-inverse">
                <Counter to={6} suffix="-12" />
              </div>
              <div className="text-xs md:text-sm text-apty-text-inverse/60">Mesi break-even</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-apty-text-inverse">
                <Counter to={900} suffix="%" />
              </div>
              <div className="text-xs md:text-sm text-apty-text-inverse/60">ROI massimo</div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16 md:mb-0"
          >
            <Link href="/pricing">
              <AptyPrimaryButton size="xl" className="min-w-[200px]">
                Domina Google Ora
                <ArrowRight className="w-5 h-5 ml-2" />
              </AptyPrimaryButton>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-apty-bg-base/60 rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  );
}
