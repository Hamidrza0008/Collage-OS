'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  X,
  Send,
  UserPlus,
  UserCheck,
  Clock,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  AlertCircle,
  UserX,
  Info,
  Building2,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import {
  resolveTargetStudent,
  isSelfStudent,
  getPeerConnectionStatus,
  sendConnectionRequest,
  cancelConnectionRequest,
  removePeerConnection,
  subscribeToPeerConnections,
  getPeerMessages,
  sendPeerMessage,
  CURRENT_STUDENT_ID,
} from './peerConnectionStore';

export default function PeerMessageConnectModal({
  isOpen,
  onClose,
  targetStudent,
  initialTab = 'connect', // 'connect' | 'message'
  sourceContext, // 'profile' | 'project' | 'feed' | 'community' | 'search'
  contextLabel, // e.g. "Project Contributor — College OS"
  onSend,
  onStatusChange,
}) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [connectionNote, setConnectionNote] = useState('');
  const [messageText, setMessageText] = useState('');
  const [connectionStatus, setConnectionStatus] = useState('not_connected');
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [statusError, setStatusError] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [localMessages, setLocalMessages] = useState([]);
  const modalRef = useRef(null);

  // Resolve student from canonical source of truth
  const student = resolveTargetStudent(targetStudent);
  const isSelf = student ? isSelfStudent(student.id) : false;

  // Reset tab and inputs whenever modal opens or target changes
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab || 'connect');
      setConnectionNote('');
      setMessageText('');
      setStatusMessage(null);
      setStatusError(null);
      setImageError(false);

      if (student?.id && !isSelf) {
        setConnectionStatus(getPeerConnectionStatus(student.id));
        setLocalMessages(getPeerMessages(student.id));
      }
    }
  }, [isOpen, initialTab, targetStudent]);

  // Subscribe to live connection updates across the app
  useEffect(() => {
    if (!isOpen || !student?.id || isSelf) return;

    const unsubscribe = subscribeToPeerConnections((detail) => {
      if (!detail?.targetStudentId || detail.targetStudentId === student.id) {
        setConnectionStatus(getPeerConnectionStatus(student.id));
      }
    });

    return () => unsubscribe();
  }, [isOpen, student?.id, isSelf]);

  // Keyboard accessibility: Escape to close
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // 1. INVALID / NOT FOUND STUDENT STATE
  if (!student) {
    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="not-found-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
        onClick={onClose}
      >
        <div
          ref={modalRef}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md bg-white dark:bg-[#06241F] rounded-2xl md:rounded-3xl border border-gray-200 dark:border-[#16463D] shadow-2xl p-6 text-center animate-in zoom-in-95 duration-200"
        >
          <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-4">
            <UserX className="w-6 h-6" />
          </div>
          <h3 id="not-found-title" className="text-base font-bold text-gray-900 dark:text-[#F1FAF6]">
            Student Not Found
          </h3>
          <p className="text-xs text-gray-500 dark:text-[#A7C7BC] mt-1.5 leading-relaxed">
            The target student profile could not be found or does not exist in the campus roster.
          </p>
          <div className="mt-5">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-white transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. SELF-PROFILE SAFETY STATE
  if (isSelf) {
    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="self-profile-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
        onClick={onClose}
      >
        <div
          ref={modalRef}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md bg-white dark:bg-[#06241F] rounded-2xl md:rounded-3xl border border-gray-200 dark:border-[#16463D] shadow-2xl p-6 animate-in zoom-in-95 duration-200"
        >
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-[#10372F]">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-50 dark:bg-[#10372F] text-emerald-600 dark:text-[#20D39B]">
                <ShieldCheck className="w-4 h-4" />
              </span>
              <h3 id="self-profile-title" className="text-sm font-bold text-gray-900 dark:text-[#F1FAF6]">
                Your Campus Profile
              </h3>
            </div>
            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-[#F1FAF6] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-5 text-center space-y-3">
            <div className="relative w-16 h-16 mx-auto rounded-full overflow-hidden border-2 border-emerald-500/40">
              <Image
                src={student.avatar || '/assets/layout/profile-avatar.jpg'}
                alt={student.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-[#F1FAF6]">
                {student.name}
              </h4>
              <p className="text-xs text-emerald-600 dark:text-[#20D39B] font-mono mt-0.5">
                {student.username}
              </p>
              <p className="text-xs text-gray-500 dark:text-[#A7C7BC] mt-2">
                This is your own profile. You cannot connect with or send messages to yourself.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 pt-2">
            <button
              type="button"
              onClick={() => {
                onClose?.();
                router.push('/student/profile/edit');
              }}
              className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold border border-emerald-300 dark:border-[#159B72] text-emerald-700 dark:text-[#20D39B] hover:bg-emerald-50/50 dark:hover:bg-[#10372F]/50 transition-colors"
            >
              Edit Your Profile
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-white transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Handle Connect CTA
  const handleConnect = () => {
    setIsProcessing(true);
    setStatusError(null);
    setStatusMessage(null);

    setTimeout(() => {
      const res = sendConnectionRequest(student.id, connectionNote);
      setIsProcessing(false);
      if (res.success) {
        setConnectionStatus('request_sent');
        setStatusMessage(`Connection request sent to ${student.name}!`);
        onSend?.({
          type: 'connect',
          targetStudentId: student.id,
          note: connectionNote,
        });
        onStatusChange?.('request_sent');
      } else {
        setStatusError(res.error || 'Failed to send connection request.');
      }
    }, 350);
  };

  // Handle Cancel Request CTA
  const handleCancelRequest = () => {
    setIsProcessing(true);
    setStatusError(null);
    setStatusMessage(null);

    setTimeout(() => {
      const res = cancelConnectionRequest(student.id);
      setIsProcessing(false);
      if (res.success) {
        setConnectionStatus('not_connected');
        setStatusMessage('Connection request cancelled.');
        onStatusChange?.('not_connected');
      }
    }, 250);
  };

  // Handle Remove Connection CTA
  const handleRemoveConnection = () => {
    setIsProcessing(true);
    setStatusError(null);
    setStatusMessage(null);

    setTimeout(() => {
      const res = removePeerConnection(student.id);
      setIsProcessing(false);
      if (res.success) {
        setConnectionStatus('not_connected');
        setStatusMessage(`Disconnected from ${student.name}.`);
        onStatusChange?.('not_connected');
      }
    }, 250);
  };

  // Handle Send Direct Message
  const handleSendMessage = (e) => {
    e?.preventDefault();
    const trimmed = messageText.trim();
    if (!trimmed) {
      setStatusError('Please enter a message before sending.');
      return;
    }

    setIsProcessing(true);
    setStatusError(null);
    setStatusMessage(null);

    setTimeout(() => {
      const res = sendPeerMessage(student.id, trimmed);
      setIsProcessing(false);
      if (res.success) {
        setMessageText('');
        setLocalMessages(getPeerMessages(student.id));
        setStatusMessage(`Message delivered to ${student.name} (local session)!`);
        onSend?.({
          type: 'message',
          targetStudentId: student.id,
          text: trimmed,
        });
      } else {
        setStatusError(res.error || 'Failed to send message.');
      }
    }, 350);
  };

  // Navigate to canonical public profile
  const handleViewProfile = () => {
    onClose?.();
    router.push(`/student/profile/${student.id}`);
  };

  const initials = student.name
    ? student.name
        .split(' ')
        .map((p) => p[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'ST';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="peer-modal-title"
      aria-describedby="peer-modal-desc"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full sm:max-w-lg bg-white dark:bg-[#06241F] rounded-t-2xl sm:rounded-3xl border border-gray-200 dark:border-[#16463D] shadow-2xl p-5 sm:p-6 overflow-hidden animate-in slide-in-from-bottom-4 sm:zoom-in-95 duration-200 max-h-[92vh] flex flex-col"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-3.5 border-b border-gray-100 dark:border-[#10372F] shrink-0">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-50 dark:bg-[#10372F] text-emerald-600 dark:text-[#20D39B]">
              {activeTab === 'connect' ? <UserPlus className="w-4 h-4" /> : <MessageSquare className="w-4 h-4" />}
            </span>
            <div>
              <h2 id="peer-modal-title" className="text-sm sm:text-base font-bold text-gray-900 dark:text-[#F1FAF6] leading-tight">
                Peer Interaction
              </h2>
              <p id="peer-modal-desc" className="text-[11px] text-gray-500 dark:text-[#A7C7BC]">
                Verified student-to-student collaboration
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleViewProfile}
              title="View full public profile"
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-[#20D39B] hover:underline px-2 py-1 rounded-lg hover:bg-emerald-50 dark:hover:bg-[#10372F]/50 transition-colors"
            >
              <span>View Profile</span>
              <ExternalLink className="w-3 h-3" />
            </button>
            <button
              onClick={onClose}
              aria-label="Close peer modal"
              className="p-1.5 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-[#F1FAF6] hover:bg-gray-100 dark:hover:bg-[#10372F]/50 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto space-y-4 py-3.5 pr-0.5">
          {/* Student Identity Card */}
          <div className="p-3.5 rounded-2xl bg-gray-50/80 dark:bg-[#021512]/60 border border-gray-100 dark:border-[#10372F]/80 flex items-start gap-3">
            <div className="relative w-12 h-12 rounded-2xl overflow-hidden border-2 border-emerald-500/20 bg-emerald-100 dark:bg-[#0A2E27] shrink-0">
              {student.avatar && !imageError ? (
                <Image
                  src={student.avatar}
                  alt={student.name}
                  fill
                  className="object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-bold text-xs text-emerald-700 dark:text-[#20D39B]">
                  {initials}
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-[#F1FAF6] truncate">
                  {student.name}
                </h3>
                {student.isVerified && (
                  <CheckCircle2
                    className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500/20 shrink-0"
                    title="Verified Student"
                  />
                )}
                <span className="text-[11px] font-mono text-gray-500 dark:text-[#A7C7BC]">
                  {student.username}
                </span>
              </div>

              <p className="text-[11.5px] font-medium text-emerald-600 dark:text-[#20D39B] truncate mt-0.5">
                {student.headline || 'Campus Engineering Peer'}
              </p>

              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10.5px] text-gray-500 dark:text-[#A7C7BC] mt-1">
                <span className="flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-emerald-500" />
                  {student.department || 'Computer Science'}
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1">
                  <GraduationCap className="w-3 h-3 text-emerald-500" />
                  {student.semester || '7th Sem'}
                </span>
              </div>

              {/* Context chip if opened from project, community, feed, search */}
              {(contextLabel || sourceContext) && (
                <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium bg-emerald-100/60 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20">
                  <Sparkles className="w-3 h-3" />
                  <span>
                    {contextLabel ||
                      (sourceContext === 'project'
                        ? 'Project Contributor'
                        : sourceContext === 'feed'
                        ? 'Feed Post Author'
                        : sourceContext === 'community'
                        ? 'Community Member'
                        : sourceContext === 'search'
                        ? 'Campus Search Result'
                        : 'Campus Peer')}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center p-1 rounded-xl bg-gray-100 dark:bg-[#021512] border border-gray-200/60 dark:border-[#16463D]/60">
            <button
              type="button"
              onClick={() => {
                setActiveTab('connect');
                setStatusError(null);
                setStatusMessage(null);
              }}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'connect'
                  ? 'bg-white dark:bg-[#06241F] text-emerald-600 dark:text-[#20D39B] shadow-xs'
                  : 'text-gray-600 dark:text-[#A7C7BC] hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Connect</span>
              {connectionStatus === 'connected' && (
                <span className="w-2 h-2 rounded-full bg-emerald-500" title="Connected" />
              )}
              {connectionStatus === 'request_sent' && (
                <span className="w-2 h-2 rounded-full bg-amber-500" title="Request Sent" />
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('message');
                setStatusError(null);
                setStatusMessage(null);
              }}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'message'
                  ? 'bg-white dark:bg-[#06241F] text-emerald-600 dark:text-[#20D39B] shadow-xs'
                  : 'text-gray-600 dark:text-[#A7C7BC] hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Direct Message</span>
              {localMessages.length > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                  {localMessages.length}
                </span>
              )}
            </button>
          </div>

          {/* Feedback Alerts */}
          {statusMessage && (
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-[#10372F]/70 border border-emerald-200 dark:border-[#159B72]/50 text-emerald-800 dark:text-[#20D39B] text-xs font-medium flex items-center gap-2 animate-in fade-in duration-150">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{statusMessage}</span>
            </div>
          )}

          {statusError && (
            <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900/60 text-rose-800 dark:text-rose-300 text-xs font-medium flex items-center gap-2 animate-in fade-in duration-150">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{statusError}</span>
            </div>
          )}

          {/* TAB 1: CONNECT FLOW */}
          {activeTab === 'connect' && (
            <div className="space-y-3.5 animate-in fade-in duration-150">
              {/* Relationship State Card */}
              <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-[#021512]/50 border border-gray-100 dark:border-[#10372F]/60 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-emerald-100/70 dark:bg-[#10372F] text-emerald-700 dark:text-[#20D39B]">
                    {connectionStatus === 'connected' ? (
                      <UserCheck className="w-4 h-4" />
                    ) : connectionStatus === 'request_sent' ? (
                      <Clock className="w-4 h-4 text-amber-500" />
                    ) : (
                      <UserPlus className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-900 dark:text-[#F1FAF6]">
                        Relationship Status:
                      </span>
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                          connectionStatus === 'connected'
                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                            : connectionStatus === 'request_sent'
                            ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                            : 'bg-gray-100 dark:bg-[#10372F] text-gray-600 dark:text-[#A7C7BC]'
                        }`}
                      >
                        {connectionStatus === 'connected'
                          ? 'Connected'
                          : connectionStatus === 'request_sent'
                          ? 'Request Sent'
                          : 'Not Connected'}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 dark:text-[#A7C7BC] mt-0.5">
                      {connectionStatus === 'connected'
                        ? `You are connected peers with ${student.name}.`
                        : connectionStatus === 'request_sent'
                        ? 'Your connection request is pending peer acceptance.'
                        : `Send an invitation to expand your college network.`}
                    </p>
                  </div>
                </div>
              </div>

              {/* State-specific UI & Inputs */}
              {connectionStatus === 'not_connected' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-gray-700 dark:text-[#D8E8E2]">
                      Optional Note / Collaboration Idea:
                    </label>
                    <span className="text-[10px] text-gray-400">
                      {connectionNote.length}/300
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    maxLength={300}
                    value={connectionNote}
                    onChange={(e) => setConnectionNote(e.target.value)}
                    placeholder="Hi, I noticed your work on campus projects and would like to connect to collaborate..."
                    className="w-full p-3 text-xs rounded-xl border border-gray-200 dark:border-[#16463D] bg-white dark:bg-[#021512] text-gray-900 dark:text-[#F1FAF6] placeholder-gray-400 focus:outline-hidden focus:border-emerald-500 transition-colors"
                  />
                </div>
              )}

              {/* Honest architecture disclosure */}
              <div className="flex items-start gap-2 p-2.5 rounded-xl bg-emerald-50/50 dark:bg-[#021512]/40 border border-emerald-100/60 dark:border-[#10372F]/40 text-[10.5px] text-gray-500 dark:text-[#A7C7BC]">
                <Info className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  Peer connection state is saved to your College OS session and synchronizes across all campus views.
                </span>
              </div>
            </div>
          )}

          {/* TAB 2: DIRECT MESSAGE FLOW */}
          {activeTab === 'message' && (
            <div className="space-y-3 animate-in fade-in duration-150">
              {/* Honest demo disclosure */}
              <div className="flex items-start gap-2 p-2.5 rounded-xl bg-emerald-50/60 dark:bg-[#021512]/60 border border-emerald-200/60 dark:border-[#10372F]/80 text-[10.5px] text-emerald-900 dark:text-[#A7C7BC]">
                <Info className="w-3.5 h-3.5 text-emerald-600 dark:text-[#20D39B] shrink-0 mt-0.5" />
                <span>
                  Messaging is available in this demo as a local interaction. Messages are stored in your local session.
                </span>
              </div>

              {/* Recent Local Messages Thread Preview */}
              {localMessages.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-semibold text-gray-600 dark:text-[#A7C7BC]">
                    Previous Messages in this Session:
                  </span>
                  <div className="max-h-28 overflow-y-auto space-y-1.5 p-2 rounded-xl bg-gray-50 dark:bg-[#021512] border border-gray-100 dark:border-[#10372F]/50">
                    {localMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className="p-2 rounded-lg bg-white dark:bg-[#06241F] border border-gray-100 dark:border-[#16463D] text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between text-[10px] text-gray-400">
                          <span className="font-semibold text-emerald-600 dark:text-[#20D39B]">You</span>
                          <span>{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <p className="text-gray-800 dark:text-[#D8E8E2] text-xs leading-relaxed whitespace-pre-wrap">
                          {msg.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Message Composer */}
              <form onSubmit={handleSendMessage} className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="peer-message-input" className="text-xs font-semibold text-gray-700 dark:text-[#D8E8E2]">
                    Write a message to {student.name}:
                  </label>
                  <span className="text-[10px] text-gray-400">
                    {messageText.length}/500
                  </span>
                </div>
                <textarea
                  id="peer-message-input"
                  rows={3}
                  maxLength={500}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={(e) => {
                    // Send on Ctrl+Enter or Cmd+Enter
                    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder={`Hi ${student.name?.split(' ')[0] || 'there'}, let's discuss...`}
                  className="w-full p-3 text-xs rounded-xl border border-gray-200 dark:border-[#16463D] bg-white dark:bg-[#021512] text-gray-900 dark:text-[#F1FAF6] placeholder-gray-400 focus:outline-hidden focus:border-emerald-500 transition-colors"
                />
              </form>
            </div>
          )}
        </div>

        {/* Modal Bottom Action Footer */}
        <div className="pt-3 border-t border-gray-100 dark:border-[#10372F] flex flex-col sm:flex-row items-center justify-between gap-2.5 shrink-0">
          <div className="flex items-center gap-1.5 text-[11px] text-gray-400 order-2 sm:order-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Verified College OS Peer</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto order-1 sm:order-2">
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-3.5 rounded-xl text-xs font-semibold text-gray-600 dark:text-[#A7C7BC] hover:bg-gray-100 dark:hover:bg-[#10372F]/50 transition-colors flex-1 sm:flex-initial"
            >
              Close
            </button>

            {activeTab === 'connect' && (
              <>
                {connectionStatus === 'not_connected' && (
                  <button
                    type="button"
                    onClick={handleConnect}
                    disabled={isProcessing}
                    className="py-2.5 px-4 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/20 flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] disabled:opacity-50 flex-1 sm:flex-initial"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>{isProcessing ? 'Sending...' : 'Connect'}</span>
                  </button>
                )}

                {connectionStatus === 'request_sent' && (
                  <button
                    type="button"
                    onClick={handleCancelRequest}
                    disabled={isProcessing}
                    className="py-2.5 px-4 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-md shadow-amber-500/20 flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] disabled:opacity-50 flex-1 sm:flex-initial"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>{isProcessing ? 'Cancelling...' : 'Cancel Request'}</span>
                  </button>
                )}

                {connectionStatus === 'connected' && (
                  <button
                    type="button"
                    onClick={handleRemoveConnection}
                    disabled={isProcessing}
                    className="py-2.5 px-3.5 rounded-xl text-xs font-semibold border border-rose-300 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50 flex-1 sm:flex-initial"
                  >
                    <span>{isProcessing ? 'Updating...' : 'Remove Connection'}</span>
                  </button>
                )}
              </>
            )}

            {activeTab === 'message' && (
              <button
                type="button"
                onClick={handleSendMessage}
                disabled={isProcessing || !messageText.trim()}
                className="py-2.5 px-4 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/20 flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] disabled:opacity-50 flex-1 sm:flex-initial"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isProcessing ? 'Sending...' : 'Send Message'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
