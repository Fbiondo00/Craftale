#!/usr/bin/env node

/**
 * Final fix for semantic tokens - implements Perplexity's recommendation
 * This script:
 * 1. Updates tailwind.config.js to use proper nested structure
 * 2. Updates all class names to remove redundant prefixes
 * 
 * Changes:
 * - bg-color-bg-inverse-subtle → bg-color-inverse-subtle
 * - text-color-text-primary → text-color-primary
 * - border-color-border-strong → border-color-strong
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Parse command line arguments
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');

console.log('=== Semantic Token Final Fix ===');
console.log(`Mode: ${isDryRun ? 'DRY RUN' : 'LIVE'}\n`);

// Step 1: Update tailwind.config.js
console.log('Step 1: Updating tailwind.config.js...');

const configPath = path.join(process.cwd(), 'tailwind.config.js');
const configContent = fs.readFileSync(configPath, 'utf8');

// Create the new semantic tokens structure - at root level per Perplexity's recommendation
// This generates classes like bg-color-primary, text-color-muted, etc.
const newSemanticTokens = `			// Semantic Design Tokens - Properly at root level of colors
			// These generate utilities like: bg-color-primary, text-color-muted, border-color-strong
			// The 'color-' prefix maintains namespace separation from other colors
			
			// Text semantic tokens
			'color-primary': 'rgb(var(--color-text-primary) / <alpha-value>)',
			'color-secondary': 'rgb(var(--color-text-secondary) / <alpha-value>)',
			'color-tertiary': 'rgb(var(--color-text-tertiary) / <alpha-value>)',
			'color-muted': 'rgb(var(--color-text-muted) / <alpha-value>)',
			'color-disabled': 'rgb(var(--color-text-disabled) / <alpha-value>)',
			'color-placeholder': 'rgb(var(--color-text-placeholder) / <alpha-value>)',
			'color-inverse': 'rgb(var(--color-text-inverse) / <alpha-value>)',
			'color-on-brand': 'rgb(var(--color-text-on-brand) / <alpha-value>)',
			
			// Background semantic tokens
			'color-base': 'rgb(var(--color-bg-base) / <alpha-value>)',
			'color-subtle': 'rgb(var(--color-bg-subtle) / <alpha-value>)',
			'color-bg-muted': 'rgb(var(--color-bg-muted) / <alpha-value>)', // Keep prefix for clarity
			'color-elevated': 'rgb(var(--color-bg-elevated) / <alpha-value>)',
			'color-overlay': 'rgb(var(--color-bg-overlay) / <alpha-value>)',
			'color-hover': 'rgb(var(--color-bg-hover) / <alpha-value>)',
			'color-active': 'rgb(var(--color-bg-active) / <alpha-value>)',
			'color-inverse-bg': 'rgb(var(--color-bg-inverse) / <alpha-value>)', // Keep suffix for clarity
			'color-inverse-subtle': 'rgb(var(--color-bg-inverse-subtle) / <alpha-value>)',
			
			// Border semantic tokens
			'color-default': 'rgb(var(--color-border-default) / <alpha-value>)',
			'color-border-subtle': 'rgb(var(--color-border-subtle) / <alpha-value>)', // Keep prefix for clarity
			'color-border-muted': 'rgb(var(--color-border-muted) / <alpha-value>)', // Keep prefix for clarity
			'color-strong': 'rgb(var(--color-border-strong) / <alpha-value>)',
			'color-border-hover': 'rgb(var(--color-border-hover) / <alpha-value>)', // Keep prefix for clarity
			'color-focus': 'rgb(var(--color-border-focus) / <alpha-value>)',
			'color-error': 'rgb(var(--color-border-error) / <alpha-value>)',
			'color-success': 'rgb(var(--color-border-success) / <alpha-value>)',
			
			// State colors - full names for clarity
			'color-state-success': 'rgb(var(--color-state-success) / <alpha-value>)',
			'color-state-success-strong': 'rgb(var(--color-state-success-strong) / <alpha-value>)',
			'color-state-success-subtle': 'rgb(var(--color-state-success-subtle) / <alpha-value>)',
			'color-state-success-bg': 'rgb(var(--color-state-success-bg) / <alpha-value>)',
			'color-state-success-border': 'rgb(var(--color-state-success-border) / <alpha-value>)',
			'color-state-success-text': 'rgb(var(--color-state-success-text) / <alpha-value>)',
			
			'color-state-error': 'rgb(var(--color-state-error) / <alpha-value>)',
			'color-state-error-strong': 'rgb(var(--color-state-error-strong) / <alpha-value>)',
			'color-state-error-subtle': 'rgb(var(--color-state-error-subtle) / <alpha-value>)',
			'color-state-error-bg': 'rgb(var(--color-state-error-bg) / <alpha-value>)',
			'color-state-error-border': 'rgb(var(--color-state-error-border) / <alpha-value>)',
			'color-state-error-text': 'rgb(var(--color-state-error-text) / <alpha-value>)',
			
			'color-state-warning': 'rgb(var(--color-state-warning) / <alpha-value>)',
			'color-state-warning-strong': 'rgb(var(--color-state-warning-strong) / <alpha-value>)',
			'color-state-warning-subtle': 'rgb(var(--color-state-warning-subtle) / <alpha-value>)',
			'color-state-warning-bg': 'rgb(var(--color-state-warning-bg) / <alpha-value>)',
			'color-state-warning-border': 'rgb(var(--color-state-warning-border) / <alpha-value>)',
			'color-state-warning-text': 'rgb(var(--color-state-warning-text) / <alpha-value>)',
			
			'color-state-info': 'rgb(var(--color-state-info) / <alpha-value>)',
			'color-state-info-strong': 'rgb(var(--color-state-info-strong) / <alpha-value>)',
			'color-state-info-subtle': 'rgb(var(--color-state-info-subtle) / <alpha-value>)',
			'color-state-info-bg': 'rgb(var(--color-state-info-bg) / <alpha-value>)',
			'color-state-info-border': 'rgb(var(--color-state-info-border) / <alpha-value>)',
			'color-state-info-text': 'rgb(var(--color-state-info-text) / <alpha-value>)',
			
			// Interactive elements
			'color-interactive-link': 'rgb(var(--color-interactive-link) / <alpha-value>)',
			'color-interactive-link-hover': 'rgb(var(--color-interactive-link-hover) / <alpha-value>)',
			'color-interactive-link-visited': 'rgb(var(--color-interactive-link-visited) / <alpha-value>)',
			'color-interactive-focus': 'rgb(var(--color-interactive-focus) / <alpha-value>)',
			'color-interactive-focus-ring': 'rgb(var(--color-interactive-focus-ring) / <alpha-value>)',
			
			// Surface elevation levels
			'color-surface-level0': 'rgb(var(--color-surface-level0) / <alpha-value>)',
			'color-surface-level1': 'rgb(var(--color-surface-level1) / <alpha-value>)',
			'color-surface-level2': 'rgb(var(--color-surface-level2) / <alpha-value>)',
			'color-surface-level3': 'rgb(var(--color-surface-level3) / <alpha-value>)',`;

// Find the semantic tokens section
const startMarker = "// Semantic text tokens with color- prefix for scalability";
const endMarker = "// Legacy compatibility - these will be phased out";

const startIndex = configContent.indexOf(startMarker);
const endIndex = configContent.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.error("Could not find semantic tokens section in tailwind.config.js");
  process.exit(1);
}

// Replace the content
const before = configContent.substring(0, startIndex).replace(/\t+$/, '\t\t\t');
const after = configContent.substring(endIndex);
const newConfigContent = before + newSemanticTokens + '\n\t\t\t\n\t\t\t' + after;

if (!isDryRun) {
  fs.writeFileSync(configPath, newConfigContent);
  console.log('✅ Updated tailwind.config.js');
} else {
  console.log('[DRY RUN] Would update tailwind.config.js');
}

// Step 2: Update all class names in the codebase
console.log('\nStep 2: Updating class names in components...');

// Enhanced replacement rules based on Perplexity's final audit
// These handle: standard classes, opacity modifiers, trailing quotes, brackets
// Using improved boundary pattern: (?=\s|['"`]|\]|$)
const classReplacements = [
  // Text classes - handle with/without opacity and quotes
  { from: /\b((?:[a-z-]+:)*)?text-color-text-primary(\/\d{1,3})?(?=\s|['"`]|\]|$)/g, to: '$1text-color-primary$2' },
  { from: /\b((?:[a-z-]+:)*)?text-color-text-secondary(\/\d{1,3})?(?=\s|['"`]|\]|$)/g, to: '$1text-color-secondary$2' },
  { from: /\b((?:[a-z-]+:)*)?text-color-text-tertiary(\/\d{1,3})?(?=\s|['"`]|\]|$)/g, to: '$1text-color-tertiary$2' },
  { from: /\b((?:[a-z-]+:)*)?text-color-text-muted(\/\d{1,3})?(?=\s|['"`]|\]|$)/g, to: '$1text-color-muted$2' },
  { from: /\b((?:[a-z-]+:)*)?text-color-text-disabled(\/\d{1,3})?(?=\s|['"`]|\]|$)/g, to: '$1text-color-disabled$2' },
  { from: /\b((?:[a-z-]+:)*)?text-color-text-placeholder(\/\d{1,3})?(?=\s|['"`]|\]|$)/g, to: '$1text-color-placeholder$2' },
  { from: /\b((?:[a-z-]+:)*)?text-color-text-inverse(\/\d{1,3})?(?=\s|['"`]|\]|$)/g, to: '$1text-color-inverse$2' },
  { from: /\b((?:[a-z-]+:)*)?text-color-text-on-brand(\/\d{1,3})?(?=\s|['"`]|\]|$)/g, to: '$1text-color-on-brand$2' },
  
  // Background classes - handle with/without opacity and quotes
  { from: /\b((?:[a-z-]+:)*)?bg-color-bg-base(\/\d{1,3})?(?=\s|['"`]|\]|$)/g, to: '$1bg-color-base$2' },
  { from: /\b((?:[a-z-]+:)*)?bg-color-bg-subtle(\/\d{1,3})?(?=\s|['"`]|\]|$)/g, to: '$1bg-color-subtle$2' },
  { from: /\b((?:[a-z-]+:)*)?bg-color-bg-elevated(\/\d{1,3})?(?=\s|['"`]|\]|$)/g, to: '$1bg-color-elevated$2' },
  { from: /\b((?:[a-z-]+:)*)?bg-color-bg-overlay(\/\d{1,3})?(?=\s|['"`]|\]|$)/g, to: '$1bg-color-overlay$2' },
  { from: /\b((?:[a-z-]+:)*)?bg-color-bg-hover(\/\d{1,3})?(?=\s|['"`]|\]|$)/g, to: '$1bg-color-hover$2' },
  { from: /\b((?:[a-z-]+:)*)?bg-color-bg-active(\/\d{1,3})?(?=\s|['"`]|\]|$)/g, to: '$1bg-color-active$2' },
  { from: /\b((?:[a-z-]+:)*)?bg-color-bg-inverse-subtle(\/\d{1,3})?(?=\s|['"`]|\]|$)/g, to: '$1bg-color-inverse-subtle$2' },
  
  // Special cases that need different handling
  { from: /\b((?:[a-z-]+:)*)?bg-color-bg-muted(\/\d{1,3})?(?=\s|['"`]|\]|$)/g, to: '$1bg-color-bg-muted$2' }, // Keep bg-muted
  { from: /\b((?:[a-z-]+:)*)?bg-color-bg-inverse(?!-)(\/\d{1,3})?(?=\s|['"`]|\]|$)/g, to: '$1bg-color-inverse-bg$2' }, // Add -bg suffix
  
  // Border classes - handle with/without opacity and quotes
  { from: /\b((?:[a-z-]+:)*)?border-color-border-default(\/\d{1,3})?(?=\s|['"`]|\]|$)/g, to: '$1border-color-default$2' },
  { from: /\b((?:[a-z-]+:)*)?border-color-border-strong(\/\d{1,3})?(?=\s|['"`]|\]|$)/g, to: '$1border-color-strong$2' },
  { from: /\b((?:[a-z-]+:)*)?border-color-border-subtle(\/\d{1,3})?(?=\s|['"`]|\]|$)/g, to: '$1border-color-subtle$2' },
  { from: /\b((?:[a-z-]+:)*)?border-color-border-focus(\/\d{1,3})?(?=\s|['"`]|\]|$)/g, to: '$1border-color-focus$2' },
  { from: /\b((?:[a-z-]+:)*)?border-color-border-error(\/\d{1,3})?(?=\s|['"`]|\]|$)/g, to: '$1border-color-error$2' },
  { from: /\b((?:[a-z-]+:)*)?border-color-border-success(\/\d{1,3})?(?=\s|['"`]|\]|$)/g, to: '$1border-color-success$2' },
  
  // Keep these border tokens with 'border' for clarity (per analysis)
  { from: /\b((?:[a-z-]+:)*)?border-color-border-muted(\/\d{1,3})?(?=\s|['"`]|\]|$)/g, to: '$1border-color-border-muted$2' },
  { from: /\b((?:[a-z-]+:)*)?border-color-border-hover(\/\d{1,3})?(?=\s|['"`]|\]|$)/g, to: '$1border-color-border-hover$2' },
];

// Files to process
const files = glob.sync('src/**/*.{tsx,jsx,ts,js}', {
  ignore: [
    '**/node_modules/**',
    '**/.next/**',
    '**/*.backup.*',
    '**/scripts/**'
  ]
});

