// PersonaMatcher Configuration for Different Steps
// Same UI component, different question sets as per ULTIMATE-PRICING-FLOW-ANALYSIS.md

export type TierType = 'starter' | 'professional' | 'enterprise';
export type LevelType = 'basic' | 'standard' | 'advanced';

export type PersonaMatcherStep = 1 | 2 | 3;
export type PersonaMatcherPurpose =
  | 'tier_identification'
  | 'level_selection'
  | 'service_optimization';

export interface QuestionOption {
  id: string;
  text: string;
  value: string;
  weight?: number; // for scoring
}

export interface PersonaQuestion {
  id: string;
  question: string;
  type: 'single_choice' | 'multiple_choice' | 'rating' | 'text';
  options?: QuestionOption[];
  required: boolean;
  category: string;
}

export interface PersonaMatcherConfiguration {
  step: PersonaMatcherStep;
  purpose: PersonaMatcherPurpose;
  title: string;
  description: string;
  questions: PersonaQuestion[];
  resultCalculation: (responses: Record<string, any>) => any;
}

// STEP 1 CONFIGURATION: Tier Identification
export const step1Config: PersonaMatcherConfiguration = {
  step: 1,
  purpose: 'tier_identification',
  title: 'Trova la Tua Soluzione Perfetta',
  description:
    'Rispondi a queste domande per identificare il pacchetto più adatto alle tue esigenze',
  questions: [
    {
      id: 'business_type',
      question: 'Che tipo di attività gestisci?',
      type: 'single_choice',
      required: true,
      category: 'Business Classification',
      options: [
        {
          id: 'family_trattoria',
          text: 'Trattoria familiare tradizionale',
          value: 'family_trattoria',
          weight: 1,
        },
        {
          id: 'casual_restaurant',
          text: 'Ristorante casual moderno',
          value: 'casual_restaurant',
          weight: 2,
        },
        {
          id: 'fine_dining',
          text: 'Ristorante upscale/fine dining',
          value: 'fine_dining',
          weight: 3,
        },
        { id: 'pizzeria', text: 'Pizzeria', value: 'pizzeria', weight: 1 },
        { id: 'bar_restaurant', text: 'Bar ristorante', value: 'bar_restaurant', weight: 2 },
        { id: 'catering', text: 'Servizio catering', value: 'catering', weight: 3 },
      ],
    },
    {
      id: 'digital_maturity',
      question: 'Qual è il tuo livello attuale di presenza digitale?',
      type: 'single_choice',
      required: true,
      category: 'Digital Maturity',
      options: [
        { id: 'none', text: 'Nessuna presenza online', value: 'none', weight: 1 },
        {
          id: 'basic_social',
          text: 'Solo profili social media base',
          value: 'basic_social',
          weight: 1,
        },
        {
          id: 'basic_website',
          text: 'Sito web semplice esistente',
          value: 'basic_website',
          weight: 2,
        },
        {
          id: 'good_presence',
          text: 'Buona presenza online ma da migliorare',
          value: 'good_presence',
          weight: 2,
        },
        { id: 'advanced', text: 'Presenza digitale avanzata', value: 'advanced', weight: 3 },
      ],
    },
    {
      id: 'primary_goals',
      question: 'Quali sono i tuoi obiettivi principali? (puoi selezionare più opzioni)',
      type: 'multiple_choice',
      required: true,
      category: 'Primary Objectives',
      options: [
        {
          id: 'local_visibility',
          text: 'Aumentare visibilità locale',
          value: 'local_visibility',
          weight: 1,
        },
        {
          id: 'customer_engagement',
          text: 'Migliorare coinvolgimento clienti',
          value: 'customer_engagement',
          weight: 2,
        },
        { id: 'online_sales', text: 'Vendere prodotti online', value: 'online_sales', weight: 3 },
        {
          id: 'reservations',
          text: 'Gestire prenotazioni online',
          value: 'reservations',
          weight: 2,
        },
        { id: 'delivery', text: 'Servizio delivery/takeaway', value: 'delivery', weight: 3 },
        {
          id: 'brand_building',
          text: 'Costruire brand e reputazione',
          value: 'brand_building',
          weight: 2,
        },
      ],
    },
    {
      id: 'service_model',
      question: 'Che tipo di servizio offri attualmente?',
      type: 'multiple_choice',
      required: true,
      category: 'Service Delivery Model',
      options: [
        {
          id: 'dine_in_only',
          text: 'Solo tavoli/consumazione sul posto',
          value: 'dine_in_only',
          weight: 1,
        },
        { id: 'takeaway', text: 'Asporto', value: 'takeaway', weight: 2 },
        { id: 'delivery', text: 'Delivery', value: 'delivery', weight: 3 },
        { id: 'catering', text: 'Catering/eventi privati', value: 'catering', weight: 2 },
        {
          id: 'products',
          text: 'Vendita prodotti (salse, vini, etc.)',
          value: 'products',
          weight: 3,
        },
      ],
    },
    {
      id: 'customer_base',
      question: 'Chi è la tua clientela principale?',
      type: 'single_choice',
      required: true,
      category: 'Customer Base Characteristics',
      options: [
        {
          id: 'local_regulars',
          text: 'Clienti abituali locali',
          value: 'local_regulars',
          weight: 1,
        },
        { id: 'mixed', text: 'Mix di locali e turisti', value: 'mixed', weight: 2 },
        { id: 'tourists', text: 'Principalmente turisti', value: 'tourists', weight: 2 },
        { id: 'high_end', text: 'Clientela high-end', value: 'high_end', weight: 3 },
        {
          id: 'young_modern',
          text: 'Giovani e famiglie moderne',
          value: 'young_modern',
          weight: 2,
        },
      ],
    },
  ],
  resultCalculation: (responses) => {
    return calculateTierRecommendation(responses);
  },
};

