'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Zap, Crown, Building, X, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PricingTier {
  id: string;
  name: string;
  level: 'BASE' | 'STANDARD' | 'PREMIUM';
  price: number;
  timeline: string;
  pages: number;
  targetPersona: string[];
  features: string[];
  setupIncluded: string[];
  support: string;
  icon: any;
  popular?: boolean;
  enterprise?: boolean;
}

const pricingTiers: PricingTier[] = [
  // TIER 1: PRESENZA DIGITALE ESSENZIALE
  {
    id: 'tier-1a',
    name: 'TIER 1A - BASE',
    level: 'BASE',
    price: 850,
    timeline: '2-3 settimane',
    pages: 4,
    targetPersona: ['Trattorie Familiari'],
    features: [
      '4 pagine essenziali (Home, Menu, Chi Siamo, Contatti)',
      'Design responsive mobile-friendly',
      'Mappa Google integrata',
      'Modulo contatti base con auto-risposta',
      'Gallery fotografica base (15 foto)',
      'SEO di base (meta tags, structured data)',
      'Hosting e dominio .it per 1 anno incluso',
      'SSL certificate incluso',
    ],
    setupIncluded: ['2 round di revisioni'],
    support: 'Email support',
    icon: Check,
  },
  {
    id: 'tier-1b',
    name: 'TIER 1B - STANDARD',
    level: 'STANDARD',
    price: 1250,
    timeline: '3-4 settimane',
    pages: 6,
    targetPersona: ['Trattorie Familiari', 'Specialisti Regionali'],
    features: [
      '6 pagine complete con storytelling',
      'Menu PDF scaricabile professionale',
      'Integrazione social media basica',
      'Form contatti avanzato',
      'Gallery espansa (25 foto) con categorie',
      'SEO ottimizzato per ricerche locali',
      'Google My Business setup completo',
      'Recensioni Google integrate automaticamente',
    ],
    setupIncluded: ['3 round di revisioni', 'Tutorial gestione (2 ore)'],
    support: 'Email + Phone support',
    icon: Star,
    popular: true,
  },
  {
    id: 'tier-1c',
    name: 'TIER 1C - PREMIUM',
    level: 'PREMIUM',
    price: 1650,
    timeline: '4-5 settimane',
    pages: 8,
    targetPersona: ['Specialisti Regionali'],
    features: [
      '8 pagine specializzate con blog/news',
      'Menu interattivo con descrizioni gourmet',
      'QR code menu personalizzato',
      'Video presentazione ristorante',
      'Newsletter signup con automation',
      'Google Analytics setup e training',
      'Ottimizzazione velocità e Core Web Vitals',
      '3 mesi supporto post-lancio incluso',
    ],
    setupIncluded: ['4 round di revisioni', 'Formazione team (4 ore)'],
    support: 'Priority support',
    icon: Crown,
  },
  // TIER 2: ESPERIENZA INTERATTIVA MODERNA
  {
    id: 'tier-2a',
    name: 'TIER 2A - BASE',
    level: 'BASE',
    price: 1800,
    timeline: '4-5 settimane',
    pages: 6,
    targetPersona: ['Nuovi Imprenditori'],
    features: [
      'Sistema prenotazioni integrato',
      'Menu digitale interattivo con filtri allergie',
      'Calendario disponibilità real-time',
      'Conferme automatiche via email/SMS',
      'Gallery professionale categorizzata',
      'SEO avanzato per ricerche competitive',
      'Google Analytics tracking conversioni',
      'Mobile optimization superiore (PWA-ready)',
    ],
    setupIncluded: ['3 round di revisioni'],
    support: 'Priority support',
    icon: Zap,
  },
  {
    id: 'tier-2b',
    name: 'TIER 2B - STANDARD',
    level: 'STANDARD',
    price: 2400,
    timeline: '6-7 settimane',
    pages: 8,
    targetPersona: ['Nuovi Imprenditori', 'Specialisti Regionali Advanced'],
    features: [
      'Sistema prenotazioni avanzato multi-slot',
      'Integrazione delivery (2 piattaforme)',
      'Menu dinamico con disponibilità real-time',
      'Blog professionale per content marketing',
      'Email marketing automation',
      'Chat WhatsApp integrata con bot',
      'Analytics dashboard personalizzata',
      'Review management system interno',
    ],
    setupIncluded: ['4 round di revisioni', 'Training completo (9 ore)'],
    support: 'Premium support',
    icon: Star,
    popular: true,
  },
  {
    id: 'tier-2c',
    name: 'TIER 2C - PREMIUM',
    level: 'PREMIUM',
    price: 3200,
    timeline: '8-10 settimane',
    pages: 10,
    targetPersona: ['Nuovi Imprenditori Advanced'],
    features: [
      'Ecosistema digitale completo',
      'AI chatbot per FAQ e prenotazioni',
      'Customer portal personalizzato',
      'Programma fedeltà digitale avanzato',
      'Social media management incluso (2 post/settimana)',
      'Mobile app web-based (PWA)',
      'Integration API per software gestionali',
      '6 mesi supporto dedicato post-lancio',
    ],
    setupIncluded: ['5 round di revisioni', 'Account manager assegnato'],
    support: 'Enterprise support',
    icon: Crown,
  },
  // TIER 3: E-COMMERCE E VENDITA ONLINE
  {
    id: 'tier-3a',
    name: 'TIER 3A - BASE',
    level: 'BASE',
    price: 3500,
    timeline: '8-10 settimane',
    pages: 8,
    targetPersona: ['Ristoranti Upscale'],
    features: [
      'E-commerce completo prodotti ristorante',
      'Sistema ordini con slot delivery/pickup',
      'Payment gateway multi-opzione',
      'Integrazione corrieri nazionali',
      'Customer account con storico ordini',
      'Gestione coupon e promozioni',
      'Review system per prodotti',
      'Mobile app web-based shopping',
    ],
    setupIncluded: ['5 round di revisioni', 'Training e-commerce (12 ore)'],
    support: 'Enterprise support',
    icon: Building,
  },
  {
    id: 'tier-3b',
    name: 'TIER 3B - STANDARD',
    level: 'STANDARD',
    price: 4800,
    timeline: '10-12 settimane',
    pages: 10,
    targetPersona: ['Ristoranti Upscale', 'Catene'],
    features: [
      'E-commerce multi-categoria completo',
      'Sistema subscription/abbonamenti',
      'B2B section per partnerships',
      'Email marketing automation e-commerce',
      'AI recommendation engine',
      'Multi-currency per clientela internazionale',
      'Business intelligence dashboard',
      'Account manager dedicato primo anno',
    ],
    setupIncluded: ['6 round di revisioni', 'Training multi-level (20 ore)'],
    support: 'Enterprise Premium',
    icon: Crown,
    popular: true,
  },
  {
    id: 'tier-3c',
    name: 'TIER 3C - PREMIUM',
    level: 'PREMIUM',
    price: 6500,
    timeline: '12-16 settimane',
    pages: 12,
    targetPersona: ['Catene', 'Enterprise'],
    features: [
      'Ecosistema omnichannel completo',
      'App mobile nativa iOS/Android',
      'AI chatbot avanzato 24/7',
      'Sistema loyalty unificato cross-channel',
      'Business intelligence con machine learning',
      'Gestione multi-location centralizzata',
      'API ecosystem completo',
      'Dedicated development team',
    ],
    setupIncluded: ['Unlimited revisioni', '12 mesi supporto dedicato'],
    support: 'White Glove Support',
    icon: Building,
    enterprise: true,
  },
];

