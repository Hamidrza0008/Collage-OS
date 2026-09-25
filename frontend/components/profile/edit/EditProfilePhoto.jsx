"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Camera, Trash2, UploadCloud, AlertCircle, CheckCircle2 } from "lucide-react";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export default function EditProfilePhoto({
  avatar,
  name,
  onChangeAvatar,
}) {
  const fileInputRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSelectFile = (e) => {
    const file = e.target.files?.[0];
    setErrorMsg("");
    setSuccessMsg("");

    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      setErrorMsg("Please upload a PNG, JPG, or WEBP image.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setErrorMsg("Image size exceeds 5MB limit. Please choose a smaller file.");
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    onChangeAvatar(previewUrl);
    setSuccessMsg("Photo updated! Remember to save changes.");
    setTimeout(() => setSuccessMsg(""), 3500);
  };

  const handleRemovePhoto = () => {
    setErrorMsg("");
    setSuccessMsg("");
    onChangeAvatar("/assets/profile/avatar.jpg");
    setSuccessMsg("Photo reset to default.");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  return (
    <div id="section-photo" className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] shadow-sm scroll-mt-28">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#D8E8E2]/60 dark:border-[#10372F]/60">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#06241F] dark:text-white">
            Profile Photo
          </h2>
          <p className="text-xs text-[#06241F]/70 dark:text-[#D8E8E2]/70 mt-0.5">
            This image is displayed across your peer interactions, project submissions, and campus feed.
          </p>
        </div>
        <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-[#159B72]/10 dark:bg-[#20D39B]/10 text-[#159B72] dark:text-[#20D39B] border border-[#159B72]/20 dark:border-[#20D39B]/20 shrink-0">
          Max 5MB • PNG / JPG / WEBP
        </span>
      </div>

      <div className="pt-5 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        {/* Avatar preview with trigger badge */}
        <div className="relative group shrink-0">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-3 border-[#159B72] dark:border-[#20D39B] shadow-md relative bg-black/5 dark:bg-black/30">
            <Image
              src={avatar || "/assets/profile/avatar.jpg"}
              alt={name || "Student Avatar"}
              fill
              priority
              className="object-cover"
            />
          </div>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-[#159B72] hover:bg-[#128360] dark:bg-[#20D39B] dark:hover:bg-[#1bb886] text-white dark:text-[#021512] flex items-center justify-center shadow-md transition-transform hover:scale-110 active:scale-95 cursor-pointer"
            title="Upload new photo"
            aria-label="Upload new photo"
          >
            <Camera className="w-4 h-4" />
          </button>
        </div>

        {/* Upload Controls & Guidance */}
        <div className="flex-1 w-full space-y-3 text-center sm:text-left">
          <input
            ref={fileInputRef}
            type="file"
            accept=".png,.jpg,.jpeg,.webp"
            className="hidden"
            onChange={handleSelectFile}
            aria-label="Upload profile photo"
          />

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#159B72]/10 hover:bg-[#159B72]/20 dark:bg-[#20D39B]/10 dark:hover:bg-[#20D39B]/20 text-[#159B72] dark:text-[#20D39B] border border-[#159B72]/30 dark:border-[#20D39B]/30 transition-all cursor-pointer"
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span>Choose Image</span>
            </button>

            <button
              type="button"
              onClick={handleRemovePhoto}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 transition-all cursor-pointer"
              title="Reset avatar to default"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          <p className="text-xs text-[#06241F]/60 dark:text-[#D8E8E2]/60">
            Recommended: A square headshot with good lighting. Transparent PNGs and square crops render best.
          </p>

          {/* Validation Feedback */}
          {errorMsg && (
            <div className="flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
