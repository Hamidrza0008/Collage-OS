"use client";

import { GraduationCap, ArrowRight } from "lucide-react";

export default function FeedbackCtaCard({ onOpenFeedback }) {
  return (
    <div
      onClick={onOpenFeedback}
      className="relative rounded-2xl overflow-hidden border border-emerald-700/40 bg-gradient-to-r from-[#06382B] via-[#084838] to-[#0D5B46] p-4 text-white shadow-xs flex items-center justify-between gap-3 cursor-pointer group hover:border-emerald-500/70 transition-all hover:scale-[1.01] active:scale-[0.99]"
    >
      {/* Background ambient glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-400/10 rounded-full blur-xl pointer-events-none" />

      {/* Left: Graduation Cap Icon */}
      <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 text-white group-hover:scale-105 transition-transform">
        <GraduationCap className="w-5 h-5 text-emerald-300" />
      </div>

      {/* Center: Title & Subtitle */}
      <div className="flex-1 min-w-0">
        <h3 className="text-xs sm:text-[13px] font-bold text-white leading-tight">
          Have suggestions?
        </h3>
        <p className="text-[10.5px] text-emerald-100/85 mt-0.5 leading-snug">
          Help us make College OS better for everyone.
        </p>
      </div>

      {/* Right: Arrow Button */}
      <div className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-white text-white group-hover:text-[#0B3024] flex items-center justify-center shrink-0 transition-colors">
        <ArrowRight className="w-3.5 h-3.5" />
      </div>
    </div>
  );
}
