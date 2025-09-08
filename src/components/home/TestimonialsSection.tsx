'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Testimonial } from '@/types/home-page';

interface TestimonialsSectionProps {
  testimonialIndex: number;
  onTestimonialChange: (index: number) => void;
}

export default function TestimonialsSection({
  testimonialIndex,
  onTestimonialChange,
}: TestimonialsSectionProps) {
  const testimonials: Testimonial[] = [
    {
  name: 'Sarah Johnson',
      company: 'TechStart Inc.',
      role: 'CEO',
      content:
        'Craftale ha trasformato completamente la nostra presenza online. Il nuovo sito non solo è bellissimo ma ha aumentato i lead del 300%. Il team capisce davvero di cosa hanno bisogno le aziende.',
      avatar: '/api/placeholder/60/60',
      rating: 5,
    },
    {
      name: 'Mike Chen',
      company: 'Local Eats',
      role: 'Owner',
      content:
        'Lavorare con Craftale ha fatto la differenza. Hanno realizzato un sito che porta davvero clienti. Gli ordini online sono esplosi dopo il lancio!',
      avatar: '/api/placeholder/60/60',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      company: 'Creative Agency',
      role: 'Marketing Director',
      content:
        'Professionali, creativi e orientati ai risultati. Craftale ha consegnato esattamente ciò di cui avevamo bisogno: un sito che converte e rappresenta il nostro brand alla perfezione.',
      avatar: '/api/placeholder/60/60',
      rating: 5,
    },
  ];

  return (
    <section className='py-20 bg-muted/30'>
      <div className='container mx-auto px-4'>
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className='text-4xl md:text-5xl font-bold mb-4'>
            Cosa Dicono i <span className='text-brand-secondary'>Clienti</span>
          </h2>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
            Risultati reali da aziende reali. Ecco cosa succede quando collabori con noi.
          </p>
        </motion.div>

        {/* Featured Testimonial */}
        <motion.div
          className='max-w-4xl mx-auto mb-12'
          key={testimonialIndex}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className='bg-card p-8 rounded-3xl shadow-lg border relative'>
            <div className='flex items-center space-x-1 mb-6 justify-center'>
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                >
                  <Star className='w-6 h-6 fill-yellow-400 text-yellow-400' />
                </motion.div>
              ))}
            </div>

            <blockquote className='text-xl md:text-2xl text-center mb-8 italic leading-relaxed'>
              "{testimonials[testimonialIndex].content}"
            </blockquote>

            <div className='flex items-center justify-center space-x-4'>
              <div className='w-16 h-16 bg-gradient-to-br from-brand-secondary/90 to-brand-tertiary rounded-full flex items-center justify-center'>
                <span className='text-white font-semibold text-lg'>
                  {testimonials[testimonialIndex].name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </span>
              </div>
              <div className='text-center'>
                <div className='font-semibold text-lg'>{testimonials[testimonialIndex].name}</div>
                <div className='text-muted-foreground'>
                  {testimonials[testimonialIndex].role}, {testimonials[testimonialIndex].company}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Testimonial Navigation */}
        <div className='flex justify-center space-x-2'>
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === testimonialIndex ? 'bg-brand-secondary w-8' : 'bg-gray-300'
              }`}
              onClick={() => onTestimonialChange(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