export default function TierCards() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const selectedTierData = pricingTiers.find((t) => t.id === selectedTier);

  const getTierIcon = (tier: PricingTier) => {
    const IconComponent = tier.icon;
    return <IconComponent className='w-6 h-6' />;
  };

  const handleTierSelect = (tierId: string) => {
    setSelectedTier(tierId);
    setShowModal(true);
  };

  return (
    <>
      {/* Tier 1: Presenza Digitale */}
      <div className='mb-16'>
        <h3 className='text-3xl font-bold text-center mb-2'>
          TIER 1: Presenza Digitale Essenziale
        </h3>
        <p className='text-color-tertiary text-center mb-8'>
          €850 - €1.650 • Target: Trattorie Familiari + Specialisti Regionali
        </p>

        <div className='grid md:grid-cols-3 gap-8'>
          {pricingTiers.slice(0, 3).map((tier, index) => {
            const btnVariant = tier.popular
              ? 'bg-gradient-to-r from-brand-secondary to-brand-tertiary text-white hover:from-brand-secondary hover:to-brand-tertiary'
              : 'bg-color-muted text-color-primary hover:bg-color-muted';
            return (
            <motion.div
              key={tier.id}
              className={cn(
                'relative bg-white rounded-2xl shadow-lg border-2 p-8 hover:shadow-2xl transition-all duration-300',
                tier.popular ? 'border-brand-secondary/90 scale-105' : 'border-color-default',
                'cursor-pointer'
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => handleTierSelect(tier.id)}
            >
              {tier.popular && (
                <div className='absolute -top-4 left-1/2 transform -translate-x-1/2'>
                  <span className='bg-gradient-to-r from-brand-secondary to-brand-tertiary text-white px-4 py-2 rounded-full text-sm font-bold'>
                    PIÙ POPOLARE
                  </span>
                </div>
              )}

              <div className='text-center mb-6'>
                <div className='w-12 h-12 bg-brand-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                  {getTierIcon(tier)}
                </div>
                <h4 className='text-xl font-bold text-color-primary mb-2'>{tier.name}</h4>
                <div className='text-3xl font-bold text-brand-secondary mb-2'>
                  €{tier.price.toLocaleString('it-IT')}
                </div>
                <p className='text-color-tertiary'>{tier.timeline}</p>
              </div>

              <div className='space-y-3 mb-6'>
                <div className='flex items-center text-sm'>
                  <Check className='w-4 h-4 text-color-state-success mr-2' />
                  <span>{tier.pages} pagine incluse</span>
                </div>
                {tier.features.slice(0, 3).map((feature) => (
                  <div key={feature} className='flex items-center text-sm'>
                    <Check className='w-4 h-4 text-color-state-success mr-2' />
                    <span>{feature}</span>
                  </div>
                ))}
                {tier.features.length > 3 && (
                  <div className='text-sm text-brand-secondary font-medium'>
                    +{tier.features.length - 3} altre funzionalità
                  </div>
                )}
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleTierSelect(tier.id);
                }}
                className={cn('w-full py-3 px-6 rounded-lg font-medium transition-all duration-200', btnVariant)}
              >
                Vedi Dettagli Completi
              </button>
            </motion.div>
          );})}
        </div>
      </div>

      {/* Tier 2: Esperienza Interattiva */}
      <div className='mb-16'>
        <h3 className='text-3xl font-bold text-center mb-2'>
          TIER 2: Esperienza Interattiva Moderna
        </h3>
        <p className='text-color-tertiary text-center mb-8'>
          €1.800 - €3.200 • Target: Nuovi Imprenditori + Specialisti Advanced
        </p>

        <div className='grid md:grid-cols-3 gap-8'>
          {pricingTiers.slice(3, 6).map((tier, index) => {
            const btnVariant = tier.popular
              ? 'bg-gradient-to-r from-brand-tertiary to-brand-accent text-white hover:from-brand-tertiary hover:to-brand-accent'
              : 'bg-color-muted text-color-primary hover:bg-color-muted';
            return (
            <motion.div
              key={tier.id}
              className={cn(
                'relative bg-white rounded-2xl shadow-lg border-2 p-8 hover:shadow-2xl transition-all duration-300',
                tier.popular ? 'border-brand-tertiary/90 scale-105' : 'border-color-default',
                'cursor-pointer'
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => handleTierSelect(tier.id)}
            >
              {tier.popular && (
                <div className='absolute -top-4 left-1/2 transform -translate-x-1/2'>
                  <span className='bg-gradient-to-r from-brand-tertiary to-brand-accent text-white px-4 py-2 rounded-full text-sm font-bold'>
                    CONSIGLIATO
                  </span>
                </div>
              )}

              <div className='text-center mb-6'>
                <div className='w-12 h-12 bg-brand-tertiary/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                  {getTierIcon(tier)}
                </div>
                <h4 className='text-xl font-bold text-color-primary mb-2'>{tier.name}</h4>
                <div className='text-3xl font-bold text-brand-tertiary mb-2'>
                  €{tier.price.toLocaleString('it-IT')}
                </div>
                <p className='text-color-tertiary'>{tier.timeline}</p>
              </div>

              <div className='space-y-3 mb-6'>
                <div className='flex items-center text-sm'>
                  <Check className='w-4 h-4 text-color-state-success mr-2' />
                  <span>{tier.pages} pagine incluse</span>
                </div>
                {tier.features.slice(0, 3).map((feature) => (
                  <div key={feature} className='flex items-center text-sm'>
                    <Check className='w-4 h-4 text-color-state-success mr-2' />
                    <span>{feature}</span>
                  </div>
                ))}
                {tier.features.length > 3 && (
                  <div className='text-sm text-brand-tertiary font-medium'>
                    +{tier.features.length - 3} altre funzionalità
                  </div>
                )}
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleTierSelect(tier.id);
                }}
                className={cn('w-full py-3 px-6 rounded-lg font-medium transition-all duration-200', btnVariant)}
              >
                Vedi Dettagli Completi
              </button>
            </motion.div>
          );})}
        </div>
      </div>

      {/* Tier 3: E-commerce */}
      <div className='mb-16'>
        <h3 className='text-3xl font-bold text-center mb-2'>TIER 3: E-commerce & Vendita Online</h3>
        <p className='text-color-tertiary text-center mb-8'>
          €3.500 - €6.500 • Target: Ristoranti Upscale + Catene + Enterprise
        </p>

        <div className='grid md:grid-cols-3 gap-8'>
          {pricingTiers.slice(6, 9).map((tier, index) => {
            const cardBorder = tier.enterprise
              ? 'border-color-state-warning scale-105'
              : tier.popular
                ? 'border-color-state-success scale-105'
                : 'border-color-default';
            const ctaVariant = tier.enterprise
              ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600'
              : tier.popular
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700'
                : 'bg-color-muted text-color-primary hover:bg-color-muted';
            return (
            <motion.div
              key={tier.id}
              className={cn(
                'relative bg-white rounded-2xl shadow-lg border-2 p-8 hover:shadow-2xl transition-all duration-300',
                cardBorder,
                'cursor-pointer'
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => handleTierSelect(tier.id)}
            >
              {tier.enterprise && (
                <div className='absolute -top-4 left-1/2 transform -translate-x-1/2'>
                  <span className='bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold'>
                    ENTERPRISE
                  </span>
                </div>
              )}
              {tier.popular && !tier.enterprise && (
                <div className='absolute -top-4 left-1/2 transform -translate-x-1/2'>
                  <span className='bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-bold'>
                    PREMIUM
                  </span>
                </div>
              )}

              <div className='text-center mb-6'>
                <div
                  className={cn(
                    'w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4',
                    tier.enterprise ? 'bg-color-state-warning-subtle' : 'bg-color-state-success-subtle'
                  )}
                >
                  {getTierIcon(tier)}
                </div>
                <h4 className='text-xl font-bold text-color-primary mb-2'>{tier.name}</h4>
                <div
                  className={cn(
                    'text-3xl font-bold mb-2',
                    tier.enterprise ? 'text-color-state-warning-strong' : 'text-color-state-success-strong'
                  )}
                >
                  €{tier.price.toLocaleString('it-IT')}
                </div>
                <p className='text-color-tertiary'>{tier.timeline}</p>
              </div>

              <div className='space-y-3 mb-6'>
                <div className='flex items-center text-sm'>
                  <Check className='w-4 h-4 text-color-state-success mr-2' />
                  <span>{tier.pages} pagine incluse</span>
                </div>
                {tier.features.slice(0, 3).map((feature) => (
                  <div key={feature} className='flex items-center text-sm'>
                    <Check className='w-4 h-4 text-color-state-success mr-2' />
                    <span>{feature}</span>
                  </div>
                ))}
                {tier.features.length > 3 && (
                  <div
                    className={cn(
                      'text-sm font-medium',
                      tier.enterprise ? 'text-color-state-warning-strong' : 'text-color-state-success-strong'
                    )}
                  >
                    +{tier.features.length - 3} altre funzionalità
                  </div>
                )}
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleTierSelect(tier.id);
                }}
                className={cn('w-full py-3 px-6 rounded-lg font-medium transition-all duration-200', ctaVariant)}
              >
                Vedi Dettagli Completi
              </button>
            </motion.div>
          );})}
        </div>
      </div>

      {/* Modal for Tier Details */}
      {showModal && selectedTierData && (
        <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className='bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden'
          >
            <div className='relative p-6 bg-gradient-to-r from-brand-secondary via-brand-tertiary to-brand-accent'>
              <button
                onClick={() => setShowModal(false)}
                className='absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30'
              >
                <X className='w-5 h-5' />
              </button>

              <div className='text-white'>
                <h3 className='text-3xl font-bold mb-2'>{selectedTierData.name}</h3>
                <div className='text-4xl font-bold mb-2'>
                  €{selectedTierData.price.toLocaleString('it-IT')}
                </div>
                <p className='text-white/90'>
                  {selectedTierData.timeline} • {selectedTierData.pages} pagine
                </p>
              </div>
            </div>

            <div className='p-6 overflow-y-auto max-h-[calc(90vh-200px)]'>
              <div className='grid md:grid-cols-2 gap-8'>
                <div>
                  <h4 className='text-xl font-bold mb-4'>Funzionalità Incluse</h4>
                  <div className='space-y-3'>
                    {selectedTierData.features.map((feature) => (
                      <div key={feature} className='flex items-start gap-3'>
                        <Check className='w-5 h-5 text-color-state-success mt-0.5' />
                        <span className='text-color-secondary'>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className='text-xl font-bold mb-4'>Setup & Supporto</h4>
                  <div className='space-y-3 mb-6'>
                    {selectedTierData.setupIncluded.map((item) => (
                      <div key={item} className='flex items-start gap-3'>
                        <Check className='w-5 h-5 text-color-state-info mt-0.5' />
                        <span className='text-color-secondary'>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className='bg-color-subtle rounded-lg p-4'>
                    <h5 className='font-semibold mb-2'>Target Persona</h5>
                    <div className='flex flex-wrap gap-2'>
            {selectedTierData.targetPersona.map((persona) => (
                        <span
              key={persona}
                          className='bg-brand-secondary/20 text-brand-secondary px-3 py-1 rounded-full text-sm'
                        >
                          {persona}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='p-6 bg-color-subtle border-t flex items-center justify-between'>
              <div className='text-sm text-color-tertiary'>Supporto: {selectedTierData.support}</div>
              <button className='bg-gradient-to-r from-brand-secondary to-brand-tertiary text-white px-8 py-3 rounded-lg font-medium hover:from-brand-secondary hover:to-brand-tertiary transition-all duration-200 flex items-center gap-2'>
                Richiedi Preventivo
                <ArrowRight className='w-4 h-4' />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
