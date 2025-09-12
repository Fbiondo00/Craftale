"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowRight, Heart, Menu, Search, ShoppingBag, Star, User } from "lucide-react";

interface MobileWebsiteSimulationProps {
  scrollProgress?: number; // 0 to 1, where 1 means fully scrolled
}

export default function MobileWebsiteSimulation({ scrollProgress = 0 }: MobileWebsiteSimulationProps) {
  // Track liked items for heart animation
  const [likedItems, setLikedItems] = useState<Set<number>>(new Set());

  // Refs for dynamic measurement
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [scrollDistance, setScrollDistance] = useState(210); // Default with 10% more distance for full visibility

  // Dynamically calculate scroll distance with ResizeObserver and fallbacks
  useEffect(() => {
    const calculateScrollDistance = () => {
      if (containerRef.current && gridRef.current) {
        const containerHeight = containerRef.current.offsetHeight;
        const gridHeight = gridRef.current.scrollHeight;
        // Add extra distance to ensure full visibility and allow overshoot
        const distance = Math.max(0, gridHeight - containerHeight);
        const adjustedDistance = distance * 0.9; // ADJUSTABLE: Increase for more scroll range (try 1.15, 1.20)
        setScrollDistance(adjustedDistance);
      }
    };

    // Initial calculation
    calculateScrollDistance();

    // Add a small delay for Safari to ensure proper measurement
    const timer = setTimeout(calculateScrollDistance, 100);

    // Setup ResizeObserver for dynamic updates (modern browsers)
    let resizeObserver: ResizeObserver | null = null;
    if (typeof window !== "undefined" && window.ResizeObserver) {
      resizeObserver = new ResizeObserver(calculateScrollDistance);

      if (containerRef.current) resizeObserver.observe(containerRef.current);
      if (gridRef.current) resizeObserver.observe(gridRef.current);
    }

    // Fallback for older browsers (Safari < 13.1, older Android)
    const handleResize = () => {
      calculateScrollDistance();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    // Cleanup
    return () => {
      clearTimeout(timer);
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []); // Setup once on mount
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
    >
      {/* Mobile App Content - No Frame */}
      <div className="relative w-[375px] h-[700px] bg-apty-bg-base rounded-[40px] overflow-hidden shadow-apty-brand-lg border-2 border-apty-border-default">
        {/* Navigation Header */}
        <div className="bg-apty-bg-base border-b border-apty-border-subtle">
          <div className="flex items-center justify-between px-5 py-4">
            <Menu className="w-6 h-6 text-apty-text-primary" />
            <span className="font-semibold text-base text-apty-primary">LUXE</span>
            <div className="flex items-center gap-4">
              <Search className="w-5 h-5 text-apty-text-secondary" />
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-apty-text-secondary" />
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-apty-primary text-apty-text-on-brand text-[10px] rounded-full flex items-center justify-center font-medium">
                  3
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Banner */}
        <div className="relative h-52 bg-apty-primary overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-apty-tertiary/30 to-apty-accent/50" />
          <div className="relative z-10 flex flex-col justify-center h-full px-6">
            <motion.p
              className="text-apty-text-on-brand/90 text-sm font-medium mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              NEW COLLECTION
            </motion.p>
            <motion.h2
              className="text-apty-text-on-brand text-3xl font-bold mb-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Summer Vibes
            </motion.h2>
            <motion.p
              className="text-apty-text-on-brand/80 text-sm mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              Up to 50% off selected items
            </motion.p>
            <motion.button
              className="bg-apty-bg-base text-apty-primary px-5 py-2.5 rounded-full text-sm font-semibold w-fit flex items-center gap-2 hover:bg-apty-bg-hover apty-transition"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Shop Now
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Categories */}
        <div className="px-5 py-4">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {["All", "Women", "Men", "Kids", "Sale"].map((category, i) => (
              <motion.button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap apty-transition ${
                  i === 0
                    ? "bg-apty-primary text-apty-text-on-brand"
                    : "bg-apty-bg-muted text-apty-text-secondary hover:bg-apty-bg-hover"
                }`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + i * 0.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Product Grid - Scrollable Container */}
        <div ref={containerRef} className="relative px-5 pb-20 h-[260px] overflow-hidden">
          <motion.div
            ref={gridRef}
            className="grid grid-cols-2 gap-4"
            style={{ y: scrollProgress * -scrollDistance }}
            transition={{ type: "tween", duration: 0.15, ease: "linear" }}
          >
            {[
              {
                name: "Minimal Tee",
                price: "$42",
                rating: 4.5,
                image: "bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800",
              },
              {
                name: "Denim Jacket",
                price: "$89",
                rating: 4.8,
                image: "bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800",
              },
              {
                name: "Classic Sneakers",
                price: "$79",
                rating: 4.6,
                image: "bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800",
              },
              {
                name: "Leather Bag",
                price: "$149",
                rating: 4.9,
                image: "bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900 dark:to-amber-800",
              },
            ].map((product, i) => (
              <motion.div
                key={i}
                className="bg-apty-bg-base rounded-xl overflow-hidden border border-apty-border-subtle hover:shadow-apty-md apty-transition"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.1 }}
              >
                <div className={`relative h-40 ${product.image}`}>
                  <motion.button
                    className="absolute top-3 right-3 w-8 h-8 bg-apty-bg-base/90 backdrop-blur rounded-full flex items-center justify-center shadow-apty-sm hover:bg-apty-bg-hover apty-transition"
                    onClick={() => {
                      const newLiked = new Set(likedItems);
                      if (likedItems.has(i)) {
                        newLiked.delete(i);
                      } else {
                        newLiked.add(i);
                      }
                      setLikedItems(newLiked);
                    }}
                    whileTap={{ scale: 0.85 }}
                  >
                    <motion.div
                      animate={
                        likedItems.has(i)
                          ? {
                              scale: [1, 1.3, 1],
                            }
                          : {}
                      }
                      transition={{ duration: 0.3 }}
                    >
                      <Heart
                        className={`w-4 h-4 apty-transition ${
                          likedItems.has(i) ? "text-apty-accent fill-apty-accent" : "text-apty-text-secondary"
                        }`}
                      />
                    </motion.div>
                    {likedItems.has(i) && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-apty-accent/30"
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{
                          scale: 2,
                          opacity: 0,
                        }}
                        transition={{ duration: 0.5 }}
                      />
                    )}
                  </motion.button>
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-medium text-apty-text-primary truncate">{product.name}</h3>
                  <div className="flex items-center gap-1 my-2">
                    <div className="flex">
                      {[...Array(5)].map((_, j) => (
                        <Star
                          key={j}
                          className={`w-3 h-3 ${
                            j < Math.floor(product.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "fill-apty-bg-muted text-apty-bg-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-apty-text-secondary">({product.rating})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-apty-primary">{product.price}</span>
                    <button className="w-7 h-7 bg-apty-primary rounded-full flex items-center justify-center hover:bg-apty-primary-hover apty-transition">
                      <span className="text-apty-text-on-brand text-lg">+</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Navigation */}
        <div className="absolute bottom-0 left-0 right-0 bg-apty-bg-base border-t border-apty-border-subtle">
          <div className="flex items-center justify-around py-3">
            {[
              { icon: "home", label: "Home", active: true },
              { icon: "search", label: "Search", active: false },
              { icon: "heart", label: "Wishlist", active: false },
              { icon: "user", label: "Profile", active: false },
            ].map(item => (
              <button key={item.label} className="flex flex-col items-center gap-1 hover:opacity-80 apty-transition">
                <div className={`w-6 h-6 ${item.active ? "text-apty-primary" : "text-apty-text-tertiary"}`}>
                  {item.icon === "home" && (
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                    </svg>
                  )}
                  {item.icon === "search" && <Search className="w-full h-full" />}
                  {item.icon === "heart" && <Heart className="w-full h-full" />}
                  {item.icon === "user" && <User className="w-full h-full" />}
                </div>
                <span
                  className={`text-[10px] ${item.active ? "text-apty-primary font-medium" : "text-apty-text-tertiary"}`}
                >
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
