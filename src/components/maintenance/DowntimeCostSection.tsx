'use client';

import { motion } from 'framer-motion';
import { Clock, Timer, Shield } from 'lucide-react';
import { Counter } from './Counter';

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
            The <span className='text-apty-state-error'>Real Cost</span> of Poor Maintenance
          </h2>
          <p className='text-xl text-apty-text-secondary max-w-3xl mx-auto'>
            Every hour of downtime costs Italian SMBs thousands in lost revenue and reputation
          </p>
        </motion.div>

        {/* Downtime Calculator Visual */}
        <div className='max-w-5xl mx-auto mb-16'>
          <div className='bg-apty-bg-elevated rounded-2xl p-8 border border-apty-border-subtle'>
            <h3 className='text-2xl font-bold text-apty-text-primary mb-8 text-center'>Downtime Impact Calculator</h3>
            
            <div className='grid md:grid-cols-3 gap-8'>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className='text-center'
              >
                <Clock className='w-12 h-12 text-apty-accent mx-auto mb-4' />
                <div className='text-lg font-semibold text-apty-text-primary mb-2'>1 Hour Downtime</div>
                <div className='text-3xl font-bold text-apty-state-error mb-2'>€9,000-15,000</div>
                <div className='text-sm text-apty-text-secondary'>Direct revenue loss</div>
                <div className='mt-4 space-y-2'>
                  <div className='flex justify-between text-sm'>
                    <span className='text-apty-text-secondary'>Lost sales</span>
                    <span className='font-semibold text-apty-text-primary'>€5,000</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='text-apty-text-secondary'>Recovery costs</span>
                    <span className='font-semibold text-apty-text-primary'>€2,000</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='text-apty-text-secondary'>Productivity loss</span>
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
                <div className='text-lg font-semibold text-apty-text-primary mb-2'>24 Hour Downtime</div>
                <div className='text-3xl font-bold text-apty-state-error mb-2'>€216,000-360,000</div>
                <div className='text-sm text-apty-text-secondary'>Catastrophic impact</div>
                <div className='mt-4 space-y-2'>
                  <div className='flex justify-between text-sm'>
                    <span className='text-apty-text-secondary'>Customer loss</span>
                    <span className='font-semibold text-apty-state-error'>42-45%</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='text-apty-text-secondary'>SEO damage</span>
                    <span className='font-semibold text-apty-state-error'>-25%</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='text-apty-text-secondary'>Recovery time</span>
                    <span className='font-semibold text-apty-state-error'>2-6 months</span>
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
                <div className='text-lg font-semibold text-apty-text-primary mb-2'>With Maintenance</div>
                <div className='text-3xl font-bold text-apty-primary mb-2'>€50-900/month</div>
                <div className='text-sm text-apty-text-secondary'>Prevention cost</div>
                <div className='mt-4 space-y-2'>
                  <div className='flex justify-between text-sm'>
                    <span className='text-apty-text-secondary'>Uptime</span>
                    <span className='font-semibold text-apty-state-success'>99.95%</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='text-apty-text-secondary'>Issues prevented</span>
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
                <strong>Italian SMB Reality:</strong> 2-3 days of downtime can mean €10,000 lost in peak season, permanent customer loss, and months of reputation recovery
              </p>
            </div>
          </div>
        </div>

        {/* Source Links */}
        <div className='text-center'>
          <p className='text-sm text-apty-text-secondary'>
            Fonti: 
            <a href='https://www.statista.com/statistics/1453441/italy-average-cost-incurred-by-a-data-breach/' target='_blank' rel='noopener noreferrer' className='text-apty-primary hover:underline mx-1'>Statista Italia 2024</a>,
            <a href='https://www.eib.org/attachments/thematic/digitalisation_of_smes_in_italy_summary_en.pdf' target='_blank' rel='noopener noreferrer' className='text-apty-primary hover:underline mx-1'>European Investment Bank</a>
          </p>
        </div>
      </div>
    </section>
  );
}