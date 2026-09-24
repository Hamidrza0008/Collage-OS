"use client";

import { BarChart2, CheckCircle2, Circle } from "lucide-react";

export default function AccountProgressCard({ progressItems, onToggleItem }) {
  const completedCount = progressItems.filter((i) => i.completed).length;
  const percentage = Math.round((completedCount / progressItems.length) * 100);

  // SVG Circular Gauge calculation
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="rounded-2xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#06241F] p-4 shadow-xs space-y-3">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
          <BarChart2 className="w-3.5 h-3.5" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
            Account Progress
          </h2>
          <p className="text-[10.5px] text-[#658278] dark:text-[#789991]">
            Keep going! You're doing great.
          </p>
        </div>
      </div>

      {/* Progress Layout: Gauge Left + Checklist Right */}
      <div className="flex items-center justify-between gap-4 pt-1">
        {/* Circular Progress Gauge */}
        <div className="flex flex-col items-center shrink-0">
          <div className="relative w-20 h-20 flex items-center justify-center">
            <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 80 80">
              {/* Background circle track */}
              <circle
                cx="40"
                cy="40"
                r={radius}
                className="stroke-gray-100 dark:stroke-emerald-950/60"
                strokeWidth="6"
                fill="transparent"
              />
              {/* Animated Progress circle */}
              <circle
                cx="40"
                cy="40"
                r={radius}
                className="stroke-[#159B72] dark:stroke-[#18B887] transition-all duration-700 ease-out"
                strokeWidth="6"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-base font-extrabold text-[#0B3024] dark:text-[#F1FAF6] leading-none">
                {percentage}%
              </span>
            </div>
          </div>
          <span className="text-[10px] text-[#658278] dark:text-[#789991] font-medium mt-1">
            Profile Complete
          </span>
        </div>

        {/* Checklist */}
        <div className="flex-1 space-y-1.5 text-xs">
          {progressItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onToggleItem(item.id)}
              className="w-full flex items-center gap-2 text-left hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors group cursor-pointer"
            >
              {item.completed ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              ) : (
                <Circle className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600 group-hover:text-emerald-500 shrink-0" />
              )}
              <span
                className={`text-[11px] leading-tight ${
                  item.completed
                    ? "font-medium text-[#0B3024] dark:text-[#F1FAF6]"
                    : "text-[#658278] dark:text-[#789991]"
                }`}
              >
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
