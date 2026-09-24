"use client";

import Image from "next/image";
import { Users, UserPlus, CheckCircle, PieChart } from "lucide-react";

export default function ProjectTeam({
  team = [],
  contributionsBreakdown = [],
  onMemberClick,
  onOpenJoinModal,
}) {
  if (!team || team.length === 0) return null;

  return (
    <section
      aria-label="Project Team & Contributions"
      className="p-5 sm:p-6 md:p-7 rounded-2xl md:rounded-3xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-xs space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E8F3EE] dark:border-[#10372F]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#E8F7F1] dark:bg-[#0A2E27] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center shrink-0">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
              Project Team &amp; Contributors
            </h2>
            <p className="text-xs text-[#658278] dark:text-[#8BAEA3]">
              Active student engineers and task allocation
            </p>
          </div>
        </div>

        {onOpenJoinModal && (
          <button
            type="button"
            onClick={onOpenJoinModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-dashed border-[#159B72]/50 hover:border-[#159B72] dark:border-[#20D39B]/50 dark:hover:border-[#20D39B] text-[#159B72] dark:text-[#20D39B] text-xs font-semibold hover:bg-emerald-50/60 dark:hover:bg-emerald-950/40 transition-all cursor-pointer w-fit"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Join Team</span>
          </button>
        )}
      </div>

      {/* Team Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {team.map((member, idx) => (
          <div
            key={member.id || idx}
            onClick={() => onMemberClick && onMemberClick(member)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onMemberClick && onMemberClick(member);
              }
            }}
            title={`View profile of ${member.name}`}
            className="p-3.5 rounded-2xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#E8F3EE] dark:border-[#10372F] hover:border-[#159B72]/40 dark:hover:border-[#20D39B]/40 hover:shadow-2xs transition-all flex flex-col justify-between cursor-pointer group text-left"
          >
            <div className="flex items-start gap-3">
              <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 ring-2 ring-emerald-500/20 group-hover:scale-105 transition-transform bg-emerald-100 dark:bg-[#0C352C]">
                <Image
                  src={member.avatar || "/assets/layout/profile-avatar.jpg"}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h3 className="text-xs sm:text-[13px] font-bold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-[#159B72] dark:group-hover:text-[#20D39B] transition-colors truncate">
                    {member.name}
                  </h3>
                  {member.isLead && (
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300">
                      Lead
                    </span>
                  )}
                </div>

                <p className="text-[11px] font-medium text-[#159B72] dark:text-[#20D39B] truncate">
                  {member.role || "Developer"}
                </p>

                <p className="text-[10px] text-[#658278] dark:text-[#8BAEA3] mt-0.5">
                  {member.branch || "CSE"} &bull; {member.semester || "7th Sem"}
                </p>
              </div>
            </div>

            {/* Individual Task / Responsibility */}
            {member.tasks && (
              <p className="text-[10.5px] text-[#4C6B61] dark:text-[#CBD5E1] mt-3 line-clamp-2 leading-snug">
                {member.tasks}
              </p>
            )}

            {/* Individual Contribution Bar */}
            {member.contribution && (
              <div className="mt-3 pt-2.5 border-t border-[#E8F3EE] dark:border-[#10372F]">
                <div className="flex items-center justify-between text-[10px] text-[#658278] dark:text-[#8BAEA3] mb-1">
                  <span>Commitment</span>
                  <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                    {member.contribution}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-gray-200/80 dark:bg-[#0A3029] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#159B72] dark:bg-[#20D39B] rounded-full transition-all duration-500"
                    style={{ width: `${member.contribution}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Contributions Breakdown Progress Bars */}
      {contributionsBreakdown && contributionsBreakdown.length > 0 && (
        <div className="p-4 sm:p-5 rounded-2xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#E8F3EE] dark:border-[#10372F] space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            <PieChart className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B]" />
            <span>Role &amp; Module Contribution Breakdown</span>
          </div>

          <div className="space-y-2">
            {contributionsBreakdown.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#355248] dark:text-[#CBD5E1] font-medium">
                    {item.label}
                  </span>
                  <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                    {item.percentage}%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200/80 dark:bg-[#0A3029] rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color || "bg-[#159B72]"} rounded-full transition-all duration-500`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
