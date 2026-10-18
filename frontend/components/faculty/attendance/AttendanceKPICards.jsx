"use client";

import React from "react";
import { Users, ShieldCheck, AlertTriangle, Calendar, ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function AttendanceKPICards() {
  const cards = [
    {
      id: "total_students",
      label: "Total Students",
      sublabel: "(Assigned Classes)",
      count: "156",
      trend: "12%",
      trendType: "up",
      trendText: "vs last month",
      icon: Users,
      iconBg: "bg-[#E6F7F0] dark:bg-[#073629] text-[#159B72] dark:text-[#20D39B]",
    },
    {
      id: "present_today",
      label: "Present Today",
      sublabel: null,
      count: "112",
      percentage: "71.8%",
      trend: "8%",
      trendType: "up",
      trendText: "vs last week",
      icon: ShieldCheck,
      iconBg: "bg-[#E6F7F0] dark:bg-[#073629] text-[#159B72] dark:text-[#20D39B]",
    },
    {
      id: "absent_today",
      label: "Absent Today",
      sublabel: null,
      count: "44",
      percentage: "28.2%",
      trend: "5%",
      trendType: "down",
      trendText: "vs last week",
      icon: AlertTriangle,
      iconBg: "bg-[#FEE2E2] dark:bg-[#450A0A] text-[#DC2626] dark:text-[#F87171]",
    },
    {
      id: "avg_attendance",
      label: "Avg. Attendance",
      sublabel: "(Assigned Classes)",
      count: "82%",
      trend: "6%",
      trendType: "up",
      trendText: "vs last month",
      icon: Calendar,
      iconBg: "bg-[#EBF5FF] dark:bg-[#0A2E47] text-[#2563EB] dark:text-[#60A5FA]",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        const isUp = card.trendType === "up";

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
                  <span className="text-[10px] text-[#658278] dark:text-[#789991] block -mt-0.5">
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

            {/* Bottom Trend & Comparison */}
            <div className="pt-3 mt-2 border-t border-[#F0F5F2] dark:border-[#0E352E] flex items-center gap-1.5 text-[11px]">
              <span
                className={`inline-flex items-center font-bold ${
                  isUp
                    ? "text-[#159B72] dark:text-[#20D39B]"
                    : "text-[#DC2626] dark:text-[#F87171]"
                }`}
              >
                {isUp ? (
                  <ArrowUpRight className="w-3.5 h-3.5" />
                ) : (
                  <ArrowDownRight className="w-3.5 h-3.5" />
                )}
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
