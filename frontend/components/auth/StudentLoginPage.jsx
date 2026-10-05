"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Lock,
  ArrowRight,
  Calendar,
  GraduationCap,
  Bell,
  Users,
  ShieldCheck,
  Loader2,
  Sparkles,
} from "lucide-react";
import AuthShell from "./AuthShell";
import AuthCard from "./AuthCard";
import AuthInput from "./AuthInput";
import { useAuth } from "../providers/AuthProvider";

export default function StudentLoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuth();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Quick fill helper for testing
  const fillDemoStudent = () => {
    setIdentifier("22CS087");
    setPassword("CollegeOS@2026");
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};
    if (!identifier.trim()) {
      newErrors.identifier = "Please enter your Enrollment Number or College Email.";
    }
    if (!password) {
      newErrors.password = "Password is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await login({ identifier, password, role: "student" });
      if (res.success) {
        // Router navigation is handled inside login() in AuthProvider
      }
    } catch (err) {
      setErrors({ form: err.message || "Invalid credentials or unactivated account." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthShell
      topNavAction={{
        label: "New to College OS?",
        actionLabel: "Activate Account",
        href: "/auth/student/activate",
      }}
      brandProps={{
        badgeText: "Student Academic Portal",
        badgeIcon: GraduationCap,
        headline: ["Welcome Back,", "Student!"],
        description: "Your campus, your profile, your future — all in one place.",
        topHandwrittenText: "Learn • Connect Grow 🍃",
        bottomHandwrittenText: "Same Campus, Bigger Dreams ♡",
        features: [
          {
            icon: Calendar,
            title: "Timetable",
            subtitle: "Never miss a class",
            iconBg: "bg-[#159B72] text-white",
          },
          {
            icon: GraduationCap,
            title: "Marks & Attendance",
            subtitle: "Track your progress",
            iconBg: "bg-[#DDF4EB] dark:bg-[#0C3029] text-[#159B72] dark:text-[#20D39B]",
          },
          {
            icon: Bell,
            title: "Notices & Events",
            subtitle: "Stay updated always",
            iconBg: "bg-[#DDF4EB] dark:bg-[#0C3029] text-[#159B72] dark:text-[#20D39B]",
          },
          {
            icon: Users,
            title: "Student Profiles",
            subtitle: "Explore. Connect. Grow.",
            iconBg: "bg-[#DDF4EB] dark:bg-[#0C3029] text-[#159B72] dark:text-[#20D39B]",
          },
        ],
      }}
    >
      <AuthCard
        title="Good to see you again!"
        subtitle="Log in to access your dashboard, classes, notices and more."
        badge="Student Login"
      >
        {/* Quick Demo Pill */}
        <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-[#DDF4EB]/60 dark:bg-[#075A43]/30 border border-[#159B72]/20 text-[11.5px] text-[#0B3024] dark:text-[#E8F6F0]">
          <span className="font-medium flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B]" />
            Test Student Credentials
          </span>
          <button
            type="button"
            onClick={fillDemoStudent}
            className="text-[11px] font-bold text-[#159B72] dark:text-[#20D39B] hover:underline cursor-pointer"
          >
            Auto-fill (Hamid Rza)
          </button>
        </div>

        {errors.form && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-xs text-rose-700 dark:text-rose-300">
            {errors.form}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Field 1: Enrollment Number / College Email */}
          <AuthInput
            id="identifier"
            label="Enrollment Number"
            required
            icon={User}
            placeholder="e.g. 22CS087"
            value={identifier}
            onChange={(e) => {
              setIdentifier(e.target.value);
              if (errors.identifier) setErrors({ ...errors, identifier: null });
            }}
            error={errors.identifier}
          />

          {/* Field 2: Password */}
          <AuthInput
            id="password"
            label="Password"
            required
            type="password"
            icon={Lock}
            showPasswordToggle
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors({ ...errors, password: null });
            }}
            error={errors.password}
          />

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 cursor-pointer select-none text-[#36594C] dark:text-[#A7C8BD]">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded-md text-[#159B72] border-[#D8E8E2] dark:border-[#16463D] focus:ring-[#159B72] cursor-pointer accent-[#159B72]"
              />
              <span>Keep me logged in</span>
            </label>

            <button
              type="button"
              onClick={() => {
                alert("Password reset OTP will be sent to your registered institutional college email address.");
              }}
              className="font-semibold text-[#159B72] dark:text-[#20D39B] hover:underline cursor-pointer"
            >
              Forgot Password?
            </button>
          </div>

          {/* Primary Login Button */}
          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="w-full h-11 sm:h-12 rounded-xl bg-[#159B72] hover:bg-[#0E8561] active:scale-[0.99] text-white font-bold text-sm tracking-wide shadow-md shadow-[#159B72]/20 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Logging In...</span>
              </>
            ) : (
              <>
                <span>Login</span>
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
              alert("Google login must be linked to your verified college email domain.");
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

        {/* Security Assurance Card */}
        <div className="mt-4 flex items-center gap-3 p-3 rounded-xl bg-[#F1F8F5] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#16463D] text-[12px]">
          <ShieldCheck className="w-5 h-5 text-[#159B72] dark:text-[#20D39B] shrink-0" />
          <div className="leading-snug">
            <strong className="font-semibold text-[#0B3024] dark:text-[#F1FAF6] block">
              Your data is safe with us.
            </strong>
            <span className="text-[#36594C] dark:text-[#A7C8BD] text-[11px]">
              We use secure institutional encryption to protect your records.
            </span>
          </div>
        </div>

        {/* Switch to Activation Link */}
        <div className="pt-2 text-center text-xs text-[#658278] dark:text-[#789991]">
          Haven&apos;t activated your account yet?{" "}
          <Link
            href="/auth/student/activate"
            className="font-bold text-[#159B72] dark:text-[#20D39B] hover:underline inline-flex items-center gap-1"
          >
            <span>Activate Account</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </AuthCard>
    </AuthShell>
  );
}
