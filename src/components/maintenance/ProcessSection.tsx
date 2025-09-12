"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function ProcessSection() {
  return (
    <section className="py-24 md:py-32 bg-apty-bg-subtle">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-[40px] md:text-[56px] leading-[1.2] font-bold font-apty-heading text-apty-text-primary mb-4">
            Il nostro <span className="text-apty-primary">processo di manutenzione</span>
          </h2>
          <p className="text-xl text-apty-text-secondary max-w-3xl mx-auto">
            Monitoraggio 24/7, aggiornamenti proattivi e uptime garantito
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-apty-bg-base rounded-xl p-6 border border-apty-border-subtle"
            >
              <div className="text-sm text-apty-primary font-semibold mb-2">Fase 1</div>
              <div className="text-2xl font-bold text-apty-text-primary mb-1">Audit e configurazione</div>
              <div className="text-sm text-apty-text-secondary mb-4">
                Valutazione completa di sicurezza e performance
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-apty-primary mt-0.5" />
                  <span className="text-apty-text-secondary">Scansione delle vulnerabilità di sicurezza</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-apty-primary mt-0.5" />
                  <span className="text-apty-text-secondary">Baseline delle performance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-apty-primary mt-0.5" />
                  <span className="text-apty-text-secondary">Progettazione della strategia di backup</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-apty-primary/5 to-apty-secondary/5 rounded-xl p-6 border-2 border-apty-primary"
            >
              <div className="text-sm text-apty-primary font-semibold mb-2">Fase 2</div>
              <div className="text-2xl font-bold text-apty-text-primary mb-1">Monitoraggio e protezione</div>
              <div className="text-sm text-apty-text-secondary mb-4">Monitoraggio e protezione automatizzati 24/7</div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-apty-primary mt-0.5" />
                  <span className="text-apty-text-secondary">Monitoraggio dell'uptime in tempo reale</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-apty-primary mt-0.5" />
                  <span className="text-apty-text-secondary">Backup automatici</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-apty-primary mt-0.5" />
                  <span className="text-apty-text-secondary">Rilevamento delle minacce alla sicurezza</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-apty-bg-base rounded-xl p-6 border border-apty-border-subtle"
            >
              <div className="text-sm text-apty-tertiary font-semibold mb-2">Fase 3</div>
              <div className="text-2xl font-bold text-apty-text-primary mb-1">Ottimizzazione e report</div>
              <div className="text-sm text-apty-text-secondary mb-4">Miglioramento continuo e trasparenza</div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-apty-tertiary mt-0.5" />
                  <span className="text-apty-text-secondary">Report mensili sulle performance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-apty-tertiary mt-0.5" />
                  <span className="text-apty-text-secondary">Monitoraggio salute SEO</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-apty-tertiary mt-0.5" />
                  <span className="text-apty-text-secondary">Raccomandazioni proattive</span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Service Level Agreement */}
          <div className="mt-12 bg-apty-bg-base rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-apty-text-primary mb-6 text-center">
              Le nostre garanzie di livello di servizio
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-apty-primary mb-2">99.95%</div>
                <div className="text-sm text-apty-text-secondary">SLA di uptime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-apty-secondary mb-2">{"<1 hour"}</div>
                <div className="text-sm text-apty-text-secondary">Tempo di risposta</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-apty-tertiary mb-2">24/7</div>
                <div className="text-sm text-apty-text-secondary">Monitoraggio</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-apty-accent mb-2">100%</div>
                <div className="text-sm text-apty-text-secondary">Supporto in italiano</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
