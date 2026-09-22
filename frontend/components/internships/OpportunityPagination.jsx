"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function OpportunityPagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage = 4,
  onPageChange,
  sectionName = "opportunities",
}) {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2.5 pt-3 pb-1 border-t border-[#E8F1ED] dark:border-[#10372F] transition-colors">
      <span className="text-xs text-[#55786B] dark:text-[#8FAFA4]">
        Showing <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6]">{startItem}–{endItem}</span> of{" "}
        <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6]">{totalItems}</span> {sectionName}
      </span>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-semibold transition-all ${
            currentPage === 1
              ? "opacity-40 cursor-not-allowed text-[#658278] dark:text-[#789991]"
              : "text-[#0B3024] dark:text-[#F1FAF6] bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] hover:bg-[#EBF7F2] dark:hover:bg-[#082A24] cursor-pointer shadow-2xs"
          }`}
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Previous</span>
        </button>

        <div className="flex items-center gap-1">
          {pages.map((p) => {
            const isActive = p === currentPage;
            return (
              <button
                key={p}
                type="button"
                onClick={() => onPageChange(p)}
                className={`w-7 h-7 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#159B72] text-white shadow-xs"
                    : "bg-white dark:bg-[#06241F] text-[#426659] dark:text-[#9FBDB4] border border-[#D8E8E2] dark:border-[#16463D] hover:bg-[#F1F8F5] dark:hover:bg-[#082A24]"
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
          className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-semibold transition-all ${
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
