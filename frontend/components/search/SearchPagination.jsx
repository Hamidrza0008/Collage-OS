"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SearchPagination({
  currentPage = 1,
  totalItems = 0,
  pageSize = 6,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalItems / pageSize);

  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-[#E8F1ED] dark:border-[#10372F] px-1 text-xs">
      <span className="text-[#5C786E] dark:text-[#8AA89F] font-medium">
        Showing <strong className="text-[#0B3024] dark:text-[#F1FAF6]">{startItem}–{endItem}</strong> of <strong className="text-[#0B3024] dark:text-[#F1FAF6]">{totalItems}</strong> results
      </span>

      <div className="flex items-center gap-1.5 self-center sm:self-auto">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="p-1.5 rounded-lg border border-[#D8E8E2] dark:border-[#16463D] bg-[#FFFFFF] dark:bg-[#021512] text-[#0B3024] dark:text-[#F1FAF6] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#F1F8F5] transition-colors cursor-pointer"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {Array.from({ length: totalPages }).map((_, idx) => {
          const pageNum = idx + 1;
          const isActive = pageNum === currentPage;

          // Limit displayed buttons if more than 5 pages
          if (
            totalPages > 5 &&
            pageNum !== 1 &&
            pageNum !== totalPages &&
            Math.abs(pageNum - currentPage) > 1
          ) {
            if (Math.abs(pageNum - currentPage) === 2) {
              return (
                <span key={pageNum} className="px-1 text-gray-400">
                  ...
                </span>
              );
            }
            return null;
          }

          return (
            <button
              key={pageNum}
              type="button"
              onClick={() => onPageChange(pageNum)}
              className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? "bg-[#159B72] text-white shadow-xs"
                  : "bg-[#FFFFFF] dark:bg-[#021512] text-[#36594C] dark:text-[#B5CCC5] border border-[#D8E8E2] dark:border-[#16463D] hover:bg-[#F1F8F5]"
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="p-1.5 rounded-lg border border-[#D8E8E2] dark:border-[#16463D] bg-[#FFFFFF] dark:bg-[#021512] text-[#0B3024] dark:text-[#F1FAF6] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#F1F8F5] transition-colors cursor-pointer"
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
