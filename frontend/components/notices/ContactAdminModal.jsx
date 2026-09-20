"use client";

import { useState } from "react";
import { X, MessageSquare, CheckCircle2 } from "lucide-react";
import { DEPARTMENTS_LIST } from "./noticesData";

export default function ContactAdminModal({ isOpen, onClose, onSubmitSuccess }) {
  const [department, setDepartment] = useState("Administration");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject || !message) return;

    setIsSuccess(true);
    setTimeout(() => {
      if (onSubmitSuccess) {
        onSubmitSuccess({ department, subject, message });
      }
      setIsSuccess(false);
      setSubject("");
      setMessage("");
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl max-w-md w-full shadow-2xl p-6 my-8 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-[#10372F]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] leading-snug">
                Contact Administration
              </h3>
              <p className="text-[11px] text-[#5C786E] dark:text-[#8AA89F]">
                Direct inquiry to campus department or notice publisher
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {isSuccess ? (
          <div className="py-8 flex flex-col items-center justify-center text-center space-y-2">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400 animate-bounce" />
            <h4 className="text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
              Inquiry Sent Successfully!
            </h4>
            <p className="text-xs text-[#5C786E] dark:text-[#8AA89F]">
              The {department} office will respond to your registered student email within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="py-4 space-y-3.5 text-xs">
            <div>
              <label className="block text-[11px] font-bold text-[#0B3024] dark:text-[#E2F1EC] mb-1">
                Target Department
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#D8E8E2] dark:border-[#10372F] bg-gray-50/50 dark:bg-[#041D18] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden font-medium"
              >
                {DEPARTMENTS_LIST.filter((d) => d !== "All Departments").map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#0B3024] dark:text-[#E2F1EC] mb-1">
                Subject
              </label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Question regarding Mid-Sem schedule"
                className="w-full p-2.5 rounded-xl border border-[#D8E8E2] dark:border-[#10372F] bg-gray-50/50 dark:bg-[#041D18] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#0B3024] dark:text-[#E2F1EC] mb-1">
                Message / Details
              </label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Please describe your query with student roll number..."
                className="w-full p-2.5 rounded-xl border border-[#D8E8E2] dark:border-[#10372F] bg-gray-50/50 dark:bg-[#041D18] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden leading-relaxed"
              />
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-gray-100 dark:border-[#10372F]">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#082A24] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white dark:bg-[#10B981] dark:text-[#021512] transition-colors cursor-pointer"
              >
                Send Message
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
