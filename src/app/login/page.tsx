"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { NextResponse } from "next/server";
import Spinner from "../ui/Spinner";

export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState(true);
  const [resultMessage, setResultMessage] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      const responseData = response.data;

      console.log(responseData);

      if (!responseData.success) {
        setResult(false);
        setResultMessage(responseData.message);
      }

      if (responseData.success) {
        router.push("/profile");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Login failed");
      return NextResponse.json({ error: error.message }, { status: 400 });
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
        {/* --- Header --- */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome Back!
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Sign in to continue
          </p>
        </div>

        {/* --- Form --- */}
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            onLogin();
          }}
        >
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email Address
            </label>
            <div className="mt-1">
              <input
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="you@example.com"
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <div className="mt-1 relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="••••••••"
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  // Eye-slashed icon when password is visible
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243L6.228 6.228"
                    />
                  </svg>
                ) : (
                  // Eye icon when password is hidden
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.432 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* --- Result Message --- */}
          {resultMessage && (
            <div className="text-center text-sm">
              <p className={`${result ? "text-green-500" : "text-red-500"}`}>
                {resultMessage}
              </p>
            </div>
          )}

          {/* --- Login Button --- */}
          <div>
            <button
              type="submit"
              disabled={buttonDisabled || loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed dark:focus:ring-offset-gray-800 transition-colors"
            >
              {loading ? (
                <>
                  <Spinner />
                  <span>Logging in...</span>
                </>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>

        {/* --- Signup Link --- */}
        <div className="mt-6 flex justify-between text-sm">
          <p>
            Didn't have an Account?{" "}
            <Link
              href="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline"
            >
              Sign Up
            </Link>
          </p>
          <Link
            href="/forgotpassword"
            className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline"
          >
            Forgot Your Password?
          </Link>
        </div>
      </div>
    </main>
  );
}
