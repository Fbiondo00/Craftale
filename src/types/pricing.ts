// Pricing Experience Types - Based on TIER.txt Analysis
export interface BuyerPersona {
  id: string;
  name: string;
  icon: string;
  description: string;
  characteristics: string[];
  budget: {
    min: number;
    max: number;
  };
  digitalMaturity: 'low' | 'medium' | 'high';
  painPoints: string[];
  motivations: string[];
  recommendedTier: string;
  recommendedPackage: string;
}

export interface ServiceTier {
  id: string;
  name: string;
  tagline: string;
  description: string;
  targetPersonas: string[];
  packages: ServicePackage[];
  features: TierFeature[];
  idealFor: string;
  timeline: string;
}

export interface ServicePackage {
  id: string;
  name: string;
  level: 'base' | 'standard' | 'premium';
  price: number;
  description: string;
  pages: number;
  coreFeatures: string[];
  timeline: string;
  revisions: number;
  support: string;
  popular?: boolean;
  recommended?: boolean;
}

export interface TierFeature {
  id: string;
  name: string;
  description: string;
  included: boolean;
  highlight?: boolean;
}

export interface OptionalService {
  id: string;
  category: 'photography' | 'copywriting' | 'technical' | 'marketing' | 'integration' | 'premium';
  name: string;
  description: string;
  price: number;
  unit?: string; // 'monthly', 'yearly', 'one-time'
  popular?: boolean;
  tierRecommendations: string[];
}

export interface PersonaMatcherForm {
  businessType: 'trattoria-familiare' | 'nuovo-imprenditore' | 'upscale-affermato' | 'catena-franchising' | 'specialista-regionale';
  operationLength: 'new' | '1-3-years' | '3-10-years' | '10plus-years';
  currentWebsite: 'none' | 'basic' | 'advanced' | 'needs-upgrade';
  primaryGoals: string[];
  budget: 'under-1500' | '1500-3000' | '3000-5000' | '5000plus';
  location: 'rural' | 'suburban' | 'urban' | 'tourist-area';
  digitalComfort: 'low' | 'medium' | 'high';
  services: string[];
}

export interface RecommendationResult {
  matchedPersona: BuyerPersona;
  recommendedTier: ServiceTier;
  recommendedPackage: ServicePackage;
  optionalServices: OptionalService[];
  totalEstimate: {
    base: number;
    withRecommendedOptions: number;
    monthly?: number;
  };
  confidence: number;
  reasoning: string[];
  alternatives: {
    tier: ServiceTier;
    package: ServicePackage;
    reason: string;
  }[];
}

export interface PricingState {
  selectedTier?: string;
  selectedPackage?: string;
  selectedOptionals: string[];
  personaMatcherOpen: boolean;
  formData: Partial<PersonaMatcherForm>;
  recommendation?: RecommendationResult;
  showComparison: boolean;
  expandedTier?: string;
  currentStep: 'browse' | 'form' | 'recommendation' | 'customize' | 'quote';
}

export interface TierCardProps {
  tier: ServiceTier;
  isSelected?: boolean;
  isExpanded?: boolean;
  onSelect: (tierId: string) => void;
  onExpand: (tierId: string) => void;
  showPersonaMatch?: boolean;
}

export interface PersonaMatcherProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: PersonaMatcherForm) => void;
  currentData?: Partial<PersonaMatcherForm>;
}

export interface RecommendationDisplayProps {
  recommendation: RecommendationResult;
  onAccept: () => void;
  onModify: () => void;
  onStartOver: () => void;
}

export interface OptionalServicesProps {
  optionals: OptionalService[];
  selectedIds: string[];
  recommendedIds: string[];
  onToggle: (optionalId: string) => void;
  tierFilter?: string;
} 