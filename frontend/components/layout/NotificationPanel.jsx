"use client";

import { useEffect, useRef } from "react";
import {
  Bell,
  CheckCircle2,
  Calendar,
  ClipboardCheck,
  Briefcase,
  FileCheck,
  GraduationCap,
  Code2,
  MessageSquare,
  HelpCircle,
  Sparkles,
  ArrowRight,
  CheckCheck,
  Check,
  X,
} from "lucide-react";

// Canonical type icon and badge styling mapping
const TYPE_CONFIG = {
  assignment: {
    icon: ClipboardCheck,
    badgeBg: "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300",
    label: "Assignment",
  },
  event: {
    icon: Calendar,
    badgeBg: "bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300",
    label: "Event",
  },
  opportunity: {
    icon: Briefcase,
    badgeBg: "bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300",
    label: "Opportunity",
  },
  application: {
    icon: FileCheck,
    badgeBg: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300",
    label: "Application",
  },
  academic: {
    icon: GraduationCap,
    badgeBg: "bg-teal-100 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300",
    label: "Academics",
  },
  project: {
    icon: Code2,
    badgeBg: "bg-cyan-100 text-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-300",
    label: "Project",
  },
  social: {
    icon: MessageSquare,
    badgeBg: "bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-950/60 dark:text-fuchsia-300",
    label: "Campus Feed",
  },
  "lost-found": {
    icon: HelpCircle,
    badgeBg: "bg-orange-100 text-orange-800 dark:bg-orange-950/60 dark:text-orange-300",
    label: "Lost & Found",
  },
  system: {
    icon: Bell,
    badgeBg: "bg-[#E8F1ED] text-[#36594C] dark:bg-[#10372F] dark:text-[#A3BFB5]",
    label: "System",
  },
};

