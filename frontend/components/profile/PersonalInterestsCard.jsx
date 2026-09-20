"use client";

import { Compass, Pencil } from "lucide-react";

export default function PersonalInterestsCard({ interests = [] }) {
  return (
    <div className="bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] rounded-2xl p-4 sm:p-5 shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[#E8F1ED] dark:border-[#10372F]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#DDF3EB] dark:bg-[#123F35] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center shrink-0">
            <Compass className="w-3.5 h-3.5" />
          </div>
          <h2 className="text-[13.5px] sm:text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            Personal Interests
          </h2>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-1 text-xs font-medium text-[#159B72] dark:text-[#20D39B] hover:underline"
        >
          <Pencil className="w-3 h-3" />
          <span>Edit</span>
        </button>
      </div>

      {/* Interests Chips */}
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {interests.map((interest, index) => (
          <span
            key={index}
            className="px-3 py-1 rounded-full text-xs font-medium bg-[#DDF3EB]/70 dark:bg-[#123F35]/70 text-[#0B3024] dark:text-[#F1FAF6] border border-[#159B72]/20 dark:border-[#20D39B]/20 hover:border-[#159B72]/40 dark:hover:border-[#20D39B]/40 transition-all cursor-default select-none shadow-2xs"
          >
            {interest}
          </span>
        ))}
      </div>
    </div>
  );
}
