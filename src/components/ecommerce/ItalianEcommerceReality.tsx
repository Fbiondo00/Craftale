'use client';

import { motion } from 'framer-motion';
import { 
  ShoppingCart, CreditCard, TrendingUp,
  CheckCircle2, AlertCircle, Euro, Users
} from 'lucide-react';

export default function ItalianEcommerceReality() {
  return (
    <section className='py-24 md:py-32 bg-apty-bg-subtle overflow-hidden'>
      <div className='container mx-auto px-0 md:px-4 max-w-7xl'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='text-center mb-16'
        >
          <h2 className='text-[40px] md:text-[56px] leading-[1.2] font-bold font-apty-heading text-apty-text-primary mb-4'>
            La Realtà dell'<span className='text-apty-primary'>E-commerce Italiano</span>
          </h2>
          <p className='text-xl text-apty-text-secondary max-w-3xl mx-auto'>
            Dati reali delle PMI italiane. Problemi reali. Soluzioni concrete.
          </p>
        </motion.div>

        {/* Enhanced Wavy Funnel Visualization with Multiple Layers */}
        <div className='w-full'>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className='bg-gradient-to-br from-[#1a1b3a] via-[#2d1b69] to-[#1a1b3a] mx-2 sm:mx-4 md:mx-auto md:max-w-7xl rounded-xl md:rounded-3xl overflow-hidden relative aspect-[16/9] md:min-h-[500px] min-h-[220px]'
          >
            {/* SVG Wavy Funnel */}
            <svg viewBox='0 0 1400 600' className='absolute inset-0 w-full h-full' preserveAspectRatio='xMidYMid meet'>
              <defs>
                {/* Multiple gradients for layers */}
                <linearGradient id='waveGradient1' x1='0%' y1='0%' x2='100%' y2='0%'>
                  <stop offset='0%' style={{ stopColor: '#4F46E5', stopOpacity: 1 }} />
                  <stop offset='50%' style={{ stopColor: '#7C3AED', stopOpacity: 0.8 }} />
                  <stop offset='100%' style={{ stopColor: '#6366F1', stopOpacity: 0.4 }} />
                </linearGradient>
                
                <linearGradient id='waveGradient2' x1='0%' y1='0%' x2='100%' y2='0%'>
                  <stop offset='0%' style={{ stopColor: '#3B82F6', stopOpacity: 0.6 }} />
                  <stop offset='50%' style={{ stopColor: '#8B5CF6', stopOpacity: 0.4 }} />
                  <stop offset='100%' style={{ stopColor: '#6366F1', stopOpacity: 0.2 }} />
                </linearGradient>
                
                <linearGradient id='waveGradient3' x1='0%' y1='0%' x2='100%' y2='0%'>
                  <stop offset='0%' style={{ stopColor: '#2563EB', stopOpacity: 0.3 }} />
                  <stop offset='50%' style={{ stopColor: '#7C3AED', stopOpacity: 0.2 }} />
                  <stop offset='100%' style={{ stopColor: '#4F46E5', stopOpacity: 0.1 }} />
                </linearGradient>
              </defs>
              
              {/* Background wave layer - darkest */}
              <motion.path
                d='M 0,200 
                   C 100,200 200,180 350,180
                   C 450,180 500,220 700,240
                   C 850,250 950,270 1050,275
                   C 1150,280 1250,285 1400,290
                   L 1400,310
                   C 1250,315 1150,320 1050,325
                   C 950,330 850,350 700,360
                   C 500,380 450,420 350,420
                   C 200,420 100,400 0,400
                   Z'
                fill='url(#waveGradient3)'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.2 }}
              />
              
              {/* Middle wave layer */}
              <motion.path
                d='M 0,220 
                   C 100,220 200,210 350,210
                   C 450,210 500,240 700,260
                   C 850,270 950,285 1050,290
                   C 1150,295 1250,298 1400,300
                   L 1400,300
                   C 1250,302 1150,305 1050,310
                   C 950,315 850,330 700,340
                   C 500,360 450,390 350,390
                   C 200,390 100,380 0,380
                   Z'
                fill='url(#waveGradient2)'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.4 }}
              />
              
              {/* Main funnel wave - brightest */}
              <motion.path
                d='M 0,250 
                   C 100,250 200,245 350,245
                   C 450,245 500,265 700,280
                   C 850,290 950,295 1050,298
                   C 1150,299 1250,299.5 1400,300
                   L 1400,300
                   C 1250,300.5 1150,301 1050,302
                   C 950,305 850,310 700,320
                   C 500,335 450,355 350,355
                   C 200,355 100,350 0,350
                   Z'
                fill='url(#waveGradient1)'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.6 }}
              />
              
              {/* Stage divider lines */}
              <line x1='350' y1='100' x2='350' y2='500' stroke='rgba(255,255,255,0.1)' strokeWidth='1' />
              <line x1='700' y1='100' x2='700' y2='500' stroke='rgba(255,255,255,0.1)' strokeWidth='1' />
              <line x1='1050' y1='100' x2='1050' y2='500' stroke='rgba(255,255,255,0.1)' strokeWidth='1' />
            </svg>
            
            {/* Content overlay */}
            <div className='relative z-10 h-full flex flex-col justify-between p-1 sm:p-4 md:p-8 lg:p-12'>
              {/* Top labels */}
              <div className='grid grid-cols-4 gap-0.5 sm:gap-2 md:gap-4 text-white'>
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className='text-center'
                >
                  <div className='flex justify-center mb-1 sm:mb-2'>
                    <div className='w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-blue-500/20 rounded-full flex items-center justify-center'>
                      <Users className='w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-blue-400' />
                    </div>
                  </div>
                  <p className='text-[9px] sm:text-xs md:text-sm font-medium text-white/70 uppercase tracking-tighter sm:tracking-wider'>Visitatori</p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className='text-center'
                >
                  <div className='flex justify-center mb-1 sm:mb-2'>
                    <div className='w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-purple-500/20 rounded-full flex items-center justify-center'>
                      <ShoppingCart className='w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-purple-400' />
                    </div>
                  </div>
                  <p className='text-[9px] sm:text-xs md:text-sm font-medium text-white/70 uppercase tracking-tighter sm:tracking-wider'>Aggiunge al Carrello</p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className='text-center'
                >
                  <div className='flex justify-center mb-1 sm:mb-2'>
                    <div className='w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-indigo-500/20 rounded-full flex items-center justify-center'>
                      <CreditCard className='w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-indigo-400' />
                    </div>
                  </div>
                  <p className='text-[9px] sm:text-xs md:text-sm font-medium text-white/70 uppercase tracking-tighter sm:tracking-wider'>Checkout</p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                  className='text-center'
                >
                  <div className='flex justify-center mb-1 sm:mb-2'>
                    <div className='w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-green-500/20 rounded-full flex items-center justify-center'>
                      <CheckCircle2 className='w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-green-400' />
                    </div>
                  </div>
                  <p className='text-[9px] sm:text-xs md:text-sm font-medium text-white/70 uppercase tracking-titter sm:tracking-wider'>Acquisto</p>
                </motion.div>
              </div>
              
              {/* Middle percentages */}
              <div className='grid grid-cols-4 gap-0.5 sm:gap-2 md:gap-4 text-white my-auto'>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 }}
                  className='text-center'
                >
                  <p className='text-sm sm:text-2xl md:text-4xl lg:text-5xl font-bold'>100%</p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.3 }}
                  className='text-center'
                >
                  <p className='text-sm sm:text-2xl md:text-4xl lg:text-5xl font-bold'>11%</p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4 }}
                  className='text-center'
                >
                  <p className='text-xs sm:text-xl md:text-3xl lg:text-4xl font-bold'>5.5%</p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5 }}
                  className='text-center'
                >
                  <p className='text-[10px] sm:text-lg md:text-2xl lg:text-3xl font-bold'>2.6%</p>
                </motion.div>
              </div>
              
              {/* Bottom metrics */}
              <div className='grid grid-cols-4 gap-0.5 sm:gap-2 md:gap-4 text-white'>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6 }}
                  className='text-center'
                >
                  <p className='text-[15px] sm:text-lg md:text-xl lg:text-2xl font-semibold'>1,000</p>
                  <p className='text-[8px] sm:text-xs text-white/50'>visitatori</p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.7 }}
                  className='text-center'
                >
                  <p className='text-[15px] sm:text-lg md:text-xl lg:text-2xl font-semibold'>110</p>
                  <p className='text-[8px] sm:text-xs text-red-400'>-89%</p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8 }}
                  className='text-center'
                >
                  <p className='text-[15px] sm:text-lg md:text-xl lg:text-2xl font-semibold'>55</p>
                  <p className='text-[8px] sm:text-xs text-red-400'>-50%</p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.9 }}
                  className='text-center'
                >
                  <p className='text-[15px] sm:text-lg md:text-xl lg:text-2xl font-semibold'>26</p>
                  <p className='text-[8px] sm:text-xs text-red-400'>-53%</p>
                </motion.div>
              </div>
            </div>
            
            {/* Floating watermark - hidden on mobile */}
            <div className='hidden sm:block absolute bottom-4 right-4 text-white/30 text-xs'>
              craftale.it
            </div>
          </motion.div>
          
          {/* Key metrics cards below funnel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-8'
          >
            <div className='bg-apty-bg-elevated rounded-2xl p-6 border border-apty-border-subtle'>
              <div className='flex items-center gap-3 mb-3'>
                <div className='w-10 h-10 bg-apty-primary/10 rounded-full flex items-center justify-center'>
                  <TrendingUp className='w-5 h-5 text-apty-primary' />
                </div>
                <h4 className='font-semibold text-apty-text-primary'>Tasso di Conversione</h4>
              </div>
              <p className='text-3xl font-bold text-apty-primary mb-2'>2.6%</p>
              <p className='text-sm text-apty-text-secondary'>Media e-commerce italiano</p>
            </div>
            
            <div className='bg-apty-bg-elevated rounded-2xl p-6 border border-apty-border-subtle'>
              <div className='flex items-center gap-3 mb-3'>
                <div className='w-10 h-10 bg-apty-state-error/10 rounded-full flex items-center justify-center'>
                  <AlertCircle className='w-5 h-5 text-apty-state-error' />
                </div>
                <h4 className='font-semibold text-apty-text-primary'>Abbandono Carrello</h4>
              </div>
              <p className='text-3xl font-bold text-apty-state-error mb-2'>76.1%</p>
              <p className='text-sm text-apty-text-secondary'>€84 valore medio carrello perso</p>
            </div>
            
            <div className='bg-gradient-to-br from-apty-primary/10 to-apty-secondary/10 rounded-2xl p-6 border border-apty-primary/30'>
              <div className='flex items-center gap-3 mb-3'>
                <div className='w-10 h-10 bg-apty-state-success/10 rounded-full flex items-center justify-center'>
                  <Euro className='w-5 h-5 text-apty-state-success' />
                </div>
                <h4 className='font-semibold text-apty-text-primary'>Potenziale di Fatturato</h4>
              </div>
              <p className='text-3xl font-bold text-apty-state-success mb-2'>+€440K/year</p>
              <p className='text-sm text-apty-text-secondary'>Raggiungendo il 3,6% di conversione</p>
            </div>
          </motion.div>
        </div>

        {/* Source Link */}
        <div className='mt-8 text-center'>
          <p className='text-xs md:text-sm text-apty-text-secondary'>
            Fonti: 
            <a href='https://ecommercedb.com/benchmarks/it/all' target='_blank' rel='noopener noreferrer' className='text-apty-primary hover:underline mx-1'>E-commerce DB Italia</a>,
            <a href='https://www.hotjar.com/conversion-rate-optimization/funnel-analysis/' target='_blank' rel='noopener noreferrer' className='text-apty-primary hover:underline mx-1'>Hotjar Funnel Analysis</a>
          </p>
        </div>
      </div>
    </section>
  );
}