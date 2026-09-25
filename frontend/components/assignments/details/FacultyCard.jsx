"use client";

import { UserCheck, MapPin, Clock, MessageSquare, Mail } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function FacultyCard({ faculty, onAskFaculty }) {
  const [imgError, setImgError] = useState(false);

  if (!faculty) return null;

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-4 sm:p-5 transition-all space-y-3.5">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[#E8F1ED] dark:border-[#10372F]">
        <h3 className="text-xs sm:text-[13px] font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
          Subject Faculty
        </h3>
        <span className="text-[10.5px] font-semibold text-emerald-700 dark:text-[#20D39B] bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-md">
          Evaluator
        </span>
      </div>

      {/* Profile Details */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl overflow-hidden bg-emerald-100 dark:bg-[#06241F] border border-emerald-200 dark:border-[#10372F] shrink-0 relative flex items-center justify-center">
          {!imgError && faculty.avatar ? (
            <Image
              src={faculty.avatar}
              alt={faculty.name}
              width={48}
              height={48}
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <UserCheck className="w-6 h-6 text-emerald-700 dark:text-[#20D39B]" />
          )}
        </div>

        <div className="min-w-0">
          <h4 className="text-xs sm:text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6] leading-snug truncate">
            {faculty.name}
          </h4>
          <p className="text-[11px] font-medium text-emerald-700 dark:text-[#20D39B] truncate">
            {faculty.role}
          </p>
          <p className="text-[10.5px] text-[#658278] dark:text-[#789991] truncate">
            {faculty.department}
          </p>
        </div>
      </div>

      {/* Office & Timings */}
      <div className="space-y-1.5 p-3 rounded-xl bg-[#F8FAF9] dark:bg-[#041D18] border border-[#E8F1ED] dark:border-[#10372F] text-xs">
        <div className="flex items-center gap-2 text-[#4D7063] dark:text-[#8AA89F]">
          <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-[#20D39B] shrink-0" />
          <span className="truncate">Office: {faculty.office || "Room 204"}</span>
        </div>
        <div className="flex items-center gap-2 text-[#4D7063] dark:text-[#8AA89F]">
          <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-[#20D39B] shrink-0" />
          <span className="truncate">{faculty.officeHours || "Mon & Wed • 2:00 PM – 4:00 PM"}</span>
        </div>
      </div>

      {/* CTA Button */}
      <button
        type="button"
        onClick={onAskFaculty}
        className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white dark:bg-[#041D18] hover:bg-emerald-50/70 dark:hover:bg-[#082A24] border border-[#D8E8E2] dark:border-[#10372F] text-xs font-bold text-[#0B3024] dark:text-[#E2F1EC] transition-all cursor-pointer shadow-2xs group"
      >
        <MessageSquare className="w-3.5 h-3.5 text-emerald-600 dark:text-[#20D39B] group-hover:scale-110 transition-transform" />
        <span>Ask Subject Faculty →</span>
      </button>
    </div>
  );
}
