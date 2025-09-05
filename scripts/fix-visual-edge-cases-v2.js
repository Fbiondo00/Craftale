#!/usr/bin/env node

/**
 * Improved script to fix specific visual edge cases after semantic token migration
 * Uses non-greedy patterns and better safety checks
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Parse command line arguments
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const verbose = args.includes('--verbose');

console.log('=== Visual Edge Cases Fix Script v2 ===');
console.log(`Mode: ${isDryRun ? 'DRY RUN (no files will be modified)' : 'LIVE'}`);
console.log(`Verbose: ${verbose ? 'YES' : 'NO'}\n`);

// Safer replacements with non-greedy patterns and better specificity
const replacements = [
  // FIX 1: Yellow warning color is too orange - only for small indicator dots
  // Using non-greedy patterns and word boundaries
  { 
    from: /\b(w-[23]\s+h-[23](?:\s+\S+)*?)(bg-color-state-warning)((?:\s+\S+)*?rounded-full)\b/g, 
    to: '$1bg-yellow-400$3',
    description: 'Small yellow dots (w-2/3 h-2/3 + rounded-full)'
  },
  { 
    from: /\b(bg-color-state-warning)((?:\s+\S+)*?rounded-full(?:\s+\S+)*?w-[23]\s+h-[23])\b/g, 
    to: 'bg-yellow-400$2',
    description: 'Small yellow dots - alternate order'
  },
  // Additional pattern for dots with classes in between
  { 
    from: /\b(rounded-full(?:\s+\S+)*?)(bg-color-state-warning)((?:\s+\S+)*?w-[23]\s+h-[23])\b/g, 
    to: '$1bg-yellow-400$3',
    description: 'Small yellow dots - rounded-full first'
  },
  
  // FIX 2: Dark context borders - only adjacent or near-adjacent classes
  // More specific patterns to avoid over-matching
  { 
    from: /\b(bg-color-bg-inverse(?:\s+\S+){0,3}?)(border-color-border-strong)\b/g, 
    to: '$1border-slate-700',
    description: 'Borders near dark inverse background (max 3 classes between)'
  },
  { 
    from: /\b(border-color-border-strong)((?:\s+\S+){0,3}?bg-color-bg-inverse)\b/g, 
    to: 'border-slate-700$2',
    description: 'Borders near dark inverse background - reverse order'
  },
  { 
    from: /\b(bg-slate-900(?:\s+\S+){0,3}?)(border-color-border-strong)\b/g, 
    to: '$1border-slate-700',
    description: 'Borders near slate-900 background'
  },
  { 
    from: /\b(bg-gray-900(?:\s+\S+){0,3}?)(border-color-border-strong)\b/g, 
    to: '$1border-slate-700',
    description: 'Borders near gray-900 background'
  },
  
  // FIX 3: Footer specific patterns - very specific combinations
  { 
    from: /\b(mt-12\s+pt-8\s+)(border-t\s+border-color-border-strong)\b/g, 
    to: '$1border-t border-slate-700',
    description: 'Footer newsletter section (mt-12 pt-8)'
  },
  { 
    from: /\b(border-t\s+border-color-border-strong)((?:\s+\S+){0,2}?bg-color-bg-inverse-subtle)\b/g, 
    to: 'border-t border-slate-700$2',
    description: 'Footer bottom bar with dark background'
  },
  
  // FIX 4: Input borders in dark contexts - specific pattern
  { 
    from: /\b(bg-color-bg-inverse-subtle\s+)(border\s+border-color-border-strong)\b/g, 
    to: '$1border border-slate-600',
    description: 'Input with dark background - adjacent classes'
  },
  { 
    from: /\b(border\s+border-color-border-strong)(\s+bg-color-bg-inverse-subtle)\b/g, 
    to: 'border border-slate-600$2',
    description: 'Input with dark background - reverse order'
  },
  
  // FIX 5: Success indicators - small dots only
  { 
    from: /\b(w-[23]\s+h-[23](?:\s+\S+)*?)(bg-color-state-success)((?:\s+\S+)*?rounded-full)\b/g, 
    to: '$1bg-green-500$3',
    description: 'Small success dots (w-2/3 h-2/3 + rounded-full)'
  },
  { 
    from: /\b(bg-color-state-success)((?:\s+\S+)*?rounded-full(?:\s+\S+)*?w-[23]\s+h-[23])\b/g, 
    to: 'bg-green-500$2',
    description: 'Small success dots - alternate order'
  },
  { 
    from: /\b(rounded-full(?:\s+\S+)*?)(bg-color-state-success)((?:\s+\S+)*?w-[23]\s+h-[23])\b/g, 
    to: '$1bg-green-500$3',
    description: 'Small success dots - rounded-full first'
  },
  
  // FIX 6: Hero section backgrounds - very specific patterns
  { 
    from: /\b(min-h-\[[567890]+vh\](?:\s+\S+){0,5}?)(bg-color-bg-base)\b/g, 
    to: '$1bg-gradient-to-br from-brand-secondary/5 via-brand-tertiary/5 to-brand-accent/5',
    description: 'Hero sections with min-height viewport units'
  },
  { 
    from: /\b(min-h-screen(?:\s+\S+){0,5}?)(bg-color-bg-base)\b/g, 
    to: '$1bg-gradient-to-br from-brand-secondary/5 via-brand-tertiary/5 to-brand-accent/5',
    description: 'Hero sections with min-h-screen'
  },
  // Hero class based detection
  { 
    from: /className=["']([^"']*\bhero[^"']*)(bg-color-bg-base)([^"']*?)["']/gi, 
    to: 'className="$1bg-gradient-to-br from-brand-secondary/5 via-brand-tertiary/5 to-brand-accent/5$3"',
    description: 'Components with hero in className'
  },
  // Main page wrapper with min-h-screen but no background
  { 
    from: /className=['"]min-h-screen relative overflow-hidden['"]/g, 
    to: 'className="min-h-screen relative overflow-hidden bg-gradient-to-br from-brand-secondary/5 via-brand-tertiary/5 to-brand-accent/5"',
    description: 'Main page hero wrapper missing background'
  },
];

// Files to process
const files = glob.sync('src/**/*.{tsx,jsx,ts,js}', {
  ignore: [
    '**/node_modules/**',
    '**/.next/**',
    '**/test-tokens/**',
    '**/*.test.*',
    '**/*.spec.*',
    '**/*.backup.*',
    '**/scripts/**'
  ]
});

