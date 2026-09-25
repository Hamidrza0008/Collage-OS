"use client";

import { Building2, Mail, Phone, MessageSquare, ExternalLink } from "lucide-react";

export default function EventOrganizer({ organizer, onContactOrganizer, onViewOrganizerInfo }) {
  if (!organizer) return null;

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-4 sm:p-5 transition-all space-y-3.5">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[#E8F1ED] dark:border-[#10372F]">
        <h3 className="text-xs sm:text-[13px] font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
          Event Organizer
        </h3>
        <span className="text-[10px] font-bold text-emerald-700 dark:text-[#20D39B] bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-md">
          Official Host
        </span>
      </div>

      {/* Organizer Name & Subtitle */}
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-[#06241F] text-emerald-800 dark:text-[#20D39B] flex items-center justify-center font-bold text-sm shrink-0 border border-emerald-200 dark:border-[#10372F]">
          <Building2 className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <h4 className="text-xs sm:text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6] truncate">
            {organizer.name}
          </h4>
          <p className="text-[11px] text-[#55786B] dark:text-[#8AA89F] truncate">
            {organizer.subtitle}
          </p>
        </div>
      </div>

      {/* Coordinators */}
      <div className="space-y-1.5 p-3 rounded-xl bg-[#F8FAF9] dark:bg-[#041D18] border border-[#E8F1ED] dark:border-[#10372F] text-xs">
        {organizer.studentCoordinator && (
          <div className="flex items-center justify-between">
            <span className="text-[#658278] dark:text-[#789991]">Student Lead:</span>
            <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
              {organizer.studentCoordinator}
            </span>
          </div>
        )}
        {organizer.facultyCoordinator && (
          <div className="flex items-center justify-between">
            <span className="text-[#658278] dark:text-[#789991]">Faculty Incharge:</span>
            <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
              {organizer.facultyCoordinator}
            </span>
          </div>
        )}
      </div>

      {/* Contact Details */}
      <div className="space-y-1 text-xs text-[#55786B] dark:text-[#8AA89F]">
        {organizer.email && (
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-emerald-600 dark:text-[#20D39B] shrink-0" />
            <span className="truncate">{organizer.email}</span>
          </div>
        )}
        {organizer.phone && (
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-[#20D39B] shrink-0" />
            <span>{organizer.phone}</span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
        <button
          type="button"
          onClick={onContactOrganizer}
          className="inline-flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-white dark:bg-[#041D18] hover:bg-emerald-50 dark:hover:bg-[#082A24] border border-[#D8E8E2] dark:border-[#10372F] font-bold text-[#0B3024] dark:text-[#C5DCD4] transition-colors cursor-pointer"
        >
          <MessageSquare className="w-3.5 h-3.5 text-emerald-600 dark:text-[#20D39B]" />
          <span>Contact</span>
        </button>

        <button
          type="button"
          onClick={onViewOrganizerInfo}
          className="inline-flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-white dark:bg-[#041D18] hover:bg-emerald-50 dark:hover:bg-[#082A24] border border-[#D8E8E2] dark:border-[#10372F] font-bold text-[#0B3024] dark:text-[#C5DCD4] transition-colors cursor-pointer"
        >
          <ExternalLink className="w-3.5 h-3.5 text-emerald-600 dark:text-[#20D39B]" />
          <span>Club Info</span>
        </button>
      </div>
    </div>
  );
}
