"use client";

import React, { useState, useEffect } from "react";
import { X, FolderPlus, AlertCircle } from "lucide-react";

export default function CreateFolderModal({
  isOpen,
  existingFolders = [],
  onClose,
  onFolderCreated,
}) {
  const [folderName, setFolderName] = useState("");
  const [category, setCategory] = useState("study-material");
  const [semester, setSemester] = useState("Sem 5");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      setFolderName("");
      setErrorMessage("");
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = folderName.trim();
    if (!trimmed) {
      setErrorMessage("Please enter a valid folder name.");
      return;
    }

    // Duplicate-name detection
    const isDuplicate = existingFolders.some(
      (f) => f.name.toLowerCase() === trimmed.toLowerCase()
    );
    if (isDuplicate) {
      setErrorMessage(`A folder named "${trimmed}" already exists.`);
      return;
    }

    const newFolder = {
      id: `folder-${Date.now()}`,
      name: trimmed,
      category,
      semester,
      count: 0,
    };

    onFolderCreated(newFolder);
    setFolderName("");
    setErrorMessage("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white dark:bg-[#06241F] rounded-2xl border border-[#D8E8E2] dark:border-[#10372F] shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-[#D8E8E2] dark:border-[#10372F] bg-[#F7FBF9] dark:bg-[#04241C]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#EBF6F1] dark:bg-[#0F4A3B] text-[#159B72] dark:text-[#20D39B] border border-[#D8E8E2]/60 dark:border-[#16463D] flex items-center justify-center">
              <FolderPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                Create Resource Folder
              </h3>
              <p className="text-xs text-[#658278] dark:text-[#789991]">
                Organize academic files by topic or semester
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#658278] hover:text-[#0B3024] dark:text-[#789991] dark:hover:text-[#F1FAF6] hover:bg-[#F1F8F5] dark:hover:bg-[#082A24] transition-colors cursor-pointer"
            aria-label="Close folder dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errorMessage && (
            <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2 border border-rose-200/50">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
              Folder Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={folderName}
              onChange={(e) => {
                setFolderName(e.target.value);
                setErrorMessage("");
              }}
              placeholder="e.g. Unit 4 - Process Synchronization"
              className="w-full px-3.5 py-2 text-xs sm:text-[13px] rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#082A24] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-none focus:ring-1.5 focus:ring-[#159B72]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
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
                Target Semester
              </label>
              <select
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
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

          {/* Footer buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#D8E8E2] dark:border-[#10372F]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] text-xs font-semibold text-[#658278] dark:text-[#789991] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-[#F1F8F5] dark:hover:bg-[#082A24] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#159B72] hover:bg-[#118360] dark:bg-[#18B887] dark:hover:bg-[#0F8F6B] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              Create Folder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
