"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { getAssignmentDetails } from "./assignmentDetailsData";
import AssignmentHero from "./AssignmentHero";
import AssignmentOverview from "./AssignmentOverview";
import ProblemStatement from "./ProblemStatement";
import AssignmentRequirements from "./AssignmentRequirements";
import TeacherInstructions from "./TeacherInstructions";
import AssignmentResources from "./AssignmentResources";
import SubmissionWorkspace from "./SubmissionWorkspace";
import SubmissionHistory from "./SubmissionHistory";
import FacultyFeedback from "./FacultyFeedback";
import DeadlineCard from "./DeadlineCard";
import SubmissionStatusCard from "./SubmissionStatusCard";
import GradingRubric from "./GradingRubric";
import FacultyCard from "./FacultyCard";
import AssignmentQuickActions from "./AssignmentQuickActions";
import AskFacultyModal from "./AskFacultyModal";
import SubmitConfirmationModal from "./SubmitConfirmationModal";
import ReportProblemModal from "./ReportProblemModal";
import MobileSubmissionBar from "./MobileSubmissionBar";
import AssignmentNotFound from "./AssignmentNotFound";
import AssignmentDetailsSkeleton from "./AssignmentDetailsSkeleton";

export default function AssignmentDetailsAssembler({ assignmentId, isLoading = false }) {
  if (isLoading) {
    return <AssignmentDetailsSkeleton />;
  }

  const initialAssignment = getAssignmentDetails(assignmentId);

  if (!initialAssignment) {
    return <AssignmentNotFound assignmentId={assignmentId} />;
  }

  // Interactive Component State
  const [assignment, setAssignment] = useState(initialAssignment);
  const [isSaved, setIsSaved] = useState(Boolean(initialAssignment.isSaved));
  const [activeSubmission, setActiveSubmission] = useState(initialAssignment.submission);
  const [submissionHistory, setSubmissionHistory] = useState(
    initialAssignment.submissionHistory || []
  );
  const [pendingPayload, setPendingPayload] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isAskModalOpen, setIsAskModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleToggleSave = () => {
    setIsSaved((prev) => {
      const next = !prev;
      showToast(
        next
          ? "Assignment saved! You can review it in your saved items."
          : "Assignment removed from saved items."
      );
      return next;
    });
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
    }
    showToast("Assignment link copied to clipboard.");
  };

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator
        .share({
          title: `${assignment.subject} — ${assignment.title}`,
          text: assignment.description,
          url: window.location.href,
        })
        .catch(() => handleCopyLink());
    } else {
      handleCopyLink();
    }
  };

  const handleScrollToSubmission = () => {
    const el = document.getElementById("submission-workspace");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleInitiateSubmit = (payload) => {
    setPendingPayload(payload);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmSubmit = (payload) => {
    const attemptNum = (activeSubmission ? activeSubmission.attempt : 0) + 1;
    const nowTime = new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const newFiles = [];
    if (payload.primaryFile) {
      newFiles.push({
        name: payload.primaryFile.name,
        size: `${(payload.primaryFile.size / (1024 * 1024)).toFixed(1)} MB`,
        type: "Primary Solution",
      });
    }
    if (payload.docFile) {
      newFiles.push({
        name: payload.docFile.name,
        size: `${(payload.docFile.size / (1024 * 1024)).toFixed(1)} MB`,
        type: "Documentation",
      });
    }
    if (payload.screenshotFile) {
      newFiles.push({
        name: payload.screenshotFile.name,
        size: `${(payload.screenshotFile.size / (1024 * 1024)).toFixed(1)} MB`,
        type: "Screenshot Proof",
      });
    }

    const createdSubmission = {
      submittedAt: nowTime,
      attempt: attemptNum,
      status: "Under Review",
      files: newFiles,
      githubUrl: payload.githubUrl,
      demoUrl: payload.demoUrl,
      notes: payload.notes,
    };

    const newHistoryVersion = {
      version: `Version ${submissionHistory.length + 1}`,
      submittedAt: nowTime,
      status: "Submitted",
      reviewState: "Under Review",
      attemptNumber: attemptNum,
      files: newFiles,
      marksEarned: null,
    };

    setActiveSubmission(createdSubmission);
    setSubmissionHistory((prev) => [newHistoryVersion, ...prev]);

    setAssignment((prev) => ({
      ...prev,
      status: "submitted",
      dueStatus: "Submitted before deadline",
      currentAttempt: attemptNum,
    }));

    showToast("Assignment submitted successfully! Solution queued for faculty evaluation.");
    handleScrollToSubmission();
  };

  const handleDownloadResource = (name) => {
    showToast(`Downloading "${name}"...`);
  };

  const handleDownloadBrief = () => {
    const brief = assignment.resources?.[0]?.name || "Assignment_Brief.pdf";
    showToast(`Downloading "${brief}"...`);
  };

  const handleDownloadAllResources = () => {
    showToast(`Downloading all resources bundle for "${assignment.title}"...`);
  };

  const handleDownloadSubmittedFiles = () => {
    showToast("Downloading your submitted solution package...");
  };

  const handleAskQuestionSubmit = ({ subject, message }) => {
    showToast(`Question on "${subject}" sent to ${assignment.faculty?.name || "faculty"}!`);
  };

  const handleReportProblemSubmit = ({ issueType }) => {
    showToast(`Issue reported: "${issueType}". Academic committee will investigate.`);
  };

  const handleResetForTesting = () => {
    setActiveSubmission(null);
    setAssignment((prev) => ({
      ...prev,
      status: "pending",
      dueStatus: "Due in 2 days",
    }));
    showToast("Workspace reopened for new submission attempt.");
    handleScrollToSubmission();
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto pb-20 lg:pb-12 space-y-4">
      {/* Compact Back Navigation (Strictly no large breadcrumb) */}
      <div className="flex items-center justify-between">
        <Link
          href="/student/assignments"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#55786B] dark:text-[#8FAFA4] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Assignments</span>
        </Link>
      </div>

      {/* ========================================================================= */}
      {/* MASTER 2-COLUMN GRID (Left ~2/3 Main Content + Right ~1/3 Sticky Sidebar) */}
      {/* Both columns start at the EXACT SAME top vertical level                   */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* ========================================================================= */}
        {/* MAIN 2/3 COLUMN: Hero, Overview, Problem, Requirements, Instructions,     */}
        {/* Resources, Submission Workspace, Submission History, Faculty Feedback     */}
        {/* ========================================================================= */}
        <div className="lg:col-span-8 space-y-5">
          {/* 1. Assignment Hero */}
          <AssignmentHero
            assignment={assignment}
            isSaved={isSaved}
            onToggleSave={handleToggleSave}
            onShare={handleShare}
            onOpenReportModal={() => setIsReportModalOpen(true)}
            onSubmitClick={handleScrollToSubmission}
          />

          {/* 2. Assignment Overview */}
          <AssignmentOverview overview={assignment.overview} />

          {/* 3. Problem Statement & Specification */}
          <ProblemStatement problemStatement={assignment.problemStatement} />

          {/* 4. Submission Checklist & Requirements */}
          <AssignmentRequirements
            requirements={assignment.requirements}
            requiredStack={assignment.requiredStack}
          />

          {/* 5. Teacher Instructions */}
          <TeacherInstructions instructions={assignment.teacherInstructions} />

          {/* 6. Attached Resources */}
          <AssignmentResources
            resources={assignment.resources}
            onDownload={handleDownloadResource}
          />

          {/* 7. Central Submission Workspace (Most Important Section) */}
          <SubmissionWorkspace
            assignment={assignment}
            activeSubmission={activeSubmission}
            onInitiateSubmit={handleInitiateSubmit}
            onDownloadSubmittedFiles={handleDownloadSubmittedFiles}
            onResetSubmissionForTesting={handleResetForTesting}
          />

          {/* 8. Submission History */}
          <SubmissionHistory history={submissionHistory} />

          {/* 9. Faculty Evaluation Feedback */}
          <FacultyFeedback
            feedback={assignment.feedback}
            isSubmitted={Boolean(activeSubmission)}
            isGraded={assignment.status === "graded"}
          />
        </div>

        {/* ========================================================================= */}
        {/* RIGHT 1/3 SIDEBAR: Sticky desktop, begins at exact same top level as Hero */}
        {/* ========================================================================= */}
        <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-20">
          {/* 1. Deadline Card */}
          <DeadlineCard assignment={assignment} activeSubmission={activeSubmission} />

          {/* 2. Submission Status Card */}
          <SubmissionStatusCard assignment={assignment} activeSubmission={activeSubmission} />

          {/* 3. Grading Rubric Card */}
          <GradingRubric rubric={assignment.rubric} feedback={assignment.feedback} />

          {/* 4. Subject Faculty Card */}
          <FacultyCard
            faculty={assignment.faculty}
            onAskFaculty={() => setIsAskModalOpen(true)}
          />

          {/* 5. Quick Actions Card */}
          <AssignmentQuickActions
            onDownloadBrief={handleDownloadBrief}
            onDownloadResources={handleDownloadAllResources}
            onAskFaculty={() => setIsAskModalOpen(true)}
          />
        </div>
      </div>

      {/* Floating Feedback Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-[#06241F] text-white dark:bg-[#20D39B] dark:text-[#06241F] text-xs font-semibold shadow-xl border border-white/10 dark:border-black/10 animate-fade-in pointer-events-none">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-[#06241F] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Mobile Sticky Bottom Action Bar */}
      <MobileSubmissionBar
        assignment={assignment}
        activeSubmission={activeSubmission}
        onActionClick={handleScrollToSubmission}
      />

      {/* Pre-Submission Confirmation Modal */}
      <SubmitConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        submissionPayload={pendingPayload}
        assignmentTitle={assignment.title}
        attemptNumber={(activeSubmission ? activeSubmission.attempt : 0) + 1}
        maxAttempts={assignment.maxAttempts || 3}
        onConfirm={handleConfirmSubmit}
      />

      {/* Ask Faculty Modal */}
      <AskFacultyModal
        isOpen={isAskModalOpen}
        onClose={() => setIsAskModalOpen(false)}
        facultyName={assignment.faculty?.name}
        subject={assignment.subject}
        onSubmitQuestion={handleAskQuestionSubmit}
      />

      {/* Report Problem Modal */}
      <ReportProblemModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        assignmentTitle={assignment.title}
        onSubmitReport={handleReportProblemSubmit}
      />
    </div>
  );
}
