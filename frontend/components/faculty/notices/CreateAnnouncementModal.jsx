"use client";

import React, { useState, useEffect } from "react";
import { X, Megaphone, Send, Save, AlertCircle, Paperclip, Calendar, Users, Tag, Sparkles } from "lucide-react";

export default function CreateAnnouncementModal({
  isOpen,
  announcementToEdit = null,
  onClose,
  onSubmitAnnouncement,
}) {
  const [formData, setFormData] = useState(() => ({
    title: announcementToEdit?.title || "",
    category: announcementToEdit?.category || "College Events",
    targetAudience: announcementToEdit?.targetAudience || "All Students",
    description: announcementToEdit?.description || "",
    content: announcementToEdit?.content || announcementToEdit?.description || "",
    expiryDate: announcementToEdit?.expiryDate || "",
    badgeColor: announcementToEdit?.badgeColor || "emerald",
    attachmentName: announcementToEdit?.attachment?.name || "",
  }));

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) {
      errs.title = "Announcement title is required";
    } else if (formData.title.trim().length < 5) {
      errs.title = "Title should be at least 5 characters";
    }

    if (!formData.description.trim()) {
      errs.description = "Summary description is required";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleAction = (status = "Active") => {
    if (!validate()) return;

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

    let iconType = "megaphone";
    let badgeColor = formData.badgeColor || "emerald";

    if (formData.category === "Placements") {
      iconType = "briefcase";
      badgeColor = "purple";
    }

    const savedAnnouncement = {
      id: announcementToEdit ? announcementToEdit.id : `not-${Date.now()}`,
      type: "Announcement",
      badgeColor,
      iconType,
      title: formData.title.trim(),
      description: formData.description.trim(),
      content: formData.content.trim() || formData.description.trim(),
      targetAudience: formData.targetAudience,
      category: formData.category,
      date: announcementToEdit ? announcementToEdit.date : dateStr,
      time: announcementToEdit ? announcementToEdit.time : timeStr,
      timestamp: announcementToEdit ? announcementToEdit.timestamp : now.getTime(),
      daysAgo: announcementToEdit ? announcementToEdit.daysAgo : 0,
      status: status,
      author: announcementToEdit?.author || "Faculty Dean / Council",
      urgent: false,
      expiryDate: formData.expiryDate || null,
      attachment: formData.attachmentName
        ? { name: formData.attachmentName, size: "2.1 MB" }
        : null,
    };

    onSubmitAnnouncement(savedAnnouncement, status, !!announcementToEdit);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-white dark:bg-[#031C16] rounded-2xl border border-border-light dark:border-border-dark shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-light dark:border-border-dark bg-emerald-50/40 dark:bg-[#082E24]/40">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100/70 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300/40 flex items-center justify-center">
              <Megaphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-text-primary dark:text-text-primary-dark">
                {announcementToEdit ? "Edit Announcement" : "Create New Announcement"}
              </h3>
              <p className="text-xs text-text-secondary dark:text-text-secondary-dark">
                Broadcast major campus updates, fests, hackathons, and placement drives
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
        <div className="p-6 overflow-y-auto space-y-4 text-xs">
          {/* Title */}
          <div className="space-y-1.5">
            <label className="font-semibold text-text-primary dark:text-text-primary-dark">
              Announcement Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., College Fest 2025 – Registrations Open"
              className={`w-full px-3.5 py-2 rounded-xl border ${
                errors.title
                  ? "border-rose-400 bg-rose-50/20"
                  : "border-border-light dark:border-border-dark bg-white dark:bg-card-bg"
              } text-text-primary dark:text-text-primary-dark placeholder:text-text-secondary/50 focus:outline-none focus:ring-1.5 focus:ring-emerald-500`}
            />
            {errors.title && (
              <p className="text-rose-500 text-[11px] flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.title}
              </p>
            )}
          </div>

          {/* Category & Audience Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Category */}
            <div className="space-y-1.5">
              <label className="font-semibold text-text-primary dark:text-text-primary-dark flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-card-bg text-text-primary dark:text-text-primary-dark focus:outline-none focus:ring-1.5 focus:ring-emerald-500"
              >
                <option value="College Events">College Events</option>
                <option value="Placements">Placements</option>
                <option value="Academics">Academics</option>
                <option value="General">General</option>
                <option value="Sports">Sports</option>
              </select>
            </div>

            {/* Target Audience */}
            <div className="space-y-1.5">
              <label className="font-semibold text-text-primary dark:text-text-primary-dark flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Target Audience
              </label>
              <select
                value={formData.targetAudience}
                onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-card-bg text-text-primary dark:text-text-primary-dark focus:outline-none focus:ring-1.5 focus:ring-emerald-500"
              >
                <option value="All Students">All Students</option>
                <option value="Final Year Students">Final Year Students</option>
                <option value="CSE Students">CSE Students</option>
                <option value="Faculty">Faculty & Staff</option>
              </select>
            </div>
          </div>

          {/* Expiry Date & Accent Theme */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-semibold text-text-primary dark:text-text-primary-dark flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Optional Expiry Date
              </label>
              <input
                type="date"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-card-bg text-text-primary dark:text-text-primary-dark focus:outline-none focus:ring-1.5 focus:ring-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-text-primary dark:text-text-primary-dark flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Badge Accent Theme
              </label>
              <div className="flex items-center gap-2 pt-1">
                {[
                  { name: "emerald", label: "Mint Green" },
                  { name: "purple", label: "Purple (Placements)" },
                  { name: "blue", label: "Blue" },
                ].map((color) => (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => setFormData({ ...formData, badgeColor: color.name })}
                    className={`px-3 py-1.5 rounded-lg border text-[11px] font-medium transition-all ${
                      formData.badgeColor === color.name
                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-semibold"
                        : "border-border-light dark:border-border-dark text-text-secondary"
                    }`}
                  >
                    {color.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Short Description */}
          <div className="space-y-1.5">
            <label className="font-semibold text-text-primary dark:text-text-primary-dark">
              Brief Summary (Visible in cards) <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Overview of the announcement that appears in the card summary..."
              className={`w-full px-3.5 py-2 rounded-xl border ${
                errors.description
                  ? "border-rose-400 bg-rose-50/20"
                  : "border-border-light dark:border-border-dark bg-white dark:bg-card-bg"
              } text-text-primary dark:text-text-primary-dark placeholder:text-text-secondary/50 focus:outline-none focus:ring-1.5 focus:ring-emerald-500 resize-none`}
            />
            {errors.description && (
              <p className="text-rose-500 text-[11px] flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.description}
              </p>
            )}
          </div>

          {/* Full Content */}
          <div className="space-y-1.5">
            <label className="font-semibold text-text-primary dark:text-text-primary-dark">
              Full Detailed Content
            </label>
            <textarea
              rows={3}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Elaborate details, schedule, registration URLs, criteria..."
              className="w-full px-3.5 py-2 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-card-bg text-text-primary dark:text-text-primary-dark placeholder:text-text-secondary/50 focus:outline-none focus:ring-1.5 focus:ring-emerald-500 resize-none"
            />
          </div>

          {/* Attachment */}
          <div className="space-y-1.5">
            <label className="font-semibold text-text-primary dark:text-text-primary-dark flex items-center gap-1.5">
              <Paperclip className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              Event Attachment (Simulated)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={formData.attachmentName}
                onChange={(e) => setFormData({ ...formData, attachmentName: e.target.value })}
                placeholder="e.g., Campus_Fest_Registration_Guidelines.pdf"
                className="flex-1 px-3.5 py-2 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-card-bg text-text-primary dark:text-text-primary-dark focus:outline-none focus:ring-1.5 focus:ring-emerald-500"
              />
              <button
                type="button"
                onClick={() => setFormData({ ...formData, attachmentName: "Campus_Announcement_Poster.pdf" })}
                className="px-3 py-2 rounded-xl border border-border-light dark:border-border-dark bg-gray-50 dark:bg-surface-dark hover:bg-gray-100 text-text-secondary dark:text-text-secondary-dark text-xs font-medium cursor-pointer"
              >
                Sample Poster
              </button>
            </div>
          </div>

          {/* Honest Demo feedback banner */}
          <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/30 text-emerald-900 dark:text-emerald-300 text-[11px] flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
            <span>
              <strong>Local Demonstration Announcement:</strong> Saved directly to your local UI dataset. No external messages or push notifications are dispatched.
            </span>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 border-t border-border-light dark:border-border-dark bg-gray-50/50 dark:bg-surface-dark/50 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-border-light dark:border-border-dark text-text-secondary dark:text-text-secondary-dark hover:bg-gray-100 dark:hover:bg-surface-dark font-medium transition-colors cursor-pointer text-xs"
          >
            Cancel
          </button>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => handleAction("Draft")}
              className="px-4 py-2 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-card-bg hover:bg-gray-50 dark:hover:bg-surface-dark text-text-primary dark:text-text-primary-dark font-semibold transition-colors flex items-center gap-1.5 cursor-pointer text-xs shadow-2xs"
            >
              <Save className="w-3.5 h-3.5 text-text-secondary dark:text-text-secondary-dark" />
              Save Draft
            </button>

            <button
              type="button"
              onClick={() => handleAction("Active")}
              className="px-4 py-2 rounded-xl bg-[#159B72] hover:bg-[#11805D] text-white font-semibold transition-colors flex items-center gap-1.5 cursor-pointer text-xs shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              {announcementToEdit ? "Save Changes" : "Publish Announcement"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
