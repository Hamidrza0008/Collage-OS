'use client';

import React from 'react';
import PeerMessageConnectModal from '../PeerMessageConnectModal';

/**
 * Backwards-compatible wrapper for MD-06 Peer Direct Message / Connect Modal.
 * Accepts legacy `profile` and `mode` props as well as canonical MD-06 props.
 */
export default function ConnectMessageModal({
  isOpen,
  onClose,
  profile,
  targetStudent,
  mode = 'connect',
  initialTab,
  sourceContext = 'profile',
  contextLabel,
  onSend,
  onStatusChange,
}) {
  return (
    <PeerMessageConnectModal
      isOpen={isOpen}
      onClose={onClose}
      targetStudent={targetStudent || profile}
      initialTab={initialTab || mode}
      sourceContext={sourceContext}
      contextLabel={contextLabel}
      onSend={onSend}
      onStatusChange={onStatusChange}
    />
  );
}
