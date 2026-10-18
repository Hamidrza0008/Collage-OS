"use client";

import React, { useState, useEffect } from "react";
import { X, Users, Send, BookOpen } from "lucide-react";
import { MOCK_FACULTY_CLASSES } from "./facultyResourcesData";

export default function ShareWithClassModal({
  isOpen,
  availableResources = [],
  initialResource = null,
  onClose,
  onShareCompleted,
}) {
  const [selectedClassId, setSelectedClassId] = useState(MOCK_FACULTY_CLASSES[0]?.id || "");
  const [selectedResourceId, setSelectedResourceId] = useState("");
  const [notifyStudents, setNotifyStudents] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (initialResource?.id) {
      setSelectedResourceId(initialResource.id);
    } else if (availableResources.length > 0 && !selectedResourceId) {
      setSelectedResourceId(availableResources[0]?.id || "");
    }
  }, [initialResource, availableResources, selectedResourceId]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const targetClass = MOCK_FACULTY_CLASSES.find((c) => c.id === selectedClassId) || MOCK_FACULTY_CLASSES[0];
    const targetResource = availableResources.find((r) => r.id === selectedResourceId);

    const resourceTitle = targetResource?.title || "selected resource";

    onShareCompleted(
      `Demo: Shared "${resourceTitle}" with ${targetClass.name} (${targetClass.section}). No live alerts were dispatched.`
    );
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
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                Share with Class
              </h3>
              <p className="text-xs text-[#658278] dark:text-[#789991]">
                Notify students about study materials and guidelines
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#658278] hover:text-[#0B3024] dark:text-[#789991] dark:hover:text-[#F1FAF6] hover:bg-[#F1F8F5] dark:hover:bg-[#082A24] transition-colors cursor-pointer"
            aria-label="Close share dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Class Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
              Target Class & Section <span className="text-rose-500">*</span>
            </label>
            <select
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#082A24] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-none focus:ring-1.5 focus:ring-[#159B72]"
            >
              {MOCK_FACULTY_CLASSES.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.code} — {cls.name} ({cls.section}, {cls.count} students)
                </option>
              ))}
            </select>
          </div>

          {/* Resource Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
              Select Resource to Attach <span className="text-rose-500">*</span>
            </label>
            <select
              value={selectedResourceId}
              onChange={(e) => setSelectedResourceId(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#082A24] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-none focus:ring-1.5 focus:ring-[#159B72]"
            >
              {availableResources.map((res) => (
                <option key={res.id} value={res.id}>
                  [{res.format}] {res.title} ({res.semester || "All Sem"})
                </option>
              ))}
            </select>
          </div>

          {/* Optional Message */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
              Announcement Note (Optional)
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="e.g. Please review Unit 3 concepts before our next lab practical..."
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#082A24] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-none focus:ring-1.5 focus:ring-[#159B72] resize-none"
            />
          </div>

          {/* Notification Checkbox */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="notifyClassStudents"
              checked={notifyStudents}
              onChange={(e) => setNotifyStudents(e.target.checked)}
              className="w-4 h-4 rounded text-[#159B72] focus:ring-[#159B72] border-[#D8E8E2] dark:border-[#16463D] cursor-pointer"
            />
            <label
              htmlFor="notifyClassStudents"
              className="text-xs text-[#0B3024] dark:text-[#F1FAF6] cursor-pointer font-medium"
            >
              Simulate push notification & portal alert to students
            </label>
          </div>

          {/* Demo Disclaimer */}
          <div className="p-2.5 rounded-xl bg-[#E8F6EF]/60 dark:bg-[#0F4A3B]/30 border border-[#D8E8E2]/60 dark:border-[#16463D] text-[11px] text-[#36594C] dark:text-[#B5CCC5] leading-relaxed">
            Frontend demonstration flow. Simulates class notification without invoking external messaging APIs.
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
              className="px-5 py-2 rounded-xl bg-[#159B72] hover:bg-[#118360] dark:bg-[#18B887] dark:hover:bg-[#0F8F6B] text-white text-xs font-semibold shadow-xs flex items-center gap-2 transition-colors cursor-pointer"
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
