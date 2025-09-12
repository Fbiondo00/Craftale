"use client";

import { useState } from "react";
import PersonaMatcher from "./PersonaMatcher";
import RecommendationDisplay from "./RecommendationDisplay";
// removed serviceTiers,
import TierCards from "./TierCards";
//removed  RecommendationResult
import { getPersonaRecommendation } from "@/data/pricingData";
import { cn } from "@/lib/utils";
import { PersonaMatcherForm, PricingState } from "@/types/pricing";
import { motion } from "framer-motion";
import { ArrowDown, Building, Check, Crown, Sparkles, Star, Target, Users, Zap } from "lucide-react";

interface PricingTier {
  id: string;
  name: string;
  level: "BASE" | "STANDARD" | "PREMIUM";
  price: number;
  timeline: string;
  pages: number;
  targetPersona: string[];
  features: string[];
  additionalFeatures?: string[];
  setupIncluded: string[];
  support: string;
  icon: any;
  popular?: boolean;
  enterprise?: boolean;
}

const pricingTiers: PricingTier[] = [
  // TIER 1: PRESENZA DIGITALE ESSENZIALE
  {
    id: "tier-1a",
    name: "TIER 1A - BASE",
    level: "BASE",
    price: 850,
    timeline: "2-3 settimane",
    pages: 4,
    targetPersona: ["Trattorie Familiari"],
    features: [
      "4 pagine essenziali (Home, Menu, Chi Siamo, Contatti)",
      "Design responsive mobile-friendly",
      "Mappa Google integrata",
      "Modulo contatti base con auto-risposta",
      "Gallery fotografica base (15 foto)",
      "SEO di base (meta tags, structured data)",
      "Hosting e dominio .it per 1 anno incluso",
      "SSL certificate incluso",
    ],
    setupIncluded: ["2 round di revisioni"],
    support: "Email support",
    icon: Check,
  },
  {
    id: "tier-1b",
    name: "TIER 1B - STANDARD",
    level: "STANDARD",
    price: 1250,
    timeline: "3-4 settimane",
    pages: 6,
    targetPersona: ["Trattorie Familiari", "Specialisti Regionali"],
    features: [
      "6 pagine complete con storytelling",
      "Menu PDF scaricabile professionale",
      "Integrazione social media basica",
      "Form contatti avanzato",
      "Gallery espansa (25 foto) con categorie",
      "SEO ottimizzato per ricerche locali",
      "Google My Business setup completo",
      "Recensioni Google integrate automaticamente",
    ],
    setupIncluded: ["3 round di revisioni", "Tutorial gestione (2 ore)"],
    support: "Email + Phone support",
    icon: Star,
    popular: true,
  },
  {
    id: "tier-1c",
    name: "TIER 1C - PREMIUM",
    level: "PREMIUM",
    price: 1650,
    timeline: "4-5 settimane",
    pages: 8,
    targetPersona: ["Specialisti Regionali"],
    features: [
      "8 pagine specializzate con blog/news",
      "Menu interattivo con descrizioni gourmet",
      "QR code menu personalizzato",
      "Video presentazione ristorante",
      "Newsletter signup con automation",
      "Google Analytics setup e training",
      "Ottimizzazione velocità e Core Web Vitals",
      "3 mesi supporto post-lancio incluso",
    ],
    setupIncluded: ["4 round di revisioni", "Formazione team (4 ore)"],
    support: "Priority support",
    icon: Crown,
  },
  // TIER 2: ESPERIENZA INTERATTIVA MODERNA
  {
    id: "tier-2a",
    name: "TIER 2A - BASE",
    level: "BASE",
    price: 1800,
    timeline: "4-5 settimane",
    pages: 6,
    targetPersona: ["Nuovi Imprenditori"],
    features: [
      "Sistema prenotazioni integrato",
      "Menu digitale interattivo con filtri allergie",
      "Calendario disponibilità real-time",
      "Conferme automatiche via email/SMS",
      "Gallery professionale categorizzata",
      "SEO avanzato per ricerche competitive",
      "Google Analytics tracking conversioni",
      "Mobile optimization superiore (PWA-ready)",
    ],
    setupIncluded: ["3 round di revisioni"],
    support: "Priority support",
    icon: Zap,
  },
  {
    id: "tier-2b",
    name: "TIER 2B - STANDARD",
    level: "STANDARD",
    price: 2400,
    timeline: "6-7 settimane",
    pages: 8,
    targetPersona: ["Nuovi Imprenditori", "Specialisti Regionali Advanced"],
    features: [
      "Sistema prenotazioni avanzato multi-slot",
      "Integrazione delivery (2 piattaforme)",
      "Menu dinamico con disponibilità real-time",
      "Blog professionale per content marketing",
      "Email marketing automation",
      "Chat WhatsApp integrata con bot",
      "Analytics dashboard personalizzata",
      "Review management system interno",
    ],
    setupIncluded: ["4 round di revisioni", "Training completo (9 ore)"],
    support: "Premium support",
    icon: Star,
    popular: true,
  },
  {
    id: "tier-2c",
    name: "TIER 2C - PREMIUM",
    level: "PREMIUM",
    price: 3200,
    timeline: "8-10 settimane",
    pages: 10,
    targetPersona: ["Nuovi Imprenditori Advanced"],
    features: [
      "Ecosistema digitale completo",
      "AI chatbot per FAQ e prenotazioni",
      "Customer portal personalizzato",
      "Programma fedeltà digitale avanzato",
      "Social media management incluso (2 post/settimana)",
      "Mobile app web-based (PWA)",
      "Integration API per software gestionali",
      "6 mesi supporto dedicato post-lancio",
    ],
    setupIncluded: ["5 round di revisioni", "Account manager assegnato"],
    support: "Enterprise support",
    icon: Crown,
  },
  // TIER 3: E-COMMERCE E VENDITA ONLINE
  {
    id: "tier-3a",
    name: "TIER 3A - BASE",
    level: "BASE",
    price: 3500,
    timeline: "8-10 settimane",
    pages: 8,
    targetPersona: ["Ristoranti Upscale"],
    features: [
      "E-commerce completo prodotti ristorante",
      "Sistema ordini con slot delivery/pickup",
      "Payment gateway multi-opzione",
      "Integrazione corrieri nazionali",
      "Customer account con storico ordini",
      "Gestione coupon e promozioni",
      "Review system per prodotti",
      "Mobile app web-based shopping",
    ],
    setupIncluded: ["5 round di revisioni", "Training e-commerce (12 ore)"],
    support: "Enterprise support",
    icon: Building,
  },
  {
    id: "tier-3b",
    name: "TIER 3B - STANDARD",
    level: "STANDARD",
    price: 4800,
    timeline: "10-12 settimane",
    pages: 10,
    targetPersona: ["Ristoranti Upscale", "Catene"],
    features: [
      "E-commerce multi-categoria completo",
      "Sistema subscription/abbonamenti",
      "B2B section per partnerships",
      "Email marketing automation e-commerce",
      "AI recommendation engine",
      "Multi-currency per clientela internazionale",
      "Business intelligence dashboard",
      "Account manager dedicato primo anno",
    ],
    setupIncluded: ["6 round di revisioni", "Training multi-level (20 ore)"],
    support: "Enterprise Premium",
    icon: Crown,
    popular: true,
  },
  {
    id: "tier-3c",
    name: "TIER 3C - PREMIUM",
    level: "PREMIUM",
    price: 6500,
    timeline: "12-16 settimane",
    pages: 12,
    targetPersona: ["Catene", "Enterprise"],
    features: [
      "Ecosistema omnichannel completo",
      "App mobile nativa iOS/Android",
      "AI chatbot avanzato 24/7",
      "Sistema loyalty unificato cross-channel",
      "Business intelligence con machine learning",
      "Gestione multi-location centralizzata",
      "API ecosystem completo",
      "Dedicated development team",
    ],
    setupIncluded: ["Unlimited revisioni", "12 mesi supporto dedicato"],
    support: "White Glove Support",
    icon: Building,
    enterprise: true,
  },
];

