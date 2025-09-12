"use client";

import React from "react";
import { AptyPrimaryButton, AptySecondaryButton } from "@/components/apty/AptyButton";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, Plus } from "lucide-react";

interface Feature {
  text: string;
  included: boolean;
}

interface InheritedFeature {
  fromTier: string;
}

interface CardPosition {
  isFirst: boolean;
  isLast: boolean;
  isMiddle: boolean;
}

interface PricingCardProps {
  title: string;
  price?: number;
  features: Feature[];
  inheritedFeatures?: InheritedFeature;
  onCTAClick: () => void;
  badge?: "popular" | "enterprise";
  isCustomCard?: boolean;
  idealFor?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  position?: CardPosition;
  tierSlug?: string; // Add tier slug to determine button type
  isGroupHovered?: boolean; // Add group hover state
  onHoverChange?: (isHovered: boolean) => void; // Add hover callback
}

const cardVariants = {
  rest: {
    scale: 1,
    y: 0,
    zIndex: 1,
  },
  hover: {
    scale: 1.02,
    y: -30,
    zIndex: 40,
  },
};

const getRoundedClasses = (isCustomCard: boolean, position?: CardPosition, isHovered?: boolean) => {
  if (isCustomCard) return "rounded-apty-lg";
  if (!position) return "border border-apty-border-default";

  const { isFirst, isLast } = position;

  // When hovered, return full rounded corners
  if (isHovered) {
    if (isFirst) return "rounded-lg border border-apty-border-default";
    if (isLast) return "rounded-lg border border-apty-border-default";
    return "rounded-lg border border-apty-border-default";
  }

  // Default non-hovered state
  if (isFirst) return "rounded-l-lg border border-apty-border-default";
  if (isLast) return "rounded-r-lg border-l-0 border border-apty-border-default";
  return "border-l-0 border border-apty-border-default";
};

const getBorderClasses = (isCustomCard: boolean) => {
  return isCustomCard ? "shadow-apty-lg" : "shadow-apty-sm hover:shadow-apty-md";
};

const getStandardizedCTAText = (isCustomCard: boolean) => {
  if (isCustomCard) return "Trova Soluzione Perfetta";
  return "Configura Pacchetto";
};

const CardBadge: React.FC<{ badge?: "popular" | "enterprise" }> = () => {
  // Badges removed per design requirements
  return null;
};

const CardHeader: React.FC<{
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  isCustomCard?: boolean;
}> = ({ icon: IconComponent, title, isCustomCard }) => (
  <div className="h-[80px] flex items-center gap-3 mb-3">
    {IconComponent && (
      <motion.div
        className={`p-2 rounded-apty-lg shadow-apty-sm ${
          isCustomCard ? "bg-apty-bg-base/20" : "bg-apty-gradient-primary"
        }`}
        whileHover={{ scale: 1.1 }}
      >
        <IconComponent className={`w-6 h-6 ${isCustomCard ? "text-apty-text-inverse" : "text-apty-text-on-brand"}`} />
      </motion.div>
    )}
    <div className="flex-1">
      <h3
        className={`text-xl font-semibold leading-tight ${
          isCustomCard ? "text-apty-text-inverse" : "text-apty-text-primary"
        }`}
      >
        {title}
      </h3>
    </div>
  </div>
);

const CardIdealFor: React.FC<{ idealFor?: string; isCustomCard?: boolean }> = ({ idealFor, isCustomCard }) => (
  <div className="h-[60px] flex items-center mb-4">
    {idealFor && (
      <div className="w-full">
        <div
          className={`rounded-apty-lg p-3 text-center ${
            isCustomCard
              ? "bg-apty-bg-base/10 border border-apty-text-inverse/20"
              : "bg-apty-bg-base/5 border border-apty-border-default"
          }`}
        >
          <p className={`text-xs mb-1 ${isCustomCard ? "text-apty-text-inverse/80" : "text-apty-text-tertiary"}`}>
            Ideale per:
          </p>
          <p className={`text-sm font-medium ${isCustomCard ? "text-apty-text-inverse" : "text-apty-text-primary"}`}>
            {idealFor}
          </p>
        </div>
      </div>
    )}
  </div>
);

