"use client";

import { Laptop, Mic, Trophy, Palette, ArrowRight } from "lucide-react";
import { SIDEBAR_UPCOMING_EVENTS } from "./eventsData";

const iconMap = {
  laptop: Laptop,
  mic: Mic,
  trophy: Trophy,
  palette: Palette,
};

export default function UpcomingEventsCard({ onSelectEvent, onViewAll }) {
  return (
    <div className="w-full rounded-2xl bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] shadow-xs p-4 transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[14px] font-bold text-[#0B3024] dark:text-[#F1FAF6]">
          Upcoming Events
        </h3>
        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-semibold text-[#159B72] dark:text-[#20D39B] hover:underline flex items-center gap-0.5 cursor-pointer"
        >
          <span>View All</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* List */}
      <div className="space-y-2.5">
        {SIDEBAR_UPCOMING_EVENTS.map((item) => {
          const IconComponent = iconMap[item.iconType] || Laptop;

          return (
            <div
              key={item.id}
              onClick={() => onSelectEvent(item.id)}
              className="group flex items-start gap-2.5 p-1.5 -mx-1.5 rounded-xl hover:bg-[#DDF4EB]/40 dark:hover:bg-[#082A24] transition-colors cursor-pointer"
            >
              {/* Colored Icon Square */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 shadow-xs ${item.iconBg} ${item.iconColor}`}
              >
                <IconComponent className="w-4 h-4" />
              </div>

              {/* Title & Date */}
              <div className="flex-1 min-w-0">
                <h4 className="text-[12.5px] font-bold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-[#159B72] dark:group-hover:text-[#20D39B] transition-colors line-clamp-1 leading-snug">
                  {item.title}
                </h4>
                <p className="text-[11px] text-[#658278] dark:text-[#789991] mt-0.5 leading-tight">
                  {item.timeString}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
