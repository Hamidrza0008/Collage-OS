"use client";

import { Calendar, Clock, MapPin, BookOpen, AlertTriangle } from "lucide-react";

export default function ExamInfoCard({ exam }) {
  if (!exam) return null;

  const isPractical = exam.type.toLowerCase().includes("practical");

  const cardCls = isPractical
    ? "w-full border rounded-2xl shadow-xs p-5 bg-teal-50 dark:bg-teal-950/30 border-teal-200 dark:border-teal-800/60"
    : "w-full border rounded-2xl shadow-xs p-5 bg-orange-50 dark:bg-amber-950/30 border-orange-200 dark:border-amber-800/60";
  const iconCls = isPractical
    ? "w-4 h-4 text-teal-600 dark:text-teal-400"
    : "w-4 h-4 text-amber-600 dark:text-amber-400";
  const titleCls = isPractical
    ? "text-sm font-bold tracking-tight text-teal-800 dark:text-teal-300"
    : "text-sm font-bold tracking-tight text-amber-800 dark:text-amber-300";
  const typeCls = isPractical
    ? "text-[11px] font-bold uppercase tracking-wide mb-3 text-teal-600 dark:text-teal-400"
    : "text-[11px] font-bold uppercase tracking-wide mb-3 text-amber-600 dark:text-amber-400";

  return (
    <div className={cardCls}>
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className={iconCls} />
        <h2 className={titleCls}>
          Upcoming Exam
        </h2>
      </div>

      <p className={typeCls}>
        {exam.type}
      </p>

      <div className="space-y-2">
        <div className="flex items-center gap-2.5 text-xs">
          <Calendar className="w-3.5 h-3.5 text-[#5C786E] dark:text-[#8AA89F] shrink-0" />
          <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6]">{exam.date}</span>
        </div>
        <div className="flex items-center gap-2.5 text-xs">
          <Clock className="w-3.5 h-3.5 text-[#5C786E] dark:text-[#8AA89F] shrink-0" />
          <span className="text-[#3B5E52] dark:text-[#C0D8D0]">{exam.time}</span>
        </div>
        <div className="flex items-center gap-2.5 text-xs">
          <MapPin className="w-3.5 h-3.5 text-[#5C786E] dark:text-[#8AA89F] shrink-0" />
          <span className="text-[#3B5E52] dark:text-[#C0D8D0]">{exam.venue}</span>
        </div>
        <div className="flex items-start gap-2.5 text-xs">
          <BookOpen className="w-3.5 h-3.5 text-[#5C786E] dark:text-[#8AA89F] shrink-0 mt-0.5" />
          <span className="text-[#3B5E52] dark:text-[#C0D8D0]">{exam.syllabus}</span>
        </div>
      </div>
    </div>
  );
}
