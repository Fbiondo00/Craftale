#!/usr/bin/env node

/**
 * PRODUCTION-READY Script to replace Tailwind color classes with brand tokens
 * Run with: node scripts/replace-colors-final.js --dry-run
 * Then: node scripts/replace-colors-final.js
 * Rollback: node scripts/replace-colors-final.js --rollback
 * 
 * Features:
 * - Handles multiple stacked variants (sm:dark:hover:)
 * - Supports opacity modifiers (/90, /80, etc.)
 * - Creates timestamped backups
 * - Rollback functionality
 * - Dry run mode for testing
 * - Detailed logging
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Parse command line arguments
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const isRollback = args.includes('--rollback');
const isForce = args.includes('--force');
const createBackup = !args.includes('--no-backup');
const verbose = args.includes('--verbose');

// Check for uncommitted git changes (safety check)
const { execSync } = require('child_process');
try {
  const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' });
  if (gitStatus && !isDryRun && !isRollback && !isForce) {
    console.error('❌ Uncommitted changes detected!');
    console.error('Please commit or stash your changes before running this script.');
    console.error('Or use --force to override this check (not recommended).');
    process.exit(1);
  }
} catch (e) {
  console.warn('⚠️  Not a git repository or git not available. Proceeding anyway.')
}

// Timestamp for backup versioning
const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
const backupDir = path.join(process.cwd(), `.color-replacement-backup-${timestamp}`);

// Handle rollback mode
if (isRollback) {
  console.log('=== ROLLBACK MODE ===');
  const backupDirs = glob.sync('.color-replacement-backup-*').sort().reverse();
  
  if (backupDirs.length === 0) {
    console.error('❌ No backup directories found');
    process.exit(1);
  }
  
  const latestBackup = backupDirs[0];
  console.log(`Restoring from: ${latestBackup}`);
  
  const backupFiles = glob.sync(`${latestBackup}/**/*`, { nodir: true });
  backupFiles.forEach(backupFile => {
    const originalPath = backupFile.replace(latestBackup + '/', '');
    console.log(`  Restoring: ${originalPath}`);
    fs.copyFileSync(backupFile, originalPath);
  });
  
  console.log(`✅ Restored ${backupFiles.length} files from backup`);
  process.exit(0);
}

console.log('=== Color Token Replacement Script (FINAL) ===');
console.log(`Mode: ${isDryRun ? 'DRY RUN (no files will be modified)' : 'LIVE'}`);
console.log(`Backup: ${createBackup ? `YES (${backupDir})` : 'NO'}`);
console.log(`Verbose: ${verbose ? 'YES' : 'NO'}\n`);

// Tailwind variants that might prefix our colors (supports stacking)
const variants = [
  'hover', 'focus', 'active', 'disabled', 'group-hover', 'group-focus',
  'focus-within', 'focus-visible', 'motion-safe', 'motion-reduce',
  'dark', 'sm', 'md', 'lg', 'xl', '2xl', 'first', 'last', 'odd', 'even',
  'visited', 'checked', 'focus-within', 'hover', 'focus', 'group-hover'
];

// Create regex that handles multiple stacked variants and opacity
function createColorRegex(baseClass, colorName) {
  // Build pattern for multiple stacked variants like sm:dark:hover:
  const variantPattern = `(?:(?:${variants.join('|')}):)*`;
  
  // Handle opacity modifiers like /90, /80, /50, etc.
  const opacityPattern = `(?:\\/\\d{1,3})?`;
  
  // Full pattern: [variants:]baseClass-colorName[/opacity]
  return new RegExp(
    `\\b(${variantPattern}${baseClass}-${colorName}${opacityPattern})\\b`,
    'g'
  );
}

// Helper to replace color while preserving variants and opacity
function replaceColorPreserveModifiers(match, oldColor, newColor) {
  // Extract parts: variants, base class, color, opacity
  const regex = new RegExp(`^(.*?)(\\w+-)${oldColor}(\\/\\d{1,3})?$`);
  const parts = match.match(regex);
  
  if (!parts) return match; // Safety fallback
  
  const [, variants, baseClass, opacity = ''] = parts;
  return `${variants}${baseClass}${newColor}${opacity}`;
}

// Color replacement mappings with better handling
const colorMappings = [
  // Indigo → brand-secondary (#4f46e5)
  { old: 'indigo-600', new: 'brand-secondary' },
  { old: 'indigo-700', new: 'brand-secondary' },  // Keep same, darker via CSS
  { old: 'indigo-500', new: 'brand-secondary/90' },
  { old: 'indigo-50', new: 'brand-secondary/10' },
  { old: 'indigo-100', new: 'brand-secondary/20' },
  { old: 'indigo-200', new: 'brand-secondary/30' },
  { old: 'indigo-300', new: 'brand-secondary/40' },
  { old: 'indigo-400', new: 'brand-secondary/60' },
  { old: 'indigo-800', new: 'brand-secondary' },  // Keep same, darker via CSS
  
  // Purple → brand-tertiary (#9333ea)
  { old: 'purple-600', new: 'brand-tertiary' },
  { old: 'purple-700', new: 'brand-tertiary' },
  { old: 'purple-500', new: 'brand-tertiary/90' },
  { old: 'purple-50', new: 'brand-tertiary/10' },
  { old: 'purple-100', new: 'brand-tertiary/20' },
  { old: 'purple-200', new: 'brand-tertiary/30' },
  { old: 'purple-300', new: 'brand-tertiary/40' },
  { old: 'purple-400', new: 'brand-tertiary/60' },
  { old: 'purple-800', new: 'brand-tertiary' },
  
  // Pink → brand-accent (#ec4899)
  { old: 'pink-600', new: 'brand-accent' },
  { old: 'pink-700', new: 'brand-accent' },
  { old: 'pink-500', new: 'brand-accent/90' },
  { old: 'pink-50', new: 'brand-accent/10' },
  { old: 'pink-100', new: 'brand-accent/20' },
  { old: 'pink-200', new: 'brand-accent/30' },
  { old: 'pink-300', new: 'brand-accent/40' },
  { old: 'pink-400', new: 'brand-accent/60' },
];

// Generate replacements for all Tailwind utilities
const replacements = [];
const utilities = ['text', 'bg', 'border', 'ring', 'from', 'to', 'via', 'divide', 'placeholder'];

colorMappings.forEach(({ old: oldColor, new: newColor }) => {
  utilities.forEach(utility => {
    replacements.push({
      from: createColorRegex(utility, oldColor),
      process: (match) => replaceColorPreserveModifiers(match, oldColor, newColor)
    });
  });
});

// Add shadow and ring offset colors
colorMappings.forEach(({ old: oldColor, new: newColor }) => {
  // Shadow colors
  replacements.push({
    from: createColorRegex('shadow', oldColor),
    process: (match) => replaceColorPreserveModifiers(match, oldColor, newColor)
  });
  
  // Ring offset colors
  replacements.push({
    from: createColorRegex('ring-offset', oldColor),
    process: (match) => replaceColorPreserveModifiers(match, oldColor, newColor)
  });
});

// Gradient shortcuts for common patterns
const gradientReplacements = [
  { 
    from: /\bbg-gradient-to-r from-indigo-600 to-purple-600\b/g,
    to: 'bg-brand-gradient'
  },
  {
    from: /\bbg-gradient-to-br from-indigo-600 to-purple-600\b/g,
    to: 'bg-brand-gradient'
  },
  {
    from: /\bbg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600\b/g,
    to: 'bg-gradient-to-r from-brand-secondary via-brand-tertiary to-brand-accent'
  },
  {
    from: /\bbg-gradient-to-br from-indigo-500\/10 to-purple-500\/10\b/g,
    to: 'bg-gradient-to-br from-brand-secondary/10 to-brand-tertiary/10'
  }
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

console.log(`Found ${files.length} files to process\n`);

// Create backup directory
if (createBackup && !isDryRun) {
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
  console.log(`Creating backups in: ${backupDir}\n`);
}

let totalReplacements = 0;
const filesModified = [];
const replacementLog = [];
const errors = [];

// Process each file
files.forEach((file, index) => {
  try {
    const filePath = path.resolve(file);
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    let fileReplacements = 0;
    const fileReplacementDetails = [];
    
    // Track unique replacements to avoid duplicates
    const replacementsMade = new Set();
    
    // Apply color replacements
    replacements.forEach(({ from, process }) => {
      let match;
      while ((match = from.exec(content)) !== null) {
        const originalMatch = match[0];
        const replacement = process(originalMatch);
        
        if (originalMatch !== replacement && !replacementsMade.has(`${originalMatch}→${replacement}`)) {
          replacementsMade.add(`${originalMatch}→${replacement}`);
          fileReplacementDetails.push(`  ${originalMatch} → ${replacement}`);
          fileReplacements++;
        }
      }
    });
    
    // Actually apply the replacements
    replacementsMade.forEach(replaceStr => {
      const [original, replacement] = replaceStr.split('→');
      content = content.replace(new RegExp(`\\b${original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g'), replacement);
    });
    
    // Apply gradient replacements
    gradientReplacements.forEach(({ from, to }) => {
      const matches = content.match(from);
      if (matches) {
        content = content.replace(from, to);
        fileReplacements += matches.length;
        matches.forEach(match => {
          fileReplacementDetails.push(`  ${match} → ${to}`);
        });
      }
    });
    
    // If changes were made
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
    
    // Progress indicator for large batches
    if ((index + 1) % 10 === 0) {
      console.log(`  Progress: ${index + 1}/${files.length} files processed...`);
    }
    
  } catch (error) {
    errors.push({ file, error: error.message });
    console.error(`❌ Error processing ${file}: ${error.message}`);
  }
});

