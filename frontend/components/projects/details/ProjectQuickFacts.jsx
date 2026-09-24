"use client";

import {
  Layers,
  Users,
  Activity,
  Calendar,
  Globe2,
  Star,
  MessageSquare,
  Shield,
  Clock,
} from "lucide-react";

export default function ProjectQuickFacts({ project }) {
  const membersCount = project.team?.length || project.membersCount || 1;

  const facts = [
    {
      label: "Category",
      value: project.category || "Web Development",
      icon: <Layers className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B]" />,
    },
    {
      label: "Type",
      value: project.type || "Team Project",
      icon: <Users className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B]" />,
    },
    {
      label: "Members",
      value: `${membersCount} ${membersCount > 1 ? "Students" : "Student"}`,
      icon: <Users className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B]" />,
    },
    {
      label: "Status",
      value: project.status || "In Development",
      icon: <Activity className="w-3.5 h-3.5 text-emerald-500" />,
      highlight: true,
    },
    {
      label: "Updated",
      value: project.updatedAt || "2 days ago",
      icon: <Calendar className="w-3.5 h-3.5 text-[#658278] dark:text-[#8BAEA3]" />,
    },
    {
      label: "Visibility",
      value: project.visibility || "Public (Campus)",
      icon: <Globe2 className="w-3.5 h-3.5 text-[#658278] dark:text-[#8BAEA3]" />,
    },
    {
      label: "Likes & Stars",
      value: project.likes || 0,
      icon: <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />,
    },
    {
      label: "Comments",
      value: project.commentsCount || 0,
      icon: <MessageSquare className="w-3.5 h-3.5 text-sky-500" />,
    },
  ];

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-xs space-y-3.5">
      <div className="flex items-center justify-between pb-2.5 border-b border-[#E8F3EE] dark:border-[#10372F]">
        <h3 className="text-xs sm:text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
          Project Info
        </h3>
        <span className="text-[10px] font-semibold text-[#159B72] dark:text-[#20D39B] px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-[#082A24] border border-[#159B72]/20">
          Metadata
        </span>
      </div>

      <div className="space-y-2 text-xs">
        {facts.map((fact, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between py-1.5 border-b border-gray-100/70 dark:border-[#10372F]/50 last:border-b-0"
          >
            <div className="flex items-center gap-2 text-[#658278] dark:text-[#8BAEA3]">
              {fact.icon}
              <span className="text-[11px] font-medium">{fact.label}</span>
            </div>
            <span
              className={`text-[11px] font-bold ${
                fact.highlight
                  ? "text-[#159B72] dark:text-[#20D39B]"
                  : "text-[#0B3024] dark:text-[#F1FAF6]"
              }`}
            >
              {fact.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
