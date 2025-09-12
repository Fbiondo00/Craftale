"use client";

import { useState } from "react";
// removed ServiceTier
import { cn } from "@/lib/utils";
import { TierCardProps } from "@/types/pricing";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, ChevronDown, ChevronUp, Clock, Star, Users } from "lucide-react";

export default function TierCard({
  tier,
  isSelected = false,
  isExpanded = false,
  onSelect,
  onExpand,
  //showPersonaMatch = false
}: Readonly<TierCardProps>) {
  const [hoveredPackage, setHoveredPackage] = useState<string | null>(null);

  const priceRange = `€${Math.min(...tier.packages.map(p => p.price))} - €${Math.max(...tier.packages.map(p => p.price))}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "relative group bg-white rounded-2xl border-2 transition-all duration-300 overflow-hidden",
        isSelected
          ? "border-brand-secondary/90 shadow-2xl scale-105"
          : "border-color-default hover:border-brand-secondary/40 hover:shadow-xl hover:scale-102",
      )}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-secondary/10 via-brand-tertiary/10 to-brand-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Tier Header */}
      <div className="relative p-6 border-b border-color-subtle">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-color-primary mb-2">{tier.name}</h3>
            <p className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary via-brand-tertiary to-brand-accent mb-3">
              {tier.tagline}
            </p>
            <p className="text-color-tertiary mb-4">{tier.description}</p>

            {/* Price Range */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl font-bold text-color-primary">{priceRange}</span>
              <span className="text-color-muted">una tantum</span>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center gap-4 text-sm text-color-tertiary">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{tier.timeline}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{tier.targetPersonas.length} tipi di clienti</span>
              </div>
            </div>
          </div>

          {/* Expand/Collapse Button */}
          <button
            onClick={() => onExpand(tier.id)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-color-muted hover:bg-brand-secondary/20 transition-colors duration-200"
          >
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-color-tertiary" />
            ) : (
              <ChevronDown className="w-5 h-5 text-color-tertiary" />
            )}
          </button>
        </div>

        {/* Ideal For */}
        <div className="mt-4 p-3 bg-gradient-to-r from-brand-secondary/10 to-brand-tertiary/10 rounded-lg">
          <p className="text-sm font-medium text-brand-secondary">💡 Ideale per: {tier.idealFor}</p>
        </div>
      </div>

      {/* Expandable Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            {/* Package Options */}
            <div className="p-6 border-b border-color-subtle">
              <h4 className="text-lg font-semibold text-color-primary mb-4">Scegli il tuo pacchetto:</h4>

              <div className="grid gap-4">
                {tier.packages.map(pkg => (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    onMouseEnter={() => setHoveredPackage(pkg.id)}
                    onMouseLeave={() => setHoveredPackage(null)}
                    className={cn(
                      "relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200",
                      hoveredPackage === pkg.id
                        ? "border-brand-secondary/40 bg-brand-secondary/10"
                        : "border-color-default bg-white hover:border-color-strong",
                    )}
                  >
                    {/* Package Badges */}
                    <div className="flex items-center gap-2 mb-2">
                      {pkg.popular && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
                          <Star className="w-3 h-3" />
                          Più Popolare
                        </span>
                      )}
                      {pkg.recommended && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-color-state-success-subtle text-color-state-success-text text-xs font-medium rounded-full">
                          <Check className="w-3 h-3" />
                          Consigliato
                        </span>
                      )}
                    </div>

                    {/* Package Details */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h5 className="text-lg font-semibold text-color-primary mb-1">{pkg.name}</h5>
                        <p className="text-color-tertiary text-sm mb-3">{pkg.description}</p>

                        {/* Package Stats */}
                        <div className="grid grid-cols-2 gap-2 text-sm text-color-tertiary mb-3">
                          <div>📄 {pkg.pages} pagine</div>
                          <div>🔄 {pkg.revisions} revisioni</div>
                          <div>⏰ {pkg.timeline}</div>
                          <div>🆘 {pkg.support}</div>
                        </div>

                        {/* Core Features Preview */}
                        <div className="space-y-1">
                          {pkg.coreFeatures.slice(0, 3).map(feature => (
                            <div key={feature} className="flex items-center gap-2 text-sm text-color-secondary">
                              <Check className="w-3 h-3 text-color-state-success flex-shrink-0" />
                              <span>{feature}</span>
                            </div>
                          ))}
                          {pkg.coreFeatures.length > 3 && (
                            <div className="text-sm text-brand-secondary font-medium">
                              +{pkg.coreFeatures.length - 3} altre funzionalità...
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Price and CTA */}
                      <div className="text-right ml-4">
                        <div className="text-2xl font-bold text-color-primary mb-2">
                          €{pkg.price.toLocaleString("it-IT")}
                        </div>
                        <button
                          onClick={() => onSelect(tier.id)}
                          className={cn(
                            "inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200",
                            hoveredPackage === pkg.id
                              ? "bg-brand-secondary text-white shadow-lg"
                              : "bg-color-muted text-color-secondary hover:bg-brand-secondary/20",
                          )}
                        >
                          Scegli
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Features Comparison */}
            <div className="p-6">
              <h4 className="text-lg font-semibold text-color-primary mb-4">Cosa include questo tier:</h4>

              <div className="grid gap-3">
                {tier.features.map(feature => (
                  <div
                    key={feature.id}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg transition-colors duration-200",
                      feature.included
                        ? "bg-color-state-success-bg border border-color-state-success-border"
                        : "bg-color-subtle border border-color-default",
                      feature.highlight && feature.included ? "ring-2 ring-green-300" : "",
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-center justify-center w-6 h-6 rounded-full",
                        feature.included ? "bg-color-state-success text-white" : "bg-gray-300 text-color-tertiary",
                      )}
                    >
                      {feature.included ? <Check className="w-4 h-4" /> : <span className="text-xs">×</span>}
                    </div>

                    <div className="flex-1">
                      <div className={cn("font-medium", feature.included ? "text-color-primary" : "text-color-muted")}>
                        {feature.name}
                        {feature.highlight && feature.included && (
                          <span className="ml-2 text-xs bg-color-state-warning-subtle text-color-state-warning-text px-2 py-1 rounded-full">
                            ⭐ Punto di forza
                          </span>
                        )}
                      </div>
                      <div className={cn("text-sm", feature.included ? "text-color-tertiary" : "text-color-disabled")}>
                        {feature.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Action (when collapsed) */}
      {!isExpanded && (
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-color-tertiary">{tier.packages.length} pacchetti disponibili</div>
            <div className="flex gap-2">
              <button
                onClick={() => onExpand(tier.id)}
                className="px-4 py-2 text-brand-secondary hover:text-brand-secondary font-medium transition-colors duration-200"
              >
                Vedi dettagli
              </button>
              <button
                onClick={() => onSelect(tier.id)}
                className="px-4 py-2 bg-gradient-to-r from-brand-secondary to-brand-tertiary text-white rounded-lg hover:from-brand-secondary hover:to-brand-tertiary transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Inizia ora
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
