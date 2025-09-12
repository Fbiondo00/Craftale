export type TierType = "starter" | "pro" | "ecommerce";
export type LevelType = "base" | "standard" | "premium";

export interface TierFeatureValue {
  value: boolean | string | number;
  shortDescription?: string;
  longDescription?: string;
}

export interface FeatureData {
  name: string;
  longDescription?: string;
  base: boolean | string | number | TierFeatureValue;
  standard: boolean | string | number | TierFeatureValue;
  premium: boolean | string | number | TierFeatureValue;
}

export interface CategoryData {
  category: string;
  features: FeatureData[];
}

export interface OptionalService {
  id: string;
  name: string;
  description: string;
  category: "photography" | "content" | "integrations" | "marketing";
  price: number;
  recurring?: boolean;
  compatibleTiers: TierType[];
  features: string[];
  defaultSelected?: boolean;
}

export interface OptionalServiceCategory {
  id: string;
  name: string;
  icon: string; // Icon name for Lucide React
  gradient: string;
  defaultExpanded: boolean;
  order: number;
}

export interface LevelData {
  level: LevelType;
  price: number;
  name: string;
  description: string;
  features: {
    pages: string[];
    technicalFeatures: string[];
    support: string[];
    integrations: string[];
    marketing: string[];
  };
  revisions: number;
  training?: {
    sessions: number;
    duration: string;
  };
  support?: {
    duration: string;
    type: string;
  };
  realizationTime: string;
}

export interface TierData {
  tier: TierType;
  name: string;
  description: string;
  targetPersona: string[];
  levels: Record<LevelType, LevelData>;
}

// TIER 1: STARTER - Presenza Digitale Essenziale
const starterTierData: TierData = {
  tier: "starter",
  name: "Starter",
  description: "Presenza digitale essenziale per ristoranti tradizionali e specialisti regionali",
  targetPersona: ["Trattorie Familiari Tradizionali", "Specialisti Regionali (Livello Base)"],
  levels: {
    base: {
      level: "base",
      price: 850,
      name: "Base",
      description: "Configurazione minima per presenza online",
      features: {
        pages: [
          "Home - Presentazione ristorante con foto ambiente e location",
          "Menu - Lista piatti principali con prezzi (formato PDF integrato)",
          "Chi Siamo - Storia famiglia/ristorante, tradizione, chef",
          "Contatti - Indirizzo, telefono, orari, mappa Google",
        ],
        technicalFeatures: [
          "Design responsive mobile-friendly",
          "Mappa Google integrata con indicazioni",
          "Modulo contatti base con auto-risposta",
          "Gallery fotografica base (fino a 15 foto fornite dal cliente)",
          "SEO di base (meta tags, structured data ristorante)",
          "SSL certificate per sicurezza incluso",
        ],
        support: [],
        integrations: [],
        marketing: [],
      },
      revisions: 2,
      realizationTime: "2-3 settimane",
    },
    standard: {
      level: "standard",
      price: 1250,
      name: "Standard",
      description: "Presenza completa con funzionalità essenziali",
      features: {
        pages: [
          "Home - Hero section con value proposition, foto ambientazione",
          "Menu Completo - Menù per categorie con descrizioni appetitose",
          "Chi Siamo - Storia approfondita, tradizione familiare, chef biography",
          "Storia & Tradizione - Heritage del ristorante, ricette di famiglia",
          "Specialità Regionali - Focus su piatti tipici e ingredienti locali",
          "Contatti & Info - Orari dettagliati, parcheggio, accessibilità",
        ],
        technicalFeatures: [
          "Menu PDF scaricabile professionale",
          "Orari stagionali e informazioni pratiche strutturate",
          "Form contatti avanzato con selezione tipo richiesta",
          "Gallery espansa (fino a 25 foto) con categorie",
          'SEO ottimizzato per ricerche locali ("ristorante [città]")',
          "Recensioni Google integrate automaticamente",
        ],
        support: [],
        integrations: [
          "Integrazione social media basica (feed Instagram automatico)",
          "Google My Business setup e ottimizzazione completa",
        ],
        marketing: [],
      },
      revisions: 3,
      training: {
        sessions: 1,
        duration: "2 ore",
      },
      realizationTime: "3-4 settimane",
    },
    premium: {
      level: "premium",
      price: 1650,
      name: "Premium",
      description: "Presenza digitale professionale con elementi distintivi",
      features: {
        pages: [
          "Home - Landing page ottimizzata per conversioni",
          "Menu Interattivo - Descrizioni dettagliate, ingredienti, allergeni",
          "Chi Siamo - Story telling professionale del brand",
          "Storia & Tradizione - Heritage approfondito con timeline",
          "Specialità & Territorio - Connessione con produttori locali",
          "Eventi & Sagre - Calendario eventi, cene a tema, sagre locali",
          "Gallery & Atmosfera - Foto professionali ambiente e piatti",
          "Blog/News - Sezione news per comunicazioni e ricette",
        ],
        technicalFeatures: [
          "Menu interattivo con descrizioni gourmet",
          "QR code menu personalizzato per tavoli",
          "Modulo prenotazioni semplice (senza integrazione esterna)",
          "Video presentazione ristorante (montaggio materiale fornito)",
          "Google Analytics setup e training interpretazione base",
          "Ottimizzazione velocità e Core Web Vitals",
        ],
        support: ["3 mesi supporto post-lancio incluso"],
        integrations: [
          "Recensioni Google e TripAdvisor integrate automaticamente",
          "Newsletter signup con welcome automation",
        ],
        marketing: [],
      },
      revisions: 4,
      training: {
        sessions: 2,
        duration: "2 ore ciascuna",
      },
      support: {
        duration: "3 mesi",
        type: "post-lancio",
      },
      realizationTime: "4-5 settimane",
    },
  },
};

