'use client';

import React from 'react';
import { Sparkles, Code2, Wrench, Layers } from 'lucide-react';

export default function PublicProfileSkills({ skills }) {
  if (!skills) return null;

  // Normalize skills whether object with categories or flat array
  const hasCategories = Boolean(skills.primary || skills.tools || skills.other);
  const primaryList = hasCategories ? skills.primary || [] : [];
  const toolsList = hasCategories ? skills.tools || [] : [];
  const otherList = hasCategories ? skills.other || [] : [];
  const flatList = Array.isArray(skills) ? skills : [];

  const getLevelBadge = (level) => {
    switch (level?.toLowerCase()) {
      case 'advanced':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-[#20D39B] border-emerald-300/60 dark:border-emerald-800/40';
      case 'intermediate':
        return 'bg-teal-50 text-teal-700 dark:bg-[#10372F] dark:text-[#A7C7BC] border-teal-200 dark:border-[#159B72]/40';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-[#021512] dark:text-gray-300 border-gray-200 dark:border-[#10372F]';
    }
  };

  return (
    <section className="bg-white dark:bg-[#06241F] rounded-2xl border border-gray-200 dark:border-[#10372F] p-6 sm:p-7 shadow-sm space-y-6">
      <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100 dark:border-[#10372F]/60">
        <div className="p-2 rounded-xl bg-emerald-50 dark:bg-[#10372F] text-emerald-600 dark:text-[#20D39B]">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-[#D8E8E2]">
            Skills &amp; Technical Expertise
          </h2>
          <p className="text-xs text-gray-500 dark:text-[#A7C7BC]">
            Core competencies, framework proficiency, and tooling stack
          </p>
        </div>
      </div>

      {hasCategories ? (
        <div className="space-y-5">
          {/* Primary Skills */}
          {primaryList.length > 0 && (
            <div>
              <h3 className="text-xs uppercase tracking-wider font-bold text-gray-500 dark:text-[#A7C7BC] flex items-center gap-1.5 mb-3">
                <Code2 className="w-3.5 h-3.5 text-emerald-500" />
                Primary Languages &amp; Frameworks
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {primaryList.map((skill, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-gray-200/80 dark:border-[#10372F] bg-gray-50/60 dark:bg-[#021512]/60 hover:border-emerald-400 dark:hover:border-[#159B72] transition-colors"
                  >
                    <span className="text-xs font-semibold text-gray-900 dark:text-[#D8E8E2]">
                      {typeof skill === 'string' ? skill : skill.name}
                    </span>
                    {typeof skill === 'object' && skill.level && (
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md border ${getLevelBadge(skill.level)}`}>
                        {skill.level}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tools & Platforms */}
          {toolsList.length > 0 && (
            <div>
              <h3 className="text-xs uppercase tracking-wider font-bold text-gray-500 dark:text-[#A7C7BC] flex items-center gap-1.5 mb-3">
                <Wrench className="w-3.5 h-3.5 text-emerald-500" />
                Developer Tools &amp; Infrastructure
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {toolsList.map((skill, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-gray-200/80 dark:border-[#10372F] bg-gray-50/60 dark:bg-[#021512]/60 hover:border-emerald-400 dark:hover:border-[#159B72] transition-colors"
                  >
                    <span className="text-xs font-semibold text-gray-900 dark:text-[#D8E8E2]">
                      {typeof skill === 'string' ? skill : skill.name}
                    </span>
                    {typeof skill === 'object' && skill.level && (
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md border ${getLevelBadge(skill.level)}`}>
                        {skill.level}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Other / Methodologies */}
          {otherList.length > 0 && (
            <div>
              <h3 className="text-xs uppercase tracking-wider font-bold text-gray-500 dark:text-[#A7C7BC] flex items-center gap-1.5 mb-3">
                <Layers className="w-3.5 h-3.5 text-emerald-500" />
                Architecture &amp; Methodologies
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {otherList.map((skill, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-gray-200/80 dark:border-[#10372F] bg-gray-50/60 dark:bg-[#021512]/60 hover:border-emerald-400 dark:hover:border-[#159B72] transition-colors"
                  >
                    <span className="text-xs font-semibold text-gray-900 dark:text-[#D8E8E2]">
                      {typeof skill === 'string' ? skill : skill.name}
                    </span>
                    {typeof skill === 'object' && skill.level && (
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md border ${getLevelBadge(skill.level)}`}>
                        {skill.level}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Flat fallback list */
        <div className="flex flex-wrap gap-2">
          {flatList.map((skill, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-50 dark:bg-[#10372F] text-emerald-800 dark:text-[#20D39B] border border-emerald-200 dark:border-[#159B72]/40"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
