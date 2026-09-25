export default function SubjectDetailsSkeleton() {
  return (
    <div className="w-full animate-pulse space-y-4">
      {/* Hero skeleton */}
      <div className="bg-white dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl p-6 space-y-4">
        <div className="h-3 w-24 bg-gray-200 dark:bg-[#0A2E27] rounded-full" />
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gray-200 dark:bg-[#0A2E27] shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-32 bg-gray-200 dark:bg-[#0A2E27] rounded-full" />
            <div className="h-6 w-2/3 bg-gray-200 dark:bg-[#0A2E27] rounded-full" />
            <div className="h-3 w-48 bg-gray-200 dark:bg-[#0A2E27] rounded-full" />
          </div>
        </div>
        <div className="h-2 w-full bg-gray-200 dark:bg-[#0A2E27] rounded-full" />
      </div>

      {/* 2-column grid skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-8 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl p-5 space-y-3">
              <div className="h-4 w-40 bg-gray-200 dark:bg-[#0A2E27] rounded-full" />
              {[1, 2, 3].map((j) => (
                <div key={j} className="h-12 bg-gray-100 dark:bg-[#041D18] rounded-xl" />
              ))}
            </div>
          ))}
        </div>
        <div className="lg:col-span-4 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl p-5 space-y-3">
              <div className="h-4 w-32 bg-gray-200 dark:bg-[#0A2E27] rounded-full" />
              <div className="h-24 bg-gray-100 dark:bg-[#041D18] rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