console.log(`Found ${files.length} files to process`);
console.log(`Will apply ${classReplacements.length} replacement rules\n`);

let totalReplacements = 0;
const filesModified = [];

// Track detailed replacements for reporting
const replacementDetails = {};

// Process each file
files.forEach((file) => {
  const filePath = path.resolve(file);
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  let fileReplacements = 0;
  const fileChanges = [];
  
  // Apply replacements
  classReplacements.forEach(({ from, to }) => {
    const matches = [...content.matchAll(from)];
    if (matches.length > 0) {
      // Apply the replacement
      content = content.replace(from, to);
      fileReplacements += matches.length;
      
      // Track the changes for reporting
      matches.forEach(match => {
        const fullMatch = match[0];
        const variant = match[1] || '';
        const opacity = match[2] || '';
        
        // Build the replacement text
        let replacedText = to
          .replace('$1', variant)
          .replace('$2', opacity);
        
        // Create a simplified key for tracking (without variants)
        const baseClass = fullMatch.replace(variant, '');
        const replacedBase = replacedText.replace(variant, '');
        
        const changeEntry = `  ${fullMatch} → ${replacedText}`;
        if (!fileChanges.includes(changeEntry)) {
          fileChanges.push(changeEntry);
        }
        
        // Track overall replacements using base class
        if (!replacementDetails[baseClass]) {
          replacementDetails[baseClass] = { 
            to: replacedBase, 
            count: 0 
          };
        }
        replacementDetails[baseClass].count++;
      });
    }
  });
  
  // If changes were made
  if (fileReplacements > 0) {
    if (!isDryRun) {
      fs.writeFileSync(filePath, content);
    }
    
    filesModified.push({ file, replacements: fileReplacements, changes: fileChanges });
    totalReplacements += fileReplacements;
    
    const prefix = isDryRun ? '[DRY] ' : '';
    console.log(`${prefix}✓ ${file} - ${fileReplacements} replacements`);
    
    // Show details for dry run
    if (isDryRun && fileChanges.length <= 3) {
      fileChanges.forEach(change => console.log(change));
    }
  }
});

