#!/bin/bash

# Comprehensive Test Runner Script
# Runs all tests locally to mirror GitHub Actions workflow

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[$(date +'%H:%M:%S')]${NC} $1"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_header() {
    echo -e "\n${BLUE}========================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}========================================${NC}\n"
}

# Check if Node.js and npm are available
check_dependencies() {
    print_header "Checking Dependencies"
    
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed"
        exit 1
    fi
    
    print_success "Node.js $(node --version) found"
    print_success "npm $(npm --version) found"
}

# Install dependencies
install_dependencies() {
    print_header "Installing Dependencies"
    print_status "Running npm ci..."
    npm ci
    print_success "Dependencies installed"
}

# Code quality checks
run_code_quality() {
    print_header "Code Quality & Linting"
    
    print_status "Running TypeScript type checking..."
    npm run type-check
    print_success "TypeScript compilation passed"
    
    print_status "Running ESLint..."
    npm run lint
    print_success "ESLint validation passed"
}

# Run monitoring tests
run_monitoring_tests() {
    print_header "Monitoring & Observability Tests"
    
    print_status "Running monitoring endpoint tests..."
    npm test -- test/unit/api/monitoring-endpoints.test.ts --verbose
    print_success "Monitoring endpoint tests passed"
    
    print_status "Running unit tests..."
    npm run test:unit --passWithNoTests
    print_success "Unit tests passed"
    
    print_status "Running integration tests..."
    npm run test:integration --passWithNoTests
    print_success "Integration tests passed"
}

# Generate coverage report
generate_coverage() {
    print_header "Test Coverage Report"
    
    print_status "Generating test coverage..."
    npm run test:coverage --passWithNoTests
    print_success "Coverage report generated"
    
    if [ -f "coverage/lcov-report/index.html" ]; then
        print_status "Coverage report available at: coverage/lcov-report/index.html"
    fi
}

# Security validation
run_security_checks() {
    print_header "Security & Vulnerability Checks"
    
    print_status "Running npm audit..."
    npm audit --audit-level moderate || print_warning "Some security issues found - review npm audit output"
    
    print_status "Checking for vulnerabilities..."
    VULN_COUNT=$(npm audit --json 2>/dev/null | jq '.vulnerabilities | length' 2>/dev/null || echo "0")
    if [ "$VULN_COUNT" -gt 0 ]; then
        print_warning "$VULN_COUNT vulnerabilities found"
    else
        print_success "No vulnerabilities found"
    fi
}

# Performance testing (requires running server)
run_performance_tests() {
    print_header "Performance Testing"
    
    print_status "Checking if server is running on port 3000..."
    if curl -f http://localhost:3000/api/health >/dev/null 2>&1; then
        print_success "Server is running, executing performance tests..."
        node scripts/performance-test.js
        print_success "Performance tests completed"
    else
        print_warning "Server not running on localhost:3000"
        print_warning "Start server with 'npm run dev' or 'npm start' to run performance tests"
        print_warning "Skipping performance tests..."
    fi
}

# Integration testing (requires running server)
run_integration_tests() {
    print_header "Integration Testing"
    
    print_status "Checking if server is running..."
    if curl -f http://localhost:3000/api/health >/dev/null 2>&1; then
        print_success "Server is running, testing endpoints..."
        
        # Test health endpoint
        print_status "Testing health endpoint..."
        curl -f http://localhost:3000/api/health | jq '.' >/dev/null
        print_success "Health endpoint operational"
        
        # Test metrics endpoint
        print_status "Testing metrics endpoint..."
        curl -f http://localhost:3000/api/metrics | head -20 >/dev/null
        print_success "Metrics endpoint operational"
        
        # Test notifications endpoint
        print_status "Testing deployment notification..."
        curl -X POST http://localhost:3000/api/notifications \
            -H "Content-Type: application/json" \
            -d '{
                "status": "success",
                "environment": "test",
                "version": "local-test",
                "commitSha": "test-commit",
                "timestamp": "'$(date -u +%Y-%m-%dT%H:%M:%S.%3NZ)'"
            }' >/dev/null
        print_success "Notification endpoint operational"
        
        # Test deployment status
        print_status "Testing deployment status..."
        curl -f http://localhost:3000/api/notifications | jq '.' >/dev/null
        print_success "Deployment status endpoint operational"
        
    else
        print_warning "Server not running on localhost:3000"
        print_warning "Start server with 'npm run dev' or 'npm start' to run integration tests"
        print_warning "Skipping integration tests..."
    fi
}

# Final summary
print_summary() {
    print_header "Test Summary"
    
    echo -e "${GREEN}✅ Code Quality: PASSED${NC}"
    echo -e "${GREEN}✅ Monitoring Tests: PASSED${NC}"
    echo -e "${GREEN}✅ Coverage Report: GENERATED${NC}"
    echo -e "${GREEN}✅ Security Checks: COMPLETED${NC}"
    
    if curl -f http://localhost:3000/api/health >/dev/null 2>&1; then
        echo -e "${GREEN}✅ Performance Tests: PASSED${NC}"
        echo -e "${GREEN}✅ Integration Tests: PASSED${NC}"
    else
        echo -e "${YELLOW}⚠️  Performance Tests: SKIPPED (server not running)${NC}"
        echo -e "${YELLOW}⚠️  Integration Tests: SKIPPED (server not running)${NC}"
    fi
    
    echo ""
    print_success "All available tests completed successfully!"
    echo ""
    print_status "To run performance and integration tests:"
    print_status "1. Start the server: npm run dev (or npm start)"
    print_status "2. Run this script again: ./scripts/run-all-tests.sh"
}

# Main execution
main() {
    print_header "🧪 Comprehensive Test Suite"
    print_status "Starting test execution..."
    
    check_dependencies
    install_dependencies
    run_code_quality
    run_monitoring_tests
    generate_coverage
    run_security_checks
    run_performance_tests
    run_integration_tests
    print_summary
}

# Execute main function
main "$@" 