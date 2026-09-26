"use client";

import { Bell, CheckCheck, Trash2, RotateCcw } from "lucide-react";

export default function NotificationHeader({
  unreadCount = 0,
  readCount = 0,
  onMarkAllAsRead,
  onOpenClearReadModal,
  onResetSeedData,
}) {
  return (
    <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#D8E8E2] dark:border-[#10372F]">
      <div>
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#DDF3EB] dark:bg-[#073327] flex items-center justify-center text-[#159B72] dark:text-[#20D39B] shrink-0 shadow-xs">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0B3024] dark:text-[#F1FAF6]">
                Notifications
              </h1>
              {unreadCount > 0 && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-[#E5484D] text-white">
                  {unreadCount} unread
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-[#4A685D] dark:text-[#8BAAA0] mt-0.5">
              Stay updated with academics, opportunities, campus activity, and important College OS updates.
            </p>
          </div>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex items-center flex-wrap gap-2 self-start sm:self-center">
        {unreadCount > 0 && (
          <button
            type="button"
            onClick={onMarkAllAsRead}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-white dark:bg-[#06241F] text-[#159B72] dark:text-[#20D39B] border border-[#D8E8E2] dark:border-[#16463D] hover:bg-[#F1FAF6] dark:hover:bg-[#082A24] transition-all shadow-xs cursor-pointer active:scale-95"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Mark All as Read</span>
          </button>
        )}

        {readCount > 0 && (
          <button
            type="button"
            onClick={onOpenClearReadModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-white dark:bg-[#06241F] text-[#658278] dark:text-[#789991] hover:text-rose-600 dark:hover:text-rose-400 border border-[#D8E8E2] dark:border-[#16463D] hover:border-rose-200 dark:hover:border-rose-900/50 hover:bg-rose-50/50 dark:hover:bg-rose-950/20 transition-all shadow-xs cursor-pointer active:scale-95"
            title="Remove notifications already marked as read"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Read</span>
          </button>
        )}

        <button
          type="button"
          onClick={onResetSeedData}
          className="p-1.5 text-[#658278] dark:text-[#789991] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] rounded-xl hover:bg-[#E8F1ED] dark:hover:bg-[#10372F] transition-colors cursor-pointer"
          title="Reset sample notifications"
          aria-label="Reset demo notifications"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
