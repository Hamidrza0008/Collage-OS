"use client";

import { BarChart2, CheckCircle2, Clock } from "lucide-react";

export default function InternalMarksCard({ internalMarks }) {
  const { breakdown, totalScored, totalMax, grade } = internalMarks;
  const overallPct = Math.round((totalScored / totalMax) * 100);

  const gradeColor = {
    A: "text-emerald-600 dark:text-emerald-400",
    "A-": "text-emerald-600 dark:text-emerald-400",
    "B+": "text-amber-600 dark:text-amber-400",
    B: "text-amber-600 dark:text-amber-400",
  };
  const gradeCls = gradeColor[grade] || gradeColor.B;

  return (
    <div className="w-full bg-white dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BarChart2 className="w-4 h-4 text-[#5C786E] dark:text-[#8AA89F]" />
          <h2 className="text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
            Internal Assessment
          </h2>
        </div>
        <div className="text-right">
          <span className={"text-lg font-black " + gradeCls}>{grade}</span>
          <p className="text-[10.5px] text-[#5C786E] dark:text-[#8AA89F]">{totalScored}/{totalMax} marks</p>
        </div>
      </div>

      {/* Overall bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs font-semibold mb-1.5">
          <span className="text-[#5C786E] dark:text-[#8AA89F]">Overall Score</span>
          <span className="text-[#0B3024] dark:text-[#E2F1EC]">{overallPct}%</span>
        </div>
        <div className="w-full h-2 bg-gray-100 dark:bg-[#0A2E27] rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 dark:bg-emerald-400 rounded-full transition-all duration-700 ease-out"
            style={{ width: overallPct + "%" }}
          />
        </div>
      </div>

      {/* Breakdown */}
      <div className="space-y-3">
        {breakdown.map((item, i) => {
          const pct = item.scored != null ? Math.round((item.scored / item.max) * 100) : null;
          const barCls = pct != null && pct >= 80
            ? "h-full rounded-full bg-emerald-500 dark:bg-emerald-400 transition-all duration-500"
            : pct != null && pct >= 60
            ? "h-full rounded-full bg-amber-500 dark:bg-amber-400 transition-all duration-500"
            : "h-full rounded-full bg-red-500 dark:bg-red-400 transition-all duration-500";
          const spanCls = item.status === "completed"
            ? "font-medium truncate text-[#0B3024] dark:text-[#F1FAF6]"
            : "font-medium truncate text-[#8AA89F] dark:text-[#5C786E]";

          return (
            <div key={i} className="flex items-center gap-3">
              <div className="shrink-0">
                {item.status === "completed" ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                ) : (
                  <Clock className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className={spanCls}>
                    {item.component}
                  </span>
                  <span className="font-bold text-[#0B3024] dark:text-[#E2F1EC] shrink-0 ml-2">
                    {item.scored != null ? item.scored + "/" + item.max : "—/" + item.max}
                  </span>
                </div>
                {item.status === "completed" && pct != null && (
                  <div className="w-full h-1 bg-gray-100 dark:bg-[#0A2E27] rounded-full overflow-hidden">
                    <div
                      className={barCls}
                      style={{ width: pct + "%" }}
                    />
                  </div>
                )}
                {item.status === "upcoming" && (
                  <div className="w-full h-1 bg-gray-100 dark:bg-[#0A2E27] rounded-full opacity-40" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
