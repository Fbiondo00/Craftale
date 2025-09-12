// Blog Page - Streamlined Web Agency Integration with Sticky Scroll Behavior

"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import BlogGrid from "@/components/blog/BlogGrid";
import FilterPanel from "@/components/blog/FilterPanel";
import SearchBar from "@/components/blog/SearchBar";
//import ContentTypeToggle from '@/components/blog/ContentTypeToggle';
import SortingControls from "@/components/blog/SortingControls";
import { Button } from "@/components/ui/button";
import { contentTypeConfigs, filterCategories } from "@/data/mockBlogData";
import useBlogSystem from "@/hooks/useBlogSystem";
import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import {
  ArrowRight,
  Code2,
  Filter,
  Heart,
  Monitor,
  Rocket,
  Search,
  Smartphone,
  Sparkles,
  Star,
  Trophy,
  X,
  Zap,
} from "lucide-react";

// Blog Page - Streamlined Web Agency Integration with Sticky Scroll Behavior

// Blog Page - Streamlined Web Agency Integration with Sticky Scroll Behavior

// Blog Page - Streamlined Web Agency Integration with Sticky Scroll Behavior

// Blog Page - Streamlined Web Agency Integration with Sticky Scroll Behavior

// Blog Page - Streamlined Web Agency Integration with Sticky Scroll Behavior

// Blog Page - Streamlined Web Agency Integration with Sticky Scroll Behavior

// Blog Page - Streamlined Web Agency Integration with Sticky Scroll Behavior

// Blog Page - Streamlined Web Agency Integration with Sticky Scroll Behavior

// Blog Page - Streamlined Web Agency Integration with Sticky Scroll Behavior

// Blog Page - Streamlined Web Agency Integration with Sticky Scroll Behavior

// Blog Page - Streamlined Web Agency Integration with Sticky Scroll Behavior

// Blog Page - Streamlined Web Agency Integration with Sticky Scroll Behavior

// Blog Page - Streamlined Web Agency Integration with Sticky Scroll Behavior

// Blog Page - Streamlined Web Agency Integration with Sticky Scroll Behavior

// Blog Page - Streamlined Web Agency Integration with Sticky Scroll Behavior

// Blog Page - Streamlined Web Agency Integration with Sticky Scroll Behavior

// Blog Page - Streamlined Web Agency Integration with Sticky Scroll Behavior

// Blog Page - Streamlined Web Agency Integration with Sticky Scroll Behavior

// Blog Page - Streamlined Web Agency Integration with Sticky Scroll Behavior

// Blog Page - Streamlined Web Agency Integration with Sticky Scroll Behavior

// Blog Page - Streamlined Web Agency Integration with Sticky Scroll Behavior

// Blog Page - Streamlined Web Agency Integration with Sticky Scroll Behavior

// Blog Page - Streamlined Web Agency Integration with Sticky Scroll Behavior

// Blog Page - Streamlined Web Agency Integration with Sticky Scroll Behavior

// Blog Page - Streamlined Web Agency Integration with Sticky Scroll Behavior

// Blog Page - Streamlined Web Agency Integration with Sticky Scroll Behavior

// Blog Page - Streamlined Web Agency Integration with Sticky Scroll Behavior

// Blog Page - Streamlined Web Agency Integration with Sticky Scroll Behavior

// Blog Page - Streamlined Web Agency Integration with Sticky Scroll Behavior

// Blog Page - Streamlined Web Agency Integration with Sticky Scroll Behavior

// Blog Page - Streamlined Web Agency Integration with Sticky Scroll Behavior

// Blog Page - Streamlined Web Agency Integration with Sticky Scroll Behavior

// Blog Page - Streamlined Web Agency Integration with Sticky Scroll Behavior

// Blog Page - Streamlined Web Agency Integration with Sticky Scroll Behavior

// Blog Page - Streamlined Web Agency Integration with Sticky Scroll Behavior

// Blog Page - Streamlined Web Agency Integration with Sticky Scroll Behavior

