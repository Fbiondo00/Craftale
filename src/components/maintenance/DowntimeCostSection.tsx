'use client';

import { motion } from 'framer-motion';
import { Clock, Timer, Shield } from 'lucide-react';
// Removed unused Counter import

export default function DowntimeCostSection() {
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
            Il <span className='text-apty-state-error'>vero costo</span> di una manutenzione carente
          </h2>
          <p className='text-xl text-apty-text-secondary max-w-3xl mx-auto'>
            Ogni ora di fermo costa alle PMI italiane migliaia di euro tra ricavi persi e reputazione
          </p>
        </motion.div>

        {/* Downtime Calculator Visual */}
        <div className='max-w-5xl mx-auto mb-16'>
          <div className='bg-apty-bg-elevated rounded-2xl p-8 border border-apty-border-subtle'>
            <h3 className='text-2xl font-bold text-apty-text-primary mb-8 text-center'>Calcolatore impatto downtime</h3>
            
            <div className='grid md:grid-cols-3 gap-8'>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className='text-center'
              >
                <Clock className='w-12 h-12 text-apty-accent mx-auto mb-4' />
        <div className='text-lg font-semibold text-apty-text-primary mb-2'>1 ora di downtime</div>
                <div className='text-3xl font-bold text-apty-state-error mb-2'>€9,000-15,000</div>
        <div className='text-sm text-apty-text-secondary'>Perdita diretta di ricavi</div>
                <div className='mt-4 space-y-2'>
                  <div className='flex justify-between text-sm'>
          <span className='text-apty-text-secondary'>Vendite perse</span>
                    <span className='font-semibold text-apty-text-primary'>€5,000</span>
                  </div>
                  <div className='flex justify-between text-sm'>
          <span className='text-apty-text-secondary'>Costi di ripristino</span>
                    <span className='font-semibold text-apty-text-primary'>€2,000</span>
                  </div>
                  <div className='flex justify-between text-sm'>
          <span className='text-apty-text-secondary'>Perdita di produttività</span>
                    <span className='font-semibold text-apty-text-primary'>€2,000</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className='text-center'
              >
                <Timer className='w-12 h-12 text-apty-secondary mx-auto mb-4' />
        <div className='text-lg font-semibold text-apty-text-primary mb-2'>24 ore di downtime</div>
                <div className='text-3xl font-bold text-apty-state-error mb-2'>€216,000-360,000</div>
        <div className='text-sm text-apty-text-secondary'>Impatto catastrofico</div>
                <div className='mt-4 space-y-2'>
                  <div className='flex justify-between text-sm'>
          <span className='text-apty-text-secondary'>Perdita clienti</span>
                    <span className='font-semibold text-apty-state-error'>42-45%</span>
                  </div>
                  <div className='flex justify-between text-sm'>
          <span className='text-apty-text-secondary'>Danno SEO</span>
                    <span className='font-semibold text-apty-state-error'>-25%</span>
                  </div>
                  <div className='flex justify-between text-sm'>
          <span className='text-apty-text-secondary'>Tempo di recupero</span>
                    <span className='font-semibold text-apty-state-error'>2-6 mesi</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className='text-center'
              >
                <Shield className='w-12 h-12 text-apty-primary mx-auto mb-4' />
                <div className='text-lg font-semibold text-apty-text-primary mb-2'>Con manutenzione</div>
                <div className='text-3xl font-bold text-apty-primary mb-2'>€50-900/mese</div>
                <div className='text-sm text-apty-text-secondary'>Costo di prevenzione</div>
                <div className='mt-4 space-y-2'>
                  <div className='flex justify-between text-sm'>
                    <span className='text-apty-text-secondary'>Uptime</span>
                    <span className='font-semibold text-apty-state-success'>99.95%</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='text-apty-text-secondary'>Problemi prevenuti</span>
                    <span className='font-semibold text-apty-state-success'>95%</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='text-apty-text-secondary'>ROI</span>
                    <span className='font-semibold text-apty-state-success'>140-220%</span>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className='mt-8 p-4 bg-apty-state-error/10 rounded-lg'>
              <p className='text-sm text-apty-text-primary text-center'>
                <strong>La realtà delle PMI italiane:</strong> 2-3 giorni di downtime possono significare €10.000 persi in alta stagione, perdita definitiva di clienti e mesi per recuperare la reputazione
              </p>
            </div>
          </div>
        </div>

        {/* Source Links */}
        <div className='text-center'>
          <p className='text-sm text-apty-text-secondary'>
            Fonti:{' '}
            <a href='https://www.statista.com/statistics/1453441/italy-average-cost-incurred-by-a-data-breach/' target='_blank' rel='noopener noreferrer' className='text-apty-primary hover:underline'>Statista Italia 2024</a>
            {' '}<span aria-hidden='true' className='mx-2'>•</span>{' '}
            <a href='https://www.eib.org/attachments/thematic/digitalisation_of_smes_in_italy_summary_en.pdf' target='_blank' rel='noopener noreferrer' className='text-apty-primary hover:underline'>European Investment Bank</a>
          </p>
        </div>
      </div>
    </section>
  );
}