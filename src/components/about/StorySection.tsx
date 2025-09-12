"use client";

import { motion } from "framer-motion";
import { Sparkles, Zap } from "lucide-react";

export default function StorySection() {
  return (
    <section id="story-section" className="py-16 md:py-24 bg-apty-bg-base">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Two Column Layout: Mission and Approach */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Mission Statement */}
          <motion.div
            className="bg-apty-bg-subtle rounded-xl md:rounded-2xl p-6 sm:p-8 md:p-10 text-center h-full border border-apty-border-subtle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-apty-primary mx-auto mb-4 md:mb-6" />
            <h3 className="text-xl sm:text-2xl font-semibold text-apty-text-primary mb-3 md:mb-4">
              La Nostra Missione
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-apty-text-secondary leading-relaxed">
              Offrire a ogni cliente un servizio personalizzato che unisce design moderno, sviluppo performante e
              strategia digitale, per costruire presenze web che convertono e durano nel tempo.
            </p>
          </motion.div>

          {/* Our Approach */}
          <motion.div
            className="bg-apty-bg-subtle rounded-xl md:rounded-2xl p-6 sm:p-8 md:p-10 text-center h-full border border-apty-border-subtle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Zap className="w-10 h-10 md:w-12 md:h-12 text-apty-primary mx-auto mb-4 md:mb-6" />
            <h3 className="text-xl sm:text-2xl font-semibold text-apty-text-primary mb-3 md:mb-4">
              Il Nostro Approccio
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-apty-text-secondary leading-relaxed">
              <span className="font-semibold text-apty-text-primary">Innovazione Senza Compromessi.</span> Craftale
              coniuga ascolto, trasparenza e innovazione continua per trasformare ogni sfida digitale in una storia di
              successo concreta. Nessuna soluzione preconfezionata, solo progetti su misura realizzati con tecnologie
              avanzate e metodo iterativo, sempre orientati ai risultati e alla crescita reale del tuo business.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
