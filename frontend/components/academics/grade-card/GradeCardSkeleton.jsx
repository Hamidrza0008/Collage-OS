"use client";

export default function GradeCardSkeleton() {
  return (
    <div className="w-full min-h-screen pb-12 transition-colors">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Main Column (2/3) */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-4">
          {/* Header Skeleton */}
          <div className="w-full h-24 rounded-2xl skeleton-base skeleton-shimmer border border-[#D8E8E2] dark:border-[#10372F]" />

          {/* Semester Selector Skeleton */}
          <div className="w-full h-24 rounded-2xl skeleton-base skeleton-shimmer border border-[#D8E8E2] dark:border-[#10372F]" />

          {/* Current Semester Summary Hero Skeleton */}
          <div className="w-full h-56 rounded-2xl skeleton-base skeleton-shimmer border border-[#D8E8E2] dark:border-[#10372F]" />

          {/* Grade Table Skeleton */}
          <div className="w-full h-96 rounded-2xl skeleton-base skeleton-shimmer border border-[#D8E8E2] dark:border-[#10372F]" />

          {/* Performance Trend Skeleton */}
          <div className="w-full h-64 rounded-2xl skeleton-base skeleton-shimmer border border-[#D8E8E2] dark:border-[#10372F]" />

          {/* Credit Summary Skeleton */}
          <div className="w-full h-44 rounded-2xl skeleton-base skeleton-shimmer border border-[#D8E8E2] dark:border-[#10372F]" />
        </div>

        {/* Right Sidebar Skeleton (1/3) */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-4">
          <div className="w-full h-56 rounded-2xl skeleton-base skeleton-shimmer border border-[#D8E8E2] dark:border-[#10372F]" />
          <div className="w-full h-40 rounded-2xl skeleton-base skeleton-shimmer border border-[#D8E8E2] dark:border-[#10372F]" />
          <div className="w-full h-36 rounded-2xl skeleton-base skeleton-shimmer border border-[#D8E8E2] dark:border-[#10372F]" />
          <div className="w-full h-64 rounded-2xl skeleton-base skeleton-shimmer border border-[#D8E8E2] dark:border-[#10372F]" />
        </div>
      </div>
    </div>
  );
}