// Blog Page - Streamlined Web Agency Integration with Sticky Scroll Behavior

// Blog Page - Streamlined Web Agency Integration with Sticky Scroll Behavior

// Blog Page - Streamlined Web Agency Integration with Sticky Scroll Behavior

// Blog Page - Streamlined Web Agency Integration with Sticky Scroll Behavior

// Compact Search Component for sticky behavior
function CompactSearchBar({
  value,
  onChange,
  loading = false,
}: {
  value: string;
  onChange: (value: string) => void;
  loading?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    onChange("");
    inputRef.current?.focus();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`
        relative bg-background rounded-lg border transition-all duration-200 h-10
        ${focused ? "border-brand-secondary/40 ring-1 ring-brand-secondary/20" : "border-border hover:border-border/80"}
      `}
    >
      {/* Search Icon */}
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
        <Search className={`w-4 h-4 transition-colors ${focused ? "text-brand-secondary" : "text-muted-foreground"}`} />
      </div>

      {/* Input Field */}
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Search..."
        className="w-full h-full pl-9 pr-9 text-sm bg-transparent border-none outline-none placeholder-muted-foreground text-foreground rounded-lg"
      />

      {/* Loading Spinner or Clear Button */}
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
        {loading ? (
          <div className="w-3 h-3 border-2 border-muted border-t-indigo-600 rounded-full animate-spin" />
        ) : value ? (
          <button onClick={handleClear} className="p-0.5 hover:bg-muted/50 rounded-full transition-colors">
            <X className="w-3 h-3 text-muted-foreground hover:text-foreground" />
          </button>
        ) : null}
      </div>
    </motion.div>
  );
}

