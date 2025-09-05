/**
 * Jest Setup File - CMI Platform Standards
 * Enhanced setup for comprehensive testing with React Testing Library
 */

import '@testing-library/jest-dom'

// Global test utilities - with proper polyfills
if (typeof global.TextEncoder === 'undefined') {
  const { TextEncoder, TextDecoder } = require('util');
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}

// Test environment configuration
process.env.NODE_ENV = 'test';
process.env.NEXT_PUBLIC_APP_URL = 'http://localhost:3000';

// Mock console methods during tests to reduce noise (CMI Standard)
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

global.console = {
  ...console,
  // Keep important logs visible but mock noisy ones
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn((message) => {
    // Still show React warnings and other important warnings
    if (message?.includes?.('Warning:') || message?.includes?.('React')) {
      originalConsoleWarn(message);
    }
  }),
  error: jest.fn((message) => {
    // Still show important errors but suppress test noise
    if (message?.includes?.('Error:') || message?.includes?.('Failed')) {
      originalConsoleError(message);
    }
  }),
};

// Global test utilities following CMI standards
beforeEach(() => {
  // Clear all mocks before each test
  jest.clearAllMocks();
  
  // Reset any global state
  // Add any global state resets here
});

afterEach(() => {
  // Restore all mocks after each test
  jest.restoreAllMocks();
  
  // Clean up any test artifacts
  // Add any cleanup logic here
});

// Mock Next.js router for testing
jest.mock('next/router', () => ({
  useRouter: () => ({
    route: '/',
    pathname: '/',
    query: {},
    asPath: '/',
    push: jest.fn(),
    pop: jest.fn(),
    reload: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn().mockResolvedValue(undefined),
    beforePopState: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
  }),
}));

// Mock Next.js navigation for app router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(),
    getAll: jest.fn(),
    has: jest.fn(),
    keys: jest.fn(),
    values: jest.fn(),
    entries: jest.fn(),
    toString: jest.fn(),
  }),
  usePathname: () => '/',
}));

// Mock framer-motion for stable testing
jest.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    span: 'span',
    a: 'a',
    p: 'p',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    button: 'button',
    img: 'img',
    section: 'section',
    article: 'article',
    header: 'header',
    footer: 'footer',
    nav: 'nav',
  },
  AnimatePresence: ({ children }) => children,
  useAnimation: () => ({
    start: jest.fn(),
    stop: jest.fn(),
    set: jest.fn(),
  }),
  useInView: () => [jest.fn(), false],
}));

// Mock IntersectionObserver for component testing
global.IntersectionObserver = jest.fn().mockImplementation((callback) => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
  root: null,
  rootMargin: '',
  thresholds: [],
}));

// Mock ResizeObserver for component testing
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock matchMedia for responsive testing
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock scrollTo for testing
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: jest.fn(),
});

// Mock requestAnimationFrame for animation testing
global.requestAnimationFrame = jest.fn((cb) => setTimeout(cb, 0));
global.cancelAnimationFrame = jest.fn();

// Suppress specific warnings that are not relevant for testing
const originalWarn = console.warn;
console.warn = (...args) => {
  if (
    typeof args[0] === 'string' &&
    args[0].includes('componentWillReceiveProps') ||
    args[0].includes('componentWillMount')
  ) {
    return;
  }
  originalWarn(...args);
};

// Custom test utilities (can be extended)
global.testUtils = {
  // Add any global test utilities here
  createMockProps: (overrides = {}) => ({
    // Default mock props
    ...overrides,
  }),
  
  waitForAnimations: () => {
    return new Promise(resolve => {
      setTimeout(resolve, 100);
    });
  },
};

// Performance monitoring for test optimization
if (process.env.JEST_PERFORMANCE_MONITORING === 'true') {
  const originalIt = global.it;
  global.it = (name, fn, timeout) => {
    return originalIt(name, async (...args) => {
      const start = performance.now();
      const result = await fn(...args);
      const end = performance.now();
      const duration = end - start;
      
      if (duration > 100) { // Log slow tests
        console.warn(`⚠️  Slow test detected: "${name}" took ${duration.toFixed(2)}ms`);
      }
      
      return result;
    }, timeout);
  };
} 