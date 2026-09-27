"use client";

import React, { useState } from "react";
import { Code2, Plus, Check, X, CheckCircle2 } from "lucide-react";

export default function SkillsSectionEditor({
  resume,
  onChangeResume,
  matchedKeywords = [],
}) {
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillCategory, setNewSkillCategory] = useState("Languages & Frameworks");

  const skills = resume.skills || [];

  const handleToggleSkill = (skillIndex) => {
    const updated = [...skills];
    updated[skillIndex] = {
      ...updated[skillIndex],
      included: !updated[skillIndex].included,
    };
    onChangeResume({ ...resume, skills: updated });
  };

  const handleAddCustomSkill = (e) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    const newSkill = {
      name: newSkillName.trim(),
      category: newSkillCategory,
      included: true,
    };

    onChangeResume({
      ...resume,
      skills: [...skills, newSkill],
    });
    setNewSkillName("");
  };

  const handleRemoveSkill = (skillIndex) => {
    const updated = skills.filter((_, idx) => idx !== skillIndex);
    onChangeResume({ ...resume, skills: updated });
  };

  // Group by category
  const categories = ["Languages & Frameworks", "Tools & Cloud", "Architecture & Practices"];

  const matchedSet = new Set(matchedKeywords.map((k) => k.toLowerCase()));

  return (
    <div className="bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] rounded-3xl p-5 sm:p-6 shadow-sm space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-[#E8F1ED] dark:border-[#10372F]">
        <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
          <Code2 className="w-4 h-4" />
          <h3 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            Technical Skills ({skills.filter((s) => s.included).length} active)
          </h3>
        </div>
        <span className="text-[11px] text-[#658278] dark:text-[#8AA89F]">
          Toggle skills to feature
        </span>
      </div>

      {/* Category Groups */}
      <div className="space-y-4">
        {categories.map((cat) => {
          const catSkills = skills
            .map((s, originalIdx) => ({ ...s, originalIdx }))
            .filter((s) => (s.category || "Languages & Frameworks") === cat);

          if (catSkills.length === 0) return null;

          return (
            <div key={cat} className="space-y-2">
              <span className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] block">
                {cat}
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                {catSkills.map((skill) => {
                  const isMatched = matchedSet.has(skill.name.toLowerCase());
                  return (
                    <button
                      key={skill.originalIdx}
                      type="button"
                      onClick={() => handleToggleSkill(skill.originalIdx)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        skill.included
                          ? isMatched
                            ? "bg-purple-100 dark:bg-purple-950/80 text-purple-900 dark:text-purple-200 border-purple-400 font-bold shadow-xs"
                            : "bg-emerald-50 dark:bg-emerald-950/70 text-emerald-900 dark:text-emerald-200 border-emerald-400 shadow-xs"
                          : "bg-gray-50 dark:bg-gray-900/50 text-gray-400 border-gray-200 dark:border-gray-800 line-through"
                      }`}
                    >
                      {skill.included && <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />}
                      <span>{skill.name}</span>
                      {isMatched && (
                        <span className="text-[9px] px-1 rounded bg-purple-200 dark:bg-purple-900 text-purple-800 dark:text-purple-300 font-bold ml-0.5">
                          Match
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Custom Skill Form */}
      <form
        onSubmit={handleAddCustomSkill}
        className="pt-3 border-t border-[#E8F1ED] dark:border-[#10372F] flex flex-col sm:flex-row items-center gap-2.5"
      >
        <input
          type="text"
          value={newSkillName}
          onChange={(e) => setNewSkillName(e.target.value)}
          placeholder="Add custom skill for this resume..."
          className="flex-1 w-full text-xs px-3.5 py-2 rounded-xl bg-[#F7FBF9] dark:bg-[#031A16] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
        />
        <select
          value={newSkillCategory}
          onChange={(e) => setNewSkillCategory(e.target.value)}
          className="text-xs px-3 py-2 rounded-xl bg-[#F7FBF9] dark:bg-[#031A16] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-none focus:ring-2 focus:ring-emerald-500/30 shrink-0"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={!newSkillName.trim()}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors disabled:opacity-40 cursor-pointer shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Skill</span>
        </button>
      </form>
    </div>
  );
}
