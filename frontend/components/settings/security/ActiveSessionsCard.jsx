"use client";

import { useState } from "react";
import { Laptop, Smartphone, Shield, LogOut, CheckCircle2, AlertCircle } from "lucide-react";
import RevokeSessionModal from "./RevokeSessionModal";
import { recordDemoAuditLog } from "./securityData";

export default function ActiveSessionsCard({ sessions, onRevokeSession, onShowToast }) {
  const [selectedSessionToRevoke, setSelectedSessionToRevoke] = useState(null);

  const handleConfirmRevoke = (sessionId) => {
    onRevokeSession(sessionId);
    recordDemoAuditLog(`Demo session revoked (${sessionId})`, "Sessions");
    onShowToast("Demo session removed from local preview (no server session invalidated)");
  };

  return (
    <>
      <div className="rounded-2xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#06241F] p-5 shadow-xs space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
              <Laptop className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-[15px] font-bold text-[#0B3024] dark:text-[#F1FAF6] leading-tight">
                Active Demo Sessions
              </h2>
              <p className="text-[11px] text-[#658278] dark:text-[#789991]">
                Devices currently viewing this local demo.
              </p>
            </div>
          </div>

          <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/20">
            {sessions.length} Active
          </span>
        </div>

        {/* Sessions list */}
        <div className="space-y-2.5 pt-1">
          {sessions.length === 0 ? (
            <div className="p-4 rounded-xl border border-dashed border-[#D8E8E2] dark:border-[#16463D] text-center text-xs text-[#658278] dark:text-[#789991]">
              No active demo sessions in this browser state.
            </div>
          ) : (
            sessions.map((session) => (
              <div
                key={session.id}
                className="p-3 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-[#F7FBF9] dark:bg-[#0A2A24] space-y-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                      {session.deviceType === "Mobile" ? (
                        <Smartphone className="w-3.5 h-3.5" />
                      ) : (
                        <Laptop className="w-3.5 h-3.5" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] truncate">
                          {session.title}
                        </span>
                        {session.isCurrent && (
                          <span className="px-1.5 py-0.5 rounded-md text-[9px] font-semibold bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200">
                            Current
                          </span>
                        )}
                      </div>
                      <div className="text-[10.5px] text-[#658278] dark:text-[#789991]">
                        {session.browser} • {session.os}
                      </div>
                    </div>
                  </div>

                  {/* Revoke Action */}
                  <button
                    type="button"
                    onClick={() => setSelectedSessionToRevoke(session)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors shrink-0 cursor-pointer"
                    title="Revoke session (Demo)"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center justify-between text-[10px] text-[#658278] dark:text-[#789991] pt-1 border-t border-[#D8E8E2]/60 dark:border-[#16463D]/60">
                  <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {session.status}
                  </span>
                  <span>{session.lastActive}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Local disclaimer notice */}
        <div className="text-[10.5px] text-[#658278] dark:text-[#789991] leading-relaxed pt-1">
          Revoking a demo session removes it from this local preview only; no server-side session invalidation occurs.
        </div>
      </div>

      <RevokeSessionModal
        isOpen={Boolean(selectedSessionToRevoke)}
        session={selectedSessionToRevoke}
        onClose={() => setSelectedSessionToRevoke(null)}
        onConfirm={handleConfirmRevoke}
      />
    </>
  );
}
