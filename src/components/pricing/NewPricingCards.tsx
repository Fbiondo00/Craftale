'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, Zap, ShoppingCart, Target, Loader2 } from 'lucide-react';
import PricingCard from './PricingCard';
import { useAuth } from '@/contexts/AuthContext';
import type { TierWithLevels } from '@/types/database-extended';

interface NewPricingCardsProps {
  onPersonaMatcherOpen: () => void;
  onTierSelect: (tier: string) => void;
  tiers?: TierWithLevels[];
  loading?: boolean;
  error?: string | null;
  trackTierSelection?: (tierId: string | number, tierSlug: string) => void;
}

// Map tier slugs to icons
const tierIcons: Record<string, any> = {
  starter: Globe,
  pro: Zap,
  ecommerce: ShoppingCart,
};

// Map tier slugs to badges
const tierBadges: Record<string, 'popular' | 'enterprise' | undefined> = {
  starter: undefined,
  pro: 'popular',
  ecommerce: 'enterprise',
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const NewPricingCards: React.FC<NewPricingCardsProps> = ({
  onPersonaMatcherOpen,
  onTierSelect,
  tiers = [],
  loading = false,
  error = null,
  trackTierSelection,
}) => {
  const { isAuthenticated, openAuthModal } = useAuth();
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [isGroupHovered, setIsGroupHovered] = useState(false);

  // Transform API data to card format
  const getCardData = () => {
    const tierCards = tiers.map((tier: TierWithLevels, index: number) => {
      // Get the minimum price from levels
      const minPrice = Math.min(...tier.levels.map(level => Number(level.price)));
      
      // Get features from the A level (base level)
      const baseLevel = tier.levels.find(level => level.level_code === 'A');
      const features = baseLevel?.features.map((feature: any) => {
        // Handle both string and object formats
        if (typeof feature === 'string') {
          return {
            text: feature,
            included: true
          };
        } else if (typeof feature === 'object' && feature.text) {
          return {
            text: feature.text,
            included: feature.included !== undefined ? feature.included : true
          };
        } else {
          return {
            text: String(feature),
            included: true
          };
        }
      }) || [];

      return {
        id: tier.slug,
        title: tier.name,
        price: minPrice,
        ctaText: 'Configura Pacchetto',
        icon: tierIcons[tier.slug] || Globe,
        badge: tierBadges[tier.slug],
        idealFor: tier.target_audience || '',
        features: features.slice(0, 5), // Show first 5 features
        inheritedFeatures: index > 0 ? { fromTier: tiers[index - 1].name } : undefined,
      };
    });

    // Add custom card
    const customCard = {
      id: 'custom',
      title: 'Soluzione Su Misura',
      ctaText: 'Trova Soluzione Perfetta',
      icon: Target,
      isCustomCard: true,
      idealFor: 'Progetti complessi e specifici',
      features: [
        { text: 'Analisi approfondita del business', included: true },
        { text: 'Consulenza strategica personalizzata', included: true },
        { text: 'Sviluppo funzionalità su misura', included: true },
        { text: 'Supporto dedicato continuo', included: true },
      ],
    };

    return [...tierCards, customCard];
  };

  const handleCTAClick = async (cardId: string) => {
    if (!isAuthenticated) {
      // Open auth modal with signup mode when user clicks on pricing CTA
      openAuthModal('signup');
    } else {
      // If authenticated, proceed with the normal flow
      if (cardId === 'custom') {
        onPersonaMatcherOpen();
      } else {
        // Track tier selection
        const tier = tiers.find(t => t.slug === cardId);
        if (tier) {
          if (trackTierSelection) {
      trackTierSelection(tier.id, tier.slug);
    }
        }
        setSelectedTier(cardId);
        onTierSelect(cardId);
      }
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-apty-primary" />
          <span className="ml-2 text-apty-text-tertiary">Caricamento prezzi...</span>
        </div>
      </div>
    );
  }

  if (error || tiers.length === 0) {
    // Fallback to static data if API fails
    return <NewPricingCardsFallback onPersonaMatcherOpen={onPersonaMatcherOpen} onTierSelect={onTierSelect} />;
  }

  const cardData = getCardData();

  const renderFirstThreeCards = () => (
    <div className='flex flex-col md:flex-row flex-1 md:overflow-visible'>
      {cardData.slice(0, 3).map((card, index) => (
        <motion.div
          key={card.id}
          variants={itemVariants}
          className={`flex-1 ${index > 0 ? 'md:-ml-px' : ''}`}
        >
          <PricingCard
            title={card.title}
            price={'price' in card ? card.price : undefined}
            features={card.features}
            inheritedFeatures={'inheritedFeatures' in card ? card.inheritedFeatures : undefined}
            onCTAClick={() => handleCTAClick(card.id)}
            badge={'badge' in card ? card.badge : undefined}
            isCustomCard={'isCustomCard' in card ? card.isCustomCard : false}
            idealFor={card.idealFor}
            icon={card.icon}
            tierSlug={card.id}
            position={{
              isFirst: index === 0,
              isLast: index === 2,
              isMiddle: index === 1,
            }}
            isGroupHovered={isGroupHovered}
            onHoverChange={setIsGroupHovered}
          />
        </motion.div>
      ))}
    </div>
  );

  const renderCustomCard = () => {
    const customCard = cardData[3];
    if (!customCard) return null;

    return (
      <motion.div key={customCard.id} variants={itemVariants} className='w-full lg:w-80 flex-shrink-0'>
        <PricingCard
          title={customCard.title}
          features={customCard.features}
          inheritedFeatures={undefined}
          onCTAClick={() => handleCTAClick(customCard.id)}
          badge={undefined}
          isCustomCard={true}
          idealFor={customCard.idealFor}
          icon={customCard.icon}
          tierSlug={customCard.id}
        />
      </motion.div>
    );
  };

  return (
    <div className='w-full max-w-7xl mx-auto px-4 md:overflow-visible'>
      <motion.div
        className='flex flex-col lg:flex-row gap-6 md:overflow-visible'
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        {renderFirstThreeCards()}
        {renderCustomCard()}
      </motion.div>
    </div>
  );
};

// Fallback component with static data
const NewPricingCardsFallback: React.FC<NewPricingCardsProps> = ({ onPersonaMatcherOpen, onTierSelect }) => {
  const { isAuthenticated, openAuthModal } = useAuth();
  const [isGroupHovered, setIsGroupHovered] = useState(false);
  
  const cardData = [
    {
      id: 'starter',
      title: 'Starter',
      price: 850,
      ctaText: 'Configura Pacchetto',
      icon: Globe,
      idealFor: 'Trattorie familiari',
      features: [
        { text: 'Presenza digitale professionale', included: true },
        { text: 'Menu digitale ottimizzato', included: true },
        { text: 'Google My Business e SEO locale', included: true },
        { text: 'Integrazione social media', included: true },
        { text: 'Supporto email dedicato', included: true },
      ],
    },
    {
      id: 'pro',
      title: 'Pro',
      price: 1800,
      ctaText: 'Configura Pacchetto',
      icon: Zap,
      badge: 'popular' as const,
      idealFor: 'Imprenditori moderni',
      inheritedFeatures: {
        fromTier: 'Starter',
      },
      features: [
        { text: 'Sistema prenotazioni e gestione clienti', included: true },
        { text: 'Menu interattivo avanzato', included: true },
        { text: 'Automazione SMS e email', included: true },
        { text: 'Analytics comportamentali', included: true },
        { text: 'Supporto prioritario', included: true },
      ],
    },
    {
      id: 'ecommerce',
      title: 'Ecommerce',
      price: 3500,
      ctaText: 'Configura Pacchetto',
      icon: ShoppingCart,
      badge: 'enterprise' as const,
      idealFor: 'Ristoranti upscale',
      inheritedFeatures: {
        fromTier: 'Pro',
      },
      features: [
        { text: 'Piattaforma e-commerce completa', included: true },
        { text: 'Gateway pagamenti multipli', included: true },
        { text: 'Integrazione corrieri nazionali', included: true },
        { text: 'Gestione ordini enterprise', included: true },
        { text: 'Account manager dedicato', included: true },
      ],
    },
    {
      id: 'custom',
      title: 'Soluzione Su Misura',
      ctaText: 'Trova Soluzione Perfetta',
      icon: Target,
      isCustomCard: true,
      idealFor: 'Progetti complessi e specifici',
      features: [
        { text: 'Analisi approfondita del business', included: true },
        { text: 'Consulenza strategica personalizzata', included: true },
        { text: 'Sviluppo funzionalità su misura', included: true },
        { text: 'Supporto dedicato continuo', included: true },
      ],
    },
  ];

  const handleCTAClick = (cardId: string) => {
    if (!isAuthenticated) {
      openAuthModal('signup');
    } else {
      if (cardId === 'custom') {
        onPersonaMatcherOpen();
      } else {
        onTierSelect(cardId);
      }
    }
  };

  return (
    <div className='w-full max-w-7xl mx-auto px-4 md:overflow-visible'>
      <motion.div
        className='flex flex-col lg:flex-row gap-6 md:overflow-visible'
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        <div className='flex flex-col md:flex-row flex-1 md:overflow-visible'>
          {cardData.slice(0, 3).map((card, index) => (
            <motion.div
              key={card.id}
              variants={itemVariants}
              className={`flex-1 ${index > 0 ? 'md:-ml-px' : ''}`}
            >
              <PricingCard
                title={card.title}
                price={card.price}
                features={card.features}
                inheritedFeatures={card.inheritedFeatures}
                onCTAClick={() => handleCTAClick(card.id)}
                badge={card.badge}
                isCustomCard={card.isCustomCard}
                idealFor={card.idealFor}
                icon={card.icon}
                tierSlug={card.id}
                position={{
                  isFirst: index === 0,
                  isLast: index === 2,
                  isMiddle: index === 1,
                }}
                isGroupHovered={isGroupHovered}
                onHoverChange={setIsGroupHovered}
              />
            </motion.div>
          ))}
        </div>
        <motion.div key={cardData[3].id} variants={itemVariants} className='w-full lg:w-80 flex-shrink-0'>
          <PricingCard
            title={cardData[3].title}
            features={cardData[3].features}
            inheritedFeatures={cardData[3].inheritedFeatures}
            onCTAClick={() => handleCTAClick(cardData[3].id)}
            badge={cardData[3].badge}
            isCustomCard={cardData[3].isCustomCard}
            idealFor={cardData[3].idealFor}
            icon={cardData[3].icon}
            tierSlug={cardData[3].id}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NewPricingCards;