"use client";

import Image from "next/image";
import { Bot, Leaf, Sparkles } from "lucide-react";
import { useTheme } from "../providers/ThemeProvider";

export default function CampusAIHero() {
  const { isDark } = useTheme();

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-emerald-800/40 bg-[#063327] shadow-xs">
      {/* Background Campus Image Layer */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        <Image
          src={
            isDark
              ? "/assets/campus-ai/dark/hero-banner.jpg"
              : "/assets/campus-ai/light/hero-banner.jpg"
          }
          alt="Modern College Campus"
          fill
          priority
          className="object-cover object-center opacity-65 dark:opacity-45 transition-opacity duration-300"
        />
        {/* Balanced directional emerald gradient overlay ensuring crisp readability while keeping campus photography clearly recognizable */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#042A20]/95 via-[#042A20]/80 to-[#042A20]/30" />
      </div>

      {/* Content Layer: Compact & Information Dense inside 2/3 column */}
      <div className="relative z-10 py-4 px-5 sm:px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 min-h-[96px]">
        {/* Left: AI Robot Icon + Title + Subtitle */}
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-emerald-500/25 border border-emerald-400/40 flex items-center justify-center shrink-0 text-emerald-300 shadow-xs">
            <Bot className="w-6 h-6 text-emerald-300" />
          </div>

          <div className="flex flex-col">
            <h1 className="text-2xl sm:text-[25px] font-bold text-white tracking-tight leading-tight flex items-center gap-2">
              Campus AI
              <span className="text-emerald-300 text-lg sm:text-xl font-normal select-none">✦</span>
            </h1>
            <p className="text-xs sm:text-[13px] text-emerald-100/90 mt-0.5 font-normal max-w-lg leading-snug">
              Your college-specific AI assistant. Get accurate answers from your college data, policies, guidelines, and more — powered by MongoDB + RAG.
            </p>
          </div>
        </div>

        {/* Right: Motivational Script Badge (Ask Learn Grow) */}
        <div className="shrink-0 self-start sm:self-center hidden sm:block">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-black/35 border border-emerald-500/25 backdrop-blur-xs text-right">
            <div className="flex flex-col text-right">
              <span className="text-[13px] italic font-semibold text-emerald-200/90 tracking-wide font-serif leading-tight">
                Ask. Learn.
              </span>
              <span className="text-[14px] italic font-bold text-emerald-300 tracking-wide font-serif leading-tight flex items-center justify-end gap-1.5">
                Grow
                <Leaf className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/40 inline not-italic" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
