"use client";

import Link from "next/link";
import Image from "next/image";
import { Sparkles, Calendar, MapPin, ArrowRight } from "lucide-react";

export default function RelatedEvents({ relatedEvents }) {
  if (!relatedEvents || relatedEvents.length === 0) return null;

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-4 sm:p-5 transition-all space-y-3.5">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[#E8F1ED] dark:border-[#10372F]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-[#20D39B] flex items-center justify-center shrink-0">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-xs sm:text-[13px] font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
            You May Also Like
          </h3>
        </div>
      </div>

      {/* Cards List */}
      <div className="space-y-2.5">
        {relatedEvents.map((evt) => (
          <Link
            key={evt.id}
            href={`/student/events/${evt.id}`}
            className="flex items-center gap-3 p-2.5 rounded-xl bg-[#F8FAF9] dark:bg-[#041D18] hover:bg-emerald-50/60 dark:hover:bg-[#082A24] border border-[#E8F1ED] dark:border-[#10372F] hover:border-emerald-300 dark:hover:border-emerald-800 transition-all group"
          >
            {/* Thumbnail */}
            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-[#031A16] shrink-0">
              <Image
                src={evt.image || "/assets/events/hackathon.jpg"}
                alt={evt.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold text-emerald-700 dark:text-[#20D39B] uppercase tracking-wider block truncate">
                {evt.category}
              </span>
              <h4 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-emerald-700 dark:group-hover:text-[#20D39B] transition-colors truncate leading-snug">
                {evt.title}
              </h4>
              <div className="flex items-center gap-2 text-[10.5px] text-[#658278] dark:text-[#789991] mt-0.5">
                <span className="truncate">{evt.date}</span>
                <span>•</span>
                <span className="truncate">{evt.venue}</span>
              </div>
            </div>

            <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
}
