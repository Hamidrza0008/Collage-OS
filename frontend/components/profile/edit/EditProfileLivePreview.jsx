"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Check,
  CheckCircle2,
  ExternalLink,
  Globe,
  Star,
  Sparkles,
  Layers,
  ArrowRight,
} from "lucide-react";
import { calculateProfileCompletion } from "./editProfileData";

function GithubIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={`${className} fill-current`} viewBox="0 0 24 24">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={`${className} fill-current`} viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

export default function EditProfileLivePreview({
  profileState,
  activeSection = "section-photo",
}) {
  const completion = calculateProfileCompletion(profileState);
  const featuredProject =
    profileState.projects?.find((p) => p.isFeatured) || profileState.projects?.[0];

  const primarySkills = [
    ...(profileState.skills?.primary || []),
    ...(profileState.skills?.tools || []),
  ].slice(0, 5);

  const SECTIONS = [
    { id: "section-photo", label: "Profile Photo" },
    { id: "section-identity", label: "Identity & Headline" },
    { id: "section-about", label: "About & Focus" },
    { id: "section-skills", label: "Skills & Expertise" },
    { id: "section-links", label: "Portfolio Links" },
    { id: "section-portfolio", label: "Showcase Projects" },
    { id: "section-achievements", label: "Achievements" },
    { id: "section-contributions", label: "Contributions" },
    { id: "section-academic", label: "Academic Info" },
    { id: "section-visibility", label: "Visibility" },
  ];

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <aside className="space-y-4">
      {/* 1. Quick Section Navigation */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] shadow-sm">
        <span className="text-xs font-bold text-[#06241F] dark:text-white block mb-2.5">
          Editor Navigation
        </span>
        <div className="grid grid-cols-2 gap-1.5">
          {SECTIONS.map((sec) => (
            <button
              key={sec.id}
              type="button"
              onClick={() => handleScrollTo(sec.id)}
              className="px-2.5 py-1.5 rounded-lg text-left text-[11px] font-medium text-[#06241F]/80 dark:text-[#D8E8E2]/80 hover:bg-[#159B72]/10 dark:hover:bg-[#20D39B]/10 hover:text-[#159B72] dark:hover:text-[#20D39B] transition-colors truncate cursor-pointer"
            >
              {sec.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Live Public Profile Preview Card */}
      <div className="rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] shadow-sm overflow-hidden">
        {/* Preview header banner */}
        <div className="px-4 py-2.5 bg-[#06241F] text-white flex items-center justify-between border-b border-[#10372F]">
          <span className="text-[11px] font-semibold flex items-center gap-1.5 text-[#20D39B]">
            <span className="w-2 h-2 rounded-full bg-[#20D39B] animate-pulse" />
            Live Profile Preview
          </span>
          <Link
            href={`/student/profile/${profileState.id || "student-1"}`}
            className="text-[10px] text-white/80 hover:text-[#20D39B] inline-flex items-center gap-1 transition-colors"
          >
            <span>Full View</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </Link>
        </div>

        {/* Card Body */}
        <div className="p-4 space-y-4">
          {/* Avatar + Identity header */}
          <div className="flex items-center gap-3">
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#159B72] dark:border-[#20D39B] shrink-0 bg-black/5 dark:bg-black/30">
              <Image
                src={profileState.avatar || "/assets/profile/avatar.jpg"}
                alt={profileState.name || "Student"}
                fill
                className="object-cover"
              />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-[#06241F] dark:text-white truncate">
                  {profileState.name || "Student Name"}
                </span>
                <span className="w-3.5 h-3.5 rounded-full bg-[#159B72] dark:bg-[#20D39B] text-white dark:text-[#021512] flex items-center justify-center shrink-0">
                  <Check className="w-2 h-2 stroke-[3]" />
                </span>
              </div>
              <p className="text-[11px] text-[#06241F]/60 dark:text-[#D8E8E2]/60 truncate">
                {profileState.username || "@username"}
              </p>
              <p className="text-[10px] text-[#159B72] dark:text-[#20D39B] font-medium truncate mt-0.5">
                {profileState.academic?.branch || "CSE"} &bull; {profileState.academic?.semester || "7th Sem"}
              </p>
            </div>
          </div>

          {/* Headline */}
          {profileState.headline && (
            <p className="text-xs font-medium text-[#06241F]/90 dark:text-[#D8E8E2]/90 line-clamp-2">
              {profileState.headline}
            </p>
          )}

          {/* Motivational Quote */}
          {profileState.quote && (
            <p className="text-[11px] italic text-[#06241F]/70 dark:text-[#D8E8E2]/70 bg-[#F8FAFC] dark:bg-[#021512] p-2 rounded-lg border border-[#D8E8E2]/60 dark:border-[#10372F]/60">
              &ldquo;{profileState.quote}&rdquo;
            </p>
          )}

          {/* Skills Preview */}
          {primarySkills.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-[#06241F]/60 dark:text-[#D8E8E2]/60 uppercase tracking-wider block">
                Top Skills
              </span>
              <div className="flex flex-wrap gap-1">
                {primarySkills.map((s, idx) => (
                  <span
                    key={`${s.name}-${idx}`}
                    className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#159B72]/10 dark:bg-[#20D39B]/10 text-[#06241F] dark:text-[#D8E8E2] border border-[#159B72]/20 dark:border-[#20D39B]/20"
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Featured Project Snippet */}
          {featuredProject && (
            <div className="p-2.5 rounded-xl bg-[#F8FAFC] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#159B72] dark:text-[#20D39B] flex items-center gap-1 uppercase tracking-wider">
                  <Star className="w-2.5 h-2.5 fill-current" />
                  Featured Project
                </span>
                <span className="text-[10px] text-gray-400">
                  {featuredProject.visibility || "Public"}
                </span>
              </div>
              <p className="text-xs font-bold text-[#06241F] dark:text-white truncate">
                {featuredProject.title}
              </p>
              <p className="text-[11px] text-[#06241F]/70 dark:text-[#D8E8E2]/70 line-clamp-2">
                {featuredProject.tagline || featuredProject.description}
              </p>
            </div>
          )}

          {/* Social Links Row */}
          <div className="flex items-center gap-2 pt-1 border-t border-[#D8E8E2]/60 dark:border-[#10372F]/60">
            {profileState.socialLinks?.github && (
              <a
                href={profileState.socialLinks.github}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg bg-[#F8FAFC] dark:bg-[#021512] text-[#06241F] dark:text-white hover:text-[#159B72] transition-colors"
                title="GitHub"
              >
                <GithubIcon className="w-3.5 h-3.5" />
              </a>
            )}
            {profileState.socialLinks?.linkedin && (
              <a
                href={profileState.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg bg-[#F8FAFC] dark:bg-[#021512] text-[#0077b5] hover:opacity-80 transition-opacity"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
              </a>
            )}
            {profileState.socialLinks?.portfolio && (
              <a
                href={profileState.socialLinks.portfolio}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg bg-[#F8FAFC] dark:bg-[#021512] text-[#159B72] dark:text-[#20D39B] hover:opacity-80 transition-opacity"
                title="Portfolio"
              >
                <Globe className="w-3.5 h-3.5" />
              </a>
            )}
            <span className="text-[10px] text-[#06241F]/50 dark:text-[#D8E8E2]/50 ml-auto font-mono">
              Status: {profileState.visibility?.profile || "Public"}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Profile Completion Scorecard */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#06241F] dark:text-white flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B]" />
            Profile Completion
          </span>
          <span className="text-xs font-bold font-mono text-[#159B72] dark:text-[#20D39B]">
            {completion.percentage}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 rounded-full bg-[#D8E8E2]/50 dark:bg-[#10372F] overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#159B72] to-[#20D39B] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${completion.percentage}%` }}
          />
        </div>

        {/* Dynamic Checklist */}
        <div className="space-y-1.5 pt-1">
          {completion.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-2 text-[11px]"
            >
              {item.completed ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              ) : (
                <span className="w-3.5 h-3.5 rounded-full border border-gray-400/50 dark:border-gray-500/50 shrink-0" />
              )}
              <span
                className={
                  item.completed
                    ? "text-[#06241F]/80 dark:text-[#D8E8E2]/80"
                    : "text-gray-400 dark:text-gray-500"
                }
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
