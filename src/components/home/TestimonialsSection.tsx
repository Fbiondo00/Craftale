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
        'Craftale transformed our online presence completely. The new website not only looks amazing but has increased our leads by 300%. Their team really understands what businesses need.',
      avatar: '/api/placeholder/60/60',
      rating: 5,
    },
    {
      name: 'Mike Chen',
      company: 'Local Eats',
      role: 'Owner',
      content:
        'Working with Craftale was a game-changer. They built us a website that actually brings in customers. Online orders went through the roof after launch!',
      avatar: '/api/placeholder/60/60',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      company: 'Creative Agency',
      role: 'Marketing Director',
      content:
        'Professional, creative, and results-driven. Craftale delivered exactly what we needed - a website that converts and represents our brand perfectly.',
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
            What Our <span className='text-brand-secondary'>Clients Say</span>
          </h2>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
            Real results from real businesses. Here&apos;s what happens when you partner with us.
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
