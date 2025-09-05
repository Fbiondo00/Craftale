import { BuyerPersona, ServiceTier, OptionalService } from '@/types/pricing';

// Buyer Personas - Based on TIER.txt Analysis
export const buyerPersonas: BuyerPersona[] = [
  {
    id: 'trattoria-familiare',
    name: 'Trattorie Familiari Tradizionali',
    icon: '🏠',
    description: 'Ristoranti a conduzione familiare con tradizione multigenerazionale',
    characteristics: [
      'Gestione familiare tradizionale',
      'Focus su ricette autentiche',
      'Cliente locale fedele',
      'Risorse limitate per il digitale'
    ],
    budget: { min: 500, max: 1500 },
    digitalMaturity: 'low',
    painPoints: [
      'Scarsa visibilità online',
      'Difficoltà con la tecnologia',
      'Budget limitato per marketing',
      'Competizione con catene moderne'
    ],
    motivations: [
      'Preservare le tradizioni',
      'Aumentare clientela locale',
      'Semplicità di gestione',
      'Costi contenuti'
    ],
    recommendedTier: 'essenziale',
    recommendedPackage: 'base'
  },
  {
    id: 'nuovo-imprenditore',
    name: 'Nuovi Imprenditori',
    icon: '🚀',
    description: 'Giovani imprenditori che aprono nuovi ristoranti innovativi',
    characteristics: [
      'Età 25-40 anni',
      'Formazione moderna',
      'Orientamento digitale',
      'Ambizioni di crescita'
    ],
    budget: { min: 1000, max: 3500 },
    digitalMaturity: 'high',
    painPoints: [
      'Costruire brand recognition',
      'Attrarre nuova clientela',
      'Competere nel mercato saturo',
      'Gestire costi di startup'
    ],
    motivations: [
      'Crescita rapida',
      'Innovazione digitale',
      'Brand differenziante',
      'ROI misurabile'
    ],
    recommendedTier: 'interattiva',
    recommendedPackage: 'standard'
  },
  {
    id: 'upscale-affermato',
    name: 'Ristoranti Upscale',
    icon: '⭐',
    description: 'Ristoranti di alto livello con clientela esigente',
    characteristics: [
      'Posizionamento premium',
      'Clientela esigente',
      'Focus sulla qualità',
      'Budget per investimenti'
    ],
    budget: { min: 2500, max: 6000 },
    digitalMaturity: 'medium',
    painPoints: [
      'Mantenere standard di qualità online',
      'Gestire prenotazioni complesse',
      'Comunicare valore premium',
      'Competere con luxury brands'
    ],
    motivations: [
      'Eccellenza digitale',
      'Esperienze premium',
      'Reputation management',
      'Efficienza operativa'
    ],
    recommendedTier: 'ecommerce',
    recommendedPackage: 'premium'
  },
  {
    id: 'catena-franchising',
    name: 'Catene/Franchising',
    icon: '🏢',
    description: 'Catene di ristoranti con multiple location',
    characteristics: [
      'Operazioni standardizzate',
      'Multiple location',
      'Focus su efficienza',
      'Budget centralizzato'
    ],
    budget: { min: 3000, max: 8000 },
    digitalMaturity: 'high',
    painPoints: [
      'Gestire multiple location',
      'Standardizzare processi',
      'Scalare operazioni',
      'Controllo centralizzato'
    ],
    motivations: [
      'Efficienza operativa',
      'Scalabilità sistema',
      'Controllo centralizzato',
      'Ottimizzazione costi'
    ],
    recommendedTier: 'ecommerce',
    recommendedPackage: 'premium'
  },
  {
    id: 'specialista-regionale',
    name: 'Specialisti Regionali',
    icon: '🍝',
    description: 'Ristoranti specializzati in cucine regionali specifiche',
    characteristics: [
      'Specializzazione culinaria',
      'Storia e tradizione',
      'Clientela di nicchia',
      'Storytelling forte'
    ],
    budget: { min: 800, max: 2500 },
    digitalMaturity: 'medium',
    painPoints: [
      'Comunicare unicità',
      'Educare il mercato',
      'Attrarre turisti',
      'Stagionalità'
    ],
    motivations: [
      'Valorizzare tradizione',
      'Storytelling efficace',
      'Crescita sostenibile',
      'Autenticità'
    ],
    recommendedTier: 'interattiva',
    recommendedPackage: 'standard'
  }
];

