/**
 * Mock Data Fixtures - CMI Platform Standards
 * Comprehensive test data for all components
 */

// Blog Post Mock Data
export const mockBlogPosts = [
  {
    id: '1',
    title: 'The Future of Web Development: Trends to Watch in 2024',
    content: `
      <p>The web development landscape is constantly evolving, with new technologies and methodologies emerging regularly. As we look ahead to 2024, several key trends are shaping the future of how we build and interact with web applications.</p>
      
      <h2>1. AI-Powered Development Tools</h2>
      <p>Artificial intelligence is revolutionizing the development process, from code generation to automated testing. Tools like GitHub Copilot and ChatGPT are becoming essential parts of the developer toolkit.</p>
      
      <h2>2. Progressive Web Apps (PWAs)</h2>
      <p>PWAs continue to bridge the gap between web and mobile applications, offering native-like experiences with web technologies.</p>
      
      <h2>3. Serverless Architecture</h2>
      <p>The shift towards serverless computing is accelerating, with platforms like Vercel, Netlify, and AWS Lambda leading the charge.</p>
    `,
    excerpt: 'Discover the key trends shaping web development in 2024, from AI-powered tools to serverless architecture.',
    author: 'Sarah Johnson',
    publishedAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    tags: ['web-development', 'trends', 'technology', 'ai'],
    slug: 'future-of-web-development-2024',
    featured: true,
    image: 'https://example.com/blog/web-development-trends.jpg',
    readingTime: 5,
    category: 'Technology',
    metaDescription: 'Explore the latest web development trends for 2024, including AI tools, PWAs, and serverless architecture.',
    status: 'published',
  },
  {
    id: '2',
    title: 'Building Scalable E-commerce Solutions with Modern React',
    content: `
      <p>Creating scalable e-commerce solutions requires careful planning and the right technology stack. Modern React, combined with Next.js and advanced state management, provides a solid foundation for building robust online stores.</p>
      
      <h2>Key Considerations for E-commerce Development</h2>
      <p>When building e-commerce solutions, several factors must be considered to ensure success.</p>
      
      <ul>
        <li>Performance optimization</li>
        <li>SEO-friendly architecture</li>
        <li>Secure payment processing</li>
        <li>Mobile responsiveness</li>
        <li>Inventory management</li>
      </ul>
    `,
    excerpt: 'Learn how to build scalable e-commerce solutions using modern React and Next.js frameworks.',
    author: 'Michael Chen',
    publishedAt: '2024-01-10T14:30:00Z',
    updatedAt: '2024-01-10T14:30:00Z',
    tags: ['react', 'ecommerce', 'nextjs', 'scalability'],
    slug: 'scalable-ecommerce-modern-react',
    featured: false,
    image: 'https://example.com/blog/ecommerce-react.jpg',
    readingTime: 7,
    category: 'Development',
    metaDescription: 'Discover best practices for building scalable e-commerce solutions with React and Next.js.',
    status: 'published',
  },
  {
    id: '3',
    title: 'Design System Best Practices for Growing Teams',
    content: `
      <p>As teams grow, maintaining design consistency becomes increasingly challenging. A well-structured design system is essential for scaling design and development efforts efficiently.</p>
      
      <h2>Components of a Successful Design System</h2>
      <p>A comprehensive design system includes several key components that work together to ensure consistency.</p>
      
      <h3>Design Tokens</h3>
      <p>Design tokens are the building blocks of your design system, defining colors, typography, spacing, and other design decisions.</p>
      
      <h3>Component Library</h3>
      <p>A well-organized component library provides reusable UI components that follow established patterns and guidelines.</p>
    `,
    excerpt: 'Explore best practices for creating and maintaining design systems that scale with your team.',
    author: 'Emily Rodriguez',
    publishedAt: '2024-01-05T09:15:00Z',
    updatedAt: '2024-01-05T09:15:00Z',
    tags: ['design-system', 'ui-ux', 'team-collaboration', 'scalability'],
    slug: 'design-system-best-practices',
    featured: false,
    image: 'https://example.com/blog/design-system.jpg',
    readingTime: 6,
    category: 'Design',
    metaDescription: 'Learn how to build and maintain effective design systems for growing development teams.',
    status: 'published',
  },
];

