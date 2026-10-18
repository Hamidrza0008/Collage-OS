"use client";

import React from "react";
import { Leaf } from "lucide-react";

export default function ResourcesSidebarQuote() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#CDE5DB] dark:border-[#10372F] bg-gradient-to-br from-[#EAF6F0] via-[#F2FAF6] to-[#E3F4EC] dark:from-[#05241C] dark:via-[#072F24] dark:to-[#041D17] p-5 sm:p-6 shadow-2xs">
      {/* Decorative leaf watermark in top-left */}
      <div className="w-8 h-8 rounded-lg bg-[#159B72]/15 dark:bg-[#20D39B]/15 flex items-center justify-center text-[#159B72] dark:text-[#20D39B] mb-3">
        <Leaf className="w-4 h-4 fill-[#159B72]/20 dark:fill-[#20D39B]/20 transform -rotate-12" />
      </div>

      {/* Quote text in serif italic matching screenshot */}
      <div className="relative z-10 space-y-3">
        <p className="text-[14.5px] sm:text-[15.5px] font-serif italic text-[#0B3024] dark:text-[#E8F6EF] leading-relaxed tracking-wide">
          &ldquo;Resources are the building blocks of your academic journey.&rdquo;
        </p>

        {/* Delicate leaf doodle / accent line */}
        <div className="flex items-center gap-2 pt-1 text-[#159B72]/60 dark:text-[#20D39B]/60">
          <div className="w-10 h-[1.5px] bg-[#159B72]/30 dark:bg-[#20D39B]/30 rounded-full" />
          <Leaf className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Botanical foliage illustration in bottom right */}
      <div className="absolute -bottom-4 -right-4 w-28 h-28 pointer-events-none select-none opacity-20 dark:opacity-10">
        <svg
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-[#159B72] dark:text-[#20D39B]"
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
