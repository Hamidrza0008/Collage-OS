"use client";

import { Calendar, Clock, MapPin, CheckCircle2, ArrowRight } from "lucide-react";

export default function TodayScheduleCard({ todayItems = [], onSelectItem, onViewTodayFull }) {
  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#159B72] dark:text-[#20D39B]" />
          <h2 className="text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
            Today&apos;s Schedule
          </h2>
        </div>

        <button
          type="button"
          onClick={onViewTodayFull}
          className="text-xs font-semibold text-[#159B72] dark:text-[#20D39B] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>Day View</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Items */}
      {todayItems.length === 0 ? (
        <div className="py-4 text-center rounded-xl bg-gray-50/50 dark:bg-[#041D18] border border-dashed border-[#D8E8E2] dark:border-[#10372F]">
          <p className="text-xs text-[#5C786E] dark:text-[#8AA89F]">
            No classes scheduled today.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {todayItems.slice(0, 4).map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectItem(item)}
              className="p-2.5 rounded-xl border border-gray-100 dark:border-[#10372F] bg-gray-50/50 dark:bg-[#041D18]/50 hover:bg-emerald-50/40 dark:hover:bg-[#082A24] transition-colors cursor-pointer flex items-center justify-between gap-2.5"
              role="button"
              tabIndex={0}
            >
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                    {item.startTime}
                  </span>
                  <span className="text-[9.5px] font-bold uppercase px-1.5 py-0.2 rounded bg-gray-200/80 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    {item.type}
                  </span>
                </div>
                <h4 className="text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] truncate mt-0.5">
                  {item.shortName || item.title || item.subjectName}
                </h4>
                <p className="text-[10px] text-[#5C786E] dark:text-[#8AA89F] truncate">
                  {item.room || item.venue}
                </p>
              </div>

              <span className="text-[11px] font-semibold text-[#159B72] dark:text-[#20D39B] shrink-0">
                Details
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
