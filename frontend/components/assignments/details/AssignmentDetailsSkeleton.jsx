"use client";

export default function AssignmentDetailsSkeleton() {
  return (
    <div className="w-full max-w-[1440px] mx-auto pb-16 lg:pb-12 space-y-4 animate-pulse">
      {/* Back button skeleton */}
      <div className="w-32 h-4 rounded bg-gray-200 dark:bg-[#06241F]" />

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Main Column (~2/3) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Hero Skeleton */}
          <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center">
              <div className="w-40 h-4 rounded bg-gray-200 dark:bg-[#06241F]" />
              <div className="w-24 h-7 rounded-xl bg-gray-200 dark:bg-[#06241F]" />
            </div>
            <div className="w-3/4 h-8 rounded bg-gray-200 dark:bg-[#06241F]" />
            <div className="flex gap-2 pt-3 border-t border-gray-100 dark:border-[#10372F]">
              <div className="w-20 h-5 rounded-full bg-gray-200 dark:bg-[#06241F]" />
              <div className="w-24 h-5 rounded-md bg-gray-200 dark:bg-[#06241F]" />
              <div className="w-20 h-5 rounded-md bg-gray-200 dark:bg-[#06241F]" />
            </div>
          </div>

          {/* Overview Skeleton */}
          <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl p-6 space-y-3">
            <div className="w-36 h-5 rounded bg-gray-200 dark:bg-[#06241F]" />
            <div className="w-full h-4 rounded bg-gray-200 dark:bg-[#06241F]" />
            <div className="w-5/6 h-4 rounded bg-gray-200 dark:bg-[#06241F]" />
            <div className="w-full h-16 rounded-xl bg-gray-200 dark:bg-[#06241F] mt-2" />
          </div>

          {/* Problem Statement Skeleton */}
          <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl p-6 space-y-3">
            <div className="w-48 h-5 rounded bg-gray-200 dark:bg-[#06241F]" />
            <div className="w-full h-4 rounded bg-gray-200 dark:bg-[#06241F]" />
            <div className="w-full h-4 rounded bg-gray-200 dark:bg-[#06241F]" />
            <div className="w-full h-24 rounded-xl bg-gray-200 dark:bg-[#06241F]" />
          </div>

          {/* Requirements Checklist Skeleton */}
          <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl p-6 space-y-3">
            <div className="w-40 h-5 rounded bg-gray-200 dark:bg-[#06241F]" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-10 rounded-xl bg-gray-200 dark:bg-[#06241F]" />
              ))}
            </div>
          </div>

          {/* Resources Skeleton */}
          <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl p-6 space-y-2">
            <div className="w-36 h-5 rounded bg-gray-200 dark:bg-[#06241F] mb-3" />
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 rounded-xl bg-gray-200 dark:bg-[#06241F]" />
            ))}
          </div>

          {/* Submission Workspace Skeleton */}
          <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl p-6 space-y-4">
            <div className="w-44 h-6 rounded bg-gray-200 dark:bg-[#06241F]" />
            <div className="w-full h-36 rounded-2xl bg-gray-200 dark:bg-[#06241F]" />
            <div className="grid grid-cols-2 gap-3">
              <div className="h-9 rounded-xl bg-gray-200 dark:bg-[#06241F]" />
              <div className="h-9 rounded-xl bg-gray-200 dark:bg-[#06241F]" />
            </div>
          </div>
        </div>

        {/* Right Sidebar (~1/3) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="w-full h-40 rounded-2xl bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] p-4" />
          <div className="w-full h-48 rounded-2xl bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] p-4" />
          <div className="w-full h-48 rounded-2xl bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] p-4" />
          <div className="w-full h-44 rounded-2xl bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] p-4" />
        </div>
      </div>
    </div>
  );
}
