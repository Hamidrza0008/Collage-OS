"use client";

import React from "react";
import { Laptop, Trophy, Mic, Camera } from "lucide-react";

export default function UpcomingEventsCard({ onSelectEvent, onViewAll }) {
  const upcomingList = [
    {
      id: "evt-01",
      title: "Full Stack Web Development Bootcamp",
      date: "Sep 22, 2025",
      icon: Laptop,
      iconStyle: "bg-[#EDF5FF] text-[#2563EB]",
    },
    {
      id: "evt-02",
      title: "CodeRush – Competitive Coding",
      date: "Sep 25, 2025",
      icon: Trophy,
      iconStyle: "bg-[#FFF8EE] text-[#D97706]",
    },
    {
      id: "evt-03",
      title: "TechTalk: Building AI Products",
      date: "Sep 27, 2025",
      icon: Mic,
      iconStyle: "bg-[#EDF5FF] text-[#2563EB]",
    },
    {
      id: "evt-04",
      title: "Photography Club Meetup",
      date: "Sep 30, 2025",
      icon: Camera,
      iconStyle: "bg-[#FEECEC] text-[#DC2626]",
    },
  ];

  return (
    <div className="bg-white dark:bg-[#06241F] rounded-2xl border border-[#E5ECE8] dark:border-[#10372F] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-3.5">
      {/* Header */}
      <div className="flex items-center justify-between pb-0.5">
        <h2 className="text-[14px] font-bold text-[#0B3024] dark:text-[#F1FAF6]">
          Upcoming Events
        </h2>
        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-semibold text-[#159B72] hover:text-[#11805D] flex items-center gap-1 cursor-pointer transition-colors"
        >
          View All →
        </button>
      </div>

      {/* List items matching screenshot */}
      <div className="space-y-2">
        {upcomingList.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => onSelectEvent && onSelectEvent(item.id)}
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#F1F8F5] dark:hover:bg-[#082A24] transition-colors cursor-pointer group"
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${item.iconStyle}`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-[13px] font-semibold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-[#159B72] transition-colors truncate">
                  {item.title}
                </h4>
                <p className="text-[11px] text-[#658278] dark:text-[#789991] mt-0.5">
                  {item.date}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
