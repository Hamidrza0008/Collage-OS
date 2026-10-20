"use client";

import React from "react";
import { FolderGit2, Star, ChevronRight, Laptop, Code, Sparkles, Leaf, Calendar } from "lucide-react";
import { TOP_STUDENT_PROJECTS } from "./facultyStudentsData";

export default function TopStudentProjectsCard({ onViewAll, onSelectProject }) {
  const getIcon = (type) => {
    switch (type) {
      case "terminal":
        return <Laptop className="w-4 h-4" />;
      case "code":
        return <Code className="w-4 h-4" />;
      case "sparkles":
        return <Sparkles className="w-4 h-4" />;
      case "leaf":
        return <Leaf className="w-4 h-4" />;
      case "calendar":
        return <Calendar className="w-4 h-4" />;
      default:
        return <FolderGit2 className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white dark:bg-[#06241F] rounded-2xl border border-[#E5ECE8] dark:border-[#10372F] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-3.5">
      {/* Header */}
      <div className="flex items-center justify-between pb-0.5">
        <div className="flex items-center gap-2">
          <FolderGit2 className="w-4 h-4 text-[#159B72]" />
          <h2 className="text-[14px] font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            Top Student Projects
          </h2>
        </div>
        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-semibold text-[#159B72] hover:text-[#11805D] flex items-center gap-1 cursor-pointer transition-colors"
        >
          View All →
        </button>
      </div>

      {/* Projects List */}
      <div className="space-y-2">
        {TOP_STUDENT_PROJECTS.map((proj) => (
          <div
            key={proj.id}
            onClick={() => onSelectProject && onSelectProject(proj)}
            className="group flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-[#082A24] transition-colors cursor-pointer"
          >
            {/* Left: Icon square + title + details */}
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${proj.colorStyle}`}
              >
                {getIcon(proj.iconType)}
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-[#159B72] transition-colors truncate">
                  {proj.name}
                </h4>
                <p className="text-[11px] text-[#658278] dark:text-[#789991] truncate">
                  {proj.category} • {proj.members} Members
                </p>
              </div>
            </div>

            {/* Right: Star count + Chevron */}
            <div className="flex items-center gap-1 shrink-0 text-xs text-[#D97706] font-semibold">
              <Star className="w-3.5 h-3.5 fill-[#D97706]" />
              <span>{proj.stars}</span>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:translate-x-0.5 transition-transform ml-0.5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
