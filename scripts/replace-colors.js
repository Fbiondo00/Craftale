#!/usr/bin/env node

/**
 * Script to replace all Tailwind color classes with brand tokens
 * Run with: node scripts/replace-colors.js
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Color replacement mappings
const replacements = [
  // Indigo to brand-secondary
  { from: /\bindigo-600\b/g, to: 'brand-secondary' },
  { from: /\bindigo-700\b/g, to: 'brand-secondary/90' },
  { from: /\bindigo-500\b/g, to: 'brand-secondary/80' },
  { from: /\bindigo-50\b/g, to: 'brand-secondary/5' },
  { from: /\bindigo-100\b/g, to: 'brand-secondary/10' },
  { from: /\bindigo-200\b/g, to: 'brand-secondary/20' },
  { from: /\bindigo-300\b/g, to: 'brand-secondary/30' },
  { from: /\bindigo-400\b/g, to: 'brand-secondary/40' },
  { from: /\bindigo-800\b/g, to: 'brand-secondary/95' },
  
  // Purple to brand-tertiary
  { from: /\bpurple-600\b/g, to: 'brand-tertiary' },
  { from: /\bpurple-700\b/g, to: 'brand-tertiary/90' },
  { from: /\bpurple-500\b/g, to: 'brand-tertiary/80' },
  { from: /\bpurple-50\b/g, to: 'brand-tertiary/5' },
  { from: /\bpurple-100\b/g, to: 'brand-tertiary/10' },
  { from: /\bpurple-200\b/g, to: 'brand-tertiary/20' },
  { from: /\bpurple-300\b/g, to: 'brand-tertiary/30' },
  { from: /\bpurple-400\b/g, to: 'brand-tertiary/40' },
  { from: /\bpurple-800\b/g, to: 'brand-tertiary/95' },
  
  // Pink to brand-accent
  { from: /\bpink-600\b/g, to: 'brand-accent' },
  { from: /\bpink-700\b/g, to: 'brand-accent/90' },
  { from: /\bpink-500\b/g, to: 'brand-accent/80' },
  { from: /\bpink-50\b/g, to: 'brand-accent/5' },
  { from: /\bpink-100\b/g, to: 'brand-accent/10' },
  { from: /\bpink-200\b/g, to: 'brand-accent/20' },
  { from: /\bpink-300\b/g, to: 'brand-accent/30' },
  { from: /\bpink-400\b/g, to: 'brand-accent/40' },
  
  // Gradients
  { from: /\bfrom-indigo-600\b/g, to: 'from-brand-secondary' },
  { from: /\bfrom-indigo-500\b/g, to: 'from-brand-secondary/80' },
  { from: /\bfrom-indigo-50\b/g, to: 'from-brand-secondary/5' },
  { from: /\bto-purple-600\b/g, to: 'to-brand-tertiary' },
  { from: /\bto-purple-500\b/g, to: 'to-brand-tertiary/80' },
  { from: /\bto-purple-50\b/g, to: 'to-brand-tertiary/5' },
  { from: /\bvia-purple-600\b/g, to: 'via-brand-tertiary' },
  { from: /\bvia-purple-700\b/g, to: 'via-brand-tertiary/90' },
  { from: /\bfrom-purple-600\b/g, to: 'from-brand-tertiary' },
  { from: /\bto-pink-600\b/g, to: 'to-brand-accent' },
  { from: /\bto-pink-700\b/g, to: 'to-brand-accent/90' },
  { from: /\bvia-pink-600\b/g, to: 'via-brand-accent' },
];

// Files to process
const files = glob.sync('src/**/*.{tsx,jsx}', {
  ignore: [
    '**/node_modules/**',
    '**/.next/**',
    '**/test-tokens/**',
  ]
});

console.log(`Found ${files.length} files to process\n`);

let totalReplacements = 0;
const filesModified = [];

files.forEach(file => {
  const filePath = path.resolve(file);
  let content = fs.readFileSync(filePath, 'utf8');
  let fileReplacements = 0;
  
  replacements.forEach(({ from, to }) => {
    const matches = content.match(from);
    if (matches) {
      const count = matches.length;
      content = content.replace(from, to);
      fileReplacements += count;
      totalReplacements += count;
    }
  });
  
  if (fileReplacements > 0) {
    fs.writeFileSync(filePath, content);
    filesModified.push({ file, replacements: fileReplacements });
    console.log(`✓ ${file} - ${fileReplacements} replacements`);
  }
});

console.log('\n=== Summary ===');
console.log(`Total files modified: ${filesModified.length}`);
console.log(`Total replacements made: ${totalReplacements}`);
console.log('\nTop 10 files by replacement count:');
filesModified
  .sort((a, b) => b.replacements - a.replacements)
  .slice(0, 10)
  .forEach(({ file, replacements }) => {
    console.log(`  ${replacements} - ${file}`);
  });