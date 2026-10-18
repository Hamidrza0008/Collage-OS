"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Building2,
  Lock,
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  Mail,
  Phone,
  User,
  Hash,
  Edit2,
  Sparkles,
  Clock,
  Layers,
  FolderKanban,
  Award,
  Shield,
  Check,
} from "lucide-react";
import AuthShell from "./AuthShell";
import AuthCard from "./AuthCard";
import AuthStepper from "./AuthStepper";
import { useAuth } from "../providers/AuthProvider";

export default function StudentConfirmPage() {
  const router = useRouter();
  const { activationState, confirmDetails, isLoading } = useAuth();

  // Enforce flow state: Cannot open Step 2 without completing Step 1
  useEffect(() => {
    if (!activationState.step1Completed) {
      router.replace("/auth/student/activate");
    }
  }, [activationState.step1Completed, router]);

  const [confirmed, setConfirmed] = useState(true);
  const [bio, setBio] = useState(activationState.bio || "Student | Developer | Always learning");
  const [skills, setSkills] = useState(
    activationState.skills || ["React", "Next.js", "JavaScript", "MongoDB"]
  );
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleContinue = async () => {
    if (!confirmed) {
      setError("Please confirm that your institutional details are correct to proceed.");
      return;
    }
    setError("");
    setIsSubmitting(true);
    try {
      const res = await confirmDetails({ bio, skills });
      if (res.success) {
        router.push("/auth/student/password");
      }
    } catch (err) {
      setError(err.message || "Failed to confirm details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const addSkill = (e) => {
    if (e.key === "Enter" && newSkill.trim()) {
      e.preventDefault();
      if (!skills.includes(newSkill.trim())) {
        setSkills([...skills, newSkill.trim()]);
      }
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  if (!activationState.step1Completed) {
    return null; // Prevents flashing before redirect
  }

  return (
    <AuthShell
      showFacultyLink={false}
      cardMaxWidth="max-w-[490px] xl:max-w-[510px]"
      topNavAction={{
        label: "Already have an account?",
        actionLabel: "Login",
        href: "/auth/student",
      }}
      brandProps={{
        badgeText: "Student Account Activation",
        badgeIcon: GraduationCap,
        headline: ["Confirm Your Details"],
        description:
          "We've found your institutional record. Please confirm your details before you create your account.",
        topHandwrittenText: "Your College\nDetails, Verified ♡",
        bottomHandwrittenText: "Same Campus,\nBigger Dreams 🍃",
        features: [
          {
            icon: ShieldCheck,
            title: "Verified Identity",
            subtitle: "From your college\nrecords",
          },
          {
            icon: Building2,
            title: "Official Information",
            subtitle: "Maintained by\nyour institution",
          },
          {
            icon: Lock,
            title: "Secure Activation",
            subtitle: "You'll create your\nown password",
          },
          {
            icon: Clock,
            title: "Get Started",
            subtitle: "Access your campus\ndashboard",
          },
        ],
      }}
    >
      <AuthCard
        showLogo={false}
        title="Confirm Your Details"
        subtitle="Please verify the information below. You cannot change your official institutional details. These are managed by your college."
        maxWidth="max-w-[490px] xl:max-w-[510px]"
      >
        {/* Stepper: Step 2 Active at very top of card */}
        <div className="mb-2">
          <AuthStepper currentStep={2} />
        </div>

        {error && (
          <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-xs text-rose-700 dark:text-rose-300">
            {error}
          </div>
        )}

        {/* Section 1: Academic Information (Institution Controlled) */}
        <div className="rounded-2xl border border-[#D8E8E2] dark:border-[#16463D] bg-[#F7FBF9] dark:bg-[#07241E] p-3 sm:p-3.5 space-y-2.5">
          <div className="flex items-center justify-between border-b border-[#D8E8E2]/70 dark:border-[#16463D]/70 pb-2">
            <div className="flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B]" />
              <h3 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                Academic Information
              </h3>
            </div>
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#0F7A58] dark:text-[#20D39B] bg-[#DDF4EB] dark:bg-[#0A382E] px-2 py-0.5 rounded-full border border-[#159B72]/20">
              <Lock className="w-2.5 h-2.5" />
              Institution Controlled
            </span>
          </div>

          {/* Academic Details 2-Column Grid */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
            {/* Full Name */}
            <div className="flex items-start gap-1.5">
              <User className="w-3.5 h-3.5 text-[#658278] dark:text-[#789991] shrink-0 mt-0.5" />
              <div>
                <span className="text-[#658278] dark:text-[#789991] text-[10.5px] block leading-none">Full Name</span>
                <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6] text-xs leading-tight">
                  {activationState.name || "Hamid Rza"}
                </span>
              </div>
            </div>

            {/* Official College Email */}
            <div className="flex items-start gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#658278] dark:text-[#789991] shrink-0 mt-0.5" />
              <div className="overflow-hidden">
                <span className="text-[#658278] dark:text-[#789991] text-[10.5px] block leading-none">
                  Official College Email
                </span>
                <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6] text-xs leading-tight block truncate">
                  {activationState.email || "hamid@college.edu"}
                </span>
              </div>
            </div>

            {/* Enrollment Number */}
            <div className="flex items-start gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-[#658278] dark:text-[#789991] shrink-0 mt-0.5" />
              <div>
                <span className="text-[#658278] dark:text-[#789991] text-[10.5px] block leading-none">
                  Enrollment Number
                </span>
                <span className="font-bold text-[#159B72] dark:text-[#20D39B] text-xs leading-tight">
                  {activationState.enrollmentNo || "22CS087"}
                </span>
              </div>
            </div>

            {/* Phone Number */}
            <div className="flex items-start gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#658278] dark:text-[#789991] shrink-0 mt-0.5" />
              <div>
                <span className="text-[#658278] dark:text-[#789991] text-[10.5px] block leading-none">Phone Number</span>
                <span className="font-medium text-[#0B3024] dark:text-[#F1FAF6] text-xs leading-tight">
                  {activationState.phone || "+91 98765 43210"}
                </span>
              </div>
            </div>

            {/* Department / Branch */}
            <div className="flex items-start gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#658278] dark:text-[#789991] shrink-0 mt-0.5" />
              <div>
                <span className="text-[#658278] dark:text-[#789991] text-[10.5px] block leading-none">
                  Department / Branch
                </span>
                <span className="font-medium text-[#0B3024] dark:text-[#F1FAF6] text-xs leading-tight">
                  {activationState.department || "Computer Science & Engineering"}
                </span>
              </div>
            </div>

            {/* Roll Number */}
            <div className="flex items-start gap-1.5">
              <Hash className="w-3.5 h-3.5 text-[#658278] dark:text-[#789991] shrink-0 mt-0.5" />
              <div>
                <span className="text-[#658278] dark:text-[#789991] text-[10.5px] block leading-none">Roll Number</span>
                <span className="font-medium text-[#0B3024] dark:text-[#F1FAF6] text-xs leading-tight">
                  {activationState.rollNumber || "22CS087"}
                </span>
              </div>
            </div>

            {/* Semester & Section */}
            <div className="flex items-start gap-1.5">
              <FolderKanban className="w-3.5 h-3.5 text-[#658278] dark:text-[#789991] shrink-0 mt-0.5" />
              <div>
                <span className="text-[#658278] dark:text-[#789991] text-[10.5px] block leading-none">Semester</span>
                <span className="font-medium text-[#0B3024] dark:text-[#F1FAF6] text-xs leading-tight">
                  {activationState.semester || "7th Semester"}
                </span>
              </div>
            </div>

            {/* Academic Status */}
            <div className="flex items-start gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#658278] dark:text-[#789991] shrink-0 mt-0.5" />
              <div>
                <span className="text-[#658278] dark:text-[#789991] text-[10.5px] block leading-none">
                  Academic Status
                </span>
                <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400 text-xs leading-tight">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {activationState.academicStatus || "Active"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Profile Information (User Controlled) */}
        <div className="rounded-2xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#06241F] p-3 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between border-b border-[#E2EBE7] dark:border-[#16463D] pb-1.5">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B]" />
              <h3 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                Profile Information
              </h3>
            </div>
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#159B72] dark:text-[#20D39B] bg-[#DDF4EB]/70 dark:bg-[#0A382E] px-2 py-0.5 rounded-full">
              <Sparkles className="w-2.5 h-2.5" />
              User Controlled
            </span>
          </div>

          <div className="flex items-center gap-3.5">
            {/* Avatar with edit badge */}
            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-[#DDF4EB] dark:bg-[#0A382E] border-2 border-[#159B72]/30 shrink-0">
              <Image
                src="/assets/profile/avatar.jpg"
                alt="Profile Avatar"
                fill
                className="object-cover"
                sizes="48px"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#159B72] text-white flex items-center justify-center shadow-xs cursor-pointer">
                <Edit2 className="w-2.5 h-2.5" />
              </div>
            </div>

            {/* Bio & Skills */}
            <div className="flex-1 space-y-1.5 text-xs">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[#658278] dark:text-[#789991] text-[10.5px] font-medium">
                    Bio (Optional)
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsEditingBio(!isEditingBio)}
                    className="text-[#658278] hover:text-[#159B72] p-0.5 cursor-pointer"
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>
                </div>
                {isEditingBio ? (
                  <input
                    type="text"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full mt-0.5 p-1 rounded text-xs bg-[#F7FBF9] dark:bg-[#0A2A24] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] outline-hidden focus:border-[#159B72]"
                  />
                ) : (
                  <p className="text-[#0B3024] dark:text-[#F1FAF6] font-medium text-xs leading-none mt-0.5">{bio}</p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[#658278] dark:text-[#789991] text-[10.5px] font-medium">
                    Skills (Optional)
                  </span>
                  <button
                    type="button"
                    className="text-[#658278] hover:text-[#159B72] p-0.5 cursor-pointer"
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-1 items-center">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded-md bg-[#F1F8F5] dark:bg-[#092D25] text-[#0B3024] dark:text-[#D4EDE4] text-[10.5px] font-medium border border-[#D8E8E2] dark:border-[#16463D]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Confirmation Checkbox */}
        <label className="flex items-center justify-between p-2.5 rounded-xl bg-[#F1F8F5] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#16463D] cursor-pointer text-xs select-none">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => {
                setConfirmed(e.target.checked);
                if (error) setError("");
              }}
              className="w-4 h-4 text-[#159B72] border-[#D8E8E2] rounded-md focus:ring-[#159B72] cursor-pointer accent-[#159B72]"
            />
            <span className="text-[#0B3024] dark:text-[#F1FAF6] font-medium text-xs">
              I confirm that all the above information is correct.
            </span>
          </div>
          <Shield className="w-3.5 h-3.5 text-[#658278] dark:text-[#789991]" />
        </label>

        {/* Action Button & Back Link */}
        <div className="space-y-1.5 pt-1">
          <button
            type="button"
            onClick={handleContinue}
            disabled={!confirmed || isSubmitting}
            className="w-full h-10 sm:h-10.5 rounded-xl bg-[#159B72] hover:bg-[#0E8561] active:scale-[0.99] text-white font-bold text-xs sm:text-sm tracking-wide shadow-md shadow-[#159B72]/20 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Continue to Set Password</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <Link
            href="/auth/student/activate"
            className="w-full py-1.5 flex items-center justify-center gap-1 text-xs font-semibold text-[#658278] dark:text-[#789991] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </Link>
        </div>
      </AuthCard>
    </AuthShell>
  );
}
