// BlogCard Component - Staggered Layout Optimized Design

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Eye, TrendingUp, ArrowRight } from 'lucide-react';
import { type BlogPost } from '@/types/blog';
import { contentTypeConfigs } from '@/data/mockBlogData';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
  compact?: boolean;
}

export default function BlogCard({ post, featured = false, compact = false }: BlogCardProps) {
  const config = contentTypeConfigs.find(c => c.type === post.contentType);
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.3 }}
      className="group h-full"
    >
      <Link href={`/blog/${post.seo.slug}`}>
        <div className="relative bg-background rounded-xl shadow-sm border border-border overflow-hidden transition-all duration-300 ease-out hover:shadow-lg hover:border-border/80 group-hover:bg-muted/20 h-full flex flex-col">
          
          {/* Featured Image */}
          <div className="relative">
            <div className="aspect-video relative overflow-hidden rounded-t-xl">
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              
              {/* Subtle Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Content Type Badge */}
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-background/95 backdrop-blur-sm rounded-full border border-border/50 text-foreground">
                  <span>{config?.icon}</span>
                  {config?.label}
                </span>
              </div>

              {/* Results Badge (for case studies) */}
              {post.clientResults?.salesIncrease && (
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold bg-color-state-success-strong text-white rounded-full">
                    <TrendingUp className="w-3 h-3" />
                    {post.clientResults.salesIncrease}
                  </span>
                </div>
              )}

              {/* High Impact Indicator */}
              {post.impactScore > 90 && (
                <div className="absolute bottom-4 right-4">
                  <div className="w-8 h-8 bg-brand-secondary rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
                    {post.impactScore}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Content - Flexible */}
          <div className="p-6 space-y-4 flex-1 flex flex-col">
            {/* Title */}
            <h3 className="font-bold text-foreground leading-tight group-hover:text-brand-secondary transition-colors duration-300 text-lg">
              {post.title}
            </h3>

            {/* Description - Flexible length */}
            <p className="text-muted-foreground leading-relaxed text-sm flex-1">
              {post.description}
            </p>

            {/* Tags - Compact */}
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2.5 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full hover:bg-muted/80 transition-colors"
                >
                  {tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full">
                  +{post.tags.length - 3}
                </span>
              )}
            </div>

            {/* Technology Stack (for portfolio and case studies) - Compact */}
            {(post.contentType === 'portfolio' || post.contentType === 'case-study') && post.technologies.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">Built with:</div>
                <div className="flex flex-wrap gap-1">
                  {post.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-brand-secondary/10 text-brand-secondary rounded border border-brand-secondary/30"
                    >
                      {tech}
                    </span>
                  ))}
                  {post.technologies.length > 3 && (
                    <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-muted text-muted-foreground rounded border">
                      +{post.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Client Results - Inline Display */}
            {post.clientResults && (
              <div className="flex flex-wrap gap-2 text-xs">
                {post.clientResults.salesIncrease && (
                  <div className="inline-flex items-center gap-1 px-2 py-1 bg-color-state-success-bg text-color-state-success-text rounded-full border border-color-state-success-border">
                    <TrendingUp className="w-3 h-3" />
                    <span className="font-medium">{post.clientResults.salesIncrease}</span>
                  </div>
                )}
                {post.clientResults.conversionIncrease && (
                  <div className="inline-flex items-center gap-1 px-2 py-1 bg-color-state-info-bg text-color-state-info-text rounded-full border border-color-state-info-border">
                    <TrendingUp className="w-3 h-3" />
                    <span className="font-medium">{post.clientResults.conversionIncrease}</span>
                  </div>
                )}
              </div>
            )}

            {/* Metadata Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-border/50 mt-auto">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.publishedAt)}
                </div>
                <div className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4" />
                  {post.viewCount.toLocaleString()}
                </div>
              </div>

              {/* Read More Indicator */}
              <div className="flex items-center gap-1 text-sm font-medium text-brand-secondary group-hover:text-brand-secondary transition-colors">
                Read
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
} 