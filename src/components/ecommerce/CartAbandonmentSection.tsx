'use client';

import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export default function CartAbandonmentSection() {
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
            Perché il <span className='text-apty-state-error'>76,1%</span> Abbandona il Carrello
          </h2>
          <p className='text-xl text-apty-text-secondary max-w-3xl mx-auto'>
            Principali punti di frizione che bloccano le vendite e-commerce italiane
          </p>
        </motion.div>

        <div className='max-w-6xl mx-auto'>
          <div className='grid md:grid-cols-2 gap-8'>
            {/* Problems */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className='bg-apty-bg-elevated rounded-2xl p-8'
            >
              <h3 className='text-2xl font-bold text-apty-state-error mb-6'>Problemi Attuali</h3>
              <div className='space-y-4'>
                <div className='flex items-start gap-3'>
                  <AlertCircle className='w-5 h-5 text-apty-state-error mt-1' />
                  <div>
                    <div className='font-medium text-apty-text-primary'>Costi di Spedizione Nascosti</div>
                    <div className='text-sm text-apty-text-secondary'>Causa il 48% degli abbandoni</div>
                  </div>
                </div>
                <div className='flex items-start gap-3'>
                  <AlertCircle className='w-5 h-5 text-apty-state-error mt-1' />
                  <div>
                    <div className='font-medium text-apty-text-primary'>Registrazione Obbligatoria</div>
                    <div className='text-sm text-apty-text-secondary'>+31% tasso di abbandono</div>
                  </div>
                </div>
                <div className='flex items-start gap-3'>
                  <AlertCircle className='w-5 h-5 text-apty-state-error mt-1' />
                  <div>
                    <div className='font-medium text-apty-text-primary'>Assenza PayPal/Postepay</div>
                    <div className='text-sm text-apty-text-secondary'>Il 30% degli italiani li preferisce</div>
                  </div>
                </div>
                <div className='flex items-start gap-3'>
                  <AlertCircle className='w-5 h-5 text-apty-state-error mt-1' />
                  <div>
                    <div className='font-medium text-apty-text-primary'>Esperienza Mobile Lenta</div>
                    <div className='text-sm text-apty-text-secondary'>60% abbandona dopo 3 secondi</div>
                  </div>
                </div>
                <div className='flex items-start gap-3'>
                  <AlertCircle className='w-5 h-5 text-apty-state-error mt-1' />
                  <div>
                    <div className='font-medium text-apty-text-primary'>Mancanza di Badge Fiducia</div>
                    <div className='text-sm text-apty-text-secondary'>Senza SSL e recensioni niente vendite</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Solutions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className='bg-gradient-to-br from-apty-primary/5 to-apty-secondary/5 rounded-2xl p-8 border-2 border-apty-primary'
            >
              <h3 className='text-2xl font-bold text-apty-primary mb-6'>Le Nostre Soluzioni</h3>
              <div className='space-y-4'>
                <div className='flex items-start gap-3'>
                  <CheckCircle2 className='w-5 h-5 text-apty-state-success mt-1' />
                  <div>
                    <div className='font-medium text-apty-text-primary'>Calcolatore Spedizione Trasparente</div>
                    <div className='text-sm text-apty-text-secondary'>+22% tasso di conversione</div>
                  </div>
                </div>
                <div className='flex items-start gap-3'>
                  <CheckCircle2 className='w-5 h-5 text-apty-state-success mt-1' />
                  <div>
                    <div className='font-medium text-apty-text-primary'>Checkout Ospite</div>
                    <div className='text-sm text-apty-text-secondary'>+18-22% conversioni</div>
                  </div>
                </div>
                <div className='flex items-start gap-3'>
                  <CheckCircle2 className='w-5 h-5 text-apty-state-success mt-1' />
                  <div>
                    <div className='font-medium text-apty-text-primary'>Tutti i Metodi di Pagamento Italiani</div>
                    <div className='text-sm text-apty-text-secondary'>PayPal, Postepay, Satispay, BNPL</div>
                  </div>
                </div>
                <div className='flex items-start gap-3'>
                  <CheckCircle2 className='w-5 h-5 text-apty-state-success mt-1' />
                  <div>
                    <div className='font-medium text-apty-text-primary'>Velocità Mobile-First</div>
                    <div className='text-sm text-apty-text-secondary'>{'<2.5s caricamento'}</div>
                  </div>
                </div>
                <div className='flex items-start gap-3'>
                  <CheckCircle2 className='w-5 h-5 text-apty-state-success mt-1' />
                  <div>
                    <div className='font-medium text-apty-text-primary'>Segnali di Fiducia Ovunque</div>
                    <div className='text-sm text-apty-text-secondary'>Trustpilot, SSL, garanzie</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Source Link */}
        <div className='mt-8 text-center'>
          <p className='text-sm text-apty-text-secondary'>
            Fonti: 
            <a href='https://pacvue.com/blog/eu-commerce-deep-dive-series-italy-trends-insights/' target='_blank' rel='noopener noreferrer' className='text-apty-primary hover:underline mx-1'>Pacvue Italia</a>,
            <a href='https://www.mordorintelligence.com/industry-reports/italy-ecommerce-market' target='_blank' rel='noopener noreferrer' className='text-apty-primary hover:underline mx-1'>Mordor Intelligence</a>
          </p>
        </div>
      </div>
    </section>
  );
}