"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Star,
  Bookmark,
  Share2,
  ExternalLink,
  MoreVertical,
  Flag,
  UserPlus,
  Copy,
  Check,
  Sparkles,
} from "lucide-react";
import GithubIcon from "./GithubIcon";
import { useTheme } from "../../providers/ThemeProvider";

export default function ProjectHero({
  project,
  isLiked,
  likesCount,
  onToggleLike,
  isBookmarked,
  onToggleBookmark,
  onOpenJoinModal,
  onOpenReportModal,
  onCopyLink,
  onShare,
}) {
  const { isDark } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isMenuOpen]);

  const handleCopy = () => {
    if (onCopyLink) {
      onCopyLink();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    setIsMenuOpen(false);
  };

  const bannerSrc = isDark
    ? project.bannerDark || "/assets/projects/dark/hero-banner.jpg"
    : project.bannerLight || "/assets/projects/light/hero-banner.jpg";

  return (
    <section
      aria-label="Project Header"
      className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#06241F] shadow-xs"
    >
      {/* Top Visual Showcase Banner */}
      <div className="relative w-full h-48 sm:h-64 md:h-76 select-none overflow-hidden bg-[#06241F]">
        <Image
          src={bannerSrc}
          alt={project.title}
          fill
          priority
          className="object-cover object-center transition-transform duration-500 hover:scale-102"
        />
        {/* Ambient Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#03261F]/80 via-transparent to-black/30" />

        {/* Floating Category & Status Badges over Visual */}
        <div className="absolute top-4 left-4 sm:top-5 sm:left-5 flex items-center gap-2 flex-wrap z-10">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#159B72] text-white shadow-md backdrop-blur-md flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#20D39B]" />
            <span>{project.category}</span>
          </span>
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/20 dark:bg-black/40 text-white border border-white/30 backdrop-blur-md">
            {project.status || "In Development"}
          </span>
        </div>

        {/* Top-Right Quick Interaction Buttons (Like, Bookmark, More) */}
        <div className="absolute top-4 right-4 sm:top-5 sm:right-5 flex items-center gap-2 z-10">
          {/* Like / Star */}
          <button
            type="button"
            onClick={onToggleLike}
            className={`px-3 py-1.5 rounded-xl border backdrop-blur-md text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-95 ${
              isLiked
                ? "bg-amber-400/90 text-amber-950 border-amber-300"
                : "bg-black/40 hover:bg-black/60 text-white border-white/25 hover:border-white/40"
            }`}
            title={isLiked ? "Unlike project" : "Star this project"}
          >
            <Star
              className={`w-3.5 h-3.5 ${
                isLiked ? "fill-amber-950 text-amber-950" : "text-amber-400"
              }`}
            />
            <span>{likesCount}</span>
          </button>

          {/* Bookmark */}
          <button
            type="button"
            onClick={onToggleBookmark}
            className={`p-2 rounded-xl border backdrop-blur-md transition-all cursor-pointer shadow-sm active:scale-95 ${
              isBookmarked
                ? "bg-[#159B72] text-white border-emerald-400"
                : "bg-black/40 hover:bg-black/60 text-white border-white/25 hover:border-white/40"
            }`}
            title={isBookmarked ? "Saved in bookmarks" : "Bookmark project"}
            aria-label="Bookmark project"
          >
            <Bookmark
              className={`w-4 h-4 ${
                isBookmarked ? "fill-current text-white" : "text-white/90"
              }`}
            />
          </button>

          {/* More Actions Menu */}
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-xl bg-black/40 hover:bg-black/60 text-white border border-white/25 hover:border-white/40 backdrop-blur-md transition-all cursor-pointer shadow-sm active:scale-95"
              title="More actions"
              aria-label="More actions"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-xl p-1.5 z-50 text-xs animate-in fade-in zoom-in-95 duration-150">
                <button
                  type="button"
                  onClick={() => {
                    if (onShare) onShare();
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-[#0B3024] dark:text-[#F1FAF6] hover:bg-[#F0F8F5] dark:hover:bg-[#0A2E27] font-medium transition-colors text-left"
                >
                  <Share2 className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B]" />
                  <span>Share Project</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-[#0B3024] dark:text-[#F1FAF6] hover:bg-[#F0F8F5] dark:hover:bg-[#0A2E27] font-medium transition-colors text-left"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B]" />
                  )}
                  <span>{copied ? "Link Copied!" : "Copy Project Link"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (onOpenJoinModal) onOpenJoinModal();
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-[#0B3024] dark:text-[#F1FAF6] hover:bg-[#F0F8F5] dark:hover:bg-[#0A2E27] font-medium transition-colors text-left"
                >
                  <UserPlus className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B]" />
                  <span>Request to Join Team</span>
                </button>

                <div className="h-px bg-gray-100 dark:bg-[#10372F] my-1" />

                <button
                  type="button"
                  onClick={() => {
                    if (onOpenReportModal) onOpenReportModal();
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 font-medium transition-colors text-left"
                >
                  <Flag className="w-3.5 h-3.5" />
                  <span>Report Project</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Banner Title Overlay */}
        <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white z-10">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight drop-shadow-md">
            {project.title}
          </h1>
        </div>
      </div>

      {/* Hero Bottom Body: Tagline + Primary CTAs */}
      <div className="p-4 sm:p-6 md:p-7 space-y-4">
        {/* Project Tagline */}
        <p className="text-sm sm:text-base text-[#4C6B61] dark:text-[#A1C2B7] leading-relaxed">
          {project.tagline || project.description}
        </p>

        {/* Action Buttons: Live Demo + GitHub */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4.5 py-2.5 rounded-xl bg-[#159B72] hover:bg-[#0E825E] text-white text-xs sm:text-sm font-bold shadow-sm hover:shadow transition-all active:scale-95 cursor-pointer"
            >
              <span>View Live Demo</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-[#F7FBF9] dark:bg-[#082A24] hover:bg-[#E8F3EE] dark:hover:bg-[#0c3830] text-[#0B3024] dark:text-[#F1FAF6] text-xs sm:text-sm font-semibold transition-all active:scale-95 cursor-pointer"
            >
              <GithubIcon className="w-4 h-4" />
              <span>View GitHub</span>
            </a>
          )}

          <button
            type="button"
            onClick={onOpenJoinModal}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-dashed border-[#159B72]/40 hover:border-[#159B72] dark:border-[#20D39B]/40 dark:hover:border-[#20D39B] text-[#159B72] dark:text-[#20D39B] text-xs font-semibold hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 transition-all cursor-pointer ml-auto sm:ml-0"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Join Team</span>
          </button>
        </div>
      </div>
    </section>
  );
}
