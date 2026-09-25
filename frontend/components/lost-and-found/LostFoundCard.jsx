"use client";

import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  User,
  Eye,
  MessageSquare,
  ArrowRight,
  ArrowUpRight,
  ShieldAlert,
} from "lucide-react";
import { STATUS_STYLES } from "./lostFoundData";

export default function LostFoundCard({
  item,
  onViewDetails,
  onContactOwner,
}) {
  const isLost = item.status.toLowerCase() === "lost";
  const isFound = item.status.toLowerCase() === "found";
  const statusStyle = STATUS_STYLES[item.status] || STATUS_STYLES.Lost;

  return (
    <div
      onClick={() => onViewDetails(item)}
      className="group relative rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] p-3.5 sm:p-4 shadow-2xs hover:shadow-md hover:border-[#159B72]/50 dark:hover:border-[#20D39B]/50 transition-all duration-200 cursor-pointer flex flex-col md:flex-row md:items-center gap-4"
    >
      {/* 1. LEFT: Rounded Item Image */}
      <div className="relative w-full h-44 md:w-32 md:h-32 shrink-0 rounded-xl overflow-hidden border border-[#D8E8E2] dark:border-[#16463D] bg-gray-50 dark:bg-[#082A24]">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, 128px"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* 2. CENTER: Details & Metadata */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          {/* Status Badge */}
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
              {item.status}
              {isFound && <ArrowUpRight className="w-3 h-3 ml-0.5 inline" />}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-sm sm:text-[15px] font-bold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-[#159B72] dark:group-hover:text-[#20D39B] transition-colors leading-snug line-clamp-1">
            {item.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-[#55786B] dark:text-[#9FB7AD] line-clamp-2 mt-1 leading-relaxed">
            {item.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-1.5 mt-2">
            {item.tags?.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md text-[10.5px] font-medium bg-[#F1F8F5] dark:bg-[#082A24] text-[#36594C] dark:text-[#B5CCC5] border border-[#E0EBE6] dark:border-[#16463D]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Views & Comments */}
        <div className="flex items-center gap-3 mt-3 pt-2 text-[11.5px] text-[#658278] dark:text-[#789991]">
          <span className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5 text-[#85A297] dark:text-[#65857B]" />
            <span>{item.views} views</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <MessageSquare className="w-3.5 h-3.5 text-[#85A297] dark:text-[#65857B]" />
            <span>{item.commentsCount} comments</span>
          </span>
        </div>
      </div>

      {/* 3. RIGHT: Location, Date, Reporter & Action Button */}
      <div className="md:w-56 shrink-0 flex flex-col justify-between md:items-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-[#D8E8E2] dark:border-[#16463D]">
        <div className="space-y-1.5 text-xs text-[#55786B] dark:text-[#9FB7AD] md:text-right w-full">
          <div className="flex items-center md:justify-end gap-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 shrink-0 text-[#159B72] dark:text-[#20D39B]" />
            <span className="truncate">{item.location}</span>
          </div>
          <div className="flex items-center md:justify-end gap-1.5 truncate">
            <Calendar className="w-3.5 h-3.5 shrink-0 text-[#85A297] dark:text-[#65857B]" />
            <span className="truncate">{item.date}</span>
          </div>
          <div className="flex items-center md:justify-end gap-1.5 truncate">
            <User className="w-3.5 h-3.5 shrink-0 text-[#85A297] dark:text-[#65857B]" />
            <span className="truncate">
              {isLost ? "Reported by: " : "Found by: "}
              <strong className="font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
                <Link
                  href={`/student/profile/${item.reporterId || (item.reportedBy ? item.reportedBy.toLowerCase().replace(/\s+/g, "-") : "student-1")}`}
                  onClick={(e) => e.stopPropagation()}
                  className="hover:underline hover:text-emerald-600 dark:hover:text-[#20D39B] transition-colors"
                >
                  {item.reportedBy}
                </Link>
              </strong>
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="w-full md:w-auto">
          {isFound ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onContactOwner(item);
              }}
              className="w-full md:w-auto px-4 py-2 rounded-xl text-xs font-semibold border border-[#159B72] dark:border-[#20D39B] text-[#159B72] dark:text-[#20D39B] hover:bg-[#DDF4EB] dark:hover:bg-[#123F35] transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
            >
              <span>Contact Owner</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(item);
              }}
              className="w-full md:w-auto px-4 py-2 rounded-xl text-xs font-semibold bg-[#159B72] hover:bg-[#0E825E] text-white transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
