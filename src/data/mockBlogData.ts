// Mock Blog Data - Web Agency Content
import { type BlogPost, type ContentTypeConfig, type FilterCategory } from "@/types/blog";

// Content Type Configurations with Web Agency Branding
export const contentTypeConfigs: ContentTypeConfig[] = [
  {
    type: "case-study",
    label: "Case Studies",
    description: "Client success stories with measurable results",
    icon: "📊",
    gradientFrom: "from-brand-secondary/90",
    gradientTo: "to-blue-600",
  },
  {
    type: "portfolio",
    label: "Portfolio Projects",
    description: "Visual showcases of websites we've built",
    icon: "🎨",
    gradientFrom: "from-brand-tertiary/90",
    gradientTo: "to-brand-secondary",
  },
  {
    type: "resource",
    label: "Resources",
    description: "Web design insights and industry knowledge",
    icon: "📚",
    gradientFrom: "from-brand-accent/90",
    gradientTo: "to-brand-tertiary",
  },
  {
    type: "process",
    label: "Our Process",
    description: "Behind-the-scenes methodology and workflows",
    icon: "⚙️",
    gradientFrom: "from-blue-500",
    gradientTo: "to-cyan-600",
  },
  {
    type: "spotlight",
    label: "Client Spotlights",
    description: "Featured client interviews and success stories",
    icon: "✨",
    gradientFrom: "from-green-500",
    gradientTo: "to-emerald-600",
  },
];

