'use client';

import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { 
  Check, 
  ChevronDown, 
  ChevronRight, 
  Sparkles,
  Camera,
  PenTool,
  Wrench,
  BarChart3
} from 'lucide-react';

// Simple animate function for smooth transitions
const animateValue = (start: number, end: number, duration: number, onUpdate: (value: number) => void) => {
  const startTime = performance.now();
  
  const update = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / (duration * 1000), 1);
    
    // Easing function (ease-out)
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    const currentValue = start + (end - start) * easedProgress;
    
    onUpdate(currentValue);
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  };
  
  requestAnimationFrame(update);
};

// ============================================================================
// GLOWING EFFECT COMPONENT (Reused from Step4QuoteRequest)
// ============================================================================

interface GlowingEffectProps {
  blur?: number;
  inactiveZone?: number;
  proximity?: number;
  spread?: number;
  variant?: "default" | "white";
  glow?: boolean;
  className?: string;
  disabled?: boolean;
  movementDuration?: number;
  borderWidth?: number;
}

const GlowingEffect = memo(
  ({
    blur = 0,
    inactiveZone = 0.7,
    proximity = 0,
    spread = 20,
    variant = "default",
    glow = false,
    className,
    movementDuration = 2,
    borderWidth = 1,
    disabled = true,
  }: GlowingEffectProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const lastPosition = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef<number>(0);

    const handleMove = useCallback(
      (e?: MouseEvent | { x: number; y: number }) => {
        if (!containerRef.current) return;

        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }

        animationFrameRef.current = requestAnimationFrame(() => {
          const element = containerRef.current;
          if (!element) return;

          const { left, top, width, height } = element.getBoundingClientRect();
          const mouseX = e?.x ?? lastPosition.current.x;
          const mouseY = e?.y ?? lastPosition.current.y;

          if (e) {
            lastPosition.current = { x: mouseX, y: mouseY };
          }

          const center = [left + width * 0.5, top + height * 0.5];
          const distanceFromCenter = Math.hypot(
            mouseX - center[0],
            mouseY - center[1]
          );
          const inactiveRadius = 0.5 * Math.min(width, height) * inactiveZone;

          if (distanceFromCenter < inactiveRadius) {
            element.style.setProperty("--active", "0");
            return;
          }

          const isActive =
            mouseX > left - proximity &&
            mouseX < left + width + proximity &&
            mouseY > top - proximity &&
            mouseY < top + height + proximity;

          element.style.setProperty("--active", isActive ? "1" : "0");

          if (!isActive) return;

          const currentAngle =
            parseFloat(element.style.getPropertyValue("--start")) || 0;
          let targetAngle =
            (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) /
              Math.PI +
            90;

          const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
          const newAngle = currentAngle + angleDiff;

          animateValue(currentAngle, newAngle, movementDuration, (value) => {
            element.style.setProperty("--start", String(value));
          });
        });
      },
      [inactiveZone, proximity, movementDuration]
    );

    useEffect(() => {
      if (disabled) return;

      const handleScroll = () => handleMove();
      const handlePointerMove = (e: PointerEvent) => handleMove(e);

      window.addEventListener("scroll", handleScroll, { passive: true });
      document.body.addEventListener("pointermove", handlePointerMove, {
        passive: true,
      });

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        window.removeEventListener("scroll", handleScroll);
        document.body.removeEventListener("pointermove", handlePointerMove);
      };
    }, [handleMove, disabled]);

    return (
      <>
        <div
          className={cn(
            "pointer-events-none absolute -inset-px hidden rounded-[inherit] border opacity-0 transition-opacity",
            glow && "opacity-100",
            variant === "white" && "border-white",
            disabled && "!block"
          )}
        />
        <div
          ref={containerRef}
          style={
            {
              "--blur": `${blur}px`,
              "--spread": spread,
              "--start": "0",
              "--active": "0",
              "--glowingeffect-border-width": `${borderWidth}px`,
              "--repeating-conic-gradient-times": "5",
              "--gradient":
                variant === "white"
                  ? `repeating-conic-gradient(
                  from 236.84deg at 50% 50%,
                  var(--black),
                  var(--black) calc(25% / var(--repeating-conic-gradient-times))
                )`
                  : `radial-gradient(circle, #4f46e5 10%, #4f46e500 20%),
                radial-gradient(circle at 40% 40%, #9333ea 5%, #9333ea00 15%),
                radial-gradient(circle at 60% 60%, #ec4899 10%, #ec489900 20%), 
                radial-gradient(circle at 40% 60%, #4f46e5 10%, #4f46e500 20%),
                repeating-conic-gradient(
                  from 236.84deg at 50% 50%,
                  #4f46e5 0%,
                  #9333ea calc(25% / var(--repeating-conic-gradient-times)),
                  #ec4899 calc(50% / var(--repeating-conic-gradient-times)), 
                  #4f46e5 calc(75% / var(--repeating-conic-gradient-times)),
                  #4f46e5 calc(100% / var(--repeating-conic-gradient-times))
                )`,
            } as React.CSSProperties
          }
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity",
            glow && "opacity-100",
            blur > 0 && "blur-[var(--blur)] ",
            className,
            disabled && "!hidden"
          )}
        >
          <div
            className={cn(
              "glow",
              "rounded-[inherit]",
              'after:content-[""] after:rounded-[inherit] after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))]',
              "after:[border:var(--glowingeffect-border-width)_solid_transparent]",
              "after:[background:var(--gradient)] after:[background-attachment:fixed]",
              "after:opacity-[var(--active)] after:transition-opacity after:duration-300",
              "after:[mask-clip:padding-box,border-box]",
              "after:[mask-composite:intersect]",
              "after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]"
            )}
          />
        </div>
      </>
    );
  }
);

