"use client";

import {
  formatDateKey,
  detectConflicts,
  getPressureForDate,
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
  AlertCircle,
  Flame,
} from "lucide-react";

export default function WeekView({
  weekDays,
  itemsByDate,
  todayKey,
  currentTimeStr = "10:30",
  onSelectItem,
}) {
  const timeSlots = [
    { start: "08:00", end: "09:00", label: "08:00 AM" },
    { start: "09:00", end: "10:00", label: "09:00 AM" },
    { start: "10:00", end: "11:00", label: "10:00 AM" },
    { start: "11:00", end: "12:00", label: "11:00 AM" },
    { start: "12:00", end: "13:00", label: "12:00 PM" },
    { start: "13:00", end: "14:00", label: "01:00 PM" },
    { start: "14:00", end: "15:00", label: "02:00 PM" },
    { start: "15:00", end: "16:00", label: "03:00 PM" },
    { start: "16:00", end: "17:00", label: "04:00 PM" },
  ];

  const getTypeStyles = (item) => {
    switch (item.type) {
      case "class":
        if (item.type === "Lab" || (item.shortName && item.shortName.includes("Lab"))) {
          return {
            bg: "bg-teal-50/90 dark:bg-[#072B24] border-teal-200 dark:border-teal-800/70 hover:border-teal-400",
            badge: "bg-teal-100/80 dark:bg-teal-900/60 text-teal-800 dark:text-teal-200",
            icon: FlaskConical,
          };
        }
        if (item.type === "Tutorial") {
          return {
            bg: "bg-purple-50/90 dark:bg-[#1E1130] border-purple-200 dark:border-purple-800/70 hover:border-purple-400",
            badge: "bg-purple-100/80 dark:bg-purple-900/60 text-purple-800 dark:text-purple-200",
            icon: BookOpen,
          };
        }
        return {
          bg: "bg-emerald-50/90 dark:bg-[#062921] border-emerald-200 dark:border-emerald-800/70 hover:border-emerald-400",
          badge: "bg-emerald-100/80 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200",
          icon: BookOpen,
        };
      case "exam":
        return {
          bg: "bg-amber-50/90 dark:bg-[#281C06] border-amber-300 dark:border-amber-700/80 hover:border-amber-500",
          badge: "bg-amber-100 dark:bg-amber-900/70 text-amber-800 dark:text-amber-200 font-bold",
          icon: GraduationCap,
        };
      case "assignment":
        return {
          bg: "bg-sky-50/90 dark:bg-[#082333] border-sky-200 dark:border-sky-800/70 hover:border-sky-400",
          badge: "bg-sky-100 dark:bg-sky-900/60 text-sky-800 dark:text-sky-200",
          icon: FileText,
        };
      case "event":
        return {
          bg: "bg-indigo-50/90 dark:bg-[#141B33] border-indigo-200 dark:border-indigo-800/70 hover:border-indigo-400",
          badge: "bg-indigo-100 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-200",
          icon: Calendar,
        };
      case "notice":
        return {
          bg: "bg-rose-50/90 dark:bg-[#2B0E14] border-rose-200 dark:border-rose-800/70 hover:border-rose-400",
          badge: "bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200",
          icon: Bell,
        };
      case "holiday":
        return {
          bg: "bg-emerald-100/60 dark:bg-[#0B332A] border-emerald-300 dark:border-emerald-700/80 hover:border-emerald-500",
          badge: "bg-emerald-200/80 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100",
          icon: Sun,
        };
      case "reminder":
        return {
          bg: "bg-purple-50/90 dark:bg-[#1A0E2E] border-purple-200 dark:border-purple-800/70 hover:border-purple-400",
          badge: "bg-purple-100 dark:bg-purple-900/60 text-purple-800 dark:text-purple-200",
          icon: Clock,
        };
      default:
        return {
          bg: "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800",
          badge: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300",
          icon: BookOpen,
        };
    }
  };

  // Convert "HH:MM" to slot index or position
  const getSlotDetails = (startTime, endTime) => {
    const [startH, startM] = startTime.split(":").map(Number);
    const [endH, endM] = endTime.split(":").map(Number);
    const startMinutes = startH * 60 + startM;
    const endMinutes = endH * 60 + endM;
    const baseMinutes = 8 * 60; // 08:00 AM

    const topPct = Math.max(0, ((startMinutes - baseMinutes) / (9 * 60)) * 100);
    const durationMins = Math.max(30, endMinutes - startMinutes);
    const heightPct = Math.min(100 - topPct, (durationMins / (9 * 60)) * 100);

    return { topPct, heightPct };
  };

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs overflow-hidden">
      {/* Horizontally scrollable container on narrow screens to protect grid integrity */}
      <div className="overflow-x-auto scrollbar-thin">
        <div className="min-w-[760px] lg:min-w-full">
          {/* Header Row: Days of Week */}
          <div className="grid grid-cols-8 border-b border-[#E8F1ED] dark:border-[#10372F] bg-gray-50/70 dark:bg-[#041D18]">
            {/* Time label corner */}
            <div className="p-3 text-center border-r border-[#E8F1ED] dark:border-[#10372F] text-[11px] font-bold text-[#5C786E] dark:text-[#8AA89F]">
              TIME
            </div>

            {/* 7 Day Headers */}
            {weekDays.map((dayObj) => {
              const dateKey = formatDateKey(dayObj);
              const isToday = dateKey === todayKey;
              const dayItems = itemsByDate[dateKey] || [];
              const pressure = getPressureForDate(dayItems);
              const weekdayShort = dayObj.toLocaleDateString("en-US", { weekday: "short" });
              const monthDay = dayObj.getDate();

              return (
                <div
                  key={dateKey}
                  className={`p-2.5 text-center border-r border-[#E8F1ED] dark:border-[#10372F] last:border-r-0 transition-colors ${
                    isToday ? "bg-emerald-50/60 dark:bg-[#082A24]" : ""
                  }`}
                >
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                      {weekdayShort}
                    </span>
                    {isToday && (
                      <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded-full bg-[#159B72] text-white">
                        Today
                      </span>
                    )}
                  </div>
                  <div className="text-[13px] font-semibold text-[#5C786E] dark:text-[#8AA89F]">
                    {monthDay}
                  </div>

                  {/* Busy Day Badge */}
                  {pressure.isBusy && (
                    <div className="mt-1 inline-flex items-center gap-0.5 px-1.5 py-0.2 text-[9px] font-bold rounded-md bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300">
                      <Flame className="w-2.5 h-2.5" />
                      <span>Busy</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Time Grid Body */}
          <div className="grid grid-cols-8 relative min-h-[580px]">
            {/* Column 1: Time Labels */}
            <div className="border-r border-[#E8F1ED] dark:border-[#10372F] bg-gray-50/40 dark:bg-[#031A16] flex flex-col">
              {timeSlots.map((slot) => (
                <div
                  key={slot.start}
                  className="h-16 border-b border-[#E8F1ED] dark:border-[#10372F] p-1.5 text-right text-[11px] font-medium text-[#5C786E] dark:text-[#8AA89F]"
                >
                  {slot.label}
                </div>
              ))}
            </div>

            {/* Columns 2-8: Day schedule columns */}
            {weekDays.map((dayObj) => {
              const dateKey = formatDateKey(dayObj);
              const isToday = dateKey === todayKey;
              const dayItems = itemsByDate[dateKey] || [];
              const conflicts = detectConflicts(dayItems);

              return (
                <div
                  key={dateKey}
                  className={`relative border-r border-[#E8F1ED] dark:border-[#10372F] last:border-r-0 flex flex-col ${
                    isToday ? "bg-emerald-50/15 dark:bg-[#041D18]/30" : ""
                  }`}
                >
                  {/* Background slot grid lines */}
                  {timeSlots.map((slot) => (
                    <div
                      key={slot.start}
                      className="h-16 border-b border-[#E8F1ED]/70 dark:border-[#10372F]/50 pointer-events-none"
                    />
                  ))}

                  {/* Conflict Notice at top of column if applicable */}
                  {conflicts.length > 0 && (
                    <div className="absolute top-1 left-1 right-1 z-20 px-1 py-0.5 text-[9px] font-bold bg-amber-500 text-white rounded flex items-center gap-0.5 shadow-2xs">
                      <AlertCircle className="w-2.5 h-2.5 shrink-0" />
                      <span className="truncate">Schedule Conflict</span>
                    </div>
                  )}

                  {/* Scheduled Items rendered as absolute floating blocks */}
                  {dayItems.map((item) => {
                    const styles = getTypeStyles(item);
                    const Icon = styles.icon;
                    const { topPct, heightPct } = getSlotDetails(
                      item.startTime || "09:00",
                      item.endTime || "10:00"
                    );

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => onSelectItem(item)}
                        style={{
                          top: `${topPct}%`,
                          height: `${Math.max(10, heightPct)}%`,
                        }}
                        className={`absolute left-1 right-1 z-10 rounded-xl p-1.5 text-left border shadow-2xs transition-all hover:scale-[1.02] hover:z-30 cursor-pointer overflow-hidden flex flex-col justify-between ${styles.bg}`}
                        aria-label={`${item.title || item.subjectName}, ${item.timeDisplay || item.startTime}, ${item.room || item.venue}`}
                      >
                        <div className="min-w-0">
                          {/* Top row: Code / Type badge */}
                          <div className="flex items-center justify-between gap-1 mb-0.5">
                            <span className="text-[10px] font-extrabold text-[#0B3024] dark:text-[#F1FAF6] truncate">
                              {item.subjectCode || item.type.toUpperCase()}
                            </span>
                            <span className={`text-[9px] px-1 py-0.2 rounded-md font-semibold shrink-0 ${styles.badge}`}>
                              {item.type === "class" ? item.type : item.type.toUpperCase()}
                            </span>
                          </div>

                          {/* Subject / Title */}
                          <h4 className="text-[11px] font-bold text-[#0B3024] dark:text-[#F1FAF6] leading-tight line-clamp-1">
                            {item.shortName || item.title || item.subjectName}
                          </h4>

                          {/* Room / Location */}
                          <div className="text-[9.5px] text-[#5C786E] dark:text-[#8AA89F] truncate mt-0.5 flex items-center gap-1">
                            <Icon className="w-2.5 h-2.5 shrink-0" />
                            <span>{item.room || item.venue || "Campus"}</span>
                          </div>
                        </div>

                        {/* Bottom: Time range */}
                        <div className="text-[9px] font-semibold text-[#159B72] dark:text-[#20D39B] truncate mt-0.5">
                          {item.startTime} – {item.endTime}
                        </div>
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
