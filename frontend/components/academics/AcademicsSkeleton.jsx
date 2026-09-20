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
 * AcademicsSkeleton
 * Replicates the 2/3 + 1/3 top-aligned desktop grid and cards of the Academics Center.
 */
export default function AcademicsSkeleton() {
  return (
    <div className="w-full min-h-screen pb-12">
      {/* Master 2-Column Desktop Grid: Main 2/3 + Right Sidebar 1/3 Starting at the SAME TOP LEVEL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* ========================================================================= */}
        {/* MAIN 2/3 COLUMN: Header + Tabs + Academics Content                         */}
        {/* ========================================================================= */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-4">
          {/* 1. Academics Page Header Skeleton */}
          <SkeletonCard padding="p-5 sm:p-6" className="relative overflow-hidden min-h-[112px]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-6 w-52 rounded-md" />
                  <SkeletonBadge width="w-16" height="h-5" />
                </div>
                <Skeleton className="h-3.5 w-64 rounded-md" />
              </div>
              <SkeletonButton width="w-36" height="h-9" rounded="rounded-xl" />
            </div>
          </SkeletonCard>

          {/* 2. Sleek Horizontal Navigation Tabs Skeleton */}
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            {Array.from({ length: 6 }).map((_, idx) => (
              <SkeletonBadge key={idx} width="w-24" height="h-8" className="rounded-xl" />
            ))}
          </div>

          {/* 3. Row 1: Academic Overview & Performance Trend */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
            {/* Academic Overview Card Skeleton */}
            <SkeletonCard padding="p-5" className="flex flex-col justify-between min-h-[290px]">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8F1ED] dark:border-[#10372F] mb-4">
                <Skeleton className="h-4 w-36 rounded-md" />
                <SkeletonBadge width="w-14" height="h-4" />
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-5 my-auto">
                {/* Circular CGPA Gauge Placeholder */}
                <div className="relative flex items-center justify-center">
                  <SkeletonCircle size="w-28 h-28" />
                </div>
                {/* 2x2 Metric Blocks */}
                <div className="grid grid-cols-2 gap-2.5 flex-1 w-full">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-xl border border-[#E8F1ED] dark:border-[#10372F] space-y-1"
                    >
                      <Skeleton className="h-2.5 w-16 rounded-md" />
                      <Skeleton className="h-4 w-12 rounded-md" />
                    </div>
                  ))}
                </div>
              </div>
            </SkeletonCard>

            {/* Performance Trend Card Skeleton */}
            <SkeletonCard padding="p-5" className="flex flex-col justify-between min-h-[290px]">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8F1ED] dark:border-[#10372F] mb-3">
                <div className="space-y-1">
                  <Skeleton className="h-4 w-36 rounded-md" />
                  <Skeleton className="h-2.5 w-44 rounded-md" />
                </div>
                <SkeletonBadge width="w-16" height="h-4" />
              </div>
              {/* Chart Placeholder with SVG guide lines */}
              <div className="space-y-3 py-2 my-auto">
                <div className="h-28 w-full border-b border-[#E8F1ED] dark:border-[#10372F] flex items-end justify-between px-2 gap-3">
                  {Array.from({ length: 7 }).map((_, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-1.5 flex-1">
                      <Skeleton
                        className="w-full rounded-t-sm"
                        style={{ height: `${35 + (idx % 4) * 16}px` }}
                      />
                      <Skeleton className="h-2 w-4 rounded-xs" />
                    </div>
                  ))}
                </div>
              </div>
            </SkeletonCard>
          </div>

          {/* 4. Row 2: Current Semester Subjects & Semester Grades */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
            {/* Current Semester Subjects Skeleton */}
            <SkeletonCard padding="p-5" className="min-h-[360px]">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8F1ED] dark:border-[#10372F] mb-3">
                <Skeleton className="h-4 w-44 rounded-md" />
                <SkeletonBadge width="w-16" height="h-4" />
              </div>
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl border border-[#E8F1ED] dark:border-[#10372F] space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <Skeleton className="h-3.5 w-48 rounded-md" />
                        <Skeleton className="h-2.5 w-28 rounded-md" />
                      </div>
                      <SkeletonBadge width="w-10" height="h-5" />
                    </div>
                    <Skeleton className="h-1.5 w-full rounded-full" />
                  </div>
                ))}
              </div>
            </SkeletonCard>

            {/* Semester Grades Table Skeleton */}
            <SkeletonCard padding="p-5" className="min-h-[360px]">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8F1ED] dark:border-[#10372F] mb-3">
                <Skeleton className="h-4 w-40 rounded-md" />
                <SkeletonButton width="w-24" height="h-7" rounded="rounded-lg" />
              </div>
              {/* Table header */}
              <div className="grid grid-cols-5 gap-2 py-2 border-b border-[#E8F1ED] dark:border-[#10372F]">
                <Skeleton className="h-3 w-14 col-span-2 rounded-md" />
                <Skeleton className="h-3 w-10 text-center rounded-md" />
                <Skeleton className="h-3 w-10 text-center rounded-md" />
                <Skeleton className="h-3 w-8 text-right rounded-md" />
              </div>
              {/* Table rows */}
              <div className="space-y-2.5 pt-2">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <div key={idx} className="grid grid-cols-5 gap-2 py-1.5 items-center">
                    <div className="col-span-2 space-y-1">
                      <Skeleton className="h-3 w-32 rounded-md" />
                      <Skeleton className="h-2 w-16 rounded-md" />
                    </div>
                    <Skeleton className="h-3 w-8 mx-auto rounded-md" />
                    <Skeleton className="h-3 w-8 mx-auto rounded-md" />
                    <SkeletonBadge width="w-8" height="h-5" className="ml-auto" />
                  </div>
                ))}
              </div>
            </SkeletonCard>
          </div>

          {/* 5. Row 3: Results & Grade Card, Upcoming Exams, Semester Calendar */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-5 items-start">
            {/* Results & Grade Card Skeleton */}
            <div className="xl:col-span-4">
              <SkeletonCard padding="p-4 sm:p-5" className="min-h-[260px]">
                <Skeleton className="h-4 w-32 mb-3 rounded-md" />
                <div className="space-y-2">
                  {Array.from({ length: 3 }).map((_, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl border border-[#E8F1ED] dark:border-[#10372F] flex justify-between items-center"
                    >
                      <div className="space-y-1">
                        <Skeleton className="h-3 w-28 rounded-md" />
                        <Skeleton className="h-2 w-16 rounded-md" />
                      </div>
                      <SkeletonCircle size="w-6 h-6" />
                    </div>
                  ))}
                </div>
              </SkeletonCard>
            </div>

            {/* Upcoming Exams Skeleton */}
            <div className="xl:col-span-4">
              <SkeletonCard padding="p-4 sm:p-5" className="min-h-[260px]">
                <Skeleton className="h-4 w-32 mb-3 rounded-md" />
                <div className="space-y-2">
                  {Array.from({ length: 3 }).map((_, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl border border-[#E8F1ED] dark:border-[#10372F] flex gap-2.5 items-center"
                    >
                      <Skeleton className="w-9 h-9 rounded-lg shrink-0" />
                      <div className="space-y-1 flex-1">
                        <Skeleton className="h-3 w-28 rounded-md" />
                        <Skeleton className="h-2 w-20 rounded-md" />
                      </div>
                    </div>
                  ))}
                </div>
              </SkeletonCard>
            </div>

            {/* Semester Calendar Skeleton */}
            <div className="xl:col-span-4 md:col-span-2">
              <SkeletonCard padding="p-4 sm:p-5" className="min-h-[260px]">
                <div className="flex justify-between items-center mb-3">
                  <Skeleton className="h-4 w-28 rounded-md" />
                  <SkeletonBadge width="w-16" height="h-4" />
                </div>
                <div className="grid grid-cols-7 gap-1 text-center py-1">
                  {Array.from({ length: 28 }).map((_, idx) => (
                    <Skeleton key={idx} className="h-6 w-full rounded-md" />
                  ))}
                </div>
              </SkeletonCard>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT 1/3 COLUMN: Starts at TOP beside Academics Header                   */}
        {/* ========================================================================= */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-4">
          {/* Quick Actions Card Skeleton */}
          <SkeletonCard padding="p-4 sm:p-5">
            <Skeleton className="h-4 w-28 mb-3 rounded-md" />
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl border border-[#E8F1ED] dark:border-[#10372F] flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <SkeletonCircle size="w-6 h-6" />
                    <Skeleton className="h-3 w-32 rounded-md" />
                  </div>
                  <SkeletonCircle size="w-4 h-4" />
                </div>
              ))}
            </div>
          </SkeletonCard>

          {/* Academic Notices Skeleton */}
          <SkeletonCard padding="p-4 sm:p-5">
            <Skeleton className="h-4 w-32 mb-3 rounded-md" />
            <div className="space-y-2.5">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl border border-[#E8F1ED] dark:border-[#10372F] space-y-1.5"
                >
                  <Skeleton className="h-3 w-36 rounded-md" />
                  <div className="flex justify-between">
                    <Skeleton className="h-2 w-16 rounded-md" />
                    <SkeletonBadge width="w-10" height="h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </SkeletonCard>

          {/* Study Reminder Skeleton */}
          <SkeletonCard padding="p-4 sm:p-5">
            <div className="flex items-center gap-3 mb-2">
              <SkeletonCircle size="w-8 h-8" />
              <div className="space-y-1">
                <Skeleton className="h-3.5 w-28 rounded-md" />
                <Skeleton className="h-2 w-20 rounded-md" />
              </div>
            </div>
            <SkeletonText lines={2} widths={["100%", "80%"]} height="h-2.5" />
          </SkeletonCard>

          {/* Campus AI Skeleton */}
          <SkeletonCard padding="p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <SkeletonCircle size="w-5 h-5" />
                <Skeleton className="h-4 w-24 rounded-md" />
              </div>
              <SkeletonBadge width="w-12" height="h-4" />
            </div>
            <Skeleton className="h-10 w-full rounded-xl mb-2" />
            <SkeletonButton width="w-full" height="h-8" rounded="rounded-xl" />
          </SkeletonCard>
        </div>
      </div>
    </div>
  );
}
