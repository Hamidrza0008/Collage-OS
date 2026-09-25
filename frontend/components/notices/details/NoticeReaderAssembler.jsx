"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { getNoticeDetails, getRelatedNotices } from "./noticeReaderData";
import NoticeHeader from "./NoticeHeader";
import NoticeActionToolbar from "./NoticeActionToolbar";
import NoticeDocumentReader from "./NoticeDocumentReader";
import NoticeAttachmentCard from "./NoticeAttachmentCard";
import NoticePdfViewerModal from "./NoticePdfViewerModal";
import NoticeAcknowledgementModal from "./NoticeAcknowledgementModal";
import NoticeContactModal from "./NoticeContactModal";
import NoticeUtilitySidebar from "./NoticeUtilitySidebar";
import MobileNoticeActionBar from "./MobileNoticeActionBar";
import NoticeNotFound from "./NoticeNotFound";
import NoticeReaderSkeleton from "./NoticeReaderSkeleton";

export default function NoticeReaderAssembler({ noticeId, isLoading = false }) {
  if (isLoading) {
    return <NoticeReaderSkeleton />;
  }

  const initialNotice = getNoticeDetails(noticeId);

  if (!initialNotice) {
    return <NoticeNotFound noticeId={noticeId} />;
  }

  // Local state for user interactions
  const [notice, setNotice] = useState(initialNotice);
  const [isRead, setIsRead] = useState(Boolean(initialNotice.isRead));
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isAcknowledged, setIsAcknowledged] = useState(Boolean(initialNotice.isAcknowledged));
  const [acknowledgementData, setAcknowledgementData] = useState(null);

  // Modals state
  const [previewFile, setPreviewFile] = useState(null);
  const [isAcknowledgeModalOpen, setIsAcknowledgeModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const relatedNotices = getRelatedNotices(initialNotice.id);

  // Handler: Toggle Read
  const handleToggleRead = () => {
    setIsRead((prev) => {
      const next = !prev;
      showToast(next ? "Marked as read." : "Marked as unread.");
      return next;
    });
  };

  // Handler: Toggle Bookmark
  const handleToggleBookmark = () => {
    setIsBookmarked((prev) => {
      const next = !prev;
      showToast(next ? "Notice saved to bookmarks." : "Notice removed from bookmarks.");
      return next;
    });
  };

  // Handler: Share
  const handleShare = () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      showToast("Official notice link copied to clipboard.");
    } else if (navigator.share) {
      navigator.share({
        title: notice.title,
        text: `Official Circular: ${notice.title}`,
        url,
      }).catch(() => {});
    } else {
      showToast("Notice link copied.");
    }
  };

  // Handler: Print
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  // Handler: Download Single File
  const handleDownloadFile = (file) => {
    showToast(`Downloading "${file.name}"...`);
    // Simulated instant download prompt
    try {
      const element = document.createElement("a");
      const fileContent = `COLLEGE OS OFFICIAL DOCUMENT DRAFT\nTitle: ${notice.title}\nRef: ${notice.referenceNumber}\nFile: ${file.name}\nDate: ${notice.publishedAt}\n\n${notice.sections?.map(s => `${s.heading}\n${s.content}`).join("\n\n") || notice.description}`;
      const blob = new Blob([fileContent], { type: "text/plain;charset=utf-8" });
      element.href = URL.createObjectURL(blob);
      element.download = file.name.replace(/\.[^/.]+$/, "") + ".txt";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    } catch {
      // fallback
    }
  };

  // Handler: Download All Files
  const handleDownloadAll = () => {
    const files = notice.files || [];
    if (files.length > 0) {
      showToast(`Downloading circular document package (${files.length} files)...`);
      handleDownloadFile(files[0]);
    } else {
      showToast("Downloading official circular memo text...");
    }
  };

  // Handler: Confirm Acknowledgement
  const handleConfirmAcknowledgement = (data) => {
    setIsAcknowledged(true);
    setIsRead(true);
    setAcknowledgementData(data);
    showToast("Acknowledgement verified & recorded in Student ERP.");
  };

  // Handler: Contact Department
  const handleContactSubmit = (inquiry) => {
    showToast(`Inquiry sent to ${inquiry.department}. Receipt sent to your student email.`);
  };

  return (
    <div className="w-full min-h-screen pb-16 transition-colors">
      {/* ========================================================================= */}
      {/* 1. TOP COMPACT BACK NAVIGATION                                            */}
      {/* ========================================================================= */}
      <div className="mb-4 print:hidden">
        <Link
          href="/student/notices"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#55786B] dark:text-[#8FAFA4] hover:text-[#159B72] dark:hover:text-[#20D39B] transition-colors py-1 px-2 rounded-lg hover:bg-[#DDF4EB]/40 dark:hover:bg-[#06241F]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Notices</span>
        </Link>
      </div>

      {/* ========================================================================= */}
      {/* 2. MASTER 2/3 MAIN + 1/3 UTILITY SIDEBAR GRID                             */}
      {/* Starts at the EXACT same vertical level on desktop                        */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* ======================================================================= */}
        {/* MAIN COLUMN ~2/3 (8 cols)                                               */}
        {/* ======================================================================= */}
        <main className="lg:col-span-8 space-y-4">
          {/* Header Card */}
          <NoticeHeader
            notice={notice}
            isBookmarked={isBookmarked}
            isAcknowledged={isAcknowledged}
            onToggleBookmark={handleToggleBookmark}
            onShare={handleShare}
            onPrint={handlePrint}
            onOpenAcknowledgeModal={() => setIsAcknowledgeModalOpen(true)}
          />

          {/* Action Toolbar */}
          <NoticeActionToolbar
            notice={notice}
            isRead={isRead}
            isAcknowledged={isAcknowledged}
            isBookmarked={isBookmarked}
            onToggleRead={handleToggleRead}
            onToggleBookmark={handleToggleBookmark}
            onOpenAcknowledgeModal={() => setIsAcknowledgeModalOpen(true)}
            onShare={handleShare}
            onPrint={handlePrint}
            onDownloadAll={handleDownloadAll}
          />

          {/* Document / Circular Reader Canvas */}
          <NoticeDocumentReader
            notice={notice}
            onPreviewFile={(file) => setPreviewFile(file)}
            onDownloadFile={handleDownloadFile}
          />

          {/* Attachments Section */}
          <NoticeAttachmentCard
            files={notice.files}
            onPreviewFile={(file) => setPreviewFile(file)}
            onDownloadFile={handleDownloadFile}
          />
        </main>

        {/* ======================================================================= */}
        {/* RIGHT UTILITY SIDEBAR ~1/3 (4 cols): Sticky on desktop                   */}
        {/* ======================================================================= */}
        <div className="lg:col-span-4 lg:sticky lg:top-20 space-y-4 print:hidden">
          <NoticeUtilitySidebar
            notice={notice}
            isRead={isRead}
            isAcknowledged={isAcknowledged}
            acknowledgementData={acknowledgementData}
            onOpenAcknowledgeModal={() => setIsAcknowledgeModalOpen(true)}
            onContactDepartment={() => setIsContactModalOpen(true)}
            relatedNotices={relatedNotices}
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. MOBILE STICKY ACTION BAR                                               */}
      {/* ========================================================================= */}
      <MobileNoticeActionBar
        notice={notice}
        isRead={isRead}
        isAcknowledged={isAcknowledged}
        isBookmarked={isBookmarked}
        onToggleRead={handleToggleRead}
        onToggleBookmark={handleToggleBookmark}
        onShare={handleShare}
        onOpenAcknowledgeModal={() => setIsAcknowledgeModalOpen(true)}
      />

      {/* ========================================================================= */}
      {/* 4. MODALS (PDF Viewer, Acknowledgement, Contact)                          */}
      {/* ========================================================================= */}
      {previewFile && (
        <NoticePdfViewerModal
          file={previewFile}
          notice={notice}
          onClose={() => setPreviewFile(null)}
          onDownload={handleDownloadFile}
        />
      )}

      <NoticeAcknowledgementModal
        notice={notice}
        isOpen={isAcknowledgeModalOpen}
        onClose={() => setIsAcknowledgeModalOpen(false)}
        onConfirmAcknowledgement={handleConfirmAcknowledgement}
      />

      <NoticeContactModal
        notice={notice}
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        onSubmitSuccess={handleContactSubmit}
      />

      {/* ========================================================================= */}
      {/* 5. TOAST FEEDBACK                                                         */}
      {/* ========================================================================= */}
      {toastMessage && (
        <div className="fixed bottom-16 sm:bottom-6 right-6 z-50 bg-[#0B3024] dark:bg-[#10B981] text-white dark:text-[#021512] px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-[#021512]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. PRINT CSS STYLING ENHANCEMENT                                          */}
      {/* ========================================================================= */}
      <style jsx global>{`
        @media print {
          body {
            background-color: white !important;
            color: black !important;
          }
          nav, header, footer, aside, .print\\:hidden {
            display: none !important;
          }
          #printable-notice-document {
            box-shadow: none !important;
            border: none !important;
            padding: 0 !important;
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}
