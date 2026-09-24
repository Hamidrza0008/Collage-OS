"use client";

import { CheckCircle2, Bell, CalendarCheck, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

const ACTIVITIES = [
  {
    text: "You submitted Web Dev assignment",
    time: "2h ago",
    icon: CheckCircle2,
    color: "text-emerald-600 dark:text-[#20D39B]",
    bg: "bg-emerald-50 dark:bg-[#123F35]",
  },
  {
    text: "New notice from Academic Cell",
    time: "3h ago",
    icon: Bell,
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-[#0C243B]",
  },
  {
    text: "You were marked present in DBMS",
    time: "Yesterday",
    icon: CalendarCheck,
    color: "text-teal-600 dark:text-teal-400",
    bg: "bg-teal-50 dark:bg-[#0D2F28]",
  },
  {
    text: "Campus Fest registration is live",
    time: "2d ago",
    icon: Sparkles,
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-[#34240B]",
  },
];

export default function RecentActivity() {
  return (
    <div className="p-3.5 rounded-xl bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-2xs space-y-2">
      {/* Header */}
      <div className="flex items-center justify-between pb-1.5 border-b border-[#E8F1ED] dark:border-[#10372F]">
        <h2 className="text-xs sm:text-[13px] font-bold text-[#0B3024] dark:text-[#F1FAF6]">
          Recent Activity
        </h2>
        <Link
          href="/student/profile"
          className="group inline-flex items-center gap-1 text-[11px] font-semibold text-[#159B72] dark:text-[#20D39B] hover:underline"
        >
          <span>View All</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Activity Items List */}
      <div className="space-y-2 pt-0.5">
        {ACTIVITIES.map((act, idx) => {
          const Icon = act.icon;
          return (
            <div key={idx} className="flex items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 min-w-0">
                <div className={`p-1 rounded-md ${act.bg} ${act.color} shrink-0`}>
                  <Icon className="w-3 h-3" />
                </div>
                <p className="text-[11.5px] font-medium text-[#0B3024] dark:text-[#F1FAF6] truncate leading-tight">
                  {act.text}
                </p>
              </div>
              <span className="text-[10px] text-[#658278] dark:text-[#789991] shrink-0">
                {act.time}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
