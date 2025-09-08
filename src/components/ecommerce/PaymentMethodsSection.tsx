'use client';

import { motion } from 'framer-motion';
import { CreditCard, Shield, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function PaymentMethodsSection() {
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
            Metodi di Pagamento che gli <span className='text-apty-primary'>Italiani Si FIDANO</span>
          </h2>
          <p className='text-xl text-apty-text-secondary max-w-3xl mx-auto'>
            Mancare l'opzione di pagamento giusta = vendita persa
          </p>
        </motion.div>

        {/* Payment Methods Stats */}
        <div className='max-w-5xl mx-auto mb-12'>
          <div className='bg-apty-bg-base rounded-2xl p-8 shadow-lg'>
            <h3 className='text-2xl font-bold text-apty-text-primary mb-8'>Preferenze di Pagamento Italiane 2024</h3>
            
            <div className='grid md:grid-cols-2 gap-8'>
              <div className='space-y-6'>
                {[
                  { method: 'Carte di Credito/Debito', usage: 48, icon: CreditCard, color: 'bg-apty-primary' },
                  { method: 'PayPal & Wallet Digitali', usage: 32, icon: Shield, color: 'bg-apty-secondary' },
                  { method: 'Postepay', usage: 25, icon: CreditCard, color: 'bg-apty-accent' },
                  { method: 'BNPL (Klarna, Scalapay)', usage: 10, icon: RefreshCw, color: 'bg-apty-tertiary' }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className='flex items-center justify-between mb-2'>
                      <div className='flex items-center gap-3'>
                        <item.icon className='w-5 h-5 text-apty-text-primary' />
                        <span className='font-medium text-apty-text-primary'>{item.method}</span>
                      </div>
                      <span className='text-xl font-bold text-apty-text-primary'>{item.usage}%</span>
                    </div>
                    <div className='w-full bg-apty-bg-subtle rounded-full h-3 overflow-hidden'>
                      <div 
                        className={`h-full ${item.color} rounded-full transition-all duration-1000`}
                        style={{ width: `${item.usage}%` }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className='bg-apty-primary/10 rounded-xl p-6'>
                <h4 className='font-semibold text-apty-text-primary mb-4'>Insight Chiave</h4>
                <ul className='space-y-3 text-sm'>
                  <li className='flex items-start gap-2'>
                    <CheckCircle2 className='w-4 h-4 text-apty-primary mt-0.5' />
                    <span className='text-apty-text-secondary'>Il 67% dei 25-34enni preferisce i wallet digitali</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <CheckCircle2 className='w-4 h-4 text-apty-primary mt-0.5' />
                    <span className='text-apty-text-secondary'>Postepay essenziale per il mercato B2C</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <CheckCircle2 className='w-4 h-4 text-apty-primary mt-0.5' />
                    <span className='text-apty-text-secondary'>Il 50% dei merchant offre opzioni BNPL</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <CheckCircle2 className='w-4 h-4 text-apty-primary mt-0.5' />
                    <span className='text-apty-text-secondary'>Satispay cresce del 12% annuo</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Formation */}
        <div className='max-w-5xl mx-auto'>
          <div className='bg-apty-bg-base rounded-2xl p-8 shadow-lg'>
            <h3 className='text-2xl font-bold text-apty-text-primary mb-6'>Costruire Fiducia con gli Acquirenti Italiani</h3>
            
            <div className='grid md:grid-cols-3 gap-6'>
              <div className='text-center p-4 bg-apty-bg-subtle rounded-lg'>
                <div className='text-4xl font-bold text-apty-primary mb-2'>22%</div>
                <div className='text-sm text-apty-text-secondary'>Acquistano entro il primo mese</div>
                <div className='text-xs text-apty-text-primary mt-2'>La fiducia richiede tempo</div>
              </div>
              <div className='text-center p-4 bg-apty-primary/10 rounded-lg'>
                <div className='text-4xl font-bold text-apty-primary mb-2'>+30%</div>
                <div className='text-sm text-apty-text-secondary'>Conversione con badge di fiducia</div>
                <div className='text-xs text-apty-text-primary mt-2'>Trustpilot, Feedaty</div>
              </div>
              <div className='text-center p-4 bg-apty-bg-subtle rounded-lg'>
                <div className='text-4xl font-bold text-apty-state-error mb-2'>100%</div>
                <div className='text-sm text-apty-text-secondary'>Richiedono certificato SSL</div>
                <div className='text-xs text-apty-text-primary mt-2'>Non negoziabile</div>
              </div>
            </div>
          </div>
        </div>

        {/* Source Link */}
        <div className='mt-8 text-center'>
          <p className='text-sm text-apty-text-secondary'>
            Fonti: 
            <a href='https://www.statista.com/statistics/1372511/implementation-plans-of-digital-payment-types-italy/' target='_blank' rel='noopener noreferrer' className='text-apty-primary hover:underline mx-1'>Statista Italia</a>,
            <a href='https://stripe.com/resources/more/italian-ecommerce-payments' target='_blank' rel='noopener noreferrer' className='text-apty-primary hover:underline mx-1'>Stripe Italia</a>
          </p>
        </div>
      </div>
    </section>
  );
}