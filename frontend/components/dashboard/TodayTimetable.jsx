"use client";

import { Calendar, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const TIMETABLE_ITEMS = [
  {
    time: "09:00 – 10:00",
    subject: "Data Structures & Algorithms",
    code: "CSE-302",
    instructor: "Prof. Sharma",
    type: "Lecture",
    typeColor: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-[#123F35] dark:text-[#20D39B] dark:border-[#16463D]",
    completed: true,
  },
  {
    time: "10:15 – 11:15",
    subject: "Web Development",
    code: "CSE-101",
    instructor: "Prof. Khan",
    type: "Lecture",
    typeColor: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-[#123F35] dark:text-[#20D39B] dark:border-[#16463D]",
    completed: true,
  },
  {
    time: "12:00 – 01:00",
    subject: "Database Management Systems",
    code: "CSE-302",
    instructor: "Prof. Mehta",
    type: "Lecture",
    typeColor: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-[#123F35] dark:text-[#20D39B] dark:border-[#16463D]",
    completed: false,
    isCurrent: true,
  },
  {
    time: "02:00 – 04:00",
    subject: "Computer Networks Lab",
    code: "Lab-2",
    instructor: "Prof. Reddy",
    type: "Lab",
    typeColor: "bg-sky-50 text-sky-700 border-sky-200 dark:bg-[#0B303D] dark:text-[#38BDF8] dark:border-[#16465D]",
    completed: false,
  },
];

export default function TodayTimetable() {
  return (
    <div className="p-3.5 sm:p-4 rounded-xl bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-2xs flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-2.5 border-b border-[#E8F1ED] dark:border-[#10372F]">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#DDF3EB] dark:bg-[#123F35] text-[#159B72] dark:text-[#20D39B]">
              <Calendar className="w-3.5 h-3.5" />
            </div>
            <div>
              <h2 className="text-xs sm:text-[13px] font-bold text-[#0B3024] dark:text-[#F1FAF6] leading-tight">
                Today&apos;s Timetable
              </h2>
              <p className="text-[10.5px] text-[#658278] dark:text-[#789991]">
                Monday, 18 Aug 2025
              </p>
            </div>
          </div>

          <Link
            href="/student/academics"
            className="group inline-flex items-center gap-1 text-[11px] font-semibold text-[#159B72] dark:text-[#20D39B] hover:text-[#087A5B] dark:hover:text-[#4AE3B5] transition-colors"
          >
            <span>View Full Timetable</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Schedule Rows */}
        <div className="mt-2.5 space-y-1.5">
          {TIMETABLE_ITEMS.map((item, index) => (
            <div
              key={index}
              className={`py-1.5 px-2.5 rounded-lg border transition-all flex items-center justify-between gap-2.5 text-xs ${
                item.isCurrent
                  ? "bg-[#DDF3EB]/35 dark:bg-[#0A2A24] border-[#159B72]/40 dark:border-[#20D39B]/40"
                  : "bg-[#F7FBF9]/60 dark:bg-[#031A16]/40 border-[#E8F1ED] dark:border-[#10372F] hover:border-[#D8E8E2] dark:hover:border-[#16463D]"
              }`}
            >
              {/* Time Column */}
              <div className="w-[76px] sm:w-[82px] shrink-0">
                <span className="text-[11px] font-semibold text-[#0B3024] dark:text-[#F1FAF6] block leading-tight">
                  {item.time}
                </span>
                <span className="text-[9.5px] text-[#658278] dark:text-[#789991]">
                  {item.code}
                </span>
              </div>

              {/* Subject & Instructor */}
              <div className="flex-1 min-w-0">
                <h3 className="text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] truncate leading-tight">
                  {item.subject}
                </h3>
                <p className="text-[10.5px] text-[#658278] dark:text-[#789991] truncate">
                  {item.code} &bull; {item.instructor}
                </p>
              </div>

              {/* Badges & Status */}
              <div className="flex items-center gap-1.5 shrink-0">
                <span
                  className={`px-2 py-0.2 rounded text-[10px] font-medium border ${item.typeColor}`}
                >
                  {item.type}
                </span>

                <span
                  className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border ${
                    item.completed
                      ? "bg-emerald-500 text-white border-emerald-500"
                      : item.isCurrent
                      ? "border-[#159B72] dark:border-[#20D39B]"
                      : "border-[#D8E8E2] dark:border-[#16463D]"
                  }`}
                >
                  {item.completed && <CheckCircle2 className="w-3 h-3" />}
                  {item.isCurrent && <span className="w-1 h-1 rounded-full bg-[#159B72] dark:bg-[#20D39B]" />}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
