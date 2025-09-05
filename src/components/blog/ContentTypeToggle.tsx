// ContentTypeToggle Component - Clean Web Agency Design

'use client';

import { motion } from 'framer-motion';
import { type ContentTypeToggleProps, type ContentType } from '@/types/blog';

export default function ContentTypeToggle({
  contentTypes,
  selectedTypes,
  onToggle,
  configs
}: ContentTypeToggleProps) {
  
  const handleToggle = (type: ContentType) => {
    const newSelection = selectedTypes.includes(type)
      ? selectedTypes.filter(t => t !== type)
      : [...selectedTypes, type];
    onToggle(newSelection);
  };

  const handleToggleAll = () => {
    if (selectedTypes.length === contentTypes.length) {
      onToggle([]);
    } else {
      onToggle(contentTypes);
    }
  };

  const isAllSelected = selectedTypes.length === contentTypes.length;
  const isNoneSelected = selectedTypes.length === 0;

  return (
    <div className="flex flex-wrap gap-3 items-center">
      {/* All Content Toggle */}
      <motion.button
        onClick={handleToggleAll}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`
          px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border
          ${isAllSelected || isNoneSelected
            ? 'bg-brand-secondary text-white border-brand-secondary shadow-md' 
            : 'bg-background text-muted-foreground border-border hover:border-brand-secondary/40 hover:bg-muted/50'
          }
        `}
      >
        <span className="flex items-center gap-2">
          <span>🌟</span>
          <span>All Content</span>
          {isAllSelected && (
            <span className="w-2 h-2 bg-white rounded-full" />
          )}
        </span>
      </motion.button>

      {/* Separator */}
      <div className="w-px h-6 bg-border" />

      {/* Individual Content Type Toggles */}
      {contentTypes.map((type) => {
        const config = configs.find(c => c.type === type);
        const isSelected = selectedTypes.includes(type);
        
        if (!config) return null;

        return (
          <motion.button
            key={type}
            onClick={() => handleToggle(type)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
              relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border overflow-hidden
              ${isSelected
                ? 'bg-brand-secondary text-white border-brand-secondary shadow-md' 
                : 'bg-background text-muted-foreground border-border hover:border-brand-secondary/40 hover:bg-muted/50'
              }
            `}
          >
            <span className="relative flex items-center gap-2">
              <span>{config.icon}</span>
              <span>{config.label}</span>
              {isSelected && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-2 h-2 bg-white rounded-full"
                />
              )}
            </span>
          </motion.button>
        );
      })}

      {/* Quick Filter Pills */}
      <div className="hidden md:flex items-center gap-2 ml-4">
        <span className="text-sm text-muted-foreground">Quick filters:</span>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          onClick={() => onToggle(['case-study'])}
          className={`
            px-3 py-1 rounded-full text-xs font-medium transition-colors
            ${selectedTypes.includes('case-study') && selectedTypes.length === 1
              ? 'bg-color-state-success-subtle text-color-state-success-text border border-color-state-success-border' 
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }
          `}
        >
          Success Stories
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          onClick={() => onToggle(['portfolio'])}
          className={`
            px-3 py-1 rounded-full text-xs font-medium transition-colors
            ${selectedTypes.includes('portfolio') && selectedTypes.length === 1
              ? 'bg-brand-tertiary/20 text-brand-tertiary border border-brand-tertiary/30' 
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }
          `}
        >
          Portfolio
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          onClick={() => onToggle(['resource'])}
          className={`
            px-3 py-1 rounded-full text-xs font-medium transition-colors
            ${selectedTypes.includes('resource') && selectedTypes.length === 1
              ? 'bg-color-state-info-subtle text-color-state-info-text border border-color-state-info-border' 
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }
          `}
        >
          Resources
        </motion.button>
      </div>

      {/* Results Count */}
      {selectedTypes.length > 0 && selectedTypes.length < contentTypes.length && (
        <div className="ml-auto text-sm text-muted-foreground">
          {selectedTypes.length} of {contentTypes.length} selected
        </div>
      )}
    </div>
  );
} 