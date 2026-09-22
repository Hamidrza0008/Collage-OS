"use client";

import { Leaf, ArrowRight, Sparkles } from "lucide-react";

export default function ProjectIdeaCta({ onOpenModal }) {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-r from-[#EBF7F2] via-[#F1F9F5] to-[#E3F4ED] dark:from-[#062A22] dark:via-[#05251E] dark:to-[#041D17] border border-[#CDE5DC] dark:border-[#124236] p-4 sm:p-5 shadow-xs transition-all">
      {/* Decorative leaf / plant watermark background on the right */}
      <div className="absolute right-0 top-0 bottom-0 w-44 pointer-events-none opacity-20 dark:opacity-10 overflow-hidden flex items-center justify-end pr-4 text-emerald-600">
        <Leaf className="w-36 h-36 rotate-12" />
      </div>

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Left: Icon Badge + Content */}
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-[#159B72] text-white flex items-center justify-center shrink-0 shadow-xs">
            <Leaf className="w-5 h-5 fill-white/20" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
                Have a project idea?
              </h3>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300">
                <Sparkles className="w-2.5 h-2.5 text-amber-500" />
                Get Funded & Guided
              </span>
            </div>
            <p className="text-xs text-[#55786B] dark:text-[#8FAFA4] mt-0.5 leading-snug">
              Find teammates, get guidance and turn your idea into something amazing!
            </p>
          </div>
        </div>

        {/* Right: Action Button */}
        <div className="shrink-0 self-start sm:self-center">
          <button
            type="button"
            onClick={onOpenModal}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#159B72] hover:bg-[#087A5B] text-white text-xs font-bold transition-all shadow-xs cursor-pointer hover:shadow-sm"
          >
            <span>Post a Project Idea</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
