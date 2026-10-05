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
  CheckCircle2,
  GraduationCap,
  Mail,
  Phone,
  User,
  Hash,
  Edit2,
  Sparkles,
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

  const [confirmed, setConfirmed] = useState(false);
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
        topHandwrittenText: "Your College Details, Verified 🍃",
        bottomHandwrittenText: "Same Campus, Bigger Dreams 🍃",
        features: [
          {
            icon: ShieldCheck,
            title: "Verified Identity",
            subtitle: "From your college records",
            iconBg: "bg-[#159B72] text-white",
          },
          {
            icon: Building2,
            title: "Official Information",
            subtitle: "Maintained by your institution",
            iconBg: "bg-[#DDF4EB] dark:bg-[#0C3029] text-[#159B72] dark:text-[#20D39B]",
          },
          {
            icon: Lock,
            title: "Secure Activation",
            subtitle: "You'll create your own password",
            iconBg: "bg-[#DDF4EB] dark:bg-[#0C3029] text-[#159B72] dark:text-[#20D39B]",
          },
          {
            icon: GraduationCap,
            title: "Get Started",
            subtitle: "Access your campus dashboard",
            iconBg: "bg-[#DDF4EB] dark:bg-[#0C3029] text-[#159B72] dark:text-[#20D39B]",
          },
        ],
      }}
    >
      <AuthCard
        title="Confirm Your Details"
        subtitle="Please verify the information below. You cannot change your official institutional details. These are managed by your college."
      >
        {/* Stepper: Step 2 Active */}
        <div className="mb-4">
          <AuthStepper currentStep={2} />
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-xs text-rose-700 dark:text-rose-300">
            {error}
          </div>
        )}

        {/* Section 1: Academic Information (Institution Controlled) */}
        <div className="rounded-2xl border border-[#D8E8E2] dark:border-[#16463D] bg-[#F7FBF9] dark:bg-[#07241E] p-4 sm:p-5 space-y-3.5">
          <div className="flex items-center justify-between border-b border-[#D8E8E2]/70 dark:border-[#16463D]/70 pb-2.5">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#159B72] dark:text-[#20D39B]" />
              <h3 className="text-xs sm:text-[13px] font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                Academic Information
              </h3>
            </div>
            <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-[#0F7A58] dark:text-[#20D39B] bg-[#DDF4EB] dark:bg-[#0A382E] px-2 py-0.5 rounded-full border border-[#159B72]/20">
              <Lock className="w-2.5 h-2.5" />
              Institution Controlled
            </span>
          </div>

          {/* Academic Details 2-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-[#658278] dark:text-[#789991] text-[11px] block">Full Name</span>
              <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6] text-[13px]">
                {activationState.name || "Hamid Rza"}
              </span>
            </div>

            <div>
              <span className="text-[#658278] dark:text-[#789991] text-[11px] block">
                Official College Email
              </span>
              <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6] break-all">
                {activationState.email || "hamid@college.edu"}
              </span>
            </div>

            <div>
              <span className="text-[#658278] dark:text-[#789991] text-[11px] block">
                Enrollment Number
              </span>
              <span className="font-bold text-[#159B72] dark:text-[#20D39B]">
                {activationState.enrollmentNo || "22CS087"}
              </span>
            </div>

            <div>
              <span className="text-[#658278] dark:text-[#789991] text-[11px] block">Phone Number</span>
              <span className="font-medium text-[#0B3024] dark:text-[#F1FAF6]">
                {activationState.phone || "+91 98765 43210"}
              </span>
            </div>

            <div>
              <span className="text-[#658278] dark:text-[#789991] text-[11px] block">
                Department / Branch
              </span>
              <span className="font-medium text-[#0B3024] dark:text-[#F1FAF6]">
                {activationState.department || "Computer Science & Engineering"}
              </span>
            </div>

            <div>
              <span className="text-[#658278] dark:text-[#789991] text-[11px] block">Roll Number</span>
              <span className="font-medium text-[#0B3024] dark:text-[#F1FAF6]">
                {activationState.rollNumber || "22CS087"}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div>
                <span className="text-[#658278] dark:text-[#789991] text-[11px] block">Semester</span>
                <span className="font-medium text-[#0B3024] dark:text-[#F1FAF6]">
                  {activationState.semester || "7th Semester"}
                </span>
              </div>
              <div>
                <span className="text-[#658278] dark:text-[#789991] text-[11px] block">Section</span>
                <span className="font-medium text-[#0B3024] dark:text-[#F1FAF6]">
                  {activationState.section || "A"}
                </span>
              </div>
            </div>

            <div>
              <span className="text-[#658278] dark:text-[#789991] text-[11px] block">
                Academic Status
              </span>
              <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {activationState.academicStatus || "Active"}
              </span>
            </div>
          </div>
        </div>

        {/* Section 2: Profile Information (User Controlled) */}
        <div className="rounded-2xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#06241F] p-4 sm:p-5 space-y-3.5 shadow-2xs">
          <div className="flex items-center justify-between border-b border-[#E2EBE7] dark:border-[#16463D] pb-2.5">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#159B72] dark:text-[#20D39B]" />
              <h3 className="text-xs sm:text-[13px] font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                Profile Information
              </h3>
            </div>
            <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-[#159B72] dark:text-[#20D39B] bg-[#DDF4EB]/60 dark:bg-[#0A382E] px-2 py-0.5 rounded-full">
              <Sparkles className="w-2.5 h-2.5" />
              User Controlled
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Avatar with edit badge */}
            <div className="relative w-14 h-14 rounded-full overflow-hidden bg-[#DDF4EB] dark:bg-[#0A382E] border-2 border-[#159B72]/30 shrink-0">
              <Image
                src="/assets/layout/profile-avatar.jpg"
                alt="Profile Avatar"
                fill
                className="object-cover"
                sizes="56px"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                <Edit2 className="w-3.5 h-3.5 text-white" />
              </div>
            </div>

            {/* Bio & Skills */}
            <div className="flex-1 space-y-2 w-full text-xs">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[#658278] dark:text-[#789991] text-[11px] font-medium">
                    Bio (Optional)
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsEditingBio(!isEditingBio)}
                    className="text-[11px] font-semibold text-[#159B72] dark:text-[#20D39B] hover:underline"
                  >
                    {isEditingBio ? "Done" : "Edit"}
                  </button>
                </div>
                {isEditingBio ? (
                  <input
                    type="text"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full mt-1 p-2 rounded-lg text-xs bg-[#F7FBF9] dark:bg-[#0A2A24] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] outline-hidden focus:border-[#159B72]"
                  />
                ) : (
                  <p className="text-[#0B3024] dark:text-[#F1FAF6] font-medium mt-0.5">{bio}</p>
                )}
              </div>

              <div>
                <span className="text-[#658278] dark:text-[#789991] text-[11px] font-medium block mb-1">
                  Skills (Optional)
                </span>
                <div className="flex flex-wrap gap-1.5 items-center">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded-md bg-[#F1F8F5] dark:bg-[#092D25] text-[#0B3024] dark:text-[#D4EDE4] text-[11px] font-medium border border-[#D8E8E2] dark:border-[#16463D] flex items-center gap-1 group"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="text-[#658278] hover:text-rose-500 font-bold ml-0.5"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={addSkill}
                    placeholder="+ add skill (Press Enter)"
                    className="text-[11px] px-2 py-0.5 rounded-md bg-transparent border border-dashed border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] outline-hidden w-36 placeholder:text-[10.5px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Confirmation Checkbox */}
        <label className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F1F8F5] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#16463D] cursor-pointer text-xs select-none">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => {
              setConfirmed(e.target.checked);
              if (error) setError("");
            }}
            className="w-4 h-4 mt-0.5 text-[#159B72] border-[#D8E8E2] rounded-md focus:ring-[#159B72] cursor-pointer accent-[#159B72]"
          />
          <span className="text-[#0B3024] dark:text-[#F1FAF6] font-medium leading-snug">
            I confirm that all the above institutional information is correct and belongs to my
            college admission record.
          </span>
        </label>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          <button
            type="button"
            onClick={handleContinue}
            disabled={!confirmed || isSubmitting}
            className="w-full h-11 sm:h-12 rounded-xl bg-[#159B72] hover:bg-[#0E8561] active:scale-[0.99] text-white font-bold text-sm tracking-wide shadow-md shadow-[#159B72]/20 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Continue to Set Password</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <Link
            href="/auth/student/activate"
            className="w-full py-2 flex items-center justify-center gap-1.5 text-xs font-semibold text-[#658278] dark:text-[#789991] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Identity Verification</span>
          </Link>
        </div>
      </AuthCard>
    </AuthShell>
  );
}
