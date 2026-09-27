"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FolderGit2,
  ExternalLink,
  Plus,
  Trash2,
  Star,
  Sparkles,
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { generateProjectBullet, improveBulletText } from "./resumeBuilderData";

export default function ProjectsSectionEditor({
  resume,
  onChangeResume,
}) {
  const projects = resume.projects || [];
  const [expandedId, setExpandedId] = useState(projects[0]?.id || null);

  const updateProject = (projectIndex, fields) => {
    const updated = [...projects];
    updated[projectIndex] = {
      ...updated[projectIndex],
      ...fields,
    };
    onChangeResume({ ...resume, projects: updated });
  };

  const handleAddBullet = (projectIndex) => {
    const proj = projects[projectIndex];
    const newBullet = generateProjectBullet(proj, resume.targetRole);
    const updatedBullets = [...(proj.bullets || []), newBullet];
    updateProject(projectIndex, { bullets: updatedBullets });
  };

  const handleUpdateBullet = (projectIndex, bulletIndex, text) => {
    const proj = projects[projectIndex];
    const updatedBullets = [...(proj.bullets || [])];
    updatedBullets[bulletIndex] = text;
    updateProject(projectIndex, { bullets: updatedBullets });
  };

  const handleRemoveBullet = (projectIndex, bulletIndex) => {
    const proj = projects[projectIndex];
    const updatedBullets = (proj.bullets || []).filter((_, idx) => idx !== bulletIndex);
    updateProject(projectIndex, { bullets: updatedBullets });
  };

  const handleImproveBullet = (projectIndex, bulletIndex) => {
    const proj = projects[projectIndex];
    const current = (proj.bullets || [])[bulletIndex];
    if (!current) return;
    const improved = improveBulletText(current);
    handleUpdateBullet(projectIndex, bulletIndex, improved);
  };

  return (
    <div className="bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] rounded-3xl p-5 sm:p-6 shadow-sm space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-[#E8F1ED] dark:border-[#10372F]">
        <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
          <FolderGit2 className="w-4 h-4" />
          <h3 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            Key Projects ({projects.filter((p) => p.included).length} included)
          </h3>
        </div>
        <span className="text-[11px] text-[#658278] dark:text-[#8AA89F]">
          Sourced from profile projects
        </span>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-6 space-y-2">
          <p className="text-xs text-[#658278] dark:text-[#789991]">
            No projects found in your student profile yet.
          </p>
          <Link
            href="/student/profile/edit"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            <span>Add Projects to Profile</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((proj, pIdx) => {
            const isExpanded = expandedId === proj.id;
            return (
              <div
                key={proj.id}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  proj.included
                    ? "bg-[#F7FBF9] dark:bg-[#031A16] border-[#D8E8E2] dark:border-[#16463D]"
                    : "bg-gray-50/60 dark:bg-gray-900/30 border-gray-200 dark:border-gray-800 opacity-60"
                }`}
              >
                {/* Project Header Bar */}
                <div className="p-3.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <input
                      type="checkbox"
                      checked={proj.included}
                      onChange={(e) => updateProject(pIdx, { included: e.target.checked })}
                      className="w-4 h-4 text-emerald-600 rounded cursor-pointer shrink-0"
                    />

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] truncate">
                          {proj.title}
                        </span>
                        {proj.isFeatured && (
                          <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.2 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 font-bold">
                            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                            Featured
                          </span>
                        )}
                        <span className="text-[10px] text-[#658278] dark:text-[#789991]">
                          {(proj.tags || []).slice(0, 3).join(" • ")}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => updateProject(pIdx, { isFeatured: !proj.isFeatured })}
                      title={proj.isFeatured ? "Unfeature project" : "Mark as featured"}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        proj.isFeatured ? "text-amber-500" : "text-gray-400 hover:text-amber-500"
                      }`}
                    >
                      <Star className={`w-3.5 h-3.5 ${proj.isFeatured ? "fill-amber-500" : ""}`} />
                    </button>

                    <Link
                      href={`/student/projects/${proj.id}`}
                      target="_blank"
                      title="View Project Details"
                      className="p-1.5 rounded-lg text-[#658278] hover:text-[#0B3024] dark:hover:text-white"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => setExpandedId(isExpanded ? null : proj.id)}
                      className="p-1.5 rounded-lg text-[#658278] hover:text-[#0B3024] dark:hover:text-white cursor-pointer"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Bullets Editor */}
                {isExpanded && proj.included && (
                  <div className="p-4 pt-0 border-t border-[#E8F1ED] dark:border-[#10372F] space-y-3 mt-2">
                    <div className="flex items-center justify-between pt-2">
                      <label className="text-[11px] font-bold text-[#0B3024] dark:text-[#F1FAF6] uppercase tracking-wider">
                        Resume Bullets ({proj.bullets?.length || 0})
                      </label>
                      <button
                        type="button"
                        onClick={() => handleAddBullet(pIdx)}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>Generate Smart Bullet</span>
                      </button>
                    </div>

                    <div className="space-y-2">
                      {(proj.bullets || []).map((bullet, bIdx) => (
                        <div key={bIdx} className="space-y-1">
                          <div className="flex items-start gap-2">
                            <span className="text-emerald-600 font-bold mt-2">&bull;</span>
                            <textarea
                              value={bullet}
                              onChange={(e) => handleUpdateBullet(pIdx, bIdx, e.target.value)}
                              rows={2}
                              className="flex-1 text-xs p-2.5 rounded-xl bg-white dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none leading-relaxed"
                            />
                            <div className="flex flex-col gap-1 shrink-0">
                              <button
                                type="button"
                                onClick={() => handleImproveBullet(pIdx, bIdx)}
                                title="Improve phrasing"
                                className="p-1 rounded-lg text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 cursor-pointer"
                              >
                                <Sparkles className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleRemoveBullet(pIdx, bIdx)}
                                title="Remove bullet"
                                className="p-1 rounded-lg text-rose-500 hover:bg-rose-500/10 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
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
