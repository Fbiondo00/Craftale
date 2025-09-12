"use client";

import { useEffect, useState } from "react";
import CTASection from "@/components/home/CTASection";
import DowntimeCostSection from "@/components/maintenance/DowntimeCostSection";
import HeroSection from "@/components/maintenance/HeroSection";
import ProcessSection from "@/components/maintenance/ProcessSection";
import ROISection from "@/components/maintenance/ROISection";
import SecurityThreatsSection from "@/components/maintenance/SecurityThreatsSection";
import FAQSection from "@/components/sections/FAQSection";
import { LumaSpin } from "@/components/ui/luma-spin";

// FAQ Questions for Italian SMBs - Maintenance Services
const maintenanceFAQs = [
  {
    q: "Quanto costa davvero il downtime per una PMI italiana?",
    a: "Il downtime costa alle PMI italiane €9.000-15.000 all'ora, con perdite totali fino a €4,35 milioni per incidente grave (dati IBM 2024). Il 42-45% degli utenti non ritorna mai dopo errori significativi del sito. Per un e-commerce italiano medio, anche solo 3 ore di downtime possono significare €27.000 di perdite dirette, più il danno reputazionale a lungo termine.",
  },
  {
    q: "Ogni quanto devo aggiornare WordPress, plugin e componenti di sicurezza?",
    a: "CMS come WordPress: aggiornamenti mensili o immediati per patch di sicurezza (ogni 4-6 settimane). Plugin e temi: controllo settimanale o auto-aggiornamenti. Patch di sicurezza: entro 48 ore dal rilascio secondo CERT-AgID. Il 67% dei breach italiani nel 2024-25 sono causati da software non aggiornato, con costi di recupero di €24.000-38.000 per PMI.",
  },
  {
    q: "Qual è il rischio reale di essere hackerati senza manutenzione?",
    a: "Il 19-23% dei siti PMI italiani viene compromesso annualmente per manutenzione insufficiente (Clusit 2025). I costi: ransomware €38.000-46.000, recupero €20.000-45.000, perdita reputazionale 20-35% dei clienti, fatturato -€10.000-80.000 nei 6 mesi successivi. La manutenzione preventiva costa 10 volte meno del recupero post-attacco.",
  },
  {
    q: "Come influisce la manutenzione su SEO e traffico organico?",
    a: "Siti mantenuti regolarmente vedono +25-40% di traffico organico rispetto a quelli non mantenuti. La manutenzione impatta direttamente Core Web Vitals, uptime, crawlability - fattori cruciali per Google. Siti non mantenuti rischiano penalizzazioni improvvise, perdita di ranking e crolli di traffico fino al -40%.",
  },
  {
    q: "Quali sono i problemi più comuni che causano perdite di business?",
    a: "Form rotti (contatti, ordini): 6-14% dei siti annualmente. Certificati SSL scaduti: 10-18% dei siti. Conflitti plugin/temi: 10-18%. Ogni incidente costa €1.000-7.200 in vendite perse per PMI e-commerce. Il 53% degli utenti italiani abbandona dopo errori, il 38% perde fiducia permanentemente.",
  },
  {
    q: "Quali sono gli standard di backup e recovery per PMI italiane?",
    a: "Siti vetrina: backup settimanali, RTO 2-20 ore, RPO 12-48 ore. E-commerce: backup giornalieri, RTO 1-4 ore, RPO 1-4 ore. Il tempo di recovery critico per non perdere clienti è 4 ore. Oltre questo limite, il 54% abbandona durante checkout/errori critici.",
  },
  {
    q: "Quali sono i rischi legali GDPR senza manutenzione adeguata?",
    a: "Multe GDPR: €2.000-27.000 per violazione PMI (fino a €20 milioni o 4% fatturato). Codice Privacy: €10.000-120.000 per data breach. Cookie Law: fino a €120.000. Le cause per privacy e downtime sono raddoppiate dal 2022 al 2024 in Italia, con PMI che rappresentano il 40% dei casi.",
  },
  {
    q: "Conviene la manutenzione preventiva vs interventi d'emergenza?",
    a: "Assolutamente sì. Manutenzione preventiva: €50-900/mese. Riparazioni d'emergenza: €700-3.500 per incidente. ROI della prevenzione: 140-220%. Include anche costi nascosti evitati: straordinari staff €2.000-5.000/mese, produttività persa €500-2.000/mese, opportunità mancate €5.000+/mese per e-commerce.",
  },
];

export default function MaintenancePage() {
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

      {/* Real Cost of Downtime Section */}
      <DowntimeCostSection />

      {/* Security & Breach Statistics */}
      <SecurityThreatsSection />

      {/* ROI of Maintenance Section */}
      <ROISection />

      {/* Our Process Section */}
      <ProcessSection />

      {/* FAQ Section */}
      <FAQSection title="Domande Frequenti" titleHighlight="PMI Manutenzione" questions={maintenanceFAQs} />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
