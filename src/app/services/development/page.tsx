'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { 
  Shield, DollarSign, 
  ArrowRight, CheckCircle2, XCircle, 
  Smartphone, Code2, Clock,
  AlertCircle, TrendingUp, Users,
  ShoppingCart, Phone, MapPin,
  CreditCard, Zap, HeartHandshake
} from 'lucide-react';
import { AptyPrimaryButton, AptySecondaryButton } from '@/components/apty/AptyButton';
import CTASection from '@/components/home/CTASection';
import FAQSection from '@/components/sections/FAQSection';
import Link from 'next/link';
import { LumaSpin } from '@/components/ui/luma-spin';

// Animated counter component with decimals and currency
function Counter({ from = 0, to, duration = 2, suffix = '', prefix = '', decimals = 0, isCurrency = false }: { 
  from?: number; 
  to: number; 
  duration?: number; 
  suffix?: string; 
  prefix?: string; 
  decimals?: number;
  isCurrency?: boolean;
}) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: '-100px' });
  
  useEffect(() => {
    if (!inView) return;
    
    const node = nodeRef.current;
    if (!node) return;
    
    const controls = animate(from, to, {
      duration,
      onUpdate(value) {
        if (isCurrency && value >= 1000) {
          node.textContent = prefix + (value / 1000).toFixed(1) + 'K' + suffix;
        } else {
          node.textContent = prefix + value.toFixed(decimals) + suffix;
        }
      },
    });
    
    return () => controls.stop();
  }, [from, to, duration, suffix, prefix, decimals, isCurrency, inView]);
  
  return <span ref={nodeRef}>{prefix}{from.toFixed(decimals)}</span>;
}

// FAQ Questions for Italian SMBs
const developmentFAQs = [
  // {
  //   q: "Quanto costa un sito web su misura per una PMI? Qual è il ROI?",
  //   a: "Un sito custom costa tra €3.000-10.000 per PMI italiane, con ROI in 6-12 mesi. Secondo il Politecnico di Milano, le PMI che investono nel digitale vedono crescite del fatturato online fino al 25% annuo. La nostra soluzione React/Next.js offre performance e scalabilità superiori rispetto ai CMS tradizionali."
  // },
  {
    q: 'Il sito rispetta GDPR e normative del Garante Privacy italiano?',
    a: 'Assolutamente sì. Implementiamo cookie banner conformi alle Linee Guida 2021 del Garante, informative privacy complete, gestione consensi a norma. Per e-commerce e newsletter gestiamo anche DPIA quando necessario. La conformità GDPR è obbligatoria in Italia con sanzioni fino a €20 milioni.'
  },
  {
    q: 'Integrate pagamenti con Satispay, PostePay, PayPal e Stripe?',
    a: 'Certamente! Integriamo tutti i sistemi di pagamento usati in Italia: Satispay (usato dal 12% delle PMI retail), PostePay (fondamentale per B2C), PayPal e Stripe. Le nostre soluzioni custom permettono integrazioni perfette con commissioni ottimizzate per il mercato italiano.'
  },
  {
    q: 'Gestite la fatturazione elettronica obbligatoria?',
    a: 'Sì, integriamo sistemi di fatturazione elettronica conformi (tracciato FatturaPA, invio SDI). Lavoriamo con provider accreditati come Aruba, FattureInCloud, TeamSystem. La fatturazione elettronica è obbligatoria per tutte le imprese italiane dal 2019.'
  },
  {
    q: "Perché scegliere React/Next.js invece di WordPress o altri CMS?",
    a: "React/Next.js offre siti 3x più veloci, più sicuri (WordPress è target del 45% degli attacchi secondo Clusit 2023), e completamente personalizzabili. Core Web Vitals migliori = ranking Google superiore. Perfetto per PMI innovative che vogliono distinguersi dalla concorrenza."
  },
  {
    q: 'Mi aiutate con SEO locale e Google Maps per il mercato italiano?',
    a: 'Assolutamente! Ottimizziamo per ricerche locali italiane (78% da mobile), Google Business Profile, parole chiave specifiche per città/regione. Il 65% del traffico italiano è mobile-first. Struttura URL, meta descrizioni e dati strutturati ottimizzati per il pubblico italiano.'
  },
  // {
  //   q: 'Posso usare voucher digitalizzazione o contributi PMI?',
  //   a: 'Sì! Aiutiamo con bandi regionali e nazionali come Voucher Digitalizzazione (fino a €10.000), crediti d\'imposta innovazione digitale, bandi Camera di Commercio. Assistenza completa nella presentazione domande e rendicontazione.'
  // },
  {
    q: 'Che assistenza fornite dopo la consegna del sito?',
    a: 'Offriamo piani da €100/mese: backup, aggiornamenti sicurezza, conformità privacy, supporto tecnico diretto in italiano. Per PMI italiane è fondamentale avere un interlocutore reattivo. Piani personalizzati includono ore di sviluppo mensili e consulenza continua.'
  }
];

