'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Circle, Clock, Target, Palette, Code2, TrendingUp, Rocket, Lightbulb, ArrowRight } from 'lucide-react';

interface ProcessStage {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  duration: string;
  deliverables: string[];
  icon: React.ElementType;
  gradient: string;
}

const web44Stages: ProcessStage[] = [
  {
    id: '1',
  title: 'Accendiamo la Visione',
  subtitle: 'Discovery & Strategia',
  description: 'Analizziamo a fondo i tuoi obiettivi e individuiamo opportunità per posizionarti davanti alla concorrenza.',
    status: 'completed',
    duration: '2-3 weeks',
    deliverables: ['Market Research', 'User Personas', 'Competitive Analysis', 'Strategy Blueprint'],
    icon: Lightbulb,
    gradient: 'bg-apty-gradient-primary'
  },
  {
    id: '2',
  title: 'Progettiamo il Successo',
  subtitle: 'Pianificazione & Architettura',
  description: 'Workshop strategici che trasformano gli insight in una roadmap concreta orientata ai risultati.',
    status: 'completed',
    duration: '2-3 weeks',
    deliverables: ['Wireframes', 'Site Architecture', 'User Journey Maps', 'Technical Specs'],
    icon: Target,
    gradient: 'bg-apty-gradient-secondary'
  },
  {
    id: '3',
  title: 'Creiamo l’Esperienza',
  subtitle: 'Design & Prototipazione',
  description: 'Design di livello che eleva il tuo brand e crea esperienze che trasformano i visitatori in clienti.',
    status: 'in-progress',
    duration: '3-4 weeks',
    deliverables: ['Visual Design', 'Interactive Prototype', 'Design System', 'Brand Guidelines'],
    icon: Palette,
    gradient: 'bg-apty-gradient-vibrant'
  },
  {
    id: '4',
  title: 'Ingegnerizziamo le Performance',
  subtitle: 'Sviluppo & Integrazione',
  description: 'Sviluppo solido e scalabile che garantisce piattaforme velocissime pronte a crescere.',
    status: 'upcoming',
    duration: '6-8 weeks',
    deliverables: ['Frontend Code', 'Backend API', 'CMS Integration', 'Performance Optimization'],
    icon: Code2,
    gradient: 'bg-apty-gradient-soft'
  },
  {
    id: '5',
  title: 'Ottimizziamo & Testiamo',
  subtitle: 'Quality Assurance',
  description: 'Test rigorosi e ottimizzazioni continue per assicurare prestazioni al massimo livello.',
    status: 'upcoming',
    duration: '2-3 weeks',
    deliverables: ['Cross-browser Testing', 'Performance Audit', 'Security Testing', 'Bug Fixes'],
    icon: TrendingUp,
    gradient: 'bg-apty-gradient-primary'
  },
  {
    id: '6',
  title: 'Lanciamo alla Grande',
  subtitle: 'Go Live & Supporto',
  description: 'Deploy impeccabile senza sorprese: il tuo brand fa un’ottima prima impressione dal primo giorno.',
    status: 'upcoming',
    duration: 'Ongoing',
    deliverables: ['Production Deploy', 'Performance Monitor', 'User Training', 'Ongoing Support'],
    icon: Rocket,
    gradient: 'bg-apty-gradient-vibrant'
  }
];

