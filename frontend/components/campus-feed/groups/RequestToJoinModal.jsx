"use client";

import { useState } from "react";
import { X, UserPlus, Send, CheckCircle2 } from "lucide-react";

export default function RequestToJoinModal({
  isOpen,
  onClose,
  group,
  onRequestSubmit,
}) {
  const [statement, setStatement] = useState("");
  const [skills, setSkills] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !group) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!statement.trim() || !agreed) return;

    setSubmitted(true);
    setTimeout(() => {
      onRequestSubmit(group.id, { statement, skills });
      setSubmitted(false);
      setStatement("");
      setSkills("");
      setAgreed(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] shadow-2xl p-5 sm:p-6 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#D8E8E2] dark:border-[#10372F]">
          <div className="flex items-center gap-2 text-[#159B72] dark:text-[#20D39B]">
            <UserPlus className="w-5 h-5" />
            <h3 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
              Request to Join {group.shortName || group.name}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-[#658278] hover:text-[#0B3024] dark:hover:text-white cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center flex flex-col items-center space-y-2 animate-in zoom-in-95 duration-150">
            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
            <h4 className="text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
              Membership Request Sent!
            </h4>
            <p className="text-xs text-[#658278] dark:text-[#789991] max-w-xs">
              The community organizers have received your note and will review your request.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
            <p className="text-xs text-[#4A685D] dark:text-[#8BAAA0] leading-relaxed">
              This community requires a brief statement to verify alignment with current ongoing project tracks.
            </p>

            <div>
              <label className="text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] block mb-1">
                Why would you like to join? *
              </label>
              <textarea
                required
                rows={3}
                value={statement}
                onChange={(e) => setStatement(e.target.value)}
                placeholder="Mention your motivation, technical interest, or past projects..."
                className="w-full p-2.5 text-xs rounded-xl bg-[#F7FBF9] dark:bg-[#031A16] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] placeholder-[#658278] focus:outline-none focus:ring-1 focus:ring-[#159B72]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] block mb-1">
                Relevant Skills or Tools (optional)
              </label>
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="e.g. Arduino, C++, OpenCV, 3D Modeling"
                className="w-full px-3 py-2 text-xs rounded-xl bg-[#F7FBF9] dark:bg-[#031A16] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] placeholder-[#658278] focus:outline-none focus:ring-1 focus:ring-[#159B72]"
              />
            </div>

            <label className="flex items-start gap-2 pt-1 text-xs text-[#4A685D] dark:text-[#8BAAA0] cursor-pointer">
              <input
                type="checkbox"
                required
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="rounded text-[#159B72] focus:ring-[#159B72] mt-0.5"
              />
              <span>
                I agree to adhere to the community guidelines, lab safety rules, and active participation expectations.
              </span>
            </label>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E8F1ED] dark:border-[#10372F]">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-1.5 text-xs text-[#658278] dark:text-[#789991] hover:text-[#0B3024] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!statement.trim() || !agreed}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-xl bg-[#159B72] dark:bg-[#20D39B] text-white dark:text-[#021512] disabled:opacity-40 cursor-pointer shadow-xs active:scale-95"
              >
                <span>Send Request</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
