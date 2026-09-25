"use client";

import {
  BookOpen,
  GraduationCap,
  FileText,
  Calendar,
  Bell,
  Sun,
  Clock,
} from "lucide-react";

export default function TimetableLegend() {
  const items = [
    { label: "Classes", icon: BookOpen, color: "bg-emerald-500", text: "text-emerald-700 dark:text-emerald-400" },
    { label: "Exams", icon: GraduationCap, color: "bg-amber-500", text: "text-amber-700 dark:text-amber-400" },
    { label: "Assignments", icon: FileText, color: "bg-sky-500", text: "text-sky-700 dark:text-sky-400" },
    { label: "Events", icon: Calendar, color: "bg-indigo-500", text: "text-indigo-700 dark:text-indigo-400" },
    { label: "Notices", icon: Bell, color: "bg-rose-500", text: "text-rose-700 dark:text-rose-400" },
    { label: "Holidays", icon: Sun, color: "bg-emerald-400", text: "text-emerald-600 dark:text-emerald-300" },
    { label: "Reminders", icon: Clock, color: "bg-purple-500", text: "text-purple-700 dark:text-purple-400" },
  ];

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl px-4 py-2.5 shadow-2xs">
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
          Legend:
        </span>
        <div className="flex flex-wrap items-center gap-3">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${item.color}`} />
                <Icon className={`w-3 h-3 ${item.text}`} />
                <span className="text-[#5C786E] dark:text-[#8AA89F] font-medium text-[11px]">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
