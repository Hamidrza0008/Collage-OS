'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Send, UserPlus, MessageSquare, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function ConnectMessageModal({
  isOpen,
  onClose,
  profile,
  mode = 'connect', // 'connect' | 'message'
  onSend,
}) {
  const [messageText, setMessageText] = useState('');
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !profile) return null;

  const isConnect = mode === 'connect';

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      onSend?.({
        recipientId: profile.id,
        recipientName: profile.name,
        mode,
        text: messageText,
        sentAt: new Date().toISOString(),
      });
      setMessageText('');
      onClose();
    }, 500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white dark:bg-[#06241F] rounded-2xl md:rounded-3xl border border-gray-200 dark:border-[#16463D] shadow-2xl p-6 overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-[#10372F]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-[#10372F] text-emerald-600 dark:text-[#20D39B]">
              {isConnect ? <UserPlus className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-[#F1FAF6]">
                {isConnect ? `Connect with ${profile.name}` : `Message ${profile.name}`}
              </h3>
              <p className="text-xs text-gray-500 dark:text-[#A7C7BC]">
                {isConnect ? 'Send a student connection invitation' : 'Direct student-to-student peer message'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-[#F1FAF6] hover:bg-gray-100 dark:hover:bg-[#10372F]/50 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Recipient summary */}
        <div className="flex items-center gap-3 p-3 mt-4 rounded-xl bg-gray-50 dark:bg-[#021512]/60 border border-gray-100 dark:border-[#10372F]/60">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-200 dark:border-[#10372F] shrink-0">
            <Image
              src={profile.avatar || '/assets/layout/profile-avatar.jpg'}
              alt={profile.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-gray-900 dark:text-[#F1FAF6] truncate">
              {profile.name}
            </h4>
            <p className="text-[11px] text-gray-500 dark:text-[#A7C7BC] truncate">
              {profile.department} &bull; {profile.semester}
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-[#D8E8E2] mb-1.5">
              {isConnect ? 'Optional note / collaboration interest:' : 'Your message:'}
            </label>
            <textarea
              rows={3}
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder={
                isConnect
                  ? "Hi, I noticed your work on College OS and would love to connect..."
                  : "Hi, let's discuss the project requirements..."
              }
              className="w-full p-3 text-xs rounded-xl border border-gray-200 dark:border-[#16463D] bg-white dark:bg-[#021512] text-gray-900 dark:text-[#F1FAF6] placeholder-gray-400 focus:outline-hidden focus:border-emerald-500 transition-colors"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-gray-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              Verified College OS Peer
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="py-2 px-3.5 rounded-xl text-xs font-semibold text-gray-600 dark:text-[#A7C7BC] hover:bg-gray-100 dark:hover:bg-[#10372F]/50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSending}
                className="py-2 px-4 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/20 flex items-center gap-1.5 transition-all active:scale-[0.98]"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSending ? 'Sending...' : isConnect ? 'Send Invitation' : 'Send Message'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
