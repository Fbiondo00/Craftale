#!/usr/bin/env node

/**
 * Fix Semantic Token Bugs Script
 * 
 * This script fixes the bugs introduced by fix-semantic-tokens-final.js
 * Based on the comprehensive audit in CSS-GENERATION-AUDIT.md
 * 
 * Issues fixed:
 * 1. bg-color-inverse-bg → bg-color-inverse (non-existent class)
 * 2. bg-color-bg-muted → bg-color-muted (non-existent class)
 * 3. border-color-border-hover → border-color-hover (non-existent class)
 * 4. text-color-muted → text-color-tertiary (for better contrast on gray backgrounds)
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Parse command line arguments
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const verbose = args.includes('--verbose');

if (dryRun) {
  console.log('🔍 DRY RUN MODE - No files will be modified\n');
}

console.log('🔧 Fixing semantic token bugs based on CSS Generation Audit...\n');

// Define replacements to fix ALL identified issues
const replacements = [
  // ============================================
  // CRITICAL BUG FIXES - Non-existent classes
  // ============================================
  
  // Bug 1: bg-color-inverse-bg doesn't exist
  // Root cause: fix-semantic-tokens-final.js line 163 bug
  {
    from: /\b((?:[a-z-]+:)*)?bg-color-inverse-bg(?=\s|['"`]|\]|$)/g,
    to: '$1bg-color-inverse',
    description: 'Fix non-existent class: bg-color-inverse-bg → bg-color-inverse',
    category: 'critical'
  },
  
  // Bug 2: bg-color-bg-muted doesn't exist
  // Root cause: fix-semantic-tokens-final.js line 162 kept wrong pattern
  {
    from: /\b((?:[a-z-]+:)*)?bg-color-bg-muted(?=\s|['"`]|\]|$)/g,
    to: '$1bg-color-muted',
    description: 'Fix non-existent class: bg-color-bg-muted → bg-color-muted',
    category: 'critical'
  },
  
  // Bug 3: border-color-border-hover doesn't exist
  // Root cause: fix-semantic-tokens-final.js line 175 kept wrong pattern
  {
    from: /\b((?:[a-z-]+:)*)?border-color-border-hover(?=\s|['"`]|\]|$)/g,
    to: '$1border-color-hover',
    description: 'Fix non-existent class: border-color-border-hover → border-color-hover',
    category: 'critical'
  },
  
  // ============================================
  // CONTRAST FIXES - Use semantic tokens
  // ============================================
  
  // Fix 4: Step numbers on gray backgrounds need better contrast
  // text-color-muted (gray-500) has 2.5:1 contrast ratio on gray-300 (WCAG fail)
  // text-color-tertiary (gray-600) has 4.5:1 contrast ratio (WCAG pass)
  {
    from: /\b(bg-gray-300\s+text-color-muted|text-color-muted\s+bg-gray-300)\b/g,
    to: (match) => {
      // Use semantic token for consistency
      if (match.startsWith('bg-gray-300')) {
        return 'bg-gray-300 text-color-tertiary';
      } else {
        return 'text-color-tertiary bg-gray-300';
      }
    },
    description: 'Contrast fix: text-color-muted → text-color-tertiary on gray-300',
    category: 'contrast'
  },
  
  // Fix 5: "💡 Ideale per:" text needs better readability
  // Target this specific context only
  {
    from: /(<[^>]*className="[^"]*)(text-color-muted)([^"]*">[\s]*💡 Ideale per:)/g,
    to: '$1text-color-tertiary$3',
    description: 'Readability fix: "💡 Ideale per:" text-color-muted → text-color-tertiary',
    category: 'contrast'
  }
];

// Function to apply replacements
function applyReplacements(content, replacementList) {
  let updatedContent = content;
  let totalReplacements = 0;
  const changeDetails = [];
  const changes = [];

  replacementList.forEach(({ from, to, description, category }) => {
    try {
      const matches = updatedContent.match(from) || [];
      if (matches.length > 0) {
        // Store before/after for verbose mode
        if (verbose) {
          matches.slice(0, 5).forEach(match => {
            const replacement = typeof to === 'function' ? to(match) : match.replace(from, to);
            changes.push({
              before: match,
              after: replacement,
              description,
              category
            });
          });
        }

        // Apply replacement
        updatedContent = updatedContent.replace(from, to);
        totalReplacements += matches.length;
        changeDetails.push({ description, count: matches.length, category });
      }
    } catch (error) {
      console.error(`  ⚠️  Error applying replacement: ${description}`);
      console.error(`     ${error.message}`);
    }
  });

  return { updatedContent, totalReplacements, changeDetails, changes };
}

// Function to process a single file
function processFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return null;
  }

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const { updatedContent, totalReplacements, changeDetails, changes } = applyReplacements(content, replacements);

    if (totalReplacements > 0) {
      const result = {
        path: filePath,
        replacements: totalReplacements,
        changeDetails,
        changes
      };

      if (!dryRun) {
        // Create backup
        const backupDir = path.join(path.dirname(filePath), '.token-backups');
        if (!fs.existsSync(backupDir)) {
          fs.mkdirSync(backupDir, { recursive: true });
        }
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const backupName = `${path.basename(filePath)}.${timestamp}.backup`;
        const backupPath = path.join(backupDir, backupName);
        fs.writeFileSync(backupPath, content);
        result.backupPath = backupPath;
        
        // Write updated content atomically
        const tempPath = filePath + '.tmp';
        fs.writeFileSync(tempPath, updatedContent);
        fs.renameSync(tempPath, filePath);
      }
      
      return result;
    }
  } catch (error) {
    console.error(`  ⚠️  Error processing file ${filePath}:`);
    console.error(`     ${error.message}`);
  }

  return null;
}

// Main execution
const projectRoot = path.resolve(__dirname, '..');
const srcPath = path.join(projectRoot, 'src');
const modifiedFiles = [];
let totalReplacementsCount = 0;
let criticalFixCount = 0;
let contrastFixCount = 0;

console.log('📁 Scanning for files with semantic token issues...\n');

// Get all source files
const allFiles = glob.sync('**/*.{tsx,jsx,ts,js}', {
  cwd: srcPath,
  absolute: true,
  ignore: ['**/node_modules/**', '**/.next/**', '**/.token-backups/**']
});

