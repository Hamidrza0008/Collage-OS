"use client";

import React from "react";
import Link from "next/link";
import { Users, UserCheck, FileText, Calendar, ArrowRight } from "lucide-react";

export default function ClassesKPICards() {
  const cards = [
    {
      id: "classes",
      title: "Assigned Classes",
      count: 4,
      icon: UserCheck,
      iconBg: "bg-[#E6F7F0] dark:bg-[#073629] text-[#159B72] dark:text-[#20D39B]",
      href: "#assigned-classes",
      linkText: "View All Classes",
    },
    {
      id: "students",
      title: "Total Students",
      count: 156,
      icon: Users,
      iconBg: "bg-[#EBF5FF] dark:bg-[#0A2E47] text-[#2563EB] dark:text-[#60A5FA]",
      href: "/faculty/students",
      linkText: "View Student Profiles",
    },
    {
      id: "assignments",
      title: "Assignments Pending",
      count: 12,
      icon: FileText,
      iconBg: "bg-[#F3E8FF] dark:bg-[#34164D] text-[#9333EA] dark:text-[#C084FC]",
      href: "/faculty/assignments",
      linkText: "View Assignments",
    },
    {
      id: "today",
      title: "Today's Classes",
      count: 3,
      icon: Calendar,
      iconBg: "bg-[#FFF4E5] dark:bg-[#3D2509] text-[#EA580C] dark:text-[#FB923C]",
      href: "/faculty/timetable",
      linkText: "View Timetable",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className="p-4 sm:p-4.5 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${card.iconBg}`}
              >
                <Icon className="w-5 h-5" strokeWidth={2} />
              </div>

              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#0B3024] dark:text-[#F1FAF6] leading-none block">
                  {card.count}
                </span>
                <span className="text-xs font-semibold text-[#658278] dark:text-[#789991] mt-1 block">
                  {card.title}
                </span>
              </div>
            </div>

            <div className="pt-3.5 mt-2 border-t border-[#F0F5F2] dark:border-[#0E352E]">
              <Link
                href={card.href}
                className="inline-flex items-center gap-1.5 text-[11.5px] font-bold text-[#159B72] dark:text-[#20D39B] hover:gap-2 transition-all"
              >
                <span>{card.linkText}</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
