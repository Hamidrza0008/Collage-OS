"use client";

import { useEffect, useRef } from "react";
import {
  Bell,
  CheckCircle2,
  Calendar,
  ClipboardCheck,
  Sparkles,
  ArrowRight,
  CheckCheck,
} from "lucide-react";

export default function NotificationPanel({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onViewAllNotifications,
  onNotificationClick,
}) {
  const panelRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div
      ref={panelRef}
      className="absolute top-[58px] right-2 sm:right-6 md:right-8 w-[320px] sm:w-[360px] rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150"
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-[#E8F1ED] dark:border-[#10372F] flex items-center justify-between bg-[#F7FBF9] dark:bg-[#082A24]">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-[#159B72] dark:text-[#20D39B]" />
          <h3 className="text-xs sm:text-[13px] font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            Notifications
          </h3>
          {unreadCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-extrabold bg-[#E5484D] text-white">
              {unreadCount}
            </span>
          )}
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={onMarkAllAsRead}
            className="text-[11px] font-semibold text-[#159B72] dark:text-[#20D39B] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Mark all read</span>
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div className="divide-y divide-[#E8F1ED] dark:divide-[#10372F] max-h-[340px] overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-xs text-[#658278] dark:text-[#789991]">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2 opacity-60" />
            <p>You&apos;re all caught up!</p>
          </div>
        ) : (
          notifications.map((item) => {
            let Icon = Bell;
            let iconBg = "bg-emerald-100 text-[#159B72] dark:bg-emerald-950/60 dark:text-[#20D39B]";
            if (item.type === "assignment") {
              Icon = ClipboardCheck;
              iconBg = "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400";
            } else if (item.type === "event") {
              Icon = Calendar;
              iconBg = "bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-400";
            } else if (item.type === "ai") {
              Icon = Sparkles;
              iconBg = "bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-400";
            }

            return (
              <div
                key={item.id}
                onClick={() => onNotificationClick && onNotificationClick(item)}
                className={`p-3 flex items-start gap-2.5 transition-colors cursor-pointer hover:bg-[#F7FBF9] dark:hover:bg-[#082A24] ${
                  item.unread ? "bg-[#DDF3EB]/25 dark:bg-[#073327]/30" : ""
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>
                  <Icon className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h4 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] leading-tight line-clamp-1">
                      {item.title}
                    </h4>
                    {item.unread && (
                      <span className="w-2 h-2 rounded-full bg-[#159B72] dark:bg-[#20D39B] shrink-0 mt-0.5" />
                    )}
                  </div>
                  <p className="text-[11px] text-[#658278] dark:text-[#789991] mt-0.5 leading-snug line-clamp-2">
                    {item.message}
                  </p>
                  <span className="text-[10px] text-[#85A297] dark:text-[#65857B] mt-1 block">
                    {item.timestamp}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div className="p-2.5 border-t border-[#E8F1ED] dark:border-[#10372F] bg-[#F7FBF9] dark:bg-[#082A24] text-center">
        <button
          type="button"
          onClick={() => {
            onClose();
            onViewAllNotifications();
          }}
          className="w-full py-1.5 rounded-xl text-xs font-semibold text-[#159B72] dark:text-[#20D39B] hover:bg-[#DDF3EB] dark:hover:bg-[#0B3024] transition-colors flex items-center justify-center gap-1 cursor-pointer"
        >
          <span>View All Notifications</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
