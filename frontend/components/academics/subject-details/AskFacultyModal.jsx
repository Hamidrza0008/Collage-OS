"use client";

import { useState } from "react";
import { X, MessageSquare, Send } from "lucide-react";

export default function AskFacultyModal({ isOpen, onClose, facultyName, subjectName, onSubmit }) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;
    onSubmit({ subject, message });
    setSubject("");
    setMessage("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-white dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl p-6 max-w-md w-full shadow-2xl animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-[#10372F]">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
              Ask {facultyName || "Faculty"}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#082A24] cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-[#5C786E] dark:text-[#8AA89F] mt-3 mb-4">
          Send a question to your {subjectName} faculty. They will reply via the College OS messaging system.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-[#0B3024] dark:text-[#E2F1EC] block mb-1">
              Subject / Topic
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g., Doubt in Unit 4 — Hashing"
              className="w-full px-3 py-2.5 text-xs rounded-xl border border-[#D8E8E2] dark:border-[#10372F] bg-gray-50 dark:bg-[#041D18] text-[#0B3024] dark:text-[#F1FAF6] placeholder:text-gray-400 dark:placeholder:text-[#5C786E] focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              required
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#0B3024] dark:text-[#E2F1EC] block mb-1">
              Your Question
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder="Describe your doubt or question in detail..."
              className="w-full px-3 py-2.5 text-xs rounded-xl border border-[#D8E8E2] dark:border-[#10372F] bg-gray-50 dark:bg-[#041D18] text-[#0B3024] dark:text-[#F1FAF6] placeholder:text-gray-400 dark:placeholder:text-[#5C786E] focus:outline-none focus:ring-2 focus:ring-emerald-500/30 resize-none"
              required
            />
          </div>
          <div className="flex items-center justify-end gap-2.5 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#082A24] cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 dark:bg-[#10B981] dark:text-[#021512] text-white cursor-pointer transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              Send Question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
