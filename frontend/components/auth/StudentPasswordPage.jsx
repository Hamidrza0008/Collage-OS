"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Lock,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ShieldCheck,
  LayoutDashboard,
  Users,
  Compass,
  KeyRound,
  Loader2,
} from "lucide-react";
import AuthShell from "./AuthShell";
import AuthCard from "./AuthCard";
import AuthStepper from "./AuthStepper";
import AuthInput from "./AuthInput";
import { useAuth } from "../providers/AuthProvider";

export default function StudentPasswordPage() {
  const router = useRouter();
  const { activationState, setPasswordAndActivate, isLoading } = useAuth();

  // Enforce flow state: Cannot jump directly to Step 3 without completing Step 1 & 2
  useEffect(() => {
    if (!activationState.step1Completed) {
      router.replace("/auth/student/activate");
    } else if (!activationState.step2Completed) {
      router.replace("/auth/student/confirm");
    }
  }, [activationState.step1Completed, activationState.step2Completed, router]);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Real-time password criteria
  const hasMinLength = password.length >= 8;
  const hasUpperLower = /[a-z]/.test(password) && /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  const allCriteriaMet = hasMinLength && hasUpperLower && hasNumber && hasSpecial;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!allCriteriaMet) {
      setError("Please ensure your password meets all 4 security criteria.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match. Please re-enter.");
      return;
    }
    setError("");
    setIsSubmitting(true);

    try {
      const res = await setPasswordAndActivate(password);
      if (res.success) {
        // Will be redirected to /student by setPasswordAndActivate
      }
    } catch (err) {
      setError(err.message || "Failed to set password. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (!activationState.step1Completed || !activationState.step2Completed) {
    return null;
  }

  return (
    <AuthShell
      topNavAction={{
        label: "Already have an account?",
        actionLabel: "Login",
        href: "/auth/student",
      }}
      brandProps={{
        badgeText: "Account Setup",
        badgeIcon: KeyRound,
        headline: ["Set Your Password", "Almost There!"],
        description:
          "Create a strong and secure password to complete your College OS account setup. Keep your account safe and access all the features.",
        topHandwrittenText: "Same Campus, Bigger Dreams 🍃",
        bottomHandwrittenText: "Build Your Future Here ♡",
        features: [
          {
            icon: ShieldCheck,
            title: "Secure Access",
            subtitle: "Your data stays protected",
            iconBg: "bg-[#159B72] text-white",
          },
          {
            icon: LayoutDashboard,
            title: "Personal Dashboard",
            subtitle: "Manage your academic journey",
            iconBg: "bg-[#DDF4EB] dark:bg-[#0C3029] text-[#159B72] dark:text-[#20D39B]",
          },
          {
            icon: Users,
            title: "Stay Connected",
            subtitle: "With your college community",
            iconBg: "bg-[#DDF4EB] dark:bg-[#0C3029] text-[#159B72] dark:text-[#20D39B]",
          },
          {
            icon: Compass,
            title: "Better Experience",
            subtitle: "Designed for a smarter campus",
            iconBg: "bg-[#DDF4EB] dark:bg-[#0C3029] text-[#159B72] dark:text-[#20D39B]",
          },
        ],
      }}
    >
      <AuthCard
        title="Create Your Password"
        subtitle="Choose a strong password to keep your account secure."
      >
        {/* Stepper: Step 3 Active */}
        <div className="mb-4">
          <AuthStepper currentStep={3} />
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-xs text-rose-700 dark:text-rose-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Field 1: New Password */}
          <AuthInput
            id="newPassword"
            label="New Password"
            required
            icon={Lock}
            showPasswordToggle
            placeholder="Enter your new password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError("");
            }}
          />

          {/* Password Strength Criteria Box */}
          <div className="p-3.5 rounded-xl bg-[#F7FBF9] dark:bg-[#07241E] border border-[#D8E8E2] dark:border-[#16463D] space-y-2 text-xs">
            <span className="text-[11px] font-bold text-[#36594C] dark:text-[#A7C8BD] uppercase tracking-wider block">
              Password Requirements
            </span>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                {hasMinLength ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-[#D8E8E2] dark:border-[#16463D] shrink-0" />
                )}
                <span
                  className={
                    hasMinLength
                      ? "text-emerald-700 dark:text-emerald-300 font-semibold"
                      : "text-[#658278] dark:text-[#789991]"
                  }
                >
                  At least 8 characters long
                </span>
              </div>

              <div className="flex items-center gap-2">
                {hasUpperLower ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-[#D8E8E2] dark:border-[#16463D] shrink-0" />
                )}
                <span
                  className={
                    hasUpperLower
                      ? "text-emerald-700 dark:text-emerald-300 font-semibold"
                      : "text-[#658278] dark:text-[#789991]"
                  }
                >
                  Include uppercase and lowercase letters
                </span>
              </div>

              <div className="flex items-center gap-2">
                {hasNumber ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-[#D8E8E2] dark:border-[#16463D] shrink-0" />
                )}
                <span
                  className={
                    hasNumber
                      ? "text-emerald-700 dark:text-emerald-300 font-semibold"
                      : "text-[#658278] dark:text-[#789991]"
                  }
                >
                  Include at least one number
                </span>
              </div>

              <div className="flex items-center gap-2">
                {hasSpecial ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-[#D8E8E2] dark:border-[#16463D] shrink-0" />
                )}
                <span
                  className={
                    hasSpecial
                      ? "text-emerald-700 dark:text-emerald-300 font-semibold"
                      : "text-[#658278] dark:text-[#789991]"
                  }
                >
                  Include at least one special character (e.g. @ # $ % etc.)
                </span>
              </div>
            </div>
          </div>

          {/* Field 2: Confirm Password */}
          <AuthInput
            id="confirmPassword"
            label="Confirm Password"
            required
            icon={Lock}
            showPasswordToggle
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (error) setError("");
            }}
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!allCriteriaMet || !confirmPassword || isSubmitting}
            className="w-full h-11 sm:h-12 rounded-xl bg-[#159B72] hover:bg-[#0E8561] active:scale-[0.99] text-white font-bold text-sm tracking-wide shadow-md shadow-[#159B72]/20 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Activating Your Account...</span>
              </>
            ) : (
              <>
                <span>Set Password &amp; Activate Account</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* OR Divider */}
          <div className="relative flex items-center justify-center my-4">
            <div className="border-t border-[#E2EBE7] dark:border-[#16463D] w-full" />
            <span className="bg-white dark:bg-[#06241F] px-3 text-[11px] font-bold text-[#658278] dark:text-[#789991] uppercase tracking-wider relative">
              OR
            </span>
          </div>

          {/* Continue with Google */}
          <button
            type="button"
            onClick={() => {
              alert("Google authentication can be linked to your verified account after setting your institutional password.");
            }}
            className="w-full h-11 sm:h-12 rounded-xl bg-white dark:bg-[#0A2A24] border border-[#D8E8E2] dark:border-[#16463D] hover:bg-[#F7FBF9] dark:hover:bg-[#0E352E] text-[#0B3024] dark:text-[#F1FAF6] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-colors cursor-pointer shadow-2xs"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.9c2.28-2.1 3.645-5.2 3.645-9.15z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.9-3.05c-1.08.72-2.45 1.16-4.03 1.16-3.1 0-5.73-2.1-6.67-4.92H1.31v3.15C3.31 21.36 7.37 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.33 14.28c-.24-.72-.38-1.49-.38-2.28s.14-1.56.38-2.28V6.57H1.31A11.97 11.97 0 000 12c0 1.92.45 3.74 1.31 5.43l4.02-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.37 0 3.31 2.64 1.31 6.57l4.02 3.15c.94-2.82 3.57-4.97 6.67-4.97z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>
        </form>

        {/* Security Footer */}
        <div className="pt-3 flex items-center justify-center gap-1.5 text-[11px] text-[#658278] dark:text-[#789991]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B]" />
          <span>Your information is securely verified and encrypted.</span>
        </div>
      </AuthCard>
    </AuthShell>
  );
}
