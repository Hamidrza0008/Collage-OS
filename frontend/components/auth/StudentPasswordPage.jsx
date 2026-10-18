"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Lock,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  LayoutDashboard,
  Zap,
  Building2,
  GraduationCap,
  Loader2,
  Check,
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
      showFacultyLink={false}
      cardMaxWidth="max-w-[460px] lg:max-w-[450px] xl:max-w-[460px]"
      topNavAction={{
        label: "Already have an account?",
        actionLabel: "Login",
        href: "/auth/student",
      }}
      brandProps={{
        badgeText: "Account Setup",
        badgeIcon: GraduationCap,
        headline: ["Set Your Password", "Almost There!"],
        description:
          "Create a strong and secure password to complete your College OS account setup. Keep your account safe and access all the features.",
        topHandwrittenText: "Same Campus,\nBigger Dreams ♡",
        bottomHandwrittenText: "Build Your\nFuture Here ♡",
        features: [
          {
            icon: ShieldCheck,
            title: "Secure Access",
            subtitle: "Your data stays\nprotected",
          },
          {
            icon: LayoutDashboard,
            title: "Personal Dashboard",
            subtitle: "Manage your academic\njourney",
          },
          {
            icon: Zap,
            title: "Stay Connected",
            subtitle: "With your college\ncommunity",
          },
          {
            icon: Building2,
            title: "Better Experience",
            subtitle: "Designed for a\nsmarter campus",
          },
        ],
      }}
    >
      <AuthCard
        title="Create Your Password"
        subtitle="Choose a strong password to keep your account secure."
        maxWidth="max-w-[460px] lg:max-w-[450px] xl:max-w-[460px]"
      >
        {/* Stepper: Step 3 Active */}
        <div className="mb-2">
          <AuthStepper currentStep={3} />
        </div>

        {error && (
          <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-xs text-rose-700 dark:text-rose-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
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
          <div className="p-3 rounded-xl bg-[#F7FBF9] dark:bg-[#07241E] border border-[#D8E8E2] dark:border-[#16463D] space-y-2 text-xs">
            <div className="space-y-1.5">
              {/* Requirement 1 */}
              <div className="flex items-center gap-2">
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                    hasMinLength
                      ? "bg-[#159B72] text-white"
                      : "bg-[#D8E8E2] dark:bg-[#16463D] text-[#658278]"
                  }`}
                >
                  <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                </div>
                <span
                  className={
                    hasMinLength
                      ? "text-[#0B3024] dark:text-[#F1FAF6] font-medium text-xs"
                      : "text-[#658278] dark:text-[#789991] text-xs"
                  }
                >
                  At least 8 characters long
                </span>
              </div>

              {/* Requirement 2 */}
              <div className="flex items-center gap-2">
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                    hasUpperLower
                      ? "bg-[#159B72] text-white"
                      : "bg-[#D8E8E2] dark:bg-[#16463D] text-[#658278]"
                  }`}
                >
                  <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                </div>
                <span
                  className={
                    hasUpperLower
                      ? "text-[#0B3024] dark:text-[#F1FAF6] font-medium text-xs"
                      : "text-[#658278] dark:text-[#789991] text-xs"
                  }
                >
                  Include uppercase and lowercase letters
                </span>
              </div>

              {/* Requirement 3 */}
              <div className="flex items-center gap-2">
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                    hasNumber
                      ? "bg-[#159B72] text-white"
                      : "bg-[#D8E8E2] dark:bg-[#16463D] text-[#658278]"
                  }`}
                >
                  <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                </div>
                <span
                  className={
                    hasNumber
                      ? "text-[#0B3024] dark:text-[#F1FAF6] font-medium text-xs"
                      : "text-[#658278] dark:text-[#789991] text-xs"
                  }
                >
                  Include at least one number
                </span>
              </div>

              {/* Requirement 4 */}
              <div className="flex items-center gap-2">
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                    hasSpecial
                      ? "bg-[#159B72] text-white"
                      : "bg-[#D8E8E2] dark:bg-[#16463D] text-[#658278]"
                  }`}
                >
                  <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                </div>
                <span
                  className={
                    hasSpecial
                      ? "text-[#0B3024] dark:text-[#F1FAF6] font-medium text-xs"
                      : "text-[#658278] dark:text-[#789991] text-xs"
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
            className="w-full h-10 sm:h-10.5 rounded-xl bg-[#159B72] hover:bg-[#0E8561] active:scale-[0.99] text-white font-bold text-xs sm:text-sm tracking-wide shadow-md shadow-[#159B72]/20 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Activating Your Account...</span>
              </>
            ) : (
              <>
                <span>Set Password</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* OR Divider */}
          <div className="relative flex items-center justify-center my-2.5">
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
            className="w-full h-10 sm:h-10.5 rounded-xl bg-white dark:bg-[#0A2A24] border border-[#D8E8E2] dark:border-[#16463D] hover:bg-[#F7FBF9] dark:hover:bg-[#0E352E] text-[#0B3024] dark:text-[#F1FAF6] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-colors cursor-pointer shadow-2xs"
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
        <div className="pt-1.5 flex items-center justify-center gap-1.5 text-[11px] text-[#658278] dark:text-[#789991]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B]" />
          <span>Your information is securely verified and encrypted.</span>
        </div>
      </AuthCard>
    </AuthShell>
  );
}
