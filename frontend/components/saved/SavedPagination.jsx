"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SavedPagination({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  pageSize = 6,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  const startItem = Math.min((currentPage - 1) * pageSize + 1, totalItems);
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }
    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 mt-6 border-t border-[#E8F1ED] dark:border-[#10372F]/60 text-xs">
      <span className="text-[#658278] dark:text-[#789991] font-medium">
        Showing <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6]">{startItem}</span>–
        <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6]">{endItem}</span> of{" "}
        <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6]">{totalItems}</span> saved items
      </span>

      <div className="flex items-center gap-1.5">
        {/* Previous Button */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#06241F] text-[#0B3024] dark:text-[#F1FAF6] font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-xs"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Previous</span>
        </button>

        {/* Page Number Buttons */}
        <div className="hidden sm:flex items-center gap-1">
          {getPageNumbers().map((page, idx) => {
            if (page === "...") {
              return (
                <span key={`dots-${idx}`} className="px-2 py-1 text-gray-400">
                  ...
                </span>
              );
            }

            const isCurrent = page === currentPage;
            return (
              <button
                key={page}
                type="button"
                onClick={() => onPageChange(page)}
                className={`w-8 h-8 rounded-xl font-bold transition-colors cursor-pointer flex items-center justify-center ${
                  isCurrent
                    ? "bg-[#159B72] text-white shadow-xs"
                    : "bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] hover:bg-emerald-50 dark:hover:bg-emerald-950/40"
                }`}
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
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#06241F] text-[#0B3024] dark:text-[#F1FAF6] font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-xs"
        >
          <span>Next</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
