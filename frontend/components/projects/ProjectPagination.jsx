"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProjectPagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage = 9,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate page numbers array (with truncation if > 5 pages)
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

  const pages = getPageNumbers();

  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 pb-1 border-t border-[#E8F1ED] dark:border-[#10372F] transition-colors">
      {/* Helper text: Showing X-Y of Z projects */}
      <span className="text-xs text-[#55786B] dark:text-[#8FAFA4]">
        Showing <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6]">{startItem}–{endItem}</span> of{" "}
        <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6]">{totalItems}</span> projects
      </span>

      {/* Pagination Controls */}
      <div className="flex items-center gap-1.5">
        {/* Previous Button */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            currentPage === 1
              ? "opacity-40 cursor-not-allowed text-[#658278] dark:text-[#789991]"
              : "text-[#0B3024] dark:text-[#F1FAF6] bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] hover:bg-[#EBF7F2] dark:hover:bg-[#082A24] cursor-pointer shadow-2xs"
          }`}
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Previous</span>
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {pages.map((p, idx) => {
            if (p === "...") {
              return (
                <span
                  key={`ellipsis-${idx}`}
                  className="px-2 py-1 text-xs text-[#658278] dark:text-[#789991]"
                >
                  ...
                </span>
              );
            }

            const isActive = p === currentPage;
            return (
              <button
                key={p}
                type="button"
                onClick={() => onPageChange(p)}
                className={`w-8 h-8 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#159B72] text-white shadow-xs"
                    : "bg-white dark:bg-[#06241F] text-[#426659] dark:text-[#9FBDB4] border border-[#D8E8E2] dark:border-[#16463D] hover:bg-[#F1F8F5] dark:hover:bg-[#082A24] hover:text-[#0B3024] dark:hover:text-[#F1FAF6]"
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
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            currentPage === totalPages
              ? "opacity-40 cursor-not-allowed text-[#658278] dark:text-[#789991]"
              : "text-[#0B3024] dark:text-[#F1FAF6] bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] hover:bg-[#EBF7F2] dark:hover:bg-[#082A24] cursor-pointer shadow-2xs"
          }`}
        >
          <span>Next</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