console.log(`Found ${allFiles.length} files to check\n`);
console.log('🔍 Applying fixes...\n');

// Process all files
allFiles.forEach(filePath => {
  const result = processFile(filePath);
  if (result) {
    modifiedFiles.push(result);
    totalReplacementsCount += result.replacements;
    
    // Count fixes by category
    result.changeDetails.forEach(detail => {
      if (detail.category === 'critical') {
        criticalFixCount += detail.count;
      } else if (detail.category === 'contrast') {
        contrastFixCount += detail.count;
      }
    });
  }
});

// Report results
console.log('═══════════════════════════════════════════════════════════════\n');
console.log('📊 Fix Summary:\n');

if (modifiedFiles.length > 0) {
  const action = dryRun ? 'Would modify' : 'Modified';
  console.log(`✅ ${action} ${modifiedFiles.length} files with ${totalReplacementsCount} total fixes:\n`);
  console.log(`  🚨 Critical bug fixes (non-existent classes): ${criticalFixCount}`);
  console.log(`  🎨 Contrast/readability improvements: ${contrastFixCount}\n`);
  
  // Group files by directory for cleaner output
  const filesByDir = {};
  modifiedFiles.forEach(file => {
    const dir = path.dirname(path.relative(projectRoot, file.path));
    if (!filesByDir[dir]) {
      filesByDir[dir] = [];
    }
    filesByDir[dir].push(file);
  });
  
  Object.entries(filesByDir).forEach(([dir, files]) => {
    console.log(`\n  📁 ${dir}/`);
    files.forEach(file => {
      const fileName = path.basename(file.path);
      console.log(`     📝 ${fileName} (${file.replacements} fixes)`);
      
      // Group changes by category
      const criticalChanges = file.changeDetails.filter(c => c.category === 'critical');
      const contrastChanges = file.changeDetails.filter(c => c.category === 'contrast');
      
      if (criticalChanges.length > 0) {
        console.log(`        🚨 Critical fixes:`);
        criticalChanges.forEach(change => {
          console.log(`           - ${change.description}: ${change.count}x`);
        });
      }
      
      if (contrastChanges.length > 0) {
        console.log(`        🎨 Contrast fixes:`);
        contrastChanges.forEach(change => {
          console.log(`           - ${change.description}: ${change.count}x`);
        });
      }
      
      // Show examples in verbose mode
      if (verbose && file.changes.length > 0) {
        console.log(`        📋 Examples:`);
        file.changes.slice(0, 2).forEach(change => {
          const beforeSnippet = change.before.length > 50 
            ? change.before.substring(0, 50) + '...' 
            : change.before;
          const afterSnippet = change.after.length > 50 
            ? change.after.substring(0, 50) + '...' 
            : change.after;
          console.log(`           Before: "${beforeSnippet}"`);
          console.log(`           After:  "${afterSnippet}"`);
        });
      }
    });
  });
  
  if (!dryRun) {
    console.log('\n📁 Backup files created in .token-backups/ directories');
  }
} else {
  console.log('✅ No semantic token bugs found - all classes are valid!');
}

console.log('\n═══════════════════════════════════════════════════════════════');
console.log('\n🎯 Bugs fixed (from CSS-GENERATION-AUDIT.md):');
console.log('  1. bg-color-inverse-bg → bg-color-inverse (Footer & dark backgrounds)');
console.log('  2. bg-color-bg-muted → bg-color-muted (Background tokens)');
console.log('  3. border-color-border-hover → border-color-hover (Border tokens)');
console.log('  4. text-color-muted → text-color-tertiary (Step numbers on gray-300)');
console.log('  5. text-color-muted → text-color-tertiary ("💡 Ideale per:" text)');

if (dryRun) {
  console.log('\n💡 This was a DRY RUN. To apply changes, run without --dry-run flag:');
  console.log('   node scripts/fix-semantic-token-bugs.js');
} else {
  console.log('\n✨ All semantic token bugs have been fixed!');
  console.log('💡 Backups created in .token-backups/ directories');
  console.log('🔄 Please restart your development server to see the changes.');
}

console.log('\n📌 Usage:');
console.log('  node scripts/fix-semantic-token-bugs.js           # Apply fixes');
console.log('  node scripts/fix-semantic-token-bugs.js --dry-run # Preview changes');
console.log('  node scripts/fix-semantic-token-bugs.js --verbose # Show detailed changes');
console.log('\n📚 See CSS-GENERATION-AUDIT.md for full analysis');
console.log('');