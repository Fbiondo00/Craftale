// BlogGrid Component - Clean Staggered Layout Design

"use client";

import BlogCard from "./BlogCard";
import { type BlogGridProps } from "@/types/blog";
import { motion } from "framer-motion";
import { FileX } from "lucide-react";

// BlogGrid Component - Clean Staggered Layout Design

// BlogGrid Component - Clean Staggered Layout Design

// BlogGrid Component - Clean Staggered Layout Design

// BlogGrid Component - Clean Staggered Layout Design

// BlogGrid Component - Clean Staggered Layout Design

// BlogGrid Component - Clean Staggered Layout Design

// BlogGrid Component - Clean Staggered Layout Design

// BlogGrid Component - Clean Staggered Layout Design

// BlogGrid Component - Clean Staggered Layout Design

// BlogGrid Component - Clean Staggered Layout Design

// BlogGrid Component - Clean Staggered Layout Design

// BlogGrid Component - Clean Staggered Layout Design

// BlogGrid Component - Clean Staggered Layout Design

// BlogGrid Component - Clean Staggered Layout Design

// BlogGrid Component - Clean Staggered Layout Design

// BlogGrid Component - Clean Staggered Layout Design

// BlogGrid Component - Clean Staggered Layout Design

// BlogGrid Component - Clean Staggered Layout Design

// BlogGrid Component - Clean Staggered Layout Design

// BlogGrid Component - Clean Staggered Layout Design

// BlogGrid Component - Clean Staggered Layout Design

// BlogGrid Component - Clean Staggered Layout Design

// BlogGrid Component - Clean Staggered Layout Design

// BlogGrid Component - Clean Staggered Layout Design

// BlogGrid Component - Clean Staggered Layout Design

// BlogGrid Component - Clean Staggered Layout Design

// BlogGrid Component - Clean Staggered Layout Design

// BlogGrid Component - Clean Staggered Layout Design

// BlogGrid Component - Clean Staggered Layout Design

// BlogGrid Component - Clean Staggered Layout Design

// BlogGrid Component - Clean Staggered Layout Design

// BlogGrid Component - Clean Staggered Layout Design

// BlogGrid Component - Clean Staggered Layout Design

// BlogGrid Component - Clean Staggered Layout Design

// BlogGrid Component - Clean Staggered Layout Design

// BlogGrid Component - Clean Staggered Layout Design

// BlogGrid Component - Clean Staggered Layout Design

// BlogGrid Component - Clean Staggered Layout Design

// BlogGrid Component - Clean Staggered Layout Design

// BlogGrid Component - Clean Staggered Layout Design

export default function BlogGrid({ posts, loading }: BlogGridProps) {
  if (loading) {
    return (
      <div className="space-y-8">
        {/* Loading Skeleton - Clean Staggered */}
        <div className="relative">
          {/* Container with top/bottom spacing for middle column offset */}
          <div className="pt-0 pb-32">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`
                    bg-background border border-border rounded-xl p-6 space-y-4 h-96
                    ${i % 3 === 1 ? "lg:mt-32" : ""}
                  `}
                >
                  {/* Image Skeleton */}
                  <div className="w-full h-48 bg-muted rounded-lg animate-pulse" />

                  {/* Content Skeleton */}
                  <div className="space-y-3">
                    <div className="h-4 bg-muted rounded w-24 animate-pulse" />
                    <div className="h-6 bg-muted rounded w-3/4 animate-pulse" />
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded animate-pulse" />
                      <div className="h-4 bg-muted rounded w-5/6 animate-pulse" />
                    </div>
                    <div className="flex gap-2">
                      <div className="h-6 bg-muted rounded-full w-16 animate-pulse" />
                      <div className="h-6 bg-muted rounded-full w-20 animate-pulse" />
                      <div className="h-6 bg-muted rounded-full w-14 animate-pulse" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
        <div className="mx-auto w-24 h-24 bg-muted/50 rounded-full flex items-center justify-center mb-6">
          <FileX className="w-10 h-10 text-muted-foreground" />
        </div>

        <h3 className="text-xl font-semibold text-foreground mb-2">No content found</h3>

        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          We couldn&apos;t find any content matching your current filters. Try adjusting your search criteria or browse
          all content.
        </p>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Try searching for:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {["case studies", "portfolio", "web design", "conversion optimization"].map(term => (
              <span
                key={term}
                className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm hover:bg-muted/80 cursor-pointer transition-colors"
              >
                {term}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  // Create columns for clean staggered layout
  const createColumns = (posts: any[], columnCount: number) => {
    const columns: any[][] = Array.from({ length: columnCount }, () => []);

    posts.forEach((post, index) => {
      const columnIndex = index % columnCount;
      columns[columnIndex].push(post);
    });

    return columns;
  };

  // Responsive column counts - Maximum 3 columns
  const mobileColumns = createColumns(posts, 1);
  const tabletColumns = createColumns(posts, 2);
  const desktopColumns = createColumns(posts, 3);

  // Calculate the offset for middle column (1/3 of average card height)
  const middleColumnOffset = "8rem"; // Approximately 1/3 of card height (128px)

  return (
    <div className="space-y-8">
      {/* Clean Staggered Grid */}
      <div className="w-full">
        {/* Mobile - Single Column */}
        <div className="block md:hidden">
          <div className="space-y-6">
            {mobileColumns[0]?.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <BlogCard post={post} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tablet - Two Columns */}
        <div className="hidden md:block lg:hidden">
          <div className="grid grid-cols-2 gap-6">
            {tabletColumns.map((column, columnIndex) => (
              <div key={columnIndex} className="space-y-6">
                {column.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (columnIndex * column.length + index) * 0.1 }}
                  >
                    <BlogCard post={post} />
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Desktop - Clean Staggered Three Columns */}
        <div className="hidden lg:block">
          {/* Container with spacing for middle column offset */}
          <div className="relative" style={{ paddingBottom: middleColumnOffset }}>
            <div className="grid grid-cols-3 gap-6">
              {desktopColumns.map((column, columnIndex) => (
                <div
                  key={columnIndex}
                  className={`space-y-6 ${columnIndex === 1 ? "relative" : ""}`}
                  style={columnIndex === 1 ? { marginTop: middleColumnOffset } : {}}
                >
                  {column.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: (columnIndex * column.length + index) * 0.08 }}
                    >
                      <BlogCard post={post} />
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Performance Stats */}
      {posts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="pt-8 border-t border-border/50"
        >
          <div className="text-center text-sm text-muted-foreground">
            <p>
              Showing {posts.length} of our best {posts.length === 1 ? "piece" : "pieces"} of content •
              <span className="ml-1 font-medium text-foreground">
                {posts.filter(p => p.clientResults).length} with proven results
              </span>
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
