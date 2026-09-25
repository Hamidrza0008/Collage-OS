"use client";

export default function EditProfileSkeleton() {
  return (
    <div className="w-full max-w-[1440px] mx-auto min-h-screen animate-pulse space-y-6 pb-20">
      {/* Top Header Skeleton */}
      <div className="w-full py-4 px-4 sm:px-6 md:px-8 border-b border-[#D8E8E2]/60 dark:border-[#10372F]/60 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gray-200 dark:bg-[#06241F]" />
          <div className="space-y-1.5">
            <div className="w-48 h-5 rounded-md bg-gray-200 dark:bg-[#06241F]" />
            <div className="w-64 h-3.5 rounded-md bg-gray-200 dark:bg-[#06241F]" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-20 h-8 rounded-xl bg-gray-200 dark:bg-[#06241F]" />
          <div className="w-28 h-8 rounded-xl bg-gray-200 dark:bg-[#06241F]" />
        </div>
      </div>

      {/* Main 2-column layout */}
      <div className="px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left ~2/3 column */}
          <div className="lg:col-span-8 space-y-6">
            {/* Avatar section card */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] space-y-4">
              <div className="w-36 h-5 rounded-md bg-gray-200 dark:bg-[#10372F]" />
              <div className="flex items-center gap-5">
                <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-[#10372F]" />
                <div className="space-y-2 flex-1">
                  <div className="w-32 h-8 rounded-xl bg-gray-200 dark:bg-[#10372F]" />
                  <div className="w-48 h-3 rounded-md bg-gray-200 dark:bg-[#10372F]" />
                </div>
              </div>
            </div>

            {/* Identity section card */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] space-y-4">
              <div className="w-48 h-5 rounded-md bg-gray-200 dark:bg-[#10372F]" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="h-10 rounded-xl bg-gray-200 dark:bg-[#10372F]" />
                <div className="h-10 rounded-xl bg-gray-200 dark:bg-[#10372F]" />
              </div>
              <div className="h-10 rounded-xl bg-gray-200 dark:bg-[#10372F]" />
              <div className="h-10 rounded-xl bg-gray-200 dark:bg-[#10372F]" />
            </div>

            {/* About section card */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] space-y-4">
              <div className="w-40 h-5 rounded-md bg-gray-200 dark:bg-[#10372F]" />
              <div className="h-28 rounded-xl bg-gray-200 dark:bg-[#10372F]" />
              <div className="grid grid-cols-2 gap-4">
                <div className="h-10 rounded-xl bg-gray-200 dark:bg-[#10372F]" />
                <div className="h-10 rounded-xl bg-gray-200 dark:bg-[#10372F]" />
              </div>
            </div>

            {/* Skills section card */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] space-y-4">
              <div className="w-44 h-5 rounded-md bg-gray-200 dark:bg-[#10372F]" />
              <div className="h-20 rounded-xl bg-gray-200 dark:bg-[#10372F]" />
              <div className="grid grid-cols-3 gap-3">
                <div className="h-14 rounded-xl bg-gray-200 dark:bg-[#10372F]" />
                <div className="h-14 rounded-xl bg-gray-200 dark:bg-[#10372F]" />
                <div className="h-14 rounded-xl bg-gray-200 dark:bg-[#10372F]" />
              </div>
            </div>
          </div>

          {/* Right ~1/3 rail */}
          <div className="lg:col-span-4 space-y-4">
            <div className="h-40 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F]" />
            <div className="h-80 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F]" />
            <div className="h-48 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F]" />
          </div>
        </div>
      </div>
    </div>
  );
}
