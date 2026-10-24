import React from "react";

export default function FacultyTimetableLoading() {
  return (
    <div className="space-y-5 sm:space-y-6 max-w-[1600px] mx-auto pb-10 animate-pulse">
      {/* Hero Banner Skeleton */}
      <div className="h-32 sm:h-36 rounded-2xl bg-emerald-950/20 dark:bg-[#073629]/40 border border-[#D8E8E2]/60 dark:border-[#10372F]" />

      {/* KPI Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-28 rounded-2xl bg-white/60 dark:bg-[#06241F]/60 border border-[#D8E8E2] dark:border-[#10372F] p-4"
          />
        ))}
      </div>

      {/* Controls Skeleton */}
      <div className="space-y-3">
        <div className="h-16 rounded-2xl bg-white/60 dark:bg-[#06241F]/60 border border-[#D8E8E2] dark:border-[#10372F]" />
        <div className="h-10 rounded-xl bg-white/40 dark:bg-[#06241F]/40 border border-[#D8E8E2]/50 dark:border-[#10372F]/50" />
        <div className="h-20 rounded-2xl bg-white/60 dark:bg-[#06241F]/60 border border-[#D8E8E2] dark:border-[#10372F]" />
      </div>

      {/* Schedule Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="h-96 rounded-2xl bg-white/60 dark:bg-[#06241F]/60 border border-[#D8E8E2] dark:border-[#10372F]"
          />
        ))}
      </div>
    </div>
  );
}
