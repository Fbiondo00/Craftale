"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import AIGuidanceButton from "./AIGuidanceButton";
import { CartSummary } from "./CartSummary";
import { ServiceCategoryHeader } from "./ServiceCategoryHeader";
import { ServiceToggleCard } from "./ServiceToggleCard";
import type { OptionalServiceWithAvailability as ApiOptionalService } from "@/types/database-extended";
import { motion } from "framer-motion";
import { ChevronDown, Loader2 } from "lucide-react";

interface ServiceToggleCardsProps {
  onPersonaMatcherOpen?: () => void;
  onBack?: () => void;
  onServicesChange?: (services: ApiOptionalService[]) => void;
  initialSelectedServices?: ApiOptionalService[];
  onProceed?: () => void;
  services: ApiOptionalService[];
  trackServiceToggle?: (serviceId: string | number, selected: boolean) => void;
}

interface CategoryState {
  category: {
    id: string;
    name: string;
    icon: string;
    gradient: { from: string; to: string };
    defaultExpanded: boolean;
    order: number;
  };
  services: ApiOptionalService[];
  isOpen: boolean;
  selectedServices: ApiOptionalService[];
}

// Category ID normalization (backend inconsistencies -> UI canonical IDs)
const normalizeCategoryId = (raw?: string | null): string => {
  if (!raw) return "other";
  const id = raw.toLowerCase().trim();
  switch (id) {
    case "integration":
    case "technical":
      return "integrations";
    case "copywriting":
      return "content";
    case "marketing_visibility":
    case "visibility":
    case "seo":
    case "marketing-seo":
      return "marketing";
    default:
      return id;
  }
};

// Map categories to icons and gradients (canonical IDs)
const categoryConfig = {
  photography: {
    name: "Fotografia Professionale",
    icon: "Camera",
    gradient: { from: "#a855f7", to: "#ec4899" }, // purple-500 to pink-500
    defaultExpanded: true,
    order: 1,
  },
  content: {
    name: "Contenuti & Copywriting",
    icon: "FileText",
    gradient: { from: "#3b82f6", to: "#06b6d4" }, // blue-500 to cyan-500
    defaultExpanded: true,
    order: 2,
  },
  integrations: {
    name: "Integrazioni",
    icon: "Plug",
    gradient: { from: "#22c55e", to: "#10b981" }, // green-500 to emerald-500
    defaultExpanded: false,
    order: 3,
  },
  marketing: {
    name: "Marketing & SEO",
    icon: "Target",
    gradient: { from: "#f97316", to: "#ef4444" }, // orange-500 to red-500
    defaultExpanded: false,
    order: 4,
  },
};

