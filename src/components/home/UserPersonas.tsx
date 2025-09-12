"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function UserPersonas() {
  const personas = [
    {
      id: "starter",
      title: "Per piccole imprese",
      description: "Small business che cercano una presenza digitale di base",
      features: ["Sito web professionale", "Ottimizzazione SEO base", "Design responsive", "Supporto continuativo"],
      image: "/images/personas/starter-illustration.svg",
      imageAlt: "Configurazione base per piccole imprese",
    },
    {
      id: "pro",
      title: "Per imprenditori digitali",
      description: "Imprenditori con esigenze particolari che vogliono crescere",
      features: ["Soluzioni personalizzate", "Integrazioni avanzate", "Analytics e reporting", "Strategie di crescita"],
      image: "/images/personas/pro-illustration.svg",
      imageAlt: "Dashboard analytics per imprenditori",
    },
    {
      id: "ecommerce",
      title: "Per e-commerce",
      description: "E-commerce affermati che devono scalare il proprio business",
      features: [
        "Piattaforme scalabili",
        "Ottimizzazione conversioni",
        "Automazione processi",
        "Performance enterprise",
      ],
      image: "/images/personas/ecommerce-illustration.svg",
      imageAlt: "Soluzioni e-commerce scalabili",
    },
  ];

  return (
    <section className="py-24 bg-apty-bg-base">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Headline */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-[40px] leading-[48px] font-semibold mb-2 font-apty-heading text-apty-text-primary">
            Aiutiamo il tuo team a gestire il business digitale.
          </h2>
          <p className="text-[40px] leading-[48px] font-semibold font-apty-heading text-apty-text-primary">
            Più veloce e conveniente.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {personas.map((persona, index) => (
            <motion.div
              key={persona.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div
                className="
                h-full flex flex-col
                bg-apty-bg-muted 
                rounded-xl 
                p-4
                relative
              "
              >
                {/* Image/Illustration Area - Common white card with shadow for all */}
                <div className="h-50 mb-4 flex items-center justify-center">
                  <div
                    className={`${index === 2 || index === 1 ? "px-14" : "px-6"} py-4 rounded-lg bg-apty-bg-elevated shadow-apty-lg`}
                  >
                    {index === 0 && (
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-20 h-20 rounded-lg bg-apty-gradient-primary flex items-center justify-center">
                          <div className="w-10 h-10 rounded bg-apty-bg-base/30"></div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <div className="h-3 w-24 bg-apty-primary opacity-30 rounded"></div>
                          <div className="h-3 w-20 bg-apty-secondary opacity-30 rounded"></div>
                          <div className="h-3 w-22 bg-apty-tertiary opacity-30 rounded"></div>
                        </div>
                      </div>
                    )}
                    {index === 1 && (
                      <div className="flex items-end justify-center gap-0.5 h-20">
                        <div className="w-5 h-10 bg-apty-tertiary rounded-sm"></div>
                        <div className="w-5 h-14 bg-apty-primary rounded-sm"></div>
                        <div className="w-5 h-8 bg-apty-tertiary rounded-sm"></div>
                        <div className="w-5 h-10 bg-apty-secondary rounded-sm"></div>
                        <div className="w-5 h-16 bg-apty-primary rounded-sm"></div>
                        <div className="w-5 h-10 bg-apty-tertiary rounded-sm"></div>
                        <div className="w-5 h-12 bg-apty-secondary rounded-sm"></div>
                      </div>
                    )}
                    {index === 2 && (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-16 h-20 rounded-lg bg-apty-gradient-primary p-2 flex flex-col items-center justify-center shadow-apty-brand">
                          <div className="w-10 h-10 rounded bg-apty-bg-base opacity-30 mb-1"></div>
                          <div className="h-1 w-10 bg-apty-bg-base opacity-60 rounded"></div>
                        </div>
                        <div className="w-16 h-20 rounded-lg bg-apty-bg-subtle border-2 border-apty-border-strong p-2 flex flex-col items-center justify-center">
                          <div className="w-10 h-10 rounded bg-apty-primary opacity-20 mb-1"></div>
                          <div className="h-1 w-10 bg-apty-secondary opacity-30 rounded"></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Title with arrow - centered and bold */}
                <Link href="/pricing" className="group flex items-center justify-center gap-1 mb-4 cursor-pointer">
                  <h3
                    className="
                      text-base 
                      font-bold 
                      text-apty-text-primary 
                      group-hover:text-apty-primary 
                      apty-transition 
                      font-apty-heading
                    "
                  >
                    {persona.title}
                  </h3>
                  <span
                    className="
                      inline-block
                      text-apty-text-tertiary
                      group-hover:text-apty-primary 
                      transition-transform duration-200
                      group-hover:translate-x-1
                      text-lg
                    "
                  >
                    ›
                  </span>
                </Link>

                {/* Features Tags - using base background to match section */}
                <div className="flex flex-wrap gap-1.5 justify-center mt-auto">
                  {persona.features.map((feature, fIndex) => (
                    <span
                      key={fIndex}
                      className="
                          px-2.5 py-1
                          bg-apty-bg-base
                          text-apty-text-secondary
                          text-[11px]
                          rounded-full
                          whitespace-nowrap
                          apty-transition
                        "
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
