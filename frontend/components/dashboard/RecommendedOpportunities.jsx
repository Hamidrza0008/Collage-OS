"use client";

import { Sparkles, ArrowRight, Award, Briefcase, Trophy } from "lucide-react";
import Link from "next/link";

const OPPORTUNITIES = [
  {
    title: "Google Summer of Code",
    category: "Internship • Remote",
    badge: "High Demand",
    badgeColor: "bg-emerald-50 text-emerald-700 dark:bg-[#123F35] dark:text-[#20D39B]",
    icon: Award,
  },
  {
    title: "Hackathon - DevWars 2025",
    category: "Hackathon • Online",
    badge: "Win Prizes",
    badgeColor: "bg-amber-50 text-amber-700 dark:bg-[#3D2C0B] dark:text-[#FBBF24]",
    icon: Trophy,
  },
  {
    title: "Web Dev Internship",
    category: "Internship • Remote",
    badge: "₹15k/mo",
    badgeColor: "bg-teal-50 text-teal-700 dark:bg-[#0E352F] dark:text-[#2DD4BF]",
    icon: Briefcase,
  },
];

export default function RecommendedOpportunities() {
  return (
    <div className="p-3.5 sm:p-4 rounded-xl bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-2xs flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-2.5 border-b border-[#E8F1ED] dark:border-[#10372F]">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#DDF3EB] dark:bg-[#123F35] text-[#159B72] dark:text-[#20D39B]">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <h2 className="text-xs sm:text-[13px] font-bold text-[#0B3024] dark:text-[#F1FAF6] leading-tight">
              Recommended For You
            </h2>
          </div>

          <Link
            href="/student/internships"
            className="group inline-flex items-center gap-1 text-[11px] font-semibold text-[#159B72] dark:text-[#20D39B] hover:text-[#087A5B] dark:hover:text-[#4AE3B5] transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Opportunities List */}
        <div className="mt-2.5 space-y-1.5">
          {OPPORTUNITIES.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="py-1 px-2 rounded-lg bg-[#F7FBF9]/60 dark:bg-[#031A16]/40 border border-[#E8F1ED] dark:border-[#10372F] hover:border-[#D8E8E2] dark:hover:border-[#16463D] transition-all flex items-center justify-between gap-2 group cursor-pointer"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Icon className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B] shrink-0" />
                  <div className="min-w-0">
                    <h3 className="text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-[#159B72] dark:group-hover:text-[#20D39B] transition-colors truncate leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-[10px] text-[#658278] dark:text-[#789991] truncate">
                      {item.category}
                    </p>
                  </div>
                </div>

                <span
                  className={`px-1.5 py-0.2 rounded text-[9.5px] font-semibold shrink-0 ${item.badgeColor}`}
                >
                  {item.badge}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
