"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, Users, UserCheck, UserPlus } from "lucide-react";

const SAMPLE_STUDENTS = [
  {
    id: "st-1",
    name: "Vikram Joshi",
    branch: "B.Tech • CSE 7th Sem",
    avatar: "/assets/layout/profile-avatar.jpg",
    isFollowing: true,
  },
  {
    id: "st-2",
    name: "Priya Nair",
    branch: "B.Tech • IT 5th Sem",
    avatar: "/assets/profile/avatar.jpg",
    isFollowing: false,
  },
  {
    id: "st-3",
    name: "Karan Singh",
    branch: "B.Tech • AI & DS 7th Sem",
    avatar: "/assets/layout/profile-avatar.jpg",
    isFollowing: true,
  },
  {
    id: "st-4",
    name: "Ananya Roy",
    branch: "B.Tech • ECE 7th Sem",
    avatar: "/assets/profile/avatar.jpg",
    isFollowing: false,
  },
  {
    id: "st-5",
    name: "Rohit Verma",
    branch: "B.Tech • CSE 5th Sem",
    avatar: "/assets/layout/profile-avatar.jpg",
    isFollowing: true,
  },
];

export default function FollowersModal({ isOpen, onClose, type = "followers" }) {
  const [students, setStudents] = useState(SAMPLE_STUDENTS);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleFollow = (id) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isFollowing: !s.isFollowing } : s))
    );
  };

  const title = type === "following" ? "Following" : "Followers";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#E8F1ED] dark:border-[#10372F] flex items-center justify-between bg-[#F7FBF9] dark:bg-[#082A24]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-[#159B72] dark:text-[#20D39B] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                {title}
              </h3>
              <p className="text-[11px] text-[#658278] dark:text-[#789991]">
                {students.length} students in campus network
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#658278] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Students List */}
        <div className="p-3 divide-y divide-[#E8F1ED] dark:divide-[#10372F] max-h-[360px] overflow-y-auto">
          {students.map((student) => (
            <div
              key={student.id}
              className="py-2.5 px-2 flex items-center justify-between gap-3 hover:bg-[#F7FBF9] dark:hover:bg-[#082A24] rounded-xl transition-colors"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#D8E8E2] dark:border-[#16463D] shrink-0">
                  <Image
                    src={student.avatar}
                    alt={student.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] truncate leading-tight">
                    {student.name}
                  </h4>
                  <p className="text-[11px] text-[#658278] dark:text-[#789991] truncate mt-0.5">
                    {student.branch}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => toggleFollow(student.id)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                  student.isFollowing
                    ? "bg-[#DDF3EB] dark:bg-[#0A3029] text-[#159B72] dark:text-[#20D39B] border border-[#159B72]/30"
                    : "bg-[#159B72] hover:bg-[#087A5B] text-white shadow-xs"
                }`}
              >
                {student.isFollowing ? (
                  <>
                    <UserCheck className="w-3 h-3" />
                    <span>Following</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-3 h-3" />
                    <span>Follow</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