export default function NotificationPanel({
  isOpen,
  onClose,
  notifications = [],
  onMarkAsRead,
  onMarkAllAsRead,
  onViewAllNotifications,
  onNotificationClick,
}) {
  const panelRef = useRef(null);

  // Close on outside click & Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
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
  // Compact recent subset: show up to 7 latest notifications
  const recentNotifications = notifications.slice(0, 7);

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-label="Student Notification Quick Panel"
      aria-modal="false"
      className="fixed sm:absolute top-[68px] sm:top-[calc(100%+8px)] left-3 right-3 sm:left-auto sm:right-0 max-w-[420px] mx-auto sm:mx-0 sm:w-[380px] md:w-[410px] rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-[0_20px_50px_rgba(11,48,36,0.18)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.7)] overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150 flex flex-col"
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-[#E8F1ED] dark:border-[#10372F] flex items-center justify-between bg-[#F7FBF9] dark:bg-[#082A24]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-[#159B72] dark:text-[#20D39B] flex items-center justify-center shrink-0">
            <Bell className="w-3.5 h-3.5" strokeWidth={2.2} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-xs sm:text-[13px] font-bold text-[#0B3024] dark:text-[#F1FAF6] leading-tight">
                Notifications
              </h3>
              {unreadCount > 0 ? (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-[#E5484D] text-white">
                  {unreadCount}
                </span>
              ) : (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                  Caught up
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={onMarkAllAsRead}
              className="text-[11px] font-semibold text-[#159B72] dark:text-[#20D39B] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] px-2 py-1 rounded-lg hover:bg-[#DDF3EB] dark:hover:bg-[#0B3024] transition-colors flex items-center gap-1 cursor-pointer"
              title="Mark all notifications as read"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark all read</span>
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-[#658278] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-[#F1F8F5] dark:hover:bg-[#0B3024] transition-colors cursor-pointer"
            aria-label="Close notification panel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Sub-header status bar */}
      <div className="px-4 py-1.5 bg-[#F7FBF9]/80 dark:bg-[#082A24]/60 border-b border-[#E8F1ED]/80 dark:border-[#10372F]/80 flex items-center justify-between text-[10.5px] text-[#658278] dark:text-[#789991]">
        <span>Recent campus updates</span>
        <span>
          Showing latest {recentNotifications.length} of {notifications.length}
        </span>
      </div>

      {/* Notifications List */}
      <div className="divide-y divide-[#E8F1ED] dark:divide-[#10372F] max-h-[360px] overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-xs text-[#658278] dark:text-[#789991] space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-[#082A24] border border-emerald-100 dark:border-[#10372F] text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <p className="font-bold text-[#0B3024] dark:text-[#F1FAF6]">
              You&apos;re all caught up!
            </p>
            <p className="text-[11px] max-w-[220px] mx-auto text-[#658278] dark:text-[#789991]">
              New campus notices, deadlines, and alerts will appear here.
            </p>
          </div>
        ) : (
          recentNotifications.map((item) => {
            const config = TYPE_CONFIG[item.type] || {
              icon: Sparkles,
              badgeBg: "bg-emerald-100 text-[#159B72] dark:bg-emerald-950/60 dark:text-[#20D39B]",
              label: "Update",
            };
            const Icon = config.icon;

            return (
              <div
                key={item.id}
                role="button"
                tabIndex={0}
                onClick={() => onNotificationClick && onNotificationClick(item)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onNotificationClick && onNotificationClick(item);
                  }
                }}
                className={`p-3 sm:px-3.5 flex items-start gap-2.5 transition-colors cursor-pointer text-left relative group ${
                  item.unread
                    ? "bg-[#DDF3EB]/35 dark:bg-[#073327]/35 border-l-[3px] border-[#159B72] dark:border-[#20D39B] hover:bg-[#DDF3EB]/55 dark:hover:bg-[#073327]/55"
                    : "bg-transparent border-l-[3px] border-transparent hover:bg-[#F7FBF9] dark:hover:bg-[#082A24]"
                }`}
              >
                {/* Type Icon */}
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 shadow-2xs ${config.badgeBg}`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                {/* Message Body */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1.5 mb-0.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#658278] dark:text-[#789991] truncate">
                      {item.source || config.label}
                    </span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-[10px] text-[#85A297] dark:text-[#65857B]">
                        {item.timestamp}
                      </span>
                      {item.unread && (
                        <span
                          className="w-2 h-2 rounded-full bg-[#159B72] dark:bg-[#20D39B] shrink-0"
                          title="Unread"
                        />
                      )}
                    </div>
                  </div>

                  <h4
                    className={`text-xs leading-snug line-clamp-1 ${
                      item.unread
                        ? "font-bold text-[#0B3024] dark:text-[#F1FAF6]"
                        : "font-medium text-[#36594C] dark:text-[#CBDCD5]"
                    }`}
                  >
                    {item.title}
                  </h4>

                  <p className="text-[11px] text-[#658278] dark:text-[#789991] mt-0.5 leading-snug line-clamp-2">
                    {item.message}
                  </p>
                </div>

                {/* Individual Mark Read Button (Shown on unread items) */}
                {item.unread && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onMarkAsRead && onMarkAsRead(item.id);
                    }}
                    title="Mark as read"
                    aria-label={`Mark "${item.title}" as read`}
                    className="p-1 rounded-lg text-[#658278] dark:text-[#789991] hover:text-[#159B72] dark:hover:text-[#20D39B] hover:bg-white dark:hover:bg-[#06241F] transition-all shrink-0 mt-0.5 opacity-80 group-hover:opacity-100 cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                )}
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
          className="w-full py-2 px-3 rounded-xl text-xs font-semibold text-[#159B72] dark:text-[#20D39B] hover:bg-[#DDF3EB] dark:hover:bg-[#0B3024] transition-all flex items-center justify-center gap-1.5 cursor-pointer group active:scale-98"
        >
          <span>View All Notifications ({notifications.length})</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
