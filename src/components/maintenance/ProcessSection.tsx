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
            Our <span className='text-apty-primary'>Maintenance Process</span>
          </h2>
          <p className='text-xl text-apty-text-secondary max-w-3xl mx-auto'>
            24/7 monitoring, proactive updates, and guaranteed uptime
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
              <div className='text-sm text-apty-primary font-semibold mb-2'>Phase 1</div>
              <div className='text-2xl font-bold text-apty-text-primary mb-1'>Audit & Setup</div>
              <div className='text-sm text-apty-text-secondary mb-4'>Complete security and performance assessment</div>
              <ul className='space-y-2 text-sm'>
                <li className='flex items-start gap-2'>
                  <CheckCircle2 className='w-4 h-4 text-apty-primary mt-0.5' />
                  <span className='text-apty-text-secondary'>Security vulnerabilities scan</span>
                </li>
                <li className='flex items-start gap-2'>
                  <CheckCircle2 className='w-4 h-4 text-apty-primary mt-0.5' />
                  <span className='text-apty-text-secondary'>Performance baseline</span>
                </li>
                <li className='flex items-start gap-2'>
                  <CheckCircle2 className='w-4 h-4 text-apty-primary mt-0.5' />
                  <span className='text-apty-text-secondary'>Backup strategy design</span>
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
              <div className='text-sm text-apty-primary font-semibold mb-2'>Phase 2</div>
              <div className='text-2xl font-bold text-apty-text-primary mb-1'>Monitor & Protect</div>
              <div className='text-sm text-apty-text-secondary mb-4'>24/7 automated monitoring and protection</div>
              <ul className='space-y-2 text-sm'>
                <li className='flex items-start gap-2'>
                  <CheckCircle2 className='w-4 h-4 text-apty-primary mt-0.5' />
                  <span className='text-apty-text-secondary'>Real-time uptime monitoring</span>
                </li>
                <li className='flex items-start gap-2'>
                  <CheckCircle2 className='w-4 h-4 text-apty-primary mt-0.5' />
                  <span className='text-apty-text-secondary'>Automated backups</span>
                </li>
                <li className='flex items-start gap-2'>
                  <CheckCircle2 className='w-4 h-4 text-apty-primary mt-0.5' />
                  <span className='text-apty-text-secondary'>Security threat detection</span>
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
              <div className='text-sm text-apty-tertiary font-semibold mb-2'>Phase 3</div>
              <div className='text-2xl font-bold text-apty-text-primary mb-1'>Optimize & Report</div>
              <div className='text-sm text-apty-text-secondary mb-4'>Continuous improvement and transparency</div>
              <ul className='space-y-2 text-sm'>
                <li className='flex items-start gap-2'>
                  <CheckCircle2 className='w-4 h-4 text-apty-tertiary mt-0.5' />
                  <span className='text-apty-text-secondary'>Monthly performance reports</span>
                </li>
                <li className='flex items-start gap-2'>
                  <CheckCircle2 className='w-4 h-4 text-apty-tertiary mt-0.5' />
                  <span className='text-apty-text-secondary'>SEO health monitoring</span>
                </li>
                <li className='flex items-start gap-2'>
                  <CheckCircle2 className='w-4 h-4 text-apty-tertiary mt-0.5' />
                  <span className='text-apty-text-secondary'>Proactive recommendations</span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Service Level Agreement */}
          <div className='mt-12 bg-apty-bg-base rounded-2xl p-8'>
            <h3 className='text-2xl font-bold text-apty-text-primary mb-6 text-center'>Our Service Level Guarantees</h3>
            <div className='grid md:grid-cols-4 gap-6'>
              <div className='text-center'>
                <div className='text-3xl font-bold text-apty-primary mb-2'>99.95%</div>
                <div className='text-sm text-apty-text-secondary'>Uptime SLA</div>
              </div>
              <div className='text-center'>
                <div className='text-3xl font-bold text-apty-secondary mb-2'>{'<1 hour'}</div>
                <div className='text-sm text-apty-text-secondary'>Response time</div>
              </div>
              <div className='text-center'>
                <div className='text-3xl font-bold text-apty-tertiary mb-2'>24/7</div>
                <div className='text-sm text-apty-text-secondary'>Monitoring</div>
              </div>
              <div className='text-center'>
                <div className='text-3xl font-bold text-apty-accent mb-2'>100%</div>
                <div className='text-sm text-apty-text-secondary'>Italian support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}