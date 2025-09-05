export interface TierFeatureValue {
  value: boolean | string;
  shortDescription?: string;
  longDescription?: string;
}

export interface TierFeature {
  category: string;
  features: {
    name: string;
    longDescription?: string;
    tier1: boolean | string | TierFeatureValue;
    tier2: boolean | string | TierFeatureValue;
    tier3: boolean | string | TierFeatureValue;
  }[];
}

export const tierComparisonData: TierFeature[] = [
  {
    category: 'Pagine e Contenuti',
    features: [
      {
        name: 'Pagine base (Home, Menu, Chi Siamo, Contatti)',
        tier1: true,
        tier2: true,
        tier3: true,
      },
      {
        name: 'Pagine specializzate aggiuntive',
        tier1: {
          value: '2-3 pagine',
          shortDescription: 'Gallery + Info Base',
          longDescription:
            'Gallery professionale e informazioni base del ristorante con focus su tradizione e autenticità',
        },
        tier2: {
          value: '6-8 pagine',
          shortDescription: 'Eventi, Catering, Blog',
          longDescription:
            'Architettura completa con pagine per eventi, catering, blog e sistema prenotazioni integrato',
        },
        tier3: {
          value: '10+ pagine',
          shortDescription: 'Ecosistema Completo',
          longDescription:
            'Ecosistema digitale completo con customer portal, loyalty program, content hub e analytics dashboard',
        },
      },
      {
        name: 'Menu digitale interattivo',
        tier1: {
          value: 'Base',
          shortDescription: 'Menu statico PDF',
          longDescription:
            'Menu tradizionale in formato digitale con design professionale e categorizzazione base',
        },
        tier2: {
          value: 'Avanzato',
          shortDescription: 'Filtri allergie e preferenze',
          longDescription:
            'Menu interattivo con filtri per allergie, preferenze dietetiche e disponibilità real-time',
        },
        tier3: {
          value: 'Intelligence',
          shortDescription: 'AI pairings e info nutrizionali',
          longDescription:
            'Menu intelligente con suggerimenti AI per abbinamenti, informazioni nutrizionali complete e raccomandazioni personalizzate',
        },
      },
      {
        name: 'Blog e content marketing',
        tier1: false,
        tier2: {
          value: 'Base',
          shortDescription: 'Piattaforma blog',
          longDescription:
            'Blog professionale per content marketing con sistema di gestione articoli e SEO optimization',
        },
        tier3: {
          value: 'Content Hub',
          shortDescription: 'Blog, ricette, video, podcast',
          longDescription:
            'Content hub completo con blog, ricette, video, podcast integration e calendario editoriale',
        },
      },
    ],
  },
  {
    category: 'Funzionalità Principali',
    features: [
      {
        name: 'Sistema prenotazioni online',
        tier1: false,
        tier2: {
          value: 'Incluso',
          shortDescription: 'TheFork o sistema proprietario',
          longDescription:
            "Sistema prenotazioni integrato con calendario real-time, conferme automatiche via email/SMS e gestione liste d'attesa",
        },
        tier3: {
          value: 'Avanzato',
          shortDescription: 'Multi-slot, eventi, depositi',
          longDescription:
            'Sistema prenotazioni enterprise con booking multi-slot, gestione eventi speciali, depositi online e preferenze cliente memorizzate',
        },
      },
      {
        name: 'E-commerce e delivery',
        tier1: false,
        tier2: {
          value: 'Delivery Base',
          shortDescription: 'Just Eat, Glovo (2 piattaforme)',
          longDescription:
            'Setup completo delivery con integrazione Just Eat e Glovo, menu delivery ottimizzato e gestione ordini unificata',
        },
        tier3: {
          value: 'E-commerce Completo',
          shortDescription: 'Store prodotti + delivery avanzato',
          longDescription:
            'E-commerce completo per prodotti ristorante (salse, vini, specialità), sistema ordini online con slot programmati e payment gateway integrato',
        },
      },
      {
        name: 'Customer management',
        tier1: {
          value: 'Base',
          shortDescription: 'Form contatti e newsletter',
          longDescription:
            'Sistema base di contatti con form di iscrizione newsletter e gestione base dei contatti clienti',
        },
        tier2: {
          value: 'Avanzato',
          shortDescription: 'CRM, email automation',
          longDescription:
            'Sistema CRM con email marketing automation, segmentazione clienti e customer journey tracking',
        },
        tier3: {
          value: 'Customer Portal',
          shortDescription: 'Account, storico, preferenze',
          longDescription:
            'Customer portal personalizzato con account clienti, storico ordini, preferenze memorizzate e loyalty program integrato',
        },
      },
      {
        name: 'Programma fedeltà',
        tier1: false,
        tier2: {
          value: 'Base',
          shortDescription: 'Punti e rewards semplici',
          longDescription:
            'Sistema punti base con QR codes, gestione clienti fedeli e rewards per visite frequenti',
        },
        tier3: {
          value: 'Avanzato',
          shortDescription: 'Cross-channel con AI',
          longDescription:
            'Programma fedeltà unificato cross-channel con AI personalization, tiers avanzati e rewards personalizzati',
        },
      },
    ],
  },
  {
    category: 'Design e User Experience',
    features: [
      {
        name: 'Design responsivo mobile-first',
        tier1: true,
        tier2: true,
        tier3: true,
      },
      {
        name: 'Ottimizzazione velocità sito',
        tier1: {
          value: 'Standard',
          shortDescription: 'Core Web Vitals base',
          longDescription:
            'Ottimizzazione base della velocità con compressione immagini e Core Web Vitals conformi',
        },
        tier2: {
          value: 'Avanzata',
          shortDescription: 'PWA-ready, performance superiore',
          longDescription:
            'Ottimizzazione avanzata con tecnologia PWA-ready per performance superiore e user experience mobile ottimale',
        },
        tier3: {
          value: 'Enterprise',
          shortDescription: 'App mobile nativa',
          longDescription:
            'App mobile nativa iOS/Android con notifiche push avanzate e performance enterprise-grade',
        },
      },
      {
        name: 'Personalizzazione brand',
        tier1: {
          value: 'Completa',
          shortDescription: 'Logo, colori, stile brand',
          longDescription:
            "Personalizzazione completa con integrazione logo, palette colori e stile coerente con l'identità del ristorante",
        },
        tier2: {
          value: 'Avanzata',
          shortDescription: 'Brand story e narrative',
          longDescription:
            'Personalizzazione avanzata con brand storytelling, narrative visiva e presentazione team/chef philosophy',
        },
        tier3: {
          value: 'Ecosistema',
          shortDescription: 'Brand unificato omnichannel',
          longDescription:
            'Ecosistema brand unificato attraverso tutti i touchpoint digitali con coerenza omnichannel completa',
        },
      },
      {
        name: 'Gallery professionale',
        tier1: {
          value: 'Base',
          shortDescription: 'Gallery statica organizzata',
          longDescription:
            'Gallery professionale con categorizzazione base per ambiente, piatti e atmosfera del ristorante',
        },
        tier2: {
          value: 'Interattiva',
          shortDescription: 'Categorie tematiche, filtri',
          longDescription:
            'Gallery interattiva con categorie tematiche avanzate, filtri per tipo di cucina e user-generated content',
        },
        tier3: {
          value: 'Portfolio Dinamico',
          shortDescription: 'Media hub con video/foto',
          longDescription:
            'Portfolio dinamico completo con video, foto professionali, virtual tour e media hub integrato',
        },
      },
    ],
  },
  {
    category: 'SEO e Marketing',
    features: [
      {
        name: 'SEO locale di base',
        tier1: {
          value: 'Incluso',
          shortDescription: 'Google My Business + local',
          longDescription:
            'Ottimizzazione SEO locale con setup Google My Business, ricerche geolocalizzate e posizionamento nelle prime 3 posizioni locali',
        },
        tier2: {
          value: 'Avanzato',
          shortDescription: 'Keywords competitive urbane',
          longDescription:
            'SEO avanzato per ricerche competitive urbane con content strategy mirata e local citations complete',
        },
        tier3: {
          value: 'Enterprise',
          shortDescription: 'Multi-location + AI insights',
          longDescription:
            'SEO enterprise con gestione multi-location, AI insights per ottimizzazione content e business intelligence avanzata',
        },
      },
      {
        name: 'Integrazione social media',
        tier1: {
          value: 'Base',
          shortDescription: 'Link e widgets social',
          longDescription:
            'Integrazione base con link social media, widget Instagram e connessioni social automatiche',
        },
        tier2: {
          value: 'Automatica',
          shortDescription: 'Post scheduling e gestione',
          longDescription:
            'Integrazione social automatica con post scheduling, gestione centralizzata e customer engagement tracking',
        },
        tier3: {
          value: 'Management',
          shortDescription: 'Gestione professionale inclusa',
          longDescription:
            'Social media management professionale con content creation, community management e advertising integration',
        },
      },
      {
        name: 'Email marketing',
        tier1: {
          value: 'Newsletter',
          shortDescription: 'Signup con automation welcome',
          longDescription:
            'Sistema newsletter con welcome automation e segmentazione base per comunicazioni periodiche',
        },
        tier2: {
          value: 'Automation',
          shortDescription: 'Segmentazione comportamentale',
          longDescription:
            'Email marketing automation avanzato con segmentazione comportamentale, abandoned cart recovery e customer journey',
        },
        tier3: {
          value: 'Omnichannel',
          shortDescription: 'Marketing unificato cross-channel',
          longDescription:
            'Marketing automation omnichannel con customer lifetime value optimization e personalizzazione AI-driven',
        },
      },
      {
        name: 'Analytics e reportistica',
        tier1: {
          value: 'Google Analytics',
          shortDescription: 'Setup base + training',
          longDescription:
            'Google Analytics setup con training interpretazione base per tracking visite e conversioni principali',
        },
        tier2: {
          value: 'Dashboard Personalizzata',
          shortDescription: 'Metriche business specifiche',
          longDescription:
            'Analytics dashboard personalizzata con metriche business-specific e tracking conversioni avanzato',
        },
        tier3: {
          value: 'Business Intelligence',
          shortDescription: 'AI insights + previsioni',
          longDescription:
            'Business intelligence dashboard con machine learning insights, predictive analytics e reportistica automatica',
        },
      },
    ],
  },
  {
    category: 'Supporto e Formazione',
    features: [
      {
        name: 'Formazione del team',
        tier1: {
          value: '2 sessioni × 2 ore',
          shortDescription: 'Gestione base del sito',
          longDescription:
            'Formazione completa del team per gestione quotidiana del sito, aggiornamento contenuti e best practices',
        },
        tier2: {
          value: '3 sessioni × 3 ore',
          shortDescription: 'Gestione avanzata + marketing',
          longDescription:
            'Training completo per gestione avanzata sistema prenotazioni, marketing tools e customer management',
        },
        tier3: {
          value: 'Training Multi-Level',
          shortDescription: '10 sessioni complete + specializzazione',
          longDescription:
            'Formazione team avanzata multi-level con specializzazione per ruoli, account manager dedicato e quarterly business review',
        },
      },
      {
        name: 'Supporto post-lancio',
        tier1: {
          value: '3 mesi',
          shortDescription: 'Supporto tecnico base',
          longDescription:
            '3 mesi di supporto post-lancio per risoluzione problemi tecnici, aggiornamenti e ottimizzazioni minori',
        },
        tier2: {
          value: '6 mesi dedicato',
          shortDescription: 'Account manager assegnato',
          longDescription:
            '6 mesi di supporto dedicato con account manager assegnato per optimization continua e strategic consultation',
        },
        tier3: {
          value: '12 mesi Premium',
          shortDescription: 'Supporto enterprise + evoluzione',
          longDescription:
            '12 mesi di supporto enterprise premium con sviluppo feature personalizzate, strategic consulting e innovation early adoption',
        },
      },
      {
        name: 'Revisioni incluse',
        tier1: {
          value: '4 round',
          shortDescription: 'Modifiche durante sviluppo',
          longDescription:
            '4 round di revisioni incluse durante lo sviluppo per assicurare il sito rispecchi perfettamente la visione del cliente',
        },
        tier2: {
          value: '5 round',
          shortDescription: 'Revisioni + ottimizzazioni',
          longDescription:
            "5 round di revisioni con possibilità di ottimizzazioni avanzate e fine-tuning dell'user experience",
        },
        tier3: {
          value: 'Unlimited',
          shortDescription: 'Revisioni illimitate primo anno',
          longDescription:
            'Revisioni illimitate nel primo anno con dedicated development team per customizzazioni e feature evolution',
        },
      },
      {
        name: 'Tempi di realizzazione',
        tier1: {
          value: '3-4 settimane',
          shortDescription: 'Sviluppo rapido ed efficiente',
          longDescription:
            'Sviluppo rapido in 3-4 settimane con timeline chiare e milestone definite per un lancio veloce',
        },
        tier2: {
          value: '6-7 settimane',
          shortDescription: 'Sviluppo completo con integrazioni',
          longDescription:
            'Sviluppo completo in 6-7 settimane includendo tutte le integrazioni avanzate e testing approfondito',
        },
        tier3: {
          value: '12-16 settimane',
          shortDescription: 'Sviluppo enterprise complesso',
          longDescription:
            'Sviluppo enterprise complesso in 12-16 settimane con architettura scalabile, integrazioni multiple e testing completo',
        },
      },
    ],
  },
  {
    category: 'Integrazioni Tecniche',
    features: [
      {
        name: 'Integrazione piattaforme delivery',
        tier1: false,
        tier2: {
          value: '2 piattaforme',
          shortDescription: 'Just Eat, Glovo o Deliveroo',
          longDescription:
            'Integrazione completa con 2 piattaforme delivery principali, menu ottimizzato per delivery e gestione ordini unificata',
        },
        tier3: {
          value: '3+ piattaforme',
          shortDescription: 'Tutte le major + dashboard unificata',
          longDescription:
            'Integrazione con tutte le major delivery platforms, dashboard gestionale unificata e white-label delivery platform proprietaria',
        },
      },
      {
        name: 'Integrazione POS',
        tier1: false,
        tier2: false,
        tier3: {
          value: 'Completa',
          shortDescription: 'Sync real-time con gestionale',
          longDescription:
            'Integrazione completa POS per disponibilità real-time, sync con sistemi gestionali esistenti e API personalizzate',
        },
      },
      {
        name: 'Payment gateway',
        tier1: false,
        tier2: {
          value: 'Base',
          shortDescription: 'Pagamenti online depositi',
          longDescription:
            'Payment gateway integrato per depositi prenotazioni con Nexi, PayPal e carte principali',
        },
        tier3: {
          value: 'Completo',
          shortDescription: 'Multi-opzione + internazionale',
          longDescription:
            'Payment gateway completo multi-opzione con support internazionale, multi-currency e gestione fatturazione automatica',
        },
      },
      {
        name: 'API personalizzate',
        tier1: false,
        tier2: false,
        tier3: {
          value: 'Sviluppo Custom',
          shortDescription: 'API ecosystem personalizzato',
          longDescription:
            'Sviluppo API ecosystem personalizzato per integrazioni infinite, IoT integration e connessioni con sistemi proprietari',
        },
      },
    ],
  },
  {
    category: 'Sicurezza e Performance',
    features: [
      {
        name: 'Certificato SSL',
        tier1: true,
        tier2: true,
        tier3: true,
      },
      {
        name: 'Backup automatici',
        tier1: {
          value: 'Base',
          shortDescription: 'Backup giornalieri',
          longDescription:
            'Sistema backup automatico giornaliero con storage sicuro e ripristino rapido in caso di necessità',
        },
        tier2: {
          value: 'Avanzati',
          shortDescription: 'Multi-point + monitoraggio',
          longDescription:
            'Backup avanzati multi-point con monitoraggio uptime 24/7 e notifiche immediate per anomalie',
        },
        tier3: {
          value: 'Enterprise',
          shortDescription: 'Disaster recovery completo',
          longDescription:
            'Disaster recovery enterprise completo con backup incrementali, geo-ridondanza e SLA di uptime 99.9%',
        },
      },
      {
        name: 'Monitoraggio uptime',
        tier1: {
          value: 'Base',
          shortDescription: 'Check giornalieri',
          longDescription:
            'Monitoraggio uptime base con controlli giornalieri e notifiche per downtime prolungati',
        },
        tier2: {
          value: '24/7',
          shortDescription: 'Monitoraggio continuo',
          longDescription:
            'Monitoraggio uptime 24/7 con alerting immediato e intervento rapido per problemi performance',
        },
        tier3: {
          value: 'Enterprise',
          shortDescription: 'SLA 99.9% + support prioritario',
          longDescription:
            'Monitoraggio enterprise con SLA 99.9%, support prioritario 24/7 e incident response team dedicato',
        },
      },
      {
        name: 'Protezione dati GDPR',
        tier1: true,
        tier2: true,
        tier3: true,
      },
    ],
  },
];
