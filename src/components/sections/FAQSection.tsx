'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

interface FAQSectionProps {
  title: string;
  titleHighlight: string;
  questions: FAQItem[];
  className?: string;
}

export default function FAQSection({ 
  title, 
  titleHighlight, 
  questions,
  className = ''
}: FAQSectionProps) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <section className={`py-20 md:py-24 bg-apty-bg-base ${className}`}>
      <div className='container mx-auto px-4 max-w-4xl'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='text-center mb-12'
        >
          <h2 className='text-[36px] md:text-[48px] leading-[1.2] font-bold font-apty-heading text-apty-text-primary mb-4'>
            {title} <span className='text-apty-primary'>{titleHighlight}</span>
          </h2>
        </motion.div>

        <div className='space-y-4'>
          {questions.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className='bg-apty-bg-elevated rounded-xl border border-apty-border-subtle overflow-hidden'
            >
              <button
                onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                className='w-full p-6 text-left flex items-start justify-between hover:bg-apty-bg-subtle/50 transition-colors'
              >
                <span className='font-medium text-apty-text-primary pr-4'>{item.q}</span>
                <div className={`transition-transform ${expandedFaq === i ? 'rotate-180' : ''}`}>
                  <ArrowRight className='w-5 h-5 text-apty-primary rotate-90' />
                </div>
              </button>
              {expandedFaq === i && (
                <div className='px-6 pb-6'>
                  <p className='text-apty-text-secondary'>{item.a}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}