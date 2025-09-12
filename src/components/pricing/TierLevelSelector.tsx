"use client";

import React from "react";
// removed , PricingLevel
import Tooltip from "../ui/Tooltip";
import type { TierWithLevels } from "@/types/database-extended";
import { motion } from "framer-motion";
import { Check, ChevronDown, Info, Loader2, X } from "lucide-react";

interface TierLevelSelectorProps {
  selectedTier: TierWithLevels;
  onLevelSelect: (tierSlug: string, levelCode: string) => void;
  onPersonaMatcherOpen: () => void;
  onBack?: () => void;
}

interface FeatureItem {
  name: string;
  value: boolean | string | number;
  description?: string;
}

interface TierFeatureValue {
  value: boolean | string | number;
  shortDescription?: string;
  longDescription?: string;
}

interface ValueRendererProps {
  value: boolean | string | number | TierFeatureValue;
}

const ValueRenderer: React.FC<ValueRendererProps> = ({ value }) => {
  // Handle TierFeatureValue object
  if (typeof value === "object" && value !== null && "value" in value) {
    const tierValue = value as TierFeatureValue;
    const displayValue = tierValue.value;

    // Create the content to display
    const content =
      typeof displayValue === "boolean" ? (
        displayValue ? (
          <Check className="w-5 h-5 text-apty-success mx-auto" />
        ) : (
          <X className="w-5 h-5 text-apty-text-disabled mx-auto" />
        )
      ) : (
        <span className="text-sm text-apty-text-secondary">{displayValue}</span>
      );

    // If there's tooltip content, wrap with Tooltip
    if (tierValue.shortDescription || tierValue.longDescription) {
      const tooltipContent = tierValue.longDescription || tierValue.shortDescription || "";

      return (
        <Tooltip content={tooltipContent}>
          <span className="border-b-2 border-dotted border-apty-border-strong hover:border-apty-primary cursor-help">
            {content}
          </span>
        </Tooltip>
      );
    }

    return <>{content}</>;
  }

  // Handle legacy boolean/string/number values
  if (typeof value === "boolean") {
    return value ? (
      <Check className="w-5 h-5 text-color-state-success-strong mx-auto" />
    ) : (
      <X className="w-5 h-5 text-color-disabled mx-auto" />
    );
  }

  if (typeof value === "number") {
    return <span className="text-sm text-apty-text-secondary">{value}</span>;
  }

  return <span className="text-sm text-color-secondary">{value}</span>;
};

interface FeatureNameProps {
  name: string;
  longDescription?: string;
}

const FeatureName: React.FC<FeatureNameProps> = ({ name, longDescription }) => {
  if (!longDescription) {
    return <span className="text-sm text-apty-text-secondary">{name}</span>;
  }

  return (
    <Tooltip content={longDescription}>
      <span className="text-sm text-apty-text-secondary border-b-2 border-dotted border-apty-border-strong hover:border-apty-primary cursor-help">
        {name}
      </span>
    </Tooltip>
  );
};

