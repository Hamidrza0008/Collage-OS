"use client";

import { useState, useRef } from "react";
import {
  UploadCloud,
  FileArchive,
  FileText,
  Image,
  Globe,
  CheckCircle2,
  AlertCircle,
  X,
  ArrowRight,
  RotateCcw,
  Download,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import GithubIcon from "./GithubIcon";

const ALLOWED_EXTENSIONS = [".zip", ".pdf", ".docx", ".png", ".jpg", ".jpeg"];
const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024; // 50 MB

export default function SubmissionWorkspace({
  assignment,
  activeSubmission,
  onInitiateSubmit,
  onDownloadSubmittedFiles,
  onResetSubmissionForTesting,
}) {
  const [primaryFile, setPrimaryFile] = useState(null);
  const [docFile, setDocFile] = useState(null);
  const [screenshotFile, setScreenshotFile] = useState(null);
  const [githubUrl, setGithubUrl] = useState("");
  const [demoUrl, setDemoUrl] = useState("");
  const [submissionNotes, setSubmissionNotes] = useState("");
  const [errors, setErrors] = useState({});
  const [isDragOver, setIsDragOver] = useState(false);

  const primaryInputRef = useRef(null);
  const docInputRef = useRef(null);
  const screenshotInputRef = useRef(null);

  // Validate a single file
  const validateFile = (file) => {
    if (!file) return "File is required.";
    const ext = "." + file.name.split(".").pop().toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return `File type ${ext} not allowed. Please use ZIP, PDF, DOCX, PNG, or JPG.`;
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return "File size exceeds the 50 MB limit.";
    }
    return null;
  };

  const handlePrimaryFileSelect = (file) => {
    if (!file) return;
    const err = validateFile(file);
    if (err) {
      setErrors((prev) => ({ ...prev, primaryFile: err }));
      return;
    }
    setErrors((prev) => ({ ...prev, primaryFile: null }));
    setPrimaryFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handlePrimaryFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleValidateAndSubmit = () => {
    const newErrors = {};

    // 1. Primary file required
    if (!primaryFile) {
      newErrors.primaryFile = "Please upload your project ZIP or source file.";
    } else {
      const err = validateFile(primaryFile);
      if (err) newErrors.primaryFile = err;
    }

    // 2. GitHub repo URL validation
    if (!githubUrl.trim()) {
      newErrors.githubUrl = "GitHub repository link is required for code verification.";
    } else if (
      !githubUrl.includes("github.com") &&
      !githubUrl.startsWith("http://") &&
      !githubUrl.startsWith("https://")
    ) {
      newErrors.githubUrl = "Please provide a valid repository URL (e.g., https://github.com/...)";
    }

    // 3. Demo URL validation if provided
    if (demoUrl.trim() && !demoUrl.startsWith("http://") && !demoUrl.startsWith("https://")) {
      newErrors.demoUrl = "Live demo URL must begin with http:// or https://";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    // Collect submission payload
    const submissionPayload = {
      primaryFile,
      docFile,
      screenshotFile,
      githubUrl,
      demoUrl,
      notes: submissionNotes,
      submittedAt: new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    onInitiateSubmit(submissionPayload);
  };

  // If already submitted and showing success state
  if (activeSubmission) {
    return (
      <div
        id="submission-workspace"
        className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-emerald-300 dark:border-emerald-800/80 rounded-2xl shadow-sm p-5 sm:p-6 lg:p-7 transition-all space-y-5"
      >
        {/* Success Banner */}
        <div className="flex items-start gap-3.5 p-4 rounded-xl bg-emerald-50 dark:bg-[#04241C] border border-emerald-200/80 dark:border-emerald-900/60">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 dark:bg-[#159B72] text-white dark:text-[#021512] flex items-center justify-center shrink-0 mt-0.5">
            <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base sm:text-lg font-extrabold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
                Assignment Submitted Successfully
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-200/80 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300">
                Attempt {activeSubmission.attempt || 1} of {assignment.maxAttempts || 3}
              </span>
            </div>
            <p className="text-xs text-[#36594C] dark:text-[#A7CBC0] mt-1">
              Your solution has been submitted to the academic portal and is currently queued for
              faculty evaluation.
            </p>
          </div>
        </div>

        {/* Submission Details Card */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-[#F8FAF9] dark:bg-[#041D18] border border-[#E8F1ED] dark:border-[#10372F] text-xs">
          <div>
            <span className="text-[11px] font-bold text-[#658278] dark:text-[#789991] uppercase tracking-wider block">
              Submission Timestamp
            </span>
            <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6] mt-0.5 block">
              {activeSubmission.submittedAt || "18 Aug 2025 • 10:42 PM"}
            </span>
          </div>

          <div>
            <span className="text-[11px] font-bold text-[#658278] dark:text-[#789991] uppercase tracking-wider block">
              Status
            </span>
            <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 dark:text-[#20D39B] mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {activeSubmission.status || "Under Review"}
            </span>
          </div>

          <div>
            <span className="text-[11px] font-bold text-[#658278] dark:text-[#789991] uppercase tracking-wider block">
              Current Attempt
            </span>
            <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6] mt-0.5 block">
              Attempt {activeSubmission.attempt || 1} / {assignment.maxAttempts || 3}
            </span>
          </div>
        </div>

        {/* Submitted Files List */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] uppercase tracking-wider">
            Submitted Artifacts
          </h3>
          <div className="space-y-2">
            {(activeSubmission.files || []).map((file, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-[#031A16] border border-[#D8E8E2] dark:border-[#10372F]"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <FileArchive className="w-4 h-4 text-emerald-600 dark:text-[#20D39B] shrink-0" />
                  <span className="text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] truncate">
                    {file.name}
                  </span>
                  <span className="text-[11px] text-[#658278] dark:text-[#789991] shrink-0">
                    ({file.size})
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submitted Links */}
        {(activeSubmission.githubUrl || activeSubmission.demoUrl) && (
          <div className="flex flex-wrap gap-2 pt-1 text-xs">
            {activeSubmission.githubUrl && (
              <a
                href={activeSubmission.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F8FAF9] dark:bg-[#041D18] border border-[#D8E8E2] dark:border-[#10372F] text-[#0B3024] dark:text-[#C5DCD4] hover:border-emerald-300 font-medium"
              >
                <GithubIcon className="w-3.5 h-3.5 text-emerald-600" />
                <span className="truncate max-w-[200px]">{activeSubmission.githubUrl}</span>
              </a>
            )}
            {activeSubmission.demoUrl && (
              <a
                href={activeSubmission.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F8FAF9] dark:bg-[#041D18] border border-[#D8E8E2] dark:border-[#10372F] text-[#0B3024] dark:text-[#C5DCD4] hover:border-emerald-300 font-medium"
              >
                <Globe className="w-3.5 h-3.5 text-blue-600" />
                <span className="truncate max-w-[200px]">{activeSubmission.demoUrl}</span>
              </a>
            )}
          </div>
        )}

        {/* Action Buttons: Download Files, Re-submit, Back to assignments */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#E8F1ED] dark:border-[#10372F]">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={onDownloadSubmittedFiles}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-[#041D18] text-[#0B3024] dark:text-[#C5DCD4] border border-[#D8E8E2] dark:border-[#10372F] hover:bg-emerald-50/50 dark:hover:bg-[#082A24] transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Submitted Files</span>
            </button>

            {assignment.resubmissionAllowed && (
              <button
                type="button"
                onClick={onResetSubmissionForTesting}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-50 dark:bg-[#0A3029] text-emerald-800 dark:text-[#20D39B] border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100/70 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Re-submit Assignment</span>
              </button>
            )}
          </div>

          <Link
            href="/student/assignments"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-[#20D39B] hover:underline"
          >
            <span>Back to Assignments</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  // Active Upload Form
  return (
    <div
      id="submission-workspace"
      className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-5 sm:p-6 lg:p-7 transition-all space-y-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E8F1ED] dark:border-[#10372F] flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-[#20D39B] flex items-center justify-center shrink-0">
            <UploadCloud className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
              Submit Your Work
            </h2>
            <p className="text-[11px] text-[#5C786E] dark:text-[#8AA89F]">
              Upload source archives, supporting documentation, and repository links
            </p>
          </div>
        </div>

        <span className="text-[11px] font-semibold text-[#55786B] dark:text-[#8FAFA4] bg-[#F5FAF8] dark:bg-[#041D18] px-2.5 py-1 rounded-md border border-[#D8E8E2] dark:border-[#10372F]">
          Attempt {assignment.currentAttempt || 1} of {assignment.maxAttempts || 3}
        </span>
      </div>

      {/* Main Drag & Drop Box */}
      <div>
        <label className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] block mb-1.5">
          Project Archive / Source Code <span className="text-rose-500">*</span>
        </label>

        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center transition-all cursor-pointer ${
            isDragOver
              ? "border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/30"
              : errors.primaryFile
              ? "border-rose-400 bg-rose-50/30 dark:bg-rose-950/20"
              : "border-[#D8E8E2] dark:border-[#16463D] hover:border-emerald-400 dark:hover:border-emerald-700 bg-[#FAFDFC] dark:bg-[#031A16]"
          }`}
          onClick={() => primaryInputRef.current?.click()}
        >
          <input
            ref={primaryInputRef}
            type="file"
            className="hidden"
            accept=".zip,.pdf,.docx,.png,.jpg,.jpeg"
            onChange={(e) => handlePrimaryFileSelect(e.target.files?.[0])}
          />

          {primaryFile ? (
            <div
              className="flex items-center justify-between p-3.5 rounded-xl bg-white dark:bg-[#041D18] border border-emerald-200 dark:border-emerald-800 text-left max-w-lg mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 min-w-0">
                <FileArchive className="w-6 h-6 text-emerald-600 dark:text-[#20D39B] shrink-0" />
                <div className="min-w-0">
                  <span className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] block truncate">
                    {primaryFile.name}
                  </span>
                  <span className="text-[11px] text-[#658278] dark:text-[#8AA89F]">
                    {(primaryFile.size / (1024 * 1024)).toFixed(2)} MB • Ready for submission
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPrimaryFile(null)}
                className="p-1 text-gray-400 hover:text-rose-500 transition-colors cursor-pointer"
                title="Remove file"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-[#20D39B] flex items-center justify-center mx-auto shadow-2xs">
                <UploadCloud className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <p className="text-xs sm:text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                  <span className="text-emerald-700 dark:text-[#20D39B] hover:underline">
                    Click to browse files
                  </span>{" "}
                  or drag and drop here
                </p>
                <p className="text-[11px] text-[#658278] dark:text-[#789991]">
                  Allowed formats: ZIP, PDF, DOCX, PNG, JPG • Maximum file size: 50 MB
                </p>
              </div>
            </div>
          )}
        </div>

        {errors.primaryFile && (
          <p className="text-xs text-rose-600 dark:text-rose-400 mt-1.5 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errors.primaryFile}</span>
          </p>
        )}
      </div>

      {/* Secondary File Upload Slots: Docs & Screenshots */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        {/* Slot 1: Documentation */}
        <div className="p-3.5 rounded-xl bg-[#F8FAF9] dark:bg-[#041D18] border border-[#E8F1ED] dark:border-[#10372F] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-emerald-600 dark:text-[#20D39B]" />
              <span>Project Report (PDF/DOCX)</span>
            </span>
            <span className="text-[10px] text-[#8AA89F]">Optional</span>
          </div>

          <input
            ref={docInputRef}
            type="file"
            className="hidden"
            accept=".pdf,.docx"
            onChange={(e) => setDocFile(e.target.files?.[0] || null)}
          />

          {docFile ? (
            <div className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-[#021512] border border-emerald-200 dark:border-emerald-800 text-xs">
              <span className="truncate max-w-[160px] font-medium text-[#0B3024] dark:text-[#F1FAF6]">
                {docFile.name}
              </span>
              <button
                type="button"
                onClick={() => setDocFile(null)}
                className="text-gray-400 hover:text-rose-500 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => docInputRef.current?.click()}
              className="w-full py-1.5 px-3 rounded-lg border border-dashed border-[#D8E8E2] dark:border-[#10372F] text-xs font-semibold text-[#55786B] dark:text-[#8FAFA4] hover:border-emerald-400 hover:text-emerald-700 transition-colors cursor-pointer text-center"
            >
              + Attach Documentation
            </button>
          )}
        </div>

        {/* Slot 2: Screenshot Proof */}
        <div className="p-3.5 rounded-xl bg-[#F8FAF9] dark:bg-[#041D18] border border-[#E8F1ED] dark:border-[#10372F] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] flex items-center gap-1.5">
              <Image className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Screenshots / Proof (PNG/JPG)</span>
            </span>
            <span className="text-[10px] text-[#8AA89F]">Optional</span>
          </div>

          <input
            ref={screenshotInputRef}
            type="file"
            className="hidden"
            accept=".png,.jpg,.jpeg"
            onChange={(e) => setScreenshotFile(e.target.files?.[0] || null)}
          />

          {screenshotFile ? (
            <div className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-[#021512] border border-emerald-200 dark:border-emerald-800 text-xs">
              <span className="truncate max-w-[160px] font-medium text-[#0B3024] dark:text-[#F1FAF6]">
                {screenshotFile.name}
              </span>
              <button
                type="button"
                onClick={() => setScreenshotFile(null)}
                className="text-gray-400 hover:text-rose-500 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => screenshotInputRef.current?.click()}
              className="w-full py-1.5 px-3 rounded-lg border border-dashed border-[#D8E8E2] dark:border-[#10372F] text-xs font-semibold text-[#55786B] dark:text-[#8FAFA4] hover:border-emerald-400 hover:text-emerald-700 transition-colors cursor-pointer text-center"
            >
              + Attach Screenshot
            </button>
          )}
        </div>
      </div>

      {/* Repository & Live Demo URLs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        {/* GitHub URL */}
        <div>
          <label className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] block mb-1">
            GitHub Repository URL <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <GithubIcon className="w-4 h-4 absolute left-3 top-2.5 text-[#658278] dark:text-[#789991]" />
            <input
              type="url"
              value={githubUrl}
              onChange={(e) => {
                setGithubUrl(e.target.value);
                if (errors.githubUrl) setErrors((prev) => ({ ...prev, githubUrl: null }));
              }}
              placeholder="https://github.com/username/project"
              className={`w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-white dark:bg-[#041D18] border text-[#0B3024] dark:text-[#F1FAF6] focus:outline-none transition-colors ${
                errors.githubUrl
                  ? "border-rose-400 focus:border-rose-500"
                  : "border-[#D8E8E2] dark:border-[#10372F] focus:border-emerald-500"
              }`}
            />
          </div>
          {errors.githubUrl && (
            <p className="text-xs text-rose-600 dark:text-rose-400 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3 shrink-0" />
              <span>{errors.githubUrl}</span>
            </p>
          )}
        </div>

        {/* Live Demo URL */}
        <div>
          <label className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] block mb-1">
            Live Deployment URL <span className="text-[10px] text-[#8AA89F] font-normal">(Optional)</span>
          </label>
          <div className="relative">
            <Globe className="w-4 h-4 absolute left-3 top-2.5 text-[#658278] dark:text-[#789991]" />
            <input
              type="url"
              value={demoUrl}
              onChange={(e) => {
                setDemoUrl(e.target.value);
                if (errors.demoUrl) setErrors((prev) => ({ ...prev, demoUrl: null }));
              }}
              placeholder="https://my-project.vercel.app"
              className={`w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-white dark:bg-[#041D18] border text-[#0B3024] dark:text-[#F1FAF6] focus:outline-none transition-colors ${
                errors.demoUrl
                  ? "border-rose-400 focus:border-rose-500"
                  : "border-[#D8E8E2] dark:border-[#10372F] focus:border-emerald-500"
              }`}
            />
          </div>
          {errors.demoUrl && (
            <p className="text-xs text-rose-600 dark:text-rose-400 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3 shrink-0" />
              <span>{errors.demoUrl}</span>
            </p>
          )}
        </div>
      </div>

      {/* Submission Remarks / Notes */}
      <div>
        <label className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] block mb-1">
          Submission Remarks / Notes for Evaluator
        </label>
        <textarea
          rows={2}
          value={submissionNotes}
          onChange={(e) => setSubmissionNotes(e.target.value)}
          placeholder="Add any specific notes on environment setup, test credentials, or implemented bonus features..."
          className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-[#041D18] border border-[#D8E8E2] dark:border-[#10372F] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-none focus:border-emerald-500 transition-colors"
        />
      </div>

      {/* Submit Action Row */}
      <div className="pt-3 border-t border-[#E8F1ED] dark:border-[#10372F] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <p className="text-[11px] text-[#658278] dark:text-[#789991]">
          By submitting, you confirm that this work is your own original solution.
        </p>

        <button
          type="button"
          onClick={handleValidateAndSubmit}
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white dark:bg-[#159B72] dark:hover:bg-[#108360] dark:text-[#021512] text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer shrink-0"
        >
          <span>Submit Assignment</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
