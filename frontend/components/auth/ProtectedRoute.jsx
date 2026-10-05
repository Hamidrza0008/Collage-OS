"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "../providers/AuthProvider";

export default function ProtectedRoute({ children, allowedRoles }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading, user } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace(`/auth/student?redirect=${encodeURIComponent(pathname)}`);
    } else if (!isLoading && isAuthenticated && allowedRoles && user?.role) {
      if (!allowedRoles.includes(user.role)) {
        // If wrong role, redirect to appropriate portal
        if (user.role === "student") {
          router.replace("/student");
        } else {
          router.replace("/faculty");
        }
      }
    }
  }, [isAuthenticated, isLoading, router, pathname, allowedRoles, user]);

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#F7FBF9] dark:bg-[#031A16] transition-colors">
        <div className="relative w-12 h-12 rounded-2xl bg-[#DDF3EB] dark:bg-[#075A43]/50 flex items-center justify-center p-2.5 border border-[#159B72]/20 shadow-xs animate-pulse">
          <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
            <path
              d="M28.5 12C28.5 12 21.2 12.3 16.5 17C11.8 21.7 11.5 29 11.5 29C11.5 29 18.8 28.7 23.5 24C28.2 19.3 28.5 12 28.5 12Z"
              fill="#159B72"
            />
            <path d="M12 28.5L20.5 20" stroke="#DDF3EB" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </div>
        <p className="mt-4 text-xs font-semibold text-[#36594C] dark:text-[#8AAEA1] tracking-wider uppercase animate-pulse">
          Authenticating College OS Session...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
