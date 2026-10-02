"use client";

import { useState, useEffect } from "react";
import SecurityHeader from "./SecurityHeader";
import PasswordManagementCard from "./PasswordManagementCard";
import TwoFactorAuthCard from "./TwoFactorAuthCard";
import ActiveSessionsCard from "./ActiveSessionsCard";
import ConnectedAccountsCard from "./ConnectedAccountsCard";
import SecurityAuditLogCard from "./SecurityAuditLogCard";
import SecuritySkeleton from "./SecuritySkeleton";
import {
  INITIAL_SECURITY_STATE,
  loadSecurityLocalState,
  SECURITY_STORAGE_KEYS,
  recordDemoAuditLog,
} from "./securityData";
import { CheckCircle2 } from "lucide-react";

export default function SecurityAssembler() {
  const [isLoading, setIsLoading] = useState(true);

  // Local state initialized with fallback
  const [twoFactorState, setTwoFactorState] = useState(INITIAL_SECURITY_STATE.twoFactor);
  const [passwordState, setPasswordState] = useState(INITIAL_SECURITY_STATE.password);
  const [activeSessions, setActiveSessions] = useState(INITIAL_SECURITY_STATE.activeSessions);
  const [connectedAccounts, setConnectedAccounts] = useState(INITIAL_SECURITY_STATE.connectedAccounts);
  const [auditLogs, setAuditLogs] = useState(INITIAL_SECURITY_STATE.auditLog);

  // Floating Toast State
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  useEffect(() => {
    // Load local storage if available
    const localData = loadSecurityLocalState();
    setTwoFactorState(localData.twoFactor);
    setConnectedAccounts(localData.connectedAccounts);
    setAuditLogs(localData.auditLog);

    // Brief mount delay to present clean skeleton transition
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 350);
    return () => clearTimeout(timer);
  }, []);

  const handleRevokeSession = (sessionId) => {
    setActiveSessions((prev) => prev.filter((s) => s.id !== sessionId));
  };

  const handleUpdateTwoFactor = (new2FA) => {
    setTwoFactorState(new2FA);
    // Refresh audit logs
    const updated = recordDemoAuditLog(
      new2FA.enabled
        ? "Two-factor authentication enabled (Demo)"
        : "Two-factor authentication disabled (Demo)",
      "Security"
    );
    if (updated) setAuditLogs(updated);
  };

  const handleUpdateAccounts = (newAccounts) => {
    setConnectedAccounts(newAccounts);
    const localData = loadSecurityLocalState();
    setAuditLogs(localData.auditLog);
  };

  if (isLoading) {
    return <SecuritySkeleton />;
  }

  return (
    <div className="w-full min-h-screen py-6 space-y-6">
      {/* 1. Header Banner */}
      <SecurityHeader />

      {/* 2. Grid Content: Left 8-col & Right 4-col */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column (8 cols): Credential & 2FA Management */}
        <div className="lg:col-span-8 space-y-5">
          {/* Password Management */}
          <PasswordManagementCard
            passwordData={passwordState}
            onShowToast={showToast}
          />

          {/* Two-Factor Authentication */}
          <TwoFactorAuthCard
            twoFactorState={twoFactorState}
            onUpdateTwoFactor={handleUpdateTwoFactor}
            onShowToast={showToast}
          />

          {/* Security Activity & Audit Trail */}
          <SecurityAuditLogCard auditLogs={auditLogs} />
        </div>

        {/* Right Column (4 cols): Active Devices & Third-Party Accounts */}
        <div className="lg:col-span-4 space-y-5">
          {/* Active Demo Sessions */}
          <ActiveSessionsCard
            sessions={activeSessions}
            onRevokeSession={handleRevokeSession}
            onShowToast={showToast}
          />

          {/* Connected OAuth Accounts */}
          <ConnectedAccountsCard
            accounts={connectedAccounts}
            onUpdateAccounts={handleUpdateAccounts}
            onShowToast={showToast}
          />
        </div>
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[#0B3024] dark:bg-emerald-950 text-white text-xs font-semibold shadow-2xl border border-emerald-500/40 animate-slide-up">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
