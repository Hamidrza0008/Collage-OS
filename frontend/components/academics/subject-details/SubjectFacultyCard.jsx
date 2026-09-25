"use client";

import { Mail, Phone, MapPin, Clock, MessageSquare } from "lucide-react";

export default function SubjectFacultyCard({ faculty, onAskFaculty }) {
  return (
    <div className="w-full bg-white dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-5">
      <h2 className="text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight mb-3">
        Subject Faculty
      </h2>

      {/* Faculty identity */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center shrink-0">
          <span className="text-lg font-black text-emerald-700 dark:text-emerald-300">
            {faculty.name.charAt(0)}
          </span>
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6] leading-snug">
            {faculty.name}
          </p>
          <p className="text-xs text-[#5C786E] dark:text-[#8AA89F]">{faculty.designation}</p>
          <p className="text-xs text-[#8AA89F] dark:text-[#5C786E]">{faculty.department}</p>
        </div>
      </div>

      {/* Contact details */}
      <div className="space-y-2 mb-4">
        <a
          href={"mailto:" + faculty.email}
          className="flex items-center gap-2.5 text-xs text-[#3B5E52] dark:text-[#C0D8D0] hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
        >
          <Mail className="w-3.5 h-3.5 text-[#5C786E] dark:text-[#8AA89F] shrink-0" />
          <span className="truncate">{faculty.email}</span>
        </a>
        <div className="flex items-center gap-2.5 text-xs text-[#3B5E52] dark:text-[#C0D8D0]">
          <Phone className="w-3.5 h-3.5 text-[#5C786E] dark:text-[#8AA89F] shrink-0" />
          <span>{faculty.phone}</span>
        </div>
        <div className="flex items-center gap-2.5 text-xs text-[#3B5E52] dark:text-[#C0D8D0]">
          <MapPin className="w-3.5 h-3.5 text-[#5C786E] dark:text-[#8AA89F] shrink-0" />
          <span>{faculty.officeRoom}</span>
        </div>
      </div>

      {/* Office hours */}
      <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#041D18] border border-[#D8E8E2] dark:border-[#10372F] mb-3">
        <div className="flex items-center gap-1.5 mb-2">
          <Clock className="w-3.5 h-3.5 text-[#5C786E] dark:text-[#8AA89F]" />
          <span className="text-[11px] font-bold text-[#5C786E] dark:text-[#8AA89F] uppercase tracking-wide">
            Office Hours
          </span>
        </div>
        <div className="space-y-1">
          {faculty.officeHours.map((oh, i) => (
            <div key={i} className="flex items-center justify-between text-xs">
              <span className="text-[#5C786E] dark:text-[#8AA89F]">{oh.day}</span>
              <span className="font-semibold text-[#0B3024] dark:text-[#E2F1EC]">{oh.time}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={onAskFaculty}
        className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-emerald-700 dark:bg-[#10B981] text-white dark:text-[#021512] text-xs font-bold hover:bg-emerald-800 dark:hover:bg-emerald-400 transition-colors cursor-pointer"
      >
        <MessageSquare className="w-3.5 h-3.5" />
        Ask Faculty a Question
      </button>
    </div>
  );
}
