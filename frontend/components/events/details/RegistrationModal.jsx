"use client";

import { useState } from "react";
import { X, Users, User, CheckCircle2, AlertCircle, Plus, Trash2, ArrowRight } from "lucide-react";

export default function RegistrationModal({
  isOpen,
  onClose,
  event,
  onSubmitRegistration,
}) {
  const isTeamDefault = event?.participation?.toLowerCase().includes("team");

  const [name, setName] = useState("Hamid Rza");
  const [email, setEmail] = useState("hamid.rza@college.edu");
  const [branch, setBranch] = useState("CSE");
  const [semester, setSemester] = useState("7th Sem");
  const [participationType, setParticipationType] = useState(
    isTeamDefault ? "team" : "individual"
  );
  const [teamName, setTeamName] = useState("");
  const [memberInput, setMemberInput] = useState("");
  const [teamMembers, setTeamMembers] = useState(["Sneha Patel (1MS22CS092)"]);
  const [phone, setPhone] = useState("+91 98765 12345");
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !event) return null;

  const handleAddMember = () => {
    if (!memberInput.trim()) return;
    if (teamMembers.length >= 3) {
      setErrors((prev) => ({ ...prev, members: "Maximum 4 members allowed per team." }));
      return;
    }
    setTeamMembers((prev) => [...prev, memberInput.trim()]);
    setMemberInput("");
    setErrors((prev) => ({ ...prev, members: null }));
  };

  const handleRemoveMember = (idx) => {
    setTeamMembers((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Full name is required.";
    if (!email.trim()) newErrors.email = "College email is required.";
    if (participationType === "team" && !teamName.trim()) {
      newErrors.teamName = "Please enter a team name.";
    }
    if (!agreed) {
      newErrors.agreed = "You must agree to the event guidelines to register.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const generatedId = `EVT-2025-${Math.floor(10000 + Math.random() * 90000)}`;
      onSubmitRegistration({
        registrationId: generatedId,
        name,
        email,
        branch,
        semester,
        participationType,
        teamName: participationType === "team" ? teamName : null,
        teamMembers: participationType === "team" ? [name, ...teamMembers] : [name],
        phone,
      });
      onClose();
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-3xl max-w-lg w-full shadow-2xl p-5 sm:p-6 my-8 animate-in zoom-in-95 duration-150 space-y-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-[#E8F1ED] dark:border-[#10372F]">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-700 dark:text-[#20D39B]">
              Event Registration
            </span>
            <h3 className="text-base sm:text-lg font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
              {event.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {/* Participation Toggle */}
          <div>
            <label className="font-bold text-[#0B3024] dark:text-[#F1FAF6] block mb-1.5">
              Participation Mode
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setParticipationType("individual")}
                className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border font-bold text-xs transition-all cursor-pointer ${
                  participationType === "individual"
                    ? "bg-emerald-50 dark:bg-[#06241F] text-emerald-800 dark:text-[#20D39B] border-emerald-300 dark:border-emerald-700"
                    : "bg-[#F8FAF9] dark:bg-[#041D18] text-[#55786B] dark:text-[#8FAFA4] border-[#D8E8E2] dark:border-[#10372F]"
                }`}
              >
                <User className="w-4 h-4" />
                <span>Individual</span>
              </button>

              <button
                type="button"
                onClick={() => setParticipationType("team")}
                className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border font-bold text-xs transition-all cursor-pointer ${
                  participationType === "team"
                    ? "bg-emerald-50 dark:bg-[#06241F] text-emerald-800 dark:text-[#20D39B] border-emerald-300 dark:border-emerald-700"
                    : "bg-[#F8FAF9] dark:bg-[#041D18] text-[#55786B] dark:text-[#8FAFA4] border-[#D8E8E2] dark:border-[#10372F]"
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Team (2–4 members)</span>
              </button>
            </div>
          </div>

          {/* If Team Mode */}
          {participationType === "team" && (
            <div className="p-3.5 rounded-2xl bg-emerald-50/50 dark:bg-[#041D18] border border-emerald-200/80 dark:border-[#10372F] space-y-3">
              <div>
                <label className="font-bold text-[#0B3024] dark:text-[#F1FAF6] block mb-1">
                  Team Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => {
                    setTeamName(e.target.value);
                    if (errors.teamName) setErrors((prev) => ({ ...prev, teamName: null }));
                  }}
                  placeholder="e.g. ByteBrigade, NeuralNinjas"
                  className={`w-full px-3 py-2 rounded-xl bg-white dark:bg-[#021512] border text-[#0B3024] dark:text-[#F1FAF6] text-xs focus:outline-none ${
                    errors.teamName ? "border-rose-400" : "border-[#D8E8E2] dark:border-[#16463D]"
                  }`}
                />
                {errors.teamName && (
                  <p className="text-[11px] text-rose-600 dark:text-rose-400 mt-1">
                    {errors.teamName}
                  </p>
                )}
              </div>

              {/* Add Teammates */}
              <div>
                <label className="font-bold text-[#0B3024] dark:text-[#F1FAF6] block mb-1">
                  Team Members (Lead: {name})
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={memberInput}
                    onChange={(e) => setMemberInput(e.target.value)}
                    placeholder="Enter teammate name or USN..."
                    className="flex-1 px-3 py-1.5 rounded-xl bg-white dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] text-xs focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddMember}
                    className="px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs cursor-pointer flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>

                {errors.members && (
                  <p className="text-[11px] text-rose-600 dark:text-rose-400 mb-1.5">
                    {errors.members}
                  </p>
                )}

                {/* Teammates Chips */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-[#021512] border border-gray-100 dark:border-[#10372F] text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
                    <span>{name} (You — Team Lead)</span>
                    <span className="text-[10px] text-emerald-600 font-bold uppercase">Lead</span>
                  </div>

                  {teamMembers.map((m, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-[#021512] border border-gray-100 dark:border-[#10372F] text-xs"
                    >
                      <span className="text-[#35574C] dark:text-[#C5DCD4]">{m}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveMember(idx)}
                        className="text-gray-400 hover:text-rose-500 cursor-pointer p-0.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Student Info Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-[#0B3024] dark:text-[#F1FAF6] block mb-1">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#F8FAF9] dark:bg-[#041D18] border border-[#D8E8E2] dark:border-[#10372F] text-[#0B3024] dark:text-[#F1FAF6]"
              />
            </div>

            <div>
              <label className="font-bold text-[#0B3024] dark:text-[#F1FAF6] block mb-1">
                College Email <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#F8FAF9] dark:bg-[#041D18] border border-[#D8E8E2] dark:border-[#10372F] text-[#0B3024] dark:text-[#F1FAF6]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="font-bold text-[#0B3024] dark:text-[#F1FAF6] block mb-1">
                Branch
              </label>
              <input
                type="text"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#F8FAF9] dark:bg-[#041D18] border border-[#D8E8E2] dark:border-[#10372F] text-[#0B3024] dark:text-[#F1FAF6]"
              />
            </div>

            <div>
              <label className="font-bold text-[#0B3024] dark:text-[#F1FAF6] block mb-1">
                Semester
              </label>
              <input
                type="text"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#F8FAF9] dark:bg-[#041D18] border border-[#D8E8E2] dark:border-[#10372F] text-[#0B3024] dark:text-[#F1FAF6]"
              />
            </div>

            <div>
              <label className="font-bold text-[#0B3024] dark:text-[#F1FAF6] block mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91..."
                className="w-full px-3 py-2 rounded-xl bg-[#F8FAF9] dark:bg-[#041D18] border border-[#D8E8E2] dark:border-[#10372F] text-[#0B3024] dark:text-[#F1FAF6]"
              />
            </div>
          </div>

          {/* Agreement Checkbox */}
          <div className="pt-2">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => {
                  setAgreed(e.target.checked);
                  if (errors.agreed) setErrors((prev) => ({ ...prev, agreed: null }));
                }}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 mt-0.5 cursor-pointer"
              />
              <span className="text-xs text-[#55786B] dark:text-[#8FAFA4] leading-relaxed">
                I agree to the code of conduct, academic honesty policies, and event participation guidelines.
              </span>
            </label>
            {errors.agreed && (
              <p className="text-[11px] text-rose-600 dark:text-rose-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.agreed}</span>
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E8F1ED] dark:border-[#10372F]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl font-semibold text-[#55786B] dark:text-[#8AA89F] hover:bg-gray-100 dark:hover:bg-[#082A24] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white dark:bg-[#159B72] dark:hover:bg-[#108360] dark:text-[#021512] font-bold shadow-md transition-all cursor-pointer"
            >
              <span>{isSubmitting ? "Registering..." : "Confirm Registration"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
