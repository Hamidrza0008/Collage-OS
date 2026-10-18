"use client";

import React from "react";
import {
  Zap,
  UploadCloud,
  Users,
  FolderPlus,
  DownloadCloud,
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
      icon: UploadCloud,
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
      icon: DownloadCloud,
      onClick: onViewDownloadsClick,
    },
  ];

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center gap-2 px-1">
        <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400 fill-emerald-600/20" />
        <h2 className="text-[14px] font-bold text-text-primary dark:text-text-primary-dark">
          Quick Actions
        </h2>
      </div>

      {/* 2x2 Grid of White Cards (No heavy outer bounding box) */}
      <div className="grid grid-cols-2 gap-3">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.id}
              type="button"
              onClick={act.onClick}
              className="flex flex-col items-start p-4 rounded-2xl border border-gray-200/70 dark:border-gray-800/80 bg-white dark:bg-card-bg hover:border-emerald-500/50 hover:shadow-xs transition-all text-left group cursor-pointer shadow-2xs"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mb-3 group-hover:scale-105 transition-transform">
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-text-primary dark:text-text-primary-dark group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {act.title}
              </span>
              <span className="text-[11px] text-text-secondary dark:text-text-secondary-dark mt-0.5">
                {act.subtitle}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
