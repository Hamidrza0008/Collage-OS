"use client";

import Image from "next/image";
import { Megaphone, Sparkles } from "lucide-react";
import { useTheme } from "../providers/ThemeProvider";

export default function NoticesHero() {
  const { isDark } = useTheme();

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-emerald-800/40 bg-[#063327] shadow-xs">
      {/* Background Campus Image Layer with High Visibility */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        <Image
          src={
            isDark
              ? "/assets/notices/dark/hero-banner.jpg"
              : "/assets/notices/light/hero-banner.jpg"
          }
          alt="College OS Campus Architecture"
          fill
          priority
          className="object-cover object-right opacity-45 dark:opacity-35 transition-opacity duration-300"
        />
        {/* Directional dark emerald gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#042A20]/95 via-[#042A20]/80 to-transparent" />
      </div>

      {/* Content Layer: Compact, streamlined */}
      <div className="relative z-10 py-4 px-5 sm:px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 min-h-[92px]">
        {/* Left: Megaphone Icon + Heading + Subtitle */}
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center shrink-0 text-emerald-300 shadow-xs">
            <Megaphone className="w-5 h-5 text-emerald-300 transform -rotate-12" />
          </div>

          <div className="flex flex-col">
            <h1 className="text-2xl sm:text-[24px] font-bold text-white tracking-tight leading-tight">
              Notices & Announcements
            </h1>
            <p className="text-xs sm:text-[13px] text-emerald-100/80 mt-0.5 font-normal max-w-lg leading-snug">
              Stay updated with the latest college notices, announcements and important updates.
            </p>
          </div>
        </div>

        {/* Right: Motivational script visual treatment */}
        <div className="shrink-0 self-start sm:self-center">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-black/30 border border-emerald-500/20 backdrop-blur-xs text-right">
            <div className="flex flex-col text-right">
              <span className="text-[12.5px] italic font-semibold text-emerald-200/90 tracking-wide font-serif leading-tight">
                Stay informed,
              </span>
              <span className="text-[12.5px] italic font-bold text-emerald-300 tracking-wide font-serif leading-tight flex items-center justify-end gap-1">
                Stay ahead!
                <span className="text-sm not-italic">🍃</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
