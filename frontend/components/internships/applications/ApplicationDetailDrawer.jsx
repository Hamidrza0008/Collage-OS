"use client";

import { useState } from "react";
import Link from "next/link";
import {
  X,
  Building2,
  MapPin,
  Calendar,
  Clock,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  FileText,
  FileEdit,
  Video,
  Award,
  Download,
  Eye,
  Trash2,
  Sparkles,
  Layers,
} from "lucide-react";
import CompanyLogo from "../CompanyLogo";
import { STATUS_CONFIG, getPipelineStages } from "./applicationsData";

export default function ApplicationDetailDrawer({
  application,
  isOpen,
  onClose,
  onWithdraw,
  onSaveNotes,
}) {
  const [activeTab, setActiveTab] = useState("overview"); // overview | timeline | submitted | notes
  const [noteContent, setNoteContent] = useState(application?.notes || "");
  const [isSavingNote, setIsSavingNote] = useState(false);
  const [noteSavedFeedback, setNoteSavedFeedback] = useState(false);
  const [calendarToast, setCalendarToast] = useState(false);

  if (!isOpen || !application) return null;

  const statusCfg = STATUS_CONFIG[application.status] || STATUS_CONFIG["Submitted"];
  const pipeline = getPipelineStages(application);

  const handleSaveNotesClick = () => {
    setIsSavingNote(true);
    setTimeout(() => {
      onSaveNotes(application.id, noteContent);
      setIsSavingNote(false);
      setNoteSavedFeedback(true);
      setTimeout(() => setNoteSavedFeedback(false), 3000);
    }, 400);
  };

  const handleAddToCalendar = () => {
    setCalendarToast(true);
    setTimeout(() => setCalendarToast(false), 3500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div
          className="w-screen max-w-2xl bg-white dark:bg-[#06241F] border-l border-[#D8E8E2] dark:border-[#10372F] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 1. Drawer Header */}
          <div className="p-4 sm:p-6 border-b border-[#D8E8E2] dark:border-[#10372F] bg-[#F8FAFC]/80 dark:bg-[#021512]/80 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-md bg-[#D8E8E2]/60 dark:bg-[#10372F] text-[#06241F] dark:text-[#D8E8E2]">
                {application.applicationId}
              </span>

              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${statusCfg.bgLight} ${statusCfg.bgDark}`}
                >
                  <span className={`w-2 h-2 rounded-full ${statusCfg.dot}`} />
                  <span>{statusCfg.label}</span>
                </span>

                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 rounded-xl text-gray-400 hover:text-[#06241F] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                  title="Close drawer"
                  aria-label="Close drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <CompanyLogo
                logoType={application.logoType}
                className="w-12 h-12 rounded-xl shadow-xs shrink-0"
              />

              <div className="min-w-0 flex-1">
                <h2 className="text-base sm:text-lg font-bold text-[#06241F] dark:text-white leading-tight">
                  {application.opportunityTitle}
                </h2>
                <div className="flex items-center gap-2 text-xs text-[#06241F]/70 dark:text-[#D8E8E2]/70 mt-1 flex-wrap">
                  <span className="font-semibold text-[#06241F] dark:text-white">
                    {application.company}
                  </span>
                  <span>&bull;</span>
                  <span>{application.type}</span>
                  <span>&bull;</span>
                  <span>{application.location} ({application.workMode})</span>
                </div>
              </div>
            </div>

            {/* Quick Actions Row */}
            <div className="flex items-center justify-between gap-2 pt-1">
              <Link
                href={`/student/internships/${application.opportunityId}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#159B72] dark:text-[#20D39B] hover:underline"
              >
                <span>View Opportunity Details</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>

              {application.withdrawable && application.status !== "Withdrawn" && (
                <button
                  type="button"
                  onClick={() => onWithdraw(application)}
                  className="text-xs text-rose-600 dark:text-rose-400 hover:underline cursor-pointer"
                >
                  Withdraw Application
                </button>
              )}
            </div>
          </div>

          {/* 2. Navigation Tabs */}
          <div className="px-4 sm:px-6 border-b border-[#D8E8E2]/60 dark:border-[#10372F]/60 flex items-center gap-4 bg-white dark:bg-[#06241F]">
            {[
              { id: "overview", label: "Overview & Status" },
              { id: "timeline", label: "Activity Timeline" },
              { id: "submitted", label: "Submitted Info" },
              { id: "notes", label: "Private Notes" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? "border-[#159B72] text-[#159B72] dark:border-[#20D39B] dark:text-[#20D39B]"
                    : "border-transparent text-[#06241F]/60 dark:text-[#D8E8E2]/60 hover:text-[#06241F] dark:hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* 3. Drawer Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {/* TAB: OVERVIEW */}
            {activeTab === "overview" && (
              <div className="space-y-5">
                {/* A. Next Action Highlight */}
                <div className="p-4 rounded-2xl bg-[#159B72]/10 dark:bg-[#20D39B]/10 border border-[#159B72]/20 dark:border-[#20D39B]/20 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#159B72] dark:text-[#20D39B]">
                    <Clock className="w-4 h-4" />
                    <span>Next Action:</span>
                  </div>
                  <p className="text-sm font-semibold text-[#06241F] dark:text-white">
                    {application.nextAction}
                  </p>
                  {application.nextActionDue && (
                    <p className="text-xs font-medium text-amber-700 dark:text-amber-300">
                      Target Due Date: {application.nextActionDue}
                    </p>
                  )}
                </div>

                {/* B. Multi-Step Pipeline Stepper */}
                <div className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] space-y-3">
                  <h3 className="text-xs font-bold text-[#06241F] dark:text-white flex items-center justify-between">
                    <span>Recruiting Pipeline Stage</span>
                    <span className="font-normal text-[#06241F]/60 dark:text-[#D8E8E2]/60 font-mono">
                      Stage {pipeline.currentStep + 1} of {pipeline.stages.length}
                    </span>
                  </h3>

                  <div className="space-y-2">
                    {pipeline.stages.map((stage, idx) => {
                      const isCompleted = idx < pipeline.currentStep;
                      const isCurrent = idx === pipeline.currentStep;

                      return (
                        <div key={stage.key} className="flex items-center gap-3 text-xs">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] shrink-0 ${
                              isCompleted
                                ? "bg-[#159B72] text-white dark:bg-[#20D39B] dark:text-[#021512]"
                                : isCurrent
                                ? "bg-[#159B72]/20 text-[#159B72] dark:bg-[#20D39B]/20 dark:text-[#20D39B] ring-2 ring-[#159B72]"
                                : "bg-gray-200 text-gray-400 dark:bg-gray-800 dark:text-gray-600"
                            }`}
                          >
                            {isCompleted ? "✓" : idx + 1}
                          </div>
                          <span
                            className={
                              isCurrent
                                ? "font-bold text-[#06241F] dark:text-white"
                                : isCompleted
                                ? "font-medium text-[#06241F]/80 dark:text-[#D8E8E2]/80"
                                : "text-gray-400 dark:text-gray-600"
                            }
                          >
                            {stage.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* C. Interview Card (if scheduled) */}
                {application.interview && (
                  <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-purple-700 dark:text-purple-300 flex items-center gap-1.5">
                        <Video className="w-4 h-4" />
                        Interview Round Scheduled
                      </span>
                      <button
                        type="button"
                        onClick={handleAddToCalendar}
                        className="text-xs font-semibold text-purple-700 dark:text-purple-300 hover:underline cursor-pointer"
                      >
                        + Add to Calendar
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-gray-500 block">Round</span>
                        <span className="font-bold text-[#06241F] dark:text-white">
                          {application.interview.type}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">Date & Time</span>
                        <span className="font-bold text-[#06241F] dark:text-white">
                          {application.interview.date} · {application.interview.time}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">Platform</span>
                        <span className="font-bold text-[#06241F] dark:text-white">
                          {application.interview.format}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">Interviewer</span>
                        <span className="font-bold text-[#06241F] dark:text-white">
                          {application.interview.interviewer}
                        </span>
                      </div>
                    </div>

                    {application.interview.prepNotes && (
                      <p className="text-xs text-purple-900 dark:text-purple-200 bg-white/60 dark:bg-black/20 p-2.5 rounded-xl border border-purple-300/30">
                        <span className="font-semibold">Prep Focus:</span> {application.interview.prepNotes}
                      </p>
                    )}

                    {calendarToast && (
                      <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                        ✓ Interview event exported to calendar!
                      </p>
                    )}
                  </div>
                )}

                {/* D. Assessment Card (if pending/completed) */}
                {application.assessment && (
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                        <FileText className="w-4 h-4" />
                        Online Assessment
                      </span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-800 dark:text-amber-200">
                        {application.assessment.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-gray-500 block">Testing Platform</span>
                        <span className="font-bold text-[#06241F] dark:text-white">
                          {application.assessment.platform}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">Duration</span>
                        <span className="font-bold text-[#06241F] dark:text-white">
                          {application.assessment.duration}
                        </span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-gray-500 block">Evaluation Topics</span>
                        <span className="font-bold text-[#06241F] dark:text-white">
                          {application.assessment.topics}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* E. Offer / Selected Banner */}
                {(application.status === "Offer Received" || application.status === "Selected") && (
                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-2 text-xs">
                    <span className="font-bold text-emerald-700 dark:text-emerald-300 text-sm flex items-center gap-1.5">
                      <Award className="w-5 h-5 text-emerald-600" />
                      Congratulations on your Selection! 🎉
                    </span>
                    <p className="text-[#06241F]/80 dark:text-[#D8E8E2]/80 leading-relaxed">
                      You have met all hiring criteria for this opportunity. Please check your university email for the formal offer packet and instructions.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* TAB: TIMELINE */}
            {activeTab === "timeline" && (
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-[#06241F] dark:text-white uppercase tracking-wider">
                  Chronological Activity Log
                </h3>

                <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#D8E8E2] dark:before:bg-[#10372F]">
                  {(application.timeline || []).map((event, idx) => (
                    <div key={idx} className="relative">
                      <div className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-[#06241F] bg-[#159B72] dark:bg-[#20D39B]" />
                      <div className="space-y-0.5">
                        <span className="text-[11px] font-mono font-semibold text-[#159B72] dark:text-[#20D39B]">
                          {event.date}
                        </span>
                        <h4 className="text-xs font-bold text-[#06241F] dark:text-white">
                          {event.title}
                        </h4>
                        <p className="text-xs text-[#06241F]/70 dark:text-[#D8E8E2]/70 leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: SUBMITTED INFORMATION */}
            {activeTab === "submitted" && (
              <div className="space-y-4 text-xs">
                <div className="p-3.5 rounded-xl bg-[#F8FAFC] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] space-y-1.5">
                  <span className="text-gray-500 block">Resume Used</span>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#06241F] dark:text-white flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-[#159B72] dark:text-[#20D39B]" />
                      {application.resume || "Hamid_Rza_Resume_2025.pdf"}
                    </span>
                    <span className="text-[11px] text-[#159B72] dark:text-[#20D39B] font-semibold">
                      PDF Document
                    </span>
                  </div>
                </div>

                {application.portfolioUrl && (
                  <div className="p-3.5 rounded-xl bg-[#F8FAFC] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] space-y-1">
                    <span className="text-gray-500 block">Portfolio Link</span>
                    <a
                      href={application.portfolioUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-[#159B72] dark:text-[#20D39B] hover:underline break-all"
                    >
                      {application.portfolioUrl}
                    </a>
                  </div>
                )}

                {application.githubUrl && (
                  <div className="p-3.5 rounded-xl bg-[#F8FAFC] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] space-y-1">
                    <span className="text-gray-500 block">GitHub Profile</span>
                    <a
                      href={application.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-[#159B72] dark:text-[#20D39B] hover:underline break-all"
                    >
                      {application.githubUrl}
                    </a>
                  </div>
                )}

                {application.coverNote && (
                  <div className="p-3.5 rounded-xl bg-[#F8FAFC] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] space-y-1">
                    <span className="text-gray-500 block">Cover Statement / Note</span>
                    <p className="text-[#06241F]/80 dark:text-[#D8E8E2]/80 leading-relaxed italic">
                      &ldquo;{application.coverNote}&rdquo;
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* TAB: PRIVATE NOTES */}
            {activeTab === "notes" && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-bold text-[#06241F] dark:text-white">
                    Private Candidate Notes
                  </h3>
                  <p className="text-xs text-[#06241F]/60 dark:text-[#D8E8E2]/60 mt-0.5">
                    These notes are saved strictly in your local workspace and never visible to recruiters.
                  </p>
                </div>

                <textarea
                  rows={5}
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  placeholder="e.g. Discussed with alumni referral; need to revise system design and graph algorithms..."
                  className="w-full p-3.5 rounded-xl text-xs sm:text-sm bg-[#F8FAFC] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] text-[#06241F] dark:text-white focus:outline-hidden focus:border-[#159B72] resize-y"
                />

                <div className="flex items-center justify-between">
                  {noteSavedFeedback ? (
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Notes saved!
                    </span>
                  ) : <span />}

                  <button
                    type="button"
                    onClick={handleSaveNotesClick}
                    disabled={isSavingNote}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#159B72] hover:bg-[#128360] dark:bg-[#20D39B] dark:hover:bg-[#1bb886] text-white dark:text-[#021512] transition-colors cursor-pointer"
                  >
                    {isSavingNote ? "Saving..." : "Save Note"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 4. Drawer Footer */}
          <div className="p-4 border-t border-[#D8E8E2] dark:border-[#10372F] bg-white dark:bg-[#06241F] flex items-center justify-between">
            <span className="text-xs text-gray-500">
              Applied on {application.appliedAt}
            </span>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold border border-[#D8E8E2] dark:border-[#10372F] text-[#06241F] dark:text-[#D8E8E2] hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