// Service Tiers - Based on TIER.txt Analysis
export const serviceTiers: ServiceTier[] = [
  {
    id: 'essenziale',
    name: 'Presenza Digitale',
    tagline: 'Il tuo ristorante online',
    description: 'Sito web professionale per essere trovati dai clienti locali',
    targetPersonas: ['trattoria-familiare', 'specialista-regionale'],
    idealFor: 'Ristoranti tradizionali che vogliono una presenza online professionale',
    timeline: '2-3 settimane',
    packages: [
      {
        id: 'essenziale-base',
        name: 'Base',
        level: 'base',
        price: 850,
        description: 'Sito web essenziale per iniziare',
        pages: 4,
        coreFeatures: [
          'Design responsive mobile-first',
          'SEO locale ottimizzato',
          'Google Business integrato',
          'Galleria foto base',
          'Mappa e contatti'
        ],
        timeline: '2 settimane',
        revisions: 2,
        support: '30 giorni'
      },
      {
        id: 'essenziale-standard',
        name: 'Standard',
        level: 'standard',
        price: 1200,
        description: 'Presenza online completa',
        pages: 6,
        coreFeatures: [
          'Tutto il Base +',
          'Menu PDF scaricabile',
          'Recensioni Google integrate',
          'Modulo contatti avanzato',
          'Social media integration'
        ],
        timeline: '2-3 settimane',
        revisions: 3,
        support: '60 giorni',
        popular: true
      },
      {
        id: 'essenziale-premium',
        name: 'Premium',
        level: 'premium',
        price: 1650,
        description: 'Presenza digitale professionale',
        pages: 8,
        coreFeatures: [
          'Tutto lo Standard +',
          'Blog per eventi/novità',
          'Newsletter integration',
          'Analytics avanzato',
          'Hosting premium 1 anno'
        ],
        timeline: '3 settimane',
        revisions: 4,
        support: '90 giorni'
      }
    ],
    features: [
      { id: 'responsive-design', name: 'Design Responsive', description: 'Ottimizzato per tutti i dispositivi', included: true, highlight: true },
      { id: 'seo-locale', name: 'SEO Locale', description: 'Ottimizzazione per ricerche locali', included: true },
      { id: 'google-business', name: 'Google Business', description: 'Integrazione completa', included: true },
      { id: 'prenotazioni-online', name: 'Prenotazioni Online', description: 'Sistema di booking', included: false },
      { id: 'ecommerce', name: 'E-commerce', description: 'Vendita online', included: false },
      { id: 'menu-digitale', name: 'Menu Digitale', description: 'QR code e menu interattivo', included: false }
    ]
  },
  {
    id: 'interattiva',
    name: 'Esperienza Interattiva',
    tagline: 'Coinvolgi e converte',
    description: 'Sito web con prenotazioni online e automazione marketing',
    targetPersonas: ['nuovo-imprenditore', 'specialista-regionale'],
    idealFor: 'Ristoranti che vogliono automatizzare prenotazioni e marketing',
    timeline: '3-4 settimane',
    packages: [
      {
        id: 'interattiva-base',
        name: 'Base',
        level: 'base',
        price: 1800,
        description: 'Prenotazioni online e automazione base',
        pages: 6,
        coreFeatures: [
          'Tutto Essenziale Standard +',
          'Sistema prenotazioni base',
          'Conferme automatiche email',
          'Calendario disponibilità',
          'Widget prenotazione'
        ],
        timeline: '3 settimane',
        revisions: 3,
        support: '60 giorni'
      },
      {
        id: 'interattiva-standard',
        name: 'Standard',
        level: 'standard',
        price: 2500,
        description: 'Automazione completa e marketing',
        pages: 8,
        coreFeatures: [
          'Tutto il Base +',
          'Email marketing automation',
          'Gestione liste d\'attesa',
          'Promemoria automatici SMS',
          'Dashboard gestionale',
          'Integrazione POS base'
        ],
        timeline: '3-4 settimane',
        revisions: 4,
        support: '90 giorni',
        popular: true,
        recommended: true
      },
      {
        id: 'interattiva-premium',
        name: 'Premium',
        level: 'premium',
        price: 3200,
        description: 'Sistema completo con analytics',
        pages: 10,
        coreFeatures: [
          'Tutto lo Standard +',
          'CRM clienti integrato',
          'Analytics prenotazioni avanzato',
          'Loyalty program base',
          'App mobile preview',
          'Integrazione delivery'
        ],
        timeline: '4 settimane',
        revisions: 5,
        support: '120 giorni'
      }
    ],
    features: [
      { id: 'responsive-design', name: 'Design Responsive', description: 'Ottimizzato per tutti i dispositivi', included: true },
      { id: 'seo-locale', name: 'SEO Locale', description: 'Ottimizzazione per ricerche locali', included: true },
      { id: 'google-business', name: 'Google Business', description: 'Integrazione completa', included: true },
      { id: 'prenotazioni-online', name: 'Prenotazioni Online', description: 'Sistema di booking completo', included: true, highlight: true },
      { id: 'email-automation', name: 'Email Automation', description: 'Marketing automatizzato', included: true, highlight: true },
      { id: 'ecommerce', name: 'E-commerce', description: 'Vendita online', included: false },
      { id: 'menu-digitale', name: 'Menu Digitale', description: 'QR code e menu interattivo', included: true }
    ]
  },
  {
    id: 'ecommerce',
    name: 'E-commerce Completo',
    tagline: 'Vendi ovunque, sempre',
    description: 'Piattaforma completa con vendita online, delivery e gestione omnicanale',
    targetPersonas: ['upscale-affermato', 'catena-franchising', 'nuovo-imprenditore'],
    idealFor: 'Ristoranti che vogliono vendere online e gestire delivery',
    timeline: '4-6 settimane',
    packages: [
      {
        id: 'ecommerce-base',
        name: 'Base',
        level: 'base',
        price: 3500,
        description: 'E-commerce base con delivery',
        pages: 8,
        coreFeatures: [
          'Tutto Interattiva Standard +',
          'Shop online base',
          'Gestione ordini delivery',
          'Pagamenti online',
          'Tracking ordini base',
          'Integrazione delivery partners'
        ],
        timeline: '4 settimane',
        revisions: 4,
        support: '90 giorni'
      },
      {
        id: 'ecommerce-standard',
        name: 'Standard',
        level: 'standard',
        price: 4800,
        description: 'Piattaforma e-commerce completa',
        pages: 12,
        coreFeatures: [
          'Tutto il Base +',
          'Multi-location management',
          'Inventory management',
          'Advanced analytics',
          'Customer segmentation',
          'Subscription management',
          'Advanced POS integration'
        ],
        timeline: '5 settimane',
        revisions: 5,
        support: '120 giorni',
        popular: true
      },
      {
        id: 'ecommerce-premium',
        name: 'Premium',
        level: 'premium',
        price: 6500,
        description: 'Soluzione enterprise completa',
        pages: 15,
        coreFeatures: [
          'Tutto lo Standard +',
          'AI-powered recommendations',
          'Advanced loyalty program',
          'White-label mobile app',
          'API integrations custom',
          'Multi-language support',
          'Enterprise-level security'
        ],
        timeline: '6 settimane',
        revisions: 6,
        support: '180 giorni',
        recommended: true
      }
    ],
    features: [
      { id: 'responsive-design', name: 'Design Responsive', description: 'Ottimizzato per tutti i dispositivi', included: true },
      { id: 'seo-locale', name: 'SEO Locale', description: 'Ottimizzazione per ricerche locali', included: true },
      { id: 'google-business', name: 'Google Business', description: 'Integrazione completa', included: true },
      { id: 'prenotazioni-online', name: 'Prenotazioni Online', description: 'Sistema di booking completo', included: true },
      { id: 'email-automation', name: 'Email Automation', description: 'Marketing automatizzato', included: true },
      { id: 'ecommerce', name: 'E-commerce', description: 'Vendita online completa', included: true, highlight: true },
      { id: 'delivery-management', name: 'Delivery Management', description: 'Gestione ordini e consegne', included: true, highlight: true },
      { id: 'pos-integration', name: 'POS Integration', description: 'Integrazione sistemi di cassa', included: true, highlight: true },
      { id: 'menu-digitale', name: 'Menu Digitale', description: 'QR code e menu interattivo', included: true }
    ]
  }
];

