"use client";

import Link from "next/link";
import {
  Building2,
  MapPin,
  Calendar,
  Clock,
  ExternalLink,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  FileText,
  FileEdit,
  Trash2,
  Sparkles,
} from "lucide-react";
import CompanyLogo from "../CompanyLogo";
import { STATUS_CONFIG, getPipelineStages } from "./applicationsData";

export default function ApplicationCard({
  application,
  onViewApplication,
  onWithdraw,
  onEditNotes,
}) {
  const statusCfg = STATUS_CONFIG[application.status] || STATUS_CONFIG["Submitted"];
  const pipeline = getPipelineStages(application);

  return (
    <article className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] shadow-2xs hover:border-[#159B72]/50 dark:hover:border-[#20D39B]/50 transition-all duration-200 space-y-4">
      {/* 1. Header Row: Logo, Title, Company, Status Badge */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div className="flex items-start gap-3.5 min-w-0">
          <CompanyLogo
            logoType={application.logoType}
            className="w-11 h-11 rounded-xl shadow-2xs shrink-0"
          />

          <div className="min-w-0 space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <Link
                href={`/student/internships/${application.opportunityId}`}
                className="text-sm sm:text-base font-bold text-[#06241F] dark:text-white hover:text-[#159B72] dark:hover:text-[#20D39B] transition-colors truncate inline-flex items-center gap-1 group"
                title="View original opportunity specifications"
              >
                <span>{application.opportunityTitle}</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 shrink-0" />
              </Link>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#06241F]/70 dark:text-[#D8E8E2]/70 flex-wrap">
              <span className="font-semibold text-[#06241F] dark:text-white">
                {application.company}
              </span>
              <span>&bull;</span>
              <span className="px-2 py-0.5 rounded-md bg-[#F8FAFC] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] font-medium text-[11px]">
                {application.type}
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#159B72] dark:text-[#20D39B]" />
                {application.location} ({application.workMode})
              </span>
            </div>
          </div>
        </div>

        {/* Status Badge + Application ID */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-1.5 shrink-0 pt-1 sm:pt-0">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${statusCfg.bgLight} ${statusCfg.bgDark}`}
          >
            <span className={`w-2 h-2 rounded-full ${statusCfg.dot}`} />
            <span>{statusCfg.label}</span>
          </span>

          <span className="text-[10px] font-mono text-[#06241F]/50 dark:text-[#D8E8E2]/50">
            ID: {application.applicationId}
          </span>
        </div>
      </div>

      {/* 2. Compact Multi-Stage Pipeline */}
      <div className="pt-1">
        <div className="flex items-center justify-between text-[11px] text-[#06241F]/60 dark:text-[#D8E8E2]/60 mb-1.5">
          <span className="font-semibold">Pipeline Progress</span>
          <span className="font-medium text-[#159B72] dark:text-[#20D39B]">
            {application.currentStage}
          </span>
        </div>

        {/* Stepper bar */}
        <div className="grid grid-cols-5 gap-1.5">
          {pipeline.stages.map((stage, sIdx) => {
            const isCompleted = sIdx < pipeline.currentStep;
            const isCurrent = sIdx === pipeline.currentStep;

            return (
              <div key={stage.key} className="space-y-1">
                <div
                  className={`h-1.5 rounded-full transition-all ${
                    isCompleted
                      ? "bg-[#159B72] dark:bg-[#20D39B]"
                      : isCurrent
                      ? "bg-[#159B72] dark:bg-[#20D39B] animate-pulse"
                      : "bg-[#D8E8E2]/60 dark:bg-[#10372F]"
                  }`}
                />
                <span
                  className={`hidden sm:block text-[10px] truncate text-center ${
                    isCurrent
                      ? "font-bold text-[#159B72] dark:text-[#20D39B]"
                      : isCompleted
                      ? "font-medium text-[#06241F]/80 dark:text-[#D8E8E2]/80"
                      : "text-gray-400 dark:text-gray-600"
                  }`}
                >
                  {stage.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Next Action Banner (Callout) */}
      <div className="p-3 rounded-xl bg-[#F8FAFC] dark:bg-[#021512] border border-[#D8E8E2]/70 dark:border-[#10372F]/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-start sm:items-center gap-2 min-w-0">
          <Clock className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B] shrink-0 mt-0.5 sm:mt-0" />
          <div className="text-xs">
            <span className="font-semibold text-[#06241F] dark:text-white mr-1.5">
              Next Action:
            </span>
            <span className="text-[#06241F]/80 dark:text-[#D8E8E2]/80">
              {application.nextAction}
            </span>
          </div>
        </div>

        {application.nextActionDue && (
          <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 shrink-0 self-start sm:self-auto">
            Due: {application.nextActionDue}
          </span>
        )}
      </div>

      {/* 4. Footer Meta & Actions */}
      <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-[#D8E8E2]/60 dark:border-[#10372F]/60">
        {/* Meta badges: applied date, stipend, notes count */}
        <div className="flex items-center gap-3 text-xs text-[#06241F]/60 dark:text-[#D8E8E2]/60 flex-wrap">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-gray-400" />
            Applied: {application.appliedAt}
          </span>
          <span>&bull;</span>
          <span className="font-medium text-[#06241F] dark:text-[#D8E8E2]">
            {application.stipend}
          </span>
          {application.notes && (
            <>
              <span>&bull;</span>
              <span className="inline-flex items-center gap-1 text-[11px] text-[#159B72] dark:text-[#20D39B]">
                <FileEdit className="w-3 h-3" />
                Note attached
              </span>
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
          {/* Notes trigger */}
          <button
            type="button"
            onClick={() => onEditNotes(application)}
            className="p-1.5 rounded-lg border border-[#D8E8E2] dark:border-[#10372F] text-[#06241F]/70 dark:text-[#D8E8E2]/70 hover:text-[#159B72] dark:hover:text-[#20D39B] hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
            title="Add or view private notes"
            aria-label="Private Notes"
          >
            <FileEdit className="w-3.5 h-3.5" />
          </button>

          {/* Withdraw trigger */}
          {application.withdrawable && application.status !== "Withdrawn" && (
            <button
              type="button"
              onClick={() => onWithdraw(application)}
              className="px-2.5 py-1.5 rounded-xl text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
              title="Withdraw this application"
            >
              Withdraw
            </button>
          )}

          {/* Primary View Application Trigger */}
          <button
            type="button"
            onClick={() => onViewApplication(application)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[#159B72] hover:bg-[#128360] dark:bg-[#20D39B] dark:hover:bg-[#1bb886] text-white dark:text-[#021512] transition-colors cursor-pointer shadow-2xs active:scale-95"
          >
            <span>View Application</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
}
