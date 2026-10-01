"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  X,
  Download,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  FileText,
  Image as ImageIcon,
  File,
  ExternalLink,
  AlertCircle,
  RotateCw,
} from "lucide-react";

/**
 * MD-08 — Canonical Student Document / Attachment Viewer Modal
 * 
 * Supports:
 * - PDF documents (browser-native rendering)
 * - Images (PNG, JPG, JPEG, WEBP, GIF)
 * - Unsupported files (fallback with download)
 * 
 * Entry points:
 * - Assignment submission workspace
 * - Submission History Modal (MD-05)
 * - Claim Verification Modal (MD-07)
 * - Notice attachments
 * - Any document preview action
 */

export default function DocumentViewerModal({
  isOpen,
  onClose,
  file,
  files = [],
  sourceContext = "",
  onDownload,
}) {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [pdfError, setPdfError] = useState(false);

  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previousActiveElement = useRef(null);

  // Determine current file (single or from array)
  const currentFile = files.length > 0 ? files[currentIndex] : file;
  const hasMultipleFiles = files.length > 1;
  const totalFiles = files.length;

  // Normalize file data
  const normalizedFile = currentFile ? {
    id: currentFile.id || currentFile.name,
    name: currentFile.name || currentFile.filename || "Document",
    type: currentFile.type || currentFile.mimeType || detectFileType(currentFile.name),
    size: currentFile.size || "",
    url: currentFile.url || currentFile.src || currentFile.path || "",
    extension: currentFile.extension || getExtension(currentFile.name),
  } : null;

  // Detect file category
  const fileCategory = normalizedFile ? getFileCategory(normalizedFile.type, normalizedFile.extension) : null;

  // Accessibility: Focus Management
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement;
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);
    } else {
      previousActiveElement.current?.focus();
    }
  }, [isOpen]);

  // Accessibility: Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  // Keyboard navigation for multiple files
  useEffect(() => {
    const handleArrowKeys = (e) => {
      if (!isOpen || !hasMultipleFiles) return;
      
      if (e.key === "ArrowLeft" && currentIndex > 0) {
        e.preventDefault();
        handlePrevious();
      } else if (e.key === "ArrowRight" && currentIndex < totalFiles - 1) {
        e.preventDefault();
        handleNext();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleArrowKeys);
    }
    return () => window.removeEventListener("keydown", handleArrowKeys);
  }, [isOpen, hasMultipleFiles, currentIndex, totalFiles]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Reset state when file changes
  useEffect(() => {
    setImageError(false);
    setPdfError(false);
    setZoomLevel(100);
    setRotation(0);
  }, [currentFile]);

  if (!isOpen || !normalizedFile) return null;

  const handleClose = () => {
    setIsFullscreen(false);
    onClose();
  };

  const handleZoomIn = () => setZoomLevel((z) => Math.min(z + 15, 200));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(z - 15, 50));
  const handleResetZoom = () => setZoomLevel(100);
  const handleRotate = () => setRotation((r) => (r + 90) % 360);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalFiles - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleDownload = () => {
    if (onDownload) {
      onDownload(normalizedFile);
    } else {
      // Fallback: trigger browser download
      const link = document.createElement("a");
      link.href = normalizedFile.url;
      link.download = normalizedFile.name;
      link.click();
    }
  };

  const handleOpenExternal = () => {
    if (normalizedFile.url) {
      window.open(normalizedFile.url, "_blank", "noopener,noreferrer");
    }
  };

  // Render file icon based on type
  const renderFileIcon = () => {
    if (fileCategory === "image") {
      return <ImageIcon className="w-4 h-4" />;
    } else if (fileCategory === "pdf") {
      return <FileText className="w-4 h-4" />;
    } else {
      return <File className="w-4 h-4" />;
    }
  };

  // Render file type badge color
  const getFileTypeBadgeColor = () => {
    if (fileCategory === "image") {
      return "bg-blue-100 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400";
    } else if (fileCategory === "pdf") {
      return "bg-red-100 dark:bg-red-950/70 text-red-600 dark:text-red-400";
    } else {
      return "bg-gray-100 dark:bg-gray-800/70 text-gray-600 dark:text-gray-400";
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="document-viewer-title"
      onClick={handleClose}
    >
      <div
        ref={modalRef}
        className={`relative w-full bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-all duration-200 ${
          isFullscreen ? "h-[98vh] max-w-[98vw]" : "max-w-5xl h-[90vh]"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header & Controls */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-[#E8F1ED] dark:border-[#10372F] bg-[#F7FBF9] dark:bg-[#031A16] shrink-0">
          {/* File Info */}
          <div className="flex items-center gap-2.5 min-w-0 pr-2">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${getFileTypeBadgeColor()}`}>
              {renderFileIcon()}
            </div>
            <div className="min-w-0">
              <h3 id="document-viewer-title" className="text-xs sm:text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6] truncate" title={normalizedFile.name}>
                {normalizedFile.name}
              </h3>
              <p className="text-[10.5px] text-[#658278] dark:text-[#789991] truncate">
                {normalizedFile.type || normalizedFile.extension}
                {normalizedFile.size && ` • ${normalizedFile.size}`}
                {sourceContext && ` • ${sourceContext}`}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Zoom Controls (for images and PDFs) */}
            {(fileCategory === "image" || fileCategory === "pdf") && (
              <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] text-xs">
                <button
                  type="button"
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 50}
                  className="p-1 rounded text-gray-500 hover:text-gray-900 dark:hover:text-white disabled:opacity-40 cursor-pointer transition-colors"
                  title="Zoom Out"
                  aria-label="Zoom out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="font-mono text-[11px] w-9 text-center font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                  {zoomLevel}%
                </span>
                <button
                  type="button"
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 200}
                  className="p-1 rounded text-gray-500 hover:text-gray-900 dark:hover:text-white disabled:opacity-40 cursor-pointer transition-colors"
                  title="Zoom In"
                  aria-label="Zoom in"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Rotate Control (for images) */}
            {fileCategory === "image" && (
              <button
                type="button"
                onClick={handleRotate}
                className="hidden sm:block p-2 rounded-xl text-gray-500 hover:text-gray-900 dark:hover:text-white bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] cursor-pointer transition-colors"
                title="Rotate Image"
                aria-label="Rotate image 90 degrees"
              >
                <RotateCw className="w-4 h-4" />
              </button>
            )}

            {/* Multi-file Navigation */}
            {hasMultipleFiles && (
              <div className="flex items-center gap-1 px-2 py-1 rounded-xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] text-xs">
                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={currentIndex <= 0}
                  className="p-1 rounded text-gray-500 hover:text-gray-900 dark:hover:text-white disabled:opacity-40 cursor-pointer transition-colors"
                  title="Previous File"
                  aria-label="Previous file"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] font-semibold text-[#0B3024] dark:text-[#F1FAF6] whitespace-nowrap">
                  {currentIndex + 1} / {totalFiles}
                </span>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={currentIndex >= totalFiles - 1}
                  className="p-1 rounded text-gray-500 hover:text-gray-900 dark:hover:text-white disabled:opacity-40 cursor-pointer transition-colors"
                  title="Next File"
                  aria-label="Next file"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Download Button */}
            {normalizedFile.url && (
              <button
                type="button"
                onClick={handleDownload}
                className="p-2 rounded-xl bg-[#159B72] hover:bg-[#0F805D] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                title="Download File"
                aria-label="Download file"
              >
                <Download className="w-4 h-4" />
              </button>
            )}

            {/* Open External Button */}
            {normalizedFile.url && fileCategory === "pdf" && (
              <button
                type="button"
                onClick={handleOpenExternal}
                className="hidden sm:block p-2 rounded-xl text-gray-500 hover:text-gray-900 dark:hover:text-white bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] cursor-pointer transition-colors"
                title="Open in New Tab"
                aria-label="Open in new tab"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
            )}

            {/* Fullscreen Toggle */}
            <button
              type="button"
              onClick={() => setIsFullscreen((f) => !f)}
              className="hidden sm:block p-2 rounded-xl text-gray-500 hover:text-gray-900 dark:hover:text-white bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] cursor-pointer transition-colors"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              aria-label={isFullscreen ? "Exit fullscreen mode" : "Enter fullscreen mode"}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close Button */}
            <button
              ref={closeButtonRef}
              type="button"
              onClick={handleClose}
              className="p-2 rounded-xl text-gray-500 hover:text-gray-900 dark:hover:text-white bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] cursor-pointer transition-colors"
              title="Close Preview"
              aria-label="Close document viewer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#E5EBE8] dark:bg-[#02100E] flex justify-center items-center">
          {/* Image Viewer */}
          {fileCategory === "image" && !imageError && normalizedFile.url && (
            <div 
              className="relative transition-all duration-200 ease-out"
              style={{
                transform: `scale(${zoomLevel / 100}) rotate(${rotation}deg)`,
                maxWidth: "100%",
                maxHeight: "100%",
              }}
            >
              <Image
                src={normalizedFile.url}
                alt={normalizedFile.name}
                width={800}
                height={600}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                onError={() => setImageError(true)}
                priority
              />
            </div>
          )}

          {/* PDF Viewer */}
          {fileCategory === "pdf" && !pdfError && normalizedFile.url && (
            <div 
              className="w-full h-full flex items-center justify-center"
              style={{
                transform: `scale(${zoomLevel / 100})`,
                transformOrigin: "center center",
              }}
            >
              <iframe
                src={normalizedFile.url}
                className="w-full h-full bg-white rounded-lg shadow-2xl"
                title={normalizedFile.name}
                onError={() => setPdfError(true)}
              />
            </div>
          )}

          {/* Error State for Images/PDFs */}
          {((fileCategory === "image" && imageError) || (fileCategory === "pdf" && pdfError)) && (
            <div className="text-center space-y-4 max-w-md p-8">
              <div className="w-16 h-16 rounded-2xl bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 mx-auto flex items-center justify-center">
                <AlertCircle className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                  Preview Unavailable
                </h4>
                <p className="text-xs text-[#55786B] dark:text-[#9FB7AD]">
                  This file could not be loaded. You can download it to view offline.
                </p>
              </div>
              <button
                type="button"
                onClick={handleDownload}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#159B72] hover:bg-[#107A59] transition-all cursor-pointer shadow-xs inline-flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download File</span>
              </button>
            </div>
          )}

          {/* Unsupported File Type Fallback */}
          {fileCategory === "unsupported" && (
            <div className="text-center space-y-4 max-w-md p-8">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800/60 text-gray-600 dark:text-gray-400 mx-auto flex items-center justify-center">
                <File className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                  Preview Unavailable
                </h4>
                <p className="text-xs text-[#55786B] dark:text-[#9FB7AD]">
                  Preview is not supported for this file type.
                </p>
                {normalizedFile.extension && (
                  <p className="text-xs text-[#658278] dark:text-[#789991]">
                    File type: {normalizedFile.extension.toUpperCase()}
                  </p>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                {normalizedFile.url && (
                  <>
                    <button
                      type="button"
                      onClick={handleDownload}
                      className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#159B72] hover:bg-[#107A59] transition-all cursor-pointer shadow-xs inline-flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download File</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleOpenExternal}
                      className="px-5 py-2.5 rounded-xl text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] bg-white dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#16463D] hover:bg-gray-50 dark:hover:bg-[#0A2E27] transition-all cursor-pointer inline-flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Open in New Tab</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Missing URL Fallback */}
          {!normalizedFile.url && (
            <div className="text-center space-y-4 max-w-md p-8">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800/60 text-gray-600 dark:text-gray-400 mx-auto flex items-center justify-center">
                <AlertCircle className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                  Document Unavailable
                </h4>
                <p className="text-xs text-[#55786B] dark:text-[#9FB7AD]">
                  This file cannot be displayed because the source is not available.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Helper Text */}
        {hasMultipleFiles && (
          <div className="sm:hidden px-4 py-2 bg-[#F7FBF9] dark:bg-[#031A16] border-t border-[#E8F1ED] dark:border-[#10372F] text-center text-[11px] text-[#658278] dark:text-[#789991]">
            Swipe or use arrows to navigate files
          </div>
        )}
      </div>
    </div>
  );
}

// Helper functions
function detectFileType(filename) {
  if (!filename) return "Unknown";
  const ext = getExtension(filename).toLowerCase();
  
  const mimeTypes = {
    pdf: "application/pdf",
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    gif: "image/gif",
    webp: "image/webp",
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    txt: "text/plain",
  };
  
  return mimeTypes[ext] || "application/octet-stream";
}

function getExtension(filename) {
  if (!filename) return "";
  const parts = filename.split(".");
  return parts.length > 1 ? parts[parts.length - 1] : "";
}

function getFileCategory(mimeType, extension) {
  const type = (mimeType || "").toLowerCase();
  const ext = (extension || "").toLowerCase();
  
  // Image types
  if (type.startsWith("image/") || ["png", "jpg", "jpeg", "gif", "webp", "svg"].includes(ext)) {
    return "image";
  }
  
  // PDF
  if (type === "application/pdf" || ext === "pdf") {
    return "pdf";
  }
  
  // All others are unsupported for preview
  return "unsupported";
}