console.log(`Found ${files.length} files to process\n`);

let totalReplacements = 0;
const filesModified = [];
const replacementStats = {};

// Initialize stats
replacements.forEach(r => {
  replacementStats[r.description] = 0;
});

// Process each file
files.forEach(file => {
  const filePath = path.resolve(file);
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  let fileReplacements = 0;
  const appliedReplacements = [];

  // Apply replacements
  replacements.forEach(({ from, to, description }) => {
    const matches = content.match(from);
    if (matches) {
      const oldContent = content;
      if (typeof to === 'function') {
        content = content.replace(from, to);
      } else {
        content = content.replace(from, to);
      }
      
      // Count actual replacements by comparing content
      if (oldContent !== content) {
        const replacementCount = matches.length;
        fileReplacements += replacementCount;
        replacementStats[description] += replacementCount;
        appliedReplacements.push({ description, count: replacementCount });
        
        if (verbose) {
          console.log(`  ${file}:`);
          matches.forEach(match => {
            console.log(`    Found: "${match.substring(0, 80)}${match.length > 80 ? '...' : ''}"`);
          });
        }
      }
    }
  });

  // Write file if changes were made
  if (content !== originalContent) {
    if (!isDryRun) {
      // Create a backup
      const backupPath = `${filePath}.backup-${Date.now()}`;
      fs.writeFileSync(backupPath, originalContent);
      
      // Write the modified content
      fs.writeFileSync(filePath, content);
    }
    filesModified.push({ file, replacements: fileReplacements, applied: appliedReplacements });
    totalReplacements += fileReplacements;
  }
});

// Log results
console.log('\n' + '='.repeat(50));
console.log('SUMMARY');
console.log('='.repeat(50));
console.log(`Total replacements ${isDryRun ? 'to be made' : 'made'}: ${totalReplacements}`);
console.log(`Files ${isDryRun ? 'to be modified' : 'modified'}: ${filesModified.length}`);

// Show replacement statistics
if (totalReplacements > 0) {
  console.log('\n📊 Replacement Statistics:');
  Object.entries(replacementStats).forEach(([description, count]) => {
    if (count > 0) {
      console.log(`  • ${description}: ${count}`);
    }
  });
}

if (filesModified.length > 0 && !verbose) {
  console.log('\n📁 Modified files:');
  filesModified.forEach(({ file, replacements }) => {
    console.log(`  ${file}: ${replacements} replacements`);
  });
}

if (isDryRun) {
  console.log('\n⚠️  This was a DRY RUN. No files were modified.');
  console.log('To apply changes, run without --dry-run flag');
  console.log('\n💡 Tip: Use --verbose to see matched patterns');
} else if (totalReplacements > 0) {
  console.log('\n✅ Visual edge cases fixed successfully!');
  console.log(`🔄 Backup files created with .backup-${Date.now()} extension`);
  console.log('\nThese targeted fixes address specific visual issues where');
  console.log('semantic tokens don\'t match the original visual intent.');
  console.log('\n📝 Next steps:');
  console.log('  1. Review the changes visually in the browser');
  console.log('  2. Run tests: npm test');
  console.log('  3. If satisfied, commit the changes');
  console.log('  4. Delete backup files: find src -name "*.backup-*" -delete');
} else {
  console.log('\n✅ No edge cases found to fix.');
  console.log('All visual issues may have been resolved already.');
}

process.exit(0);