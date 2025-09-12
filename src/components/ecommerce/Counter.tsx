"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";

interface CounterProps {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

export function Counter({ from = 0, to, duration = 2, suffix = "", prefix = "", decimals = 0 }: CounterProps) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!inView) return;

    const node = nodeRef.current;
    if (!node) return;

    const controls = animate(from, to, {
      duration,
      onUpdate(value) {
        node.textContent = prefix + value.toFixed(decimals) + suffix;
      },
    });

    return () => controls.stop();
  }, [from, to, duration, suffix, prefix, decimals, inView]);

  return (
    <span ref={nodeRef}>
      {prefix}
      {from.toFixed(decimals)}
    </span>
  );
}
