#!/bin/bash

# Monitoring and Observability Test Script
# This script runs comprehensive tests for the monitoring system

set -e

echo "🧪 Starting Monitoring & Observability Test Suite"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    case $1 in
        "info") echo -e "${YELLOW}ℹ️  $2${NC}" ;;
        "success") echo -e "${GREEN}✅ $2${NC}" ;;
        "error") echo -e "${RED}❌ $2${NC}" ;;
        *) echo "$2" ;;
    esac
}

# Check if Node.js dependencies are installed
print_status "info" "Checking dependencies..."
if [ ! -d "node_modules" ]; then
    print_status "info" "Installing dependencies..."
    npm install
fi

# Set test environment
export NODE_ENV=test
export NEXT_PUBLIC_APP_URL=http://localhost:3000

print_status "info" "Running type checking..."
npm run type-check || {
    print_status "error" "Type checking failed"
    exit 1
}

print_status "info" "Running linting..."
npm run lint:ci || {
    print_status "error" "Linting failed"
    exit 1
}

print_status "info" "Running unit tests..."
npm run test:unit || {
    print_status "error" "Unit tests failed"
    exit 1
}

print_status "info" "Running integration tests..."
npm run test:integration || {
    print_status "error" "Integration tests failed"
    exit 1
}

print_status "info" "Generating test coverage report..."
npm run test:coverage || {
    print_status "error" "Coverage generation failed"
    exit 1
}

print_status "info" "Running performance tests..."
node scripts/performance-test.js || {
    print_status "error" "Performance tests failed"
    exit 1
}

print_status "success" "All tests passed successfully!"
print_status "info" "Coverage report available in ./coverage/lcov-report/index.html"

echo ""
echo "📊 Test Summary:"
echo "================"
echo "✅ Type checking: PASSED"
echo "✅ Linting: PASSED"
echo "✅ Unit tests: PASSED"
echo "✅ Integration tests: PASSED"
echo "✅ Coverage generation: PASSED"
echo "✅ Performance tests: PASSED"
echo ""
print_status "success" "Monitoring & Observability system is ready for production!" 