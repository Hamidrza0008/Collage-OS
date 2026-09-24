"use client";

import {
  Users,
  Calendar,
  Layers,
  Activity,
  Eye,
  Star,
  MessageSquare,
  GraduationCap,
} from "lucide-react";

export default function ProjectMetaChips({ project }) {
  const membersCount = project.team?.length || project.membersCount || 1;

  return (
    <div className="flex flex-wrap items-center gap-2 pt-1">
      {/* Type & Team */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F0F8F5] dark:bg-[#072B23] border border-[#D8E8E2] dark:border-[#10372F] text-xs font-semibold text-[#0B3024] dark:text-[#E6F4EE]">
        <Users className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B]" />
        <span>{project.type || "Team Project"}</span>
        <span className="text-[#658278] dark:text-[#8BAEA3] font-normal">
          ({membersCount} {membersCount > 1 ? "members" : "member"})
        </span>
      </div>

      {/* Category */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F0F8F5] dark:bg-[#072B23] border border-[#D8E8E2] dark:border-[#10372F] text-xs font-semibold text-[#0B3024] dark:text-[#E6F4EE]">
        <Layers className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B]" />
        <span>{project.category}</span>
      </div>

      {/* Branch / Dept */}
      {project.branch && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F0F8F5] dark:bg-[#072B23] border border-[#D8E8E2] dark:border-[#10372F] text-xs font-medium text-[#4C6B61] dark:text-[#A1C2B7]">
          <GraduationCap className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B]" />
          <span>{project.branch}</span>
        </div>
      )}

      {/* Status */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F0F8F5] dark:bg-[#072B23] border border-[#D8E8E2] dark:border-[#10372F] text-xs font-medium text-[#0B3024] dark:text-[#E6F4EE]">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>{project.status || "In Development"}</span>
      </div>

      {/* Updated */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-50/80 dark:bg-[#06241F]/80 border border-gray-200/60 dark:border-[#10372F] text-xs text-[#658278] dark:text-[#8BAEA3]">
        <Calendar className="w-3.5 h-3.5" />
        <span>Updated {project.updatedAt || "recently"}</span>
      </div>

      {/* Engagement Chips */}
      <div className="ml-auto hidden sm:flex items-center gap-3 text-xs text-[#658278] dark:text-[#8BAEA3] px-2 py-1">
        <span className="inline-flex items-center gap-1">
          <Eye className="w-3.5 h-3.5" />
          <span>{project.views || 0}</span>
        </span>
        <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 font-semibold">
          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
          <span>{project.likes || 0}</span>
        </span>
        <span className="inline-flex items-center gap-1">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>{project.commentsCount || 0}</span>
        </span>
      </div>
    </div>
  );
}
