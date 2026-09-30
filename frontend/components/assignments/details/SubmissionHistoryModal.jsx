"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import {
  History,
  X,
  Award,
  CheckCircle2,
  Clock,
  FileArchive,
  Globe,
  ExternalLink,
  Download,
  Calendar,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  RotateCcw,
  Sparkles,
  FileText,
  User,
  ArrowRight,
  Layers,
} from "lucide-react";
import GithubIcon from "./GithubIcon";
import { getAssignmentDetails } from "./assignmentDetailsData";

/**
 * MD-05: Student Submission History & Feedback Modal
 *
 * Provides a dedicated, read-only overlay to inspect previous and current
 * assignment submission attempts, uploaded artifacts, repository links,
 * evaluator remarks, criterion score rubrics, and feedback timestamps.
 */
export default function SubmissionHistoryModal({
  isOpen,
  onClose,
  assignment,
  activeSubmission,
  submissionHistory,
  feedback,
  initialAttemptNumber,
  onReopenWorkspace,
  onDownloadAttachment,
}) {
  const modalRef = useRef(null);
  const previouslyFocusedRef = useRef(null);

  // Resolve full canonical assignment data to ensure rich details even if opened from simple card
  const canonicalAssignment = useMemo(() => {
    if (!assignment) return null;
    const baseId = typeof assignment === "string" ? assignment : assignment.id;
    const resolved = getAssignmentDetails(baseId) || {};
    const merged = typeof assignment === "object" ? { ...resolved, ...assignment } : resolved;

    // Use passed overrides if provided, else fallback to canonical fields
    return {
      ...merged,
      submission: activeSubmission !== undefined ? activeSubmission : merged.submission,
      submissionHistory:
        submissionHistory !== undefined ? submissionHistory : merged.submissionHistory || [],
      feedback: feedback !== undefined ? feedback : merged.feedback,
    };
  }, [assignment, activeSubmission, submissionHistory, feedback]);

  // Normalize attempts list (ordered with latest first)
  const normalizedAttempts = useMemo(() => {
    if (!canonicalAssignment) return [];

    let historyList = Array.isArray(canonicalAssignment.submissionHistory)
      ? [...canonicalAssignment.submissionHistory]
      : [];

    // If history array is empty but there is an active submission, synthesize Attempt 1
    if (historyList.length === 0 && canonicalAssignment.submission) {
      const active = canonicalAssignment.submission;
      historyList = [
        {
          version: `Version ${active.attempt || 1}`,
          attemptNumber: active.attempt || 1,
          submittedAt: active.submittedAt || "Recent",
          status: active.status || "Submitted",
          reviewState: active.status || "Under Review",
          files: active.files || [],
          githubUrl: active.githubUrl,
          demoUrl: active.demoUrl,
          notes: active.notes,
          marksEarned: canonicalAssignment.feedback?.score
            ? `${canonicalAssignment.feedback.score} / ${canonicalAssignment.feedback.maxScore || 10}`
            : null,
        },
      ];
    }

    if (historyList.length === 0) return [];

    // Sort descending by attempt number (or index)
    const sorted = [...historyList].sort((a, b) => {
      const numA = a.attemptNumber || 0;
      const numB = b.attemptNumber || 0;
      return numB - numA;
    });

    const maxAttemptNumber = Math.max(
      ...sorted.map((item, idx) => item.attemptNumber || sorted.length - idx),
      1
    );

    return sorted.map((entry, idx) => {
      const attemptNum = entry.attemptNumber || maxAttemptNumber - idx;
      const isLatest = idx === 0;

      // Merge latest submission links/notes if not explicitly defined on the history entry
      const activeSub = canonicalAssignment.submission;
      const files = entry.files && entry.files.length > 0
        ? entry.files
        : isLatest && activeSub?.files
        ? activeSub.files
        : [];

      const githubUrl = entry.githubUrl || (isLatest ? activeSub?.githubUrl : "");
      const demoUrl = entry.demoUrl || (isLatest ? activeSub?.demoUrl : "");
      const notes = entry.notes || (isLatest ? activeSub?.notes : "");

      // Associate feedback: in the model, feedback applies to the latest graded attempt
      const isGraded =
        entry.reviewState === "Graded" ||
        entry.status === "Graded" ||
        (isLatest && Boolean(canonicalAssignment.feedback));

      const attemptFeedback = isGraded ? canonicalAssignment.feedback : null;

      return {
        ...entry,
        attemptNumber: attemptNum,
        version: entry.version || `Attempt ${attemptNum}`,
        isLatest,
        files,
        githubUrl,
        demoUrl,
        notes,
        isGraded,
        feedback: attemptFeedback,
        reviewState: entry.reviewState || (isGraded ? "Graded" : entry.status || "Under Review"),
        marksEarned:
          entry.marksEarned ||
          (attemptFeedback?.score
            ? `${attemptFeedback.score} / ${attemptFeedback.maxScore || 10}`
            : null),
      };
    });
  }, [canonicalAssignment]);

  // Expanded attempt cards state (defaults to expanding the latest attempt)
  const [expandedAttempts, setExpandedAttempts] = useState({});

  useEffect(() => {
    if (!isOpen) return;

    if (initialAttemptNumber) {
      setExpandedAttempts({ [initialAttemptNumber]: true });
    } else if (normalizedAttempts.length > 0) {
      // Default to opening the latest attempt
      setExpandedAttempts({ [normalizedAttempts[0].attemptNumber]: true });
    }
  }, [isOpen, initialAttemptNumber, normalizedAttempts]);

  const toggleAttemptExpanded = (attemptNum) => {
    setExpandedAttempts((prev) => ({
      ...prev,
      [attemptNum]: !prev[attemptNum],
    }));
  };

  // Keyboard navigation & Focus management
  useEffect(() => {
    if (!isOpen) return;

    previouslyFocusedRef.current = document.activeElement;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      // Focus trap
      if (e.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Initial focus on close button or modal container
    setTimeout(() => {
      modalRef.current?.focus();
    }, 50);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
      if (previouslyFocusedRef.current && typeof previouslyFocusedRef.current.focus === "function") {
        previouslyFocusedRef.current.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Render Missing/Invalid Assignment Error State
  if (!canonicalAssignment) {
    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="submission-history-dialog-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200"
        onClick={onClose}
      >
        <div
          ref={modalRef}
          tabIndex={-1}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md rounded-3xl bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-2xl p-6 text-center space-y-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center border border-amber-200/60 dark:border-amber-900/40">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <h3
              id="submission-history-dialog-title"
              className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]"
            >
              Assignment Not Found
            </h3>
            <p className="text-xs text-[#55786B] dark:text-[#8FAFA4] mt-1">
              Submission history is currently unavailable because the requested assignment could
              not be resolved.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white dark:bg-[#159B72] dark:text-[#021512] text-xs font-bold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const hasSubmissions = normalizedAttempts.length > 0;
  const isCurrentlyGraded =
    canonicalAssignment.status === "graded" ||
    Boolean(canonicalAssignment.feedback?.score) ||
    normalizedAttempts.some((a) => a.isGraded);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="submission-history-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl sm:max-w-3xl max-h-[92vh] sm:max-h-[88vh] flex flex-col rounded-3xl bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 text-left focus:outline-hidden"
      >
        {/* =================================================================== */}
        {/* Header: Title, Assignment Context, Close Button                      */}
        {/* =================================================================== */}
        <div className="px-5 sm:px-6 py-4 border-b border-[#E8F1ED] dark:border-[#10372F] flex items-center justify-between bg-[#F7FBF9] dark:bg-[#082A24] shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/70 text-[#159B72] dark:text-[#20D39B] flex items-center justify-center shrink-0 border border-emerald-200/60 dark:border-emerald-800/40">
              <History className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2
                  id="submission-history-dialog-title"
                  className="text-base sm:text-lg font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight truncate"
                >
                  Submission History & Feedback
                </h2>
                <span className="text-[10.5px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-[#20D39B] border border-emerald-200/60 dark:border-emerald-800/40 shrink-0">
                  {canonicalAssignment.courseCode || canonicalAssignment.subject || "Academic Course"}
                </span>
              </div>
              <p className="text-xs text-[#55786B] dark:text-[#8FAFA4] truncate mt-0.5">
                {canonicalAssignment.title}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-[#658278] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-gray-100 dark:hover:bg-[#0A2E27] transition-colors cursor-pointer shrink-0"
            aria-label="Close submission history modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* =================================================================== */}
        {/* Status Bar: Attempt counts, marks, grading status                    */}
        {/* =================================================================== */}
        <div className="px-5 sm:px-6 py-2.5 bg-emerald-50/50 dark:bg-[#041D18] border-b border-[#E8F1ED] dark:border-[#10372F] flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#55786B] dark:text-[#8FAFA4]">
              Recorded Attempts:
            </span>
            <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6]">
              {normalizedAttempts.length} of {canonicalAssignment.maxAttempts || 3} allowed
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                isCurrentlyGraded
                  ? "bg-purple-100 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300"
                  : hasSubmissions
                  ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
                  : "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300"
              }`}
            >
              {isCurrentlyGraded
                ? "Evaluation Complete"
                : hasSubmissions
                ? "Solution Under Review"
                : "Not Submitted"}
            </span>

            {canonicalAssignment.marks && (
              <span className="text-[11px] font-semibold text-[#55786B] dark:text-[#8FAFA4]">
                Max Marks: {canonicalAssignment.marks}
              </span>
            )}
          </div>
        </div>

        {/* =================================================================== */}
        {/* Scrollable Content Body                                             */}
        {/* =================================================================== */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {/* 1. Empty State: No Submissions Yet */}
          {!hasSubmissions && (
            <div className="text-center py-10 sm:py-12 space-y-4 max-w-md mx-auto">
              <div className="w-14 h-14 rounded-3xl bg-emerald-50 dark:bg-[#082A24] text-emerald-700 dark:text-[#20D39B] mx-auto flex items-center justify-center border border-emerald-100 dark:border-[#10372F]">
                <Layers className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                  No Submissions Recorded Yet
                </h3>
                <p className="text-xs text-[#55786B] dark:text-[#8FAFA4] leading-relaxed">
                  Your submitted attempts and instructor feedback will appear here once you submit
                  your solution package through the submission workspace.
                </p>
              </div>

              {onReopenWorkspace && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onReopenWorkspace();
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white dark:bg-[#159B72] dark:hover:bg-[#108360] dark:text-[#021512] text-xs font-bold shadow-xs transition-colors cursor-pointer"
                >
                  <span>Go to Submission Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

          {/* 2. Submissions List: Render all attempt cards in chronological order */}
          {hasSubmissions && (
            <div className="space-y-3.5">
              <div className="flex items-center justify-between pb-1">
                <span className="text-[11px] font-bold text-[#658278] dark:text-[#789991] uppercase tracking-wider">
                  Audit Trail & Evaluation Logs ({normalizedAttempts.length})
                </span>
                <span className="text-[11px] text-[#658278] dark:text-[#789991]">
                  Click attempt cards to expand files and rubric remarks
                </span>
              </div>

              {normalizedAttempts.map((attempt) => {
                const isExpanded = Boolean(expandedAttempts[attempt.attemptNumber]);

                return (
                  <div
                    key={attempt.attemptNumber}
                    className={`rounded-2xl border transition-all duration-150 overflow-hidden ${
                      attempt.isLatest
                        ? "bg-[#FFFFFF] dark:bg-[#031C18] border-emerald-300 dark:border-emerald-800/80 shadow-xs"
                        : "bg-[#F8FAF9] dark:bg-[#041D18] border-[#E8F1ED] dark:border-[#10372F]"
                    }`}
                  >
                    {/* Attempt Header Summary Bar (Clickable) */}
                    <button
                      type="button"
                      onClick={() => toggleAttemptExpanded(attempt.attemptNumber)}
                      className="w-full text-left p-4 sm:p-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-emerald-50/30 dark:hover:bg-[#082A24]/40 transition-colors cursor-pointer"
                      aria-expanded={isExpanded}
                    >
                      {/* Left: Attempt Number, Status, Timestamp */}
                      <div className="flex items-start sm:items-center gap-3 min-w-0">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                            attempt.isLatest
                              ? "bg-emerald-600 text-white dark:bg-[#20D39B] dark:text-[#021512]"
                              : "bg-gray-100 text-[#55786B] dark:bg-[#0A3029] dark:text-[#9EC1B5]"
                          }`}
                        >
                          v{attempt.attemptNumber}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-xs sm:text-sm text-[#0B3024] dark:text-[#F1FAF6]">
                              {attempt.version}
                            </span>

                            {attempt.isLatest && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-[#20D39B] border border-emerald-200/60 dark:border-emerald-800/40">
                                <Sparkles className="w-2.5 h-2.5" />
                                <span>Current / Latest</span>
                              </span>
                            )}

                            <span
                              className={`px-2 py-0.5 rounded-full text-[10.5px] font-bold ${
                                attempt.reviewState === "Graded"
                                  ? "bg-purple-100 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300"
                                  : "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
                              }`}
                            >
                              {attempt.reviewState}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-[11px] text-[#658278] dark:text-[#789991] mt-1">
                            <Clock className="w-3 h-3 text-gray-400" />
                            <span>Submitted: {attempt.submittedAt}</span>
                            {attempt.files && attempt.files.length > 0 && (
                              <>
                                <span>•</span>
                                <span>
                                  {attempt.files.length}{" "}
                                  {attempt.files.length === 1 ? "file" : "files"}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right: Score, Feedback availability & Chevron */}
                      <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100 dark:border-[#10372F]">
                        {attempt.marksEarned ? (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-50 dark:bg-[#06241F] border border-emerald-200/70 dark:border-emerald-800 text-emerald-800 dark:text-[#20D39B] text-xs font-bold">
                            <Award className="w-3.5 h-3.5" />
                            <span>{attempt.marksEarned}</span>
                          </div>
                        ) : (
                          <span className="text-[11px] font-medium text-[#789991] dark:text-[#5E837A] italic">
                            Score pending
                          </span>
                        )}

                        <div className="flex items-center gap-1 text-[#658278] dark:text-[#8AA89F]">
                          <span className="text-[11px] font-semibold hidden md:inline">
                            {isExpanded ? "Collapse" : "Inspect"}
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </div>
                      </div>
                    </button>

                    {/* Expandable Section Details */}
                    {isExpanded && (
                      <div className="p-4 sm:p-5 pt-0 space-y-4 border-t border-gray-100 dark:border-[#10372F]/70 mt-1">
                        {/* 1. Submitted Files & Artifacts */}
                        <div className="space-y-2 pt-3">
                          <span className="text-[11px] font-bold text-[#658278] dark:text-[#789991] uppercase tracking-wider block">
                            Submitted Artifacts & Attachments
                          </span>

                          {attempt.files && attempt.files.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {attempt.files.map((file, fIdx) => (
                                <div
                                  key={fIdx}
                                  className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] text-xs"
                                >
                                  <div className="flex items-center gap-2 min-w-0">
                                    <FileArchive className="w-4 h-4 text-emerald-600 dark:text-[#20D39B] shrink-0" />
                                    <div className="min-w-0">
                                      <p className="font-semibold text-[#0B3024] dark:text-[#F1FAF6] truncate max-w-[190px]">
                                        {file.name}
                                      </p>
                                      {file.size && (
                                        <p className="text-[10px] text-[#658278] dark:text-[#789991]">
                                          {file.size} {file.type ? `• ${file.type}` : ""}
                                        </p>
                                      )}
                                    </div>
                                  </div>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      onDownloadAttachment
                                        ? onDownloadAttachment(file.name)
                                        : null
                                    }
                                    title={`Download ${file.name}`}
                                    className="p-1.5 rounded-lg text-[#55786B] hover:text-[#0B3024] dark:text-[#8FAFA4] dark:hover:text-[#F1FAF6] hover:bg-gray-100 dark:hover:bg-[#082A24] transition-colors cursor-pointer shrink-0"
                                    aria-label={`Download ${file.name}`}
                                  >
                                    <Download className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-xs text-[#658278] dark:text-[#789991] italic">
                              No archived files were attached to this attempt.
                            </p>
                          )}
                        </div>

                        {/* 2. Submitted Links (GitHub, Demo) */}
                        {(attempt.githubUrl || attempt.demoUrl) && (
                          <div className="space-y-2">
                            <span className="text-[11px] font-bold text-[#658278] dark:text-[#789991] uppercase tracking-wider block">
                              Source Verification Links
                            </span>
                            <div className="flex flex-wrap gap-2 text-xs">
                              {attempt.githubUrl && (
                                <a
                                  href={attempt.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] text-[#0B3024] dark:text-[#F1FAF6] hover:border-emerald-300 font-medium"
                                >
                                  <GithubIcon className="w-3.5 h-3.5 text-emerald-600 dark:text-[#20D39B]" />
                                  <span className="truncate max-w-[220px]">
                                    {attempt.githubUrl}
                                  </span>
                                  <ExternalLink className="w-3 h-3 text-gray-400" />
                                </a>
                              )}
                              {attempt.demoUrl && (
                                <a
                                  href={attempt.demoUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] text-[#0B3024] dark:text-[#F1FAF6] hover:border-emerald-300 font-medium"
                                >
                                  <Globe className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                                  <span className="truncate max-w-[220px]">
                                    {attempt.demoUrl}
                                  </span>
                                  <ExternalLink className="w-3 h-3 text-gray-400" />
                                </a>
                              )}
                            </div>
                          </div>
                        )}

                        {/* 3. Student Notes / Remarks */}
                        {attempt.notes && (
                          <div className="p-3 rounded-xl bg-white dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] text-xs space-y-1">
                            <span className="text-[10px] font-bold text-[#658278] dark:text-[#789991] uppercase tracking-wider block">
                              Student Submission Notes
                            </span>
                            <p className="text-[#35574C] dark:text-[#C5DCD4] leading-relaxed">
                              {attempt.notes}
                            </p>
                          </div>
                        )}

                        {/* 4. Faculty Evaluation Feedback for this Attempt */}
                        <div className="pt-2 border-t border-gray-100 dark:border-[#10372F]/60 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-[#658278] dark:text-[#789991] uppercase tracking-wider">
                              Faculty Evaluation & Remarks
                            </span>

                            {attempt.feedback?.gradedAt && (
                              <span className="text-[11px] text-[#658278] dark:text-[#789991]">
                                Evaluated on {attempt.feedback.gradedAt}
                              </span>
                            )}
                          </div>

                          {attempt.feedback ? (
                            <div className="space-y-3">
                              {/* Evaluator Card & Comment */}
                              <div className="p-3.5 rounded-xl bg-[#F0F8F5] dark:bg-[#021815] border border-emerald-200/70 dark:border-emerald-900/60 space-y-2">
                                <div className="flex items-center justify-between text-xs flex-wrap gap-1">
                                  <div className="flex items-center gap-1.5 font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                                    <User className="w-3.5 h-3.5 text-emerald-600 dark:text-[#20D39B]" />
                                    <span>
                                      Evaluator:{" "}
                                      {attempt.feedback.facultyName ||
                                        canonicalAssignment.faculty?.name ||
                                        "Course Instructor"}
                                    </span>
                                  </div>

                                  {attempt.feedback.score && (
                                    <span className="font-bold text-emerald-800 dark:text-[#20D39B]">
                                      Final Score: {attempt.feedback.score} /{" "}
                                      {attempt.feedback.maxScore || 10}
                                    </span>
                                  )}
                                </div>

                                <p className="text-xs text-[#35574C] dark:text-[#C5DCD4] leading-relaxed italic border-l-2 border-emerald-500 pl-2.5 my-1">
                                  "{attempt.feedback.comment}"
                                </p>
                              </div>

                              {/* Rubric Criterion Breakdown */}
                              {attempt.feedback.rubricBreakdown && (
                                <div className="space-y-2">
                                  <span className="text-[11px] font-bold text-[#0B3024] dark:text-[#F1FAF6] uppercase tracking-wider block">
                                    Criterion Rubric Breakdown
                                  </span>

                                  <div className="space-y-1.5">
                                    {attempt.feedback.rubricBreakdown.map((item, rIdx) => {
                                      const pct = Math.round((item.earned / item.total) * 100);
                                      return (
                                        <div
                                          key={rIdx}
                                          className="p-2.5 rounded-xl bg-white dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] space-y-1"
                                        >
                                          <div className="flex items-center justify-between text-xs">
                                            <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
                                              {item.name}
                                            </span>
                                            <span className="font-bold text-emerald-700 dark:text-[#20D39B]">
                                              {item.earned} / {item.total} pts ({pct}%)
                                            </span>
                                          </div>
                                          <div className="w-full h-1.5 rounded-full bg-gray-100 dark:bg-[#06241F] overflow-hidden">
                                            <div
                                              className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                                              style={{ width: `${pct}%` }}
                                            />
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                            </div>
                          ) : !attempt.isLatest ? (
                            /* Superseded earlier attempt state */
                            <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-[#021512] border border-gray-200 dark:border-[#10372F] text-xs text-[#55786B] dark:text-[#8FAFA4] flex items-center gap-2.5">
                              <History className="w-4 h-4 text-gray-400 shrink-0" />
                              <span>
                                This attempt was superseded by Version {normalizedAttempts[0].attemptNumber}.
                                Refer to your latest submission for the authoritative evaluation.
                              </span>
                            </div>
                          ) : (
                            /* Latest submission still under review */
                            <div className="p-3.5 rounded-xl bg-amber-50/60 dark:bg-[#1A1405]/50 border border-amber-200/70 dark:border-amber-900/50 text-xs flex items-center gap-2.5">
                              <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                              <div className="text-amber-900 dark:text-amber-200 leading-snug">
                                <span className="font-bold block">Evaluation in Progress</span>
                                <span className="text-[11px] text-amber-800/80 dark:text-amber-300/80">
                                  Your instructor has not published feedback for this attempt yet.
                                  Evaluations are usually completed within 2–3 academic days.
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* =================================================================== */}
        {/* Footer: Reopen Workspace CTA & Modal Dismiss Action                 */}
        {/* =================================================================== */}
        <div className="px-5 sm:px-6 py-3.5 border-t border-[#E8F1ED] dark:border-[#10372F] flex items-center justify-between flex-wrap gap-2 bg-[#F7FBF9] dark:bg-[#082A24] shrink-0">
          <div className="flex items-center gap-2">
            {canonicalAssignment.resubmissionAllowed && onReopenWorkspace && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onReopenWorkspace();
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-50 dark:bg-[#0B352B] text-emerald-800 dark:text-[#20D39B] border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Make New Submission Attempt</span>
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-[#159B72] dark:hover:bg-[#108360] dark:text-[#021512] transition-colors cursor-pointer shadow-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
