// useBlogSystem Hook - Centralized Blog State Management

"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { defaultFilterState, mockBlogPosts } from "@/data/mockBlogData";
import { type BlogPost, type ContentType, type FilterState, type SortOption } from "@/types/blog";

// useBlogSystem Hook - Centralized Blog State Management

// useBlogSystem Hook - Centralized Blog State Management

// useBlogSystem Hook - Centralized Blog State Management

// useBlogSystem Hook - Centralized Blog State Management

// useBlogSystem Hook - Centralized Blog State Management

// useBlogSystem Hook - Centralized Blog State Management

// useBlogSystem Hook - Centralized Blog State Management

// useBlogSystem Hook - Centralized Blog State Management

// useBlogSystem Hook - Centralized Blog State Management

// useBlogSystem Hook - Centralized Blog State Management

// useBlogSystem Hook - Centralized Blog State Management

// useBlogSystem Hook - Centralized Blog State Management

// useBlogSystem Hook - Centralized Blog State Management

// useBlogSystem Hook - Centralized Blog State Management

// useBlogSystem Hook - Centralized Blog State Management

// useBlogSystem Hook - Centralized Blog State Management

// useBlogSystem Hook - Centralized Blog State Management

// useBlogSystem Hook - Centralized Blog State Management

// useBlogSystem Hook - Centralized Blog State Management

// useBlogSystem Hook - Centralized Blog State Management

// useBlogSystem Hook - Centralized Blog State Management

// useBlogSystem Hook - Centralized Blog State Management

// useBlogSystem Hook - Centralized Blog State Management

// useBlogSystem Hook - Centralized Blog State Management

// useBlogSystem Hook - Centralized Blog State Management

// useBlogSystem Hook - Centralized Blog State Management

// useBlogSystem Hook - Centralized Blog State Management

// useBlogSystem Hook - Centralized Blog State Management

// useBlogSystem Hook - Centralized Blog State Management

// useBlogSystem Hook - Centralized Blog State Management

// useBlogSystem Hook - Centralized Blog State Management

// useBlogSystem Hook - Centralized Blog State Management

// useBlogSystem Hook - Centralized Blog State Management

// useBlogSystem Hook - Centralized Blog State Management

// useBlogSystem Hook - Centralized Blog State Management

// useBlogSystem Hook - Centralized Blog State Management

// useBlogSystem Hook - Centralized Blog State Management

// useBlogSystem Hook - Centralized Blog State Management

// useBlogSystem Hook - Centralized Blog State Management

// useBlogSystem Hook - Centralized Blog State Management

export default function useBlogSystem() {
  const [filters, setFilters] = useState<FilterState>(defaultFilterState);
  const [sortBy, setSortBy] = useState<SortOption>("recent");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContentTypes, setSelectedContentTypes] = useState<ContentType[]>([]);
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Safe search params access - only on client side
  const searchParams = useSearchParams();

  // Set client-side flag
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle URL parameters on component mount - only on client side
  useEffect(() => {
    if (!isClient || !searchParams) return;

    const filterParam = searchParams.get("filter");
    const searchParam = searchParams.get("search");

    if (filterParam === "projects") {
      // Pre-filter for case studies and portfolio projects
      setSelectedContentTypes(["case-study", "portfolio"]);
      setSortBy("impact"); // Sort by impact for project showcase
    } else if (filterParam === "resources") {
      // Pre-filter for resources only
      setSelectedContentTypes(["resource"]);
    } else if (filterParam === "case-studies") {
      // Pre-filter for case studies only
      setSelectedContentTypes(["case-study"]);
      setSortBy("client-success");
    }

    // Handle search parameter
    if (searchParam) {
      setSearchQuery(searchParam.replace(/-/g, " "));
    }
  }, [isClient, searchParams]);

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let filtered = [...mockBlogPosts];

    // Apply content type filters
    if (selectedContentTypes.length > 0) {
      filtered = filtered.filter(post => selectedContentTypes.includes(post.contentType));
    }

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        post =>
          post.title.toLowerCase().includes(query) ||
          post.description.toLowerCase().includes(query) ||
          post.tags.some(tag => tag.toLowerCase().includes(query)) ||
          post.industry.some(industry => industry.toLowerCase().includes(query)) ||
          post.technologies.some(tech => tech.toLowerCase().includes(query)),
      );
    }

    // Apply advanced filters
    if (filters.industries.length > 0) {
      filtered = filtered.filter(post => post.industry.some(industry => filters.industries.includes(industry)));
    }

    if (filters.technologies.length > 0) {
      filtered = filtered.filter(post => post.technologies.some(tech => filters.technologies.includes(tech)));
    }

    if (filters.serviceTypes.length > 0) {
      filtered = filtered.filter(post => post.serviceTypes.some(service => filters.serviceTypes.includes(service)));
    }

    if (filters.resultsCategories.length > 0) {
      filtered = filtered.filter(post =>
        post.resultsCategory.some(category => filters.resultsCategories.includes(category)),
      );
    }

    if (filters.projectSizes.length > 0) {
      filtered = filtered.filter(post => filters.projectSizes.includes(post.projectSize));
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        case "impact":
          return b.impactScore - a.impactScore;
        case "popular":
          return b.viewCount - a.viewCount;
        case "alphabetical":
          return a.title.localeCompare(b.title);
        case "project-size":
          const sizeOrder = { startup: 1, small: 2, "mid-market": 3, enterprise: 4 };
          return (sizeOrder[a.projectSize] || 0) - (sizeOrder[b.projectSize] || 0);
        case "client-success":
          // Sort by client results (sales increase)
          const aResults = a.clientResults?.salesIncrease
            ? parseInt(a.clientResults.salesIncrease.replace(/\D/g, ""))
            : 0;
          const bResults = b.clientResults?.salesIncrease
            ? parseInt(b.clientResults.salesIncrease.replace(/\D/g, ""))
            : 0;
          return bResults - aResults;
        default:
          return 0;
      }
    });

    return filtered;
  }, [mockBlogPosts, selectedContentTypes, searchQuery, filters, sortBy]);

  // Calculate active filter count
  const activeFilterCount = useMemo(() => {
    return (
      Object.entries(filters).reduce((count, [key, value]) => {
        if (key === "searchQuery") return count;
        return count + (Array.isArray(value) ? value.length : 0);
      }, 0) + selectedContentTypes.length
    );
  }, [filters, selectedContentTypes]);

  // Get available content types from posts
  const availableContentTypes: ContentType[] = useMemo(() => {
    const types = Array.from(new Set(mockBlogPosts.map(post => post.contentType)));
    return types.sort();
  }, [mockBlogPosts]);

  // Handlers
  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleSortChange = (newSort: SortOption) => {
    setSortBy(newSort);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleContentTypeToggle = (types: ContentType[]) => {
    setSelectedContentTypes(types);
  };

  const clearAllFilters = () => {
    setFilters(defaultFilterState);
    setSelectedContentTypes([]);
    setSearchQuery("");
  };

  return {
    posts: filteredPosts,
    filters,
    sortBy,
    searchQuery,
    selectedContentTypes,
    loading,
    totalResults: filteredPosts.length,
    activeFilterCount,
    availableContentTypes,
    handleFiltersChange,
    handleSortChange,
    handleSearchChange,
    handleContentTypeToggle,
    clearAllFilters,
  };
}
