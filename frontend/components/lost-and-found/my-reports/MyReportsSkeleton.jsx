"use client";

export default function MyReportsSkeleton() {
  return (
    <div className="w-full space-y-5 animate-pulse motion-reduce:animate-none">
      {/* 1. Header Skeleton */}
      <div className="rounded-2xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#06241F] p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <div className="h-3.5 w-32 bg-gray-200 dark:bg-gray-800 rounded-md" />
            <div className="h-7 w-64 bg-gray-200 dark:bg-gray-800 rounded-md" />
            <div className="h-4 w-96 max-w-full bg-gray-200 dark:bg-gray-800 rounded-md" />
          </div>
          <div className="h-9 w-36 bg-gray-200 dark:bg-gray-800 rounded-xl" />
        </div>
      </div>

      {/* 2. Metric Cards Skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="p-3.5 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] space-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="h-3 w-16 bg-gray-200 dark:bg-gray-800 rounded-md" />
              <div className="w-6 h-6 rounded-lg bg-gray-200 dark:bg-gray-800" />
            </div>
            <div className="h-6 w-10 bg-gray-200 dark:bg-gray-800 rounded-md" />
          </div>
        ))}
      </div>

      {/* 3. Main Workspace Grid: 2/3 + 1/3 layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column (2/3) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Tabs & Search skeleton */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-[#D8E8E2] dark:border-[#16463D] pb-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-8 w-20 bg-gray-200 dark:bg-gray-800 rounded-xl" />
              ))}
            </div>
            <div className="flex items-center gap-3">
              <div className="h-9 flex-1 bg-gray-200 dark:bg-gray-800 rounded-xl" />
              <div className="hidden md:block h-9 w-32 bg-gray-200 dark:bg-gray-800 rounded-xl" />
              <div className="hidden md:block h-9 w-32 bg-gray-200 dark:bg-gray-800 rounded-xl" />
            </div>
          </div>

          {/* Cards skeleton */}
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#06241F] p-4 sm:p-5 flex flex-col sm:flex-row gap-4"
              >
                <div className="w-full sm:w-28 sm:h-28 h-36 rounded-xl bg-gray-200 dark:bg-gray-800 shrink-0" />
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="h-3 w-28 bg-gray-200 dark:bg-gray-800 rounded-md" />
                    <div className="h-5 w-24 bg-gray-200 dark:bg-gray-800 rounded-full" />
                  </div>
                  <div className="h-5 w-60 bg-gray-200 dark:bg-gray-800 rounded-md" />
                  <div className="h-3.5 w-full bg-gray-200 dark:bg-gray-800 rounded-md" />
                  <div className="flex items-center gap-4 pt-1">
                    <div className="h-3 w-32 bg-gray-200 dark:bg-gray-800 rounded-md" />
                    <div className="h-3 w-28 bg-gray-200 dark:bg-gray-800 rounded-md" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar Column (1/3) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] p-4 space-y-3">
            <div className="h-3.5 w-28 bg-gray-200 dark:bg-gray-800 rounded-md" />
            <div className="grid grid-cols-2 gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-14 bg-gray-200 dark:bg-gray-800 rounded-xl" />
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] p-4 space-y-3">
            <div className="h-3.5 w-24 bg-gray-200 dark:bg-gray-800 rounded-md" />
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 dark:bg-gray-800 rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
