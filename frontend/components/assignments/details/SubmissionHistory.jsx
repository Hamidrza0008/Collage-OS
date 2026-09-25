"use client";

import { History, FileArchive, CheckCircle2, Award, Clock } from "lucide-react";

export default function SubmissionHistory({ history }) {
  if (!history || history.length === 0) return null;

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-5 sm:p-6 transition-all space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 pb-3 border-b border-[#E8F1ED] dark:border-[#10372F]">
        <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-[#20D39B] flex items-center justify-center shrink-0">
          <History className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
            Submission History & Versions
          </h2>
          <p className="text-[11px] text-[#5C786E] dark:text-[#8AA89F]">
            Audit trail of uploaded solutions and grading revisions
          </p>
        </div>
      </div>

      {/* History List */}
      <div className="space-y-3">
        {history.map((entry, idx) => (
          <div
            key={idx}
            className="p-3.5 sm:p-4 rounded-xl bg-[#F8FAF9] dark:bg-[#041D18] border border-[#E8F1ED] dark:border-[#10372F] space-y-2.5"
          >
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs sm:text-sm text-[#0B3024] dark:text-[#F1FAF6]">
                  {entry.version}
                </span>
                <span className="text-xs text-[#658278] dark:text-[#789991]">•</span>
                <div className="flex items-center gap-1 text-[11px] text-[#658278] dark:text-[#789991]">
                  <Clock className="w-3 h-3 text-gray-400" />
                  <span>{entry.submittedAt}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 rounded-full text-[10.5px] font-bold ${
                    entry.reviewState === "Graded"
                      ? "bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300"
                      : "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300"
                  }`}
                >
                  {entry.reviewState || entry.status}
                </span>
                {entry.marksEarned && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10.5px] font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-[#20D39B] border border-emerald-200/50">
                    <Award className="w-3 h-3" />
                    <span>{entry.marksEarned}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Attached files */}
            {entry.files && entry.files.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap pt-1 border-t border-gray-100 dark:border-[#10372F]">
                {entry.files.map((f, i) => (
                  <div
                    key={i}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] text-[11px] text-[#0B3024] dark:text-[#C5DCD4]"
                  >
                    <FileArchive className="w-3.5 h-3.5 text-emerald-600 dark:text-[#20D39B]" />
                    <span className="truncate max-w-[200px]">{f.name}</span>
                    {f.size && <span className="text-[#8AA89F]">({f.size})</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
