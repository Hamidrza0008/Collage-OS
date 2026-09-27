"use client";

import React from "react";
import Link from "next/link";
import {
  Briefcase,
  Layers,
  Building,
  Target,
  FileText,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { INITIAL_INTERNSHIPS } from "@/components/internships/internshipsData";
import { RESUME_TEMPLATES, TARGET_ROLE_OPTIONS } from "./resumeBuilderData";

export default function ResumeIdentityCard({
  resume,
  onChangeResume,
  existingResumeUrl = "https://drive.google.com/file/d/hamid_resume_2025/view",
}) {
  const selectedOpportunity = INITIAL_INTERNSHIPS.find(
    (o) => o.id === resume.targetOpportunityId
  );

  return (
    <div className="bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] rounded-3xl p-5 sm:p-6 shadow-sm space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-[#E8F1ED] dark:border-[#10372F]">
        <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
          <Target className="w-4 h-4" />
          <h2 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            Resume Identity &amp; Targeting
          </h2>
        </div>
        <span className="text-[11px] font-semibold text-[#658278] dark:text-[#8AA89F]">
          Version: {resume.name}
        </span>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Resume Title */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            Resume Name / Label <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={resume.name}
            onChange={(e) => onChangeResume({ ...resume, name: e.target.value })}
            placeholder="e.g. Full Stack Developer Resume"
            className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#F7FBF9] dark:bg-[#031A16] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          />
        </div>

        {/* Target Role */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            Target Role
          </label>
          <div className="flex gap-2">
            <select
              value={resume.targetRole}
              onChange={(e) => onChangeResume({ ...resume, targetRole: e.target.value })}
              className="w-full text-xs px-3 py-2.5 rounded-xl bg-[#F7FBF9] dark:bg-[#031A16] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            >
              {TARGET_ROLE_OPTIONS.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Target Opportunity from College OS */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            Target Campus Opportunity
          </label>
          <select
            value={resume.targetOpportunityId || ""}
            onChange={(e) => {
              const selected = INITIAL_INTERNSHIPS.find((o) => o.id === e.target.value);
              onChangeResume({
                ...resume,
                targetOpportunityId: e.target.value,
                targetCompany: selected?.company || resume.targetCompany,
              });
            }}
            className="w-full text-xs px-3 py-2.5 rounded-xl bg-[#F7FBF9] dark:bg-[#031A16] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          >
            <option value="">None (General Resume)</option>
            {INITIAL_INTERNSHIPS.map((opp) => (
              <option key={opp.id} value={opp.id}>
                {opp.title} ({opp.company})
              </option>
            ))}
          </select>
        </div>

        {/* Target Company */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            Target Company / Industry
          </label>
          <input
            type="text"
            value={resume.targetCompany || ""}
            onChange={(e) => onChangeResume({ ...resume, targetCompany: e.target.value })}
            placeholder="e.g. Google / Product Tech"
            className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#F7FBF9] dark:bg-[#031A16] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          />
        </div>
      </div>

      {/* Opportunity Link Card if selected */}
      {selectedOpportunity && (
        <div className="p-3.5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-500/20 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <Building className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <div>
              <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                Targeting: {selectedOpportunity.title}
              </span>
              <span className="text-[11px] text-[#658278] dark:text-[#789991] block">
                {selectedOpportunity.company} &bull; {selectedOpportunity.location} &bull; {selectedOpportunity.skills.join(", ")}
              </span>
            </div>
          </div>
          <Link
            href={`/student/internships/${selectedOpportunity.id}`}
            target="_blank"
            className="inline-flex items-center gap-1 font-semibold text-emerald-700 dark:text-emerald-300 hover:underline shrink-0"
          >
            <span>View Opportunity</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      )}

      {/* Template Selector Pills */}
      <div className="space-y-2 pt-2 border-t border-[#E8F1ED] dark:border-[#10372F]">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Select Resume Template</span>
          </label>
          <span className="text-[11px] text-[#658278] dark:text-[#789991]">
            Live preview updates instantly
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {RESUME_TEMPLATES.map((tmpl) => {
            const isSelected = resume.template === tmpl.id;
            return (
              <button
                key={tmpl.id}
                type="button"
                onClick={() => onChangeResume({ ...resume, template: tmpl.id })}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative ${
                  isSelected
                    ? "bg-emerald-500/10 border-emerald-500/50 shadow-xs"
                    : "bg-[#F7FBF9] dark:bg-[#031A16] border-[#D8E8E2] dark:border-[#16463D] hover:border-emerald-500/30"
                }`}
              >
                {isSelected && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 absolute top-2.5 right-2.5" />
                )}
                <span className="text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 inline-block mb-1">
                  {tmpl.badge}
                </span>
                <h4 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] line-clamp-1">
                  {tmpl.name}
                </h4>
                <p className="text-[10.5px] text-[#658278] dark:text-[#789991] mt-1 line-clamp-2 leading-relaxed">
                  {tmpl.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Existing Uploaded Resume Reference */}
      {existingResumeUrl && (
        <div className="pt-2 border-t border-[#E8F1ED] dark:border-[#10372F] flex items-center justify-between text-xs text-[#658278] dark:text-[#789991]">
          <div className="flex items-center gap-2">
            <FileText className="w-3.5 h-3.5 text-emerald-600" />
            <span>
              Existing profile resume linked:{" "}
              <strong className="text-[#0B3024] dark:text-[#F1FAF6]">hamid_resume_2025.pdf</strong>
            </span>
          </div>
          <a
            href={existingResumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline inline-flex items-center gap-1"
          >
            <span>View File</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}
    </div>
  );
}
