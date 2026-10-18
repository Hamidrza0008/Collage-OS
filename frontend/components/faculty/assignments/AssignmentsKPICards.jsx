"use client";

import React from "react";
import { FileText, Calendar, CheckSquare, ShieldAlert, ArrowUpRight } from "lucide-react";

export default function AssignmentsKPICards() {
  const cards = [
    {
      id: "total",
      label: "Total Assignments",
      count: "18",
      subtext: "3 this week",
      hasArrow: true,
      subtextColor: "text-[#159B72] dark:text-[#20D39B]",
      icon: FileText,
      iconBg: "bg-[#E6F7F0] dark:bg-[#073629] text-[#159B72] dark:text-[#20D39B]",
    },
    {
      id: "pending",
      label: "Pending Submissions",
      count: "6",
      subtext: "33% of total",
      hasArrow: false,
      subtextColor: "text-[#658278] dark:text-[#789991]",
      icon: Calendar,
      iconBg: "bg-[#FFF4E5] dark:bg-[#3D2509] text-[#EA580C] dark:text-[#FB923C]",
    },
    {
      id: "submitted",
      label: "Submitted",
      count: "12",
      subtext: "67% of total",
      hasArrow: false,
      subtextColor: "text-[#658278] dark:text-[#789991]",
      icon: CheckSquare,
      iconBg: "bg-[#E6F7F0] dark:bg-[#073629] text-[#159B72] dark:text-[#20D39B]",
    },
    {
      id: "overdue",
      label: "Overdue",
      count: "2",
      subtext: "11% of total",
      hasArrow: false,
      subtextColor: "text-[#DC2626] dark:text-[#F87171]",
      icon: ShieldAlert,
      iconBg: "bg-[#FEE2E2] dark:bg-[#450A0A] text-[#DC2626] dark:text-[#F87171]",
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

                <div className="mt-2">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#0B3024] dark:text-[#F1FAF6] leading-none block">
                    {card.count}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Meta */}
            <div className="pt-3 mt-2 border-t border-[#F0F5F2] dark:border-[#0E352E] flex items-center gap-1 text-[11px] font-semibold">
              {card.hasArrow && (
                <ArrowUpRight className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B]" />
              )}
              <span className={card.subtextColor}>
                {card.subtext}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
