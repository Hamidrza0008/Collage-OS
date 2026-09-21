"use client";

import { useState } from "react";
import { X, Bell, Check, Sparkles } from "lucide-react";

export default function EventNotificationModal({ isOpen, onClose, onSave }) {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(true);
  const [smsReminders, setSmsReminders] = useState(false);
  const [hackathons, setHackathons] = useState(true);
  const [workshops, setWorkshops] = useState(true);
  const [culturals, setCulturals] = useState(true);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-md bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] rounded-3xl shadow-2xl p-5 sm:p-6 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-[#10372F]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#DDF4EB] dark:bg-[#0B3D31] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                Event Notifications
              </h3>
              <p className="text-[11px] text-[#55786B] dark:text-[#8FAFA4]">
                Choose how and when you want to receive alerts
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#082A24] flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Toggles */}
        <div className="mt-4 space-y-3 text-xs">
          <div className="font-semibold uppercase tracking-wider text-[10.5px] text-[#658278] dark:text-[#789991]">
            Delivery Channels
          </div>

          <label className="flex items-center justify-between p-2.5 rounded-xl border border-[#D8E8E2] dark:border-[#10372F] bg-gray-50/50 dark:bg-[#031A16] cursor-pointer">
            <div>
              <div className="font-bold text-[#0B3024] dark:text-[#F1FAF6]">Push Notifications</div>
              <div className="text-[11px] text-[#55786B] dark:text-[#8FAFA4]">Instant alerts in browser & mobile</div>
            </div>
            <input
              type="checkbox"
              checked={pushAlerts}
              onChange={(e) => setPushAlerts(e.target.checked)}
              className="w-4 h-4 accent-[#159B72] rounded cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-2.5 rounded-xl border border-[#D8E8E2] dark:border-[#10372F] bg-gray-50/50 dark:bg-[#031A16] cursor-pointer">
            <div>
              <div className="font-bold text-[#0B3024] dark:text-[#F1FAF6]">Email Digest & Reminders</div>
              <div className="text-[11px] text-[#55786B] dark:text-[#8FAFA4]">Weekly summary + 24hr reminders</div>
            </div>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              className="w-4 h-4 accent-[#159B72] rounded cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-2.5 rounded-xl border border-[#D8E8E2] dark:border-[#10372F] bg-gray-50/50 dark:bg-[#031A16] cursor-pointer">
            <div>
              <div className="font-bold text-[#0B3024] dark:text-[#F1FAF6]">SMS Urgent Alerts</div>
              <div className="text-[11px] text-[#55786B] dark:text-[#8FAFA4]">2 hours before registered event starts</div>
            </div>
            <input
              type="checkbox"
              checked={smsReminders}
              onChange={(e) => setSmsReminders(e.target.checked)}
              className="w-4 h-4 accent-[#159B72] rounded cursor-pointer"
            />
          </label>

          <div className="pt-2 font-semibold uppercase tracking-wider text-[10.5px] text-[#658278] dark:text-[#789991]">
            Categories of Interest
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setHackathons((p) => !p)}
              className={`p-2 rounded-xl text-center font-semibold border transition-all cursor-pointer ${
                hackathons
                  ? "bg-[#DDF4EB] dark:bg-[#0A3D30] text-[#159B72] dark:text-[#20D39B] border-[#159B72]"
                  : "border-[#D8E8E2] dark:border-[#10372F] text-[#4F7063] dark:text-[#8FAFA4]"
              }`}
            >
              Hackathons
            </button>
            <button
              type="button"
              onClick={() => setWorkshops((p) => !p)}
              className={`p-2 rounded-xl text-center font-semibold border transition-all cursor-pointer ${
                workshops
                  ? "bg-[#DDF4EB] dark:bg-[#0A3D30] text-[#159B72] dark:text-[#20D39B] border-[#159B72]"
                  : "border-[#D8E8E2] dark:border-[#10372F] text-[#4F7063] dark:text-[#8FAFA4]"
              }`}
            >
              Workshops
            </button>
            <button
              type="button"
              onClick={() => setCulturals((p) => !p)}
              className={`p-2 rounded-xl text-center font-semibold border transition-all cursor-pointer ${
                culturals
                  ? "bg-[#DDF4EB] dark:bg-[#0A3D30] text-[#159B72] dark:text-[#20D39B] border-[#159B72]"
                  : "border-[#D8E8E2] dark:border-[#10372F] text-[#4F7063] dark:text-[#8FAFA4]"
              }`}
            >
              Culturals
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 pt-3 border-t border-gray-100 dark:border-[#10372F] flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-[#36594C] dark:text-[#B5CCC5] hover:bg-gray-100 dark:hover:bg-[#082A24] cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-1.5 rounded-xl bg-[#159B72] hover:bg-[#0F805D] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Save Preferences</span>
          </button>
        </div>
      </div>
    </div>
  );
}
