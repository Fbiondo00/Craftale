'use client';

import { motion } from 'framer-motion';

interface Founder {
  name: string;
  role: string;
  bio: string;
  image: string;
  expertise: string[];
  socials: {
    github?: string;
    linkedin?: string;
    email: string;
  };
}

export default function TeamSection() {
  const founders: Founder[] = [
    {
      name: 'Alessandro Rossi',
      role: 'CEO & Direttore Creativo',
      bio: 'Con oltre 10 anni nel design digitale, Alessandro trasforma idee complesse in esperienze eleganti e user-centric. La sua visione: ogni pixel deve raccontare parte della tua storia.',
      image: '/images/team/alessandro.jpg',
      expertise: ['Design UI/UX', 'Strategia di Brand', 'Direzione Creativa'],
      socials: {
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        email: 'alessandro@craftale.com'
      }
    },
    {
      name: 'Marco Bianchi',
      role: 'CTO & Lead Developer',
      bio: 'Architetto full-stack che crede nel codice pulito e nelle soluzioni scalabili. Marco assicura che ogni racconto digitale sia costruito su fondamenta di eccellenza tecnica.',
      image: '/images/team/marco.jpg',
      expertise: ['Sviluppo Full-Stack', 'Architettura Cloud', 'Ottimizzazione Performance'],
      socials: {
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        email: 'marco@craftale.com'
      }
    },
    {
      name: 'Sofia Verdi',
      role: 'COO & Responsabile Strategia',
      bio: 'Sofia collega obiettivi di business ed esecuzione digitale. La sua mentalità strategica garantisce che ogni progetto porti impatto misurabile e crescita sostenibile.',
      image: '/images/team/sofia.jpg',
      expertise: ['Strategia Aziendale', 'Project Management', 'Growth Marketing'],
      socials: {
        linkedin: 'https://linkedin.com',
        email: 'sofia@craftale.com'
      }
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-apty-bg-base">
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
            Dietro Ogni Progetto, Ci Siamo <span className="text-apty-primary">Noi</span>
          </h2>
          <p className="text-base sm:text-lg text-apty-text-secondary max-w-3xl mx-auto px-2 sm:px-4 md:px-0">
            Tre professionisti con background diversi ma una visione comune: creare esperienze digitali 
            che fanno la differenza. Competenze tecniche, sensibilità creativa e passione per l'innovazione 
            guidano ogni nostro progetto.
          </p>
        </motion.div>

        {/* Founders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {founders.map((founder, index) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="bg-apty-bg-muted rounded-xl overflow-hidden group">
                {/* Image Container */}
                <div className="relative h-48 sm:h-56 md:h-64 bg-gradient-to-br from-apty-primary/20 to-apty-secondary/20 overflow-hidden">
                  {/* Placeholder for actual image */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-apty-bg-base/50 flex items-center justify-center">
                      <span className="text-3xl md:text-4xl font-bold text-apty-primary">
                        {founder.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>
                  {/* Actual image would go here */}
                  {/* <Image
                    src={founder.image}
                    alt={founder.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  /> */}
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 md:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-apty-text-primary mb-1">
                    {founder.name}
                  </h3>
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <p className="text-sm sm:text-base text-apty-primary font-medium">
                      {founder.role}
                    </p>
                    {founder.socials.linkedin && (
                      <a
                        href={founder.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-apty-primary hover:text-apty-primary/80 transition-colors"
                      >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-apty-text-secondary leading-relaxed mb-3 md:mb-4">
                    {founder.bio}
                  </p>

                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {founder.expertise.map(skill => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium bg-apty-bg-base text-apty-text-tertiary rounded-md border border-apty-border-subtle"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}