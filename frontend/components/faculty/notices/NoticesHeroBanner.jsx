"use client";

import React from "react";
import Image from "next/image";
import { Leaf } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";

export default function NoticesHeroBanner() {
  const { isDark } = useTheme();

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-emerald-800/40 bg-[#063327] shadow-xs">
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
          className="object-cover object-right opacity-50 dark:opacity-35 transition-opacity duration-300"
        />
        {/* Directional dark emerald gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#042A20]/95 via-[#042A20]/80 to-transparent" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 py-5 px-5 sm:px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 min-h-[96px]">
        {/* Left: Leaf Icon Badge + Heading + Subtitle */}
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#159B72] border border-emerald-400/30 flex items-center justify-center shrink-0 text-white shadow-md">
            <Leaf className="w-6 h-6 text-white transform -rotate-12 fill-white/20" />
          </div>

          <div className="flex flex-col">
            <h1 className="text-2xl sm:text-[24px] font-bold text-white tracking-tight leading-tight">
              Notices & Announcements
            </h1>
            <p className="text-xs sm:text-[13px] text-emerald-100/90 mt-0.5 font-normal max-w-xl leading-snug">
              Stay updated with the latest college notices, announcements and important information.
            </p>
          </div>
        </div>

        {/* Right: Stay Informed Stay Ahead script pill */}
        <div className="shrink-0 self-start sm:self-center pr-2">
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-black/35 border border-emerald-500/20 backdrop-blur-xs text-right">
            <div className="flex flex-col text-right">
              <span className="text-[12px] font-serif italic text-emerald-200/90 leading-tight">
                Stay
              </span>
              <span className="text-[14px] font-serif italic font-bold text-emerald-300 tracking-wide leading-tight">
                Informed
              </span>
              <span className="text-[12px] font-serif italic text-emerald-200/90 leading-tight flex items-center justify-end gap-1">
                Stay Ahead
                <Leaf className="w-3 h-3 text-emerald-400 inline" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
