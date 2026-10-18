"use client";

import React from "react";
import { Leaf } from "lucide-react";

export default function ClassesFooter() {
  return (
    <div className="pt-8 pb-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#658278] dark:text-[#789991] border-t border-[#E8F1ED] dark:border-[#10372F] mt-8">
      {/* Left: Breadcrumb / Portal label */}
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-md bg-[#159B72]/15 flex items-center justify-center text-[#159B72] dark:text-[#20D39B]">
          <Leaf className="w-3.5 h-3.5" />
        </div>
        <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
          College OS
        </span>
        <span className="text-[#A7C8BD]">|</span>
        <span>Faculty Portal • My Classes</span>
      </div>

      {/* Right: Slogan */}
      <div className="flex items-center gap-1.5 font-handwriting text-sm sm:text-base text-[#159B72] dark:text-[#20D39B] italic font-semibold select-none">
        <span>Better Teachers Better Tomorrow</span>
        <span>🌿</span>
      </div>
    </div>
  );
}
