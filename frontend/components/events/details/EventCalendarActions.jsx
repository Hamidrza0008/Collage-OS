"use client";

import { CalendarPlus, Download, ExternalLink } from "lucide-react";

export default function EventCalendarActions({ event, onDownloadIcs }) {
  if (!event) return null;

  // Generate Google Calendar Link
  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent(event.title);
    const details = encodeURIComponent(
      `${event.subtitle}\n\nVenue: ${event.venue}\nOrganized by: ${event.organizer?.name || "College Innovation Cell"}`
    );
    const location = encodeURIComponent(event.venue);
    // Approximate date range for August 2025
    const dates = "20250822T043000Z/20250824T123000Z";
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;
  };

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-4 sm:p-5 transition-all space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[#E8F1ED] dark:border-[#10372F]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-[#20D39B] flex items-center justify-center shrink-0">
            <CalendarPlus className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-xs sm:text-[13px] font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
            Add to Calendar
          </h3>
        </div>
      </div>

      <p className="text-xs text-[#55786B] dark:text-[#8AA89F] leading-relaxed">
        Sync this event with your personal schedule to receive reminder alerts.
      </p>

      {/* Buttons */}
      <div className="space-y-2 pt-1 text-xs">
        <a
          href={getGoogleCalendarUrl()}
          target="_blank"
          rel="noreferrer"
          className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#F8FAF9] dark:bg-[#041D18] hover:bg-emerald-50 dark:hover:bg-[#082A24] border border-[#D8E8E2] dark:border-[#10372F] font-semibold text-[#0B3024] dark:text-[#C5DCD4] transition-colors group"
        >
          <div className="flex items-center gap-2 min-w-0">
            <CalendarPlus className="w-4 h-4 text-emerald-600 dark:text-[#20D39B] shrink-0 group-hover:scale-105 transition-transform" />
            <span className="truncate">Google Calendar</span>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-gray-400 shrink-0" />
        </a>

        <button
          type="button"
          onClick={onDownloadIcs}
          className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#F8FAF9] dark:bg-[#041D18] hover:bg-emerald-50 dark:hover:bg-[#082A24] border border-[#D8E8E2] dark:border-[#10372F] font-semibold text-[#0B3024] dark:text-[#C5DCD4] transition-colors cursor-pointer group"
        >
          <div className="flex items-center gap-2 min-w-0">
            <Download className="w-4 h-4 text-emerald-600 dark:text-[#20D39B] shrink-0 group-hover:scale-105 transition-transform" />
            <span className="truncate">Download .ICS (Apple / Outlook)</span>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-gray-400 shrink-0" />
        </button>
      </div>
    </div>
  );
}
