'use client';

import { motion } from 'framer-motion';
import { TrendingDown, TrendingUp, Shield, Activity } from 'lucide-react';

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
            The <span className='text-apty-primary'>ROI of Prevention</span>
          </h2>
          <p className='text-xl text-apty-text-secondary max-w-3xl mx-auto'>
            Proactive maintenance delivers 140-220% ROI vs emergency interventions
          </p>
        </motion.div>

        <div className='max-w-6xl mx-auto'>
          {/* ROI Comparison Visual */}
          <div className='bg-apty-bg-elevated rounded-2xl p-8 mb-8'>
            <h3 className='text-2xl font-bold text-apty-text-primary mb-8 text-center'>Reactive vs Proactive: Annual Cost Comparison</h3>
            
            <div className='grid md:grid-cols-2 gap-8'>
              <div className='p-6 bg-apty-state-error/5 rounded-xl border border-apty-state-error/20'>
                <div className='flex items-center gap-3 mb-4'>
                  <TrendingDown className='w-8 h-8 text-apty-state-error' />
                  <h4 className='text-xl font-bold text-apty-text-primary'>Reactive Maintenance</h4>
                </div>
                <div className='space-y-3'>
                  <div className='flex justify-between'>
                    <span className='text-apty-text-secondary'>Emergency repairs (3x/year)</span>
                    <span className='font-semibold text-apty-text-primary'>€2,100-10,500</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-apty-text-secondary'>Staff overtime</span>
                    <span className='font-semibold text-apty-text-primary'>€24,000-60,000</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-apty-text-secondary'>Lost productivity</span>
                    <span className='font-semibold text-apty-text-primary'>€6,000-24,000</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-apty-text-secondary'>Missed opportunities</span>
                    <span className='font-semibold text-apty-text-primary'>€60,000+</span>
                  </div>
                  <div className='h-px bg-apty-border-subtle my-3' />
                  <div className='flex justify-between text-lg'>
                    <span className='font-semibold text-apty-text-primary'>Total Annual Cost</span>
                    <span className='font-bold text-apty-state-error text-xl'>€92,100-154,500</span>
                  </div>
                </div>
              </div>

              <div className='p-6 bg-apty-state-success/5 rounded-xl border border-apty-state-success/20'>
                <div className='flex items-center gap-3 mb-4'>
                  <TrendingUp className='w-8 h-8 text-apty-state-success' />
                  <h4 className='text-xl font-bold text-apty-text-primary'>Proactive Maintenance</h4>
                </div>
                <div className='space-y-3'>
                  <div className='flex justify-between'>
                    <span className='text-apty-text-secondary'>Monthly plan</span>
                    <span className='font-semibold text-apty-text-primary'>€4,800-12,000</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-apty-text-secondary'>Prevented issues</span>
                    <span className='font-semibold text-apty-state-success'>95%</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-apty-text-secondary'>Uptime achieved</span>
                    <span className='font-semibold text-apty-state-success'>99.95%</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-apty-text-secondary'>SEO boost</span>
                    <span className='font-semibold text-apty-state-success'>+25-40%</span>
                  </div>
                  <div className='h-px bg-apty-border-subtle my-3' />
                  <div className='flex justify-between text-lg'>
                    <span className='font-semibold text-apty-text-primary'>Total Investment</span>
                    <span className='font-bold text-apty-state-success text-xl'>€4,800-12,000</span>
                  </div>
                </div>
              </div>
            </div>

            <div className='mt-8 text-center'>
              <div className='inline-block p-6 bg-apty-primary/10 rounded-xl'>
                <div className='text-sm text-apty-text-secondary mb-2'>Annual Savings with Proactive Maintenance</div>
                <div className='text-4xl font-bold text-apty-primary'>€87,300-142,500</div>
                <div className='text-lg font-semibold text-apty-state-success mt-2'>ROI: 140-220%</div>
              </div>
            </div>
          </div>

          {/* Additional Benefits */}
          <div className='grid md:grid-cols-3 gap-6'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className='bg-apty-bg-elevated rounded-xl p-6 border border-apty-border-subtle'
            >
              <TrendingUp className='w-10 h-10 text-apty-primary mb-4' />
              <h3 className='text-xl font-bold text-apty-text-primary mb-2'>SEO Benefits</h3>
              <div className='text-3xl font-bold text-apty-primary mb-2'>+25-40%</div>
              <p className='text-sm text-apty-text-secondary'>
                Higher organic traffic from improved Core Web Vitals and uptime
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className='bg-apty-bg-elevated rounded-xl p-6 border border-apty-border-subtle'
            >
              <Shield className='w-10 h-10 text-apty-secondary mb-4' />
              <h3 className='text-xl font-bold text-apty-text-primary mb-2'>Legal Protection</h3>
              <div className='text-3xl font-bold text-apty-secondary mb-2'>100%</div>
              <p className='text-sm text-apty-text-secondary'>
                GDPR compliance maintained, avoiding fines up to €27,000
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className='bg-apty-bg-elevated rounded-xl p-6 border border-apty-border-subtle'
            >
              <Activity className='w-10 h-10 text-apty-tertiary mb-4' />
              <h3 className='text-xl font-bold text-apty-text-primary mb-2'>Performance</h3>
              <div className='text-3xl font-bold text-apty-tertiary mb-2'>{'<2.5s'}</div>
              <p className='text-sm text-apty-text-secondary'>
                Load time maintained, preventing 40% abandonment rate
              </p>
            </motion.div>
          </div>
        </div>

        {/* Source Links */}
        <div className='mt-8 text-center'>
          <p className='text-sm text-apty-text-secondary'>
            Fonti: 
            <a href='https://about.fb.com/news/2022/06/taking-a-deep-dive-into-the-digitisation-of-italian-smbs/' target='_blank' rel='noopener noreferrer' className='text-apty-primary hover:underline mx-1'>Meta Italy SMB Report</a>,
            <a href='https://www.datainsightsmarket.com/reports/website-maintenance-services-1949156' target='_blank' rel='noopener noreferrer' className='text-apty-primary hover:underline mx-1'>Data Insights Market 2024</a>
          </p>
        </div>
      </div>
    </section>
  );
}