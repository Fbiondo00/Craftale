/**
 * Component-Specific Test Helpers - CMI Platform Standards
 * Specialized testing utilities for complex components
 */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockDataGenerators } from './test-utils';
import React from 'react';

/**
 * Pricing Component Testing Helpers
 */
export const pricingTestHelpers = {
  /**
   * Create mock pricing data for PersonaMatcher
   */
  createMockPersona: (overrides: Partial<any> = {}) => ({
    id: '1',
    name: 'Test Persona',
    description: 'Test persona description',
    budget: 1000,
    features: ['Feature 1', 'Feature 2'],
    recommendations: ['Plan A', 'Plan B'],
    priority: 'medium',
    ...overrides,
  }),

  /**
   * Create mock pricing tiers
   */
  createMockPricingTiers: (count: number = 3) => {
    return Array.from({ length: count }, (_, index) => ({
      id: `tier-${index + 1}`,
      name: `Tier ${index + 1}`,
      price: (index + 1) * 99,
      currency: 'USD',
      interval: 'monthly',
      features: [
        `Feature ${index + 1}-A`,
        `Feature ${index + 1}-B`,
        `Feature ${index + 1}-C`,
      ],
      popular: index === 1, // Make middle tier popular
      recommended: index === 1,
      cta: `Get Started with Tier ${index + 1}`,
      description: `Description for tier ${index + 1}`,
    }));
  },

  /**
   * Test pricing component interaction
   */
  testPricingInteraction: async (user: ReturnType<typeof userEvent.setup>) => {
    // Test plan selection
    const planButtons = await screen.findAllByRole('button', { name: /get started/i });
    expect(planButtons).toHaveLength(3);

    // Test hover states
    await user.hover(planButtons[0]);
    await waitFor(() => {
      expect(planButtons[0]).toHaveClass('hover:');
    });

    // Test click interaction
    await user.click(planButtons[1]);
    await waitFor(() => {
      expect(planButtons[1]).toHaveAttribute('aria-pressed', 'true');
    });
  },

  /**
   * Test persona matcher functionality
   */
  testPersonaMatcher: async (user: ReturnType<typeof userEvent.setup>) => {
    // Test form interaction
    const budgetInput = screen.getByLabelText(/budget/i);
    await user.type(budgetInput, '5000');

    const featuresCheckboxes = screen.getAllByRole('checkbox');
    await user.click(featuresCheckboxes[0]);
    await user.click(featuresCheckboxes[1]);

    // Test recommendation generation
    const generateButton = screen.getByRole('button', { name: /get recommendations/i });
    await user.click(generateButton);

    await waitFor(() => {
      expect(screen.getByText(/recommended plans/i)).toBeInTheDocument();
    });
  },
};

/**
 * Blog Component Testing Helpers
 */
export const blogTestHelpers = {
  /**
   * Create mock blog posts
   */
  createMockBlogPosts: (count: number = 6) => {
    return Array.from({ length: count }, (_, index) => ({
      id: `post-${index + 1}`,
      title: `Blog Post ${index + 1}`,
      content: `This is the content for blog post ${index + 1}`,
      excerpt: `Excerpt for blog post ${index + 1}`,
      author: `Author ${index + 1}`,
      publishedAt: new Date(Date.now() - index * 86400000).toISOString(),
      tags: [`tag-${index + 1}`, `category-${index % 3 + 1}`],
      slug: `blog-post-${index + 1}`,
      featured: index === 0,
      image: `https://example.com/image-${index + 1}.jpg`,
      readingTime: Math.floor(Math.random() * 10) + 1,
    }));
  },

  /**
   * Test blog grid functionality
   */
  testBlogGrid: async (user: ReturnType<typeof userEvent.setup>) => {
    // Test filter functionality
    const filterButtons = screen.getAllByRole('button', { name: /filter/i });
    if (filterButtons.length > 0) {
      await user.click(filterButtons[0]);
      await waitFor(() => {
        expect(screen.getByText(/filtered results/i)).toBeInTheDocument();
      });
    }

    // Test pagination
    const nextButton = screen.queryByRole('button', { name: /next/i });
    if (nextButton) {
      await user.click(nextButton);
      await waitFor(() => {
        expect(screen.getByText(/page 2/i)).toBeInTheDocument();
      });
    }

    // Test search functionality
    const searchInput = screen.queryByRole('textbox', { name: /search/i });
    if (searchInput) {
      await user.type(searchInput, 'test query');
      await waitFor(() => {
        expect(screen.getByText(/search results/i)).toBeInTheDocument();
      });
    }
  },

  /**
   * Test blog post interaction
   */
  testBlogPostInteraction: async (user: ReturnType<typeof userEvent.setup>) => {
    // Test read more functionality
    const readMoreButton = screen.queryByRole('button', { name: /read more/i });
    if (readMoreButton) {
      await user.click(readMoreButton);
      await waitFor(() => {
        expect(screen.getByText(/full article/i)).toBeInTheDocument();
      });
    }

    // Test sharing functionality
    const shareButton = screen.queryByRole('button', { name: /share/i });
    if (shareButton) {
      await user.click(shareButton);
      await waitFor(() => {
        expect(screen.getByText(/share this post/i)).toBeInTheDocument();
      });
    }
  },
};

