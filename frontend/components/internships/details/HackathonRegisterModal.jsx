"use client";

import { useState } from "react";
import { X, Trophy, Users, User, CheckCircle2, Plus } from "lucide-react";
import CompanyLogo from "../CompanyLogo";

export default function HackathonRegisterModal({ opportunity, isOpen, onClose, onSubmit, onSubmitSuccess }) {
  const [participationMode, setParticipationMode] = useState("team"); // "individual" | "team"
  const [teamName, setTeamName] = useState("BinaryBuilders");
  const [memberInput, setMemberInput] = useState("");
  const [teamMembers, setTeamMembers] = useState(["Hamid Rza (Leader)", "Sara Khan", "Karan Singh"]);
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen || !opportunity) return null;

  const handleAddMember = () => {
    if (memberInput.trim() && teamMembers.length < 4) {
      setTeamMembers([...teamMembers, memberInput.trim()]);
      setMemberInput("");
    }
  };

  const handleRemoveMember = (idx) => {
    if (idx === 0) return; // Prevent removing leader
    setTeamMembers(teamMembers.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreed) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      const registrationData = {
        applicationId: `HACK-2025-${Math.floor(1000 + Math.random() * 9000)}`,
        submittedAt: new Date().toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        opportunityTitle: opportunity.title,
        company: opportunity.company,
        teamName: participationMode === "team" ? teamName : "Solo Participant (Hamid Rza)",
        members: participationMode === "team" ? teamMembers : ["Hamid Rza"],
        status: "Registration Confirmed",
        nextStep: "Join Discord Channel & Review Starter Kit",
      };
      (onSubmit || onSubmitSuccess)?.(registrationData);
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
            <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300">
              <Trophy className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] truncate">
                Register for {opportunity.title}
              </h3>
              <p className="text-[11px] text-[#658278] dark:text-[#789991] truncate">
                {opportunity.company} &bull; {opportunity.prizePool || opportunity.stipend}
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
          {/* Mode Switcher */}
          <div>
            <label className="block text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] mb-1.5">
              Participation Mode:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setParticipationMode("team")}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  participationMode === "team"
                    ? "bg-[#DDF4EB] dark:bg-[#082A24] text-[#159B72] dark:text-[#20D39B] border-[#159B72]"
                    : "border-[#D8E8E2] dark:border-[#16463D] text-[#55786B] dark:text-[#8FAFA4]"
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Team (2–4 Members)</span>
              </button>

              <button
                type="button"
                onClick={() => setParticipationMode("individual")}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  participationMode === "individual"
                    ? "bg-[#DDF4EB] dark:bg-[#082A24] text-[#159B72] dark:text-[#20D39B] border-[#159B72]"
                    : "border-[#D8E8E2] dark:border-[#16463D] text-[#55786B] dark:text-[#8FAFA4]"
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Individual (Solo)</span>
              </button>
            </div>
          </div>

          {/* Team Fields */}
          {participationMode === "team" && (
            <div className="space-y-3.5 p-3.5 rounded-2xl bg-gray-50/60 dark:bg-[#031A16] border border-[#E8F1ED] dark:border-[#10372F]">
              <div>
                <label className="block text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] mb-1">
                  Team Name:
                </label>
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#041D18] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden focus:border-[#159B72]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] mb-1">
                  Add Teammates (Max 4):
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={memberInput}
                    onChange={(e) => setMemberInput(e.target.value)}
                    placeholder="Enter student name or roll number..."
                    className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#041D18] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden focus:border-[#159B72]"
                  />
                  <button
                    type="button"
                    onClick={handleAddMember}
                    disabled={teamMembers.length >= 4}
                    className="px-3 py-1.5 rounded-xl bg-[#159B72] hover:bg-[#0F805D] text-white text-xs font-bold disabled:opacity-40 flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>

                {/* Team member chips */}
                <div className="flex flex-wrap gap-1.5">
                  {teamMembers.map((member, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-white dark:bg-[#06241F] text-[#0B3024] dark:text-[#F1FAF6] border border-[#D8E8E2] dark:border-[#16463D]"
                    >
                      <span>{member}</span>
                      {idx !== 0 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveMember(idx)}
                          className="text-gray-400 hover:text-rose-500 cursor-pointer ml-0.5"
                        >
                          &times;
                        </button>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Agreement Checkbox */}
          <label className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              required
              className="mt-0.5 rounded border-amber-400 text-amber-600 focus:ring-amber-500 cursor-pointer"
            />
            <span className="text-xs font-medium text-[#0B3024] dark:text-[#E2F1EC] leading-relaxed">
              I agree to the official {opportunity.title} rulebook, submission deadlines, and intellectual property code of conduct.
            </span>
          </label>

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
              disabled={!agreed || submitting}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-[#159B72] hover:bg-[#0F805D] text-white disabled:opacity-50 shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{submitting ? "Registering..." : "Confirm Registration"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
