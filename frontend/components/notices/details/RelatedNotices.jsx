"use client";

import Link from "next/link";
import { ArrowRight, FileText, Calendar, Building2, Megaphone } from "lucide-react";

export default function RelatedNotices({ relatedNotices = [] }) {
  if (!relatedNotices || relatedNotices.length === 0) return null;

  return (
    <div className="rounded-2xl bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-xs p-5 transition-all">
      <div className="flex items-center justify-between pb-3 mb-3.5 border-b border-[#E8F1ED] dark:border-[#10372F]">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#DDF4EB] dark:bg-[#082A24] text-[#159B72] dark:text-[#20D39B]">
            <Megaphone className="w-4 h-4" />
          </div>
          <h3 className="text-xs sm:text-[13px] font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            Related Notices & Circulars
          </h3>
        </div>

        <Link
          href="/student/notices"
          className="text-[11px] font-semibold text-[#159B72] dark:text-[#20D39B] hover:underline flex items-center gap-0.5"
        >
          <span>All</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="space-y-2.5">
        {relatedNotices.map((item) => (
          <Link
            key={item.id}
            href={`/student/notices/${item.id}`}
            className="group block p-3 rounded-xl border border-gray-100 dark:border-[#10372F] bg-[#F7FBF9]/60 dark:bg-[#031A16]/50 hover:bg-[#DDF4EB]/40 dark:hover:bg-[#082A24] hover:border-[#159B72]/40 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-[10px] font-bold px-2 py-0.2 rounded-md bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] text-[#159B72] dark:text-[#20D39B]">
                {item.category}
              </span>
              <span className="text-[10.5px] font-mono text-[#658278] dark:text-[#789991]">
                {item.publishedAt?.split(",")[0] || item.date}
              </span>
            </div>

            <h4 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-[#159B72] dark:group-hover:text-[#20D39B] transition-colors line-clamp-2 leading-snug">
              {item.title}
            </h4>

            <div className="flex items-center gap-1.5 text-[11px] text-[#658278] dark:text-[#789991] mt-1.5">
              <Building2 className="w-3 h-3 text-[#159B72] dark:text-[#20D39B] shrink-0" />
              <span className="truncate">{item.department}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
