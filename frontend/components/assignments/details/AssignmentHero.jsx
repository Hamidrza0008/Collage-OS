"use client";

import { useState, useRef, useEffect } from "react";
import {
  Bookmark,
  Share2,
  MoreVertical,
  Flag,
  Calendar,
  Award,
  Clock,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  RotateCcw,
} from "lucide-react";

export default function AssignmentHero({
  assignment,
  isSaved,
  onToggleSave,
  onShare,
  onOpenReportModal,
  onSubmitClick,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getUrgencyBadge = () => {
    if (assignment.status === "submitted" || assignment.status === "graded") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-900/40">
          <CheckCircle className="w-3.5 h-3.5" />
          <span>{assignment.status === "graded" ? "Graded" : "Submitted before deadline"}</span>
        </span>
      );
    }
    if (assignment.status === "overdue" || assignment.urgency === "overdue") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200/60 dark:border-rose-900/40">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>{assignment.dueStatus || "Overdue"}</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50/80 dark:bg-emerald-950/40 text-[#0E6047] dark:text-[#20D39B] border border-emerald-200/60 dark:border-emerald-800/40">
        <Clock className="w-3.5 h-3.5" />
        <span>{assignment.dueStatus || "Due in 2 days"}</span>
      </span>
    );
  };

  const getPriorityBadge = () => {
    if (assignment.priorityType === "high" || assignment.priority?.includes("High")) {
      return (
        <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200/60 dark:border-amber-900/30">
          {assignment.priority || "High Priority"}
        </span>
      );
    }
    if (assignment.priorityType === "lab" || assignment.priority?.includes("Lab")) {
      return (
        <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-900/30">
          {assignment.priority || "Lab Assignment"}
        </span>
      );
    }
    return (
      <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-900/30">
        {assignment.priority || "Medium Priority"}
      </span>
    );
  };

  const getPrimaryCta = () => {
    if (assignment.status === "graded") {
      return {
        label: "View Submission & Marks",
        icon: Award,
        onClick: onSubmitClick,
      };
    }
    if (assignment.status === "submitted") {
      if (assignment.resubmissionAllowed) {
        return {
          label: "Re-submit Assignment",
          icon: RotateCcw,
          onClick: onSubmitClick,
        };
      }
      return {
        label: "View Submission",
        icon: CheckCircle,
        onClick: onSubmitClick,
      };
    }
    return {
      label: "Submit Assignment",
      icon: ArrowRight,
      onClick: onSubmitClick,
    };
  };

  const cta = getPrimaryCta();
  const CtaIcon = cta.icon;

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-5 sm:p-6 lg:p-7 relative transition-all">
      {/* Top Meta Line: Subject, Course Code & Actions */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-bold text-emerald-700 dark:text-[#20D39B] uppercase tracking-wider">
            {assignment.subject}
          </span>
          <span className="text-[#88A49A] dark:text-[#52776D]">•</span>
          <span className="px-2 py-0.5 rounded bg-emerald-50/70 dark:bg-[#06241F] text-[#4D7063] dark:text-[#9EC1B5] font-semibold text-[11px] border border-emerald-100 dark:border-[#10372F]">
            {assignment.courseCode || "CSE-101"}
          </span>
        </div>

        {/* Top-Right Quick Actions: Save, Share, More Menu */}
        <div className="flex items-center gap-1.5">
          {/* Save Button */}
          <button
            type="button"
            onClick={onToggleSave}
            title={isSaved ? "Remove from saved" : "Save assignment"}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer border ${
              isSaved
                ? "bg-emerald-50 dark:bg-[#0B352B] text-emerald-700 dark:text-[#20D39B] border-emerald-200 dark:border-emerald-800"
                : "bg-white dark:bg-[#041D18] text-[#55786B] dark:text-[#8FAFA4] border-[#D8E8E2] dark:border-[#10372F] hover:bg-emerald-50/50 dark:hover:bg-[#082A24]"
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? "fill-current" : ""}`} />
            <span className="hidden sm:inline">{isSaved ? "Saved" : "Save"}</span>
          </button>

          {/* Share Button */}
          <button
            type="button"
            onClick={onShare}
            title="Share assignment link"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-[#041D18] text-[#55786B] dark:text-[#8FAFA4] border border-[#D8E8E2] dark:border-[#10372F] hover:bg-emerald-50/50 dark:hover:bg-[#082A24] transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Share</span>
          </button>

          {/* More 3-Dot Dropdown */}
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setMenuOpen((p) => !p)}
              className="p-1.5 rounded-xl bg-white dark:bg-[#041D18] text-[#55786B] dark:text-[#8FAFA4] border border-[#D8E8E2] dark:border-[#10372F] hover:bg-emerald-50/50 dark:hover:bg-[#082A24] transition-colors cursor-pointer"
              aria-label="More actions"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white dark:bg-[#041D18] border border-[#D8E8E2] dark:border-[#10372F] shadow-xl py-1.5 z-40 animate-in fade-in zoom-in-95 duration-100">
                <button
                  type="button"
                  onClick={() => {
                    onToggleSave();
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-3.5 py-2 text-xs flex items-center gap-2.5 text-[#0B3024] dark:text-[#C5DCD4] hover:bg-emerald-50/60 dark:hover:bg-[#082A24]"
                >
                  <Bookmark className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{isSaved ? "Unsave Assignment" : "Save Assignment"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onShare();
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-3.5 py-2 text-xs flex items-center gap-2.5 text-[#0B3024] dark:text-[#C5DCD4] hover:bg-emerald-50/60 dark:hover:bg-[#082A24]"
                >
                  <Share2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>Copy Link</span>
                </button>
                <div className="my-1 border-t border-gray-100 dark:border-[#10372F]" />
                <button
                  type="button"
                  onClick={() => {
                    onOpenReportModal();
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-3.5 py-2 text-xs flex items-center gap-2.5 text-rose-600 dark:text-rose-400 hover:bg-rose-50/60 dark:hover:bg-[#200A0A]"
                >
                  <Flag className="w-3.5 h-3.5" />
                  <span>Report Problem</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Title */}
      <h1 className="text-xl sm:text-2xl lg:text-[26px] font-extrabold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight leading-tight mt-3">
        {assignment.title}
      </h1>

      {/* Metadata Badges Bar */}
      <div className="flex items-center gap-2 sm:gap-3 flex-wrap mt-3.5 pt-3.5 border-t border-[#E8F1ED] dark:border-[#10372F]">
        {/* Status */}
        <span
          className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
            assignment.status === "submitted"
              ? "bg-emerald-100/80 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300"
              : assignment.status === "graded"
              ? "bg-purple-100/80 dark:bg-purple-950/70 text-purple-800 dark:text-purple-300"
              : assignment.status === "overdue"
              ? "bg-rose-100/80 dark:bg-rose-950/70 text-rose-800 dark:text-rose-300"
              : "bg-amber-100/80 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300"
          }`}
        >
          {assignment.status || "Pending"}
        </span>

        {/* Priority */}
        {getPriorityBadge()}

        {/* Marks */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-[#F5FAF8] dark:bg-[#041D18] text-[#0B3024] dark:text-[#C5DCD4] border border-[#D8E8E2] dark:border-[#10372F]">
          <Award className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>{assignment.marks} Marks</span>
        </div>

        {/* Deadline */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium text-[#4D7063] dark:text-[#8AA89F] bg-[#F5FAF8] dark:bg-[#041D18] border border-[#D8E8E2] dark:border-[#10372F]">
          <Calendar className="w-3.5 h-3.5 text-gray-400" />
          <span>Deadline: {assignment.dueDate}</span>
        </div>

        {/* Urgency indicator */}
        {getUrgencyBadge()}
      </div>

      {/* Hero Bottom CTA Row */}
      <div className="mt-5 pt-4 border-t border-[#E8F1ED] dark:border-[#10372F] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <p className="text-xs text-[#5C786E] dark:text-[#8AA89F] max-w-xl">
          Complete the requirements below, attach your files, and submit your solution before the
          deadline.
        </p>

        <button
          type="button"
          onClick={cta.onClick}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white dark:bg-[#159B72] dark:hover:bg-[#108360] dark:text-[#021512] text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer shrink-0"
        >
          <span>{cta.label}</span>
          <CtaIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