/**
 * Hero Section Testing Helpers
 */
export const heroTestHelpers = {
  /**
   * Create mock hero data
   */
  createMockHeroData: (overrides: Partial<any> = {}) => ({
    title: 'Test Hero Title',
    subtitle: 'Test hero subtitle',
    description: 'Test hero description',
    ctaPrimary: 'Get Started',
    ctaSecondary: 'Learn More',
    backgroundImage: 'https://example.com/hero-bg.jpg',
    video: 'https://example.com/hero-video.mp4',
    ...overrides,
  }),

  /**
   * Test hero section interactions
   */
  testHeroInteractions: async (user: ReturnType<typeof userEvent.setup>) => {
    // Test CTA buttons
    const primaryCTA = screen.getByRole('button', { name: /get started/i });
    const secondaryCTA = screen.queryByRole('button', { name: /learn more/i });

    await user.click(primaryCTA);
    await waitFor(() => {
      expect(primaryCTA).toHaveClass('active');
    });

    if (secondaryCTA) {
      await user.click(secondaryCTA);
      await waitFor(() => {
        expect(secondaryCTA).toHaveClass('active');
      });
    }

    // Test video play functionality
    const videoPlayButton = screen.queryByRole('button', { name: /play video/i });
    if (videoPlayButton) {
      await user.click(videoPlayButton);
      await waitFor(() => {
        expect(screen.getByText(/video playing/i)).toBeInTheDocument();
      });
    }
  },
};

/**
 * Form Component Testing Helpers
 */
export const formTestHelpers = {
  /**
   * Create mock form data
   */
  createMockFormData: (type: 'contact' | 'newsletter' | 'quote' = 'contact') => {
    const baseData = {
      contact: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        message: 'Test message',
        company: 'Test Company',
        budget: '5000-10000',
      },
      newsletter: {
        email: 'subscriber@example.com',
        firstName: 'Jane',
        interests: ['web-development', 'design'],
      },
      quote: {
        name: 'Business Owner',
        email: 'owner@business.com',
        phone: '+1234567890',
        company: 'My Business',
        projectType: 'website',
        budget: '10000-25000',
        timeline: '3-6 months',
        description: 'I need a new website for my business',
      },
    };

    return baseData[type];
  },

  /**
   * Test form validation
   */
  testFormValidation: async (user: ReturnType<typeof userEvent.setup>, formSelector: string = 'form') => {
    const form = document.querySelector(formSelector);
    if (!form) return;

    // Test required field validation
    const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement;
    await user.click(submitButton);

    await waitFor(() => {
      const errorMessages = form.querySelectorAll('.error, [role="alert"]');
      expect(errorMessages.length).toBeGreaterThan(0);
    });

    // Test email validation
    const emailInput = form.querySelector('input[type="email"]') as HTMLInputElement;
    if (emailInput) {
      await user.type(emailInput, 'invalid-email');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
      });
    }

    // Test phone validation
    const phoneInput = form.querySelector('input[type="tel"]') as HTMLInputElement;
    if (phoneInput) {
      await user.type(phoneInput, '123');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/invalid phone/i)).toBeInTheDocument();
      });
    }
  },

  /**
   * Test successful form submission
   */
  testFormSubmission: async (user: ReturnType<typeof userEvent.setup>, formData: Record<string, string>) => {
    // Fill form with valid data
    for (const [fieldName, value] of Object.entries(formData)) {
      const field = document.querySelector(`[name="${fieldName}"]`) as HTMLInputElement;
      if (field) {
        await user.clear(field);
        await user.type(field, value);
      }
    }

    // Submit form
    const submitButton = document.querySelector('button[type="submit"]') as HTMLButtonElement;
    await user.click(submitButton);

    // Wait for success message
    await waitFor(() => {
      expect(screen.getByText(/success|thank you|sent/i)).toBeInTheDocument();
    });
  },
};

