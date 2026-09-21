"use client";

import Image from "next/image";
import { CalendarDays } from "lucide-react";
import { useTheme } from "../providers/ThemeProvider";

export default function EventsHero() {
  const { isDark } = useTheme();

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-emerald-800/40 bg-[#063327] shadow-xs">
      {/* Background Campus Image Layer with Visible Architecture & Greenery */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        <Image
          src={
            isDark
              ? "/assets/events/dark/hero-banner.jpg"
              : "/assets/events/light/hero-banner.jpg"
          }
          alt="College Campus Architecture"
          fill
          priority
          className="object-cover object-right opacity-55 dark:opacity-40 transition-opacity duration-300"
        />
        {/* Directional emerald gradient overlay ensuring crisp text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#042A20]/95 via-[#042A20]/80 to-[#042A20]/30" />
      </div>

      {/* Content Layer: Compact & Information Dense */}
      <div className="relative z-10 py-4 px-5 sm:px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 min-h-[96px]">
        {/* Left: Large Calendar Icon + Title + Subtitle */}
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-emerald-500/25 border border-emerald-400/40 flex items-center justify-center shrink-0 text-emerald-300 shadow-xs">
            <CalendarDays className="w-6 h-6 text-emerald-300" />
          </div>

          <div className="flex flex-col">
            <h1 className="text-2xl sm:text-[25px] font-bold text-white tracking-tight leading-tight">
              Events
            </h1>
            <p className="text-xs sm:text-[13px] text-emerald-100/85 mt-0.5 font-normal max-w-md leading-snug">
              Discover college events, workshops, competitions and be a part of the campus community.
            </p>
          </div>
        </div>

        {/* Right: Motivational Script Badge */}
        <div className="shrink-0 self-start sm:self-center">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-black/35 border border-emerald-500/25 backdrop-blur-xs text-right">
            <div className="flex flex-col text-right">
              <span className="text-[12.5px] italic font-semibold text-emerald-200/90 tracking-wide font-serif leading-tight">
                More Events
              </span>
              <span className="text-[12.5px] italic font-semibold text-emerald-200/90 tracking-wide font-serif leading-tight">
                More Opportunities
              </span>
              <span className="text-[12.5px] italic font-bold text-emerald-300 tracking-wide font-serif leading-tight flex items-center justify-end gap-1">
                Better You!
                <span className="text-sm not-italic">🍃</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
