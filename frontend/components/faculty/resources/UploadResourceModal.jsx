"use client";

import React, { useState } from "react";
import { X, UploadCloud, FileText, CheckCircle2, AlertCircle } from "lucide-react";

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
    fileType: "PDF",
    fileSize: "3.2 MB",
    fileName: "",
  });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const ext = file.name.split(".").pop().toUpperCase();
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      setFormData((prev) => ({
        ...prev,
        fileName: file.name,
        fileType: ["PDF", "DOC", "PPT", "ZIP"].includes(ext) ? ext : "PDF",
        fileSize: `${sizeMB} MB`,
        title: prev.title || file.name.replace(/\.[^/.]+$/, ""),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

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
              id: `rec-${Date.now()}`,
              title: formData.title,
              tags: [
                {
                  label:
                    formData.category === "study-material"
                      ? "Study Material"
                      : formData.category === "syllabus"
                      ? "Syllabus"
                      : formData.category === "guidelines"
                      ? "Guidelines"
                      : "Templates",
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
              size: formData.fileSize || "2.5 MB",
              category: formData.category,
              semester: formData.semester,
            };

            onSubmitUpload(newResource);
            setIsUploading(false);
            setUploadProgress(0);
            onClose();
          }, 300);
          return 100;
        }
        return prev + 30;
      });
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-white dark:bg-card-bg rounded-2xl border border-border-light dark:border-border-dark shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-border-light dark:border-border-dark bg-gray-50/50 dark:bg-surface-dark/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 flex items-center justify-center">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-text-primary dark:text-text-primary-dark">
                Upload Academic Resource
              </h3>
              <p className="text-xs text-text-secondary dark:text-text-secondary-dark">
                Distribute study materials to students
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-text-secondary hover:text-text-primary dark:text-text-secondary-dark dark:hover:text-text-primary-dark hover:bg-gray-100 dark:hover:bg-surface-dark transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* File Dropzone Area */}
          <div className="border-2 border-dashed border-border-light dark:border-border-dark hover:border-emerald-500 rounded-xl p-5 text-center cursor-pointer relative bg-gray-50/50 dark:bg-surface-dark/30 transition-colors">
            <input
              type="file"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <div className="flex flex-col items-center">
              <UploadCloud className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mb-2" />
              <p className="text-xs font-semibold text-text-primary dark:text-text-primary-dark">
                {formData.fileName || "Click or drag file here to upload"}
              </p>
              <p className="text-[11px] text-text-secondary dark:text-text-secondary-dark mt-0.5">
                Supports PDF, DOCX, PPT, ZIP up to 50MB
              </p>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-text-primary dark:text-text-primary-dark">
              Resource Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="e.g. Operating System - Unit 3 Process Synchronization"
              className="w-full px-3.5 py-2 text-xs sm:text-[13px] rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-card-bg text-text-primary dark:text-text-primary-dark focus:outline-none focus:ring-1.5 focus:ring-emerald-500 transition-all"
            />
          </div>

          {/* Category & Semester */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-text-primary dark:text-text-primary-dark">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, category: e.target.value }))
                }
                className="w-full px-3 py-2 text-xs rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-card-bg text-text-primary dark:text-text-primary-dark focus:outline-none focus:ring-1.5 focus:ring-emerald-500"
              >
                <option value="study-material">Study Material</option>
                <option value="syllabus">Syllabus</option>
                <option value="previous-papers">Previous Papers</option>
                <option value="guidelines">Guidelines</option>
                <option value="forms-templates">Forms & Templates</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-text-primary dark:text-text-primary-dark">
                Target Semester
              </label>
              <select
                value={formData.semester}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, semester: e.target.value }))
                }
                className="w-full px-3 py-2 text-xs rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-card-bg text-text-primary dark:text-text-primary-dark focus:outline-none focus:ring-1.5 focus:ring-emerald-500"
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

          {/* Progress bar if uploading */}
          {isUploading && (
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-xs text-text-secondary dark:text-text-secondary-dark font-medium">
                <span>Uploading file...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 dark:bg-surface-dark rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#159B72] transition-all duration-200"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Footer buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-light dark:border-border-dark">
            <button
              type="button"
              onClick={onClose}
              disabled={isUploading}
              className="px-4 py-2 rounded-xl border border-border-light dark:border-border-dark text-xs font-semibold text-text-secondary hover:text-text-primary hover:bg-gray-50 dark:hover:bg-surface-dark transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className="px-5 py-2 rounded-xl bg-[#159B72] hover:bg-[#128360] text-white text-xs font-semibold shadow-xs flex items-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
            >
              <UploadCloud className="w-3.5 h-3.5" />
              Upload Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
