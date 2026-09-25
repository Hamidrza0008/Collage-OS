"use client";

import { Calendar, Clock, AlertTriangle, CheckCircle } from "lucide-react";

export default function DeadlineCard({ assignment, activeSubmission }) {
  const isSubmitted = Boolean(activeSubmission);
  const isOverdue = assignment.status === "overdue" && !isSubmitted;

  const getUrgencyText = () => {
    if (isSubmitted) return "Submitted before deadline";
    if (isOverdue) return "Deadline Passed";
    return assignment.dueStatus || "2 days left";
  };

  // Progress percentage for submission window (e.g. 75% elapsed for 2 days left)
  const getWindowProgress = () => {
    if (isSubmitted) return 100;
    if (isOverdue) return 100;
    if (assignment.urgency === "urgent") return 80;
    if (assignment.urgency === "upcoming") return 45;
    return 20;
  };

  const progress = getWindowProgress();

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-4 sm:p-5 transition-all space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-[#E8F1ED] dark:border-[#10372F]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-[#20D39B] flex items-center justify-center shrink-0">
            <Clock className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-xs sm:text-[13px] font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
            Deadline
          </h3>
        </div>

        <span
          className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
            isSubmitted
              ? "bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
              : isOverdue
              ? "bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300"
              : "bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300"
          }`}
        >
          {getUrgencyText()}
        </span>
      </div>

      {/* Due Date Details */}
      <div className="space-y-1">
        <span className="text-[11px] font-semibold text-[#658278] dark:text-[#789991] block">
          Final Cut-Off Time
        </span>
        <div className="flex items-center gap-2 text-xs sm:text-[13px] font-bold text-[#0B3024] dark:text-[#F1FAF6]">
          <Calendar className="w-4 h-4 text-emerald-600 dark:text-[#20D39B]" />
          <span>{assignment.dueDate}</span>
        </div>
      </div>

      {/* Submission Window Indicator */}
      <div className="space-y-1.5 pt-1">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-[#658278] dark:text-[#789991]">Submission Window</span>
          <span className="font-semibold text-[#0B3024] dark:text-[#E2F1EC]">
            {isSubmitted ? "Completed" : isOverdue ? "Closed" : `${100 - progress}% remaining`}
          </span>
        </div>

        <div className="w-full h-2 rounded-full bg-gray-100 dark:bg-[#06241F] overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isSubmitted
                ? "bg-emerald-500"
                : isOverdue
                ? "bg-rose-500"
                : "bg-emerald-600 dark:bg-[#20D39B]"
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Overdue note */}
      {isOverdue && (
        <div className="p-2.5 rounded-lg bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/50 dark:border-rose-900/40 text-[11px] text-rose-700 dark:text-rose-300 flex items-start gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
          <span>Deadline passed. Late submissions may affect earned grades.</span>
        </div>
      )}
    </div>
  );
}
