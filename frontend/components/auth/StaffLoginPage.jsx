"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  Lock,
  ArrowRight,
  Calendar,
  CheckSquare,
  Award,
  Building,
  ShieldAlert,
  Loader2,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import AuthShell from "./AuthShell";
import AuthCard from "./AuthCard";
import AuthInput from "./AuthInput";
import { useAuth } from "../providers/AuthProvider";

export default function StaffLoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuth();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Quick fill helper for testing staff access
  const fillDemoFaculty = () => {
    setIdentifier("EMP-1042");
    setPassword("CollegeOS@Staff2026");
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};
    if (!identifier.trim()) {
      newErrors.identifier = "Official College Email or Employee ID is required.";
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
      const res = await login({ identifier, password, role: "faculty" });
      if (res.success) {
        // Redirection handled by AuthProvider
      }
    } catch (err) {
      setErrors({ form: err.message || "Failed to sign in. Please verify your staff credentials." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthShell
      isStaffMode
      topNavAction={{
        label: "Are you a student?",
        actionLabel: "Student Login",
        href: "/auth/student",
      }}
      brandProps={{
        badgeText: "Institutional Staff Portal",
        badgeIcon: Briefcase,
        headline: ["Faculty & College", "Staff Login"],
        description:
          "Access your assigned courses, dynamic lecture schedules, roll-call attendance marking and institutional management.",
        topHandwrittenText: "Empower Minds 🌿",
        bottomHandwrittenText: "Excellence in Education ♡",
        features: [
          {
            icon: Calendar,
            title: "Teaching Schedule",
            subtitle: "Assigned course slots",
            iconBg: "bg-[#159B72] text-white",
          },
          {
            icon: CheckSquare,
            title: "Roll-Call Attendance",
            subtitle: "Real-time class marking",
            iconBg: "bg-[#DDF4EB] dark:bg-[#0C3029] text-[#159B72] dark:text-[#20D39B]",
          },
          {
            icon: Award,
            title: "Grades & Marks",
            subtitle: "Assessment management",
            iconBg: "bg-[#DDF4EB] dark:bg-[#0C3029] text-[#159B72] dark:text-[#20D39B]",
          },
          {
            icon: Building,
            title: "Department Notices",
            subtitle: "Official circular broadcasts",
            iconBg: "bg-[#DDF4EB] dark:bg-[#0C3029] text-[#159B72] dark:text-[#20D39B]",
          },
        ],
      }}
    >
      <AuthCard
        title="Faculty & Staff Login"
        subtitle="Sign in with your official employee credentials to access your academic workspace."
        badge="Staff Portal"
      >
        {/* Quick Demo Pill */}
        <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-[#DDF4EB]/60 dark:bg-[#075A43]/30 border border-[#159B72]/20 text-[11.5px] text-[#0B3024] dark:text-[#E8F6F0]">
          <span className="font-medium flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B]" />
            Test Faculty Credentials
          </span>
          <button
            type="button"
            onClick={fillDemoFaculty}
            className="text-[11px] font-bold text-[#159B72] dark:text-[#20D39B] hover:underline cursor-pointer"
          >
            Auto-fill (EMP-1042)
          </button>
        </div>

        {errors.form && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-xs text-rose-700 dark:text-rose-300">
            {errors.form}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Field 1: Official Email / Employee ID */}
          <AuthInput
            id="staffIdentifier"
            label="Official College Email / Employee ID"
            required
            icon={Briefcase}
            placeholder="e.g. EMP-1042 or faculty@college.edu"
            value={identifier}
            onChange={(e) => {
              setIdentifier(e.target.value);
              if (errors.identifier) setErrors({ ...errors, identifier: null });
            }}
            error={errors.identifier}
          />

          {/* Field 2: Password */}
          <AuthInput
            id="staffPassword"
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
                alert("Please contact the College IT Administrator to reset your institutional staff password.");
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
                <span>Authenticating Staff Credentials...</span>
              </>
            ) : (
              <>
                <span>Login to Staff Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Institutional Governance Notice */}
        <div className="mt-4 flex items-start gap-2.5 p-3 rounded-xl bg-[#F1F8F5] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#16463D] text-[11.5px] text-[#36594C] dark:text-[#A7C8BD]">
          <ShieldAlert className="w-4 h-4 text-[#159B72] dark:text-[#20D39B] shrink-0 mt-0.5" />
          <div className="leading-snug">
            <strong className="font-semibold text-[#0B3024] dark:text-[#F1FAF6] block mb-0.5">
              Institution-Controlled Governance
            </strong>
            Specific staff roles (Faculty, HOD, Principal, Vice Principal) are assigned directly by
            university records. Role self-selection is strictly disallowed.
          </div>
        </div>

        {/* Student Portal Link */}
        <div className="pt-2 text-center text-xs text-[#658278] dark:text-[#789991]">
          Are you a student?{" "}
          <Link
            href="/auth/student"
            className="font-bold text-[#159B72] dark:text-[#20D39B] hover:underline inline-flex items-center gap-1"
          >
            <span>Go to Student Portal</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </AuthCard>
    </AuthShell>
  );
}
