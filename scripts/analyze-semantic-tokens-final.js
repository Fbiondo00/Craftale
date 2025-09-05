#!/usr/bin/env node

/**
 * FINAL semantic token analysis - addresses Perplexity's feedback
 * This version:
 * 1. Treats each class name individually, not as strings
 * 2. Only targets semantic tokens, not atomic utilities
 * 3. Generates proper individual class replacements
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('=== FINAL Semantic Token Analysis (Individual Classes) ===\n');

// Files to analyze
const files = glob.sync('src/**/*.{tsx,jsx,ts,js}', {
  ignore: [
    '**/node_modules/**',
    '**/.next/**',
    '**/*.backup.*',
    '**/scripts/**'
  ]
});

console.log(`Analyzing ${files.length} files...\n`);

// Track individual semantic tokens
const tokenUsage = new Map();
const uniqueSemanticTokens = new Set();
const redundantTokens = new Set();

// Define what constitutes a semantic token (has 'color-' in it)
const isSemanticToken = (className) => {
  return className.includes('-color-') && 
         /^(bg|text|border|ring|outline|divide|placeholder|from|to|via|shadow|accent|fill|stroke|caret|decoration|selection)-color-/.test(className);
};

// Check if token has redundant naming
const hasRedundantNaming = (token) => {
  return token.match(/^bg-color-bg-/) ||
         token.match(/^text-color-text-/) ||
         token.match(/^border-color-border-/);
};

// Fix redundant naming
const fixRedundantNaming = (token) => {
  let fixed = token;
  
  // Remove redundant prefixes
  fixed = fixed.replace(/^bg-color-bg-/, 'bg-color-');
  fixed = fixed.replace(/^text-color-text-/, 'text-color-');
  fixed = fixed.replace(/^border-color-border-/, 'border-color-');
  
  // Special cases
  if (token === 'bg-color-bg-muted') {
    // Keep bg-muted to distinguish from text-muted
    return 'bg-color-bg-muted';
  }
  if (token === 'bg-color-bg-inverse') {
    // Add suffix to distinguish from text-inverse
    return 'bg-color-inverse-bg';
  }
  
  return fixed;
};

// Patterns to find class names in various contexts
const patterns = [
  // Standard className attribute
  /className=["']([^"']+)["']/g,
  /className={["']([^"']+)["']}/g,
  
  // Template literals
  /className={`([^`]+)`}/g,
  
  // cn/clsx/classnames functions
  /(?:cn|clsx|classnames)\s*\([^)]*["']([^"']+)["'][^)]*\)/g,
  
  // Conditional classes
  /\?\s*["']([^"']+)["']\s*:\s*["']([^"']+)["']/g,
  
  // tw template literals (twin.macro)
  /tw`([^`]+)`/g,
];

// Process each file
files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  
  patterns.forEach(pattern => {
    const matches = content.matchAll(pattern);
    
    for (const match of matches) {
      // Extract class strings from different capture groups
      const classStrings = [];
      for (let i = 1; i < match.length; i++) {
        if (match[i]) classStrings.push(match[i]);
      }
      
      // Process each class string
      classStrings.forEach(classString => {
        // Split into individual classes
        const classes = classString
          .split(/\s+/)
          .filter(c => c.length > 0);
        
        // Analyze each class
        classes.forEach(className => {
          // Skip if not a semantic token
          if (!isSemanticToken(className)) return;
          
          // Add to unique tokens
          uniqueSemanticTokens.add(className);
          
          // Track usage
          if (!tokenUsage.has(className)) {
            tokenUsage.set(className, {
              count: 0,
              files: new Set(),
              hasRedundantNaming: hasRedundantNaming(className),
              fixedName: hasRedundantNaming(className) ? fixRedundantNaming(className) : className
            });
          }
          
          const data = tokenUsage.get(className);
          data.count++;
          data.files.add(file);
          
          // Track redundant tokens
          if (hasRedundantNaming(className)) {
            redundantTokens.add(className);
          }
        });
      });
    }
  });
});

// Extract semantic names (the part after 'color-')
const semanticNames = new Set();
uniqueSemanticTokens.forEach(token => {
  const match = token.match(/color-([a-z][a-z0-9-]*)/);
  if (match) {
    semanticNames.add(match[1]);
  }
});

// Generate statistics
const stats = {
  filesAnalyzed: files.length,
  uniqueSemanticTokens: uniqueSemanticTokens.size,
  totalUsages: Array.from(tokenUsage.values()).reduce((sum, data) => sum + data.count, 0),
  redundantTokens: redundantTokens.size,
  uniqueSemanticNames: semanticNames.size
};

// Sort tokens by usage
const sortedTokens = Array.from(tokenUsage.entries())
  .sort((a, b) => b[1].count - a[1].count);

// Generate replacement rules (only for redundant tokens)
const replacementRules = [];
redundantTokens.forEach(token => {
  const data = tokenUsage.get(token);
  if (data && data.fixedName !== token) {
    replacementRules.push({
      from: token,
      to: data.fixedName,
      count: data.count,
      files: data.files.size
    });
  }
});

// Sort replacement rules by usage count
replacementRules.sort((a, b) => b.count - a.count);

// Report findings
console.log('📊 Analysis Results:');
console.log('=' .repeat(70));

