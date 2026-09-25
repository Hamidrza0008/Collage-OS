"use client";

import { useState } from "react";
import {
  X,
  FileCheck,
  Upload,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Image as ImageIcon,
  Trash2,
} from "lucide-react";

export default function ClaimVerificationModal({
  isOpen,
  onClose,
  report,
  onSubmitClaim,
}) {
  const [distinguishingFeature, setDistinguishingFeature] = useState(
    report?.verification?.submittedDetails || ""
  );
  const [purchaseOrLossDate, setPurchaseOrLossDate] = useState("");
  const [lostLocationDetails, setLostLocationDetails] = useState("");
  const [proofReference, setProofReference] = useState(
    report?.serialOrReference || ""
  );
  const [mockFileName, setMockFileName] = useState(
    report?.verification?.documentName || ""
  );
  const [isTruthConfirmed, setIsTruthConfirmed] = useState(false);

  // Field-level error state
  const [errors, setErrors] = useState({});
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);
  const [generatedClaimId, setGeneratedClaimId] = useState("");

  if (!isOpen || !report) return null;

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setMockFileName(file.name);
      if (errors.mockFileName) {
        setErrors((prev) => ({ ...prev, mockFileName: null }));
      }
    }
  };

  const handleRemoveFile = () => {
    setMockFileName("");
  };

  const validate = () => {
    const errs = {};
    if (!distinguishingFeature.trim()) {
      errs.distinguishingFeature = "Please describe at least one distinguishing feature or mark.";
    } else if (distinguishingFeature.trim().length < 8) {
      errs.distinguishingFeature = "Description is too brief. Provide more specific verification detail.";
    }

    if (!isTruthConfirmed) {
      errs.isTruthConfirmed = "You must confirm that this claim is truthful.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const claimId = report.claimId || `CLM-2026-0${Math.floor(100 + Math.random() * 900)}`;
    setGeneratedClaimId(claimId);

    const claimData = {
      claimId,
      distinguishingFeature,
      purchaseOrLossDate,
      lostLocationDetails,
      proofReference,
      mockFileName,
      submittedAt: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }) + ", " + new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    onSubmitClaim(report.id, claimData);
    setIsSubmittedSuccess(true);
  };

  const handleResetAndClose = () => {
    setIsSubmittedSuccess(false);
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={handleResetAndClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-white dark:bg-[#06241F] rounded-2xl border border-[#D8E8E2] dark:border-[#16463D] shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#D8E8E2] dark:border-[#16463D] flex items-center justify-between gap-3 bg-[#FAFDFB] dark:bg-[#072620]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0">
              <FileCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                Claim Ownership Verification
              </h3>
              <p className="text-[11px] text-[#55786B] dark:text-[#9FB7AD]">
                Case: {report.caseId} • {report.itemName}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleResetAndClose}
            className="p-1.5 rounded-xl text-[#658278] hover:text-[#0B3024] dark:text-[#8BA69D] dark:hover:text-[#F1FAF6] hover:bg-gray-100 dark:hover:bg-[#082A24] cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Success or Form */}
        {isSubmittedSuccess ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h4 className="text-lg font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                Claim Submitted
              </h4>
              <p className="text-xs text-[#55786B] dark:text-[#9FB7AD]">
                Your ownership verification details have been recorded.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-[#082A24] border border-[#E0EBE6] dark:border-[#16463D] text-xs space-y-2 text-left">
              <div className="flex justify-between items-center">
                <span className="text-[#658278] dark:text-[#8BA69D]">Claim ID</span>
                <span className="font-mono font-bold text-[#0B3024] dark:text-[#F1FAF6]">{generatedClaimId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#658278] dark:text-[#8BA69D]">Current Status</span>
                <span className="inline-flex items-center gap-1 font-semibold text-amber-600 dark:text-amber-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Verification Pending
                </span>
              </div>
              <div className="pt-2 border-t border-[#E0EBE6] dark:border-[#16463D] text-[11px] text-[#55786B] dark:text-[#9FB7AD]">
                Next step: The Lost &amp; Found team will review the provided details and compare with item custody records.
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-[#159B72] hover:bg-[#107A59] transition-all cursor-pointer shadow-xs"
              >
                Back to Workspace
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <div className="p-3 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-900/60 text-xs text-sky-900 dark:text-sky-200 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-sky-600 dark:text-sky-400 mt-0.5 shrink-0" />
              <span>
                Please provide unique details known only to the owner (e.g. engravings, wallpaper, contents, or purchase serial).
              </span>
            </div>

            {/* 1. Distinguishing Feature (Required) */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] flex items-center justify-between">
                <span>Distinguishing Features / Unique Marks *</span>
                <span className="text-[10px] text-rose-500 font-normal">Required</span>
              </label>
              <textarea
                rows={3}
                value={distinguishingFeature}
                onChange={(e) => {
                  setDistinguishingFeature(e.target.value);
                  if (errors.distinguishingFeature) {
                    setErrors((prev) => ({ ...prev, distinguishingFeature: null }));
                  }
                }}
                placeholder="E.g., Small dent on bottom corner, internal CS notes, lock passcode hint..."
                className={`w-full p-2.5 text-xs rounded-xl bg-white dark:bg-[#082A24] border text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden focus:ring-1 transition-all ${
                  errors.distinguishingFeature
                    ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500"
                    : "border-[#D8E8E2] dark:border-[#16463D] focus:border-[#159B72] focus:ring-[#159B72]"
                }`}
              />
              {errors.distinguishingFeature && (
                <p className="text-[11px] text-rose-500 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{errors.distinguishingFeature}</span>
                </p>
              )}
            </div>

            {/* 2. Purchase / Loss Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
                  Approx. Date Lost / Purchased
                </label>
                <input
                  type="text"
                  value={purchaseOrLossDate}
                  onChange={(e) => setPurchaseOrLossDate(e.target.value)}
                  placeholder="E.g., 18 Aug 2025 or Sept 2024"
                  className="w-full p-2.5 text-xs rounded-xl bg-white dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden focus:border-[#159B72]"
                />
              </div>

              {/* 3. Serial / Reference */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
                  Serial / Invoice Reference #
                </label>
                <input
                  type="text"
                  value={proofReference}
                  onChange={(e) => setProofReference(e.target.value)}
                  placeholder="E.g., Model / Serial suffix"
                  className="w-full p-2.5 text-xs rounded-xl bg-white dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden focus:border-[#159B72]"
                />
              </div>
            </div>

            {/* 4. Where it was lost */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
                Where did you lose / last possess this item?
              </label>
              <input
                type="text"
                value={lostLocationDetails}
                onChange={(e) => setLostLocationDetails(e.target.value)}
                placeholder="E.g., Bench outside canteen, Lecture Hall 2 row 4..."
                className="w-full p-2.5 text-xs rounded-xl bg-white dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden focus:border-[#159B72]"
              />
            </div>

            {/* 5. Supporting Image / Document */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] block">
                Supporting Photo / Proof (Optional)
              </label>
              {mockFileName ? (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#16463D] text-xs">
                  <div className="flex items-center gap-2 truncate">
                    <ImageIcon className="w-4 h-4 text-[#159B72] dark:text-[#20D39B] shrink-0" />
                    <span className="text-[#0B3024] dark:text-[#F1FAF6] font-medium truncate">
                      {mockFileName}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="p-1 text-rose-500 hover:text-rose-700 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center p-3 rounded-xl border border-dashed border-[#D8E8E2] dark:border-[#16463D] hover:bg-gray-50 dark:hover:bg-[#082A24] cursor-pointer transition-colors text-center">
                  <Upload className="w-4 h-4 text-[#658278] dark:text-[#8BA69D] mb-1" />
                  <span className="text-xs font-semibold text-[#159B72] dark:text-[#20D39B]">
                    Upload receipt, bill, or reference photo
                  </span>
                  <span className="text-[10px] text-[#658278] dark:text-[#8BA69D]">
                    PNG, JPG, or PDF up to 5MB
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                    accept="image/*,.pdf"
                  />
                </label>
              )}
            </div>

            {/* 6. Truth Agreement Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 text-xs text-[#0B3024] dark:text-[#F1FAF6] cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isTruthConfirmed}
                  onChange={(e) => {
                    setIsTruthConfirmed(e.target.checked);
                    if (errors.isTruthConfirmed) {
                      setErrors((prev) => ({ ...prev, isTruthConfirmed: null }));
                    }
                  }}
                  className="mt-0.5 rounded-sm text-[#159B72] focus:ring-[#159B72] cursor-pointer"
                />
                <span>
                  I confirm that this claim is truthful and relates to an item that belongs to me.
                </span>
              </label>
              {errors.isTruthConfirmed && (
                <p className="text-[11px] text-rose-500 font-medium mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{errors.isTruthConfirmed}</span>
                </p>
              )}
            </div>

            {/* Footer Buttons */}
            <div className="pt-3 border-t border-[#D8E8E2] dark:border-[#16463D] flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#55786B] dark:text-[#9FB7AD] hover:bg-gray-100 dark:hover:bg-[#082A24] cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#159B72] hover:bg-[#107A59] transition-all cursor-pointer shadow-xs"
              >
                Submit Verification
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
