"use client";

import { useState } from "react";
import { X, CheckCircle, FileArchive, Globe, Loader2, ArrowRight } from "lucide-react";

export default function SubmitConfirmationModal({
  isOpen,
  onClose,
  submissionPayload,
  assignmentTitle,
  attemptNumber,
  maxAttempts,
  onConfirm,
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  if (!isOpen || !submissionPayload) return null;

  const handleConfirmSubmission = () => {
    setIsUploading(true);
    setUploadProgress(15);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            onConfirm(submissionPayload);
            onClose();
          }, 350);
          return 100;
        }
        return prev + 25;
      });
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl max-w-lg w-full shadow-2xl p-5 sm:p-6 my-8 animate-in zoom-in-95 duration-150 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-[#E8F1ED] dark:border-[#10372F]">
          <div>
            <span className="text-[11px] font-bold text-emerald-700 dark:text-[#20D39B] uppercase tracking-wider block">
              Confirm Submission
            </span>
            <h3 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight mt-0.5">
              Ready to submit your assignment?
            </h3>
          </div>

          {!isUploading && (
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Confirmation Body Notice */}
        <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-[#06241F] border border-emerald-200/60 dark:border-emerald-800 text-xs text-[#0B3024] dark:text-[#E2F1EC] leading-relaxed">
          "You're about to submit this assignment. You can re-submit later if your teacher allows
          it."
        </div>

        {/* Summary Details */}
        <div className="p-3.5 rounded-xl bg-[#F8FAF9] dark:bg-[#041D18] border border-[#E8F1ED] dark:border-[#10372F] space-y-2 text-xs">
          <div className="flex items-center justify-between pb-1.5 border-b border-gray-100 dark:border-[#10372F]">
            <span className="text-[#658278] dark:text-[#789991]">Assignment:</span>
            <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6] truncate max-w-[240px]">
              {assignmentTitle}
            </span>
          </div>

          <div className="flex items-center justify-between pb-1.5 border-b border-gray-100 dark:border-[#10372F]">
            <span className="text-[#658278] dark:text-[#789991]">Attempt Number:</span>
            <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
              Attempt {attemptNumber || 1} of {maxAttempts || 3}
            </span>
          </div>

          {submissionPayload.primaryFile && (
            <div className="flex items-center justify-between pb-1.5 border-b border-gray-100 dark:border-[#10372F]">
              <span className="text-[#658278] dark:text-[#789991]">Primary File:</span>
              <span className="font-medium text-emerald-700 dark:text-[#20D39B] truncate max-w-[200px]">
                {submissionPayload.primaryFile.name}
              </span>
            </div>
          )}

          {submissionPayload.githubUrl && (
            <div className="flex items-center justify-between">
              <span className="text-[#658278] dark:text-[#789991]">Repository:</span>
              <span className="font-medium text-[#0B3024] dark:text-[#F1FAF6] truncate max-w-[200px]">
                {submissionPayload.githubUrl}
              </span>
            </div>
          )}
        </div>

        {/* Uploading progress bar simulation */}
        {isUploading && (
          <div className="space-y-1.5 pt-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-emerald-700 dark:text-[#20D39B] flex items-center gap-1.5">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Uploading artifacts to academic server...</span>
              </span>
              <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                {uploadProgress}%
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-gray-100 dark:bg-[#06241F] overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-200"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E8F1ED] dark:border-[#10372F]">
          <button
            type="button"
            disabled={isUploading}
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-[#55786B] dark:text-[#8AA89F] hover:bg-gray-100 dark:hover:bg-[#082A24] transition-colors cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isUploading}
            onClick={handleConfirmSubmission}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white dark:bg-[#159B72] dark:hover:bg-[#108360] dark:text-[#021512] text-xs font-bold shadow-md transition-all cursor-pointer"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <span>Confirm Submission</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
