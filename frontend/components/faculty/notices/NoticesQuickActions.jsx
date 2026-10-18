"use client";

import React from "react";
import { Zap, FilePlus, Megaphone, FileText, ChevronRight } from "lucide-react";

export default function NoticesQuickActions({
  onCreateNotice,
  onCreateAnnouncement,
  onViewAllNotices,
  onViewAllAnnouncements,
}) {
  const actions = [
    {
      id: "create-notice",
      title: "Create Notice",
      description: "Post a new notice to students",
      icon: FilePlus,
      onClick: onCreateNotice,
    },
    {
      id: "create-announcement",
      title: "Create Announcement",
      description: "Share important updates",
      icon: Megaphone,
      onClick: onCreateAnnouncement,
    },
    {
      id: "view-notices",
      title: "View All Notices",
      description: "Browse complete list",
      icon: FileText,
      onClick: onViewAllNotices,
    },
    {
      id: "view-announcements",
      title: "View All Announcements",
      description: "Browse complete list",
      icon: FileText,
      onClick: onViewAllAnnouncements,
    },
  ];

  return (
    <div className="bg-white dark:bg-card-bg rounded-2xl border border-border-light dark:border-border-dark p-5 shadow-2xs space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2.5 pb-0.5">
        <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400 fill-emerald-600/20" />
        <h2 className="text-[14px] font-bold text-text-primary dark:text-text-primary-dark">
          Quick Actions
        </h2>
      </div>

      {/* Action Rows */}
      <div className="space-y-2">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.id}
              type="button"
              onClick={act.onClick}
              className="w-full flex items-center justify-between p-2.5 rounded-xl border border-transparent hover:border-emerald-500/30 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 transition-all text-left group cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-[13px] font-semibold text-text-primary dark:text-text-primary-dark group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
                    {act.title}
                  </h4>
                  <p className="text-[11px] text-text-secondary dark:text-text-secondary-dark truncate">
                    {act.description}
                  </p>
                </div>
              </div>

              <ChevronRight className="w-4 h-4 text-text-secondary/60 dark:text-text-secondary-dark/60 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
