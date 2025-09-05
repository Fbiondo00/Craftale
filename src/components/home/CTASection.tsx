'use client';

import { CheckCircle, Shield } from 'lucide-react';
import { AptyPrimaryButton } from '@/components/apty/AptyButton';

export default function CTASection() {
  return (
    <section className='py-24 bg-apty-bg-subtle'>
      <div className='container mx-auto px-4 max-w-7xl text-center'>
        {/* Heading with APTY primary accent on key words */}
        <h2 className='text-[40px] leading-[48px] font-semibold font-apty-heading text-apty-text-primary mb-6'>
          Qual è la <span className='text-apty-primary'>Storia</span> che Vuoi Raccontare?
        </h2>
        
        {/* Subheading with secondary text */}
        <p className='text-lg text-apty-text-secondary mb-12 leading-relaxed max-w-3xl mx-auto'>
          Siamo pronti a scriverla insieme. Trasformiamo la tua visione in un racconto digitale
          che converte, coinvolge e fa crescere il tuo business. Consulenza gratuita inclusa.
        </p>

        {/* Single CTA Button */}
        <div className='mb-12'>
          <AptyPrimaryButton 
            size='xl' 
            withChevron
            className='shadow-apty-brand hover:shadow-apty-brand-lg'
          >
            Richiedi un preventivo
          </AptyPrimaryButton>
        </div>

        {/* Trust Indicators */}
        <div className='flex items-center justify-center gap-x-8'>
          <div className='flex items-center gap-2'>
            <CheckCircle className='w-4 h-4 text-apty-primary' />
            <span className='text-sm text-apty-text-tertiary'>Consulenza gratuita</span>
          </div>
          <div className='flex items-center gap-2'>
            <Shield className='w-4 h-4 text-apty-primary' />
            <span className='text-sm text-apty-text-tertiary'>Senza impegno</span>
          </div>
        </div>
      </div>
    </section>
  );
}