function BlogContent() {
  const {
    posts,
    filters,
    sortBy,
    searchQuery,
    selectedContentTypes,
    loading,
    totalResults,
    activeFilterCount,
    availableContentTypes,
    handleFiltersChange,
    handleSortChange,
    handleSearchChange,
    handleContentTypeToggle,
    clearAllFilters,
  } = useBlogSystem();

  // Scroll behavior state
  const [scrollY, setScrollY] = useState(0);
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const [isScrolledPastSearch, setIsScrolledPastSearch] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Interactive effects state - copied from main page
  type Particle = { id: number; x: number; y: number; color: string };
  const [particles, setParticles] = useState<Particle[]>([]);
  const [floatingElements, setFloatingElements] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      delay: number;
      icon: any;
    }>
  >([]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Scroll behavior setup
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      // Check if scrolled past hero description
      if (heroRef.current) {
        const heroBottom = heroRef.current.offsetTop + heroRef.current.offsetHeight;
        setIsScrolledPastHero(currentScrollY > heroBottom - 100);
      }

      // Check if scrolled past search bar - wait until completely out of view
      if (searchRef.current) {
        const searchBottom = searchRef.current.offsetTop + searchRef.current.offsetHeight;
        // Add more buffer to ensure original search is completely invisible
        setIsScrolledPastSearch(currentScrollY > searchBottom + 250);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Interactive effects setup - copied from main page
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Generate colorful particles
    const particleInterval = setInterval(() => {
      if (typeof window !== "undefined") {
        const colors = [
          "bg-brand-secondary/60",
          "bg-brand-tertiary/60",
          "bg-brand-accent/60",
          "bg-blue-400",
          "bg-color-state-success",
          "bg-color-state-warning",
        ];
        setParticles(prev => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 20,
            color: colors[Math.floor(Math.random() * colors.length)],
          },
        ]);
      }
    }, 200);

    // Generate floating icons
    const iconInterval = setInterval(() => {
      if (typeof window !== "undefined") {
        const icons = [Code2, Monitor, Smartphone, Zap, Star, Heart, Rocket, Trophy];
        const randomIcon = icons[Math.floor(Math.random() * icons.length)];
        setFloatingElements(prev => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 50,
            icon: randomIcon,
            delay: Math.random() * 2,
          },
        ]);
      }
    }, 2000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(particleInterval);
      clearInterval(iconInterval);
    };
  }, [mouseX, mouseY]);

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-background relative" ref={containerRef}>
      {/* Global Interactive Effects - Extended to cover entire blog area except CTA */}
      {/* Custom Cursor Effect */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 border-2 border-brand-secondary/90 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{ x: mousePosition.x - 12, y: mousePosition.y - 12 }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Floating particles */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className={`absolute w-2 h-2 ${particle.color} rounded-full pointer-events-none z-10`}
          initial={{ x: particle.x, y: particle.y, opacity: 0, scale: 0 }}
          animate={{
            y: typeof window !== "undefined" ? -window.innerHeight - 100 : -1000,
            opacity: [0, 1, 1, 0],
            x: particle.x + (Math.random() - 0.5) * 300,
            scale: [0, 1, 1, 0],
            rotate: [0, 360],
          }}
          transition={{ duration: 8, ease: "linear" }}
        />
      ))}

      {/* Floating Icons */}
      {floatingElements.map(element => {
        const Icon = element.icon;
        return (
          <motion.div
            key={element.id}
            className="absolute pointer-events-none z-10"
            initial={{ x: element.x, y: element.y, opacity: 0, scale: 0 }}
            animate={{
              y: -100,
              opacity: [0, 0.3, 0.3, 0],
              scale: [0, 1, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 12, ease: "linear", delay: element.delay }}
          >
            <Icon className="w-8 h-8 text-brand-secondary/40" />
          </motion.div>
        );
      })}

      {/* Interactive Background Covering Main Blog Area */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Interactive Background Gradient */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: useTransform(
              [mouseX, mouseY],
              ([x, y]) => `radial-gradient(800px at ${x}px ${y}px, rgba(99, 102, 241, 0.15), transparent 50%)`,
            ),
          }}
        />

        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(99, 102, 241, 0.3) 1px, transparent 0)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>
      </div>

      {/* Merged Hero and Content Section with Interactive Effects */}
      <section className="relative bg-gradient-to-br from-brand-secondary/10/30 via-brand-tertiary/10/20 to-brand-accent/10/30">
        <div className="container py-16 relative z-20">
          <motion.div
            ref={heroRef}
            variants={headerVariants}
            initial="hidden"
            animate="visible"
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-background/60 backdrop-blur-sm rounded-full border border-border/50 text-muted-foreground text-sm font-medium">
                <Sparkles className="w-4 h-4 text-brand-secondary" />
                <span>Insights, Case Studies & Expertise</span>
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight"
            >
              Resources & <span className="text-brand-secondary">Success Stories</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              Discover how we&apos;ve helped businesses achieve remarkable results. Explore proven strategies, expert
              insights, and real client successes.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="relative z-20">
        <div className="container py-12">
          <div className="max-w-7xl mx-auto">
            {/* Original Search Bar (hidden when scrolled past) */}
            <motion.div
              ref={searchRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isScrolledPastSearch ? 0 : 1,
                y: isScrolledPastSearch ? -20 : 0,
                pointerEvents: isScrolledPastSearch ? "none" : "auto",
              }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="mb-8"
            >
              <SearchBar
                value={searchQuery}
                onChange={handleSearchChange}
                loading={loading}
                placeholder="Search case studies, insights, and resources..."
              />
            </motion.div>

            {/* Enhanced Content Type Toggle with Sticky Compact Search */}
            <div className={`${isScrolledPastHero ? "sticky top-16 z-50 bg-background" : ""}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-8"
              >
                <div className="flex flex-nowrap gap-3 items-center overflow-x-auto scrollbar-hide py-2">
                  {/* All Content Toggle */}
                  <motion.button
                    onClick={() => {
                      const isAllSelected = selectedContentTypes.length === availableContentTypes.length;
                      const isNoneSelected = selectedContentTypes.length === 0;
                      if (isAllSelected || isNoneSelected) {
                        handleContentTypeToggle([]);
                      } else {
                        handleContentTypeToggle(availableContentTypes);
                      }
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border h-10 whitespace-nowrap
                      ${
                        selectedContentTypes.length === availableContentTypes.length ||
                        selectedContentTypes.length === 0
                          ? "bg-brand-secondary text-white border-brand-secondary shadow-md"
                          : "bg-background text-muted-foreground border-border hover:border-brand-secondary/40 hover:bg-muted/50"
                      }
                    `}
                  >
                    <span className="flex items-center gap-2">
                      <span>🌟</span>
                      <span>All Content</span>
                    </span>
                  </motion.button>

                  {/* Separator */}
                  <div className="w-px h-6 bg-border flex-shrink-0" />

                  {/* Individual Content Type Toggles */}
                  {availableContentTypes.map(type => {
                    const config = contentTypeConfigs.find(c => c.type === type);
                    const isSelected = selectedContentTypes.includes(type);

                    if (!config) return null;

                    return (
                      <motion.button
                        key={type}
                        onClick={() =>
                          handleContentTypeToggle(
                            isSelected ? selectedContentTypes.filter(t => t !== type) : [...selectedContentTypes, type],
                          )
                        }
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`
                          relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border overflow-hidden h-10 whitespace-nowrap
                          ${
                            isSelected
                              ? "bg-brand-secondary text-white border-brand-secondary shadow-md"
                              : "bg-background text-muted-foreground border-border hover:border-brand-secondary/40 hover:bg-muted/50"
                          }
                        `}
                      >
                        <span className="relative flex items-center gap-2">
                          <span>{config.icon}</span>
                          <span>{config.label}</span>
                        </span>
                      </motion.button>
                    );
                  })}

                  {/* Compact Search Bar - Appears when scrolled past original search */}
                  <AnimatePresence>
                    {isScrolledPastSearch && (
                      <motion.div
                        key="compact-search"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 200 }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0"
                      >
                        <CompactSearchBar value={searchQuery} onChange={handleSearchChange} loading={loading} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>

            {/* Active Filters Summary */}
            {activeFilterCount > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mb-6 p-4 bg-muted/30 border border-border/50 rounded-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">
                      {activeFilterCount} filter{activeFilterCount !== 1 ? "s" : ""} applied
                    </span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">
                      {totalResults} result{totalResults !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllFilters}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Clear all
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Sticky Filter Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="lg:col-span-1"
              >
                <div className={`${isScrolledPastHero ? "sticky top-32 z-40" : ""}`}>
                  <FilterPanel
                    filters={filters}
                    onFiltersChange={handleFiltersChange}
                    categories={filterCategories}
                    loading={loading}
                  />
                </div>
              </motion.div>

              {/* Main Content */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="lg:col-span-3"
              >
                {/* Sorting Controls */}
                <div className="mb-8">
                  <SortingControls sortBy={sortBy} onSortChange={handleSortChange} resultsCount={totalResults} />
                </div>

                {/* Blog Grid */}
                <BlogGrid posts={posts} loading={loading} />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Clean CTA Section - No Interactive Effects */}
      <section className="py-16 bg-muted/30 border-t border-border/50 relative z-20">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="mb-6">
              <Zap className="w-12 h-12 mx-auto mb-4 text-brand-secondary" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Ready to Get Similar Results?</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                See how our proven strategies can transform your business. Get a free consultation and discover your
                growth potential.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group relative overflow-hidden">
                <span className="flex items-center space-x-2">
                  <span>Start Your Project</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
              <Button variant="outline" size="lg" className="group">
                <span className="flex items-center space-x-2">
                  <span>View Our Process</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// Loading component for Suspense fallback
function BlogLoadingFallback() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-brand-secondary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading blog content...</p>
      </div>
    </div>
  );
}

export default function BlogPage() {
  return (
    <Suspense fallback={<BlogLoadingFallback />}>
      <BlogContent />
    </Suspense>
  );
}
