"use client";

import { FileText, ArrowRight } from "lucide-react";
import Link from "next/link";

const ASSIGNMENTS = [
  {
    title: "Web Development",
    desc: "Build a responsive portfolio website",
    dueDays: "Due in 2 days",
    date: "18 Aug",
    urgent: true,
  },
  {
    title: "DBMS",
    desc: "Normalization and ER diagram",
    dueDays: "Due in 4 days",
    date: "20 Aug",
    urgent: false,
  },
  {
    title: "Computer Networks",
    desc: "Network Topology & Protocols",
    dueDays: "Due in 6 days",
    date: "22 Aug",
    urgent: false,
  },
];

export default function UpcomingAssignments() {
  return (
    <div className="p-3.5 sm:p-4 rounded-xl bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-2xs flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-2.5 border-b border-[#E8F1ED] dark:border-[#10372F]">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#DDF3EB] dark:bg-[#123F35] text-[#159B72] dark:text-[#20D39B]">
              <FileText className="w-3.5 h-3.5" />
            </div>
            <div>
              <h2 className="text-xs sm:text-[13px] font-bold text-[#0B3024] dark:text-[#F1FAF6] leading-tight">
                Upcoming Assignments
              </h2>
              <p className="text-[10.5px] text-[#658278] dark:text-[#789991]">
                3 pending submissions
              </p>
            </div>
          </div>

          <Link
            href="/assignments"
            className="group inline-flex items-center gap-1 text-[11px] font-semibold text-[#159B72] dark:text-[#20D39B] hover:text-[#087A5B] dark:hover:text-[#4AE3B5] transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Assignments List */}
        <div className="mt-2.5 space-y-1.5">
          {ASSIGNMENTS.map((item, index) => (
            <div
              key={index}
              className="py-2 px-2.5 rounded-lg bg-[#F7FBF9]/60 dark:bg-[#031A16]/40 border border-[#E8F1ED] dark:border-[#10372F] hover:border-[#D8E8E2] dark:hover:border-[#16463D] transition-all flex items-center justify-between gap-2.5"
            >
              {/* Left icon & Info */}
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="p-1.5 rounded-md bg-[#DDF3EB] dark:bg-[#123F35] text-[#159B72] dark:text-[#20D39B] shrink-0">
                  <FileText className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] truncate leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-[10.5px] text-[#658278] dark:text-[#789991] truncate">
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Due Date Badges */}
              <div className="flex items-center gap-2 shrink-0 text-right">
                <span
                  className={`px-2 py-0.2 rounded-full text-[10px] font-medium ${
                    item.urgent
                      ? "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200/60 dark:border-rose-900/40"
                      : "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200/60 dark:border-amber-900/40"
                  }`}
                >
                  {item.dueDays}
                </span>
                <span className="text-[11px] font-semibold text-[#36594C] dark:text-[#B5CCC5] min-w-[42px] text-right">
                  {item.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
