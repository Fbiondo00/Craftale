// Blog System Types - Based on blog-analysis.txt specifications

export type ContentType = "case-study" | "portfolio" | "resource" | "process" | "spotlight";
export type ProjectSize = "small" | "mid-market" | "enterprise" | "startup";
export type PostStatus = "draft" | "published" | "archived";

export interface ClientResults {
  salesIncrease?: string;
  conversionIncrease?: string;
  trafficGrowth?: string;
  performanceImprovement?: string;
}

export interface SEOMetadata {
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
  slug: string;
}

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  featuredImage: string;
  publishedAt: Date;
  updatedAt: Date;
  status: PostStatus;

  // Content Classification
  contentType: ContentType;

  // Filtering Metadata
  tags: string[];
  industry: string[];
  technologies: string[];
  serviceTypes: string[];
  resultsCategory: string[];
  projectSize: ProjectSize;

  // Metrics for Sorting
  viewCount: number;
  engagementScore: number;
  impactScore: number;

  // Client Results (for case studies)
  clientResults?: ClientResults;

  // SEO Metadata
  seo: SEOMetadata;
}

// Filter State Management
export interface FilterState {
  contentTypes: ContentType[];
  industries: string[];
  technologies: string[];
  serviceTypes: string[];
  resultsCategories: string[];
  projectSizes: ProjectSize[];
  searchQuery: string;
}

// Sorting Options
export type SortOption = "recent" | "impact" | "popular" | "alphabetical" | "project-size" | "client-success";

// Filter Categories for UI
export interface FilterCategory {
  key: string;
  label: string;
  options: FilterOption[];
}

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
  color?: string;
}

// Content Type Configuration
export interface ContentTypeConfig {
  type: ContentType;
  label: string;
  description: string;
  icon: string;
  gradientFrom: string;
  gradientTo: string;
  defaultFilters?: Partial<FilterState>;
}

// Blog Component Props
export interface BlogGridProps {
  posts: BlogPost[];
  loading?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

export interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
  compact?: boolean;
}

export interface FilterPanelProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  categories: FilterCategory[];
  loading?: boolean;
}

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  loading?: boolean;
}

export interface SortingControlsProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  resultsCount: number;
}

// Content Type Toggle Props
export interface ContentTypeToggleProps {
  contentTypes: ContentType[];
  selectedTypes: ContentType[];
  onToggle: (types: ContentType[]) => void;
  configs: ContentTypeConfig[];
}
