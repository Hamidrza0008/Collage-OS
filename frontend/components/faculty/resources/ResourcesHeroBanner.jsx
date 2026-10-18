"use client";

import React from "react";
import Image from "next/image";
import { Folder, Leaf } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";

export default function ResourcesHeroBanner() {
  const { isDark } = useTheme();

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-[#C4E3D5] dark:border-emerald-800/40 bg-gradient-to-r from-[#DDF2E7] via-[#EAF7F0] to-[#E5F3EC] dark:from-[#042A20] dark:via-[#063327] dark:to-[#04241B] shadow-xs">
      {/* Background Campus Architectural Layer on Right */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-full sm:w-3/5 lg:w-1/2">
          <Image
            src={
              isDark
                ? "/assets/dashboard/hero-campus-dark.jpg"
                : "/assets/dashboard/hero-campus-light.jpg"
            }
            alt="College Campus Architecture"
            fill
            priority
            className="object-cover object-right opacity-85 dark:opacity-35 transition-opacity duration-300"
          />
          {/* Directional gradient overlay blending campus building into the hero background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#DDF2E7] via-[#DDF2E7]/70 to-transparent dark:from-[#042A20] dark:via-[#042A20]/80 dark:to-transparent" />
        </div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 py-5 px-5 sm:px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 min-h-[96px]">
        {/* Left: Prominent Folder Icon Badge + Heading + Subtitle */}
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#159B72] border border-emerald-400/30 flex items-center justify-center shrink-0 text-white shadow-md">
            <Folder className="w-6 h-6 text-white fill-white/20" />
          </div>

          <div className="flex flex-col">
            <h1 className="text-2xl sm:text-[24px] font-bold text-[#0B3024] dark:text-white tracking-tight leading-tight">
              Resources
            </h1>
            <p className="text-xs sm:text-[13px] text-[#36594C] dark:text-emerald-100/90 mt-0.5 font-normal max-w-xl leading-snug">
              Access study materials, academic resources, and useful documents — all in one place.
            </p>
          </div>
        </div>

        {/* Right: Learn Share Grow script badge over campus foliage */}
        <div className="shrink-0 self-start sm:self-center pr-2">
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-[#063327]/85 dark:bg-black/60 border border-emerald-500/20 backdrop-blur-xs text-right shadow-md">
            <div className="flex flex-col text-right">
              <span className="text-[12px] font-serif italic text-emerald-200/90 leading-tight">
                Learn
              </span>
              <span className="text-[14px] font-serif italic font-bold text-emerald-300 tracking-wide leading-tight">
                Share
              </span>
              <span className="text-[12px] font-serif italic text-emerald-200/90 leading-tight flex items-center justify-end gap-1">
                Grow
                <Leaf className="w-3 h-3 text-emerald-400 inline" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
