#!/usr/bin/env node

/**
 * Performance Test Script for Monitoring & Observability Endpoints
 * Tests response times, throughput, and resource usage
 */

const { performance } = require('perf_hooks');
const https = require('https');
const http = require('http');

// Configuration
const config = {
  baseUrl: process.env.TEST_BASE_URL || 'http://localhost:3000',
  concurrency: 10,
  requests: 100,
  timeout: 5000,
  endpoints: [
    '/api/health',
    '/api/metrics',
    '/api/notifications'
  ],
  performanceTargets: {
    '/api/health': { maxResponseTime: 100, minThroughput: 100 },
    '/api/metrics': { maxResponseTime: 50, minThroughput: 200 },
    '/api/notifications': { maxResponseTime: 20, minThroughput: 300 }
  }
};

class PerformanceTester {
  constructor() {
    this.results = {};
  }

  async makeRequest(url, method = 'GET', body = null) {
    return new Promise((resolve, reject) => {
      const startTime = performance.now();
      const urlObj = new URL(url);
      const module = urlObj.protocol === 'https:' ? https : http;
      
      const options = {
        hostname: urlObj.hostname,
        port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
        path: urlObj.pathname + urlObj.search,
        method,
        timeout: config.timeout,
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'PerformanceTest/1.0'
        }
      };

      const req = module.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          const endTime = performance.now();
          resolve({
            statusCode: res.statusCode,
            responseTime: endTime - startTime,
            size: Buffer.byteLength(data, 'utf8'),
            headers: res.headers
          });
        });
      });

      req.on('error', reject);
      req.on('timeout', () => reject(new Error('Request timeout')));

      if (body) {
        req.write(JSON.stringify(body));
      }

      req.end();
    });
  }

  async testEndpoint(endpoint, method = 'GET', body = null) {
    console.log(`\n🎯 Testing ${method} ${endpoint}`);
    console.log('='.repeat(50));

    const url = `${config.baseUrl}${endpoint}`;
    const results = [];
    const errors = [];

    // Warmup requests
    console.log('🔥 Warming up...');
    for (let i = 0; i < 5; i++) {
      try {
        await this.makeRequest(url, method, body);
      } catch (error) {
        console.warn(`Warmup request ${i + 1} failed:`, error.message);
      }
    }

    // Performance test
    console.log(`🚀 Running ${config.requests} requests with ${config.concurrency} concurrent connections...`);
    
    const startTime = performance.now();
    const promises = [];

    for (let i = 0; i < config.requests; i++) {
      if (promises.length >= config.concurrency) {
        const result = await Promise.race(promises);
        promises.splice(promises.indexOf(result), 1);
        
        try {
          const res = await result;
          results.push(res);
        } catch (error) {
          errors.push(error);
        }
      }

      promises.push(this.makeRequest(url, method, body));
    }

    // Wait for remaining requests
    const remainingResults = await Promise.allSettled(promises);
    remainingResults.forEach(result => {
      if (result.status === 'fulfilled') {
        results.push(result.value);
      } else {
        errors.push(result.reason);
      }
    });

    const totalTime = performance.now() - startTime;

    // Calculate statistics
    const responseTimes = results.map(r => r.responseTime);
    const successfulRequests = results.filter(r => r.statusCode >= 200 && r.statusCode < 300);
    
    const stats = {
      endpoint,
      method,
      totalRequests: config.requests,
      successfulRequests: successfulRequests.length,
      failedRequests: errors.length,
      successRate: (successfulRequests.length / config.requests) * 100,
      totalTime: totalTime,
      throughput: (config.requests / totalTime) * 1000, // requests per second
      averageResponseTime: responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length,
      minResponseTime: Math.min(...responseTimes),
      maxResponseTime: Math.max(...responseTimes),
      p50: this.percentile(responseTimes, 50),
      p95: this.percentile(responseTimes, 95),
      p99: this.percentile(responseTimes, 99),
      averageSize: results.reduce((sum, r) => sum + r.size, 0) / results.length
    };

    // Display results
    this.displayResults(stats);
    
    // Check against targets
    this.checkPerformanceTargets(stats);

    return stats;
  }

  percentile(arr, p) {
    const sorted = arr.slice().sort((a, b) => a - b);
    const index = (p / 100) * (sorted.length - 1);
    const lower = Math.floor(index);
    const upper = Math.ceil(index);
    const weight = index % 1;
    
    return lower === upper 
      ? sorted[lower] 
      : sorted[lower] * (1 - weight) + sorted[upper] * weight;
  }

  displayResults(stats) {
    console.log('\n📊 Performance Results:');
    console.log(`   Total Requests: ${stats.totalRequests}`);
    console.log(`   Successful: ${stats.successfulRequests} (${stats.successRate.toFixed(2)}%)`);
    console.log(`   Failed: ${stats.failedRequests}`);
    console.log(`   Total Time: ${stats.totalTime.toFixed(2)}ms`);
    console.log(`   Throughput: ${stats.throughput.toFixed(2)} req/sec`);
    console.log(`   Response Times:`);
    console.log(`     Average: ${stats.averageResponseTime.toFixed(2)}ms`);
    console.log(`     Min: ${stats.minResponseTime.toFixed(2)}ms`);
    console.log(`     Max: ${stats.maxResponseTime.toFixed(2)}ms`);
    console.log(`     P50: ${stats.p50.toFixed(2)}ms`);
    console.log(`     P95: ${stats.p95.toFixed(2)}ms`);
    console.log(`     P99: ${stats.p99.toFixed(2)}ms`);
    console.log(`   Average Response Size: ${stats.averageSize} bytes`);
  }

  checkPerformanceTargets(stats) {
    const targets = config.performanceTargets[stats.endpoint];
    if (!targets) return;

    console.log('\n🎯 Performance Target Check:');
    
    // Check response time
    const responseTimePassed = stats.p95 <= targets.maxResponseTime;
    console.log(`   Response Time (P95): ${stats.p95.toFixed(2)}ms <= ${targets.maxResponseTime}ms ${responseTimePassed ? '✅' : '❌'}`);
    
    // Check throughput
    const throughputPassed = stats.throughput >= targets.minThroughput;
    console.log(`   Throughput: ${stats.throughput.toFixed(2)} >= ${targets.minThroughput} req/sec ${throughputPassed ? '✅' : '❌'}`);
    
    // Check success rate
    const successRatePassed = stats.successRate >= 99;
    console.log(`   Success Rate: ${stats.successRate.toFixed(2)}% >= 99% ${successRatePassed ? '✅' : '❌'}`);

    if (!responseTimePassed || !throughputPassed || !successRatePassed) {
      throw new Error(`Performance targets not met for ${stats.endpoint}`);
    }
  }

  async runAllTests() {
    console.log('🚀 Starting Performance Test Suite');
    console.log('==================================');
    console.log(`Base URL: ${config.baseUrl}`);
    console.log(`Requests per endpoint: ${config.requests}`);
    console.log(`Concurrency: ${config.concurrency}`);
    
    const allResults = [];

    try {
      // Test GET endpoints
      for (const endpoint of config.endpoints) {
        if (endpoint === '/api/notifications') continue; // Skip POST-only endpoint
        const result = await this.testEndpoint(endpoint);
        allResults.push(result);
      }

      // Test POST /api/notifications
      const notificationPayload = {
        status: 'success',
        environment: 'test',
        version: 'performance-test',
        commitSha: 'test-commit',
        timestamp: new Date().toISOString()
      };
      
      const notificationResult = await this.testEndpoint('/api/notifications', 'POST', notificationPayload);
      allResults.push(notificationResult);

      // Summary
      console.log('\n🎉 Performance Test Summary:');
      console.log('============================');
      allResults.forEach(result => {
        console.log(`${result.method} ${result.endpoint}: ${result.successRate.toFixed(1)}% success, ${result.p95.toFixed(2)}ms P95, ${result.throughput.toFixed(1)} req/sec`);
      });

      console.log('\n✅ All performance tests passed!');
      return true;

    } catch (error) {
      console.error('\n❌ Performance tests failed:', error.message);
      process.exit(1);
    }
  }
}

// Run tests if this script is executed directly
if (require.main === module) {
  const tester = new PerformanceTester();
  
  // Handle process signals
  process.on('SIGINT', () => {
    console.log('\n⚠️  Performance tests interrupted');
    process.exit(1);
  });

  tester.runAllTests().then(() => {
    console.log('\n🎯 Performance testing completed successfully!');
    process.exit(0);
  }).catch(error => {
    console.error('\n💥 Performance testing failed:', error);
    process.exit(1);
  });
}

module.exports = PerformanceTester; 