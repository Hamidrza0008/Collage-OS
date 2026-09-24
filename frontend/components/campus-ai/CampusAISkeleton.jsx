"use client";

export default function CampusAISkeleton() {
  return (
    <div className="w-full lg:h-[calc(100dvh-68px-3rem)] flex flex-col min-h-0 overflow-hidden animate-pulse">
      {/* 2-Column Grid: Main 2/3 + Right Sidebar 1/3 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-full min-h-0 items-stretch">
        {/* =================================================================== */}
        {/* MAIN 2/3 COLUMN SKELETON                                            */}
        {/* =================================================================== */}
        <div className="lg:col-span-8 flex flex-col h-full min-h-0 space-y-2.5">
          {/* 1. Compact Hero Skeleton (~68px) */}
          <div className="w-full h-16 sm:h-[68px] rounded-2xl bg-gray-200 dark:bg-emerald-950/40 border border-[#D8E8E2] dark:border-[#16463D] shrink-0" />

          {/* 2. Tabs Toolbar Skeleton (~36px) */}
          <div className="w-full h-9 rounded-xl bg-gray-200 dark:bg-emerald-950/40 border border-[#D8E8E2] dark:border-[#16463D] shrink-0" />

          {/* 3. Chat Workspace Skeleton (Takes remaining space) */}
          <div className="flex-1 min-h-0 rounded-2xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#06241F] flex flex-col overflow-hidden">
            {/* Conversation Area Skeleton */}
            <div className="flex-1 p-4 space-y-4 overflow-hidden">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-gray-300 dark:bg-emerald-900/40 shrink-0" />
                <div className="flex-1 p-4 rounded-2xl bg-gray-100 dark:bg-emerald-950/20 border border-[#D8E8E2] dark:border-[#16463D] space-y-2.5">
                  <div className="w-32 h-4 rounded bg-gray-300 dark:bg-emerald-900/40" />
                  <div className="w-3/4 h-3.5 rounded bg-gray-200 dark:bg-emerald-900/30" />
                  <div className="flex gap-1.5 pt-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-16 h-6 rounded-full bg-gray-200 dark:bg-emerald-900/30" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Prompts Skeleton */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-12 rounded-xl bg-gray-100 dark:bg-emerald-950/20 border border-[#D8E8E2] dark:border-[#16463D]" />
                ))}
              </div>
            </div>

            {/* Attached Composer Box Skeleton */}
            <div className="h-20 bg-gray-50 dark:bg-[#041D18] border-t border-[#D8E8E2] dark:border-[#16463D] p-3 shrink-0" />
          </div>
        </div>

        {/* =================================================================== */}
        {/* RIGHT 1/3 SIDEBAR SKELETON                                          */}
        {/* =================================================================== */}
        <div className="hidden lg:block lg:col-span-4 h-full min-h-0 space-y-3.5 overflow-hidden">
          <div className="w-full h-40 rounded-2xl bg-gray-200 dark:bg-emerald-950/40 border border-[#D8E8E2] dark:border-[#16463D]" />
          <div className="w-full h-40 rounded-2xl bg-gray-200 dark:bg-emerald-950/40 border border-[#D8E8E2] dark:border-[#16463D]" />
          <div className="w-full h-36 rounded-2xl bg-gray-200 dark:bg-emerald-950/40 border border-[#D8E8E2] dark:border-[#16463D]" />
        </div>
      </div>
    </div>
  );
}
