"use client";

import { useState } from "react";
import { X, Bell, Check, Sparkles } from "lucide-react";

export default function NotificationSettingsModal({ isOpen, onClose, onSave }) {
  const [settings, setSettings] = useState({
    examNotices: true,
    placementAlerts: true,
    importantAnnouncements: true,
    eventsAndFestivals: false,
    emailDigest: true,
  });

  if (!isOpen) return null;

  const toggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    if (onSave) onSave(settings);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl max-w-md w-full shadow-2xl p-6 my-8 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-[#10372F]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] leading-snug">
                Notification Preferences
              </h3>
              <p className="text-[11px] text-[#5C786E] dark:text-[#8AA89F]">
                Customize which notices trigger immediate alerts
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toggles */}
        <div className="py-4 space-y-3 text-xs">
          {[
            {
              key: "examNotices",
              label: "Exam & Timetable Notices",
              desc: "Instant alerts for mid-sem, end-sem schedules and hall tickets",
            },
            {
              key: "placementAlerts",
              label: "Placement & Internship Drives",
              desc: "Immediate updates on new company eligibility and deadlines",
            },
            {
              key: "importantAnnouncements",
              label: "Emergency & Holiday Notices",
              desc: "Official university re-openings and academic schedule changes",
            },
            {
              key: "eventsAndFestivals",
              label: "Campus Events & Tech Fests",
              desc: "Invitations for hackathons, guest lectures, and cultural events",
            },
            {
              key: "emailDigest",
              label: "Daily Email Summary",
              desc: "Receive a compiled daily evening digest of all notices",
            },
          ].map((item) => (
            <div
              key={item.key}
              onClick={() => toggle(item.key)}
              className="flex items-start justify-between p-3 rounded-xl border border-gray-100 dark:border-[#10372F] bg-gray-50/50 dark:bg-[#041D18]/50 cursor-pointer hover:bg-emerald-50/40 dark:hover:bg-[#082A24] transition-colors"
            >
              <div className="pr-3">
                <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6] block leading-snug">
                  {item.label}
                </span>
                <span className="text-[10.5px] text-[#5C786E] dark:text-[#8AA89F] block mt-0.5">
                  {item.desc}
                </span>
              </div>

              <div
                className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors shrink-0 mt-0.5 ${
                  settings[item.key]
                    ? "bg-emerald-600 dark:bg-emerald-500 justify-end"
                    : "bg-gray-300 dark:bg-gray-700 justify-start"
                }`}
              >
                <div className="bg-white w-4 h-4 rounded-full shadow-md transform transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100 dark:border-[#10372F]">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#082A24] cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white dark:bg-[#10B981] dark:text-[#021512] transition-colors cursor-pointer"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}
