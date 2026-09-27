"use client";

import React, { useState } from "react";
import { Briefcase, Plus, Trash2, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { improveBulletText } from "./resumeBuilderData";

export default function ExperienceSectionEditor({
  resume,
  onChangeResume,
}) {
  const experience = resume.experience || [];
  const [expandedId, setExpandedId] = useState(experience[0]?.id || null);

  const updateExperience = (idx, fields) => {
    const updated = [...experience];
    updated[idx] = {
      ...updated[idx],
      ...fields,
    };
    onChangeResume({ ...resume, experience: updated });
  };

  const handleAddExperience = () => {
    const newEntry = {
      id: `exp-${Date.now()}`,
      role: "Software Engineering Intern",
      organization: "Tech Company",
      location: "Remote / Hybrid",
      startDate: "Jun 2024",
      endDate: "Aug 2024",
      isCurrent: false,
      included: true,
      bullets: [
        "Collaborated with engineering team to deliver scalable web features using React and modern APIs.",
      ],
    };

    const updated = [...experience, newEntry];
    onChangeResume({ ...resume, experience: updated });
    setExpandedId(newEntry.id);
  };

  const handleRemoveExperience = (idx) => {
    const updated = experience.filter((_, i) => i !== idx);
    onChangeResume({ ...resume, experience: updated });
  };

  const handleAddBullet = (expIdx) => {
    const exp = experience[expIdx];
    const updatedBullets = [...(exp.bullets || []), ""];
    updateExperience(expIdx, { bullets: updatedBullets });
  };

  const handleUpdateBullet = (expIdx, bIdx, text) => {
    const exp = experience[expIdx];
    const updatedBullets = [...(exp.bullets || [])];
    updatedBullets[bIdx] = text;
    updateExperience(expIdx, { bullets: updatedBullets });
  };

  const handleRemoveBullet = (expIdx, bIdx) => {
    const exp = experience[expIdx];
    const updatedBullets = (exp.bullets || []).filter((_, i) => i !== bIdx);
    updateExperience(expIdx, { bullets: updatedBullets });
  };

  const handleImproveBullet = (expIdx, bIdx) => {
    const exp = experience[expIdx];
    const current = (exp.bullets || [])[bIdx];
    if (!current) return;
    const improved = improveBulletText(current);
    handleUpdateBullet(expIdx, bIdx, improved);
  };

  return (
    <div className="bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] rounded-3xl p-5 sm:p-6 shadow-sm space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-[#E8F1ED] dark:border-[#10372F]">
        <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
          <Briefcase className="w-4 h-4" />
          <h3 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            Work Experience &amp; Internships ({experience.filter((e) => e.included).length})
          </h3>
        </div>
        <button
          type="button"
          onClick={handleAddExperience}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Position</span>
        </button>
      </div>

      {experience.length === 0 ? (
        <div className="text-center py-6 space-y-2">
          <p className="text-xs text-[#658278] dark:text-[#789991]">
            No work experience added yet. Add past internships, campus developer roles, or contract projects.
          </p>
          <button
            type="button"
            onClick={handleAddExperience}
            className="text-xs font-bold text-emerald-600 hover:underline cursor-pointer"
          >
            + Add First Experience Entry
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {experience.map((exp, idx) => {
            const isExpanded = expandedId === exp.id;
            return (
              <div
                key={exp.id}
                className="rounded-2xl border border-[#D8E8E2] dark:border-[#16463D] bg-[#F7FBF9] dark:bg-[#031A16] overflow-hidden"
              >
                <div className="p-3.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <input
                      type="checkbox"
                      checked={exp.included}
                      onChange={(e) => updateExperience(idx, { included: e.target.checked })}
                      className="w-4 h-4 text-emerald-600 rounded cursor-pointer shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <span className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] block truncate">
                        {exp.role} &bull; {exp.organization}
                      </span>
                      <span className="text-[11px] text-[#658278] dark:text-[#789991] block">
                        {exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate} &bull; {exp.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleRemoveExperience(idx)}
                      title="Delete experience"
                      className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                      className="p-1.5 rounded-lg text-[#658278] hover:text-[#0B3024] dark:hover:text-white cursor-pointer"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="p-4 pt-0 border-t border-[#E8F1ED] dark:border-[#10372F] space-y-3 mt-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                          Job Role
                        </label>
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) => updateExperience(idx, { role: e.target.value })}
                          className="w-full text-xs px-3 py-2 rounded-xl bg-white dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                          Company / Organization
                        </label>
                        <input
                          type="text"
                          value={exp.organization}
                          onChange={(e) => updateExperience(idx, { organization: e.target.value })}
                          className="w-full text-xs px-3 py-2 rounded-xl bg-white dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                          Location
                        </label>
                        <input
                          type="text"
                          value={exp.location}
                          onChange={(e) => updateExperience(idx, { location: e.target.value })}
                          className="w-full text-xs px-3 py-2 rounded-xl bg-white dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                          Date Period
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={exp.startDate}
                            onChange={(e) => updateExperience(idx, { startDate: e.target.value })}
                            placeholder="Start"
                            className="w-1/2 text-xs px-2.5 py-2 rounded-xl bg-white dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6]"
                          />
                          <input
                            type="text"
                            value={exp.endDate}
                            onChange={(e) => updateExperience(idx, { endDate: e.target.value })}
                            placeholder="End"
                            disabled={exp.isCurrent}
                            className="w-1/2 text-xs px-2.5 py-2 rounded-xl bg-white dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] disabled:opacity-40"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Bullets */}
                    <div className="space-y-2 pt-2">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-bold text-[#0B3024] dark:text-[#F1FAF6] uppercase tracking-wider">
                          Responsibility Bullets
                        </label>
                        <button
                          type="button"
                          onClick={() => handleAddBullet(idx)}
                          className="text-[11px] font-bold text-emerald-600 hover:underline cursor-pointer"
                        >
                          + Add Bullet
                        </button>
                      </div>

                      {(exp.bullets || []).map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2">
                          <span className="text-emerald-600 font-bold mt-2">&bull;</span>
                          <textarea
                            value={bullet}
                            onChange={(e) => handleUpdateBullet(idx, bIdx, e.target.value)}
                            rows={2}
                            className="flex-1 text-xs p-2.5 rounded-xl bg-white dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none leading-relaxed"
                          />
                          <div className="flex flex-col gap-1 shrink-0">
                            <button
                              type="button"
                              onClick={() => handleImproveBullet(idx, bIdx)}
                              title="Improve phrasing"
                              className="p-1 rounded-lg text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 cursor-pointer"
                            >
                              <Sparkles className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleRemoveBullet(idx, bIdx)}
                              title="Remove bullet"
                              className="p-1 rounded-lg text-rose-500 hover:bg-rose-500/10 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
