"use client";

import Link from "next/link";
import { ClipboardList, ArrowRight, PhoneCall } from "lucide-react";

export default function UpcomingAssignmentsCard({ data }) {
  return (
    <div className="bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] rounded-2xl p-4 shadow-2xs">
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E8F1ED] dark:border-[#10372F]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#DDF3EB] dark:bg-[#123F35] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center shrink-0">
            <ClipboardList className="w-3.5 h-3.5" />
          </div>
          <h2 className="text-[13px] sm:text-[13.5px] font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            Upcoming Assignments
          </h2>
        </div>

        <Link
          href="/student/assignments"
          className="inline-flex items-center gap-1 text-[11px] font-medium text-[#159B72] dark:text-[#20D39B] hover:underline"
        >
          <span>View All</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="flex items-center justify-between pt-1">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-extrabold text-[#0B3024] dark:text-[#F1FAF6] leading-none">
            {data?.count || 3}
          </span>
          <span className="text-xs text-[#658278] dark:text-[#789991] font-medium">
            {data?.period || "Due this week"}
          </span>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F1F8F5] dark:bg-[#0A2A24] border border-[#D8E8E2] dark:border-[#16463D] text-[11px] font-medium text-[#36594C] dark:text-[#B5CCC5]">
          <PhoneCall className="w-3 h-3 text-[#159B72] dark:text-[#20D39B]" />
          <span>{data?.partnerInfo || "Top Partners"}</span>
        </div>
      </div>
    </div>
  );
}
