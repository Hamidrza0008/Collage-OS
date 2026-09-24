"use client";

import { useState, useEffect } from "react";
import { X, UserPlus, Send, CheckCircle2 } from "lucide-react";

export default function RequestJoinTeamModal({
  isOpen,
  onClose,
  projectTitle,
  onSubmit,
}) {
  const [role, setRole] = useState("Frontend Developer");
  const [motivation, setMotivation] = useState("");
  const [portfolioLink, setPortfolioLink] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!motivation.trim()) return;

    if (onSubmit) {
      onSubmit({ role, motivation, portfolioLink });
    }
    setMotivation("");
    setPortfolioLink("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-2xl p-5 sm:p-6 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E8F3EE] dark:border-[#10372F] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-[#0A2E27] text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <UserPlus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                Request to Join Team
              </h3>
              <p className="text-[11px] text-[#658278] dark:text-[#8BAEA3] truncate max-w-[240px]">
                {projectTitle || "Campus Project"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-[#658278] hover:text-[#0B3024] dark:hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block text-[11px] font-medium text-[#658278] dark:text-[#8BAEA3] mb-1">
              Select Your Intended Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-[#F7FBF9] dark:bg-[#082A24] text-[#0B3024] dark:text-[#F1FAF6] outline-none"
            >
              <option value="Frontend Developer">Frontend Developer (React / Next.js)</option>
              <option value="Backend Engineer">Backend Engineer (Node / Express / Mongo)</option>
              <option value="UI/UX Designer">UI/UX Designer (Figma / Prototype)</option>
              <option value="AI / ML Engineer">AI / ML Engineer (Python / LangChain)</option>
              <option value="Mobile Developer">Mobile Developer (React Native / Flutter)</option>
              <option value="QA / Tester">QA / Testing &amp; Documentation</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-[#658278] dark:text-[#8BAEA3] mb-1">
              Why do you want to join this project? <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={4}
              required
              value={motivation}
              onChange={(e) => setMotivation(e.target.value)}
              placeholder="Describe your tech background, relevant projects you've built, and how many hours per week you can contribute..."
              className="w-full px-3 py-2 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-[#F7FBF9] dark:bg-[#082A24] text-[#0B3024] dark:text-[#F1FAF6] outline-none resize-none placeholder:text-[#658278]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-[#658278] dark:text-[#8BAEA3] mb-1">
              GitHub or Portfolio URL (Optional)
            </label>
            <input
              type="url"
              value={portfolioLink}
              onChange={(e) => setPortfolioLink(e.target.value)}
              placeholder="https://github.com/your-username"
              className="w-full px-3 py-2 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-[#F7FBF9] dark:bg-[#082A24] text-[#0B3024] dark:text-[#F1FAF6] outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E8F3EE] dark:border-[#10372F]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#658278] hover:bg-gray-100 dark:hover:bg-[#082A24] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-[#159B72] hover:bg-[#0E825E] text-white flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <span>Send Request</span>
              <Send className="w-3 h-3" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
