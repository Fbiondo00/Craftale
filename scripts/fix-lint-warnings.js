#!/usr/bin/env node

/**
 * Comprehensive ESLint Warning Fix Script
 * Fixes common linting issues across the codebase
 */

const fs = require('fs');
const path = require('path');

// Fix unescaped entities
function fixUnescapedEntities(content) {
  return content
    .replace(/([^\\])'([^s])/g, '$1&apos;$2')  // Replace unescaped apostrophes
    .replace(/([^\\])"([^s])/g, '$1&quot;$2')  // Replace unescaped quotes
    .replace(/\\'/g, "'")  // Keep escaped apostrophes as is
    .replace(/\\"/g, '"'); // Keep escaped quotes as is
}

// Remove unused imports
function removeUnusedImports(content, unusedImports) {
  unusedImports.forEach(importName => {
    // Remove from import statements
    content = content.replace(new RegExp(`,\\s*${importName}`, 'g'), '');
    content = content.replace(new RegExp(`${importName},\\s*`, 'g'), '');
    content = content.replace(new RegExp(`{\\s*${importName}\\s*}`, 'g'), '{}');
    content = content.replace(new RegExp(`import\\s+${importName}[^;]+;`, 'g'), '');
  });
  
  // Clean up empty import lines
  content = content.replace(/import\s*{\s*}\s*from[^;]+;/g, '');
  content = content.replace(/,\s*}/g, ' }');
  content = content.replace(/{\s*,/g, '{ ');
  
  return content;
}

// Fix specific files
const fixes = {
  // API routes
  'src/app/api/health/route.ts': (content) => {
    content = content.replace('import { NextRequest, NextResponse } from \'next/server\';', 'import { NextRequest, NextResponse } from \'next/server\';');
    content = content.replace('import { withMonitoring, BusinessMetrics }', 'import { BusinessMetrics }');
    content = content.replace('import { log } from', '// import { log } from');
    content = content.replace('const startTime = Date.now();', '');
    content = content.replace('} catch (error) {', '} catch (_error) {');
    content = content.replace('export async function HEAD(request: NextRequest)', 'export async function HEAD(_request: NextRequest)');
    content = content.replace('} catch (error) {', '} catch (_error) {');
    return content;
  },
  
  'src/app/api/metrics/route.ts': (content) => {
    content = content.replace('import { NextRequest, NextResponse }', 'import { NextResponse }');
    return content;
  },
  
  'src/app/api/notifications/route.ts': (content) => {
    content = content.replace('Record<string, any>', 'Record<string, unknown>');
    content = content.replace('async function logDeploymentEvent', '// async function logDeploymentEvent');
    content = content.replace('async function sendAlertsIfNeeded', '// async function sendAlertsIfNeeded');
    return content;
  },
  
  // Components
  'src/components/Header.tsx': (content) => {
    const unusedImports = [
      'Smartphone', 'Globe', 'MessageCircle', 'Calendar', 'Coffee', 
      'Headphones', 'Shield', 'Phone', 'Mail', 'Star', 'Link',
      'NavigationMenu', 'NavigationMenuContent', 'NavigationMenuItem',
      'NavigationMenuLink', 'NavigationMenuList', 'NavigationMenuTrigger'
    ];
    return removeUnusedImports(content, unusedImports);
  },
  
  'src/components/blog/BlogCard.tsx': (content) => {
    content = content.replace('{ featured, compact, ...props }', '{ ...props }');
    return content;
  },
  
  'src/components/pricing/PersonaMatcher.tsx': (content) => {
    content = content.replace('MapPin,', '');
    content = content.replace(': any', ': unknown');
    content = fixUnescapedEntities(content);
    return content;
  }
};

// Process files
Object.entries(fixes).forEach(([filePath, fixFunction]) => {
  const fullPath = path.join(process.cwd(), filePath);
  
  if (fs.existsSync(fullPath)) {
    console.log(`Fixing ${filePath}...`);
    const content = fs.readFileSync(fullPath, 'utf8');
    const fixedContent = fixFunction(content);
    fs.writeFileSync(fullPath, fixedContent);
    console.log(`✓ Fixed ${filePath}`);
  } else {
    console.log(`✗ File not found: ${filePath}`);
  }
});

console.log('ESLint warning fixes completed!'); 