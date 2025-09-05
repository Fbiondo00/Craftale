import { NextRequest } from 'next/server';

// Test utilities for monitoring and observability tests
export class TestHelpers {
  /**
   * Create a mock NextRequest for testing
   */
  static createMockRequest(url: string, options: Partial<RequestInit> = {}): NextRequest {
    // Filter out signal if it's null to avoid TypeScript error
    const { signal, ...filteredOptions } = options;
    const requestOptions = {
      method: 'GET',
      ...filteredOptions,
      ...(signal && { signal })
    };
    
    return new NextRequest(url, requestOptions);
  }

  /**
   * Create a POST request with JSON body
   */
  static createMockPostRequest(url: string, body: any): NextRequest {
    return new NextRequest(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  }

  /**
   * Wait for a specified amount of time
   */
  static async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Generate random test data
   */
  static generateRandomId(): string {
    return `test-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Generate valid deployment notification payload
   */
  static createDeploymentPayload(status: string, environment = 'test'): any {
    return {
      status,
      environment,
      version: this.generateRandomId(),
      commitSha: this.generateRandomId(),
      timestamp: new Date().toISOString(),
      ...(status === 'success' && {
        deploymentUrl: `https://${this.generateRandomId()}.vercel.app`,
        duration: Math.floor(Math.random() * 300000) + 30000, // 30s to 5min
      }),
      ...(status === 'failure' && {
        error: 'Test deployment failure',
      }),
      metadata: {
        branch: 'main',
        actor: 'test-user',
        workflow: 'Test Deployment',
      },
    };
  }

  /**
   * Assert response structure matches expected schema
   */
  static assertResponseStructure(response: any, expectedStructure: any): void {
    Object.keys(expectedStructure).forEach(key => {
      expect(response).toHaveProperty(key);
      
      if (typeof expectedStructure[key] === 'object' && expectedStructure[key] !== null) {
        this.assertResponseStructure(response[key], expectedStructure[key]);
      } else if (typeof expectedStructure[key] === 'string') {
        expect(typeof response[key]).toBe(expectedStructure[key]);
      }
    });
  }

  /**
   * Validate Prometheus metrics format
   */
  static validatePrometheusFormat(metricsText: string): boolean {
    const lines = metricsText.split('\n').filter(line => line.trim());
    
    for (const line of lines) {
      if (line.startsWith('#')) {
        // Comment line - should start with # HELP or # TYPE
        if (!line.match(/^# (HELP|TYPE)/)) {
          return false;
        }
      } else if (line.trim()) {
        // Metric line - should have proper format
        if (!line.match(/^[a-zA-Z_:][a-zA-Z0-9_:]*(\{[^}]*\})?\s+[0-9.-]+(\s+[0-9]+)?$/)) {
          return false;
        }
      }
    }
    
    return true;
  }

  /**
   * Performance testing helper
   */
  static async measurePerformance<T>(
    operation: () => Promise<T>
  ): Promise<{ result: T; duration: number }> {
    const startTime = Date.now();
    const result = await operation();
    const endTime = Date.now();
    
    return {
      result,
      duration: endTime - startTime,
    };
  }

  /**
   * Retry operation with exponential backoff
   */
  static async retryOperation<T>(
    operation: () => Promise<T>,
    maxRetries = 3,
    baseDelay = 1000
  ): Promise<T> {
    let lastError: Error;
    
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;
        if (i < maxRetries - 1) {
          await this.delay(baseDelay * Math.pow(2, i));
        }
      }
    }
    
    throw lastError!;
  }

  /**
   * Mock system metrics for testing
   */
  static getMockSystemMetrics() {
    return {
      memory: {
        used: Math.floor(Math.random() * 1024) + 256, // 256MB to 1.25GB
        total: 2048,
        percentage: Math.floor(Math.random() * 80) + 10, // 10% to 90%
      },
      cpu: {
        usage: Math.random() * 100,
      },
      disk: {
        used: Math.floor(Math.random() * 2048) + 512, // 512MB to 2.5GB
        total: 4096,
        percentage: Math.floor(Math.random() * 70) + 15, // 15% to 85%
      },
    };
  }

  /**
   * Validate timestamp format
   */
  static isValidTimestamp(timestamp: string): boolean {
    const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;
    return iso8601Regex.test(timestamp) && !isNaN(Date.parse(timestamp));
  }

  /**
   * Create test environment configuration
   */
  static setupTestEnvironment(): void {
    // Environment variables are likely already set by Jest configuration
    // process.env.NODE_ENV = 'test';
    // process.env.NEXT_PUBLIC_APP_URL = 'http://localhost:3000';
    
    // Suppress console output during tests
    global.console = {
      ...console,
      log: jest.fn(),
      debug: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    };
  }

  /**
   * Clean up test environment
   */
  static cleanupTestEnvironment(): void {
    // Reset environment variables
    // delete process.env.NODE_ENV;
    // delete process.env.NEXT_PUBLIC_APP_URL;
    
    // Clear all mocks
    jest.clearAllMocks();
  }
} 