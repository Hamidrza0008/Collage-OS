"use client";

import { Leaf } from "lucide-react";

export default function AIDataSourceFooter() {
  return (
    <div className="rounded-2xl border border-emerald-500/20 bg-[#ECF9F4] dark:bg-[#072B23] px-4 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-2xs">
      {/* Left: Powered By Label with Leaf Badge */}
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-full bg-[#159B72] text-white flex items-center justify-center shrink-0 shadow-2xs">
          <Leaf className="w-3.5 h-3.5" />
        </div>
        <div className="text-xs text-[#0B3024] dark:text-[#F1FAF6] font-medium">
          Powered by Your College Data <span className="text-emerald-500 mx-1">•</span> MongoDB <span className="text-emerald-500 mx-1">•</span> RAG
        </div>
      </div>

      {/* Right: Signature Slogan */}
      <div className="text-xs sm:text-[13px] font-serif italic text-emerald-800 dark:text-emerald-300 font-semibold flex items-center gap-1 self-end sm:self-auto">
        <span>Your College. Your AI.</span>
        <span className="not-italic text-sm">💚</span>
      </div>
    </div>
  );
}
