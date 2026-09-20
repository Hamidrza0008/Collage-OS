"use client";

import { Code2, Pencil } from "lucide-react";

export default function SkillsCard({ skills = [] }) {
  return (
    <div className="bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] rounded-2xl p-4 sm:p-5 shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[#E8F1ED] dark:border-[#10372F]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#DDF3EB] dark:bg-[#123F35] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center shrink-0">
            <Code2 className="w-3.5 h-3.5" />
          </div>
          <h2 className="text-[13.5px] sm:text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            Skills
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

      {/* Skills Chips */}
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#F1F8F5] dark:bg-[#0A2A24] text-[#0B3024] dark:text-[#F1FAF6] border border-[#D8E8E2] dark:border-[#16463D] hover:border-[#159B72]/50 dark:hover:border-[#20D39B]/50 hover:text-[#159B72] dark:hover:text-[#20D39B] transition-all cursor-default select-none shadow-2xs"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
