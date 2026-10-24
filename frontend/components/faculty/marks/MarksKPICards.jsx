"use client";

import React from "react";
import { Users, Award, CheckCircle2, TrendingUp, ArrowUpRight } from "lucide-react";

export default function MarksKPICards({ stats, maxMarks }) {
  const cards = [
    {
      id: "enrolled_students",
      label: "Enrolled Students",
      sublabel: "Active Class Roster",
      count: String(stats?.totalStudents || 15),
      trend: "100%",
      trendType: "up",
      trendText: "registered",
      icon: Users,
      iconBg: "bg-[#E6F7F0] dark:bg-[#073629] text-[#159B72] dark:text-[#20D39B]",
    },
    {
      id: "evaluated_students",
      label: "Evaluated / Graded",
      sublabel: `Pending: ${stats?.pendingCount || 0}`,
      count: String(stats?.gradedCount || 0),
      percentage: `${stats?.evaluationPercentage || 0}%`,
      trend: `${stats?.absentCount || 0} Absent`,
      trendType: stats?.absentCount > 0 ? "neutral" : "up",
      trendText: "recorded",
      icon: CheckCircle2,
      iconBg: "bg-[#EBF5FF] dark:bg-[#0A2E47] text-[#2563EB] dark:text-[#60A5FA]",
    },
    {
      id: "class_average",
      label: "Class Average",
      sublabel: `Out of ${maxMarks} marks`,
      count: stats?.averageMarks ? `${stats.averageMarks}` : "--",
      percentage: stats?.averagePercentage ? `${stats.averagePercentage}%` : null,
      trend: "+4.2%",
      trendType: "up",
      trendText: "vs last term",
      icon: TrendingUp,
      iconBg: "bg-[#F5EDFF] dark:bg-[#2C1340] text-[#9333EA] dark:text-[#C084FC]",
    },
    {
      id: "highest_score",
      label: "Highest Score",
      sublabel: stats?.topStudent ? stats.topStudent.name : "Top Performance",
      count: stats?.highestMarks !== null && stats?.highestMarks !== undefined ? `${stats.highestMarks}` : "--",
      percentage: stats?.highestPercentage ? `${stats.highestPercentage}%` : null,
      trend: "Grade O",
      trendType: "up",
      trendText: "distinction",
      icon: Award,
      iconBg: "bg-[#FEF3C7] dark:bg-[#451A03] text-[#D97706] dark:text-[#FBBF24]",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.id}
            className="p-4 sm:p-4.5 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] shadow-xs flex flex-col justify-between group hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${card.iconBg}`}
              >
                <Icon className="w-5 h-5" strokeWidth={2} />
              </div>

              <div className="min-w-0">
                <span className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] block truncate">
                  {card.label}
                </span>
                {card.sublabel && (
                  <span className="text-[10px] text-[#658278] dark:text-[#789991] block -mt-0.5 truncate max-w-[130px]">
                    {card.sublabel}
                  </span>
                )}

                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#0B3024] dark:text-[#F1FAF6] leading-none">
                    {card.count}
                  </span>
                  {card.percentage && (
                    <span className="text-xs font-semibold text-[#658278] dark:text-[#789991]">
                      {card.percentage}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Trend */}
            <div className="pt-3 mt-2 border-t border-[#F0F5F2] dark:border-[#0E352E] flex items-center gap-1.5 text-[11px]">
              <span className="inline-flex items-center font-bold text-[#159B72] dark:text-[#20D39B]">
                <ArrowUpRight className="w-3.5 h-3.5" />
                {card.trend}
              </span>
              <span className="text-[#658278] dark:text-[#789991]">
                {card.trendText}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
