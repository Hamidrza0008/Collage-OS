"use client";

import React from "react";
import { Leaf } from "lucide-react";

export default function NoticesQuoteCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#D5E8DF] dark:border-[#10372F] bg-gradient-to-br from-[#EEF7F3] via-[#E8F5EF] to-[#DDF0E7] dark:from-[#06261D] dark:via-[#082D23] dark:to-[#041D16] p-6 shadow-2xs">
      {/* Decorative leaf watermark in top-left */}
      <div className="w-8 h-8 rounded-lg bg-[#159B72]/15 dark:bg-[#159B72]/20 flex items-center justify-center text-[#159B72] dark:text-[#2CDAA6] mb-4">
        <Leaf className="w-4 h-4 fill-[#159B72]/20 dark:fill-[#2CDAA6]/20 transform -rotate-12" />
      </div>

      {/* Quote text in serif italic matching screenshot */}
      <div className="relative z-10 space-y-3">
        <p className="text-[15px] sm:text-[16px] font-serif italic text-[#0B3A2C] dark:text-[#E8F7F2] leading-relaxed tracking-wide">
          &ldquo;Communication builds a stronger campus community.&rdquo;
        </p>

        {/* Delicate leaf accent line */}
        <div className="flex items-center gap-2 pt-1 text-[#159B72]/70 dark:text-[#2CDAA6]/70">
          <div className="w-12 h-[1px] bg-[#159B72]/40 dark:bg-[#2CDAA6]/40" />
          <Leaf className="w-3.5 h-3.5 fill-[#159B72]/30 dark:fill-[#2CDAA6]/30" />
        </div>
      </div>

      {/* Botanical foliage illustration in bottom right */}
      <div className="absolute -bottom-4 -right-4 w-32 h-32 pointer-events-none select-none opacity-20 dark:opacity-10 text-[#159B72] dark:text-[#2CDAA6]">
        <svg
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
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
