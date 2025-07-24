"use client";

import React from "react";
import toast from "react-hot-toast";
import { NextResponse } from "next/server";
import axios from "axios";
import Spinner from "../ui/Spinner";

export default function ForgotPassword() {
  const [user, setUser] = React.useState({
    email: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [responseMessage, setResponseMessage] = React.useState("");
  const [result, setResult] = React.useState(false);

  const onForgotPass = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/forgotpassword", user);
      const responseData = response.data;
      console.log(responseData)

      if(responseData.success){
        setResponseMessage(responseData.message)
        setResult(true)
      }else{
        setResponseMessage(responseData.message)
        setResult(false)
      }


    } catch (error: any) {
      toast.error(error.response?.data?.error || "Login failed");
      return NextResponse.json({ error: error.message }, { status: 400 });
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if(user.email.length > 0){
        setButtonDisabled(false)
    }else{
        setButtonDisabled(true)
    }
  },[user])

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
        {/* --- Header --- */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Forgot Password
          </h1>
        </div>

        {/* --- Form --- */}
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            onForgotPass();
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
          {/* --- Result Message --- */}
          {responseMessage && (
            <div className="text-center text-sm">
              <p className={`${result ? "text-green-500" : "text-red-500"}`}>
                {responseMessage}
              </p>
            </div>
          )}

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
                  <span>Sending Mail...</span>
                </>
              ) : (
                "Forgot Password"
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
