"use client";

import Image from "next/image";
import { FileText, Clock } from "lucide-react";
import { useTheme } from "../providers/ThemeProvider";

export default function AssignmentsHero({ pendingCount = 3 }) {
  const { isDark } = useTheme();

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-emerald-800/40 bg-[#063327] shadow-xs">
      {/* Background Campus Image Layer with Visibility */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        <Image
          src={isDark ? "/assets/assignments/dark/hero-banner.jpg" : "/assets/assignments/light/hero-banner.jpg"}
          alt="Campus Academic Architecture"
          fill
          priority
          className="object-cover object-right opacity-45 dark:opacity-35 transition-opacity duration-300"
        />
        {/* Soft directional dark emerald gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#042A20]/95 via-[#042A20]/80 to-transparent" />
      </div>

      {/* Content Layer: Compact, streamlined */}
      <div className="relative z-10 py-4 px-5 sm:px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 min-h-[92px]">
        {/* Left: Icon + Heading + Subtitle */}
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center shrink-0 text-emerald-300 shadow-xs">
            <FileText className="w-5 h-5 text-emerald-300" />
          </div>

          <div className="flex flex-col">
            <h1 className="text-2xl sm:text-[24px] font-bold text-white tracking-tight leading-tight">
              Assignments
            </h1>
            <p className="text-xs sm:text-[13px] text-emerald-100/80 mt-0.5 font-normal max-w-lg leading-snug">
              Stay on top of your assignments. Submit on time, earn better results.
            </p>
          </div>
        </div>

        {/* Right: Compact Status Badge */}
        <div className="shrink-0 self-start sm:self-center">
          <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-black/35 border border-emerald-500/20 backdrop-blur-xs text-xs text-emerald-100">
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[10.5px] text-emerald-200/70">You have</span>
              <span className="font-bold text-emerald-300 text-xs">
                {pendingCount} pending <span className="font-normal text-emerald-100/90">assignments</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
