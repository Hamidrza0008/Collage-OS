"use client";

import { PackageX, SearchX, RotateCcw } from "lucide-react";
import LostFoundCard from "./LostFoundCard";
import LostFoundPagination from "./LostFoundPagination";

export default function LostFoundList({
  items,
  totalItems,
  currentPage,
  pageSize = 6,
  onPageChange,
  onViewDetails,
  onContactOwner,
  activeTab,
  searchQuery,
  onClearFilters,
}) {
  // Empty State Handling
  if (items.length === 0) {
    let emptyTitle = "No items found";
    let emptyDesc = "Try adjusting your filters or search terms to find what you are looking for.";

    if (searchQuery) {
      emptyTitle = `No search results for "${searchQuery}"`;
      emptyDesc = "Check for spelling errors or try searching with more general keywords.";
    } else if (activeTab === "lost") {
      emptyTitle = "No lost items currently listed";
      emptyDesc = "There are no reported lost items matching your current filters.";
    } else if (activeTab === "found") {
      emptyTitle = "No found items currently listed";
      emptyDesc = "No found items match the selected category or filters.";
    }

    return (
      <div className="rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] p-8 text-center flex flex-col items-center justify-center gap-3 shadow-2xs min-h-[280px]">
        <div className="w-14 h-14 rounded-2xl bg-[#DDF4EB] dark:bg-[#123F35] flex items-center justify-center text-[#159B72] dark:text-[#20D39B]">
          {searchQuery ? <SearchX className="w-7 h-7" /> : <PackageX className="w-7 h-7" />}
        </div>
        <div className="max-w-md">
          <h3 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            {emptyTitle}
          </h3>
          <p className="text-xs text-[#55786B] dark:text-[#9FB7AD] mt-1 leading-relaxed">
            {emptyDesc}
          </p>
        </div>
        <button
          type="button"
          onClick={onClearFilters}
          className="mt-2 flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[#159B72] hover:bg-[#0E825E] text-white transition-all cursor-pointer shadow-xs"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Clear All Filters</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3.5">
      {/* List of items */}
      <div className="space-y-3.5">
        {items.map((item) => (
          <LostFoundCard
            key={item.id}
            item={item}
            onViewDetails={onViewDetails}
            onContactOwner={onContactOwner}
          />
        ))}
      </div>

      {/* Real Pagination - max 6 items per page */}
      <LostFoundPagination
        currentPage={currentPage}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={onPageChange}
      />
    </div>
  );
}
