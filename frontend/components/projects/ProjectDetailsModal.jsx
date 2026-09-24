"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  X,
  Heart,
  Bookmark,
  ExternalLink,
  Users,
  Calendar,
  GitBranch,
  Send,
  MessageSquare,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { CATEGORY_THEMES } from "./projectsData";

function GithubIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={`fill-current ${className}`} viewBox="0 0 24 24">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export default function ProjectDetailsModal({
  project,
  onClose,
  onToggleLike,
  onToggleBookmark,
  onMemberClick,
  isLiked = false,
  isBookmarked = false,
  onAddComment,
}) {
  const [newComment, setNewComment] = useState("");

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const theme = CATEGORY_THEMES[project.category] || CATEGORY_THEMES["Other"];

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    onAddComment(project.id, newComment.trim());
    setNewComment("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative px-5 sm:px-6 pt-5 pb-4 border-b border-[#E8F1ED] dark:border-[#10372F] flex items-center justify-between gap-3 bg-[#F7FBF9] dark:bg-[#082A24]">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold border ${theme.badgeBg} ${theme.badgeText} ${theme.badgeBorder}`}
            >
              {project.category}
            </span>
            <span className="text-xs text-[#55786B] dark:text-[#8FAFA4] font-medium">
              &bull; Branch: {project.branch || "CSE"}
            </span>
          </div>

          {/* Action buttons: Like, Bookmark, Close */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onToggleLike(project.id)}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                isLiked
                  ? "bg-red-50 dark:bg-red-950/40 text-red-500"
                  : "bg-white dark:bg-[#06241F] text-[#658278] hover:text-red-500 border border-[#D8E8E2] dark:border-[#16463D]"
              }`}
              title="Like project"
            >
              <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500" : ""}`} />
            </button>

            <button
              type="button"
              onClick={() => onToggleBookmark(project.id)}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                isBookmarked
                  ? "bg-emerald-50 dark:bg-emerald-950/40 text-[#159B72]"
                  : "bg-white dark:bg-[#06241F] text-[#658278] hover:text-[#159B72] border border-[#D8E8E2] dark:border-[#16463D]"
              }`}
              title="Bookmark project"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-[#159B72]" : ""}`} />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-white dark:bg-[#06241F] text-[#658278] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] border border-[#D8E8E2] dark:border-[#16463D] transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          {/* Title & Metadata */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
              {project.title}
            </h2>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-[#55786B] dark:text-[#8FAFA4]">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#159B72]" />
                Updated {project.updatedAt}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#159B72]" />
                {project.type} ({project.membersCount} {project.membersCount > 1 ? "members" : "member"})
              </span>
              <span className="flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500/30" />
                {project.likes} Likes
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="p-4 rounded-2xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#E8F1ED] dark:border-[#10372F]">
            <h4 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] uppercase tracking-wider mb-1.5">
              About the Project
            </h4>
            <p className="text-xs sm:text-sm text-[#36594C] dark:text-[#B5CCC5] leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Key Highlights if available */}
          {project.highlights && project.highlights.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                Key Features & Highlights
              </h4>
              <ul className="space-y-1.5">
                {project.highlights.map((hl, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-xs text-[#36594C] dark:text-[#B5CCC5]"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#159B72] shrink-0" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack */}
          <div>
            <h4 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] uppercase tracking-wider mb-2">
              Technology Stack
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.tech?.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#DDF4EB] dark:bg-[#0D4436] text-[#087A5B] dark:text-[#20D39B] border border-emerald-300/40 dark:border-emerald-700/40"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Team Members */}
          <div>
            <h4 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] uppercase tracking-wider mb-2.5">
              Contributors & Team
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.members?.map((m, idx) => (
                <div
                  key={idx}
                  onClick={() => onMemberClick && onMemberClick(m)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onMemberClick && onMemberClick(m);
                    }
                  }}
                  title={`View profile of ${m.name}`}
                  className="flex items-center gap-2.5 p-2 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#E8F1ED] dark:border-[#10372F] hover:border-emerald-500/40 hover:bg-emerald-50/20 dark:hover:bg-[#0a352c] transition-all cursor-pointer group"
                >
                  <div className="relative w-8 h-8 rounded-full overflow-hidden bg-emerald-100 group-hover:scale-105 transition-transform shrink-0">
                    <Image
                      src={m.avatar || "/assets/layout/profile-avatar.jpg"}
                      alt={m.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {m.name}
                    </h5>
                    <p className="text-[10.5px] text-[#658278] dark:text-[#789991]">
                      {m.role || "Member"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Project Links: GitHub & Live Demo */}
          <div className="flex flex-wrap gap-2.5 pt-1">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0B3024] dark:bg-[#082A24] text-white hover:bg-black text-xs font-bold transition-all shadow-xs"
              >
                <GithubIcon className="w-4 h-4" />
                <span>View Repository</span>
              </a>
            )}

            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#159B72] hover:bg-[#087A5B] text-white text-xs font-bold transition-all shadow-xs"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
            )}
          </div>

          {/* Comments Section */}
          <div className="pt-3 border-t border-[#E8F1ED] dark:border-[#10372F]">
            <h4 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-[#159B72]" />
              Discussion ({project.comments?.length || 0})
            </h4>

            {/* List existing comments */}
            <div className="space-y-2 mb-3">
              {project.comments && project.comments.length > 0 ? (
                project.comments.map((c) => (
                  <div
                    key={c.id}
                    className="p-2.5 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] text-xs border border-[#E8F1ED] dark:border-[#10372F]"
                  >
                    <div className="flex items-center justify-between text-[11px] font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-1">
                      <span>{c.author}</span>
                      <span className="text-[10px] font-normal text-[#658278] dark:text-[#789991]">
                        {c.time}
                      </span>
                    </div>
                    <p className="text-[#36594C] dark:text-[#B5CCC5] leading-relaxed">
                      {c.text}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-[#658278] dark:text-[#789991] italic">
                  No comments yet. Start the conversation!
                </p>
              )}
            </div>

            {/* Post comment input */}
            <form onSubmit={handleCommentSubmit} className="flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add feedback or ask to collaborate..."
                className="flex-1 px-3.5 py-2 rounded-xl text-xs bg-[#F7FBF9] dark:bg-[#082A24] text-[#0B3024] dark:text-[#F1FAF6] border border-[#D8E8E2] dark:border-[#16463D] focus:outline-none focus:border-[#159B72]"
              />
              <button
                type="submit"
                className="px-3.5 py-2 rounded-xl bg-[#159B72] hover:bg-[#087A5B] text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