// Optional Services - Based on TIER.txt Analysis
export const optionalServices: OptionalService[] = [
  // Photography
  {
    id: 'food-photography-basic',
    category: 'photography',
    name: 'Food Photography Base',
    description: '20 foto professionali dei piatti principali',
    price: 350,
    tierRecommendations: ['essenziale', 'interattiva', 'ecommerce']
  },
  {
    id: 'food-photography-premium',
    category: 'photography',
    name: 'Food Photography Premium',
    description: '50 foto + video promozionale + foto ambiente',
    price: 550,
    popular: true,
    tierRecommendations: ['interattiva', 'ecommerce']
  },
  
  // Copywriting
  {
    id: 'copywriting-basic',
    category: 'copywriting',
    name: 'Copywriting Base',
    description: 'Testi per sito web (fino a 1000 parole)',
    price: 120,
    tierRecommendations: ['essenziale', 'interattiva', 'ecommerce']
  },
  {
    id: 'copywriting-premium',
    category: 'copywriting',
    name: 'Copywriting + SEO',
    description: 'Testi ottimizzati SEO + descrizioni menu + social',
    price: 300,
    tierRecommendations: ['interattiva', 'ecommerce']
  },
  
  // Technical Integrations
  {
    id: 'pos-integration',
    category: 'technical',
    name: 'Integrazione POS',
    description: 'Collegamento con sistemi di cassa esistenti',
    price: 400,
    tierRecommendations: ['interattiva', 'ecommerce']
  },
  {
    id: 'delivery-platforms',
    category: 'integration',
    name: 'Integrazione Delivery',
    description: 'Just Eat, Deliveroo, Uber Eats (setup + sync)',
    price: 250,
    popular: true,
    tierRecommendations: ['ecommerce']
  },
  {
    id: 'social-automation',
    category: 'marketing',
    name: 'Social Media Automation',
    description: 'Auto-post su Facebook e Instagram + scheduling',
    price: 200,
    unit: 'monthly',
    tierRecommendations: ['interattiva', 'ecommerce']
  },
  
  // Premium Services
  {
    id: 'qr-menu-system',
    category: 'premium',
    name: 'Menu Digitale QR',
    description: 'Menu interattivo QR code + aggiornamenti real-time',
    price: 150,
    popular: true,
    tierRecommendations: ['interattiva', 'ecommerce']
  },
  {
    id: 'review-management',
    category: 'marketing',
    name: 'Gestione Recensioni',
    description: 'Monitoraggio + risposta automatica recensioni',
    price: 80,
    unit: 'monthly',
    tierRecommendations: ['essenziale', 'interattiva', 'ecommerce']
  },
  {
    id: 'advanced-analytics',
    category: 'premium',
    name: 'Analytics Avanzato',
    description: 'Dashboard personalizzato + report mensili',
    price: 120,
    unit: 'monthly',
    tierRecommendations: ['ecommerce']
  },
  {
    id: 'loyalty-program',
    category: 'premium',
    name: 'Programma Fedeltà',
    description: 'Sistema punti + coupon automatici + app mobile',
    price: 800,
    tierRecommendations: ['ecommerce']
  },
  {
    id: 'multilingual',
    category: 'premium',
    name: 'Sito Multilingua',
    description: 'Traduzione in inglese + gestione contenuti',
    price: 600,
    tierRecommendations: ['upscale-affermato', 'catena-franchising']
  }
];

