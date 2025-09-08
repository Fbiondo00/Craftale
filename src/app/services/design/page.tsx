'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { 
  Clock, Shield, 
  ArrowRight, CheckCircle2, AlertCircle, 
  Eye,
  MousePointer, Layers, Monitor,
  Brain, Timer,
  Globe, Lock, Gauge
} from 'lucide-react';
import { AptyPrimaryButton } from '@/components/apty/AptyButton';
import CTASection from '@/components/home/CTASection';
import FAQSection from '@/components/sections/FAQSection';
import Link from 'next/link';
import { LumaSpin } from '@/components/ui/luma-spin';

// Animated counter component
function Counter({ from = 0, to, duration = 2, suffix = '', prefix = '' }: { from?: number; to: number; duration?: number; suffix?: string; prefix?: string }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: '-100px' });
  
  useEffect(() => {
    if (!inView) return;
    
    const node = nodeRef.current;
    if (!node) return;
    
    const controls = animate(from, to, {
      duration,
      onUpdate(value) {
        node.textContent = prefix + Math.floor(value).toString() + suffix;
      },
    });
    
    return () => controls.stop();
  }, [from, to, duration, suffix, prefix, inView]);
  
  return <span ref={nodeRef}>{prefix}{from}</span>;
}

// FAQ Questions for Italian SMBs - Design Services
const designFAQs = [
  {
    q: "Quanto costa un design professionale per una PMI? Vale l'investimento?",
    a: "Un design professionale costa tra €1.500-5.000 per PMI italiane. Il ROI è concreto: il 70% delle PMI con presenza online professionale vede aumenti di preventivi e conversioni entro 12 mesi. In 50ms i clienti giudicano la vostra credibilità - il 94% delle decisioni dipende dal design. Un investimento che si ripaga con autorevolezza e conversioni misurabili."
  },
  {
    q: "Quanto conta davvero il design per trasmettere fiducia nel mercato italiano?",
    a: "Fondamentale. La prima impressione si forma in 50 millisecondi e il 94% è basata sul design. Per le PMI italiane, comunicare professionalità è vitale. Un design curato con 'segnali di fiducia' (recensioni verificate, certificazioni, dati aziendali trasparenti) aumenta la credibilità del 75%. Nel mercato italiano, l'estetica e la cura dei dettagli sono sinonimo di affidabilità e qualità del servizio."
  },
  {
    q: "Il design responsive è davvero necessario per il nostro target?",
    a: "Assolutamente sì. Il 65% del traffico italiano è mobile, con picchi del 78% per ricerche locali. Senza design responsive perdete oltre metà dei clienti potenziali. Gli italiani utilizzano lo smartphone per tutto: prenotazioni, acquisti, ricerca fornitori, confronto prezzi. Un sito non ottimizzato per mobile nel 2024 comunica inadeguatezza tecnologica e scarsa attenzione all'esperienza cliente."
  },
  {
    q: "Come garantite che il brand sia coerente ovunque?",
    a: "Creiamo un design system completo: logo, palette colori, tipografia, tono di voce coerenti su sito web, social media, email marketing, materiali stampati. Nel mercato italiano la coerenza visiva equivale ad affidabilità professionale. Un'identità coordinata rafforza il ricordo del marchio del 40% e aumenta la fiducia dei clienti. L'immagine aziendale coerente diventa asset strategico per la crescita."
  },
  {
    q: "Perché non usare semplicemente un template o strumenti fai-da-te?",
    a: "Template e strumenti DIY hanno costi iniziali bassi ma limitazioni critiche. Un design custom offre: differenziazione totale dai competitor (zero rischio di siti identici), ottimizzazione specifica per il vostro settore e target, conversioni superiori del 30-50%, integrazione di funzionalità su misura, SEO ottimizzato per il mercato locale. L'unicità del design comunica professionalità e attenzione al cliente che i template non possono garantire."
  },
  {
    q: "Il design influenza davvero le vendite e i contatti?",
    a: "Dati alla mano: sì. Il 88% degli utenti non ritorna dopo una cattiva esperienza visiva. Un design professionale aumenta le conversioni del 30-50%, riduce il bounce rate dal 55% al 35%, incrementa il tempo di permanenza del 40%. Per le PMI italiane significa più preventivi qualificati, clienti che completano gli acquisti, maggiore autorevolezza percepita. Il design non è estetica, è strategia di business misurabile."
  },
  {
    q: "Come verifico che il design stia funzionando?",
    a: "Con metriche concrete: tasso di conversione (quanti visitatori diventano clienti), tempo permanenza sul sito, percentuale di abbandono, profondità di navigazione, heatmap delle interazioni. Forniamo report mensili con analisi del comportamento utenti, A/B test per ottimizzazioni continue, confronto con benchmark di settore. Ogni modifica è guidata da dati reali, non opinioni."
  },
  {
    q: "Quali sono le tempistiche per un progetto di design completo?",
    a: "15-45 giorni lavorativi secondo complessità e obiettivi. Fase 1: analisi aziendale e competitor (3-5 giorni). Fase 2: concept e proposte creative (5-7 giorni). Fase 3: sviluppo design definitivo (7-15 giorni). Fase 4: implementazione e ottimizzazioni (5-10 giorni). Fase 5: test e formazione team (3-5 giorni). Comunicazione costante con milestone settimanali per garantire allineamento totale."
  }
];

