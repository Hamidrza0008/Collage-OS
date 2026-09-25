"use client";

import Link from "next/link";
import {
  Code2, Globe, Database, FlaskConical, Laptop, Star,
  ArrowLeft, BookOpen, Clock, MapPin, Share2, Download, Bookmark,
} from "lucide-react";

const iconMap = {
  code: Code2,
  globe: Globe,
  database: Database,
  flask: FlaskConical,
  laptop: Laptop,
  star: Star,
};

const colorMap = {
  emerald: {
    bg: "bg-emerald-100 dark:bg-emerald-950/60",
    icon: "text-emerald-700 dark:text-emerald-400",
    badge: "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60",
    bar: "bg-emerald-500",
    ring: "ring-emerald-500/30",
    accent: "text-emerald-600 dark:text-emerald-400",
  },
  blue: {
    bg: "bg-blue-100 dark:bg-blue-950/60",
    icon: "text-blue-700 dark:text-blue-400",
    badge: "bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/60",
    bar: "bg-blue-500",
    ring: "ring-blue-500/30",
    accent: "text-blue-600 dark:text-blue-400",
  },
  purple: {
    bg: "bg-purple-100 dark:bg-purple-950/60",
    icon: "text-purple-700 dark:text-purple-400",
    badge: "bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800/60",
    bar: "bg-purple-500",
    ring: "ring-purple-500/30",
    accent: "text-purple-600 dark:text-purple-400",
  },
  teal: {
    bg: "bg-teal-100 dark:bg-teal-950/60",
    icon: "text-teal-700 dark:text-teal-400",
    badge: "bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800/60",
    bar: "bg-teal-500",
    ring: "ring-teal-500/30",
    accent: "text-teal-600 dark:text-teal-400",
  },
  indigo: {
    bg: "bg-indigo-100 dark:bg-indigo-950/60",
    icon: "text-indigo-700 dark:text-indigo-400",
    badge: "bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800/60",
    bar: "bg-indigo-500",
    ring: "ring-indigo-500/30",
    accent: "text-indigo-600 dark:text-indigo-400",
  },
  amber: {
    bg: "bg-amber-100 dark:bg-amber-950/60",
    icon: "text-amber-700 dark:text-amber-400",
    badge: "bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/60",
    bar: "bg-amber-500",
    ring: "ring-amber-500/30",
    accent: "text-amber-600 dark:text-amber-400",
  },
};

export const getSubjectColor = (color) => colorMap[color] || colorMap.emerald;

export default function SubjectHero({ subject, isSaved, onToggleSave, onShare, onDownloadBundle }) {
  const c = getSubjectColor(subject.color);
  const SubjectIcon = iconMap[subject.icon] || Code2;
  const gradeMap = {
    A: "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300",
    "A-": "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300",
    "B+": "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300",
    B: "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300",
  };
  const gradeCls = gradeMap[subject.currentGrade] || gradeMap.B;

  const savedBtnCls = isSaved
    ? "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-semibold transition-colors cursor-pointer bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300"
    : "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-semibold transition-colors cursor-pointer bg-white dark:bg-[#041D18] border-[#D8E8E2] dark:border-[#10372F] text-[#5C786E] dark:text-[#8AA89F] hover:border-emerald-400";
  const bookmarkCls = "w-3.5 h-3.5" + (isSaved ? " fill-emerald-500" : "");

  return (
    <div className="w-full bg-white dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl overflow-hidden shadow-xs animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Decorative top gradient stripe */}
      <div className={"h-1.5 w-full " + c.bar} />

      <div className="p-5 sm:p-6">
        {/* Back nav */}
        <Link
          href="/student/academics"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#55786B] dark:text-[#8FAFA4] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] transition-colors mb-5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Academics</span>
        </Link>

        {/* Subject identity row */}
        <div className="flex items-start gap-4">
          <div className={"w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ring-4 " + c.bg + " " + c.ring}>
            <SubjectIcon className={"w-7 h-7 " + c.icon} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className={"px-2.5 py-0.5 rounded-full text-[11px] font-bold border " + c.badge}>
                {subject.code}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-gray-100 dark:bg-[#041D18] text-gray-600 dark:text-[#8AA89F] border border-gray-200 dark:border-[#10372F]">
                {subject.type}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-gray-100 dark:bg-[#041D18] text-gray-600 dark:text-[#8AA89F] border border-gray-200 dark:border-[#10372F]">
                {subject.credits} Credits
              </span>
              {subject.type === "Practical" && (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-violet-100 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800">
                  Lab
                </span>
              )}
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#0B3024] dark:text-[#F1FAF6] leading-snug">
              {subject.fullName}
            </h1>
            <p className="text-xs text-[#5C786E] dark:text-[#8AA89F] mt-1">
              {subject.department} · Semester {subject.semester}
            </p>
          </div>

          {/* Grade badge */}
          <div className={"shrink-0 px-3 py-1.5 rounded-xl text-lg font-black " + gradeCls}>
            {subject.currentGrade}
          </div>
        </div>

        {/* Metadata pills */}
        <div className="mt-4 flex flex-wrap gap-3">
          <div className="flex items-center gap-1.5 text-xs font-medium text-[#5C786E] dark:text-[#8AA89F]">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span>{subject.lectureRoom}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-[#5C786E] dark:text-[#8AA89F]">
            <Clock className="w-3.5 h-3.5 shrink-0" />
            <span>{subject.lectureTimings}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-[#5C786E] dark:text-[#8AA89F]">
            <BookOpen className="w-3.5 h-3.5 shrink-0" />
            <span>{subject.conductedLectures} of {subject.totalLectures} lectures conducted</span>
          </div>
        </div>

        {/* Course progress bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
            <span className="text-[#5C786E] dark:text-[#8AA89F]">Course Completion</span>
            <span className={c.accent}>{subject.progress}%</span>
          </div>
          <div className="w-full h-2 bg-gray-100 dark:bg-[#0A2E27] rounded-full overflow-hidden">
            <div
              className={"h-full rounded-full transition-all duration-700 ease-out " + c.bar}
              style={{ width: subject.progress + "%" }}
            />
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-4 flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={onDownloadBundle}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0B3024] dark:bg-[#10B981] text-white dark:text-[#021512] text-xs font-bold hover:bg-emerald-800 dark:hover:bg-emerald-400 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            Download Course Bundle
          </button>
          <button
            type="button"
            onClick={onToggleSave}
            className={savedBtnCls}
          >
            <Bookmark className={bookmarkCls} />
            {isSaved ? "Saved" : "Save"}
          </button>
          <button
            type="button"
            onClick={onShare}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#D8E8E2] dark:border-[#10372F] bg-white dark:bg-[#041D18] text-xs font-semibold text-[#5C786E] dark:text-[#8AA89F] hover:border-emerald-400 transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
