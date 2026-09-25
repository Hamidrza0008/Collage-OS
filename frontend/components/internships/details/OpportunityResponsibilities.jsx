"use client";

import { CheckCircle2, ListChecks, Trophy } from "lucide-react";

export default function OpportunityResponsibilities({ opportunity }) {
  const isHackathon = opportunity.type === "hackathon";
  const items = opportunity.responsibilities || [];

  if (items.length === 0) return null;

  return (
    <div className="rounded-2xl bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-xs p-5 sm:p-7 transition-all">
      <h3 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] flex items-center gap-2 mb-3.5">
        {isHackathon ? (
          <Trophy className="w-4 h-4 text-[#159B72] dark:text-[#20D39B]" />
        ) : (
          <ListChecks className="w-4 h-4 text-[#159B72] dark:text-[#20D39B]" />
        )}
        <span>{isHackathon ? "Challenge Deliverables & Rules" : "Key Responsibilities"}</span>
      </h3>

      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-[#DDF4EB] dark:bg-[#082A24] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
              ✓
            </div>
            <p className="text-xs sm:text-[13px] text-[#36594C] dark:text-[#C5DCD4] leading-relaxed font-normal">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
