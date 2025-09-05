// =====================================
// STEP 4 QUOTE REQUEST - TYPE DEFINITIONS
// =====================================
// Complete type definitions for the Step 4 "Richiedi Preventivo" workflow
// Following pricing module patterns and maintaining consistency with existing types

export type CompletionType = 'complete_journey' | 'ai_assisted_skip';
export type TimelineUrgency = 'asap' | 'flexible' | 'specific_date';
export type MeetingType = 'online' | 'in_person';
export type QuoteStatus = 'submitted' | 'in_progress' | 'quoted' | 'accepted' | 'rejected' | 'under_review' | 'expired';

// =====================================
// USER DATA TYPES
// =====================================

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  companyVat?: string;
  companyAddress?: string;
  companyCity?: string;
  companyProvince?: string;
  companyPostalCode?: string;
  industry?: string;
  websiteUrl?: string;
}

// =====================================
// PRICING CONFIGURATION TYPES
// =====================================

export interface SelectedOptionalService {
  serviceId: string;
  quantity: number;
  unitPriceEur: number;
}

export interface PricingConfiguration {
  selectedTier: string;
  selectedLevel: string;
  basePriceEur: number;
  optionalServices: SelectedOptionalService[];
  totalCalculatedPriceEur: number;
}

// =====================================
// AI CHAT HISTORY TYPES
// =====================================

export interface AIQuestionResponse {
  questionText: string;
  responseValue: string;
  responseText: string;
}

export interface AIRecommendationResult {
  success: boolean;
  reason?: string;
  message?: string;
  recommendedTier?: string;
  recommendedLevel?: string;
  recommendedServices?: string[];
}

export interface AIChatStep {
  stepNumber: number;
  questionSetName: string;
  responses: AIQuestionResponse[];
  recommendationResult: AIRecommendationResult;
}

export interface PartialSelections {
  consideredTier?: string;
  consideredLevel?: string;
  viewedServices: string[];
}

// =====================================
// PROJECT DETAILS TYPES
// =====================================

export interface ProjectDetails {
  restaurantType: string;
  timeline: TimelineUrgency;
  specificDeadline?: string;
  budgetFlexibility: string;
}

// =====================================
// MEETING REQUEST TYPES
// =====================================

export interface PreferredSlot {
  date: string; // YYYY-MM-DD format
  timeSlot: string; // e.g., '09:00-10:00'
  preferenceOrder: number; // 1 = first choice, 2 = second choice, etc.
}

export interface MeetingRequest {
  meetingType: MeetingType;
  preferredSlots: PreferredSlot[];
  estimatedDuration: number; // minutes
  specialRequests?: string;
}

// =====================================
// COMPLETE QUOTE REQUEST TYPE
// =====================================

export interface QuoteRequest {
  // Metadata
  quoteId: string;
  submissionDate: string;
  completionType: CompletionType;
  status: QuoteStatus;

  // User information
  userData: UserData;

  // Project details
  projectDetails: ProjectDetails;

  // Meeting scheduling
  meetingRequest: MeetingRequest;

  // Pricing configuration (complete journey only)
  pricingConfiguration?: PricingConfiguration;

  // AI assistance data (ai_assisted_skip only)
  aiChatHistory?: AIChatStep[];
  partialSelections?: PartialSelections;

  // Additional context
  priority: boolean; // True if needs urgent handling
  estimatedProjectValue: number; // Calculated estimate in EUR
  internalNotes?: string; // For admin use
}

// =====================================
// FORM VALIDATION TYPES
// =====================================

export interface FormValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: FormValidationError[];
}

// =====================================
// COMPONENT PROPS TYPES
// =====================================

export interface QuoteFormProps {
  completionType: CompletionType;
  initialData?: Partial<QuoteRequest>;
  onSubmit: (quoteRequest: QuoteRequest) => void;
  onCancel: () => void;
}

export interface StepComponentProps {
  data: Partial<QuoteRequest>;
  onUpdate: (updates: Partial<QuoteRequest>) => void;
  onNext: () => void;
  onPrevious: () => void;
  errors?: FormValidationError[];
}

// =====================================
// CONSTANTS AND ENUMS
// =====================================

export const RESTAURANT_TYPE_LABELS: Record<string, string> = {
  'trattoria-familiare': 'Trattoria Familiare',
  'nuovo-imprenditore': 'Nuovo Imprenditore',
  'upscale-affermato': 'Ristorante Upscale Affermato',
  'catena-franchising': 'Catena/Franchising',
  'specialista-regionale': 'Specialista Regionale',
};

export const ITALIAN_PROVINCES = [
  'AG',
  'AL',
  'AN',
  'AO',
  'AQ',
  'AR',
  'AP',
  'AT',
  'AV',
  'BA',
  'BT',
  'BL',
  'BN',
  'BG',
  'BI',
  'BO',
  'BZ',
  'BS',
  'BR',
  'CA',
  'CL',
  'CB',
  'CI',
  'CE',
  'CT',
  'CZ',
  'CH',
  'CO',
  'CS',
  'CR',
  'KR',
  'CN',
  'EN',
  'FM',
  'FE',
  'FI',
  'FG',
  'FC',
  'FR',
  'GE',
  'GO',
  'GR',
  'IM',
  'IS',
  'SP',
  'LT',
  'LE',
  'LC',
  'LI',
  'LO',
  'LU',
  'MC',
  'MN',
  'MS',
  'MT',
  'VS',
  'ME',
  'MI',
  'MO',
  'MB',
  'NA',
  'NO',
  'NU',
  'OG',
  'OT',
  'OR',
  'PD',
  'PA',
  'PR',
  'PV',
  'PG',
  'PU',
  'PE',
  'PC',
  'PI',
  'PT',
  'PN',
  'PZ',
  'PO',
  'RG',
  'RA',
  'RC',
  'RE',
  'RI',
  'RN',
  'RM',
  'RO',
  'SA',
  'SS',
  'SV',
  'SI',
  'SR',
  'SO',
  'TA',
  'TE',
  'TR',
  'TO',
  'TP',
  'TN',
  'TV',
  'TS',
  'UD',
  'VA',
  'VE',
  'VB',
  'VC',
  'VR',
  'VV',
  'VI',
  'VT',
];

export const BUDGET_RANGES = [
  { value: 'flexible', label: 'Flessibile (seguirò la raccomandazione)' },
  { value: 'under-2000', label: 'Fino a €2.000' },
  { value: '2000-5000', label: '€2.000 - €5.000' },
  { value: '5000-10000', label: '€5.000 - €10.000' },
  { value: 'over-10000', label: 'Oltre €10.000' },
];

export const AVAILABLE_TIME_SLOTS = [
  '09:00-10:00',
  '10:00-11:00',
  '11:00-12:00',
  '14:00-15:00',
  '15:00-16:00',
  '16:00-17:00',
  '17:00-18:00',
];

// =====================================
// UI STATE TYPES
// =====================================

export interface QuoteFormState {
  currentStep: number;
  totalSteps: number;
  isSubmitting: boolean;
  validationErrors: FormValidationError[];
  completedSteps: Set<number>;
}

export interface CalendarState {
  selectedDate?: string;
  availableSlots: string[];
  selectedSlots: PreferredSlot[];
  isLoading: boolean;
}