GlowingEffect.displayName = "GlowingEffect";

// ============================================================================
// SERVICE TYPES AND INTERFACES
// ============================================================================

interface ServiceOption {
  id: string;
  name: string;
  description: string;
  price: string;
  selected: boolean;
}

interface ServiceCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  gradient: string;
  services: ServiceOption[];
  isOpen: boolean;
}

// ============================================================================
// AI GUIDANCE BUTTON COMPONENT
// ============================================================================

const AIGuidanceButton = () => {
  return (
    <motion.div
      className="relative rounded-xl overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <GlowingEffect
        spread={30}
        glow={false}
        disabled={true}
        proximity={48}
        inactiveZone={0.01}
        borderWidth={2}
      />
      
      <motion.button
        className="relative w-full rounded-xl p-6 bg-white/90 backdrop-blur-sm border border-color-default shadow-xl text-left transition-all duration-300 hover:shadow-2xl group"
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => {
          console.log("AI guidance requested");
        }}
      >
        <div className="flex items-center gap-4">
          <motion.div
            className="p-3 rounded-xl bg-gradient-to-br from-brand-secondary/10 to-brand-tertiary/10"
            whileHover={{ rotate: 5, scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <Sparkles className="w-6 h-6 text-brand-secondary" />
          </motion.div>
          
          <div className="flex-1">
            <h3 className="text-lg font-bold bg-gradient-to-r from-brand-secondary via-brand-tertiary to-brand-accent bg-clip-text text-transparent mb-1">
              Assistente AI
            </h3>
            <p className="text-sm text-color-tertiary">
              Non sei sicuro su cosa scegliere? Chiedi all'AI
            </p>
          </div>
          
          <motion.div
            className="text-brand-secondary opacity-70 group-hover:opacity-100 transition-opacity duration-200"
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronRight className="w-5 h-5" />
          </motion.div>
        </div>
        
        <motion.div
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-secondary/10 via-brand-tertiary/10 to-brand-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ mixBlendMode: 'multiply' }}
        />
      </motion.button>
    </motion.div>
  );
};

