export default function SavedItemsSkeleton() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 animate-pulse">
      {/* 1. Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#E8F1ED] dark:border-[#10372F]/60">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-gray-800" />
          <div className="space-y-1.5">
            <div className="w-36 h-6 rounded-lg bg-gray-200 dark:bg-gray-800" />
            <div className="w-64 h-3.5 rounded bg-gray-100 dark:bg-gray-850" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-32 h-8 rounded-xl bg-gray-200 dark:bg-gray-800" />
          <div className="w-24 h-8 rounded-xl bg-gray-200 dark:bg-gray-800" />
        </div>
      </div>

      {/* 2. Summary Metric Cards Skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 my-5">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="p-4 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] space-y-2"
          >
            <div className="flex justify-between items-center">
              <div className="w-20 h-3.5 rounded bg-gray-200 dark:bg-gray-800" />
              <div className="w-7 h-7 rounded-lg bg-gray-200 dark:bg-gray-800" />
            </div>
            <div className="w-12 h-6 rounded bg-gray-300 dark:bg-gray-700" />
          </div>
        ))}
      </div>

      {/* 3. Category Tabs Skeleton */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-5 border-b border-[#E8F1ED] dark:border-[#10372F]/60">
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div key={i} className="w-24 h-8 rounded-xl bg-gray-200 dark:bg-gray-800 shrink-0" />
        ))}
      </div>

      {/* 4. Desktop Main (2/3) + Sidebar (1/3) Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Main Content (≈ 2/3) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Search/Filter Bar */}
          <div className="flex gap-3">
            <div className="flex-1 h-9 rounded-xl bg-gray-200 dark:bg-gray-800" />
            <div className="w-32 h-9 rounded-xl bg-gray-200 dark:bg-gray-800" />
          </div>

          {/* Items Grid (6 items) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-white dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="w-20 h-4 rounded-md bg-gray-200 dark:bg-gray-800" />
                  <div className="w-6 h-6 rounded-md bg-gray-200 dark:bg-gray-800" />
                </div>
                <div className="flex gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gray-200 dark:bg-gray-800 shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="w-3/4 h-4 rounded bg-gray-300 dark:bg-gray-700" />
                    <div className="w-1/2 h-3 rounded bg-gray-200 dark:bg-gray-800" />
                  </div>
                </div>
                <div className="w-full h-8 rounded bg-gray-100 dark:bg-gray-850" />
                <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex justify-between">
                  <div className="w-20 h-3 rounded bg-gray-200 dark:bg-gray-800" />
                  <div className="w-12 h-3 rounded bg-gray-200 dark:bg-gray-800" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar Rail (≈ 1/3) */}
        <div className="lg:col-span-4 space-y-5">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] space-y-4">
            <div className="w-32 h-4 rounded bg-gray-200 dark:bg-gray-800" />
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-10 rounded-xl bg-gray-100 dark:bg-gray-850" />
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] space-y-3">
            <div className="w-28 h-4 rounded bg-gray-200 dark:bg-gray-800" />
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 rounded-xl bg-gray-100 dark:bg-gray-850" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
