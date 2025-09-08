'use client';

import { motion } from 'framer-motion';
import { Smartphone, Clock, Package, Zap, CheckCircle2 } from 'lucide-react';

export default function MobileCommerceSection() {
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
            <span className='text-apty-primary'>55.2%</span> Acquistano da Mobile
          </h2>
          <p className='text-xl text-apty-text-secondary max-w-3xl mx-auto'>
            Il mobile-first non è un'opzione. È sopravvivenza.
          </p>
        </motion.div>

        <div className='max-w-6xl mx-auto'>
          {/* Mobile Stats Grid */}
          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className='bg-apty-bg-elevated rounded-xl p-6 text-center'
            >
              <Smartphone className='w-12 h-12 text-apty-primary mx-auto mb-4' />
              <div className='text-3xl font-bold text-apty-text-primary mb-1'>79%</div>
              <div className='text-sm text-apty-text-secondary'>Traffico mobile</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className='bg-apty-bg-elevated rounded-xl p-6 text-center'
            >
              <Clock className='w-12 h-12 text-apty-state-error mx-auto mb-4' />
              <div className='text-3xl font-bold text-apty-state-error mb-1'>3s</div>
              <div className='text-sm text-apty-text-secondary'>Tempo massimo di caricamento</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className='bg-apty-bg-elevated rounded-xl p-6 text-center'
            >
              <Package className='w-12 h-12 text-apty-secondary mx-auto mb-4' />
              <div className='text-3xl font-bold text-apty-secondary mb-1'>55%</div>
              <div className='text-sm text-apty-text-secondary'>Commercio social</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className='bg-apty-bg-elevated rounded-xl p-6 text-center'
            >
              <Zap className='w-12 h-12 text-apty-accent mx-auto mb-4' />
              <div className='text-3xl font-bold text-apty-accent mb-1'>+30%</div>
              <div className='text-sm text-apty-text-secondary'>Aumento conversioni</div>
            </motion.div>
          </div>

          {/* Mobile Optimization Features */}
          <div className='bg-gradient-to-br from-apty-primary/5 to-apty-secondary/5 rounded-2xl p-8 border border-apty-primary/20'>
            <h3 className='text-2xl font-bold text-apty-text-primary mb-6'>Funzionalità Mobile-First che Convertono</h3>
            
            <div className='grid md:grid-cols-2 gap-6'>
              <div className='space-y-3'>
                <div className='flex items-start gap-3'>
                  <CheckCircle2 className='w-5 h-5 text-apty-primary mt-1' />
                  <div>
                    <div className='font-medium text-apty-text-primary'>Acquisto con Un Click</div>
                    <div className='text-sm text-apty-text-secondary'>+40% conversione vs multi-step</div>
                  </div>
                </div>
                <div className='flex items-start gap-3'>
                  <CheckCircle2 className='w-5 h-5 text-apty-primary mt-1' />
                  <div>
                    <div className='font-medium text-apty-text-primary'>Apple/Google Pay</div>
                    <div className='text-sm text-apty-text-secondary'>Il 67% dei giovani acquirenti preferisce</div>
                  </div>
                </div>
                <div className='flex items-start gap-3'>
                  <CheckCircle2 className='w-5 h-5 text-apty-primary mt-1' />
                  <div>
                    <div className='font-medium text-apty-text-primary'>Gallerie a Scorrimento</div>
                    <div className='text-sm text-apty-text-secondary'>Navigazione mobile naturale</div>
                  </div>
                </div>
              </div>
              <div className='space-y-3'>
                <div className='flex items-start gap-3'>
                  <CheckCircle2 className='w-5 h-5 text-apty-primary mt-1' />
                  <div>
                    <div className='font-medium text-apty-text-primary'>Design a Portata di Pollice</div>
                    <div className='text-sm text-apty-text-secondary'>Tutte le CTA a portata di pollice</div>
                  </div>
                </div>
                <div className='flex items-start gap-3'>
                  <CheckCircle2 className='w-5 h-5 text-apty-primary mt-1' />
                  <div>
                    <div className='font-medium text-apty-text-primary'>Progressive Web App</div>
                    <div className='text-sm text-apty-text-secondary'>Esperienza tipo app, senza download</div>
                  </div>
                </div>
                <div className='flex items-start gap-3'>
                  <CheckCircle2 className='w-5 h-5 text-apty-primary mt-1' />
                  <div>
                    <div className='font-medium text-apty-text-primary'>Funzionalità Offline</div>
                    <div className='text-sm text-apty-text-secondary'>Funziona anche con connessione debole</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Source Link */}
        <div className='mt-8 text-center'>
          <p className='text-sm text-apty-text-secondary'>
            Fonte: 
            <a href='https://www.statista.com/topics/6924/mobile-commerce-in-italy/' target='_blank' rel='noopener noreferrer' className='text-apty-primary hover:underline mx-1'>Statista Mobile Commerce Italia</a>
          </p>
        </div>
      </div>
    </section>
  );
}