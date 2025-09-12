"use client";

import Link from "next/link";
import { Counter } from "./Counter";
import { AptyPrimaryButton } from "@/components/apty/AptyButton";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingCart } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-apty-bg-base via-apty-bg-subtle to-apty-bg-base py-16 md:py-0">
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
            className="inline-flex items-center gap-2 px-6 py-3 bg-apty-primary/10 backdrop-blur-md rounded-full mb-6 md:mb-8 border border-apty-primary/20"
          >
            <ShoppingCart className="w-4 h-4 text-apty-primary" />
            <span className="text-sm font-medium text-apty-text-primary">76,1% Abbandono Carrelli in Italia</span>
          </motion.div>

          {/* Main Headline */}
          <h1 className="text-[48px] md:text-[72px] leading-[1.1] font-bold font-apty-heading text-apty-text-primary mb-6">
            Il tuo e-commerce perde
            <br />
            <span className="text-apty-primary">7€ ogni 10€</span> nel checkout
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-apty-text-secondary mb-8 max-w-3xl mx-auto leading-relaxed">
            Gli utenti italiani abbandonano il{" "}
            <span className="font-semibold text-apty-text-primary">76,1% dei carrelli</span>. Costi nascosti, lentezza e
            metodi di pagamento mancanti bloccano le vendite. Creiamo store che davvero{" "}
            <span className="font-semibold text-apty-primary">convertono clienti italiani</span>.
          </p>

          {/* Key Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-apty-text-primary">
                <Counter to={2.6} decimals={1} suffix="%" />
              </div>
              <div className="text-xs md:text-sm text-apty-text-secondary">Tasso di Conversione Medio</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-apty-primary">
                <Counter to={55.2} decimals={1} suffix="%" />
              </div>
              <div className="text-xs md:text-sm text-apty-text-secondary">Vendite da Mobile</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-apty-state-error">
                <Counter to={3} suffix="s" />
              </div>
              <div className="text-xs md:text-sm text-apty-text-secondary">Tempo Massimo di Caricamento</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-apty-secondary">
                €<Counter to={107} />
              </div>
              <div className="text-xs md:text-sm text-apty-text-secondary">Valore Medio Ordine</div>
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
                Aumenta le Conversioni
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
        <div className="w-6 h-10 border-2 border-apty-border-subtle rounded-full flex justify-center">
          <div className="w-1 h-3 bg-apty-bg-elevated rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  );
}
