"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function FeedPagination({
  currentPage,
  totalItems,
  pageSize = 6,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalItems / pageSize);

  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Generate page numbers array
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 pb-1">
      {/* Items count indicator */}
      <span className="text-xs font-medium text-[#658278] dark:text-[#789991]">
        Showing <strong className="text-[#0B3024] dark:text-[#F1FAF6]">{startItem}–{endItem}</strong> of{" "}
        <strong className="text-[#0B3024] dark:text-[#F1FAF6]">{totalItems}</strong> posts
      </span>

      {/* Pagination Controls */}
      <div className="flex items-center gap-1.5">
        {/* Previous Button */}
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#06241F] text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#F1F8F5] dark:hover:bg-[#082A24] transition-colors cursor-pointer select-none"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Previous</span>
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {pages.map((page) => {
            const isActive = currentPage === page;
            return (
              <button
                key={page}
                type="button"
                onClick={() => onPageChange(page)}
                className={`w-8 h-8 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer select-none flex items-center justify-center ${
                  isActive
                    ? "bg-[#159B72] text-white shadow-xs"
                    : "border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#06241F] text-[#36594C] dark:text-[#B5CCC5] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-[#F1F8F5] dark:hover:bg-[#082A24]"
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
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#06241F] text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#F1F8F5] dark:hover:bg-[#082A24] transition-colors cursor-pointer select-none"
        >
          <span>Next</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
