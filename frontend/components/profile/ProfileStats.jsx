"use client";

import { Calendar, GraduationCap, Box } from "lucide-react";

export default function ProfileStats({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {/* Attendance Card */}
      <div className="bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] rounded-2xl p-3.5 shadow-2xs flex flex-col justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#DDF3EB] dark:bg-[#123F35] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center shrink-0">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] font-medium text-[#658278] dark:text-[#789991] block">
              Attendance
            </span>
            <span className="text-base sm:text-lg font-bold text-[#0B3024] dark:text-[#F1FAF6] leading-tight">
              {stats?.attendance?.percentage}%
            </span>
          </div>
        </div>

        <div className="mt-2.5">
          <div className="flex justify-between items-center text-[10px] text-[#658278] dark:text-[#789991] mb-1">
            <span>{stats?.attendance?.details}</span>
          </div>
          <div className="w-full h-1.5 bg-[#E8F1ED] dark:bg-[#10372F] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#159B72] dark:bg-[#20D39B] rounded-full transition-all duration-500"
              style={{ width: `${stats?.attendance?.percentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* CGPA Card */}
      <div className="bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] rounded-2xl p-3.5 shadow-2xs flex flex-col justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#DDF3EB] dark:bg-[#123F35] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center shrink-0">
            <GraduationCap className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] font-medium text-[#658278] dark:text-[#789991] block">
              CGPA
            </span>
            <span className="text-base sm:text-lg font-bold text-[#0B3024] dark:text-[#F1FAF6] leading-tight">
              {stats?.cgpa?.value}
            </span>
          </div>
        </div>

        <div className="mt-2.5 text-[10.5px] font-medium text-[#658278] dark:text-[#789991]">
          {stats?.cgpa?.details}
        </div>
      </div>

      {/* Total Credits Card */}
      <div className="bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] rounded-2xl p-3.5 shadow-2xs flex flex-col justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#DDF3EB] dark:bg-[#123F35] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center shrink-0">
            <Box className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] font-medium text-[#658278] dark:text-[#789991] block">
              Total Credits
            </span>
            <span className="text-base sm:text-lg font-bold text-[#0B3024] dark:text-[#F1FAF6] leading-tight">
              {stats?.credits?.value}
            </span>
          </div>
        </div>

        <div className="mt-2.5 text-[10.5px] font-medium text-[#159B72] dark:text-[#20D39B]">
          {stats?.credits?.details}
        </div>
      </div>
    </div>
  );
}
