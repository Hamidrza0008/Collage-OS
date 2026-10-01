"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  X,
  FileCheck,
  Upload,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Image as ImageIcon,
  Trash2,
  MapPin,
  Calendar,
  PackageSearch,
  AlertTriangle,
} from "lucide-react";

export default function ClaimVerificationModal({
  isOpen,
  onClose,
  report,
  onSubmitClaim,
}) {
  // Form Data
  const [distinguishingFeature, setDistinguishingFeature] = useState(
    report?.verification?.submittedDetails || ""
  );
  const [purchaseOrLossDate, setPurchaseOrLossDate] = useState("");
  const [lostLocationDetails, setLostLocationDetails] = useState("");
  const [proofReference, setProofReference] = useState(
    report?.serialOrReference || ""
  );
  const [claimReason, setClaimReason] = useState("");
  const [mockFileName, setMockFileName] = useState(
    report?.verification?.documentName || ""
  );
  const [isTruthConfirmed, setIsTruthConfirmed] = useState(false);

  // State Management
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);
  const [generatedClaimId, setGeneratedClaimId] = useState("");

  // Refs for accessibility
  const modalRef = useRef(null);
  const firstInputRef = useRef(null);
  const previousActiveElement = useRef(null);

  // Accessibility: Focus Management
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement;
      setTimeout(() => {
        firstInputRef.current?.focus();
      }, 100);
    } else {
      previousActiveElement.current?.focus();
    }
  }, [isOpen]);

  // Accessibility: Escape key handler
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen && !isSubmitting) {
        handleResetAndClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, isSubmitting]);

  // Accessibility: Trap focus within modal
  useEffect(() => {
    const handleTabKey = (e) => {
      if (!isOpen || !modalRef.current) return;
      
      const focusableElements = modalRef.current.querySelectorAll(
        'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleTabKey);
    }
    return () => document.removeEventListener("keydown", handleTabKey);
  }, [isOpen]);

  if (!isOpen || !report) return null;

  // Check if item is still claimable
  const isClaimable = !["Resolved", "Cancelled", "Expired"].includes(report.status);
  const alreadyClaimed = report.claimStatus && report.claimStatus !== "Not Claimed";

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type and size
    const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif", "image/webp", "application/pdf"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        mockFileName: "Invalid file type. Please upload PNG, JPG, GIF, WEBP, or PDF only."
      }));
      return;
    }

    if (file.size > maxSize) {
      setErrors((prev) => ({
        ...prev,
        mockFileName: "File size exceeds 5MB limit. Please upload a smaller file."
      }));
      return;
    }

    setMockFileName(file.name);
    if (errors.mockFileName) {
      setErrors((prev) => ({ ...prev, mockFileName: null }));
    }
  };

  const handleRemoveFile = () => {
    setMockFileName("");
    if (errors.mockFileName) {
      setErrors((prev) => ({ ...prev, mockFileName: null }));
    }
  };

  const validate = () => {
    const errs = {};

    // Required distinguishing feature
    if (!distinguishingFeature.trim()) {
      errs.distinguishingFeature = "Please describe at least one distinguishing feature or mark.";
    } else if (distinguishingFeature.trim().length < 8) {
      errs.distinguishingFeature = "Description is too brief. Provide more specific verification detail (at least 8 characters).";
    }

    // Required claim reason
    if (!claimReason.trim()) {
      errs.claimReason = "Please explain why you believe this item belongs to you.";
    } else if (claimReason.trim().length < 10) {
      errs.claimReason = "Please provide a more detailed explanation (at least 10 characters).";
    }

    // Required declaration
    if (!isTruthConfirmed) {
      errs.isTruthConfirmed = "You must confirm that this claim is truthful to proceed.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) {
      // Scroll to first error
      const firstErrorElement = modalRef.current?.querySelector('[aria-invalid="true"]');
      firstErrorElement?.focus();
      return;
    }

    setIsSubmitting(true);

    // Simulate async submission
    setTimeout(() => {
      const claimId = report.claimId || `CLM-2026-0${Math.floor(100 + Math.random() * 900)}`;
      setGeneratedClaimId(claimId);

      const claimData = {
        claimId,
        distinguishingFeature: distinguishingFeature.trim(),
        purchaseOrLossDate: purchaseOrLossDate.trim(),
        lostLocationDetails: lostLocationDetails.trim(),
        proofReference: proofReference.trim(),
        claimReason: claimReason.trim(),
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
      setIsSubmitting(false);
    }, 800);
  };

  const handleResetAndClose = () => {
    if (isSubmitting) return;
    
    // Reset form state
    setDistinguishingFeature(report?.verification?.submittedDetails || "");
    setPurchaseOrLossDate("");
    setLostLocationDetails("");
    setProofReference(report?.serialOrReference || "");
    setClaimReason("");
    setMockFileName(report?.verification?.documentName || "");
    setIsTruthConfirmed(false);
    setIsSubmittedSuccess(false);
    setErrors({});
    setIsSubmitting(false);
    
    onClose();
  };

  // Render non-claimable state
  if (!isClaimable) {
    return (
      <div 
        className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="claim-unavailable-title"
      >
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
          onClick={handleResetAndClose}
          aria-hidden="true"
        />

        {/* Modal Dialog */}
        <div 
          ref={modalRef}
          className="relative w-full max-w-md bg-white dark:bg-[#06241F] rounded-2xl border border-[#D8E8E2] dark:border-[#16463D] shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200"
        >
          {/* Header */}
          <div className="px-5 py-4 border-b border-[#D8E8E2] dark:border-[#16463D] flex items-center justify-between gap-3 bg-[#FAFDFB] dark:bg-[#072620]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gray-100 dark:bg-gray-800/60 text-gray-600 dark:text-gray-400 flex items-center justify-center shrink-0">
                <PackageSearch className="w-4 h-4" />
              </div>
              <div>
                <h3 id="claim-unavailable-title" className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                  Claim Unavailable
                </h3>
                <p className="text-[11px] text-[#55786B] dark:text-[#9FB7AD]">
                  Case: {report.caseId}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleResetAndClose}
              aria-label="Close dialog"
              className="p-1.5 rounded-xl text-[#658278] hover:text-[#0B3024] dark:text-[#8BA69D] dark:hover:text-[#F1FAF6] hover:bg-gray-100 dark:hover:bg-[#082A24] cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-gray-800/60 text-gray-500 dark:text-gray-400 mx-auto flex items-center justify-center">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h4 className="text-lg font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                This item is no longer available
              </h4>
              <p className="text-xs text-[#55786B] dark:text-[#9FB7AD]">
                This item has been {report.status.toLowerCase()} and cannot be claimed at this time.
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-[#159B72] hover:bg-[#107A59] transition-all cursor-pointer shadow-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render already claimed state
  if (alreadyClaimed) {
    return (
      <div 
        className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="already-claimed-title"
      >
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
          onClick={handleResetAndClose}
          aria-hidden="true"
        />

        {/* Modal Dialog */}
        <div 
          ref={modalRef}
          className="relative w-full max-w-md bg-white dark:bg-[#06241F] rounded-2xl border border-[#D8E8E2] dark:border-[#16463D] shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200"
        >
          {/* Header */}
          <div className="px-5 py-4 border-b border-[#D8E8E2] dark:border-[#16463D] flex items-center justify-between gap-3 bg-[#FAFDFB] dark:bg-[#072620]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-400 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <h3 id="already-claimed-title" className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                  Claim Already Submitted
                </h3>
                <p className="text-[11px] text-[#55786B] dark:text-[#9FB7AD]">
                  Case: {report.caseId}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleResetAndClose}
              aria-label="Close dialog"
              className="p-1.5 rounded-xl text-[#658278] hover:text-[#0B3024] dark:text-[#8BA69D] dark:hover:text-[#F1FAF6] hover:bg-gray-100 dark:hover:bg-[#082A24] cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h4 className="text-lg font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                You already submitted a claim for this item
              </h4>
              <p className="text-xs text-[#55786B] dark:text-[#9FB7AD]">
                Current Status: {report.claimStatus}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-[#082A24] border border-[#E0EBE6] dark:border-[#16463D] text-xs text-left">
              <div className="flex justify-between items-center">
                <span className="text-[#658278] dark:text-[#8BA69D]">Claim ID</span>
                <span className="font-mono font-bold text-[#0B3024] dark:text-[#F1FAF6]">{report.claimId}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  handleResetAndClose();
                  window.location.href = "/student/lost-and-found/my-reports";
                }}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-[#159B72] hover:bg-[#107A59] transition-all cursor-pointer shadow-xs"
              >
                View My Claims
              </button>
              <button
                type="button"
                onClick={handleResetAndClose}
                className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-[#55786B] dark:text-[#9FB7AD] hover:bg-gray-100 dark:hover:bg-[#082A24] transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="claim-verification-title"
      aria-describedby="claim-verification-desc"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={isSubmitting ? undefined : handleResetAndClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div 
        ref={modalRef}
        className="relative w-full max-w-2xl bg-white dark:bg-[#06241F] rounded-2xl border border-[#D8E8E2] dark:border-[#16463D] shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#D8E8E2] dark:border-[#16463D] flex items-center justify-between gap-3 bg-[#FAFDFB] dark:bg-[#072620] shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0">
              <FileCheck className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 id="claim-verification-title" className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                Claim Item Verification
              </h3>
              <p id="claim-verification-desc" className="text-[11px] text-[#55786B] dark:text-[#9FB7AD] truncate">
                Case: {report.caseId} • {report.itemName}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleResetAndClose}
            disabled={isSubmitting}
            aria-label="Close verification dialog"
            className="p-1.5 rounded-xl text-[#658278] hover:text-[#0B3024] dark:text-[#8BA69D] dark:hover:text-[#F1FAF6] hover:bg-gray-100 dark:hover:bg-[#082A24] cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Success or Form */}
        {isSubmittedSuccess ? (
          <div className="p-6 text-center space-y-4 overflow-y-auto">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h4 className="text-lg font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                Claim Submitted Successfully
              </h4>
              <p className="text-xs text-[#55786B] dark:text-[#9FB7AD]">
                Your ownership verification details have been recorded and will be reviewed.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-[#082A24] border border-[#E0EBE6] dark:border-[#16463D] text-xs space-y-2 text-left">
              <div className="flex justify-between items-center">
                <span className="text-[#658278] dark:text-[#8BA69D]">Item</span>
                <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6]">{report.itemName}</span>
              </div>
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
                Next step: The Lost &amp; Found team will review your provided details and compare them with item custody records. You can track progress in My Reports.
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  handleResetAndClose();
                  window.location.href = "/student/lost-and-found/my-reports";
                }}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-[#159B72] hover:bg-[#107A59] transition-all cursor-pointer shadow-xs"
              >
                View My Claims
              </button>
              <button
                type="button"
                onClick={handleResetAndClose}
                className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-[#55786B] dark:text-[#9FB7AD] hover:bg-gray-100 dark:hover:bg-[#082A24] transition-colors cursor-pointer"
              >
                Back to Workspace
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto flex flex-col">
            {/* Scrollable Content */}
            <div className="p-5 space-y-4 overflow-y-auto flex-1">
              {/* Item Summary Card */}
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#082A24] border border-[#E0EBE6] dark:border-[#16463D] space-y-3">
                <h4 className="text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6] flex items-center gap-2">
                  <PackageSearch className="w-4 h-4 text-[#159B72] dark:text-[#20D39B]" />
                  <span>Item You Are Claiming</span>
                </h4>
                
                <div className="flex gap-3">
                  {report.image && (
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#06241F] shrink-0">
                      <Image
                        src={report.image}
                        alt={report.itemName}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="flex-1 min-w-0 space-y-1 text-xs">
                    <p className="font-bold text-[#0B3024] dark:text-[#F1FAF6] truncate">
                      {report.itemName}
                    </p>
                    <p className="text-[#55786B] dark:text-[#9FB7AD]">
                      <span className="font-semibold">Category:</span> {report.category}
                    </p>
                    {report.location && (
                      <p className="text-[#55786B] dark:text-[#9FB7AD] flex items-center gap-1">
                        <MapPin className="w-3 h-3 shrink-0" />
                        <span className="truncate">{report.location}</span>
                      </p>
                    )}
                    {report.reportedAt && (
                      <p className="text-[#55786B] dark:text-[#9FB7AD] flex items-center gap-1">
                        <Calendar className="w-3 h-3 shrink-0" />
                        <span>{report.reportedAt}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Verification Info Banner */}
              <div className="p-3 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-900/60 text-xs text-sky-900 dark:text-sky-200 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-sky-600 dark:text-sky-400 mt-0.5 shrink-0" />
                <span>
                  Please provide unique details known only to the owner. Examples: engravings, serial numbers, lock codes, internal contents, or purchase receipts. Do not include information already visible in the public listing.
                </span>
              </div>

              {/* 1. Distinguishing Features (Required) */}
              <div className="space-y-1">
                <label 
                  htmlFor="distinguishing-feature"
                  className="text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] flex items-center justify-between"
                >
                  <span>Distinguishing Features / Unique Marks *</span>
                  <span className="text-[10px] text-rose-500 font-normal">Required</span>
                </label>
                <textarea
                  id="distinguishing-feature"
                  ref={firstInputRef}
                  rows={3}
                  value={distinguishingFeature}
                  onChange={(e) => {
                    setDistinguishingFeature(e.target.value);
                    if (errors.distinguishingFeature) {
                      setErrors((prev) => ({ ...prev, distinguishingFeature: null }));
                    }
                  }}
                  placeholder="E.g., Small dent on bottom corner, custom lock code, internal CS notes, wallpaper screenshot..."
                  aria-invalid={!!errors.distinguishingFeature}
                  aria-describedby={errors.distinguishingFeature ? "distinguishing-feature-error" : undefined}
                  disabled={isSubmitting}
                  className={`w-full p-2.5 text-xs rounded-xl bg-white dark:bg-[#082A24] border text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden focus:ring-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                    errors.distinguishingFeature
                      ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/30"
                      : "border-[#D8E8E2] dark:border-[#16463D] focus:border-[#159B72] focus:ring-[#159B72]/30"
                  }`}
                />
                {errors.distinguishingFeature && (
                  <p id="distinguishing-feature-error" className="text-[11px] text-rose-500 font-medium flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.distinguishingFeature}</span>
                  </p>
                )}
              </div>

              {/* 2. Claim Reason (Required) */}
              <div className="space-y-1">
                <label 
                  htmlFor="claim-reason"
                  className="text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] flex items-center justify-between"
                >
                  <span>Why do you believe this item belongs to you? *</span>
                  <span className="text-[10px] text-rose-500 font-normal">Required</span>
                </label>
                <textarea
                  id="claim-reason"
                  rows={3}
                  value={claimReason}
                  onChange={(e) => {
                    setClaimReason(e.target.value);
                    if (errors.claimReason) {
                      setErrors((prev) => ({ ...prev, claimReason: null }));
                    }
                  }}
                  placeholder="Explain your ownership. E.g., I lost this at the library on Aug 18, matches my device features..."
                  aria-invalid={!!errors.claimReason}
                  aria-describedby={errors.claimReason ? "claim-reason-error" : undefined}
                  disabled={isSubmitting}
                  className={`w-full p-2.5 text-xs rounded-xl bg-white dark:bg-[#082A24] border text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden focus:ring-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                    errors.claimReason
                      ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/30"
                      : "border-[#D8E8E2] dark:border-[#16463D] focus:border-[#159B72] focus:ring-[#159B72]/30"
                  }`}
                />
                {errors.claimReason && (
                  <p id="claim-reason-error" className="text-[11px] text-rose-500 font-medium flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.claimReason}</span>
                  </p>
                )}
              </div>

              {/* 3. Additional Verification Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label 
                    htmlFor="purchase-loss-date"
                    className="text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6]"
                  >
                    Approx. Date Lost / Purchased
                  </label>
                  <input
                    id="purchase-loss-date"
                    type="text"
                    value={purchaseOrLossDate}
                    onChange={(e) => setPurchaseOrLossDate(e.target.value)}
                    placeholder="E.g., 18 Aug 2025 or Sept 2024"
                    disabled={isSubmitting}
                    className="w-full p-2.5 text-xs rounded-xl bg-white dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden focus:border-[#159B72] focus:ring-2 focus:ring-[#159B72]/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="space-y-1">
                  <label 
                    htmlFor="proof-reference"
                    className="text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6]"
                  >
                    Serial / Invoice Reference #
                  </label>
                  <input
                    id="proof-reference"
                    type="text"
                    value={proofReference}
                    onChange={(e) => setProofReference(e.target.value)}
                    placeholder="E.g., Model / Serial suffix"
                    disabled={isSubmitting}
                    className="w-full p-2.5 text-xs rounded-xl bg-white dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden focus:border-[#159B72] focus:ring-2 focus:ring-[#159B72]/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* 4. Lost Location Details */}
              <div className="space-y-1">
                <label 
                  htmlFor="lost-location"
                  className="text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6]"
                >
                  Where did you lose / last possess this item?
                </label>
                <input
                  id="lost-location"
                  type="text"
                  value={lostLocationDetails}
                  onChange={(e) => setLostLocationDetails(e.target.value)}
                  placeholder="E.g., Bench outside canteen, Lecture Hall 2 row 4..."
                  disabled={isSubmitting}
                  className="w-full p-2.5 text-xs rounded-xl bg-white dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden focus:border-[#159B72] focus:ring-2 focus:ring-[#159B72]/30 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              {/* 5. Supporting Image / Document (Optional) */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] block">
                  Supporting Photo / Proof (Optional)
                </label>
                <p className="text-[11px] text-[#658278] dark:text-[#8BA69D]">
                  Upload purchase receipt, old photo, or proof of ownership
                </p>
                {mockFileName ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#16463D] text-xs">
                    <div className="flex items-center gap-2 truncate flex-1 min-w-0">
                      <ImageIcon className="w-4 h-4 text-[#159B72] dark:text-[#20D39B] shrink-0" />
                      <span className="text-[#0B3024] dark:text-[#F1FAF6] font-medium truncate">
                        {mockFileName}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      disabled={isSubmitting}
                      aria-label="Remove attached file"
                      className="p-1 text-rose-500 hover:text-rose-700 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <label 
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border border-dashed hover:bg-gray-50 dark:hover:bg-[#082A24] transition-colors text-center ${
                      isSubmitting 
                        ? "opacity-50 cursor-not-allowed" 
                        : "cursor-pointer border-[#D8E8E2] dark:border-[#16463D]"
                    }`}
                  >
                    <Upload className="w-4 h-4 text-[#658278] dark:text-[#8BA69D] mb-1" />
                    <span className="text-xs font-semibold text-[#159B72] dark:text-[#20D39B]">
                      Upload receipt, bill, or reference photo
                    </span>
                    <span className="text-[10px] text-[#658278] dark:text-[#8BA69D] mt-0.5">
                      PNG, JPG, GIF, WEBP, or PDF • Max 5MB
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileUpload}
                      accept="image/png,image/jpeg,image/jpg,image/gif,image/webp,application/pdf"
                      disabled={isSubmitting}
                      aria-label="Upload supporting document"
                    />
                  </label>
                )}
                {errors.mockFileName && (
                  <p className="text-[11px] text-rose-500 font-medium flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.mockFileName}</span>
                  </p>
                )}
              </div>

              {/* 6. Truth Declaration Checkbox (Required) */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 text-xs text-[#0B3024] dark:text-[#F1FAF6] cursor-pointer select-none">
                  <input
                    id="truth-declaration"
                    type="checkbox"
                    checked={isTruthConfirmed}
                    onChange={(e) => {
                      setIsTruthConfirmed(e.target.checked);
                      if (errors.isTruthConfirmed) {
                        setErrors((prev) => ({ ...prev, isTruthConfirmed: null }));
                      }
                    }}
                    disabled={isSubmitting}
                    aria-invalid={!!errors.isTruthConfirmed}
                    aria-describedby={errors.isTruthConfirmed ? "truth-declaration-error" : undefined}
                    className="mt-0.5 rounded-sm text-[#159B72] focus:ring-[#159B72] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <span>
                    I confirm that this claim is truthful and that the information provided accurately relates to an item that belongs to me. I understand that false claims may result in account restrictions.
                  </span>
                </label>
                {errors.isTruthConfirmed && (
                  <p id="truth-declaration-error" className="text-[11px] text-rose-500 font-medium mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.isTruthConfirmed}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Footer Buttons - Sticky */}
            <div className="pt-3 px-5 pb-5 border-t border-[#D8E8E2] dark:border-[#16463D] flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2.5 bg-white dark:bg-[#06241F] shrink-0">
              <button
                type="button"
                onClick={handleResetAndClose}
                disabled={isSubmitting}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#55786B] dark:text-[#9FB7AD] hover:bg-gray-100 dark:hover:bg-[#082A24] cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#159B72] hover:bg-[#107A59] transition-all cursor-pointer shadow-xs disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Submit Verification</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
