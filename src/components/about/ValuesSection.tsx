'use client';

import { motion } from 'framer-motion';
import { Lightbulb, Users, Zap, Shield } from 'lucide-react';

export default function ValuesSection() {
  const values = [
    {
      icon: Lightbulb,
      title: 'Cura per il Cliente',
      description: 'Ogni cliente dialoga direttamente con il team. Mettiamo al centro le tue esigenze, offrendo assistenza continua e soluzioni personalizzate.',
      color: 'text-apty-primary',
      bgColor: 'bg-apty-primary/10'
    },
    {
      icon: Users,
      title: 'Tecnologia Moderna',
      description: 'Utilizziamo solo strumenti e framework di ultima generazione. Il tuo sito sarà veloce, sicuro e pronto per il futuro del web.',
      color: 'text-apty-secondary',
      bgColor: 'bg-apty-secondary/10'
    },
    {
      icon: Zap,
      title: 'Risultati Misurabili',
      description: 'Non ci limitiamo a costruire siti belli. Ogni progetto include analytics integrati per monitorare performance e ROI in tempo reale.',
      color: 'text-apty-tertiary',
      bgColor: 'bg-apty-tertiary/10'
    },
    {
      icon: Shield,
      title: 'Trasparenza Totale',
      description: 'Dal preventivo alla consegna, sai sempre cosa aspettarti. Prezzi chiari, tempistiche definite e aggiornamenti costanti sul progresso.',
      color: 'text-apty-accent',
      bgColor: 'bg-apty-accent/10'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-apty-bg-subtle">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-[40px] leading-[48px] font-semibold font-apty-heading text-apty-text-primary mb-4">
            I <span className="text-apty-primary">Valori</span> Che Guidano Ogni Nostro Progetto
          </h2>
          <p className="text-base sm:text-lg text-apty-text-secondary max-w-3xl mx-auto px-2 sm:px-4 md:px-0">
            Principi chiari che si traducono in benefici concreti per il tuo business. 
            Non solo promesse, ma impegni che rispettiamo in ogni fase del lavoro.
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group"
              >
                <div className="
                  h-full flex flex-col
                  bg-apty-bg-base
                  rounded-xl 
                  p-4 sm:p-5 md:p-6
                  border border-apty-border-subtle
                  hover:border-apty-border-default
                  hover:shadow-apty-md
                  transition-all duration-200
                ">
                  {/* Icon */}
                  <div className={`
                    w-12 h-12 sm:w-14 sm:h-14 
                    ${value.bgColor}
                    rounded-xl 
                    flex items-center justify-center 
                    mb-3 sm:mb-4
                    group-hover:scale-110
                    transition-transform duration-200
                  `}>
                    <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${value.color}`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-base sm:text-lg font-semibold text-apty-text-primary mb-2">
                    {value.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-apty-text-secondary leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}