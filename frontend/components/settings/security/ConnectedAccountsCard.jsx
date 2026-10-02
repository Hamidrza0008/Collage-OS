"use client";

import { useState } from "react";
import {
  Link2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ExternalLink,
  Shield,
  X,
  Info,
} from "lucide-react";
import { SECURITY_STORAGE_KEYS, recordDemoAuditLog } from "./securityData";

export default function ConnectedAccountsCard({
  accounts,
  onUpdateAccounts,
  onShowToast,
}) {
  const [pendingAction, setPendingAction] = useState(null); // { account, action: "connect" | "disconnect" }

  const handleToggle = (account) => {
    const isCurrentlyConnected = account.status.startsWith("Connected");
    setPendingAction({
      account,
      action: isCurrentlyConnected ? "disconnect" : "connect",
    });
  };

  const handleConfirmAction = () => {
    if (!pendingAction) return;
    const { account, action } = pendingAction;

    const isConnecting = action === "connect";
    const updatedAccounts = accounts.map((acc) => {
      if (acc.id === account.id) {
        return {
          ...acc,
          status: isConnecting ? "Connected (Demo)" : "Not Connected",
          connectedAt: isConnecting ? "Active in this session" : null,
        };
      }
      return acc;
    });

    onUpdateAccounts(updatedAccounts);

    try {
      localStorage.setItem(
        SECURITY_STORAGE_KEYS.CONNECTED_ACCOUNTS,
        JSON.stringify(updatedAccounts)
      );
      recordDemoAuditLog(
        `${account.name} ${isConnecting ? "connected" : "disconnected"} (Demo)`,
        "OAuth"
      );
    } catch (e) {
      console.warn(e);
    }

    onShowToast(
      isConnecting
        ? `${account.name} connected locally (Demo simulation)`
        : `${account.name} disconnected from local preview`
    );

    setPendingAction(null);
  };

  return (
    <>
      <div className="rounded-2xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#06241F] p-5 shadow-xs space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
              <Link2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-[15px] font-bold text-[#0B3024] dark:text-[#F1FAF6] leading-tight">
                Connected Accounts
              </h2>
              <p className="text-[11px] text-[#658278] dark:text-[#789991]">
                Single Sign-On and integration providers (Demo).
              </p>
            </div>
          </div>

          <span className="text-[10px] font-semibold bg-gray-100 dark:bg-[#0A2A24] text-[#658278] dark:text-[#789991] px-2 py-0.5 rounded-full border border-[#D8E8E2] dark:border-[#16463D]">
            Simulated OAuth
          </span>
        </div>

        {/* Providers List */}
        <div className="space-y-2.5 pt-1">
          {accounts.map((acc) => {
            const isConnected = acc.status.startsWith("Connected");
            return (
              <div
                key={acc.id}
                className="p-3 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-[#F7FBF9] dark:bg-[#0A2A24] flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] flex items-center justify-center font-bold text-xs text-[#0B3024] dark:text-[#F1FAF6] shrink-0">
                    {acc.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                        {acc.name}
                      </span>
                      <span
                        className={`text-[9.5px] font-semibold px-1.5 py-0.2 rounded-md ${
                          isConnected
                            ? "bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200"
                            : "bg-gray-200/80 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                        }`}
                      >
                        {acc.status}
                      </span>
                    </div>
                    <p className="text-[10.5px] text-[#658278] dark:text-[#789991] truncate max-w-xs sm:max-w-sm">
                      {acc.description}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleToggle(acc)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-colors cursor-pointer ${
                    isConnected
                      ? "border border-rose-200 dark:border-rose-900/50 bg-rose-50/50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 hover:bg-rose-100"
                      : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs"
                  }`}
                >
                  {isConnected ? "Disconnect" : "Connect (Demo)"}
                </button>
              </div>
            );
          })}
        </div>

        <div className="text-[10.5px] text-[#658278] dark:text-[#789991] leading-relaxed pt-1">
          Simulated OAuth: Connecting or disconnecting updates this browser session state only. No external redirect or tokens are transmitted.
        </div>
      </div>

      {/* Confirmation Modal */}
      {pendingAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-2xl p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <Link2 className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                  {pendingAction.action === "connect"
                    ? `Connect ${pendingAction.account.name}`
                    : `Disconnect ${pendingAction.account.name}`}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPendingAction(null)}
                className="p-1.5 rounded-lg text-[#658278] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-gray-100 dark:hover:bg-[#10372F]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-[#5C786E] dark:text-[#8AA89F] leading-relaxed">
                {pendingAction.action === "connect"
                  ? `Simulate linking your ${pendingAction.account.name} account to College OS for demo purposes.`
                  : `Are you sure you want to disconnect ${pendingAction.account.name} from this demo session?`}
              </p>

              <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/40 flex items-start gap-2.5 text-[11.5px] text-amber-900 dark:text-amber-200/90 leading-relaxed">
                <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Demo Confirmation:</strong> This action updates local preview state only. No real OAuth popup or network request is triggered.
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setPendingAction(null)}
                className="px-3.5 py-1.5 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] text-xs font-semibold text-[#658278] dark:text-[#8AA89F] hover:bg-gray-50 dark:hover:bg-[#0A2A24]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmAction}
                className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                Confirm (Demo)
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
