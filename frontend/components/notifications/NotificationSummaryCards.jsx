"use client";

import { Bell, Calendar, AlertCircle, Inbox } from "lucide-react";

export default function NotificationSummaryCards({
  counts = { unread: 0, today: 0, actionRequired: 0, total: 0 },
  activeFilter = "all",
  onSelectQuickFilter,
}) {
  const cards = [
    {
      id: "unread",
      label: "Unread",
      value: counts.unread,
      icon: Bell,
      color: "text-[#E5484D]",
      bg: "bg-rose-50 dark:bg-rose-950/30",
      border: "border-rose-200/80 dark:border-rose-900/40",
      activeBg: "ring-2 ring-[#E5484D] dark:ring-rose-500",
      filterId: "unread",
    },
    {
      id: "today",
      label: "Today",
      value: counts.today,
      icon: Calendar,
      color: "text-[#159B72] dark:text-[#20D39B]",
      bg: "bg-[#DDF3EB]/60 dark:bg-[#073327]/60",
      border: "border-[#D8E8E2] dark:border-[#10372F]",
      activeBg: "ring-2 ring-[#159B72] dark:ring-[#20D39B]",
      filterId: "all",
    },
    {
      id: "actionRequired",
      label: "Action Required",
      value: counts.actionRequired,
      icon: AlertCircle,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-950/30",
      border: "border-amber-200/80 dark:border-amber-900/40",
      activeBg: "ring-2 ring-amber-500",
      filterId: "action_required",
    },
    {
      id: "total",
      label: "Total Notifications",
      value: counts.total,
      icon: Inbox,
      color: "text-[#36594C] dark:text-[#A3BFB5]",
      bg: "bg-white dark:bg-[#06241F]",
      border: "border-[#D8E8E2] dark:border-[#16463D]",
      activeBg: "ring-2 ring-[#36594C] dark:ring-[#A3BFB5]",
      filterId: "all",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {cards.map((card) => {
        const Icon = card.icon;
        const isSelected =
          (card.filterId === "unread" && activeFilter === "unread") ||
          (card.filterId === "action_required" && activeFilter === "action_required") ||
          (card.id === "total" && activeFilter === "all");

        return (
          <button
            key={card.id}
            type="button"
            onClick={() => onSelectQuickFilter && onSelectQuickFilter(card.filterId)}
            className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all cursor-pointer ${card.bg} ${card.border} ${
              isSelected ? card.activeBg : "hover:border-[#159B72]/50 hover:shadow-xs"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] sm:text-xs font-semibold text-[#658278] dark:text-[#789991]">
                {card.label}
              </span>
              <div className={`p-1.5 rounded-lg ${card.color}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-black text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
              {card.value}
            </div>
          </button>
        );
      })}
    </div>
  );
}
