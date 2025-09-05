#!/usr/bin/env node

/**
 * SAFE Script to replace all Tailwind color classes with brand tokens
 * Run with: node scripts/replace-colors-safe.js
 * 
 * Features:
 * - Creates backups before modifying
 * - Handles Tailwind variants (hover:, focus:, etc.)
 * - Dry run mode for testing
 * - Detailed logging
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Parse command line arguments
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const createBackup = !args.includes('--no-backup');

console.log('=== Color Token Replacement Script ===');
console.log(`Mode: ${isDryRun ? 'DRY RUN (no files will be modified)' : 'LIVE'}`);
console.log(`Backup: ${createBackup ? 'YES' : 'NO'}\n`);

// Tailwind variants that might prefix our colors
const variants = [
  'hover:', 'focus:', 'active:', 'disabled:', 'group-hover:', 'group-focus:',
  'focus-within:', 'focus-visible:', 'motion-safe:', 'motion-reduce:',
  'dark:', 'sm:', 'md:', 'lg:', 'xl:', '2xl:'
];

// Create regex that handles variants
function createColorRegex(colorClass) {
  // This will match the color with any variant prefix or without
  const variantPattern = variants.map(v => v.replace(':', '\\:')).join('|');
  return new RegExp(`\\b((?:${variantPattern})?${colorClass})\\b`, 'g');
}

// Color replacement mappings with proper Tailwind opacity syntax
const replacements = [
  // Indigo to brand-secondary (#4f46e5)
  { from: createColorRegex('text-indigo-600'), to: '$1', replace: 'indigo-600', with: 'brand-secondary' },
  { from: createColorRegex('bg-indigo-600'), to: '$1', replace: 'indigo-600', with: 'brand-secondary' },
  { from: createColorRegex('border-indigo-600'), to: '$1', replace: 'indigo-600', with: 'brand-secondary' },
  { from: createColorRegex('ring-indigo-600'), to: '$1', replace: 'indigo-600', with: 'brand-secondary' },
  { from: createColorRegex('from-indigo-600'), to: '$1', replace: 'indigo-600', with: 'brand-secondary' },
  { from: createColorRegex('to-indigo-600'), to: '$1', replace: 'indigo-600', with: 'brand-secondary' },
  { from: createColorRegex('via-indigo-600'), to: '$1', replace: 'indigo-600', with: 'brand-secondary' },
  
  // Lighter shades of indigo
  { from: createColorRegex('text-indigo-500'), to: '$1', replace: 'indigo-500', with: 'brand-secondary/90' },
  { from: createColorRegex('bg-indigo-500'), to: '$1', replace: 'indigo-500', with: 'brand-secondary/90' },
  { from: createColorRegex('border-indigo-500'), to: '$1', replace: 'indigo-500', with: 'brand-secondary/90' },
  { from: createColorRegex('ring-indigo-500'), to: '$1', replace: 'indigo-500', with: 'brand-secondary/90' },
  
  { from: createColorRegex('text-indigo-700'), to: '$1', replace: 'indigo-700', with: 'brand-secondary' },
  { from: createColorRegex('bg-indigo-700'), to: '$1', replace: 'indigo-700', with: 'brand-secondary' },
  { from: createColorRegex('hover\\:bg-indigo-700'), to: '$1', replace: 'indigo-700', with: 'brand-secondary' },
  
  { from: createColorRegex('bg-indigo-50'), to: '$1', replace: 'indigo-50', with: 'brand-secondary/10' },
  { from: createColorRegex('text-indigo-50'), to: '$1', replace: 'indigo-50', with: 'brand-secondary/10' },
  { from: createColorRegex('bg-indigo-100'), to: '$1', replace: 'indigo-100', with: 'brand-secondary/20' },
  
  // Purple to brand-tertiary (#9333ea)
  { from: createColorRegex('text-purple-600'), to: '$1', replace: 'purple-600', with: 'brand-tertiary' },
  { from: createColorRegex('bg-purple-600'), to: '$1', replace: 'purple-600', with: 'brand-tertiary' },
  { from: createColorRegex('border-purple-600'), to: '$1', replace: 'purple-600', with: 'brand-tertiary' },
  { from: createColorRegex('from-purple-600'), to: '$1', replace: 'purple-600', with: 'brand-tertiary' },
  { from: createColorRegex('to-purple-600'), to: '$1', replace: 'purple-600', with: 'brand-tertiary' },
  { from: createColorRegex('via-purple-600'), to: '$1', replace: 'purple-600', with: 'brand-tertiary' },
  
  { from: createColorRegex('text-purple-500'), to: '$1', replace: 'purple-500', with: 'brand-tertiary/90' },
  { from: createColorRegex('bg-purple-500'), to: '$1', replace: 'purple-500', with: 'brand-tertiary/90' },
  { from: createColorRegex('text-purple-700'), to: '$1', replace: 'purple-700', with: 'brand-tertiary' },
  { from: createColorRegex('bg-purple-700'), to: '$1', replace: 'purple-700', with: 'brand-tertiary' },
  
  // Pink to brand-accent (#ec4899)
  { from: createColorRegex('text-pink-600'), to: '$1', replace: 'pink-600', with: 'brand-accent' },
  { from: createColorRegex('bg-pink-600'), to: '$1', replace: 'pink-600', with: 'brand-accent' },
  { from: createColorRegex('from-pink-600'), to: '$1', replace: 'pink-600', with: 'brand-accent' },
  { from: createColorRegex('to-pink-600'), to: '$1', replace: 'pink-600', with: 'brand-accent' },
  { from: createColorRegex('via-pink-600'), to: '$1', replace: 'pink-600', with: 'brand-accent' },
  
  { from: createColorRegex('text-pink-500'), to: '$1', replace: 'pink-500', with: 'brand-accent/90' },
  { from: createColorRegex('bg-pink-500'), to: '$1', replace: 'pink-500', with: 'brand-accent/90' },
];

// Create simpler replacements for common patterns
const simpleReplacements = [
  // Direct string replacements for gradients that should use our predefined classes
  { 
    from: /bg-gradient-to-r from-indigo-600 to-purple-600/g, 
    to: 'bg-brand-gradient'
  },
  {
    from: /bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600/g,
    to: 'bg-gradient-to-r from-brand-secondary via-brand-tertiary to-brand-accent'
  },
  {
    from: /bg-gradient-to-br from-indigo-600 to-purple-600/g,
    to: 'bg-brand-gradient'
  }
];

// Files to process
const files = glob.sync('src/**/*.{tsx,jsx}', {
  ignore: [
    '**/node_modules/**',
    '**/.next/**',
    '**/test-tokens/**',
    '**/*.backup.tsx',
    '**/*.backup.jsx'
  ]
});

