"use client";

import Skeleton from "@/components/ui/skeleton/Skeleton";

export default function CampusFeedSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start animate-in fade-in duration-200">
      {/* ========================================================================= */}
      {/* MAIN 2/3 COLUMN SKELETON                                                  */}
      {/* ========================================================================= */}
      <div className="lg:col-span-8 space-y-4">
        {/* 1. Hero Skeleton */}
        <div className="rounded-2xl p-5 border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#06241F] flex items-center justify-between min-h-[96px]">
          <div className="flex items-center gap-3.5 w-2/3">
            <Skeleton className="w-12 h-12 rounded-xl shrink-0" />
            <div className="space-y-2 w-full">
              <Skeleton className="h-6 w-44 rounded-md" />
              <Skeleton className="h-3 w-3/4 rounded-md" />
            </div>
          </div>
          <Skeleton className="h-10 w-32 rounded-xl hidden sm:block" />
        </div>

        {/* 2. Composer Skeleton */}
        <div className="rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] p-4 space-y-3">
          <div className="flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-full shrink-0" />
            <Skeleton className="h-10 flex-1 rounded-xl" />
          </div>
          <div className="flex items-center justify-between pt-1">
            <div className="flex gap-2">
              <Skeleton className="h-7 w-20 rounded-lg" />
              <Skeleton className="h-7 w-16 rounded-lg" />
              <Skeleton className="h-7 w-24 rounded-lg hidden sm:block" />
              <Skeleton className="h-7 w-16 rounded-lg" />
            </div>
            <Skeleton className="h-7 w-16 rounded-xl" />
          </div>
        </div>

        {/* 3. Tabs + Filter Skeleton */}
        <div className="flex items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/60 dark:bg-[#06241F]/60">
            <Skeleton className="h-8 w-20 rounded-lg" />
            <Skeleton className="h-8 w-20 rounded-lg" />
            <Skeleton className="h-8 w-20 rounded-lg" />
          </div>
          <Skeleton className="h-8 w-28 rounded-xl" />
        </div>

        {/* 4. Exactly 6 Feed Post Skeletons */}
        <div className="space-y-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] p-4 sm:p-5 space-y-3.5"
            >
              {/* Post Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-10 h-10 rounded-full shrink-0" />
                  <div className="space-y-1.5">
                    <Skeleton className="h-4 w-32 rounded-md" />
                    <Skeleton className="h-3 w-40 rounded-md" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-16 rounded-full" />
                  <Skeleton className="w-6 h-6 rounded-md" />
                </div>
              </div>

              {/* Text Lines */}
              <div className="space-y-2 pt-1">
                <Skeleton className="h-3.5 w-full rounded-md" />
                <Skeleton className="h-3.5 w-4/5 rounded-md" />
                {i === 2 && <Skeleton className="h-36 w-full rounded-xl mt-2" />}
                {i === 3 && <Skeleton className="h-28 w-full rounded-xl mt-2" />}
              </div>

              {/* Action Row */}
              <div className="flex items-center gap-6 pt-2 border-t border-[#E8F1ED] dark:border-[#10372F]">
                <Skeleton className="h-4 w-12 rounded-md" />
                <Skeleton className="h-4 w-12 rounded-md" />
                <Skeleton className="h-4 w-12 rounded-md" />
              </div>

              {/* Comment placeholder */}
              <Skeleton className="h-8 w-full rounded-xl" />
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* RIGHT 1/3 SIDEBAR SKELETON                                                */}
      {/* ========================================================================= */}
      <div className="lg:col-span-4 space-y-4">
        {/* 1. Trending Skeleton */}
        <div className="rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] p-4 space-y-3">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-32 rounded-md" />
            <Skeleton className="h-4 w-14 rounded-md" />
          </div>
          <div className="space-y-2.5 pt-1">
            {[1, 2, 3, 4, 5].map((idx) => (
              <div key={idx} className="flex items-center gap-3">
                <Skeleton className="w-5 h-4 rounded-md shrink-0" />
                <Skeleton className="w-10 h-10 rounded-lg shrink-0" />
                <div className="flex-1 space-y-1">
                  <Skeleton className="h-3.5 w-3/4 rounded-md" />
                  <Skeleton className="h-2.5 w-1/2 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. People You May Know Skeleton */}
        <div className="rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] p-4 space-y-3">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-36 rounded-md" />
            <Skeleton className="h-4 w-14 rounded-md" />
          </div>
          <div className="space-y-3 pt-1">
            {[1, 2, 3, 4].map((idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Skeleton className="w-9 h-9 rounded-full shrink-0" />
                  <div className="space-y-1">
                    <Skeleton className="h-3.5 w-24 rounded-md" />
                    <Skeleton className="h-2.5 w-20 rounded-md" />
                  </div>
                </div>
                <Skeleton className="h-7 w-16 rounded-xl" />
              </div>
            ))}
          </div>
        </div>

        {/* 3. Quick Actions Skeleton */}
        <div className="rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] p-4 space-y-3">
          <Skeleton className="h-4 w-24 rounded-md" />
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            {[1, 2, 3, 4].map((idx) => (
              <Skeleton key={idx} className="h-12 rounded-xl" />
            ))}
          </div>
        </div>

        {/* 4. Stay Connected CTA Skeleton */}
        <div className="rounded-2xl bg-[#063327] p-5 space-y-3">
          <Skeleton className="h-4 w-28 rounded-md bg-white/20" />
          <Skeleton className="h-7 w-3/4 rounded-md bg-white/20" />
          <Skeleton className="h-10 w-full rounded-xl bg-white/20" />
          <Skeleton className="h-28 w-full rounded-xl bg-white/20" />
        </div>
      </div>
    </div>
  );
}
