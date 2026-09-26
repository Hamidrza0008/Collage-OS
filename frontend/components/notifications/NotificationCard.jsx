"use client";

import { useRouter } from "next/navigation";
import {
  ClipboardCheck,
  Calendar,
  Briefcase,
  FileCheck,
  GraduationCap,
  Code2,
  MessageSquare,
  HelpCircle,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  Circle,
  Tag,
} from "lucide-react";
import {
  NOTIFICATION_PRIORITIES,
  formatNotificationTime,
} from "./notificationData";

export default function NotificationCard({
  notification,
  onMarkAsRead,
  onMarkAsUnread,
  onShowToast,
}) {
  const router = useRouter();
  const {
    id,
    type,
    priority = "normal",
    title,
    message,
    source,
    createdAt,
    read,
    actionRequired,
    actionLabel,
    route,
    metadata,
  } = notification;

  // Icon mapping
  let Icon = Sparkles;
  let iconBg = "bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300";

  switch (type) {
    case "assignment":
      Icon = ClipboardCheck;
      iconBg = "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300";
      break;
    case "event":
      Icon = Calendar;
      iconBg = "bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300";
      break;
    case "opportunity":
      Icon = Briefcase;
      iconBg = "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300";
      break;
    case "application":
      Icon = FileCheck;
      iconBg = "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300";
      break;
    case "academic":
      Icon = GraduationCap;
      iconBg = "bg-teal-100 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300";
      break;
    case "project":
      Icon = Code2;
      iconBg = "bg-cyan-100 text-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-300";
      break;
    case "social":
      Icon = MessageSquare;
      iconBg = "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-950/60 dark:text-fuchsia-300";
      break;
    case "lost-found":
      Icon = HelpCircle;
      iconBg = "bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-300";
      break;
    default:
      Icon = Sparkles;
      iconBg = "bg-emerald-100 text-[#159B72] dark:bg-emerald-950/60 dark:text-[#20D39B]";
      break;
  }

  const priorityMeta =
    NOTIFICATION_PRIORITIES[priority] || NOTIFICATION_PRIORITIES.normal;

  // Handle action click
  const handleActionClick = (e) => {
    e.stopPropagation();

    // Mark as read when navigating
    if (!read) {
      onMarkAsRead(id);
    }

    if (!route) {
      if (onShowToast) {
        onShowToast("This notification refers to content that is no longer available.");
      }
      return;
    }

    router.push(route);
  };

  const handleCardClick = () => {
    if (!read) {
      onMarkAsRead(id);
    }
    if (route) {
      router.push(route);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className={`group relative p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
        read
          ? "bg-white dark:bg-[#06241F] border-[#D8E8E2] dark:border-[#10372F] hover:border-[#159B72]/50 hover:shadow-xs"
          : "bg-[#F1FAF6]/80 dark:bg-[#073327]/40 border-[#A3D4C2] dark:border-[#165646] shadow-xs hover:border-[#159B72] dark:hover:border-[#20D39B]"
      }`}
    >
      {/* Unread Left Border Highlight Accent */}
      {!read && (
        <span
          className="absolute left-0 top-3 bottom-3 w-1 bg-[#159B72] dark:bg-[#20D39B] rounded-r-full"
          aria-hidden="true"
        />
      )}

      <div className="flex items-start gap-3 sm:gap-4">
        {/* Category Icon */}
        <div
          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${iconBg}`}
        >
          <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          {/* Header Row: Source, Priority, Timestamp, Read/Unread Toggle */}
          <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              {/* Source Badge */}
              <span className="text-[10px] sm:text-[11px] font-semibold text-[#4A685D] dark:text-[#8BAAA0] bg-[#E8F1ED] dark:bg-[#10372F] px-2 py-0.5 rounded-md">
                {source}
              </span>

              {/* Priority Badge */}
              {priority !== "normal" && (
                <span
                  className={`text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 ${priorityMeta.badgeClass}`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${priorityMeta.dotClass}`}
                  />
                  <span>{priorityMeta.label}</span>
                </span>
              )}

              {/* Action Required Tag */}
              {actionRequired && (
                <span className="text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-300/40 dark:border-amber-700/40">
                  Action Required
                </span>
              )}
            </div>

            {/* Timestamp & Toggle Read */}
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-[11px] text-[#658278] dark:text-[#789991]">
                {formatNotificationTime(createdAt)}
              </span>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (read) {
                    onMarkAsUnread(id);
                  } else {
                    onMarkAsRead(id);
                  }
                }}
                className="p-1 rounded-lg text-[#658278] dark:text-[#789991] hover:text-[#159B72] dark:hover:text-[#20D39B] hover:bg-[#E8F1ED] dark:hover:bg-[#10372F] transition-colors cursor-pointer"
                title={read ? "Mark as unread" : "Mark as read"}
                aria-label={read ? "Mark as unread" : "Mark as read"}
              >
                {read ? (
                  <Circle className="w-3.5 h-3.5" />
                ) : (
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B]" />
                )}
              </button>
            </div>
          </div>

          {/* Title */}
          <h3
            className={`text-sm sm:text-base leading-snug tracking-tight font-bold text-[#0B3024] dark:text-[#F1FAF6] ${
              !read ? "font-extrabold" : "font-semibold"
            }`}
          >
            {title}
          </h3>

          {/* Privacy-Safe Message Body */}
          <p className="text-xs sm:text-sm text-[#4A685D] dark:text-[#8BAAA0] mt-1 leading-relaxed">
            {message}
          </p>

          {/* Related Entity Preview (if metadata present) */}
          {metadata && Object.keys(metadata).length > 0 && (
            <div className="mt-2.5 flex items-center gap-2 flex-wrap">
              {Object.entries(metadata).map(([key, val]) => (
                <div
                  key={key}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-white/70 dark:bg-[#06241F]/80 border border-[#D8E8E2] dark:border-[#16463D] text-[11px] text-[#36594C] dark:text-[#A3BFB5]"
                >
                  <Tag className="w-2.5 h-2.5 text-[#159B72] dark:text-[#20D39B]" />
                  <span className="capitalize text-[#658278] dark:text-[#789991]">
                    {key.replace(/([A-Z])/g, " $1")}:
                  </span>
                  <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
                    {val}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Footer Action Button */}
          {actionLabel && route && (
            <div className="mt-3 flex items-center justify-between pt-2 border-t border-[#E8F1ED] dark:border-[#10372F]/60">
              <button
                type="button"
                onClick={handleActionClick}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#159B72] dark:text-[#20D39B] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] group-hover:underline transition-colors cursor-pointer"
              >
                <span>{actionLabel}</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              {!read && (
                <span className="text-[10px] font-semibold text-[#159B72] dark:text-[#20D39B] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#159B72] dark:bg-[#20D39B]" />
                  <span>Unread</span>
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
