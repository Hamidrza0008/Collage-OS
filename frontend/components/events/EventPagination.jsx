"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function EventPagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage = 6,
  onPageChange,
}) {
  if (totalItems <= itemsPerPage || totalPages <= 1) {
    return null;
  }

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate page numbers array
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="w-full pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 select-none">
      {/* Helper text */}
      <div className="text-xs text-[#55786B] dark:text-[#8FAFA4] font-medium">
        Showing{" "}
        <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6]">
          {startItem}–{endItem}
        </span>{" "}
        of{" "}
        <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6]">
          {totalItems}
        </span>{" "}
        events
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-1.5 self-center sm:self-auto">
        {/* Previous Button */}
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
            currentPage === 1
              ? "opacity-40 cursor-not-allowed text-gray-400 dark:text-[#45695E]"
              : "text-[#36594C] dark:text-[#B5CCC5] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-[#DDF4EB]/50 dark:hover:bg-[#082A24]"
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        {/* Page Number Pills */}
        <div className="flex items-center gap-1">
          {pages.map((p) => {
            const isActive = p === currentPage;
            return (
              <button
                key={p}
                type="button"
                onClick={() => onPageChange(p)}
                className={`w-8 h-8 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer flex items-center justify-center ${
                  isActive
                    ? "bg-[#159B72] text-white shadow-xs"
                    : "text-[#36594C] dark:text-[#B5CCC5] hover:bg-[#DDF4EB]/50 dark:hover:bg-[#082A24]"
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
            currentPage === totalPages
              ? "opacity-40 cursor-not-allowed text-gray-400 dark:text-[#45695E]"
              : "text-[#36594C] dark:text-[#B5CCC5] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-[#DDF4EB]/50 dark:hover:bg-[#082A24]"
          }`}
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
