"use client";

import React, { useState } from "react";
import { X, Share2, Users, Send } from "lucide-react";

export default function ShareWithClassModal({
  isOpen,
  onClose,
  onShareCompleted,
}) {
  const [selectedClass, setSelectedClass] = useState("CSE-301");
  const [notifyStudents, setNotifyStudents] = useState(true);
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onShareCompleted(
      `Shared resources with class ${selectedClass} successfully!`
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white dark:bg-card-bg rounded-2xl border border-border-light dark:border-border-dark shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-border-light dark:border-border-dark bg-gray-50/50 dark:bg-surface-dark/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-text-primary dark:text-text-primary-dark">
                Share with Class
              </h3>
              <p className="text-xs text-text-secondary dark:text-text-secondary-dark">
                Send direct notification to enrolled students
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
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-text-primary dark:text-text-primary-dark">
              Select Target Class
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-card-bg text-text-primary dark:text-text-primary-dark focus:outline-none focus:ring-1.5 focus:ring-emerald-500"
            >
              <option value="CSE-301">Data Structures & Algorithms (CSE-301)</option>
              <option value="CSE-302">Web Development (CSE-302)</option>
              <option value="CSE-501">Operating Systems (CSE-501)</option>
              <option value="CSE-402">Database Management Systems (CSE-402)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-text-primary dark:text-text-primary-dark">
              Announcement Note (Optional)
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="e.g. Please review Unit 2 notes before Wednesday's lecture..."
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-card-bg text-text-primary dark:text-text-primary-dark focus:outline-none focus:ring-1.5 focus:ring-emerald-500 resize-none"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="notifyClassStudents"
              checked={notifyStudents}
              onChange={(e) => setNotifyStudents(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-border-light dark:border-border-dark cursor-pointer"
            />
            <label
              htmlFor="notifyClassStudents"
              className="text-xs text-text-primary dark:text-text-primary-dark cursor-pointer font-medium"
            >
              Send mobile push notification and dashboard alert
            </label>
          </div>

          {/* Footer buttons */}
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
              className="px-5 py-2 rounded-xl bg-[#159B72] hover:bg-[#128360] text-white text-xs font-semibold shadow-xs flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              Notify Class
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
