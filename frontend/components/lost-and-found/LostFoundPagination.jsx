"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function LostFoundPagination({
  currentPage = 1,
  totalItems = 0,
  pageSize = 6,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalItems / pageSize);

  // If filtered results <= 6, DO NOT show pagination (as instructed in Rule 20)
  if (totalItems <= pageSize) {
    return null;
  }

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Generate page numbers array
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 pb-1 border-t border-[#D8E8E2] dark:border-[#16463D]">
      {/* Helper Counter Text */}
      <p className="text-xs text-[#658278] dark:text-[#789991]">
        Showing <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6]">{startItem}–{endItem}</span> of{" "}
        <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6]">{totalItems}</span> items
      </p>

      {/* Pagination Navigation */}
      <div className="flex items-center gap-1.5">
        {/* Previous Button */}
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
            currentPage <= 1
              ? "opacity-40 cursor-not-allowed bg-transparent text-gray-400 border-gray-200 dark:border-gray-800"
              : "bg-white dark:bg-[#06241F] text-[#36594C] dark:text-[#B5CCC5] border-[#D8E8E2] dark:border-[#16463D] hover:border-[#159B72]/60 hover:bg-[#F1F8F5] dark:hover:bg-[#082A24]"
          }`}
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Previous</span>
        </button>

        {/* Page Number Pills */}
        <div className="flex items-center gap-1">
          {pages.map((pageNum) => {
            const isActive = currentPage === pageNum;
            return (
              <button
                key={pageNum}
                type="button"
                onClick={() => onPageChange(pageNum)}
                className={`w-8 h-8 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                  isActive
                    ? "bg-[#159B72] text-white shadow-xs"
                    : "bg-white dark:bg-[#06241F] text-[#36594C] dark:text-[#B5CCC5] border border-[#D8E8E2] dark:border-[#16463D] hover:bg-[#F1F8F5] dark:hover:bg-[#082A24]"
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
            currentPage >= totalPages
              ? "opacity-40 cursor-not-allowed bg-transparent text-gray-400 border-gray-200 dark:border-gray-800"
              : "bg-white dark:bg-[#06241F] text-[#36594C] dark:text-[#B5CCC5] border-[#D8E8E2] dark:border-[#16463D] hover:border-[#159B72]/60 hover:bg-[#F1F8F5] dark:hover:bg-[#082A24]"
          }`}
        >
          <span>Next</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
