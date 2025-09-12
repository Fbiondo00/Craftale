// SortingControls Component - Clean Web Agency Design

"use client";

import { ReactNode, useState } from "react";
import { type SortOption, type SortingControlsProps } from "@/types/blog";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpAZ, ArrowUpDown, Award, Calendar, ChevronDown, Eye, TrendingUp, Users } from "lucide-react";

// SortingControls Component - Clean Web Agency Design

// SortingControls Component - Clean Web Agency Design

// SortingControls Component - Clean Web Agency Design

// SortingControls Component - Clean Web Agency Design

// SortingControls Component - Clean Web Agency Design

// SortingControls Component - Clean Web Agency Design

// SortingControls Component - Clean Web Agency Design

// SortingControls Component - Clean Web Agency Design

// SortingControls Component - Clean Web Agency Design

// SortingControls Component - Clean Web Agency Design

// SortingControls Component - Clean Web Agency Design

// SortingControls Component - Clean Web Agency Design

// SortingControls Component - Clean Web Agency Design

// SortingControls Component - Clean Web Agency Design

// SortingControls Component - Clean Web Agency Design

// SortingControls Component - Clean Web Agency Design

// SortingControls Component - Clean Web Agency Design

// SortingControls Component - Clean Web Agency Design

// SortingControls Component - Clean Web Agency Design

// SortingControls Component - Clean Web Agency Design

// SortingControls Component - Clean Web Agency Design

// SortingControls Component - Clean Web Agency Design

// SortingControls Component - Clean Web Agency Design

// SortingControls Component - Clean Web Agency Design

// SortingControls Component - Clean Web Agency Design

// SortingControls Component - Clean Web Agency Design

// SortingControls Component - Clean Web Agency Design

// SortingControls Component - Clean Web Agency Design

// SortingControls Component - Clean Web Agency Design

// SortingControls Component - Clean Web Agency Design

// SortingControls Component - Clean Web Agency Design

// SortingControls Component - Clean Web Agency Design

// SortingControls Component - Clean Web Agency Design

// SortingControls Component - Clean Web Agency Design

// SortingControls Component - Clean Web Agency Design

// SortingControls Component - Clean Web Agency Design

// SortingControls Component - Clean Web Agency Design

// SortingControls Component - Clean Web Agency Design

// SortingControls Component - Clean Web Agency Design

// SortingControls Component - Clean Web Agency Design

const sortIcons: Record<SortOption, ReactNode> = {
  recent: <Calendar className="w-4 h-4" />,
  impact: <Award className="w-4 h-4" />,
  popular: <Eye className="w-4 h-4" />,
  alphabetical: <ArrowUpAZ className="w-4 h-4" />,
  "project-size": <Users className="w-4 h-4" />,
  "client-success": <TrendingUp className="w-4 h-4" />,
};

const sortLabels: Record<SortOption, string> = {
  recent: "Most Recent",
  impact: "Highest Impact",
  popular: "Most Popular",
  alphabetical: "Alphabetical",
  "project-size": "Project Size",
  "client-success": "Client Success",
};

const sortDescriptions: Record<SortOption, string> = {
  recent: "Latest published content first",
  impact: "Based on measurable client results",
  popular: "Most viewed and engaged content",
  alphabetical: "A-Z by title",
  "project-size": "Small to enterprise projects",
  "client-success": "Highest conversion improvements",
};

export default function SortingControls({ sortBy, onSortChange, resultsCount }: SortingControlsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSortSelect = (option: SortOption) => {
    onSortChange(option);
    setIsOpen(false);
  };

  return (
    <div className="flex items-center justify-between flex-wrap gap-4">
      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        <span className="font-medium text-foreground">{resultsCount.toLocaleString()}</span> results
        {resultsCount > 0 && <span className="ml-2">• Sorted by {sortLabels[sortBy].toLowerCase()}</span>}
      </div>

      {/* Sort Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-background border border-border rounded-lg hover:bg-muted/50 hover:border-border/80 transition-all duration-200 min-w-[180px] justify-between"
        >
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium text-foreground">Sort by</span>
            <span className="text-muted-foreground">{sortLabels[sortBy]}</span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />

              {/* Dropdown Content */}
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-80 bg-background border border-border rounded-xl shadow-lg z-20 overflow-hidden"
              >
                <div className="p-3 border-b border-border/50 bg-muted/30">
                  <h3 className="font-medium text-foreground text-sm">Sort Options</h3>
                  <p className="text-xs text-muted-foreground mt-1">Choose how to organize the content</p>
                </div>

                <div className="py-2">
                  {(Object.keys(sortLabels) as SortOption[]).map(option => (
                    <motion.button
                      key={option}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      onClick={() => handleSortSelect(option)}
                      className={`
                        w-full px-4 py-3 text-left hover:bg-muted/50 transition-colors flex items-start gap-3 group
                        ${sortBy === option ? "bg-brand-secondary/10 border-r-2 border-brand-secondary" : ""}
                      `}
                    >
                      <div
                        className={`
                        p-1.5 rounded-lg flex-shrink-0 transition-colors
                        ${
                          sortBy === option
                            ? "bg-brand-secondary/20 text-brand-secondary"
                            : "bg-muted text-muted-foreground group-hover:bg-muted/80"
                        }
                      `}
                      >
                        {sortIcons[option]}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div
                          className={`
                          font-medium text-sm transition-colors
                          ${sortBy === option ? "text-indigo-900" : "text-foreground"}
                        `}
                        >
                          {sortLabels[option]}
                          {sortBy === option && (
                            <span className="ml-2 text-xs bg-brand-secondary/20 text-brand-secondary px-2 py-0.5 rounded-full">
                              Active
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">{sortDescriptions[option]}</div>
                      </div>
                    </motion.button>
                  ))}
                </div>

                <div className="p-3 border-t border-border/50 bg-muted/30">
                  <p className="text-xs text-muted-foreground">
                    Tip: Use filters to narrow down results before sorting
                  </p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
