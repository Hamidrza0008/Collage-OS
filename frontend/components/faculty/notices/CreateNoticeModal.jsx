"use client";

import React, { useState, useEffect } from "react";
import { X, Send, Megaphone, FileText, CheckCircle2 } from "lucide-react";

export default function CreateNoticeModal({
  isOpen,
  defaultType = "Notice",
  onClose,
  onSubmitNotice,
}) {
  const [formData, setFormData] = useState({
    title: "",
    type: "Notice",
    category: "Academics",
    targetAudience: "All Students",
    description: "",
    urgent: false,
  });

  useEffect(() => {
    if (defaultType) {
      setFormData((prev) => ({ ...prev, type: defaultType }));
    }
  }, [defaultType, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) return;

    const now = new Date();
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const dateStr = `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = (hours % 12 || 12).toString().padStart(2, "0");
    const timeStr = `${formattedHours}:${minutes} ${ampm}`;

    let iconType = "document";
    let badgeColor = "blue";

    if (formData.type === "Announcement") {
      iconType = "megaphone";
      badgeColor = "emerald";
    } else if (formData.urgent) {
      iconType = "alert";
      badgeColor = "red";
    } else if (formData.category === "Academics") {
      iconType = "calendar";
      badgeColor = "amber";
    } else if (formData.category === "Placements") {
      iconType = "briefcase";
      badgeColor = "purple";
    }

    const newNotice = {
      id: `not-${Date.now()}`,
      title: formData.title,
      type: formData.urgent ? "Important" : formData.type,
      badgeColor,
      iconType,
      category: formData.category,
      targetAudience: formData.targetAudience,
      description: formData.description,
      date: dateStr,
      time: timeStr,
      status: "Active",
      author: "Dr. Arjun Mehta (Faculty Portal)",
      urgent: formData.urgent,
    };

    onSubmitNotice(newNotice);
    setFormData({
      title: "",
      type: "Notice",
      category: "Academics",
      targetAudience: "All Students",
      description: "",
      urgent: false,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl bg-white dark:bg-card-bg rounded-2xl border border-border-light dark:border-border-dark shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-border-light dark:border-border-dark bg-gray-50/50 dark:bg-surface-dark/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 flex items-center justify-center">
              {formData.type === "Announcement" ? (
                <Megaphone className="w-4 h-4" />
              ) : (
                <FileText className="w-4 h-4" />
              )}
            </div>
            <div>
              <h3 className="text-sm font-bold text-text-primary dark:text-text-primary-dark">
                Create {formData.type}
              </h3>
              <p className="text-xs text-text-secondary dark:text-text-secondary-dark">
                Publish to student and faculty portals
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
          {/* Communication Type */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-text-primary dark:text-text-primary-dark">
              Broadcast Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, type: "Notice" }))}
                className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                  formData.type === "Notice"
                    ? "bg-[#159B72]/10 border-[#159B72] text-[#159B72] dark:bg-[#159B72]/20"
                    : "border-border-light dark:border-border-dark text-text-secondary hover:bg-gray-50 dark:hover:bg-surface-dark"
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                Notice
              </button>

              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, type: "Announcement" }))}
                className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                  formData.type === "Announcement"
                    ? "bg-[#159B72]/10 border-[#159B72] text-[#159B72] dark:bg-[#159B72]/20"
                    : "border-border-light dark:border-border-dark text-text-secondary hover:bg-gray-50 dark:hover:bg-surface-dark"
                }`}
              >
                <Megaphone className="w-3.5 h-3.5" />
                Announcement
              </button>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-text-primary dark:text-text-primary-dark">
              Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="e.g. Schedule for Sem 5 Internal Assessment"
              className="w-full px-3.5 py-2 text-xs sm:text-[13px] rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-card-bg text-text-primary dark:text-text-primary-dark focus:outline-none focus:ring-1.5 focus:ring-emerald-500 transition-all"
            />
          </div>

          {/* Category & Target Audience */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-text-primary dark:text-text-primary-dark">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 text-xs rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-card-bg text-text-primary dark:text-text-primary-dark focus:outline-none focus:ring-1.5 focus:ring-emerald-500"
              >
                <option value="Academics">Academics</option>
                <option value="College Events">College Events</option>
                <option value="Library">Library</option>
                <option value="General">General</option>
                <option value="Placements">Placements</option>
                <option value="Administration">Administration</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-text-primary dark:text-text-primary-dark">
                Target Audience
              </label>
              <select
                value={formData.targetAudience}
                onChange={(e) => setFormData((prev) => ({ ...prev, targetAudience: e.target.value }))}
                className="w-full px-3 py-2 text-xs rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-card-bg text-text-primary dark:text-text-primary-dark focus:outline-none focus:ring-1.5 focus:ring-emerald-500"
              >
                <option value="All Students">All Students</option>
                <option value="CSE Students">CSE Students</option>
                <option value="Final Year Students">Final Year Students</option>
                <option value="CSE-302">CSE-302 (Web Dev)</option>
                <option value="Faculty">Faculty Only</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-text-primary dark:text-text-primary-dark">
              Description / Instructions <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Provide complete details, timings, venue, or steps students need to follow..."
              className="w-full px-3.5 py-2 text-xs sm:text-[13px] rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-card-bg text-text-primary dark:text-text-primary-dark focus:outline-none focus:ring-1.5 focus:ring-emerald-500 resize-none transition-all"
            />
          </div>

          {/* Priority / Urgent Checkbox */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="urgentNotice"
              checked={formData.urgent}
              onChange={(e) => setFormData((prev) => ({ ...prev, urgent: e.target.checked }))}
              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-border-light dark:border-border-dark cursor-pointer"
            />
            <label
              htmlFor="urgentNotice"
              className="text-xs text-text-primary dark:text-text-primary-dark cursor-pointer font-medium"
            >
              Mark as high-priority alert (highlights in red across student dashboards)
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
              Publish Broadcast
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
