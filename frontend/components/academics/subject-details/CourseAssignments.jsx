"use client";

import Link from "next/link";
import { CheckCircle2, Clock, AlertCircle, ArrowUpRight } from "lucide-react";

const statusConfig = {
  submitted: { label: "Submitted", icon: CheckCircle2, cls: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300" },
  pending: { label: "Pending", icon: Clock, cls: "text-amber-600 dark:text-amber-400", bg: "bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300" },
  upcoming: { label: "Upcoming", icon: AlertCircle, cls: "text-gray-500 dark:text-gray-400", bg: "bg-gray-100 dark:bg-[#041D18] text-gray-600 dark:text-[#8AA89F]" },
  overdue: { label: "Overdue", icon: AlertCircle, cls: "text-red-600 dark:text-red-400", bg: "bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300" },
};

export default function CourseAssignments({ assignments, subjectName }) {
  if (!assignments || assignments.length === 0) return null;

  return (
    <div className="w-full bg-white dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
            Course Assignments
          </h2>
          <p className="text-xs text-[#5C786E] dark:text-[#8AA89F] mt-0.5">
            {assignments.filter((a) => a.status === "submitted").length} of {assignments.length} submitted
          </p>
        </div>
        <Link
          href="/student/assignments"
          className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors"
        >
          View All <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="space-y-2.5">
        {assignments.map((asgn) => {
          const cfg = statusConfig[asgn.status] || statusConfig.upcoming;
          const StatusIcon = cfg.icon;

          return (
            <div
              key={asgn.id}
              className="flex items-start gap-3 p-3.5 rounded-xl border border-[#D8E8E2] dark:border-[#10372F] bg-gray-50/50 dark:bg-[#041D18]/60 hover:bg-gray-100/60 dark:hover:bg-[#041D18] transition-colors group"
            >
              <div className="mt-0.5">
                <StatusIcon className={"w-4 h-4 shrink-0 " + cfg.cls} />
              </div>
              <div className="flex-1 min-w-0">
                <Link
                  href={"/student/assignments/" + asgn.id}
                  className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors line-clamp-1 group-hover:text-emerald-700 dark:group-hover:text-emerald-400"
                >
                  {asgn.title}
                </Link>
                <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                  <span className="text-[10.5px] text-[#5C786E] dark:text-[#8AA89F]">Due: {asgn.dueDate}</span>
                  {asgn.marks && (
                    <>
                      <span className="text-[10.5px] text-[#8AA89F]">·</span>
                      <span className="text-[10.5px] font-bold text-emerald-600 dark:text-emerald-400">
                        {asgn.marks}
                      </span>
                    </>
                  )}
                </div>
              </div>
              <span className={"shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold " + cfg.bg}>
                {cfg.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
