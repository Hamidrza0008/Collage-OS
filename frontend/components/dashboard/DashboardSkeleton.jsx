"use client";

import {
  Skeleton,
  SkeletonText,
  SkeletonCircle,
  SkeletonBadge,
  SkeletonButton,
  SkeletonCard,
} from "@/components/ui/skeleton";

/**
 * DashboardSkeleton
 * Matches the layout, spacing, and dimensions of the Student Dashboard.
 */
export default function DashboardSkeleton() {
  return (
    <div className="flex flex-col xl:flex-row items-start gap-3.5 2xl:gap-4 w-full max-w-[1720px] mx-auto pb-6">
      {/* ========================================================================= */}
      {/* CENTER / MAIN DASHBOARD AREA (~72-75% on Desktop)                         */}
      {/* ========================================================================= */}
      <div className="flex-1 min-w-0 w-full space-y-3.5">
        {/* 1. Welcome Hero Skeleton */}
        <SkeletonCard padding="p-5 sm:p-6" className="relative overflow-hidden min-h-[148px]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2.5 max-w-md">
              <SkeletonBadge width="w-32" height="h-5" />
              <Skeleton className="h-7 w-64 rounded-md" />
              <SkeletonText lines={2} widths={["100%", "80%"]} height="h-3.5" />
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <Skeleton className="w-28 h-24 rounded-xl" />
            </div>
          </div>
        </SkeletonCard>

        {/* 2. Key Metrics Summary Stat Cards (4-column grid) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} padding="p-3.5 sm:p-4">
              <div className="flex items-center justify-between mb-2.5">
                <SkeletonCircle size="w-8 h-8" />
                <SkeletonBadge width="w-12" height="h-4" />
              </div>
              <Skeleton className="h-6 w-16 mb-1 rounded-md" />
              <Skeleton className="h-3 w-24 rounded-md" />
            </SkeletonCard>
          ))}
        </div>

        {/* 3. Main Content Row: Today's Timetable + Upcoming Assignments */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
          {/* Today's Timetable Skeleton */}
          <SkeletonCard padding="p-4 sm:p-4.5" className="min-h-[290px]">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8F1ED] dark:border-[#10372F] mb-3">
              <div className="flex items-center gap-2">
                <SkeletonCircle size="w-5 h-5" />
                <Skeleton className="h-4 w-32 rounded-md" />
              </div>
              <SkeletonBadge width="w-16" height="h-4" />
            </div>
            <div className="space-y-2.5">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl border border-[#E8F1ED] dark:border-[#10372F] flex items-center justify-between gap-3"
                >
                  <div className="space-y-1.5 flex-1">
                    <Skeleton className="h-3.5 w-40 rounded-md" />
                    <Skeleton className="h-2.5 w-24 rounded-md" />
                  </div>
                  <SkeletonBadge width="w-20" height="h-6" />
                </div>
              ))}
            </div>
          </SkeletonCard>

          {/* Upcoming Assignments Skeleton */}
          <SkeletonCard padding="p-4 sm:p-4.5" className="min-h-[290px]">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8F1ED] dark:border-[#10372F] mb-3">
              <div className="flex items-center gap-2">
                <SkeletonCircle size="w-5 h-5" />
                <Skeleton className="h-4 w-36 rounded-md" />
              </div>
              <SkeletonBadge width="w-14" height="h-4" />
            </div>
            <div className="space-y-2.5">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl border border-[#E8F1ED] dark:border-[#10372F] flex items-center justify-between gap-3"
                >
                  <div className="space-y-1.5 flex-1">
                    <Skeleton className="h-3.5 w-44 rounded-md" />
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-2.5 w-16 rounded-md" />
                      <Skeleton className="h-2.5 w-20 rounded-md" />
                    </div>
                  </div>
                  <SkeletonBadge width="w-16" height="h-6" />
                </div>
              ))}
            </div>
          </SkeletonCard>
        </div>

        {/* 4. Lower Main Dashboard Row: Attendance + Performance + Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
          {/* Attendance Overview Skeleton */}
          <SkeletonCard padding="p-4">
            <div className="flex items-center justify-between mb-4">
              <Skeleton className="h-4 w-28 rounded-md" />
              <SkeletonBadge width="w-12" height="h-4" />
            </div>
            <div className="flex items-center justify-center py-2 mb-3">
              <SkeletonCircle size="w-24 h-24" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-2 w-full rounded-full" />
              <div className="flex justify-between">
                <Skeleton className="h-2.5 w-16 rounded-md" />
                <Skeleton className="h-2.5 w-12 rounded-md" />
              </div>
            </div>
          </SkeletonCard>

          {/* Academic Performance Skeleton */}
          <SkeletonCard padding="p-4">
            <div className="flex items-center justify-between mb-4">
              <Skeleton className="h-4 w-32 rounded-md" />
              <SkeletonBadge width="w-14" height="h-4" />
            </div>
            <div className="flex items-baseline gap-2 mb-3">
              <Skeleton className="h-8 w-16 rounded-md" />
              <Skeleton className="h-3 w-20 rounded-md" />
            </div>
            <div className="space-y-2.5 pt-2">
              <Skeleton className="h-3 w-full rounded-md" />
              <Skeleton className="h-3 w-4/5 rounded-md" />
              <Skeleton className="h-3 w-3/4 rounded-md" />
            </div>
          </SkeletonCard>

          {/* Student Projects Skeleton */}
          <SkeletonCard padding="p-4" className="md:col-span-2 xl:col-span-1">
            <div className="flex items-center justify-between mb-4">
              <Skeleton className="h-4 w-28 rounded-md" />
              <SkeletonBadge width="w-12" height="h-4" />
            </div>
            <div className="space-y-2.5">
              {Array.from({ length: 2 }).map((_, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl border border-[#E8F1ED] dark:border-[#10372F] space-y-1.5"
                >
                  <Skeleton className="h-3.5 w-32 rounded-md" />
                  <SkeletonText lines={1} widths={["85%"]} height="h-2.5" />
                  <div className="flex gap-1 pt-1">
                    <SkeletonBadge width="w-10" height="h-3.5" />
                    <SkeletonBadge width="w-12" height="h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </SkeletonCard>
        </div>

        {/* 5. Lower Info Section: Notices + Events + Recommendations */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonCard key={i} padding="p-4">
              <div className="flex items-center justify-between mb-3.5">
                <Skeleton className="h-4 w-28 rounded-md" />
                <SkeletonCircle size="w-4 h-4" />
              </div>
              <div className="space-y-2.5">
                {Array.from({ length: 2 }).map((_, j) => (
                  <div key={j} className="space-y-1.5 pb-2 border-b border-[#E8F1ED]/60 dark:border-[#10372F]/60 last:border-none">
                    <Skeleton className="h-3.5 w-full rounded-md" />
                    <div className="flex justify-between">
                      <Skeleton className="h-2.5 w-16 rounded-md" />
                      <Skeleton className="h-2.5 w-12 rounded-md" />
                    </div>
                  </div>
                ))}
              </div>
            </SkeletonCard>
          ))}
        </div>

        {/* 6. Promotional Banner Skeleton */}
        <SkeletonCard padding="p-4" className="h-24 flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-4 w-48 rounded-md" />
            <Skeleton className="h-3 w-64 rounded-md" />
          </div>
          <SkeletonButton width="w-28" height="h-8" />
        </SkeletonCard>
      </div>

      {/* ========================================================================= */}
      {/* RIGHT UTILITY PANEL (~25-28% on Desktop)                                  */}
      {/* ========================================================================= */}
      <div className="w-full xl:w-[310px] 2xl:w-[330px] shrink-0 space-y-3.5">
        {/* 1. Student Profile Card Skeleton */}
        <SkeletonCard padding="p-4">
          <div className="flex items-center gap-3 mb-3.5">
            <SkeletonCircle size="w-12 h-12" />
            <div className="space-y-1.5 flex-1">
              <Skeleton className="h-4 w-28 rounded-md" />
              <Skeleton className="h-3 w-36 rounded-md" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 py-2.5 border-y border-[#E8F1ED] dark:border-[#10372F] mb-3">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="text-center space-y-1">
                <Skeleton className="h-4 w-8 mx-auto rounded-md" />
                <Skeleton className="h-2.5 w-10 mx-auto rounded-md" />
              </div>
            ))}
          </div>
          <SkeletonButton width="w-full" height="h-8" rounded="rounded-xl" />
        </SkeletonCard>

        {/* 2. Campus AI Card Skeleton */}
        <SkeletonCard padding="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <SkeletonCircle size="w-5 h-5" />
              <Skeleton className="h-4 w-24 rounded-md" />
            </div>
            <SkeletonBadge width="w-12" height="h-4" />
          </div>
          <Skeleton className="h-10 w-full rounded-xl mb-2.5" />
          <div className="flex flex-wrap gap-1.5">
            <SkeletonBadge width="w-20" height="h-5" />
            <SkeletonBadge width="w-24" height="h-5" />
            <SkeletonBadge width="w-16" height="h-5" />
          </div>
        </SkeletonCard>

        {/* 3. Quick Actions Grid Skeleton */}
        <SkeletonCard padding="p-4">
          <Skeleton className="h-4 w-24 mb-3 rounded-md" />
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="p-2.5 rounded-xl border border-[#E8F1ED] dark:border-[#10372F] flex flex-col items-center gap-1.5">
                <SkeletonCircle size="w-6 h-6" />
                <Skeleton className="h-2 w-10 rounded-md" />
              </div>
            ))}
          </div>
        </SkeletonCard>

        {/* 4. Recent Activity Skeleton */}
        <SkeletonCard padding="p-4">
          <Skeleton className="h-4 w-28 mb-3 rounded-md" />
          <div className="space-y-2.5">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="flex items-center gap-2.5">
                <SkeletonCircle size="w-7 h-7" />
                <div className="space-y-1 flex-1">
                  <Skeleton className="h-3 w-32 rounded-md" />
                  <Skeleton className="h-2 w-16 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </SkeletonCard>

        {/* 5. Journey Card Skeleton */}
        <SkeletonCard padding="p-4" className="min-h-[100px] flex items-center gap-3">
          <SkeletonCircle size="w-10 h-10" />
          <div className="space-y-1.5 flex-1">
            <Skeleton className="h-3.5 w-28 rounded-md" />
            <Skeleton className="h-2.5 w-36 rounded-md" />
          </div>
        </SkeletonCard>
      </div>
    </div>
  );
}
