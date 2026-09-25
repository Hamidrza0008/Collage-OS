"use client";

import Image from "next/image";
import Link from "next/link";
import { Package, Leaf, UserCheck, ChevronRight } from "lucide-react";
import { useTheme } from "../providers/ThemeProvider";

export default function LostFoundHero() {
  const { isDark } = useTheme();

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-emerald-800/40 bg-[#063327] shadow-xs">
      {/* Background Campus Image Layer - Clearly Visible Behind Balanced Emerald Overlay */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        <Image
          src={
            isDark
              ? "/assets/lost-and-found/dark/hero-banner.jpg"
              : "/assets/lost-and-found/light/hero-banner.jpg"
          }
          alt="College Campus Architecture"
          fill
          priority
          className="object-cover object-right opacity-65 dark:opacity-45 transition-opacity duration-300"
        />
        {/* Balanced directional emerald gradient overlay ensuring crisp readability while keeping campus photography clearly recognizable */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#042A20]/95 via-[#042A20]/80 to-[#042A20]/35" />
      </div>

      {/* Content Layer: Compact & Information Dense matching the reference */}
      <div className="relative z-10 py-4 px-5 sm:px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 min-h-[96px]">
        {/* Left: Box/Package Icon + Title + Subtitle */}
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/25 border border-emerald-400/40 flex items-center justify-center shrink-0 text-emerald-300 shadow-xs">
            <Package className="w-6 h-6 text-emerald-300" />
          </div>

          <div className="flex flex-col">
            <h1 className="text-2xl sm:text-[25px] font-bold text-white tracking-tight leading-tight">
              Lost &amp; Found
            </h1>
            <p className="text-xs sm:text-[13px] text-emerald-100/85 mt-0.5 font-normal max-w-md leading-snug">
              Help us reunite lost items with their owners. Report, search, and keep our campus safe and connected.
            </p>
          </div>
        </div>

        {/* Right: My Reports Link & Motivational Script Badge */}
        <div className="shrink-0 self-start sm:self-center flex flex-wrap items-center gap-2.5">
          <Link
            href="/student/lost-and-found/my-reports"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/40 hover:bg-black/60 border border-emerald-400/40 text-emerald-200 hover:text-white text-xs font-semibold backdrop-blur-xs transition-all shadow-2xs group cursor-pointer"
          >
            <UserCheck className="w-3.5 h-3.5 text-emerald-300" />
            <span>My Reports &amp; Claims</span>
            <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform opacity-75" />
          </Link>

          <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-black/35 border border-emerald-500/25 backdrop-blur-xs text-right">
            <div className="flex flex-col text-right">
              <span className="text-[13px] italic font-semibold text-emerald-200/90 tracking-wide font-serif leading-tight">
                Small things
              </span>
              <span className="text-[14px] italic font-bold text-emerald-300 tracking-wide font-serif leading-tight flex items-center justify-end gap-1.5">
                make a big difference!
                <Leaf className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/40 inline not-italic" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
