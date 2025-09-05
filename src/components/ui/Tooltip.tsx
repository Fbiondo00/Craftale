'use client';

import React, { useState, useEffect, ReactNode, useRef } from 'react';

interface TooltipProps {
  children: ReactNode;
  content: string;
  className?: string;
}

// Global reference to track the currently open tooltip
let activeTooltipSetter: ((value: boolean) => void) | null = null;

const Tooltip: React.FC<TooltipProps> = ({ children, content, className = '' }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [tooltipOffset, setTooltipOffset] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const setterRef = useRef<(value: boolean) => void>(setShowTooltip);

  // Update the setter ref when it changes
  useEffect(() => {
    setterRef.current = setShowTooltip;
  }, []);

  // Detect if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close tooltip when scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (showTooltip) {
        setShowTooltip(false);
        if (activeTooltipSetter === setterRef.current) {
          activeTooltipSetter = null;
        }
      }
    };

    if (showTooltip) {
      window.addEventListener('scroll', handleScroll, true); // Use capture phase
      return () => {
        window.removeEventListener('scroll', handleScroll, true);
      };
    }
  }, [showTooltip]);

  const calculatePosition = (e: React.MouseEvent | React.TouchEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const tooltipWidth = 320; // w-80 = 20rem = 320px
    const padding = 16; // Minimum padding from screen edge
    const screenWidth = window.innerWidth;
    
    // Calculate how much to offset the tooltip to keep it on screen
    let offset = 0;
    
    // Check if tooltip would be cut off on the left
    if (centerX - tooltipWidth / 2 < padding) {
      offset = (centerX - tooltipWidth / 2 - padding) * -1;
    }
    
    // Check if tooltip would be cut off on the right
    if (centerX + tooltipWidth / 2 > screenWidth - padding) {
      offset = (centerX + tooltipWidth / 2 - (screenWidth - padding)) * -1;
    }
    
    setTooltipOffset(offset);
    setMousePosition({
      x: centerX,
      y: rect.top - 10,
    });
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    // Only trigger on desktop
    if (isMobile) return;
    
    calculatePosition(e);
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    // Only trigger on desktop
    if (isMobile) return;
    
    setShowTooltip(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    // Only handle clicks on mobile
    if (!isMobile) return;
    
    e.stopPropagation();
    e.preventDefault();
    
    if (showTooltip) {
      setShowTooltip(false);
      activeTooltipSetter = null;
    } else {
      // Close any other open tooltip
      if (activeTooltipSetter && activeTooltipSetter !== setterRef.current) {
        activeTooltipSetter(false);
      }
      
      calculatePosition(e);
      setShowTooltip(true);
      activeTooltipSetter = setterRef.current;
    }
  };

  return (
    <>
      <span
        className={`cursor-help hover:opacity-75 transition-all duration-200 ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {children}
      </span>
      {showTooltip && (
        <div
          className='fixed z-[9999] w-80 max-w-[90vw] p-4 bg-color-inverse-subtle text-white text-sm rounded-2xl shadow-2xl border-0 transition-all duration-200 ease-out pointer-events-none'
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            transform: `translate(calc(-50% + ${tooltipOffset}px), -100%)`,
          }}
        >
          <div className='relative'>
            <div className='leading-relaxed'>{content}</div>
          </div>
          {/* Arrow pointing down towards the trigger element - moves opposite to tooltip offset */}
          <div 
            className='absolute top-full transform -translate-x-1/2'
            style={{
              left: `calc(50% - ${tooltipOffset}px)`
            }}
          >
            <div className='w-0 h-0 border-l-[12px] border-r-[12px] border-t-[12px] border-l-transparent border-r-transparent border-t-slate-800'></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Tooltip;
