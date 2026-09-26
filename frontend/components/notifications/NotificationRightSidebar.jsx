"use client";

import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  CheckCheck,
  Trash2,
  PieChart,
  Zap,
} from "lucide-react";
import { NOTIFICATION_CATEGORIES } from "./notificationData";

export default function NotificationRightSidebar({
  counts = { unread: 0, today: 0, actionRequired: 0, total: 0 },
  actionRequiredItems = [],
  categoryCounts = {},
  activeCategory = "all",
  onSelectCategory,
  onMarkAllAsRead,
  onOpenClearReadModal,
}) {
  const router = useRouter();
  const readPercentage =
    counts.total > 0
      ? Math.round(((counts.total - counts.unread) / counts.total) * 100)
      : 100;

  return (
    <aside className="w-full space-y-4 lg:sticky lg:top-20">
      {/* Read Progress Summary Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#DDF3EB] dark:bg-[#073327] text-[#159B72] dark:text-[#20D39B]">
              <PieChart className="w-4 h-4" />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
              Inbox Status
            </h3>
          </div>
          <span className="text-xs font-black text-[#159B72] dark:text-[#20D39B]">
            {readPercentage}% Caught Up
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 rounded-full bg-[#E8F1ED] dark:bg-[#10372F] overflow-hidden mb-3">
          <div
            className="h-full bg-linear-to-r from-[#159B72] to-[#20D39B] rounded-full transition-all duration-500"
            style={{ width: `${readPercentage}%` }}
          />
        </div>

        <div className="grid grid-cols-2 gap-2 text-center text-xs">
          <div className="p-2 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#E8F1ED] dark:border-[#10372F]">
            <span className="text-[11px] text-[#658278] dark:text-[#789991] block">
              Unread
            </span>
            <span className="text-base font-extrabold text-[#E5484D]">
              {counts.unread}
            </span>
          </div>
          <div className="p-2 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#E8F1ED] dark:border-[#10372F]">
            <span className="text-[11px] text-[#658278] dark:text-[#789991] block">
              Read
            </span>
            <span className="text-base font-extrabold text-[#159B72] dark:text-[#20D39B]">
              {counts.total - counts.unread}
            </span>
          </div>
        </div>
      </div>

      {/* Action Required Priority Checklist */}
      {actionRequiredItems.length > 0 && (
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/50 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-amber-950 dark:text-amber-200">
                Action Required
              </h3>
              <p className="text-[11px] text-amber-800/80 dark:text-amber-400/80">
                {counts.actionRequired} items need your attention
              </p>
            </div>
          </div>

          <div className="space-y-2">
            {actionRequiredItems.slice(0, 3).map((item) => (
              <div
                key={item.id}
                onClick={() => item.route && router.push(item.route)}
                className="p-2.5 rounded-xl bg-white/90 dark:bg-[#06241F]/90 border border-amber-200/60 dark:border-amber-900/40 hover:border-amber-400 transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between gap-1.5">
                  <h4 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] line-clamp-1 group-hover:text-amber-700 dark:group-hover:text-amber-400">
                    {item.title}
                  </h4>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </div>
                <div className="flex items-center justify-between text-[11px] mt-1 text-[#658278] dark:text-[#789991]">
                  <span>{item.source}</span>
                  {item.actionLabel && (
                    <span className="font-semibold text-amber-700 dark:text-amber-400">
                      {item.actionLabel}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category Breakdown */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] shadow-xs">
        <h3 className="text-xs sm:text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-3">
          Channels & Feeds
        </h3>
        <div className="space-y-1">
          {NOTIFICATION_CATEGORIES.filter(
            (c) =>
              c.id !== "all" &&
              c.id !== "unread" &&
              c.id !== "action_required" &&
              (categoryCounts[c.id] || 0) > 0
          ).map((cat) => {
            const count = categoryCounts[cat.id] || 0;
            const isSelected = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-[#DDF3EB] dark:bg-[#073327] text-[#159B72] dark:text-[#20D39B] font-bold"
                    : "text-[#4A685D] dark:text-[#8BAAA0] hover:bg-[#F7FBF9] dark:hover:bg-[#082A24] hover:text-[#0B3024] dark:hover:text-[#F1FAF6]"
                }`}
              >
                <span>{cat.label}</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#E8F1ED] dark:bg-[#10372F] text-[#36594C] dark:text-[#A3BFB5]">
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Controls Card */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] shadow-xs space-y-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#658278] dark:text-[#789991] block px-1">
          Quick Controls
        </span>
        <button
          type="button"
          disabled={counts.unread === 0}
          onClick={onMarkAllAsRead}
          className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-xl bg-[#DDF3EB] dark:bg-[#073327] text-[#159B72] dark:text-[#20D39B] hover:bg-[#cbeee2] dark:hover:bg-[#0a4434] disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
        >
          <CheckCheck className="w-4 h-4" />
          <span>Mark All Read</span>
        </button>

        <button
          type="button"
          disabled={counts.total - counts.unread === 0}
          onClick={onOpenClearReadModal}
          className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-xl border border-[#D8E8E2] dark:border-[#16463D] text-[#658278] dark:text-[#789991] hover:text-rose-600 dark:hover:text-rose-400 hover:border-rose-200 dark:hover:border-rose-900/50 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
          <span>Clear Read Notifications</span>
        </button>
      </div>

      {/* Privacy Notice Card */}
      <div className="p-3.5 rounded-2xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#E8F1ED] dark:border-[#10372F] flex items-start gap-2.5">
        <ShieldCheck className="w-4 h-4 text-[#159B72] dark:text-[#20D39B] shrink-0 mt-0.5" />
        <p className="text-[11px] text-[#658278] dark:text-[#789991] leading-relaxed">
          Notifications protect your privacy. Exact marks, CGPA, and personal claims are not broadcast in message previews.
        </p>
      </div>
    </aside>
  );
}
