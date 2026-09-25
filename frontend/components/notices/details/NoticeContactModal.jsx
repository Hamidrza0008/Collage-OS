"use client";

import { useState } from "react";
import { X, Send, Building2, ShieldCheck } from "lucide-react";

export default function NoticeContactModal({ notice, isOpen, onClose, onSubmitSuccess }) {
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState(`Query regarding ${notice?.referenceNumber || "Notice"}`);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen || !notice) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      onSubmitSuccess({
        subject,
        message,
        department: notice.department,
      });
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-lg bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-7 overflow-hidden transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#E8F1ED] dark:border-[#10372F]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#DDF4EB] dark:bg-[#082A24] text-[#159B72] dark:text-[#20D39B]">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                Contact Department
              </h3>
              <p className="text-xs text-[#658278] dark:text-[#789991]">
                {notice.department || "Academic Office"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] mb-1">
              Subject Line:
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-[#F7FBF9] dark:bg-[#031A16] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden focus:border-[#159B72]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] mb-1">
              Your Inquiries or Question:
            </label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="State your question clearly with your Student Roll No and Course Code if applicable..."
              className="w-full px-3 py-2 text-xs rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#041D18] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden focus:border-[#159B72]"
              required
            />
          </div>

          <div className="p-3 rounded-xl border border-gray-100 dark:border-[#10372F] bg-gray-50/50 dark:bg-[#082A24]/40 flex items-center justify-between text-xs">
            <span className="text-[11px] text-[#658278] dark:text-[#789991]">
              Response will be sent to your registered student email:{" "}
              <strong className="text-[#0B3024] dark:text-[#F1FAF6]">student@collegeos.edu</strong>
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold border border-[#D8E8E2] dark:border-[#16463D] text-[#55786B] dark:text-[#8FAFA4] hover:bg-gray-50 dark:hover:bg-[#082A24] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-[#159B72] hover:bg-[#0F805D] text-white shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{submitting ? "Sending..." : "Send Message"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
