"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Wand2,
  Check,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  FileText,
  Target,
} from "lucide-react";
import { generateSummaryVariants } from "./resumeBuilderData";

export default function SmartAssistantPanel({
  resume,
  onChangeResume,
  profile,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState("summary"); // 'summary' | 'skills' | 'bullets'

  const summaryVariants = generateSummaryVariants(resume.targetRole, profile);

  return (
    <div className="bg-gradient-to-br from-emerald-500/10 via-[#F7FBF9] to-purple-500/10 dark:from-emerald-950/40 dark:via-[#06241F] dark:to-purple-950/30 border border-emerald-500/30 dark:border-emerald-500/20 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-600 text-white shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                Smart Resume Suggestions
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                Grounded in Profile
              </span>
            </div>
            <p className="text-xs text-[#658278] dark:text-[#8AA89F] mt-0.5">
              Deterministic phrasing and section recommendations tailored to {resume.targetRole}.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>{isOpen ? "Collapse" : "Explore"}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {isOpen && (
        <div className="space-y-4 pt-2 border-t border-emerald-500/20 animate-in fade-in duration-200">
          {/* Sub tabs */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveFeature("summary")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                activeFeature === "summary"
                  ? "bg-emerald-600 text-white"
                  : "bg-white/80 dark:bg-[#031A16] text-[#0B3024] dark:text-[#F1FAF6] hover:bg-emerald-50"
              }`}
            >
              Summary Variants
            </button>
            <button
              type="button"
              onClick={() => setActiveFeature("skills")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                activeFeature === "skills"
                  ? "bg-emerald-600 text-white"
                  : "bg-white/80 dark:bg-[#031A16] text-[#0B3024] dark:text-[#F1FAF6] hover:bg-emerald-50"
              }`}
            >
              Role Skill Recommendations
            </button>
          </div>

          {/* Feature 1: Summary Variants */}
          {activeFeature === "summary" && (
            <div className="space-y-3">
              <span className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] block">
                Select a professionally phrased summary variant for &quot;{resume.targetRole}&quot;:
              </span>
              <div className="grid grid-cols-1 gap-2.5">
                {summaryVariants.map((variant) => {
                  const isCurrent = resume.summary === variant.text;
                  return (
                    <div
                      key={variant.id}
                      className="p-3.5 rounded-2xl bg-white dark:bg-[#031A16] border border-[#D8E8E2] dark:border-[#16463D] space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                          {variant.title}
                        </span>
                        {isCurrent ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                            <Check className="w-3.5 h-3.5" />
                            Applied
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => onChangeResume({ ...resume, summary: variant.text })}
                            className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors cursor-pointer"
                          >
                            Use This Version
                          </button>
                        )}
                      </div>
                      <p className="text-xs text-[#36594C] dark:text-[#B5CCC5] leading-relaxed">
                        {variant.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Feature 2: Role Skill Recommendations */}
          {activeFeature === "skills" && (
            <div className="p-4 rounded-2xl bg-white dark:bg-[#031A16] border border-[#D8E8E2] dark:border-[#16463D] space-y-2.5">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <h4 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                  Target Role Alignment for {resume.targetRole}
                </h4>
              </div>
              <p className="text-xs text-[#658278] dark:text-[#8AA89F] leading-relaxed">
                For <strong>{resume.targetRole}</strong>, recruiters prioritize seeing your hands-on proficiency in:
              </p>
              <div className="flex items-center gap-1.5 flex-wrap pt-1">
                {(resume.targetRole.toLowerCase().includes("front")
                  ? ["React", "Next.js", "JavaScript / TypeScript", "Tailwind CSS", "REST & GraphQL", "UI Architecture"]
                  : resume.targetRole.toLowerCase().includes("back")
                  ? ["Node.js & Express", "Python", "MongoDB & PostgreSQL", "Docker", "REST & GraphQL", "System Design"]
                  : ["React & Next.js", "Node.js", "TypeScript", "PostgreSQL", "Docker", "REST APIs", "Git & GitHub"]
                ).map((skillName) => {
                  const hasSkill = (resume.skills || []).some(
                    (s) => s.included && s.name.toLowerCase().includes(skillName.toLowerCase())
                  );
                  return (
                    <span
                      key={skillName}
                      className={`text-xs px-2.5 py-1 rounded-lg border font-semibold flex items-center gap-1 ${
                        hasSkill
                          ? "bg-emerald-50 dark:bg-emerald-950/70 border-emerald-500/30 text-emerald-800 dark:text-emerald-300"
                          : "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {hasSkill ? <Check className="w-3 h-3 text-emerald-600" /> : <span>○</span>}
                      <span>{skillName}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