// Write detailed log
const logPath = path.join(process.cwd(), `color-replacement-${isDryRun ? 'dry-' : ''}log-${timestamp}.txt`);
const logContent = [
  `Color Replacement Log - ${new Date().toISOString()}`,
  isDryRun ? 'DRY RUN MODE' : 'LIVE MODE',
  `\nTotal files processed: ${files.length}`,
  `Files modified: ${filesModified.length}`,
  `Total replacements: ${totalReplacements}`,
  '\n=== Detailed Replacements ===',
  ...replacementLog.map(({ file, details }) => `\n${file}:\n${details.join('\n')}`),
  errors.length > 0 ? '\n=== Errors ===' : '',
  ...errors.map(({ file, error }) => `${file}: ${error}`)
].join('\n');

fs.writeFileSync(logPath, logContent);

// Summary output
console.log('\n' + '='.repeat(50));
console.log('=== SUMMARY ===');
console.log('='.repeat(50));
console.log(`Mode: ${isDryRun ? 'DRY RUN' : 'LIVE'}`);
console.log(`Files processed: ${files.length}`);
console.log(`Files ${isDryRun ? 'to be modified' : 'modified'}: ${filesModified.length}`);
console.log(`Total replacements ${isDryRun ? 'to be made' : 'made'}: ${totalReplacements}`);

if (errors.length > 0) {
  console.log(`\n⚠️  Errors encountered: ${errors.length}`);
  errors.forEach(({ file, error }) => {
    console.log(`  - ${file}: ${error}`);
  });
}

console.log(`\n📝 Detailed log: ${logPath}`);

if (createBackup && !isDryRun) {
  console.log(`💾 Backups saved: ${backupDir}`);
  console.log(`   Rollback command: node scripts/replace-colors-final.js --rollback`);
}

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
  console.log('Review the log file and run without --dry-run to apply changes.');
  console.log('⚠️ '.repeat(10));
} else {
  console.log('\n✅ Replacement complete!');
  console.log('\n⚠️  Next steps:');
  console.log('  1. Run: npm run build');
  console.log('  2. Test the application thoroughly');
  console.log('  3. If issues, rollback: node scripts/replace-colors-final.js --rollback');
}

// Tailwind config reminder
console.log('\n📋 Tailwind Config Requirements:');
console.log('  Ensure tailwind.config.js has:');
console.log('  - brand-secondary: "#4f46e5"');
console.log('  - brand-tertiary: "#9333ea"');
console.log('  - brand-accent: "#ec4899"');
console.log('  - Opacity modifiers work with these colors');