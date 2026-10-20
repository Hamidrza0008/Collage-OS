"use client";

import React from "react";
import EventCard from "./EventCard";
import {
  CalendarDays,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export default function EventsGridSection({
  events,
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  currentPage,
  onPageChange,
  onSelectEvent,
  allCount,
  upcomingCount,
  ongoingCount,
  pastCount,
  onOpenMobileFilter,
}) {
  const itemsPerPage = 9;
  const totalPages = Math.ceil(events.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentEvents = events.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-4">
      {/* 1. Header Toolbar: Tabs + Search + Filter Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#E5ECE8] dark:border-[#10372F] pb-3">
        {/* Left Category Tabs matching screenshot */}
        <div className="flex items-center gap-6 overflow-x-auto scrollbar-none">
          {/* All Events 12 */}
          <button
            onClick={() => onTabChange("all")}
            className={`flex items-center gap-2 pb-2 text-[14px] transition-all relative whitespace-nowrap cursor-pointer ${
              activeTab === "all"
                ? "text-[#159B72] font-semibold"
                : "text-[#658278] dark:text-[#789991] hover:text-[#0B3024] font-medium"
            }`}
          >
            <CalendarDays className="w-4 h-4" />
            <span>All Events</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full transition-colors ${
                activeTab === "all"
                  ? "bg-[#E8F7F0] dark:bg-[#073629] text-[#159B72] font-semibold"
                  : "bg-gray-100 dark:bg-[#082A24] text-[#658278] dark:text-[#789991] font-normal"
              }`}
            >
              {allCount}
            </span>
            {activeTab === "all" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#159B72] rounded-full" />
            )}
          </button>

          {/* Upcoming 8 */}
          <button
            onClick={() => onTabChange("upcoming")}
            className={`flex items-center gap-2 pb-2 text-[14px] transition-all relative whitespace-nowrap cursor-pointer ${
              activeTab === "upcoming"
                ? "text-[#159B72] font-semibold"
                : "text-[#658278] dark:text-[#789991] hover:text-[#0B3024] font-medium"
            }`}
          >
            <span>Upcoming</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full transition-colors ${
                activeTab === "upcoming"
                  ? "bg-[#E8F7F0] dark:bg-[#073629] text-[#159B72] font-semibold"
                  : "bg-gray-100 dark:bg-[#082A24] text-[#658278] dark:text-[#789991] font-normal"
              }`}
            >
              {upcomingCount}
            </span>
            {activeTab === "upcoming" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#159B72] rounded-full" />
            )}
          </button>

          {/* Ongoing 2 */}
          <button
            onClick={() => onTabChange("ongoing")}
            className={`flex items-center gap-2 pb-2 text-[14px] transition-all relative whitespace-nowrap cursor-pointer ${
              activeTab === "ongoing"
                ? "text-[#159B72] font-semibold"
                : "text-[#658278] dark:text-[#789991] hover:text-[#0B3024] font-medium"
            }`}
          >
            <span>Ongoing</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full transition-colors ${
                activeTab === "ongoing"
                  ? "bg-[#E8F7F0] dark:bg-[#073629] text-[#159B72] font-semibold"
                  : "bg-gray-100 dark:bg-[#082A24] text-[#658278] dark:text-[#789991] font-normal"
              }`}
            >
              {ongoingCount}
            </span>
            {activeTab === "ongoing" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#159B72] rounded-full" />
            )}
          </button>

          {/* Past 2 */}
          <button
            onClick={() => onTabChange("past")}
            className={`flex items-center gap-2 pb-2 text-[14px] transition-all relative whitespace-nowrap cursor-pointer ${
              activeTab === "past"
                ? "text-[#159B72] font-semibold"
                : "text-[#658278] dark:text-[#789991] hover:text-[#0B3024] font-medium"
            }`}
          >
            <span>Past</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full transition-colors ${
                activeTab === "past"
                  ? "bg-[#E8F7F0] dark:bg-[#073629] text-[#159B72] font-semibold"
                  : "bg-gray-100 dark:bg-[#082A24] text-[#658278] dark:text-[#789991] font-normal"
              }`}
            >
              {pastCount}
            </span>
            {activeTab === "past" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#159B72] rounded-full" />
            )}
          </button>
        </div>

        {/* Right Search Input & Filter toggle */}
        <div className="flex items-center gap-2.5">
          <div className="relative w-full sm:w-64 md:w-72">
            <Search className="w-4 h-4 text-[#658278] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search events..."
              className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-[13px] rounded-xl border border-[#E5ECE8] dark:border-[#10372F] bg-white dark:bg-[#06241F] text-[#0B3024] dark:text-[#F1FAF6] placeholder:text-[#658278]/60 focus:outline-none focus:border-[#159B72] transition-colors"
            />
          </div>

          <button
            type="button"
            onClick={onOpenMobileFilter}
            title="Filter options"
            className="p-2 rounded-xl border border-[#E5ECE8] dark:border-[#10372F] bg-white dark:bg-[#06241F] text-[#658278] hover:text-[#159B72] hover:border-[#159B72] transition-colors cursor-pointer shrink-0"
          >
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Grid of 3 columns x 3 rows = 9 cards on Page 1 */}
      {currentEvents.length === 0 ? (
        <div className="bg-white dark:bg-[#06241F] rounded-2xl border border-[#E5ECE8] dark:border-[#10372F] p-12 text-center">
          <div className="w-12 h-12 rounded-full bg-[#E8F7F0] text-[#159B72] flex items-center justify-center mx-auto mb-3">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
            No events match your criteria
          </h3>
          <p className="text-xs text-[#658278] dark:text-[#789991] mt-1 max-w-sm mx-auto">
            Try adjusting your search query, event category, or date range filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {currentEvents.map((evt) => (
            <EventCard key={evt.id} event={evt} onSelect={onSelectEvent} />
          ))}
        </div>
      )}

      {/* 3. Pagination Footer matching screenshot: Showing 1–9 of 12 events */}
      {events.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 text-xs text-[#658278] dark:text-[#789991]">
          <div>
            Showing{" "}
            <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
              {startIndex + 1}–{Math.min(startIndex + itemsPerPage, events.length)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
              {events.length} events
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="w-7 h-7 rounded-lg border border-[#E5ECE8] dark:border-[#10372F] bg-white dark:bg-[#06241F] flex items-center justify-center text-[#658278] hover:text-[#0B3024] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`w-7 h-7 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  currentPage === pageNum
                    ? "bg-[#159B72] text-white shadow-xs"
                    : "border border-[#E5ECE8] dark:border-[#10372F] bg-white dark:bg-[#06241F] text-[#658278] dark:text-[#789991] hover:bg-[#F1F8F5] dark:hover:bg-[#082A24] hover:text-[#0B3024]"
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="w-7 h-7 rounded-lg border border-[#E5ECE8] dark:border-[#10372F] bg-white dark:bg-[#06241F] flex items-center justify-center text-[#658278] hover:text-[#0B3024] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              aria-label="Next page"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
