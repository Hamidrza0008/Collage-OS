"use client";

import { FolderSearch, Heart, Users, FolderPlus, RotateCcw } from "lucide-react";
import ProjectCard from "./ProjectCard";

export default function ProjectGrid({
  projects = [],
  activeTab = "all",
  searchQuery = "",
  onViewDetails,
  onToggleLike,
  onToggleBookmark,
  likedIds,
  bookmarkedIds,
  onResetFilters,
  onOpenCreateModal,
}) {
  // Empty State Handler
  if (projects.length === 0) {
    let icon = <FolderSearch className="w-10 h-10 text-emerald-500/80 mb-2" />;
    let title = "No Projects Found";
    let desc = "No projects match your current filters or search term.";
    let actionBtn = (
      <button
        type="button"
        onClick={onResetFilters}
        className="mt-3.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#159B72] text-white hover:bg-[#087A5B] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Reset Filters</span>
      </button>
    );

    if (activeTab === "my-projects" && !searchQuery) {
      icon = <FolderPlus className="w-10 h-10 text-emerald-500/80 mb-2" />;
      title = "No My Projects";
      desc = "You haven't created any projects yet. Start by posting your own project!";
      actionBtn = (
        <button
          type="button"
          onClick={onOpenCreateModal}
          className="mt-3.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#159B72] text-white hover:bg-[#087A5B] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <FolderPlus className="w-3.5 h-3.5" />
          <span>Create Project</span>
        </button>
      );
    } else if (activeTab === "liked" && !searchQuery) {
      icon = <Heart className="w-10 h-10 text-rose-500/80 mb-2" />;
      title = "No Liked Projects";
      desc = "You haven't liked any projects yet. Explore the gallery and save your favorites!";
      actionBtn = (
        <button
          type="button"
          onClick={onResetFilters}
          className="mt-3.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#159B72] text-white hover:bg-[#087A5B] transition-colors cursor-pointer shadow-xs"
        >
          Browse All Projects
        </button>
      );
    } else if (activeTab === "my-team" && !searchQuery) {
      icon = <Users className="w-10 h-10 text-teal-500/80 mb-2" />;
      title = "No Team Projects";
      desc = "You are not listed as a team member on any projects yet.";
      actionBtn = (
        <button
          type="button"
          onClick={onResetFilters}
          className="mt-3.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#159B72] text-white hover:bg-[#087A5B] transition-colors cursor-pointer shadow-xs"
        >
          Explore Projects
        </button>
      );
    }

    return (
      <div className="w-full py-16 px-4 rounded-2xl bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] flex flex-col items-center justify-center text-center shadow-xs">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-800/40 flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] mt-3">
          {title}
        </h3>
        <p className="text-xs text-[#55786B] dark:text-[#8FAFA4] mt-1 max-w-sm leading-relaxed">
          {desc}
        </p>
        {actionBtn}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onViewDetails={onViewDetails}
          onToggleLike={onToggleLike}
          onToggleBookmark={onToggleBookmark}
          isLiked={likedIds.has(project.id)}
          isBookmarked={bookmarkedIds.has(project.id)}
        />
      ))}
    </div>
  );
}
