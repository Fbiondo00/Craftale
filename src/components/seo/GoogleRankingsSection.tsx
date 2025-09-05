'use client';

import { motion } from 'framer-motion';
import { MousePointer, Smartphone, Monitor } from 'lucide-react';
import { Counter } from './Counter';

export default function GoogleRankingsSection() {
  const ctrData = [
    { position: 'Posizione 1', value: 42, highlight: true },
    { position: 'Posizione 2', value: 17, highlight: false },
    { position: 'Posizione 3', value: 10, highlight: false },
    { position: 'Posizioni 4-10', value: 27, highlight: false },
    { position: 'Pagina 2+', value: 4, highlight: false }
  ];

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
            La <span className='text-apty-primary'>Verità sui Clic</span> Google
          </h2>
          <p className='text-xl text-apty-text-secondary max-w-3xl mx-auto'>
            Distribuzione del Click-Through Rate per posizione nei risultati di ricerca
          </p>
        </motion.div>

        {/* Professional CTR Bar Chart */}
        <div className='max-w-5xl mx-auto mb-16'>
          <div className='bg-apty-bg-elevated rounded-2xl p-8 border border-apty-border-subtle'>
            {/* Chart Title and Legend */}
            <div className='flex justify-between items-center mb-8'>
              <h3 className='text-xl font-semibold text-apty-text-primary'>Click-Through Rate per Posizione</h3>
              <div className='text-sm text-apty-text-secondary'>Dati mercato italiano 2024-2025</div>
            </div>
            
            {/* Bar Chart Visualization */}
            <div className='relative pl-8 md:pl-12'>
              {/* Y-axis labels - positioned to align with grid lines */}
              <div className='absolute left-0 top-0 h-64 flex flex-col justify-between text-xs text-apty-text-secondary w-8'>
                <span className='text-right -mt-2'>45%</span>
                <span className='text-right'>36%</span>
                <span className='text-right'>27%</span>
                <span className='text-right'>18%</span>
                <span className='text-right'>9%</span>
                <span className='text-right -mb-2'>0%</span>
              </div>

              {/* Grid lines */}
              <div className='absolute inset-0 left-8 md:left-12 h-64 flex flex-col justify-between pointer-events-none'>
                {[...Array(6)].map((_, i) => (
                  <div key={i} className='h-px bg-apty-border-subtle/30' />
                ))}
              </div>

              {/* Bars Container */}
              <div className='relative flex items-end justify-between gap-2 md:gap-4 lg:gap-8 h-64 ml-2 md:ml-4'>
                {ctrData.map((item, index) => {
                  // Map values to pixel heights for better visibility
                  let barHeight;
                  
                  if (item.value === 4) {
                    barHeight = 20; // 20px for 4% (minimum visible)
                  } else if (item.value === 10) {
                    barHeight = 51; // proportional
                  } else if (item.value === 17) {
                    barHeight = 89; // proportional
                  } else if (item.value === 27) {
                    barHeight = 140; // proportional
                  } else if (item.value === 42) {
                    barHeight = 217; // proportional (85% of 256px)
                  }
                  
                  return (
                    <div
                      key={item.position}
                      className='flex-1 flex flex-col items-center justify-end'
                    >
                      {/* Value Label */}
                      <div className='text-sm md:text-lg font-bold text-apty-text-primary mb-2'>
                        {item.value}%
                      </div>
                      
                      {/* Bar - using fixed pixel height */}
                      <div 
                        className='w-full rounded-t-lg bg-apty-primary hover:bg-apty-primary/80 transition-colors'
                        style={{ 
                          height: `${barHeight}px`
                        }}
                      />
                    </div>
                  );
                })}
              </div>

              {/* X-axis labels */}
              <div className='flex justify-between mt-4 ml-2 md:ml-4'>
                {ctrData.map((item) => (
                  <div key={item.position} className='flex-1 text-center'>
                    <div className='text-xs md:text-sm text-apty-text-primary font-medium'>
                      {item.position.replace('Posizione ', '#').replace('Posizioni ', '#').replace('Pagina ', 'Pag. ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Table */}
            <div className='mt-8 pt-8 border-t border-apty-border-subtle'>
              <table className='w-full'>
                <thead>
                  <tr className='text-left text-sm text-apty-text-secondary'>
                    <th className='pb-2'>Posizione</th>
                    <th className='pb-2 text-right'>CTR</th>
                    <th className='pb-2 text-right'>Cumulativo</th>
                    <th className='pb-2 text-right'>Fattore</th>
                  </tr>
                </thead>
                <tbody className='text-sm'>
                  <tr className='border-t border-apty-border-subtle/50'>
                    <td className='py-2 font-medium text-apty-text-primary'>#1</td>
                    <td className='py-2 text-right font-semibold text-apty-primary'>42%</td>
                    <td className='py-2 text-right text-apty-text-secondary'>42%</td>
                    <td className='py-2 text-right text-apty-text-secondary'>1.0x</td>
                  </tr>
                  <tr className='border-t border-apty-border-subtle/50'>
                    <td className='py-2 font-medium text-apty-text-primary'>#2</td>
                    <td className='py-2 text-right font-semibold'>17%</td>
                    <td className='py-2 text-right text-apty-text-secondary'>59%</td>
                    <td className='py-2 text-right text-apty-text-secondary'>0.4x</td>
                  </tr>
                  <tr className='border-t border-apty-border-subtle/50'>
                    <td className='py-2 font-medium text-apty-text-primary'>#3</td>
                    <td className='py-2 text-right font-semibold'>10%</td>
                    <td className='py-2 text-right text-apty-text-secondary'>69%</td>
                    <td className='py-2 text-right text-apty-text-secondary'>0.24x</td>
                  </tr>
                  <tr className='border-t border-apty-border-subtle/50'>
                    <td className='py-2 font-medium text-apty-text-primary'>#4-10</td>
                    <td className='py-2 text-right font-semibold'>27%</td>
                    <td className='py-2 text-right text-apty-text-secondary'>96%</td>
                    <td className='py-2 text-right text-apty-text-secondary'>0.64x</td>
                  </tr>
                  <tr className='border-t border-apty-border-subtle/50'>
                    <td className='py-2 font-medium text-apty-text-secondary'>Pag. 2+</td>
                    <td className='py-2 text-right text-apty-text-secondary'>4%</td>
                    <td className='py-2 text-right text-apty-text-secondary'>100%</td>
                    <td className='py-2 text-right text-apty-text-secondary'>0.1x</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Key Insight */}
            <div className='mt-6 p-4 bg-apty-primary/5 rounded-lg border border-apty-primary/20'>
              <p className='text-sm text-apty-text-primary'>
                <strong>Insight chiave:</strong> La posizione 1 genera 2.5x più clic della posizione 2 e 4.2x più della posizione 3. 
                Il 96% di tutti i clic avviene nella prima pagina dei risultati.
              </p>
            </div>
          </div>
        </div>

        {/* Mobile vs Desktop */}
        <div className='grid md:grid-cols-2 gap-6 max-w-5xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='bg-apty-bg-elevated rounded-xl p-6 border border-apty-border-subtle'
          >
            <div className='flex items-center gap-3 mb-4'>
              <Smartphone className='w-8 h-8 text-apty-primary' />
              <h3 className='text-xl font-bold text-apty-text-primary'>Mobile (71% ricerche)</h3>
            </div>
            <div className='space-y-3'>
              <div className='flex justify-between'>
                <span className='text-apty-text-secondary'>CTR Top 3</span>
                <span className='font-semibold text-apty-primary'>60%</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-apty-text-secondary'>Conversione media</span>
                <span className='font-semibold text-apty-text-primary'>1.9-2.2%</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-apty-text-secondary'>Ricerche locali</span>
                <span className='font-semibold text-apty-text-primary'>46%</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-apty-text-secondary'>Zero-click</span>
                <span className='font-semibold text-apty-state-warning'>60%</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className='bg-apty-bg-elevated rounded-xl p-6 border border-apty-border-subtle'
          >
            <div className='flex items-center gap-3 mb-4'>
              <Monitor className='w-8 h-8 text-apty-secondary' />
              <h3 className='text-xl font-bold text-apty-text-primary'>Desktop (29% ricerche)</h3>
            </div>
            <div className='space-y-3'>
              <div className='flex justify-between'>
                <span className='text-apty-text-secondary'>CTR Top 3</span>
                <span className='font-semibold text-apty-secondary'>50%</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-apty-text-secondary'>Conversione media</span>
                <span className='font-semibold text-apty-text-primary'>2.7-3.1%</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-apty-text-secondary'>Ricerche B2B</span>
                <span className='font-semibold text-apty-text-primary'>55%</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-apty-text-secondary'>Zero-click</span>
                <span className='font-semibold text-apty-state-warning'>45%</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Source Links */}
        <div className='mt-8 text-center'>
          <p className='text-sm text-apty-text-secondary'>
            Fonti: 
            <a href='https://www.ictprosdo.com/tag/crescita-digitale-pmi/' target='_blank' rel='noopener noreferrer' className='text-apty-primary hover:underline mx-1'>ICT ProsDo Italia</a>,
            <a href='https://www.consorzionetcomm.it' target='_blank' rel='noopener noreferrer' className='text-apty-primary hover:underline mx-1'>Consorzio Netcomm</a>
          </p>
        </div>
      </div>
    </section>
  );
}