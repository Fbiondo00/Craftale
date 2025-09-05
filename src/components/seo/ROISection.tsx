'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Clock, Award, DollarSign } from 'lucide-react';
import { Counter } from './Counter';

export default function ROISection() {
  return (
    <section className='py-24 md:py-32 bg-apty-bg-base'>
      <div className='container mx-auto px-4 max-w-7xl'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='text-center mb-16'
        >
          <h2 className='text-[40px] md:text-[56px] leading-[1.2] font-bold font-apty-heading text-apty-text-primary mb-4'>
            Il <span className='text-apty-primary'>ROI del SEO</span> per PMI
          </h2>
          <p className='text-xl text-apty-text-secondary max-w-3xl mx-auto'>
            Perché il SEO è l'investimento con il ritorno più alto nel marketing digitale
          </p>
        </motion.div>

        <div className='max-w-6xl mx-auto'>
          {/* ROI Calculator Visual */}
          <div className='bg-apty-bg-elevated rounded-2xl p-8 mb-8'>
            <h3 className='text-2xl font-bold text-apty-text-primary mb-8 text-center'>Calcolo ROI SEO per PMI Italiana Media</h3>
            
            <div className='grid md:grid-cols-2 gap-8'>
              <div className='p-6 bg-apty-bg-base rounded-xl border border-apty-border-subtle'>
                <h4 className='text-xl font-bold text-apty-text-primary mb-4'>💰 Investimento SEO</h4>
                <div className='space-y-3'>
                  <div className='flex justify-between'>
                    <span className='text-apty-text-secondary'>Strategia SEO locale</span>
                    <span className='font-semibold text-apty-text-primary'>€800-1.500/mese</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-apty-text-secondary'>Creazione contenuti</span>
                    <span className='font-semibold text-apty-text-primary'>€300-500/mese</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-apty-text-secondary'>Tool e analisi</span>
                    <span className='font-semibold text-apty-text-primary'>€100-200/mese</span>
                  </div>
                  <div className='h-px bg-apty-border-subtle my-3' />
                  <div className='flex justify-between text-lg'>
                    <span className='font-semibold text-apty-text-primary'>Totale Annuale</span>
                    <span className='font-bold text-apty-text-primary text-xl'>€14.400-26.400</span>
                  </div>
                </div>
              </div>

              <div className='p-6 bg-gradient-to-br from-apty-primary/5 to-apty-secondary/5 rounded-xl border-2 border-apty-primary'>
                <h4 className='text-xl font-bold text-apty-text-primary mb-4'>📈 Ritorno Atteso</h4>
                <div className='space-y-3'>
                  <div className='flex justify-between'>
                    <span className='text-apty-text-secondary'>Aumento traffico organico</span>
                    <span className='font-semibold text-apty-primary'>+25-35%</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-apty-text-secondary'>Lead qualificati/mese</span>
                    <span className='font-semibold text-apty-primary'>+90%</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-apty-text-secondary'>Conversione organica</span>
                    <span className='font-semibold text-apty-primary'>+25-40%</span>
                  </div>
                  <div className='h-px bg-apty-border-subtle my-3' />
                  <div className='flex justify-between text-lg'>
                    <span className='font-semibold text-apty-text-primary'>Valore Generato</span>
                    <span className='font-bold text-apty-primary text-xl'>€72.000-237.600</span>
                  </div>
                </div>
              </div>
            </div>

            <div className='mt-8 text-center'>
              <div className='inline-block p-6 bg-apty-primary/10 rounded-xl'>
                <div className='text-sm text-apty-text-secondary mb-2'>ROI Medio SEO Locale Italia</div>
                <div className='text-4xl font-bold text-apty-primary'>
                  <Counter to={500} suffix='-' />
                  <Counter to={900} suffix='%' />
                </div>
                <div className='text-lg font-semibold text-apty-text-primary mt-2'>Ogni €1 investito → €5-9 di ritorno</div>
              </div>
            </div>
          </div>

          {/* Timeline & Industries */}
          <div className='grid md:grid-cols-2 gap-6 mb-8'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className='bg-apty-bg-elevated rounded-xl p-6 border border-apty-border-subtle'
            >
              <Clock className='w-10 h-10 text-apty-secondary mb-4' />
              <h3 className='text-xl font-bold text-apty-text-primary mb-4'>Timeline Break-Even</h3>
              <ul className='space-y-2'>
                <li className='flex justify-between'>
                  <span className='text-apty-text-secondary'>SEO Locale</span>
                  <span className='font-semibold text-apty-text-primary'>6-12 mesi</span>
                </li>
                <li className='flex justify-between'>
                  <span className='text-apty-text-secondary'>E-commerce nazionale</span>
                  <span className='font-semibold text-apty-text-primary'>12-18 mesi</span>
                </li>
                <li className='flex justify-between'>
                  <span className='text-apty-text-secondary'>Settori competitivi</span>
                  <span className='font-semibold text-apty-text-primary'>18-24 mesi</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className='bg-apty-bg-elevated rounded-xl p-6 border border-apty-border-subtle'
            >
              <TrendingUp className='w-10 h-10 text-apty-primary mb-4' />
              <h3 className='text-xl font-bold text-apty-text-primary mb-4'>Crescita per Settore</h3>
              <ul className='space-y-2'>
                <li className='flex justify-between'>
                  <span className='text-apty-text-secondary'>Retail & E-commerce</span>
                  <span className='font-semibold text-apty-primary'>+25-35%</span>
                </li>
                <li className='flex justify-between'>
                  <span className='text-apty-text-secondary'>Servizi locali</span>
                  <span className='font-semibold text-apty-primary'>+27-35%</span>
                </li>
                <li className='flex justify-between'>
                  <span className='text-apty-text-secondary'>Hospitality</span>
                  <span className='font-semibold text-apty-primary'>+18-28%</span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Cost Comparison */}
          <div className='bg-apty-state-error/5 rounded-2xl p-8 border border-apty-state-error/20'>
            <h3 className='text-2xl font-bold text-apty-text-primary mb-6 text-center'>Costo del NON fare SEO</h3>
            <div className='grid md:grid-cols-3 gap-6'>
              <div className='text-center'>
                <div className='text-3xl font-bold text-apty-state-error mb-2'>34-40%</div>
                <div className='text-sm text-apty-text-secondary'>Quota mercato persa in 18 mesi</div>
              </div>
              <div className='text-center'>
                <div className='text-3xl font-bold text-apty-state-error mb-2'>€5.000+</div>
                <div className='text-sm text-apty-text-secondary'>Costo recupero penalità Google</div>
              </div>
              <div className='text-center'>
                <div className='text-3xl font-bold text-apty-state-error mb-2'>6-12 mesi</div>
                <div className='text-sm text-apty-text-secondary'>Tempo recupero posizioni perse</div>
              </div>
            </div>
          </div>
        </div>

        {/* Source Links */}
        <div className='mt-8 text-center'>
          <p className='text-sm text-apty-text-secondary'>
            Fonti: 
            <a href='https://www.ictprosdo.com/tag/crescita-digitale-pmi/' target='_blank' rel='noopener noreferrer' className='text-apty-primary hover:underline mx-1'>ICT ProsDo PMI Italia</a>,
            <a href='https://blog.applabx.com/a-complete-guide-to-seo-in-italy-in-2025/' target='_blank' rel='noopener noreferrer' className='text-apty-primary hover:underline mx-1'>SEO Italy Guide 2025</a>
          </p>
        </div>
      </div>
    </section>
  );
}