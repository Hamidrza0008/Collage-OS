"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  Mail,
  Github,
  Linkedin,
  FolderGit2,
  Heart,
  Award,
  CheckCircle2,
  Calendar,
  Send,
  Check,
  Plus,
} from "lucide-react";

export default function StudentProfileModal({
  isOpen,
  student,
  onClose,
  onToggleFollow,
}) {
  const [messageText, setMessageText] = useState("");
  const [sentMessage, setSentMessage] = useState(false);

  if (!isOpen || !student) return null;

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    setSentMessage(true);
    setTimeout(() => {
      setMessageText("");
      setSentMessage(false);
    }, 2500);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl bg-white dark:bg-[#06241F] rounded-2xl border border-[#E5ECE8] dark:border-[#10372F] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header with avatar banner */}
        <div className="relative bg-gradient-to-r from-[#042A20] to-[#0A3D30] p-6 text-white shrink-0">
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center backdrop-blur-xs transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/80 shrink-0 bg-gray-200">
              <Image
                src={student.avatar}
                alt={student.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white truncate">
                  {student.name}
                </h2>
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                    student.isOnline
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/40"
                      : "bg-gray-500/20 text-gray-300 border border-gray-400/40"
                  }`}
                >
                  {student.status}
                </span>
              </div>
              <p className="text-xs text-emerald-100/90 mt-0.5">
                Roll: {student.rollNo} • {student.branch} • {student.semester}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 scrollbar-thin">
          {/* Quick Academic Metrics */}
          <div className="grid grid-cols-3 gap-3 p-3 bg-gray-50/70 dark:bg-[#072C24]/50 rounded-xl border border-[#E5ECE8] dark:border-[#10372F] text-center">
            <div>
              <p className="text-[11px] text-[#658278] dark:text-[#789991]">CGPA</p>
              <p className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                {student.cgpa || "9.0"}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-[#658278] dark:text-[#789991]">Attendance</p>
              <p className="text-base font-bold text-[#159B72]">
                {student.attendance || "94%"}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-[#658278] dark:text-[#789991]">Projects</p>
              <p className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                {student.projectsCount}
              </p>
            </div>
          </div>

          {/* Bio */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#658278] dark:text-[#789991] mb-1.5">
              About
            </h4>
            <p className="text-xs text-[#0B3024] dark:text-[#F1FAF6] leading-relaxed">
              {student.bio}
            </p>
          </div>

          {/* Skills */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#658278] dark:text-[#789991] mb-2">
              Technical Skills
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {student.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="text-xs font-medium px-2.5 py-1 rounded-lg bg-[#E8F7F0] dark:bg-[#073629] text-[#159B72] border border-[#159B72]/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Featured Project */}
          {student.topProject && (
            <div className="p-3.5 rounded-xl border border-[#E5ECE8] dark:border-[#10372F] bg-white dark:bg-[#06241F] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#E8F7F0] text-[#159B72] flex items-center justify-center shrink-0">
                  <FolderGit2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] text-[#658278] dark:text-[#789991]">Top Project</p>
                  <p className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                    {student.topProject}
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold text-[#159B72]">View Code →</span>
            </div>
          )}

          {/* Quick Message Form */}
          <form onSubmit={handleSendMessage} className="space-y-2 pt-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#658278] dark:text-[#789991]">
              Send Faculty Feedback
            </h4>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Type a message to this student..."
                className="flex-1 px-3 py-2 text-xs rounded-xl border border-[#E5ECE8] dark:border-[#10372F] bg-white dark:bg-[#06241F] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-none focus:border-[#159B72]"
              />
              <button
                type="submit"
                disabled={!messageText.trim() || sentMessage}
                className="px-3.5 py-2 rounded-xl bg-[#159B72] hover:bg-[#11805D] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
              >
                {sentMessage ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Sent!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-[#E5ECE8] dark:border-[#10372F] bg-gray-50/50 dark:bg-[#05211B]">
          <div className="flex items-center gap-3 text-xs text-[#658278]">
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" />
              <span>{student.email}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFollow(student.id)}
              className={`px-3 py-1.5 text-xs rounded-lg font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                student.isFollowing
                  ? "bg-[#E8F7F0] dark:bg-[#073629] text-[#159B72] border border-[#159B72]/30"
                  : "bg-[#159B72] hover:bg-[#11805D] text-white"
              }`}
            >
              {student.isFollowing ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Following</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Follow</span>
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg border border-[#D8E6E0] dark:border-[#143E33] text-xs font-medium text-[#658278] hover:text-[#0B3024] transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