// TIER 2: PRO - Esperienza Interattiva Moderna
const proTierData: TierData = {
  tier: "pro",
  name: "Pro",
  description: "Esperienza interattiva moderna per nuovi imprenditori e specialisti regionali avanzati",
  targetPersona: ["Nuovi Imprenditori", "Specialisti Regionali (Livello Avanzato)"],
  levels: {
    base: {
      level: "base",
      price: 1800,
      name: "Base",
      description: "Prenotazioni online e interazione cliente",
      features: {
        pages: [
          "Home - Landing page con CTA per prenotazioni immediate",
          "Menu Digitale - Interattivo con filtri allergie e preferenze",
          "Prenotazioni - Sistema booking integrato con calendario",
          "Chi Siamo - Brand story orientato al target demografico",
          "Eventi & Catering - Servizi aggiuntivi e private dining",
          "Gallery - Portfolio visuale categorizzato (ambiente, piatti, eventi)",
        ],
        technicalFeatures: [
          "Menu digitale interattivo con filtri allergie",
          "Gallery professionale con categorie tematiche",
          "Form contatti multi-purpose (catering, eventi privati, partnership)",
          "SEO avanzato per ricerche competitive urbane",
          "Mobile optimization superiore (PWA-ready)",
          "Live chat integration base",
        ],
        support: [],
        integrations: [
          "Integrazione TheFork oppure sistema proprietario",
          "Calendario disponibilità real-time",
          "Conferme automatiche via email/SMS",
          "Gestione liste d'attesa",
          "Dashboard gestionale per staff",
          "Integrazione social media automatica (post scheduling)",
        ],
        marketing: ["Google Analytics e tracking conversioni avanzato"],
      },
      revisions: 3,
      realizationTime: "4-5 settimane",
    },
    standard: {
      level: "standard",
      price: 2400,
      name: "Standard",
      description: "Gestione completa dell'esperienza digitale",
      features: {
        pages: [
          "Home - Conversion-optimized con A/B testing capabilities",
          "Menu Dinamico - Disponibilità real-time, suggerimenti automatici",
          "Prenotazioni Avanzate - Multi-slot, eventi speciali, depositi",
          "Delivery & Takeaway - Sistema ordini integrato",
          "Chi Siamo - Team presentation, chef's philosophy",
          "Eventi & Private Dining - Booking eventi con configurator",
          "Blog & News - Content marketing platform",
          "Reviews & Community - Hub recensioni e user-generated content",
        ],
        technicalFeatures: [
          "Sistema prenotazioni avanzato con conferme automatiche",
          "Menu dinamico con disponibilità real-time prodotti",
          "Blog professionale per content marketing",
          "Chat WhatsApp integrata con bot risposte automatiche",
          "Customer review management system interno",
          "Analytics dashboard personalizzata",
        ],
        support: [],
        integrations: [
          "Setup Just Eat, Glovo, Deliveroo (scelta 2 piattaforme)",
          "Menu delivery ottimizzato separato",
          "Gestione ordini unificata",
          "Tracking automatico delivery status",
          "Google My Business ottimizzazione completa con posts automatici",
        ],
        marketing: ["Email marketing automation (welcome series, birthday offers)"],
      },
      revisions: 4,
      training: {
        sessions: 3,
        duration: "3 ore ciascuna",
      },
      realizationTime: "6-7 settimane",
    },
    premium: {
      level: "premium",
      price: 3200,
      name: "Premium",
      description: "Ecosistema digitale completo",
      features: {
        pages: [
          "Home - Multi-variant testing, personalizzazione utente",
          "Menu Intelligence - AI-suggested pairings, nutritional info",
          "Smart Booking - Multi-location, preferenze cliente memorizzate",
          "Delivery Hub - Multi-platform integration completa",
          "Customer Portal - Account clienti, storico, preferenze",
          "Events & Catering - Configuratore eventi, preventivi automatici",
          "Loyalty Program - Sistema punti avanzato cross-channel",
          "Content Hub - Blog, ricette, video, podcast integration",
          "Partnership - Collaborazioni locali, wine pairing, etc.",
          "Analytics Dashboard - Business intelligence per management",
        ],
        technicalFeatures: [
          "Customer portal personalizzato con storico e preferenze",
          "AI chatbot per FAQ e prenotazioni base",
          "Analytics dashboard personalizzata con business intelligence",
          "Mobile app web-based (PWA) con notifiche push",
          "Integration API per software gestionali esistenti",
        ],
        support: ["6 mesi supporto dedicato post-lancio"],
        integrations: [
          "Integrazione POS per disponibilità real-time completa",
          "Sistema prenotazioni multi-location centralizzato",
          "Delivery integration completa (3+ piattaforme) con unified dashboard",
          "Programma fedeltà digitale avanzato con tiers",
          "Event booking e gestione eventi complessa",
        ],
        marketing: [
          "Social media management base incluso (2 post/settimana)",
          "Email marketing avanzato con segmentazione comportamentale",
        ],
      },
      revisions: 5,
      training: {
        sessions: 4,
        duration: "3 ore ciascuna",
      },
      support: {
        duration: "6 mesi",
        type: "dedicato post-lancio",
      },
      realizationTime: "8-10 settimane",
    },
  },
};

