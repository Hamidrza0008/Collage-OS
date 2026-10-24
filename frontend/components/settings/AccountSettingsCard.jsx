"use client";

import Image from "next/image";
import {
  User,
  Mail,
  Phone,
  Hash,
  GraduationCap,
  Calendar,
  Edit3,
  CheckCircle2,
  Building2,
  Award,
  MapPin,
  Shield,
} from "lucide-react";

export default function AccountSettingsCard({ profile, onEditProfile }) {
  const isFaculty = profile.isFaculty || profile.role?.toLowerCase() === "faculty";

  return (
    <div className="rounded-2xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#06241F] p-4 sm:p-5 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
            <User className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm sm:text-[15px] font-bold text-[#0B3024] dark:text-[#F1FAF6] leading-tight">
              Account Settings
            </h2>
            <p className="text-[11px] sm:text-xs text-[#658278] dark:text-[#789991] mt-0.5">
              {isFaculty
                ? "Update your faculty contact and departmental profile details."
                : "Update your personal information and student account details."}
            </p>
          </div>
        </div>
      </div>

      {/* Profile Snippet Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-[#F7FBF9] dark:bg-[#0A2A24] border border-[#D8E8E2]/60 dark:border-[#16463D]/60">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-emerald-500/30">
            <Image
              src={
                profile.avatar ||
                (isFaculty
                  ? "/assets/profile/dr-arjun-mehta.jpg"
                  : "/assets/layout/profile-avatar.jpg")
              }
              alt={profile.name || "User Avatar"}
              fill
              className="object-cover"
            />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-[#0B3024] dark:text-[#F1FAF6] leading-snug truncate">
                {profile.name}
              </span>
            </div>
            <div className="text-xs text-[#36594C] dark:text-[#B5CCC5] truncate">
              {isFaculty
                ? profile.designation || profile.department || "Faculty • Computer Science"
                : profile.semester || "7th Semester"}
            </div>
            <div className="text-[11px] text-[#658278] dark:text-[#789991] flex items-center gap-1.5 mt-0.5 truncate">
              <span className="truncate">Email: {profile.email}</span>
              {profile.verified && (
                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 font-medium text-[10px] shrink-0">
                  <CheckCircle2 className="w-2.5 h-2.5" />
                  Verified
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Edit Profile Button */}
        <button
          type="button"
          onClick={onEditProfile}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#06241F] text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] hover:border-emerald-500/60 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors shadow-2xs shrink-0 self-start sm:self-auto cursor-pointer"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Edit Profile</span>
        </button>
      </div>

      {/* Details List */}
      <div className="space-y-2.5 pt-1 text-xs">
        {/* Full Name */}
        <div className="flex items-center justify-between py-1 border-b border-[#D8E8E2]/40 dark:border-[#16463D]/40">
          <div className="flex items-center gap-2 text-[#658278] dark:text-[#789991]">
            <User className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Full Name</span>
          </div>
          <span className="font-medium text-[#0B3024] dark:text-[#F1FAF6]">
            {profile.name}
          </span>
        </div>

        {/* Email Address */}
        <div className="flex items-center justify-between py-1 border-b border-[#D8E8E2]/40 dark:border-[#16463D]/40">
          <div className="flex items-center gap-2 text-[#658278] dark:text-[#789991]">
            <Mail className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Email Address</span>
          </div>
          <span className="font-medium text-[#0B3024] dark:text-[#F1FAF6] truncate max-w-[200px]">
            {profile.email}
          </span>
        </div>

        {/* Phone Number */}
        <div className="flex items-center justify-between py-1 border-b border-[#D8E8E2]/40 dark:border-[#16463D]/40">
          <div className="flex items-center gap-2 text-[#658278] dark:text-[#789991]">
            <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Phone Number</span>
          </div>
          <span className="font-medium text-[#0B3024] dark:text-[#F1FAF6]">
            {profile.phone || "--"}
          </span>
        </div>

        {/* Identifier: Employee ID for Faculty, Roll Number for Student */}
        <div className="flex items-center justify-between py-1 border-b border-[#D8E8E2]/40 dark:border-[#16463D]/40">
          <div className="flex items-center gap-2 text-[#658278] dark:text-[#789991]">
            {isFaculty ? (
              <Shield className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <Hash className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            )}
            <span>{isFaculty ? "Employee ID" : "Roll Number"}</span>
          </div>
          <span className="font-medium font-mono text-[#0B3024] dark:text-[#F1FAF6]">
            {isFaculty
              ? profile.employeeId || "--"
              : profile.rollNumber || profile.enrollmentNo || "--"}
          </span>
        </div>

        {/* Department / Branch */}
        <div className="flex items-center justify-between py-1 border-b border-[#D8E8E2]/40 dark:border-[#16463D]/40">
          <div className="flex items-center gap-2 text-[#658278] dark:text-[#789991]">
            {isFaculty ? (
              <Building2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <GraduationCap className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            )}
            <span>{isFaculty ? "Department" : "Branch"}</span>
          </div>
          <span className="font-medium text-[#0B3024] dark:text-[#F1FAF6] text-right truncate max-w-[200px]">
            {isFaculty
              ? profile.department || "Computer Science & Engineering"
              : profile.branch || profile.department || "Computer Science & Engineering"}
          </span>
        </div>

        {/* Position / Semester */}
        <div
          className={`flex items-center justify-between py-1 ${
            isFaculty && profile.cabin
              ? "border-b border-[#D8E8E2]/40 dark:border-[#16463D]/40"
              : ""
          }`}
        >
          <div className="flex items-center gap-2 text-[#658278] dark:text-[#789991]">
            {isFaculty ? (
              <Award className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            )}
            <span>{isFaculty ? "Designation" : "Semester"}</span>
          </div>
          <span className="font-medium text-[#0B3024] dark:text-[#F1FAF6] truncate max-w-[200px] text-right">
            {isFaculty
              ? profile.designation || "Faculty • Computer Science"
              : profile.semester || "7th Semester"}
          </span>
        </div>

        {/* Faculty-specific Cabin / Office Location */}
        {isFaculty && (
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-2 text-[#658278] dark:text-[#789991]">
              <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Office / Cabin</span>
            </div>
            <span className="font-medium text-[#0B3024] dark:text-[#F1FAF6] truncate max-w-[200px] text-right">
              {profile.cabin || "Room 214, A-Block (2nd Floor)"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
