"use client";

import React from "react";
import { Zap, PlusCircle, CheckSquare, Layers, Download, ChevronRight } from "lucide-react";

export default function AssignmentsQuickActions({ onCreateNewClick }) {
  const actions = [
    {
      id: "create",
      title: "Create New Assignment",
      icon: PlusCircle,
      onClick: onCreateNewClick,
    },
    {
      id: "view",
      title: "View Submissions",
      icon: CheckSquare,
      onClick: () => alert("View Submissions: Filter by class to grade submitted student files."),
    },
    {
      id: "manage",
      title: "Manage All Assignments",
      icon: Layers,
      onClick: () => alert("Manage All Assignments: Edit dates, maximum scores, and rubrics."),
    },
    {
      id: "download",
      title: "Download Reports",
      icon: Download,
      onClick: () => alert("Download Reports: Exporting CSV of assignment grades and evaluation metrics."),
    },
  ];

  return (
    <div className="rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] p-4 sm:p-5 shadow-xs">
      <div className="flex items-center gap-2 pb-3.5 border-b border-[#F0F5F2] dark:border-[#0E352E]">
        <div className="w-7 h-7 rounded-lg bg-[#E6F7F0] dark:bg-[#073629] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center">
          <Zap className="w-4 h-4 fill-current" />
        </div>
        <h2 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
          Quick Actions
        </h2>
      </div>

      <div className="divide-y divide-[#F0F5F2] dark:divide-[#0E352E] pt-1">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.id}
              type="button"
              onClick={act.onClick}
              className="w-full text-left py-3 flex items-center justify-between gap-3 hover:bg-[#F7FBF9] dark:hover:bg-[#082A24]/60 px-2 rounded-xl transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#E6F7F0] dark:bg-[#073629] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-[13px] font-bold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-[#159B72] dark:group-hover:text-[#20D39B] transition-colors leading-tight">
                  {act.title}
                </span>
              </div>

              <ChevronRight className="w-4 h-4 text-[#A7C8BD] group-hover:text-[#159B72] dark:group-hover:text-[#20D39B] group-hover:translate-x-0.5 transition-all shrink-0" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
