"use client";

import React from "react";
import Image from "next/image";
import { Leaf } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";

export default function NoticesHeroBanner() {
  const { isDark } = useTheme();

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-emerald-900/30 bg-[#063327] shadow-xs">
      {/* Background Campus Architectural Layer */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        <Image
          src={
            isDark
              ? "/assets/dashboard/hero-campus-dark.jpg"
              : "/assets/dashboard/hero-campus-light.jpg"
          }
          alt="College Campus Architecture"
          fill
          priority
          className="object-cover object-right opacity-60 dark:opacity-40 transition-opacity duration-300"
        />
        {/* Directional dark emerald gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#042A20] via-[#042A20]/80 to-transparent" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 py-5 px-5 sm:px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 min-h-[96px]">
        {/* Left: Leaf Icon Badge + Heading + Subtitle */}
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#159B72] flex items-center justify-center shrink-0 text-white shadow-sm">
            <Leaf className="w-6 h-6 text-white transform -rotate-12 fill-white/20" />
          </div>

          <div className="flex flex-col">
            <h1 className="text-2xl sm:text-[23px] font-bold text-white tracking-tight leading-tight">
              Notices & Announcements
            </h1>
            <p className="text-xs sm:text-[13px] text-emerald-100/90 mt-0.5 font-normal max-w-xl leading-snug">
              Stay updated with the latest college notices, announcements and important information.
            </p>
          </div>
        </div>

        {/* Right: Stay Informed Stay Ahead script text matching Image 2 */}
        <div className="shrink-0 self-start sm:self-center pr-4">
          <div className="flex flex-col text-right select-none drop-shadow-md">
            <span className="text-[13px] font-serif italic text-emerald-100/95 leading-tight">
              Stay
            </span>
            <span className="text-[16px] font-serif italic font-bold text-white tracking-wide leading-tight">
              Informed
            </span>
            <span className="text-[13px] font-serif italic text-emerald-100/95 leading-tight flex items-center justify-end gap-1.5">
              Stay Ahead
              <Leaf className="w-3.5 h-3.5 text-emerald-300 inline fill-emerald-300/30" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
