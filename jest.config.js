const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  // Test environment for React components
  testEnvironment: 'jsdom',
  
  // Prevent canvas dependency from being loaded (iOS Chrome compatibility)
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  
  // Setup files - load polyfills BEFORE any other modules
  setupFiles: ['<rootDir>/jest.polyfills.js'],
  
  // Setup files after environment
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
  // Module name mapping
  moduleNameMapper: {
    '^canvas$': '<rootDir>/test/__mocks__/canvas.js',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@test/(.*)$': '<rootDir>/test/$1',
    '^@fixtures/(.*)$': '<rootDir>/test/fixtures/$1',
    '^@helpers/(.*)$': '<rootDir>/test/helpers/$1',
    '^@mocks/(.*)$': '<rootDir>/test/__mocks__/$1',
  },
  
  // Test file patterns - CMI Platform structure
  testMatch: [
    '<rootDir>/test/unit/**/*.test.{js,jsx,ts,tsx}',
    '<rootDir>/test/integration/**/*.test.{js,jsx,ts,tsx}',
    '<rootDir>/test/e2e/**/*.test.{js,jsx,ts,tsx}',
  ],
  
  // Coverage configuration - CMI Platform standards
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/app/**/page.tsx',       // Next.js pages can have lower coverage
    '!src/app/**/layout.tsx',     // Next.js layouts can have lower coverage
    '!src/app/globals.css',
    '!src/types/**/*',            // Type-only files
    '!src/**/*.types.ts',
    '!src/**/*.interface.ts',
    '!src/**/*.const.ts',
  ],
  
  // CMI Platform Coverage Thresholds - MANDATORY
  coverageThreshold: {
    global: {
      branches: 90,      // 90% branch coverage minimum
      functions: 95,     // 95% function coverage minimum  
      lines: 95,         // 95% line coverage minimum
      statements: 95     // 95% statement coverage minimum
    },
    // Critical components - higher standards
    './src/components/**/*.{ts,tsx}': {
      branches: 90,
      functions: 95,
      lines: 95,
      statements: 95
    },
    // Utility functions - standard requirements
    './src/lib/**/*.{ts,tsx}': {
      branches: 90,
      functions: 95,
      lines: 95,
      statements: 95
    }
  },
  
  // Coverage reporting
  coverageReporters: [
    'text-summary',       // Brief summary for CLI
    'text',              // Detailed text table
    'lcov',              // For IDE integration
    'html',              // Interactive HTML report
    'json-summary',      // Summary JSON for CI/CD
  ],
  coverageDirectory: 'coverage',
  
  // Module file extensions
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  
  // Test path ignore patterns
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/coverage/',
    '<rootDir>/dist/',
  ],
  
  // Performance and execution settings
  testTimeout: 10000,           // 10 second global timeout
  verbose: true,                // Detailed test output
  errorOnDeprecated: true,      // Fail on deprecated Jest APIs
  clearMocks: true,             // Clear mocks between tests
  restoreMocks: true,           // Restore mocks after each test
  
  // Performance optimization
  maxWorkers: '50%',            // Use 50% of available CPU cores
  
  // Watch mode plugins for better DX
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ],
  
  // Transform settings for TypeScript
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: {
        jsx: 'react-jsx',
      },
    }],
  },
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig) 