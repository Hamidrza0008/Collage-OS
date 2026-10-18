"use client";

import React, { useState } from "react";
import { BarChart3, ChevronDown, ArrowUpRight } from "lucide-react";

export default function AttendanceSummaryTable() {
  const [timeframe, setTimeframe] = useState("semester");

  const rows = [
    {
      id: "dsa",
      className: "DSA (CSE-301)",
      dotColor: "bg-[#159B72]",
      totalStudents: 42,
      present: 32,
      absent: 10,
      percentage: 78,
      trend: "6%",
    },
    {
      id: "webdev",
      className: "Web Dev (CSE-302)",
      dotColor: "bg-[#2563EB]",
      totalStudents: 38,
      present: 32,
      absent: 6,
      percentage: 85,
      trend: "8%",
    },
    {
      id: "dbms",
      className: "DBMS (CSE-303)",
      dotColor: "bg-[#9333EA]",
      totalStudents: 40,
      present: 29,
      absent: 11,
      percentage: 72,
      trend: "4%",
    },
    {
      id: "cn",
      className: "CN (CSE-304)",
      dotColor: "bg-[#EA580C]",
      totalStudents: 28,
      present: 25,
      absent: 3,
      percentage: 90,
      trend: "7%",
    },
  ];

  return (
    <div className="rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] p-4 sm:p-5 md:p-6 shadow-xs overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#F0F5F2] dark:border-[#0E352E]">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#E6F7F0] dark:bg-[#073629] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center shrink-0 mt-0.5">
            <BarChart3 className="w-4.5 h-4.5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#0B3024] dark:text-[#F1FAF6] leading-snug">
              Attendance Summary
            </h2>
            <p className="text-xs text-[#658278] dark:text-[#789991] mt-0.5">
              Class-wise attendance for your assigned classes.
            </p>
          </div>
        </div>

        {/* Timeframe Dropdown */}
        <div className="relative">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="h-8.5 pl-3 pr-7 text-xs font-semibold rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#10372F] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden focus:border-[#159B72] cursor-pointer appearance-none"
          >
            <option value="semester">This Semester</option>
            <option value="month">This Month</option>
            <option value="last30">Last 30 Days</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-[#658278] pointer-events-none" />
        </div>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto pt-3">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#F0F5F2] dark:border-[#0E352E] text-[11px] font-bold text-[#658278] dark:text-[#789991] uppercase tracking-wider">
              <th className="py-2.5 px-3">Class</th>
              <th className="py-2.5 px-3">Total Students</th>
              <th className="py-2.5 px-3">Present</th>
              <th className="py-2.5 px-3">Absent</th>
              <th className="py-2.5 px-3 min-w-[140px]">Attendance %</th>
              <th className="py-2.5 px-3 text-right">Trend</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F0F5F2] dark:divide-[#0E352E] text-xs font-medium">
            {rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-[#F7FBF9] dark:hover:bg-[#082A24]/60 transition-colors"
              >
                <td className="py-3.5 px-3 font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${row.dotColor}`} />
                    <span>{row.className}</span>
                  </div>
                </td>
                <td className="py-3.5 px-3 text-[#36594C] dark:text-[#A7C8BD]">
                  {row.totalStudents}
                </td>
                <td className="py-3.5 px-3 font-semibold text-[#159B72] dark:text-[#20D39B]">
                  {row.present}
                </td>
                <td className="py-3.5 px-3 font-semibold text-[#DC2626] dark:text-[#F87171]">
                  {row.absent}
                </td>
                <td className="py-3.5 px-3">
                  <div className="flex items-center gap-2.5">
                    <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6] min-w-[32px]">
                      {row.percentage}%
                    </span>
                    <div className="flex-1 h-2 rounded-full bg-[#E2EFE9] dark:bg-[#0C382D] overflow-hidden max-w-[90px]">
                      <div
                        className="h-full rounded-full bg-[#159B72]"
                        style={{ width: `${row.percentage}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-3 text-right font-bold text-[#159B72] dark:text-[#20D39B]">
                  <span className="inline-flex items-center justify-end gap-0.5">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    <span>{row.trend}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
