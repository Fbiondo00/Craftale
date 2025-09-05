/**
 * Jest Setup Validation Tests - CMI Platform Standards
 * Validates that all testing infrastructure is properly configured
 */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

// Import test utilities and fixtures directly
import mockData from '../fixtures/mock-data';

describe('Jest Setup Validation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Basic Testing Infrastructure', () => {
    it('should have Jest configured properly', () => {
      expect(jest).toBeDefined();
      expect(jest.fn).toBeDefined();
      expect(jest.mock).toBeDefined();
    });

    it('should have React Testing Library configured', () => {
      expect(render).toBeDefined();
      expect(screen).toBeDefined();
      expect(waitFor).toBeDefined();
    });

    it('should have user event utilities', () => {
      expect(userEvent).toBeDefined();
      expect(userEvent.click).toBeDefined();
      expect(userEvent.type).toBeDefined();
    });
  });

  describe('React Component Testing', () => {
    it('should render React components', () => {
      const TestComponent = () => React.createElement('div', { 
        'data-testid': 'test-component' 
      }, 'Test Content');
      
      render(React.createElement(TestComponent));
      expect(screen.getByTestId('test-component')).toBeInTheDocument();
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('should support waitFor for async operations', async () => {
      const TestComponent = () => {
        const [text, setText] = React.useState('Loading...');
        
        React.useEffect(() => {
          setTimeout(() => setText('Loaded!'), 100);
        }, []);
        
        return React.createElement('div', { 
          'data-testid': 'async-component' 
        }, text);
      };
      
      render(React.createElement(TestComponent));
      
      await waitFor(() => {
        expect(screen.getByText('Loaded!')).toBeInTheDocument();
      });
    });
  });

  describe('Mock Setup', () => {
    it('should have localStorage mock available', () => {
      expect(window.localStorage).toBeDefined();
      expect(window.localStorage.getItem).toBeDefined();
      expect(window.localStorage.setItem).toBeDefined();
    });

    it('should have sessionStorage mock available', () => {
      expect(window.sessionStorage).toBeDefined();
      expect(window.sessionStorage.getItem).toBeDefined();
      expect(window.sessionStorage.setItem).toBeDefined();
    });


    it('should have IntersectionObserver mock', () => {
      expect(global.IntersectionObserver).toBeDefined();
      const observer = new IntersectionObserver(jest.fn());
      expect(observer.observe).toBeDefined();
      expect(observer.unobserve).toBeDefined();
      expect(observer.disconnect).toBeDefined();
    });

    it('should have ResizeObserver mock', () => {
      expect(global.ResizeObserver).toBeDefined();
      const observer = new ResizeObserver(jest.fn());
      expect(observer.observe).toBeDefined();
      expect(observer.unobserve).toBeDefined();
      expect(observer.disconnect).toBeDefined();
    });

    it('should have matchMedia mock', () => {
      expect(window.matchMedia).toBeDefined();
      const mediaQuery = window.matchMedia('(min-width: 768px)');
      expect(mediaQuery.matches).toBeDefined();
      expect(mediaQuery.addEventListener).toBeDefined();
    });
  });

  describe('Test Data and Fixtures', () => {
    it('should have mock data available', () => {
      expect(mockData).toBeDefined();
      expect(mockData.blogPosts).toBeDefined();
      expect(mockData.pricingTiers).toBeDefined();
      expect(mockData.testimonials).toBeDefined();
    });

    it('should have valid blog post fixtures', () => {
      expect(Array.isArray(mockData.blogPosts)).toBe(true);
      expect(mockData.blogPosts.length).toBeGreaterThan(0);
      
      const firstPost = mockData.blogPosts[0];
      expect(firstPost.id).toBeDefined();
      expect(firstPost.title).toBeDefined();
      expect(firstPost.content).toBeDefined();
    });

    it('should have valid pricing tier fixtures', () => {
      expect(Array.isArray(mockData.pricingTiers)).toBe(true);
      expect(mockData.pricingTiers.length).toBeGreaterThan(0);
      
      const firstTier = mockData.pricingTiers[0];
      expect(firstTier.id).toBeDefined();
      expect(firstTier.name).toBeDefined();
      expect(firstTier.price).toBeDefined();
    });
  });

  describe('Performance Testing', () => {
    it('should complete basic render operations quickly', () => {
      const start = performance.now();
      
      const TestComponent = () => React.createElement('div', {}, 'Performance Test');
      render(React.createElement(TestComponent));
      
      const end = performance.now();
      const renderTime = end - start;
      
      // Basic render should complete within 100ms
      expect(renderTime).toBeLessThan(100);
    });
  });
});
