"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function AssignmentPagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage = 6,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate pagination page list with ellipsis handling
  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 3) {
      return [1, 2, 3, "...", totalPages];
    }
    if (currentPage >= totalPages - 2) {
      return [1, "...", totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, "...", currentPage, "...", totalPages];
  };

  const pages = getPageNumbers();

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-3 sm:p-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 transition-colors">
      {/* Range count indicator */}
      <div className="text-xs text-[#5C786E] dark:text-[#8AA89F] font-medium text-center sm:text-left">
        Showing{" "}
        <span className="font-bold text-[#0B3024] dark:text-[#E2F1EC]">
          {startItem}–{endItem}
        </span>{" "}
        of{" "}
        <span className="font-bold text-[#0B3024] dark:text-[#E2F1EC]">
          {totalItems}
        </span>{" "}
        assignments
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-2">
        {/* Previous Button */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-[#D8E8E2] dark:border-[#10372F] bg-white dark:bg-[#021512] text-xs font-semibold text-[#0B3024] dark:text-[#E2F1EC] disabled:opacity-35 disabled:cursor-not-allowed hover:not-disabled:bg-emerald-50/60 dark:hover:not-disabled:bg-[#082A24] hover:not-disabled:text-emerald-700 dark:hover:not-disabled:text-emerald-400 transition-all cursor-pointer"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Previous</span>
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {pages.map((page, idx) => {
            if (page === "...") {
              return (
                <span
                  key={`ellipsis-${idx}`}
                  className="px-1.5 py-1 text-xs text-gray-400 dark:text-gray-500 font-semibold"
                >
                  ...
                </span>
              );
            }

            const isActive = page === currentPage;

            return (
              <button
                key={page}
                type="button"
                onClick={() => onPageChange(page)}
                className={`min-w-[32px] h-8 px-2 flex items-center justify-center rounded-xl text-xs transition-all cursor-pointer ${
                  isActive
                    ? "bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-500/70 text-emerald-700 dark:text-emerald-400 font-bold shadow-xs"
                    : "border border-gray-200/80 dark:border-[#10372F] bg-white dark:bg-[#021512] text-[#5C786E] dark:text-[#8AA89F] hover:bg-gray-50 dark:hover:bg-[#082A24] font-medium"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-[#D8E8E2] dark:border-[#10372F] bg-white dark:bg-[#021512] text-xs font-semibold text-[#0B3024] dark:text-[#E2F1EC] disabled:opacity-35 disabled:cursor-not-allowed hover:not-disabled:bg-emerald-50/60 dark:hover:not-disabled:bg-[#082A24] hover:not-disabled:text-emerald-700 dark:hover:not-disabled:text-emerald-400 transition-all cursor-pointer"
          aria-label="Next page"
        >
          <span>Next</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
