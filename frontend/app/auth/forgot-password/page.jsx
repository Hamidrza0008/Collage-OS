import React, { Suspense } from "react";
import ForgotPasswordPage from "@/components/auth/ForgotPasswordPage";

export const metadata = {
  title: "Reset Password - College OS",
  description: "Institutional self-service password recovery for College OS students and faculty.",
};

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F7FBF9] dark:bg-[#031A16]" />}>
      <ForgotPasswordPage />
    </Suspense>
  );
}
