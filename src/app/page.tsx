import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-center p-4">
      <div className="bg-white dark:bg-gray-800 p-8 sm:p-12 rounded-2xl shadow-2xl max-w-md w-full">
        {/* --- Animated Checkmark Icon --- */}
        <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 dark:bg-green-900/50">
          <svg
            className="h-16 w-16 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>

        {/* --- Main Message --- */}
        <h1 className="mt-6 text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
          You're All Set!
        </h1>
        <p className="mt-4 text-base sm:text-lg text-gray-500 dark:text-gray-300">
          Welcome! Your account is Successfully created and verified.<br/>
          Do What every your want!!.
        </p>

        {/* --- Button to Continue --- */}
        <Link
          href="/profile" // Change this link to your user's dashboard or profile page
          className="mt-8 inline-block w-full rounded-lg bg-blue-600 px-5 py-4 text-lg font-semibold text-white shadow-md transition-transform duration-200 hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        >
          Go to Your Profile
        </Link>
      </div>

      <footer className="absolute bottom-6 text-sm text-gray-400">
        <p>Redirecting you shortly...</p>
      </footer>
    </main>
  );
}
