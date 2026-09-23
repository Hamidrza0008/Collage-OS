"use client";

import { ShieldCheck, ArrowRight, Sparkles } from "lucide-react";

export default function LostFoundMainCTA({ onOpenReportModal }) {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-r from-[#ECF9F4] via-[#F1F8F5] to-[#E3F4ED] dark:from-[#062921] dark:via-[#083027] dark:to-[#0A362D] border border-[#D8E8E2] dark:border-[#16463D] p-4 sm:p-4.5 shadow-2xs">
      {/* Decorative leaf/ambient element */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-emerald-500/10 to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: Icon + Text */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#159B72] text-white flex items-center justify-center shrink-0 shadow-xs">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] flex items-center gap-1.5">
              Lost something? Found something?
            </h3>
            <p className="text-xs text-[#55786B] dark:text-[#9FB7AD] mt-0.5 max-w-lg">
              Together we can keep our campus safe and help people get their belongings back.
            </p>
          </div>
        </div>

        {/* Right: Action Button */}
        <div className="shrink-0">
          <button
            type="button"
            onClick={onOpenReportModal}
            className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold bg-[#159B72] hover:bg-[#0E825E] text-white transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs hover:shadow-sm"
          >
            <span>Report an Item</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