console.log(`Found ${files.length} files to process\n`);

// Create backup directory
const backupDir = path.join(process.cwd(), '.color-replacement-backup');
if (createBackup && !isDryRun) {
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
  console.log(`Backup directory: ${backupDir}\n`);
}

let totalReplacements = 0;
const filesModified = [];
const replacementLog = [];

files.forEach(file => {
  const filePath = path.resolve(file);
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  let fileReplacements = 0;
  const fileReplacementDetails = [];
  
  // Apply complex replacements with variant handling
  replacements.forEach(({ from, to, replace, with: withStr }) => {
    const matches = content.match(from);
    if (matches) {
      matches.forEach(match => {
        const newMatch = match.replace(replace, withStr);
        content = content.replace(match, newMatch);
        fileReplacementDetails.push(`  ${match} → ${newMatch}`);
        fileReplacements++;
      });
    }
  });
  
  // Apply simple replacements
  simpleReplacements.forEach(({ from, to }) => {
    const matches = content.match(from);
    if (matches) {
      content = content.replace(from, to);
      fileReplacements += matches.length;
      matches.forEach(match => {
        fileReplacementDetails.push(`  ${match} → ${to}`);
      });
    }
  });
  
  if (fileReplacements > 0) {
    if (!isDryRun) {
      // Create backup
      if (createBackup) {
        const backupPath = path.join(backupDir, path.relative(process.cwd(), filePath));
        const backupDirPath = path.dirname(backupPath);
        if (!fs.existsSync(backupDirPath)) {
          fs.mkdirSync(backupDirPath, { recursive: true });
        }
        fs.writeFileSync(backupPath, originalContent);
      }
      
      // Write modified content
      fs.writeFileSync(filePath, content);
    }
    
    filesModified.push({ file, replacements: fileReplacements });
    replacementLog.push({ file, details: fileReplacementDetails });
    console.log(`${isDryRun ? '[DRY RUN] ' : ''}✓ ${file} - ${fileReplacements} replacements`);
    
    totalReplacements += fileReplacements;
  }
});

// Write detailed log
const logPath = path.join(process.cwd(), `color-replacement-${isDryRun ? 'dry-run-' : ''}log.txt`);
const logContent = replacementLog.map(({ file, details }) => 
  `\n${file}:\n${details.join('\n')}`
).join('\n');

fs.writeFileSync(logPath, `Color Replacement Log - ${new Date().toISOString()}\n${isDryRun ? 'DRY RUN MODE\n' : ''}${logContent}`);

console.log('\n=== Summary ===');
console.log(`Total files ${isDryRun ? 'to be modified' : 'modified'}: ${filesModified.length}`);
console.log(`Total replacements ${isDryRun ? 'to be made' : 'made'}: ${totalReplacements}`);
console.log(`\nDetailed log written to: ${logPath}`);

if (createBackup && !isDryRun) {
  console.log(`\nBackups created in: ${backupDir}`);
  console.log('To restore backups, run: cp -r .color-replacement-backup/* .');
}

console.log('\nTop 10 files by replacement count:');
filesModified
  .sort((a, b) => b.replacements - a.replacements)
  .slice(0, 10)
  .forEach(({ file, replacements }) => {
    console.log(`  ${replacements} - ${file}`);
  });

if (isDryRun) {
  console.log('\n⚠️  This was a DRY RUN. No files were modified.');
  console.log('To apply changes, run without --dry-run flag');
}

// Also note Tailwind config requirements
console.log('\n⚠️  Important: Ensure your tailwind.config.js has:');
console.log('  - brand-secondary, brand-tertiary, brand-accent colors defined');
console.log('  - Opacity modifiers enabled for custom colors');
console.log('  - Test the build after replacement to catch any issues');