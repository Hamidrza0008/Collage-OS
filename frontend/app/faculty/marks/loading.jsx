import React from "react";
import SkeletonCard from "@/components/ui/skeleton/SkeletonCard";
import SkeletonButton from "@/components/ui/skeleton/SkeletonButton";

export default function FacultyMarksLoading() {
  return (
    <div className="space-y-5 sm:space-y-6 max-w-[1600px] mx-auto pb-10 animate-pulse">
      {/* Hero Banner Skeleton */}
      <div className="h-32 sm:h-36 rounded-2xl bg-emerald-950/20 dark:bg-[#073629]/40 border border-[#D8E8E2]/60 dark:border-[#10372F]" />

      {/* KPI Cards Skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-28 rounded-2xl bg-white/60 dark:bg-[#06241F]/60 border border-[#D8E8E2] dark:border-[#10372F] p-4"
          />
        ))}
      </div>

      {/* Filter Bar Skeleton */}
      <div className="h-24 rounded-2xl bg-white/60 dark:bg-[#06241F]/60 border border-[#D8E8E2] dark:border-[#10372F]" />

      {/* 2-Column Skeleton */}
      <div className="flex flex-col xl:flex-row gap-5 sm:gap-6 items-start">
        <div className="flex-1 w-full h-96 rounded-2xl bg-white/60 dark:bg-[#06241F]/60 border border-[#D8E8E2] dark:border-[#10372F]" />
        <div className="w-full xl:w-[340px] 2xl:w-[380px] h-96 rounded-2xl bg-white/60 dark:bg-[#06241F]/60 border border-[#D8E8E2] dark:border-[#10372F]" />
      </div>
    </div>
  );
}
