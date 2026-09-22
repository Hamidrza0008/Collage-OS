"use client";

import Image from "next/image";
import {
  Bookmark,
  Heart,
  MessageSquare,
  ArrowRight,
  Leaf,
  Brain,
  Smartphone,
  BarChart2,
  Globe,
  Gamepad2,
  Link2,
  Lightbulb,
  Sprout,
  Users,
} from "lucide-react";
import { CATEGORY_THEMES } from "./projectsData";

// Helper to render icon for project category/style
function ProjectCategoryIcon({ category, className = "w-3 h-3" }) {
  switch (category) {
    case "Web Development":
      return <Leaf className={className} />;
    case "AI/ML":
      return <Brain className={className} />;
    case "Mobile App":
      return <Smartphone className={className} />;
    case "Data Science":
      return <BarChart2 className={className} />;
    case "Game Development":
      return <Gamepad2 className={className} />;
    case "Blockchain":
      return <Link2 className={className} />;
    default:
      return <Lightbulb className={className} />;
  }
}

// Helper to render large central icon matching reference screenshot
function ProjectVisualCover({ iconStyle, category }) {
  const theme = CATEGORY_THEMES[category] || CATEGORY_THEMES["Other"];
  const iconClass = "w-6 h-6 text-white";

  let iconNode = <Leaf className={iconClass} />;
  if (iconStyle === "ai" || category === "AI/ML") iconNode = <Brain className={iconClass} />;
  else if (iconStyle === "mobile" || category === "Mobile App") iconNode = <Smartphone className={iconClass} />;
  else if (iconStyle === "chart" || category === "Data Science") iconNode = <BarChart2 className={iconClass} />;
  else if (iconStyle === "globe") iconNode = <Globe className={iconClass} />;
  else if (iconStyle === "gamepad" || category === "Game Development") iconNode = <Gamepad2 className={iconClass} />;
  else if (iconStyle === "link" || category === "Blockchain") iconNode = <Link2 className={iconClass} />;
  else if (iconStyle === "lightbulb" || category === "Other") iconNode = <Lightbulb className={iconClass} />;
  else if (iconStyle === "sprout") iconNode = <Sprout className={iconClass} />;

  return (
    <div
      className={`w-13 h-13 rounded-2xl ${theme.iconBg} flex items-center justify-center shrink-0 shadow-xs transition-transform duration-200 group-hover:scale-105`}
    >
      {iconNode}
    </div>
  );
}

