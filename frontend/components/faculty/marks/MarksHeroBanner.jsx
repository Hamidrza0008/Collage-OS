"use client";

import React from "react";
import Image from "next/image";
import { Award, Sparkles } from "lucide-react";

export default function MarksHeroBanner({ selectedCourse, selectedExam }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0B3D2F] via-[#0E4F3D] to-[#125A46] text-white shadow-md border border-[#16634E]/40">
      {/* Background Campus Illustration Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30 mix-blend-luminosity">
        <Image
          src="/assets/dashboard/hero-campus-light.jpg"
          alt="Campus Architecture"
          fill
          className="object-cover object-right"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B3D2F] via-[#0B3D2F]/85 to-transparent" />
      </div>

      <div className="relative z-10 px-5 sm:px-6 py-5 sm:py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Left Side: Award Icon Badge + Title & Subtitle */}
        <div className="flex items-center gap-3.5 sm:gap-4 max-w-2xl">
          <div className="w-12 h-12 rounded-xl bg-[#159B72] border border-emerald-400/30 flex items-center justify-center shrink-0 shadow-inner">
            <Award className="w-6 h-6 text-white" strokeWidth={2.2} />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Marks &amp; Results Management
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-400/20 text-emerald-200 border border-emerald-400/30">
                Evaluation Center
              </span>
            </div>
            <p className="text-xs sm:text-sm text-emerald-100/90 font-medium leading-relaxed">
              Input student assessment scores, review automated grade distributions, and lock results for {selectedCourse?.fullName || "assigned courses"}.
            </p>
          </div>
        </div>

        {/* Right Side: Active Scope Badge */}
        <div className="hidden sm:flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 self-end md:self-center shadow-xs">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-300 shrink-0">
            <Sparkles className="w-4 h-4" strokeWidth={2.2} />
          </div>
          <div className="flex flex-col text-right">
            <span className="text-[12px] font-bold text-white tracking-wide">
              {selectedCourse?.code} • {selectedCourse?.shortName}
            </span>
            <span className="text-[11px] text-emerald-200 font-medium">
              {selectedExam?.shortLabel} (Max: {selectedExam?.maxMarks})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
