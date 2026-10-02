"use client";

import { useState } from "react";
import { ShieldCheck, ShieldAlert, KeyRound, Smartphone, CheckCircle2, ChevronRight, Lock } from "lucide-react";
import TwoFactorSetupModal from "./TwoFactorSetupModal";
import { SECURITY_STORAGE_KEYS, recordDemoAuditLog } from "./securityData";

export default function TwoFactorAuthCard({ twoFactorState, onUpdateTwoFactor, onShowToast }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCodesOnly, setShowCodesOnly] = useState(false);

  const isEnabled = Boolean(twoFactorState?.enabled);

  const handleOpenSetup = () => {
    setShowCodesOnly(false);
    setIsModalOpen(true);
  };

  const handleDisable2FA = () => {
    const updated = {
      ...twoFactorState,
      enabled: false,
      backupCodesGenerated: false,
    };
    onUpdateTwoFactor(updated);
    try {
      localStorage.setItem(SECURITY_STORAGE_KEYS.TWO_FACTOR, JSON.stringify(updated));
      recordDemoAuditLog("Two-factor authentication disabled (Demo)", "Security");
    } catch (e) {
      console.warn(e);
    }
    onShowToast("2FA disabled locally (Simulated demo mode)");
  };

  const handleSetupComplete = () => {
    const updated = {
      ...twoFactorState,
      enabled: true,
      backupCodesGenerated: true,
    };
    onUpdateTwoFactor(updated);
    try {
      localStorage.setItem(SECURITY_STORAGE_KEYS.TWO_FACTOR, JSON.stringify(updated));
      recordDemoAuditLog("Two-factor authentication enabled (Demo)", "Security");
    } catch (e) {
      console.warn(e);
    }
    onShowToast("2FA enabled locally (Simulated demo mode)");
  };

  return (
    <>
      <div className="rounded-2xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#06241F] p-5 shadow-xs space-y-4">
        {/* Card Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] leading-tight">
                Two-Factor Authentication (2FA)
              </h2>
              <p className="text-xs text-[#658278] dark:text-[#789991] mt-0.5">
                Simulate protecting your College OS account with a second verification step.
              </p>
            </div>
          </div>

          <span
            className={`px-2.5 py-1 rounded-full text-xs font-semibold shrink-0 ${
              isEnabled
                ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
            }`}
          >
            {isEnabled ? "Enabled (Demo)" : "Not Configured"}
          </span>
        </div>

        {/* Content Box */}
        <div className="p-4 rounded-xl bg-[#F7FBF9] dark:bg-[#0A2A24] border border-[#D8E8E2] dark:border-[#16463D] space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
              <Smartphone className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                Authenticator App Verification
              </div>
              <p className="text-[11.5px] text-[#658278] dark:text-[#789991] mt-0.5 leading-relaxed">
                Use applications like Google Authenticator or Microsoft Authenticator to generate temporary 6-digit codes.
              </p>
            </div>
          </div>

          {isEnabled ? (
            <div className="pt-2 border-t border-[#D8E8E2]/60 dark:border-[#16463D]/60 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                <CheckCircle2 className="w-4 h-4" />
                <span>Simulated protection active in this browser</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleOpenSetup}
                  className="px-3 py-1.5 rounded-lg border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#06241F] hover:bg-gray-50 text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] shadow-2xs transition-colors"
                >
                  Reconfigure
                </button>
                <button
                  type="button"
                  onClick={handleDisable2FA}
                  className="px-3 py-1.5 rounded-lg border border-rose-200 dark:border-rose-900/50 bg-rose-50/50 dark:bg-rose-950/30 hover:bg-rose-100 text-xs font-semibold text-rose-700 dark:text-rose-300 transition-colors"
                >
                  Turn Off 2FA
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-2 border-t border-[#D8E8E2]/60 dark:border-[#16463D]/60 flex items-center justify-between">
              <div className="text-xs text-[#658278] dark:text-[#789991]">
                Recommended for higher account protection.
              </div>
              <button
                type="button"
                onClick={handleOpenSetup}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors"
              >
                <span>Enable 2FA (Demo)</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      <TwoFactorSetupModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onComplete={handleSetupComplete}
      />
    </>
  );
}
