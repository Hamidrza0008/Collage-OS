"use client";

import {
  parseDateKey,
  formatDayLabel,
} from "./timetableData";
import {
  BookOpen,
  FlaskConical,
  GraduationCap,
  FileText,
  Calendar,
  Bell,
  Sun,
  Clock,
  MapPin,
  ArrowRight,
  Flame,
} from "lucide-react";

export default function AgendaView({
  dateGroups, // array of { dateKey, items, pressure }
  todayKey,
  onSelectItem,
}) {
  const getItemIcon = (type) => {
    switch (type) {
      case "class":
        return BookOpen;
      case "exam":
        return GraduationCap;
      case "assignment":
        return FileText;
      case "event":
        return Calendar;
      case "notice":
        return Bell;
      case "holiday":
        return Sun;
      case "reminder":
        return Clock;
      default:
        return BookOpen;
    }
  };

  const getItemBadgeStyles = (type) => {
    switch (type) {
      case "class":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300";
      case "exam":
        return "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 font-bold";
      case "assignment":
        return "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300";
      case "event":
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300";
      case "notice":
        return "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300";
      case "holiday":
        return "bg-emerald-200 text-emerald-900 dark:bg-emerald-900 dark:text-emerald-200";
      case "reminder":
        return "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  if (!dateGroups || dateGroups.length === 0) {
    return (
      <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl p-12 text-center shadow-xs">
        <Calendar className="w-10 h-10 text-[#5C786E] dark:text-[#8AA89F] mx-auto mb-3" />
        <h3 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
          No upcoming items found
        </h3>
        <p className="text-xs text-[#5C786E] dark:text-[#8AA89F] mt-1 max-w-sm mx-auto">
          No calendar events, classes, or exams match your current view and filter selection.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {dateGroups.map(({ dateKey, items, pressure }) => {
        const dateObj = parseDateKey(dateKey);
        const isToday = dateKey === todayKey;
        const dayLabel = formatDayLabel(dateObj);

        return (
          <div
            key={dateKey}
            className="bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl p-4 sm:p-5 shadow-xs space-y-3"
          >
            {/* Date Group Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-[#E8F1ED] dark:border-[#10372F]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#159B72] dark:bg-[#20D39B]" />
                <h3 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
                  {dayLabel}
                </h3>
                {isToday && (
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#159B72] text-white">
                    Today
                  </span>
                )}
              </div>

              {pressure?.isBusy && (
                <div className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                  <Flame className="w-3 h-3" />
                  <span>{pressure.label}</span>
                </div>
              )}
            </div>

            {/* List of items on this date */}
            <div className="space-y-2">
              {items.map((item) => {
                const Icon = getItemIcon(item.type);
                const badgeStyle = getItemBadgeStyles(item.type);

                return (
                  <div
                    key={item.id}
                    onClick={() => onSelectItem(item)}
                    className="p-3 rounded-xl border border-gray-100 dark:border-[#10372F] bg-gray-50/50 dark:bg-[#041D18]/50 hover:bg-emerald-50/40 dark:hover:bg-[#082A24] transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                    role="button"
                    tabIndex={0}
                    aria-label={`View ${item.title || item.subjectName}`}
                  >
                    {/* Time & Title info */}
                    <div className="flex items-start sm:items-center gap-3">
                      {/* Time pill */}
                      <div className="w-24 shrink-0 text-left sm:text-center p-1.5 rounded-lg bg-white dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F]">
                        <span className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] block leading-tight">
                          {item.startTime}
                        </span>
                        <span className="text-[10px] text-[#5C786E] dark:text-[#8AA89F]">
                          {item.endTime || "All Day"}
                        </span>
                      </div>

                      {/* Content details */}
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className={`text-[10px] uppercase font-bold px-2 py-0.2 rounded-md ${badgeStyle}`}>
                            {item.type === "class" ? (item.type || "Class") : item.type}
                          </span>
                          <span className="text-xs font-semibold text-[#5C786E] dark:text-[#8AA89F]">
                            {item.subjectCode || "CAMPUS"}
                          </span>
                        </div>

                        <h4 className="text-xs sm:text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6] line-clamp-1 group-hover:text-[#159B72] dark:group-hover:text-[#20D39B] transition-colors">
                          {item.title || item.subjectName}
                        </h4>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-[#5C786E] dark:text-[#8AA89F] mt-1">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#159B72] dark:text-[#20D39B] shrink-0" />
                            <span>{item.room || item.venue || "Campus"}</span>
                          </div>
                          {item.faculty && (
                            <span className="text-[11px] truncate">
                              • {item.faculty}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action link */}
                    <div className="flex items-center justify-end sm:shrink-0 pt-1 sm:pt-0">
                      <span className="text-xs font-semibold text-[#159B72] dark:text-[#20D39B] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        <span>Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
