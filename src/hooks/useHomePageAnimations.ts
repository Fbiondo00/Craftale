'use client';

import { useState, useEffect, useRef } from 'react';
import { useMotionValue } from 'framer-motion';
import { Code2, Monitor, Smartphone, Zap, Star, Heart, Rocket, Trophy } from 'lucide-react';
import {
  Particle,
  FloatingElement,
  HomePageState,
  TypingAnimation,
  MousePosition,
  ClickEffect,
} from '@/types/home-page';
import {
  generateParticle,
  generateFloatingElement,
  cleanupOldElements,
} from '@/utils/animation-effects';

export const useHomePageAnimations = () => {
  // Mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Main state
  const [state, setState] = useState<HomePageState>({
    isHovered: false,
    showWebsites: false,
    showConfetti: false,
    typedText: '',
    showCursor: true,
    hoveredWork: -1,
    activeService: 0,
    testimonialIndex: 0,
    particles: [],
    floatingElements: [],
    mousePosition: { x: 0, y: 0 },
    clickEffect: { x: 0, y: 0, show: false },
  });

  // Typing animation state
  const [typingState, setTypingState] = useState<TypingAnimation>({
    words: ['Websites', 'E-commerce', 'Landing Pages', 'Web Apps', 'Portfolios'],
    currentWordIndex: 0,
    currentCharIndex: 0,
    isDeleting: false,
  });

  // Scroll to process section
  const scrollToProcess = () => {
    const processSection = document.getElementById('our-process');
    if (processSection) {
      processSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  // Setup mouse tracking and particle generation
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setState((prev) => ({
        ...prev,
        mousePosition: { x: e.clientX, y: e.clientY },
      }));
    };


    window.addEventListener('mousemove', handleMouseMove);

    // Show "Websites" after delay
    setTimeout(() => {
      setState((prev) => ({ ...prev, showWebsites: true }));
    }, 500);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  // Particle generation
  useEffect(() => {
    const particleInterval = setInterval(() => {
      setState((prev) => ({
        ...prev,
        particles: [...prev.particles, generateParticle()],
      }));
    }, 200);

    return () => clearInterval(particleInterval);
  }, []);

  // Floating elements generation
  useEffect(() => {
    const icons = [Code2, Monitor, Smartphone, Zap, Star, Heart, Rocket, Trophy];
    const iconInterval = setInterval(() => {
      setState((prev) => ({
        ...prev,
        floatingElements: [...prev.floatingElements, generateFloatingElement(icons)],
      }));
    }, 2000);

    return () => clearInterval(iconInterval);
  }, []);

  // Typing effect
  useEffect(() => {
    const typeSpeed = 85;  // Slower typing (was 30)
    const deleteSpeed = 60; // Slower deleting (was 40)
    const pauseTime = 1600; // Keep pause time the same

    const timer = setTimeout(
      () => {
        const { words, currentWordIndex, currentCharIndex, isDeleting } = typingState;

        if (!isDeleting && currentCharIndex < words[currentWordIndex].length) {
          setState((prev) => ({
            ...prev,
            typedText: words[currentWordIndex].substring(0, currentCharIndex + 1),
          }));
          setTypingState((prev) => ({ ...prev, currentCharIndex: prev.currentCharIndex + 1 }));
        } else if (isDeleting && currentCharIndex > 0) {
          setState((prev) => ({
            ...prev,
            typedText: words[currentWordIndex].substring(0, currentCharIndex - 1),
          }));
          setTypingState((prev) => ({ ...prev, currentCharIndex: prev.currentCharIndex - 1 }));
        } else if (!isDeleting && currentCharIndex === words[currentWordIndex].length) {
          setTimeout(() => {
            setTypingState((prev) => ({ ...prev, isDeleting: true }));
          }, pauseTime);
        } else if (isDeleting && currentCharIndex === 0) {
          setTypingState((prev) => ({
            ...prev,
            isDeleting: false,
            currentWordIndex: (prev.currentWordIndex + 1) % words.length,
          }));
        }
      },
      typingState.isDeleting ? deleteSpeed : typeSpeed
    );

    return () => clearTimeout(timer);
  }, [typingState]);

  // Cursor blink
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setState((prev) => ({ ...prev, showCursor: !prev.showCursor }));
    }, 500);
    return () => clearInterval(cursorTimer);
  }, []);

  // Auto-rotate services
  useEffect(() => {
    const serviceTimer = setInterval(() => {
      setState((prev) => ({
        ...prev,
        activeService: (prev.activeService + 1) % 3,
      }));
    }, 3000);
    return () => clearInterval(serviceTimer);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const testimonialTimer = setInterval(() => {
      setState((prev) => ({
        ...prev,
        testimonialIndex: (prev.testimonialIndex + 1) % 3,
      }));
    }, 4000);
    return () => clearInterval(testimonialTimer);
  }, []);

  // Clean up particles and floating elements
  useEffect(() => {
    const cleanup = setInterval(() => {
      setState((prev) => ({
        ...prev,
        particles: cleanupOldElements(prev.particles, 8000),
        floatingElements: cleanupOldElements(prev.floatingElements, 15000),
      }));
    }, 100);
    return () => clearInterval(cleanup);
  }, []);

  // State updaters
  const updateState = (updates: Partial<HomePageState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  return {
    state,
    updateState,
    mouseX,
    mouseY,
    containerRef,
    scrollToProcess,
  };
};
