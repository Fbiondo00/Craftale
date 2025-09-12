"use client";

import { motion } from "framer-motion";

const optionalServices = [
  {
    category: "Fotografia",
    icon: "📸",
    items: [
      {
        name: "Servizio Base (20 foto)",
        price: 350,
        description: "Mezza giornata, editing professionale, foto web-ready",
      },
      {
        name: "Servizio Esteso (40 foto + video)",
        price: 550,
        description: "Giornata completa, video presentazione, footage extra",
      },
      {
        name: "Sessione Stagionale",
        price: 250,
        description: "Follow-up per aggiornamenti stagionali",
      },
    ],
  },
  {
    category: "Copywriting",
    icon: "✍️",
    items: [
      {
        name: "Menu Descriptions",
        price: 200,
        description: "Riscrittura completa menu con linguaggio gourmet",
      },
      {
        name: "Storia Ristorante",
        price: 150,
        description: "Storytelling professionale heritage aziendale",
      },
      {
        name: "Blog Setup (5 articoli)",
        price: 300,
        description: "Contenuti SEO-optimized, ricette, territorio",
      },
      {
        name: "Traduzione Menu inglese",
        price: 120,
        description: "Menu completo tradotto per turisti internazionali",
      },
    ],
  },
  {
    category: "Funzionalità Tecniche",
    icon: "⚙️",
    items: [
      {
        name: "WhatsApp Business integration",
        price: 80,
        description: "Catalogo prodotti, messaggi automatici, click-to-chat",
      },
      {
        name: "Carte Fedeltà digitale",
        price: 200,
        description: "Sistema punti base, QR codes, gestione clienti",
      },
      {
        name: "POS Integration",
        price: 500,
        description: "Sync real-time con sistemi POS esistenti",
      },
      {
        name: "App Mobile proprietaria",
        price: 1200,
        description: "iOS/Android nativa con push notifications",
      },
    ],
  },
  {
    category: "Marketing",
    icon: "📈",
    items: [
      {
        name: "Setup Social Media",
        price: 150,
        description: "Account business, pixel tracking, catalogo prodotti",
      },
      {
        name: "SEO Locale Avanzato",
        price: 300,
        description: "Ricerca keywords, content strategy, local citations",
      },
      {
        name: "Google Ads Setup",
        price: 200,
        description: "Account setup, prima campagna, targeting locale",
      },
      {
        name: "Social Media Management",
        price: 400,
        recurring: true,
        description: "Gestione professionale 4 post/settimana",
      },
    ],
  },
];

export default function OptionalServices() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-color-primary mb-4">Servizi Opzionali</h3>
          <p className="text-xl text-color-tertiary">
            Personalizza la tua soluzione con servizi aggiuntivi specializzati
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {optionalServices.map((category, index) => (
            <motion.div
              key={category.category}
              className="bg-color-subtle rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="text-center mb-6">
                <span className="text-4xl mb-3 block">{category.icon}</span>
                <h4 className="text-xl font-bold text-color-primary">{category.category}</h4>
              </div>

              <div className="space-y-4">
                {category.items.map((item, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-4 border border-color-default">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-semibold text-color-primary text-sm">{item.name}</h5>
                      <span className="font-bold text-brand-secondary text-sm">
                        €{item.price}
                        {item.recurring && "/mese"}
                      </span>
                    </div>
                    <p className="text-xs text-color-tertiary leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-brand-secondary/10 rounded-2xl p-8">
            <h4 className="text-2xl font-bold text-color-primary mb-4">Configurazioni Ottimali Raccomandate</h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
              <div className="bg-white rounded-lg p-4 border border-brand-secondary/30">
                <h5 className="font-semibold text-indigo-900 mb-2">👨‍👩‍👧‍👦 Trattorie Familiari</h5>
                <p className="text-sm text-color-secondary mb-2">TIER 1B + Fotografia + Storia</p>
                <p className="font-bold text-brand-secondary">€1.750 totale</p>
              </div>

              <div className="bg-white rounded-lg p-4 border border-brand-tertiary/30">
                <h5 className="font-semibold text-purple-900 mb-2">🚀 Nuovi Imprenditori</h5>
                <p className="text-sm text-color-secondary mb-2">TIER 2B + Social Management + Google Ads</p>
                <p className="font-bold text-brand-tertiary">€2.600 + €400/mese</p>
              </div>

              <div className="bg-white rounded-lg p-4 border border-color-state-success-border">
                <h5 className="font-semibold text-green-900 mb-2">👑 Ristoranti Upscale</h5>
                <p className="text-sm text-color-secondary mb-2">TIER 3B + App Mobile + Analytics</p>
                <p className="font-bold text-color-state-success-strong">€6.000 + €150/mese</p>
              </div>

              <div className="bg-white rounded-lg p-4 border border-yellow-200">
                <h5 className="font-semibold text-yellow-900 mb-2">🍕 Catene/Franchising</h5>
                <p className="text-sm text-color-secondary mb-2">TIER 3C + Enterprise Support + API</p>
                <p className="font-bold text-color-state-warning-strong">€6.500 + €500/mese</p>
              </div>

              <div className="bg-white rounded-lg p-4 border border-orange-200">
                <h5 className="font-semibold text-orange-900 mb-2">🌿 Specialisti Regionali</h5>
                <p className="text-sm text-color-secondary mb-2">TIER 1C + Blog + SEO Locale</p>
                <p className="font-bold text-orange-600">€2.250 totale</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
