"use client";

import { ArrowRight, CheckCircle, RotateCcw, Award, History } from "lucide-react";

export default function MobileSubmissionBar({
  assignment,
  activeSubmission,
  onActionClick,
  onOpenHistoryModal,
}) {
  const isSubmitted = Boolean(activeSubmission);
  const isGraded = assignment.status === "graded";

  const getCtaLabel = () => {
    if (isGraded) return "View Evaluation";
    if (isSubmitted) {
      if (assignment.resubmissionAllowed) return "Re-submit Work";
      return "View Submission";
    }
    return "Submit Assignment";
  };

  const getCtaIcon = () => {
    if (isGraded) return Award;
    if (isSubmitted && assignment.resubmissionAllowed) return RotateCcw;
    if (isSubmitted) return CheckCircle;
    return ArrowRight;
  };

  const Icon = getCtaIcon();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#021512]/95 backdrop-blur-md border-t border-[#D8E8E2] dark:border-[#10372F] px-4 py-3 shadow-lg">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="min-w-0">
          <span className="text-[10px] font-bold text-[#658278] dark:text-[#789991] uppercase tracking-wider block">
            {isGraded ? "Evaluated" : isSubmitted ? "Submitted" : assignment.dueStatus || "Due Soon"}
          </span>
          <span className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] truncate block">
            {assignment.marks} Marks • {assignment.subject}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {onOpenHistoryModal && (isSubmitted || isGraded) && (
            <button
              type="button"
              onClick={onOpenHistoryModal}
              title="View Submission History & Feedback"
              className="p-2.5 rounded-xl border border-[#D8E8E2] dark:border-[#10372F] bg-[#F8FAF9] dark:bg-[#041D18] text-emerald-700 dark:text-[#20D39B] hover:bg-emerald-50 transition-colors cursor-pointer"
              aria-label="Open submission history modal"
            >
              <History className="w-4 h-4" />
            </button>
          )}

          <button
            type="button"
            onClick={onActionClick}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white dark:bg-[#159B72] dark:hover:bg-[#108360] dark:text-[#021512] text-xs font-bold shadow-md cursor-pointer"
          >
            <span>{getCtaLabel()}</span>
            <Icon className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
