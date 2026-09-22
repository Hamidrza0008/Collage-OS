"use client";

import { Trophy, ArrowRight, RotateCcw } from "lucide-react";
import OpportunityCard from "./OpportunityCard";
import OpportunityPagination from "./OpportunityPagination";

export default function HackathonsSection({
  hackathons = [],
  currentPage = 1,
  onPageChange,
  onViewDetails,
  onRegister,
  onToggleBookmark,
  savedIds,
  registeredIds,
  onViewAll,
  onResetFilters,
}) {
  const ITEMS_PER_PAGE = 4;
  const totalPages = Math.ceil(hackathons.length / ITEMS_PER_PAGE);
  const safeCurrentPage = totalPages > 0 ? Math.min(currentPage, totalPages) : 1;
  const paginatedItems = hackathons.slice(
    (safeCurrentPage - 1) * ITEMS_PER_PAGE,
    safeCurrentPage * ITEMS_PER_PAGE
  );

  return (
    <div id="hackathons-section" className="space-y-3.5 pt-2">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-[#159B72] dark:text-[#20D39B] flex items-center justify-center shrink-0">
            <Trophy className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-[17px] font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight flex items-center gap-2">
              <span>Hackathons</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-[#159B72] dark:text-[#20D39B] border border-emerald-200/60 dark:border-emerald-800/40">
                {hackathons.length}
              </span>
            </h2>
            <p className="text-xs text-[#55786B] dark:text-[#8FAFA4] mt-0.5">
              Solve real problems, build innovative solutions, and win exciting rewards.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onViewAll}
          className="self-start sm:self-auto text-xs font-bold text-[#159B72] dark:text-[#20D39B] hover:text-[#087A5B] flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>View All</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* 4-Column Card Grid */}
      {paginatedItems.length === 0 ? (
        <div className="w-full py-12 px-4 rounded-2xl bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] flex flex-col items-center justify-center text-center shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-800/40 flex items-center justify-center text-[#159B72]">
            <Trophy className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6] mt-2.5">
            No hackathons found
          </h3>
          <p className="text-xs text-[#55786B] dark:text-[#8FAFA4] mt-1 max-w-xs">
            No hackathons match your active filters or search keyword.
          </p>
          <button
            type="button"
            onClick={onResetFilters}
            className="mt-3 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#159B72] text-white hover:bg-[#087A5B] transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear Filters</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 items-stretch">
          {paginatedItems.map((item) => (
            <OpportunityCard
              key={item.id}
              opportunity={item}
              onViewDetails={onViewDetails}
              onApplyOrRegister={onRegister}
              onToggleBookmark={onToggleBookmark}
              isSaved={savedIds.has(item.id)}
              isAppliedOrRegistered={registeredIds.has(item.id)}
            />
          ))}
        </div>
      )}

      {/* Section Pagination (Only if > 4 items) */}
      {hackathons.length > ITEMS_PER_PAGE && (
        <OpportunityPagination
          currentPage={safeCurrentPage}
          totalPages={totalPages}
          totalItems={hackathons.length}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={onPageChange}
          sectionName="hackathons"
        />
      )}
    </div>
  );
}