/**
 * Navigation Testing Helpers
 */
export const navigationTestHelpers = {
  /**
   * Test navigation menu functionality
   */
  testNavigation: async (user: ReturnType<typeof userEvent.setup>) => {
    // Test mobile menu toggle
    const mobileMenuButton = screen.queryByRole('button', { name: /menu/i });
    if (mobileMenuButton) {
      await user.click(mobileMenuButton);
      await waitFor(() => {
        expect(screen.getByRole('navigation')).toHaveClass('open');
      });
    }

    // Test dropdown menus
    const dropdownButtons = screen.getAllByRole('button', { name: /services|about/i });
    for (const button of dropdownButtons) {
      await user.hover(button);
      await waitFor(() => {
        expect(button).toHaveAttribute('aria-expanded', 'true');
      });
    }

    // Test navigation links
    const navLinks = screen.getAllByRole('link');
    expect(navLinks).toHaveLength(expect.any(Number));
    
    // Test first link
    if (navLinks.length > 0) {
      await user.click(navLinks[0]);
      await waitFor(() => {
        expect(navLinks[0]).toHaveClass('active');
      });
    }
  },

  /**
   * Test search functionality
   */
  testSearchFunctionality: async (user: ReturnType<typeof userEvent.setup>) => {
    const searchInput = screen.queryByRole('textbox', { name: /search/i });
    if (searchInput) {
      await user.type(searchInput, 'test query');
      
      const searchButton = screen.queryByRole('button', { name: /search/i });
      if (searchButton) {
        await user.click(searchButton);
        await waitFor(() => {
          expect(screen.getByText(/search results/i)).toBeInTheDocument();
        });
      }
    }
  },
};

/**
 * Animation Testing Helpers
 */
export const animationTestHelpers = {
  /**
   * Test scroll-triggered animations
   */
  testScrollAnimations: async () => {
    // Mock IntersectionObserver
    const mockObserver = {
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    };

    global.IntersectionObserver = jest.fn().mockImplementation((callback) => {
      // Simulate element entering viewport
      setTimeout(() => {
        callback([{ isIntersecting: true, target: document.body }]);
      }, 100);
      return mockObserver;
    });

    // Test animation classes
    await waitFor(() => {
      const animatedElements = document.querySelectorAll('[data-animate]');
      animatedElements.forEach(element => {
        expect(element).toHaveClass('animate-in');
      });
    });
  },

  /**
   * Test hover animations
   */
  testHoverAnimations: async (user: ReturnType<typeof userEvent.setup>) => {
    const animatedElements = document.querySelectorAll('[data-hover-animate]');
    
    for (const element of Array.from(animatedElements)) {
      await user.hover(element as HTMLElement);
      await waitFor(() => {
        expect(element).toHaveClass('hover:scale-105');
      });

      await user.unhover(element as HTMLElement);
      await waitFor(() => {
        expect(element).not.toHaveClass('hover:scale-105');
      });
    }
  },
};

/**
 * Performance Testing Helpers
 */
export const performanceTestHelpers = {
  /**
   * Measure component render time
   */
  measureRenderTime: async (component: React.ReactElement) => {
    const start = performance.now();
    render(component);
    const end = performance.now();
    return end - start;
  },

  /**
   * Test component memory usage
   */
  testMemoryUsage: async (component: React.ReactElement) => {
    const initialMemory = (performance as any).memory?.usedJSHeapSize || 0;
    const { unmount } = render(component);
    const afterRenderMemory = (performance as any).memory?.usedJSHeapSize || 0;
    unmount();
    const afterUnmountMemory = (performance as any).memory?.usedJSHeapSize || 0;

    return {
      renderIncrease: afterRenderMemory - initialMemory,
      memoryLeakage: afterUnmountMemory - initialMemory,
    };
  },

  /**
   * Test component re-render count
   */
  testRerenderCount: () => {
    let renderCount = 0;
    
    const TestWrapper = ({ children }: { children: React.ReactNode }) => {
      renderCount++;
      return React.createElement(React.Fragment, null, children);
    };

    return { TestWrapper, getRenderCount: () => renderCount };
  },
};

/**
 * Test animation and hover effects
 */
export const testAnimationEffects = async (user: any): Promise<void> => {
  const animatedElements = document.querySelectorAll('[data-hover-animate]');
  
  for (const element of Array.from(animatedElements)) {
    await user.hover(element as HTMLElement);
    await waitFor(() => {
      expect(element).toHaveClass('hover:scale-105');
    });
  }
}; 