"use client";

import React from "react";
import { Award, ShieldCheck, Users, ExternalLink } from "lucide-react";

export default function AchievementsAndMoreEditor({
  resume,
  onChangeResume,
}) {
  const achievements = resume.achievements || [];
  const certifications = resume.certifications || [];
  const contributions = resume.contributions || [];

  const toggleAchievement = (index) => {
    const updated = [...achievements];
    updated[index] = { ...updated[index], included: !updated[index].included };
    onChangeResume({ ...resume, achievements: updated });
  };

  const toggleCert = (index) => {
    const updated = [...certifications];
    updated[index] = { ...updated[index], included: !updated[index].included };
    onChangeResume({ ...resume, certifications: updated });
  };

  const toggleContribution = (index) => {
    const updated = [...contributions];
    updated[index] = { ...updated[index], included: !updated[index].included };
    onChangeResume({ ...resume, contributions: updated });
  };

  return (
    <div className="space-y-6">
      {/* Achievements Card */}
      <div className="bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E8F1ED] dark:border-[#10372F]">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
            <Award className="w-4 h-4" />
            <h3 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
              Achievements &amp; Honors ({achievements.filter((a) => a.included).length})
            </h3>
          </div>
          <span className="text-[11px] text-[#658278] dark:text-[#8AA89F]">
            From student profile
          </span>
        </div>

        <div className="space-y-2.5">
          {achievements.map((ach, idx) => (
            <label
              key={ach.id || idx}
              className={`flex items-start gap-3 p-3 rounded-2xl border text-xs cursor-pointer transition-all ${
                ach.included
                  ? "bg-[#F7FBF9] dark:bg-[#031A16] border-[#D8E8E2] dark:border-[#16463D]"
                  : "bg-gray-50/60 dark:bg-gray-900/30 border-gray-200 dark:border-gray-800 opacity-60"
              }`}
            >
              <input
                type="checkbox"
                checked={ach.included}
                onChange={() => toggleAchievement(idx)}
                className="w-4 h-4 text-emerald-600 rounded cursor-pointer shrink-0 mt-0.5"
              />
              <div className="min-w-0 flex-1">
                <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6] block">
                  {ach.title}
                </span>
                <span className="text-[11px] text-[#658278] dark:text-[#789991] block">
                  {ach.issuer} &bull; {ach.date}
                </span>
                {ach.description && (
                  <p className="text-[11px] text-[#658278] dark:text-[#789991] mt-1 line-clamp-2">
                    {ach.description}
                  </p>
                )}
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Certifications Card */}
      <div className="bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E8F1ED] dark:border-[#10372F]">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <h3 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
              Industry Certifications ({certifications.filter((c) => c.included).length})
            </h3>
          </div>
        </div>

        <div className="space-y-2.5">
          {certifications.map((cert, idx) => (
            <label
              key={cert.id || idx}
              className={`flex items-start gap-3 p-3 rounded-2xl border text-xs cursor-pointer transition-all ${
                cert.included
                  ? "bg-[#F7FBF9] dark:bg-[#031A16] border-[#D8E8E2] dark:border-[#16463D]"
                  : "bg-gray-50/60 dark:bg-gray-900/30 border-gray-200 dark:border-gray-800 opacity-60"
              }`}
            >
              <input
                type="checkbox"
                checked={cert.included}
                onChange={() => toggleCert(idx)}
                className="w-4 h-4 text-emerald-600 rounded cursor-pointer shrink-0 mt-0.5"
              />
              <div className="min-w-0 flex-1">
                <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6] block">
                  {cert.title}
                </span>
                <span className="text-[11px] text-[#658278] dark:text-[#789991] block">
                  {cert.issuer} &bull; {cert.date}
                </span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Campus Contributions */}
      <div className="bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E8F1ED] dark:border-[#10372F]">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
            <Users className="w-4 h-4" />
            <h3 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
              Campus Leadership &amp; Mentoring ({contributions.filter((c) => c.included).length})
            </h3>
          </div>
        </div>

        <div className="space-y-2.5">
          {contributions.map((ct, idx) => (
            <label
              key={ct.id || idx}
              className={`flex items-start gap-3 p-3 rounded-2xl border text-xs cursor-pointer transition-all ${
                ct.included
                  ? "bg-[#F7FBF9] dark:bg-[#031A16] border-[#D8E8E2] dark:border-[#16463D]"
                  : "bg-gray-50/60 dark:bg-gray-900/30 border-gray-200 dark:border-gray-800 opacity-60"
              }`}
            >
              <input
                type="checkbox"
                checked={ct.included}
                onChange={() => toggleContribution(idx)}
                className="w-4 h-4 text-emerald-600 rounded cursor-pointer shrink-0 mt-0.5"
              />
              <div className="min-w-0 flex-1">
                <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6] block">
                  {ct.title} &bull; {ct.organization}
                </span>
                <span className="text-[11px] text-[#658278] dark:text-[#789991] block">
                  {ct.period}
                </span>
                {ct.description && (
                  <p className="text-[11px] text-[#658278] dark:text-[#789991] mt-1">
                    {ct.description}
                  </p>
                )}
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
