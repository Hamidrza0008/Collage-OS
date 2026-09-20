"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useTheme } from "../providers/ThemeProvider";

export default function StudyReminderCard({ onOpenStudyPlan }) {
  const { isDark } = useTheme();

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-5 flex flex-col justify-between relative overflow-hidden">
      {/* Title */}
      <h2 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight mb-2">
        Study Reminder
      </h2>

      {/* Visual & Motivational Content */}
      <div className="flex items-center gap-3 my-1">
        {/* Generated Theme-Aware Study Graphic */}
        <div className="relative w-16 h-16 shrink-0 rounded-xl overflow-hidden bg-emerald-50 dark:bg-emerald-950/40 p-1 border border-emerald-100 dark:border-emerald-900/30 flex items-center justify-center">
          <Image
            src={isDark ? "/assets/academics/dark/study-reminder.png" : "/assets/academics/light/study-reminder.png"}
            alt="Study Reminder Visual"
            width={60}
            height={60}
            className="object-contain"
          />
        </div>

        <div>
          <p className="text-xs text-[#0B3024] dark:text-[#E2F1EC] font-semibold leading-snug">
            Keep going! You&apos;re doing great.
          </p>
          <p className="text-[11px] text-[#5C786E] dark:text-[#8AA89F] mt-0.5 leading-tight">
            Small steps every day lead to big results.
          </p>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-3">
        <button
          type="button"
          onClick={onOpenStudyPlan}
          className="w-full py-2 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white dark:bg-[#10B981] dark:hover:bg-[#059669] dark:text-[#021512] text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
        >
          <span>View Study Plan</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
