"use client";

import React, { useState, useEffect } from "react";
import { X, FileText, Send, Save, AlertCircle, Paperclip, Calendar, Users, Tag, AlertTriangle } from "lucide-react";

export default function CreateNoticeModal({
  isOpen,
  noticeToEdit = null,
  onClose,
  onSubmitNotice,
}) {
  const [formData, setFormData] = useState(() => ({
    title: noticeToEdit?.title || "",
    category: noticeToEdit?.category || "Academics",
    targetAudience: noticeToEdit?.targetAudience?.startsWith("CSE-")
      ? "Specific Semester/Class"
      : noticeToEdit?.targetAudience || "All Students",
    specificClass: noticeToEdit?.targetAudience?.startsWith("CSE-")
      ? noticeToEdit.targetAudience
      : "",
    description: noticeToEdit?.description || "",
    content: noticeToEdit?.content || noticeToEdit?.description || "",
    expiryDate: noticeToEdit?.expiryDate || "",
    urgent: noticeToEdit?.urgent || noticeToEdit?.type === "Important",
    attachmentName: noticeToEdit?.attachment?.name || "",
  }));

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) {
      errs.title = "Notice title is required";
    } else if (formData.title.trim().length < 5) {
      errs.title = "Title should be at least 5 characters";
    }

    if (!formData.description.trim()) {
      errs.description = "Summary description is required";
    }

    if (formData.targetAudience === "Specific Semester/Class" && !formData.specificClass.trim()) {
      errs.specificClass = "Please specify class or section (e.g. CSE-302)";
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

    let iconType = "document";
    let badgeColor = "blue";

    if (formData.urgent) {
      iconType = "alert";
      badgeColor = "red";
    } else if (formData.category === "Academics") {
      iconType = "calendar";
      badgeColor = "amber";
    }

    const finalAudience =
      formData.targetAudience === "Specific Semester/Class"
        ? formData.specificClass.trim() || "CSE Students"
        : formData.targetAudience;

    const savedNotice = {
      id: noticeToEdit ? noticeToEdit.id : `not-${Date.now()}`,
      type: formData.urgent ? "Important" : "Notice",
      badgeColor,
      iconType,
      title: formData.title.trim(),
      description: formData.description.trim(),
      content: formData.content.trim() || formData.description.trim(),
      targetAudience: finalAudience,
      category: formData.category,
      date: noticeToEdit ? noticeToEdit.date : dateStr,
      time: noticeToEdit ? noticeToEdit.time : timeStr,
      timestamp: noticeToEdit ? noticeToEdit.timestamp : now.getTime(),
      daysAgo: noticeToEdit ? noticeToEdit.daysAgo : 0,
      status: status,
      author: noticeToEdit?.author || "Dr. Arjun Mehta (Faculty)",
      urgent: formData.urgent,
      expiryDate: formData.expiryDate || null,
      attachment: formData.attachmentName
        ? { name: formData.attachmentName, size: "1.4 MB" }
        : null,
    };

    onSubmitNotice(savedNotice, status, !!noticeToEdit);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-white dark:bg-[#031C16] rounded-2xl border border-border-light dark:border-border-dark shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-light dark:border-border-dark bg-gray-50/50 dark:bg-surface-dark/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200/50 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-text-primary dark:text-text-primary-dark">
                {noticeToEdit ? "Edit Notice Record" : "Create New Notice"}
              </h3>
              <p className="text-xs text-text-secondary dark:text-text-secondary-dark">
                Publish administrative and academic notices to students
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
              Notice Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Internal Assessment Schedule Sem 5"
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
                Category / Department
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-card-bg text-text-primary dark:text-text-primary-dark focus:outline-none focus:ring-1.5 focus:ring-emerald-500"
              >
                <option value="Academics">Academics</option>
                <option value="Library">Library</option>
                <option value="Examination">Examination</option>
                <option value="General">General</option>
                <option value="College Events">College Events</option>
                <option value="Administration">Administration</option>
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
                <option value="CSE Students">CSE Students</option>
                <option value="Final Year Students">Final Year Students</option>
                <option value="Specific Semester/Class">Specific Semester / Section</option>
                <option value="Faculty">Faculty Only</option>
              </select>
            </div>
          </div>

          {/* Conditional Specific Class input */}
          {formData.targetAudience === "Specific Semester/Class" && (
            <div className="space-y-1.5 animate-in fade-in-50 duration-150">
              <label className="font-semibold text-text-primary dark:text-text-primary-dark">
                Specific Class Code / Section <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.specificClass}
                onChange={(e) => setFormData({ ...formData, specificClass: e.target.value })}
                placeholder="e.g. CSE-302, B.Tech 3rd Sem Sec B"
                className={`w-full px-3.5 py-2 rounded-xl border ${
                  errors.specificClass
                    ? "border-rose-400 bg-rose-50/20"
                    : "border-border-light dark:border-border-dark bg-white dark:bg-card-bg"
                } text-text-primary dark:text-text-primary-dark focus:outline-none focus:ring-1.5 focus:ring-emerald-500`}
              />
              {errors.specificClass && (
                <p className="text-rose-500 text-[11px] flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.specificClass}
                </p>
              )}
            </div>
          )}

          {/* Expiry Date & Priority */}
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
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                Priority Level
              </label>
              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-text-secondary dark:text-text-secondary-dark">
                  <input
                    type="radio"
                    name="priority"
                    checked={!formData.urgent}
                    onChange={() => setFormData({ ...formData, urgent: false })}
                    className="accent-emerald-600 cursor-pointer"
                  />
                  <span>Normal Notice</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-text-secondary dark:text-text-secondary-dark font-medium">
                  <input
                    type="radio"
                    name="priority"
                    checked={formData.urgent}
                    onChange={() => setFormData({ ...formData, urgent: true })}
                    className="accent-rose-600 cursor-pointer"
                  />
                  <span className="text-rose-600 dark:text-rose-400">Important / Urgent</span>
                </label>
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
              placeholder="Brief 1-2 sentence preview for the notice card..."
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
              Full Detailed Content (Optional for readers)
            </label>
            <textarea
              rows={3}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Comprehensive text, guidelines, instructions, or exam procedures..."
              className="w-full px-3.5 py-2 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-card-bg text-text-primary dark:text-text-primary-dark placeholder:text-text-secondary/50 focus:outline-none focus:ring-1.5 focus:ring-emerald-500 resize-none"
            />
          </div>

          {/* Attachment */}
          <div className="space-y-1.5">
            <label className="font-semibold text-text-primary dark:text-text-primary-dark flex items-center gap-1.5">
              <Paperclip className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              Attachment Document (Demo simulated)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={formData.attachmentName}
                onChange={(e) => setFormData({ ...formData, attachmentName: e.target.value })}
                placeholder="e.g., Circular_CIA1_2025.pdf"
                className="flex-1 px-3.5 py-2 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-card-bg text-text-primary dark:text-text-primary-dark focus:outline-none focus:ring-1.5 focus:ring-emerald-500"
              />
              <button
                type="button"
                onClick={() => setFormData({ ...formData, attachmentName: "Official_Notice_Document.pdf" })}
                className="px-3 py-2 rounded-xl border border-border-light dark:border-border-dark bg-gray-50 dark:bg-surface-dark hover:bg-gray-100 text-text-secondary dark:text-text-secondary-dark text-xs font-medium cursor-pointer"
              >
                Sample PDF
              </button>
            </div>
          </div>

          {/* Demo disclaimer banner */}
          <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/30 text-amber-800 dark:text-amber-300 text-[11px] flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
            <span>
              <strong>Local Demonstration Notice:</strong> This action will update your local College OS workspace. No live emails or student push notifications are dispatched.
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
              {noticeToEdit ? "Save Changes" : "Publish Notice"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
