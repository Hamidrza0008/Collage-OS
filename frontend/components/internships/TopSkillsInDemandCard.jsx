"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { TOP_SKILLS } from "./internshipsData";

export default function TopSkillsInDemandCard({
  selectedSkill,
  onSelectSkill,
  onViewAll,
}) {
  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] rounded-2xl p-4 shadow-xs transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <h2 className="text-sm sm:text-[15px] font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight flex items-center gap-1.5">
          <span>Top Skills in Demand</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        </h2>
        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-semibold text-[#159B72] dark:text-[#20D39B] hover:text-[#087A5B] flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>View All</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Skills Chips */}
      <div className="flex flex-wrap gap-1.5">
        {TOP_SKILLS.map((skill) => {
          const isSelected = selectedSkill === skill;
          return (
            <button
              key={skill}
              type="button"
              onClick={() => onSelectSkill(isSelected ? "" : skill)}
              className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                isSelected
                  ? "bg-[#159B72] text-white shadow-xs"
                  : "bg-[#F7FBF9] dark:bg-[#082A24] text-[#426659] dark:text-[#9FBDB4] border border-[#D8E8E2] dark:border-[#16463D] hover:bg-[#EBF7F2] dark:hover:bg-[#0D4436] hover:text-[#0B3024] dark:hover:text-[#F1FAF6]"
              }`}
            >
              {skill}
            </button>
          );
        })}
      </div>
    </div>
  );
}
