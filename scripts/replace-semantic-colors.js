#!/usr/bin/env node

/**
 * Script to replace all remaining hardcoded colors with semantic tokens
 * Based on Perplexity's 2025 best practice recommendations
 * 
 * This replaces 733 remaining colors:
 * - 489 gray → neutral tokens
 * - 78 green → success state tokens
 * - 56 blue → info state tokens
 * - 47 red → error state tokens
 * - 31 yellow → warning state tokens
 * - 32 others → appropriate semantic tokens
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const { colorMappings } = require('./semantic-tokens-config');

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
const backupDir = path.join(process.cwd(), `.semantic-colors-backup-${timestamp}`);

// Handle rollback mode
if (isRollback) {
  console.log('=== ROLLBACK MODE ===');
  const backupDirs = glob.sync('.semantic-colors-backup-*').sort().reverse();
  
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

console.log('=== Semantic Color Token Replacement Script ===');
console.log(`Mode: ${isDryRun ? 'DRY RUN (no files will be modified)' : 'LIVE'}`);
console.log(`Backup: ${createBackup ? `YES (${backupDir})` : 'NO'}`);
console.log(`Verbose: ${verbose ? 'YES' : 'NO'}\n`);

// Tailwind variants that might prefix our colors
const variants = [
  'hover', 'focus', 'active', 'disabled', 'group-hover', 'group-focus',
  'focus-within', 'focus-visible', 'motion-safe', 'motion-reduce',
  'dark', 'sm', 'md', 'lg', 'xl', '2xl', 'first', 'last', 'odd', 'even',
  'visited', 'checked', 'focus-within', 'hover', 'focus', 'group-hover'
];

// Create regex that handles multiple stacked variants and opacity
function createColorRegex(baseClass, colorName) {
  const variantPattern = `(?:(?:${variants.join('|')}):)*`;
  const opacityPattern = `(?:\\/\\d{1,3})?`;
  
  return new RegExp(
    `\\b(${variantPattern}${baseClass}-${colorName}${opacityPattern})\\b`,
    'g'
  );
}

// Helper to replace color while preserving variants and opacity
function replaceColorPreserveModifiers(match, oldColor, newColor) {
  const regex = new RegExp(`^(.*?)(\\w+-)${oldColor}(\\/\\d{1,3})?$`);
  const parts = match.match(regex);
  
  if (!parts) return match;
  
  const [, variants, baseClass, opacity = ''] = parts;
  
  // Handle opacity for semantic tokens
  if (opacity && newColor.includes('-')) {
    // For compound tokens like state-success-bg, append opacity differently
    return `${variants}${baseClass}${newColor}${opacity}`;
  }
  
  return `${variants}${baseClass}${newColor}${opacity}`;
}

// Generate replacements for all Tailwind utilities
const replacements = [];
const utilities = ['text', 'bg', 'border', 'ring', 'from', 'to', 'via', 'divide', 'placeholder', 'decoration', 'outline', 'shadow', 'accent', 'caret', 'fill', 'stroke'];

colorMappings.forEach(({ from: oldColor, to: newColor }) => {
  utilities.forEach(utility => {
    replacements.push({
      from: createColorRegex(utility, oldColor),
      process: (match) => replaceColorPreserveModifiers(match, oldColor, newColor)
    });
  });
  
  // Add ring offset colors
  replacements.push({
    from: createColorRegex('ring-offset', oldColor),
    process: (match) => replaceColorPreserveModifiers(match, oldColor, newColor)
  });
});

// Special case replacements for common patterns
const specialReplacements = [
  // Text color semantic replacements
  { from: /\btext-gray-900\b/g, to: 'text-primary' },
  { from: /\btext-gray-700\b/g, to: 'text-secondary' },
  { from: /\btext-gray-600\b/g, to: 'text-tertiary' },
  { from: /\btext-gray-500\b/g, to: 'text-muted' },
  { from: /\btext-gray-400\b/g, to: 'text-disabled' },
  
  // Background semantic replacements
  { from: /\bbg-gray-50\b/g, to: 'bg-subtle' },
  { from: /\bbg-gray-100\b/g, to: 'bg-muted' },
  { from: /\bbg-gray-700\b/g, to: 'bg-inverse-subtle' },
  { from: /\bbg-gray-800\b/g, to: 'bg-inverse-subtle' },
  { from: /\bbg-gray-900\b/g, to: 'bg-inverse' },
  
  // Border semantic replacements
  { from: /\bborder-gray-200\b/g, to: 'border-default' },
  { from: /\bborder-gray-100\b/g, to: 'border-subtle' },
  { from: /\bborder-gray-300\b/g, to: 'border-strong' },
  
  // State colors with semantic meaning
  { from: /\bbg-green-50\b/g, to: 'bg-state-success-bg' },
  { from: /\bbg-green-100\b/g, to: 'bg-state-success-subtle' },
  { from: /\btext-green-600\b/g, to: 'text-state-success-strong' },
  { from: /\bborder-green-300\b/g, to: 'border-state-success-border' },
  
  { from: /\bbg-red-50\b/g, to: 'bg-state-error-bg' },
  { from: /\bbg-red-100\b/g, to: 'bg-state-error-subtle' },
  { from: /\btext-red-600\b/g, to: 'text-state-error-strong' },
  { from: /\bborder-red-300\b/g, to: 'border-state-error-border' },
  
  { from: /\bbg-yellow-50\b/g, to: 'bg-state-warning-bg' },
  { from: /\bbg-yellow-100\b/g, to: 'bg-state-warning-subtle' },
  { from: /\btext-yellow-600\b/g, to: 'text-state-warning-strong' },
  { from: /\bborder-yellow-300\b/g, to: 'border-state-warning-border' },
  
  { from: /\bbg-blue-50\b/g, to: 'bg-state-info-bg' },
  { from: /\bbg-blue-100\b/g, to: 'bg-state-info-subtle' },
  { from: /\btext-blue-600\b/g, to: 'text-state-info-strong' },
  { from: /\bborder-blue-300\b/g, to: 'border-state-info-border' },
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
console.log(`Targeting approximately 733 color replacements\n`);

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

// Color counts for statistics
const colorCounts = {
  gray: 0,
  slate: 0,
  green: 0,
  red: 0,
  yellow: 0,
  blue: 0,
  orange: 0,
  emerald: 0,
  cyan: 0,
  violet: 0,
  rose: 0
};

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
    
    // Apply special semantic replacements first
    specialReplacements.forEach(({ from, to }) => {
      const matches = content.match(from);
      if (matches) {
        content = content.replace(from, to);
        fileReplacements += matches.length;
        matches.forEach(match => {
          fileReplacementDetails.push(`  ${match} → ${to}`);
          
          // Count by color type
          const colorType = match.match(/(gray|slate|green|red|yellow|blue|orange|emerald|cyan|violet|rose)/);
          if (colorType) {
            colorCounts[colorType[1]]++;
          }
        });
      }
    });
    
    // Apply standard color replacements
    replacements.forEach(({ from, process }) => {
      let match;
      while ((match = from.exec(content)) !== null) {
        const originalMatch = match[0];
        const replacement = process(originalMatch);
        
        if (originalMatch !== replacement && !replacementsMade.has(`${originalMatch}→${replacement}`)) {
          replacementsMade.add(`${originalMatch}→${replacement}`);
          fileReplacementDetails.push(`  ${originalMatch} → ${replacement}`);
          fileReplacements++;
          
          // Count by color type
          const colorType = originalMatch.match(/(gray|slate|green|red|yellow|blue|orange|emerald|cyan|violet|rose)/);
          if (colorType) {
            colorCounts[colorType[1]]++;
          }
        }
      }
    });
    
    // Actually apply the replacements
    replacementsMade.forEach(replaceStr => {
      const [original, replacement] = replaceStr.split('→');
      content = content.replace(new RegExp(`\\b${original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g'), replacement);
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
const logPath = path.join(process.cwd(), `semantic-colors-${isDryRun ? 'dry-' : ''}log-${timestamp}.txt`);
const logContent = [
  `Semantic Color Replacement Log - ${new Date().toISOString()}`,
  isDryRun ? 'DRY RUN MODE' : 'LIVE MODE',
  `\nTotal files processed: ${files.length}`,
  `Files modified: ${filesModified.length}`,
  `Total replacements: ${totalReplacements}`,
  '\n=== Color Type Breakdown ===',
  ...Object.entries(colorCounts).filter(([,count]) => count > 0).map(([color, count]) => `${color}: ${count}`),
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

console.log('\n📊 Color Type Breakdown:');
Object.entries(colorCounts)
  .filter(([,count]) => count > 0)
  .sort((a, b) => b[1] - a[1])
  .forEach(([color, count]) => {
    console.log(`  ${color}: ${count}`);
  });

if (errors.length > 0) {
  console.log(`\n⚠️  Errors encountered: ${errors.length}`);
  errors.forEach(({ file, error }) => {
    console.log(`  - ${file}: ${error}`);
  });
}

console.log(`\n📝 Detailed log: ${logPath}`);

if (createBackup && !isDryRun) {
  console.log(`💾 Backups saved: ${backupDir}`);
  console.log(`   Rollback command: node scripts/replace-semantic-colors.js --rollback`);
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
  console.log('  1. Update tailwind.config.js with semantic tokens');
  console.log('  2. Run: npm run build');
  console.log('  3. Test the application thoroughly');
  console.log('  4. If issues, rollback: node scripts/replace-semantic-colors.js --rollback');
}

// Tailwind config reminder
console.log('\n📋 Required Tailwind Config Updates:');
console.log('  Add semantic color tokens to tailwind.config.js:');
console.log('  - neutral scale (replacing gray)');
console.log('  - text tokens (primary, secondary, muted, etc.)');
console.log('  - background tokens (base, subtle, elevated, etc.)');
console.log('  - border tokens (default, subtle, strong)');
console.log('  - state tokens (success, error, warning, info)');
console.log('\n  See scripts/semantic-tokens-config.js for full token definitions');