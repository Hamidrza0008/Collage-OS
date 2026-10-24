"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Briefcase,
  Mail,
  Lock,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  ShieldAlert,
  Loader2,
  CheckCircle2,
  Check,
  KeyRound,
  Sparkles,
  Info,
  Building2,
  UserCheck,
  RotateCcw,
} from "lucide-react";
import AuthShell from "./AuthShell";
import AuthCard from "./AuthCard";
import AuthStepper from "./AuthStepper";
import AuthInput from "./AuthInput";

// Pre-provisioned institutional faculty records for verification
const PRE_PROVISIONED_FACULTY = [
  {
    employeeId: "EMP-1042",
    email: "arjun.mehta@college.edu",
    name: "Dr. Arjun Mehta",
    department: "Computer Science & Engineering",
    designation: "Associate Professor",
  },
  {
    employeeId: "EMP-2088",
    email: "sunita.kulkarni@college.edu",
    name: "Dr. Sunita Kulkarni",
    department: "Computer Science & Engineering",
    designation: "Assistant Professor",
  },
  {
    employeeId: "EMP-3045",
    email: "rajesh.sharma@college.edu",
    name: "Prof. Rajesh Sharma",
    department: "Computer Science & Engineering",
    designation: "Professor",
  },
  {
    employeeId: "EMP-4012",
    email: "neha.gupta@college.edu",
    name: "Dr. Neha Gupta",
    department: "Computer Science & Engineering",
    designation: "Assistant Professor",
  },
];

const FACULTY_STEPS = [
  { step: 1, label: "Verify Identity" },
  { step: 2, label: "Verify OTP" },
  { step: 3, label: "Set Password" },
];

const DEMO_OTP = "842196";

