"use client";

import React from "react";
import { Leaf } from "lucide-react";

export default function NoticesQuoteCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-emerald-200/60 dark:border-emerald-800/40 bg-gradient-to-br from-emerald-50/80 via-[#edfbf4] to-emerald-100/50 dark:from-[#06261d]/80 dark:via-[#093025]/70 dark:to-[#041d16]/90 p-6 shadow-2xs">
      {/* Decorative leaf watermark in top-left */}
      <div className="w-8 h-8 rounded-lg bg-emerald-600/10 dark:bg-emerald-400/10 flex items-center justify-center text-emerald-700 dark:text-emerald-300 mb-4">
        <Leaf className="w-4 h-4 fill-emerald-600/20 dark:fill-emerald-400/20 transform -rotate-12" />
      </div>

      {/* Quote text in serif italic */}
      <div className="relative z-10 space-y-3">
        <p className="text-[15px] sm:text-[16px] font-serif italic text-emerald-950 dark:text-emerald-100/90 leading-relaxed tracking-wide">
          &ldquo;Communication builds a stronger campus community.&rdquo;
        </p>

        {/* Delicate leaf doodle / accent line */}
        <div className="flex items-center gap-2 pt-1 text-emerald-600/60 dark:text-emerald-400/60">
          <div className="w-12 h-[1px] bg-emerald-400/40 dark:bg-emerald-600/40" />
          <Leaf className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Botanical foliage illustration in bottom right */}
      <div className="absolute -bottom-4 -right-4 w-28 h-28 pointer-events-none select-none opacity-25 dark:opacity-15">
        <svg
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-emerald-700 dark:text-emerald-300"
        >
          <path
            d="M90 110C90 70 60 40 20 40C20 80 50 110 90 110Z"
            fill="currentColor"
          />
          <path
            d="M110 90C110 50 80 20 40 20C40 60 70 90 110 90Z"
            fill="currentColor"
            fillOpacity="0.6"
          />
          <path
            d="M75 115C75 85 55 65 25 65C25 95 45 115 75 115Z"
            fill="currentColor"
            fillOpacity="0.4"
          />
        </svg>
      </div>
    </div>
  );
}
