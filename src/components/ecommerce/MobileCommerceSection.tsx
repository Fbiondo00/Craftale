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
            <span className='text-apty-primary'>55.2%</span> Buy on Mobile
          </h2>
          <p className='text-xl text-apty-text-secondary max-w-3xl mx-auto'>
            Mobile-first isn't optional. It's survival.
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
              <div className='text-sm text-apty-text-secondary'>Mobile traffic</div>
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
              <div className='text-sm text-apty-text-secondary'>Max load time</div>
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
              <div className='text-sm text-apty-text-secondary'>Social commerce</div>
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
              <div className='text-sm text-apty-text-secondary'>Conversion boost</div>
            </motion.div>
          </div>

          {/* Mobile Optimization Features */}
          <div className='bg-gradient-to-br from-apty-primary/5 to-apty-secondary/5 rounded-2xl p-8 border border-apty-primary/20'>
            <h3 className='text-2xl font-bold text-apty-text-primary mb-6'>Mobile-First Features That Convert</h3>
            
            <div className='grid md:grid-cols-2 gap-6'>
              <div className='space-y-3'>
                <div className='flex items-start gap-3'>
                  <CheckCircle2 className='w-5 h-5 text-apty-primary mt-1' />
                  <div>
                    <div className='font-medium text-apty-text-primary'>One-Click Purchase</div>
                    <div className='text-sm text-apty-text-secondary'>+40% conversion vs multi-step</div>
                  </div>
                </div>
                <div className='flex items-start gap-3'>
                  <CheckCircle2 className='w-5 h-5 text-apty-primary mt-1' />
                  <div>
                    <div className='font-medium text-apty-text-primary'>Apple/Google Pay</div>
                    <div className='text-sm text-apty-text-secondary'>67% of young shoppers prefer</div>
                  </div>
                </div>
                <div className='flex items-start gap-3'>
                  <CheckCircle2 className='w-5 h-5 text-apty-primary mt-1' />
                  <div>
                    <div className='font-medium text-apty-text-primary'>Swipe Galleries</div>
                    <div className='text-sm text-apty-text-secondary'>Natural mobile navigation</div>
                  </div>
                </div>
              </div>
              <div className='space-y-3'>
                <div className='flex items-start gap-3'>
                  <CheckCircle2 className='w-5 h-5 text-apty-primary mt-1' />
                  <div>
                    <div className='font-medium text-apty-text-primary'>Thumb-Friendly Design</div>
                    <div className='text-sm text-apty-text-secondary'>All CTAs in thumb reach</div>
                  </div>
                </div>
                <div className='flex items-start gap-3'>
                  <CheckCircle2 className='w-5 h-5 text-apty-primary mt-1' />
                  <div>
                    <div className='font-medium text-apty-text-primary'>Progressive Web App</div>
                    <div className='text-sm text-apty-text-secondary'>App-like experience, no download</div>
                  </div>
                </div>
                <div className='flex items-start gap-3'>
                  <CheckCircle2 className='w-5 h-5 text-apty-primary mt-1' />
                  <div>
                    <div className='font-medium text-apty-text-primary'>Offline Capability</div>
                    <div className='text-sm text-apty-text-secondary'>Works even with poor connection</div>
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