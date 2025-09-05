'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import { AptyPrimaryButton } from '@/components/apty/AptyButton';
import Link from 'next/link';
import { Counter } from './Counter';

export default function HeroSection() {
  return (
    <section className='relative min-h-[90vh] flex items-center justify-center bg-apty-bg-inverse py-16 md:py-0'>
      <div className='container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='max-w-5xl mx-auto text-center pt-8 md:pt-0'
        >
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className='inline-flex items-center gap-2 px-6 py-3 bg-apty-state-error/20 backdrop-blur-md rounded-full mb-6 md:mb-8 border border-apty-state-error/40'
          >
            <AlertTriangle className='w-4 h-4 text-apty-text-inverse' />
            <span className='text-sm font-medium text-apty-text-inverse'>19-23% of Italian SMB sites get hacked annually</span>
          </motion.div>

          {/* Main Headline */}
          <h1 className='text-[48px] md:text-[72px] leading-[1.1] font-bold font-apty-heading text-apty-text-inverse mb-6'>
            Your site loses
            <br />
            <span className='text-apty-state-error'>€9,000-15,000</span> per hour
            <br />
            when it's down
          </h1>

          {/* Subheadline */}
          <p className='text-xl md:text-2xl text-apty-text-inverse/80 mb-8 max-w-3xl mx-auto leading-relaxed'>
            <span className='font-semibold text-apty-text-inverse'>42-45% of users never return</span> after site errors.
            Italian SMBs face €24,000-38,000 recovery costs from breaches.
            Proactive maintenance costs <span className='font-semibold text-apty-text-inverse'>10x less</span> than emergency fixes.
          </p>

          {/* Key Stats Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className='grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto'
          >
            <div className='text-center'>
              <div className='text-3xl md:text-4xl font-bold text-apty-text-inverse'>
                <Counter to={67} suffix='%' />
              </div>
              <div className='text-xs md:text-sm text-apty-text-inverse/60'>Breaches from outdated software</div>
            </div>
            <div className='text-center'>
              <div className='text-3xl md:text-4xl font-bold text-apty-text-inverse'>
                <Counter to={53} suffix='%' />
              </div>
              <div className='text-xs md:text-sm text-apty-text-inverse/60'>Bounce after errors</div>
            </div>
            <div className='text-center'>
              <div className='text-3xl md:text-4xl font-bold text-apty-text-inverse'>
                €<Counter to={38} suffix='K' />
              </div>
              <div className='text-xs md:text-sm text-apty-text-inverse/60'>Avg recovery cost</div>
            </div>
            <div className='text-center'>
              <div className='text-3xl md:text-4xl font-bold text-apty-text-inverse'>
                <Counter to={220} suffix='%' />
              </div>
              <div className='text-xs md:text-sm text-apty-text-inverse/60'>ROI of prevention</div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className='flex flex-col sm:flex-row gap-4 justify-center mb-16 md:mb-0'
          >
            <Link href='/pricing'>
              <AptyPrimaryButton size='xl' className='min-w-[200px]'>
                Protect Your Business
                <ArrowRight className='w-5 h-5 ml-2' />
              </AptyPrimaryButton>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className='absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block'
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className='w-6 h-10 border-2 border-white/30 rounded-full flex justify-center'>
          <div className='w-1 h-3 bg-apty-bg-base/60 rounded-full mt-2' />
        </div>
      </motion.div>
    </section>
  );
}