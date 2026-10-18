"use client";

import React, { useState } from "react";
import { X, FolderPlus } from "lucide-react";

export default function CreateFolderModal({
  isOpen,
  onClose,
  onFolderCreated,
}) {
  const [folderName, setFolderName] = useState("");
  const [category, setCategory] = useState("study-material");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!folderName.trim()) return;
    onFolderCreated(`Created folder "${folderName}" successfully!`);
    setFolderName("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white dark:bg-card-bg rounded-2xl border border-border-light dark:border-border-dark shadow-2xl overflow-hidden flex flex-col"
      >
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-border-light dark:border-border-dark bg-gray-50/50 dark:bg-surface-dark/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 flex items-center justify-center">
              <FolderPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-text-primary dark:text-text-primary-dark">
                Create Resource Folder
              </h3>
              <p className="text-xs text-text-secondary dark:text-text-secondary-dark">
                Organize academic files by topic or semester
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

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-text-primary dark:text-text-primary-dark">
              Folder Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              placeholder="e.g. Unit 4 - Virtual Memory"
              className="w-full px-3.5 py-2 text-xs sm:text-[13px] rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-card-bg text-text-primary dark:text-text-primary-dark focus:outline-none focus:ring-1.5 focus:ring-emerald-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-text-primary dark:text-text-primary-dark">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-card-bg text-text-primary dark:text-text-primary-dark focus:outline-none focus:ring-1.5 focus:ring-emerald-500"
            >
              <option value="study-material">Study Material</option>
              <option value="syllabus">Syllabus</option>
              <option value="previous-papers">Previous Papers</option>
              <option value="guidelines">Guidelines</option>
              <option value="forms-templates">Forms & Templates</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-light dark:border-border-dark">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-border-light dark:border-border-dark text-xs font-semibold text-text-secondary hover:text-text-primary hover:bg-gray-50 dark:hover:bg-surface-dark transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#159B72] hover:bg-[#128360] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              Create Folder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
