/**
 * Jest Polyfills
 * Load critical polyfills BEFORE any other modules
 * This ensures that Web APIs are available in Node.js test environment
 */

// Import polyfills from util module
const { TextEncoder, TextDecoder } = require('util');

// 1. Text encoding polyfills
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// 2. Headers polyfill (need to define this before Request/Response)
global.Headers = class Headers {
  constructor(init = {}) {
    this._headers = {};
    
    if (init) {
      if (typeof init[Symbol.iterator] === 'function') {
        for (const [key, value] of init) {
          this.set(key, value);
        }
      } else {
        for (const key in init) {
          this.set(key, init[key]);
        }
      }
    }
  }

  set(name, value) {
    this._headers[name.toLowerCase()] = String(value);
  }

  get(name) {
    return this._headers[name.toLowerCase()] || null;
  }

  has(name) {
    return name.toLowerCase() in this._headers;
  }

  delete(name) {
    delete this._headers[name.toLowerCase()];
  }

  forEach(callback, thisArg) {
    for (const [key, value] of this.entries()) {
      callback.call(thisArg, value, key, this);
    }
  }

  keys() {
    return Object.keys(this._headers);
  }

  values() {
    return Object.values(this._headers);
  }

  entries() {
    return Object.entries(this._headers);
  }

  [Symbol.iterator]() {
    return this.entries()[Symbol.iterator]();
  }
};

// 3. Request/Response polyfills (compatible with Next.js)
class MockRequest {
  constructor(input, init = {}) {
    this._url = input;
    this._method = init.method || 'GET';
    this._headers = new Headers(init.headers || {});
    this._body = init.body || null;
    this._bodyInit = init.body || null;
  }

  get url() {
    return this._url;
  }

  get method() {
    return this._method;
  }

  get headers() {
    return this._headers;
  }

  get body() {
    return this._body;
  }

  async json() {
    return JSON.parse(this._bodyInit || '{}');
  }

  async text() {
    return this._bodyInit || '';
  }

  clone() {
    return new MockRequest(this._url, {
      method: this._method,
      headers: this._headers,
      body: this._bodyInit,
    });
  }
}

// Store the original Request if it exists
const OriginalRequest = global.Request;

// Only replace if Request doesn't exist
if (!global.Request) {
  global.Request = MockRequest;
}

global.Response = class Response {
  constructor(body, init = {}) {
    this.body = body;
    this.status = init.status || 200;
    this.statusText = init.statusText || 'OK';
    this.headers = new Headers(init.headers || {});
    this.ok = this.status >= 200 && this.status < 300;
    this.url = init.url || '';
  }

  async json() {
    return typeof this.body === 'string' ? JSON.parse(this.body) : this.body;
  }

  async text() {
    return typeof this.body === 'string' ? this.body : JSON.stringify(this.body);
  }

  clone() {
    return new Response(this.body, {
      status: this.status,
      statusText: this.statusText,
      headers: this.headers,
      url: this.url,
    });
  }

  static json(object, init) {
    return new Response(JSON.stringify(object), {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...init?.headers,
      },
    });
  }

  static error() {
    return new Response(null, { status: 500, statusText: 'Internal Server Error' });
  }
};

// 4. Fetch API polyfill - simple mock implementation
global.fetch = jest.fn(async (url, options = {}) => {
  return new Response(JSON.stringify({ message: 'Mock response' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
});

// 5. URL polyfill
global.URL = global.URL || require('url').URL;
global.URLSearchParams = global.URLSearchParams || require('url').URLSearchParams;

// 6. Storage polyfills
const createStorage = () => {
  const storage = {};
  return {
    getItem: (key) => storage[key] || null,
    setItem: (key, value) => (storage[key] = value),
    removeItem: (key) => delete storage[key],
    clear: () => Object.keys(storage).forEach(key => delete storage[key]),
    get length() { return Object.keys(storage).length; },
    key: (index) => Object.keys(storage)[index] || null,
  };
};

global.localStorage = createStorage();
global.sessionStorage = createStorage();

// 7. DOM-related polyfills
global.location = {
  href: 'http://localhost:3000',
  origin: 'http://localhost:3000',
  protocol: 'http:',
  hostname: 'localhost',
  port: '3000',
  pathname: '/',
  search: '',
  hash: '',
  assign: jest.fn(),
  reload: jest.fn(),
  replace: jest.fn(),
};

global.navigator = {
  userAgent: 'jest-test-environment',
  language: 'en-US',
  languages: ['en-US', 'en'],
  platform: 'test',
  cookieEnabled: true,
  onLine: true,
};

// 8. Console polyfills for cleaner test output
const originalConsole = global.console;
global.console = {
  ...originalConsole,
  // Keep original methods but mock certain ones for cleaner output
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
};

// 9. Performance polyfills
global.performance = {
  now: jest.fn(() => Date.now()),
  mark: jest.fn(),
  measure: jest.fn(),
  clearMarks: jest.fn(),
  clearMeasures: jest.fn(),
  getEntriesByName: jest.fn(() => []),
  getEntriesByType: jest.fn(() => []),
  getEntries: jest.fn(() => []),
};

// 10. Crypto polyfills for basic functionality
global.crypto = {
  randomUUID: jest.fn(() => 'test-uuid-1234'),
  getRandomValues: jest.fn((array) => {
    for (let i = 0; i < array.length; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }
    return array;
  }),
};

// 11. Environment variables for test consistency
process.env.NODE_ENV = 'test';
process.env.NEXT_PUBLIC_BASE_URL = 'http://localhost:3000'; 