const CardButton: React.FC<{
  isCustomCard: boolean;
  onCTAClick: () => void;
  tierSlug?: string;
}> = ({ isCustomCard, onCTAClick, tierSlug }) => (
  <div className="flex items-center justify-center mb-4">
    {!isCustomCard ? (
      tierSlug === "pro" ? (
        <AptyPrimaryButton
          onClick={e => {
            e.stopPropagation();
            onCTAClick();
          }}
          className="w-full"
          size="lg"
        >
          {getStandardizedCTAText(false)}
        </AptyPrimaryButton>
      ) : (
        <AptySecondaryButton
          onClick={e => {
            e.stopPropagation();
            onCTAClick();
          }}
          className="w-full"
          size="lg"
        >
          {getStandardizedCTAText(false)}
        </AptySecondaryButton>
      )
    ) : (
      <button
        onClick={e => {
          e.stopPropagation();
          onCTAClick();
        }}
        className="w-full py-3 px-6 rounded-apty-lg font-semibold text-sm border-2 border-apty-text-inverse text-apty-text-inverse hover:bg-apty-text-inverse hover:text-apty-primary apty-transition"
      >
        {getStandardizedCTAText(true)}
      </button>
    )}
  </div>
);

const CardFeatures: React.FC<{
  features: Feature[];
  inheritedFeatures?: InheritedFeature;
  isCustomCard?: boolean;
}> = ({ features, inheritedFeatures, isCustomCard }) => (
  <div className="flex-1 overflow-y-auto">
    <hr className={`mb-3 ${isCustomCard ? "border-apty-text-inverse/20" : "border-apty-border-default"}`} />

    {inheritedFeatures && (
      <div className="flex items-center mb-2">
        <Check className={`w-4 h-4 mr-2 ${isCustomCard ? "text-apty-text-inverse" : "text-apty-success"}`} />
        <span className={`text-sm font-medium ${isCustomCard ? "text-apty-text-inverse" : "text-apty-text-secondary"}`}>
          Tutto da {inheritedFeatures.fromTier}
        </span>
      </div>
    )}

    {features.length > 0 && (
      <div className="space-y-2">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start">
            {inheritedFeatures ? (
              <Plus
                className={`w-4 h-4 mr-3 mt-0.5 flex-shrink-0 ${
                  isCustomCard ? "text-apty-accent" : "text-apty-primary"
                }`}
              />
            ) : (
              <Check
                className={`w-4 h-4 mr-3 mt-0.5 flex-shrink-0 ${
                  isCustomCard ? "text-apty-text-inverse" : "text-apty-success"
                }`}
              />
            )}
            <span
              className={`text-sm leading-relaxed ${
                isCustomCard ? "text-apty-text-inverse/90" : "text-apty-text-secondary"
              }`}
            >
              {feature.text}
            </span>
          </div>
        ))}
      </div>
    )}
  </div>
);

const PricingCardContent: React.FC<{
  badge?: "popular" | "enterprise";
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  isCustomCard: boolean;
  price?: number;
  idealFor?: string;
  onCTAClick: () => void;
  features: Feature[];
  inheritedFeatures?: InheritedFeature;
  tierSlug?: string;
}> = ({ badge, icon, title, isCustomCard, price, idealFor, onCTAClick, features, inheritedFeatures, tierSlug }) => (
  <>
    <CardBadge badge={badge} />
    <CardHeader icon={icon} title={title} isCustomCard={isCustomCard} />
    <CardIdealFor idealFor={idealFor} isCustomCard={isCustomCard} />
    <CardButton isCustomCard={isCustomCard} onCTAClick={onCTAClick} tierSlug={tierSlug} />
    <CardFeatures features={features} inheritedFeatures={inheritedFeatures} isCustomCard={isCustomCard} />
  </>
);

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  features,
  inheritedFeatures,
  onCTAClick,
  badge,
  isCustomCard = false,
  idealFor,
  icon,
  position,
  tierSlug,
  isGroupHovered = false,
  onHoverChange,
}) => {
  // Use group hover for connected cards, individual hover for custom card
  const shouldRoundCorners = isCustomCard ? false : isGroupHovered;

  return (
    <motion.div
      className={cn(
        "relative p-5 h-[530px] flex flex-col",
        isCustomCard ? "bg-apty-bg-inverse" : "bg-apty-bg-base/90 backdrop-blur-sm",
        getRoundedClasses(isCustomCard, position, shouldRoundCorners),
        getBorderClasses(isCustomCard),
        "md:transition-all md:duration-200 md:ease-out",
        "md:hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.25)]",
      )}
      style={{ position: "relative" }}
      variants={cardVariants}
      initial="rest"
      whileHover="hover"
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1],
      }}
      onMouseEnter={() => {
        if (onHoverChange && !isCustomCard) {
          onHoverChange(true);
        }
      }}
      onMouseLeave={() => {
        if (onHoverChange && !isCustomCard) {
          onHoverChange(false);
        }
      }}
    >
      <PricingCardContent
        badge={badge}
        icon={icon}
        title={title}
        isCustomCard={isCustomCard}
        price={price}
        idealFor={idealFor}
        onCTAClick={onCTAClick}
        features={features}
        inheritedFeatures={inheritedFeatures}
        tierSlug={tierSlug}
      />
    </motion.div>
  );
};

export default PricingCard;
