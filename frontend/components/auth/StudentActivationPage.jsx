"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap, Mail, Info, ArrowRight, Lock, Loader2, Sparkles } from "lucide-react";
import AuthShell from "./AuthShell";
import AuthCard from "./AuthCard";
import AuthStepper from "./AuthStepper";
import AuthInput from "./AuthInput";
import { useAuth } from "../providers/AuthProvider";

export default function StudentActivationPage() {
  const router = useRouter();
  const { verifyIdentity, isLoading } = useAuth();

  const [enrollmentNo, setEnrollmentNo] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Quick helper to fill demo credentials
  const fillDemoCredentials = () => {
    setEnrollmentNo("22CS087");
    setEmail("hamid@college.edu");
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};
    if (!enrollmentNo.trim()) {
      newErrors.enrollmentNo = "Enrollment number is required.";
    } else if (enrollmentNo.trim().length < 4) {
      newErrors.enrollmentNo = "Enter a valid enrollment number (e.g. 22CS087).";
    }

    if (!email.trim()) {
      newErrors.email = "College email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await verifyIdentity({ enrollmentNo, email });
      if (res.success) {
        router.push("/auth/student/confirm");
      }
    } catch (err) {
      setErrors({ form: err.message || "Identity verification failed. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthShell
      topNavAction={{
        label: "Already have an account?",
        actionLabel: "Login",
        href: "/auth/student",
      }}
      brandProps={{
        badgeText: "Student Account Activation",
        badgeIcon: GraduationCap,
        headline: ["Activate Your", "College OS Account"],
        description:
          "Your college has already registered your details. Verify your identity using your enrollment number and college email to get started.",
        topHandwrittenText: "Your College Identity Awaits ♡",
        bottomHandwrittenText: "Same Campus, Bigger Dreams 🍃",
      }}
    >
      <AuthCard
        title="Student Account Activation"
        subtitle="Enter your enrollment number and college email to verify your identity and continue."
      >
        {/* Stepper: Step 1 Active */}
        <div className="mb-4">
          <AuthStepper currentStep={1} />
        </div>

        {/* Demo Helper Pill */}
        <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-[#DDF4EB]/60 dark:bg-[#075A43]/30 border border-[#159B72]/20 text-[11.5px] text-[#0B3024] dark:text-[#E8F6F0]">
          <span className="font-medium flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B]" />
            Demo Student Record Available
          </span>
          <button
            type="button"
            onClick={fillDemoCredentials}
            className="text-[11px] font-bold text-[#159B72] dark:text-[#20D39B] hover:underline cursor-pointer"
          >
            Auto-fill (22CS087)
          </button>
        </div>

        {/* Form Error Alert */}
        {errors.form && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-xs text-rose-700 dark:text-rose-300">
            {errors.form}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Field 1: Enrollment Number */}
          <AuthInput
            id="enrollmentNo"
            label="Enrollment Number"
            required
            icon={GraduationCap}
            placeholder="e.g. 22CS087"
            value={enrollmentNo}
            onChange={(e) => {
              setEnrollmentNo(e.target.value);
              if (errors.enrollmentNo) setErrors({ ...errors, enrollmentNo: null });
            }}
            error={errors.enrollmentNo}
          />

          {/* Field 2: College Email Address */}
          <AuthInput
            id="collegeEmail"
            label="College Email Address"
            required
            type="email"
            icon={Mail}
            placeholder="e.g. hamid@college.edu"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors({ ...errors, email: null });
            }}
            error={errors.email}
          />

          {/* Need help? Alert Box */}
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F1F8F5] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#16463D] text-[12px] text-[#36594C] dark:text-[#A7C8BD]">
            <Info className="w-4 h-4 text-[#159B72] dark:text-[#20D39B] shrink-0 mt-0.5" />
            <div className="leading-snug">
              <strong className="font-semibold text-[#0B3024] dark:text-[#F1FAF6] block mb-0.5">
                Need help?
              </strong>
              If you don&apos;t have your enrollment number or college email, please contact your
              college administration.
            </div>
          </div>

          {/* Primary Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="w-full h-11 sm:h-12 rounded-xl bg-[#159B72] hover:bg-[#0E8561] active:scale-[0.99] text-white font-bold text-sm tracking-wide shadow-md shadow-[#159B72]/20 flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying Institutional Record...</span>
              </>
            ) : (
              <>
                <span>Verify My Account</span>
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
              alert(
                "Google institutional authentication requires a matching verified college email domain (@college.edu). Identity verification with your college record remains mandatory."
              );
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
          <Lock className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B]" />
          <span>Your information is securely verified with your college.</span>
        </div>
      </AuthCard>
    </AuthShell>
  );
}
