"use client";

import { ArrowRight, Leaf, Brain, Smartphone, Globe, Gamepad2 } from "lucide-react";
import { TOP_PROJECTS_WEEK } from "./projectsData";

function TopProjectIcon({ iconStyle }) {
  const iconClass = "w-3.5 h-3.5 text-white";
  switch (iconStyle) {
    case "leaf":
      return (
        <div className="w-7 h-7 rounded-lg bg-[#0B4D3C] flex items-center justify-center shrink-0">
          <Leaf className={iconClass} />
        </div>
      );
    case "ai":
      return (
        <div className="w-7 h-7 rounded-lg bg-[#7C3AED] flex items-center justify-center shrink-0">
          <Brain className={iconClass} />
        </div>
      );
    case "mobile":
      return (
        <div className="w-7 h-7 rounded-lg bg-[#F97316] flex items-center justify-center shrink-0">
          <Smartphone className={iconClass} />
        </div>
      );
    case "globe":
      return (
        <div className="w-7 h-7 rounded-lg bg-[#059669] flex items-center justify-center shrink-0">
          <Globe className={iconClass} />
        </div>
      );
    case "gamepad":
      return (
        <div className="w-7 h-7 rounded-lg bg-[#EC4899] flex items-center justify-center shrink-0">
          <Gamepad2 className={iconClass} />
        </div>
      );
    default:
      return (
        <div className="w-7 h-7 rounded-lg bg-[#159B72] flex items-center justify-center shrink-0">
          <Leaf className={iconClass} />
        </div>
      );
  }
}

export default function TopProjectsCard({ onSelectProject, onViewAll }) {
  const getRankBadgeStyle = (rank) => {
    switch (rank) {
      case 1:
        return "bg-emerald-100 dark:bg-emerald-950/60 text-[#087A5B] dark:text-[#20D39B] border border-emerald-300/60 dark:border-emerald-700/50";
      case 2:
        return "bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-300/60 dark:border-purple-700/50";
      case 3:
        return "bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-300/60 dark:border-amber-700/50";
      default:
        return "bg-gray-100 dark:bg-[#0A2E26] text-[#55786B] dark:text-[#8FAFA4] border border-[#D8E8E2] dark:border-[#16463D]";
    }
  };

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] rounded-2xl p-4 shadow-xs transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <h2 className="text-sm sm:text-[15px] font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
          Top Projects (This Week)
        </h2>
        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-semibold text-[#159B72] dark:text-[#20D39B] hover:text-[#087A5B] flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>View All</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Rankings List */}
      <div className="space-y-1.5">
        {TOP_PROJECTS_WEEK.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectProject(item.id)}
            className="group flex items-center gap-2.5 p-2 rounded-xl hover:bg-[#F1F8F5] dark:hover:bg-[#082A24] transition-all cursor-pointer"
          >
            {/* Rank Number Badge */}
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[11px] font-bold ${getRankBadgeStyle(
                item.rank
              )}`}
            >
              {item.rank}
            </div>

            {/* Project Icon */}
            <TopProjectIcon iconStyle={item.iconStyle} />

            {/* Title & Stats */}
            <div className="flex-1 min-w-0">
              <h4 className="text-xs sm:text-[12.5px] font-bold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-[#159B72] dark:group-hover:text-[#20D39B] transition-colors truncate">
                {item.title}
              </h4>
              <p className="text-[10.5px] text-[#658278] dark:text-[#789991] mt-0.5 truncate">
                {item.likes} likes &bull; {item.comments} comments
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
