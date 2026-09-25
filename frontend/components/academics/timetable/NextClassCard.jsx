"use client";

import Link from "next/link";
import { BookOpen, MapPin, User, Clock, Radio, ArrowRight } from "lucide-react";

export default function NextClassCard({ currentClass, nextClass, onSelectItem }) {
  const activeClass = currentClass || nextClass;
  const isLive = Boolean(currentClass);

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#159B72] dark:text-[#20D39B]" />
          <h2 className="text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
            {isLive ? "Ongoing Class" : "Next Class"}
          </h2>
        </div>

        {isLive ? (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-500 text-white shadow-2xs">
            <Radio className="w-3 h-3 animate-pulse" />
            <span>LIVE NOW</span>
          </span>
        ) : (
          <span className="text-[10px] font-bold text-[#5C786E] dark:text-[#8AA89F] uppercase tracking-wide">
            Upcoming
          </span>
        )}
      </div>

      {/* Body */}
      {activeClass ? (
        <div className="p-3.5 rounded-xl border border-gray-100 dark:border-[#10372F] bg-gray-50/60 dark:bg-[#041D18]/60 space-y-2.5">
          <div>
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                {activeClass.subjectCode}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.2 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                {activeClass.type || "Lecture"}
              </span>
            </div>
            <h3 className="text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6] line-clamp-1">
              {activeClass.subjectName || activeClass.title}
            </h3>
          </div>

          <div className="space-y-1.5 text-xs text-[#5C786E] dark:text-[#8AA89F]">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B] shrink-0" />
              <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
                {activeClass.timeDisplay || `${activeClass.startTime} – ${activeClass.endTime}`}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span>{activeClass.room || activeClass.venue}</span>
            </div>

            {activeClass.faculty && (
              <div className="flex items-center gap-2">
                <User className="w-3.5 h-3.5 shrink-0" />
                <span>{activeClass.faculty}</span>
              </div>
            )}
          </div>

          {/* Action */}
          <div className="pt-2 border-t border-[#E8F1ED] dark:border-[#10372F] flex items-center justify-between">
            {activeClass.subjectSlug ? (
              <Link
                href={`/student/academics/subjects/${activeClass.subjectSlug}`}
                className="text-xs font-semibold text-[#159B72] dark:text-[#20D39B] hover:underline flex items-center gap-1"
              >
                <span>Course Details</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            ) : (
              <span className="text-xs text-[#5C786E] dark:text-[#8AA89F]">Scheduled</span>
            )}

            <button
              type="button"
              onClick={() => onSelectItem(activeClass)}
              className="text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] hover:text-[#159B72] cursor-pointer"
            >
              View Slot
            </button>
          </div>
        </div>
      ) : (
        <div className="py-6 text-center rounded-xl bg-gray-50/50 dark:bg-[#041D18] border border-dashed border-[#D8E8E2] dark:border-[#10372F]">
          <p className="text-xs text-[#5C786E] dark:text-[#8AA89F]">
            No more classes today.
          </p>
          <p className="text-[11px] text-[#159B72] dark:text-[#20D39B] font-semibold mt-1">
            All lectures completed!
          </p>
        </div>
      )}
    </div>
  );
}
