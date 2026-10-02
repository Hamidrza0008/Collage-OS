"use client";

import { useState } from "react";
import {
  X,
  QrCode,
  KeyRound,
  ShieldCheck,
  Copy,
  Check,
  Download,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Info,
} from "lucide-react";
import { DEMO_BACKUP_CODES } from "./securityData";

export default function TwoFactorSetupModal({ isOpen, onClose, onComplete }) {
  const [step, setStep] = useState(1);
  const [copiedSecret, setCopiedSecret] = useState(false);
  const [copiedCodes, setCopiedCodes] = useState(false);
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");

  const demoSecretKey = "JBSWY3DPEHPK3PXP";

  if (!isOpen) return null;

  const handleCopySecret = () => {
    navigator.clipboard.writeText(demoSecretKey);
    setCopiedSecret(true);
    setTimeout(() => setCopiedSecret(false), 2000);
  };

  const handleCopyBackupCodes = () => {
    navigator.clipboard.writeText(DEMO_BACKUP_CODES.join("\n"));
    setCopiedCodes(true);
    setTimeout(() => setCopiedCodes(false), 2000);
  };

  const handleDownloadBackupCodes = () => {
    const element = document.createElement("a");
    const file = new Blob(
      [
        "COLLEGE OS — 2FA DEMO RECOVERY CODES\n",
        "Note: These are simulated client-side backup codes for demonstration.\n\n",
        DEMO_BACKUP_CODES.join("\n"),
      ],
      { type: "text/plain" }
    );
    element.href = URL.createObjectURL(file);
    element.download = "college-os-demo-backup-codes.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newDigits = [...otpDigits];
    newDigits[index] = value.slice(-1);
    setOtpDigits(newDigits);
    setOtpError("");

    // Auto-advance focus to next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerifyOtp = () => {
    const code = otpDigits.join("");
    if (code.length < 6) {
      setOtpError("Please enter all 6 digits to proceed (Demo code: any 6 digits).");
      return;
    }
    // Client-side demo simulation: any 6 digit code succeeds
    setStep(3);
  };

  const handleFinish = () => {
    onComplete();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-2xl overflow-hidden transition-all animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#D8E8E2] dark:border-[#16463D] bg-[#F7FBF9] dark:bg-[#0A2A24]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                Set Up Two-Factor Authentication
              </h3>
              <p className="text-[11px] text-[#658278] dark:text-[#789991]">
                Step {step} of 3 • Client-side UI Simulation
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#658278] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-gray-100 dark:hover:bg-[#10372F] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Prominent Demo Notice */}
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 flex items-start gap-2.5 text-xs text-amber-900 dark:text-amber-200/90 leading-relaxed">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              <strong>Simulated Local UI:</strong> No real authenticator service is contacted and the account is not truly protected by 2FA. This is a local frontend demonstration.
            </span>
          </div>

          {/* STEP 1: Scan QR Code & Secret Key */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="text-xs text-[#5C786E] dark:text-[#8AA89F] leading-relaxed">
                Scan the demo QR code using an authenticator app (such as Google Authenticator, Authy, or Microsoft Authenticator), or manually copy the secret key below.
              </div>

              {/* Simulated QR graphic */}
              <div className="flex flex-col items-center justify-center p-5 rounded-xl border border-dashed border-[#D8E8E2] dark:border-[#16463D] bg-[#F7FBF9] dark:bg-[#041D18]">
                <div className="w-36 h-36 bg-white p-3 rounded-lg shadow-xs flex flex-col items-center justify-center border border-gray-200 text-center">
                  <QrCode className="w-24 h-24 text-gray-800" />
                  <span className="text-[9px] font-mono text-gray-500 mt-1 uppercase tracking-wider">
                    Demo QR Code
                  </span>
                </div>
              </div>

              {/* Secret key box */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
                  Manual Setup Secret Key:
                </label>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-gray-50 dark:bg-[#0A2A24] border border-[#D8E8E2] dark:border-[#16463D]">
                  <code className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-300 flex-1 tracking-wider">
                    {demoSecretKey}
                  </code>
                  <button
                    type="button"
                    onClick={handleCopySecret}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-[#10372F] border border-[#D8E8E2] dark:border-[#16463D] text-[11px] font-medium text-[#0B3024] dark:text-[#F1FAF6] hover:bg-gray-50 transition-colors shadow-2xs"
                  >
                    {copiedSecret ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-gray-500" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Enter 6-digit OTP verification */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="text-xs text-[#5C786E] dark:text-[#8AA89F] leading-relaxed">
                Enter the 6-digit verification code from your authenticator app to confirm setup. In this demo, any 6 numbers will be accepted.
              </div>

              {/* 6 Digit Inputs */}
              <div className="flex justify-center items-center gap-2 sm:gap-3 py-2">
                {otpDigits.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-input-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-10 h-12 sm:w-12 sm:h-14 text-center text-lg sm:text-xl font-bold rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#0A2A24] text-[#0B3024] dark:text-[#F1FAF6] focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none shadow-2xs"
                  />
                ))}
              </div>

              {otpError && (
                <div className="text-xs text-rose-600 dark:text-rose-400 text-center font-medium">
                  {otpError}
                </div>
              )}

              <div className="text-center text-[11px] text-[#658278] dark:text-[#789991]">
                Simulated verification: Enter any 6 digits (e.g. 123456)
              </div>
            </div>
          )}

          {/* STEP 3: Backup Recovery Codes */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="text-xs text-[#5C786E] dark:text-[#8AA89F] leading-relaxed">
                Save your backup recovery codes. In real environments, these can be used if you lose access to your primary 2FA device.
              </div>

              <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-[#0A2A24] border border-[#D8E8E2] dark:border-[#16463D]">
                <div className="grid grid-cols-2 gap-2 text-center">
                  {DEMO_BACKUP_CODES.map((code, idx) => (
                    <div
                      key={idx}
                      className="py-1 px-2 rounded-lg bg-white dark:bg-[#06241F] border border-gray-200 dark:border-[#16463D] font-mono text-[11px] font-semibold text-[#0B3024] dark:text-[#E2F1EC]"
                    >
                      {code}
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleCopyBackupCodes}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white dark:bg-[#10372F] border border-[#D8E8E2] dark:border-[#16463D] text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] hover:bg-gray-50 transition-colors shadow-2xs"
                >
                  {copiedCodes ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Codes Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-gray-500" />
                      <span>Copy All Codes</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleDownloadBackupCodes}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white dark:bg-[#10372F] border border-[#D8E8E2] dark:border-[#16463D] text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] hover:bg-gray-50 transition-colors shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5 text-gray-500" />
                  <span>Download .TXT</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#D8E8E2] dark:border-[#16463D] bg-[#F7FBF9] dark:bg-[#0A2A24]">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-[#658278] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-gray-100 dark:hover:bg-[#10372F] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-xl text-xs font-medium text-[#658278] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-gray-100 dark:hover:bg-[#10372F] transition-colors"
            >
              Cancel
            </button>
          )}

          {step === 1 && (
            <button
              type="button"
              onClick={() => setStep(2)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <span>Next: Verify Code</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          {step === 2 && (
            <button
              type="button"
              onClick={handleVerifyOtp}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <span>Verify &amp; Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          {step === 3 && (
            <button
              type="button"
              onClick={handleFinish}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Complete Setup (Demo)</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
