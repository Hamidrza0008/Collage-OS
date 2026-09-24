"use client";

import {
  Bell,
  Calendar,
  CalendarDays,
  ClipboardCheck,
  Briefcase,
  MessageSquare,
} from "lucide-react";

export default function NotificationSettingsCard({ notifications, onToggleNotification }) {
  const getNotificationIcon = (icon) => {
    switch (icon) {
      case "calendar":
        return <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />;
      case "bell":
        return <Bell className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />;
      case "events":
        return <CalendarDays className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />;
      case "assignments":
        return <ClipboardCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />;
      case "briefcase":
        return <Briefcase className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />;
      case "feed":
        return <MessageSquare className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />;
      default:
        return <Bell className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />;
    }
  };

  return (
    <div className="rounded-2xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#06241F] p-4 sm:p-5 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
          <Bell className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-sm sm:text-[15px] font-bold text-[#0B3024] dark:text-[#F1FAF6] leading-tight">
            Notifications
          </h2>
          <p className="text-[11px] sm:text-xs text-[#658278] dark:text-[#789991] mt-0.5">
            Choose what you want to be notified about.
          </p>
        </div>
      </div>

      {/* Notification List with Toggles */}
      <div className="space-y-3 pt-1">
        {notifications.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between py-1 border-b last:border-b-0 border-[#D8E8E2]/40 dark:border-[#16463D]/40"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center shrink-0">
                {getNotificationIcon(item.icon)}
              </div>
              <div>
                <div className="text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] leading-snug">
                  {item.title}
                </div>
                <div className="text-[10.5px] text-[#658278] dark:text-[#789991]">
                  {item.description}
                </div>
              </div>
            </div>

            {/* Toggle Switch */}
            <label className="relative inline-flex items-center cursor-pointer select-none shrink-0 ml-2">
              <input
                type="checkbox"
                checked={item.enabled}
                onChange={() => onToggleNotification(item.id)}
                className="sr-only"
              />
              <div
                className={`w-8 h-4.5 flex items-center rounded-full p-0.5 transition-colors ${
                  item.enabled ? "bg-[#159B72]" : "bg-gray-300 dark:bg-gray-700"
                }`}
              >
                <div
                  className={`bg-white w-3.5 h-3.5 rounded-full shadow-xs transform transition-transform ${
                    item.enabled ? "translate-x-3.5" : "translate-x-0"
                  }`}
                />
              </div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
