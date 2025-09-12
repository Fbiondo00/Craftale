"use client";

import React, { useActionState, useEffect, useRef, useState } from "react";
import BackConfirmDialog from "./BackConfirmDialog";
import NewPricingCards from "./NewPricingCards";
import ServiceToggleCards from "./OptionalServicesSelector";
import PersonaMatcher from "./PersonaMatcher";
import { type PersonaMatcherStep, getPersonaMatcherConfig } from "./PersonaMatcherConfig";
import Step4QuoteRequest from "./Step4QuoteRequest";
import Step4QuoteSuccess from "./Step4QuoteSuccess";
import StepNavigator from "./StepNavigator";
import TierComparisonTable from "./TierComparisonTable";
import TierLevelSelector from "./TierLevelSelector";
import type { ActionState } from "@/app/actions/quotes";
// removed , CompletionType
import { useAuth } from "@/contexts/AuthContext";
import type {
  OptionalServiceWithAvailability as ApiOptionalService,
  PricingLevelSimplified,
  TierWithLevels,
} from "@/types/database-extended";
//import CartSummaryStep4 from './CartSummaryStep4';
import { PersonaMatcherForm } from "@/types/pricing";
import type { QuoteRequest } from "@/types/step4-quote-request";
import { motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";

type PricingStep = "browse" | "customize" | "optional" | "quote" | "success";

interface PricingConfiguration {
  tier?: TierWithLevels;
  level?: PricingLevelSimplified;
  optionalServices: ApiOptionalService[];
  completedSteps: Set<PricingStep>;
  currentStep: PricingStep;
}

interface QuoteState {
  submittedQuote?: QuoteRequest;
  isSubmitting: boolean;
}

interface CompactPricingSectionProps {
  // Quote actions
  saveDraftAction: (prevState: ActionState | null, formData: FormData) => Promise<ActionState>;
  submitQuoteAction: (prevState: ActionState | null, formData: FormData) => Promise<ActionState>;
  applyDiscountAction: (prevState: ActionState | null, formData: FormData) => Promise<ActionState>;
  loadDraftAction: () => Promise<ActionState>;
  checkActiveQuoteAction: () => Promise<ActionState>;
  // Time slot actions
  getTimeSlotsAction: (prevState: ActionState | null, formData: FormData) => Promise<ActionState>;
  bookSlotAction: (prevState: ActionState | null, formData: FormData) => Promise<ActionState>;
  // Services action
  getOptionalServicesAction: (tierId?: string | number, levelId?: string | number) => Promise<any>;
  // Upgrade action
  checkUpgradeAction: (prevState: ActionState | null, formData: FormData) => Promise<ActionState>;
  // Analytics actions
  trackPricingJourneyAction: (prevState: ActionState | null, formData: FormData) => Promise<ActionState>;
  trackPersonaMatcherAction: (prevState: ActionState | null, formData: FormData) => Promise<ActionState>;
  updateQuoteProgressAction?: (prevState: ActionState | null, formData: FormData) => Promise<ActionState>;
  // Delete action for discarding quotes
  deleteQuoteAction?: (prevState: ActionState | null, formData: FormData) => Promise<ActionState>;
  // Debug: list drafts
  listUserDraftsAction?: () => Promise<ActionState>;
  // Pre-fetched data
  initialPricingData: {
    success: boolean;
    tiers?: TierWithLevels[];
    error?: string;
  };
}

const CompactPricingSection: React.FC<CompactPricingSectionProps> = ({
  saveDraftAction,
  submitQuoteAction,
  applyDiscountAction,
  loadDraftAction,
  checkActiveQuoteAction,
  getTimeSlotsAction,
  bookSlotAction,
  getOptionalServicesAction,
  checkUpgradeAction,
  trackPricingJourneyAction,
  trackPersonaMatcherAction,
  initialPricingData,
  updateQuoteProgressAction,
  deleteQuoteAction,
  listUserDraftsAction,
}) => {
  const { user } = useAuth();
  const tiers = initialPricingData.tiers || [];
  const tiersLoading = !initialPricingData.success;
  const tiersError = initialPricingData.error;

  // Use useActionState for save draft
  const [saveDraftState, saveDraftFormAction, saveDraftPending] = useActionState(saveDraftAction, {
    success: false,
    message: "",
  } as ActionState);

  // Use useActionState for submit quote
  const [submitQuoteState, submitQuoteFormAction, submitQuotePending] = useActionState(submitQuoteAction, {
    success: false,
    message: "",
  } as ActionState);

  // State for draft and quote ID
  const [draft, setDraft] = useState<any>(null);
  const [quoteId, setQuoteId] = useState<number | null>(null);
  const [loadingDraft, setLoadingDraft] = useState(true);

  const [configuration, setConfiguration] = useState<PricingConfiguration>({
    optionalServices: [],
    completedSteps: new Set(),
    currentStep: "browse",
  });

  // Back confirm dialog state
  const [showBackDialog, setShowBackDialog] = useState(false);
  const [backDialogSaving, setBackDialogSaving] = useState(false);
  const pendingBackRef = useRef<null | { targetStep: PricingStep }>(null);
  // Track previous step to detect "came back from a later step" behavior
  const prevStepRef = useRef<PricingStep | null>(null);
  // Short-lived guard to suppress reloads immediately after deleting a draft
  const skipLoadUntilRef = useRef<number | null>(null);

  const [existingQuote, setExistingQuote] = useState<any>(null);
  const [quoteType, setQuoteType] = useState<"none" | "draft" | "submitted">("none");
  const [loadingExistingQuote, setLoadingExistingQuote] = useState(true);
  const [previousQuoteMessage, setPreviousQuoteMessage] = useState<string | null>(null);

  // State for optional services
  const [services, setServices] = useState<ApiOptionalService[]>([]);
  const [servicesLoading, setServicesLoading] = useState(false);
  const [servicesError, setServicesError] = useState<string | null>(null);
  const [allServices, setAllServices] = useState<ApiOptionalService[]>([]); // Store all prefetched services
  const [servicesPreloaded, setServicesPreloaded] = useState(false);

  // Track if we've already restored services from draft
  const hasRestoredServicesRef = useRef(false);
  const hasPrefetchedRef = useRef(false);

  // Prefetch all optional services on mount or when needed (non-blocking)
  useEffect(() => {
    const prefetchServices = async () => {
      if (hasPrefetchedRef.current) return;

      console.log("🚀 CLIENT: Prefetching all optional services (non-blocking)...");

      try {
        const result = await getOptionalServicesAction(1, 1);

        if (result && result.success && result.services) {
          console.log("✅ CLIENT: Prefetched", result.services.length, "optional services");
          setAllServices(result.services);
          setServicesPreloaded(true);
          hasPrefetchedRef.current = true;
        }
      } catch (error) {
        console.error("Failed to prefetch services:", error);
        // Non-blocking - don't surface to user
      }
    };

    prefetchServices();
  }, [getOptionalServicesAction]);

  // Filter services based on current tier/level selection
  useEffect(() => {
    // If we're not on step 3 or don't have tier/level, don't filter yet
    if (!configuration.tier?.id || !configuration.level?.id) {
      setServices([]);
      return;
    }

    // If services are preloaded, filter them based on tier/level
    if (servicesPreloaded && allServices.length > 0) {
      console.log("🎯 CLIENT: Filtering services for tier:", configuration.tier.id, "level:", configuration.level.id);

      // For now, just use all services (filtering logic to be fixed per ISSUE.md)
      setServices(allServices);

      // Restore selected services from draft if needed
      if (existingQuote?._selectedServiceIds?.length > 0 && !hasRestoredServicesRef.current) {
        const selectedServices = allServices.filter((service: ApiOptionalService) =>
          existingQuote._selectedServiceIds.includes(service.id),
        );

        if (selectedServices.length > 0) {
          console.log(
            "✅ CLIENT: Restoring selected services from draft:",
            selectedServices.map((s: ApiOptionalService) => s.id),
          );
          setConfiguration(prev => ({
            ...prev,
            optionalServices: selectedServices,
          }));
          hasRestoredServicesRef.current = true;
        }
      }
    } else if (!servicesPreloaded) {
      // If services aren't preloaded yet, set loading state
      // This should rarely happen as prefetch starts immediately
      setServicesLoading(true);
    }
  }, [configuration.tier?.id, configuration.level?.id, allServices, servicesPreloaded, existingQuote]);

  // Clear loading state when services are preloaded
  useEffect(() => {
    if (servicesPreloaded && servicesLoading) {
      setServicesLoading(false);
    }
  }, [servicesPreloaded, servicesLoading]);

  // If configuration.optionalServices contains lightweight placeholders (ids only),
  // map them to the prefetched full service objects as soon as `allServices` is available.
  useEffect(() => {
    try {
      if (!allServices || allServices.length === 0) return;
      if (!configuration.optionalServices || configuration.optionalServices.length === 0) return;
      // Avoid running repeatedly once we've restored
      if (hasRestoredServicesRef.current) return;

      const needsMapping = configuration.optionalServices.some(s => !s.name || s.name === "" || !s.base_price);
      if (!needsMapping) return;

      const mapped = configuration.optionalServices.map(s => {
        const found = allServices.find(a => a.id === s.id);
        return found ? found : s;
      });

      // If mapping produced at least one enriched service, apply it
      const hasEnriched = mapped.some(m => m && m.name && m.name !== "");
      if (hasEnriched) {
        setConfiguration(prev => ({ ...prev, optionalServices: mapped }));
        hasRestoredServicesRef.current = true;
        console.log("✅ CLIENT: Mapped placeholder optional services to full prefetched services:", mapped.map(m => m.id));
      }
    } catch (err) {
      // Non-fatal - don't block the flow
      console.error("Error mapping placeholder services to full services:", err);
    }
  }, [allServices, configuration.optionalServices]);

  const [personaMatcherState, setPersonaMatcherState] = useState<{
    isOpen: boolean;
    step: PersonaMatcherStep;
    purpose: string;
  }>({
    isOpen: false,
    step: 1,
    purpose: "tier_identification",
  });

  const [reinforcementCycleCount, setReinforcementCycleCount] = useState(0);
  const [quoteState, setQuoteState] = useState<QuoteState>({
    isSubmitting: false,
  });

  // Ref to ensure Step 4 title scrolls into view when entering quote step
  const quoteTitleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (configuration.currentStep === "quote" && quoteTitleRef.current) {
      // Smooth scroll the heading near top (offset for fixed headers if any)
      const top = quoteTitleRef.current.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, [configuration.currentStep]);

  // Track initial page view only once
  const hasTrackedInitial = useRef(false);
  useEffect(() => {
    if (!hasTrackedInitial.current) {
      // Track step view (defer to avoid setState during render)
      setTimeout(() => {
        const trackFormData = new FormData();
        trackFormData.set("event_type", "step_viewed");
        trackFormData.set("event_data", JSON.stringify({ step: 1 }));
        trackFormData.set("step_number", "1");
        console.log("📊 CLIENT: Tracking initial page view");
        trackPricingJourneyAction(null, trackFormData);
      }, 0);
      hasTrackedInitial.current = true;
    }
  }, []); // Remove analytics dependency

  // Load draft when user ID changes
  useEffect(() => {
    const loadDraft = async () => {
      if (!user?.id) {
        setLoadingDraft(false);
        return;
      }
      // If we recently deleted a draft, skip reload for a small window to avoid UI race
      if (skipLoadUntilRef.current && Date.now() < skipLoadUntilRef.current) {
        setLoadingDraft(false);
        return;
      }
      try {
        console.log("📋 CLIENT: Loading draft for user:", user.id);
        const result = await loadDraftAction();
        if (result.success && result.data?.draft) {
          setDraft(result.data.draft);
          setQuoteId(result.data.draft.id);
        }
      } catch (error) {
        console.error("Error loading draft:", error);
      } finally {
        setLoadingDraft(false);
      }
    };

    loadDraft();
  }, [user?.id, loadDraftAction]); // Only re-run when user ID changes

  // Check for existing quotes when user ID changes
  useEffect(() => {
    const checkExistingQuote = async () => {
      if (!user?.id) {
        setLoadingExistingQuote(false);
        return;
      }

      // If we recently deleted a draft, skip checking for a small window to avoid UI race
      if (skipLoadUntilRef.current && Date.now() < skipLoadUntilRef.current) {
        setLoadingExistingQuote(false);
        return;
      }

      try {
        const result = await checkActiveQuoteAction();
        if (result.success && result.data) {
          const data = result.data;
          console.log("CompactPricingSection - checkActiveQuoteAction response:", {
            type: data.type,
            quote: !!data.quote ? data.quote : "No quote found",
            message: data.message,
            hasQuote: !!data.quote,
            quoteNumber: data.quote?.quote_number,
            quoteStatus: data.quote?.status,
            hasNotes: !!data.quote?.notes,
          });

          if (data.type === "active") {
            // User has an active quote (submitted, under_review, or accepted)
            setExistingQuote(data.quote);
            setQuoteType("submitted"); // We'll treat all active quotes as "submitted" for UI purposes

            // Reconstruct the QuoteRequest from the active quote
            // Contact info is stored in contact_preferences field
            const contactInfo: any = data.quote.contact_preferences || {};
            const quoteRequest: QuoteRequest = {
              userData: contactInfo.userData || {},
              projectDetails: contactInfo.projectDetails || {},
              meetingRequest: contactInfo.meetingRequest || {},
              completionType: data.quote.metadata?.completionType || "basic_info",
              // Build pricingConfiguration from actual database fields
              pricingConfiguration: {
                selectedTier: data.quote.pricing_tiers?.slug || data.quote.pricing_tiers?.name || "",
                selectedLevel: data.quote.pricing_levels?.level_code || "",
                basePriceEur: data.quote.base_price || data.quote.pricing_levels?.price || 0,
                optionalServices: Array.isArray(data.quote.selected_services)
                  ? data.quote.selected_services.map((serviceId: any) => ({
                      serviceId: String(serviceId),
                      quantity: 1,
                      unitPriceEur: 0, // Individual prices not stored separately in quote
                    }))
                  : [],
                totalCalculatedPriceEur: data.quote.total_price || 0,
              },
              quoteId: data.quote.quote_number,
              submissionDate: data.quote.submitted_at || new Date().toISOString(),
              status: data.quote.status || "submitted",
              priority: false,
              estimatedProjectValue: data.quote.total_price || 0,
            };

            setQuoteState({
              isSubmitting: false,
              submittedQuote: quoteRequest,
            });

            // Find full tier and level objects for submitted quote
            let tierObj = undefined;
            let levelObj = undefined;

            if (data.quote.tier_id && tiers) {
              tierObj = tiers.find(t => t.id === data.quote.tier_id);
              if (tierObj && data.quote.level_id) {
                levelObj = tierObj.levels.find(l => l.id === data.quote.level_id);
              }
            }

            // Set configuration to success step - show the quote recap
            // Convert selected service ids into lightweight service objects so the
            // UI configuration.optionalServices always contains ApiOptionalService[]
            const activeOptionalServices: ApiOptionalService[] = Array.isArray(data.quote.selected_services)
              ? data.quote.selected_services.map((id: any) => ({ id: Number(id), name: "", slug: "", description: "", base_price: 0, category: "", features: [], is_active: true }))
              : [];

            setConfiguration({
              tier: tierObj || data.quote.pricing_tiers,
              level: levelObj || data.quote.pricing_levels,
              optionalServices: activeOptionalServices,
              completedSteps: new Set<PricingStep>(["browse", "customize", "optional", "quote"]),
              currentStep: "success",
            });

            // Try to fetch full service objects immediately for the selected ids so
            // the UI (step 4 summary) shows names/prices on first render.
            try {
              const fetchResult = await getOptionalServicesAction(data.quote.tier_id || undefined, data.quote.level_id || undefined);
              if (fetchResult && fetchResult.success && Array.isArray(fetchResult.services) && fetchResult.services.length > 0) {
                setAllServices(fetchResult.services);
                setServicesPreloaded(true);
                if (Array.isArray(data.quote.selected_services) && data.quote.selected_services.length > 0) {
                  const mapped = fetchResult.services.filter((s: ApiOptionalService) => data.quote.selected_services.includes(s.id));
                  if (mapped.length > 0) {
                    setConfiguration(prev => ({ ...prev, optionalServices: mapped }));
                    hasRestoredServicesRef.current = true;
                    console.log("✅ CLIENT: Restored active quote selected services from fetched list:", mapped.map(m => m.id));
                  }
                }
              }
            } catch (err) {
              console.error("Error fetching optional services for active quote mapping:", err);
            }
          } else if (data.type === "can_create_new") {
            // User has a rejected/expired quote - show a notification but allow new quote
            const message =
              data.status === "rejected"
                ? "Il tuo preventivo precedente è stato rifiutato. Puoi crearne uno nuovo."
                : "Il tuo preventivo precedente è scaduto. Puoi crearne uno nuovo.";
            setPreviousQuoteMessage(message);
          } else if (data.type === "draft") {
            // User has a draft - resume from saved step
            setExistingQuote(data.quote);
            setQuoteType("draft");

            // Reconstruct configuration from draft
            const completedSteps = new Set<PricingStep>();
            let currentStep: PricingStep = "browse";

            if (data.quote.tier_id) {
              completedSteps.add("browse");
              currentStep = "customize";
            }
            if (data.quote.level_id) {
              completedSteps.add("customize");
              currentStep = "optional";
            }
            if (Array.isArray(data.quote.selected_services) && data.quote.selected_services.length > 0) {
              completedSteps.add("optional");
              currentStep = "quote";
            }

            // Override with saved step if available
            if (data.currentStep) {
              currentStep = data.currentStep as PricingStep;
            }

            // Find full tier and level objects from loaded tiers data
            let tierObj = undefined;
            let levelObj = undefined;

            if (data.quote.tier_id && tiers) {
              tierObj = tiers.find(t => t.id === data.quote.tier_id);
              if (tierObj && data.quote.level_id) {
                levelObj = tierObj.levels.find(l => l.id === data.quote.level_id);
              }
            }

            // If we can't find the full objects, use the partial data as fallback
            // Convert selected service ids into lightweight service objects so the
            // UI configuration.optionalServices always contains ApiOptionalService[]
            const draftOptionalServices: ApiOptionalService[] = Array.isArray(data.quote.selected_services)
              ? data.quote.selected_services.map((id: any) => ({ id: Number(id), name: "", slug: "", description: "", base_price: 0, category: "", features: [], is_active: true }))
              : [];

            setConfiguration({
              tier: tierObj || data.quote.pricing_tiers,
              level: levelObj || data.quote.pricing_levels,
              optionalServices: draftOptionalServices,
              completedSteps,
              currentStep,
            });

            // Immediately try to fetch and map selected service ids to full objects
            try {
              const fetchResult = await getOptionalServicesAction(data.quote.tier_id || undefined, data.quote.level_id || undefined);
              if (fetchResult && fetchResult.success && Array.isArray(fetchResult.services) && fetchResult.services.length > 0) {
                setAllServices(fetchResult.services);
                setServicesPreloaded(true);
                if (Array.isArray(data.quote.selected_services) && data.quote.selected_services.length > 0) {
                  const mapped = fetchResult.services.filter((s: ApiOptionalService) => data.quote.selected_services.includes(s.id));
                  if (mapped.length > 0) {
                    setConfiguration(prev => ({ ...prev, optionalServices: mapped }));
                    hasRestoredServicesRef.current = true;
                    console.log("✅ CLIENT: Restored draft selected services from fetched list:", mapped.map(m => m.id));
                  }
                }
              }
            } catch (err) {
              console.error("Error fetching optional services for draft mapping:", err);
            }
            // Store the service IDs in the quote for later use
            if (data.quote.selected_services) {
              data.quote._selectedServiceIds = data.quote.selected_services;
            }

            // Mark steps as already saved to prevent re-saving
            const alreadySaved = new Set<string>();
            if (data.quote.tier_id) alreadySaved.add("browse");
            if (data.quote.level_id) alreadySaved.add("customize");
            if (data.quote.selected_services?.length > 0) alreadySaved.add("optional");
            setSavedSteps(alreadySaved);
            console.log("✅ CLIENT: Initialized savedSteps from draft:", Array.from(alreadySaved));
          }
        }
      } catch (error) {
        console.error("Error checking existing quote:", error);
      } finally {
        setLoadingExistingQuote(false);
      }
    };

    checkExistingQuote();
  }, [user?.id, checkActiveQuoteAction]); // Only re-run when user ID actually changes

  // Track if we've saved for each step to prevent loops
  const [savedSteps, setSavedSteps] = useState<Set<string>>(new Set());

  // Use a ref to track and cancel any pending save timer
  const saveTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Create stable booleans for step completion
  const hasBrowseCompleted = configuration.completedSteps.has("browse");
  const hasCustomizeCompleted = configuration.completedSteps.has("customize");
  const hasOptionalCompleted = configuration.completedSteps.has("optional");

  // Auto-save draft after tier selection (Step 1)
  useEffect(() => {
    if (configuration.tier && user && hasBrowseCompleted && !savedSteps.has("browse")) {
      // Cancel any pending save timer
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
      }

      const tier = configuration.tier; // Capture tier in closure
      saveTimerRef.current = setTimeout(async () => {
        try {
          // Create FormData for the action
          const formData = new FormData();
          formData.append("tier_id", tier.id.toString());

          console.log("💾 CLIENT: Auto-saving tier selection:", {
            tier_id: tier.id.toString(),
            formDataEntries: Array.from(formData.entries()),
          });

          const result = await saveDraftAction(null, formData);
          if (result.success) {
            setSavedSteps(prev => new Set(prev).add("browse"));
            if (result.data?.quote_id) {
              setQuoteId(result.data.quote_id);
            }
          } else {
            console.error("Failed to auto-save after tier selection:", result.message);
          }
        } catch (error) {
          console.error("Failed to auto-save after tier selection:", error);
        } finally {
          saveTimerRef.current = null;
        }
      }, 1000); // 1 second debounce

      return () => {
        if (saveTimerRef.current) {
          clearTimeout(saveTimerRef.current);
          saveTimerRef.current = null;
        }
      };
    }
  }, [configuration.tier?.id, user?.id, hasBrowseCompleted, saveDraftAction]); // Use stable IDs

  // Auto-save draft after level selection (Step 2)
  useEffect(() => {
    if (configuration.tier && configuration.level && user && hasCustomizeCompleted && !savedSteps.has("customize")) {
      // Cancel any pending save timer
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
      }

      const tier = configuration.tier;
      const level = configuration.level;
      saveTimerRef.current = setTimeout(async () => {
        try {
          const formData = new FormData();
          formData.append("tier_id", tier.id.toString());
          formData.append("level_id", level.id.toString());

          console.log("💾 CLIENT: Auto-saving level selection:", {
            tier_id: tier.id.toString(),
            level_id: level.id.toString(),
          });

          const result = await saveDraftAction(null, formData);
          if (result.success) {
            setSavedSteps(prev => new Set(prev).add("customize"));
            if (result.data?.quote_id) {
              setQuoteId(result.data.quote_id);
            }
          } else {
            console.error("Failed to auto-save after level selection:", result.message);
          }
        } catch (error) {
          console.error("Failed to auto-save after level selection:", error);
        } finally {
          saveTimerRef.current = null;
        }
      }, 1000);

      return () => {
        if (saveTimerRef.current) {
          clearTimeout(saveTimerRef.current);
          saveTimerRef.current = null;
        }
      };
    }
  }, [configuration.tier?.id, configuration.level?.id, user?.id, hasCustomizeCompleted, saveDraftAction]);

  // Auto-save draft after optional services selection (Step 3)
  useEffect(() => {
    if (configuration.tier && configuration.level && user && hasOptionalCompleted && !savedSteps.has("optional")) {
      // Cancel any pending save timer
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
      }

      const tier = configuration.tier;
      const level = configuration.level;
      const services = configuration.optionalServices;
      saveTimerRef.current = setTimeout(async () => {
        try {
          const formData = new FormData();

          // Ensure tier.id and level.id exist before calling toString()
          if (tier.id !== undefined && tier.id !== null) {
            formData.append("tier_id", tier.id.toString());
          }
          if (level.id !== undefined && level.id !== null) {
            formData.append("level_id", level.id.toString());
          }

          // Filter out any services with undefined/null ids before processing
          services.forEach(s => {
            if (s?.id !== undefined && s.id !== null) {
              formData.append("selected_services", s.id.toString());
            }
          });

          console.log("💾 CLIENT: Auto-saving optional services:", {
            tier_id: tier.id,
            level_id: level.id,
            services: services.map(s => s?.id).filter(id => id !== undefined),
          });

          const result = await saveDraftAction(null, formData);
          if (result.success) {
            setSavedSteps(prev => new Set(prev).add("optional"));
            if (result.data?.quote_id) {
              setQuoteId(result.data.quote_id);
            }
          } else {
            console.error("Failed to auto-save after services selection:", result.message);
          }
        } catch (error) {
          console.error("Failed to auto-save after services selection:", error);
        } finally {
          saveTimerRef.current = null;
        }
      }, 1000);

      return () => {
        if (saveTimerRef.current) {
          clearTimeout(saveTimerRef.current);
          saveTimerRef.current = null;
        }
      };
    }
  }, [
    configuration.tier?.id,
    configuration.level?.id,
    configuration.optionalServices.map(s => s.id).join(","), // Create stable dependency
    user,
    hasOptionalCompleted,
    saveDraftAction,
  ]);

  // Step configuration
  const getStepConfig = (step: PricingStep) => {
    const configs = {
      browse: {
        completed: configuration.completedSteps.has("browse"),
      },
      customize: {
        completed: configuration.completedSteps.has("customize"),
      },
      optional: {
        completed: configuration.completedSteps.has("optional"),
      },
      quote: {
        completed: configuration.completedSteps.has("quote"),
      },
      success: {
        completed: configuration.completedSteps.has("success"),
      },
    };
    return configs[step];
  };

  const orderedSteps: PricingStep[] = ["browse", "customize", "optional", "quote", "success"];
  const handleNextStep = () => {
    setConfiguration(prev => {
      // Record previous step immediately so UI logic can consult it synchronously
      prevStepRef.current = prev.currentStep;

      const newCompleted = new Set(prev.completedSteps);
      newCompleted.add(prev.currentStep);
      const currentIndex = orderedSteps.indexOf(prev.currentStep);
      const nextStep = orderedSteps[Math.min(currentIndex + 1, orderedSteps.length - 1)];
      const stepNumber = currentIndex + 2; // 1-based next step index
      setTimeout(() => {
        const fd = new FormData();
        fd.set("event_type", "step_viewed");
        fd.set("event_data", JSON.stringify({ step: stepNumber }));
        fd.set("step_number", stepNumber.toString());
        trackPricingJourneyAction(null, fd);
        if (updateQuoteProgressAction && quoteId) {
          const pfd = new FormData();
          pfd.set("quote_id", quoteId.toString());
          pfd.set("current_step", nextStep);
          updateQuoteProgressAction(null, pfd);
        }
      }, 0);
      return { ...prev, completedSteps: newCompleted, currentStep: nextStep };
    });
  };

  // Compute whether the navigator should show the forward button based on
  // whether the user came from a later step (previous step index > current).
  // This is more robust than strict equality and prevents the button from
  // disappearing after a sequence of back/forward moves.
  let canGoForwardForNavigator = false;
  const prev = prevStepRef.current;
  const currentIndex = orderedSteps.indexOf(configuration.currentStep);
  const prevIndex = prev ? orderedSteps.indexOf(prev) : -1;

  // Never show forward ("Avanti") on Step 3 (optional) or Step 4 (quote).
  // This prevents a flash of the forward button when navigating back from
  // the Quote step to the Optional Services step.
  if (configuration.currentStep === "quote" || configuration.currentStep === "optional") {
    canGoForwardForNavigator = false;
  } else {
    canGoForwardForNavigator = prevIndex > currentIndex;
  }

  // Quote request handlers
  const handleQuoteSubmit = async (quoteRequest: QuoteRequest) => {
    setQuoteState({ isSubmitting: true });

    try {
      console.log("🔍 Preparing draft data with configuration:", {
        tier: configuration.tier,
        level: configuration.level,
        optionalServices: configuration.optionalServices,
      });

      console.log("📝 Quote request data:", {
        userData: quoteRequest.userData,
        projectDetails: quoteRequest.projectDetails,
        meetingRequest: quoteRequest.meetingRequest,
        completionType: quoteRequest.completionType,
      });

      // Save contact preferences to the existing draft
      const draftData = {
        tier_id: configuration.tier?.id,
        level_id: configuration.level?.id,
        selected_services: configuration.optionalServices.map(s => s.id),
        contact_preferences: {
          userData: quoteRequest.userData,
          projectDetails: quoteRequest.projectDetails,
          meetingRequest: quoteRequest.meetingRequest,
        },
        metadata: {
          completionType: quoteRequest.completionType,
        },
        current_step: "success",
      };

      console.log("📦 Final draft data to save:", draftData);

      // Save draft with contact preferences
      const formData = new FormData();
      if (configuration.tier?.id) formData.append("tier_id", configuration.tier.id.toString());
      if (configuration.level?.id) formData.append("level_id", configuration.level.id.toString());
      configuration.optionalServices.forEach(s => {
        formData.append("selected_services", s.id.toString());
      });
      formData.append("contact_preferences", JSON.stringify(draftData.contact_preferences));

      const draftResult = await saveDraftAction(null, formData);
      if (!draftResult.success) {
        throw new Error(draftResult.message || "Failed to save draft");
      }

      // Submit the finalized quote
      const submitFormData = new FormData();
      submitFormData.append("quote_id", (quoteId || draftResult.data?.quote_id).toString());

      const submitResult = await submitQuoteAction(null, submitFormData);
      if (!submitResult.success) {
        throw new Error(submitResult.message || "Failed to submit quote");
      }

      setQuoteState({
        isSubmitting: false,
        submittedQuote: quoteRequest,
      });

      // Move to success step
      setConfiguration(prev => {
        const newCompletedSteps = new Set(prev.completedSteps);
        newCompletedSteps.add("quote");
        return {
          ...prev,
          completedSteps: newCompletedSteps,
          currentStep: "success",
        };
      });
    } catch (error) {
      console.error("Error submitting quote request:", error);
      setQuoteState({ isSubmitting: false });
      // You might want to show an error message to the user here
    }
  };

  const handleQuoteCancel = () => {
    // Go back to optional services step
    setConfiguration(prev => ({
      ...prev,
      currentStep: "optional",
    }));
  };

  const handleBackToHome = () => {
    // Redirect to homepage
    window.location.href = "/";
  };

  const handleNewQuote = () => {
    // Keep configuration but restart quote process
    setConfiguration(prev => {
      const newCompletedSteps = new Set(prev.completedSteps);
      newCompletedSteps.delete("quote");
      newCompletedSteps.delete("success");
      return {
        ...prev,
        completedSteps: newCompletedSteps,
        currentStep: "quote",
      };
    });
    setQuoteState({ isSubmitting: false });
  };

  const handlePreviousStep = () => {
    setConfiguration(prev => {
      const currentIndex = orderedSteps.indexOf(prev.currentStep);
      if (currentIndex === 0) return prev;
      const prevStep = orderedSteps[currentIndex - 1];

      // Record previous step before we mutate the configuration so the
      // navigation UI can decide whether to show the forward button.
      prevStepRef.current = prev.currentStep;

      // Show the back-confirm warning ONLY when going from Step 2 -> Step 1
      // (customize -> browse). Other backward navigations should move
      // immediately without the dialog.
      if (prev.currentStep === "customize" && prevStep === "browse") {
        pendingBackRef.current = { targetStep: prevStep };
        setShowBackDialog(true);
        return prev; // don't change step yet
      }

      // For all other backward moves, navigate immediately
      return { ...prev, currentStep: prevStep };
    });
  };

  // Update prevStepRef after renders so during the next render it holds the
  // previous value. This allows the render logic above to inspect where the
  // user came from.
  useEffect(() => {
    prevStepRef.current = configuration.currentStep;
  }, [configuration.currentStep]);

  const handleStepClick = (step: PricingStep) => {
    // Only allow navigation to completed steps or the next immediate step
    const stepOrder: PricingStep[] = ["browse", "customize", "optional", "quote"];
    const currentIndex = stepOrder.indexOf(configuration.currentStep);
    const targetIndex = stepOrder.indexOf(step);

    if (configuration.completedSteps.has(step) || targetIndex === currentIndex + 1) {
      // Record previous step before navigating so the navigator can
      // decide whether to show the forward button after the move.
      prevStepRef.current = configuration.currentStep;
      setConfiguration(prev => ({
        ...prev,
        currentStep: step,
      }));
    }
  };

  // Tier selection handlers
  const handleTierSelect = (tierSlug: string) => {
    const selectedTier = tiers.find(t => t.slug === tierSlug);
    if (!selectedTier) return;

    console.log("🎯 CLIENT: Tier selected:", { tierSlug, tierId: selectedTier.id });

    // Track tier selection (defer to avoid setState during render)
    setTimeout(() => {
      const trackFormData = new FormData();
      trackFormData.set("event_type", "tier_selected");
      trackFormData.set("event_data", JSON.stringify({ tier_id: selectedTier.id, tier_slug: selectedTier.slug }));
      console.log("📊 CLIENT: Tracking tier selection");
      trackPricingJourneyAction(null, trackFormData);
    }, 0);

    // Reset the restored services flag when tier changes
    hasRestoredServicesRef.current = false;

    setConfiguration(prev => ({
      ...prev,
      tier: selectedTier,
      level: undefined, // Reset level when tier changes
      optionalServices: [], // Reset optionals when tier changes
    }));
    handleNextStep();
  };

  // Level selection handlers
  const handleLevelSelect = (tierSlug: string, levelCode: string) => {
    const selectedTier = tiers.find(t => t.slug === tierSlug);
    if (!selectedTier) return;

    const selectedLevel = selectedTier.levels.find(l => l.level_code === levelCode);
    if (!selectedLevel) return;

    console.log("🎯 CLIENT: Level selected:", { tierSlug, levelCode, levelId: selectedLevel.id });

    // Track level selection (defer to avoid setState during render)
    setTimeout(() => {
      const trackFormData = new FormData();
      trackFormData.set("event_type", "level_selected");
      trackFormData.set(
        "event_data",
        JSON.stringify({ level_id: selectedLevel.id, level_code: selectedLevel.level_code }),
      );
      console.log("📊 CLIENT: Tracking level selection");
      trackPricingJourneyAction(null, trackFormData);
    }, 0);

    setConfiguration(prev => ({
      ...prev,
      tier: selectedTier,
      level: selectedLevel,
    }));
    handleNextStep();
  };

  // Optional services handlers
  const handleOptionalServicesSelect = (services: ApiOptionalService[]) => {
    setConfiguration(prev => ({
      ...prev,
      optionalServices: services,
    }));
  };

  // Reinforcement loop: upgrade recommendation accept
  const handleUpgradeRecommendationAccept = (newLevel: PricingLevelSimplified) => {
    setConfiguration(prev => ({
      ...prev,
      level: newLevel,
      currentStep: "customize", // Return to Step 2 to review upgrade
      optionalServices: [], // Reset optionals for new level
    }));
    setReinforcementCycleCount(prev => prev + 1);
  };

  // PersonaMatcher handlers
  const handlePersonaMatcherOpen = (step?: PersonaMatcherStep) => {
    let targetStep: PersonaMatcherStep;
    let purpose: string;

    if (step) {
      targetStep = step;
      // Determine purpose based on step
      switch (targetStep) {
        case 1:
          purpose = "tier_identification";
          break;
        case 2:
          purpose = "level_selection";
          break;
        case 3:
          purpose = "service_optimization";
          break;
        default:
          purpose = "tier_identification";
      }
    } else {
      // Determine step based on current workflow step
      switch (configuration.currentStep) {
        case "browse":
          targetStep = 1;
          purpose = "tier_identification";
          break;
        case "customize":
          targetStep = 2;
          purpose = "level_selection";
          break;
        case "optional":
          targetStep = 3;
          purpose = "service_optimization";
          break;
        default:
          targetStep = 1;
          purpose = "tier_identification";
      }
    }

    setPersonaMatcherState({
      isOpen: true,
      step: targetStep,
      purpose,
    });
  };

  const handlePersonaMatcherClose = () => {
    setPersonaMatcherState(prev => ({
      ...prev,
      isOpen: false,
    }));
  };

  const handlePersonaMatcherSubmit = (formData: PersonaMatcherForm) => {
    const config = getPersonaMatcherConfig(personaMatcherState.step);
    const result = config.resultCalculation(formData);

    switch (personaMatcherState.step) {
      case 1: // Tier identification
        if (result.tier) {
          handleTierSelect(result.tier);
        } else {
          // Failed to identify tier - redirect to Step 4
          setConfiguration(prev => ({
            ...prev,
            currentStep: "quote",
          }));
        }
        break;

      case 2: // Level selection
        if (result.level && configuration.tier) {
          handleLevelSelect(configuration.tier.slug, result.level);
        } else {
          // Failed to select level - redirect to Step 4
          setConfiguration(prev => ({
            ...prev,
            currentStep: "quote",
          }));
        }
        break;

      case 3: // Service optimization
        if (result.services && services) {
          // Apply AI-recommended services
          const recommendedServices = result.services
            .map((serviceId: string | number) => {
              // Find service by ID from the compatible services
              return services.find(s => s.id === Number(serviceId));
            })
            .filter(Boolean) as ApiOptionalService[];

          setConfiguration(prev => ({
            ...prev,
            optionalServices: recommendedServices,
          }));
          handleNextStep();
        } else {
          // Failed to recommend services - redirect to Step 4
          setConfiguration(prev => ({
            ...prev,
            currentStep: "quote",
          }));
        }
        break;
    }

    handlePersonaMatcherClose();
  };

  const steps: PricingStep[] = ["browse", "customize", "optional", "quote"];

  // Loading and error states
  if (tiersLoading || servicesLoading) {
    return (
      <section className="pt-32 pb-16 bg-apty-bg-subtle">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center min-h-[600px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-apty-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  if (tiersError || servicesError) {
    return (
      <section className="pt-32 pb-16 bg-apty-bg-subtle">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center py-12">
            <p className="text-apty-error mb-4">Error loading pricing data. Please try again.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-apty-primary text-apty-text-on-brand rounded-apty-md hover:bg-apty-primary-hover apty-transition"
            >
              Reload Page
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Show loading state while checking for existing quotes
  if (loadingExistingQuote) {
    return (
      <section className="pt-32 pb-16 bg-apty-bg-subtle">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 text-apty-text-tertiary">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-apty-primary"></div>
              <span>Caricamento configuratore prezzi...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="pt-32 pb-16 bg-apty-bg-subtle">
        <div className="max-w-7xl mx-auto px-4">
          {/* Show previous quote message if exists */}
          {previousQuoteMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-4 bg-apty-warning/10 border border-apty-warning/30 rounded-apty-lg max-w-3xl mx-auto"
            >
              <p className="text-apty-warning text-center">{previousQuoteMessage}</p>
            </motion.div>
          )}

          {/* Header with ProcessSection-style animation */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-[44px] leading-[48px] font-semibold font-apty-heading text-apty-text-primary mb-2">
              <span className="text-apty-primary">SOLUZIONI</span> PER OGNI ESIGENZA
            </h2>
            <h3 className="text-[32px] leading-[40px] font-semibold font-apty-heading text-apty-text-primary mb-6">
              TROVA LA <span className="text-apty-primary">SOLUZIONE PERFETTA</span> PER TE
            </h3>
            <p className="text-lg text-apty-text-secondary max-w-4xl mx-auto leading-relaxed">
              Dalla presenza digitale essenziale all&apos;e-commerce completo. Il nostro processo guidato ti aiuta a
              scegliere la soluzione ideale per il tuo business, con risultati garantiti e supporto continuo.
            </p>
          </motion.div>

          {/* 4-Step Indicator with ProcessSection design */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-0"
          >
            {/* Desktop version */}
            <div className="hidden md:flex">
              <div className="w-full flex items-center gap-4 bg-apty-bg-base/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-apty-lg border border-apty-border-default">
                {/* Step 1: Browse */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium shadow-apty-sm ${
                    configuration.currentStep === "browse"
                      ? "bg-apty-gradient-primary text-apty-text-on-brand ring-2 ring-apty-primary ring-offset-2"
                      : "bg-apty-gradient-primary text-apty-text-on-brand"
                  }`}
                >
                  {getStepConfig("browse").completed && configuration.currentStep !== "browse" ? (
                    <Check size={16} />
                  ) : (
                    "1"
                  )}
                </div>
                <span className="font-medium text-apty-text-primary">Esplora i Pacchetti</span>

                <div className="flex-1 h-px bg-gradient-to-r from-apty-primary/20 via-apty-primary/40 to-apty-primary/20 mx-4" />

                {/* Step 2: Customize */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium shadow-apty-sm ${
                    configuration.currentStep === "customize"
                      ? "bg-apty-gradient-primary text-apty-text-on-brand ring-2 ring-apty-primary ring-offset-2"
                      : "bg-apty-gradient-primary text-apty-text-on-brand"
                  }`}
                >
                  {getStepConfig("customize").completed && configuration.currentStep !== "customize" ? (
                    <Check size={16} />
                  ) : (
                    "2"
                  )}
                </div>
                <span className="font-medium text-apty-text-primary">Personalizza il Tuo Pacchetto</span>

                <div className="flex-1 h-px bg-gradient-to-r from-apty-primary/20 via-apty-primary/40 to-apty-primary/20 mx-4" />

                {/* Step 3: Optional Services */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium shadow-apty-sm ${
                    configuration.currentStep === "optional"
                      ? "bg-apty-gradient-primary text-apty-text-on-brand ring-2 ring-apty-primary ring-offset-2"
                      : "bg-apty-gradient-primary text-apty-text-on-brand"
                  }`}
                >
                  {getStepConfig("optional").completed && configuration.currentStep !== "optional" ? (
                    <Check size={16} />
                  ) : (
                    "3"
                  )}
                </div>
                <span className="font-medium text-apty-text-primary">Servizi Opzionali</span>

                <div className="flex-1 h-px bg-gradient-to-r from-apty-primary/20 via-apty-primary/40 to-apty-primary/20 mx-4" />

                {/* Step 4: Quote */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium shadow-apty-sm ${
                    configuration.currentStep === "quote"
                      ? "bg-apty-gradient-primary text-apty-text-on-brand ring-2 ring-apty-primary ring-offset-2"
                      : "bg-apty-gradient-primary text-apty-text-on-brand"
                  }`}
                >
                  {getStepConfig("quote").completed && configuration.currentStep !== "quote" ? (
                    <Check size={16} />
                  ) : (
                    "4"
                  )}
                </div>
                <span className="font-medium text-apty-text-primary">Richiedi Preventivo</span>
              </div>
            </div>
            {orderedSteps.indexOf(configuration.currentStep) !== 0 && (
              <StepNavigator
                canGoBack={orderedSteps.indexOf(configuration.currentStep) !== 0}
                // Forward button visibility now depends on whether the user
                // came back from a later step (see prevStepRef logic)
                canGoForward={canGoForwardForNavigator}
                onBack={handlePreviousStep}
                onNext={handleNextStep}
                backLabel="Indietro"
                nextLabel={configuration.currentStep === "quote" ? "Invia" : "Avanti"}
              />
            )}
            <BackConfirmDialog
              open={showBackDialog}
              saving={backDialogSaving}
              onOpenChange={o => {
                if (!o) {
                  setShowBackDialog(false);
                  pendingBackRef.current = null;
                }
              }}
              currentStepLabel={
                configuration.currentStep === "quote" ? "richiesta preventivo" : configuration.currentStep
              }
              targetStepLabel={pendingBackRef.current?.targetStep || "precedente"}
              onSave={async () => {
                const pending = pendingBackRef.current;
                if (!pending) return;
                const target = pending.targetStep;
                setBackDialogSaving(true);
                try {
                  // Reuse saveDraftAction to persist main selections
                  const fd = new FormData();
                  if (configuration.tier?.id) fd.append("tier_id", configuration.tier.id.toString());
                  if (configuration.level?.id) fd.append("level_id", configuration.level.id.toString());
                  configuration.optionalServices.forEach(s => fd.append("selected_services", s.id.toString()));

                  const result = await saveDraftAction(null, fd);
                  if (result.success) {
                    // Determine the quote id we'll use for progress update
                    const newQuoteId = quoteId || result.data?.quote_id;
                    if (!quoteId && result.data?.quote_id) setQuoteId(result.data.quote_id);
                    // record prev step before transition
                    prevStepRef.current = configuration.currentStep;
                    setConfiguration(prev => ({ ...prev, currentStep: target }));
                    if (updateQuoteProgressAction && newQuoteId) {
                      const pfd = new FormData();
                      pfd.set("quote_id", newQuoteId.toString());
                      pfd.set("current_step", target);
                      updateQuoteProgressAction(null, pfd);
                    }
                  }
                } finally {
                  setBackDialogSaving(false);
                  setShowBackDialog(false);
                  pendingBackRef.current = null;
                }
              }}
              onDiscard={async () => {
                const pending = pendingBackRef.current;
                if (pending) {
                  const target = pending.targetStep;
                  // record prev step before we change steps
                  prevStepRef.current = configuration.currentStep;

                  // Attempt to delete a draft server-side (if quoteId present, pass it; otherwise server will delete latest draft)
                  if (deleteQuoteAction) {
                    setBackDialogSaving(true);
                    try {
                      const dfd = new FormData();
                      if (quoteId) dfd.set("quote_id", quoteId.toString());
                      console.log("Client: calling listUserDraftsAction (before delete)");
                      try {
                        // @ts-ignore - debug helper
                        const before = await listUserDraftsAction();
                        console.log("Client: drafts before delete:", before);
                      } catch (e) {}

                      console.log("Client: calling deleteQuoteAction with quoteId:", quoteId);
                      const delRes = await deleteQuoteAction(null, dfd);
                      console.log("Client: deleteQuoteAction response:", delRes);
                      if (delRes && delRes.success) {
                        console.log("Quote deleted server-side:", delRes.data?.deletedCount, delRes.data?.deleted);
                      } else {
                        console.warn("deleteQuoteAction failed or returned empty:", delRes);
                      }
                    } catch (e) {
                      console.warn("Error deleting quote:", e);
                    } finally {
                      // Clear local references immediately to avoid loadDraft/checkout races
                      setQuoteId(null);
                      setDraft(null);
                      setExistingQuote(null);
                      // Cancel any pending auto-save timers that might recreate the draft
                      if (saveTimerRef.current) {
                        clearTimeout(saveTimerRef.current);
                        saveTimerRef.current = null;
                      }
                      // Mark steps as saved to temporarily suppress auto-save recreation
                      setSavedSteps(new Set(["browse", "customize", "optional"]));
                      // Confirm deletion: attempt to load draft and retry delete if still present
                      try {
                        const reload = await loadDraftAction();
                        if (reload && reload.success && reload.data?.draft) {
                          const foundId = reload.data.draft.id;
                          console.warn("Draft still present after delete; retrying for id:", foundId);
                          if (deleteQuoteAction) {
                            const retryFd = new FormData();
                            retryFd.set("quote_id", String(foundId));
                            await deleteQuoteAction(null, retryFd);
                          }
                        }
                      } catch (e) {
                        console.warn("Error confirming/deleting lingering draft:", e);
                      }
                      try {
                        // @ts-ignore - debug helper
                        const after = await listUserDraftsAction();
                        console.log("Client: drafts after delete:", after);
                      } catch (e) {}
                      // Suppress draft loading/checking for a short window to avoid races
                      skipLoadUntilRef.current = Date.now() + 10000; // 10s
                      setBackDialogSaving(false);
                    }
                  } else if (updateQuoteProgressAction && quoteId) {
                    const pfd = new FormData();
                    pfd.set("quote_id", quoteId.toString());
                    pfd.set("current_step", target);
                    // best-effort
                    updateQuoteProgressAction(null, pfd).catch(() => {});
                  }

                  // Finally navigate locally
                  setConfiguration(prev => ({ ...prev, currentStep: target }));
                }

                setShowBackDialog(false);
                pendingBackRef.current = null;
              }}
              onCancel={() => {
                setShowBackDialog(false);
                pendingBackRef.current = null;
              }}
            />
            {/* Mobile version - vertical layout */}
            <div className="md:hidden bg-apty-bg-base rounded-apty-xl shadow-apty-lg border border-apty-border-default p-6 mx-4">
              <div className="space-y-4">
                {/* Step 1: Browse */}
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium shadow-apty-sm ${
                      configuration.currentStep === "browse"
                        ? "bg-apty-gradient-primary text-apty-text-on-brand ring-2 ring-apty-primary ring-offset-2"
                        : "bg-apty-gradient-primary text-apty-text-on-brand"
                    }`}
                  >
                    {getStepConfig("browse").completed && configuration.currentStep !== "browse" ? (
                      <Check size={18} />
                    ) : (
                      "1"
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-base text-apty-text-primary">Esplora i Pacchetti</div>
                  </div>
                </div>

                {/* Step 2: Customize */}
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium shadow-apty-sm ${
                      configuration.currentStep === "customize"
                        ? "bg-apty-gradient-primary text-apty-text-on-brand ring-2 ring-apty-primary ring-offset-2"
                        : "bg-apty-gradient-primary text-apty-text-on-brand"
                    }`}
                  >
                    {getStepConfig("customize").completed && configuration.currentStep !== "customize" ? (
                      <Check size={18} />
                    ) : (
                      "2"
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-base text-apty-text-primary">Personalizza il Tuo Pacchetto</div>
                  </div>
                </div>

                {/* Step 3: Optional Services */}
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium shadow-apty-sm ${
                      configuration.currentStep === "optional"
                        ? "bg-apty-gradient-primary text-apty-text-on-brand ring-2 ring-apty-primary ring-offset-2"
                        : "bg-apty-gradient-primary text-apty-text-on-brand"
                    }`}
                  >
                    {getStepConfig("optional").completed && configuration.currentStep !== "optional" ? (
                      <Check size={18} />
                    ) : (
                      "3"
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-base text-apty-text-primary">Servizi Opzionali</div>
                  </div>
                </div>

                {/* Step 4: Quote */}
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium shadow-apty-sm ${
                      configuration.currentStep === "quote"
                        ? "bg-apty-gradient-primary text-apty-text-on-brand ring-2 ring-apty-primary ring-offset-2"
                        : "bg-apty-gradient-primary text-apty-text-on-brand"
                    }`}
                  >
                    {getStepConfig("quote").completed && configuration.currentStep !== "quote" ? (
                      <Check size={18} />
                    ) : (
                      "4"
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-base text-apty-text-primary">Richiedi Preventivo</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Step Content */}
          <div className="relative">
            {/* Step 1: Browse Packages */}
            {configuration.currentStep === "browse" && (
              <motion.div
                key="browse"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <motion.div
                  className="text-center mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <h2 className="mt-8 text-[32px] leading-[40px] font-semibold font-apty-heading text-apty-text-primary mb-4">
                    <span className="text-apty-primary">ESPLORA</span> I NOSTRI PACCHETTI
                  </h2>
                  <p className="text-lg text-apty-text-secondary max-w-3xl mx-auto leading-relaxed">
                    Trova la soluzione digitale perfetta per il tuo ristorante. Ogni pacchetto è progettato per
                    soddisfare specifiche esigenze di business.
                  </p>
                </motion.div>

                <NewPricingCards
                  onPersonaMatcherOpen={() => handlePersonaMatcherOpen(1)}
                  onTierSelect={handleTierSelect}
                  tiers={tiers}
                  loading={tiersLoading}
                  error={tiersError}
                  trackTierSelection={(tierId, tierSlug) => {
                    setTimeout(() => {
                      const trackFormData = new FormData();
                      trackFormData.set("event_type", "tier_selected");
                      trackFormData.set("event_data", JSON.stringify({ tier_id: tierId, tier_slug: tierSlug }));
                      trackPricingJourneyAction(null, trackFormData);
                    }, 0);
                  }}
                />
              </motion.div>
            )}

            {/* Step 2: Customize Package */}
            {configuration.currentStep === "customize" && configuration.tier && (
              <motion.div
                key="customize"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <TierLevelSelector
                  selectedTier={configuration.tier}
                  onLevelSelect={handleLevelSelect}
                  onPersonaMatcherOpen={() => handlePersonaMatcherOpen(2)}
                  onBack={handlePreviousStep}
                />
              </motion.div>
            )}

            {/* Step 3: Optional Services */}
            {configuration.currentStep === "optional" && configuration.tier && configuration.level && (
              <motion.div
                key="optional"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <ServiceToggleCards
                  onPersonaMatcherOpen={() => handlePersonaMatcherOpen(3)}
                  onBack={handlePreviousStep}
                  onServicesChange={handleOptionalServicesSelect}
                  initialSelectedServices={configuration.optionalServices}
                  onProceed={handleNextStep}
                  services={services}
                  trackServiceToggle={(serviceId, selected) => {
                    setTimeout(() => {
                      const trackFormData = new FormData();
                      trackFormData.set("event_type", selected ? "service_added" : "service_removed");
                      trackFormData.set("event_data", JSON.stringify({ service_id: serviceId }));
                      trackPricingJourneyAction(null, trackFormData);
                    }, 0);
                  }}
                />
              </motion.div>
            )}

            {/* Step 4: Quote Request */}
            {configuration.currentStep === "quote" && (
              <motion.div
                key="quote"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                {/* Back Button moved to StepNavigator */}
                <div ref={quoteTitleRef} className="text-center mb-8">
                  <h2 className="text-3xl font-bold font-apty-heading text-apty-text-primary">
                    <span className="text-apty-primary">Richiedi</span> il Tuo Preventivo
                  </h2>
                </div>

                {configuration.tier && configuration.level ? (
                  <div className="bg-apty-bg-elevated rounded-apty-2xl shadow-apty-xl p-8">
                    <Step4QuoteRequest
                      completionType="complete_journey"
                      initialData={{
                        pricingConfiguration: {
                          selectedTier: configuration.tier?.slug || "",
                          selectedLevel: configuration.level?.level_code || "",
                          basePriceEur: Number(configuration.level?.price) || 0,
                          optionalServices: configuration.optionalServices.map(service => ({
                            serviceId: String(service.id),
                            quantity: 1,
                            unitPriceEur: Number(service.price) || 0,
                          })),
                          totalCalculatedPriceEur: 0, // Will be calculated by the component
                        },
                      }}
                      onSubmit={handleQuoteSubmit}
                      onCancel={null}
                      className="max-w-none"
                      selectedServices={configuration.optionalServices}
                      onModifyConfiguration={() => {
                        setConfiguration(prev => ({
                          ...prev,
                          currentStep: "optional",
                        }));
                      }}
                      user={user}
                    />
                  </div>
                ) : (
                  <div className="bg-apty-bg-elevated rounded-apty-2xl shadow-apty-xl p-8">
                    <div className="text-center space-y-6">
                      <p className="text-apty-text-secondary">
                        Non sei riuscito a completare la configurazione? Nessun problema! Descrivi le tue esigenze e ti
                        aiuteremo a trovare la soluzione perfetta.
                      </p>

                      <Step4QuoteRequest
                        completionType="ai_assisted_skip"
                        onSubmit={handleQuoteSubmit}
                        onCancel={handleQuoteCancel}
                        className="max-w-none"
                        selectedServices={configuration.optionalServices}
                        onModifyConfiguration={() => {
                          setConfiguration(prev => ({
                            ...prev,
                            currentStep: "optional",
                          }));
                        }}
                        user={user}
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Step 5: Success */}
            {configuration.currentStep === "success" && quoteState.submittedQuote && (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <Step4QuoteSuccess
                  quoteRequest={quoteState.submittedQuote}
                  onBackToHome={handleBackToHome}
                  onNewQuote={handleNewQuote}
                  className="max-w-none"
                />
              </motion.div>
            )}
          </div>

          {/* PersonaMatcher Modal */}
          {personaMatcherState.isOpen && (
            <PersonaMatcher
              isOpen={personaMatcherState.isOpen}
              onClose={handlePersonaMatcherClose}
              onSubmit={handlePersonaMatcherSubmit}
              step={personaMatcherState.step}
            />
          )}
        </div>
      </section>

      {/* Tier Comparison Table Section - Only visible in Step 1 (Browse) */}
      {configuration.currentStep === "browse" && (
        <section className="py-16 bg-white">
          <TierComparisonTable onTierSelect={handleTierSelect} />
        </section>
      )}
    </>
  );
};

export default CompactPricingSection;