const ServiceToggleCards = ({
  onPersonaMatcherOpen,
  onBack,
  onServicesChange,
  initialSelectedServices = [],
  onProceed,
  services,
  trackServiceToggle,
}: ServiceToggleCardsProps) => {
  const [categories, setCategories] = useState<CategoryState[]>([]);

  // Group services by category
  const categorizedServices = useMemo(() => {
    const grouped = services.reduce<Record<string, ApiOptionalService[]>>((acc, service) => {
      const normalized = normalizeCategoryId(service.category as string);
      if (!acc[normalized]) acc[normalized] = [];
      acc[normalized].push(service);
      return acc;
    }, {});

    return Object.entries(grouped)
      .filter(([categoryId, list]) => list.length > 0 && categoryConfig[categoryId as keyof typeof categoryConfig])
      .map(([categoryId, categoryServices]) => {
        const config = categoryConfig[categoryId as keyof typeof categoryConfig];
        const selectedServicesForCategory = categoryServices.filter(service =>
          initialSelectedServices.some(s => s.id === service.id),
        );
        return {
          category: { id: categoryId, ...config },
          services: categoryServices,
          isOpen: config.defaultExpanded,
          selectedServices: selectedServicesForCategory,
        } as CategoryState;
      })
      .sort((a, b) => a.category.order - b.category.order);
  }, [services, initialSelectedServices]);

  // Initialize or merge categories without losing open/closed state after user interaction
  useEffect(() => {
    setCategories(prev => {
      if (prev.length === 0) return categorizedServices; // first mount
      // Merge to retain isOpen & current selections
      return categorizedServices.map(nextCat => {
        const existing = prev.find(p => p.category.id === nextCat.category.id);
        if (!existing) return nextCat;
        return {
          ...nextCat,
          isOpen: existing.isOpen, // preserve toggle state
          selectedServices: existing.selectedServices, // preserve current selections
        };
      });
    });
  }, [categorizedServices]);

  // Call onServicesChange when selected services change (but not on initial mount)
  const isInitialMount = useRef(true);
  const lastReportedIdsRef = useRef<string>("");
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (onServicesChange) {
      const allSelected = categories.flatMap(cat => cat.selectedServices);
      const ids = allSelected
        .map(s => String(s.id))
        .sort()
        .join(",");
      // If the selected IDs haven't changed since last report, skip notifying
      if (ids === lastReportedIdsRef.current) return;
      lastReportedIdsRef.current = ids;
      // Use setTimeout to defer the call to the next tick
      setTimeout(() => {
        onServicesChange(allSelected);
      }, 0);
    }
  }, [categories]);

  const toggleCategory = (categoryId: string) => {
    setCategories(prev => prev.map(cat => (cat.category.id === categoryId ? { ...cat, isOpen: !cat.isOpen } : cat)));
  };

  const handleServiceToggle = (categoryId: string, service: ApiOptionalService) => {
    // Check if service is currently selected before updating state
    const currentCategory = categories.find(cat => cat.category.id === categoryId);
    const isCurrentlySelected = currentCategory?.selectedServices.some(s => s.id === service.id) || false;

    // Track service toggle outside of state updater
    if (trackServiceToggle) {
      trackServiceToggle(service.id, !isCurrentlySelected);
    }

    setCategories(prev => {
      const newCategories = prev.map(cat => {
        if (cat.category.id !== categoryId) return cat;

        const isSelected = cat.selectedServices.some(s => s.id === service.id);
        const newSelectedServices = isSelected
          ? cat.selectedServices.filter(s => s.id !== service.id)
          : [...cat.selectedServices, service];

        return {
          ...cat,
          selectedServices: newSelectedServices,
        };
      });

      return newCategories;
    });
  };

  const selectedCount = categories.reduce((sum, cat) => sum + cat.selectedServices.length, 0);

  if (!services || services.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-brand-secondary" />
        <span className="ml-2 text-color-tertiary">Caricamento servizi...</span>
      </div>
    );
  }

  return (
    <div>
      {/* Header Section */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-color-primary mb-4">Personalizza con Servizi Aggiuntivi</h2>
        <p className="text-xl text-color-tertiary max-w-3xl mx-auto">
          Migliora il tuo pacchetto con servizi professionali su misura per il tuo ristorante
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Service Categories */}
        <div className="lg:col-span-2 space-y-6">
          {categories.map(categoryState => (
            <motion.div
              key={categoryState.category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-apty-bg-elevated rounded-2xl shadow-md overflow-hidden"
            >
              <ServiceCategoryHeader
                category={categoryState.category}
                isOpen={categoryState.isOpen}
                selectedCount={categoryState.selectedServices.length}
                totalCount={categoryState.services.length}
                onToggle={() => toggleCategory(categoryState.category.id)}
              />

              <motion.div
                initial={false}
                animate={{
                  height: categoryState.isOpen ? "auto" : 0,
                  opacity: categoryState.isOpen ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="p-6 space-y-4">
                  {categoryState.services.map(service => (
                    <ServiceToggleCard
                      key={service.id}
                      service={service}
                      isSelected={categoryState.selectedServices.some(s => s.id === service.id)}
                      onToggle={() => handleServiceToggle(categoryState.category.id, service)}
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6 transform-none">
            <CartSummary
              /* totalPrice removed */
              totalPrice={0}
              selectedCount={selectedCount}
              onProceed={onProceed}
              selectedServices={categories.flatMap(cat => cat.selectedServices)}
              onPersonaMatcherOpen={onPersonaMatcherOpen}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceToggleCards;