// TIER 3: ECOMMERCE - E-commerce e Vendita Online
const ecommerceTierData: TierData = {
  tier: "ecommerce",
  name: "Ecommerce",
  description: "E-commerce e vendita online per ristoranti upscale, catene e imprenditori avanzati",
  targetPersona: ["Ristoranti Upscale Affermati", "Catene/Franchising", "Imprenditori Avanzati"],
  levels: {
    base: {
      level: "base",
      price: 3500,
      name: "Base",
      description: "Vendita online e delivery avanzato",
      features: {
        pages: [
          "E-commerce Foundation - Store completo per prodotti ristorante",
          "Sistema Ordini - Ordini online con slot delivery/pickup programmati",
          "Gestione Inventory - Sistema digitale con sync",
          "Customer Account - Account con storico ordini e preferenze",
          "Mobile App - Web-based per shopping experience",
        ],
        technicalFeatures: [
          "E-commerce completo per prodotti ristorante (salse, vini, specialità, merchandising)",
          "Payment gateway integrato multi-opzione (Nexi, PayPal, Satispay, carte)",
          "Menu delivery professionale ottimizzato per conversioni",
          "Fatturazione automatica e gestione fiscale",
          "SEO e-commerce ottimizzato per prodotti alimentari",
          "Gestione coupon e promozioni automatiche",
          "Review system per prodotti",
          "Wishlist e favoriti clienti",
        ],
        support: ["3 mesi supporto intensivo post-lancio"],
        integrations: [
          "Integration con corrieri nazionali (SDA, Bartolini, GLS)",
          "Dashboard ordini centralizzata",
          "Notifiche automatiche status ordini",
          "Gestione resi e rimborsi",
          "Integration base con sistema contabile",
        ],
        marketing: ["Reporting vendite avanzato"],
      },
      revisions: 5,
      training: {
        sessions: 4,
        duration: "3 ore ciascuna",
      },
      support: {
        duration: "3 mesi",
        type: "intensivo post-lancio",
      },
      realizationTime: "8-10 settimane",
    },
    standard: {
      level: "standard",
      price: 4800,
      name: "Standard",
      description: "Piattaforma e-commerce professionale",
      features: {
        pages: [
          "Store Multi-categoria - Food, wine, equipment, merchandising, experiences",
          "Sistema Subscription - Wine club, meal delivery plans",
          "B2B Section - Partnerships e wholesale",
          "Gift Card System - Digitali e voucher system",
          "Affiliate Program - Partnership per influencer e blogger",
        ],
        technicalFeatures: [
          "Inventory management avanzato con sync POS in real-time",
          "Multi-currency per clientela internazionale",
          "Spedizioni internazionali con calcolo automatico",
          "AI recommendation engine per prodotti correlati",
          "Integration CRM professionale con segmentazione avanzata",
          "Business intelligence dashboard con previsioni vendite",
        ],
        support: ["Supporto tecnico prioritario"],
        integrations: [
          "API personalizzate per integrazioni esistenti",
          "Sync completo con sistemi gestionali",
          "Multi-warehouse management",
          "Advanced reporting con export dati",
          "White-label options per partnership",
        ],
        marketing: [
          "Email marketing automation per e-commerce (abandoned cart, cross-sell, upsell)",
          "Programma fedeltà integrato e-commerce + esperienza ristorante",
        ],
      },
      revisions: 6,
      training: {
        sessions: 5,
        duration: "4 ore ciascuna",
      },
      support: {
        duration: "1 anno",
        type: "account manager dedicato",
      },
      realizationTime: "10-12 settimane",
    },
    premium: {
      level: "premium",
      price: 6500,
      name: "Premium",
      description: "Ecosistema omnichannel completo",
      features: {
        pages: [
          "Piattaforma Omnichannel - Ristorante + e-commerce + delivery + events unificati",
          "App Mobile Nativa - iOS/Android con notifiche push avanzate",
          "Customer Journey - Tracking completo attraverso tutti i touchpoint",
          "Business Intelligence - Dashboard con machine learning insights",
          "White-label Platform - Delivery platform proprietaria",
        ],
        technicalFeatures: [
          "AI chatbot avanzato per customer service 24/7",
          "Recommendation engine basato su behavior analysis",
          "Predictive analytics per inventory e staffing",
          "Dynamic pricing per ottimizzazione revenue",
          "Marketing automation omnichannel con customer lifetime value optimization",
          "Gestione multi-location centralizzata con performance comparison",
        ],
        support: ["12 mesi supporto dedicato incluso"],
        integrations: [
          "API ecosystem completo per integrazioni infinite",
          "IoT integration per kitchen automation",
          "Voice ordering integration (Alexa, Google)",
          "Blockchain-based loyalty e supply chain tracking",
        ],
        marketing: ["Sistema loyalty unificato cross-channel con AI personalization"],
      },
      revisions: 7,
      training: {
        sessions: 10,
        duration: "sessioni complete multi-level",
      },
      support: {
        duration: "12 mesi",
        type: "dedicated development team",
      },
      realizationTime: "12-16 settimane",
    },
  },
};

