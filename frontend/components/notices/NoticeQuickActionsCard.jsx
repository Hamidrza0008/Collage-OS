"use client";

import { Calendar, Download, Bell, MessageSquare } from "lucide-react";

export default function NoticeQuickActionsCard({ onAction }) {
  const actions = [
    {
      id: "calendar",
      label: "View Calendar",
      icon: Calendar,
    },
    {
      id: "download",
      label: "Download Notices",
      icon: Download,
    },
    {
      id: "notifications",
      label: "Set Notifications",
      icon: Bell,
    },
    {
      id: "contact",
      label: "Contact Admin",
      icon: MessageSquare,
    },
  ];

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-4 sm:p-5 transition-colors">
      <h2 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight mb-3">
        Quick Actions
      </h2>

      {/* 2x2 Grid of Actions */}
      <div className="grid grid-cols-2 gap-2.5">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.id}
              type="button"
              onClick={() => onAction(act.id)}
              className="p-3 rounded-xl border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/20 hover:bg-emerald-100/60 dark:hover:bg-emerald-900/40 transition-all flex flex-col items-center justify-center text-center gap-2 group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-100/80 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-700 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-semibold text-[#0B3024] dark:text-[#E2F1EC] leading-tight">
                {act.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
