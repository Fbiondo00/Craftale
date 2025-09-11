import CompactPricingSection from '@/components/pricing/CompactPricingSection';
import { 
  saveDraftAction, 
  submitQuoteAction, 
  applyDiscountAction,
  loadDraftAction,
  checkActiveQuoteAction
} from '@/app/actions/quotes';
import { updateQuoteProgressAction, deleteQuoteAction } from '@/app/actions/quotes';
import { listUserDraftsAction } from '@/app/actions/quotes';
import { getTimeSlotsAction, bookSlotAction } from '@/app/actions/timeSlots';
import { getOptionalServicesAction } from '@/app/actions/optionalServices';
import { getPricingTiersAction } from '@/app/actions/pricingData';
import { checkUpgradeAction } from '@/app/actions/upgradeRecommendation';
import { trackPricingJourneyAction, trackPersonaMatcherAction } from '@/app/actions/analytics';
import CTASection from '@/components/home/CTASection';

export const dynamic = 'force-dynamic';

export default async function PricingPage() {
  // Pre-fetch pricing data on server
  const pricingData = await getPricingTiersAction();
  
  return (
    <div className='min-h-screen bg-apty-bg-subtle'>
      <CompactPricingSection 
        // Quote actions
        saveDraftAction={saveDraftAction}
        submitQuoteAction={submitQuoteAction}
        applyDiscountAction={applyDiscountAction}
        loadDraftAction={loadDraftAction}
        checkActiveQuoteAction={checkActiveQuoteAction}
        // Time slot actions
        getTimeSlotsAction={getTimeSlotsAction}
        bookSlotAction={bookSlotAction}
        // Services action
        getOptionalServicesAction={getOptionalServicesAction}
        // Upgrade action
        checkUpgradeAction={checkUpgradeAction}
        // Analytics actions
        trackPricingJourneyAction={trackPricingJourneyAction}
        trackPersonaMatcherAction={trackPersonaMatcherAction}
  updateQuoteProgressAction={updateQuoteProgressAction}
  deleteQuoteAction={deleteQuoteAction}
  listUserDraftsAction={listUserDraftsAction}
        // Pre-fetched data
        initialPricingData={pricingData}
      />
      <CTASection />
    </div>
  );
}