export const tierData: Record<TierType, TierData> = {
  starter: starterTierData,
  pro: proTierData,
  ecommerce: ecommerceTierData,
};

// Comparison table data for each tier-level combination
export const getTierLevelComparisonData = (selectedTier: TierType): CategoryData[] => {
  const tier = tierData[selectedTier];

  return [
    {
      category: "Pagine e Contenuti",
      features: [
        {
          name: "Numero di pagine",
          longDescription: "Pagine web incluse nel sito con contenuti specifici per ristoranti",
          base: tier.levels.base.features.pages.length,
          standard: tier.levels.standard.features.pages.length,
          premium: tier.levels.premium.features.pages.length,
        },
        {
          name: "Design responsive",
          longDescription: "Ottimizzazione automatica per desktop, tablet e smartphone",
          base: {
            value: true,
            shortDescription: "Mobile-friendly",
            longDescription: "Design che si adatta automaticamente a tutti i dispositivi",
          },
          standard: {
            value: true,
            shortDescription: "Mobile-friendly",
            longDescription: "Design che si adatta automaticamente a tutti i dispositivi",
          },
          premium: {
            value: true,
            shortDescription: "Mobile-friendly + PWA",
            longDescription: "Design responsive con funzionalità Progressive Web App",
          },
        },
        {
          name: "Menu digitale",
          longDescription: "Presentazione del menu con diverse funzionalità",
          base: {
            value: "PDF integrato",
            shortDescription: "Menu base in PDF",
            longDescription: "Menu scaricabile in formato PDF integrato nel sito",
          },
          standard: {
            value: "Per categorie",
            shortDescription: "Menu organizzato",
            longDescription: "Menu organizzato per categorie con descrizioni appetitose",
          },
          premium: {
            value: "Interattivo",
            shortDescription: "Menu avanzato",
            longDescription: "Menu interattivo con descrizioni dettagliate, ingredienti e allergeni",
          },
        },
      ],
    },
    {
      category: "Funzionalità Tecniche",
      features: [
        {
          name: "SEO e ottimizzazione",
          longDescription: "Ottimizzazione per i motori di ricerca",
          base: {
            value: "Base",
            shortDescription: "SEO essenziale",
            longDescription: "Meta tags e structured data per ristoranti",
          },
          standard: {
            value: "Locale",
            shortDescription: "SEO locale",
            longDescription: 'Ottimizzazione per ricerche locali tipo "ristorante [città]"',
          },
          premium: {
            value: "Avanzato",
            shortDescription: "SEO competitivo",
            longDescription:
              selectedTier === "pro"
                ? "SEO avanzato per mercati urbani competitivi"
                : "SEO e-commerce per prodotti alimentari",
          },
        },
        {
          name: "Gallery fotografica",
          longDescription: "Sezione per mostrare foto del ristorante e piatti",
          base: {
            value: "15 foto",
            shortDescription: "Gallery base",
            longDescription: "Fino a 15 foto fornite dal cliente",
          },
          standard: {
            value: "25 foto",
            shortDescription: "Gallery espansa",
            longDescription: "Fino a 25 foto con categorie organizzate",
          },
          premium: {
            value: "Categorizzata",
            shortDescription: "Gallery professionale",
            longDescription: "Gallery professionale con categorie tematiche (ambiente, piatti, eventi)",
          },
        },
        {
          name: "Sistema prenotazioni",
          longDescription: "Funzionalità per gestire le prenotazioni online",
          base:
            selectedTier === "starter"
              ? false
              : {
                  value: "Integrato",
                  shortDescription: "Booking online",
                  longDescription: "Sistema di prenotazioni integrato con calendario e conferme automatiche",
                },
          standard:
            selectedTier === "starter"
              ? false
              : {
                  value: "Avanzato",
                  shortDescription: "Booking multi-slot",
                  longDescription: "Prenotazioni multi-slot con eventi speciali e gestione depositi",
                },
          premium:
            selectedTier === "starter"
              ? {
                  value: "Semplice",
                  shortDescription: "Prenotazioni base",
                  longDescription: "Modulo prenotazioni semplice senza integrazioni esterne",
                }
              : {
                  value: "Intelligente",
                  shortDescription: "Smart booking",
                  longDescription:
                    selectedTier === "pro"
                      ? "Smart booking multi-location con preferenze cliente"
                      : "Sistema prenotazioni con AI e personalizzazione",
                },
        },
      ],
    },
    {
      category: "Integrazioni e Servizi",
      features: [
        {
          name: "Google My Business",
          longDescription: "Ottimizzazione della presenza su Google",
          base: false,
          standard: {
            value: true,
            shortDescription: "Setup completo",
            longDescription: "Setup e ottimizzazione completa del profilo Google My Business",
          },
          premium: {
            value: true,
            shortDescription: "Setup + automazione",
            longDescription: "Google My Business con posts automatici e gestione avanzata",
          },
        },
        {
          name: "Integrazione social",
          longDescription: "Connessione con i social media",
          base: false,
          standard: {
            value: "Base",
            shortDescription: "Feed Instagram",
            longDescription: "Integrazione basica con feed Instagram automatico",
          },
          premium: {
            value: "Automatica",
            shortDescription: "Post scheduling",
            longDescription:
              selectedTier === "pro"
                ? "Post scheduling automatico su social media"
                : "Social media management con automazione avanzata",
          },
        },
        {
          name: "Sistema e-commerce",
          longDescription: "Funzionalità di vendita online",
          base:
            selectedTier === "ecommerce"
              ? {
                  value: "Completo",
                  shortDescription: "E-commerce base",
                  longDescription: "E-commerce completo per prodotti ristorante con payment gateway",
                }
              : false,
          standard:
            selectedTier === "ecommerce"
              ? {
                  value: "Multi-categoria",
                  shortDescription: "Store professionale",
                  longDescription: "Store multi-categoria con subscription e B2B",
                }
              : selectedTier === "pro"
                ? {
                    value: "Delivery",
                    shortDescription: "Ordini delivery",
                    longDescription: "Sistema ordini integrato per delivery e takeaway",
                  }
                : false,
          premium:
            selectedTier === "ecommerce"
              ? {
                  value: "Omnichannel",
                  shortDescription: "Ecosistema completo",
                  longDescription: "Piattaforma omnichannel con AI e analytics avanzati",
                }
              : selectedTier === "pro"
                ? {
                    value: "Multi-platform",
                    shortDescription: "Delivery hub",
                    longDescription: "Multi-platform delivery integration con unified dashboard",
                  }
                : false,
        },
      ],
    },
    {
      category: "Supporto e Training",
      features: [
        {
          name: "Revisioni incluse",
          longDescription: "Numero di cicli di revisione compresi nel prezzo",
          base: tier.levels.base.revisions,
          standard: tier.levels.standard.revisions,
          premium: tier.levels.premium.revisions,
        },
        {
          name: "Sessioni di training",
          longDescription: "Formazione per la gestione del sito",
          base: tier.levels.base.training?.sessions || 0,
          standard: tier.levels.standard.training?.sessions || 0,
          premium: tier.levels.premium.training?.sessions || 0,
        },
        {
          name: "Supporto post-lancio",
          longDescription: "Assistenza tecnica dopo il lancio del sito",
          base: tier.levels.base.support?.duration || "Non incluso",
          standard: tier.levels.standard.support?.duration || "Non incluso",
          premium: tier.levels.premium.support?.duration || "Non incluso",
        },
        {
          name: "Tempo realizzazione",
          longDescription: "Tempo stimato per completare il progetto",
          base: tier.levels.base.realizationTime,
          standard: tier.levels.standard.realizationTime,
          premium: tier.levels.premium.realizationTime,
        },
      ],
    },
  ];
};