// STEP 2 CONFIGURATION: Level Selection
export const step2Config: PersonaMatcherConfiguration = {
  step: 2,
  purpose: 'level_selection',
  title: 'Ottimizza il Tuo Livello',
  description: 'Aiutaci a scegliere il livello perfetto per le tue esigenze specifiche',
  questions: [
    {
      id: 'immediate_needs',
      question: 'Quali funzionalità ti servono immediatamente per lanciare con successo?',
      type: 'multiple_choice',
      required: true,
      category: 'Immediate Feature Needs',
      options: [
        {
          id: 'basic_website',
          text: 'Sito web base funzionante',
          value: 'basic_website',
          weight: 1,
        },
        {
          id: 'professional_menu',
          text: 'Menu professionale e dettagliato',
          value: 'professional_menu',
          weight: 2,
        },
        {
          id: 'reservation_system',
          text: 'Sistema prenotazioni',
          value: 'reservation_system',
          weight: 2,
        },
        {
          id: 'social_integration',
          text: 'Integrazione social media',
          value: 'social_integration',
          weight: 2,
        },
        { id: 'analytics', text: 'Analytics e statistiche', value: 'analytics', weight: 3 },
        { id: 'automation', text: 'Automazioni e chatbot', value: 'automation', weight: 3 },
      ],
    },
    {
      id: 'customer_volume',
      question: 'Quanti clienti servi mediamente al giorno?',
      type: 'single_choice',
      required: true,
      category: 'Customer Volume Assessment',
      options: [
        { id: 'low', text: 'Meno di 30 clienti/giorno', value: 'low', weight: 1 },
        { id: 'medium', text: '30-80 clienti/giorno', value: 'medium', weight: 2 },
        { id: 'high', text: '80-150 clienti/giorno', value: 'high', weight: 3 },
        { id: 'very_high', text: 'Oltre 150 clienti/giorno', value: 'very_high', weight: 3 },
      ],
    },
    {
      id: 'growth_timeline',
      question: 'In quanto tempo prevedi di espandere le tue operazioni?',
      type: 'single_choice',
      required: true,
      category: 'Growth Timeline Planning',
      options: [
        { id: '1-3months', text: '1-3 mesi', value: '1-3months', weight: 3 },
        { id: '3-6months', text: '3-6 mesi', value: '3-6months', weight: 3 },
        { id: '6-12months', text: '6-12 mesi', value: '6-12months', weight: 2 },
        { id: '12months+', text: 'Oltre 12 mesi', value: '12months+', weight: 1 },
        { id: 'no_plans', text: 'Nessun piano di espansione', value: 'no_plans', weight: 1 },
      ],
    },
    {
      id: 'technical_comfort',
      question: 'Quanto vuoi gestire direttamente vs. avere tutto automatizzato?',
      type: 'rating',
      required: true,
      category: 'Technical Management Preference',
      options: [
        { id: '1', text: '1 - Preferisco gestire tutto io', value: '1', weight: 1 },
        { id: '2', text: '2', value: '2', weight: 1 },
        { id: '3', text: '3 - Equilibrio', value: '3', weight: 2 },
        { id: '4', text: '4', value: '4', weight: 3 },
        { id: '5', text: '5 - Voglio tutto automatizzato', value: '5', weight: 3 },
      ],
    },
    {
      id: 'budget_flexibility',
      question: 'Puoi investire di più ora per benefici a lungo termine?',
      type: 'single_choice',
      required: true,
      category: 'Budget Flexibility Analysis',
      options: [
        {
          id: 'tight',
          text: 'Budget molto limitato, devo iniziare con il minimo',
          value: 'tight',
          weight: 1,
        },
        {
          id: 'moderate',
          text: "Posso spendere un po' di più per funzionalità utili",
          value: 'moderate',
          weight: 2,
        },
        {
          id: 'flexible',
          text: 'Posso investire di più per il valore a lungo termine',
          value: 'flexible',
          weight: 3,
        },
        {
          id: 'premium',
          text: 'Voglio la soluzione più completa subito',
          value: 'premium',
          weight: 3,
        },
      ],
    },
  ],
  resultCalculation: (responses) => {
    return calculateLevelRecommendation(responses);
  },
};

