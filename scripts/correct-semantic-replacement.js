#!/usr/bin/env node

/**
 * CORRECT Script to replace hardcoded colors with semantic tokens
 * This version properly uses the color- prefix for all semantic tokens
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Parse command line arguments
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const verbose = args.includes('--verbose');

console.log('=== CORRECT Semantic Color Token Replacement Script ===');
console.log(`Mode: ${isDryRun ? 'DRY RUN (no files will be modified)' : 'LIVE'}`);
console.log(`Verbose: ${verbose ? 'YES' : 'NO'}\n`);

// CORRECT mappings with color- prefix
const replacements = [
  // Text colors - semantic replacements with color- prefix
  { from: /\btext-gray-900\b/g, to: 'text-color-text-primary' },
  { from: /\btext-gray-800\b/g, to: 'text-color-text-primary' },
  { from: /\btext-gray-700\b/g, to: 'text-color-text-secondary' },
  { from: /\btext-gray-600\b/g, to: 'text-color-text-tertiary' },
  { from: /\btext-gray-500\b/g, to: 'text-color-text-muted' },
  { from: /\btext-gray-400\b/g, to: 'text-color-text-disabled' },
  { from: /\btext-gray-300\b/g, to: 'text-color-text-disabled' },
  { from: /\btext-slate-700\b/g, to: 'text-color-text-secondary' },
  { from: /\btext-slate-800\b/g, to: 'text-color-text-primary' },
  { from: /\btext-slate-300\b/g, to: 'text-color-text-disabled' },
  { from: /\btext-slate-400\b/g, to: 'text-color-text-disabled' },
  
  // Background colors - semantic replacements with color- prefix
  { from: /\bbg-gray-50\b/g, to: 'bg-color-bg-subtle' },
  { from: /\bbg-gray-100\b/g, to: 'bg-color-bg-muted' },
  { from: /\bbg-gray-200\b/g, to: 'bg-color-bg-muted' },
  { from: /\bbg-gray-700\b/g, to: 'bg-color-bg-inverse-subtle' },
  { from: /\bbg-gray-800\b/g, to: 'bg-color-bg-inverse-subtle' },
  { from: /\bbg-gray-900\b/g, to: 'bg-color-bg-inverse' },
  { from: /\bbg-slate-50\b/g, to: 'bg-color-bg-subtle' },
  { from: /\bbg-slate-100\b/g, to: 'bg-color-bg-muted' },
  { from: /\bbg-slate-700\b/g, to: 'bg-color-bg-inverse-subtle' },
  { from: /\bbg-slate-800\b/g, to: 'bg-color-bg-inverse-subtle' },
  { from: /\bbg-slate-900\b/g, to: 'bg-color-bg-inverse' },
  
  // Border colors - semantic replacements with color- prefix
  { from: /\bborder-gray-100\b/g, to: 'border-color-border-subtle' },
  { from: /\bborder-gray-200\b/g, to: 'border-color-border-default' },
  { from: /\bborder-gray-300\b/g, to: 'border-color-border-strong' },
  { from: /\bborder-gray-400\b/g, to: 'border-color-border-hover' },
  { from: /\bborder-gray-500\b/g, to: 'border-color-border-hover' },
  { from: /\bborder-gray-600\b/g, to: 'border-color-border-strong' },
  { from: /\bborder-slate-200\b/g, to: 'border-color-border-default' },
  { from: /\bborder-slate-500\b/g, to: 'border-color-border-hover' },
  { from: /\bborder-slate-600\b/g, to: 'border-color-border-strong' },
  { from: /\bborder-slate-700\b/g, to: 'border-color-border-strong' },
  
  // Success state colors with color- prefix
  { from: /\bbg-green-50\b/g, to: 'bg-color-state-success-bg' },
  { from: /\bbg-green-100\b/g, to: 'bg-color-state-success-subtle' },
  { from: /\bbg-green-400\b/g, to: 'bg-color-state-success' },
  { from: /\bbg-green-500\b/g, to: 'bg-color-state-success' },
  { from: /\bbg-green-600\b/g, to: 'bg-color-state-success-strong' },
  { from: /\btext-green-500\b/g, to: 'text-color-state-success' },
  { from: /\btext-green-600\b/g, to: 'text-color-state-success-strong' },
  { from: /\btext-green-700\b/g, to: 'text-color-state-success-text' },
  { from: /\btext-green-800\b/g, to: 'text-color-state-success-text' },
  { from: /\bborder-green-200\b/g, to: 'border-color-state-success-border' },
  { from: /\bborder-green-300\b/g, to: 'border-color-state-success-border' },
  { from: /\bborder-green-500\b/g, to: 'border-color-state-success' },
  
  // Error state colors with color- prefix
  { from: /\bbg-red-50\b/g, to: 'bg-color-state-error-bg' },
  { from: /\bbg-red-100\b/g, to: 'bg-color-state-error-subtle' },
  { from: /\bbg-red-500\b/g, to: 'bg-color-state-error' },
  { from: /\bbg-red-600\b/g, to: 'bg-color-state-error-strong' },
  { from: /\btext-red-500\b/g, to: 'text-color-state-error' },
  { from: /\btext-red-600\b/g, to: 'text-color-state-error-strong' },
  { from: /\btext-red-700\b/g, to: 'text-color-state-error-text' },
  { from: /\btext-red-800\b/g, to: 'text-color-state-error-text' },
  { from: /\bborder-red-200\b/g, to: 'border-color-state-error-border' },
  { from: /\bborder-red-300\b/g, to: 'border-color-state-error-border' },
  { from: /\bborder-red-500\b/g, to: 'border-color-state-error' },
  
  // Warning state colors with color- prefix
  { from: /\bbg-yellow-50\b/g, to: 'bg-color-state-warning-bg' },
  { from: /\bbg-yellow-100\b/g, to: 'bg-color-state-warning-subtle' },
  { from: /\bbg-yellow-400\b/g, to: 'bg-color-state-warning' },
  { from: /\bbg-yellow-500\b/g, to: 'bg-color-state-warning' },
  { from: /\bbg-yellow-600\b/g, to: 'bg-color-state-warning-strong' },
  { from: /\btext-yellow-600\b/g, to: 'text-color-state-warning-strong' },
  { from: /\btext-yellow-700\b/g, to: 'text-color-state-warning-text' },
  { from: /\btext-yellow-800\b/g, to: 'text-color-state-warning-text' },
  { from: /\bborder-yellow-300\b/g, to: 'border-color-state-warning-border' },
  { from: /\bborder-yellow-500\b/g, to: 'border-color-state-warning' },
  
  // Info state colors with color- prefix
  { from: /\bbg-blue-50\b/g, to: 'bg-color-state-info-bg' },
  { from: /\bbg-blue-100\b/g, to: 'bg-color-state-info-subtle' },
  { from: /\bbg-blue-500\b/g, to: 'bg-color-state-info' },
  { from: /\bbg-blue-600\b/g, to: 'bg-color-state-info-strong' },
  { from: /\btext-blue-500\b/g, to: 'text-color-state-info' },
  { from: /\btext-blue-600\b/g, to: 'text-color-state-info-strong' },
  { from: /\btext-blue-700\b/g, to: 'text-color-state-info-text' },
  { from: /\btext-blue-800\b/g, to: 'text-color-state-info-text' },
  { from: /\bborder-blue-200\b/g, to: 'border-color-state-info-border' },
  { from: /\bborder-blue-300\b/g, to: 'border-color-state-info-border' },
  { from: /\bborder-blue-400\b/g, to: 'border-color-state-info-border' },
  { from: /\bborder-blue-500\b/g, to: 'border-color-state-info' },
];

// Files to process
const files = glob.sync('src/**/*.{tsx,jsx,ts,js}', {
  ignore: [
    '**/node_modules/**',
    '**/.next/**',
    '**/test-tokens/**',
    '**/*.backup.*',
    '**/scripts/**'
  ]
});

