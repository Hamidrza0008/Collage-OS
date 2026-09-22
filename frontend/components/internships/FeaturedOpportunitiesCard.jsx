"use client";

import { ArrowRight, ChevronRight } from "lucide-react";
import CompanyLogo from "./CompanyLogo";
import { FEATURED_OPPORTUNITIES, BADGE_STYLES } from "./internshipsData";

export default function FeaturedOpportunitiesCard({ onSelectOpportunity, onViewAll }) {
  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] rounded-2xl p-4 shadow-xs transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <h2 className="text-sm sm:text-[15px] font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
          Featured Opportunities
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

      {/* Opportunities List */}
      <div className="space-y-1.5">
        {FEATURED_OPPORTUNITIES.map((item) => {
          const badgeStyle = BADGE_STYLES[item.badge] || BADGE_STYLES["Open"];
          return (
            <div
              key={item.id}
              onClick={() => onSelectOpportunity(item.id)}
              className="group flex items-center justify-between gap-2 p-2 rounded-xl hover:bg-[#F1F8F5] dark:hover:bg-[#082A24] transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <CompanyLogo logoType={item.logoType} className="w-7 h-7" />
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-[#159B72] dark:group-hover:text-[#20D39B] transition-colors truncate">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-[#658278] dark:text-[#789991] truncate">
                    {item.meta}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <span
                  className={`px-1.5 py-0.5 rounded text-[9.5px] font-bold border ${badgeStyle.bg} ${badgeStyle.text} ${badgeStyle.border}`}
                >
                  {item.badge}
                </span>
                <ChevronRight className="w-3 h-3 text-[#85A297] group-hover:text-[#159B72] group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
