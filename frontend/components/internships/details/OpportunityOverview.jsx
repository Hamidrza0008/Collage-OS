"use client";

import { Building2, Info, ExternalLink, Globe } from "lucide-react";

export default function OpportunityOverview({ opportunity }) {
  return (
    <div className="rounded-2xl bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-xs p-5 sm:p-7 space-y-6 transition-all">
      {/* 1. About the Role / Opportunity */}
      <div>
        <h3 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] flex items-center gap-2 mb-2.5">
          <Info className="w-4 h-4 text-[#159B72] dark:text-[#20D39B]" />
          <span>About the Opportunity</span>
        </h3>
        <p className="text-xs sm:text-[13.5px] text-[#36594C] dark:text-[#C5DCD4] leading-relaxed text-justify font-normal">
          {opportunity.aboutRole}
        </p>
      </div>

      {/* 2. About the Company / Organization */}
      <div className="pt-5 border-t border-[#E8F1ED] dark:border-[#10372F]">
        <div className="flex items-center justify-between gap-3 mb-2.5">
          <h3 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#159B72] dark:text-[#20D39B]" />
            <span>About {opportunity.company}</span>
          </h3>

          {opportunity.companyWebsite && (
            <a
              href={opportunity.companyWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-[#159B72] dark:text-[#20D39B] hover:underline flex items-center gap-1"
            >
              <span>Visit Website</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>

        <p className="text-xs sm:text-[13.5px] text-[#36594C] dark:text-[#C5DCD4] leading-relaxed text-justify font-normal">
          {opportunity.aboutCompany}
        </p>
      </div>
    </div>
  );
}
