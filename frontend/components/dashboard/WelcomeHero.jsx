"use client";

import Image from "next/image";
import { Calendar, CloudSun, MapPin, Sparkles, Leaf } from "lucide-react";
import { useTheme } from "../providers/ThemeProvider";

export default function WelcomeHero() {
  const { isDark } = useTheme();

  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-xs border border-[#D8E8E2]/80 dark:border-[#16463D] transition-colors duration-200">
      {/* Background Campus Image (swaps Light / Dark) */}
      <div className="absolute inset-0 z-0">
        <Image
          src={isDark ? "/assets/dashboard/hero-campus-dark.jpg" : "/assets/dashboard/hero-campus-light.jpg"}
          alt="College Campus Architecture"
          fill
          priority
          className="object-cover object-center transition-opacity duration-300"
          sizes="(max-width: 1280px) 100vw, 75vw"
        />
        {/* Directional Gradient Overlays for High Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#031A16]/90 via-[#031A16]/65 to-black/35 dark:from-[#021512]/95 dark:via-[#021512]/80 dark:to-[#021512]/40" />
      </div>

      {/* Content Container - Compact & Sleek */}
      <div className="relative z-10 px-4 py-4 sm:px-6 sm:py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Left Side: Greeting & Context Badges */}
        <div className="space-y-2.5 max-w-xl">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              Good Morning, Hamid! <span className="inline-block">👋</span>
            </h1>
            <p className="text-xs sm:text-[13px] text-emerald-100/90 font-normal mt-0.5">
              Keep going! Small steps every day lead to big results.
            </p>
          </div>

          {/* Contextual Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Date Pill */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/15 text-white text-[11px]">
              <Calendar className="w-3 h-3 text-emerald-300 shrink-0" />
              <span className="font-medium">Mon, 18 Aug 2025</span>
              <span className="text-[9.5px] px-1.5 py-0.2 rounded bg-emerald-500/25 text-emerald-200 border border-emerald-400/30 font-semibold">
                Today
              </span>
            </div>

            {/* Weather Pill */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/15 text-white text-[11px]">
              <CloudSun className="w-3 h-3 text-amber-300 shrink-0" />
              <span className="font-semibold">28&deg;C</span>
              <span className="text-emerald-100/80">Partly Cloudy</span>
            </div>

            {/* College Location Pill */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/15 text-white text-[11px]">
              <MapPin className="w-3 h-3 text-rose-300 shrink-0" />
              <span className="font-medium">XYZ College of Engineering</span>
              <span className="text-emerald-100/80">&bull; Mumbai</span>
            </div>
          </div>
        </div>

        {/* Right Side: Motivational Quote Card */}
        <div className="hidden lg:flex items-center max-w-[240px] shrink-0">
          <div className="p-3 rounded-xl bg-white/10 dark:bg-[#06241F]/60 backdrop-blur-md border border-white/20 dark:border-[#16463D] flex items-start gap-2.5 shadow-sm">
            <div className="p-1.5 rounded-lg bg-emerald-500/20 dark:bg-[#123F35] border border-emerald-400/30 dark:border-[#20D39B]/30 text-emerald-300 dark:text-[#20D39B] shrink-0">
              <Leaf className="w-3.5 h-3.5" />
            </div>
            <div className="space-y-0.5">
              <p className="text-[11.5px] italic font-medium text-white/95 leading-snug">
                &ldquo;Discipline today builds the freedom you want tomorrow.&rdquo;
              </p>
              <div className="flex items-center gap-1 text-[10px] text-emerald-200/80 font-medium">
                <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                <span>Daily Motivation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
