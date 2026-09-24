"use client";

import {
  Star,
  GitFork,
  AlertCircle,
  GitCommit,
  ExternalLink,
} from "lucide-react";
import GithubIcon from "./GithubIcon";

export default function GithubStatsCard({ stats, githubUrl }) {
  if (!stats) return null;

  const url = githubUrl || `https://github.com/${stats.repoName || "Hamidrza0008/Collage-OS"}`;

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-xs space-y-3.5">
      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-[#E8F3EE] dark:border-[#10372F]">
        <div className="flex items-center gap-2">
          <GithubIcon className="w-4 h-4 text-[#0B3024] dark:text-[#F1FAF6]" />
          <h3 className="text-xs sm:text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
            GitHub Repository
          </h3>
        </div>
        <span className="text-[10px] font-mono font-medium text-[#658278] dark:text-[#8BAEA3]">
          {stats.branch || "main"}
        </span>
      </div>

      {/* Repo Name */}
      <div className="text-xs">
        <span className="text-[11px] text-[#658278] dark:text-[#8BAEA3]">Repository:</span>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="block font-mono font-bold text-[#159B72] dark:text-[#20D39B] hover:underline truncate mt-0.5"
        >
          {stats.repoName || "Hamidrza0008/Collage-OS"}
        </a>
      </div>

      {/* Stats 4-Grid */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-2.5 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#E8F3EE] dark:border-[#10372F]">
          <div className="flex items-center gap-1.5 text-amber-500 mb-0.5">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="text-[10px] text-[#658278] dark:text-[#8BAEA3]">Stars</span>
          </div>
          <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6] text-sm">
            {stats.stars || 0}
          </span>
        </div>

        <div className="p-2.5 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#E8F3EE] dark:border-[#10372F]">
          <div className="flex items-center gap-1.5 text-sky-500 mb-0.5">
            <GitFork className="w-3.5 h-3.5" />
            <span className="text-[10px] text-[#658278] dark:text-[#8BAEA3]">Forks</span>
          </div>
          <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6] text-sm">
            {stats.forks || 0}
          </span>
        </div>

        <div className="p-2.5 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#E8F3EE] dark:border-[#10372F]">
          <div className="flex items-center gap-1.5 text-emerald-500 mb-0.5">
            <GitCommit className="w-3.5 h-3.5" />
            <span className="text-[10px] text-[#658278] dark:text-[#8BAEA3]">Commits</span>
          </div>
          <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6] text-sm">
            {stats.commits || 0}
          </span>
        </div>

        <div className="p-2.5 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#E8F3EE] dark:border-[#10372F]">
          <div className="flex items-center gap-1.5 text-rose-500 mb-0.5">
            <AlertCircle className="w-3.5 h-3.5" />
            <span className="text-[10px] text-[#658278] dark:text-[#8BAEA3]">Issues</span>
          </div>
          <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6] text-sm">
            {stats.openIssues || 0}
          </span>
        </div>
      </div>

      {/* Button */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] hover:bg-[#E8F3EE] dark:hover:bg-[#0C352C] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] text-xs font-semibold transition-colors cursor-pointer"
      >
        <span>View Repository</span>
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}
