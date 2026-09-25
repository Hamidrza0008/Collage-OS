"use client";

import { useState } from "react";
import Image from "next/image";
import { Users, ChevronDown, ChevronUp, UserCheck } from "lucide-react";

export default function EventAttendees({ attendees }) {
  const [expanded, setExpanded] = useState(false);

  if (!attendees) return null;

  const sampleList = attendees.sampleList || [];
  const displayList = expanded ? sampleList : sampleList.slice(0, 4);

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-5 sm:p-6 transition-all space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E8F1ED] dark:border-[#10372F] flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-[#20D39B] flex items-center justify-center shrink-0">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
              Who's Going ({attendees.count || 248} Registered)
            </h2>
            <p className="text-[11px] text-[#5C786E] dark:text-[#8AA89F]">
              Fellow students, developers, and club peers registered for this event
            </p>
          </div>
        </div>

        {/* Avatar Stack */}
        <div className="flex items-center -space-x-2">
          {(attendees.avatars || []).map((av, idx) => (
            <div
              key={idx}
              className="relative w-7 h-7 rounded-full ring-2 ring-white dark:ring-[#021512] overflow-hidden bg-emerald-100 shrink-0"
            >
              <Image src={av} alt="Attendee" fill className="object-cover" />
            </div>
          ))}
          <span className="w-7 h-7 rounded-full ring-2 ring-white dark:ring-[#021512] bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
            +{Math.max(0, (attendees.count || 248) - 3)}
          </span>
        </div>
      </div>

      {/* Attendees Chips/List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {displayList.map((st, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#F8FAF9] dark:bg-[#041D18] border border-[#E8F1ED] dark:border-[#10372F]"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-[#06241F] text-emerald-700 dark:text-[#20D39B] flex items-center justify-center font-bold text-xs shrink-0">
              {st.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] block truncate">
                {st.name}
              </span>
              <span className="text-[10.5px] text-[#658278] dark:text-[#789991] block truncate">
                {st.branch} • {st.role}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Expand / View All button */}
      {sampleList.length > 4 && (
        <div className="pt-1">
          <button
            type="button"
            onClick={() => setExpanded((p) => !p)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-[#20D39B] hover:underline cursor-pointer"
          >
            <span>{expanded ? "Show Less Attendees" : "View All Attendees"}</span>
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      )}
    </div>
  );
}
