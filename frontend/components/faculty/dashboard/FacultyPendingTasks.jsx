"use client";

import React from "react";
import Link from "next/link";
import { CheckSquare, ArrowRight } from "lucide-react";

export default function FacultyPendingTasks() {
  const tasks = [
    {
      id: "t1",
      title: "Review Assignment Submissions",
      course: "DSA - Sem 5",
      dotColor: "bg-[#EA580C]",
      dueLabel: "Due today",
      dueColor: "bg-[#FEE2E2] text-[#DC2626] dark:bg-[#450A0A] dark:text-[#F87171] border-[#FCA5A5]/40",
    },
    {
      id: "t2",
      title: "Update Internal Marks",
      course: "Web Development - Sem 3",
      dotColor: "bg-[#DC2626]",
      dueLabel: "Due today",
      dueColor: "bg-[#FEE2E2] text-[#DC2626] dark:bg-[#450A0A] dark:text-[#F87171] border-[#FCA5A5]/40",
    },
    {
      id: "t3",
      title: "Respond to Student Query",
      course: "General",
      dotColor: "border-2 border-[#2563EB] bg-transparent",
      dueLabel: "Due tomorrow",
      dueColor: "bg-[#FEF3C7] text-[#D97706] dark:bg-[#451A03] dark:text-[#FBBF24] border-[#FCD34D]/40",
    },
    {
      id: "t4",
      title: "Upload Study Materials",
      course: "Database Management Systems",
      dotColor: "bg-[#2563EB]",
      dueLabel: "Due tomorrow",
      dueColor: "bg-[#FEF3C7] text-[#D97706] dark:bg-[#451A03] dark:text-[#FBBF24] border-[#FCD34D]/40",
    },
  ];

  return (
    <div className="rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] p-4 sm:p-5 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-[#F0F5F2] dark:border-[#0E352E]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#E6F7F0] dark:bg-[#073629] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center">
            <CheckSquare className="w-4 h-4" />
          </div>
          <h2 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            Pending Tasks
          </h2>
        </div>

        <Link
          href="/faculty/assignments"
          className="inline-flex items-center gap-1 text-xs font-bold text-[#159B72] dark:text-[#20D39B] hover:gap-1.5 transition-all"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Task Items */}
      <div className="divide-y divide-[#F0F5F2] dark:divide-[#0E352E]">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="py-3 flex items-center justify-between gap-3 hover:bg-[#F7FBF9] dark:hover:bg-[#082A24]/60 px-2 rounded-xl transition-colors group cursor-pointer"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${task.dotColor}`} />
              <div className="min-w-0">
                <h3 className="text-xs sm:text-[13px] font-bold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-[#159B72] dark:group-hover:text-[#20D39B] transition-colors truncate">
                  {task.title}
                </h3>
                <p className="text-[11px] text-[#658278] dark:text-[#789991] truncate">
                  {task.course}
                </p>
              </div>
            </div>

            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${task.dueColor}`}
            >
              {task.dueLabel}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
