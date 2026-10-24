"use client";

import React from "react";
import { Calendar, CalendarCheck2, Clock, Sparkles, MapPin, ArrowRight } from "lucide-react";

export default function TimetableKPICards({
  kpis,
  onSelectToday,
  onViewClassDetails,
}) {
  const cards = [
    {
      id: "weekly-classes",
      title: "Classes This Week",
      value: kpis?.weeklyClassesCount || 0,
      unit: "sessions",
      icon: Calendar,
      iconBg: "bg-[#E6F7F0] dark:bg-[#073629] text-[#159B72] dark:text-[#20D39B]",
      subtext: "Across 4 core subjects & labs",
    },
    {
      id: "today-classes",
      title: `Classes on ${kpis?.activeDay || "Today"}`,
      value: kpis?.todayClassesCount || 0,
      unit: "periods",
      icon: CalendarCheck2,
      iconBg: "bg-[#EFF6FF] dark:bg-[#112347] text-[#2563EB] dark:text-[#60A5FA]",
      subtext: `${kpis?.activeDay} allocated load`,
      badge: "Active Day",
    },
    {
      id: "weekly-hours",
      title: "Teaching Workload",
      value: `${kpis?.totalWeeklyHours || 0}`,
      unit: "hours/wk",
      icon: Clock,
      iconBg: "bg-[#F3E8FF] dark:bg-[#34164D] text-[#9333EA] dark:text-[#C084FC]",
      subtext: "Lectures, practicals & clinics",
    },
    {
      id: "next-class",
      title: "Next Upcoming Class",
      isHighlight: true,
      icon: Sparkles,
      iconBg: "bg-[#FFF4E5] dark:bg-[#3D2509] text-[#EA580C] dark:text-[#FB923C]",
      classData: kpis?.nextClass,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
      {cards.map((card) => {
        const Icon = card.icon;

        if (card.isHighlight) {
          const cls = card.classData;
          return (
            <div
              key={card.id}
              className="p-4 sm:p-4.5 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${card.iconBg}`}
                  >
                    <Icon className="w-4.5 h-4.5" strokeWidth={2.2} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#658278] dark:text-[#789991] block">
                      {card.title}
                    </span>
                    <span className="text-xs font-bold text-[#159B72] dark:text-[#20D39B]">
                      {cls?.timeDisplay || "09:00 AM"}
                    </span>
                  </div>
                </div>

                {cls?.sessionType && (
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#E6F7F0] dark:bg-[#073629] text-[#159B72] dark:text-[#20D39B] border border-[#159B72]/20 shrink-0">
                    {cls.sessionType}
                  </span>
                )}
              </div>

              {cls ? (
                <div className="pt-2.5 mt-2 border-t border-[#F0F5F2] dark:border-[#0E352E] space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs sm:text-[13px] font-bold text-[#0B3024] dark:text-[#F1FAF6] truncate">
                      {cls.courseCode} • {cls.shortSubject}
                    </h4>
                    <span className="text-[11px] font-semibold text-[#4A6B60] dark:text-[#A7C8BD]">
                      {cls.batch}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#658278] dark:text-[#789991]">
                    <span className="flex items-center gap-1 truncate max-w-[150px]">
                      <MapPin className="w-3 h-3 text-[#159B72] shrink-0" />
                      <span className="truncate">{cls.roomShort}</span>
                    </span>

                    <button
                      type="button"
                      onClick={() => onViewClassDetails?.(cls)}
                      className="text-[11px] font-bold text-[#159B72] dark:text-[#20D39B] hover:underline flex items-center gap-0.5 cursor-pointer"
                    >
                      <span>Details</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="pt-2 text-xs text-[#658278] dark:text-[#789991]">
                  No upcoming classes scheduled.
                </div>
              )}
            </div>
          );
        }

        return (
          <div
            key={card.id}
            className="p-4 sm:p-4.5 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="flex items-start justify-between gap-3">
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 ${card.iconBg}`}
              >
                <Icon className="w-5 h-5" strokeWidth={2} />
              </div>

              {card.badge && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EFF6FF] dark:bg-[#112347] text-[#2563EB] dark:text-[#60A5FA] border border-[#2563EB]/20">
                  {card.badge}
                </span>
              )}
            </div>

            <div className="mt-3">
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#0B3024] dark:text-[#F1FAF6] leading-none">
                  {card.value}
                </span>
                <span className="text-xs font-semibold text-[#658278] dark:text-[#789991]">
                  {card.unit}
                </span>
              </div>
              <span className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] mt-1 block">
                {card.title}
              </span>
              <p className="text-[11px] text-[#658278] dark:text-[#789991] mt-0.5 truncate">
                {card.subtext}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
