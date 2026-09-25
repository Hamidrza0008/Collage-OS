"use client";

import { useState } from "react";
import { X, Edit3, CheckCircle2, Lock } from "lucide-react";

export default function EditReportModal({
  isOpen,
  onClose,
  report,
  onSaveReport,
}) {
  const [description, setDescription] = useState(report?.description || "");
  const [distinguishingFeatures, setDistinguishingFeatures] = useState(
    report?.distinguishingFeatures || ""
  );
  const [location, setLocation] = useState(report?.location || "");
  const [contactPreference, setContactPreference] = useState(
    report?.contactPreference || "College Email"
  );

  if (!isOpen || !report) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) return;

    const updatedData = {
      description,
      distinguishingFeatures,
      location,
      contactPreference,
    };

    onSaveReport(report.id, updatedData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-white dark:bg-[#06241F] rounded-2xl border border-[#D8E8E2] dark:border-[#16463D] shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#D8E8E2] dark:border-[#16463D] flex items-center justify-between gap-3 bg-[#FAFDFB] dark:bg-[#072620]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#DDF4EB] dark:bg-[#123F35] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center shrink-0">
              <Edit3 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                Update Report Details
              </h3>
              <p className="text-[11px] text-[#55786B] dark:text-[#9FB7AD]">
                Case: {report.caseId} • {report.itemName}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#658278] hover:text-[#0B3024] dark:text-[#8BA69D] dark:hover:text-[#F1FAF6] hover:bg-gray-100 dark:hover:bg-[#082A24] cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          {/* Readonly Immutable Fields */}
          <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#082A24] border border-[#E0EBE6] dark:border-[#16463D] grid grid-cols-2 gap-2 text-[11px]">
            <div>
              <span className="text-[#658278] dark:text-[#8BA69D] flex items-center gap-1">
                <Lock className="w-3 h-3" /> Case ID (Immutable)
              </span>
              <span className="font-mono font-bold text-[#0B3024] dark:text-[#F1FAF6]">{report.caseId}</span>
            </div>
            <div>
              <span className="text-[#658278] dark:text-[#8BA69D] flex items-center gap-1">
                <Lock className="w-3 h-3" /> Current Status
              </span>
              <span className="font-bold text-[#159B72] dark:text-[#20D39B]">{report.status}</span>
            </div>
          </div>

          {/* Location field */}
          <div className="space-y-1">
            <label className="font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
              Location Details
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-white dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden focus:border-[#159B72]"
            />
          </div>

          {/* Description field */}
          <div className="space-y-1">
            <label className="font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
              Item Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-white dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden focus:border-[#159B72]"
            />
          </div>

          {/* Distinguishing Features field */}
          <div className="space-y-1">
            <label className="font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
              Distinguishing Features (Internal / Private)
            </label>
            <textarea
              rows={2}
              value={distinguishingFeatures}
              onChange={(e) => setDistinguishingFeatures(e.target.value)}
              placeholder="Private details known only to you or security"
              className="w-full p-2.5 rounded-xl bg-white dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden focus:border-[#159B72]"
            />
          </div>

          {/* Contact Preference */}
          <div className="space-y-1">
            <label className="font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
              Contact Preference
            </label>
            <select
              value={contactPreference}
              onChange={(e) => setContactPreference(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-white dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden focus:border-[#159B72] cursor-pointer"
            >
              <option value="College Email">College Email Only</option>
              <option value="College Phone & Email">College Phone &amp; Email</option>
              <option value="Security Counter Collection">Direct Security Counter Notification</option>
            </select>
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-[#D8E8E2] dark:border-[#16463D] flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl font-semibold text-[#55786B] dark:text-[#9FB7AD] hover:bg-gray-100 dark:hover:bg-[#082A24] cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-white bg-[#159B72] hover:bg-[#107A59] transition-all cursor-pointer shadow-xs"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
