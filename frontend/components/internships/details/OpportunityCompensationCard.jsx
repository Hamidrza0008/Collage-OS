"use client";

import { DollarSign, Trophy, Gift, Check, Sparkles } from "lucide-react";

export default function OpportunityCompensationCard({ opportunity }) {
  const isHackathon = opportunity.type === "hackathon";
  const perks = opportunity.perks || [];

  return (
    <div className="rounded-2xl bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-xs p-5 sm:p-7 space-y-4 transition-all">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] flex items-center gap-2">
          {isHackathon ? (
            <Trophy className="w-4 h-4 text-amber-500" />
          ) : (
            <DollarSign className="w-4 h-4 text-[#159B72] dark:text-[#20D39B]" />
          )}
          <span>{isHackathon ? "Prize Pool & Rewards" : "Stipend & Benefits"}</span>
        </h3>

        <div className="text-right">
          <span className="text-base sm:text-lg font-black text-[#159B72] dark:text-[#20D39B]">
            {opportunity.stipend || opportunity.prizePool}
          </span>
        </div>
      </div>

      {/* Perks List */}
      {perks.length > 0 && (
        <div className="pt-3 border-t border-[#E8F1ED] dark:border-[#10372F] space-y-2.5">
          <span className="text-[11px] uppercase font-bold text-[#658278] dark:text-[#789991] tracking-wider block">
            What's Included:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {perks.map((perk, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-[#F7FBF9] dark:bg-[#031A16] border border-[#E8F1ED] dark:border-[#10372F]"
              >
                <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5" />
                </div>
                <span className="text-[#36594C] dark:text-[#C5DCD4] font-medium leading-snug">
                  {perk}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
