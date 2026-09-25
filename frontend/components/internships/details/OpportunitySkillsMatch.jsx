"use client";

import { Wrench, CheckCircle2, Circle, Sparkles, FolderGit2 } from "lucide-react";

export default function OpportunitySkillsMatch({ skills = [], preferredSkills = [], skillMatch }) {
  return (
    <div className="rounded-2xl bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-xs p-5 sm:p-7 space-y-6 transition-all">
      {/* 1. Required & Preferred Skills */}
      <div>
        <h3 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] flex items-center gap-2 mb-3">
          <Wrench className="w-4 h-4 text-[#159B72] dark:text-[#20D39B]" />
          <span>Skills in Demand</span>
        </h3>

        {/* Required */}
        <div className="space-y-1.5">
          <span className="text-[11px] uppercase font-bold text-[#658278] dark:text-[#789991] tracking-wider block">
            Required Technical Stack:
          </span>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-xl text-xs font-semibold bg-[#DDF4EB]/60 dark:bg-[#082A24] text-[#0B3024] dark:text-[#F1FAF6] border border-[#159B72]/30"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Preferred */}
        {preferredSkills.length > 0 && (
          <div className="mt-3.5 space-y-1.5">
            <span className="text-[11px] uppercase font-bold text-[#658278] dark:text-[#789991] tracking-wider block">
              Preferred / Good to Have:
            </span>
            <div className="flex flex-wrap gap-2">
              {preferredSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-xl text-xs font-medium bg-gray-100 dark:bg-[#041D18] text-[#36594C] dark:text-[#B5CCC5] border border-gray-200 dark:border-[#10372F]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 2. Personalized "Your Skill Match" Card */}
      {skillMatch && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#F7FBF9] to-[#EBF6F1] dark:from-[#031A16] dark:to-[#06241F] border border-[#159B72]/30 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-[#159B72] text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                  Your Skill Match
                </h4>
                <p className="text-[11px] text-[#658278] dark:text-[#789991]">
                  Calculated against your verified student projects & coursework
                </p>
              </div>
            </div>

            {/* Match Percentage Badge */}
            <div className="text-right">
              <span className="text-xl font-black text-[#159B72] dark:text-[#20D39B]">
                {skillMatch.score}%
              </span>
              <span className="text-[10px] font-bold text-[#658278] dark:text-[#789991] block">
                Strong Match
              </span>
            </div>
          </div>

          {/* Matched vs Missing Chips */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#D8E8E2] dark:border-[#16463D] text-xs">
            {/* Matched */}
            <div>
              <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1 mb-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Skills You Have ({skillMatch.matched?.length || 0}):</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {skillMatch.matched?.map((m, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-emerald-100/70 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 border border-emerald-300/40"
                  >
                    ✓ {m}
                  </span>
                ))}
              </div>
            </div>

            {/* Skills to Brush Up */}
            <div>
              <span className="text-[11px] font-bold text-[#658278] dark:text-[#8AA89F] flex items-center gap-1 mb-1.5">
                <Circle className="w-3.5 h-3.5 text-gray-400" />
                <span>Recommended to Brush Up:</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {skillMatch.missing?.map((mis, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-gray-100 dark:bg-[#082A24] text-gray-700 dark:text-[#B5CCC5] border border-gray-200 dark:border-[#16463D]"
                  >
                    ○ {mis}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Relevant Projects Highlight */}
          {skillMatch.relevantProjects?.length > 0 && (
            <div className="pt-2 border-t border-[#D8E8E2]/60 dark:border-[#16463D]/60 text-xs">
              <span className="text-[11px] font-bold text-[#36594C] dark:text-[#B5CCC5] flex items-center gap-1.5 mb-1.5">
                <FolderGit2 className="w-3.5 h-3.5 text-[#159B72]" />
                <span>Matching Projects from Your Portfolio:</span>
              </span>
              <div className="flex flex-wrap gap-2">
                {skillMatch.relevantProjects.map((p, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-white dark:bg-[#06241F] text-[#0B3024] dark:text-[#F1FAF6] border border-[#D8E8E2] dark:border-[#16463D] text-[11px] font-semibold"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
