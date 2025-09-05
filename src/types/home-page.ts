export interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
}

export interface FloatingElement {
  id: number;
  x: number;
  y: number;
  delay: number;
  icon: any;
}

export interface MousePosition {
  x: number;
  y: number;
}

export interface ClickEffect {
  x: number;
  y: number;
  show: boolean;
}

export interface Stat {
  number: string;
  label: string;
  icon: any;
  color: string;
}

export interface WorkSample {
  title: string;
  client: string;
  category: string;
  result: string;
  tech: string[];
  color: string;
}

export interface Service {
  icon: any;
  title: string;
  description: string;
  features: string[];
  color: string;
}

export interface Testimonial {
  name: string;
  company: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
}

export interface InteractiveFeature {
  icon: any;
  label: string;
  description: string;
}

export interface HomePageState {
  isHovered: boolean;
  showWebsites: boolean;
  showConfetti: boolean;
  typedText: string;
  showCursor: boolean;
  hoveredWork: number;
  activeService: number;
  testimonialIndex: number;
  particles: Particle[];
  floatingElements: FloatingElement[];
  mousePosition: MousePosition;
  clickEffect: ClickEffect;
}

export interface TypingAnimation {
  words: string[];
  currentWordIndex: number;
  currentCharIndex: number;
  isDeleting: boolean;
}
