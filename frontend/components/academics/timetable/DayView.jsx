"use client";

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
  User,
  AlertCircle,
  Flame,
  ArrowRight,
} from "lucide-react";
import { formatDayLabel, detectConflicts, getPressureForDate } from "./timetableData";

export default function DayView({
  selectedDate,
  items,
  isToday,
  onSelectItem,
  onOpenReminderModal,
}) {
  const conflicts = detectConflicts(items);
  const pressure = getPressureForDate(items);

  const getItemTypeConfig = (item) => {
    switch (item.type) {
      case "class":
        if (item.type === "Lab" || (item.shortName && item.shortName.includes("Lab"))) {
          return {
            border: "border-teal-200 dark:border-teal-800/80 bg-teal-50/60 dark:bg-[#062923]/60",
            badge: "bg-teal-100 text-teal-800 dark:bg-teal-900/60 dark:text-teal-200",
            tag: item.type || "Lab",
            icon: FlaskConical,
          };
        }
        if (item.type === "Tutorial") {
          return {
            border: "border-purple-200 dark:border-purple-800/80 bg-purple-50/60 dark:bg-[#1E1130]/60",
            badge: "bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-200",
            tag: "Tutorial",
            icon: BookOpen,
          };
        }
        return {
          border: "border-emerald-200 dark:border-emerald-800/80 bg-emerald-50/60 dark:bg-[#06241F]/60",
          badge: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200",
          tag: "Lecture",
          icon: BookOpen,
        };
      case "exam":
        return {
          border: "border-amber-300 dark:border-amber-700 bg-amber-50/70 dark:bg-[#281C06]/70",
          badge: "bg-amber-100 text-amber-900 dark:bg-amber-900/70 dark:text-amber-200 font-bold",
          tag: item.examType || "Exam",
          icon: GraduationCap,
        };
      case "assignment":
        return {
          border: "border-sky-200 dark:border-sky-800/80 bg-sky-50/60 dark:bg-[#082333]/60",
          badge: "bg-sky-100 text-sky-800 dark:bg-sky-900/60 dark:text-sky-200",
          tag: "Assignment Deadline",
          icon: FileText,
        };
      case "event":
        return {
          border: "border-indigo-200 dark:border-indigo-800/80 bg-indigo-50/60 dark:bg-[#141B33]/60",
          badge: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-200",
          tag: item.category || "Campus Event",
          icon: Calendar,
        };
      case "notice":
        return {
          border: "border-rose-200 dark:border-rose-800/80 bg-rose-50/60 dark:bg-[#2B0E14]/60",
          badge: "bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-200",
          tag: item.status || "Academic Deadline",
          icon: Bell,
        };
      case "holiday":
        return {
          border: "border-emerald-300 dark:border-emerald-700 bg-emerald-100/50 dark:bg-[#0A3026]",
          badge: "bg-emerald-200 text-emerald-900 dark:bg-emerald-800 dark:text-emerald-100",
          tag: item.category || "Holiday",
          icon: Sun,
        };
      case "reminder":
        return {
          border: "border-purple-200 dark:border-purple-800/80 bg-purple-50/60 dark:bg-[#1A0E2E]/60",
          badge: "bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-200",
          tag: "Personal Reminder",
          icon: Clock,
        };
      default:
        return {
          border: "border-gray-200 dark:border-gray-800 bg-white dark:bg-[#041D18]",
          badge: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
          tag: "Academic Item",
          icon: BookOpen,
        };
    }
  };

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
      {/* Day Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E8F1ED] dark:border-[#10372F]">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#159B72] dark:text-[#20D39B]" />
          <div>
            <h2 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight flex items-center gap-2">
              <span>{formatDayLabel(selectedDate)}</span>
              {isToday && (
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#159B72] text-white">
                  Today
                </span>
              )}
            </h2>
            <p className="text-xs text-[#5C786E] dark:text-[#8AA89F]">
              {items.length} {items.length === 1 ? "item" : "items"} scheduled for this date
            </p>
          </div>
        </div>

        {/* Pressure / Busy indicators */}
        <div className="flex items-center gap-2">
          {pressure.isBusy && (
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-100 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs font-bold">
              <Flame className="w-3.5 h-3.5" />
              <span>Busy Day ({pressure.label})</span>
            </div>
          )}
          {conflicts.length > 0 && (
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-rose-100 dark:bg-rose-950/70 border border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-xs font-bold">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Schedule Conflict Detected</span>
            </div>
          )}
        </div>
      </div>

      {/* Chronological Items List or Empty State */}
      {items.length === 0 ? (
        <div className="py-12 px-4 text-center rounded-xl bg-gray-50/60 dark:bg-[#041D18]/50 border border-dashed border-[#D8E8E2] dark:border-[#10372F] space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-[#072B23] border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-center mx-auto text-[#159B72] dark:text-[#20D39B]">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
              No scheduled academic items for this day
            </h3>
            <p className="text-xs text-[#5C786E] dark:text-[#8AA89F] mt-1 max-w-sm mx-auto">
              Enjoy your free time or add a personal study reminder to stay ahead of upcoming coursework.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenReminderModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-[#159B72] hover:bg-[#128360] text-white shadow-xs transition-colors cursor-pointer"
          >
            <span>Add Study Reminder</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => {
            const config = getItemTypeConfig(item);
            const Icon = config.icon;

            return (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                className={`p-3.5 sm:p-4 rounded-xl border transition-all hover:shadow-xs hover:border-[#159B72] cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${config.border}`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelectItem(item);
                  }
                }}
                aria-label={`View details for ${item.title || item.subjectName}`}
              >
                {/* Left: Time badge & basic details */}
                <div className="flex items-start sm:items-center gap-3">
                  {/* Time Badge */}
                  <div className="w-20 shrink-0 p-2 rounded-lg bg-white/80 dark:bg-[#031A16] border border-[#D8E8E2] dark:border-[#10372F] text-center">
                    <span className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] block leading-tight">
                      {item.startTime}
                    </span>
                    <span className="text-[10px] text-[#5C786E] dark:text-[#8AA89F] font-medium">
                      {item.endTime || "Due"}
                    </span>
                  </div>

                  {/* Title & Metadata */}
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                        {item.subjectCode || "CAMPUS"}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${config.badge}`}>
                        {config.tag}
                      </span>
                      {item.status && item.status !== "Holiday" && (
                        <span className="text-[10px] text-[#5C786E] dark:text-[#8AA89F] font-medium">
                          • {item.status}
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6] leading-snug line-clamp-1">
                      {item.title || item.subjectName}
                    </h3>

                    {/* Venue & Faculty */}
                    <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-[#5C786E] dark:text-[#8AA89F]">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 shrink-0 text-[#159B72] dark:text-[#20D39B]" />
                        <span>{item.room || item.venue || "Campus"}</span>
                      </div>
                      {item.faculty && (
                        <div className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5 shrink-0" />
                          <span>{item.faculty}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Quick Action Preview */}
                <div className="flex items-center justify-end sm:shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E8F1ED] dark:border-[#10372F]">
                  <span className="text-xs font-semibold text-[#159B72] dark:text-[#20D39B] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
