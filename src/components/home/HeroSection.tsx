'use client';

import { motion } from 'framer-motion';
import { useHomePageAnimations } from '@/hooks/useHomePageAnimations';
import { useEffect, useState, useRef, useCallback } from 'react';
import BackgroundEffects from './hero/BackgroundEffects';
import InteractiveBadge from './hero/InteractiveBadge';
import TypedHeading from './hero/TypedHeading';
import CTAButtons from './hero/CTAButtons';
import InteractiveFeatures from './hero/InteractiveFeatures';
import StatsDisplay from './hero/StatsDisplay';
import MobileWebsiteSimulation from './hero/MobileWebsiteSimulation';

interface HeroSectionProps {
  onScrollToProcess: () => void;
}

export default function HeroSection({ onScrollToProcess }: HeroSectionProps) {
  const { state, updateState, mouseX, mouseY } = useHomePageAnimations();
  const [mobileScrollProgress, setMobileScrollProgress] = useState(0);
  const [isScrollLocked, setIsScrollLocked] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const mobileSimRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const animationFrameId = useRef<number | undefined>(undefined);
  const isAnimatingRef = useRef(false);
  const preventDefaultRef = useRef<((e: Event) => void) | null>(null);
  const animationLoopRef = useRef<number | null>(null);
  const targetProgressRef = useRef(0);

  // Initialize scroll progress based on current page position
  useEffect(() => {
    if (!heroRef.current) return;
    
    const initializeScrollProgress = () => {
      const heroRect = heroRef.current!.getBoundingClientRect();
      const heroHeight = heroRect.height;
      const scrolledAmount = -heroRect.top;
      
      // If we're scrolled past the hero section
      if (scrolledAmount > 0 && scrolledAmount < heroHeight) {
        // Calculate progress based on how much of hero is scrolled
        // Map scroll position to 0-1 range for mobile animation
        const progress = Math.min(1, Math.max(0, scrolledAmount / (heroHeight * 0.5)));
        setMobileScrollProgress(progress);
      } else if (scrolledAmount >= heroHeight) {
        // If fully scrolled past hero, set to complete
        setMobileScrollProgress(1);
      }
    };

    // Run on mount with a small delay to ensure layout is ready
    setTimeout(initializeScrollProgress, 100);
  }, []);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    let touchStartY = 0;
    let lastTouchY = 0;
    
    // Desktop scroll handler - original behavior
    const handleWheel = (e: WheelEvent) => {
      if (!heroRef.current) return;

      const heroRect = heroRef.current.getBoundingClientRect();
      const isHeroVisible = heroRect.top <= 100 && heroRect.bottom >= window.innerHeight * 0.5;
      
      // Only hijack scroll when hero section is substantially in view
      if (isHeroVisible) {
        const scrollDirection = e.deltaY > 0 ? 'down' : 'up';
        
        // Handle scroll down
        if (scrollDirection === 'down' && mobileScrollProgress < 1) {
          e.preventDefault();
          setIsScrollLocked(true);
          
          // Animate mobile content scroll
          const newProgress = Math.min(1, mobileScrollProgress + 0.05);
          setMobileScrollProgress(newProgress);
          
          // When animation completes, unlock scroll
          if (newProgress >= 1) {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
              setIsScrollLocked(false);
            }, 300);
          }
        }
        // Handle scroll up
        else if (scrollDirection === 'up' && heroRect.top >= -100 && mobileScrollProgress > 0) {
          e.preventDefault();
          setIsScrollLocked(true);
          
          // Animate mobile content scroll back
          const newProgress = Math.max(0, mobileScrollProgress - 0.05);
          setMobileScrollProgress(newProgress);
          
          // When animation completes, unlock scroll
          if (newProgress <= 0) {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
              setIsScrollLocked(false);
            }, 300);
          }
        }
      }
    };
    
    // Mobile scroll handler
    const handleScroll = () => {
      // Only process on mobile devices
      if (window.innerWidth >= 1024 || !heroRef.current || !mobileSimRef.current) return;
      
      // Cancel any pending animation frame
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      
      animationFrameId.current = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        
        // Get the mobile mockup's product grid position
        const productGridElement = mobileSimRef.current!.querySelector('.grid.grid-cols-2');
        
        if (!productGridElement) {
          return;
        }
        
        // Get ALL products in the first row (2 products for grid-cols-2)
        const firstRowProducts = Array.from(productGridElement.children).slice(0, 2);
        if (firstRowProducts.length < 2) return;
        
        // Check if ALL products in the first row are FULLY visible
        const viewportHeight = window.innerHeight;
        const allProductsFullyVisible = firstRowProducts.every((product) => {
          const rect = product.getBoundingClientRect();
          // Each product must be completely within viewport
          return (
            rect.top >= 10 && // Small buffer from top
            rect.bottom <= viewportHeight - 10 // Small buffer from bottom
          );
        });
        
        // Also check that we haven't scrolled too far past
        const gridRect = productGridElement.getBoundingClientRect();
        const notScrolledPast = gridRect.top > -100;
        
        // Only trigger animation when in the right zone - products visible but not scrolled too far
        // This allows natural scroll up/down without forced resets
        const inAnimationZone = allProductsFullyVisible && notScrolledPast;
        
        if (inAnimationZone && !isAnimatingRef.current) {
          // Detect scroll direction
          const deltaY = currentScrollY - lastScrollY.current;
          
          if (Math.abs(deltaY) < 2) return;
          
          const scrollDirection = deltaY > 0 ? 'down' : 'up';
          
          // Handle scroll down
          if (scrollDirection === 'down' && mobileScrollProgress < 1.1) { // Allow overshoot
            // Calculate velocity-based target - faster scroll = more distance
            const velocity = Math.abs(deltaY);
            const velocityMultiplier = Math.min(1.5, 1 + velocity * 0.01); // Cap at 1.5x
            // Set target progress based on velocity
            targetProgressRef.current = Math.min(1.1, 1 * velocityMultiplier);
            
            // Start animation if not already running
            if (!isAnimatingRef.current) {
              isAnimatingRef.current = true;
              
              // Create prevention handler only once
              if (!preventDefaultRef.current) {
                preventDefaultRef.current = (e: Event) => {
                  e.preventDefault();
                  e.stopPropagation();
                };
              }
              
              // Add scroll prevention
              const preventDefault = preventDefaultRef.current;
              document.addEventListener('touchmove', preventDefault, { passive: false });
              document.addEventListener('wheel', preventDefault, { passive: false });
              
              // Start smooth animation loop
              const animateScroll = () => {
                setMobileScrollProgress(prev => {
                  const diff = targetProgressRef.current - prev;
                  // Dynamic speed based on velocity
                  const baseSpeed = 0.020;
                  const speedMultiplier = Math.min(2, 1 + velocity * 0.002);
                  const speed = baseSpeed * speedMultiplier; // Faster scroll = faster animation
                  const newProgress = prev + diff * speed;
                  
                  // Check if we've reached the target
                  if (Math.abs(diff) < 0.001) {
                    // Animation complete - cleanup
                    document.removeEventListener('touchmove', preventDefault);
                    document.removeEventListener('wheel', preventDefault);
                    isAnimatingRef.current = false;
                    animationLoopRef.current = null;
                    return targetProgressRef.current;
                  }
                  
                  animationLoopRef.current = requestAnimationFrame(animateScroll);
                  return newProgress;
                });
              };
              
              animateScroll();
            }
          }
          // Handle scroll up
          else if (scrollDirection === 'up' && mobileScrollProgress > -0.1) { // Allow negative for full start
            // Calculate velocity-based target - faster scroll = more distance
            const velocity = Math.abs(deltaY);
            const velocityMultiplier = Math.min(1.5, 1 + velocity * 0.01); // Cap at 1.5x
            // Set target progress based on velocity (going negative)
            targetProgressRef.current = Math.max(-0.1, 0 - (0.05 * velocityMultiplier));
            
            // Start animation if not already running
            if (!isAnimatingRef.current) {
              isAnimatingRef.current = true;
              
              // Create prevention handler only once
              if (!preventDefaultRef.current) {
                preventDefaultRef.current = (e: Event) => {
                  e.preventDefault();
                  e.stopPropagation();
                };
              }
              
              // Add scroll prevention
              const preventDefault = preventDefaultRef.current;
              document.addEventListener('touchmove', preventDefault, { passive: false });
              document.addEventListener('wheel', preventDefault, { passive: false });
              
              // Start smooth animation loop
              const animateScroll = () => {
                setMobileScrollProgress(prev => {
                  const diff = targetProgressRef.current - prev;
                  // Dynamic speed based on velocity
                  const baseSpeed = 0.035;
                  const speedMultiplier = Math.min(2, 1 + velocity * 0.002);
                  const speed = baseSpeed * speedMultiplier; // Faster scroll = faster animation
                  const newProgress = prev + diff * speed;
                  
                  // Check if we've reached the target
                  if (Math.abs(diff) < 0.001) {
                    // Animation complete - cleanup
                    document.removeEventListener('touchmove', preventDefault);
                    document.removeEventListener('wheel', preventDefault);
                    isAnimatingRef.current = false;
                    animationLoopRef.current = null;
                    return targetProgressRef.current;
                  }
                  
                  animationLoopRef.current = requestAnimationFrame(animateScroll);
                  return newProgress;
                });
              };
              
              animateScroll();
            }
          }
        }
        
        lastScrollY.current = currentScrollY;
      });
    };

    // Add event listeners
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (animationLoopRef.current) {
        cancelAnimationFrame(animationLoopRef.current);
      }
      // Clean up any remaining prevention listeners
      if (preventDefaultRef.current) {
        document.removeEventListener('touchmove', preventDefaultRef.current);
        document.removeEventListener('wheel', preventDefaultRef.current);
      }
      // Reset animation state
      isAnimatingRef.current = false;
      animationLoopRef.current = null;
    };
  }, [mobileScrollProgress]);
  return (
    <>
      {/* Background Effects - positioned outside overflow-hidden container */}
      <div className='fixed inset-0 pointer-events-none z-0'>
        <BackgroundEffects
          particles={state.particles}
          floatingElements={state.floatingElements}
          showConfetti={state.showConfetti}
        />
      </div>

      <section ref={heroRef} className='relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-apty-bg-subtle'>
        <div className='absolute inset-0 opacity-20'>
          <div
            className='absolute inset-0'
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(99, 102, 241, 0.3) 1px, transparent 0)`,
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        <div className='container mx-auto px-4 relative z-10'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            {/* Left Column - Text Content */}
            <div className='text-center lg:text-left'>
              <InteractiveBadge
                isHovered={state.isHovered}
                onHoverStart={() => updateState({ isHovered: true })}
                onHoverEnd={() => updateState({ isHovered: false })}
                onClick={() => updateState({ showConfetti: true })} 
              />
              <TypedHeading
                showWebsites={state.showWebsites}
                typedText={state.typedText}
                showCursor={state.showCursor}
              />
              <CTAButtons
                onScrollToProcess={onScrollToProcess}
                onMouseEnter={() => updateState({ showConfetti: false })}
              />
              <InteractiveFeatures />
              {/* <StatsDisplay /> */}
            </div>
            
            {/* Right Column - Phone Mockup */}
            <div className='relative flex justify-center lg:justify-end' ref={mobileSimRef}>
              <MobileWebsiteSimulation scrollProgress={mobileScrollProgress} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
