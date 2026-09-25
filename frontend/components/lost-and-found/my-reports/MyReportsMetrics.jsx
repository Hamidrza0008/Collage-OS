"use client";

import { FileText, Search, Clock, CheckCircle2, AlertTriangle } from "lucide-react";

export default function MyReportsMetrics({ metrics, activeTab, onSelectMetric }) {
  const cards = [
    {
      id: "all",
      label: "Total Reports",
      value: metrics.total,
      icon: FileText,
      color: "text-[#159B72] dark:text-[#20D39B]",
      bg: "bg-[#DDF4EB] dark:bg-[#123F35]",
      border: "hover:border-[#159B72]/50",
      targetTab: "all",
    },
    {
      id: "open",
      label: "Open / Active",
      value: metrics.open,
      icon: Search,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-950/40",
      border: "hover:border-amber-400/50",
      targetTab: "all",
      statusFilter: "Open",
    },
    {
      id: "claims",
      label: "Claims Pending",
      value: metrics.claimsPending,
      icon: Clock,
      color: "text-sky-600 dark:text-sky-400",
      bg: "bg-sky-50 dark:bg-sky-950/40",
      border: "hover:border-sky-400/50",
      targetTab: "claims",
    },
    {
      id: "resolved",
      label: "Resolved",
      value: metrics.resolved,
      icon: CheckCircle2,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-950/40",
      border: "hover:border-emerald-400/50",
      targetTab: "resolved",
    },
    {
      id: "action-required",
      label: "Action Required",
      value: metrics.actionRequired,
      icon: AlertTriangle,
      color: "text-rose-600 dark:text-rose-400",
      bg: "bg-rose-50 dark:bg-rose-950/40",
      border: "hover:border-rose-400/50",
      targetTab: "needs-action",
      highlight: metrics.actionRequired > 0,
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {cards.map((c) => {
        const Icon = c.icon;
        const isCurrent = activeTab === c.targetTab;

        return (
          <button
            key={c.id}
            type="button"
            onClick={() => onSelectMetric(c.targetTab, c.statusFilter)}
            className={`p-3.5 rounded-2xl bg-white dark:bg-[#06241F] border transition-all text-left cursor-pointer flex flex-col justify-between shadow-2xs group relative overflow-hidden ${
              isCurrent
                ? "border-[#159B72] dark:border-[#20D39B] ring-1 ring-[#159B72]/30 dark:ring-[#20D39B]/30"
                : "border-[#D8E8E2] dark:border-[#16463D]"
            } ${c.border}`}
          >
            <div className="flex items-center justify-between w-full mb-2">
              <span className="text-[11px] font-semibold text-[#55786B] dark:text-[#9FB7AD] uppercase tracking-wider">
                {c.label}
              </span>
              <div
                className={`w-7 h-7 rounded-lg ${c.bg} ${c.color} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}
              >
                <Icon className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="flex items-baseline justify-between">
              <span className="text-xl sm:text-2xl font-extrabold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
                {c.value}
              </span>
              {c.highlight && (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white animate-pulse">
                  Attention
                </span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
