"use client";

import { PieChart, Award } from "lucide-react";

export default function GradingRubric({ rubric, feedback }) {
  if (!rubric || rubric.length === 0) return null;

  const isGraded = Boolean(feedback?.rubricBreakdown || rubric.some((r) => r.earned !== null));

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-4 sm:p-5 transition-all space-y-3.5">
      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-[#E8F1ED] dark:border-[#10372F]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-[#20D39B] flex items-center justify-center shrink-0">
            <PieChart className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-xs sm:text-[13px] font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
            Grading Rubric
          </h3>
        </div>

        <span className="text-[11px] font-bold text-[#658278] dark:text-[#789991]">
          Total: 100%
        </span>
      </div>

      {/* Rubric Criteria Rows */}
      <div className="space-y-2.5">
        {rubric.map((item, idx) => {
          // If graded, find earned score
          const feedbackMatch = feedback?.rubricBreakdown?.find(
            (b) => b.name.toLowerCase() === item.name.toLowerCase()
          );
          const earned = feedbackMatch ? feedbackMatch.earned : item.earned;
          const totalPoints = feedbackMatch ? feedbackMatch.total : item.weight;

          return (
            <div key={idx} className="space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6] truncate max-w-[140px]">
                  {item.name}
                </span>

                {isGraded && earned !== null && earned !== undefined ? (
                  <span className="font-bold text-emerald-700 dark:text-[#20D39B] shrink-0">
                    {earned} / {totalPoints}
                  </span>
                ) : (
                  <span className="text-[11px] font-semibold text-[#658278] dark:text-[#8AA89F] shrink-0">
                    {item.weight}%
                  </span>
                )}
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 rounded-full bg-gray-100 dark:bg-[#06241F] overflow-hidden">
                <div
                  className="h-full rounded-full bg-emerald-500/80 dark:bg-[#20D39B]/80 transition-all duration-300"
                  style={{
                    width: isGraded && earned !== null ? `${(earned / totalPoints) * 100}%` : `${item.weight}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Grade Status */}
      <div className="pt-2 border-t border-[#E8F1ED] dark:border-[#10372F] flex items-center justify-between text-[11px]">
        <span className="text-[#658278] dark:text-[#789991]">Evaluation State</span>
        {isGraded ? (
          <span className="inline-flex items-center gap-1 font-bold text-emerald-700 dark:text-[#20D39B]">
            <Award className="w-3.5 h-3.5" />
            <span>Graded ({feedback?.score || 8.5}/10)</span>
          </span>
        ) : (
          <span className="font-semibold text-[#8AA89F]">Not graded yet</span>
        )}
      </div>
    </div>
  );
}
