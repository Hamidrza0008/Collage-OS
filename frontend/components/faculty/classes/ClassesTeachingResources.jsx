"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, FileText, Link2, ShieldCheck, ChevronRight } from "lucide-react";

export default function ClassesTeachingResources() {
  const resources = [
    {
      title: "Syllabus & Curriculum",
      icon: FileText,
      href: "/faculty/resources?tab=syllabus",
    },
    {
      title: "Previous Year Questions",
      icon: FileText,
      href: "/faculty/resources?tab=pyq",
    },
    {
      title: "Reference Materials",
      icon: Link2,
      href: "/faculty/resources?tab=references",
    },
    {
      title: "Department Guidelines",
      icon: ShieldCheck,
      href: "/faculty/resources?tab=guidelines",
    },
  ];

  return (
    <div className="rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] p-4 sm:p-5 shadow-xs">
      {/* Header */}
      <div className="pb-3 border-b border-[#F0F5F2] dark:border-[#0E352E]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#E6F7F0] dark:bg-[#073629] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center">
            <BookOpen className="w-4 h-4" />
          </div>
          <h2 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            Teaching Resources
          </h2>
        </div>
        <p className="text-[11px] text-[#658278] dark:text-[#789991] mt-1">
          Quick access to useful teaching materials.
        </p>
      </div>

      {/* Resource List */}
      <div className="divide-y divide-[#F0F5F2] dark:divide-[#0E352E] pt-1">
        {resources.map((res) => {
          const Icon = res.icon;
          return (
            <Link
              key={res.title}
              href={res.href}
              className="py-3 flex items-center justify-between gap-3 hover:bg-[#F7FBF9] dark:hover:bg-[#082A24]/60 px-2 rounded-xl transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#E6F7F0] dark:bg-[#073629] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-[#159B72] dark:group-hover:text-[#20D39B] transition-colors">
                  {res.title}
                </span>
              </div>

              <ChevronRight className="w-4 h-4 text-[#A7C8BD] group-hover:text-[#159B72] dark:group-hover:text-[#20D39B] group-hover:translate-x-0.5 transition-all shrink-0" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
