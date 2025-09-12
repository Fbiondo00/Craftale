// User Personas from project documentation
export interface UserPersona {
  type: "local-business" | "startup" | "non-technical" | "marketing-manager";
  name: string;
  needs: string[];
  painPoints: string[];
}

// Service definitions
export interface Service {
  id: string;
  name: string;
  description: string;
  features: string[];
  startingPrice?: number;
  category: "web-design" | "development" | "marketing" | "seo" | "maintenance";
  isPopular?: boolean;
}

// Testimonial structure
export interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  content: string;
  rating: number;
  image?: string;
  verified: boolean;
}

// Portfolio/Case Study structure
export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  images: string[];
  technologies: string[];
  url?: string;
  featured: boolean;
}

// Pricing package structure
export interface PricingPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  billingCycle: "monthly" | "annual" | "one-time";
  features: string[];
  limitations?: string[];
  popular?: boolean;
  customizable: boolean;
}

// Lead form data
export interface LeadFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  website?: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
  source: string;
}

// Blog post structure
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: Date;
  updatedAt: Date;
  tags: string[];
  category: string;
  featured: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

// Navigation structure
export interface NavigationItem {
  name: string;
  href: string;
  subItems?: NavigationItem[];
  external?: boolean;
}

// SEO metadata
export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonical?: string;
  noIndex?: boolean;
}
