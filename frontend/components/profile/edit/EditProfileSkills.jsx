"use client";

import { useState } from "react";
import { Wrench, Plus, X, AlertCircle, CheckCircle2, ChevronDown } from "lucide-react";
import { SKILL_CATEGORIES, SKILL_LEVELS, SUGGESTED_SKILLS } from "./editProfileData";

export default function EditProfileSkills({
  skills = { primary: [], tools: [], other: [] },
  onChangeSkills,
}) {
  const [targetCategory, setTargetCategory] = useState("primary");
  const [skillNameInput, setSkillNameInput] = useState("");
  const [skillLevelInput, setSkillLevelInput] = useState("Intermediate");
  const [skillError, setSkillError] = useState("");

  const allSkillsList = [
    ...(skills.primary || []),
    ...(skills.tools || []),
    ...(skills.other || []),
  ];

  const handleAddSkill = (presetName) => {
    const name = (presetName || skillNameInput).trim();
    setSkillError("");

    if (!name) return;

    // Check duplicate across all categories
    if (allSkillsList.some((s) => s.name.toLowerCase() === name.toLowerCase())) {
      setSkillError(`Skill "${name}" is already present.`);
      return;
    }

    const currentCatList = skills[targetCategory] || [];
    const updatedCategory = [
      ...currentCatList,
      { name, level: skillLevelInput },
    ];

    onChangeSkills({
      ...skills,
      [targetCategory]: updatedCategory,
    });

    setSkillNameInput("");
  };

  const handleRemoveSkill = (categoryKey, skillIndex) => {
    setSkillError("");
    const updated = (skills[categoryKey] || []).filter((_, idx) => idx !== skillIndex);
    onChangeSkills({
      ...skills,
      [categoryKey]: updated,
    });
  };

  const handleChangeSkillLevel = (categoryKey, skillIndex, newLevel) => {
    const updated = (skills[categoryKey] || []).map((skill, idx) => {
      if (idx === skillIndex) {
        return { ...skill, level: newLevel };
      }
      return skill;
    });

    onChangeSkills({
      ...skills,
      [categoryKey]: updated,
    });
  };

  return (
    <div id="section-skills" className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] shadow-sm scroll-mt-28 space-y-6">
      <div className="pb-4 border-b border-[#D8E8E2]/60 dark:border-[#10372F]/60">
        <h2 className="text-base sm:text-lg font-bold text-[#06241F] dark:text-white">
          Skills & Technical Expertise
        </h2>
        <p className="text-xs text-[#06241F]/70 dark:text-[#D8E8E2]/70 mt-0.5">
          Organize your capabilities by domain with qualitative proficiency levels.
        </p>
      </div>

      {/* Add Skill Form */}
      <div className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] space-y-3">
        <span className="block text-xs font-semibold text-[#06241F] dark:text-[#D8E8E2]">
          Add New Skill
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
          {/* Category Selector */}
          <div className="sm:col-span-4">
            <select
              value={targetCategory}
              onChange={(e) => setTargetCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] text-[#06241F] dark:text-white focus:outline-hidden focus:border-[#159B72] dark:focus:border-[#20D39B] cursor-pointer"
            >
              {SKILL_CATEGORIES.map((cat) => (
                <option key={cat.key} value={cat.key}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Skill Name Input */}
          <div className="sm:col-span-5">
            <input
              type="text"
              value={skillNameInput}
              onChange={(e) => {
                setSkillNameInput(e.target.value);
                setSkillError("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddSkill();
                }
              }}
              placeholder="e.g. Next.js, Docker, GraphQL"
              className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] text-[#06241F] dark:text-white focus:outline-hidden focus:border-[#159B72] dark:focus:border-[#20D39B]"
            />
          </div>

          {/* Level Selector */}
          <div className="sm:col-span-3 flex items-center gap-2">
            <select
              value={skillLevelInput}
              onChange={(e) => setSkillLevelInput(e.target.value)}
              className="w-full px-2.5 py-2 rounded-xl text-xs bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] text-[#06241F] dark:text-white focus:outline-hidden focus:border-[#159B72] dark:focus:border-[#20D39B] cursor-pointer"
            >
              {SKILL_LEVELS.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => handleAddSkill()}
              className="p-2 rounded-xl bg-[#159B72] hover:bg-[#128360] dark:bg-[#20D39B] dark:hover:bg-[#1bb886] text-white dark:text-[#021512] transition-colors cursor-pointer shrink-0 shadow-xs"
              title="Add Skill"
              aria-label="Add Skill"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {skillError && (
          <p className="text-[11px] text-rose-500 flex items-center gap-1 font-medium">
            <AlertCircle className="w-3 h-3 shrink-0" />
            {skillError}
          </p>
        )}

        {/* Quick suggestions */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[11px] text-[#06241F]/60 dark:text-[#D8E8E2]/60">Quick Add:</span>
          {SUGGESTED_SKILLS.filter(
            (item) => !allSkillsList.some((s) => s.name.toLowerCase() === item.toLowerCase())
          )
            .slice(0, 6)
            .map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => handleAddSkill(item)}
                className="text-[11px] px-2 py-0.5 rounded-md bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] text-[#06241F]/80 dark:text-[#D8E8E2]/80 hover:text-[#159B72] dark:hover:text-[#20D39B] hover:border-[#159B72] transition-colors cursor-pointer"
              >
                + {item}
              </button>
            ))}
        </div>
      </div>

      {/* Categorized Skills View */}
      <div className="space-y-4">
        {SKILL_CATEGORIES.map((cat) => {
          const list = skills[cat.key] || [];

          return (
            <div
              key={cat.key}
              className="p-4 rounded-xl bg-[#F8FAFC]/50 dark:bg-[#021512]/50 border border-[#D8E8E2]/60 dark:border-[#10372F]/60 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#06241F] dark:text-[#D8E8E2]">
                  {cat.label}
                </span>
                <span className="text-[11px] font-mono text-[#06241F]/60 dark:text-[#D8E8E2]/60">
                  {list.length} {list.length === 1 ? "skill" : "skills"}
                </span>
              </div>

              {list.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {list.map((skill, idx) => (
                    <div
                      key={`${skill.name}-${idx}`}
                      className="p-2.5 rounded-xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] flex items-center justify-between gap-2 shadow-xs group"
                    >
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-[#06241F] dark:text-white truncate">
                          {skill.name}
                        </p>
                        {/* Level Switcher */}
                        <div className="pt-0.5">
                          <select
                            value={skill.level || "Intermediate"}
                            onChange={(e) =>
                              handleChangeSkillLevel(cat.key, idx, e.target.value)
                            }
                            className={`text-[10px] font-semibold rounded-md px-1.5 py-0.5 border cursor-pointer ${
                              skill.level === "Advanced"
                                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                                : skill.level === "Familiar"
                                ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                                : "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20"
                            }`}
                          >
                            {SKILL_LEVELS.map((lvl) => (
                              <option key={lvl} value={lvl}>
                                {lvl}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(cat.key, idx)}
                        className="p-1 rounded-lg hover:bg-rose-500/10 text-gray-400 hover:text-rose-500 transition-colors cursor-pointer shrink-0"
                        title={`Remove ${skill.name}`}
                        aria-label={`Remove ${skill.name}`}
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[#06241F]/50 dark:text-[#D8E8E2]/50 italic">
                  No skills in this category yet.
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