export default function FacultyActivationPage() {
  const router = useRouter();

  // Rehydrate state from sessionStorage lazily on mount
  const [persistedFlow] = useState(() => {
    if (typeof window === "undefined") return null;
    try {
      const savedFlow = sessionStorage.getItem("college_os_faculty_activation_flow");
      return savedFlow ? JSON.parse(savedFlow) : null;
    } catch {
      return null;
    }
  });

  // Current activation step: 1 = Verify Identity, 2 = Verify OTP, 3 = Set Password, 4 = Success
  const [currentStep, setCurrentStep] = useState(() => {
    if (
      persistedFlow?.verifiedFaculty &&
      persistedFlow?.currentStep > 1 &&
      persistedFlow?.currentStep <= 3
    ) {
      return persistedFlow.currentStep;
    }
    return 1;
  });

  // Step 1: Form Inputs
  const [employeeId, setEmployeeId] = useState(
    () => persistedFlow?.verifiedFaculty?.employeeId || ""
  );
  const [email, setEmail] = useState(
    () => persistedFlow?.verifiedFaculty?.email || ""
  );

  // Verified record
  const [verifiedFaculty, setVerifiedFaculty] = useState(
    () => persistedFlow?.verifiedFaculty || null
  );

  // Step 2: OTP State (6 digits)
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const otpInputRefs = useRef([]);
  const [resendCooldown, setResendCooldown] = useState(45);
  const [isResending, setIsResending] = useState(false);

  // Step 3: Password State
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // UI state
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [demoNotice, setDemoNotice] = useState(null);

  // Save flow progress to sessionStorage
  const persistFlowState = (step, faculty) => {
    try {
      sessionStorage.setItem(
        "college_os_faculty_activation_flow",
        JSON.stringify({ currentStep: step, verifiedFaculty: faculty })
      );
    } catch {
      // Ignore sessionStorage errors
    }
  };

  // Timer for OTP resend countdown
  useEffect(() => {
    let timer;
    if (currentStep === 2 && resendCooldown > 0) {
      timer = setInterval(() => {
        setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [currentStep, resendCooldown]);

  // Autofill helper for demo testing
  const fillDemoFaculty = () => {
    setEmployeeId("EMP-1042");
    setEmail("arjun.mehta@college.edu");
    setErrors({});
  };

  // --- STEP 1: VERIFY IDENTITY ---
  const validateStep1 = () => {
    const errs = {};
    if (!employeeId.trim()) {
      errs.employeeId = "Official Employee ID is required.";
    } else if (employeeId.trim().length < 4) {
      errs.employeeId = "Enter a valid Employee ID (e.g. EMP-1042).";
    }

    if (!email.trim()) {
      errs.email = "Official college email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = "Please enter a valid institutional email.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitStep1 = async (e) => {
    e.preventDefault();
    if (!validateStep1()) return;

    setIsSubmitting(true);
    setErrors({});

    // Simulate brief institutional database verification delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const cleanEmpId = employeeId.trim().toUpperCase();
    const cleanEmail = email.trim().toLowerCase();

    // Check pre-provisioned institutional records
    const matchedRecord = PRE_PROVISIONED_FACULTY.find(
      (f) =>
        f.employeeId.toUpperCase() === cleanEmpId &&
        f.email.toLowerCase() === cleanEmail
    );

    setIsSubmitting(false);

    if (!matchedRecord) {
      setErrors({
        form: "Institutional Record Not Found: No pre-provisioned appointment matches this Employee ID and email. Please verify with the Dean of Academic Affairs or Campus Registrar.",
      });
      return;
    }

    setVerifiedFaculty(matchedRecord);
    setResendCooldown(45);
    setDemoNotice(`Demo Verification Code: ${DEMO_OTP} has been dispatched to ${matchedRecord.email}.`);
    setCurrentStep(2);
    persistFlowState(2, matchedRecord);
  };

  // --- STEP 2: VERIFY OTP ---
  const handleOtpChange = (index, value) => {
    if (value && !/^\d+$/.test(value)) return;

    const newDigits = [...otpDigits];
    newDigits[index] = value.slice(-1); // Only take latest character
    setOtpDigits(newDigits);
    setErrors({});

    // Auto advance to next input
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
      const splitDigits = pasted.split("");
      setOtpDigits(splitDigits);
      otpInputRefs.current[5]?.focus();
      setErrors({});
    }
  };

  const handleResendOtp = async () => {
    if (resendCooldown > 0 || isResending) return;
    setIsResending(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    setIsResending(false);
    setResendCooldown(45);
    setOtpDigits(["", "", "", "", "", ""]);
    setDemoNotice(`New Demo Verification Code: ${DEMO_OTP} has been re-sent.`);
  };

  const handleSubmitStep2 = async (e) => {
    e.preventDefault();
    const enteredOtp = otpDigits.join("");

    if (enteredOtp.length !== 6) {
      setErrors({ otp: "Please enter the complete 6-digit security code." });
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSubmitting(false);

    // Verify OTP (accepts DEMO_OTP or fallback '123456' for testing)
    if (enteredOtp !== DEMO_OTP && enteredOtp !== "123456") {
      setErrors({
        otp: "Invalid verification code. Please check the code dispatched to your official email or click Resend.",
      });
      return;
    }

    setCurrentStep(3);
    persistFlowState(3, verifiedFaculty);
  };

  // --- STEP 3: CREATE PASSWORD ---
  const hasMinLength = password.length >= 8;
  const hasUpperLower = /[a-z]/.test(password) && /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  const allCriteriaMet = hasMinLength && hasUpperLower && hasNumber && hasSpecial;

  const handleSubmitStep3 = async (e) => {
    e.preventDefault();

    if (!allCriteriaMet) {
      setErrors({ password: "Your password must fulfill all 4 security criteria." });
      return;
    }

    if (password !== confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match. Please re-enter." });
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsSubmitting(false);

    // Clear flow session and show success view
    try {
      sessionStorage.removeItem("college_os_faculty_activation_flow");
      sessionStorage.setItem("college_os_faculty_activated", "true");
    } catch {
      // Ignore
    }

    setCurrentStep(4);
  };

  return (
    <AuthShell
      isStaffMode
      cardMaxWidth="max-w-[460px] lg:max-w-[450px] xl:max-w-[460px]"
      topNavAction={{
        label: "Already activated?",
        actionLabel: "Staff Login",
        href: "/auth/faculty",
      }}
      brandProps={{
        badgeText: "Faculty Account Activation",
        badgeIcon: Briefcase,
        headline: ["Activate Your", "Faculty Workspace"],
        description:
          "Verify your institutional employment appointment with Employee ID and official college email to configure your encrypted login credentials.",
        topHandwrittenText: "Inspire Excellence 🌿",
        bottomHandwrittenText: "Empower the Next Gen ♡",
        features: [
          {
            icon: ShieldCheck,
            title: "Verified Appointment",
            subtitle: "Validated against university\nrecords",
            iconBg: "bg-[#159B72] text-white",
          },
          {
            icon: Mail,
            title: "Multi-Factor OTP",
            subtitle: "Sent to official institutional\nemail",
            iconBg: "bg-[#DDF4EB] dark:bg-[#0C3029] text-[#159B72] dark:text-[#20D39B]",
          },
          {
            icon: Lock,
            title: "Encrypted Password",
            subtitle: "Set your institutional\naccess key",
            iconBg: "bg-[#DDF4EB] dark:bg-[#0C3029] text-[#159B72] dark:text-[#20D39B]",
          },
          {
            icon: UserCheck,
            title: "Academic Portal",
            subtitle: "Marks, attendance &\nteaching schedule",
            iconBg: "bg-[#DDF4EB] dark:bg-[#0C3029] text-[#159B72] dark:text-[#20D39B]",
          },
        ],
      }}
    >
      <AuthCard
        title={
          currentStep === 4
            ? "Activation Complete"
            : currentStep === 3
            ? "Create Faculty Password"
            : currentStep === 2
            ? "Verify Institutional OTP"
            : "Faculty Account Activation"
        }
        subtitle={
          currentStep === 4
            ? "Your faculty account is now active and ready for login."
            : currentStep === 3
            ? "Choose a strong password to protect your faculty grading and academic workspace."
            : currentStep === 2
            ? `Enter the 6-digit security code dispatched to ${verifiedFaculty?.email || "your email"}.`
            : "Enter your official Employee ID and institutional email to verify your pre-provisioned faculty appointment."
        }
        badge="Staff Onboarding"
      >
        {/* Stepper (Steps 1, 2, 3) */}
        {currentStep <= 3 && (
          <div className="mb-2">
            <AuthStepper currentStep={currentStep} steps={FACULTY_STEPS} />
          </div>
        )}

        {/* Demo Notice Banner (Shows simulated OTP) */}
        {demoNotice && currentStep === 2 && (
          <div className="p-3 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/40 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2 animate-in fade-in duration-200">
            <KeyRound className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="leading-snug">
              <strong className="block font-bold">Demo Verification Sandbox</strong>
              <span>{demoNotice}</span>
            </div>
          </div>
        )}

        {/* Form Error Alert */}
        {errors.form && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-xs text-rose-700 dark:text-rose-300 leading-relaxed">
            {errors.form}
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* STEP 1: VERIFY IDENTITY                                            */}
        {/* ------------------------------------------------------------------ */}
        {currentStep === 1 && (
          <form onSubmit={handleSubmitStep1} className="space-y-3.5">
            {/* Quick Demo Pill */}
            <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-[#DDF4EB]/60 dark:bg-[#075A43]/30 border border-[#159B72]/20 text-[11.5px] text-[#0B3024] dark:text-[#E8F6F0]">
              <span className="font-medium flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B]" />
                <span>Test Faculty Appointment</span>
              </span>
              <button
                type="button"
                onClick={fillDemoFaculty}
                className="text-[11px] font-bold text-[#159B72] dark:text-[#20D39B] hover:underline cursor-pointer"
              >
                Auto-fill (EMP-1042)
              </button>
            </div>

            {/* Field 1: Employee ID */}
            <AuthInput
              id="employeeId"
              label="Employee ID"
              required
              icon={Briefcase}
              placeholder="e.g. EMP-1042"
              value={employeeId}
              onChange={(e) => {
                setEmployeeId(e.target.value);
                if (errors.employeeId) setErrors({ ...errors, employeeId: null });
              }}
              error={errors.employeeId}
            />

            {/* Field 2: Official College Email */}
            <AuthInput
              id="collegeEmail"
              label="Official Institutional Email"
              required
              type="email"
              icon={Mail}
              placeholder="e.g. arjun.mehta@college.edu"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: null });
              }}
              error={errors.email}
            />

            {/* Institutional Information Note */}
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F1F8F5] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#16463D] text-[11.5px] text-[#36594C] dark:text-[#A7C8BD]">
              <Info className="w-4 h-4 text-[#159B72] dark:text-[#20D39B] shrink-0 mt-0.5" />
              <div className="leading-snug">
                <strong className="font-semibold text-[#0B3024] dark:text-[#F1FAF6] block mb-0.5">
                  Institutional Records Only
                </strong>
                Faculty appointments are pre-provisioned by university administration. Public registration without an existing appointment is not permitted.
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 rounded-xl bg-[#159B72] hover:bg-[#0E8561] active:scale-[0.99] text-white font-bold text-xs sm:text-sm tracking-wide shadow-md shadow-[#159B72]/20 flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Faculty Record...</span>
                </>
              ) : (
                <>
                  <span>Send One-Time Password (OTP)</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Back to Faculty Login */}
            <div className="pt-1 text-center text-xs text-[#658278] dark:text-[#789991]">
              Already activated your password?{" "}
              <Link
                href="/auth/faculty"
                className="font-bold text-[#159B72] dark:text-[#20D39B] hover:underline"
              >
                Sign In Here
              </Link>
            </div>
          </form>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* STEP 2: VERIFY OTP                                                 */}
        {/* ------------------------------------------------------------------ */}
        {currentStep === 2 && (
          <form onSubmit={handleSubmitStep2} className="space-y-4">
            {/* Verified Profile Card */}
            <div className="p-3.5 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#16463D] flex items-center justify-between">
              <div className="space-y-0.5 min-w-0">
                <span className="text-[10.5px] uppercase font-bold text-[#159B72] dark:text-[#20D39B] block">
                  Verified Faculty Record
                </span>
                <h4 className="text-xs sm:text-[13px] font-bold text-[#0B3024] dark:text-[#F1FAF6] truncate">
                  {verifiedFaculty?.name} ({verifiedFaculty?.employeeId})
                </h4>
                <p className="text-[11px] text-[#658278] dark:text-[#789991] truncate">
                  {verifiedFaculty?.designation} • {verifiedFaculty?.department}
                </p>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E6F7F0] dark:bg-[#073629] text-[#159B72] dark:text-[#20D39B] border border-[#159B72]/20 shrink-0">
                Found
              </span>
            </div>

            {/* 6-Digit OTP Box Grid */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#658278] dark:text-[#789991] block text-center">
                Enter 6-Digit Security Code
              </label>

              <div
                className="flex items-center justify-center gap-2 sm:gap-2.5"
                onPaste={handleOtpPaste}
              >
                {otpDigits.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      otpInputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-10 sm:w-11 h-12 text-center text-lg font-bold rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] focus:border-[#159B72] focus:ring-2 focus:ring-[#159B72]/20 outline-none transition-all"
                  />
                ))}
              </div>

              {errors.otp && (
                <p className="text-[11.5px] text-rose-500 font-semibold text-center mt-1">
                  {errors.otp}
                </p>
              )}
            </div>

            {/* Resend Control */}
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-[#658278] dark:text-[#789991]">
                Didn&apos;t receive the code?
              </span>

              {resendCooldown > 0 ? (
                <span className="font-semibold text-[#658278] dark:text-[#789991]">
                  Resend in {resendCooldown}s
                </span>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={isResending}
                  className="font-bold text-[#159B72] dark:text-[#20D39B] hover:underline flex items-center gap-1 cursor-pointer disabled:opacity-50"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Resend Code</span>
                </button>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                type="submit"
                disabled={isSubmitting || otpDigits.join("").length !== 6}
                className="w-full h-11 rounded-xl bg-[#159B72] hover:bg-[#0E8561] active:scale-[0.99] text-white font-bold text-xs sm:text-sm tracking-wide shadow-md shadow-[#159B72]/20 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying Code...</span>
                  </>
                ) : (
                  <>
                    <span>Verify Security Code</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setCurrentStep(1);
                  setErrors({});
                }}
                className="w-full py-1.5 flex items-center justify-center gap-1 text-xs font-semibold text-[#658278] dark:text-[#789991] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Verify Identity</span>
              </button>
            </div>
          </form>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* STEP 3: CREATE PASSWORD                                            */}
        {/* ------------------------------------------------------------------ */}
        {currentStep === 3 && (
          <form onSubmit={handleSubmitStep3} className="space-y-3.5">
            {/* New Password */}
            <AuthInput
              id="newFacultyPassword"
              label="New Institutional Password"
              required
              icon={Lock}
              showPasswordToggle
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors({ ...errors, password: null });
              }}
              error={errors.password}
            />

            {/* 4 Criteria Checklist */}
            <div className="p-3 rounded-xl bg-[#F7FBF9] dark:bg-[#07241E] border border-[#D8E8E2] dark:border-[#16463D] space-y-1.5 text-xs">
              <span className="text-[10.5px] uppercase font-bold text-[#658278] dark:text-[#789991] block mb-1">
                Password Security Criteria
              </span>

              <div className="space-y-1">
                {/* 1: Length */}
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
                        ? "text-[#0B3024] dark:text-[#F1FAF6] font-medium"
                        : "text-[#658278] dark:text-[#789991]"
                    }
                  >
                    At least 8 characters long
                  </span>
                </div>

                {/* 2: Upper and Lower */}
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
                        ? "text-[#0B3024] dark:text-[#F1FAF6] font-medium"
                        : "text-[#658278] dark:text-[#789991]"
                    }
                  >
                    Include uppercase and lowercase letters
                  </span>
                </div>

                {/* 3: Number */}
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
                        ? "text-[#0B3024] dark:text-[#F1FAF6] font-medium"
                        : "text-[#658278] dark:text-[#789991]"
                    }
                  >
                    Include at least one number
                  </span>
                </div>

                {/* 4: Special Character */}
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
                        ? "text-[#0B3024] dark:text-[#F1FAF6] font-medium"
                        : "text-[#658278] dark:text-[#789991]"
                    }
                  >
                    Include at least one special character (@ # $ % etc.)
                  </span>
                </div>
              </div>
            </div>

            {/* Confirm Password */}
            <AuthInput
              id="confirmFacultyPassword"
              label="Confirm Password"
              required
              icon={Lock}
              showPasswordToggle
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: null });
              }}
              error={errors.confirmPassword}
            />

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                type="submit"
                disabled={!allCriteriaMet || !confirmPassword || isSubmitting}
                className="w-full h-11 rounded-xl bg-[#159B72] hover:bg-[#0E8561] active:scale-[0.99] text-white font-bold text-xs sm:text-sm tracking-wide shadow-md shadow-[#159B72]/20 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Activating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Activate Faculty Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setCurrentStep(2);
                  setErrors({});
                }}
                className="w-full py-1.5 flex items-center justify-center gap-1 text-xs font-semibold text-[#658278] dark:text-[#789991] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Verify OTP</span>
              </button>
            </div>
          </form>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* STEP 4: SUCCESS VIEW                                               */}
        {/* ------------------------------------------------------------------ */}
        {currentStep === 4 && (
          <div className="space-y-4 text-center py-2 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-[#159B72] dark:text-[#20D39B] flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-base sm:text-lg font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                Faculty Account Activated!
              </h3>
              <p className="text-xs text-[#658278] dark:text-[#789991] max-w-sm mx-auto">
                Your institutional credentials for{" "}
                <strong className="text-[#0B3024] dark:text-[#F1FAF6]">
                  {verifiedFaculty?.name || "Dr. Arjun Mehta"}
                </strong>{" "}
                ({verifiedFaculty?.employeeId || "EMP-1042"}) are now activated.
              </p>
            </div>

            {/* Account Confirmation Snapshot */}
            <div className="p-3.5 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#16463D] text-left text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[#658278] dark:text-[#789991]">Role:</span>
                <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6]">Faculty Member</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#658278] dark:text-[#789991]">Department:</span>
                <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                  {verifiedFaculty?.department || "Computer Science & Engineering"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#658278] dark:text-[#789991]">Login Identifier:</span>
                <span className="font-mono font-bold text-[#159B72] dark:text-[#20D39B]">
                  {verifiedFaculty?.employeeId || "EMP-1042"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#658278] dark:text-[#789991]">Account Status:</span>
                <span className="px-2 py-0.5 rounded-md text-[10.5px] font-bold bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300">
                  Active &amp; Verified
                </span>
              </div>
            </div>

            {/* Proceed to Login Button */}
            <button
              type="button"
              onClick={() => router.push("/auth/faculty")}
              className="w-full h-11 rounded-xl bg-[#159B72] hover:bg-[#0E8561] text-white font-bold text-xs sm:text-sm tracking-wide shadow-md shadow-[#159B72]/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Proceed to Faculty Login</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Security Footer */}
        <div className="pt-2 flex items-center justify-center gap-1.5 text-[11px] text-[#658278] dark:text-[#789991]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B]" />
          <span>Encrypted institutional account handshake &bull; CSMU Security Protocol</span>
        </div>
      </AuthCard>
    </AuthShell>
  );
}
