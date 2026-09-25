"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ApplicationsPagination({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  pageSize = 6,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  const startIdx = (currentPage - 1) * pageSize + 1;
  const endIdx = Math.min(currentPage * pageSize, totalItems);

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#D8E8E2]/60 dark:border-[#10372F]/60">
      <span className="text-xs text-[#06241F]/60 dark:text-[#D8E8E2]/60">
        Showing <span className="font-semibold text-[#06241F] dark:text-white">{startIdx}</span> –{" "}
        <span className="font-semibold text-[#06241F] dark:text-white">{endIdx}</span> of{" "}
        <span className="font-semibold text-[#06241F] dark:text-white">{totalItems}</span> applications
      </span>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-xl border border-[#D8E8E2] dark:border-[#10372F] bg-white dark:bg-[#06241F] text-[#06241F] dark:text-white hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          title="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {pages.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            className={`w-8 h-8 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              p === currentPage
                ? "bg-[#159B72] text-white dark:bg-[#20D39B] dark:text-[#021512] shadow-2xs"
                : "border border-[#D8E8E2] dark:border-[#10372F] bg-white dark:bg-[#06241F] text-[#06241F]/80 dark:text-[#D8E8E2]/80 hover:bg-black/5 dark:hover:bg-white/5"
            }`}
          >
            {p}
          </button>
        ))}

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-xl border border-[#D8E8E2] dark:border-[#10372F] bg-white dark:bg-[#06241F] text-[#06241F] dark:text-white hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          title="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
