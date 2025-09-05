'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export default function ProcessSection() {
  return (
    <section className='py-24 md:py-32 bg-apty-bg-base' id='process'>
      <div className='container mx-auto px-4 max-w-7xl'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='text-center mb-16'
        >
          <h2 className='text-[40px] md:text-[56px] leading-[1.2] font-bold font-apty-heading text-apty-text-primary mb-4'>
            Il Nostro <span className='text-apty-primary'>Processo SEO</span>
          </h2>
          <p className='text-xl text-apty-text-secondary max-w-3xl mx-auto'>
            Metodologia comprovata per portare la tua PMI in prima pagina
          </p>
        </motion.div>

        <div className='max-w-6xl mx-auto'>
          <div className='grid md:grid-cols-4 gap-6'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className='bg-apty-bg-elevated rounded-xl p-6 border border-apty-border-subtle'
            >
              <div className='text-sm text-apty-primary font-semibold mb-2'>Fase 1</div>
              <div className='text-2xl font-bold text-apty-text-primary mb-1'>Audit & Ricerca</div>
              <div className='text-sm text-apty-text-secondary mb-4'>Analisi completa e strategia</div>
              <ul className='space-y-2 text-sm'>
                <li className='flex items-start gap-2'>
                  <CheckCircle2 className='w-4 h-4 text-apty-primary mt-0.5' />
                  <span className='text-apty-text-secondary'>Audit tecnico SEO</span>
                </li>
                <li className='flex items-start gap-2'>
                  <CheckCircle2 className='w-4 h-4 text-apty-primary mt-0.5' />
                  <span className='text-apty-text-secondary'>Analisi competitor</span>
                </li>
                <li className='flex items-start gap-2'>
                  <CheckCircle2 className='w-4 h-4 text-apty-primary mt-0.5' />
                  <span className='text-apty-text-secondary'>Keyword research locale</span>
                </li>
                <li className='flex items-start gap-2'>
                  <CheckCircle2 className='w-4 h-4 text-apty-primary mt-0.5' />
                  <span className='text-apty-text-secondary'>Gap analysis contenuti</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className='bg-gradient-to-br from-apty-primary/5 to-apty-secondary/5 rounded-xl p-6 border-2 border-apty-primary'
            >
              <div className='text-sm text-apty-primary font-semibold mb-2'>Fase 2</div>
              <div className='text-2xl font-bold text-apty-text-primary mb-1'>Ottimizzazione</div>
              <div className='text-sm text-apty-text-secondary mb-4'>On-page e tecnica</div>
              <ul className='space-y-2 text-sm'>
                <li className='flex items-start gap-2'>
                  <CheckCircle2 className='w-4 h-4 text-apty-primary mt-0.5' />
                  <span className='text-apty-text-secondary'>Core Web Vitals</span>
                </li>
                <li className='flex items-start gap-2'>
                  <CheckCircle2 className='w-4 h-4 text-apty-primary mt-0.5' />
                  <span className='text-apty-text-secondary'>Schema markup</span>
                </li>
                <li className='flex items-start gap-2'>
                  <CheckCircle2 className='w-4 h-4 text-apty-primary mt-0.5' />
                  <span className='text-apty-text-secondary'>Mobile optimization</span>
                </li>
                <li className='flex items-start gap-2'>
                  <CheckCircle2 className='w-4 h-4 text-apty-primary mt-0.5' />
                  <span className='text-apty-text-secondary'>E-E-A-T signals</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className='bg-apty-bg-elevated rounded-xl p-6 border border-apty-border-subtle'
            >
              <div className='text-sm text-apty-secondary font-semibold mb-2'>Fase 3</div>
              <div className='text-2xl font-bold text-apty-text-primary mb-1'>Contenuti & Link</div>
              <div className='text-sm text-apty-text-secondary mb-4'>Creazione e promozione</div>
              <ul className='space-y-2 text-sm'>
                <li className='flex items-start gap-2'>
                  <CheckCircle2 className='w-4 h-4 text-apty-secondary mt-0.5' />
                  <span className='text-apty-text-secondary'>Content strategy</span>
                </li>
                <li className='flex items-start gap-2'>
                  <CheckCircle2 className='w-4 h-4 text-apty-secondary mt-0.5' />
                  <span className='text-apty-text-secondary'>Pagine pillar</span>
                </li>
                <li className='flex items-start gap-2'>
                  <CheckCircle2 className='w-4 h-4 text-apty-secondary mt-0.5' />
                  <span className='text-apty-text-secondary'>Link building etico</span>
                </li>
                <li className='flex items-start gap-2'>
                  <CheckCircle2 className='w-4 h-4 text-apty-secondary mt-0.5' />
                  <span className='text-apty-text-secondary'>Digital PR locale</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className='bg-apty-bg-elevated rounded-xl p-6 border border-apty-border-subtle'
            >
              <div className='text-sm text-apty-tertiary font-semibold mb-2'>Fase 4</div>
              <div className='text-2xl font-bold text-apty-text-primary mb-1'>Analisi & Scala</div>
              <div className='text-sm text-apty-text-secondary mb-4'>Monitoring e crescita</div>
              <ul className='space-y-2 text-sm'>
                <li className='flex items-start gap-2'>
                  <CheckCircle2 className='w-4 h-4 text-apty-tertiary mt-0.5' />
                  <span className='text-apty-text-secondary'>Rank tracking</span>
                </li>
                <li className='flex items-start gap-2'>
                  <CheckCircle2 className='w-4 h-4 text-apty-tertiary mt-0.5' />
                  <span className='text-apty-text-secondary'>Conversion optimization</span>
                </li>
                <li className='flex items-start gap-2'>
                  <CheckCircle2 className='w-4 h-4 text-apty-tertiary mt-0.5' />
                  <span className='text-apty-text-secondary'>Report mensili</span>
                </li>
                <li className='flex items-start gap-2'>
                  <CheckCircle2 className='w-4 h-4 text-apty-tertiary mt-0.5' />
                  <span className='text-apty-text-secondary'>Strategia AI search</span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Timeline */}
          <div className='mt-12 bg-apty-bg-elevated rounded-2xl p-8'>
            <h3 className='text-2xl font-bold text-apty-text-primary mb-6 text-center'>Timeline Risultati Attesi</h3>
            <div className='grid md:grid-cols-4 gap-6'>
              <div className='text-center'>
                <div className='text-3xl font-bold text-apty-primary mb-2'>0-3 mesi</div>
                <div className='text-sm text-apty-text-secondary'>Fondamenta tecniche, prime ottimizzazioni</div>
              </div>
              <div className='text-center'>
                <div className='text-3xl font-bold text-apty-secondary mb-2'>3-6 mesi</div>
                <div className='text-sm text-apty-text-secondary'>Primi miglioramenti ranking, +traffico</div>
              </div>
              <div className='text-center'>
                <div className='text-3xl font-bold text-apty-tertiary mb-2'>6-12 mesi</div>
                <div className='text-sm text-apty-text-secondary'>Break-even, crescita costante</div>
              </div>
              <div className='text-center'>
                <div className='text-3xl font-bold text-apty-accent mb-2'>12+ mesi</div>
                <div className='text-sm text-apty-text-secondary'>Dominanza settoriale, ROI massimo</div>
              </div>
            </div>
          </div>

          {/* Guarantees */}
          <div className='mt-8 grid md:grid-cols-3 gap-6'>
            <div className='bg-apty-primary/10 rounded-xl p-6 text-center'>
              <div className='text-2xl font-bold text-apty-primary mb-2'>100%</div>
              <div className='text-sm text-apty-text-primary'>White Hat SEO</div>
            </div>
            <div className='bg-apty-secondary/10 rounded-xl p-6 text-center'>
              <div className='text-2xl font-bold text-apty-secondary mb-2'>Google Partner</div>
              <div className='text-sm text-apty-text-primary'>Certificati ufficiali</div>
            </div>
            <div className='bg-apty-tertiary/10 rounded-xl p-6 text-center'>
              <div className='text-2xl font-bold text-apty-tertiary mb-2'>Garanzia</div>
              <div className='text-sm text-apty-text-primary'>Risultati o rimborso</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}