// Pricing Mock Data
export const mockPricingTiers = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for small businesses and startups',
    price: 999,
    originalPrice: 1299,
    currency: 'USD',
    interval: 'one-time',
    popular: false,
    recommended: false,
    features: [
      'Custom website design',
      'Up to 5 pages',
      'Mobile responsive',
      'Basic SEO optimization',
      'Contact form integration',
      '30 days support',
      'Basic analytics setup',
    ],
    notIncluded: [
      'E-commerce functionality',
      'Advanced animations',
      'Custom CMS',
      'Multiple language support',
    ],
    cta: 'Get Started',
    ctaLink: '/contact?plan=starter',
    deliveryTime: '1-2 weeks',
    revisions: 2,
    setupFee: 0,
    features_detailed: {
      design: ['Custom design', 'Brand integration', 'Mobile responsive'],
      development: ['Clean code', 'Fast loading', 'SEO optimized'],
      support: ['30 days support', 'Email support', 'Setup assistance'],
    },
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Ideal for growing businesses with advanced needs',
    price: 2499,
    originalPrice: 2999,
    currency: 'USD',
    interval: 'one-time',
    popular: true,
    recommended: true,
    features: [
      'Custom website design',
      'Up to 15 pages',
      'Mobile responsive',
      'Advanced SEO optimization',
      'Contact form integration',
      '90 days support',
      'Google Analytics setup',
      'Basic e-commerce (up to 50 products)',
      'Custom animations',
      'Blog functionality',
      'Newsletter integration',
    ],
    notIncluded: [
      'Custom CMS',
      'Multiple language support',
      'Advanced integrations',
    ],
    cta: 'Choose Professional',
    ctaLink: '/contact?plan=professional',
    deliveryTime: '2-3 weeks',
    revisions: 3,
    setupFee: 0,
    badge: 'Most Popular',
    features_detailed: {
      design: ['Custom design', 'Brand integration', 'Mobile responsive', 'Custom animations'],
      development: ['Clean code', 'Fast loading', 'Advanced SEO', 'E-commerce ready'],
      support: ['90 days support', 'Email & phone support', 'Priority assistance'],
    },
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Complete solution for large organizations',
    price: 4999,
    originalPrice: 5999,
    currency: 'USD',
    interval: 'one-time',
    popular: false,
    recommended: false,
    features: [
      'Custom website design',
      'Unlimited pages',
      'Mobile responsive',
      'Advanced SEO optimization',
      'Multiple contact forms',
      '180 days support',
      'Advanced analytics setup',
      'Full e-commerce solution',
      'Custom animations & interactions',
      'Blog & CMS functionality',
      'Newsletter integration',
      'Multiple language support',
      'Custom API integrations',
      'Performance optimization',
      'Security hardening',
    ],
    notIncluded: [],
    cta: 'Contact for Enterprise',
    ctaLink: '/contact?plan=enterprise',
    deliveryTime: '4-6 weeks',
    revisions: 5,
    setupFee: 0,
    features_detailed: {
      design: ['Custom design', 'Brand integration', 'Mobile responsive', 'Advanced animations'],
      development: ['Clean code', 'Fast loading', 'Advanced SEO', 'Full e-commerce', 'Custom integrations'],
      support: ['180 days support', 'Dedicated account manager', '24/7 priority support'],
    },
  },
];

// Testimonial Mock Data
export const mockTestimonials = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'CEO',
    company: 'TechStart Inc.',
    content: 'The team delivered an exceptional website that exceeded our expectations. The design is modern, the functionality is seamless, and our conversion rates have increased by 40% since launch.',
    rating: 5,
    image: 'https://example.com/testimonials/sarah-johnson.jpg',
    projectType: 'E-commerce Website',
    date: '2024-01-15',
    featured: true,
    location: 'San Francisco, CA',
    companyLogo: 'https://example.com/logos/techstart.png',
    results: [
      '40% increase in conversion rates',
      '60% improvement in page load speed',
      '25% increase in organic traffic',
    ],
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Marketing Director',
    company: 'GrowthCorp',
    content: 'Working with this team was a game-changer for our business. They understood our vision and brought it to life with precision and creativity. The results speak for themselves.',
    rating: 5,
    image: 'https://example.com/testimonials/michael-chen.jpg',
    projectType: 'Corporate Website',
    date: '2024-01-10',
    featured: true,
    location: 'New York, NY',
    companyLogo: 'https://example.com/logos/growthcorp.png',
    results: [
      '150% increase in lead generation',
      '35% improvement in user engagement',
      '50% reduction in bounce rate',
    ],
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'Founder',
    company: 'Creative Studio',
    content: 'The attention to detail and creative approach they brought to our project was outstanding. Our new website perfectly captures our brand identity and has significantly improved our online presence.',
    rating: 5,
    image: 'https://example.com/testimonials/emily-rodriguez.jpg',
    projectType: 'Portfolio Website',
    date: '2024-01-05',
    featured: false,
    location: 'Los Angeles, CA',
    companyLogo: 'https://example.com/logos/creative-studio.png',
    results: [
      '200% increase in portfolio inquiries',
      '45% improvement in client engagement',
      '30% increase in social media followers',
    ],
  },
];

