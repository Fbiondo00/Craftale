"use client";

import { Service } from "@/types/home-page";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, Code2, Monitor, Smartphone } from "lucide-react";

interface ServicesSectionProps {
  activeService: number;
  onServiceClick: (index: number) => void;
}

export default function ServicesSection({ activeService, onServiceClick }: ServicesSectionProps) {
  const services: Service[] = [
    {
      icon: Monitor,
      title: "Design del Sito",
      description: "Design belli e orientati alla conversione che fanno emergere il tuo brand",
      features: ["Design Personalizzato", "Mobile First", "Integrazione Brand", "User Research"],
      color: "from-brand-secondary/90 to-blue-500",
    },
    {
      icon: Code2,
      title: "Sviluppo Web",
      description: "Siti veloci, sicuri e scalabili costruiti con tecnologia moderna",
      features: ["React/Next.js", "Performance Ottimizzate", "SEO Ready", "Integrazione CMS"],
      color: "from-brand-tertiary/90 to-brand-secondary/90",
    },
    {
      icon: Smartphone,
      title: "E-commerce",
      description: "Store online che trasformano i visitatori in clienti e aumentano le vendite",
      features: ["Shopify/WooCommerce", "Integrazione Pagamenti", "Gestione Magazzino", "Analytics"],
      color: "from-brand-accent/90 to-rose-500",
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Cosa Costruiamo <span className="text-brand-secondary">Per Te</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Non siamo solo web designer – siamo i tuoi partner per la crescita digitale. Ecco come aiutiamo il tuo
            business a crescere online.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isActive = activeService === index;
            return (
              <motion.div
                key={index}
                className={`bg-card p-8 rounded-2xl border shadow-sm hover:shadow-lg transition-all duration-500 group cursor-pointer relative overflow-hidden ${
                  isActive ? "border-brand-secondary/90 shadow-xl" : ""
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => onServiceClick(index)}
              >
                {/* Background glow effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  animate={isActive ? { opacity: 0.1 } : {}}
                />

                <motion.div
                  className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative`}
                  animate={
                    isActive
                      ? {
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0],
                        }
                      : {}
                  }
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Icon className="w-8 h-8 text-white" />

                  {/* Pulse effect for active service */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 border-2 border-brand-secondary/60 rounded-2xl"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [1, 0, 1],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.div>

                <h3 className="text-2xl font-bold mb-4 group-hover:text-brand-secondary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>

                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <motion.li
                      key={feature}
                      className="flex items-center space-x-2 text-sm"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: featureIndex * 0.1 }}
                    >
                      <motion.div whileHover={{ scale: 1.2, rotate: 360 }} transition={{ duration: 0.3 }}>
                        <CheckCircle className="w-4 h-4 text-color-state-success" />
                      </motion.div>
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Active indicator */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      className="absolute top-4 right-4"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                    >
                      <div className="w-3 h-3 bg-brand-secondary/90 rounded-full animate-pulse" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
