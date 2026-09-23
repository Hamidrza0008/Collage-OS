"use client";

import Skeleton from "@/components/ui/skeleton/Skeleton";

export default function LostFoundSkeleton() {
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
              <Skeleton className="h-6 w-40 rounded-md" />
              <Skeleton className="h-3 w-3/4 rounded-md" />
            </div>
          </div>
          <Skeleton className="h-10 w-32 rounded-xl hidden sm:block" />
        </div>

        {/* 2. Tabs + Search Skeleton */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-24 rounded-xl" />
            <Skeleton className="h-9 w-24 rounded-xl" />
            <Skeleton className="h-9 w-24 rounded-xl" />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Skeleton className="h-9 w-60 rounded-xl flex-1" />
            <Skeleton className="h-9 w-20 rounded-xl shrink-0" />
          </div>
        </div>

        {/* 3. Category Chips Skeleton */}
        <div className="flex items-center gap-2 overflow-hidden py-1">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <Skeleton key={i} className="h-8 w-20 rounded-xl shrink-0" />
          ))}
        </div>

        {/* 4. Six Horizontal Item Card Skeletons */}
        <div className="space-y-3.5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] p-4 flex flex-col md:flex-row md:items-center gap-4"
            >
              {/* Thumbnail */}
              <Skeleton className="w-full md:w-32 h-44 md:h-32 rounded-xl shrink-0" />

              {/* Center */}
              <div className="flex-1 space-y-2.5 py-1">
                <Skeleton className="h-4 w-16 rounded-full" />
                <Skeleton className="h-5 w-3/4 rounded-md" />
                <Skeleton className="h-3.5 w-full rounded-md" />
                <div className="flex gap-1.5 pt-1">
                  <Skeleton className="h-4 w-14 rounded-md" />
                  <Skeleton className="h-4 w-14 rounded-md" />
                  <Skeleton className="h-4 w-14 rounded-md" />
                </div>
                <div className="flex gap-4 pt-2">
                  <Skeleton className="h-3 w-16 rounded-md" />
                  <Skeleton className="h-3 w-20 rounded-md" />
                </div>
              </div>

              {/* Right */}
              <div className="md:w-52 shrink-0 space-y-2 md:text-right pt-2 md:pt-0">
                <Skeleton className="h-3.5 w-28 md:ml-auto rounded-md" />
                <Skeleton className="h-3.5 w-36 md:ml-auto rounded-md" />
                <Skeleton className="h-3.5 w-32 md:ml-auto rounded-md" />
                <div className="pt-2">
                  <Skeleton className="h-9 w-full md:w-28 md:ml-auto rounded-xl" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 5. Bottom CTA Skeleton */}
        <Skeleton className="h-20 w-full rounded-2xl" />
      </div>

      {/* ========================================================================= */}
      {/* RIGHT 1/3 SIDEBAR SKELETON                                                */}
      {/* ========================================================================= */}
      <div className="lg:col-span-4 space-y-4">
        {/* Quick Stats Skeleton */}
        <div className="rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] p-4 space-y-3">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-24 rounded-md" />
            <Skeleton className="h-4 w-14 rounded-md" />
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <Skeleton className="h-16 rounded-xl" />
            <Skeleton className="h-16 rounded-xl" />
            <Skeleton className="h-16 rounded-xl" />
            <Skeleton className="h-16 rounded-xl" />
          </div>
        </div>

        {/* Recent Items Skeleton */}
        <div className="rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] p-4 space-y-3">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-24 rounded-md" />
            <Skeleton className="h-4 w-14 rounded-md" />
          </div>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-2.5">
                <Skeleton className="w-9 h-9 rounded-lg shrink-0" />
                <div className="space-y-1.5 flex-1">
                  <Skeleton className="h-3.5 w-3/4 rounded-md" />
                  <Skeleton className="h-2.5 w-1/2 rounded-md" />
                </div>
                <Skeleton className="h-4 w-10 rounded-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions Skeleton */}
        <div className="rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] p-4 space-y-3">
          <Skeleton className="h-4 w-24 rounded-md" />
          <div className="grid grid-cols-2 gap-2.5">
            <Skeleton className="h-16 rounded-xl" />
            <Skeleton className="h-16 rounded-xl" />
            <Skeleton className="h-16 rounded-xl" />
            <Skeleton className="h-16 rounded-xl" />
          </div>
        </div>

        {/* CTA Skeleton */}
        <Skeleton className="h-44 w-full rounded-2xl" />
      </div>
    </div>
  );
}