// ============================================================================
// CART SUMMARY COMPONENT
// ============================================================================

interface CartSummaryProps {
  categories: ServiceCategory[];
}

const CartSummary = ({ categories }: CartSummaryProps) => {
  const selectedServices = categories.flatMap(cat => 
    cat.services.filter(s => s.selected).map(s => ({ 
      ...s, 
      categoryName: cat.name, 
      categoryIcon: cat.icon, 
      categoryGradient: cat.gradient 
    }))
  );
  const totalPrice = selectedServices.reduce((sum, s) => 
    sum + parseInt(s.price.replace(/[€$]/g, '').replace(/[^0-9]/g, '')), 0
  );

  if (selectedServices.length === 0) {
    return (
      <motion.div
        className="relative rounded-xl border border-color-default p-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-center text-color-muted">
          <div className="w-12 h-12 rounded-full bg-color-muted mx-auto mb-3 flex items-center justify-center">
            <span className="text-2xl">🛒</span>
          </div>
          <p className="text-sm text-color-muted">Nessun servizio selezionato</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="relative rounded-xl overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <GlowingEffect
        spread={30}
        glow={true}
        disabled={false}
        proximity={48}
        inactiveZone={0.01}
        borderWidth={2}
      />
      
      <div className="relative rounded-xl p-6 bg-white/90 backdrop-blur-sm border border-color-default shadow-xl">
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold bg-gradient-to-r from-brand-secondary via-brand-tertiary to-brand-accent bg-clip-text text-transparent">
              Riepilogo Ordine
            </h3>
            <div className="px-3 py-1 bg-gradient-to-r from-brand-secondary/20 to-brand-tertiary/20 rounded-full text-sm text-brand-secondary font-medium">
              {selectedServices.length} servizi{selectedServices.length !== 1 ? '' : 'o'}
            </div>
          </div>

          <div className="space-y-3 mb-4">
            {selectedServices.map((service, index) => (
              <motion.div
                key={service.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-color-subtle/80 border border-color-default hover:shadow-md transition-shadow duration-200"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <motion.div
                  className="p-1.5 rounded-md bg-gradient-to-br from-brand-secondary/10 to-brand-tertiary/10 text-brand-secondary"
                  style={{
                    background: `linear-gradient(135deg, ${service.categoryGradient}15, ${service.categoryGradient}08)`
                  }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {service.categoryIcon}
                </motion.div>
                
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-color-primary text-sm">{service.name}</p>
                  <p className="text-xs text-color-muted truncate">{service.description}</p>
                </div>
                
                <motion.span
                  className="text-sm font-semibold text-brand-secondary"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 0.3 }}
                >
                  {service.price}
                </motion.span>
              </motion.div>
            ))}
          </div>

          <div className="border-t border-color-default pt-4">
            <div className="flex items-center justify-between">
              <span className="text-base font-medium text-color-primary">Total</span>
              <motion.span
                className="text-xl font-bold bg-gradient-to-r from-brand-secondary via-brand-tertiary to-brand-accent bg-clip-text text-transparent"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.5 }}
                key={totalPrice}
              >
                €{totalPrice}
              </motion.span>
            </div>
            <p className="text-xs text-color-muted mt-1">Servizi selezionati</p>
          </div>

          <motion.button
            className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-brand-secondary via-brand-tertiary to-brand-accent text-white rounded-lg font-medium text-sm hover:from-brand-secondary hover:via-brand-tertiary hover:to-brand-accent transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              console.log("Proceed with order");
            }}
          >
            Procedi con l'ordine
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================================
// SERVICE COMPONENTS
// ============================================================================

interface ServiceCategoryHeaderProps {
  category: ServiceCategory;
  onToggleExpanded: (categoryId: string) => void;
}

