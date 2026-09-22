"use client";

import { useState, useEffect } from "react";
import { X, Send, CheckCircle2, User, Mail, FileText, Link as LinkIcon, Loader2 } from "lucide-react";
import CompanyLogo from "./CompanyLogo";

export default function ApplyRegisterModal({
  isOpen,
  onClose,
  opportunity,
  onSubmitSuccess,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "Hamid Rza",
    email: "hamidrza0008@gmail.com",
    degree: "B.Tech • 7th Sem (CSE)",
    resumeUrl: "https://drive.google.com/file/d/hamid_resume_2025/view",
    portfolioUrl: "https://hamid.dev",
    statement: "",
    teamSize: "1",
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !opportunity) return null;

  const isHackathon = opportunity.type === "hackathon";

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitSuccess(opportunity.id, isHackathon ? "registered" : "applied");
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg rounded-3xl bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#E8F1ED] dark:border-[#10372F] flex items-center justify-between bg-[#F7FBF9] dark:bg-[#082A24]">
          <div className="flex items-center gap-2.5">
            <CompanyLogo logoType={opportunity.logoType} className="w-8 h-8" />
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                {isHackathon ? "Register for Hackathon" : "Apply for Internship"}
              </h3>
              <p className="text-[11px] text-[#658278] dark:text-[#789991] truncate max-w-[280px]">
                {opportunity.title} &bull; {opportunity.company}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#658278] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-gray-100 dark:hover:bg-[#082A24]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-xs max-h-[80vh] overflow-y-auto">
          {/* Student Profile Quick Info */}
          <div className="p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6] flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#159B72]" />
                {formData.name}
              </span>
              <span className="text-[11px] text-[#087A5B] dark:text-[#20D39B] font-semibold">
                {formData.degree}
              </span>
            </div>
            <div className="text-[11px] text-[#658278] dark:text-[#789991] flex items-center gap-1">
              <Mail className="w-3 h-3 text-[#159B72]" />
              {formData.email}
            </div>
          </div>

          {/* Resume Link */}
          <div>
            <label className="block font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-1 flex items-center gap-1">
              <FileText className="w-3 h-3 text-[#159B72]" />
              Resume Link (Google Drive / Notion / Hosted PDF) *
            </label>
            <input
              type="url"
              required
              value={formData.resumeUrl}
              onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] text-[#0B3024] dark:text-[#F1FAF6] border border-[#D8E8E2] dark:border-[#16463D] focus:outline-none focus:border-[#159B72]"
            />
          </div>

          {/* Portfolio or GitHub */}
          <div>
            <label className="block font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-1 flex items-center gap-1">
              <LinkIcon className="w-3 h-3 text-[#159B72]" />
              Portfolio / GitHub Profile
            </label>
            <input
              type="url"
              value={formData.portfolioUrl}
              onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] text-[#0B3024] dark:text-[#F1FAF6] border border-[#D8E8E2] dark:border-[#16463D] focus:outline-none focus:border-[#159B72]"
            />
          </div>

          {/* If Hackathon: Team Size */}
          {isHackathon && (
            <div>
              <label className="block font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-1">
                Team Size
              </label>
              <select
                value={formData.teamSize}
                onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] text-[#0B3024] dark:text-[#F1FAF6] border border-[#D8E8E2] dark:border-[#16463D] focus:outline-none focus:border-[#159B72]"
              >
                <option value="1">Solo Hacker (1 member)</option>
                <option value="2">Duo (2 members)</option>
                <option value="3">Trio (3 members)</option>
                <option value="4">Full Squad (4 members)</option>
              </select>
            </div>
          )}

          {/* Short Statement */}
          <div>
            <label className="block font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-1">
              {isHackathon ? "Project Idea / Motivation" : "Brief Note / Relevant Experience"}
            </label>
            <textarea
              rows={2}
              placeholder={
                isHackathon
                  ? "Briefly describe what solution you plan to build or skills you bring..."
                  : "Highlight 1 or 2 projects relevant to this role..."
              }
              value={formData.statement}
              onChange={(e) => setFormData({ ...formData, statement: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] text-[#0B3024] dark:text-[#F1FAF6] border border-[#D8E8E2] dark:border-[#16463D] focus:outline-none focus:border-[#159B72]"
            />
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#E8F1ED] dark:border-[#10372F]">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 rounded-xl font-semibold text-[#55786B] dark:text-[#8FAFA4] hover:bg-gray-100 dark:hover:bg-[#082A24]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4.5 py-2 rounded-xl font-bold bg-[#159B72] hover:bg-[#087A5B] text-white flex items-center gap-1.5 shadow-xs cursor-pointer transition-all disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>{isHackathon ? "Confirm Registration" : "Submit Application"}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