export default function ProjectCard({
  project,
  onViewDetails,
  onToggleLike,
  onToggleBookmark,
  isLiked = false,
  isBookmarked = false,
}) {
  const theme = CATEGORY_THEMES[project.category] || CATEGORY_THEMES["Other"];
  const visibleTech = project.tech ? project.tech.slice(0, 4) : [];
  const remainingTechCount = project.tech && project.tech.length > 4 ? project.tech.length - 4 : 0;

  return (
    <div className="group relative flex flex-col justify-between h-full p-4 rounded-2xl bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-xs hover:shadow-md hover:border-[#159B72]/60 dark:hover:border-[#20D39B]/60 transition-all duration-200">
      {/* Top Row: Category Badge + Bookmark */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-[11px] font-semibold border ${theme.badgeBg} ${theme.badgeText} ${theme.badgeBorder}`}
        >
          <ProjectCategoryIcon category={project.category} className="w-3 h-3 shrink-0" />
          <span>{project.category}</span>
        </span>

        {/* Bookmark Icon Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleBookmark(project.id);
          }}
          className={`p-1 rounded-lg transition-colors cursor-pointer ${
            isBookmarked
              ? "text-[#159B72] dark:text-[#20D39B] bg-emerald-50 dark:bg-emerald-950/40"
              : "text-[#85A297] dark:text-[#65857B] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-gray-100 dark:hover:bg-[#082A24]"
          }`}
          title={isBookmarked ? "Remove Bookmark" : "Bookmark Project"}
        >
          <Bookmark
            className={`w-4 h-4 ${isBookmarked ? "fill-[#159B72] dark:fill-[#20D39B]" : ""}`}
          />
        </button>
      </div>

      {/* Middle Body: Large Icon + Title + Description */}
      <div
        onClick={() => onViewDetails(project)}
        className="flex items-start gap-3 cursor-pointer"
      >
        <ProjectVisualCover iconStyle={project.iconStyle} category={project.category} />

        <div className="flex-1 min-w-0">
          <h3 className="text-[14.5px] font-bold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-[#159B72] dark:group-hover:text-[#20D39B] transition-colors leading-snug line-clamp-1">
            {project.title}
          </h3>
          <p className="text-[12px] text-[#55786B] dark:text-[#8FAFA4] mt-1 line-clamp-2 leading-relaxed font-normal">
            {project.description}
          </p>
        </div>
      </div>

      {/* Tech Stack Chips */}
      <div className="mt-3 flex items-center flex-wrap gap-1 min-h-[26px]">
        {visibleTech.map((techItem, index) => (
          <span
            key={index}
            className="text-[10.5px] font-medium px-2 py-0.5 rounded-md bg-[#F1F8F5] dark:bg-[#082A24] text-[#36594C] dark:text-[#B5CCC5] border border-[#D8E8E2]/80 dark:border-[#16463D]/80 whitespace-nowrap"
          >
            {techItem}
          </span>
        ))}
        {remainingTechCount > 0 && (
          <span className="text-[10.5px] font-semibold px-1.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-[#159B72] dark:text-[#20D39B] border border-emerald-200/60 dark:border-emerald-800/40">
            +{remainingTechCount}
          </span>
        )}
      </div>

      {/* Team Info & Social Stats Row */}
      <div className="mt-3 flex items-center justify-between gap-2 text-xs">
        {/* Team Avatars & Member Info */}
        <div className="flex items-center gap-1.5 min-w-0">
          <div className="flex -space-x-1.5 overflow-hidden shrink-0">
            {project.members && project.members.length > 0 ? (
              project.members.slice(0, 3).map((m, idx) => (
                <div
                  key={idx}
                  className="relative w-5 h-5 rounded-full ring-1.5 ring-white dark:ring-[#06241F] overflow-hidden bg-emerald-100 dark:bg-[#082A24]"
                >
                  <Image
                    src={m.avatar || "/assets/layout/profile-avatar.jpg"}
                    alt={m.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ))
            ) : (
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-600 flex items-center justify-center text-[9px] font-bold">
                1
              </div>
            )}
          </div>
          <span className="text-[11px] text-[#55786B] dark:text-[#8FAFA4] font-medium truncate">
            {project.type || "Project"} • {project.membersCount || 1} {project.membersCount > 1 ? "members" : "member"}
          </span>
        </div>

        {/* Likes & Comments Counters */}
        <div className="flex items-center gap-2.5 shrink-0 text-[#658278] dark:text-[#789991]">
          {/* Heart Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleLike(project.id);
            }}
            className="flex items-center gap-1 hover:text-red-500 transition-colors cursor-pointer group/like"
          >
            <Heart
              className={`w-3.5 h-3.5 transition-transform group-hover/like:scale-115 ${
                isLiked
                  ? "fill-red-500 text-red-500"
                  : "text-[#658278] dark:text-[#789991]"
              }`}
            />
            <span
              className={`text-[11px] font-semibold ${
                isLiked ? "text-red-600 dark:text-red-400" : ""
              }`}
            >
              {project.likes}
            </span>
          </button>

          {/* Comments Count */}
          <div className="flex items-center gap-1">
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="text-[11px] font-semibold">
              {project.commentsCount || (project.comments ? project.comments.length : 0)}
            </span>
          </div>
        </div>
      </div>

      {/* Footer Separator & Action Row */}
      <div className="mt-3 pt-2.5 border-t border-[#E8F1ED] dark:border-[#10372F] flex items-center justify-between gap-2">
        <span className="text-[11px] text-[#658278] dark:text-[#789991]">
          Updated {project.updatedAt}
        </span>

        <button
          type="button"
          onClick={() => onViewDetails(project)}
          className="px-3 py-1 text-[11.5px] font-semibold rounded-lg bg-[#159B72] hover:bg-[#087A5B] text-white flex items-center gap-1 transition-all shadow-xs cursor-pointer group-hover:shadow-sm"
        >
          <span>View Project</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