// Services Mock Data
export const mockServices = [
  {
    id: 'web-development',
    name: 'Web Development',
    description: 'Custom web applications built with modern technologies',
    shortDescription: 'Modern, scalable web applications',
    icon: 'code',
    image: 'https://example.com/services/web-development.jpg',
    features: [
      'React & Next.js development',
      'Full-stack solutions',
      'API development & integration',
      'Database design & optimization',
      'Performance optimization',
      'Security implementation',
    ],
    technologies: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'MongoDB'],
    startingPrice: 2499,
    deliveryTime: '2-4 weeks',
    category: 'development',
    popular: true,
    slug: 'web-development',
  },
  {
    id: 'ui-ux-design',
    name: 'UI/UX Design',
    description: 'User-centered design that drives engagement and conversions',
    shortDescription: 'Beautiful, intuitive user experiences',
    icon: 'design',
    image: 'https://example.com/services/ui-ux-design.jpg',
    features: [
      'User research & analysis',
      'Wireframing & prototyping',
      'Visual design & branding',
      'Usability testing',
      'Design system creation',
      'Responsive design',
    ],
    technologies: ['Figma', 'Adobe Creative Suite', 'Sketch', 'InVision', 'Principle'],
    startingPrice: 1999,
    deliveryTime: '1-3 weeks',
    category: 'design',
    popular: true,
    slug: 'ui-ux-design',
  },
  {
    id: 'ecommerce-development',
    name: 'E-commerce Development',
    description: 'Complete e-commerce solutions that drive sales',
    shortDescription: 'Powerful online stores that convert',
    icon: 'shopping',
    image: 'https://example.com/services/ecommerce.jpg',
    features: [
      'Custom e-commerce platforms',
      'Payment gateway integration',
      'Inventory management',
      'Order processing systems',
      'Customer account management',
      'Analytics & reporting',
    ],
    technologies: ['Shopify', 'WooCommerce', 'Stripe', 'PayPal', 'Square'],
    startingPrice: 3999,
    deliveryTime: '3-6 weeks',
    category: 'development',
    popular: false,
    slug: 'ecommerce-development',
  },
];

// Team Member Mock Data
export const mockTeamMembers = [
  {
    id: '1',
    name: 'Alex Thompson',
    role: 'Full Stack Developer',
    department: 'Development',
    bio: 'Alex is a passionate full-stack developer with over 8 years of experience building scalable web applications. He specializes in React, Node.js, and cloud architecture.',
    image: 'https://example.com/team/alex-thompson.jpg',
    skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'GraphQL'],
    email: 'alex@example.com',
    linkedin: 'https://linkedin.com/in/alexthompson',
    github: 'https://github.com/alexthompson',
    twitter: 'https://twitter.com/alexthompson',
    experience: 8,
    education: 'Computer Science, Stanford University',
    certifications: ['AWS Certified Solutions Architect', 'React Professional'],
    featured: true,
    location: 'San Francisco, CA',
  },
  {
    id: '2',
    name: 'Sarah Kim',
    role: 'UI/UX Designer',
    department: 'Design',
    bio: 'Sarah is a creative UI/UX designer with a passion for creating intuitive and beautiful user experiences. She has worked with startups and Fortune 500 companies.',
    image: 'https://example.com/team/sarah-kim.jpg',
    skills: ['Figma', 'Adobe Creative Suite', 'User Research', 'Prototyping', 'Design Systems'],
    email: 'sarah@example.com',
    linkedin: 'https://linkedin.com/in/sarahkim',
    dribbble: 'https://dribbble.com/sarahkim',
    behance: 'https://behance.net/sarahkim',
    experience: 6,
    education: 'Graphic Design, Art Center College of Design',
    certifications: ['Google UX Design Certificate', 'Adobe Certified Expert'],
    featured: true,
    location: 'Los Angeles, CA',
  },
  {
    id: '3',
    name: 'David Martinez',
    role: 'Project Manager',
    department: 'Operations',
    bio: 'David is an experienced project manager who ensures projects are delivered on time and within budget. He has a proven track record of managing complex web development projects.',
    image: 'https://example.com/team/david-martinez.jpg',
    skills: ['Project Management', 'Agile/Scrum', 'Client Communication', 'Risk Management'],
    email: 'david@example.com',
    linkedin: 'https://linkedin.com/in/davidmartinez',
    experience: 10,
    education: 'MBA, Business Administration',
    certifications: ['PMP', 'Scrum Master', 'Agile Certified'],
    featured: false,
    location: 'Austin, TX',
  },
];

