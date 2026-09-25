"use client";

import { CheckCircle2, Circle, Clock, Check } from "lucide-react";

const STAGES = [
  { id: "not_submitted", label: "Not Submitted" },
  { id: "submitted", label: "Submitted" },
  { id: "under_review", label: "Under Review" },
  { id: "graded", label: "Graded" },
];

export default function SubmissionStatusCard({ assignment, activeSubmission }) {
  const isSubmitted = Boolean(activeSubmission);
  const isGraded = assignment.status === "graded" || Boolean(assignment.feedback);

  const getCurrentStageIndex = () => {
    if (isGraded) return 3;
    if (isSubmitted) return 2; // Under Review
    if (assignment.status === "submitted") return 2;
    return 0; // Not Submitted
  };

  const currentIndex = getCurrentStageIndex();

  const getStatusBadge = () => {
    if (isGraded) {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
          Graded
        </span>
      );
    }
    if (isSubmitted || assignment.status === "submitted") {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
          Submitted
        </span>
      );
    }
    if (assignment.status === "overdue") {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300">
          Late Submission
        </span>
      );
    }
    return (
      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
        Pending
      </span>
    );
  };

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-4 sm:p-5 transition-all space-y-3.5">
      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-[#E8F1ED] dark:border-[#10372F]">
        <h3 className="text-xs sm:text-[13px] font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
          Submission Status
        </h3>
        {getStatusBadge()}
      </div>

      {/* Attempt Counter */}
      <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-[#F8FAF9] dark:bg-[#041D18] border border-[#E8F1ED] dark:border-[#10372F]">
        <span className="font-semibold text-[#55786B] dark:text-[#8FAFA4]">Current Attempt</span>
        <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6]">
          {activeSubmission?.attempt || assignment.currentAttempt || 1} / {assignment.maxAttempts || 3}
        </span>
      </div>

      {/* Vertical Status Timeline */}
      <div className="space-y-3 pt-1">
        <span className="text-[11px] font-bold text-[#658278] dark:text-[#789991] uppercase tracking-wider block">
          Workflow Pipeline
        </span>

        <div className="relative pl-6 space-y-4 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-200 dark:before:bg-[#10372F]">
          {STAGES.map((stage, idx) => {
            const isCompleted = idx < currentIndex;
            const isCurrent = idx === currentIndex;

            return (
              <div key={stage.id} className="relative flex items-center justify-between text-xs">
                {/* Node icon */}
                <div
                  className={`absolute -left-6 w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                    isCompleted
                      ? "bg-emerald-600 text-white"
                      : isCurrent
                      ? "bg-emerald-500 text-white ring-4 ring-emerald-100 dark:ring-emerald-950 animate-pulse"
                      : "bg-gray-100 dark:bg-[#06241F] text-gray-400"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  )}
                </div>

                {/* Stage Label */}
                <span
                  className={`font-semibold ${
                    isCurrent
                      ? "text-emerald-700 dark:text-[#20D39B]"
                      : isCompleted
                      ? "text-[#0B3024] dark:text-[#F1FAF6]"
                      : "text-gray-400 dark:text-gray-600"
                  }`}
                >
                  {stage.label}
                </span>

                {isCurrent && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-[#20D39B]">
                    Current
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
