"use client";

import {
  Skeleton,
  SkeletonText,
  SkeletonCircle,
  SkeletonBadge,
  SkeletonButton,
  SkeletonCard,
} from "@/components/ui/skeleton";

export default function EventsSkeleton() {
  return (
    <div className="w-full min-h-screen pb-12">
      {/* Master 2-Column Desktop Grid: Main 2/3 + Right Sidebar 1/3 Starting at SAME TOP LEVEL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* ========================================================================= */}
        {/* MAIN 2/3 COLUMN: Hero + Filters + 6 Event Skeleton Cards + Pagination       */}
        {/* ========================================================================= */}
        <div className="lg:col-span-8 space-y-4">
          {/* 1. Events Hero Skeleton */}
          <SkeletonCard padding="p-4 sm:p-5" className="relative overflow-hidden min-h-[96px]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <SkeletonCircle size="w-11 h-11" className="rounded-xl" />
                <div className="space-y-1.5">
                  <Skeleton className="h-6 w-32 rounded-md" />
                  <Skeleton className="h-3 w-64 rounded-md" />
                </div>
              </div>
              <Skeleton className="h-12 w-44 rounded-xl" />
            </div>
          </SkeletonCard>

          {/* 2. Events Tabs & Filters Skeleton */}
          <SkeletonCard padding="p-2.5 sm:p-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5">
              <div className="flex items-center gap-1.5">
                <SkeletonBadge width="w-24" height="h-7" className="rounded-xl" />
                <SkeletonBadge width="w-24" height="h-7" className="rounded-xl" />
                <SkeletonBadge width="w-20" height="h-7" className="rounded-xl" />
                <SkeletonBadge width="w-16" height="h-7" className="rounded-xl" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-7 w-48 rounded-xl" />
                <Skeleton className="h-7 w-32 rounded-xl" />
              </div>
            </div>
          </SkeletonCard>

          {/* 3. Event Cards Grid Skeleton (Exactly 6 cards matching pagination) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 6 }).map((_, idx) => (
              <SkeletonCard key={idx} padding="p-3.5" className="flex flex-col sm:flex-row gap-3.5">
                {/* Thumbnail */}
                <Skeleton className="w-full sm:w-[136px] md:w-[144px] h-36 rounded-xl shrink-0" />

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between space-y-2">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5">
                      <SkeletonBadge width="w-16" height="h-5" />
                      <SkeletonBadge width="w-16" height="h-5" />
                    </div>
                    <Skeleton className="h-4 w-4/5 rounded-md" />
                    <SkeletonText lines={2} widths={["100%", "75%"]} height="h-2.5" />
                    <div className="space-y-1 pt-1">
                      <Skeleton className="h-2.5 w-32 rounded-xs" />
                      <Skeleton className="h-2.5 w-28 rounded-xs" />
                      <Skeleton className="h-2.5 w-24 rounded-xs" />
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="pt-2 border-t border-gray-100 dark:border-[#10372F] flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="flex -space-x-1.5">
                        <SkeletonCircle size="w-5 h-5" />
                        <SkeletonCircle size="w-5 h-5" />
                        <SkeletonCircle size="w-5 h-5" />
                      </div>
                      <Skeleton className="h-2.5 w-14 rounded-xs" />
                    </div>
                    <SkeletonButton width="w-24" height="h-6.5" rounded="rounded-xl" />
                  </div>
                </div>
              </SkeletonCard>
            ))}
          </div>

          {/* 4. Pagination Skeleton */}
          <div className="flex items-center justify-between px-1 py-2">
            <Skeleton className="h-3 w-36 rounded-md" />
            <div className="flex items-center gap-1.5">
              <SkeletonButton width="w-16" height="h-7" rounded="rounded-lg" />
              <SkeletonCircle size="w-7 h-7" />
              <SkeletonCircle size="w-7 h-7" />
              <SkeletonButton width="w-16" height="h-7" rounded="rounded-lg" />
            </div>
          </div>

          {/* 5. Submit Event CTA Skeleton */}
          <SkeletonCard padding="p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <SkeletonCircle size="w-10 h-10" className="rounded-xl" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-36 rounded-md" />
                  <Skeleton className="h-3 w-72 rounded-md" />
                </div>
              </div>
              <SkeletonButton width="w-32" height="h-8" rounded="rounded-xl" />
            </div>
          </SkeletonCard>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT 1/3 SIDEBAR: Starts at SAME TOP LEVEL beside Hero                    */}
        {/* ========================================================================= */}
        <div className="lg:col-span-4 space-y-4">
          {/* 1. Calendar Skeleton */}
          <SkeletonCard padding="p-4" className="space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-28 rounded-md" />
              <div className="flex items-center gap-1">
                <SkeletonCircle size="w-6 h-6" />
                <SkeletonCircle size="w-6 h-6" />
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 7 }).map((_, i) => (
                <Skeleton key={i} className="h-3 w-6 mx-auto rounded-xs" />
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1.5 pt-1">
              {Array.from({ length: 35 }).map((_, i) => (
                <SkeletonCircle key={i} size="w-6.5 h-6.5" className="mx-auto" />
              ))}
            </div>
          </SkeletonCard>

          {/* 2. Upcoming Events Skeleton */}
          <SkeletonCard padding="p-4" className="space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-32 rounded-md" />
              <Skeleton className="h-3 w-14 rounded-md" />
            </div>
            <div className="space-y-2.5">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <SkeletonCircle size="w-8 h-8" className="rounded-xl" />
                  <div className="flex-1 space-y-1">
                    <Skeleton className="h-3.5 w-4/5 rounded-md" />
                    <Skeleton className="h-2.5 w-28 rounded-xs" />
                  </div>
                </div>
              ))}
            </div>
          </SkeletonCard>

          {/* 3. Event Categories Skeleton */}
          <SkeletonCard padding="p-4" className="space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-28 rounded-md" />
              <Skeleton className="h-3 w-14 rounded-md" />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {Array.from({ length: 7 }).map((_, i) => (
                <SkeletonBadge key={i} width="w-18" height="h-6" className="rounded-xl" />
              ))}
            </div>
          </SkeletonCard>

          {/* 4. Notification CTA Skeleton */}
          <SkeletonCard padding="p-4.5" className="h-32 bg-[#063327]/60" />
        </div>
      </div>
    </div>
  );
}
