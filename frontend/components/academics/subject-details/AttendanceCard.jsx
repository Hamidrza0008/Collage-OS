"use client";

import { AlertTriangle, TrendingUp } from "lucide-react";

export default function AttendanceCard({ attendance }) {
  const { percentage, conducted, attended, absent, minRequired, monthlyBreakdown } = attendance;
  const isSafe = percentage >= minRequired + 5;
  const isWarning = percentage >= minRequired && percentage < minRequired + 5;
  const isDanger = percentage < minRequired;

  const colorConfig = isDanger
    ? { ring: "ring-red-400/40", bar: "bg-red-500 dark:bg-red-400", text: "text-red-600 dark:text-red-400", badge: "bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300" }
    : isWarning
    ? { ring: "ring-amber-400/40", bar: "bg-amber-500 dark:bg-amber-400", text: "text-amber-600 dark:text-amber-400", badge: "bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300" }
    : { ring: "ring-emerald-500/30", bar: "bg-emerald-500 dark:bg-emerald-400", text: "text-emerald-600 dark:text-emerald-400", badge: "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300" };

  // SVG ring gauge
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (percentage / 100) * circumference;

  const maxMonthly = Math.max(...monthlyBreakdown.map((m) => m.conducted));

  const strokeColor = isDanger ? "stroke-red-500" : isWarning ? "stroke-amber-500" : "stroke-emerald-500";
  const warnBgCls = isDanger
    ? "mt-3 flex items-start gap-2 p-2.5 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/30"
    : "mt-3 flex items-start gap-2 p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/30";
  const warnIconCls = isDanger ? "w-3.5 h-3.5 shrink-0 mt-0.5 text-red-500" : "w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-500";
  const warnTextCls = isDanger ? "text-[11px] leading-relaxed text-red-700 dark:text-red-300" : "text-[11px] leading-relaxed text-amber-700 dark:text-amber-300";

  return (
    <div className="w-full bg-white dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
          Subject Attendance
        </h2>
        <span className={"px-2 py-0.5 rounded-full text-[10.5px] font-bold " + colorConfig.badge}>
          {isSafe ? "Safe" : isWarning ? "Near Limit" : "At Risk"}
        </span>
      </div>

      {/* Circular gauge */}
      <div className="flex items-center gap-4">
        <div className="relative flex items-center justify-center shrink-0">
          <svg width="96" height="96" className="-rotate-90">
            <circle cx="48" cy="48" r={radius} strokeWidth="8" className="stroke-gray-100 dark:stroke-[#0A2E27]" fill="none" />
            <circle
              cx="48"
              cy="48"
              r={radius}
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              className={strokeColor}
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              style={{ transition: "stroke-dashoffset 1s ease-out" }}
            />
          </svg>
          <div className="absolute text-center">
            <span className={"text-xl font-black " + colorConfig.text}>{percentage}%</span>
          </div>
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-[#5C786E] dark:text-[#8AA89F]">Attended</span>
            <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6]">{attended} / {conducted}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-[#5C786E] dark:text-[#8AA89F]">Absent</span>
            <span className="font-bold text-red-600 dark:text-red-400">{absent}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-[#5C786E] dark:text-[#8AA89F]">Min. Required</span>
            <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6]">{minRequired}%</span>
          </div>
        </div>
      </div>

      {/* Warning/info message */}
      {(isDanger || isWarning) && (
        <div className={warnBgCls}>
          <AlertTriangle className={warnIconCls} />
          <p className={warnTextCls}>
            {isDanger
              ? "Your attendance is below the minimum " + minRequired + "% requirement. You may be debarred from exams."
              : "Your attendance is close to the minimum. Try not to miss any more classes."}
          </p>
        </div>
      )}

      {/* Monthly breakdown mini bars */}
      <div className="mt-4 pt-3 border-t border-[#D8E8E2] dark:border-[#10372F]">
        <div className="flex items-center gap-1 mb-2">
          <TrendingUp className="w-3.5 h-3.5 text-[#5C786E] dark:text-[#8AA89F]" />
          <span className="text-[11px] font-bold text-[#5C786E] dark:text-[#8AA89F] uppercase tracking-wide">Monthly</span>
        </div>
        <div className="flex items-end gap-2 h-12">
          {monthlyBreakdown.map((m) => {
            const pct = maxMonthly > 0 ? (m.attended / maxMonthly) * 100 : 0;
            const totalPct = m.conducted > 0 ? (m.attended / m.conducted) * 100 : 0;
            const barColor = totalPct >= minRequired
              ? "bg-emerald-400 dark:bg-emerald-500"
              : "bg-red-400 dark:bg-red-500";
            const heightPct = Math.max(pct, 8);
            return (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-0.5">
                <div
                  className={"w-full rounded-t-sm min-h-[4px] transition-all duration-700 " + barColor}
                  style={{ height: heightPct + "%" }}
                />
                <span className="text-[9px] font-semibold text-[#8AA89F] dark:text-[#5C786E]">{m.month}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
