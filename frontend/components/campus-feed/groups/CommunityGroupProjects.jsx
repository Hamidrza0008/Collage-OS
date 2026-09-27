"use client";

import Link from "next/link";
import { Layers, Users, ArrowRight, Tag, Code2 } from "lucide-react";
import { INITIAL_PROJECTS } from "@/components/projects/projectsData";

export default function CommunityGroupProjects({ linkedProjectIds = [] }) {
  const projects = linkedProjectIds
    .map((id) => INITIAL_PROJECTS.find((p) => p.id === id))
    .filter(Boolean);

  if (projects.length === 0) {
    return (
      <div className="py-12 px-4 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] text-center flex flex-col items-center justify-center">
        <Layers className="w-8 h-8 text-[#159B72] dark:text-[#20D39B] opacity-50 mb-2" />
        <h4 className="text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
          No projects registered yet
        </h4>
        <p className="text-xs text-[#658278] dark:text-[#789991] mt-0.5">
          Open-source repositories and team projects will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#159B72] dark:text-[#20D39B]" />
          <h3 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            Community Projects ({projects.length})
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] shadow-xs hover:border-[#159B72]/50 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E8F1ED] dark:bg-[#10372F] text-[#36594C] dark:text-[#A3BFB5]">
                  {proj.category}
                </span>
                <span className="text-[11px] text-[#658278] dark:text-[#789991] flex items-center gap-1">
                  <Users className="w-3 h-3 text-[#159B72]" />
                  <span>{proj.membersCount || 3} members</span>
                </span>
              </div>

              <h4 className="text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-[#159B72] dark:group-hover:text-[#20D39B] transition-colors line-clamp-1">
                {proj.title}
              </h4>

              <p className="text-xs text-[#658278] dark:text-[#789991] leading-relaxed line-clamp-2 mt-1">
                {proj.description}
              </p>

              {/* Tech stack */}
              {proj.tech && proj.tech.length > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap mt-3">
                  {proj.tech.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 text-[10px] font-semibold rounded-lg bg-[#F7FBF9] dark:bg-[#082A24] border border-[#E8F1ED] dark:border-[#10372F] text-[#36594C] dark:text-[#A3BFB5]"
                    >
                      {t}
                    </span>
                  ))}
                  {proj.tech.length > 3 && (
                    <span className="text-[10px] text-[#658278] dark:text-[#789991]">
                      +{proj.tech.length - 3}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* View Project Canonical CTA */}
            <Link
              href={`/student/projects/${proj.id}`}
              className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-bold rounded-xl bg-[#DDF3EB] dark:bg-[#073327] text-[#159B72] dark:text-[#20D39B] hover:bg-[#cceedf] dark:hover:bg-[#0a4433] transition-colors shadow-2xs mt-4"
            >
              <span>View Project Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