// Optional Service Categories Configuration
export const optionalServiceCategoriesData: OptionalServiceCategory[] = [
  {
    id: "photography",
    name: "Fotografia Professionale",
    icon: "Camera",
    gradient: "#4f46e5",
    defaultExpanded: true,
    order: 1,
  },
  {
    id: "content",
    name: "Contenuti e Copywriting",
    icon: "PenTool",
    gradient: "#9333ea",
    defaultExpanded: true,
    order: 2,
  },
  {
    id: "integrations",
    name: "Integrazioni Terze Parti",
    icon: "Wrench",
    gradient: "#9333ea",
    defaultExpanded: false,
    order: 3,
  },
  {
    id: "marketing",
    name: "Marketing e Visibilità",
    icon: "BarChart3",
    gradient: "#4f46e5",
    defaultExpanded: false,
    order: 4,
  },
];

// Optional Services Data based on TIER.txt
export const optionalServicesData: OptionalService[] = [
  // Photography Services
  {
    id: "basic-photography",
    name: "Servizio Base",
    description: "20 foto ambiente + piatti. Mezza giornata, editing professionale, foto web-ready",
    category: "photography",
    price: 350,
    compatibleTiers: ["starter", "pro", "ecommerce"],
    features: ["20 foto professionali", "Editing incluso", "Foto web-ready", "Mezza giornata"],
    defaultSelected: false,
  },
  {
    id: "extended-photography",
    name: "Servizio Esteso",
    description: "40 foto + video breve 1 min. Giornata completa, video presentazione, footage extra",
    category: "photography",
    price: 550,
    compatibleTiers: ["starter", "pro", "ecommerce"],
    features: ["40 foto professionali", "Video 1 minuto", "Giornata completa", "Footage extra"],
    defaultSelected: false,
  },
  {
    id: "seasonal-session",
    name: "Sessione Stagionale Aggiuntiva",
    description: "Menu primavera/estate. Follow-up per aggiornamenti stagionali",
    category: "photography",
    price: 250,
    compatibleTiers: ["starter", "pro", "ecommerce"],
    features: ["Aggiornamento menu stagionale", "Follow-up fotografico"],
    defaultSelected: false,
  },
  // Content & Copywriting
  {
    id: "menu-descriptions",
    name: "Descrizioni Menu Professionale",
    description: "Riscrittura completa menu con linguaggio gourmet",
    category: "content",
    price: 200,
    compatibleTiers: ["starter", "pro", "ecommerce"],
    features: ["Riscrittura menu completo", "Linguaggio gourmet", "Descrizioni appetitose"],
    defaultSelected: false,
  },
  {
    id: "restaurant-story",
    name: "Storia del Ristorante e Tradizione Familiare",
    description: "Storytelling professionale heritage aziendale",
    category: "content",
    price: 150,
    compatibleTiers: ["starter", "pro", "ecommerce"],
    features: ["Storytelling professionale", "Heritage aziendale", "Tradizione familiare"],
    defaultSelected: false,
  },
  {
    id: "blog-setup",
    name: "Blog Setup",
    description: "Produzione 5 articoli iniziali",
    category: "content",
    price: 300,
    compatibleTiers: ["starter", "pro", "ecommerce"],
    features: ["5 articoli SEO-optimized", "Ricette", "Contenuti territorio"],
    defaultSelected: false,
  },
  {
    id: "website-translation",
    name: "Traduzione Website",
    description: "Menu completo tradotto per turisti internazionali in inglese professionale",
    category: "content",
    price: 120,
    compatibleTiers: ["starter", "pro", "ecommerce"],
    features: ["Traduzione professionale", "Menu completo", "Per turisti internazionali"],
    defaultSelected: false,
  },
  // Technical Integrations
  {
    id: "whatsapp-business",
    name: "WhatsApp Business",
    description: "Integrazione avanzata. Catalogo prodotti, messaggi automatici, click-to-chat",
    category: "integrations",
    price: 80,
    compatibleTiers: ["starter", "pro", "ecommerce"],
    features: ["Catalogo prodotti", "Messaggi automatici", "Click-to-chat"],
    defaultSelected: false,
  },
  {
    id: "loyalty-card",
    name: "Carta Fedeltà Digitale",
    description: "Sistema punti base, QR codes, gestione clienti",
    category: "integrations",
    price: 200,
    compatibleTiers: ["starter", "pro", "ecommerce"],
    features: ["Sistema punti", "QR codes", "Gestione clienti"],
    defaultSelected: false,
  },
  {
    id: "qr-code",
    name: "QR Code",
    description: "Design personalizzato brand-consistent per menu, wifi, social",
    category: "integrations",
    price: 80,
    compatibleTiers: ["starter", "pro", "ecommerce"],
    features: ["Design personalizzato", "Menu/WiFi/Social", "Brand-consistent"],
    defaultSelected: false,
  },
  {
    id: "backup-security",
    name: "Backup e Sicurezza",
    description: "Backup automatici, monitoraggio uptime, SSL premium",
    category: "integrations",
    price: 100,
    recurring: true,
    compatibleTiers: ["starter", "pro", "ecommerce"],
    features: ["Backup automatici", "Monitoraggio uptime", "SSL premium"],
    defaultSelected: false,
  },
  // Marketing & Visibility
  {
    id: "social-media-setup",
    name: "Setup Social Media Completo",
    description: "Facebook/Instagram Business. Account business, pixel tracking, catalogo prodotti",
    category: "marketing",
    price: 150,
    compatibleTiers: ["starter", "pro", "ecommerce"],
    features: ["Account business", "Pixel tracking", "Catalogo prodotti"],
    defaultSelected: false,
  },
  {
    id: "local-seo",
    name: "SEO Locale Avanzato",
    description: "Ricerca keywords, content strategy, local citations",
    category: "marketing",
    price: 300,
    compatibleTiers: ["starter", "pro", "ecommerce"],
    features: ["Ricerca keywords", "Content strategy", "Local citations"],
    defaultSelected: false,
  },
  {
    id: "tripadvisor-integration",
    name: "Integrazione TripAdvisor e Recensioni",
    description: "Widget recensioni, monitoring reputazione",
    category: "marketing",
    price: 100,
    compatibleTiers: ["starter", "pro", "ecommerce"],
    features: ["Widget recensioni", "Monitoring reputazione"],
    defaultSelected: false,
  },
  {
    id: "google-ads-setup",
    name: "Setup Google Ads + Campagna Base",
    description: "Account setup, prima campagna, targeting local",
    category: "marketing",
    price: 200,
    compatibleTiers: ["starter", "pro", "ecommerce"],
    features: ["Account setup", "Prima campagna", "Targeting locale"],
    defaultSelected: false,
  },
];