export default function WebsiteDesignPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'psychology' | 'metrics' | 'technical'>('psychology');

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
      {/* Hero Section - Full Width Immersive */}
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
              className='inline-flex items-center gap-2 px-6 py-3 bg-apty-bg-base/10 backdrop-blur-md rounded-full mb-6 md:mb-8 border border-white/20'
            >
              <Timer className='w-4 h-4 text-apty-text-inverse' />
              <span className='text-sm font-medium text-apty-text-inverse'>50ms per creare un'impressione</span>
            </motion.div>

            {/* Main Headline */}
            <h1 className='text-[48px] md:text-[72px] leading-[1.1] font-bold font-apty-heading text-apty-text-inverse mb-6'>
              <span className='text-apty-primary'>94%</span> delle prime impressioni
              <br />
              sono <span className='bg-gradient-to-r from-apty-primary to-apty-secondary bg-clip-text text-transparent'>legate al design</span>
            </h1>

            {/* Subheadline */}
            <p className='text-xl md:text-2xl text-apty-text-inverse/80 mb-8 max-w-3xl mx-auto leading-relaxed'>
              Gli utenti decidono in 50 millisecondi. Un design mediocre ti fa perdere 
              <span className='font-semibold text-apty-text-inverse'> l'88% dei visitatori per sempre</span>. 
              Creiamo esperienze che trasformano i visitatori in clienti.
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
                  <Counter to={50} suffix='ms' />
                </div>
                <div className='text-xs md:text-sm text-apty-text-inverse/60'>Per formare un'impressione</div>
              </div>
              <div className='text-center'>
                <div className='text-3xl md:text-4xl font-bold text-apty-text-inverse'>
                  <Counter to={94} suffix='%' />
                </div>
                <div className='text-xs md:text-sm text-apty-text-inverse/60'>Giudizio basato sul visual</div>
              </div>
              <div className='text-center'>
                <div className='text-3xl md:text-4xl font-bold text-apty-text-inverse'>
                  <Counter to={88} suffix='%' />
                </div>
                <div className='text-xs md:text-sm text-apty-text-inverse/60'>Non tornano dopo cattiva UX</div>
              </div>
              <div className='text-center'>
                <div className='text-3xl md:text-4xl font-bold text-apty-primary'>
                  <Counter to={48} suffix='%' />
                </div>
                <div className='text-xs md:text-sm text-apty-text-inverse/60'>Conversioni in più con segnali di fiducia</div>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className='flex flex-col sm:flex-row gap-4 justify-center mb-16 md:mb-0'
            >
              <Link href='/pricing'>
                <AptyPrimaryButton size='xl' className='min-w-[200px]'>
                  Richiedi il Tuo Design Audit
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

      {/* First Impressions & User Psychology Section */}
      <section className='py-24 md:py-32 bg-apty-bg-base'>
        <div className='container mx-auto px-4 max-w-7xl'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='text-center mb-16'
          >
            <h2 className='text-[40px] md:text-[56px] leading-[1.2] font-bold font-apty-heading text-apty-text-primary mb-4'>
              La <span className='text-apty-primary'>Psicologia</span> delle Prime Impressioni
            </h2>
            <p className='text-xl text-apty-text-secondary max-w-3xl mx-auto'>
              Capire come gli utenti prendono decisioni in millisecondi sul tuo brand
            </p>
          </motion.div>

          {/* Timeline Visual */}
          <div className='max-w-5xl mx-auto mb-16'>
            <div className='relative'>
              {/* Timeline bar */}
              <div className='absolute left-0 right-0 top-[30px] md:top-[34px] h-2 bg-gradient-to-r from-apty-primary via-apty-secondary to-apty-tertiary rounded-full' />
              
              {/* Timeline points */}
              <div className='relative flex justify-between'>
                {[
                  { time: '0-50ms', event: 'Elaborazione Visiva', desc: 'Il cervello elabora la gerarchia visiva', impact: '94% dell\'impressione' },
                  { time: '50-500ms', event: 'Risposta Emotiva', desc: 'Si forma fiducia & credibilità', impact: '75% giudica la credibilità' },
                  { time: '1-3s', event: 'Punto di Decisione', desc: 'Decisione resta o abbandona', impact: '88% non torna' },
                  { time: '3-5s', event: 'Engagement', desc: 'Inizia valutazione contenuti', impact: 'Solo se il design convince' }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className='flex flex-col items-center relative'
                  >
                    <div className='absolute top-[24px] md:top-[28px] w-4 h-4 md:w-5 md:h-5 bg-apty-bg-base border-4 border-apty-primary rounded-full z-10' />
                    <div className='text-center pt-14 md:pt-16'>
                      <div className='text-xs md:text-sm font-bold text-apty-primary mb-1'>{item.time}</div>
                      <div className='text-xs md:text-base font-semibold text-apty-text-primary mb-1'>{item.event}</div>
                      <div className='text-xs text-apty-text-secondary hidden md:block'>{item.desc}</div>
                      <div className='text-xs md:text-sm font-bold text-apty-tertiary mt-1'>{item.impact}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Visual Impact Stats */}
          <div className='grid md:grid-cols-3 gap-6 max-w-5xl mx-auto'>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className='bg-apty-bg-elevated rounded-xl p-6 border border-apty-border-subtle'
            >
              <Brain className='w-12 h-12 text-apty-primary mb-4' />
              <h3 className='text-2xl font-bold text-apty-text-primary mb-2'>Visual Processing</h3>
              <div className='text-4xl font-bold text-apty-primary mb-2'>50ms</div>
              <p className='text-apty-text-secondary'>
                The human brain processes visual information in just 50 milliseconds - faster than the blink of an eye.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className='bg-apty-bg-elevated rounded-xl p-6 border border-apty-border-subtle'
            >
              <Eye className='w-12 h-12 text-apty-secondary mb-4' />
              <h3 className='text-2xl font-bold text-apty-text-primary mb-2'>Visual Weight</h3>
              <div className='text-4xl font-bold text-apty-secondary mb-2'>94%</div>
              <p className='text-apty-text-secondary'>
                Visual appearance accounts for 94% of first impressions, far outweighing content at first glance.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className='bg-apty-bg-elevated rounded-xl p-6 border border-apty-border-subtle'
            >
              <Shield className='w-12 h-12 text-apty-tertiary mb-4' />
              <h3 className='text-2xl font-bold text-apty-text-primary mb-2'>Trust Decision</h3>
              <div className='text-4xl font-bold text-apty-tertiary mb-2'>3 sec</div>
              <p className='text-apty-text-secondary'>
                Users decide whether to trust your site within 3 seconds. Trust signals must be immediately visible.
              </p>
            </motion.div>
          </div>

          {/* Source Links */}
          <div className='mt-8 text-center'>
            <p className='text-sm text-apty-text-secondary'>
              Fonti: 
              <a href='https://thesis.unipd.it/retrieve/f13e24c5-a1db-4dc2-b7e6-3aea71493acd/Lazzaro_Mattia.pdf' target='_blank' rel='noopener noreferrer' className='text-apty-primary hover:underline mx-1'>Università di Padova</a>,
              <a href='https://www.shopify.com/it/blog/design-psicologico' target='_blank' rel='noopener noreferrer' className='text-apty-primary hover:underline mx-1'>Shopify Italia</a>
            </p>
          </div>
        </div>
      </section>

      {/* Conversion Benchmarks by Industry */}
      <section id='conversion-data' className='py-24 md:py-32 bg-apty-bg-subtle'>
        <div className='container mx-auto px-4 max-w-7xl'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='text-center mb-16'
          >
            <h2 className='text-[40px] md:text-[56px] leading-[1.2] font-bold font-apty-heading text-apty-text-primary mb-4'>
              Benchmark di <span className='text-apty-primary'>Conversione per Settore</span> 2025
            </h2>
            <p className='text-xl text-apty-text-secondary max-w-3xl mx-auto'>
              Insight basati sui dati da migliaia di siti in diversi settori
            </p>
          </motion.div>

          {/* Tabbed Content */}
          <div className='max-w-6xl mx-auto'>
            <div className='flex justify-center mb-12'>
              <div className='bg-apty-bg-base rounded-lg p-1 flex gap-1'>
                <button
                  onClick={() => setActiveTab('psychology')}
                  className={`px-6 py-3 rounded-md transition-all ${
                    activeTab === 'psychology' 
                      ? 'bg-apty-primary text-apty-text-inverse' 
                      : 'text-apty-text-secondary hover:text-apty-text-primary'
                  }`}
                >
                  Comportamento Utenti
                </button>
                <button
                  onClick={() => setActiveTab('metrics')}
                  className={`px-6 py-3 rounded-md transition-all ${
                    activeTab === 'metrics' 
                      ? 'bg-apty-primary text-apty-text-inverse' 
                      : 'text-apty-text-secondary hover:text-apty-text-primary'
                  }`}
                >
                  Metriche di Settore
                </button>
                <button
                  onClick={() => setActiveTab('technical')}
                  className={`px-6 py-3 rounded-md transition-all ${
                    activeTab === 'technical' 
                      ? 'bg-apty-primary text-apty-text-inverse' 
                      : 'text-apty-text-secondary hover:text-apty-text-primary'
                  }`}
                >
                  Impatto Tecnico
                </button>
              </div>
            </div>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: activeTab === 'psychology' ? -20 : activeTab === 'metrics' ? 0 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'psychology' && (
                <div className='grid md:grid-cols-2 gap-6'>
                  {/* Tasso di Rimbalzo per Complessità del Design */}
                  <div className='bg-apty-bg-base rounded-2xl p-8 shadow-lg'>
                    <h3 className='text-2xl font-bold text-apty-text-primary mb-6'>Impatto della Complessità del Design</h3>
                    <div className='space-y-4'>
                      <div className='flex justify-between items-center'>
                        <span className='text-apty-text-primary font-medium'>Cluttered Design</span>
                        <div className='flex items-center gap-2'>
                          <div className='text-2xl font-bold text-apty-state-error'>55-70%</div>
                          <span className='text-sm text-apty-text-secondary'>tasso di rimbalzo</span>
                        </div>
                      </div>
                      <div className='w-full bg-apty-bg-base rounded-full h-3'>
                        <div className='h-3 bg-gradient-to-r from-apty-state-error to-apty-accent rounded-full' style={{ width: '70%' }} />
                      </div>
                      
                      <div className='flex justify-between items-center mt-6'>
                        <span className='text-apty-text-primary font-medium'>Minimalist Design</span>
                        <div className='flex items-center gap-2'>
                          <div className='text-2xl font-bold text-apty-state-success'>35-50%</div>
                          <span className='text-sm text-apty-text-secondary'>tasso di rimbalzo</span>
                        </div>
                      </div>
                      <div className='w-full bg-apty-bg-base rounded-full h-3'>
                        <div className='h-3 bg-gradient-to-r from-apty-state-success to-apty-primary rounded-full' style={{ width: '42%' }} />
                      </div>

                      <div className='mt-6 p-4 bg-apty-bg-subtle rounded-lg'>
                        <p className='text-sm text-apty-text-secondary'>
                          <strong className='text-apty-primary'>22% conversion decrease</strong> with cluttered layouts due to cognitive overload
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Scroll Depth Analysis */}
                  <div className='bg-apty-bg-base rounded-2xl p-8 shadow-lg'>
                    <h3 className='text-2xl font-bold text-apty-text-primary mb-6'>User Scroll Behavior</h3>
                    <div className='space-y-6'>
                      <div>
                        <div className='flex justify-between mb-2'>
                          <span className='text-apty-text-primary'>Above the fold</span>
                          <span className='font-bold text-apty-primary'>100%</span>
                        </div>
                        <div className='w-full bg-apty-bg-base rounded-full h-3'>
                          <div className='h-3 bg-apty-primary rounded-full w-full' />
                        </div>
                      </div>
                      <div>
                        <div className='flex justify-between mb-2'>
                          <span className='text-apty-text-primary'>50% scroll depth</span>
                          <span className='font-bold text-apty-secondary'>70%</span>
                        </div>
                        <div className='w-full bg-apty-bg-base rounded-full h-3'>
                          <div className='h-3 bg-apty-secondary rounded-full' style={{ width: '70%' }} />
                        </div>
                      </div>
                      <div>
                        <div className='flex justify-between mb-2'>
                          <span className='text-apty-text-primary'>Bottom of page</span>
                          <span className='font-bold text-apty-tertiary'>20%</span>
                        </div>
                        <div className='w-full bg-apty-bg-base rounded-full h-3'>
                          <div className='h-3 bg-apty-tertiary rounded-full' style={{ width: '20%' }} />
                        </div>
                      </div>
                      
                      <div className='p-4 bg-apty-primary/10 rounded-lg'>
                        <p className='text-sm text-apty-text-primary'>
                          <strong>High-performing pages:</strong> 70%+ users reach 50% scroll depth
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'metrics' && (
                <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
                  {[
                    { 
                      industry: 'E-commerce', 
                      icon: '🛍️', 
                      average: '2.5-3%', 
                      top: '5%+',
                      improvement: '+30-50%',
                      color: 'from-apty-primary to-apty-secondary'
                    },
                    { 
                      industry: 'B2B/SaaS', 
                      icon: '💼', 
                      average: '1.5-2.9%', 
                      top: '5%',
                      improvement: '+40%',
                      color: 'from-apty-state-success to-apty-tertiary'
                    },
                    { 
                      industry: 'Financial', 
                      icon: '💳', 
                      average: '5-7%', 
                      top: '10%+',
                      improvement: '+25%',
                      color: 'from-apty-primary to-apty-accent'
                    },
                    { 
                      industry: 'Healthcare', 
                      icon: '🏥', 
                      average: '3-5%', 
                      top: '8%+',
                      improvement: '+35%',
                      color: 'from-apty-secondary to-apty-primary'
                    }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className='group relative'
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl blur-xl`} />
                      <div className='relative bg-apty-bg-base rounded-2xl p-6 border border-apty-border-subtle hover:border-apty-primary/30 transition-all hover:shadow-lg'>
                        <div className='text-4xl mb-4'>{item.icon}</div>
                        <h3 className='text-xl font-semibold text-apty-text-primary mb-4'>{item.industry}</h3>
                        
                        <div className='space-y-3'>
                          <div>
                            <div className='text-sm text-apty-text-secondary mb-1'>Media di Settore</div>
                            <div className='text-2xl font-bold text-apty-text-primary'>{item.average}</div>
                          </div>
                          <div className='h-px bg-apty-border-subtle' />
                          <div>
                            <div className='text-sm text-apty-text-secondary mb-1'>Top Performer</div>
                            <div className={`text-2xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                              {item.top}
                            </div>
                          </div>
                          <div className='pt-3 border-t border-apty-border-subtle'>
                            <div className='text-sm text-apty-text-secondary'>Con Design Professionale</div>
                            <div className='text-lg font-bold text-apty-state-success'>{item.improvement}</div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {activeTab === 'technical' && (
                <div className='space-y-8'>
                  {/* Loading Time Impact */}
                  <div className='bg-apty-bg-base rounded-2xl p-8 shadow-lg'>
                    <h3 className='text-2xl font-bold text-apty-text-primary mb-6'>Performance Thresholds & Abandonment</h3>
                    <div className='grid md:grid-cols-3 gap-6'>
                      <div className='text-center p-4 bg-apty-state-success/10 rounded-lg'>
                        <Gauge className='w-8 h-8 text-apty-state-success mx-auto mb-2' />
                        <div className='text-3xl font-bold text-apty-state-success'>{'<2.5s'}</div>
                        <div className='text-sm text-apty-text-secondary mt-1'>LCP Target</div>
                        <div className='text-xs text-apty-text-primary mt-2'>10% abandonment</div>
                      </div>
                      <div className='text-center p-4 bg-apty-accent/10 rounded-lg'>
                        <Clock className='w-8 h-8 text-apty-accent mx-auto mb-2' />
                        <div className='text-3xl font-bold text-apty-accent'>3-4s</div>
                        <div className='text-sm text-apty-text-secondary mt-1'>Warning Zone</div>
                        <div className='text-xs text-apty-text-primary mt-2'>25% abandonment</div>
                      </div>
                      <div className='text-center p-4 bg-apty-state-error/10 rounded-lg'>
                        <AlertCircle className='w-8 h-8 text-apty-state-error mx-auto mb-2' />
                        <div className='text-3xl font-bold text-apty-state-error'>{'>4s'}</div>
                        <div className='text-sm text-apty-text-secondary mt-1'>Critical</div>
                        <div className='text-xs text-apty-text-primary mt-2'>50%+ abandonment</div>
                      </div>
                    </div>
                    
                    <div className='mt-6 space-y-4'>
                      <div className='flex items-start gap-3'>
                        <CheckCircle2 className='w-5 h-5 text-apty-primary mt-1' />
                        <div>
                          <div className='font-medium text-apty-text-primary'>Image Optimization</div>
                          <div className='text-sm text-apty-text-secondary'>WebP/AVIF formats, lazy loading reduce LCP by 30-50%</div>
                        </div>
                      </div>
                      <div className='flex items-start gap-3'>
                        <CheckCircle2 className='w-5 h-5 text-apty-primary mt-1' />
                        <div>
                          <div className='font-medium text-apty-text-primary'>Font Strategy</div>
                          <div className='text-sm text-apty-text-secondary'>Preloading critical fonts improves FCP by 20%</div>
                        </div>
                      </div>
                      <div className='flex items-start gap-3'>
                        <CheckCircle2 className='w-5 h-5 text-apty-primary mt-1' />
                        <div>
                          <div className='font-medium text-apty-text-primary'>Animation Performance</div>
                          <div className='text-sm text-apty-text-secondary'>INP {'<200ms'} for smooth interactions</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Core Web Vitals Impact */}
                  <div className='bg-apty-bg-base rounded-2xl p-8 shadow-lg'>
                    <h3 className='text-2xl font-bold text-apty-text-primary mb-6'>Core Web Vitals & SEO Impact</h3>
                    <div className='grid md:grid-cols-2 gap-6'>
                      <div>
                        <h4 className='font-semibold text-apty-text-primary mb-4'>Meeting Core Web Vitals</h4>
                        <div className='space-y-3'>
                          <div className='flex items-center justify-between'>
                            <span className='text-sm text-apty-text-secondary'>Tasso di Conversione</span>
                            <span className='font-bold text-apty-state-success'>+10-30%</span>
                          </div>
                          <div className='flex items-center justify-between'>
                            <span className='text-sm text-apty-text-secondary'>Traffico Organico</span>
                            <span className='font-bold text-apty-state-success'>+15-25%</span>
                          </div>
                          <div className='flex items-center justify-between'>
                            <span className='text-sm text-apty-text-secondary'>Conversioni Mobile</span>
                            <span className='font-bold text-apty-state-success'>+27%</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className='font-semibold text-apty-text-primary mb-4'>Failing Core Web Vitals</h4>
                        <div className='space-y-3'>
                          <div className='flex items-center justify-between'>
                            <span className='text-sm text-apty-text-secondary'>Calo Posizionamenti</span>
                            <span className='font-bold text-apty-state-error'>-10-20%</span>
                          </div>
                          <div className='flex items-center justify-between'>
                            <span className='text-sm text-apty-text-secondary'>Coinvolgimento Utenti</span>
                            <span className='font-bold text-apty-state-error'>-15-40%</span>
                          </div>
                          <div className='flex items-center justify-between'>
                            <span className='text-sm text-apty-text-secondary'>Impatto sui Ricavi</span>
                            <span className='font-bold text-apty-state-error'>-20%+</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Source Links */}
          <div className='mt-8 text-center'>
            <p className='text-sm text-apty-text-secondary'>
              Fonti: 
              <a href='https://www.consorzionetcomm.it/servizi/studi-e-ricerche/' target='_blank' rel='noopener noreferrer' className='text-apty-primary hover:underline mx-1'>Consorzio Netcomm</a>,
              <a href='https://web.dev/vitals/' target='_blank' rel='noopener noreferrer' className='text-apty-primary hover:underline mx-1'>Google Web Vitals 2024</a>,
              <a href='https://www.osservatori.net/it/ricerche/osservatori/ecommerce-b2c' target='_blank' rel='noopener noreferrer' className='text-apty-primary hover:underline mx-1'>Politecnico di Milano</a>
            </p>
          </div>
        </div>
      </section>

      {/* Forms & Conversion Optimization */}
      <section className='py-24 md:py-32 bg-apty-bg-base'>
        <div className='container mx-auto px-4 max-w-7xl'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='text-center mb-16'
          >
            <h2 className='text-[40px] md:text-[56px] leading-[1.2] font-bold font-apty-heading text-apty-text-primary mb-4'>
              Design dei Form & <span className='text-apty-primary'>Scienza della Conversione</span>
            </h2>
            <p className='text-xl text-apty-text-secondary max-w-3xl mx-auto'>
              Every field matters. Data-driven insights on form optimization.
            </p>
          </motion.div>

          <div className='max-w-5xl mx-auto'>
            {/* Form Field Impact Chart */}
            <div className='bg-apty-bg-elevated rounded-2xl p-8 mb-8'>
              <h3 className='text-2xl font-bold text-apty-text-primary mb-6'>Abbandono del Form in base ai Campi</h3>
              
              <div className='space-y-6'>
                {[
                  { fields: '3 fields', rate: 12, color: 'bg-apty-primary' },
                  { fields: '5 fields', rate: 25, color: 'bg-apty-accent' },
                  { fields: '6 fields', rate: 33, color: 'bg-apty-secondary' },
                  { fields: '8+ fields', rate: 60, color: 'bg-apty-tertiary' }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className='flex items-center justify-between mb-2'>
                      <span className='font-medium text-apty-text-primary'>{item.fields}</span>
                      <span className='text-2xl font-bold text-apty-text-primary'>{item.rate}%</span>
                    </div>
                    <div className='w-full bg-apty-bg-base rounded-full h-4 overflow-hidden'>
                      <div 
                        className={`h-full ${item.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${item.rate}%` }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className='mt-8 p-4 bg-apty-primary/10 rounded-lg'>
                <p className='text-sm text-apty-text-primary'>
                  <strong>Key Finding:</strong> Each additional field increases abandonment by 8-10%
                </p>
              </div>
            </div>

            {/* Form Optimization Techniques */}
            <div className='grid md:grid-cols-2 gap-6'>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className='bg-apty-bg-elevated rounded-xl p-6'
              >
                <h3 className='text-xl font-bold text-apty-text-primary mb-4'>Proven Optimization Techniques</h3>
                <div className='space-y-3'>
                  <div className='flex items-start gap-3'>
                    <CheckCircle2 className='w-5 h-5 text-apty-state-success mt-1' />
                    <div>
                      <div className='font-medium text-apty-text-primary'>Progress Indicators</div>
                      <div className='text-sm text-apty-text-secondary'>+14-23% completion rate</div>
                    </div>
                  </div>
                  <div className='flex items-start gap-3'>
                    <CheckCircle2 className='w-5 h-5 text-apty-state-success mt-1' />
                    <div>
                      <div className='font-medium text-apty-text-primary'>Live Validation</div>
                      <div className='text-sm text-apty-text-secondary'>-22% abandonment</div>
                    </div>
                  </div>
                  <div className='flex items-start gap-3'>
                    <CheckCircle2 className='w-5 h-5 text-apty-state-success mt-1' />
                    <div>
                      <div className='font-medium text-apty-text-primary'>Single Column Layout</div>
                      <div className='text-sm text-apty-text-secondary'>+15-24% mobile completion</div>
                    </div>
                  </div>
                  <div className='flex items-start gap-3'>
                    <CheckCircle2 className='w-5 h-5 text-apty-state-success mt-1' />
                    <div>
                      <div className='font-medium text-apty-text-primary'>Autofill Support</div>
                      <div className='text-sm text-apty-text-secondary'>-30% time to complete</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className='bg-apty-bg-elevated rounded-xl p-6'
              >
                <h3 className='text-xl font-bold text-apty-text-primary mb-4'>Trust Elements Impact</h3>
                <div className='space-y-4'>
                  <div>
                    <div className='flex justify-between mb-2'>
                      <span className='text-apty-text-primary'>SSL Badge</span>
                      <span className='font-bold text-apty-primary'>+20%</span>
                    </div>
                    <div className='w-full bg-apty-bg-base rounded-full h-2'>
                      <div className='h-2 bg-apty-primary rounded-full' style={{ width: '20%' }} />
                    </div>
                  </div>
                  <div>
                    <div className='flex justify-between mb-2'>
                      <span className='text-apty-text-primary'>Testimonials</span>
                      <span className='font-bold text-apty-secondary'>+34%</span>
                    </div>
                    <div className='w-full bg-apty-bg-base rounded-full h-2'>
                      <div className='h-2 bg-apty-secondary rounded-full' style={{ width: '34%' }} />
                    </div>
                  </div>
                  <div>
                    <div className='flex justify-between mb-2'>
                      <span className='text-apty-text-primary'>Trust Badges</span>
                      <span className='font-bold text-apty-tertiary'>+48%</span>
                    </div>
                    <div className='w-full bg-apty-bg-base rounded-full h-2'>
                      <div className='h-2 bg-apty-tertiary rounded-full' style={{ width: '48%' }} />
                    </div>
                  </div>
                  <div className='mt-4 p-3 bg-apty-accent/10 rounded-lg'>
                    <p className='text-xs text-apty-text-primary'>
                      All trust signals must be visible within first 3 seconds
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Source Links */}
          <div className='mt-8 text-center'>
            <p className='text-sm text-apty-text-secondary'>
              Fonti: 
              <a href='https://www.html.it/articoli/form-web-usabilita/' target='_blank' rel='noopener noreferrer' className='text-apty-primary hover:underline mx-1'>HTML.it</a>,
              <a href='https://www.webperformance.it/blog/ottimizzare-moduli-contatto-conversioni/' target='_blank' rel='noopener noreferrer' className='text-apty-primary hover:underline mx-1'>WebPerformance</a>
            </p>
          </div>
        </div>
      </section>

      {/* Accessibility & Compliance */}
      <section className='py-24 md:py-32 bg-apty-bg-subtle'>
        <div className='container mx-auto px-4 max-w-7xl'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='text-center mb-16'
          >
            <h2 className='text-[40px] md:text-[56px] leading-[1.2] font-bold font-apty-heading text-apty-text-primary mb-4'>
              Accessibilità & <span className='text-apty-primary'>Conformità Legale</span>
            </h2>
            <p className='text-xl text-apty-text-secondary max-w-3xl mx-auto'>
              Gli standard WCAG 2.2 sono ora obbligatori. Espandi il tuo mercato del 20%.
            </p>
          </motion.div>

          <div className='max-w-6xl mx-auto'>
            <div className='grid md:grid-cols-2 gap-8'>
              {/* WCAG Requirements */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className='bg-apty-bg-base rounded-2xl p-8 shadow-lg'
              >
                <Lock className='w-12 h-12 text-apty-primary mb-4' />
                <h3 className='text-2xl font-bold text-apty-text-primary mb-4'>WCAG 2.2 Requirements</h3>
                
                <div className='space-y-4'>
                  <div className='p-4 bg-apty-bg-subtle rounded-lg'>
                    <h4 className='font-semibold text-apty-text-primary mb-2'>Legal Baseline: Level AA</h4>
                    <ul className='space-y-2 text-sm text-apty-text-secondary'>
                      <li className='flex items-start gap-2'>
                        <CheckCircle2 className='w-4 h-4 text-apty-primary mt-0.5' />
                        <span>Minimum 24x24px touch targets</span>
                      </li>
                      <li className='flex items-start gap-2'>
                        <CheckCircle2 className='w-4 h-4 text-apty-primary mt-0.5' />
                        <span>Consistent help mechanisms</span>
                      </li>
                      <li className='flex items-start gap-2'>
                        <CheckCircle2 className='w-4 h-4 text-apty-primary mt-0.5' />
                        <span>Accessible authentication</span>
                      </li>
                      <li className='flex items-start gap-2'>
                        <CheckCircle2 className='w-4 h-4 text-apty-primary mt-0.5' />
                        <span>Focus visibility not obscured</span>
                      </li>
                    </ul>
                  </div>

                  <div className='p-4 bg-apty-state-error/10 rounded-lg'>
                    <p className='text-sm text-apty-text-primary'>
                      <strong>Legal Risk:</strong> ADA lawsuits increased 300% since 2022
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Business Impact */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className='bg-apty-bg-base rounded-2xl p-8 shadow-lg'
              >
                <Globe className='w-12 h-12 text-apty-secondary mb-4' />
                <h3 className='text-2xl font-bold text-apty-text-primary mb-4'>Business Impact</h3>
                
                <div className='space-y-6'>
                  <div>
                    <div className='flex justify-between mb-2'>
                      <span className='text-apty-text-primary'>Market Reach</span>
                      <span className='text-2xl font-bold text-apty-state-success'>+20%</span>
                    </div>
                    <p className='text-sm text-apty-text-secondary'>Access to users with disabilities</p>
                  </div>
                  
                  <div>
                    <div className='flex justify-between mb-2'>
                      <span className='text-apty-text-primary'>Customer Loyalty</span>
                      <span className='text-2xl font-bold text-apty-state-success'>+35%</span>
                    </div>
                    <p className='text-sm text-apty-text-secondary'>Improved usability for all users</p>
                  </div>

                  <div>
                    <div className='flex justify-between mb-2'>
                      <span className='text-apty-text-primary'>Compliance Cost</span>
                      <span className='text-xl font-bold text-apty-text-primary'>$3-15k</span>
                    </div>
                    <p className='text-sm text-apty-text-secondary'>One-time retrofit investment</p>
                  </div>

                  <div className='p-4 bg-apty-primary/10 rounded-lg'>
                    <p className='text-sm text-apty-text-primary'>
                      <strong>ROI:</strong> Accessible sites see better SEO and wider audience reach
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Source Links */}
          <div className='mt-8 text-center'>
            <p className='text-sm text-apty-text-secondary'>
              Fonti: 
              <a href='https://www.w3.org/TR/WCAG22/' target='_blank' rel='noopener noreferrer' className='text-apty-primary hover:underline mx-1'>W3C WCAG 2.2</a>,
              <a href='https://www.agid.gov.it/it/design-servizi/linee-guida' target='_blank' rel='noopener noreferrer' className='text-apty-primary hover:underline mx-1'>AgID Linee Guida</a>,
              <a href='https://www.agid.gov.it/it/design-servizi/accessibilita-usabilita' target='_blank' rel='noopener noreferrer' className='text-apty-primary hover:underline mx-1'>AgID Accessibilità</a>
            </p>
          </div>
        </div>
      </section>


      {/* Design Trends with Impact */}
      <section className='py-24 md:py-32 bg-apty-bg-subtle'>
        <div className='container mx-auto px-4 max-w-7xl'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='text-center mb-16'
          >
            <h2 className='text-[40px] md:text-[56px] leading-[1.2] font-bold font-apty-heading text-apty-text-primary mb-4'>
              2025 Design Trends That <span className='text-apty-primary'>Actually Convert</span>
            </h2>
            <p className='text-xl text-apty-text-secondary max-w-3xl mx-auto'>
              Not just trends - proven impacts on business metrics
            </p>
          </motion.div>

          <div className='max-w-6xl mx-auto'>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {[
                {
                  trend: 'Core Web Vitals Focus',
                  impact: '+10-30%',
                  metric: 'conversion rate',
                  icon: Gauge,
                  color: 'bg-apty-primary'
                },
                {
                  trend: 'Micro-interactions',
                  impact: '+6-15%',
                  metric: 'CTA clicks',
                  icon: MousePointer,
                  color: 'bg-apty-secondary'
                },
                {
                  trend: 'Dark Mode Options',
                  impact: '+12-22%',
                  metric: 'engagement (tech)',
                  icon: Monitor,
                  color: 'bg-apty-tertiary'
                },
                {
                  trend: 'Accessibility-First',
                  impact: '+35%',
                  metric: 'market reach',
                  icon: Globe,
                  color: 'bg-apty-accent'
                },
                {
                  trend: 'Minimalism',
                  impact: '+42%',
                  metric: 'signup conversion',
                  icon: Layers,
                  color: 'bg-apty-primary'
                },
                {
                  trend: 'AI Personalization',
                  impact: '+20-80%',
                  metric: 'session duration',
                  icon: Brain,
                  color: 'bg-apty-secondary'
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className='bg-apty-bg-base rounded-xl p-6 hover:shadow-lg transition-shadow'
                >
                  <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center mb-4`}>
                    <item.icon className='w-6 h-6 text-apty-text-inverse' />
                  </div>
                  <h3 className='text-lg font-semibold text-apty-text-primary mb-2'>{item.trend}</h3>
                  <div className='text-2xl font-bold text-apty-state-success mb-1'>{item.impact}</div>
                  <p className='text-sm text-apty-text-secondary'>{item.metric}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Source Links */}
          <div className='mt-8 text-center'>
            <p className='text-sm text-apty-text-secondary'>
              Fonti: 
              <a href='https://www.html.it/articoli/tendenze-web-design/' target='_blank' rel='noopener noreferrer' className='text-apty-primary hover:underline mx-1'>HTML.it Trends</a>,
              <a href='https://www.shopify.com/it/blog/tendenze-web-design' target='_blank' rel='noopener noreferrer' className='text-apty-primary hover:underline mx-1'>Shopify Italia Trends</a>
            </p>
          </div>
        </div>
      </section>

      {/* Our Data-Driven Process */}
      <section className='py-24 md:py-32 bg-apty-bg-base'>
        <div className='container mx-auto px-4 max-w-7xl'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='text-center mb-16'
          >
            <h2 className='text-[40px] md:text-[56px] leading-[1.2] font-bold font-apty-heading text-apty-text-primary mb-4'>
              Our <span className='text-apty-primary'>Data-Driven</span> Process
            </h2>
            <p className='text-xl text-apty-text-secondary max-w-3xl mx-auto'>
              Every decision backed by research, every pixel optimized for conversion
            </p>
          </motion.div>

          <div className='max-w-6xl mx-auto'>
            {/* Process Cards */}
            <div className='grid md:grid-cols-3 gap-6 mb-12'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className='bg-apty-bg-elevated rounded-xl p-6 border border-apty-border-subtle'
              >
                <div className='text-sm text-apty-primary font-semibold mb-2'>Week 1-2</div>
                <div className='text-2xl font-bold text-apty-text-primary mb-1'>Research & Discovery</div>
                <div className='text-sm text-apty-text-secondary mb-4'>User research, competitor analysis, conversion funnel mapping</div>
                <ul className='space-y-2 text-sm'>
                  <li className='flex items-start gap-2'>
                    <CheckCircle2 className='w-4 h-4 text-apty-primary mt-0.5' />
                    <span className='text-apty-text-secondary'>User Personas</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <CheckCircle2 className='w-4 h-4 text-apty-primary mt-0.5' />
                    <span className='text-apty-text-secondary'>Competitor Audit</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <CheckCircle2 className='w-4 h-4 text-apty-primary mt-0.5' />
                    <span className='text-apty-text-secondary'>Conversion Strategy</span>
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
                <div className='text-sm text-apty-primary font-semibold mb-2'>Week 3-5</div>
                <div className='text-2xl font-bold text-apty-text-primary mb-1'>Design & Testing</div>
                <div className='text-sm text-apty-text-secondary mb-4'>Data-driven design with A/B testing and user feedback</div>
                <ul className='space-y-2 text-sm'>
                  <li className='flex items-start gap-2'>
                    <CheckCircle2 className='w-4 h-4 text-apty-primary mt-0.5' />
                    <span className='text-apty-text-secondary'>Wireframes</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <CheckCircle2 className='w-4 h-4 text-apty-primary mt-0.5' />
                    <span className='text-apty-text-secondary'>Visual Design</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <CheckCircle2 className='w-4 h-4 text-apty-primary mt-0.5' />
                    <span className='text-apty-text-secondary'>Usability Testing</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className='bg-apty-bg-elevated rounded-xl p-6 border border-apty-border-subtle'
              >
                <div className='text-sm text-apty-tertiary font-semibold mb-2'>Week 6-8</div>
                <div className='text-2xl font-bold text-apty-text-primary mb-1'>Optimize & Launch</div>
                <div className='text-sm text-apty-text-secondary mb-4'>Performance optimization, Core Web Vitals, accessibility compliance</div>
                <ul className='space-y-2 text-sm'>
                  <li className='flex items-start gap-2'>
                    <CheckCircle2 className='w-4 h-4 text-apty-tertiary mt-0.5' />
                    <span className='text-apty-text-secondary'>Speed Optimization</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <CheckCircle2 className='w-4 h-4 text-apty-tertiary mt-0.5' />
                    <span className='text-apty-text-secondary'>WCAG Compliance</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <CheckCircle2 className='w-4 h-4 text-apty-tertiary mt-0.5' />
                    <span className='text-apty-text-secondary'>Launch Support</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection 
        title="Le Domande delle"
        titleHighlight="PMI Italiane"
        questions={designFAQs}
      />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}