"use client";

import { useEffect, useState } from "react";
import CTASection from "@/components/home/CTASection";
import FAQSection from "@/components/sections/FAQSection";
import AISearchSection from "@/components/seo/AISearchSection";
import GoogleRankingsSection from "@/components/seo/GoogleRankingsSection";
import HeroSection from "@/components/seo/HeroSection";
import LocalSEOSection from "@/components/seo/LocalSEOSection";
import ProcessSection from "@/components/seo/ProcessSection";
import ROISection from "@/components/seo/ROISection";
import { LumaSpin } from "@/components/ui/luma-spin";

// FAQ Questions for Italian SMBs - SEO Services
const seoFAQs = [
  {
    q: "Qual è il ROI medio del SEO per PMI italiane nel 2025?",
    a: "Le PMI italiane che investono in SEO locale registrano ROI medi tra 500% e 900%, con ogni €1.000 investiti che generano €5.000-9.000 di valore in clienti acquisiti. Il break-even avviene tipicamente in 6-12 mesi per mercati locali, mentre per e-commerce nazionali si estende a 12-18 mesi. Un artigiano veneto ha ottenuto +90% di richieste preventivo in 8 mesi e +38% di clientela da ricerca organica.",
  },
  {
    q: "Quanto traffico va davvero alle prime posizioni Google?",
    a: "In Italia, il 93-96% dei clic organici va alla prima pagina Google, con le prime 3 posizioni che catturano il 43-56% del traffico totale. La posizione 1 riceve il 42% dei clic per servizi locali, mentre su mobile le prime 3 posizioni arrivano al 60% dei clic totali. Dalla seconda pagina in poi, il traffico è sotto il 4-7%.",
  },
  {
    q: "Come influisce l'AI (Google SGE, Bing Copilot) sul SEO nel 2025?",
    a: "L'AI search ha causato un calo del 15% del traffico organico tradizionale, ma il traffico da AI assistant è cresciuto del 2100%. Il CTR sui risultati organici cala del 34% quando sono presenti AI summaries. Solo il 18% delle PMI italiane usa AI per SEO, creando un'opportunità competitiva per chi adotta presto queste strategie. Le citazioni in AI Overviews sono la nuova metrica di autorevolezza.",
  },
  {
    q: "Mobile vs Desktop: dove cercano gli italiani nel 2025?",
    a: "Il 71% delle ricerche in Italia avviene da mobile, con conversioni del 1.9-2.2% (vs 2.7-3.1% desktop). Il mobile domina in e-commerce moda (78-83% visite), mentre il B2B resta più desktop (45-55%). Le ricerche locali 'vicino a me' sono cresciute del 23% anno su anno, con il 42% che porta a visite fisiche entro 24 ore.",
  },
  {
    q: "Quanto costano i servizi SEO professionali vs fai-da-te?",
    a: "I servizi SEO professionali per PMI italiane partono da €500-800/mese per soluzioni base, fino a €2.000-3.000/mese per piani avanzati. Il fai-da-te comporta rischi nascosti: penalizzazioni Google (recupero €5.000+), perdita del 34-40% di quota mercato in 18 mesi, e tempo di recupero di 6-12 mesi. Il 94% dei clic va ai risultati organici, rendendo il SEO cruciale.",
  },
  {
    q: "Come influiscono Core Web Vitals e velocità pagina sui ranking?",
    a: "Siti che rispettano i Core Web Vitals (LCP <2.5s, FID <100ms, CLS <0.1) vedono riduzione bounce rate del 12-18% e aumento conversioni dell'8-15%. Ogni 100ms di miglioramento velocità aumenta le conversioni dell'1.1%. Pagine con LCP sopra 3 secondi hanno bounce rate 32% più alto. L'impatto è maggiore su mobile, che rappresenta il 65% del traffico italiano.",
  },
  {
    q: "Qual è l'importanza di E-E-A-T per siti italiani?",
    a: "E-E-A-T (Experience, Expertise, Authoritativeness, Trust) è centrale per Google dal 2022, specialmente per settori YMYL (finanza, salute, legale). Siti con forti segnali E-E-A-T hanno CTR fino al 35% superiore e maggiori chance di featured snippets. Per PMI italiane, recensioni locali autentiche e business listing accurati sono critici per il ranking locale.",
  },
  {
    q: "Come ottimizzare per le ricerche vocali in Italia?",
    a: "Il 15-20% delle ricerche in Italia sono vocali, principalmente su mobile. Dominano query conversazionali e long-tail ('Dove trovo il miglior ristorante vicino a me?'). Settori più impattati: ristorazione, servizi professionali, turismo. Strategie chiave: contenuti conversazionali naturali, ottimizzazione 'vicino a me', FAQ strutturate, schema markup completo.",
  },
  {
    q: "Google My Business vale davvero per attività locali?",
    a: "GMB ottimizzato genera +70% discovery searches, +50% chiamate dirette e richieste indicazioni. Le PMI con GMB attivo vedono €1.200-3.500/mese di ricavi extra da lead locali in aree urbane. Il 68% degli utenti che vedono un profilo GMB interagisce (chiama, mappa, visita sito). Conversione media GMB: 6-11%, molto superiore ad altri canali.",
  },
  {
    q: "Quanto crescono le PMI che investono in SEO vs chi non lo fa?",
    a: "PMI italiane nel top 10% per investimento SEO catturano 3x più traffico organico e 2.3x conversioni dei competitor. Crescita annuale attesa: Retail +25-35%, Servizi locali +27-35%, Hospitality +18-28%. Chi ignora il SEO perde 34-40% quota mercato in 18 mesi, con 6-12 mesi per recuperare. I leader SEO dominano featured snippets e local pack.",
  },
];

export default function SEOPage() {
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

      {/* Google Rankings & CTR Section */}
      <GoogleRankingsSection />

      {/* AI Search Impact Section */}
      <AISearchSection />

      {/* ROI Section */}
      <ROISection />

      {/* Local SEO Section */}
      <LocalSEOSection />

      {/* Process Section */}
      <ProcessSection />

      {/* FAQ Section */}
      <FAQSection title="Domande Frequenti" titleHighlight="PMI SEO" questions={seoFAQs} />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