// Mock Blog Posts
export const mockBlogPosts: BlogPost[] = [
  // Case Studies
  {
    id: "1",
    title: "TechStore Pro: E-commerce Revolution",
    description:
      "How we transformed a struggling electronics retailer into a $2M+ online powerhouse with a complete website redesign and conversion optimization.",
    content: "Complete case study content here...",
    featuredImage: "/images/case-study-techstore.jpg",
    publishedAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
    status: "published",
    contentType: "case-study",
    tags: ["conversion-optimization", "e-commerce", "performance"],
    industry: ["e-commerce", "technology"],
    technologies: ["react", "nextjs", "shopify"],
    serviceTypes: ["web-design", "web-development", "performance-optimization"],
    resultsCategory: ["sales-increase", "conversion-optimization"],
    projectSize: "mid-market",
    viewCount: 1250,
    engagementScore: 87,
    impactScore: 95,
    clientResults: {
      salesIncrease: "+300%",
      conversionIncrease: "+150%",
      trafficGrowth: "+200%",
      performanceImprovement: "+85%",
    },
    seo: {
      metaTitle: "TechStore Pro Case Study: 300% Sales Increase | Web44",
      metaDescription:
        "Discover how we helped TechStore Pro achieve 300% sales increase through strategic web design and conversion optimization.",
      ogImage: "/images/og-techstore-case-study.jpg",
      slug: "techstore-pro-ecommerce-revolution",
    },
  },
  {
    id: "2",
    title: "Bella Vista Restaurant: Local Business Boom",
    description:
      "From zero online presence to 150% increase in bookings. See how our restaurant website design transformed this local eatery.",
    content: "Complete case study content here...",
    featuredImage: "/images/case-study-restaurant.jpg",
    publishedAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10"),
    status: "published",
    contentType: "case-study",
    tags: ["local-business", "restaurant", "booking-system"],
    industry: ["restaurant", "food"],
    technologies: ["wordpress", "custom-theme"],
    serviceTypes: ["web-design", "seo-optimization"],
    resultsCategory: ["traffic-growth", "user-experience-improvement"],
    projectSize: "small",
    viewCount: 890,
    engagementScore: 92,
    impactScore: 88,
    clientResults: {
      conversionIncrease: "+150%",
      trafficGrowth: "+220%",
    },
    seo: {
      metaTitle: "Bella Vista Restaurant Case Study: 150% Booking Increase | Web44",
      metaDescription:
        "Learn how our restaurant web design increased Bella Vista's bookings by 150% with modern design and local SEO.",
      ogImage: "/images/og-restaurant-case-study.jpg",
      slug: "bella-vista-restaurant-local-business-boom",
    },
  },
  {
    id: "3",
    title: "CloudSync: SaaS Landing Magic",
    description:
      "How we engineered a high-converting SaaS landing page that increased signups by 400% for this cloud storage startup.",
    content: "Complete case study content here...",
    featuredImage: "/images/case-study-saas.jpg",
    publishedAt: new Date("2024-01-08"),
    updatedAt: new Date("2024-01-08"),
    status: "published",
    contentType: "case-study",
    tags: ["saas", "landing-page", "conversion"],
    industry: ["saas", "technology"],
    technologies: ["nextjs", "tailwind", "framer-motion"],
    serviceTypes: ["web-design", "web-development", "ux-ui-design"],
    resultsCategory: ["conversion-optimization", "user-experience-improvement"],
    projectSize: "startup",
    viewCount: 1450,
    engagementScore: 94,
    impactScore: 97,
    clientResults: {
      conversionIncrease: "+400%",
      salesIncrease: "+250%",
    },
    seo: {
      metaTitle: "CloudSync SaaS Case Study: 400% Signup Increase | Web44",
      metaDescription:
        "See how our SaaS landing page design increased CloudSync signups by 400% with strategic UX and conversion optimization.",
      ogImage: "/images/og-saas-case-study.jpg",
      slug: "cloudsync-saas-landing-magic",
    },
  },

  // Portfolio Projects
  {
    id: "4",
    title: "HealthCare Plus: Modern Medical Website",
    description:
      "A complete digital transformation for a healthcare provider with patient portal integration and appointment booking.",
    content: "Complete portfolio content here...",
    featuredImage: "/images/portfolio-healthcare.jpg",
    publishedAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-05"),
    status: "published",
    contentType: "portfolio",
    tags: ["healthcare", "patient-portal", "accessibility"],
    industry: ["healthcare"],
    technologies: ["react", "nextjs", "headless-cms"],
    serviceTypes: ["web-design", "web-development", "accessibility"],
    resultsCategory: ["user-experience-improvement", "performance-enhancement"],
    projectSize: "enterprise",
    viewCount: 750,
    engagementScore: 78,
    impactScore: 82,
    seo: {
      metaTitle: "HealthCare Plus Medical Website Portfolio | Web44",
      metaDescription:
        "Modern healthcare website design with patient portal integration and full accessibility compliance.",
      ogImage: "/images/og-healthcare-portfolio.jpg",
      slug: "healthcare-plus-modern-medical-website",
    },
  },
  {
    id: "5",
    title: "FinTech Solutions: Banking Platform",
    description:
      "Secure and user-friendly banking platform design with advanced financial dashboard and mobile-first approach.",
    content: "Complete portfolio content here...",
    featuredImage: "/images/portfolio-fintech.jpg",
    publishedAt: new Date("2024-01-03"),
    updatedAt: new Date("2024-01-03"),
    status: "published",
    contentType: "portfolio",
    tags: ["fintech", "banking", "security", "dashboard"],
    industry: ["finance"],
    technologies: ["react", "nextjs", "custom-development"],
    serviceTypes: ["web-design", "web-development", "ux-ui-design"],
    resultsCategory: ["user-experience-improvement", "performance-enhancement"],
    projectSize: "enterprise",
    viewCount: 920,
    engagementScore: 85,
    impactScore: 89,
    seo: {
      metaTitle: "FinTech Banking Platform Portfolio | Web44",
      metaDescription: "Secure banking platform design with advanced dashboard and mobile-first user experience.",
      ogImage: "/images/og-fintech-portfolio.jpg",
      slug: "fintech-solutions-banking-platform",
    },
  },

  // Resource Articles
  {
    id: "6",
    title: "Web Design Trends 2024: What's Hot This Year",
    description:
      "Stay ahead of the curve with the latest web design trends that are shaping the digital landscape in 2024.",
    content: "Complete resource content here...",
    featuredImage: "/images/resource-trends-2024.jpg",
    publishedAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
    status: "published",
    contentType: "resource",
    tags: ["design-trends", "inspiration", "2024"],
    industry: ["design", "technology"],
    technologies: ["design-tools", "css", "animation"],
    serviceTypes: ["web-design", "ux-ui-design"],
    resultsCategory: ["brand-transformation"],
    projectSize: "small",
    viewCount: 2100,
    engagementScore: 91,
    impactScore: 78,
    seo: {
      metaTitle: "Web Design Trends 2024: Latest Industry Insights | Web44",
      metaDescription:
        "Discover the hottest web design trends for 2024 and how to implement them in your next project.",
      ogImage: "/images/og-design-trends-2024.jpg",
      slug: "web-design-trends-2024-whats-hot",
    },
  },
  {
    id: "7",
    title: "Complete Guide to Website Performance Optimization",
    description:
      "Master the art of website speed optimization with our comprehensive guide covering Core Web Vitals, image optimization, and more.",
    content: "Complete resource content here...",
    featuredImage: "/images/resource-performance.jpg",
    publishedAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-18"),
    status: "published",
    contentType: "resource",
    tags: ["performance", "optimization", "core-web-vitals", "seo"],
    industry: ["technology"],
    technologies: ["nextjs", "optimization-tools", "cdn"],
    serviceTypes: ["performance-optimization", "seo-optimization"],
    resultsCategory: ["performance-enhancement"],
    projectSize: "mid-market",
    viewCount: 1680,
    engagementScore: 89,
    impactScore: 85,
    seo: {
      metaTitle: "Website Performance Optimization Guide 2024 | Web44",
      metaDescription: "Complete guide to website speed optimization, Core Web Vitals, and performance best practices.",
      ogImage: "/images/og-performance-guide.jpg",
      slug: "complete-guide-website-performance-optimization",
    },
  },

  // Process Documentation
  {
    id: "8",
    title: "Our 5-Stage Web Development Process",
    description:
      "Take a behind-the-scenes look at how we transform ideas into high-performing websites through our proven methodology.",
    content: "Complete process content here...",
    featuredImage: "/images/process-development.jpg",
    publishedAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-12"),
    status: "published",
    contentType: "process",
    tags: ["methodology", "development-process", "project-management"],
    industry: ["web-development"],
    technologies: ["project-management", "development-tools"],
    serviceTypes: ["web-development", "project-management"],
    resultsCategory: ["process-improvement"],
    projectSize: "mid-market",
    viewCount: 650,
    engagementScore: 76,
    impactScore: 72,
    seo: {
      metaTitle: "Our 5-Stage Web Development Process | Web44",
      metaDescription:
        "Discover our proven web development methodology that delivers exceptional results for every project.",
      ogImage: "/images/og-development-process.jpg",
      slug: "our-5-stage-web-development-process",
    },
  },

  // Client Spotlights
  {
    id: "9",
    title: "Client Spotlight: EduTech Academy Success Story",
    description:
      "Meet Sarah Johnson, founder of EduTech Academy, and learn how our partnership transformed her online education platform.",
    content: "Complete spotlight content here...",
    featuredImage: "/images/spotlight-edutech.jpg",
    publishedAt: new Date("2024-01-07"),
    updatedAt: new Date("2024-01-07"),
    status: "published",
    contentType: "spotlight",
    tags: ["client-interview", "education", "success-story"],
    industry: ["education"],
    technologies: ["learning-management-system", "nextjs"],
    serviceTypes: ["web-design", "web-development"],
    resultsCategory: ["user-experience-improvement", "brand-transformation"],
    projectSize: "startup",
    viewCount: 480,
    engagementScore: 88,
    impactScore: 81,
    seo: {
      metaTitle: "EduTech Academy Client Spotlight | Web44",
      metaDescription:
        "Success story of EduTech Academy and how our web design transformed their online education platform.",
      ogImage: "/images/og-edutech-spotlight.jpg",
      slug: "client-spotlight-edutech-academy-success-story",
    },
  },
];

