"use client";

import { useState } from "react";
import { X, Upload, CheckCircle2, FileText, Sparkles } from "lucide-react";

export default function UploadAssignmentModal({ isOpen, onClose, onUploadSuccess, subjects = [] }) {
  const [subject, setSubject] = useState(subjects[0] || "Web Development");
  const [title, setTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;

    setIsSuccess(true);
    setTimeout(() => {
      if (onUploadSuccess) {
        onUploadSuccess({
          title,
          subject,
          fileName: selectedFile?.name || "assignment_submission.pdf",
        });
      }
      setIsSuccess(false);
      setTitle("");
      setSelectedFile(null);
      setDescription("");
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl max-w-md w-full shadow-2xl p-6 my-8 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-[#10372F]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
              <Upload className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] leading-snug">
                Upload Assignment
              </h3>
              <p className="text-[11px] text-[#5C786E] dark:text-[#8AA89F]">
                Submit your solution or assignment files
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content / Form */}
        {isSuccess ? (
          <div className="py-8 flex flex-col items-center justify-center text-center space-y-2">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400 animate-bounce" />
            <h4 className="text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
              Assignment Uploaded Successfully!
            </h4>
            <p className="text-xs text-[#5C786E] dark:text-[#8AA89F]">
              Your assignment file has been saved to your student portal.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="py-4 space-y-3.5 text-xs">
            {/* Subject Select */}
            <div>
              <label className="block text-[11px] font-bold text-[#0B3024] dark:text-[#E2F1EC] mb-1">
                Subject
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#D8E8E2] dark:border-[#10372F] bg-gray-50/50 dark:bg-[#041D18] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden font-medium"
              >
                {subjects.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>

            {/* Assignment Title */}
            <div>
              <label className="block text-[11px] font-bold text-[#0B3024] dark:text-[#E2F1EC] mb-1">
                Assignment Title / Topic
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Build a Responsive Portfolio Website"
                className="w-full p-2.5 rounded-xl border border-[#D8E8E2] dark:border-[#10372F] bg-gray-50/50 dark:bg-[#041D18] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden"
              />
            </div>

            {/* File Dropzone */}
            <div>
              <label className="block text-[11px] font-bold text-[#0B3024] dark:text-[#E2F1EC] mb-1">
                Select File
              </label>
              <label className="border-2 border-dashed border-gray-200 dark:border-[#10372F] hover:border-emerald-500 dark:hover:border-emerald-500 rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-gray-50/50 dark:bg-[#041D18]/50 block">
                <FileText className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mb-1" />
                <span className="text-xs font-semibold text-[#0B3024] dark:text-[#E2F1EC]">
                  {selectedFile ? selectedFile.name : "Click to browse or drop PDF, ZIP or DOCX"}
                </span>
                <span className="text-[10px] text-gray-400 mt-0.5">Maximum size: 25MB</span>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                />
              </label>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-[11px] font-bold text-[#0B3024] dark:text-[#E2F1EC] mb-1">
                Comments (Optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                placeholder="Any comments, GitHub link or submission details..."
                className="w-full p-2.5 rounded-xl border border-[#D8E8E2] dark:border-[#10372F] bg-gray-50/50 dark:bg-[#041D18] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden"
              />
            </div>

            {/* CTA */}
            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-gray-100 dark:border-[#10372F]">
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
                Upload & Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
