"use client";

import { useEffect, useState } from "react";
import CartAbandonmentSection from "@/components/ecommerce/CartAbandonmentSection";
import HeroSection from "@/components/ecommerce/HeroSection";
import ItalianEcommerceReality from "@/components/ecommerce/ItalianEcommerceReality";
import MobileCommerceSection from "@/components/ecommerce/MobileCommerceSection";
import PaymentMethodsSection from "@/components/ecommerce/PaymentMethodsSection";
import PlatformComparisonSection from "@/components/ecommerce/PlatformComparisonSection";
import ProcessSection from "@/components/ecommerce/ProcessSection";
import ShippingReturnsSection from "@/components/ecommerce/ShippingReturnsSection";
import CTASection from "@/components/home/CTASection";
import FAQSection from "@/components/sections/FAQSection";
import { LumaSpin } from "@/components/ui/luma-spin";

// FAQ Questions for Italian SMB E-commerce
const ecommerceFAQs = [
  {
    q: "Qual è il tasso di conversione reale per PMI italiane nell'e-commerce?",
    a: "Il tasso medio è del 2.6% (2024), ma con ottimizzazioni mirate può arrivare al 5-7%. Fashion e food performano meglio (2.7-4.6%). Il 76.1% dei carrelli viene abbandonato, principalmente per costi di spedizione nascosti e checkout complicato. Con guest checkout e pagamenti locali (PayPal, Satispay) si recupera il 18-22% delle conversioni perse.",
  },
  {
    q: "Quanto incide davvero il mobile sulle vendite e-commerce in Italia?",
    a: "Il 55.2% delle vendite e-commerce italiane avviene da smartphone (2024), con picchi del 79% per visite retail. Il 60% abbandona se il sito impiega più di 3 secondi. Apple Pay e Google Pay sono preferiti dal 67% dei 25-34enni. Un sito non ottimizzato mobile perde oltre metà del fatturato potenziale.",
  },
  {
    q: "Quali metodi di pagamento devo offrire per massimizzare le conversioni?",
    a: "Carte di credito/debito (33-48% delle transazioni), PayPal (29-32%), Postepay (essenziale per B2C), BNPL come Klarna/Scalapay (offerti dal 50% dei merchant). La mancanza di PayPal o Postepay può causare il 30% di abbandoni. Satispay cresce rapidamente nel retail fisico e online.",
  },
  {
    q: "Come gestire resi e diritto di recesso per aumentare la fiducia?",
    a: "Il diritto di recesso di 14 giorni è obbligatorio per legge. L'8-10% del fatturato va in resi (20% nel fashion). Politiche di reso flessibili aumentano del 30% gli ordini ripetuti. Offrire etichette prepagate e reso facile incrementa il customer lifetime value del 25% e riduce l'abbandono del carrello del 15%.",
  },
  {
    q: "Quali sono i costi reali di spedizione e logistica per PMI italiane?",
    a: "Spedizione gratuita sopra €110-120 aumenta il valore medio ordine del 12-18%. Il 58% abbandona se la consegna supera i 5 giorni. Spedizione express (24-48h) aumenta conversioni del 7-12%. I corrieri più affidabili sono BRT, GLS, Poste Italiane. Costi spedizione oltre il 10% del carrello causano +21-27% abbandoni.",
  },
  {
    q: "Il 'Made in Italy' influenza davvero le vendite online?",
    a: "Assolutamente sì. Il Made in Italy aumenta conversioni e valore ordine medio, specialmente in fashion, food, design. Genera fiducia immediata nei mercati esteri e permette prezzi premium. Per PMI italiane è un asset strategico che giustifica investimenti in branding e storytelling di prodotto.",
  },
  {
    q: "Quanto costa realmente lanciare un e-commerce per PMI?",
    a: "Shopify: €1.500-5.000 setup + €29-299/mese (ROI 9-18 mesi). WooCommerce: €1.000-4.000 + €20-100/mese (ROI 9-24 mesi). Custom: €15.000-100.000+ (ROI 18-48 mesi). Costi nascosti: fatturazione elettronica, integrazioni pagamenti, traduzioni. La maggior parte delle PMI recupera l'investimento in 18 mesi con marketing mirato.",
  },
  {
    q: "Come sfruttare i picchi stagionali (saldi, Black Friday, Natale)?",
    a: "Saldi gennaio/luglio e Black Friday generano picchi 2-3x delle vendite normali. Preparazione essenziale: scorte, server scalabili, customer service potenziato. Pre-lancio campagne 2 settimane prima. Il periodo natalizio resta il più importante: pianificare da ottobre, comunicare tempi di consegna chiari.",
  },
];

export default function EcommercePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-apty-bg-base flex items-center justify-center">
        <LumaSpin size={80} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-apty-bg-base overflow-x-hidden">
      {/* Hero Section */}
      <HeroSection />

      {/* Italian E-commerce Reality */}
      <ItalianEcommerceReality />

      {/* Cart Abandonment Section */}
      <CartAbandonmentSection />

      {/* Payment Methods Section */}
      <PaymentMethodsSection />

      {/* Mobile Commerce Section */}
      <MobileCommerceSection />

      {/* Shipping & Returns Section */}
      {/* <ShippingReturnsSection /> */}

      {/* Platform Comparison Section */}
      {/* <PlatformComparisonSection /> */}

      {/* Process Section */}
      <ProcessSection />

      {/* FAQ Section */}
      <FAQSection title="Domande Frequenti" titleHighlight="PMI E-commerce" questions={ecommerceFAQs} />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
