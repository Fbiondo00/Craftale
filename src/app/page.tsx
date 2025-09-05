'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSection from '@/components/home/HeroSection';
import UserPersonas from '@/components/home/UserPersonas';
import CaseStudiesSection from '@/components/home/CaseStudiesSection';
import ProcessSection from '@/components/home/ProcessSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CTASection from '@/components/home/CTASection';
import { LumaSpin } from '@/components/ui/luma-spin';
import { useHomePageAnimations } from '@/hooks/useHomePageAnimations';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const { state, updateState, mouseX, mouseY, containerRef, scrollToProcess } =
    useHomePageAnimations();

  // Show spinner only during initial component mount
  useEffect(() => {
    // Set loading to false immediately after component mounts
    setIsLoading(false);
  }, []);

  // Show only spinner during initial load
  if (isLoading) {
    return (
      <div className='min-h-screen bg-white dark:bg-color-inverse flex items-center justify-center'>
        <LumaSpin size={80} />
      </div>
    );
  }

  return (
    <div className='min-h-screen relative overflow-hidden' ref={containerRef}>


      {/* Hero Section */}
      <HeroSection onScrollToProcess={scrollToProcess} />

      {/* User Personas Section */}
      <UserPersonas />

      {/* Case Studies Section */}
      <CaseStudiesSection />

      {/* Process Section */}
      <ProcessSection />

      {/* Testimonials Section */}
      {/* <TestimonialsSection
        testimonialIndex={state.testimonialIndex}
        onTestimonialChange={(index) => updateState({ testimonialIndex: index })}
      /> */}

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