// STEP 3 CONFIGURATION: Service Optimization
export const step3Config: PersonaMatcherConfiguration = {
  step: 3,
  purpose: 'service_optimization',
  title: 'Ottimizza i Tuoi Servizi',
  description: 'Selezioniamo insieme i servizi opzionali che massimizzano il tuo ROI',
  questions: [
    {
      id: 'current_pain_points',
      question: 'Qual è la tua sfida operativa più grande in questo momento?',
      type: 'single_choice',
      required: true,
      category: 'Current Business Pain Points',
      options: [
        { id: 'visibility', text: 'Poca visibilità online', value: 'visibility', weight: 1 },
        {
          id: 'customer_management',
          text: 'Gestione clienti e prenotazioni',
          value: 'customer_management',
          weight: 2,
        },
        { id: 'marketing', text: 'Marketing e promozione', value: 'marketing', weight: 2 },
        {
          id: 'operational_efficiency',
          text: 'Efficienza operativa',
          value: 'operational_efficiency',
          weight: 3,
        },
        {
          id: 'content_creation',
          text: 'Creazione contenuti di qualità',
          value: 'content_creation',
          weight: 1,
        },
        { id: 'automation', text: 'Automazione processi', value: 'automation', weight: 3 },
      ],
    },
    {
      id: 'growth_priorities',
      question: 'Quale capacità ti serve nei prossimi 6 mesi?',
      type: 'multiple_choice',
      required: true,
      category: 'Growth Priority Analysis',
      options: [
        {
          id: 'better_photos',
          text: 'Foto professionali per marketing',
          value: 'better_photos',
          weight: 1,
        },
        {
          id: 'content_writing',
          text: 'Contenuti scritti di qualità',
          value: 'content_writing',
          weight: 1,
        },
        {
          id: 'social_automation',
          text: 'Automazione social media',
          value: 'social_automation',
          weight: 2,
        },
        {
          id: 'seo_improvement',
          text: 'Miglioramento SEO e visibilità',
          value: 'seo_improvement',
          weight: 2,
        },
        {
          id: 'customer_retention',
          text: 'Sistema fedeltà clienti',
          value: 'customer_retention',
          weight: 2,
        },
        {
          id: 'review_management',
          text: 'Gestione recensioni',
          value: 'review_management',
          weight: 2,
        },
        { id: 'advertising', text: 'Campagne pubblicitarie', value: 'advertising', weight: 3 },
      ],
    },
    {
      id: 'budget_allocation',
      question: 'Quanto puoi investire mensilmente in servizi aggiuntivi?',
      type: 'single_choice',
      required: true,
      category: 'Budget Allocation Preference',
      options: [
        { id: 'minimal', text: '€50-100/mese', value: 'minimal', weight: 1 },
        { id: 'moderate', text: '€100-250/mese', value: 'moderate', weight: 2 },
        { id: 'significant', text: '€250-500/mese', value: 'significant', weight: 3 },
        { id: 'premium', text: 'Oltre €500/mese', value: 'premium', weight: 3 },
      ],
    },
    {
      id: 'time_investment',
      question: 'Quanto tempo puoi dedicare alla gestione di nuove funzionalità?',
      type: 'single_choice',
      required: true,
      category: 'Time Investment Capacity',
      options: [
        { id: 'minimal', text: 'Meno di 1 ora/settimana', value: 'minimal', weight: 3 },
        { id: 'light', text: '1-3 ore/settimana', value: 'light', weight: 2 },
        { id: 'moderate', text: '3-6 ore/settimana', value: 'moderate', weight: 2 },
        { id: 'heavy', text: 'Oltre 6 ore/settimana', value: 'heavy', weight: 1 },
      ],
    },
    {
      id: 'success_metrics',
      question: 'Come misuri il successo del tuo ristorante?',
      type: 'multiple_choice',
      required: true,
      category: 'Success Metrics Definition',
      options: [
        { id: 'revenue', text: 'Aumento fatturato', value: 'revenue', weight: 3 },
        { id: 'customers', text: 'Numero nuovi clienti', value: 'customers', weight: 2 },
        { id: 'retention', text: 'Fidelizzazione clienti', value: 'retention', weight: 2 },
        { id: 'efficiency', text: 'Efficienza operativa', value: 'efficiency', weight: 3 },
        { id: 'brand', text: 'Riconoscimento brand', value: 'brand', weight: 1 },
        { id: 'reviews', text: 'Recensioni positive', value: 'reviews', weight: 2 },
      ],
    },
  ],
  resultCalculation: (responses) => {
    return calculateServiceRecommendation(responses);
  },
};

