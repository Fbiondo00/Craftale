import React, { ReactElement, ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

/**
 * Enhanced render function with testing utilities
 */
export interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialState?: any;
  theme?: string;
  locale?: string;
}

/**
 * Mock component props interface
 */
export interface MockComponentProps {
  [key: string]: any;
  children?: ReactNode;
  className?: string;
  'data-testid'?: string;
}

/**
 * Enhanced render function with provider support
 */
export const customRender = (ui: ReactElement, options?: RenderOptions) => {
  const { container, ...renderOptions } = options || {};

  const AllTheProviders = ({ children }: { children: ReactNode }) => {
    // Add any global providers here (Theme, Router, etc.)
    return React.createElement(React.Fragment, null, children);
  };

  const renderResult = render(ui, {
    wrapper: AllTheProviders,
    container,
    ...renderOptions
  });

  return {
    ...renderResult,
    rerender: (newUi: ReactElement) => 
      renderResult.rerender(React.createElement(AllTheProviders, null, newUi))
  };
};

/**
 * Create mock component for testing
 */
export function createMockComponent(
  componentName: string,
  defaultProps: MockComponentProps = {}
) {
  const MockComponent = (props: MockComponentProps) => {
    const { children, 'data-testid': testId, ...otherProps } = props;
    
    return React.createElement(
      'div',
      {
        'data-testid': testId || `mock-${componentName.toLowerCase()}`,
        'data-component': componentName,
        ...otherProps
      },
      children
    );
  };

  MockComponent.displayName = `Mock${componentName}`;
  MockComponent.defaultProps = defaultProps;

  return MockComponent;
}

/**
 * Mock Next.js Image component for testing
 */
export const MockNextImage = createMockComponent('NextImage', {
  alt: 'Test image',
  src: 'test-image.jpg',
  width: 100,
  height: 100,
});

/**
 * Mock Next.js Link component for testing
 */
export const MockNextLink = ({ children, href, ...props }: any) => 
  React.createElement(
    'a',
    {
      href,
      'data-testid': 'mock-next-link',
      ...props
    },
    children
  );

/**
 * Animation testing utilities
 */
export const animationUtils = {
  /**
   * Wait for animations to complete
   */
  waitForAnimations: async (duration: number = 100): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, duration));
  },

  /**
   * Mock framer-motion animations
   */
  mockFramerMotion: () => {
    jest.mock('framer-motion', () => ({
      motion: {
        div: 'div',
        span: 'span',
        section: 'section',
        article: 'article',
        button: 'button',
        a: 'a',
        h1: 'h1',
        h2: 'h2',
        h3: 'h3',
        p: 'p',
        img: 'img',
      },
      AnimatePresence: ({ children }: { children: ReactNode }) => children,
      useAnimation: () => ({
        start: jest.fn(),
        stop: jest.fn(),
        set: jest.fn(),
      }),
      useInView: () => [jest.fn(), false],
    }));
  },
};

/**
 * Form testing utilities
 */
export const formUtils = {
  /**
   * Fill form fields with test data
   */
  fillForm: async (user: ReturnType<typeof userEvent.setup>, formData: Record<string, string>) => {
    for (const [fieldName, value] of Object.entries(formData)) {
      const field = document.querySelector(`[name="${fieldName}"]`) as HTMLInputElement;
      if (field) {
        await user.clear(field);
        await user.type(field, value);
      }
    }
  },

  /**
   * Submit form for testing
   */
  submitForm: async (user: ReturnType<typeof userEvent.setup>, formSelector: string = 'form') => {
    const form = document.querySelector(formSelector) as HTMLFormElement;
    if (form) {
      await user.click(form.querySelector('button[type="submit"]') as HTMLButtonElement);
    }
  },
};

/**
 * Responsive testing utilities
 */
export const responsiveUtils = {
  /**
   * Mock window matchMedia for responsive testing
   */
  mockMatchMedia: (matches: boolean = false) => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  },

  /**
   * Test different viewport sizes
   */
  testViewports: {
    mobile: { width: 375, height: 667 },
    tablet: { width: 768, height: 1024 },
    desktop: { width: 1920, height: 1080 },
  },

  /**
   * Set viewport size for testing
   */
  setViewport: (width: number, height: number) => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: width,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: height,
    });
  },
};

/**
 * Mock data generators
 */
export const mockDataGenerators = {
  /**
   * Generate mock user data
   */
  createMockUser: (overrides: Partial<any> = {}) => ({
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    avatar: 'https://example.com/avatar.jpg',
    role: 'user',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  }),

  /**
   * Generate mock API response
   */
  createMockApiResponse: <T>(data: T, status: number = 200) => ({
    data,
    status,
    statusText: status === 200 ? 'OK' : 'Error',
    headers: {},
  }),

  /**
   * Generate mock blog post
   */
  createMockBlogPost: (overrides: Partial<any> = {}) => ({
    id: '1',
    title: 'Test Blog Post',
    content: 'This is a test blog post content',
    excerpt: 'Test excerpt',
    author: 'Test Author',
    publishedAt: new Date().toISOString(),
    tags: ['test', 'blog'],
    slug: 'test-blog-post',
    ...overrides,
  }),
};

/**
 * Async testing utilities
 */
export const asyncUtils = {
  /**
   * Wait for async operations to complete
   */
  waitForAsyncOperations: async (timeout: number = 5000) => {
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, timeout));
    });
  },

  /**
   * Mock async functions
   */
  createMockAsyncFunction: <T>(resolveValue: T, delay: number = 0) => {
    return jest.fn().mockImplementation(() => 
      new Promise(resolve => 
        setTimeout(() => resolve(resolveValue), delay)
      )
    );
  },
};

/**
 * Assertion helpers
 */
export const assertionHelpers = {
  /**
   * Assert element has specific attributes
   */
  expectElementAttributes: (element: HTMLElement, attributes: Record<string, string>) => {
    Object.entries(attributes).forEach(([key, value]) => {
      expect(element).toHaveAttribute(key, value);
    });
  },

  /**
   * Assert element has specific classes
   */
  expectElementClasses: (element: HTMLElement, classes: string[]) => {
    classes.forEach(className => {
      expect(element).toHaveClass(className);
    });
  },
};

/**
 * Re-export commonly used testing utilities
 */
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
export { customRender as render }; 