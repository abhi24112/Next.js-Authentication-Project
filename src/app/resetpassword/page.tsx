"use client";

import axios from "axios";
import React from "react";
import { useRouter } from "next/navigation";
import Spinner from "../ui/Spinner";

export default function ResetPassword() {
  const router = useRouter();

  const [timer, setTimer] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [token, setToken] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [confirmPass, setConfirmPass] = React.useState("");

  // const PasswordMatcher = () =>{
  //   if(password != confirmPass){
  //     setButtonDisabled(true)
  //   }else{
  //     setButtonDisabled(false)
  //   }
  // }

  // React.useEffect(() =>{
  //   PasswordMatcher();
  // },[password, confirmPass])

  const HandleUserandEndpoint = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/resetpassword", {
        password,
        token,
      });
      console.log(response);
      setTimer(true);

      setTimeout(() => {
        router.push("/login");
        setTimer(false);
      }, 3000);
    } catch (error: any) {
      setLoading(false);
      console.log(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    if (!urlToken) {
      router.push("/forgotpassword");
    }
    setToken(urlToken || "");
  }, []);

  React.useEffect(() => {
    if (password.length > 0 && confirmPass.length > 0 && password == confirmPass) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [password, confirmPass]);

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
        {!timer ? (
          <>
            {/* --- Form Header --- */}
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Set a New Password
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Please enter your new password below.
              </p>
            </div>

            {/* --- Form --- */}
            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                HandleUserandEndpoint();
              }}
            >
              {/* Password Input */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  New Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

              {/* Confirm new Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Confirm New Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
        
                </div>
              </div>

              {/* --- Submit Button --- */}
              <div>
                <button
                  type="submit"
                  disabled={buttonDisabled || loading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed dark:focus:ring-offset-gray-800 transition-colors"
                >
                  {loading ? (
                    <>
                      <Spinner />
                      <span>Resetting...</span>
                    </>
                  ) : (
                    "Reset Password"
                  )}
                </button>
              </div>
            </form>
          </>
        ) : (
          /* --- Success View --- */
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold text-green-500">
              Password Reset Successful!
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              You will be redirected to the login page shortly...
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
