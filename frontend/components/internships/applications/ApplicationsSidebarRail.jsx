"use client";

import {
  Calendar,
  Clock,
  Video,
  FileText,
  Award,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Building2,
} from "lucide-react";
import CompanyLogo from "../CompanyLogo";

export default function ApplicationsSidebarRail({
  applications = [],
  onViewApplication,
}) {
  // Extract upcoming action applications
  const upcomingInterviews = applications.filter(
    (app) => app.interview && ["Interview Scheduled"].includes(app.status)
  );

  const pendingAssessments = applications.filter(
    (app) => app.assessment && ["Assessment Pending"].includes(app.status)
  );

  const offersReceived = applications.filter(
    (app) => ["Offer Received", "Selected"].includes(app.status)
  );

  // Top 3 recently updated applications
  const recentlyUpdated = [...applications]
    .sort((a, b) => (a.updatedAt === "Just now" ? -1 : 1))
    .slice(0, 3);

  return (
    <aside className="space-y-4">
      {/* 1. Action Items Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] shadow-2xs space-y-3.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#06241F] dark:text-white flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B]" />
            Action Required & Upcoming
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 font-semibold">
            {upcomingInterviews.length + pendingAssessments.length + offersReceived.length} Items
          </span>
        </div>

        <div className="space-y-2.5">
          {/* Interviews */}
          {upcomingInterviews.map((app) => (
            <button
              key={app.id}
              type="button"
              onClick={() => onViewApplication(app)}
              className="w-full p-2.5 rounded-xl border border-purple-200 dark:border-purple-900 bg-purple-50/50 dark:bg-purple-950/20 hover:bg-purple-50 dark:hover:bg-purple-950/40 text-left transition-colors cursor-pointer group"
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-[10px] font-bold text-purple-700 dark:text-purple-300 flex items-center gap-1 uppercase tracking-wider">
                  <Video className="w-3 h-3" />
                  Interview Round
                </span>
                <span className="text-[10px] font-mono text-purple-600 dark:text-purple-400">
                  {app.interview?.date}
                </span>
              </div>
              <p className="text-xs font-bold text-[#06241F] dark:text-white truncate">
                {app.company} • {app.interview?.type}
              </p>
              <p className="text-[11px] text-[#06241F]/70 dark:text-[#D8E8E2]/70 truncate mt-0.5">
                {app.interview?.time} ({app.interview?.format})
              </p>
            </button>
          ))}

          {/* Assessments */}
          {pendingAssessments.map((app) => (
            <button
              key={app.id}
              type="button"
              onClick={() => onViewApplication(app)}
              className="w-full p-2.5 rounded-xl border border-amber-200 dark:border-amber-900 bg-amber-50/50 dark:bg-amber-950/20 hover:bg-amber-50 dark:hover:bg-amber-950/40 text-left transition-colors cursor-pointer group"
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 flex items-center gap-1 uppercase tracking-wider">
                  <FileText className="w-3 h-3" />
                  Online Assessment
                </span>
                <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400">
                  Due {app.assessment?.dueDate}
                </span>
              </div>
              <p className="text-xs font-bold text-[#06241F] dark:text-white truncate">
                {app.company} • {app.assessment?.platform}
              </p>
              <p className="text-[11px] text-[#06241F]/70 dark:text-[#D8E8E2]/70 truncate mt-0.5">
                Duration: {app.assessment?.duration}
              </p>
            </button>
          ))}

          {/* Offers */}
          {offersReceived.map((app) => (
            <button
              key={app.id}
              type="button"
              onClick={() => onViewApplication(app)}
              className="w-full p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-left transition-colors cursor-pointer group"
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1 uppercase tracking-wider">
                  <Award className="w-3 h-3" />
                  Offer Extended
                </span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  Action Required
                </span>
              </div>
              <p className="text-xs font-bold text-[#06241F] dark:text-white truncate">
                {app.company} • {app.stipend}
              </p>
              <p className="text-[11px] text-[#06241F]/70 dark:text-[#D8E8E2]/70 truncate mt-0.5">
                {app.nextAction}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Recently Updated Applications */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] shadow-2xs space-y-3">
        <span className="text-xs font-bold text-[#06241F] dark:text-white block">
          Recently Updated
        </span>

        <div className="space-y-2">
          {recentlyUpdated.map((app) => (
            <button
              key={app.id}
              type="button"
              onClick={() => onViewApplication(app)}
              className="w-full p-2 rounded-xl hover:bg-[#F8FAFC] dark:hover:bg-[#021512] border border-transparent hover:border-[#D8E8E2] dark:hover:border-[#10372F] text-left transition-colors flex items-center justify-between gap-2.5 cursor-pointer group"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <CompanyLogo
                  logoType={app.logoType}
                  className="w-8 h-8 rounded-lg shadow-2xs shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#06241F] dark:text-white truncate group-hover:text-[#159B72] dark:group-hover:text-[#20D39B]">
                    {app.company}
                  </p>
                  <p className="text-[10px] text-[#06241F]/60 dark:text-[#D8E8E2]/60 truncate">
                    {app.status} &bull; {app.updatedAt}
                  </p>
                </div>
              </div>

              <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#159B72] dark:group-hover:text-[#20D39B] shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* 3. Campus Career Cell Advisory */}
      <div className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] space-y-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#159B72] dark:text-[#20D39B]" />
          <span className="text-xs font-bold text-[#06241F] dark:text-white">
            Placement Advisory
          </span>
        </div>
        <p className="text-xs text-[#06241F]/70 dark:text-[#D8E8E2]/70 leading-relaxed">
          Need interview mock feedback or technical guidance? Connect with departmental placement coordinators during office hours (2:00 PM – 4:00 PM).
        </p>
      </div>
    </aside>
  );
}
