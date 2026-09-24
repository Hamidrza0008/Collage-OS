"use client";

import Link from "next/link";
import {
  Clock,
  ArrowRight,
  FileCheck2,
  Calendar,
  FolderGit2,
  Bell,
  Award,
} from "lucide-react";

const ACTIVITY_CONFIG = {
  submitted: {
    icon: FileCheck2,
    badgeClasses:
      "bg-[#DDF3EB] dark:bg-[#123F35] text-[#159B72] dark:text-[#20D39B] border-[#159B72]/20",
    iconBg: "bg-[#DDF3EB] dark:bg-[#123F35] text-[#159B72] dark:text-[#20D39B]",
  },
  event: {
    icon: Calendar,
    badgeClasses:
      "bg-[#FFE4E6] dark:bg-[#3E101D] text-[#E11D48] dark:text-[#FB7185] border-[#E11D48]/20",
    iconBg: "bg-[#FFE4E6] dark:bg-[#3E101D] text-[#E11D48] dark:text-[#FB7185]",
  },
  project: {
    icon: FolderGit2,
    badgeClasses:
      "bg-[#E0F2FE] dark:bg-[#082F49] text-[#0284C7] dark:text-[#38BDF8] border-[#0284C7]/20",
    iconBg: "bg-[#E0F2FE] dark:bg-[#082F49] text-[#0284C7] dark:text-[#38BDF8]",
  },
  notice: {
    icon: Bell,
    badgeClasses:
      "bg-[#FEF3C7] dark:bg-[#3D2605] text-[#D97706] dark:text-[#FBBF24] border-[#D97706]/20",
    iconBg: "bg-[#FEF3C7] dark:bg-[#3D2605] text-[#D97706] dark:text-[#FBBF24]",
  },
  learning: {
    icon: Award,
    badgeClasses:
      "bg-[#CCFBF1] dark:bg-[#042F2E] text-[#0D9488] dark:text-[#2DD4BF] border-[#0D9488]/20",
    iconBg: "bg-[#CCFBF1] dark:bg-[#042F2E] text-[#0D9488] dark:text-[#2DD4BF]",
  },
};

export default function RecentActivityCard({ activities = [] }) {
  return (
    <div className="bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] rounded-2xl p-4 sm:p-5 shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[#E8F1ED] dark:border-[#10372F]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#DDF3EB] dark:bg-[#123F35] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center shrink-0">
            <Clock className="w-3.5 h-3.5" />
          </div>
          <h2 className="text-[13.5px] sm:text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            Recent Activity
          </h2>
        </div>

        <Link
          href="#profile-activity"
          className="inline-flex items-center gap-1 text-[11px] font-medium text-[#159B72] dark:text-[#20D39B] hover:underline"
        >
          <span>View All</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Activity List */}
      <div className="space-y-3">
        {activities.map((item) => {
          const config = ACTIVITY_CONFIG[item.type] || ACTIVITY_CONFIG.submitted;
          const IconComponent = config.icon;

          return (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3 p-1 rounded-xl hover:bg-[#F1F8F5]/60 dark:hover:bg-[#082A24]/60 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${config.iconBg}`}
                >
                  <IconComponent className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-[11.5px] font-semibold text-[#0B3024] dark:text-[#F1FAF6] truncate">
                    {item.title}
                  </h4>
                  <span className="text-[10px] text-[#658278] dark:text-[#789991]">
                    {item.time}
                  </span>
                </div>
              </div>

              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 border ${config.badgeClasses}`}
              >
                {item.badge}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
