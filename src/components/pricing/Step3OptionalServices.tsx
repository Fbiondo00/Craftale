"use client";

import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
//removed animate
import {
  BarChart3,
  //ChevronRight,
  Camera,
  Check,
  ChevronDown,
  PenTool,
  Sparkles,
  Wrench,
} from "lucide-react";

// =====================================
// TYPES AND INTERFACES
// =====================================

export type TierType = "starter" | "pro" | "ecommerce";

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
  description: string;
  icon: any;
  services: OptionalService[];
}

export interface CartItem {
  service: OptionalService;
  quantity: number;
}

export interface Step3OptionalServicesProps {
  selectedTier?: TierType;
  onServicesChange?: (services: OptionalService[]) => void;
  onTotalChange?: (total: number) => void;
  className?: string;
}

// =====================================
// OPTIONAL SERVICES DATA
// =====================================

const OPTIONAL_SERVICES_DATA: OptionalServiceCategory[] = [
  {
    id: "photography",
    name: "Fotografia Professionale",
    description: "Servizi fotografici per valorizzare il tuo ristorante",
    icon: Camera,
    services: [
      {
        id: "photo-basic",
        name: "Shooting Basic",
        description: "Servizio fotografico base con 20 foto professionali",
        category: "photography",
        price: 450,
        recurring: false,
        compatibleTiers: ["starter", "pro", "ecommerce"],
        features: [
          "20 foto professionali ad alta risoluzione",
          "Ritocco digitale base",
          "Consegna in 5 giorni lavorativi",
          "Licenza d'uso per web e social",
        ],
      },
      {
        id: "photo-premium",
        name: "Shooting Premium",
        description: "Servizio fotografico completo con 50+ foto",
        category: "photography",
        price: 850,
        recurring: false,
        compatibleTiers: ["pro", "ecommerce"],
        features: [
          "50+ foto professionali",
          "Shooting dell'ambiente e dei piatti",
          "Ritocco professionale avanzato",
          "Video promozionale breve (30 sec)",
          "Licenza d'uso estesa",
        ],
      },
      {
        id: "photo-monthly",
        name: "Aggiornamento Mensile",
        description: "Nuove foto ogni mese per contenuti sempre freschi",
        category: "photography",
        price: 250,
        recurring: true,
        compatibleTiers: ["pro", "ecommerce"],
        features: [
          "10-15 nuove foto al mese",
          "Focus su nuovi piatti e stagionalità",
          "Consegna entro 3 giorni",
          "Pianificazione calendario contenuti",
        ],
      },
    ],
  },
  {
    id: "content",
    name: "Creazione Contenuti",
    description: "Testi professionali e contenuti per il tuo sito",
    icon: PenTool,
    services: [
      {
        id: "copywriting-basic",
        name: "Copywriting Basic",
        description: "Testi ottimizzati per tutte le pagine principali",
        category: "content",
        price: 350,
        recurring: false,
        compatibleTiers: ["starter", "pro", "ecommerce"],
        features: [
          "Testi per tutte le pagine principali",
          "Ottimizzazione SEO di base",
          "2 round di revisioni inclusi",
          "Ricerca keywords",
        ],
      },
      {
        id: "menu-translation",
        name: "Traduzione Menu",
        description: "Menu tradotto in inglese e altre lingue",
        category: "content",
        price: 200,
        recurring: false,
        compatibleTiers: ["starter", "pro", "ecommerce"],
        features: [
          "Traduzione professionale in inglese",
          "Revisione da madrelingua",
          "Adattamento culturale",
          "Formato digitale pronto",
        ],
      },
      {
        id: "blog-management",
        name: "Gestione Blog",
        description: "Articoli mensili per migliorare la SEO",
        category: "content",
        price: 180,
        recurring: true,
        compatibleTiers: ["pro", "ecommerce"],
        features: [
          "2 articoli al mese",
          "Ricerca keywords approfondita",
          "Ottimizzazione SEO avanzata",
          "Promozione sui social",
        ],
      },
    ],
  },
  {
    id: "integrations",
    name: "Integrazioni Tecniche",
    description: "Sistemi avanzati per automatizzare il tuo business",
    icon: Wrench,
    services: [
      {
        id: "booking-system",
        name: "Sistema Prenotazioni",
        description: "Sistema completo per gestire le prenotazioni online",
        category: "integrations",
        price: 650,
        recurring: false,
        compatibleTiers: ["pro", "ecommerce"],
        features: [
          "Calendario prenotazioni in tempo reale",
          "Conferme automatiche via email/SMS",
          "Gestione liste d'attesa",
          "Dashboard amministratore",
          "Integrazione Google Calendar",
        ],
      },
      {
        id: "payment-integration",
        name: "Pagamenti Online",
        description: "Accetta pagamenti con carte e PayPal",
        category: "integrations",
        price: 450,
        recurring: false,
        compatibleTiers: ["ecommerce"],
        features: [
          "Gateway di pagamento sicuro",
          "Carte di credito/debito",
          "PayPal e Apple Pay",
          "Fatturazione automatica",
          "PCI DSS compliant",
        ],
      },
      {
        id: "pos-integration",
        name: "Integrazione POS",
        description: "Sincronizza menu e ordini con il tuo sistema cassa",
        category: "integrations",
        price: 550,
        recurring: false,
        compatibleTiers: ["ecommerce"],
        features: [
          "Sincronizzazione automatica menu",
          "Gestione inventario in tempo reale",
          "Ordini online al POS",
          "Rapporti vendite unificati",
        ],
      },
    ],
  },
  {
    id: "marketing",
    name: "Marketing Digitale",
    description: "Promuovi il tuo ristorante e attira nuovi clienti",
    icon: BarChart3,
    services: [
      {
        id: "seo-monthly",
        name: "SEO Avanzato",
        description: "Ottimizzazione continua per i motori di ricerca",
        category: "marketing",
        price: 280,
        recurring: true,
        compatibleTiers: ["pro", "ecommerce"],
        features: [
          "Audit SEO mensile",
          "Ottimizzazione contenuti",
          "Link building locale",
          "Monitoraggio posizioni",
          "Report mensili dettagliati",
        ],
      },
      {
        id: "social-management",
        name: "Gestione Social Media",
        description: "Gestione professionale dei tuoi profili social",
        category: "marketing",
        price: 420,
        recurring: true,
        compatibleTiers: ["pro", "ecommerce"],
        features: [
          "Gestione Instagram e Facebook",
          "12 post al mese",
          "Stories e contenuti video",
          "Risposta a commenti e messaggi",
          "Analytics e reportistica",
        ],
      },
      {
        id: "google-ads",
        name: "Campagne Google Ads",
        description: "Pubblicità mirata per attrarre clienti locali",
        category: "marketing",
        price: 350,
        recurring: true,
        compatibleTiers: ["pro", "ecommerce"],
        features: [
          "Setup campagne ottimizzate",
          "Targeting geografico preciso",
          "Gestione budget pubblicitario",
          "Monitoraggio conversioni",
          "Ottimizzazione continua",
        ],
        defaultSelected: false,
      },
    ],
  },
];

