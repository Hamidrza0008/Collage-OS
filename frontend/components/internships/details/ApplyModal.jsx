"use client";

import { useState } from "react";
import { X, Send, FileText, CheckCircle2, ShieldCheck, AlertCircle, Link as LinkIcon, Globe } from "lucide-react";
import CompanyLogo from "../CompanyLogo";

function GithubIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={`fill-current ${className}`} viewBox="0 0 24 24">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export default function ApplyModal({ opportunity, isOpen, onClose, onSubmit, onSubmitSuccess }) {
  const [resumeName, setResumeName] = useState("Hamid_Rza_Resume_2025.pdf");
  const [portfolioUrl, setPortfolioUrl] = useState("https://hamidrza.dev");
  const [githubUrl, setGithubUrl] = useState("https://github.com/hamidrza0008");
  const [linkedinUrl, setLinkedinUrl] = useState("https://linkedin.com/in/hamidrza");
  const [coverNote, setCoverNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  if (!isOpen || !opportunity) return null;

  const validate = () => {
    const errs = {};
    if (!resumeName) {
      errs.resume = "Resume is required.";
    }
    if (coverNote.trim().length < 20) {
      errs.coverNote = "Cover note must be at least 20 characters explaining your interest.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      const applicationData = {
        applicationId: `APP-2025-${Math.floor(1000 + Math.random() * 9000)}`,
        submittedAt: new Date().toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        opportunityTitle: opportunity.title,
        company: opportunity.company,
        resume: resumeName,
        status: "Application Submitted",
        nextStep: "Resume Screening by Hiring Team",
      };
      (onSubmit || onSubmitSuccess)?.(applicationData);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div
        className="relative w-full max-w-xl bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-7 overflow-hidden my-6 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E8F1ED] dark:border-[#10372F]">
          <div className="flex items-center gap-3 min-w-0">
            <CompanyLogo logoType={opportunity.logoType} className="w-9 h-9" />
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] truncate">
                Apply for {opportunity.company}
              </h3>
              <p className="text-[11px] text-[#658278] dark:text-[#789991] truncate">
                {opportunity.title} &bull; {opportunity.stipend}
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
          {/* Verified Student Details from Profile */}
          <div className="p-3 rounded-xl bg-gray-50/70 dark:bg-[#031A16] border border-[#E8F1ED] dark:border-[#10372F] flex items-center justify-between text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#658278] dark:text-[#789991] block">
                Applicant Information (From College Profile)
              </span>
              <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                Hamid Rza
              </span>
              <span className="text-[11px] text-[#658278] dark:text-[#789991] ml-2">
                (student@collegeos.edu &bull; B.Tech CSE 7th Sem)
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold shrink-0">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified</span>
            </div>
          </div>

          {/* Resume Upload / Selection */}
          <div>
            <label className="block text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] mb-1">
              Select or Upload Resume (PDF):
            </label>
            <div className="flex items-center justify-between p-3 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#041D18]">
              <div className="flex items-center gap-2.5 min-w-0">
                <FileText className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-mono font-medium text-[#0B3024] dark:text-[#F1FAF6] truncate">
                  {resumeName}
                </span>
                <span className="text-[10.5px] text-[#658278] dark:text-[#789991] shrink-0">
                  (Default)
                </span>
              </div>
              <button
                type="button"
                onClick={() => setResumeName("Hamid_Rza_Updated_CV_2025.pdf")}
                className="text-[11px] font-bold text-[#159B72] dark:text-[#20D39B] hover:underline cursor-pointer shrink-0"
              >
                Change
              </button>
            </div>
            {errors.resume && <p className="text-rose-600 text-xs mt-1">{errors.resume}</p>}
          </div>

          {/* Portfolio & Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] mb-1">
                Portfolio / Personal Website:
              </label>
              <div className="relative">
                <Globe className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="url"
                  value={portfolioUrl}
                  onChange={(e) => setPortfolioUrl(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#041D18] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden focus:border-[#159B72]"
                  placeholder="https://yourportfolio.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] mb-1">
                GitHub Profile URL:
              </label>
              <div className="relative">
                <GithubIcon className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="url"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#041D18] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden focus:border-[#159B72]"
                  placeholder="https://github.com/username"
                />
              </div>
            </div>
          </div>

          {/* Short Cover Note */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
                Brief Note to Hiring Team:
              </label>
              <span className="text-[10.5px] text-[#658278] dark:text-[#789991]">
                Min 20 characters
              </span>
            </div>
            <textarea
              rows={3}
              value={coverNote}
              onChange={(e) => setCoverNote(e.target.value)}
              placeholder="Highlight your strongest technical project and why you are excited for this specific role at Google..."
              className="w-full px-3 py-2 text-xs rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#041D18] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden focus:border-[#159B72]"
              required
            />
            {errors.coverNote && (
              <p className="text-rose-600 text-xs mt-1">{errors.coverNote}</p>
            )}
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
              className="px-5 py-2 rounded-xl text-xs font-bold bg-[#159B72] hover:bg-[#0F805D] text-white disabled:opacity-50 shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{submitting ? "Submitting Application..." : "Submit Application"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