console.log(`\n📈 Statistics:`);
console.log(`  Files analyzed: ${stats.filesAnalyzed}`);
console.log(`  Unique semantic tokens: ${stats.uniqueSemanticTokens}`);
console.log(`  Total token usages: ${stats.totalUsages}`);
console.log(`  Tokens with redundant naming: ${stats.redundantTokens}`);
console.log(`  Unique semantic names: ${stats.uniqueSemanticNames}`);

console.log('\n🔥 Top 20 Most Used Semantic Tokens:');
console.log('-'.repeat(70));
sortedTokens.slice(0, 20).forEach(([token, data]) => {
  const marker = data.hasRedundantNaming ? '⚠️ ' : '✅ ';
  console.log(`  ${marker}${token.padEnd(40)} ${String(data.count).padStart(4)}x in ${String(data.files.size).padStart(3)} files`);
});

console.log('\n⚠️  Tokens Needing Fixes (Redundant Naming):');
console.log('-'.repeat(70));
if (replacementRules.length > 0) {
  console.log(`Found ${replacementRules.length} tokens that need fixing:\n`);
  replacementRules.slice(0, 20).forEach(rule => {
    console.log(`  ${rule.from.padEnd(35)} → ${rule.to.padEnd(30)} (${rule.count}x)`);
  });
  if (replacementRules.length > 20) {
    console.log(`  ... and ${replacementRules.length - 20} more`);
  }
} else {
  console.log('  No redundant naming found! ✅');
}

console.log('\n🎨 All Unique Semantic Names (after color-):');
console.log('-'.repeat(70));
const sortedNames = Array.from(semanticNames).sort();
const columns = 3;
const itemsPerColumn = Math.ceil(sortedNames.length / columns);
for (let i = 0; i < itemsPerColumn; i++) {
  let row = '';
  for (let j = 0; j < columns; j++) {
    const index = i + j * itemsPerColumn;
    if (index < sortedNames.length) {
      row += sortedNames[index].padEnd(25);
    }
  }
  console.log(`  ${row}`);
}

console.log('\n🔧 JavaScript Replacement Rules for Fix Script:');
console.log('-'.repeat(70));
console.log('const classReplacements = [');
replacementRules.forEach(rule => {
  const escapedFrom = rule.from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  console.log(`  { from: /\\b${escapedFrom}\\b/g, to: '${rule.to}' },`);
});
console.log('];');

// Export data
const exportData = {
  stats,
  uniqueTokens: Array.from(uniqueSemanticTokens).sort(),
  semanticNames: sortedNames,
  replacementRules,
  tokenUsage: sortedTokens.map(([token, data]) => ({
    token,
    count: data.count,
    files: data.files.size,
    needsFix: data.hasRedundantNaming,
    fixedName: data.fixedName
  }))
};

fs.writeFileSync('semantic-tokens-final-analysis.json', JSON.stringify(exportData, null, 2));
console.log('\n✅ Analysis complete! Data saved to semantic-tokens-final-analysis.json');

// Also generate the tailwind.config.js entries needed
console.log('\n📝 Tailwind Config Entries Needed:');
console.log('-'.repeat(70));
const configEntries = new Set();

// Collect all fixed token names
uniqueSemanticTokens.forEach(token => {
  const data = tokenUsage.get(token);
  const fixedToken = data ? data.fixedName : token;
  
  // Extract the color key needed for tailwind config
  // e.g., bg-color-primary needs 'color-primary' in colors object
  const match = fixedToken.match(/^(?:bg|text|border|ring|outline|divide|placeholder|from|to|via|shadow|accent|fill|stroke|caret|decoration|selection)-(.+)$/);
  if (match) {
    configEntries.add(match[1]);
  }
});

const sortedConfigEntries = Array.from(configEntries).sort();
console.log('colors: {');
sortedConfigEntries.forEach(entry => {
  // Determine which CSS variable to use based on the entry name
  let cssVar = '--color-';
  if (entry.startsWith('color-')) {
    // Already has color- prefix
    const semanticPart = entry.substring(6);
    
    // Determine the appropriate CSS variable
    if (semanticPart.startsWith('state-') || 
        semanticPart.startsWith('interactive-') || 
        semanticPart.startsWith('surface-')) {
      cssVar += semanticPart.replace(/-/g, '-');
    } else if (['primary', 'secondary', 'tertiary', 'muted', 'disabled', 'placeholder', 'inverse', 'on-brand'].includes(semanticPart)) {
      cssVar += 'text-' + semanticPart;
    } else if (['base', 'subtle', 'elevated', 'overlay', 'hover', 'active', 'inverse-bg', 'inverse-subtle', 'bg-muted'].includes(semanticPart)) {
      cssVar += 'bg-' + semanticPart.replace(/-bg$/, '');
    } else if (['default', 'strong', 'focus', 'error', 'success', 'border-subtle', 'border-muted', 'border-hover'].includes(semanticPart)) {
      cssVar += 'border-' + semanticPart.replace(/^border-/, '');
    } else {
      cssVar += semanticPart;
    }
  }
  
  console.log(`  '${entry}': 'rgb(var(${cssVar}) / <alpha-value>)',`);
});
console.log('}');

console.log('\n💡 Next Steps:');
console.log('1. Review the replacement rules above');
console.log('2. Update your fix script with these individual class replacements');
console.log('3. Update tailwind.config.js with the color entries shown');
console.log('4. Run the fix script to update all files');
console.log('5. Restart your dev server to pick up the changes');