// =====================================
// ANIMATION VARIANTS
// =====================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0.6,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const cardVariants = {
  idle: { scale: 1, y: 0 },
  hover: { scale: 1.02, y: -2 },
  tap: { scale: 0.98 },
};

// =====================================
// CATEGORY HEADER COMPONENT
// =====================================

interface CategoryHeaderProps {
  category: OptionalServiceCategory;
  isOpen: boolean;
  onToggle: () => void;
  selectedCount: number;
  totalServices: number;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = memo(
  ({ category, isOpen, onToggle, selectedCount, totalServices }) => {
    const IconComponent = category.icon;

    return (
      <motion.button
        onClick={onToggle}
        className={cn(
          "w-full p-6 rounded-xl border-2 transition-all duration-300",
          "flex items-center justify-between group",
          isOpen
            ? "border-brand-tertiary/40 bg-brand-tertiary/10 shadow-md"
            : "border-color-default hover:border-brand-tertiary/30 hover:bg-color-subtle",
        )}
        variants={cardVariants}
        initial="idle"
        whileHover="hover"
        whileTap="tap"
      >
        <div className="flex items-center space-x-4">
          <div
            className={cn(
              "p-3 rounded-lg transition-colors",
              isOpen
                ? "bg-brand-tertiary/30 text-brand-tertiary"
                : "bg-color-muted text-color-tertiary group-hover:bg-brand-tertiary/20",
            )}
          >
            <IconComponent className="w-6 h-6" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold text-color-primary">{category.name}</h3>
            <p className="text-sm text-color-tertiary">{category.description}</p>
            {selectedCount > 0 && (
              <div className="flex items-center mt-1">
                <Check className="w-4 h-4 text-color-state-success-strong mr-1" />
                <span className="text-sm text-color-state-success-strong font-medium">
                  {selectedCount} di {totalServices} selezionati
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {selectedCount > 0 && (
            <div className="bg-brand-tertiary text-white text-xs font-bold px-2 py-1 rounded-full">{selectedCount}</div>
          )}
          <ChevronDown
            className={cn("w-5 h-5 text-color-disabled transition-transform duration-200", isOpen && "rotate-180")}
          />
        </div>
      </motion.button>
    );
  },
);

CategoryHeader.displayName = "CategoryHeader";

// =====================================
// SERVICE CARD COMPONENT
// =====================================

interface ServiceCardProps {
  service: OptionalService;
  isSelected: boolean;
  isCompatible: boolean;
  onToggle: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = memo(({ service, isSelected, isCompatible, onToggle }) => {
  const priceDisplay = service.recurring ? `€${service.price}/mese` : `€${service.price}`;

  return (
    <motion.div
      className={cn(
        "p-6 rounded-lg border-2 transition-all duration-300",
        "hover:shadow-md cursor-pointer",
        !isCompatible && "opacity-50 cursor-not-allowed",
        isSelected && isCompatible
          ? "border-brand-tertiary/90 bg-brand-tertiary/10 shadow-lg"
          : isCompatible
            ? "border-color-default hover:border-brand-secondary/40"
            : "border-color-default",
      )}
      onClick={isCompatible ? onToggle : undefined}
      whileHover={isCompatible ? { scale: 1.02 } : {}}
      whileTap={isCompatible ? { scale: 0.98 } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-color-primary mb-1">{service.name}</h4>
          <p className="text-sm text-color-tertiary mb-3">{service.description}</p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-right">
            <div className="text-xl font-bold text-color-primary">{priceDisplay}</div>
            {service.recurring && <div className="text-xs text-color-muted">ricorrente</div>}
          </div>

          <div
            className={cn(
              "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
              isSelected && isCompatible ? "border-brand-tertiary/90 bg-brand-tertiary/90" : "border-color-strong",
            )}
          >
            {isSelected && isCompatible && <Check className="w-4 h-4 text-white" />}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {service.features.map((feature, index) => (
          <div key={index} className="flex items-start space-x-2">
            <Check className="w-4 h-4 text-color-state-success mt-0.5 flex-shrink-0" />
            <span className="text-sm text-color-secondary">{feature}</span>
          </div>
        ))}
      </div>

      {!isCompatible && (
        <div className="mt-4 p-3 bg-color-state-warning-bg border border-yellow-200 rounded-lg">
          <p className="text-sm text-color-state-warning-text">
            <span className="font-medium">Non compatibile</span> con il tier selezionato
          </p>
        </div>
      )}
    </motion.div>
  );
});

ServiceCard.displayName = "ServiceCard";

// =====================================
// CART SUMMARY COMPONENT
// =====================================

interface CartSummaryProps {
  selectedServices: OptionalService[];
  onClearAll: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = memo(({ selectedServices, onClearAll }) => {
  const oneTimeTotal = selectedServices.filter(s => !s.recurring).reduce((sum, s) => sum + s.price, 0);

  const monthlyTotal = selectedServices.filter(s => s.recurring).reduce((sum, s) => sum + s.price, 0);

  if (selectedServices.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-apty-bg-elevated rounded-xl border-2 border-brand-tertiary/30 p-6 shadow-lg"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-color-primary flex items-center">
          <Sparkles className="w-5 h-5 text-brand-tertiary mr-2" />
          Servizi Selezionati
        </h3>
        <button
          onClick={onClearAll}
          className="text-sm text-color-muted hover:text-color-state-error-strong transition-colors"
        >
          Rimuovi tutti
        </button>
      </div>

      <div className="space-y-3 mb-4">
        {selectedServices.map(service => (
          <div key={service.id} className="flex justify-between items-center">
            <span className="text-sm text-color-secondary">{service.name}</span>
            <span className="text-sm font-medium text-color-primary">
              €{service.price}
              {service.recurring ? "/mese" : ""}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-color-default pt-4 space-y-2">
        {oneTimeTotal > 0 && (
          <div className="flex justify-between items-center">
            <span className="font-medium text-color-primary">Costo unico:</span>
            <span className="text-lg font-bold text-color-primary">€{oneTimeTotal.toLocaleString("it-IT")}</span>
          </div>
        )}

        {monthlyTotal > 0 && (
          <div className="flex justify-between items-center">
            <span className="font-medium text-color-primary">Costo mensile:</span>
            <span className="text-lg font-bold text-brand-tertiary">€{monthlyTotal.toLocaleString("it-IT")}/mese</span>
          </div>
        )}
      </div>
    </motion.div>
  );
});

CartSummary.displayName = "CartSummary";

// =====================================
// MAIN COMPONENT
// =====================================

const Step3OptionalServices: React.FC<Step3OptionalServicesProps> = ({
  selectedTier = "pro",
  onServicesChange,
  onTotalChange,
  className,
}) => {
  const [selectedServices, setSelectedServices] = useState<OptionalService[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(["photography"]));

  // Initialize with default selected services
  useEffect(() => {
    const defaultServices = OPTIONAL_SERVICES_DATA.flatMap(category => category.services).filter(
      service => service.defaultSelected && service.compatibleTiers.includes(selectedTier),
    );

    setSelectedServices(defaultServices);
  }, [selectedTier]);

  // Notify parent of changes
  useEffect(() => {
    onServicesChange?.(selectedServices);

    const oneTimeTotal = selectedServices.filter(s => !s.recurring).reduce((sum, s) => sum + s.price, 0);
    const monthlyTotal = selectedServices.filter(s => s.recurring).reduce((sum, s) => sum + s.price, 0);

    onTotalChange?.(oneTimeTotal + monthlyTotal);
  }, [selectedServices, onServicesChange, onTotalChange]);

  const toggleCategory = useCallback((categoryId: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  }, []);

  const toggleService = useCallback(
    (service: OptionalService) => {
      if (!service.compatibleTiers.includes(selectedTier)) return;

      setSelectedServices(prev => {
        const isSelected = prev.some(s => s.id === service.id);
        if (isSelected) {
          return prev.filter(s => s.id !== service.id);
        } else {
          return [...prev, service];
        }
      });
    },
    [selectedTier],
  );

  const clearAllServices = useCallback(() => {
    setSelectedServices([]);
  }, []);

  const getSelectedCountForCategory = (categoryId: string): number => {
    const category = OPTIONAL_SERVICES_DATA.find(c => c.id === categoryId);
    if (!category) return 0;

    return selectedServices.filter(service => category.services.some(s => s.id === service.id)).length;
  };

  return (
    <div className={cn("space-y-8", className)}>
      <div className="text-center">
        <h2 className="text-3xl font-bold text-color-primary mb-4">Servizi Aggiuntivi</h2>
        <p className="text-lg text-color-tertiary max-w-3xl mx-auto">
          Personalizza la tua presenza digitale con servizi professionali aggiuntivi. Seleziona solo ciò di cui hai
          bisogno.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
            {OPTIONAL_SERVICES_DATA.map(category => (
              <motion.div key={category.id} variants={itemVariants} className="space-y-4">
                <CategoryHeader
                  category={category}
                  isOpen={expandedCategories.has(category.id)}
                  onToggle={() => toggleCategory(category.id)}
                  selectedCount={getSelectedCountForCategory(category.id)}
                  totalServices={category.services.length}
                />

                <AnimatePresence>
                  {expandedCategories.has(category.id) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-4">
                        {category.services.map(service => (
                          <ServiceCard
                            key={service.id}
                            service={service}
                            isSelected={selectedServices.some(s => s.id === service.id)}
                            isCompatible={service.compatibleTiers.includes(selectedTier)}
                            onToggle={() => toggleService(service)}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <CartSummary selectedServices={selectedServices} onClearAll={clearAllServices} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3OptionalServices;
