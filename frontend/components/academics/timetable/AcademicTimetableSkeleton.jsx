"use client";

export default function AcademicTimetableSkeleton() {
  return (
    <div className="w-full min-h-screen pb-12 animate-pulse space-y-5">
      {/* Top Header Skeleton */}
      <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E8F1ED] dark:border-[#10372F]">
          <div className="h-4 w-32 bg-gray-200 dark:bg-[#09332A] rounded-lg" />
          <div className="h-7 w-28 bg-gray-200 dark:bg-[#09332A] rounded-xl" />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="space-y-2">
            <div className="h-6 w-64 bg-gray-200 dark:bg-[#09332A] rounded-lg" />
            <div className="h-3.5 w-80 bg-gray-100 dark:bg-[#06241F] rounded-lg" />
          </div>
          <div className="h-8 w-48 bg-gray-200 dark:bg-[#09332A] rounded-xl" />
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-[#E8F1ED] dark:border-[#10372F]">
          <div className="h-7 w-28 bg-gray-200 dark:bg-[#09332A] rounded-lg" />
          <div className="h-5 w-40 bg-gray-200 dark:bg-[#09332A] rounded-lg" />
        </div>
      </div>

      {/* Main 2-Column Grid Skeleton: 2/3 Main + 1/3 Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Main Column ≈ 2/3 (8 cols) */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-4">
          {/* Filters Skeleton */}
          <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-5 w-40 bg-gray-200 dark:bg-[#09332A] rounded-lg" />
              <div className="h-7 w-32 bg-gray-200 dark:bg-[#09332A] rounded-xl" />
            </div>
            <div className="flex items-center gap-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-6 w-20 bg-gray-100 dark:bg-[#06241F] rounded-xl" />
              ))}
            </div>
          </div>

          {/* Timetable / Calendar Body Skeleton */}
          <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl p-5 shadow-xs space-y-3">
            <div className="grid grid-cols-7 gap-2 pb-3 border-b border-[#E8F1ED] dark:border-[#10372F]">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="h-10 bg-gray-100 dark:bg-[#06241F] rounded-xl" />
              ))}
            </div>
            <div className="space-y-3 pt-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-50 dark:bg-[#041D18] rounded-xl border border-gray-100 dark:border-[#10372F]" />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Column ≈ 1/3 (4 cols) */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-4">
          {/* Next Class Skeleton */}
          <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl p-5 shadow-xs space-y-3">
            <div className="h-5 w-32 bg-gray-200 dark:bg-[#09332A] rounded-lg" />
            <div className="h-28 bg-gray-100 dark:bg-[#06241F] rounded-xl" />
          </div>

          {/* Today's Schedule Skeleton */}
          <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl p-5 shadow-xs space-y-3">
            <div className="h-5 w-36 bg-gray-200 dark:bg-[#09332A] rounded-lg" />
            <div className="space-y-2">
              <div className="h-14 bg-gray-100 dark:bg-[#06241F] rounded-xl" />
              <div className="h-14 bg-gray-100 dark:bg-[#06241F] rounded-xl" />
            </div>
          </div>

          {/* Upcoming Exam Skeleton */}
          <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl p-5 shadow-xs space-y-3">
            <div className="h-5 w-28 bg-gray-200 dark:bg-[#09332A] rounded-lg" />
            <div className="h-24 bg-gray-100 dark:bg-[#06241F] rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
