"use client";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();

  interface UserData {
    _id: string;
    username: string;
    email: string;
    isVerified: boolean;
    isAdmin: boolean;
  }

  const [data, setData] = React.useState<UserData | null>(null);

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout Successfully");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log(res.data);
      setData(res.data.data);
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
        {/* Conditionally render based on whether data exists */}
        {!data ? (
          <>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Profile Page
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Click the button to fetch your details.
            </p>
          </>
        ) : (
          <>
            {/* --- Profile Header with dynamic data --- */}
            <div className="relative w-24 h-24 mx-auto mb-4">
              <div className="w-full h-full rounded-full bg-indigo-100 dark:bg-gray-700 flex items-center justify-center">
                {/* Display first letter of username as avatar */}
                <span className="text-4xl font-bold text-indigo-500 dark:text-indigo-400">
                  {data.username.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome, {data.username}!
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              {data.email}
            </p>

            <hr className="border-gray-200 dark:border-gray-700 my-6" />

            {/* --- User ID --- */}
            <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <h2 className="text-xs font-medium text-gray-500 dark:text-gray-400">
                USER ID
              </h2>
              <Link
                href={`/profile/${data._id}`}
                className="font-mono text-sm text-gray-600 dark:text-gray-300 break-all"
              >
                {data._id}
              </Link>
            </div>
          </>
        )}

        {/* --- Action Buttons --- */}
        <div className="mt-8 space-y-4">
          <button
            onClick={getUserDetails}
            className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all"
          >
            {data ? "Refresh Details" : "Get User Details"}
          </button>
          <button
            onClick={logout}
            className="w-full py-3 px-4 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
