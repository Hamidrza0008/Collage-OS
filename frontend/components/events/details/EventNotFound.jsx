"use client";

import Link from "next/link";
import { CalendarX, ArrowLeft } from "lucide-react";

export default function EventNotFound({ eventId }) {
  return (
    <div className="w-full max-w-xl mx-auto py-20 px-4 text-center space-y-5">
      <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-[#20D39B] flex items-center justify-center mx-auto border border-emerald-100 dark:border-[#10372F] shadow-sm">
        <CalendarX className="w-8 h-8" />
      </div>

      <div className="space-y-1.5">
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
          Event Not Found
        </h2>
        <p className="text-xs sm:text-sm text-[#5C786E] dark:text-[#8AA89F] max-w-md mx-auto leading-relaxed">
          {eventId
            ? `The event "${eventId}" could not be found in the campus schedule. It may have concluded or been removed.`
            : "This event may have been removed, expired, or the link may be invalid."}
        </p>
      </div>

      <div className="pt-2">
        <Link
          href="/student/events"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white dark:bg-[#159B72] dark:hover:bg-[#108360] dark:text-[#021512] text-xs font-bold shadow-md transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Events</span>
        </Link>
      </div>
    </div>
  );
}
