"use client";

import { useState, useEffect } from "react";
import { X, Rocket, Check } from "lucide-react";

export default function SubmitOpportunityModal({
  isOpen,
  onClose,
  onSubmit,
}) {
  const [formData, setFormData] = useState({
    type: "internship",
    title: "",
    company: "",
    badge: "Open",
    workMode: "Remote",
    location: "Remote / India",
    duration: "Jan 2026 – Apr 2026 (4 months)",
    skills: "",
    description: "",
    link: "",
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

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.company.trim() || !formData.description.trim()) return;

    const skillsArray = formData.skills
      ? formData.skills.split(",").map((s) => s.trim()).filter(Boolean)
      : ["Web Dev", "Problem Solving"];

    const newOpp = {
      id: `${formData.type}-${Date.now()}`,
      type: formData.type,
      title: formData.title.trim(),
      company: formData.company.trim(),
      badge: formData.badge,
      workMode: formData.workMode,
      mode: formData.workMode,
      location: formData.location.trim(),
      duration: formData.duration.trim(),
      date: formData.duration.trim(),
      skills: skillsArray,
      applications: formData.type === "hackathon" ? "1 registered" : "1 applied",
      applicationsCount: 1,
      registrationsCount: 1,
      description: formData.description.trim(),
      eligibility: "Open to all verified college students",
      openToAll: true,
      featured: false,
      saved: false,
      applied: false,
      logoType: "custom",
      deadline: "30 Nov 2025",
    };

    onSubmit(newOpp);
    onClose();
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
            <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-[#159B72] dark:text-[#20D39B] flex items-center justify-center">
              <Rocket className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                Submit Opportunity
              </h3>
              <p className="text-[11px] text-[#658278] dark:text-[#789991]">
                Share an internship opening or student hackathon with campus peers
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-xs max-h-[80vh] overflow-y-auto">
          {/* Opportunity Type */}
          <div>
            <label className="block font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-1">
              Opportunity Type *
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: "internship" })}
                className={`py-2 rounded-xl font-bold transition-all ${
                  formData.type === "internship"
                    ? "bg-[#159B72] text-white shadow-xs"
                    : "bg-[#F7FBF9] dark:bg-[#082A24] text-[#36594C] dark:text-[#B5CCC5] border border-[#D8E8E2] dark:border-[#16463D]"
                }`}
              >
                Internship
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: "hackathon" })}
                className={`py-2 rounded-xl font-bold transition-all ${
                  formData.type === "hackathon"
                    ? "bg-[#159B72] text-white shadow-xs"
                    : "bg-[#F7FBF9] dark:bg-[#082A24] text-[#36594C] dark:text-[#B5CCC5] border border-[#D8E8E2] dark:border-[#16463D]"
                }`}
              >
                Hackathon
              </button>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-1">
              Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Frontend Engineering Summer Internship"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] text-[#0B3024] dark:text-[#F1FAF6] border border-[#D8E8E2] dark:border-[#16463D] focus:outline-none focus:border-[#159B72]"
            />
          </div>

          {/* Company / Organizer */}
          <div>
            <label className="block font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-1">
              Company / Organizing Club *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Razorpay or IEEE Student Chapter"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] text-[#0B3024] dark:text-[#F1FAF6] border border-[#D8E8E2] dark:border-[#16463D] focus:outline-none focus:border-[#159B72]"
            />
          </div>

          {/* Work Mode & Duration */}
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-1">
                Work Mode
              </label>
              <select
                value={formData.workMode}
                onChange={(e) => setFormData({ ...formData, workMode: e.target.value })}
                className="w-full px-2.5 py-2 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] text-[#0B3024] dark:text-[#F1FAF6] border border-[#D8E8E2] dark:border-[#16463D] focus:outline-none focus:border-[#159B72]"
              >
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
                <option value="Online">Online</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-1">
                Duration / Dates
              </label>
              <input
                type="text"
                placeholder="e.g. 3 months or 12-14 Nov"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] text-[#0B3024] dark:text-[#F1FAF6] border border-[#D8E8E2] dark:border-[#16463D] focus:outline-none focus:border-[#159B72]"
              />
            </div>
          </div>

          {/* Skills Required */}
          <div>
            <label className="block font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-1">
              Required Skills (Comma separated)
            </label>
            <input
              type="text"
              placeholder="e.g. React, Node.js, Python, DSA"
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] text-[#0B3024] dark:text-[#F1FAF6] border border-[#D8E8E2] dark:border-[#16463D] focus:outline-none focus:border-[#159B72]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-1">
              Description &amp; Perks *
            </label>
            <textarea
              required
              rows={3}
              placeholder="Provide eligibility, stipend/prizes, and key responsibilities..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] text-[#0B3024] dark:text-[#F1FAF6] border border-[#D8E8E2] dark:border-[#16463D] focus:outline-none focus:border-[#159B72]"
            />
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#E8F1ED] dark:border-[#10372F]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl font-semibold text-[#55786B] dark:text-[#8FAFA4] hover:bg-gray-100 dark:hover:bg-[#082A24]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4.5 py-2 rounded-xl font-bold bg-[#159B72] hover:bg-[#087A5B] text-white flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Publish Opportunity</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
