"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function MyReportsPagination({
  currentPage,
  totalItems,
  pageSize = 6,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalItems / pageSize) || 1;

  if (totalPages <= 1) {
    return null;
  }

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Generate page numbers
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[#D8E8E2] dark:border-[#16463D]">
      <span className="text-xs text-[#55786B] dark:text-[#9FB7AD]">
        Showing <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6]">{startItem}</span> to{" "}
        <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6]">{endItem}</span> of{" "}
        <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6]">{totalItems}</span> cases
      </span>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#06241F] text-[#0B3024] dark:text-[#F1FAF6] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-[#082A24] transition-all cursor-pointer shadow-2xs"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Previous</span>
        </button>

        <div className="flex items-center gap-1">
          {pages.map((p) => {
            const isCurrent = p === currentPage;
            return (
              <button
                key={p}
                type="button"
                onClick={() => onPageChange(p)}
                className={`w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                  isCurrent
                    ? "bg-[#159B72] text-white shadow-2xs"
                    : "text-[#55786B] dark:text-[#9FB7AD] hover:bg-gray-100 dark:hover:bg-[#082A24]"
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#06241F] text-[#0B3024] dark:text-[#F1FAF6] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-[#082A24] transition-all cursor-pointer shadow-2xs"
        >
          <span>Next</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
