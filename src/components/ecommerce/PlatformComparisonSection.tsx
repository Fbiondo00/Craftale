'use client';

import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

export default function PlatformComparisonSection() {
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
            Real <span className='text-apty-primary'>Costs & ROI</span> for Italian SMBs
          </h2>
          <p className='text-xl text-apty-text-secondary max-w-3xl mx-auto'>
            What you'll actually spend and when you'll profit
          </p>
        </motion.div>

        {/* Platform Comparison Table */}
        <div className='max-w-6xl mx-auto overflow-x-auto'>
          <div className='bg-apty-bg-elevated rounded-2xl p-8 min-w-[600px]'>
            <table className='w-full'>
              <thead>
                <tr className='border-b border-apty-border-subtle'>
                  <th className='text-left py-4 text-apty-text-primary font-semibold'>Platform</th>
                  <th className='text-center py-4 text-apty-text-primary font-semibold'>Setup Cost</th>
                  <th className='text-center py-4 text-apty-text-primary font-semibold'>Monthly</th>
                  <th className='text-center py-4 text-apty-text-primary font-semibold'>ROI Timeline</th>
                  <th className='text-center py-4 text-apty-text-primary font-semibold'>Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr className='border-b border-apty-border-subtle'>
                  <td className='py-4 text-apty-text-primary font-medium'>Shopify</td>
                  <td className='py-4 text-center text-apty-text-secondary'>€1.5K-5K</td>
                  <td className='py-4 text-center text-apty-text-secondary'>€29-299</td>
                  <td className='py-4 text-center text-apty-state-success font-semibold'>9-18 months</td>
                  <td className='py-4 text-center text-apty-text-secondary text-sm'>Quick launch</td>
                </tr>
                <tr className='border-b border-apty-border-subtle'>
                  <td className='py-4 text-apty-text-primary font-medium'>WooCommerce</td>
                  <td className='py-4 text-center text-apty-text-secondary'>€1K-4K</td>
                  <td className='py-4 text-center text-apty-text-secondary'>€20-100</td>
                  <td className='py-4 text-center text-apty-accent font-semibold'>9-24 months</td>
                  <td className='py-4 text-center text-apty-text-secondary text-sm'>WordPress users</td>
                </tr>
                <tr className='border-b border-apty-border-subtle'>
                  <td className='py-4 text-apty-text-primary font-medium'>PrestaShop</td>
                  <td className='py-4 text-center text-apty-text-secondary'>€2K-6K</td>
                  <td className='py-4 text-center text-apty-text-secondary'>€50-200</td>
                  <td className='py-4 text-center text-apty-accent font-semibold'>12-24 months</td>
                  <td className='py-4 text-center text-apty-text-secondary text-sm'>Italian SMBs</td>
                </tr>
                <tr>
                  <td className='py-4 text-apty-text-primary font-medium'>Custom (React/Next.js)</td>
                  <td className='py-4 text-center text-apty-text-secondary'>€15K-100K+</td>
                  <td className='py-4 text-center text-apty-text-secondary'>€500-3K+</td>
                  <td className='py-4 text-center text-apty-primary font-semibold'>18-48 months</td>
                  <td className='py-4 text-center text-apty-text-secondary text-sm'>Scale & speed</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Hidden Costs Alert */}
        <div className='max-w-4xl mx-auto mt-8'>
          <div className='bg-apty-state-error/10 rounded-xl p-6 border border-apty-state-error/30'>
            <AlertCircle className='w-6 h-6 text-apty-state-error mb-3' />
            <h4 className='font-semibold text-apty-text-primary mb-2'>Hidden Costs to Consider</h4>
            <div className='grid md:grid-cols-2 gap-4 text-sm text-apty-text-secondary'>
              <ul className='space-y-1'>
                <li>• Fatturazione elettronica integration</li>
                <li>• Payment gateway fees (2.4-3.5%)</li>
                <li>• SSL certificate & security</li>
              </ul>
              <ul className='space-y-1'>
                <li>• GDPR compliance setup</li>
                <li>• Translation & localization</li>
                <li>• Monthly maintenance & updates</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Source Link */}
        <div className='mt-8 text-center'>
          <p className='text-sm text-apty-text-secondary'>
            Fonti: 
            <a href='https://www.consorzionetcomm.it/servizi/studi-e-ricerche/' target='_blank' rel='noopener noreferrer' className='text-apty-primary hover:underline mx-1'>Netcomm Italia</a>,
            <a href='https://www.osservatori.net/it/ricerche/osservatori/ecommerce-b2c' target='_blank' rel='noopener noreferrer' className='text-apty-primary hover:underline mx-1'>Politecnico di Milano</a>
          </p>
        </div>
      </div>
    </section>
  );
}