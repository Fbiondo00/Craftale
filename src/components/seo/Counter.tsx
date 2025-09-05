'use client';

import { useRef, useEffect } from 'react';
import { useInView, animate } from 'framer-motion';

interface CounterProps {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  isCurrency?: boolean;
}

export function Counter({ 
  from = 0, 
  to, 
  duration = 2, 
  suffix = '', 
  prefix = '', 
  decimals = 0, 
  isCurrency = false 
}: CounterProps) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: '-100px' });
  
  useEffect(() => {
    if (!inView) return;
    
    const node = nodeRef.current;
    if (!node) return;
    
    const controls = animate(from, to, {
      duration,
      onUpdate(value) {
        if (isCurrency && value >= 1000) {
          node.textContent = prefix + (value / 1000).toFixed(1) + 'K' + suffix;
        } else {
          node.textContent = prefix + value.toFixed(decimals) + suffix;
        }
      },
    });
    
    return () => controls.stop();
  }, [from, to, duration, suffix, prefix, decimals, isCurrency, inView]);
  
  return <span ref={nodeRef}>{prefix}{from.toFixed(decimals)}</span>;
}