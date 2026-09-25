"use client";

import { useState } from "react";
import { X, Send, MessageSquare } from "lucide-react";

export default function AskFacultyModal({ isOpen, onClose, facultyName, subject, onSubmitQuestion }) {
  const [questionSubject, setQuestionSubject] = useState(subject || "Web Development");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitQuestion({ subject: questionSubject, message });
      setMessage("");
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl max-w-md w-full shadow-2xl p-5 sm:p-6 my-8 animate-in zoom-in-95 duration-150 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-[#E8F1ED] dark:border-[#10372F]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-[#20D39B] flex items-center justify-center shrink-0">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
                Ask Subject Faculty
              </h3>
              <p className="text-[11px] text-[#5C786E] dark:text-[#8AA89F]">
                Send a question directly to {facultyName || "Dr. Priya Sharma"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="font-bold text-[#0B3024] dark:text-[#F1FAF6] block mb-1">
              Course / Subject
            </label>
            <input
              type="text"
              value={questionSubject}
              onChange={(e) => setQuestionSubject(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#F8FAF9] dark:bg-[#041D18] border border-[#D8E8E2] dark:border-[#10372F] text-[#0B3024] dark:text-[#F1FAF6] font-medium focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="font-bold text-[#0B3024] dark:text-[#F1FAF6] block mb-1">
              Your Question or Clarification <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={4}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your question regarding requirements, submission formats, or technical guidelines..."
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#041D18] border border-[#D8E8E2] dark:border-[#10372F] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-none focus:border-emerald-500 leading-relaxed"
            />
          </div>

          <p className="text-[11px] text-[#658278] dark:text-[#789991]">
            Faculty responses are typically answered during official departmental office hours.
          </p>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E8F1ED] dark:border-[#10372F]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl font-semibold text-[#55786B] dark:text-[#8AA89F] hover:bg-gray-100 dark:hover:bg-[#082A24] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !message.trim()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white dark:bg-[#159B72] dark:hover:bg-[#108360] dark:text-[#021512] font-bold shadow-xs transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? "Sending..." : "Send Question"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
