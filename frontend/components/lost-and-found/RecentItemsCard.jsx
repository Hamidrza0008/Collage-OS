"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { STATUS_STYLES } from "./lostFoundData";

export default function RecentItemsCard({
  items = [],
  onSelectItem,
  onViewAll,
}) {
  // Take first 4 items as recent items
  const recentList = items.slice(0, 4);

  return (
    <div className="rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] p-4 shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <h3 className="text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
          Recent Items
        </h3>
        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-semibold text-[#159B72] dark:text-[#20D39B] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>View All</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* List */}
      <div className="divide-y divide-[#EBF3F0] dark:divide-[#10372F]">
        {recentList.map((item) => {
          const statusStyle = STATUS_STYLES[item.status] || STATUS_STYLES.Lost;
          const displayDate = item.date.split(",")[0] || item.date;

          return (
            <div
              key={item.id}
              onClick={() => onSelectItem(item)}
              className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-2.5 hover:bg-gray-50/60 dark:hover:bg-[#082A24]/60 -mx-1.5 px-1.5 rounded-xl transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                {/* Thumbnail */}
                <div className="relative w-9 h-9 rounded-lg overflow-hidden shrink-0 border border-[#D8E8E2] dark:border-[#16463D] bg-gray-100 dark:bg-[#082A24]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </div>

                {/* Title & Date */}
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-[#159B72] dark:group-hover:text-[#20D39B] transition-colors truncate leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-[#658278] dark:text-[#789991] mt-0.5 truncate">
                    {item.status} • {displayDate}
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold border shrink-0 ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}
              >
                {item.status}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
