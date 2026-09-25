'use client';

import React from 'react';
import { UserPlus, UserCheck, MessageSquare, Share2 } from 'lucide-react';

export default function MobilePublicProfileActionBar({
  profile,
  isConnected,
  isConnecting,
  onConnect,
  onMessage,
  onShare,
}) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#021512]/95 backdrop-blur-md border-t border-gray-200 dark:border-[#10372F] p-3 shadow-lg">
      <div className="flex items-center gap-2 max-w-lg mx-auto">
        <button
          onClick={onShare}
          aria-label="Share profile"
          className="p-3 rounded-xl border border-gray-200 dark:border-[#10372F] text-gray-600 dark:text-[#A7C7BC] flex items-center justify-center transition-colors"
        >
          <Share2 className="w-5 h-5" />
        </button>

        <button
          onClick={onMessage}
          className="flex-1 py-3 px-3 rounded-xl font-bold text-xs border border-gray-200 dark:border-[#10372F] text-gray-700 dark:text-[#F1FAF6] flex items-center justify-center gap-1.5"
        >
          <MessageSquare className="w-4 h-4 text-emerald-500" />
          <span>Message</span>
        </button>

        <button
          onClick={onConnect}
          disabled={isConnecting}
          className={`flex-1 py-3 px-3 rounded-xl font-bold text-xs shadow-md flex items-center justify-center gap-1.5 active:scale-[0.98] transition-transform ${
            isConnected
              ? 'bg-emerald-50 dark:bg-[#10372F] text-emerald-700 dark:text-[#20D39B] border border-emerald-300 dark:border-[#159B72]'
              : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20'
          }`}
        >
          {isConnected ? (
            <>
              <UserCheck className="w-4 h-4" />
              <span>Connected</span>
            </>
          ) : (
            <>
              <UserPlus className="w-4 h-4" />
              <span>{isConnecting ? 'Connecting...' : 'Connect'}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