const ServiceCategoryHeader = ({ category, onToggleExpanded }: ServiceCategoryHeaderProps) => {
  const selectedCount = category.services.filter(s => s.selected).length;
  const totalPrice = category.services
    .filter(s => s.selected)
    .reduce((sum, s) => sum + parseInt(s.price.replace(/[€$]/g, '').replace(/[^0-9]/g, '')), 0);

  return (
    <motion.div
      className="relative group cursor-pointer"
      onClick={() => onToggleExpanded(category.id)}
      whileHover={{ scale: 1.01, y: -2 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative rounded-xl overflow-hidden">
        <GlowingEffect
          spread={20}
          glow={selectedCount > 0}
          disabled={selectedCount === 0}
          proximity={32}
          inactiveZone={0.01}
          borderWidth={1.5}
        />
        
        <motion.div
          className={cn(
            "relative rounded-xl p-4 transition-all duration-300",
            "bg-white/80 backdrop-blur-sm border border-color-default",
            "shadow-lg hover:shadow-xl transition-shadow duration-300",
            selectedCount > 0 && "border-brand-secondary/30 shadow-xl"
          )}
          style={{
            background: selectedCount > 0 
              ? `linear-gradient(135deg, ${category.gradient}15, ${category.gradient}08)`
              : undefined
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                className="p-2 rounded-lg bg-gradient-to-br from-brand-secondary/10 to-brand-tertiary/10 text-brand-secondary"
                style={{
                  background: `linear-gradient(135deg, ${category.gradient}15, ${category.gradient}08)`
                }}
                whileHover={{ rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                {category.icon}
              </motion.div>
              <div>
                <h3 className="font-bold text-color-primary">{category.name}</h3>
                {selectedCount > 0 && (
                  <p className="text-xs text-color-muted">
                    {selectedCount} serviz{selectedCount !== 1 ? 'i' : 'o'} • €{totalPrice}
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {selectedCount > 0 && (
                <motion.div
                  className="px-2 py-1 bg-gradient-to-r from-brand-secondary/20 to-brand-tertiary/20 rounded-full text-xs text-brand-secondary font-medium"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {selectedCount}
                </motion.div>
              )}
              <motion.div
                animate={{ rotate: category.isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-5 h-5 text-color-muted" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

interface ServiceToggleCardProps {
  service: ServiceOption;
  categoryId: string;
  categoryGradient: string;
  onToggle: (categoryId: string, serviceId: string) => void;
}

const ServiceToggleCard = ({ service, categoryId, categoryGradient, onToggle }: ServiceToggleCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative group cursor-pointer"
      onClick={() => onToggle(categoryId, service.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative h-full rounded-xl overflow-hidden">
        <GlowingEffect
          spread={30}
          glow={service.selected}
          disabled={!service.selected}
          proximity={48}
          inactiveZone={0.01}
          borderWidth={2}
        />
        
        <motion.div
          className={cn(
            "relative h-full rounded-xl p-4 transition-all duration-300",
            "bg-white/90 backdrop-blur-sm border border-color-default",
            "shadow-md hover:shadow-lg transition-shadow duration-300",
            service.selected && "border-brand-secondary/40 shadow-lg"
          )}
          style={{
            background: service.selected 
              ? `linear-gradient(135deg, ${categoryGradient}15, ${categoryGradient}05)`
              : undefined
          }}
        >
          {service.selected && (
            <motion.div
              className="absolute inset-0 rounded-lg opacity-20"
              style={{
                background: `linear-gradient(135deg, ${categoryGradient}40, transparent 70%)`
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              transition={{ duration: 0.3 }}
            />
          )}

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <motion.div
                className={cn(
                  "flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center",
                  "transition-all duration-200",
                  service.selected
                    ? "bg-gradient-to-r from-brand-secondary to-brand-tertiary border-brand-secondary text-white"
                    : "border-color-strong bg-white hover:border-brand-secondary/60"
                )}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: service.selected ? 1 : 0,
                    opacity: service.selected ? 1 : 0
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <Check className="w-3 h-3" />
                </motion.div>
              </motion.div>
              
              <motion.span
                className={cn(
                  "text-sm font-semibold transition-colors duration-200",
                  service.selected ? "text-brand-secondary" : "text-color-muted"
                )}
                animate={{
                  scale: service.selected ? 1.05 : 1
                }}
                transition={{ duration: 0.2 }}
              >
                {service.price}
              </motion.span>
            </div>

            <div className="space-y-2">
              <h3 className={cn(
                "font-medium text-sm transition-colors duration-200",
                service.selected ? "text-color-primary" : "text-color-secondary"
              )}>
                {service.name}
              </h3>
              
              <p className={cn(
                "text-xs leading-relaxed transition-colors duration-200",
                service.selected ? "text-color-tertiary" : "text-color-muted"
              )}>
                {service.description}
              </p>
            </div>
          </div>

          {service.selected && (
            <motion.div
              className="absolute top-2 right-2 w-2 h-2 rounded-full bg-gradient-to-r from-brand-secondary/90 to-brand-tertiary/90"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

// ============================================================================
// MAIN ENHANCED SERVICES COMPONENT
// ============================================================================

interface Step4EnhancedServicesProps {
  onContinue?: () => void;
  onBack?: () => void;
}

const Step4EnhancedServices = ({ onContinue, onBack }: Step4EnhancedServicesProps) => {
  const [categories, setCategories] = useState<ServiceCategory[]>([
    {
      id: "photography",
      name: "Fotografia Professionale",
      icon: <Camera className="w-5 h-5" />,
      gradient: "#4f46e5",
      isOpen: true,
      services: [
        {
          id: "basic-photography",
          name: "Servizio Base",
          description: "20 foto ambiente + piatti. Mezza giornata, editing professionale, foto web-ready",
          price: "€350",
          selected: false
        },
        {
          id: "extended-photography",
          name: "Servizio Esteso",
          description: "40 foto + video breve 1 min. Giornata completa, video presentazione, footage extra",
          price: "€550",
          selected: true
        },
        {
          id: "seasonal-session",
          name: "Sessione Stagionale Aggiuntiva",
          description: "Menu primavera/estate. Follow-up per aggiornamenti stagionali",
          price: "€250",
          selected: false
        }
      ]
    },
    {
      id: "content",
      name: "Contenuti e Copywriting",
      icon: <PenTool className="w-5 h-5" />,
      gradient: "#9333ea",
      isOpen: true,
      services: [
        {
          id: "menu-descriptions",
          name: "Descrizioni Menu Professionale",
          description: "Riscrittura completa menu con linguaggio gourmet",
          price: "€200",
          selected: false
        },
        {
          id: "restaurant-story",
          name: "Storia del Ristorante e Tradizione Familiare",
          description: "Storytelling professionale heritage aziendale",
          price: "€150",
          selected: true
        },
        {
          id: "blog-setup",
          name: "Blog Setup",
          description: "Produzione 5 articoli iniziali",
          price: "€300",
          selected: false
        },
        {
          id: "website-translation",
          name: "Traduzione Website",
          description: "Menu completo tradotto per turisti internazionali in inglese professionale",
          price: "€120",
          selected: false
        }
      ]
    },
    {
      id: "integrations",
      name: "Integrazioni Terze Parti",
      icon: <Wrench className="w-5 h-5" />,
      gradient: "#ec4899",
      isOpen: false,
      services: [
        {
          id: "whatsapp-business",
          name: "WhatsApp Business",
          description: "Integrazione avanzata. Catalogo prodotti, messaggi automatici, click-to-chat",
          price: "€80",
          selected: false
        },
        {
          id: "loyalty-card",
          name: "Carta Fedeltà Digitale",
          description: "Sistema punti base, QR codes, gestione clienti",
          price: "€200",
          selected: true
        },
        {
          id: "qr-code",
          name: "QR Code",
          description: "Design personalizzato brand-consistent per menu, wifi, social",
          price: "€80",
          selected: false
        },
        {
          id: "backup-security",
          name: "Backup e Sicurezza",
          description: "Backup automatici, monitoraggio uptime, SSL premium",
          price: "€100/anno",
          selected: false
        }
      ]
    },
    {
      id: "marketing",
      name: "Marketing e Visibilità",
      icon: <BarChart3 className="w-5 h-5" />,
      gradient: "#4f46e5",
      isOpen: false,
      services: [
        {
          id: "social-media-setup",
          name: "Setup Social Media Completo",
          description: "Facebook/Instagram Business. Account business, pixel tracking, catalogo prodotti",
          price: "€150",
          selected: false
        },
        {
          id: "local-seo",
          name: "SEO Locale Avanzato",
          description: "Ricerca keywords, content strategy, local citations",
          price: "€300",
          selected: false
        },
        {
          id: "tripadvisor-integration",
          name: "Integrazione TripAdvisor e Recensioni",
          description: "Widget recensioni, monitoring reputazione",
          price: "€100",
          selected: false
        },
        {
          id: "google-ads-setup",
          name: "Setup Google Ads + Campagna Base",
          description: "Account setup, prima campagna, targeting local",
          price: "€200",
          selected: false
        }
      ]
    }
  ]);

  const handleToggle = (categoryId: string, serviceId: string) => {
    setCategories(prev => 
      prev.map(category => 
        category.id === categoryId
          ? {
              ...category,
              services: category.services.map(service =>
                service.id === serviceId
                  ? { ...service, selected: !service.selected }
                  : service
              )
            }
          : category
      )
    );
  };

  const handleToggleExpanded = (categoryId: string) => {
    setCategories(prev => 
      prev.map(category => 
        category.id === categoryId
          ? { ...category, isOpen: !category.isOpen }
          : category
      )
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12 space-y-8">
      {/* Back Button */}
      <motion.button
        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-color-default rounded-lg text-color-secondary hover:bg-color-subtle hover:border-color-strong transition-all duration-200 shadow-sm hover:shadow-md"
        whileHover={{ scale: 1.02, y: -1 }}
        whileTap={{ scale: 0.98 }}
        onClick={onBack}
      >
        <ChevronDown className="w-4 h-4 rotate-90" />
        <span className="text-sm font-medium">Torna Indietro</span>
      </motion.button>

      <div className="text-center space-y-4 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-brand-secondary via-brand-tertiary to-brand-accent bg-clip-text text-transparent mb-4">
          Servizi Aggiuntivi
        </h2>
        <p className="text-lg text-color-tertiary">
          Potenzia la tua presenza online con i nostri servizi premium
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Section - Service Categories (2/3 width) */}
        <div className="xl:col-span-2 space-y-4">
          {categories.map((category) => (
            <div key={category.id} className="space-y-3">
              <ServiceCategoryHeader
                category={category}
                onToggleExpanded={handleToggleExpanded}
              />
              
              <motion.div
                initial={false}
                animate={{
                  height: category.isOpen ? "auto" : 0,
                  opacity: category.isOpen ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  {category.services.map((service) => (
                    <ServiceToggleCard
                      key={service.id}
                      service={service}
                      categoryId={category.id}
                      categoryGradient={category.gradient}
                      onToggle={handleToggle}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
        
        {/* Right Sidebar (1/3 width) */}
        <div className="xl:col-span-1">
          <div className="sticky top-6 space-y-6">
            <AIGuidanceButton />
            <CartSummary categories={categories} />
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <div className="flex justify-end">
        <motion.button
          onClick={onContinue}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-secondary via-brand-tertiary to-brand-accent text-white rounded-lg font-medium hover:from-brand-secondary hover:via-brand-tertiary hover:to-brand-accent transition-all duration-300 shadow-lg hover:shadow-xl"
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
        >
          Continua al Preventivo
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
};

export default Step4EnhancedServices; 