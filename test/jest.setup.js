/**
 * Jest Setup Configuration
 * Task 0.3: Infrastructure as Code - Testing Implementation
 * 
 * Configures Jest environment for testing Next.js API routes with TypeScript
 * Created: Friday, July 4, 2025 at 5:56 pm CEST
 */

// Mock Next.js runtime environment
process.env.NODE_ENV = 'test';

// Set up global test timeouts
jest.setTimeout(30000);

// Mock console to reduce noise during tests (optional)
global.console = {
  ...console,
  // Uncomment to suppress logs during tests
  // log: jest.fn(),
  // debug: jest.fn(),
  // info: jest.fn(),
  // warn: jest.fn(),
  // error: jest.fn(),
}; 