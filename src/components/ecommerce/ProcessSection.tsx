'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export default function ProcessSection() {
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
            Our <span className='text-apty-primary'>Proven Process</span>
          </h2>
          <p className='text-xl text-apty-text-secondary max-w-3xl mx-auto'>
            From zero to selling in 45 days
          </p>
        </motion.div>

        <div className='max-w-6xl mx-auto'>
          <div className='grid md:grid-cols-3 gap-6'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className='bg-apty-bg-base rounded-xl p-6 border border-apty-border-subtle'
            >
              <div className='text-sm text-apty-primary font-semibold mb-2'>Days 1-15</div>
              <div className='text-2xl font-bold text-apty-text-primary mb-1'>Analysis & Strategy</div>
              <div className='text-sm text-apty-text-secondary mb-4'>Market research, competitor analysis, conversion planning</div>
              <ul className='space-y-2 text-sm'>
                <li className='flex items-start gap-2'>
                  <CheckCircle2 className='w-4 h-4 text-apty-primary mt-0.5' />
                  <span className='text-apty-text-secondary'>Customer personas</span>
                </li>
                <li className='flex items-start gap-2'>
                  <CheckCircle2 className='w-4 h-4 text-apty-primary mt-0.5' />
                  <span className='text-apty-text-secondary'>Payment integrations</span>
                </li>
                <li className='flex items-start gap-2'>
                  <CheckCircle2 className='w-4 h-4 text-apty-primary mt-0.5' />
                  <span className='text-apty-text-secondary'>Shipping strategy</span>
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
              <div className='text-sm text-apty-primary font-semibold mb-2'>Days 16-30</div>
              <div className='text-2xl font-bold text-apty-text-primary mb-1'>Build & Optimize</div>
              <div className='text-sm text-apty-text-secondary mb-4'>Mobile-first development, speed optimization</div>
              <ul className='space-y-2 text-sm'>
                <li className='flex items-start gap-2'>
                  <CheckCircle2 className='w-4 h-4 text-apty-primary mt-0.5' />
                  <span className='text-apty-text-secondary'>Product catalog</span>
                </li>
                <li className='flex items-start gap-2'>
                  <CheckCircle2 className='w-4 h-4 text-apty-primary mt-0.5' />
                  <span className='text-apty-text-secondary'>Checkout flow</span>
                </li>
                <li className='flex items-start gap-2'>
                  <CheckCircle2 className='w-4 h-4 text-apty-primary mt-0.5' />
                  <span className='text-apty-text-secondary'>Trust signals</span>
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
              <div className='text-sm text-apty-tertiary font-semibold mb-2'>Days 31-45</div>
              <div className='text-2xl font-bold text-apty-text-primary mb-1'>Test & Launch</div>
              <div className='text-sm text-apty-text-secondary mb-4'>User testing, compliance checks, go-live</div>
              <ul className='space-y-2 text-sm'>
                <li className='flex items-start gap-2'>
                  <CheckCircle2 className='w-4 h-4 text-apty-tertiary mt-0.5' />
                  <span className='text-apty-text-secondary'>GDPR compliance</span>
                </li>
                <li className='flex items-start gap-2'>
                  <CheckCircle2 className='w-4 h-4 text-apty-tertiary mt-0.5' />
                  <span className='text-apty-text-secondary'>Payment testing</span>
                </li>
                <li className='flex items-start gap-2'>
                  <CheckCircle2 className='w-4 h-4 text-apty-tertiary mt-0.5' />
                  <span className='text-apty-text-secondary'>Launch support</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}