export default function WebDevelopmentPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBudget, setSelectedBudget] = useState<'small' | 'medium' | 'custom'>('medium');

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className='min-h-screen bg-apty-bg-base flex items-center justify-center'>
        <LumaSpin size={80} />
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-apty-bg-base overflow-x-hidden'>
      {/* Hero Section - SMB Focused with Cost Reality */}
      <section className='relative min-h-[85vh] flex items-center justify-center bg-gradient-to-b from-apty-bg-base to-apty-bg-subtle py-16 md:py-0'>
        <div className='container mx-auto px-4'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='max-w-5xl mx-auto mt-8 md:mt-40'
          >
            {/* Badge - Cost Focus */}
            {/* <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className='flex justify-center mb-6'
            >
              <div className='inline-flex items-center gap-2 px-6 py-3 bg-apty-state-success/10 rounded-full border border-apty-state-success/30'>
                <DollarSign className='w-4 h-4 text-apty-state-success' />
                <span className='text-sm font-medium text-apty-text-primary'>Average SMB loses $25K per security incident</span>
              </div>
            </motion.div> */}

            {/* Main Headline - Direct SMB Pain Point */}
            <h1 className='text-[44px] md:text-[64px] leading-[1.1] font-bold font-apty-heading text-apty-text-primary mb-6 text-center'>
              I tuoi competitor hanno già un sito.
              <br />
              <span className='bg-gradient-to-r from-apty-primary to-apty-secondary bg-clip-text text-transparent'>
                L'80% dei clienti
              </span> non aspetterà il tuo.
            </h1>

            {/* Subheadline with Real SMB Stats */}
            <p className='text-lg md:text-xl text-apty-text-secondary mb-10 max-w-3xl mx-auto text-center leading-relaxed'>
              <span className='font-semibold text-apty-text-primary'>Il 57% abbandona</span> dopo 3 secondi. 
              <span className='font-semibold text-apty-text-primary'> Il 75% non completa</span> gli acquisti da mobile. 
              Realizziamo siti veloci e sicuri che convertono davvero clienti locali.
            </p>

            {/* Interactive Cost Calculator */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className='bg-apty-bg-base rounded-2xl p-8 shadow-xl mb-10 border border-apty-border-subtle'
            >
              <h3 className='text-xl font-semibold text-apty-text-primary mb-6 text-center'>
                Quanto ti sta realmente costando il tuo sito?
              </h3>
              
              <div className='grid md:grid-cols-4 gap-6'>
                <div className='text-center'>
                  <div className='text-sm text-apty-text-secondary mb-2'>Fatturato perso/anno</div>
                  <div className='text-3xl font-bold text-apty-state-error'>
                    $<Counter to={75} isCurrency={true} suffix='' />
                  </div>
                  <div className='text-xs text-apty-text-secondary mt-1'>per lentezza caricamento</div>
                </div>
                <div className='text-center'>
                  <div className='text-sm text-apty-text-secondary mb-2'>Abbandono carrello</div>
                  <div className='text-3xl font-bold text-apty-accent'>
                    <Counter to={72} suffix='%' />
                  </div>
                  <div className='text-xs text-apty-text-secondary mt-1'>media per PMI</div>
                </div>
                <div className='text-center'>
                  <div className='text-sm text-apty-text-secondary mb-2'>Rischio Sicurezza</div>
                  <div className='text-3xl font-bold text-apty-state-error'>
                    <Counter to={43} suffix='%' />
                  </div>
                  <div className='text-xs text-apty-text-secondary mt-1'>degli attacchi colpisce PMI</div>
                </div>
                <div className='text-center'>
                  <div className='text-sm text-apty-text-secondary mb-2'>Perdite Mobile</div>
                  <div className='text-3xl font-bold text-apty-primary'>
                    <Counter to={75.5} decimals={1} suffix='%' />
                  </div>
                  <div className='text-xs text-apty-text-secondary mt-1'>abbandono su mobile</div>
                </div>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className='flex justify-center mb-12 md:mb-32'
            >
              <Link href='/pricing'>
                <AptyPrimaryButton size='xl' className='min-w-[200px]'>
                  Richiedi un Audit Gratuito
                  <ArrowRight className='w-5 h-5 ml-2' />
                </AptyPrimaryButton>
              </Link>
              {/* <AptySecondaryButton size='xl' className='min-w-[200px]' onClick={() => document.getElementById('roi-calculator')?.scrollIntoView({ behavior: 'smooth' })}>
                Calculate Your ROI
                <TrendingUp className='w-5 h-5 ml-2' />
              </AptySecondaryButton> */}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className='absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block'
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className='w-6 h-10 border-2 border-apty-text-secondary/30 rounded-full flex justify-center'>
            <div className='w-1 h-3 bg-apty-text-secondary/60 rounded-full mt-2' />
          </div>
        </motion.div>
      </section>

      {/* Real SMB Problems Section */}
      <section className='py-20 md:py-24 bg-apty-bg-base'>
        <div className='container mx-auto px-4 max-w-7xl'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='text-center mb-12'
          >
            <h2 className='text-[36px] md:text-[48px] leading-[1.2] font-bold font-apty-heading text-apty-text-primary mb-4'>
              Perché il <span className='text-apty-primary'>72% delle PMI</span> Perde Vendite Online
            </h2>
            <p className='text-lg text-apty-text-secondary max-w-3xl mx-auto'>
              Non sono problemi enterprise: sono cause reali che bloccano il fatturato locale.
            </p>
          </motion.div>

          {/* Problem Cards with Solutions */}
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto'>
            {[
              {
                problem: 'Costi Nascosti al Checkout',
                stat: '48%',
                impact: 'abbandono acquisto',
                solution: 'Prezzi chiari subito',
                icon: ShoppingCart,
                color: 'text-apty-state-error'
              },
              {
                problem: 'Form di Contatto Rotti',
                stat: '67%',
                impact: 'lead persi',
                solution: 'Test settimanale form',
                icon: XCircle,
                color: 'text-apty-state-error'
              },
              {
                problem: 'Assenza Click-to-Call',
                stat: '76%',
                impact: 'vogliono contatto immediato',
                solution: 'Bottoni chiamata mobile',
                icon: Phone,
                color: 'text-apty-primary'
              },
              {
                problem: 'Orari Errati',
                stat: '55%',
                impact: 'abbandonano per sempre',
                solution: 'Info auto-aggiornate',
                icon: Clock,
                color: 'text-apty-accent'
              },
              {
                problem: 'Design Solo Desktop',
                stat: '75.5%',
                impact: 'abbandono mobile',
                solution: 'Approccio mobile-first',
                icon: Smartphone,
                color: 'text-apty-state-error'
              },
              {
                problem: 'Assenza SEO Locale',
                stat: '46%',
                impact: 'invisibile localmente',
                solution: 'Integrazione mappa',
                icon: MapPin,
                color: 'text-apty-tertiary'
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className='group'
              >
                <div className='bg-apty-bg-elevated rounded-xl p-6 h-full border border-apty-border-subtle hover:border-apty-primary/30 transition-all hover:shadow-lg'>
                  <div className='flex items-start justify-between mb-4'>
                    <item.icon className={`w-8 h-8 ${item.color}`} />
                    <div className='text-3xl font-bold text-apty-text-primary'>{item.stat}</div>
                  </div>
                  <h3 className='text-lg font-semibold text-apty-text-primary mb-2'>{item.problem}</h3>
                  <p className='text-sm text-apty-text-secondary mb-3'>{item.impact}</p>
                  <div className='pt-3 border-t border-apty-border-subtle'>
                    <div className='flex items-center gap-2'>
                      <CheckCircle2 className='w-4 h-4 text-apty-state-success' />
                      <span className='text-sm font-medium text-apty-state-success'>{item.solution}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Source */}
          <div className='mt-8 text-center'>
            <p className='text-sm text-apty-text-secondary'>
              Sources: 
              <a href='https://www.drip.com/blog/cart-abandonment-statistics' target='_blank' rel='noopener noreferrer' className='text-apty-primary hover:underline mx-1'>Drip 2024</a>,
              <a href='https://fitsmallbusiness.com/shopping-cart-abandonment-statistics/' target='_blank' rel='noopener noreferrer' className='text-apty-primary hover:underline mx-1'>FitSmallBusiness</a>
            </p>
          </div>
        </div>
      </section>

      {/* ROI Calculator Section - COMMENTED OUT 
      <section id='roi-calculator' className='py-20 md:py-24 bg-apty-bg-subtle'>
        <div className='container mx-auto px-4 max-w-7xl'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='text-center mb-12'
          >
            <h2 className='text-[36px] md:text-[48px] leading-[1.2] font-bold font-apty-heading text-apty-text-primary mb-4'>
              Il Tuo <span className='text-apty-primary'>Investimento vs Ritorno</span>
            </h2>
            <p className='text-lg text-apty-text-secondary max-w-3xl mx-auto'>
              Numeri reali per aziende reali. Vedi esattamente cosa ottieni per il tuo budget.
            </p>
          </motion.div>

          <!-- Budget Selector -->
          <div className='max-w-4xl mx-auto'>
            <div className='flex justify-center mb-8'>
              <div className='bg-apty-bg-base rounded-lg p-1 flex gap-1 inline-flex'>
                <button
                  onClick={() => setSelectedBudget('small')}
                  className={`px-6 py-3 rounded-md transition-all ${
                    selectedBudget === 'small' 
                      ? 'bg-apty-primary text-apty-text-inverse' 
                      : 'text-apty-text-secondary hover:text-apty-text-primary'
                  }`}
                >
                  Starter ($3-5K)
                </button>
                <button
                  onClick={() => setSelectedBudget('medium')}
                  className={`px-6 py-3 rounded-md transition-all ${
                    selectedBudget === 'medium' 
                      ? 'bg-apty-primary text-apty-text-inverse' 
                      : 'text-apty-text-secondary hover:text-apty-text-primary'
                  }`}
                >
                  Growth ($10-25K)
                </button>
                <button
                  onClick={() => setSelectedBudget('custom')}
                  className={`px-6 py-3 rounded-md transition-all ${
                    selectedBudget === 'custom' 
                      ? 'bg-apty-primary text-apty-text-inverse' 
                      : 'text-apty-text-secondary hover:text-apty-text-primary'
                  }`}
                >
                  Custom ($25K+)
                </button>
              </div>
            </div>

            <!-- Budget Details -->
            <motion.div
              key={selectedBudget}
              initial={{ opacity: 0, x: selectedBudget === 'small' ? -20 : selectedBudget === 'medium' ? 0 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {selectedBudget === 'small' && (
                <div className='bg-apty-bg-base rounded-2xl p-8 shadow-lg'>
                  <div className='grid md:grid-cols-2 gap-8'>
                    <div>
                      <h3 className='text-2xl font-bold text-apty-text-primary mb-4'>Starter Package</h3>
                      <div className='text-4xl font-bold text-apty-primary mb-2'>$3,000-5,000</div>
                      <p className='text-apty-text-secondary mb-6'>Perfect for service businesses & local shops</p>
                      
                      <div className='space-y-3'>
                        <div className='flex items-start gap-3'>
                          <CheckCircle2 className='w-5 h-5 text-apty-state-success mt-0.5' />
                          <div>
                            <div className='font-medium text-apty-text-primary'>WordPress with premium theme</div>
                            <div className='text-sm text-apty-text-secondary'>Professional, fast, easy to update</div>
                          </div>
                        </div>
                        <div className='flex items-start gap-3'>
                          <CheckCircle2 className='w-5 h-5 text-apty-state-success mt-0.5' />
                          <div>
                            <div className='font-medium text-apty-text-primary'>Mobile-optimized</div>
                            <div className='text-sm text-apty-text-secondary'>Il 75% del traffico è mobile</div>
                          </div>
                        </div>
                        <div className='flex items-start gap-3'>
                          <CheckCircle2 className='w-5 h-5 text-apty-state-success mt-0.5' />
                          <div>
                            <div className='font-medium text-apty-text-primary'>Basic SEO & local listing</div>
                            <div className='text-sm text-apty-text-secondary'>Get found by local customers</div>
                          </div>
                        </div>
                        <div className='flex items-start gap-3'>
                          <CheckCircle2 className='w-5 h-5 text-apty-state-success mt-0.5' />
                          <div>
                            <div className='font-medium text-apty-text-primary'>Contact forms & click-to-call</div>
                            <div className='text-sm text-apty-text-secondary'>Convert visitors to customers</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className='bg-gradient-to-br from-apty-state-success/5 to-apty-primary/5 rounded-xl p-6'>
                      <h4 className='font-semibold text-apty-text-primary mb-4'>Expected Returns</h4>
                      <div className='space-y-4'>
                        <div>
                          <div className='flex justify-between mb-1'>
                            <span className='text-sm text-apty-text-secondary'>Timeline</span>
                            <span className='font-bold text-apty-text-primary'>2-4 weeks</span>
                          </div>
                        </div>
                        <div>
                          <div className='flex justify-between mb-1'>
                            <span className='text-sm text-apty-text-secondary'>ROI Timeline</span>
                            <span className='font-bold text-apty-state-success'>3-4 months</span>
                          </div>
                        </div>
                        <div>
                          <div className='flex justify-between mb-1'>
                            <span className='text-sm text-apty-text-secondary'>Conversion Boost</span>
                            <span className='font-bold text-apty-primary'>+15-30%</span>
                          </div>
                        </div>
                        <div>
                          <div className='flex justify-between mb-1'>
                            <span className='text-sm text-apty-text-secondary'>Maintenance</span>
                            <span className='font-bold text-apty-text-primary'>$30-60/mo</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className='mt-6 p-4 bg-apty-primary/10 rounded-lg'>
                        <p className='text-sm text-apty-text-primary'>
                          <strong>Best for:</strong> Restaurants, salons, local services, professional practices
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedBudget === 'medium' && (
                <div className='bg-apty-bg-base rounded-2xl p-8 shadow-lg'>
                  <div className='grid md:grid-cols-2 gap-8'>
                    <div>
                      <h3 className='text-2xl font-bold text-apty-text-primary mb-4'>Growth Package</h3>
                      <div className='text-4xl font-bold text-apty-primary mb-2'>$10,000-25,000</div>
                      <p className='text-apty-text-secondary mb-6'>For businesses ready to scale online</p>
                      
                      <div className='space-y-3'>
                        <div className='flex items-start gap-3'>
                          <CheckCircle2 className='w-5 h-5 text-apty-state-success mt-0.5' />
                          <div>
                            <div className='font-medium text-apty-text-primary'>Custom design & branding</div>
                            <div className='text-sm text-apty-text-secondary'>Stand out from competitors</div>
                          </div>
                        </div>
                        <div className='flex items-start gap-3'>
                          <CheckCircle2 className='w-5 h-5 text-apty-state-success mt-0.5' />
                          <div>
                            <div className='font-medium text-apty-text-primary'>E-commerce or booking system</div>
                            <div className='text-sm text-apty-text-secondary'>Sell 24/7, automated bookings</div>
                          </div>
                        </div>
                        <div className='flex items-start gap-3'>
                          <CheckCircle2 className='w-5 h-5 text-apty-state-success mt-0.5' />
                          <div>
                            <div className='font-medium text-apty-text-primary'>CRM & email integration</div>
                            <div className='text-sm text-apty-text-secondary'>Build customer relationships</div>
                          </div>
                        </div>
                        <div className='flex items-start gap-3'>
                          <CheckCircle2 className='w-5 h-5 text-apty-state-success mt-0.5' />
                          <div>
                            <div className='font-medium text-apty-text-primary'>Advanced SEO & analytics</div>
                            <div className='text-sm text-apty-text-secondary'>Data-driven growth</div>
                          </div>
                        </div>
                        <div className='flex items-start gap-3'>
                          <CheckCircle2 className='w-5 h-5 text-apty-state-success mt-0.5' />
                          <div>
                            <div className='font-medium text-apty-text-primary'>3 months support included</div>
                            <div className='text-sm text-apty-text-secondary'>We ensure success</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className='bg-gradient-to-br from-apty-state-success/5 to-apty-primary/5 rounded-xl p-6'>
                      <h4 className='font-semibold text-apty-text-primary mb-4'>Expected Returns</h4>
                      <div className='space-y-4'>
                        <div>
                          <div className='flex justify-between mb-1'>
                            <span className='text-sm text-apty-text-secondary'>Timeline</span>
                            <span className='font-bold text-apty-text-primary'>6-10 weeks</span>
                          </div>
                        </div>
                        <div>
                          <div className='flex justify-between mb-1'>
                            <span className='text-sm text-apty-text-secondary'>ROI Timeline</span>
                            <span className='font-bold text-apty-state-success'>6-8 months</span>
                          </div>
                        </div>
                        <div>
                          <div className='flex justify-between mb-1'>
                            <span className='text-sm text-apty-text-secondary'>Revenue Increase</span>
                            <span className='font-bold text-apty-primary'>+25-60%</span>
                          </div>
                        </div>
                        <div>
                          <div className='flex justify-between mb-1'>
                            <span className='text-sm text-apty-text-secondary'>Cart Recovery</span>
                            <span className='font-bold text-apty-state-success'>10-15%</span>
                          </div>
                        </div>
                        <div>
                          <div className='flex justify-between mb-1'>
                            <span className='text-sm text-apty-text-secondary'>Maintenance</span>
                            <span className='font-bold text-apty-text-primary'>$150-300/mo</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className='mt-6 p-4 bg-apty-primary/10 rounded-lg'>
                        <p className='text-sm text-apty-text-primary'>
                          <strong>Best for:</strong> Retail, multi-location businesses, growing brands
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedBudget === 'custom' && (
                <div className='bg-apty-bg-base rounded-2xl p-8 shadow-lg'>
                  <div className='grid md:grid-cols-2 gap-8'>
                    <div>
                      <h3 className='text-2xl font-bold text-apty-text-primary mb-4'>Custom Solution</h3>
                      <div className='text-4xl font-bold text-apty-primary mb-2'>$25,000+</div>
                      <p className='text-apty-text-secondary mb-6'>Unique solutions for unique businesses</p>
                      
                      <div className='space-y-3'>
                        <div className='flex items-start gap-3'>
                          <CheckCircle2 className='w-5 h-5 text-apty-state-success mt-0.5' />
                          <div>
                            <div className='font-medium text-apty-text-primary'>Progressive Web App (PWA)</div>
                            <div className='text-sm text-apty-text-secondary'>App-like experience, 30-60% less cost</div>
                          </div>
                        </div>
                        <div className='flex items-start gap-3'>
                          <CheckCircle2 className='w-5 h-5 text-apty-state-success mt-0.5' />
                          <div>
                            <div className='font-medium text-apty-text-primary'>Custom integrations</div>
                            <div className='text-sm text-apty-text-secondary'>POS, inventory, CRM, anything</div>
                          </div>
                        </div>
                        <div className='flex items-start gap-3'>
                          <CheckCircle2 className='w-5 h-5 text-apty-state-success mt-0.5' />
                          <div>
                            <div className='font-medium text-apty-text-primary'>Multi-location management</div>
                            <div className='text-sm text-apty-text-secondary'>Scale across locations</div>
                          </div>
                        </div>
                        <div className='flex items-start gap-3'>
                          <CheckCircle2 className='w-5 h-5 text-apty-state-success mt-0.5' />
                          <div>
                            <div className='font-medium text-apty-text-primary'>Enterprise security</div>
                            <div className='text-sm text-apty-text-secondary'>GDPR, PCI, full compliance</div>
                          </div>
                        </div>
                        <div className='flex items-start gap-3'>
                          <CheckCircle2 className='w-5 h-5 text-apty-state-success mt-0.5' />
                          <div>
                            <div className='font-medium text-apty-text-primary'>Dedicated support team</div>
                            <div className='text-sm text-apty-text-secondary'>Il tuo successo è il nostro successo</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className='bg-gradient-to-br from-apty-state-success/5 to-apty-primary/5 rounded-xl p-6'>
                      <h4 className='font-semibold text-apty-text-primary mb-4'>Expected Returns</h4>
                      <div className='space-y-4'>
                        <div>
                          <div className='flex justify-between mb-1'>
                            <span className='text-sm text-apty-text-secondary'>Timeline</span>
                            <span className='font-bold text-apty-text-primary'>8-12 weeks</span>
                          </div>
                        </div>
                        <div>
                          <div className='flex justify-between mb-1'>
                            <span className='text-sm text-apty-text-secondary'>ROI Timeline</span>
                            <span className='font-bold text-apty-state-success'>12-18 months</span>
                          </div>
                        </div>
                        <div>
                          <div className='flex justify-between mb-1'>
                            <span className='text-sm text-apty-text-secondary'>Efficiency Gains</span>
                            <span className='font-bold text-apty-primary'>30-50%</span>
                          </div>
                        </div>
                        <div>
                          <div className='flex justify-between mb-1'>
                            <span className='text-sm text-apty-text-secondary'>Market Reach</span>
                            <span className='font-bold text-apty-state-success'>+104%</span>
                          </div>
                          <p className='text-xs text-apty-text-secondary mt-1'>AliExpress PWA case study</p>
                        </div>
                      </div>
                      
                      <div className='mt-6 p-4 bg-apty-primary/10 rounded-lg'>
                        <p className='text-sm text-apty-text-primary'>
                          <strong>Best for:</strong> Franchises, marketplaces, SaaS, unique business models
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
      */}

      {/* Security for SMBs Section - COMMENTED OUT */}
      {/* <section className='py-20 md:py-24 bg-apty-bg-base'>
        <div className='container mx-auto px-4 max-w-7xl'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='text-center mb-12'
          >
            <h2 className='text-[36px] md:text-[48px] leading-[1.2] font-bold font-apty-heading text-apty-text-primary mb-4'>
              Security <span className='text-apty-primary'>You Can Afford</span>
            </h2>
            <p className='text-lg text-apty-text-secondary max-w-3xl mx-auto'>
              43% of cyberattacks target small businesses. Don't be the 75% that can't recover.
            </p>
          </motion.div>

          <div className='max-w-6xl mx-auto'>
            <div className='bg-apty-bg-elevated rounded-2xl p-8 mb-8 border border-apty-border-subtle'>
              <h3 className='text-2xl font-bold text-apty-text-primary mb-6'>Annual Security Investment</h3>
              
              <div className='grid md:grid-cols-3 gap-6'>
                <div className='text-center p-6 bg-apty-state-error/5 rounded-xl'>
                  <AlertCircle className='w-12 h-12 text-apty-state-error mx-auto mb-3' />
                  <div className='text-sm text-apty-text-secondary mb-2'>Without Protection</div>
                  <div className='text-3xl font-bold text-apty-state-error mb-2'>$25,000</div>
                  <p className='text-sm text-apty-text-secondary'>Average loss per incident</p>
                </div>
                
                <div className='text-center p-6 bg-apty-accent/5 rounded-xl'>
                  <Shield className='w-12 h-12 text-apty-accent mx-auto mb-3' />
                  <div className='text-sm text-apty-text-secondary mb-2'>Basic Protection</div>
                  <div className='text-3xl font-bold text-apty-accent mb-2'>$500-1,500</div>
                  <p className='text-sm text-apty-text-secondary'>Annual security package</p>
                </div>
                
                <div className='text-center p-6 bg-apty-state-success/5 rounded-xl'>
                  <CheckCircle2 className='w-12 h-12 text-apty-state-success mx-auto mb-3' />
                  <div className='text-sm text-apty-text-secondary mb-2'>Il Tuo ROI</div>
                  <div className='text-3xl font-bold text-apty-state-success mb-2'>16x</div>
                  <p className='text-sm text-apty-text-secondary'>Return on security investment</p>
                </div>
              </div>

              <div className='mt-8 grid md:grid-cols-2 gap-6'>
                <div>
                  <h4 className='font-semibold text-apty-text-primary mb-4'>Essential Security (Included)</h4>
                  <div className='space-y-2'>
                    {[
                      'SSL certificate & HTTPS',
                      'Daily automated backups',
                      'Firewall protection',
                      'Malware scanning',
                      'Security updates monthly',
                      'Password protection'
                    ].map((item, i) => (
                      <div key={i} className='flex items-center gap-2'>
                        <CheckCircle2 className='w-4 h-4 text-apty-state-success' />
                        <span className='text-sm text-apty-text-secondary'>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className='font-semibold text-apty-text-primary mb-4'>Additional Protection Available</h4>
                  <div className='space-y-2'>
                    {[
                      { item: 'Multi-factor auth (MFA)', cost: '$2-6/user/mo' },
                      { item: 'Advanced threat monitoring', cost: '$50-150/mo' },
                      { item: 'PCI compliance', cost: 'Use Stripe/Square' },
                      { item: 'GDPR compliance tools', cost: '$50-200/mo' },
                      { item: 'Employee training', cost: '$20-50/employee' }
                    ].map((item, i) => (
                      <div key={i} className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                          <CheckCircle2 className='w-4 h-4 text-apty-primary' />
                          <span className='text-sm text-apty-text-secondary'>{item.item}</span>
                        </div>
                        <span className='text-sm font-medium text-apty-primary'>{item.cost}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='text-center'>
            <p className='text-sm text-apty-text-secondary'>
              Sources: 
              <a href='https://www.connectwise.com/blog/smb-cybersecurity-statistics-and-trends' target='_blank' rel='noopener noreferrer' className='text-apty-primary hover:underline mx-1'>ConnectWise 2024</a>,
              <a href='https://www.ninjaone.com/blog/smb-cybersecurity-statistics/' target='_blank' rel='noopener noreferrer' className='text-apty-primary hover:underline mx-1'>NinjaOne</a>
            </p>
          </div>
        </div>
      </section> */}

      {/* Mobile Reality Check */}
      <section className='py-20 md:py-24 bg-gradient-to-b from-apty-bg-subtle to-apty-bg-base'>
        <div className='container mx-auto px-4 max-w-7xl'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='text-center mb-12'
          >
            <h2 className='text-[36px] md:text-[48px] leading-[1.2] font-bold font-apty-heading text-apty-text-primary mb-4'>
              The <span className='text-apty-primary'>Mobile Truth</span> for SMBs
            </h2>
            <p className='text-lg text-apty-text-secondary max-w-3xl mx-auto'>
              Il 75% del traffico è mobile. Ma non compra. Ecco perché.
            </p>
          </motion.div>

          <div className='max-w-5xl mx-auto'>
            <div className='grid md:grid-cols-2 gap-8'>
              {/* Mobile Problems */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className='bg-apty-bg-base rounded-2xl p-8 shadow-lg'
              >
                <Smartphone className='w-12 h-12 text-apty-state-error mb-4' />
                <h3 className='text-2xl font-bold text-apty-text-primary mb-4'>Perché il Mobile Fallisce</h3>
                
                <div className='space-y-4'>
                  <div className='flex justify-between items-center p-3 bg-apty-state-error/5 rounded-lg'>
                    <span className='text-sm font-medium text-apty-text-primary'>Abbandono carrello</span>
                    <span className='text-2xl font-bold text-apty-state-error'>75.5%</span>
                  </div>
                  <div className='flex justify-between items-center p-3 bg-apty-accent/5 rounded-lg'>
                    <span className='text-sm font-medium text-apty-text-primary'>Leave after 3 seconds</span>
                    <span className='text-2xl font-bold text-apty-accent'>57%</span>
                  </div>
                  <div className='flex justify-between items-center p-3 bg-apty-state-error/5 rounded-lg'>
                    <span className='text-sm font-medium text-apty-text-primary'>Never return</span>
                    <span className='text-2xl font-bold text-apty-state-error'>80%</span>
                  </div>
                </div>

                <div className='mt-6 p-4 bg-apty-state-error/10 rounded-lg'>
                  <p className='text-sm text-apty-text-primary'>
                    Mobile users want <strong>immediate action</strong>, not browsing
                  </p>
                </div>
              </motion.div>

              {/* Mobile Solutions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className='bg-gradient-to-br from-apty-primary/5 to-apty-state-success/5 rounded-2xl p-8 shadow-lg border-2 border-apty-primary'
              >
                <Phone className='w-12 h-12 text-apty-primary mb-4' />
                <h3 className='text-2xl font-bold text-apty-text-primary mb-4'>What Mobile Needs</h3>
                
                <div className='space-y-3'>
                  {[
                    { feature: 'Click-to-call button', impact: '#1 conversion driver' },
                    { feature: 'Map integration', impact: '76% visit within 24hrs' },
                    { feature: 'Current hours visible', impact: 'Prevents wasted trips' },
                    { feature: 'One-touch booking', impact: 'Instant reservations' },
                    { feature: 'Pagamento wallet mobile', impact: 'Checkout rapido' },
                    { feature: 'Load under 2 seconds', impact: 'Keeps them engaged' }
                  ].map((item, i) => (
                    <div key={i} className='flex items-start gap-3'>
                      <CheckCircle2 className='w-5 h-5 text-apty-primary mt-0.5' />
                      <div className='flex-1'>
                        <div className='font-medium text-apty-text-primary'>{item.feature}</div>
                        <div className='text-sm text-apty-text-secondary'>{item.impact}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className='mt-6 p-4 bg-apty-primary/10 rounded-lg'>
                  <p className='text-sm text-apty-text-primary'>
                    Result: <strong>40-60% higher mobile conversions</strong>
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Source */}
          <div className='mt-8 text-center'>
            <p className='text-sm text-apty-text-secondary'>
              Sources: 
              <a href='https://www.sellerscommerce.com/blog/shopping-cart-abandonment-statistics/' target='_blank' rel='noopener noreferrer' className='text-apty-primary hover:underline mx-1'>Sellers Commerce</a>,
              <a href='https://www.semrush.com/blog/mobile-vs-desktop-usage/' target='_blank' rel='noopener noreferrer' className='text-apty-primary hover:underline mx-1'>Semrush 2024</a>
            </p>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className='py-20 md:py-24 bg-apty-bg-subtle'>
        <div className='container mx-auto px-4 max-w-7xl'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='text-center mb-12'
          >
            <h2 className='text-[36px] md:text-[48px] leading-[1.2] font-bold font-apty-heading text-apty-text-primary mb-4'>
              Our <span className='text-apty-primary'>SMB-Friendly</span> Process
            </h2>
            <p className='text-lg text-apty-text-secondary max-w-3xl mx-auto'>
              Flexible payments, clear milestones, no surprises
            </p>
          </motion.div>

          <div className='max-w-5xl mx-auto'>
            {/* Process Steps */}
            <div className='relative'>
              {/* Progress Line */}
              <div className='absolute left-8 top-0 bottom-0 w-0.5 bg-apty-border-subtle hidden md:block' />
              
              <div className='space-y-8'>
                {[
                  {
                    week: 'Week 1',
                    title: 'Discovery & Planning',
                    payment: '30% deposit',
                    tasks: ['Comprendere il tuo business', 'Analisi competitor', 'Pianificazione tecnica', 'Strategia contenuti'],
                    icon: HeartHandshake,
                    color: 'text-apty-primary'
                  },
                  {
                    week: 'Week 2-4',
                    title: 'Design & Development',
                    payment: '40% on design approval',
                    tasks: ['Mobile-first design', 'Speed optimization', 'Security implementation', 'Content integration'],
                    icon: Code2,
                    color: 'text-apty-secondary'
                  },
                  {
                    week: 'Week 5-6',
                    title: 'Testing & Launch',
                    payment: '30% on launch',
                    tasks: ['Form testing', 'Mobile testing', 'SEO setup', 'Training provided'],
                    icon: Zap,
                    color: 'text-apty-tertiary'
                  },
                  {
                    week: 'Ongoing',
                    title: 'Growth & Support',
                    payment: 'Monthly maintenance',
                    tasks: ['Security updates', 'Performance monitoring', 'Content updates', 'Conversion optimization'],
                    icon: TrendingUp,
                    color: 'text-apty-state-success'
                  }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className='relative flex gap-6 items-start'
                  >
                    <div className={`hidden md:flex w-16 h-16 bg-apty-bg-base rounded-full items-center justify-center border-2 border-apty-border-subtle z-10 ${item.color}`}>
                      <item.icon className='w-8 h-8' />
                    </div>
                    
                    <div className='flex-1 bg-apty-bg-base rounded-xl p-6 shadow-lg border border-apty-border-subtle'>
                      <div className='flex items-start justify-between mb-4'>
                        <div>
                          <div className='text-sm font-medium text-apty-primary mb-1'>{item.week}</div>
                          <h3 className='text-xl font-bold text-apty-text-primary'>{item.title}</h3>
                        </div>
                        <div className='text-right'>
                          <div className='text-sm text-apty-text-secondary'>Payment</div>
                          <div className='font-semibold text-apty-primary'>{item.payment}</div>
                        </div>
                      </div>
                      
                      <div className='grid grid-cols-2 gap-2'>
                        {item.tasks.map((task, j) => (
                          <div key={j} className='flex items-center gap-2'>
                            <CheckCircle2 className='w-4 h-4 text-apty-state-success' />
                            <span className='text-sm text-apty-text-secondary'>{task}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Payment Options */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className='mt-12 bg-apty-primary/10 rounded-xl p-6 text-center'
            >
              <CreditCard className='w-12 h-12 text-apty-primary mx-auto mb-3' />
              <h3 className='text-lg font-semibold text-apty-text-primary mb-2'>Flexible Payment Options</h3>
              <p className='text-sm text-apty-text-secondary mb-3'>
                3-12 month payment plans available • No hidden costs • Cancel anytime
              </p>
              <p className='text-xs text-apty-text-secondary'>
                We understand SMB cash flow. Let's find a payment structure that works for you.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection 
        title="Le Domande delle"
        titleHighlight="PMI Italiane"
        questions={developmentFAQs}
      />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}