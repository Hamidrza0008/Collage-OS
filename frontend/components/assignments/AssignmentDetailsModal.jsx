"use client";

import { useState } from "react";
import { X, Calendar, Award, Upload, CheckCircle2, FileText, AlertCircle } from "lucide-react";

export default function AssignmentDetailsModal({ assignment, onClose, onSubmitWork }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [submissionNotes, setSubmissionNotes] = useState("");
  const [submitted, setSubmitted] = useState(assignment?.status === "submitted");

  if (!assignment) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (onSubmitWork) onSubmitWork(assignment.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl max-w-lg w-full shadow-2xl p-6 my-8 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-gray-100 dark:border-[#10372F]">
          <div>
            <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
              {assignment.subject}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-[#0B3024] dark:text-[#F1FAF6] mt-0.5 leading-snug">
              {assignment.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Metadata Badges */}
        <div className="flex items-center gap-3 py-3 border-b border-gray-100 dark:border-[#10372F] text-xs">
          <div className="flex items-center gap-1.5 text-[#5C786E] dark:text-[#8AA89F]">
            <Calendar className="w-4 h-4 text-emerald-600" />
            <span>Due: {assignment.dueDate}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#0B3024] dark:text-[#E2F1EC] font-semibold">
            <Award className="w-4 h-4 text-emerald-600" />
            <span>Marks: {assignment.marks}</span>
          </div>
          <span className="px-2 py-0.5 rounded-md text-[10.5px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
            {assignment.priority}
          </span>
        </div>

        {/* Assignment Brief */}
        <div className="py-3.5 space-y-2 text-xs">
          <h4 className="font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            Assignment Instructions
          </h4>
          <p className="text-[#5C786E] dark:text-[#8AA89F] leading-relaxed">
            {assignment.description}
          </p>

          <div className="flex items-center gap-1.5 flex-wrap pt-2">
            {assignment.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md text-[10.5px] font-medium bg-gray-100 dark:bg-[#041D18] text-[#5C786E] dark:text-[#8AA89F]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Submission Section */}
        <div className="pt-3 border-t border-gray-100 dark:border-[#10372F]">
          {submitted ? (
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-center gap-3 text-xs text-emerald-800 dark:text-emerald-300">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <span className="font-bold block text-sm">Assignment Submitted!</span>
                <span className="text-[11px] text-emerald-700/80 dark:text-emerald-400/80">
                  Your work has been submitted to the faculty for evaluation.
                </span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <h4 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                Upload Submission
              </h4>

              {/* Upload Dropzone */}
              <label className="border-2 border-dashed border-gray-200 dark:border-[#10372F] hover:border-emerald-500 dark:hover:border-emerald-500 rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-gray-50/50 dark:bg-[#041D18]/50 block">
                <Upload className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mb-1" />
                <span className="text-xs font-semibold text-[#0B3024] dark:text-[#E2F1EC]">
                  {selectedFile ? selectedFile.name : "Click to select or drag PDF, ZIP or DOC"}
                </span>
                <span className="text-[10px] text-gray-400 mt-0.5">Maximum file size: 25MB</span>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                />
              </label>

              {/* Submission Notes */}
              <div>
                <label className="text-[11px] font-semibold text-[#0B3024] dark:text-[#E2F1EC] block mb-1">
                  Comments / Notes (Optional)
                </label>
                <textarea
                  value={submissionNotes}
                  onChange={(e) => setSubmissionNotes(e.target.value)}
                  placeholder="Add a comment for the instructor or repository link..."
                  rows={2}
                  className="w-full p-2 rounded-xl border border-[#D8E8E2] dark:border-[#10372F] bg-gray-50/50 dark:bg-[#041D18] text-xs text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden"
                />
              </div>

              {/* Submit CTA */}
              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#082A24] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white dark:bg-[#10B981] dark:text-[#021512] transition-colors cursor-pointer"
                >
                  Submit Assignment
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
