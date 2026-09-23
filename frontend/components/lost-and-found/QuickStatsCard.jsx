"use client";

import { Package, Search, AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";

export default function QuickStatsCard({
  stats = { total: 24, found: 12, lost: 12, resolved: 18 },
  onViewAll,
}) {
  const statItems = [
    {
      label: "Total Items",
      value: stats.total,
      icon: Package,
      iconBg: "bg-[#DDF4EB] dark:bg-[#123F35]",
      iconColor: "text-[#159B72] dark:text-[#20D39B]",
      border: "border-emerald-100 dark:border-emerald-900/40",
    },
    {
      label: "Items Found",
      value: stats.found,
      icon: Search,
      iconBg: "bg-teal-50 dark:bg-teal-950/40",
      iconColor: "text-teal-600 dark:text-teal-400",
      border: "border-teal-100 dark:border-teal-900/40",
    },
    {
      label: "Items Lost",
      value: stats.lost,
      icon: AlertCircle,
      iconBg: "bg-rose-50 dark:bg-rose-950/40",
      iconColor: "text-rose-600 dark:text-rose-400",
      border: "border-rose-100 dark:border-rose-900/40",
    },
    {
      label: "Resolved",
      value: stats.resolved,
      icon: CheckCircle2,
      iconBg: "bg-sky-50 dark:bg-sky-950/40",
      iconColor: "text-sky-600 dark:text-sky-400",
      border: "border-sky-100 dark:border-sky-900/40",
    },
  ];

  return (
    <div className="rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] p-4 shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <h3 className="text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
          Quick Stats
        </h3>
        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-semibold text-[#159B72] dark:text-[#20D39B] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>View All</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* 2x2 Metric Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {statItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className={`p-3 rounded-xl bg-gray-50/70 dark:bg-[#082A24] border ${item.border} flex items-center gap-3 transition-colors`}
            >
              <div
                className={`w-9 h-9 rounded-xl ${item.iconBg} ${item.iconColor} flex items-center justify-center shrink-0 shadow-2xs`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="block text-base font-extrabold text-[#0B3024] dark:text-[#F1FAF6] leading-none">
                  {item.value}
                </span>
                <span className="block text-[11px] text-[#658278] dark:text-[#789991] font-medium truncate mt-0.5">
                  {item.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
