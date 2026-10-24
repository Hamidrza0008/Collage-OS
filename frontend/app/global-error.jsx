"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function GlobalError({ error, reset }) {
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    console.error("College OS Root Layout Critical Exception:", error);
  }, [error]);

  const handleRetry = () => {
    setIsRetrying(true);
    try {
      if (typeof reset === "function") {
        reset();
      } else {
        window.location.reload();
      }
    } catch {
      window.location.reload();
    } finally {
      setTimeout(() => setIsRetrying(false), 800);
    }
  };

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          backgroundColor: "#F7FBF9",
          color: "#0B3024",
          display: "flex",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            maxWidth: "540px",
            width: "90%",
            margin: "24px auto",
            backgroundColor: "#FFFFFF",
            border: "1px solid #D8E8E2",
            borderRadius: "16px",
            padding: "36px 28px",
            textAlign: "center",
            boxShadow: "0 10px 25px -5px rgba(11, 48, 36, 0.08)",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              backgroundColor: "#FDE68A",
              color: "#92400E",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
              fontSize: "26px",
              fontWeight: "bold",
            }}
          >
            !
          </div>

          <span
            style={{
              display: "inline-block",
              padding: "4px 12px",
              borderRadius: "9999px",
              backgroundColor: "#ECFDF5",
              color: "#065F46",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.5px",
              marginBottom: "14px",
              textTransform: "uppercase",
            }}
          >
            Institutional System Boundary
          </span>

          <h1
            style={{
              fontSize: "24px",
              fontWeight: 700,
              color: "#0B3024",
              margin: "0 0 10px",
              letterSpacing: "-0.5px",
            }}
          >
            System Recovery Mode
          </h1>

          <p
            style={{
              fontSize: "14px",
              color: "#46685B",
              lineHeight: "1.6",
              margin: "0 0 24px",
            }}
          >
            A critical runtime failure prevented the root campus framework from loading.
            Your academic session is protected. Please reload to re-establish the connection.
          </p>

          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              type="button"
              onClick={handleRetry}
              disabled={isRetrying}
              style={{
                backgroundColor: "#004D40",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "10px",
                padding: "12px 24px",
                fontSize: "14px",
                fontWeight: 600,
                cursor: isRetrying ? "not-allowed" : "pointer",
                opacity: isRetrying ? 0.75 : 1,
                boxShadow: "0 2px 8px rgba(0, 77, 64, 0.25)",
              }}
            >
              {isRetrying ? "Reconnecting..." : "Reload College OS"}
            </button>

            <Link
              href="/auth/student"
              style={{
                display: "inline-flex",
                alignItems: "center",
                textDecoration: "none",
                backgroundColor: "#F1F8F5",
                color: "#0B3024",
                border: "1px solid #D8E8E2",
                borderRadius: "10px",
                padding: "12px 20px",
                fontSize: "14px",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Return to Login
            </Link>
          </div>

          <div
            style={{
              marginTop: "28px",
              paddingTop: "18px",
              borderTop: "1px solid #E8F1ED",
              fontSize: "11px",
              color: "#658278",
            }}
          >
            Chhatrapati Shivaji Maharaj University • College OS System Reliability
          </div>
        </div>
      </body>
    </html>
  );
}
