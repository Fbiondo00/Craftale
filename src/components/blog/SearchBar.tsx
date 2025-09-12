// SearchBar Component - Clean Web Agency Design

"use client";

import { useEffect, useRef, useState } from "react";
import { type SearchBarProps } from "@/types/blog";
import { AnimatePresence, motion } from "framer-motion";
import { Search, TrendingUp, X } from "lucide-react";

// SearchBar Component - Clean Web Agency Design

// SearchBar Component - Clean Web Agency Design

// SearchBar Component - Clean Web Agency Design

// SearchBar Component - Clean Web Agency Design

// SearchBar Component - Clean Web Agency Design

// SearchBar Component - Clean Web Agency Design

// SearchBar Component - Clean Web Agency Design

// SearchBar Component - Clean Web Agency Design

// SearchBar Component - Clean Web Agency Design

// SearchBar Component - Clean Web Agency Design

// SearchBar Component - Clean Web Agency Design

// SearchBar Component - Clean Web Agency Design

// SearchBar Component - Clean Web Agency Design

// SearchBar Component - Clean Web Agency Design

// SearchBar Component - Clean Web Agency Design

// SearchBar Component - Clean Web Agency Design

// SearchBar Component - Clean Web Agency Design

// SearchBar Component - Clean Web Agency Design

// SearchBar Component - Clean Web Agency Design

// SearchBar Component - Clean Web Agency Design

// SearchBar Component - Clean Web Agency Design

// SearchBar Component - Clean Web Agency Design

// SearchBar Component - Clean Web Agency Design

// SearchBar Component - Clean Web Agency Design

// SearchBar Component - Clean Web Agency Design

// SearchBar Component - Clean Web Agency Design

// SearchBar Component - Clean Web Agency Design

// SearchBar Component - Clean Web Agency Design

// SearchBar Component - Clean Web Agency Design

// SearchBar Component - Clean Web Agency Design

// SearchBar Component - Clean Web Agency Design

// SearchBar Component - Clean Web Agency Design

// SearchBar Component - Clean Web Agency Design

// SearchBar Component - Clean Web Agency Design

// SearchBar Component - Clean Web Agency Design

// SearchBar Component - Clean Web Agency Design

// SearchBar Component - Clean Web Agency Design

// SearchBar Component - Clean Web Agency Design

// SearchBar Component - Clean Web Agency Design

// SearchBar Component - Clean Web Agency Design

interface SearchSuggestion {
  type: "popular" | "recent";
  label: string;
  count?: number;
}

const popularSearches: SearchSuggestion[] = [
  { type: "popular", label: "e-commerce conversion", count: 12 },
  { type: "popular", label: "nextjs development", count: 8 },
  { type: "popular", label: "website performance", count: 10 },
  { type: "popular", label: "case studies", count: 25 },
];

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search case studies, resources, and insights...",
  loading = false,
}: SearchBarProps) {
  const [focused, setFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFocus = () => {
    setFocused(true);
    setShowSuggestions(true);
  };

  const handleBlur = () => {
    setFocused(false);
    // Delay hiding suggestions to allow clicking on them
    setTimeout(() => setShowSuggestions(false), 200);
  };

  const handleClear = () => {
    onChange("");
    inputRef.current?.focus();
  };

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={inputRef}>
      {/* Search Input Container */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className={`
          relative bg-background rounded-xl border transition-all duration-200
          ${
            focused
              ? "border-brand-secondary/40 ring-2 ring-brand-secondary/20"
              : "border-border hover:border-border/80"
          }
        `}
      >
        {/* Search Icon */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <Search
            className={`w-5 h-5 transition-colors ${focused ? "text-brand-secondary" : "text-muted-foreground"}`}
          />
        </div>

        {/* Input Field */}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className="w-full py-4 pl-12 pr-12 text-base bg-transparent border-none outline-none placeholder-muted-foreground text-foreground rounded-xl"
        />

        {/* Loading Spinner or Clear Button */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          {loading ? (
            <div className="w-5 h-5 border-2 border-muted border-t-indigo-600 rounded-full animate-spin" />
          ) : value ? (
            <button onClick={handleClear} className="p-1 hover:bg-muted/50 rounded-full transition-colors">
              <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
            </button>
          ) : null}
        </div>
      </motion.div>

      {/* Search Suggestions Dropdown */}
      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-background rounded-xl shadow-lg border border-border z-50 overflow-hidden"
          >
            {/* Popular Searches */}
            {!value && (
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-brand-secondary" />
                  <span className="text-sm font-medium text-foreground">Popular Searches</span>
                </div>
                <div className="space-y-1">
                  {popularSearches.map(search => (
                    <motion.button
                      key={search.label}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      onClick={() => handleSuggestionClick(search.label)}
                      className="flex items-center justify-between w-full p-2 text-left hover:bg-muted/50 rounded-lg transition-colors group"
                    >
                      <span className="text-muted-foreground group-hover:text-foreground">{search.label}</span>
                      {search.count && (
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                          {search.count}
                        </span>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Search Results Preview (when typing) */}
            {value && (
              <div className="p-4">
                <div className="text-sm text-muted-foreground mb-2">
                  Search results for "<span className="font-medium text-foreground">{value}</span>"
                </div>
                <div className="text-sm text-brand-secondary">Press Enter to see all results</div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Stats */}
      {focused && !value && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-3 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Search through our case studies, portfolio projects, and expert resources
          </p>
        </motion.div>
      )}
    </div>
  );
}
