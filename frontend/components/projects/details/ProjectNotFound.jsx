"use client";

import Link from "next/link";
import { FolderSearch, ArrowLeft, RotateCcw } from "lucide-react";

export default function ProjectNotFound({ projectId }) {
  return (
    <div className="w-full max-w-[1440px] mx-auto py-12 px-4 sm:px-6 text-center">
      <div className="max-w-md mx-auto p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-sm space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-[#E8F7F1] dark:bg-[#0A2E27] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center mx-auto shadow-2xs">
          <FolderSearch className="w-8 h-8" />
        </div>

        <div className="space-y-1.5">
          <h1 className="text-xl sm:text-2xl font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
            Project Not Found
          </h1>
          <p className="text-xs sm:text-[13px] text-[#658278] dark:text-[#8BAEA3] leading-relaxed">
            The project identifier <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-[#082A24] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">{projectId || "unknown"}</code> could not be located in our records. It may have been removed, made private, or the URL may be inaccurate.
          </p>
        </div>

        <div className="pt-2 flex items-center justify-center gap-3">
          <Link
            href="/student/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#159B72] hover:bg-[#0E825E] text-white text-xs sm:text-sm font-bold shadow-xs transition-all active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Projects</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
