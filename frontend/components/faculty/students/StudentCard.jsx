"use client";

import React from "react";
import Image from "next/image";
import { FolderGit2, Heart, Check, Plus, MoreHorizontal } from "lucide-react";

export default function StudentCard({ student, onSelect, onToggleFollow }) {
  return (
    <div
      onClick={() => onSelect(student)}
      className="group bg-white dark:bg-[#06241F] rounded-2xl border border-[#E5ECE8] dark:border-[#10372F] p-4.5 sm:p-5 flex flex-col justify-between hover:border-[#159B72]/50 hover:shadow-md transition-all duration-200 cursor-pointer shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
    >
      <div className="space-y-3">
        {/* Top Header: Avatar + Status + Name + Details + Bio */}
        <div className="flex items-start gap-3">
          {/* Avatar with soft border */}
          <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-[#E5ECE8] dark:border-[#10372F] bg-gray-100 dark:bg-gray-800">
            <Image
              src={student.avatar}
              alt={student.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-200"
            />
          </div>

          {/* Student Info */}
          <div className="flex-1 min-w-0">
            {/* Status indicator */}
            <div className="flex items-center gap-1.5 mb-0.5">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  student.isOnline ? "bg-[#159B72]" : "bg-gray-400 dark:bg-gray-500"
                }`}
              />
              <span
                className={`text-[11px] font-medium ${
                  student.isOnline
                    ? "text-[#159B72]"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {student.status}
              </span>
            </div>

            {/* Name */}
            <h3 className="text-[14.5px] font-bold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-[#159B72] transition-colors leading-tight truncate">
              {student.name}
            </h3>

            {/* Roll & Branch info */}
            <p className="text-[11px] text-[#658278] dark:text-[#789991] mt-0.5 leading-tight truncate">
              Roll: {student.rollNo} • {student.branch} • {student.semester}
            </p>
          </div>
        </div>

        {/* Bio */}
        <p className="text-[11.5px] text-[#658278] dark:text-[#789991] leading-relaxed line-clamp-2 min-h-[34px]">
          {student.bio}
        </p>

        {/* Skills Pills Row */}
        <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
          {student.skills.slice(0, 4).map((skill, idx) => (
            <span
              key={idx}
              className="text-[10.5px] font-medium px-2 py-0.5 rounded-md bg-[#F1F6F4] dark:bg-[#073629] text-[#2F5245] dark:text-[#A8D5C4] border border-[#E5ECE8]/60 dark:border-transparent transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Footer: Projects + Likes + Follow Button + More Menu */}
      <div className="pt-3 mt-3 border-t border-[#E5ECE8]/70 dark:border-[#10372F] flex items-center justify-between gap-2">
        {/* Left Stats */}
        <div className="flex items-center gap-3 text-xs text-[#658278] dark:text-[#789991]">
          <span className="flex items-center gap-1" title="Projects">
            <FolderGit2 className="w-3.5 h-3.5 text-[#658278]" />
            <span className="font-medium text-[11.5px]">{student.projectsCount} Projects</span>
          </span>
          <span className="flex items-center gap-1" title="Likes">
            <Heart className="w-3.5 h-3.5 text-[#658278]" />
            <span className="font-medium text-[11.5px]">{student.likesCount}</span>
          </span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFollow(student.id);
            }}
            className={`px-2.5 py-1 text-xs rounded-lg font-medium flex items-center gap-1 transition-all cursor-pointer ${
              student.isFollowing
                ? "bg-[#E8F7F0] dark:bg-[#073629] text-[#159B72] border border-[#159B72]/30 hover:bg-[#D5EFE4]"
                : "bg-gray-100 dark:bg-[#0C3229] hover:bg-gray-200 dark:hover:bg-[#143E33] text-[#0B3024] dark:text-[#F1FAF6]"
            }`}
          >
            {student.isFollowing ? (
              <>
                <Check className="w-3 h-3 stroke-[2.5]" />
                <span>Following</span>
              </>
            ) : (
              <>
                <Plus className="w-3 h-3 stroke-[2.5]" />
                <span>Follow</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(student);
            }}
            title="More Options"
            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-[#082A24] transition-colors cursor-pointer"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
