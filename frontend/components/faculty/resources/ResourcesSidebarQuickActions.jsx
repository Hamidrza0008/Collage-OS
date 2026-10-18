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
    <div className="bg-white dark:bg-card-bg rounded-2xl border border-border-light dark:border-border-dark p-5 shadow-2xs space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 pb-0.5">
        <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400 fill-emerald-600/20" />
        <h2 className="text-[14px] font-bold text-text-primary dark:text-text-primary-dark">
          Quick Actions
        </h2>
      </div>

      {/* 2x2 Grid */}
      <div className="grid grid-cols-2 gap-3">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.id}
              type="button"
              onClick={act.onClick}
              className="flex flex-col items-start p-3.5 rounded-xl border border-border-light dark:border-border-dark bg-gray-50/50 dark:bg-surface-dark/40 hover:bg-emerald-50/60 dark:hover:bg-emerald-950/20 hover:border-emerald-500/40 transition-all text-left group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50 flex items-center justify-center shrink-0 mb-2.5 group-hover:scale-105 transition-transform">
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-text-primary dark:text-text-primary-dark group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {act.title}
              </span>
              <span className="text-[10.5px] text-text-secondary dark:text-text-secondary-dark mt-0.5">
                {act.subtitle}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
