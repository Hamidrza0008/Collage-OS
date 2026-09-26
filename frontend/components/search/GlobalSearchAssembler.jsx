"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertCircle, RotateCcw, Compass } from "lucide-react";
import GlobalSearchHeader from "./GlobalSearchHeader";
import SearchCategoryTabs from "./SearchCategoryTabs";
import SearchFilterBar from "./SearchFilterBar";
import SearchResultsList from "./SearchResultsList";
import SearchEmptyState from "./SearchEmptyState";
import SearchDiscoveryRail from "./SearchDiscoveryRail";
import SearchPagination from "./SearchPagination";
import MobileSearchFilterDrawer from "./MobileSearchFilterDrawer";
import GlobalSearchSkeleton from "./GlobalSearchSkeleton";
import {
  performGlobalSearch,
  ITEMS_PER_PAGE,
} from "./globalSearchData";

const RECENT_SEARCHES_STORAGE_KEY = "college_os_recent_searches";

export default function GlobalSearchAssembler({ initialLoading = false }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read URL params initially
  const initialQuery = searchParams?.get("q") || "";
  const initialType = searchParams?.get("type") || "all";

  const [isLoading, setIsLoading] = useState(initialLoading);
  const [hasError, setHasError] = useState(false);

  // Search query & category
  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState(initialType);

  // Filters & sorting
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [workModeFilter, setWorkModeFilter] = useState("all");
  const [sort, setSort] = useState("relevance");
  const [currentPage, setCurrentPage] = useState(1);

  // Mobile drawer
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Recent searches local persistence
  const [recentSearches, setRecentSearches] = useState([]);

  // Load recent searches from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENT_SEARCHES_STORAGE_KEY);
      if (stored) {
        setRecentSearches(JSON.parse(stored));
      } else {
        // Starter curated searches
        setRecentSearches(["React", "DBMS", "Hackathon", "CSE-302", "Google"]);
      }
    } catch {
      setRecentSearches(["React", "DBMS", "Hackathon"]);
    }
  }, []);

  const saveRecentSearches = (newSearches) => {
    setRecentSearches(newSearches);
    try {
      localStorage.setItem(RECENT_SEARCHES_STORAGE_KEY, JSON.stringify(newSearches));
    } catch {
      // Storage unavailable or disabled
    }
  };

  const addRecentSearch = useCallback(
    (term) => {
      const trimmed = term.trim();
      if (!trimmed || trimmed.length < 2) return;
      setRecentSearches((prev) => {
        const filtered = prev.filter((item) => item.toLowerCase() !== trimmed.toLowerCase());
        const updated = [trimmed, ...filtered].slice(0, 8);
        try {
          localStorage.setItem(RECENT_SEARCHES_STORAGE_KEY, JSON.stringify(updated));
        } catch {}
        return updated;
      });
    },
    []
  );

  const removeRecentSearch = (term) => {
    const updated = recentSearches.filter((item) => item !== term);
    saveRecentSearches(updated);
  };

  const clearRecentSearches = () => {
    saveRecentSearches([]);
  };

  // Sync state with URL changes if user uses browser Back/Forward
  useEffect(() => {
    const urlQuery = searchParams?.get("q") || "";
    const urlType = searchParams?.get("type") || "all";
    if (urlQuery !== query) setQuery(urlQuery);
    if (urlType !== activeCategory) setActiveCategory(urlType);
  }, [searchParams]);

  // Synchronize state back to URL
  const updateUrl = useCallback(
    (newQuery, newType) => {
      const params = new URLSearchParams();
      if (newQuery) params.set("q", newQuery);
      if (newType && newType !== "all") params.set("type", newType);
      const queryString = params.toString();
      const targetUrl = queryString ? `/student/search?${queryString}` : "/student/search";
      router.replace(targetUrl, { scroll: false });
    },
    [router]
  );

  // Perform deterministic search
  const searchResults = useMemo(() => {
    return performGlobalSearch(query, activeCategory, {
      sort,
      departmentFilter,
      workModeFilter,
    });
  }, [query, activeCategory, sort, departmentFilter, workModeFilter]);

  // Paginated slice for single-category views
  const pageSize = ITEMS_PER_PAGE[activeCategory] || 6;
  const paginatedCategoryResults = useMemo(() => {
    if (activeCategory === "all") return searchResults.results;
    const startIndex = (currentPage - 1) * pageSize;
    return searchResults.results.slice(startIndex, startIndex + pageSize);
  }, [searchResults.results, activeCategory, currentPage, pageSize]);

  // Handlers
  const handleQueryChange = (val) => {
    setQuery(val);
    setCurrentPage(1);
    updateUrl(val, activeCategory);
  };

  const handleSearchSubmit = (searchTerm) => {
    const val = (searchTerm !== undefined ? searchTerm : query).trim();
    setQuery(val);
    setCurrentPage(1);
    if (val) {
      addRecentSearch(val);
    }
    updateUrl(val, activeCategory);
  };

  const handleSelectCategory = (catId) => {
    setActiveCategory(catId);
    setCurrentPage(1);
    updateUrl(query, catId);
  };

  const handleSelectDiscovery = (term, type = "all") => {
    setQuery(term);
    setActiveCategory(type);
    setCurrentPage(1);
    addRecentSearch(term);
    updateUrl(term, type);
  };

  const handleResetFilters = () => {
    setDepartmentFilter("all");
    setWorkModeFilter("all");
    setSort("relevance");
    setCurrentPage(1);
  };

  // Loading state
  if (isLoading) {
    return <GlobalSearchSkeleton />;
  }

  // Error state
  if (hasError) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 mb-3 border border-rose-200 dark:border-rose-900">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-lg font-bold text-[#0B3024] dark:text-[#F1FAF6]">
          Search isn&apos;t available right now.
        </h2>
        <p className="text-xs text-[#5C786E] dark:text-[#8AA89F] max-w-sm mt-1">
          An error occurred while connecting to the discovery index. Please try again.
        </p>
        <div className="flex items-center gap-3 mt-4">
          <button
            type="button"
            onClick={() => setHasError(false)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#159B72] text-white hover:bg-[#087A5B] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActiveCategory("all");
              setHasError(false);
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[#F1F8F5] dark:bg-[#06241F] text-[#0B3024] dark:text-[#F1FAF6] border border-[#D8E8E2] dark:border-[#16463D] hover:bg-emerald-50 transition-colors cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Browse College OS</span>
          </button>
        </div>
      </div>
    );
  }

  const hasSearched = Boolean(query && query.trim().length > 0);
  const hasNoMatches = hasSearched && searchResults.totalResults === 0;

  return (
    <div className="w-full min-h-screen pb-12 transition-colors">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* ========================================================================= */}
        {/* MAIN COLUMN (≈ 2/3)                                                       */}
        {/* ========================================================================= */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-4">
          {/* 1. Global Search Header & Prominent Input */}
          <GlobalSearchHeader
            query={query}
            onQueryChange={handleQueryChange}
            onSearchSubmit={handleSearchSubmit}
            totalResults={searchResults.totalResults}
          />

          {/* 2. Top-Level Result Categories */}
          <SearchCategoryTabs
            activeCategory={activeCategory}
            onSelectCategory={handleSelectCategory}
            resultsByCategory={searchResults.resultsByCategory}
            totalResults={searchResults.totalResults}
            hasSearched={hasSearched}
          />

          {/* 3. Search Filter & Sorting Bar (Rendered when results exist) */}
          {hasSearched && searchResults.totalResults > 0 && (
            <SearchFilterBar
              activeCategory={activeCategory}
              totalResults={searchResults.totalResults}
              query={query}
              sort={sort}
              onSortChange={(s) => {
                setSort(s);
                setCurrentPage(1);
              }}
              departmentFilter={departmentFilter}
              onDepartmentChange={(d) => {
                setDepartmentFilter(d);
                setCurrentPage(1);
              }}
              workModeFilter={workModeFilter}
              onWorkModeChange={(w) => {
                setWorkModeFilter(w);
                setCurrentPage(1);
              }}
              onOpenMobileFilters={() => setIsMobileFiltersOpen(true)}
              onResetFilters={handleResetFilters}
            />
          )}

          {/* 4. Results List / Empty State / No Results State */}
          {!hasSearched ? (
            <SearchEmptyState
              isInitialState={true}
              onSelectDiscovery={handleSelectDiscovery}
            />
          ) : hasNoMatches ? (
            <SearchEmptyState
              isInitialState={false}
              query={query}
              onResetFilters={() => {
                setQuery("");
                handleResetFilters();
                updateUrl("", "all");
              }}
            />
          ) : (
            <>
              <SearchResultsList
                activeCategory={activeCategory}
                resultsByCategory={searchResults.resultsByCategory}
                paginatedResults={paginatedCategoryResults}
                onSelectCategory={handleSelectCategory}
                query={query}
              />

              {/* 5. Pagination (for single category views with > items than page size) */}
              {activeCategory !== "all" && searchResults.totalResults > pageSize && (
                <SearchPagination
                  currentPage={currentPage}
                  totalItems={searchResults.totalResults}
                  pageSize={pageSize}
                  onPageChange={(page) => {
                    setCurrentPage(page);
                    window.scrollTo({ top: 120, behavior: "smooth" });
                  }}
                />
              )}
            </>
          )}
        </div>

        {/* ========================================================================= */}
        {/* RIGHT DISCOVERY RAIL (≈ 1/3)                                              */}
        {/* ========================================================================= */}
        <div className="lg:col-span-4 xl:col-span-3">
          <SearchDiscoveryRail
            recentSearches={recentSearches}
            onSelectSearch={(term) => handleSelectDiscovery(term, "all")}
            onRemoveRecentSearch={removeRecentSearch}
            onClearRecentSearches={clearRecentSearches}
          />
        </div>
      </div>

      {/* Mobile Search Filter Drawer */}
      <MobileSearchFilterDrawer
        isOpen={isMobileFiltersOpen}
        onClose={() => setIsMobileFiltersOpen(false)}
        activeCategory={activeCategory}
        departmentFilter={departmentFilter}
        onDepartmentChange={(d) => {
          setDepartmentFilter(d);
          setCurrentPage(1);
        }}
        workModeFilter={workModeFilter}
        onWorkModeChange={(w) => {
          setWorkModeFilter(w);
          setCurrentPage(1);
        }}
        sort={sort}
        onSortChange={(s) => {
          setSort(s);
          setCurrentPage(1);
        }}
        onResetFilters={handleResetFilters}
      />
    </div>
  );
}
