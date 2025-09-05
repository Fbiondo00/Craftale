'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Users, Store } from 'lucide-react';
import { Counter } from './Counter';

export default function LocalSEOSection() {
  return (
    <section className='py-24 md:py-32 bg-apty-bg-subtle'>
      <div className='container mx-auto px-4 max-w-7xl'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='text-center mb-16'
        >
          <h2 className='text-[40px] md:text-[56px] leading-[1.2] font-bold font-apty-heading text-apty-text-primary mb-4'>
            SEO Locale: <span className='text-apty-tertiary'>Dal Web al Negozio</span>
          </h2>
          <p className='text-xl text-apty-text-secondary max-w-3xl mx-auto'>
            Come le ricerche "vicino a me" portano clienti reali alla tua attività
          </p>
        </motion.div>

        <div className='max-w-6xl mx-auto'>
          {/* "Vicino a me" Impact */}
          <div className='bg-apty-bg-base rounded-2xl p-8 mb-8'>
            <h3 className='text-2xl font-bold text-apty-text-primary mb-8 text-center'>L'Impatto delle Ricerche "Vicino a Me"</h3>
            
            <div className='grid md:grid-cols-4 gap-6 mb-8'>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className='text-center'
              >
                <div className='w-20 h-20 bg-apty-primary/20 rounded-full flex items-center justify-center mx-auto mb-3'>
                  <MapPin className='w-10 h-10 text-apty-primary' />
                </div>
                <div className='text-3xl font-bold text-apty-primary mb-1'>
                  <Counter to={23} suffix='%' />
                </div>
                <div className='text-sm text-apty-text-secondary'>Crescita annuale ricerche locali</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className='text-center'
              >
                <div className='w-20 h-20 bg-apty-secondary/20 rounded-full flex items-center justify-center mx-auto mb-3'>
                  <Users className='w-10 h-10 text-apty-secondary' />
                </div>
                <div className='text-3xl font-bold text-apty-secondary mb-1'>
                  <Counter to={42} suffix='%' />
                </div>
                <div className='text-sm text-apty-text-secondary'>Visita entro 24 ore</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className='text-center'
              >
                <div className='w-20 h-20 bg-apty-tertiary/20 rounded-full flex items-center justify-center mx-auto mb-3'>
                  <Phone className='w-10 h-10 text-apty-tertiary' />
                </div>
                <div className='text-3xl font-bold text-apty-tertiary mb-1'>
                  <Counter to={68} suffix='%' />
                </div>
                <div className='text-sm text-apty-text-secondary'>Interagisce con GMB</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className='text-center'
              >
                <div className='w-20 h-20 bg-apty-accent/20 rounded-full flex items-center justify-center mx-auto mb-3'>
                  <Store className='w-10 h-10 text-apty-accent' />
                </div>
                <div className='text-3xl font-bold text-apty-accent mb-1'>
                  <Counter to={28} suffix='%' />
                </div>
                <div className='text-sm text-apty-text-secondary'>Aumento foot traffic</div>
              </motion.div>
            </div>

            <div className='h-px bg-apty-border-subtle my-8' />

            {/* Google My Business Impact */}
            <div className='grid md:grid-cols-2 gap-8'>
              <div>
                <h4 className='text-lg font-bold text-apty-text-primary mb-4'>📍 GMB Ottimizzato vs Non Ottimizzato</h4>
                <div className='space-y-3'>
                  <div className='flex justify-between items-center'>
                    <span className='text-apty-text-secondary'>Discovery searches</span>
                    <div className='flex gap-2 items-center'>
                      <span className='text-apty-state-error line-through'>Base</span>
                      <span className='text-apty-primary font-bold'>+70%</span>
                    </div>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-apty-text-secondary'>Chiamate dirette</span>
                    <div className='flex gap-2 items-center'>
                      <span className='text-apty-state-error line-through'>Base</span>
                      <span className='text-apty-primary font-bold'>+50%</span>
                    </div>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-apty-text-secondary'>Richieste indicazioni</span>
                    <div className='flex gap-2 items-center'>
                      <span className='text-apty-state-error line-through'>Base</span>
                      <span className='text-apty-primary font-bold'>+50%</span>
                    </div>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-apty-text-secondary'>Ricavi mensili extra</span>
                    <div className='flex gap-2 items-center'>
                      <span className='text-apty-state-error line-through'>€0</span>
                      <span className='text-apty-primary font-bold'>€1.2-3.5K</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className='text-lg font-bold text-apty-text-primary mb-4'>🎯 Conversioni da Ricerca Locale</h4>
                <div className='space-y-3'>
                  <div className='flex justify-between'>
                    <span className='text-apty-text-secondary'>Tasso conversione GMB</span>
                    <span className='font-semibold text-apty-text-primary'>6-11%</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-apty-text-secondary'>Click-to-call rate</span>
                    <span className='font-semibold text-apty-text-primary'>15-20%</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-apty-text-secondary'>Direction request rate</span>
                    <span className='font-semibold text-apty-text-primary'>8-12%</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-apty-text-secondary'>Website visit rate</span>
                    <span className='font-semibold text-apty-text-primary'>25-35%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Industry Impact */}
          <div className='grid md:grid-cols-3 gap-6'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className='bg-apty-bg-base rounded-xl p-6 border border-apty-border-subtle'
            >
              <h3 className='text-lg font-bold text-apty-text-primary mb-3'>🍕 Ristorazione</h3>
              <ul className='space-y-2 text-sm'>
                <li className='flex justify-between'>
                  <span className='text-apty-text-secondary'>Ricerche "vicino a me"</span>
                  <span className='font-semibold text-apty-primary'>82%</span>
                </li>
                <li className='flex justify-between'>
                  <span className='text-apty-text-secondary'>Prenotazioni da GMB</span>
                  <span className='font-semibold text-apty-primary'>+45%</span>
                </li>
                <li className='flex justify-between'>
                  <span className='text-apty-text-secondary'>ROI medio</span>
                  <span className='font-semibold text-apty-primary'>650%</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className='bg-apty-bg-base rounded-xl p-6 border border-apty-border-subtle'
            >
              <h3 className='text-lg font-bold text-apty-text-primary mb-3'>🏥 Servizi Medici</h3>
              <ul className='space-y-2 text-sm'>
                <li className='flex justify-between'>
                  <span className='text-apty-text-secondary'>Ricerche urgenti</span>
                  <span className='font-semibold text-apty-secondary'>67%</span>
                </li>
                <li className='flex justify-between'>
                  <span className='text-apty-text-secondary'>Appuntamenti online</span>
                  <span className='font-semibold text-apty-secondary'>+38%</span>
                </li>
                <li className='flex justify-between'>
                  <span className='text-apty-text-secondary'>Nuovi pazienti/mese</span>
                  <span className='font-semibold text-apty-secondary'>+25</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className='bg-apty-bg-base rounded-xl p-6 border border-apty-border-subtle'
            >
              <h3 className='text-lg font-bold text-apty-text-primary mb-3'>🛍️ Retail</h3>
              <ul className='space-y-2 text-sm'>
                <li className='flex justify-between'>
                  <span className='text-apty-text-secondary'>In-store visits</span>
                  <span className='font-semibold text-apty-tertiary'>+28%</span>
                </li>
                <li className='flex justify-between'>
                  <span className='text-apty-text-secondary'>Click & Collect</span>
                  <span className='font-semibold text-apty-tertiary'>+52%</span>
                </li>
                <li className='flex justify-between'>
                  <span className='text-apty-text-secondary'>Scontrino medio</span>
                  <span className='font-semibold text-apty-tertiary'>+18%</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Source Links */}
        <div className='mt-8 text-center'>
          <p className='text-sm text-apty-text-secondary'>
            Fonti: 
            <a href='https://www.seozoom.com/eeat-google/' target='_blank' rel='noopener noreferrer' className='text-apty-primary hover:underline mx-1'>SEOZoom Italia</a>,
            <a href='https://moz.com/blog/local-business-eeat' target='_blank' rel='noopener noreferrer' className='text-apty-primary hover:underline mx-1'>Moz Local Business</a>
          </p>
        </div>
      </div>
    </section>
  );
}