"use client";

import Image from "next/image";
import { CheckCircle2, Circle, Sparkles } from "lucide-react";
import { useTheme } from "../providers/ThemeProvider";

export default function ProfileCompletionCard({ completion }) {
  const { isDark } = useTheme();
  const percentage = completion?.percentage || 85;

  // SVG Circular Gauge calculation
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * percentage) / 100;

  return (
    <div className="relative bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] rounded-2xl p-4 sm:p-5 shadow-2xs overflow-hidden">
      {/* Decorative Botanical Foliage in bottom right corner */}
      <div className="absolute -bottom-2 -right-2 w-24 h-24 pointer-events-none opacity-85 select-none transition-opacity duration-300">
        <Image
          src={isDark ? "/assets/profile/dark/plant.png" : "/assets/profile/light/plant.png"}
          alt="Botanical Accent"
          fill
          className="object-contain object-bottom-right"
        />
      </div>

      {/* Header */}
      <div className="flex items-center gap-2 pb-2.5 mb-3 border-b border-[#E8F1ED] dark:border-[#10372F]">
        <div className="w-6 h-6 rounded-full bg-[#DDF3EB] dark:bg-[#123F35] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-3.5 h-3.5" />
        </div>
        <h2 className="text-[13.5px] sm:text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
          Profile Completion
        </h2>
      </div>

      {/* Circular Progress Gauge & Description */}
      <div className="flex items-center gap-4 relative z-10">
        <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
            {/* Background Track */}
            <circle
              cx="40"
              cy="40"
              r={radius}
              className="stroke-[#E8F1ED] dark:stroke-[#10372F]"
              strokeWidth="6"
              fill="none"
            />
            {/* Active Emerald Gauge */}
            <circle
              cx="40"
              cy="40"
              r={radius}
              className="stroke-[#159B72] dark:stroke-[#20D39B] transition-all duration-700 ease-out"
              strokeWidth="6"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="none"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-base font-extrabold text-[#0B3024] dark:text-[#F1FAF6]">
              {percentage}%
            </span>
          </div>
        </div>

        <div className="min-w-0">
          <h3 className="text-xs sm:text-[13px] font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            {completion?.title || "Almost there!"}
          </h3>
          <p className="text-[11px] text-[#658278] dark:text-[#789991] mt-0.5 leading-snug">
            {completion?.description ||
              "Complete your profile to unlock more features."}
          </p>
        </div>
      </div>

      {/* Checklist */}
      <div className="mt-4 space-y-2 text-[11.5px] relative z-10">
        {completion?.checklist?.map((item, index) => (
          <div key={index} className="flex items-center gap-2.5">
            {item.completed ? (
              <div className="w-4 h-4 rounded-full bg-[#159B72] dark:bg-[#20D39B] flex items-center justify-center text-white dark:text-[#021512] shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            ) : (
              <div className="w-4 h-4 rounded-full border-2 border-[#B5CCC5] dark:border-[#16463D] shrink-0" />
            )}
            <span
              className={
                item.completed
                  ? "text-[#0B3024] dark:text-[#F1FAF6] font-medium"
                  : "text-[#658278] dark:text-[#789991]"
              }
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