// Recommendation Logic
export const getPersonaRecommendation = (formData: any) => {
  // Simplified recommendation logic based on form responses
  const { businessType, budget, digitalComfort, primaryGoals } = formData;
  
  // Find matching persona
  const persona = buyerPersonas.find(p => p.id === businessType) || buyerPersonas[0];
  const tier = serviceTiers.find(t => t.id === persona.recommendedTier) || serviceTiers[0];
  const packageName = persona.recommendedPackage || 'standard';
  const recommendedPackage = tier.packages.find(p => p.level === packageName) || tier.packages[0];
  
  // Calculate recommended optionals based on persona and goals
  const recommendedOptionals = optionalServices.filter(service => {
    if (service.tierRecommendations.includes(tier.id)) {
      if (primaryGoals?.includes('food-presentation') && service.category === 'photography') return true;
      if (primaryGoals?.includes('online-orders') && service.category === 'integration') return true;
      if (primaryGoals?.includes('social-presence') && service.category === 'marketing') return true;
      if (service.popular && digitalComfort === 'high') return true;
    }
    return false;
  }).slice(0, 3); // Limit to top 3 recommendations
  
  const optionalsCost = recommendedOptionals.reduce((sum, opt) => sum + opt.price, 0);
  
  return {
    matchedPersona: persona,
    recommendedTier: tier,
    recommendedPackage,
    optionalServices: recommendedOptionals,
    totalEstimate: {
      base: recommendedPackage.price,
      withRecommendedOptions: recommendedPackage.price + optionalsCost,
      monthly: recommendedOptionals.filter(o => o.unit === 'monthly').reduce((sum, opt) => sum + opt.price, 0) || undefined
    },
    confidence: 85,
    reasoning: [
      `Perfetto per ${persona.description.toLowerCase()}`,
      `Budget allineato: €${persona.budget.min}-${persona.budget.max}`,
      `Livello digitale: ${persona.digitalMaturity}`,
      `Timeline: ${tier.timeline}`
    ],
    alternatives: serviceTiers
      .filter(t => t.id !== tier.id)
      .slice(0, 2)
      .map(altTier => ({
        tier: altTier,
        package: altTier.packages[0],
        reason: altTier.packages[0].price < recommendedPackage.price ? 'Opzione più economica' : 'Maggiori funzionalità'
      }))
  };
}; 