// Filter Categories for the UI
export const filterCategories: FilterCategory[] = [
  {
    key: "industries",
    label: "Industry",
    options: [
      {
        value: "e-commerce",
        label: "E-commerce",
        count: 12,
        color: "bg-color-state-info-subtle text-color-state-info-text",
      },
      { value: "saas", label: "SaaS", count: 8, color: "bg-brand-tertiary/20 text-brand-tertiary" },
      {
        value: "healthcare",
        label: "Healthcare",
        count: 6,
        color: "bg-color-state-success-subtle text-color-state-success-text",
      },
      {
        value: "finance",
        label: "Finance",
        count: 4,
        color: "bg-color-state-warning-subtle text-color-state-warning-text",
      },
      { value: "education", label: "Education", count: 5, color: "bg-brand-secondary/20 text-brand-secondary" },
      {
        value: "restaurant",
        label: "Restaurant/Food",
        count: 7,
        color: "bg-color-state-error-subtle text-color-state-error-text",
      },
      { value: "real-estate", label: "Real Estate", count: 3, color: "bg-color-muted text-color-primary" },
      { value: "technology", label: "Technology", count: 15, color: "bg-cyan-100 text-cyan-800" },
    ],
  },
  {
    key: "technologies",
    label: "Technology Stack",
    options: [
      { value: "react", label: "React", count: 20, color: "bg-color-state-info-subtle text-color-state-info-text" },
      { value: "nextjs", label: "Next.js", count: 18, color: "bg-black text-white" },
      {
        value: "wordpress",
        label: "WordPress",
        count: 12,
        color: "bg-color-state-info-subtle text-color-state-info-text",
      },
      {
        value: "shopify",
        label: "Shopify",
        count: 8,
        color: "bg-color-state-success-subtle text-color-state-success-text",
      },
      {
        value: "custom-development",
        label: "Custom Development",
        count: 15,
        color: "bg-brand-tertiary/20 text-brand-tertiary",
      },
      { value: "headless-cms", label: "Headless CMS", count: 10, color: "bg-brand-secondary/20 text-brand-secondary" },
    ],
  },
  {
    key: "serviceTypes",
    label: "Service Type",
    options: [
      { value: "web-design", label: "Web Design", count: 25, color: "bg-brand-accent/20 text-pink-800" },
      {
        value: "web-development",
        label: "Web Development",
        count: 22,
        color: "bg-color-state-info-subtle text-color-state-info-text",
      },
      { value: "ux-ui-design", label: "UX/UI Design", count: 18, color: "bg-brand-tertiary/20 text-brand-tertiary" },
      {
        value: "seo-optimization",
        label: "SEO Optimization",
        count: 14,
        color: "bg-color-state-success-subtle text-color-state-success-text",
      },
      {
        value: "performance-optimization",
        label: "Performance Optimization",
        count: 12,
        color: "bg-color-state-warning-subtle text-color-state-warning-text",
      },
    ],
  },
  {
    key: "resultsCategories",
    label: "Results Category",
    options: [
      {
        value: "conversion-optimization",
        label: "Conversion Optimization",
        count: 16,
        color: "bg-color-state-success-subtle text-color-state-success-text",
      },
      { value: "sales-increase", label: "Sales Increase", count: 12, color: "bg-emerald-100 text-emerald-800" },
      {
        value: "traffic-growth",
        label: "Traffic Growth",
        count: 14,
        color: "bg-color-state-info-subtle text-color-state-info-text",
      },
      {
        value: "user-experience-improvement",
        label: "UX Improvement",
        count: 18,
        color: "bg-brand-tertiary/20 text-brand-tertiary",
      },
      {
        value: "performance-enhancement",
        label: "Performance Enhancement",
        count: 10,
        color: "bg-color-state-warning-subtle text-color-state-warning-text",
      },
      {
        value: "brand-transformation",
        label: "Brand Transformation",
        count: 8,
        color: "bg-brand-accent/20 text-pink-800",
      },
    ],
  },
];

// Sort Options Configuration
export const sortOptions = [
  { value: "recent" as const, label: "Most Recent" },
  { value: "impact" as const, label: "Highest Impact" },
  { value: "popular" as const, label: "Most Popular" },
  { value: "alphabetical" as const, label: "Alphabetical" },
  { value: "client-success" as const, label: "Client Success" },
];

// Default Filter State
export const defaultFilterState = {
  contentTypes: [] as any[],
  industries: [],
  technologies: [],
  serviceTypes: [],
  resultsCategories: [],
  projectSizes: [] as any[],
  searchQuery: "",
};