console.log(`Found ${files.length} files to process`);
console.log(`Will apply ${replacements.length} replacement rules\n`);

let totalReplacements = 0;
const filesModified = [];
const replacementLog = [];

// Process each file
files.forEach((file, index) => {
  const filePath = path.resolve(file);
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  let fileReplacements = 0;
  const fileReplacementDetails = [];
  
  // Apply replacements
  replacements.forEach(({ from, to }) => {
    const matches = content.match(from);
    if (matches) {
      content = content.replace(from, to);
      fileReplacements += matches.length;
      if (verbose || fileReplacements <= 3) {
        fileReplacementDetails.push(`  ${matches[0]} → ${to} (${matches.length}x)`);
      }
    }
  });
  
  // If changes were made
  if (fileReplacements > 0) {
    if (!isDryRun) {
      fs.writeFileSync(filePath, content);
    }
    
    filesModified.push({ file, replacements: fileReplacements });
    replacementLog.push({ file, details: fileReplacementDetails });
    
    const prefix = isDryRun ? '[DRY] ' : '';
    console.log(`${prefix}✓ ${file} - ${fileReplacements} replacements`);
    
    if (verbose && fileReplacementDetails.length > 0) {
      console.log(fileReplacementDetails.slice(0, 3).join('\n'));
      if (fileReplacementDetails.length > 3) {
        console.log(`  ... and ${fileReplacementDetails.length - 3} more`);
      }
    }
    
    totalReplacements += fileReplacements;
  }
  
  // Progress indicator
  if ((index + 1) % 20 === 0) {
    console.log(`  Progress: ${index + 1}/${files.length} files processed...`);
  }
});

// Summary
console.log('\n' + '='.repeat(50));
console.log('=== SUMMARY ===');
console.log('='.repeat(50));
console.log(`Mode: ${isDryRun ? 'DRY RUN' : 'LIVE'}`);
console.log(`Files processed: ${files.length}`);
console.log(`Files ${isDryRun ? 'to be modified' : 'modified'}: ${filesModified.length}`);
console.log(`Total replacements ${isDryRun ? 'to be made' : 'made'}: ${totalReplacements}`);

console.log('\n📊 Top 10 files by replacement count:');
filesModified
  .sort((a, b) => b.replacements - a.replacements)
  .slice(0, 10)
  .forEach(({ file, replacements }, i) => {
    console.log(`  ${(i + 1).toString().padStart(2)}. ${replacements.toString().padStart(3)} - ${file}`);
  });

if (isDryRun) {
  console.log('\n' + '⚠️ '.repeat(10));
  console.log('This was a DRY RUN. No files were modified.');
  console.log('Run without --dry-run to apply changes.');
  console.log('⚠️ '.repeat(10));
} else {
  console.log('\n✅ Replacement complete!');
  console.log('\n⚠️  Next steps:');
  console.log('  1. Test the application');
  console.log('  2. Run: npm run build');
  console.log('  3. Commit the changes');
}

console.log('\n📝 Note: All semantic tokens use the color- prefix');
console.log('Example: text-gray-900 → text-color-text-primary');