export default function ProcessSection() {
  return (
    <section id='our-process' className="py-24 bg-apty-bg-base overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Heading */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-[40px] leading-[48px] font-semibold font-apty-heading text-apty-text-primary mb-2">
            <span className="text-apty-primary">IL NOSTRO</span> PROCESSO COLLAUDATO.
          </h2>
          <h3 className="text-[32px] leading-[40px] font-semibold font-apty-heading text-apty-text-primary mb-6">
            PROGETTATO PER IL <span className="text-apty-primary">SUCCESSO</span>.
          </h3>
          <p className="text-lg text-apty-text-secondary max-w-4xl mx-auto leading-relaxed">
            Non costruiamo solo siti web: progettiamo esperienze digitali che generano risultati. 
            Il nostro processo collaudato trasforma la tua visione in una realtà ad alto tasso di conversione, 
            senza sorprese e con il massimo impatto.
          </p>
        </motion.div>

        {/* Process Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Desktop: Vertical center line | Mobile: Left line */}
          <div className="absolute left-6 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-[2px] bg-gradient-to-b from-apty-primary/20 via-apty-primary/40 to-apty-primary/20" />
          
          {/* Process Stages */}
          <div className="space-y-8 md:space-y-16">
            {web44Stages.map((stage, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={stage.id}
                  className={`
                    relative 
                    flex flex-row md:flex-row items-start md:items-center gap-4 md:gap-8
                    ${isEven ? '' : 'md:flex-row-reverse'}
                  `}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Mobile Layout - Everything flows from left timeline */}
                  {/* Desktop Layout - Alternating sides */}
                  
                  {/* Content Side - Hidden on mobile, shown on desktop */}
                  <div className={`hidden md:flex flex-1 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                    <div className={`${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                      {/* Stage Number and Title */}
                      <div className={`flex items-center gap-3 mb-3 ${
                        isEven ? 'md:flex-row-reverse' : ''
                      }`}>
                        <span className="text-5xl font-bold bg-gradient-to-br from-apty-primary/30 to-apty-tertiary/30 bg-clip-text text-transparent">
                          {stage.id}
                        </span>
                        <div className={`${isEven ? 'md:text-right' : ''}`}>
                          <h3 className="text-xl font-bold text-apty-text-primary font-apty-heading group cursor-default">
                            {stage.title}
                            {stage.status === 'in-progress' && (
                              <span className="ml-2 inline-block w-2 h-2 bg-apty-primary rounded-full animate-apty-pulse" />
                            )}
                          </h3>
                          <p className="text-sm text-apty-tertiary font-medium">
                            {stage.subtitle}
                          </p>
                        </div>
                      </div>
                      
                      {/* Description */}
                      <p className="text-apty-text-secondary mb-4 leading-relaxed">
                        {stage.description}
                      </p>
                      
                      {/* Duration Tag */}
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 bg-apty-primary/10 rounded-full ${
                        isEven ? 'md:flex-row-reverse' : ''
                      }`}>
                        <Clock className="w-3.5 h-3.5 text-apty-primary" />
                        <span className="text-xs font-medium text-apty-primary">
                          {stage.duration}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Center Icon - Positioned on left line for mobile */}
                  <motion.div 
                    className={`relative z-10 md:mt-0 ${
                      stage.id === '4' || stage.id === '6' ? 'mt-6' : 'mt-4'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className={`
                      w-12 h-12 md:w-16 md:h-16 
                      rounded-full 
                      flex items-center justify-center
                      border-4 border-apty-bg-base
                      shadow-apty-brand
                      apty-hover-lift cursor-pointer
                      ${
                        stage.id === '1' ? 'bg-apty-gradient-primary' :
                        stage.id === '2' ? 'bg-apty-gradient-secondary' :
                        stage.id === '3' ? 'bg-apty-gradient-vibrant' :
                        stage.id === '4' ? 'bg-apty-gradient-vibrant' :
                        stage.id === '5' ? 'bg-apty-gradient-secondary' :
                        stage.id === '6' ? 'bg-apty-gradient-primary' :
                        'bg-apty-gradient-primary'
                      }
                    `}>
                      {stage.status === 'completed' ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
                        >
                          <stage.icon className="w-6 h-6 md:w-8 md:h-8 text-apty-text-on-brand" />
                        </motion.div>
                      ) : stage.status === 'in-progress' ? (
                        <motion.div
                          animate={{ 
                            rotate: [0, 360],
                          }}
                          transition={{
                            rotate: {
                              duration: 20,
                              repeat: Infinity,
                              ease: "linear"
                            }
                          }}
                        >
                          <stage.icon className="w-6 h-6 md:w-8 md:h-8 text-apty-text-on-brand" />
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
                        >
                          <stage.icon className="w-6 h-6 md:w-8 md:h-8 text-apty-text-on-brand" />
                        </motion.div>
                      )}
                    </div>
                    {/* Ring animation for in-progress */}
                    {stage.status === 'in-progress' && (
                      <>
                        <motion.div 
                          className="absolute inset-0 rounded-full border-2 border-apty-primary"
                          animate={{ 
                            scale: [1, 1.3, 1],
                            opacity: [0.5, 0, 0.5]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                        <motion.div 
                          className="absolute inset-0 rounded-full border-2 border-apty-tertiary"
                          animate={{ 
                            scale: [1, 1.5, 1],
                            opacity: [0.3, 0, 0.3]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.5
                          }}
                        />
                      </>
                    )}
                  </motion.div>

                  {/* Mobile: Combined content and deliverables card */}
                  <div className="flex-1 md:hidden">
                    <div className="bg-apty-bg-muted rounded-lg p-4">
                      {/* Stage header */}
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-3xl font-bold bg-gradient-to-br from-apty-primary/30 to-apty-tertiary/30 bg-clip-text text-transparent">
                              {stage.id}
                            </span>
                            <div>
                              <h3 className="text-lg font-bold text-apty-text-primary font-apty-heading">
                                {stage.title}
                              </h3>
                              <p className="text-xs text-apty-tertiary font-medium">
                                {stage.subtitle}
                              </p>
                            </div>
                          </div>
                        </div>
                        {/* Duration tag */}
                        <div className="flex items-center gap-1 px-2 py-1 bg-apty-primary/10 rounded-full">
                          <Clock className="w-3 h-3 text-apty-primary" />
                          <span className="text-xs font-medium text-apty-primary">
                            {stage.duration}
                          </span>
                        </div>
                      </div>
                      
                      {/* Description */}
                      <p className="text-sm text-apty-text-secondary mb-4 leading-relaxed">
                        {stage.description}
                      </p>
                      
                      {/* Deliverables */}
                      <div>
                        <h4 className="text-xs font-semibold text-apty-primary uppercase tracking-wider mb-2 flex items-center gap-2">
                          <ArrowRight className="w-3 h-3" />
                          Output Principali
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {stage.deliverables.map((deliverable, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 bg-apty-bg-base text-xs text-apty-text-secondary rounded-full"
                            >
                              {deliverable}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Desktop: Deliverables Side - Hidden on mobile */}
                  <div className={`hidden md:flex flex-1 ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                    <motion.div 
                      className={`w-full ${isEven ? 'md:pl-12' : 'md:pr-12'}`}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                    >
                      <div className="bg-apty-bg-muted rounded-lg p-4 group hover:bg-apty-bg-elevated apty-transition cursor-default">
                        <h4 className={`text-xs font-semibold text-apty-primary uppercase tracking-wider mb-3 flex items-center gap-2 ${
                          isEven ? '' : 'md:justify-end md:flex-row-reverse'
                        }`}>
                          <ArrowRight className="w-3 h-3" />
                          Output Principali
                        </h4>
                        <div className={`flex flex-wrap gap-2 ${
                          isEven ? '' : 'md:justify-end'
                        }`}>
                          {stage.deliverables.map((deliverable, idx) => (
                            <motion.span
                              key={idx}
                              className="px-3 py-1.5 bg-apty-bg-base text-xs text-apty-text-secondary rounded-full hover:text-apty-primary hover:bg-apty-primary/5 apty-transition cursor-pointer"
                              whileHover={{ scale: 1.05 }}
                              initial={{ opacity: 0, scale: 0.9 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.1 + idx * 0.05 }}
                            >
                              {deliverable}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Timeline Summary */}
        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-apty-primary/10 to-apty-tertiary/10 border border-apty-primary/30 rounded-full px-8 py-4">
            <Clock className="w-5 h-5 text-apty-primary" />
            <span className="text-lg font-semibold text-apty-text-primary">
              12-16 settimane al <span className="text-apty-primary">lancio</span>
            </span>
            <motion.div 
              className="w-2 h-2 bg-apty-primary rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
          <p className="text-sm text-apty-text-secondary mt-3">
            Dal primo incontro ai risultati concreti
          </p>
        </motion.div>
      </div>
    </section>
  );
}