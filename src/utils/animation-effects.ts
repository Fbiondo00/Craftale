import { FloatingElement, Particle } from "@/types/home-page";

/**
 * Generate a new particle for floating animation
 */
export const generateParticle = (): Particle => {
  const colors = [
    "bg-brand-secondary/60",
    "bg-brand-tertiary/60",
    "bg-brand-accent/60",
    "bg-blue-400",
    "bg-color-state-success",
    "bg-color-state-warning",
  ];
  return {
    id: Date.now() + Math.random(),
    x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
    y: (typeof window !== "undefined" ? window.innerHeight : 800) + 20,
    color: colors[Math.floor(Math.random() * colors.length)],
  };
};

/**
 * Generate a new floating element for icon animation
 */
export const generateFloatingElement = (icons: any[]): FloatingElement => {
  const randomIcon = icons[Math.floor(Math.random() * icons.length)];
  return {
    id: Date.now() + Math.random(),
    x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
    y: (typeof window !== "undefined" ? window.innerHeight : 800) + 50,
    icon: randomIcon,
    delay: Math.random() * 2,
  };
};

/**
 * Clean up old particles and floating elements
 */
export const cleanupOldElements = <T extends { id: number }>(elements: T[], maxAge: number = 8000): T[] => {
  return elements.filter(element => Date.now() - element.id < maxAge);
};

/**
 * Animation variants for common fade-in effects
 */
export const fadeInUpVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

/**
 * Animation variants for staggered children
 */
export const staggerChildrenVariants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

/**
 * Hover scale animation variant
 */
export const hoverScaleVariants = {
  whileHover: { scale: 1.05, y: -2 },
  whileTap: { scale: 0.95 },
};

/**
 * Floating animation for elements
 */
export const floatingVariants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

/**
 * Generate confetti elements for celebration effect
 */
export const generateConfetti = (count: number = 50) => {
  if (typeof window === "undefined") return [];

  return [...Array(count)].map((_, i) => ({
    id: Date.now() + i,
    x: Math.random() * window.innerWidth,
    y: -10,
    color: [
      "bg-red-400",
      "bg-blue-400",
      "bg-color-state-success",
      "bg-color-state-warning",
      "bg-brand-tertiary/60",
      "bg-brand-accent/60",
    ][Math.floor(Math.random() * 6)],
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2,
  }));
};
