"use client";

export default function NoticeReaderSkeleton() {
  return (
    <div className="w-full min-h-screen pb-16 transition-colors animate-pulse">
      {/* Back button skeleton */}
      <div className="mb-4">
        <div className="w-32 h-6 rounded-lg bg-gray-200 dark:bg-[#10372F]" />
      </div>

      {/* Main Grid: 2/3 Main + 1/3 Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left 2/3 Column */}
        <div className="lg:col-span-8 space-y-4">
          {/* Header Skeleton */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <div className="w-28 h-6 rounded-lg bg-gray-200 dark:bg-[#10372F]" />
                <div className="w-20 h-6 rounded-lg bg-gray-200 dark:bg-[#10372F]" />
              </div>
              <div className="w-24 h-6 rounded-lg bg-gray-200 dark:bg-[#10372F]" />
            </div>

            <div className="w-36 h-4 rounded bg-gray-200 dark:bg-[#10372F]" />
            <div className="w-full sm:w-3/4 h-8 rounded-lg bg-gray-200 dark:bg-[#10372F]" />
            <div className="w-1/2 h-4 rounded bg-gray-200 dark:bg-[#10372F]" />

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100 dark:border-[#10372F]">
              <div className="h-10 rounded bg-gray-200 dark:bg-[#10372F]" />
              <div className="h-10 rounded bg-gray-200 dark:bg-[#10372F]" />
              <div className="h-10 rounded bg-gray-200 dark:bg-[#10372F]" />
            </div>
          </div>

          {/* Action Toolbar Skeleton */}
          <div className="p-3.5 rounded-2xl bg-gray-100 dark:bg-[#031A16] border border-gray-200 dark:border-[#10372F] flex justify-between items-center">
            <div className="w-40 h-8 rounded-xl bg-gray-200 dark:bg-[#10372F]" />
            <div className="w-48 h-8 rounded-xl bg-gray-200 dark:bg-[#10372F]" />
          </div>

          {/* Document Reader Canvas Skeleton */}
          <div className="p-8 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] space-y-6">
            <div className="text-center space-y-2 pb-6 border-b border-gray-100 dark:border-[#10372F]">
              <div className="w-48 h-3 mx-auto rounded bg-gray-200 dark:bg-[#10372F]" />
              <div className="w-64 h-6 mx-auto rounded bg-gray-200 dark:bg-[#10372F]" />
              <div className="w-40 h-3 mx-auto rounded bg-gray-200 dark:bg-[#10372F]" />
            </div>

            <div className="space-y-3">
              <div className="w-full h-4 rounded bg-gray-200 dark:bg-[#10372F]" />
              <div className="w-full h-4 rounded bg-gray-200 dark:bg-[#10372F]" />
              <div className="w-5/6 h-4 rounded bg-gray-200 dark:bg-[#10372F]" />
            </div>

            <div className="space-y-3 pt-4">
              <div className="w-40 h-5 rounded bg-gray-200 dark:bg-[#10372F]" />
              <div className="w-full h-4 rounded bg-gray-200 dark:bg-[#10372F]" />
              <div className="w-11/12 h-4 rounded bg-gray-200 dark:bg-[#10372F]" />
              <div className="w-4/5 h-4 rounded bg-gray-200 dark:bg-[#10372F]" />
            </div>

            {/* Table Skeleton */}
            <div className="h-32 rounded-xl bg-gray-100 dark:bg-[#031A16] border border-gray-200 dark:border-[#10372F]" />

            {/* Signature Box */}
            <div className="pt-6 border-t border-gray-100 dark:border-[#10372F] flex justify-between items-end">
              <div className="w-44 h-12 rounded bg-gray-200 dark:bg-[#10372F]" />
              <div className="w-36 h-14 rounded bg-gray-200 dark:bg-[#10372F]" />
            </div>
          </div>

          {/* Attachments Card Skeleton */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] space-y-3">
            <div className="w-48 h-5 rounded bg-gray-200 dark:bg-[#10372F]" />
            <div className="w-full h-14 rounded-xl bg-gray-100 dark:bg-[#031A16]" />
            <div className="w-full h-14 rounded-xl bg-gray-100 dark:bg-[#031A16]" />
          </div>
        </div>

        {/* Right 1/3 Sidebar Skeleton */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] h-40" />
          <div className="p-5 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] h-56" />
          <div className="p-5 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] h-48" />
          <div className="p-5 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] h-60" />
        </div>
      </div>
    </div>
  );
}
