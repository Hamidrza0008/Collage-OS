"use client";

import Link from "next/link";
import { AlertCircle, Award, Search, UserCheck } from "lucide-react";

export default function QuickActionsCard({
  onReportLost,
  onReportFound,
  onBrowseAll,
  onMyReports,
}) {
  const actions = [
    {
      id: "report-lost",
      label: "Report Lost Item",
      icon: AlertCircle,
      onClick: onReportLost,
    },
    {
      id: "report-found",
      label: "Report Found Item",
      icon: Award,
      onClick: onReportFound,
    },
    {
      id: "browse-all",
      label: "Browse All Items",
      icon: Search,
      onClick: onBrowseAll,
    },
    {
      id: "my-reports",
      label: "My Reports",
      icon: UserCheck,
      href: "/student/lost-and-found/my-reports",
      onClick: onMyReports,
    },
  ];

  return (
    <div className="rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] p-4 shadow-2xs">
      <h3 className="text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-3">
        Quick Actions
      </h3>

      <div className="grid grid-cols-2 gap-2.5">
        {actions.map((act) => {
          const Icon = act.icon;
          const content = (
            <>
              <div className="w-8 h-8 rounded-lg bg-[#DDF4EB] dark:bg-[#123F35] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-[#159B72] dark:group-hover:text-[#20D39B] transition-colors leading-tight">
                {act.label}
              </span>
            </>
          );

          if (act.href) {
            return (
              <Link
                key={act.id}
                href={act.href}
                className="p-3 rounded-xl bg-gray-50/70 dark:bg-[#082A24] border border-[#E0EBE6] dark:border-[#16463D] hover:bg-[#DDF4EB]/60 dark:hover:bg-[#123F35]/60 hover:border-[#159B72]/50 text-left transition-all cursor-pointer group flex flex-col justify-between gap-2 shadow-2xs"
              >
                {content}
              </Link>
            );
          }

          return (
            <button
              key={act.id}
              type="button"
              onClick={act.onClick}
              className="p-3 rounded-xl bg-gray-50/70 dark:bg-[#082A24] border border-[#E0EBE6] dark:border-[#16463D] hover:bg-[#DDF4EB]/60 dark:hover:bg-[#123F35]/60 hover:border-[#159B72]/50 text-left transition-all cursor-pointer group flex flex-col justify-between gap-2 shadow-2xs"
            >
              {content}
            </button>
          );
        })}
      </div>
    </div>
  );
}