// Helper functions
export const getTierData = (tier: TierType): TierData => tierData[tier];

export const getLevelData = (tier: TierType, level: LevelType): LevelData => tierData[tier].levels[level];

export const getTierPrice = (tier: TierType, level: LevelType): number => tierData[tier].levels[level].price;

export const getCompatibleOptionalServices = (tier: TierType): OptionalService[] =>
  optionalServicesData.filter(service => service.compatibleTiers.includes(tier));

export const getOptionalServicesByCategory = (category: OptionalService["category"]): OptionalService[] =>
  optionalServicesData.filter(service => service.category === category);

export const calculateTotalPrice = (tier: TierType, level: LevelType, optionalServices: OptionalService[]): number => {
  const basePrice = getTierPrice(tier, level);
  const optionalPrice = optionalServices.reduce((sum, service) => sum + service.price, 0);
  return basePrice + optionalPrice;
};

export const getIncludedFeaturesForLevel = (tier: TierType, level: LevelType): string[] => {
  const levelData = getLevelData(tier, level);
  const includedFeatures: string[] = [];

  // Convert features to equivalent feature IDs for compatibility checking
  // This helps determine which optional services might be redundant

  // Check pages features
  if (levelData.features.pages.length >= 6) includedFeatures.push("multiple_pages");
  if (levelData.features.pages.some(page => page.includes("Blog"))) includedFeatures.push("blog_setup");
  if (levelData.features.pages.some(page => page.includes("Eventi"))) includedFeatures.push("events_page");

  // Check technical features
  if (levelData.features.technicalFeatures.some(feature => feature.includes("QR")))
    includedFeatures.push("qr_code_personalizzato");
  if (levelData.features.technicalFeatures.some(feature => feature.includes("Analytics")))
    includedFeatures.push("analytics_setup");
  if (levelData.features.technicalFeatures.some(feature => feature.includes("Menu interattivo")))
    includedFeatures.push("menu_interattivo");

  // Check integrations
  if (levelData.features.integrations.some(integration => integration.includes("Google My Business")))
    includedFeatures.push("google_my_business");
  if (levelData.features.integrations.some(integration => integration.includes("social media")))
    includedFeatures.push("social_media_automation");
  if (levelData.features.integrations.some(integration => integration.includes("TripAdvisor")))
    includedFeatures.push("tripadvisor_integration");
  if (levelData.features.integrations.some(integration => integration.includes("Newsletter")))
    includedFeatures.push("newsletter_signup");
  if (levelData.features.integrations.some(integration => integration.includes("WhatsApp")))
    includedFeatures.push("whatsapp_chatbot");
  if (levelData.features.integrations.some(integration => integration.includes("POS")))
    includedFeatures.push("pos_integration");
  if (levelData.features.integrations.some(integration => integration.includes("delivery")))
    includedFeatures.push("delivery_integration");
  if (
    levelData.features.integrations.some(
      integration => integration.includes("fedeltà") || integration.includes("loyalty"),
    )
  )
    includedFeatures.push("loyalty_system");

  // Check marketing features
  if (levelData.features.marketing.some(marketing => marketing.includes("Email marketing")))
    includedFeatures.push("email_marketing");
  if (levelData.features.marketing.some(marketing => marketing.includes("Social media management")))
    includedFeatures.push("social_media_management");

  // Check support features
  if (levelData.support && levelData.support.duration && levelData.support.duration !== "Non incluso")
    includedFeatures.push("extended_support");
  if (levelData.training && levelData.training.sessions > 2) includedFeatures.push("training_sessions");

  return includedFeatures;
};

// Optional Services Helper Functions for UI
export const getOptionalServiceCategoriesConfig = (): OptionalServiceCategory[] =>
  optionalServiceCategoriesData.sort((a, b) => a.order - b.order);

export const getServicesByCategory = (categoryId: string): OptionalService[] =>
  optionalServicesData.filter(service => service.category === categoryId);

export const getOptionalServicesByTier = (tier: TierType): OptionalService[] =>
  optionalServicesData.filter(service => service.compatibleTiers.includes(tier));

export const formatServicePrice = (price: number, recurring?: boolean): string => {
  const formattedPrice = `€${price}`;
  return recurring ? `${formattedPrice}/anno` : formattedPrice;
};

export const calculateOptionalServicesTotal = (selectedServiceIds: string[]): number => {
  return optionalServicesData
    .filter(service => selectedServiceIds.includes(service.id))
    .reduce((total, service) => total + service.price, 0);
};

export const getOptionalServiceById = (serviceId: string): OptionalService | undefined =>
  optionalServicesData.find(service => service.id === serviceId);
