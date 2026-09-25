"use client";

import { MessageSquare, Award, CheckCircle, Clock } from "lucide-react";

export default function FacultyFeedback({ feedback, isSubmitted, isGraded }) {
  // If not submitted yet
  if (!isSubmitted && !isGraded) {
    return null;
  }

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-5 sm:p-6 transition-all space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E8F1ED] dark:border-[#10372F] flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-[#20D39B] flex items-center justify-center shrink-0">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
              Faculty Evaluation & Remarks
            </h2>
            <p className="text-[11px] text-[#5C786E] dark:text-[#8AA89F]">
              Direct grading notes and criterion score breakdown
            </p>
          </div>
        </div>

        {feedback?.score && (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 dark:bg-[#06241F] border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-[#20D39B] text-xs font-bold">
            <Award className="w-4 h-4" />
            <span>
              {feedback.score} / {feedback.maxScore || 10} Marks
            </span>
          </div>
        )}
      </div>

      {/* Graded State */}
      {feedback ? (
        <div className="space-y-4">
          {/* Written Remark */}
          <div className="p-4 rounded-xl bg-[#F8FAF9] dark:bg-[#041D18] border border-[#E8F1ED] dark:border-[#10372F] space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                Evaluator: {feedback.facultyName || "Subject Faculty"}
              </span>
              <span className="text-[#658278] dark:text-[#789991]">{feedback.gradedAt}</span>
            </div>
            <p className="text-xs sm:text-sm text-[#35574C] dark:text-[#C5DCD4] leading-relaxed italic">
              "{feedback.comment}"
            </p>
          </div>

          {/* Rubric Breakdown Grid */}
          {feedback.rubricBreakdown && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] uppercase tracking-wider">
                Criterion Breakdown
              </h3>
              <div className="space-y-2">
                {feedback.rubricBreakdown.map((item, idx) => {
                  const percentage = Math.round((item.earned / item.total) * 100);
                  return (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white dark:bg-[#031A16] border border-[#D8E8E2] dark:border-[#10372F] space-y-1.5"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
                          {item.name}
                        </span>
                        <span className="font-bold text-emerald-700 dark:text-[#20D39B]">
                          {item.earned} / {item.total} pts ({percentage}%)
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-gray-100 dark:bg-[#06241F] overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Under Review State */
        <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-[#1A1405]/50 border border-amber-200/60 dark:border-amber-900/40 flex items-center gap-3">
          <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
          <div>
            <p className="text-xs font-bold text-amber-900 dark:text-amber-200">
              Your submission is currently under review.
            </p>
            <p className="text-[11px] text-amber-800/80 dark:text-amber-400/80 mt-0.5">
              Faculty evaluation typically takes 2–3 academic working days following the assignment
              deadline.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