const optionalServices = [
  {
    category: "Fotografia",
    items: [
      { name: "Servizio Base (20 foto)", price: 350 },
      { name: "Servizio Esteso (40 foto + video)", price: 550 },
      { name: "Sessione Stagionale", price: 250 },
    ],
  },
  {
    category: "Copywriting",
    items: [
      { name: "Menu Descriptions", price: 200 },
      { name: "Storia Ristorante", price: 150 },
      { name: "Blog Setup (5 articoli)", price: 300 },
      { name: "Traduzione Menu inglese", price: 120 },
    ],
  },
  {
    category: "Funzionalità Tecniche",
    items: [
      { name: "WhatsApp Business integration", price: 80 },
      { name: "Carte Fedeltà digitale", price: 200 },
      { name: "POS Integration", price: 500 },
      { name: "App Mobile proprietaria", price: 1200 },
    ],
  },
  {
    category: "Marketing",
    items: [
      { name: "Setup Social Media", price: 150 },
      { name: "SEO Locale Avanzato", price: 300 },
      { name: "Google Ads Setup", price: 200 },
      { name: "Social Media Management", price: 400, recurring: true },
    ],
  },
];

export default function PricingSection() {
  const [state, setState] = useState<PricingState>({
    selectedTier: undefined,
    selectedPackage: undefined,
    selectedOptionals: [],
    personaMatcherOpen: false,
    formData: {},
    recommendation: undefined,
    showComparison: false,
    expandedTier: undefined,
    currentStep: "browse",
  });

  const handleTierSelect = (tierId: string) => {
    setState(prev => ({
      ...prev,
      selectedTier: tierId,
      currentStep: "customize",
    }));
  };

  const handleTierExpand = (tierId: string) => {
    setState(prev => ({
      ...prev,
      expandedTier: prev.expandedTier === tierId ? undefined : tierId,
    }));
  };

  const handlePersonaMatcherSubmit = (formData: PersonaMatcherForm) => {
    const recommendation = getPersonaRecommendation(formData);
    setState(prev => ({
      ...prev,
      formData,
      recommendation,
      personaMatcherOpen: false,
      currentStep: "recommendation",
    }));
  };

  const handleRecommendationAccept = () => {
    if (state.recommendation) {
      setState(prev => ({
        ...prev,
        selectedTier: prev.recommendation?.recommendedTier.id,
        selectedPackage: prev.recommendation?.recommendedPackage.id,
        currentStep: "quote",
      }));
    }
  };

  const handleRecommendationModify = () => {
    setState(prev => ({
      ...prev,
      currentStep: "customize",
    }));
  };

  const handleStartOver = () => {
    setState({
      selectedTier: undefined,
      selectedPackage: undefined,
      selectedOptionals: [],
      personaMatcherOpen: false,
      formData: {},
      recommendation: undefined,
      showComparison: false,
      expandedTier: undefined,
      currentStep: "browse",
    });
  };

  const openPersonaMatcher = () => {
    setState(prev => ({ ...prev, personaMatcherOpen: true }));
  };

  const closePersonaMatcher = () => {
    setState(prev => ({ ...prev, personaMatcherOpen: false }));
  };

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-brand-secondary/10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-brand-secondary/20 text-brand-secondary px-4 py-2 rounded-full mb-6">
            <Target className="w-5 h-5" />
            <span className="font-medium">Specializzati per Ristoranti Italiani</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-color-primary mb-6">
            Soluzioni Web su Misura
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary via-brand-tertiary to-brand-accent">
              per il Tuo Ristorante
            </span>
          </h2>

          <p className="text-xl text-color-tertiary max-w-3xl mx-auto mb-8">
            Dalle trattorie familiari ai ristoranti upscale, abbiamo la soluzione perfetta per far crescere la tua
            attività online. Scopri quale pacchetto fa per te.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={openPersonaMatcher}
              className="bg-gradient-to-r from-brand-secondary to-brand-tertiary text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-brand-secondary hover:to-brand-tertiary transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Trova la Soluzione Perfetta
            </button>

            <button
              onClick={() => {
                document.getElementById("pricing-tiers")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className="bg-white border-2 border-color-strong text-color-secondary px-6 py-4 rounded-xl font-medium hover:border-brand-secondary/40 hover:text-brand-secondary transition-all duration-200 flex items-center gap-2"
            >
              <ArrowDown className="w-5 h-5" />
              Esplora i Pacchetti
            </button>
          </div>
        </motion.div>

        {/* Current Step Display */}
        {state.currentStep === "recommendation" && state.recommendation && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
            <RecommendationDisplay
              recommendation={state.recommendation}
              onAccept={handleRecommendationAccept}
              onModify={handleRecommendationModify}
              onStartOver={handleStartOver}
            />
          </motion.div>
        )}

        {/* Pricing Tiers */}
        {(state.currentStep === "browse" || state.currentStep === "customize") && (
          <div id="pricing-tiers">
            {/* Step Indicator */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
              <div className="inline-flex items-center gap-4 bg-white rounded-full px-6 py-3 shadow-lg border border-color-default">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                    state.currentStep === "browse"
                      ? "bg-brand-secondary text-white"
                      : "bg-color-state-success text-white",
                  )}
                >
                  {state.currentStep === "browse" ? "1" : "✓"}
                </div>
                <span className="text-color-secondary font-medium">
                  {state.currentStep === "browse" ? "Esplora i Pacchetti" : "Personalizza la Tua Scelta"}
                </span>

                <div className="w-16 h-px bg-gray-300" />

                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                    state.currentStep === "customize"
                      ? "bg-brand-secondary text-white"
                      : "bg-gray-300 text-color-tertiary",
                  )}
                >
                  2
                </div>
                <span
                  className={cn(
                    "font-medium",
                    state.currentStep === "customize" ? "text-color-secondary" : "text-color-disabled",
                  )}
                >
                  Richiedi Preventivo
                </span>
              </div>
            </motion.div>

            {/* Tier Cards Component */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-16">
              <TierCards />
            </motion.div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-brand-secondary via-brand-tertiary to-brand-accent rounded-2xl p-8 text-white">
                <div className="max-w-2xl mx-auto">
                  <Users className="w-12 h-12 mx-auto mb-4 opacity-90" />
                  <h3 className="text-2xl font-bold mb-4">Non Sai Quale Scegliere?</h3>
                  <p className="text-white/90 mb-6">
                    Rispondi a 5 semplici domande e ti consiglieremo la soluzione perfetta per il tuo tipo di ristorante
                    e i tuoi obiettivi.
                  </p>
                  <button
                    onClick={openPersonaMatcher}
                    className="bg-white text-brand-secondary px-8 py-3 rounded-xl font-semibold hover:bg-color-subtle transition-colors duration-200 inline-flex items-center gap-2"
                  >
                    <Sparkles className="w-5 h-5" />
                    Trova la Soluzione Perfetta
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Persona Matcher Modal */}
        <PersonaMatcher
          isOpen={state.personaMatcherOpen}
          onClose={closePersonaMatcher}
          onSubmit={handlePersonaMatcherSubmit}
          step={1}
        />

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 pt-16 border-t border-color-default"
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-brand-secondary mb-2">50+</div>
              <div className="text-color-tertiary">Ristoranti Serviti</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand-secondary mb-2">+300%</div>
              <div className="text-color-tertiary">Incremento Medio Prenotazioni</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand-secondary mb-2">98%</div>
              <div className="text-color-tertiary">Clienti Soddisfatti</div>
            </div>
          </div>
        </motion.div>

        {/* FAQ Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-color-primary mb-4">Domande Frequenti</h3>
          <p className="text-color-tertiary mb-6">Hai dubbi? Ecco le risposte alle domande più comuni</p>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-color-subtle text-left">
              <h4 className="font-semibold text-color-primary mb-2">Quanto tempo serve per il mio sito?</h4>
              <p className="text-color-tertiary text-sm">
                I tempi variano da 2-3 settimane per soluzioni essenziali a 4-6 settimane per piattaforme e-commerce
                complete.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-color-subtle text-left">
              <h4 className="font-semibold text-color-primary mb-2">Posso aggiungere funzionalità dopo?</h4>
              <p className="text-color-tertiary text-sm">
                Assolutamente! Tutti i nostri siti sono progettati per crescere con la tua attività.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
