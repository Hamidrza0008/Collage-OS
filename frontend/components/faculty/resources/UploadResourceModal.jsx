"use client";

import React, { useState, useEffect } from "react";
import { X, Upload, FileText, CheckCircle2, AlertCircle } from "lucide-react";

export default function UploadResourceModal({
  isOpen,
  onClose,
  onSubmitUpload,
}) {
  const [formData, setFormData] = useState({
    title: "",
    category: "study-material",
    semester: "Sem 3",
    subject: "Data Structures & Algorithms (CSE-301)",
    description: "",
    fileType: "PDF",
    fileSize: "2.4 MB",
    fileName: "",
  });

  const [selectedFileObj, setSelectedFileObj] = useState(null);
  const [validationError, setValidationError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && !isUploading) onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isUploading, onClose]);

  // Clean up any object URL when file changes or modal closes
  useEffect(() => {
    return () => {
      if (selectedFileObj?.previewUrl) {
        URL.revokeObjectURL(selectedFileObj.previewUrl);
      }
    };
  }, [selectedFileObj]);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Clean previous object URL
      if (selectedFileObj?.previewUrl) {
        URL.revokeObjectURL(selectedFileObj.previewUrl);
      }

      const ext = file.name.split(".").pop().toUpperCase();
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      const previewUrl = URL.createObjectURL(file);

      setSelectedFileObj({ file, previewUrl });
      setFormData((prev) => ({
        ...prev,
        fileName: file.name,
        fileType: ["PDF", "DOC", "PPT", "ZIP"].includes(ext) ? ext : "PDF",
        fileSize: `${sizeMB} MB`,
        title: prev.title || file.name.replace(/\.[^/.]+$/, ""),
      }));
      setValidationError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setValidationError("Please enter a resource title.");
      return;
    }

    setValidationError("");
    setIsUploading(true);
    setUploadProgress(20);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            let formatColor = "red";
            if (formData.fileType === "DOC") formatColor = "blue";
            if (formData.fileType === "PPT") formatColor = "purple";
            if (formData.fileType === "ZIP") formatColor = "green";

            const newResource = {
              id: `rec-user-${Date.now()}`,
              title: formData.title.trim(),
              subtitle: formData.description.trim() || formData.subject,
              tags: [
                {
                  label:
                    formData.category === "study-material"
                      ? "Study Material"
                      : formData.category === "syllabus"
                      ? "Syllabus"
                      : formData.category === "guidelines"
                      ? "Guidelines"
                      : formData.category === "forms-templates"
                      ? "Templates"
                      : formData.category === "previous-papers"
                      ? "Previous Papers"
                      : "General",
                  color: formatColor === "red" ? "blue" : formatColor,
                },
                { label: formData.semester, color: "gray" },
              ],
              format: formData.fileType,
              formatColor,
              author: {
                name: "Dr. Arjun Mehta",
                avatar: "/assets/profile/dr-arjun-mehta.jpg",
              },
              uploadedTime: "Just now",
              size: formData.fileSize || "2.1 MB",
              category: formData.category,
              semester: formData.semester,
              subject: formData.subject,
              description: formData.description,
            };

            onSubmitUpload(newResource);
            setIsUploading(false);
            setUploadProgress(0);

            // Clean up temporary preview URL
            if (selectedFileObj?.previewUrl) {
              URL.revokeObjectURL(selectedFileObj.previewUrl);
            }
            setSelectedFileObj(null);
            onClose();
          }, 350);
          return 100;
        }
        return prev + 30;
      });
    }, 180);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-white dark:bg-[#06241F] rounded-2xl border border-[#D8E8E2] dark:border-[#10372F] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-[#D8E8E2] dark:border-[#10372F] bg-[#F7FBF9] dark:bg-[#04241C]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#EBF6F1] dark:bg-[#0F4A3B] text-[#159B72] dark:text-[#20D39B] border border-[#D8E8E2]/60 dark:border-[#16463D] flex items-center justify-center">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                Upload Resource
              </h3>
              <p className="text-xs text-[#658278] dark:text-[#789991]">
                Add new file for students and department faculty
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isUploading}
            className="p-1.5 rounded-lg text-[#658278] hover:text-[#0B3024] dark:text-[#789991] dark:hover:text-[#F1FAF6] hover:bg-[#F1F8F5] dark:hover:bg-[#082A24] transition-colors cursor-pointer disabled:opacity-50"
            aria-label="Close upload dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
          {/* File Selection Dropzone */}
          <div className="border-2 border-dashed border-[#D8E8E2] dark:border-[#16463D] hover:border-[#159B72] dark:hover:border-[#20D39B] rounded-xl p-5 text-center cursor-pointer relative bg-[#F7FBF9]/60 dark:bg-[#082A24]/40 transition-colors">
            <input
              type="file"
              onChange={handleFileChange}
              disabled={isUploading}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full disabled:cursor-not-allowed"
            />
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-[#EBF6F1] dark:bg-[#0F4A3B] flex items-center justify-center text-[#159B72] dark:text-[#20D39B] mb-2">
                <Upload className="w-5 h-5" />
              </div>

              {formData.fileName ? (
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                    {formData.fileName}
                  </p>
                  <p className="text-[11px] text-[#159B72] dark:text-[#20D39B] font-semibold">
                    Format: {formData.fileType} • Size: {formData.fileSize}
                  </p>
                </div>
              ) : (
                <div className="space-y-0.5">
                  <p className="text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
                    Click or drag file here to attach
                  </p>
                  <p className="text-[11px] text-[#658278] dark:text-[#789991]">
                    Supports PDF, DOC, PPT, ZIP up to 50 MB
                  </p>
                </div>
              )}
            </div>
          </div>

          {validationError && (
            <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2 border border-rose-200/50">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
              Resource Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="e.g. Operating System - Process Synchronization"
              className="w-full px-3.5 py-2 text-xs sm:text-[13px] rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#082A24] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-none focus:ring-1.5 focus:ring-[#159B72] transition-all"
            />
          </div>

          {/* Category & Semester */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
                Category <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, category: e.target.value }))
                }
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#082A24] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-none focus:ring-1.5 focus:ring-[#159B72]"
              >
                <option value="study-material">Study Material</option>
                <option value="syllabus">Syllabus</option>
                <option value="previous-papers">Previous Papers</option>
                <option value="guidelines">Guidelines</option>
                <option value="forms-templates">Forms & Templates</option>
                <option value="others">Others</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
                Target Semester <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.semester}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, semester: e.target.value }))
                }
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#082A24] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-none focus:ring-1.5 focus:ring-[#159B72]"
              >
                <option value="Sem 1">Sem 1</option>
                <option value="Sem 2">Sem 2</option>
                <option value="Sem 3">Sem 3</option>
                <option value="Sem 4">Sem 4</option>
                <option value="Sem 5">Sem 5</option>
                <option value="Sem 6">Sem 6</option>
                <option value="All Sem">All Sem</option>
              </select>
            </div>
          </div>

          {/* Subject */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
              Subject / Course
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, subject: e.target.value }))
              }
              placeholder="e.g. Operating Systems (CSE-501)"
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#082A24] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-none focus:ring-1.5 focus:ring-[#159B72]"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
              Description (Optional)
            </label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, description: e.target.value }))
              }
              placeholder="Brief summary of syllabus coverage or topics included..."
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#082A24] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-none focus:ring-1.5 focus:ring-[#159B72] resize-none"
            />
          </div>

          {/* Progress bar if uploading */}
          {isUploading && (
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-xs text-[#658278] dark:text-[#789991] font-medium">
                <span>Processing local demo upload...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#E8F1ED] dark:bg-[#082A24] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#159B72] dark:bg-[#20D39B] transition-all duration-200"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <div className="p-3 rounded-xl bg-[#E8F6EF]/60 dark:bg-[#0F4A3B]/30 border border-[#D8E8E2]/60 dark:border-[#16463D] text-[11px] text-[#36594C] dark:text-[#B5CCC5] leading-relaxed">
            <strong>Note:</strong> Frontend demonstration. Uploaded records are persisted locally in browser state. No binary file is transferred to a remote server.
          </div>

          {/* Footer buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#D8E8E2] dark:border-[#10372F]">
            <button
              type="button"
              onClick={onClose}
              disabled={isUploading}
              className="px-4 py-2 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] text-xs font-semibold text-[#658278] dark:text-[#789991] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-[#F1F8F5] dark:hover:bg-[#082A24] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className="px-5 py-2 rounded-xl bg-[#159B72] hover:bg-[#118360] dark:bg-[#18B887] dark:hover:bg-[#0F8F6B] text-white text-xs font-semibold shadow-xs flex items-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
            >
              <Upload className="w-3.5 h-3.5" />
              {isUploading ? "Uploading..." : "Upload Resource"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