// RECOMMENDATION CALCULATION FUNCTIONS

function calculateTierRecommendation(responses: Record<string, any>): {
  tier: TierType;
  confidence: number;
  reasoning: string;
} {
  let score = 0;
  let totalWeight = 0;

  // Calculate weighted score based on responses
  Object.entries(responses).forEach(([questionId, answer]) => {
    const question = step1Config.questions.find((q) => q.id === questionId);
    if (!question) return;

    if (Array.isArray(answer)) {
      // Multiple choice
      answer.forEach((value) => {
        const option = question.options?.find((opt) => opt.value === value);
        if (option?.weight) {
          score += option.weight;
          totalWeight += 3; // max weight
        }
      });
    } else {
      // Single choice
      const option = question.options?.find((opt) => opt.value === answer);
      if (option?.weight) {
        score += option.weight;
        totalWeight += 3; // max weight
      }
    }
  });

  const averageScore = score / totalWeight;

  // Determine tier based on score
  if (averageScore <= 1.3) {
    return {
      tier: 'starter',
      confidence: 0.85,
      reasoning: 'Perfetto per iniziare la tua presenza digitale con solide fondamenta',
    };
  } else if (averageScore <= 2.3) {
    return {
      tier: 'professional',
      confidence: 0.9,
      reasoning: 'Ideale per coinvolgere attivamente i clienti e far crescere il business',
    };
  } else {
    return {
      tier: 'enterprise',
      confidence: 0.88,
      reasoning: 'Perfetto per massimizzare le vendite online e la presenza digitale',
    };
  }
}

