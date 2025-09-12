"use client";

import { Counter } from "./Counter";
import { motion } from "framer-motion";
import { Bot, Brain, Target, TrendingDown } from "lucide-react";

export default function AISearchSection() {
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
            L'Era dell'<span className="text-apty-secondary">AI Search</span>
          </h2>
          <p className="text-xl text-apty-text-secondary max-w-3xl mx-auto">
            Come Google SGE e Bing Copilot stanno cambiando la visibilità organica
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Impact Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-apty-bg-base rounded-xl p-6 border border-apty-border-subtle"
            >
              <TrendingDown className="w-10 h-10 text-apty-state-error mb-4" />
              <h3 className="text-xl font-bold text-apty-text-primary mb-2">Calo Traffico Organico</h3>
              <div className="text-3xl font-bold text-apty-state-error mb-2">-15%</div>
              <p className="text-sm text-apty-text-secondary">
                Riduzione media per publisher dopo l'introduzione di AI Overviews
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-apty-bg-base rounded-xl p-6 border border-apty-border-subtle"
            >
              <Bot className="w-10 h-10 text-apty-primary mb-4" />
              <h3 className="text-xl font-bold text-apty-text-primary mb-2">Crescita AI Traffic</h3>
              <div className="text-3xl font-bold text-apty-primary mb-2">+2100%</div>
              <p className="text-sm text-apty-text-secondary">Aumento visite da ChatGPT, Gemini e altri AI assistant</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-apty-bg-base rounded-xl p-6 border border-apty-border-subtle"
            >
              <Target className="w-10 h-10 text-apty-secondary mb-4" />
              <h3 className="text-xl font-bold text-apty-text-primary mb-2">CTR Drop con AI</h3>
              <div className="text-3xl font-bold text-apty-secondary mb-2">-34%</div>
              <p className="text-sm text-apty-text-secondary">
                Riduzione CTR sui risultati organici quando AI summaries sono presenti
              </p>
            </motion.div>
          </div>

          {/* Opportunity & Challenge */}
          <div className="bg-apty-bg-base rounded-2xl p-8 border border-apty-border-subtle">
            <h3 className="text-2xl font-bold text-apty-text-primary mb-8 text-center">
              Opportunità e Sfide per PMI Italiane
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-bold text-apty-primary mb-4">🚀 Opportunità</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-apty-primary mt-1">•</span>
                    <div>
                      <strong className="text-apty-text-primary">Solo 18% PMI italiane</strong>
                      <p className="text-sm text-apty-text-secondary">
                        usa AI per SEO = vantaggio competitivo per early adopter
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-apty-primary mt-1">•</span>
                    <div>
                      <strong className="text-apty-text-primary">Citazioni in AI Overviews</strong>
                      <p className="text-sm text-apty-text-secondary">Nuova metrica di visibilità e autorevolezza</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-apty-primary mt-1">•</span>
                    <div>
                      <strong className="text-apty-text-primary">Structured data premium</strong>
                      <p className="text-sm text-apty-text-secondary">
                        Schema markup diventa cruciale per AI understanding
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-bold text-apty-state-error mb-4">⚠️ Sfide</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-apty-state-error mt-1">•</span>
                    <div>
                      <strong className="text-apty-text-primary">Zero-click in crescita</strong>
                      <p className="text-sm text-apty-text-secondary">60% ricerche mobile senza clic su siti esterni</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-apty-state-error mt-1">•</span>
                    <div>
                      <strong className="text-apty-text-primary">SERP feature dominance</strong>
                      <p className="text-sm text-apty-text-secondary">
                        Meno spazio per risultati organici tradizionali
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-apty-state-error mt-1">•</span>
                    <div>
                      <strong className="text-apty-text-primary">Content commoditization</strong>
                      <p className="text-sm text-apty-text-secondary">AI riassume contenuti senza attribuzione</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-4 bg-apty-secondary/10 rounded-lg">
              <p className="text-sm text-apty-text-primary text-center">
                <strong>Strategia vincente:</strong> Contenuti unici e approfonditi • E-E-A-T forte • Ottimizzazione per
                featured snippets • Schema markup completo
              </p>
            </div>
          </div>
        </div>

        {/* Source Links */}
        <div className="mt-8 text-center">
          <p className="text-sm text-apty-text-secondary">
            Fonti:
            <a
              href="https://www.nic.it/en/news/2025/registry-wmf-2025-glimpse-future-web-age-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-apty-primary hover:underline mx-1"
            >
              Registro .it WMF 2025
            </a>
            ,
            <a
              href="https://www.advancedwebranking.com/blog/ai-impact-on-international-seo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-apty-primary hover:underline mx-1"
            >
              Advanced Web Ranking
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
