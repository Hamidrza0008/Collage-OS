"use client";

import Link from "next/link";
import {
  X,
  Calendar,
  Clock,
  MapPin,
  User,
  ExternalLink,
  BookOpen,
  GraduationCap,
  FileText,
  Bell,
  Sun,
} from "lucide-react";

export default function CalendarItemPopover({ item, onClose }) {
  if (!item) return null;

  const getActionLink = () => {
    switch (item.type) {
      case "class":
        if (item.subjectSlug) {
          return {
            label: "View Subject Details",
            href: `/student/academics/subjects/${item.subjectSlug}`,
          };
        }
        return null;
      case "exam":
        if (item.subjectSlug) {
          return {
            label: "View Subject & Syllabus",
            href: `/student/academics/subjects/${item.subjectSlug}`,
          };
        }
        return null;
      case "assignment":
        return {
          label: "Open Assignment Workspace",
          href: `/student/assignments/${item.id}`,
        };
      case "event":
        return {
          label: "View Event & Ticket",
          href: `/student/events/${item.id}`,
        };
      case "notice":
        return {
          label: "Read Official Circular",
          href: `/student/notices/${item.id}`,
        };
      default:
        if (item.subjectSlug) {
          return {
            label: "View Course",
            href: `/student/academics/subjects/${item.subjectSlug}`,
          };
        }
        return null;
    }
  };

  const action = getActionLink();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="calendar-item-title"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 pb-3 border-b border-[#E8F1ED] dark:border-[#10372F] flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                {item.subjectCode || "CAMPUS"}
              </span>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                {item.type}
              </span>
              {item.status && (
                <span className="text-[10px] font-semibold text-[#5C786E] dark:text-[#8AA89F]">
                  • {item.status}
                </span>
              )}
            </div>

            <h3
              id="calendar-item-title"
              className="text-base sm:text-lg font-bold text-[#0B3024] dark:text-[#F1FAF6] leading-snug"
            >
              {item.title || item.subjectName}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-[#5C786E] dark:text-[#8AA89F] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-gray-100 dark:hover:bg-[#06241F] transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 space-y-3.5 text-xs text-[#5C786E] dark:text-[#8AA89F]">
          {/* Timing & Date */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-2.5 rounded-xl border border-gray-100 dark:border-[#10372F] bg-gray-50/60 dark:bg-[#041D18]/60 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#159B72] dark:text-[#20D39B] shrink-0" />
              <div className="min-w-0">
                <span className="block text-[10px] uppercase font-bold text-[#5C786E] dark:text-[#8AA89F]">
                  Date
                </span>
                <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6] truncate block">
                  {item.date}
                </span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl border border-gray-100 dark:border-[#10372F] bg-gray-50/60 dark:bg-[#041D18]/60 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#159B72] dark:text-[#20D39B] shrink-0" />
              <div className="min-w-0">
                <span className="block text-[10px] uppercase font-bold text-[#5C786E] dark:text-[#8AA89F]">
                  Time Slot
                </span>
                <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6] truncate block">
                  {item.timeDisplay || `${item.startTime} – ${item.endTime}`}
                </span>
              </div>
            </div>
          </div>

          {/* Location & Faculty */}
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-gray-50/50 dark:bg-[#041D18]/50 border border-gray-100 dark:border-[#10372F]">
              <MapPin className="w-4 h-4 text-[#159B72] dark:text-[#20D39B] shrink-0" />
              <div>
                <span className="text-[10px] text-[#5C786E] dark:text-[#8AA89F] block">
                  Location / Venue
                </span>
                <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
                  {item.venue || item.room || "Academic Campus"}
                </span>
              </div>
            </div>

            {item.faculty && (
              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-gray-50/50 dark:bg-[#041D18]/50 border border-gray-100 dark:border-[#10372F]">
                <User className="w-4 h-4 text-[#159B72] dark:text-[#20D39B] shrink-0" />
                <div>
                  <span className="text-[10px] text-[#5C786E] dark:text-[#8AA89F] block">
                    Instructor
                  </span>
                  <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
                    {item.faculty}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          {item.description && (
            <div className="p-3 rounded-xl bg-emerald-50/30 dark:bg-[#06241F]/40 border border-emerald-100 dark:border-emerald-950">
              <span className="text-[10px] font-bold uppercase text-[#159B72] dark:text-[#20D39B] block mb-1">
                Details & Notes
              </span>
              <p className="text-xs text-[#0B3024] dark:text-[#E2F1EC] leading-relaxed">
                {item.description}
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 pt-3 border-t border-[#E8F1ED] dark:border-[#10372F] bg-gray-50/50 dark:bg-[#041D18] flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] text-xs font-semibold text-[#5C786E] dark:text-[#8AA89F] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] transition-colors cursor-pointer"
          >
            Close
          </button>

          {action && (
            <Link
              href={action.href}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#159B72] hover:bg-[#128360] text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <span>{action.label}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