const TierLevelSelector: React.FC<TierLevelSelectorProps> = ({
  selectedTier,
  onLevelSelect,
  onPersonaMatcherOpen,
  onBack,
}) => {
  if (!selectedTier) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-apty-primary" />
      </div>
    );
  }

  // Sort levels by level_code (A, B, C)
  const sortedLevels = [...selectedTier.levels].sort((a, b) => a.level_code.localeCompare(b.level_code));

  // Map level codes to display names
  const levelNames: Record<string, string> = {
    A: "Base",
    B: "Standard",
    C: "Premium",
  };

  // Create feature comparison data with enhanced structure
  const getFeatureComparison = () => {
    // Define features with descriptions and values
    const featuresData = [
      {
        category: "Funzionalità Base",
        features: [
          {
            name: "Design Responsive",
            description: "Il tuo sito si adatta perfettamente a tutti i dispositivi",
            levels: {
              A: { value: true },
              B: { value: true },
              C: { value: true },
            },
          },
          {
            name: "Pagine Incluse",
            description: "Numero di pagine incluse nel pacchetto",
            levels: {
              A: {
                value: "5 pagine",
                shortDescription: "Home, Menu, Chi Siamo, Contatti, Gallery",
              },
              B: {
                value: "8 pagine",
                shortDescription: "Tutte del Base + Blog, Eventi, Prenotazioni",
              },
              C: { value: "Illimitate", shortDescription: "Nessun limite al numero di pagine" },
            },
          },
          {
            name: "Ottimizzazione SEO",
            description: "Livello di ottimizzazione per i motori di ricerca",
            levels: {
              A: { value: "Base", longDescription: "Meta tag, sitemap XML, robots.txt" },
              B: {
                value: "Avanzata",
                longDescription: "Base + Schema markup, ottimizzazione velocità, local SEO",
              },
              C: {
                value: "Professionale",
                longDescription: "Avanzata + Analisi keyword, contenuti ottimizzati, link building interno",
              },
            },
          },
        ],
      },
      {
        category: "Funzionalità Avanzate",
        features: [
          {
            name: "Sistema Prenotazioni",
            description: "Gestisci le prenotazioni direttamente dal tuo sito",
            levels: {
              A: { value: false },
              B: { value: true, shortDescription: "Sistema base con conferma email" },
              C: {
                value: true,
                shortDescription: "Sistema avanzato con gestione tavoli e disponibilità",
              },
            },
          },
          {
            name: "Integrazione Social",
            description: "Collega i tuoi profili social al sito",
            levels: {
              A: { value: "Link social" },
              B: { value: "Feed Instagram", shortDescription: "Mostra gli ultimi post Instagram" },
              C: {
                value: "Feed completo",
                shortDescription: "Instagram, Facebook, TripAdvisor integrati",
              },
            },
          },
          {
            name: "Analisi e Statistiche",
            description: "Monitora le performance del tuo sito",
            levels: {
              A: { value: "Google Analytics" },
              B: { value: "Analytics + Report mensili" },
              C: {
                value: "Dashboard dedicata",
                longDescription: "Dashboard personalizzata con KPI specifici per ristoranti",
              },
            },
          },
        ],
      },
      {
        category: "Supporto e Manutenzione",
        features: [
          {
            name: "Formazione",
            description: "Ore di formazione per gestire il sito",
            levels: {
              A: {
                value: "2 ore",
                shortDescription: "Formazione base su come aggiornare contenuti",
              },
              B: { value: "4 ore", shortDescription: "Formazione completa + materiale didattico" },
              C: {
                value: "8 ore",
                shortDescription: "Formazione avanzata + supporto continuativo",
              },
            },
          },
          {
            name: "Aggiornamenti",
            description: "Frequenza degli aggiornamenti tecnici",
            levels: {
              A: { value: "Trimestrali" },
              B: { value: "Mensili" },
              C: {
                value: "Settimanali",
                shortDescription: "Aggiornamenti proattivi e ottimizzazioni continue",
              },
            },
          },
          {
            name: "Supporto Tecnico",
            description: "Livello di assistenza tecnica",
            levels: {
              A: { value: "Email", shortDescription: "Risposta entro 48 ore" },
              B: { value: "Email + Telefono", shortDescription: "Risposta entro 24 ore" },
              C: {
                value: "Prioritario 24/7",
                shortDescription: "Supporto dedicato con SLA garantito",
              },
            },
          },
        ],
      },
    ];

    return featuresData;
  };

  const featureComparison = getFeatureComparison();

  return (
    <section className="py-12 bg-apty-bg-subtle">
      <div className="container mx-auto px-4">
        {/* Header section without white background */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-apty-heading text-apty-text-primary mb-4">
            <span className="text-apty-primary">Scegli</span> il piano perfetto per la tua attività
          </h2>
          <p className="text-lg text-apty-text-secondary max-w-3xl mx-auto mb-6">{selectedTier.description}</p>
          <div className="inline-flex items-center px-4 py-2 bg-apty-primary/10 rounded-full text-apty-primary mb-8">
            <Info className="h-4 w-4 mr-2" />
            Confronta i livelli del pacchetto {selectedTier.name} e scegli quello più adatto
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-apty-bg-base rounded-apty-xl shadow-apty-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-apty-bg-base">
                <tr>
                  <th className="px-6 py-6 text-left font-medium"></th>
                  {sortedLevels.map(level => (
                    <th
                      key={level.id}
                      className={`px-6 py-6 text-center ${
                        level.level_code === "B"
                          ? "bg-apty-tertiary/10 border-l-2 border-r-2 border-t-2 border-apty-tertiary/30 rounded-t-xl"
                          : ""
                      }`}
                    >
                      <div className="text-xl font-semibold text-apty-text-primary">{level.name}</div>
                      <div
                        className={`text-2xl font-bold mt-2 ${
                          level.level_code === "B" ? "text-apty-tertiary" : "text-apty-text-primary"
                        }`}
                      ></div>
                      <button
                        onClick={() => onLevelSelect(selectedTier.slug, level.level_code)}
                        className={`mt-4 apty-transition ${
                          level.level_code === "B"
                            ? "inline-flex items-center gap-2 px-6 py-2 rounded-lg bg-apty-gradient-primary text-apty-text-on-brand text-sm font-semibold shadow-md transition-all"
                            : level.level_code === "C"
                              ? "bg-apty-bg-inverse text-apty-text-inverse hover:bg-apty-bg-inverse/90 px-6 py-3 rounded-apty-lg text-sm font-medium"
                              : "bg-apty-bg-base border-2 border-apty-border-strong text-apty-text-primary hover:border-apty-primary hover:bg-apty-bg-hover px-6 py-3 rounded-apty-lg text-sm font-medium"
                        }`}
                      >
                        Scegli {level.name}
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {featureComparison.map((category, categoryIndex) => (
                  <React.Fragment key={categoryIndex}>
                    <tr key={categoryIndex}>
                      <td className="px-6 py-3 font-semibold text-apty-text-primary">{category.category}</td>
                      <td className="px-6 py-3"></td>
                      <td className="px-6 py-3 bg-apty-tertiary/10 border-l-2 border-r-2 border-apty-tertiary/30"></td>
                      <td className="px-6 py-3"></td>
                    </tr>
                    {category.features.map((feature, featureIndex) => {
                      const isLastFeature =
                        categoryIndex === featureComparison.length - 1 && featureIndex === category.features.length - 1;
                      return (
                        <tr key={featureIndex} className="group hover:bg-apty-tertiary/10">
                          <td className="px-6 py-4 bg-apty-bg-base group-hover:bg-apty-tertiary/10 border-b border-apty-border-subtle">
                            <FeatureName name={feature.name} longDescription={feature.description} />
                          </td>
                          {sortedLevels.map(level => {
                            const featureValue = (feature.levels as any)[level.level_code];
                            const isStandard = level.level_code === "B";

                            return (
                              <td
                                key={level.id}
                                className={`px-6 py-4 text-center border-b border-apty-border-subtle ${
                                  isStandard
                                    ? `bg-apty-tertiary/10 border-l-2 border-r-2 border-apty-tertiary/30 ${
                                        isLastFeature ? "border-b-2 border-b-apty-tertiary/30 rounded-b-xl" : ""
                                      }`
                                    : "bg-apty-bg-base group-hover:bg-apty-tertiary/10"
                                }`}
                              >
                                <ValueRenderer value={featureValue} />
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </React.Fragment>
                ))}
                {/* Bottom row with duplicate buttons */}
                <tr className="group hover:bg-apty-tertiary/10">
                  <td className="px-6 py-4 bg-apty-bg-base group-hover:bg-apty-tertiary/10 border-b border-apty-border-subtle"></td>
                  {sortedLevels.map(level => {
                    const isStandard = level.level_code === "B";
                    return (
                      <td
                        key={level.id}
                        className={`px-6 py-4 text-center border-b border-apty-border-subtle ${
                          isStandard
                            ? "bg-apty-tertiary/10 border-l-2 border-r-2 border-apty-tertiary/30"
                            : "bg-apty-bg-base group-hover:bg-apty-tertiary/10"
                        }`}
                      >
                        <button
                          onClick={() => onLevelSelect(selectedTier.slug, level.level_code)}
                          className={`${
                            level.level_code === "B"
                              ? "inline-flex items-center gap-2 px-6 py-2 rounded-lg bg-apty-gradient-primary text-apty-text-on-brand text-sm font-semibold shadow-md transition-all"
                              : level.level_code === "C"
                                ? "px-6 py-3 rounded-apty-lg text-sm font-medium bg-apty-bg-inverse text-apty-text-inverse hover:bg-apty-bg-inverse/90 apty-transition"
                                : "px-6 py-3 rounded-apty-lg text-sm font-medium bg-apty-bg-base border-2 border-apty-border-strong text-apty-text-primary hover:border-apty-primary hover:bg-apty-bg-hover apty-transition"
                          }`}
                        >
                          Scegli {levelNames[level.level_code]}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-12 text-center">
          <p className="text-apty-text-secondary mb-6">
            Non sei sicuro di quale livello scegliere? Il nostro team ti aiuterà a trovare la soluzione perfetta
          </p>
          <button
            onClick={onPersonaMatcherOpen}
            className="bg-apty-gradient-primary text-apty-text-on-brand px-8 py-4 rounded-apty-lg font-semibold hover:shadow-apty-brand-lg apty-transition transform hover:scale-105"
          >
            Ricevi Assistenza Personalizzata
          </button>
        </div>
      </div>
    </section>
  );
};

export default TierLevelSelector;