// FAQ Mock Data
export const mockFAQs = [
  {
    id: '1',
    question: 'How long does it take to build a website?',
    answer: 'The timeline depends on the complexity of your project. A simple website typically takes 1-2 weeks, while more complex projects with custom functionality can take 4-8 weeks. We\'ll provide a detailed timeline during our initial consultation.',
    category: 'timeline',
    order: 1,
  },
  {
    id: '2',
    question: 'What is included in the website development cost?',
    answer: 'Our pricing includes custom design, development, mobile responsiveness, basic SEO optimization, and initial support. Additional services like e-commerce functionality, custom integrations, or ongoing maintenance are priced separately.',
    category: 'pricing',
    order: 2,
  },
  {
    id: '3',
    question: 'Do you provide ongoing maintenance and support?',
    answer: 'Yes, we offer various maintenance packages to keep your website secure, updated, and performing optimally. Our support includes security updates, content updates, performance monitoring, and technical support.',
    category: 'support',
    order: 3,
  },
  {
    id: '4',
    question: 'Can you help with SEO and digital marketing?',
    answer: 'Absolutely! We provide comprehensive SEO services including keyword research, on-page optimization, technical SEO, and performance tracking. We also offer digital marketing services like PPC advertising and social media marketing.',
    category: 'marketing',
    order: 4,
  },
  {
    id: '5',
    question: 'What technologies do you use?',
    answer: 'We use modern, industry-standard technologies including React, Next.js, Node.js, TypeScript, and various CMS platforms. Our tech stack is chosen based on your project requirements to ensure optimal performance and scalability.',
    category: 'technology',
    order: 5,
  },
];

// Contact Form Mock Data
export const mockContactFormData = {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1 (555) 123-4567',
  company: 'ABC Company',
  projectType: 'website',
  budget: '5000-10000',
  timeline: '1-3 months',
  message: 'I need a new website for my business. Looking for something modern and professional that will help us attract more customers.',
  source: 'google',
  newsletter: true,
};

// Newsletter Signup Mock Data
export const mockNewsletterData = {
  email: 'subscriber@example.com',
  firstName: 'Jane',
  lastName: 'Smith',
  interests: ['web-development', 'design', 'marketing'],
  frequency: 'weekly',
};

// Portfolio/Case Study Mock Data
export const mockPortfolioItems = [
  {
    id: '1',
    title: 'E-commerce Platform for Fashion Brand',
    description: 'Complete e-commerce solution with custom design and advanced functionality',
    client: 'Fashion Forward',
    category: 'E-commerce',
    technologies: ['React', 'Next.js', 'Shopify', 'Stripe'],
    image: 'https://example.com/portfolio/fashion-ecommerce.jpg',
    images: [
      'https://example.com/portfolio/fashion-ecommerce-1.jpg',
      'https://example.com/portfolio/fashion-ecommerce-2.jpg',
      'https://example.com/portfolio/fashion-ecommerce-3.jpg',
    ],
    url: 'https://fashionforward.com',
    completedAt: '2024-01-15',
    duration: '8 weeks',
    teamSize: 4,
    featured: true,
    results: [
      '200% increase in online sales',
      '45% improvement in conversion rate',
      '60% reduction in cart abandonment',
    ],
    challenges: [
      'Complex inventory management',
      'Multiple payment gateways',
      'International shipping calculations',
    ],
    solutions: [
      'Custom inventory sync system',
      'Multi-gateway payment processing',
      'Real-time shipping rate calculator',
    ],
  },
  {
    id: '2',
    title: 'Corporate Website for Tech Startup',
    description: 'Modern, responsive website with lead generation focus',
    client: 'InnovateTech',
    category: 'Corporate',
    technologies: ['React', 'Next.js', 'TypeScript', 'Sanity CMS'],
    image: 'https://example.com/portfolio/tech-startup.jpg',
    images: [
      'https://example.com/portfolio/tech-startup-1.jpg',
      'https://example.com/portfolio/tech-startup-2.jpg',
    ],
    url: 'https://innovatetech.com',
    completedAt: '2024-01-10',
    duration: '4 weeks',
    teamSize: 3,
    featured: true,
    results: [
      '150% increase in lead generation',
      '35% improvement in time on site',
      '50% reduction in bounce rate',
    ],
    challenges: [
      'Complex technical content',
      'Fast loading requirements',
      'SEO optimization for competitive market',
    ],
    solutions: [
      'Structured content strategy',
      'Performance optimization techniques',
      'Comprehensive SEO implementation',
    ],
  },
];

// Export all mock data as a single object for easy importing
export const mockData = {
  blogPosts: mockBlogPosts,
  pricingTiers: mockPricingTiers,
  testimonials: mockTestimonials,
  services: mockServices,
  teamMembers: mockTeamMembers,
  faqs: mockFAQs,
  contactForm: mockContactFormData,
  newsletter: mockNewsletterData,
  portfolio: mockPortfolioItems,
};

// Export individual collections for specific use cases
export default mockData; 