// Summary
console.log('\n' + '='.repeat(60));
console.log('=== SUMMARY ===');
console.log('='.repeat(60));
console.log(`Mode: ${isDryRun ? 'DRY RUN' : 'LIVE'}`);
console.log(`Files processed: ${files.length}`);
console.log(`Files ${isDryRun ? 'to be modified' : 'modified'}: ${filesModified.length}`);
console.log(`Total replacements ${isDryRun ? 'to be made' : 'made'}: ${totalReplacements}`);

// Show top replacements made
if (Object.keys(replacementDetails).length > 0) {
  console.log('\n📊 Top Replacement Summary:');
  const sortedReplacements = Object.entries(replacementDetails)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 10);
  
  sortedReplacements.forEach(([from, { to, count }]) => {
    console.log(`  ${from} → ${to} (${count} total)`);
  });
  
  if (Object.keys(replacementDetails).length > 10) {
    console.log(`  ... and ${Object.keys(replacementDetails).length - 10} more patterns`);
  }
}

if (isDryRun) {
  console.log('\n⚠️  This was a DRY RUN. No files were modified.');
  console.log('Run without --dry-run to apply changes.');
} else {
  console.log('\n✅ Semantic token fix complete!');
  console.log('\n⚠️  Next steps:');
  console.log('  1. Restart your dev server: npm run dev');
  console.log('  2. Test the application thoroughly');
  console.log('  3. Run: npm run build');
  console.log('  4. Check for any CSS issues in browser console');
  console.log('  5. If everything works, commit the changes');
  console.log('\n💡 Tip: Use git diff to review all changes before committing');
}