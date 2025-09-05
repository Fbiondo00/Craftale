// FilterPanel Component - Clean Web Agency Filtering

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Filter, 
  X, 
  ChevronDown, 
  ChevronUp, 
  RotateCcw,
  Check
} from 'lucide-react';
import { type FilterPanelProps } from '@/types/blog';

export default function FilterPanel({ 
  filters, 
  onFiltersChange, 
  categories, 
  loading = false 
}: FilterPanelProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['industries', 'technologies']);
  const [showPanel, setShowPanel] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  // Handle responsive breakpoint
  useEffect(() => {
    const checkScreenSize = () => {
      if (typeof window !== 'undefined') {
        setIsLargeScreen(window.innerWidth >= 1024);
      }
    };

    checkScreenSize();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', checkScreenSize);
      return () => window.removeEventListener('resize', checkScreenSize);
    }
  }, []);

  const toggleCategory = (categoryKey: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryKey) 
        ? prev.filter(k => k !== categoryKey)
        : [...prev, categoryKey]
    );
  };

  const handleFilterToggle = (categoryKey: string, value: string) => {
    const currentValues = (filters as any)[categoryKey] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v: string) => v !== value)
      : [...currentValues, value];
    
    onFiltersChange({
      ...filters,
      [categoryKey]: newValues
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      contentTypes: [],
      industries: [],
      technologies: [],
      serviceTypes: [],
      resultsCategories: [],
      projectSizes: [],
      searchQuery: filters.searchQuery, // Keep search query
    });
  };

  const getTotalFilterCount = () => {
    return Object.entries(filters).reduce((total, [key, value]) => {
      if (key === 'searchQuery') return total;
      return total + (Array.isArray(value) ? value.length : 0);
    }, 0);
  };

  const isFilterSelected = (categoryKey: string, value: string) => {
    const categoryValues = (filters as any)[categoryKey] || [];
    return categoryValues.includes(value);
  };

  const filterCount = getTotalFilterCount();

  return (
    <div className="relative">
      {/* Mobile Filter Toggle Button */}
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setShowPanel(!showPanel)}
          className="flex items-center gap-2 px-4 py-2 bg-background border border-border rounded-lg hover:bg-muted/50 transition-colors w-full justify-center"
        >
          <Filter className="w-5 h-5 text-muted-foreground" />
          <span className="font-medium text-foreground">
            Filters {filterCount > 0 && `(${filterCount})`}
          </span>
          {showPanel ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {(showPanel || isLargeScreen) && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className={`
              bg-background rounded-xl border border-border shadow-sm overflow-hidden
              ${showPanel ? 'block lg:block' : 'hidden lg:block'}
            `}
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-border/50 bg-muted/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-brand-secondary" />
                  <h3 className="font-semibold text-foreground">Filters</h3>
                  {filterCount > 0 && (
                    <span className="px-2 py-1 text-xs font-medium bg-brand-secondary/20 text-brand-secondary rounded-full">
                      {filterCount}
                    </span>
                  )}
                </div>
                {filterCount > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Filter Categories */}
            <div className="divide-y divide-border/50">
              {categories.map((category) => (
                <motion.div
                  key={category.key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4"
                >
                  {/* Category Header */}
                  <button
                    onClick={() => toggleCategory(category.key)}
                    className="flex items-center justify-between w-full mb-3 group"
                  >
                    <h4 className="font-medium text-foreground group-hover:text-brand-secondary transition-colors">
                      {category.label}
                    </h4>
                    <div className="flex items-center gap-2">
                      {((filters as any)[category.key] || []).length > 0 && (
                        <span className="px-2 py-1 text-xs font-medium bg-brand-secondary/20 text-brand-secondary rounded-full">
                          {((filters as any)[category.key] || []).length}
                        </span>
                      )}
                      {expandedCategories.includes(category.key) ? (
                        <ChevronUp className="w-4 h-4 text-muted-foreground group-hover:text-brand-secondary transition-colors" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-brand-secondary transition-colors" />
                      )}
                    </div>
                  </button>

                  {/* Category Options */}
                  <AnimatePresence>
                    {expandedCategories.includes(category.key) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-1"
                      >
                        {category.options.map((option) => {
                          const isSelected = isFilterSelected(category.key, option.value);
                          return (
                            <motion.label
                              key={option.value}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              className={`
                                flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 group
                                ${isSelected 
                                  ? 'bg-brand-secondary/10 border border-brand-secondary/30' 
                                  : 'hover:bg-muted/50 border border-transparent'
                                }
                              `}
                            >
                              <div className="flex items-center gap-3">
                                {/* Custom Checkbox */}
                                <div className={`
                                  w-4 h-4 rounded border flex items-center justify-center transition-all duration-200
                                  ${isSelected 
                                    ? 'bg-brand-secondary border-brand-secondary' 
                                    : 'border-border group-hover:border-brand-secondary/40'
                                  }
                                `}>
                                  {isSelected && (
                                    <Check className="w-3 h-3 text-white" />
                                  )}
                                </div>

                                {/* Option Label */}
                                <span className={`
                                  text-sm font-medium transition-colors
                                  ${isSelected ? 'text-indigo-900' : 'text-foreground group-hover:text-brand-secondary'}
                                `}>
                                  {option.label}
                                </span>
                              </div>

                              {/* Option Count */}
                              {option.count && (
                                <span className={`
                                  text-xs px-2 py-1 rounded-full transition-colors
                                  ${isSelected 
                                    ? 'bg-brand-secondary/20 text-brand-secondary' 
                                    : 'bg-muted text-muted-foreground'
                                  }
                                `}>
                                  {option.count}
                                </span>
                              )}

                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => handleFilterToggle(category.key, option.value)}
                                className="sr-only"
                              />
                            </motion.label>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Active Filters Summary */}
            {filterCount > 0 && (
              <div className="p-4 bg-muted/30 border-t border-border/50">
                <div className="text-sm text-muted-foreground mb-2">Active filters:</div>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(filters).map(([key, values]) => {
                    if (key === 'searchQuery' || !Array.isArray(values) || values.length === 0) return null;
                    
                    return values.map((value: string) => {
                      const category = categories.find(c => c.key === key);
                      const option = category?.options.find(o => o.value === value);
                      
                      return (
                        <span
                          key={`${key}-${value}`}
                          className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-brand-secondary/20 text-brand-secondary rounded-full"
                        >
                          {option?.label || value}
                          <button
                            onClick={() => handleFilterToggle(key, value)}
                            className="hover:bg-brand-secondary/30 rounded-full p-0.5 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      );
                    });
                  })}
                </div>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-muted border-t-indigo-600 rounded-full animate-spin" />
                  <span className="text-sm text-muted-foreground">Filtering...</span>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 