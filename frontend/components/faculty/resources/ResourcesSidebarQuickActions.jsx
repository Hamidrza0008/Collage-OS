"use client";

import React from "react";
import {
  Zap,
  Upload,
  Users,
  FolderPlus,
  Download,
} from "lucide-react";

export default function ResourcesSidebarQuickActions({
  onUploadClick,
  onShareClick,
  onCreateFolderClick,
  onViewDownloadsClick,
}) {
  const actions = [
    {
      id: "upload",
      title: "Upload Resource",
      subtitle: "Add new file",
      icon: Upload,
      onClick: onUploadClick,
    },
    {
      id: "share",
      title: "Share with Class",
      subtitle: "Notify students",
      icon: Users,
      onClick: onShareClick,
    },
    {
      id: "create-folder",
      title: "Create Folder",
      subtitle: "Organize resources",
      icon: FolderPlus,
      onClick: onCreateFolderClick,
    },
    {
      id: "view-downloads",
      title: "View Downloads",
      subtitle: "Track activity",
      icon: Download,
      onClick: onViewDownloadsClick,
    },
  ];

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center gap-2 px-1">
        <Zap className="w-4 h-4 text-[#159B72] dark:text-[#20D39B] fill-[#159B72]/20" />
        <h2 className="text-[14px] font-bold text-[#0B3024] dark:text-[#F1FAF6]">
          Quick Actions
        </h2>
      </div>

      {/* 2x2 Grid of Cards matching screenshot */}
      <div className="grid grid-cols-2 gap-3">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.id}
              type="button"
              onClick={act.onClick}
              className="flex flex-col items-start p-4 rounded-2xl border border-[#D8E8E2] dark:border-[#10372F] bg-white dark:bg-[#06241F] hover:border-[#159B72]/50 dark:hover:border-[#20D39B]/50 hover:shadow-xs transition-all text-left group cursor-pointer shadow-2xs"
            >
              <div className="w-8 h-8 rounded-lg bg-[#EBF6F1] dark:bg-[#0F4A3B] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center shrink-0 mb-3 group-hover:scale-105 transition-transform">
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-[#159B72] dark:group-hover:text-[#20D39B] transition-colors">
                {act.title}
              </span>
              <span className="text-[11px] text-[#658278] dark:text-[#789991] mt-0.5">
                {act.subtitle}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