function calculateLevelRecommendation(responses: Record<string, any>): {
  level: LevelType;
  confidence: number;
  reasoning: string;
} {
  let score = 0;
  let totalWeight = 0;

  Object.entries(responses).forEach(([questionId, answer]) => {
    const question = step2Config.questions.find((q) => q.id === questionId);
    if (!question) return;

    if (Array.isArray(answer)) {
      answer.forEach((value) => {
        const option = question.options?.find((opt) => opt.value === value);
        if (option?.weight) {
          score += option.weight;
          totalWeight += 3;
        }
      });
    } else {
      const option = question.options?.find((opt) => opt.value === answer);
      if (option?.weight) {
        score += option.weight;
        totalWeight += 3;
      }
    }
  });

  const averageScore = score / totalWeight;

  if (averageScore <= 1.5) {
    return {
      level: 'basic',
      confidence: 0.85,
      reasoning: 'Inizia con le funzionalità essenziali e aggiorna quando sarai pronto',
    };
  } else if (averageScore <= 2.5) {
    return {
      level: 'standard',
      confidence: 0.9,
      reasoning: 'Set di funzionalità bilanciato con spazio per crescere',
    };
  } else {
    return {
      level: 'advanced',
      confidence: 0.88,
      reasoning: 'Set completo di funzionalità per supportare i tuoi piani di crescita',
    };
  }
}

function calculateServiceRecommendation(responses: Record<string, any>): {
  services: string[];
  confidence: number;
  reasoning: string;
} {
  const recommendedServices: string[] = [];
  const painPoints = responses.current_pain_points;
  const priorities = responses.growth_priorities || [];
  const budget = responses.budget_allocation;

  // Map pain points to services
  const painPointServiceMap: Record<string, string[]> = {
    visibility: ['marketing-seo', 'marketing-social', 'photo-basic'],
    customer_management: ['integration-loyalty', 'integration-whatsapp'],
    marketing: ['marketing-social', 'marketing-ads', 'content-blog'],
    operational_efficiency: ['integration-whatsapp', 'integration-backup'],
    content_creation: ['content-menu', 'content-story', 'photo-basic'],
    automation: ['integration-whatsapp', 'marketing-social'],
  };

  // Add services based on pain points
  if (painPoints && painPointServiceMap[painPoints]) {
    recommendedServices.push(...painPointServiceMap[painPoints]);
  }

  // Add services based on priorities
  priorities.forEach((priority: string) => {
    switch (priority) {
      case 'better_photos':
        recommendedServices.push('photo-basic');
        break;
      case 'content_writing':
        recommendedServices.push('content-menu', 'content-story');
        break;
      case 'social_automation':
        recommendedServices.push('marketing-social');
        break;
      case 'seo_improvement':
        recommendedServices.push('marketing-seo');
        break;
      case 'customer_retention':
        recommendedServices.push('integration-loyalty');
        break;
      case 'review_management':
        recommendedServices.push('marketing-reviews');
        break;
      case 'advertising':
        recommendedServices.push('marketing-ads');
        break;
    }
  });

  // Filter based on budget
  let filteredServices = Array.from(new Set(recommendedServices)); // Remove duplicates

  if (budget === 'minimal') {
    filteredServices = filteredServices.slice(0, 2);
  } else if (budget === 'moderate') {
    filteredServices = filteredServices.slice(0, 4);
  }
  // For significant and premium, keep all recommendations

  return {
    services: filteredServices,
    confidence: 0.8,
    reasoning: 'Servizi selezionati in base alle tue priorità e budget',
  };
}

// Export configurations for each step
export const personaMatcherConfigs = {
  1: step1Config,
  2: step2Config,
  3: step3Config,
};

export function getPersonaMatcherConfig(step: PersonaMatcherStep): PersonaMatcherConfiguration {
  return personaMatcherConfigs[step];
}
