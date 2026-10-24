"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  GraduationCap,
  Briefcase,
  Mail,
  Lock,
  ShieldCheck,
  Check,
  ArrowRight,
  ArrowLeft,
  KeyRound,
  Loader2,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import AuthShell from "./AuthShell";
import AuthCard from "./AuthCard";
import AuthInput from "./AuthInput";
import AuthStepper from "./AuthStepper";

const DEMO_OTP = "849201";

const RESET_STEPS = [
  { step: 1, label: "Identity" },
  { step: 2, label: "Verify OTP" },
  { step: 3, label: "New Password" },
];

export default function ForgotPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = searchParams.get("role") === "faculty" ? "faculty" : "student";

  // Flow State
  const [role, setRole] = useState(initialRole);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  // Step 1: Identity
  const [identifier, setIdentifier] = useState("");
  const [email, setEmail] = useState("");

  // Step 2: 6-Digit OTP
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const otpInputRefs = useRef([]);
  const [resendCooldown, setResendCooldown] = useState(45);
  const [isResending, setIsResending] = useState(false);

  // Step 3: Password
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // UI & Loading
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [demoBanner, setDemoBanner] = useState(null);

  // OTP Countdown timer
  useEffect(() => {
    let timer;
    if (currentStep === 2 && resendCooldown > 0) {
      timer = setInterval(() => {
        setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [currentStep, resendCooldown]);

  // Demo Autofill Helper
  const handleAutoFill = () => {
    if (role === "student") {
      setIdentifier("22CS087");
      setEmail("hamid@college.edu");
    } else {
      setIdentifier("EMP-1042");
      setEmail("arjun.mehta@college.edu");
    }
    setErrors({});
  };

  // Switch Role
  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setIdentifier("");
    setEmail("");
    setErrors({});
    setDemoBanner(null);
  };

  // --- STEP 1: VALIDATE IDENTITY & SEND OTP ---
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    const errs = {};

    if (!identifier.trim()) {
      errs.identifier =
        role === "student"
          ? "Enrollment Number is required."
          : "Employee ID is required.";
    }

    if (!email.trim()) {
      errs.email = "Official College Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Please enter a valid official institutional email.";
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate directory lookup and OTP generation
    setTimeout(() => {
      setIsSubmitting(false);
      setCurrentStep(2);
      setResendCooldown(45);
      setDemoBanner(
        `Demo Simulation: Verification OTP is ${DEMO_OTP}. In production, this is dispatched to ${email}.`
      );
    }, 700);
  };

  // --- STEP 2: HANDLE OTP INPUTS ---
  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newDigits = [...otpDigits];
    newDigits[index] = value.slice(-1);
    setOtpDigits(newDigits);
    if (errors.otp) setErrors({ ...errors, otp: null });

    // Auto-advance
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pasted)) {
      setOtpDigits(pasted.split(""));
      otpInputRefs.current[5]?.focus();
      if (errors.otp) setErrors({ ...errors, otp: null });
    }
  };

  const handleResendOtp = () => {
    if (resendCooldown > 0 || isResending) return;
    setIsResending(true);

    setTimeout(() => {
      setIsResending(false);
      setResendCooldown(45);
      setDemoBanner(`Demo Simulation: New verification OTP re-sent (${DEMO_OTP}).`);
    }, 600);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const enteredOtp = otpDigits.join("");

    if (enteredOtp.length < 6) {
      setErrors({ otp: "Please enter all 6 digits of the OTP." });
      return;
    }

    if (enteredOtp !== DEMO_OTP) {
      setErrors({ otp: `Invalid OTP code. For this preview, use demo code ${DEMO_OTP}.` });
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setCurrentStep(3);
    }, 500);
  };

  // --- STEP 3: PASSWORD VALIDATION & SUBMISSION ---
  const hasMinLength = password.length >= 8;
  const hasUpperLower = /[a-z]/.test(password) && /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  const allCriteriaMet = hasMinLength && hasUpperLower && hasNumber && hasSpecial;
  const passwordsMatch = password.length > 0 && password === confirmPassword;

  const handleResetPassword = (e) => {
    e.preventDefault();
    const errs = {};

    if (!allCriteriaMet) {
      errs.password = "Password does not meet all security criteria.";
    }

    if (!passwordsMatch) {
      errs.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 800);
  };

  const loginHref = role === "faculty" ? "/auth/faculty" : "/auth/student";
  const loginLabel = role === "faculty" ? "Faculty Login" : "Student Login";

  return (
    <AuthShell
      showFacultyLink={false}
      isStaffMode={role === "faculty"}
      cardMaxWidth="max-w-[480px]"
      topNavAction={{
        label: "Remember your password?",
        actionLabel: loginLabel,
        href: loginHref,
      }}
      brandProps={{
        badgeText: "Account Security & Recovery",
        badgeIcon: KeyRound,
        headline: ["Reset Your", "College OS Password"],
        description:
          "Self-service institutional password recovery. Secure verification through your official university enrollment records and one-time password.",
        topHandwrittenText: "Campus Security\nGuaranteed 🛡️",
        bottomHandwrittenText: "Back to Learning\nin Seconds 🍃",
        features: [
          {
            icon: ShieldCheck,
            title: "Verified Identity",
            subtitle: "Validated against\ncollege records",
          },
          {
            icon: Mail,
            title: "Time-Bound OTP",
            subtitle: "Dispatched to\nofficial email",
          },
          {
            icon: Lock,
            title: "bCrypt Security",
            subtitle: "Encrypted password\nownership",
          },
          {
            icon: CheckCircle2,
            title: "Instant Restore",
            subtitle: "Immediate account\naccess restoration",
          },
        ],
      }}
    >
      <AuthCard
        title={isSuccess ? "Password Reset Complete!" : "Reset Your Password"}
        subtitle={
          isSuccess
            ? "Your institutional account password has been updated. You can now log in securely."
            : "Follow the 3-step institutional verification process to restore your account access."
        }
        badge={role === "faculty" ? "Staff Recovery" : "Student Recovery"}
        maxWidth="max-w-[480px]"
      >
        {/* Stepper (Only visible during active steps) */}
        {!isSuccess && (
          <div className="mb-4">
            <AuthStepper currentStep={currentStep} steps={RESET_STEPS} />
          </div>
        )}

        {/* Demo Notice Banner */}
        {demoBanner && !isSuccess && (
          <div className="mb-3.5 p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 text-xs text-emerald-800 dark:text-emerald-300 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div className="leading-snug">{demoBanner}</div>
          </div>
        )}

        {/* Form-level Error Alert */}
        {errors.form && (
          <div className="mb-3.5 p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errors.form}</span>
          </div>
        )}

        {/* ---------------- STEP 1: IDENTITY ENTRY ---------------- */}
        {currentStep === 1 && !isSuccess && (
          <form onSubmit={handleRequestOtp} className="space-y-3.5">
            {/* Role Switcher Pills */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#EAF2EE] dark:bg-[#07241E] border border-[#D8E8E2] dark:border-[#16463D]">
              <button
                type="button"
                onClick={() => handleRoleChange("student")}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  role === "student"
                    ? "bg-white dark:bg-[#0E352E] text-[#0B3024] dark:text-[#F1FAF6] shadow-2xs"
                    : "text-[#658278] dark:text-[#8AAEA1] hover:text-[#0B3024] dark:hover:text-[#F1FAF6]"
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Student</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleChange("faculty")}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  role === "faculty"
                    ? "bg-white dark:bg-[#0E352E] text-[#0B3024] dark:text-[#F1FAF6] shadow-2xs"
                    : "text-[#658278] dark:text-[#8AAEA1] hover:text-[#0B3024] dark:hover:text-[#F1FAF6]"
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Faculty &amp; Staff</span>
              </button>
            </div>

            {/* Autofill Demo Action */}
            <div className="flex items-center justify-between text-xs pt-0.5">
              <span className="text-[#658278] dark:text-[#8AAEA1]">
                {role === "student" ? "Registered Student Record" : "Registered Faculty Record"}
              </span>
              <button
                type="button"
                onClick={handleAutoFill}
                className="text-[11px] font-semibold text-[#159B72] dark:text-[#20D39B] hover:underline cursor-pointer"
              >
                Auto-fill ({role === "student" ? "22CS087" : "EMP-1042"})
              </button>
            </div>

            {/* Identifier Field */}
            <AuthInput
              id="identifier"
              label={role === "student" ? "Enrollment Number" : "Employee ID"}
              required
              icon={role === "student" ? GraduationCap : Briefcase}
              placeholder={role === "student" ? "e.g. 22CS087" : "e.g. EMP-1042"}
              value={identifier}
              onChange={(e) => {
                setIdentifier(e.target.value);
                if (errors.identifier) setErrors({ ...errors, identifier: null });
              }}
              error={errors.identifier}
            />

            {/* Official Email Field */}
            <AuthInput
              id="email"
              label="Official Institutional Email"
              required
              type="email"
              icon={Mail}
              placeholder={
                role === "student"
                  ? "e.g. hamid@college.edu"
                  : "e.g. arjun.mehta@college.edu"
              }
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: null });
              }}
              error={errors.email}
            />

            {/* Security Guarantee Note */}
            <div className="p-2.5 rounded-xl bg-[#F1F8F5] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#16463D] text-[11px] text-[#36594C] dark:text-[#A7C8BD] leading-relaxed">
              <strong className="font-semibold text-[#0B3024] dark:text-[#F1FAF6] block mb-0.5">
                Institutional Security Protocol
              </strong>
              Passwords are not sent over email. A secure 6-digit verification code will
              be sent to your institutional address to authorize a password change.
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 rounded-xl bg-[#159B72] hover:bg-[#0E8561] active:scale-[0.99] text-white font-bold text-xs sm:text-sm tracking-wide shadow-md shadow-[#159B72]/20 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Institutional Record...</span>
                </>
              ) : (
                <>
                  <span>Request Verification OTP</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* ---------------- STEP 2: 6-DIGIT OTP VERIFICATION ---------------- */}
        {currentStep === 2 && !isSuccess && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="text-center space-y-1">
              <span className="text-xs text-[#658278] dark:text-[#8AAEA1]">
                Enter the 6-digit verification code sent to
              </span>
              <p className="text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6] font-mono">
                {email || "your institutional email"}
              </p>
            </div>

            {/* 6 Digit Inputs */}
            <div
              className="flex items-center justify-center gap-2 sm:gap-2.5 py-1"
              onPaste={handleOtpPaste}
            >
              {otpDigits.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (otpInputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e.key)}
                  className={`w-10 sm:w-11 h-12 sm:h-13 rounded-xl border text-center text-lg sm:text-xl font-bold font-mono transition-all outline-none ${
                    errors.otp
                      ? "border-rose-400 bg-rose-50/50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-300 focus:ring-2 focus:ring-rose-400"
                      : digit
                      ? "border-[#159B72] bg-white dark:bg-[#07241E] text-[#0B3024] dark:text-[#F1FAF6] shadow-2xs focus:ring-2 focus:ring-[#159B72]"
                      : "border-[#D8E8E2] dark:border-[#16463D] bg-[#F7FBF9] dark:bg-[#041D17] text-[#0B3024] dark:text-[#F1FAF6] focus:border-[#159B72] focus:ring-2 focus:ring-[#159B72]/20"
                  }`}
                  aria-label={`Digit ${index + 1}`}
                />
              ))}
            </div>

            {errors.otp && (
              <p className="text-center text-xs text-rose-600 dark:text-rose-400 font-medium">
                {errors.otp}
              </p>
            )}

            {/* Resend Timer & Quick Fill */}
            <div className="flex items-center justify-between text-xs pt-1">
              <button
                type="button"
                onClick={() => {
                  setOtpDigits(DEMO_OTP.split(""));
                  if (errors.otp) setErrors({ ...errors, otp: null });
                }}
                className="text-[11px] font-semibold text-[#159B72] dark:text-[#20D39B] hover:underline cursor-pointer"
              >
                Insert Demo OTP ({DEMO_OTP})
              </button>

              <button
                type="button"
                onClick={handleResendOtp}
                disabled={resendCooldown > 0 || isResending}
                className="text-[11px] font-semibold text-[#658278] dark:text-[#8AAEA1] hover:text-[#159B72] dark:hover:text-[#20D39B] disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed flex items-center gap-1"
              >
                <RefreshCw className={`w-3 h-3 ${isResending ? "animate-spin" : ""}`} />
                <span>
                  {resendCooldown > 0
                    ? `Resend in ${resendCooldown}s`
                    : "Resend Code"}
                </span>
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => {
                  setCurrentStep(1);
                  setErrors({});
                }}
                className="h-11 px-4 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#07241E] hover:bg-[#F1F8F5] dark:hover:bg-[#0A2E26] text-xs font-semibold text-[#36594C] dark:text-[#A7C8BD] transition-all cursor-pointer flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 h-11 rounded-xl bg-[#159B72] hover:bg-[#0E8561] active:scale-[0.99] text-white font-bold text-xs sm:text-sm tracking-wide shadow-md shadow-[#159B72]/20 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying Code...</span>
                  </>
                ) : (
                  <>
                    <span>Verify OTP &amp; Proceed</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* ---------------- STEP 3: NEW PASSWORD ENTRY ---------------- */}
        {currentStep === 3 && !isSuccess && (
          <form onSubmit={handleResetPassword} className="space-y-3.5">
            {/* New Password */}
            <AuthInput
              id="newPassword"
              label="New Password"
              required
              type="password"
              icon={Lock}
              showPasswordToggle
              placeholder="Enter new password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors({ ...errors, password: null });
              }}
              error={errors.password}
            />

            {/* Confirm Password */}
            <AuthInput
              id="confirmPassword"
              label="Confirm New Password"
              required
              type="password"
              icon={Lock}
              showPasswordToggle
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (errors.confirmPassword)
                  setErrors({ ...errors, confirmPassword: null });
              }}
              error={errors.confirmPassword}
            />

            {/* Live Criteria Checklist */}
            <div className="p-3 rounded-xl bg-[#F7FBF9] dark:bg-[#07241E] border border-[#D8E8E2] dark:border-[#16463D] space-y-1.5 text-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#658278] dark:text-[#8AAEA1] block mb-1">
                Password Security Criteria
              </span>

              {/* Requirement 1 */}
              <div className="flex items-center gap-2">
                <div
                  className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 ${
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
                      ? "text-[#0B3024] dark:text-[#F1FAF6] font-medium"
                      : "text-[#658278] dark:text-[#789991]"
                  }
                >
                  At least 8 characters long
                </span>
              </div>

              {/* Requirement 2 */}
              <div className="flex items-center gap-2">
                <div
                  className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 ${
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
                      ? "text-[#0B3024] dark:text-[#F1FAF6] font-medium"
                      : "text-[#658278] dark:text-[#789991]"
                  }
                >
                  Both uppercase and lowercase letters (A-Z, a-z)
                </span>
              </div>

              {/* Requirement 3 */}
              <div className="flex items-center gap-2">
                <div
                  className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 ${
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
                      ? "text-[#0B3024] dark:text-[#F1FAF6] font-medium"
                      : "text-[#658278] dark:text-[#789991]"
                  }
                >
                  At least one numeric digit (0-9)
                </span>
              </div>

              {/* Requirement 4 */}
              <div className="flex items-center gap-2">
                <div
                  className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 ${
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
                      ? "text-[#0B3024] dark:text-[#F1FAF6] font-medium"
                      : "text-[#658278] dark:text-[#789991]"
                  }
                >
                  At least one special character (!@#$%^&amp;*)
                </span>
              </div>

              {/* Requirement 5 */}
              <div className="flex items-center gap-2">
                <div
                  className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 ${
                    passwordsMatch
                      ? "bg-[#159B72] text-white"
                      : "bg-[#D8E8E2] dark:bg-[#16463D] text-[#658278]"
                  }`}
                >
                  <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                </div>
                <span
                  className={
                    passwordsMatch
                      ? "text-[#0B3024] dark:text-[#F1FAF6] font-medium"
                      : "text-[#658278] dark:text-[#789991]"
                  }
                >
                  Passwords match
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !allCriteriaMet || !passwordsMatch}
              className="w-full h-11 rounded-xl bg-[#159B72] hover:bg-[#0E8561] active:scale-[0.99] text-white font-bold text-xs sm:text-sm tracking-wide shadow-md shadow-[#159B72]/20 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Encrypting &amp; Updating Password...</span>
                </>
              ) : (
                <>
                  <span>Save New Password</span>
                  <Check className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* ---------------- SUCCESS STATE ---------------- */}
        {isSuccess && (
          <div className="text-center py-3 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800/60 text-[#159B72] dark:text-[#20D39B] flex items-center justify-center mx-auto shadow-md">
              <Check className="w-8 h-8 stroke-[2.5]" />
            </div>

            <div className="space-y-1.5 max-w-sm mx-auto">
              <h3 className="text-lg font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                Password Successfully Updated
              </h3>
              <p className="text-xs text-[#52796B] dark:text-[#8CB4A6] leading-relaxed">
                Your College OS account password has been safely encrypted and reset. You
                can now log in with your updated credentials.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href={loginHref}
                className="w-full h-11 rounded-xl bg-[#159B72] hover:bg-[#0E8561] text-white font-bold text-xs sm:text-sm tracking-wide shadow-md shadow-[#159B72]/20 flex items-center justify-center gap-2 transition-all"
              >
                <span>Proceed to {loginLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </AuthCard>
    </AuthShell>
  );
}
