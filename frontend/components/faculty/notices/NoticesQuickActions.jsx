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
    <div className="bg-white dark:bg-[#06241F] rounded-2xl border border-[#E5ECE8] dark:border-[#10372F] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-3">
      {/* Header matching screenshot */}
      <div className="flex items-center gap-2.5 pb-0.5">
        <Zap className="w-4 h-4 text-[#159B72]" />
        <h2 className="text-[14px] font-bold text-[#0B3024] dark:text-[#F1FAF6]">
          Quick Actions
        </h2>
      </div>

      {/* Action Rows */}
      <div className="space-y-1">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.id}
              type="button"
              onClick={act.onClick}
              className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-[#F1F8F5] dark:hover:bg-[#082A24] transition-colors text-left group cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-[#E8F7F0] dark:bg-[#073629] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-[13px] font-semibold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-[#159B72] transition-colors truncate">
                    {act.title}
                  </h4>
                  <p className="text-[11px] text-[#658278] dark:text-[#789991] truncate">
                    {act.description}
                  </p>
                </div>
              </div>

              <ChevronRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#159B72] transition-colors shrink-0 ml-2" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
