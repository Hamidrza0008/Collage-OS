"use client";

import { useState } from "react";
import { Key, Eye, EyeOff, ShieldCheck, Check, AlertCircle, Info } from "lucide-react";
import { recordDemoAuditLog } from "./securityData";

export default function PasswordManagementCard({ passwordData, onShowToast }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [validationError, setValidationError] = useState("");
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  // Dynamic Password Strength Meter calculations
  const calculateStrength = (pwd) => {
    if (!pwd) return { score: 0, label: "Empty", color: "bg-gray-200" };
    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (pwd.length >= 12) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
    if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score += 1;

    if (score <= 2) return { score: 1, label: "Weak", color: "bg-rose-500", text: "text-rose-600" };
    if (score <= 3) return { score: 2, label: "Fair", color: "bg-amber-500", text: "text-amber-600" };
    if (score === 4) return { score: 3, label: "Good", color: "bg-teal-500", text: "text-teal-600" };
    return { score: 4, label: "Strong", color: "bg-emerald-500", text: "text-emerald-600" };
  };

  const strength = calculateStrength(newPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError("");
    setFeedbackSuccess(false);

    if (!currentPassword) {
      setValidationError("Please enter your current demo password.");
      return;
    }

    if (newPassword.length < 8) {
      setValidationError("New password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setValidationError("The confirmation password does not match the new password.");
      return;
    }

    // STRICT DEMO SAFETY:
    // Client-side simulation only. No backend call, no persistence, no plaintext storage.
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setFeedbackSuccess(true);

    recordDemoAuditLog("Demo password update validated locally", "Authentication");

    // Strictly demo-safe wording
    onShowToast("Demo password update validated locally (UI demo — no real password was changed)");

    setTimeout(() => {
      setFeedbackSuccess(false);
    }, 5000);
  };

  return (
    <div className="rounded-2xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#06241F] p-5 shadow-xs space-y-4">
      {/* Card Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] leading-tight">
              Password Management
            </h2>
            <p className="text-xs text-[#658278] dark:text-[#789991] mt-0.5">
              Client-side credential validation walkthrough (simulated).
            </p>
          </div>
        </div>

        {/* Demo Status Badge */}
        <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-gray-100 dark:bg-[#0A2A24] text-[#658278] dark:text-[#789991] border border-[#D8E8E2] dark:border-[#16463D] shrink-0">
          Client Validation Only
        </span>
      </div>

      {/* Metadata / Notice Box - ZERO fabricated history */}
      <div className="p-3 rounded-xl bg-[#F7FBF9] dark:bg-[#0A2A24] border border-[#D8E8E2] dark:border-[#16463D] flex items-center gap-2.5 text-xs text-[#658278] dark:text-[#789991]">
        <Info className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
        <span>
          {passwordData?.statusNotice || "Demo state — authentication backend not connected"}
        </span>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 pt-1">
        {/* Current Password Input */}
        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
            Current Password
          </label>
          <div className="relative">
            <input
              type={showCurrent ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password (demo)"
              className="w-full px-3.5 py-2 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#06241F] text-xs font-medium text-[#0B3024] dark:text-[#F1FAF6] focus:border-emerald-500/60 outline-none pr-10 shadow-2xs"
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* New Password & Dynamic Strength Meter */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
            New Password
          </label>
          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter at least 8 characters"
              className="w-full px-3.5 py-2 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#06241F] text-xs font-medium text-[#0B3024] dark:text-[#F1FAF6] focus:border-emerald-500/60 outline-none pr-10 shadow-2xs"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Strength Meter Bar */}
          {newPassword && (
            <div className="space-y-1 pt-1">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-[#658278] dark:text-[#789991]">Strength</span>
                <span className={`font-semibold ${strength.text}`}>{strength.label}</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden flex gap-1">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-full flex-1 rounded-full transition-all duration-300 ${
                      i < strength.score ? strength.color : "bg-transparent"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password Input */}
        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
            Confirm New Password
          </label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter new password"
              className="w-full px-3.5 py-2 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#06241F] text-xs font-medium text-[#0B3024] dark:text-[#F1FAF6] focus:border-emerald-500/60 outline-none pr-10 shadow-2xs"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Error / Feedback alerts */}
        {validationError && (
          <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 flex items-center gap-2 text-xs text-rose-700 dark:text-rose-300">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        {feedbackSuccess && (
          <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 flex items-center gap-2 text-xs text-emerald-800 dark:text-emerald-200">
            <Check className="w-4 h-4 shrink-0" />
            <span>Demo password update validated locally (UI demo — no real password was changed)</span>
          </div>
        )}

        {/* Submit Action */}
        <div className="pt-1 flex items-center justify-end">
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            Validate &amp; Save (Demo)
          </button>
        </div>
      </form>
    </div>
  );
}
