"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.reponse.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-6">
        {/* --- Success State --- */}
        {verified && (
          <>
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 dark:bg-green-900/50">
              <svg
                className="h-12 w-12 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Email Verified!
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Your account is now active. You can proceed to log in.
            </p>
            <Link
              href="/login"
              className="inline-block w-full rounded-lg bg-indigo-600 px-5 py-3 text-lg font-semibold text-white shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
            >
              Go to Login
            </Link>
          </>
        )}

        {/* --- Error State --- */}
        {error && (
          <>
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-100 dark:bg-red-900/50">
              <svg
                className="h-12 w-12 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Verification Failed
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              The link is invalid or has expired. Please try again.
            </p>
            <Link
              href="/signup"
              className="inline-block w-full rounded-lg bg-gray-600 px-5 py-3 text-lg font-semibold text-white shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
            >
              Back to Signup
            </Link>
          </>
        )}

        {/* --- Initial/Verifying State --- */}
        {!verified && !error && (
          <>
            <div className="mx-auto h-20 w-20 animate-spin rounded-full border-4 border-dashed border-indigo-600 dark:border-indigo-400"></div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Verifying Email
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Please wait a moment while we confirm your email address.
            </p>
          </>
        )}
      </div>
    </main>
  );
}
