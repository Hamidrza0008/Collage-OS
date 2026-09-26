"use client";

import {
  Bell,
  CheckCircle2,
  AlertCircle,
  Search,
  ChevronLeft,
  ChevronRight,
  FilterX,
} from "lucide-react";
import NotificationCard from "./NotificationCard";

export default function NotificationList({
  groupedNotifications = { today: [], yesterday: [], thisWeek: [], earlier: [] },
  totalCount = 0,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  startIndex = 0,
  endIndex = 0,
  onMarkAsRead,
  onMarkAsUnread,
  onShowToast,
  emptyType = "general",
  searchQuery = "",
  onResetFilters,
}) {
  const groups = [
    { key: "today", title: "Today", items: groupedNotifications.today || [] },
    {
      key: "yesterday",
      title: "Yesterday",
      items: groupedNotifications.yesterday || [],
    },
    {
      key: "thisWeek",
      title: "This Week",
      items: groupedNotifications.thisWeek || [],
    },
    {
      key: "earlier",
      title: "Earlier",
      items: groupedNotifications.earlier || [],
    },
  ];

  const hasAnyItems = groups.some((g) => g.items.length > 0);

  if (!hasAnyItems) {
    let emptyIcon = Bell;
    let emptyTitle = "You're all caught up";
    let emptyMessage = "There are no new notifications in your inbox right now.";

    if (emptyType === "search") {
      emptyIcon = Search;
      emptyTitle = "No matching notifications";
      emptyMessage = `No notifications matched "${searchQuery}". Try using different terms or resetting filters.`;
    } else if (emptyType === "unread") {
      emptyIcon = CheckCircle2;
      emptyTitle = "No unread notifications";
      emptyMessage = "You've read all your campus updates and announcements.";
    } else if (emptyType === "action_required") {
      emptyIcon = AlertCircle;
      emptyTitle = "Nothing needs your attention";
      emptyMessage = "All assignments, forms, and event registrations are currently on track.";
    } else if (emptyType === "category") {
      emptyIcon = FilterX;
      emptyTitle = "No notifications in this category";
      emptyMessage = "No updates found for the selected category filter.";
    }

    const Icon = emptyIcon;

    return (
      <div className="w-full py-16 px-4 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] text-center flex flex-col items-center justify-center">
        <div className="w-12 h-12 rounded-2xl bg-[#DDF3EB] dark:bg-[#073327] flex items-center justify-center text-[#159B72] dark:text-[#20D39B] mb-3 shadow-xs">
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
          {emptyTitle}
        </h3>
        <p className="text-xs sm:text-sm text-[#4A685D] dark:text-[#8BAAA0] max-w-sm mt-1 mb-4 leading-relaxed">
          {emptyMessage}
        </p>
        {onResetFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="px-4 py-2 text-xs font-bold rounded-xl bg-[#159B72] dark:bg-[#20D39B] text-white dark:text-[#021512] hover:bg-[#0E7A58] dark:hover:bg-[#18B885] transition-all shadow-xs cursor-pointer active:scale-95"
          >
            Clear All Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {groups.map((group) => {
        if (group.items.length === 0) return null;

        return (
          <div key={group.key} className="space-y-3">
            {/* Group Header */}
            <div className="flex items-center gap-2 px-1">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-[#658278] dark:text-[#789991]">
                {group.title}
              </h2>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-[#E8F1ED] dark:bg-[#10372F] text-[#36594C] dark:text-[#A3BFB5]">
                {group.items.length}
              </span>
              <div className="flex-1 h-px bg-[#E8F1ED] dark:bg-[#10372F]" />
            </div>

            {/* Notification Cards in Group */}
            <div className="space-y-2.5">
              {group.items.map((item) => (
                <NotificationCard
                  key={item.id}
                  notification={item}
                  onMarkAsRead={onMarkAsRead}
                  onMarkAsUnread={onMarkAsUnread}
                  onShowToast={onShowToast}
                />
              ))}
            </div>
          </div>
        );
      })}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pt-4 border-t border-[#D8E8E2] dark:border-[#10372F] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
          <div className="text-[#658278] dark:text-[#789991]">
            Showing{" "}
            <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
              {startIndex + 1}
            </span>{" "}
            to{" "}
            <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
              {Math.min(endIndex, totalCount)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
              {totalCount}
            </span>{" "}
            notifications
          </div>

          <div className="flex items-center gap-1.5 self-center sm:self-auto">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => onPageChange(currentPage - 1)}
              className="p-1.5 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#06241F] text-[#0B3024] dark:text-[#F1FAF6] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#F1FAF6] dark:hover:bg-[#082A24] transition-colors cursor-pointer"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
              <button
                key={pageNum}
                type="button"
                onClick={() => onPageChange(pageNum)}
                className={`w-7 h-7 rounded-xl font-bold transition-all cursor-pointer ${
                  pageNum === currentPage
                    ? "bg-[#0B3024] dark:bg-[#20D39B] text-white dark:text-[#021512] shadow-xs"
                    : "bg-white dark:bg-[#06241F] text-[#4A685D] dark:text-[#8BAAA0] border border-[#D8E8E2] dark:border-[#16463D] hover:bg-[#F1FAF6] dark:hover:bg-[#082A24]"
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => onPageChange(currentPage + 1)}
              className="p-1.5 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#06241F] text-[#0B3024] dark:text-[#F1FAF6] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#F1FAF6] dark:hover:bg-[#082A24] transition-colors cursor-pointer"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
